import os
import re
import hashlib
from typing import Any, Dict, List, Optional

import httpx

from app.core.config import settings
from app.repositories.postgres_rag_repository import (
    postgres_rag_repository,
)


# ============================================================
# HELPERS
# ============================================================

def _tokens(text: str) -> List[str]:
    return re.findall(
        r"[a-z0-9]+",
        text.lower(),
    )


def _requested_standard_numbers(text: str) -> List[str]:
    """
    Extract standard references such as:

    IS 456
    IS-456
    IS 456:2000
    IS-456-2000
    """

    matches = re.findall(
        r"\bIS[\s-]*(\d{3,5})(?:[\s:-]*(\d{4}))?\b",
        text,
        re.IGNORECASE,
    )

    results = []

    for number, year in matches:
        if year:
            results.append(
                f"IS {number}:{year}"
            )
        else:
            results.append(
                f"IS {number}"
            )

    return results


def _chunk_standard_numbers(text: str) -> List[str]:
    return _requested_standard_numbers(text)


def _deterministic_embedding(
    text: str,
    dimensions: int = 256,
) -> List[float]:
    """
    Local deterministic embedding fallback.

    This is not a semantic embedding model.
    It exists so the PostgreSQL + pgvector pipeline
    works without an external embedding API.
    """

    vector = [0.0] * dimensions

    tokens = _tokens(text)

    if not tokens:
        return vector

    for token in tokens:

        digest = hashlib.sha256(
            token.encode("utf-8")
        ).digest()

        for i in range(
            0,
            len(digest),
            4,
        ):

            value = int.from_bytes(
                digest[i:i + 4],
                byteorder="big",
                signed=False,
            )

            index = value % dimensions

            vector[index] += 1.0

    magnitude = sum(
        value * value
        for value in vector
    ) ** 0.5

    if magnitude == 0:
        return vector

    return [
        value / magnitude
        for value in vector
    ]


# ============================================================
# RAG SERVICE
# ============================================================

