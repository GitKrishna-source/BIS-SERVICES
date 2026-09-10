"""Document ingestion and retrieval for the regulatory assistant.

The production path uses an OpenAI-compatible embedding endpoint. A deterministic
hashed vector is retained only as an offline development fallback; it is not
presented as a semantic model and is replaced automatically when AI_API_KEY is set.
"""

import hashlib
import io
import json
import math
import re
import uuid
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional

import httpx

try:
    from pypdf import PdfReader
except ImportError:  # PDF ingestion remains available after installing requirements.txt.
    PdfReader = None

from app.core.config import settings


def _tokens(text: str) -> List[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


def _requested_standard_numbers(text: str) -> List[str]:
    return re.findall(r"\bIS\s*(?:[A-Z]\s*)?(\d{3,5})\b", text, re.I)


def _chunk_standard_numbers(text: str) -> List[str]:
    return re.findall(r"\bIS\s*(?:[A-Z]\s*)?(\d{3,5})\b", text, re.I)


def _local_embedding(text: str, dimensions: int) -> List[float]:
    vector = [0.0] * dimensions
    for token in _tokens(text):
        digest = hashlib.sha256(token.encode("utf-8")).digest()
        index = int.from_bytes(digest[:4], "big") % dimensions
        vector[index] += 1.0 if digest[4] % 2 else -1.0
    norm = math.sqrt(sum(value * value for value in vector)) or 1.0
    return [value / norm for value in vector]


def _cosine(left: List[float], right: List[float]) -> float:
    return sum(a * b for a, b in zip(left, right))


class RAGService:
    def __init__(self) -> None:
        self.store_path = Path(settings.RAG_STORE_PATH)
        self.documents_dir = Path(settings.RAG_DOCUMENTS_DIR)
        self.store_path.parent.mkdir(parents=True, exist_ok=True)
        self.documents_dir.mkdir(parents=True, exist_ok=True)
        self._chunks: List[Dict[str, Any]] = self._load()

    def _load(self) -> List[Dict[str, Any]]:
        if not self.store_path.exists():
            return []
        try:
            data = json.loads(self.store_path.read_text(encoding="utf-8"))
            return data if isinstance(data, list) else []
        except (OSError, json.JSONDecodeError):
            return []

    def _save(self) -> None:
        temporary = self.store_path.with_name(f"{self.store_path.name}.{uuid.uuid4().hex}.tmp")
        temporary.write_text(json.dumps(self._chunks, ensure_ascii=False), encoding="utf-8")
        temporary.replace(self.store_path)

    @staticmethod
    def _split_text(text: str, size: int, overlap: int) -> Iterable[str]:
        normalized = re.sub(r"\s+", " ", text).strip()
        if not normalized:
            return
        start = 0
        while start < len(normalized):
            end = min(len(normalized), start + size)
            if end < len(normalized):
                boundary = normalized.rfind(" ", start, end)
                if boundary > start + size // 2:
                    end = boundary
            yield normalized[start:end].strip()
            if end >= len(normalized):
                break
            start = max(end - overlap, start + 1)

    @staticmethod
    def _extract_clause(text: str) -> Optional[str]:
        match = re.search(r"\b(?:clause|cl\.?|section)\s*([0-9]+(?:\.[0-9]+)*)", text, re.I)
        return match.group(1) if match else None

    def _embed(self, texts: List[str]) -> List[List[float]]:
        if not settings.AI_API_KEY:
            return [_local_embedding(text, settings.AI_EMBEDDING_DIMENSIONS) for text in texts]
        try:
            response = httpx.post(
                f"{settings.AI_API_BASE_URL.rstrip('/')}/embeddings",
                headers={"Authorization": f"Bearer {settings.AI_API_KEY}"},
                json={"model": settings.AI_EMBEDDING_MODEL, "input": texts},
                timeout=60,
            )
            response.raise_for_status()
            data = sorted(response.json()["data"], key=lambda item: item.get("index", 0))
            return [item["embedding"] for item in data]
        except (httpx.HTTPError, KeyError, TypeError, ValueError):
            return [_local_embedding(text, settings.AI_EMBEDDING_DIMENSIONS) for text in texts]

    def ingest_text(
        self,
        text: str,
        source_name: str,
        source_url: Optional[str] = None,
        document_type: str = "BIS/Gazette",
    ) -> int:
        chunks = list(self._split_text(text, settings.RAG_CHUNK_SIZE, settings.RAG_CHUNK_OVERLAP))
        if not chunks:
            return 0
        embeddings = self._embed(chunks)
        self._chunks = [chunk for chunk in self._chunks if chunk["sourceName"] != source_name]
        for index, (chunk_text, embedding) in enumerate(zip(chunks, embeddings), start=1):
            citation_id = f"{hashlib.sha1(f'{source_name}:{index}'.encode()).hexdigest()[:12]}"
            self._chunks.append({
                "id": citation_id,
                "text": chunk_text,
                "embedding": embedding,
                "sourceName": source_name,
                "sourceUrl": source_url,
                "documentType": document_type,
                "chunk": index,
                "clause": self._extract_clause(chunk_text),
            })
        self._save()
        return len(chunks)

    def ingest_file(self, path: Path, source_url: Optional[str] = None) -> int:
        if path.suffix.lower() == ".pdf":
            if PdfReader is None:
                raise RuntimeError("PDF ingestion requires pypdf; install backend/requirements.txt")
            reader = PdfReader(str(path))
            pages = []
            for page_number, page in enumerate(reader.pages, start=1):
                pages.append(f"[Page {page_number}]\n{page.extract_text() or ''}")
            text = "\n\n".join(pages)
        else:
            text = path.read_text(encoding="utf-8", errors="ignore")
        return self.ingest_text(text, path.name, source_url)

    def ingest_url(self, url: str) -> int:
        response = httpx.get(url, timeout=90, follow_redirects=True)
        response.raise_for_status()
        content_type = response.headers.get("content-type", "").lower()
        if "pdf" in content_type or url.lower().split("?", 1)[0].endswith(".pdf"):
            if PdfReader is None:
                raise RuntimeError("PDF ingestion requires pypdf; install backend/requirements.txt")
            reader = PdfReader(io.BytesIO(response.content))
            text = "\n\n".join(
                f"[Page {page_number}]\n{page.extract_text() or ''}"
                for page_number, page in enumerate(reader.pages, start=1)
            )
        else:
            text = response.text
        source_name = url.rstrip("/").rsplit("/", 1)[-1] or url
        return self.ingest_text(text, source_name, url)

    def ingest_directory(self) -> int:
        total = 0
        for path in sorted(self.documents_dir.iterdir()):
            if path.suffix.lower() in {".pdf", ".txt", ".md"}:
                total += self.ingest_file(path)
        return total

    def retrieve(self, query: str, top_k: Optional[int] = None) -> List[Dict[str, Any]]:
        if not self._chunks:
            self.ingest_directory()
        if not self._chunks:
            return []
        query_vector = self._embed([query])[0]
        requested_codes = set(_requested_standard_numbers(query))
        exact_code_chunks = [
            chunk for chunk in self._chunks
            if requested_codes.intersection(_chunk_standard_numbers(chunk["text"]))
        ]
        # Never answer an exact standard-number question with a merely similar code
        # such as IS 17017 when the requested IS 1701 is not indexed.
        candidates = exact_code_chunks if requested_codes and exact_code_chunks else (
            [] if requested_codes else self._chunks
        )
        if not candidates:
            return []
        ranked = sorted(
            candidates,
            key=lambda chunk: _cosine(query_vector, chunk["embedding"])
            + (2.0 if requested_codes.intersection(_chunk_standard_numbers(chunk["text"])) else 0.0),
            reverse=True,
        )
        return ranked[: top_k or settings.RAG_TOP_K]

    @property
    def chunk_count(self) -> int:
        return len(self._chunks)


rag_service = RAGService()
