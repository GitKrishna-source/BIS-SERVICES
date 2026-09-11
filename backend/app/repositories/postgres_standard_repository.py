from typing import List, Optional, Tuple, Dict, Any

from app.core.database import get_connection


class PostgreSQLStandardRepository:
    """
    PostgreSQL repository for Indian Standards.

    Mirrors the existing in-memory repository while keeping
    the existing API data structure unchanged.
    """

    def list_all(self) -> List[Dict[str, Any]]:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        code,
                        title,
                        description,
                        status,
                        status_type,
                        ics,
                        enforced_date,
                        ministry,
                        pages,
                        pdf_url,
                        verified,
                        category,
                        labs_count,
                        certification_scheme
                    FROM standards
                    ORDER BY id;
                    """
                )

                rows = cursor.fetchall()

                standards = [self._row_to_dict(row) for row in rows]
                self._attach_clauses(conn, standards)

        return standards

    def search(
        self,
        query: str = "",
        category: str = "all",
        qco_only: bool = False,
        page: int = 1,
        limit: int = 10,
        sort_by: str = "relevance",
    ) -> Tuple[List[Dict[str, Any]], int]:

        conditions = []
        params = []

        # Text search
        if query and query.strip():
            search_query = f"%{query.strip()}%"

            conditions.append(
                """
                (
                    code ILIKE %s OR
                    title ILIKE %s OR
                    description ILIKE %s OR
                    category ILIKE %s OR
                    ics ILIKE %s
                )
                """
            )

            params.extend([search_query] * 5)

        # Category filter
        if category and category.lower() != "all":
            conditions.append("category ILIKE %s")
            params.append(f"%{category.strip()}%")

        # Mandatory QCO filter
        if qco_only:
            conditions.append("status_type = %s")
            params.append("mandatory")

        where_clause = ""

        if conditions:
            where_clause = "WHERE " + " AND ".join(conditions)

        # Sorting
        if sort_by == "latestRevision":
            order_clause = "ORDER BY enforced_date DESC NULLS LAST"

        elif sort_by == "mandatoryFirst":
            order_clause = """
                ORDER BY
                    CASE
                        WHEN status_type = 'mandatory' THEN 1
                        ELSE 0
                    END DESC,
                    id
            """

        else:
            order_clause = "ORDER BY id"

        with get_connection() as conn:
            with conn.cursor() as cursor:

                # Count matching records
                cursor.execute(
                    f"""
                    SELECT COUNT(*)
                    FROM standards
                    {where_clause};
                    """,
                    params,
                )

                total = cursor.fetchone()[0]

                # Pagination
                offset = (page - 1) * limit

                cursor.execute(
                    f"""
                    SELECT
                        id,
                        code,
                        title,
                        description,
                        status,
                        status_type,
                        ics,
                        enforced_date,
                        ministry,
                        pages,
                        pdf_url,
                        verified,
                        category,
                        labs_count,
                        certification_scheme
                    FROM standards
                    {where_clause}
                    {order_clause}
                    LIMIT %s OFFSET %s;
                    """,
                    params + [limit, offset],
                )

                rows = cursor.fetchall()

                standards = [self._row_to_dict(row) for row in rows]
                self._attach_clauses(conn, standards)

        return standards, total

    def get_by_id(
        self,
        standard_id_or_code: str,
    ) -> Optional[Dict[str, Any]]:

        target = standard_id_or_code.strip()

        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        code,
                        title,
                        description,
                        status,
                        status_type,
                        ics,
                        enforced_date,
                        ministry,
                        pages,
                        pdf_url,
                        verified,
                        category,
                        labs_count,
                        certification_scheme
                    FROM standards
                    WHERE LOWER(id) = LOWER(%s)
                       OR LOWER(code) = LOWER(%s)
                    LIMIT 1;
                    """,
                    (target, target),
                )

                row = cursor.fetchone()

                if row is None:
                    return None

                standard = self._row_to_dict(row)

                self._attach_clauses(conn, [standard])

        return standard

    def get_categories(self) -> List[Dict[str, Any]]:
        return [
            {"id": "all", "label": "All Standards"},
            {"id": "qco", "label": "Mandatory QCO", "isQcoFlag": True},
            {"id": "electronics", "label": "Electronics & IT"},
            {"id": "building", "label": "Building Materials"},
            {"id": "metallurgy", "label": "Metallurgy & Steel"},
            {"id": "consumer", "label": "Consumer Products"},
            {"id": "electrical", "label": "Electrical & Power"},
            {"id": "automotive", "label": "Automotive & Safety"},
            {"id": "renewables", "label": "Renewables & Energy Storage"},
            {"id": "polymers", "label": "Chemicals & Polymers"},
            {"id": "food", "label": "Food & Agri"},
            {"id": "medical", "label": "Medical Devices"},
        ]

    @staticmethod
    def _row_to_dict(row) -> Dict[str, Any]:
        """
        Convert a PostgreSQL standards row into the dictionary format
        expected by the existing service/API layer.
        """
        return {
            "id": row[0],
            "code": row[1],
            "title": row[2],
            "description": row[3],
            "status": row[4],
            "statusType": row[5],
            "ics": row[6],
            "enforcedDate": (
                row[7].strftime("%d %b %Y")
                if row[7] is not None
                else None
            ),
            "ministry": row[8],
            "pages": row[9],
            "pdfUrl": row[10],
            "verified": row[11],
            "category": row[12],
            "labsCount": row[13],
            "certificationScheme": row[14],
        }

    @staticmethod
    def _attach_clauses(
        conn,
        standards: List[Dict[str, Any]],
    ) -> None:
        """
        Attach clauses to the supplied standards.

        This preserves the existing StandardSchema/API contract.
        """

        if not standards:
            return

        standard_ids = [standard["id"] for standard in standards]

        placeholders = ", ".join(
            ["%s"] * len(standard_ids)
        )

        with conn.cursor() as cursor:
            cursor.execute(
                f"""
                SELECT
                    standard_id,
                    number,
                    title,
                    tag,
                    description
                FROM standard_clauses
                WHERE standard_id IN ({placeholders})
                ORDER BY id;
                """,
                standard_ids,
            )

            rows = cursor.fetchall()

        clauses_by_standard = {
            standard_id: []
            for standard_id in standard_ids
        }

        for (
            standard_id,
            number,
            title,
            tag,
            description,
        ) in rows:
            clauses_by_standard[standard_id].append(
                {
                    "number": number,
                    "title": title,
                    "tag": tag,
                    "description": description,
                }
            )

        for standard in standards:
            standard["clauses"] = clauses_by_standard.get(
                standard["id"],
                [],
            )


postgres_standard_repository = PostgreSQLStandardRepository()