class RAGService:

    def __init__(self) -> None:
        self.embedding_dimensions = 256

    # ========================================================
    # EMBEDDING
    # ========================================================

    def _embed(
        self,
        text: str,
    ) -> List[float]:
        """
        Generate a 256-dimensional deterministic embedding.

        The current demo uses this local fallback so that
        RAG works without requiring an external AI provider.
        """

        return _deterministic_embedding(
            text,
            self.embedding_dimensions,
        )

    # ========================================================
    # TEXT CHUNKING
    # ========================================================

    def _split_text(
        self,
        text: str,
        chunk_size: int = 1200,
        overlap: int = 150,
    ) -> List[str]:

        text = text.strip()

        if not text:
            return []

        if len(text) <= chunk_size:
            return [text]

        chunks = []

        start = 0
        text_length = len(text)

        while start < text_length:

            end = min(
                start + chunk_size,
                text_length,
            )

            chunk = text[
                start:end
            ].strip()

            if chunk:
                chunks.append(chunk)

            if end >= text_length:
                break

            start = max(
                end - overlap,
                start + 1,
            )

        return chunks

    # ========================================================
    # INGEST TEXT
    # ========================================================

    def ingest_text(
        self,
        text: str,
        title: str,
        source_url: Optional[str] = None,
        document_type: Optional[str] = None,
        version: Optional[str] = None,
        published_date: Optional[str] = None,
    ) -> int:

        # Prevent duplicate documents with the same title.
        postgres_rag_repository.delete_document_by_title(
            title
        )

        document_id = (
            postgres_rag_repository.create_document(
                title=title,
                source_url=source_url,
                document_type=document_type,
                version=version,
                published_date=published_date,
            )
        )

        chunks = self._split_text(text)

        for index, chunk in enumerate(chunks):

            embedding = self._embed(chunk)

            postgres_rag_repository.create_chunk(
                document_id=document_id,
                chunk_index=index,
                content=chunk,
                metadata={
                    "source": title,
                    "document_type": document_type,
                },
                embedding=embedding,
            )

        return document_id

    # ========================================================
    # INGEST FILE
    # ========================================================

    def ingest_file(
        self,
        file_path: str,
        source_url: Optional[str] = None,
        document_type: Optional[str] = None,
        version: Optional[str] = None,
        published_date: Optional[str] = None,
    ) -> int:

        if not os.path.exists(file_path):
            raise FileNotFoundError(file_path)

        extension = os.path.splitext(
            file_path
        )[1].lower()

        title = os.path.basename(
            file_path
        )

        if extension == ".pdf":

            from pypdf import PdfReader

            reader = PdfReader(
                file_path
            )

            pages = []

            for page in reader.pages:

                pages.append(
                    page.extract_text()
                    or ""
                )

            text = "\n\n".join(
                pages
            )

        else:

            with open(
                file_path,
                "r",
                encoding="utf-8",
                errors="ignore",
            ) as file:

                text = file.read()

        return self.ingest_text(
            text=text,
            title=title,
            source_url=source_url,
            document_type=document_type,
            version=version,
            published_date=published_date,
        )

    # ========================================================
    # INGEST URL
    # ========================================================

    def ingest_url(
        self,
        url: str,
        title: Optional[str] = None,
        document_type: Optional[str] = None,
    ) -> int:

        response = httpx.get(
            url,
            timeout=60,
            follow_redirects=True,
        )

        response.raise_for_status()

        text = response.text

        if not title:
            title = url

        return self.ingest_text(
            text=text,
            title=title,
            source_url=url,
            document_type=document_type,
        )

    # ========================================================
    # INGEST DIRECTORY
    # ========================================================

    def ingest_directory(
        self,
        directory: Optional[str] = None,
    ) -> int:

        if directory is None:

            directory = getattr(
                settings,
                "RAG_DOCUMENTS_DIR",
                "",
            )

        if not directory:
            return 0

        if not os.path.isdir(directory):
            return 0

        count = 0

        for root, _, files in os.walk(
            directory
        ):

            for filename in files:

                if not filename.lower().endswith(
                    (
                        ".txt",
                        ".md",
                        ".pdf",
                    )
                ):
                    continue

                path = os.path.join(
                    root,
                    filename,
                )

                try:

                    self.ingest_file(
                        path,
                        document_type="Indexed document",
                    )

                    count += 1

                except Exception:
                    continue

        return count

    # ========================================================
    # RETRIEVE
    # ========================================================

    def retrieve(
        self,
        query: str,
        top_k: Optional[int] = None,
    ) -> List[Dict[str, Any]]:

        query = query.strip()

        if not query:
            return []

        # ----------------------------------------------------
        # Make sure some chunks exist.
        # ----------------------------------------------------

        if self.chunk_count == 0:
            self.ingest_directory()

        if self.chunk_count == 0:
            return []

        # ----------------------------------------------------
        # Query embedding
        # ----------------------------------------------------

        query_vector = self._embed(
            query
        )

        # ----------------------------------------------------
        # Detect explicit standard references.
        # ----------------------------------------------------

        requested_codes = (
            _requested_standard_numbers(
                query
            )
        )

        result_limit = (
            top_k
            or getattr(
                settings,
                "RAG_TOP_K",
                6,
            )
        )

        # ----------------------------------------------------
        # IMPORTANT:
        #
        # The current local deterministic embeddings are only
        # a fallback and can rank unrelated chunks highly.
        #
        # We therefore retrieve a LARGE candidate pool and
        # perform lexical reranking ourselves.
        #
        # There are currently only a few hundred chunks, so
        # 500 safely covers the current demo dataset.
        # ----------------------------------------------------

        search_limit = max(
            result_limit * 5,
            500,
        )

        db_results = (
            postgres_rag_repository.similarity_search(
                query_vector,
                limit=search_limit,
            )
        )

        if not db_results:
            return []

        # ====================================================
        # LEXICAL RERANKING
        # ====================================================

        stop_words = {
            "what", "which", "where", "when", "does", "do", "is", "are",
            "the", "a", "an", "to", "for", "of", "and", "in", "on",
            "apply", "applies", "indian", "standard", "standards",
            "used", "use", "using", "used", "tell", "about",
            "please", "does", "say", "requirements", "requirement",
            "specification", "specifications", "code", "practice",
        }

        query_terms = {
            token
            for token in _tokens(query)
            if len(token) >= 3 and token not in stop_words
        }

        if query_terms:

            for result in db_results:
                content = result.get("content", "")
                content_lower = content.lower()
                content_terms = set(_tokens(content_lower))

                # The repository filename is stored in `title`, so the
                # actual standard/product title is taken from the start
                # of the chunk content instead.
                head_terms = set(_tokens(content_lower[:350]))

                content_matches = len(query_terms.intersection(content_terms))
                head_matches = len(query_terms.intersection(head_terms))

                # Strong lexical evidence beats the intentionally simple
                # local vector fallback.  A product/topic appearing in the
                # chunk's title/header is much stronger than appearing once
                # somewhere in a generic technical paragraph.
                result["_lexical_score"] = (
                    (head_matches * 4) + (content_matches * 2)
                    + result.get("similarity", 0)
                )

            db_results.sort(
                key=lambda result: result.get("_lexical_score", 0),
                reverse=True,
            )

            # Filter weak matches.
            # For broad product queries (LED lamps, helmets, cement, etc.),
            # require the topic to appear in the chunk header/title or have
            # multiple supporting occurrences. This prevents unrelated
            # vector-neighbours from leaking into the final answer.
            lexical_results = []

            for result in db_results:
                content_lower = result.get("content", "").lower()
                content_terms = set(_tokens(content_lower))
                head_terms = set(_tokens(content_lower[:350]))

                content_matches = len(query_terms.intersection(content_terms))
                head_matches = len(query_terms.intersection(head_terms))

                if head_matches >= 1 or content_matches >= max(2, len(query_terms)):
                    lexical_results.append(result)

            # If exact lexical evidence exists, use it exclusively.
            if lexical_results:
                db_results = lexical_results

        # ====================================================
        # LIMIT FINAL RESULTS
        # ====================================================

        db_results = db_results[
            :(
                top_k
                or getattr(
                    settings,
                    "RAG_TOP_K",
                    6,
                )
            )
        ]

        # ====================================================
        # EXACT STANDARD SAFEGUARD
        # ====================================================

        if requested_codes:

            matching_results = []

            for result in db_results:

                content = result.get(
                    "content",
                    "",
                )

                normalized_content = (
                    content
                    .lower()
                    .replace("-", " ")
                    .replace(":", " ")
                )

                matched = False

                for requested in requested_codes:

                    normalized_requested = (
                        requested
                        .lower()
                        .replace("-", " ")
                        .replace(":", " ")
                    )

                    requested_parts = (
                        normalized_requested.split()
                    )

                    if all(
                        part in normalized_content
                        for part in requested_parts
                    ):
                        matched = True
                        break

                if matched:
                    matching_results.append(
                        result
                    )

            if matching_results:

                db_results = (
                    matching_results
                )

            else:

                # The user explicitly requested a standard,
                # but we found no evidence for that standard.
                return []

        # ====================================================
        # CONVERT DATABASE RESULTS TO API FORMAT
        # ====================================================

        results = []

        for result in db_results:

            results.append(
                {
                    "id": str(
                        result["id"]
                    ),

                    "sourceName": (
                        result.get(
                            "title"
                        )
                        or "Indexed BIS document"
                    ),

                    "sourceUrl": result.get(
                        "source_url"
                    ),

                    "documentType": (
                        result.get(
                            "document_type"
                        )
                        or "BIS/Gazette"
                    ),

                    "version": result.get(
                        "version"
                    ),

                    "chunkIndex": result.get(
                        "chunk_index"
                    ),

                    "text": result.get(
                        "content",
                        "",
                    ),

                    "page": result.get(
                        "page_number"
                    ),

                    "clause": result.get(
                        "clause_number"
                    ),

                    "metadata": (
                        result.get(
                            "metadata"
                        )
                        or {}
                    ),

                    "similarity": float(
                        result.get(
                            "similarity",
                            0,
                        )
                    ),
                }
            )

        return results

    # ========================================================
    # DOCUMENT
    # ========================================================

    def get_document(
        self,
        document_id: int,
    ) -> Optional[Dict[str, Any]]:

        return (
            postgres_rag_repository.get_document(
                document_id
            )
        )

    # ========================================================
    # CHUNK COUNT
    # ========================================================

    @property
    def chunk_count(self) -> int:

        return (
            postgres_rag_repository.chunk_count()
        )


# ============================================================
# SINGLE SERVICE INSTANCE
# ============================================================

rag_service = RAGService()