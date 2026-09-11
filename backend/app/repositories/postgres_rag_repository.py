from typing import List, Dict, Any, Optional

from psycopg.types.json import Jsonb

from app.core.database import get_connection


class PostgreSQLRAGRepository:

    def create_document(
        self,
        title: str,
        source_url: Optional[str] = None,
        document_type: Optional[str] = None,
        version: Optional[str] = None,
        published_date: Optional[str] = None,
    ) -> int:

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO documents (
                        title,
                        source_url,
                        document_type,
                        version,
                        published_date
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    (
                        title,
                        source_url,
                        document_type,
                        version,
                        published_date,
                    ),
                )

                return cursor.fetchone()[0]

    def delete_document_by_title(self, title: str) -> None:

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    DELETE FROM documents
                    WHERE title = %s;
                    """,
                    (title,),
                )

    def create_chunk(
        self,
        document_id: int,
        chunk_index: int,
        content: str,
        page_number: Optional[int] = None,
        clause_number: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None,
        embedding: Optional[List[float]] = None,
    ) -> int:

        # Convert Python list into pgvector format
        embedding_value = None

        if embedding is not None:
            embedding_value = (
                "["
                + ",".join(str(float(value)) for value in embedding)
                + "]"
            )

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    INSERT INTO document_chunks (
                        document_id,
                        chunk_index,
                        content,
                        page_number,
                        clause_number,
                        metadata,
                        embedding
                    )
                    VALUES (
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s::vector
                    )
                    RETURNING id;
                    """,
                    (
                        document_id,
                        chunk_index,
                        content,
                        page_number,
                        clause_number,
                        Jsonb(metadata or {}),
                        embedding_value,
                    ),
                )

                return cursor.fetchone()[0]

    def get_document(
        self,
        document_id: int
    ) -> Optional[Dict[str, Any]]:

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        title,
                        source_url,
                        document_type,
                        version,
                        published_date,
                        created_at
                    FROM documents
                    WHERE id = %s;
                    """,
                    (document_id,),
                )

                row = cursor.fetchone()

        if not row:
            return None

        return {
            "id": row[0],
            "title": row[1],
            "source_url": row[2],
            "document_type": row[3],
            "version": row[4],
            "published_date": row[5],
            "created_at": row[6],
        }

    def similarity_search(
        self,
        embedding: List[float],
        limit: int = 6,
    ) -> List[Dict[str, Any]]:

        embedding_value = (
            "["
            + ",".join(str(float(value)) for value in embedding)
            + "]"
        )

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        dc.id,
                        dc.document_id,
                        d.title,
                        d.source_url,
                        d.document_type,
                        d.version,
                        dc.chunk_index,
                        dc.content,
                        dc.page_number,
                        dc.clause_number,
                        dc.metadata,
                        1 - (
                            dc.embedding <=> %s::vector
                        ) AS similarity
                    FROM document_chunks dc
                    JOIN documents d
                        ON d.id = dc.document_id
                    WHERE dc.embedding IS NOT NULL
                    ORDER BY dc.embedding <=> %s::vector
                    LIMIT %s;
                    """,
                    (
                        embedding_value,
                        embedding_value,
                        limit,
                    ),
                )

                rows = cursor.fetchall()

        return [
            {
                "id": row[0],
                "document_id": row[1],
                "title": row[2],
                "source_url": row[3],
                "document_type": row[4],
                "version": row[5],
                "chunk_index": row[6],
                "content": row[7],
                "page_number": row[8],
                "clause_number": row[9],
                "metadata": row[10],
                "similarity": float(row[11]),
            }
            for row in rows
        ]

    def chunk_count(self) -> int:

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT COUNT(*)
                    FROM document_chunks;
                    """
                )

                return cursor.fetchone()[0]


postgres_rag_repository = PostgreSQLRAGRepository()