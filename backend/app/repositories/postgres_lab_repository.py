from typing import List, Dict, Any, Optional

from app.core.database import get_connection


class PostgreSQLLabRepository:

    def _row_to_dict(self, row) -> Dict[str, Any]:
        return {
            "id": row[0],
            "name": row[1],
            "city": row[2],
            "state": row[3],
            "pincode": row[4],
            "accreditation": row[5],
            "contact": row[6],
            "email": row[7],
            "turnaroundDays": row[8],
            "rating": float(row[9]) if row[9] is not None else None,
            "status": row[10],
            "image": row[11],
        }

    def _attach_standards(
        self,
        labs: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:

        if not labs:
            return labs

        lab_ids = [lab["id"] for lab in labs]

        with get_connection() as conn:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT laboratory_id, standard_code
                    FROM laboratory_standards
                    WHERE laboratory_id = ANY(%s)
                    ORDER BY laboratory_id, id;
                    """,
                    (lab_ids,),
                )

                rows = cursor.fetchall()

        standards_by_lab = {}

        for laboratory_id, standard_code in rows:
            standards_by_lab.setdefault(laboratory_id, []).append(
                standard_code
            )

        for lab in labs:
            lab["standards"] = standards_by_lab.get(lab["id"], [])

        return labs

    def list_all(self) -> List[Dict[str, Any]]:

        with get_connection() as conn:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT
                        id,
                        name,
                        city,
                        state,
                        pincode,
                        accreditation,
                        contact,
                        email,
                        turnaround_days,
                        rating,
                        status,
                        image
                    FROM laboratories
                    ORDER BY id;
                    """
                )

                rows = cursor.fetchall()

        labs = [self._row_to_dict(row) for row in rows]

        return self._attach_standards(labs)

    def filter_labs(
        self,
        standard: Optional[str] = None,
        pincode: Optional[str] = None,
        state: Optional[str] = None,
        query: Optional[str] = None,
    ) -> List[Dict[str, Any]]:

        conditions = []
        params = []

        if standard:
            conditions.append(
                """
                EXISTS (
                    SELECT 1
                    FROM laboratory_standards ls
                    WHERE ls.laboratory_id = l.id
                    AND ls.standard_code ILIKE %s
                )
                """
            )
            params.append(f"%{standard}%")

        if pincode:
            conditions.append(
                "l.pincode LIKE %s"
            )
            params.append(f"{pincode}%")

        if state:
            conditions.append(
                "l.state ILIKE %s"
            )
            params.append(f"%{state}%")

        if query:
            conditions.append(
                """
                (
                    l.name ILIKE %s
                    OR l.city ILIKE %s
                    OR l.state ILIKE %s
                )
                """
            )

            query_value = f"%{query}%"

            params.extend([
                query_value,
                query_value,
                query_value,
            ])

        where_clause = ""

        if conditions:
            where_clause = "WHERE " + " AND ".join(conditions)

        sql = f"""
            SELECT
                l.id,
                l.name,
                l.city,
                l.state,
                l.pincode,
                l.accreditation,
                l.contact,
                l.email,
                l.turnaround_days,
                l.rating,
                l.status,
                l.image
            FROM laboratories l
            {where_clause}
            ORDER BY l.id;
        """

        with get_connection() as conn:
            with conn.cursor() as cursor:

                cursor.execute(sql, params)

                rows = cursor.fetchall()

        labs = [self._row_to_dict(row) for row in rows]

        return self._attach_standards(labs)

    def get_by_id(
        self,
        lab_id: str
    ) -> Optional[Dict[str, Any]]:

        with get_connection() as conn:
            with conn.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT
                        id,
                        name,
                        city,
                        state,
                        pincode,
                        accreditation,
                        contact,
                        email,
                        turnaround_days,
                        rating,
                        status,
                        image
                    FROM laboratories
                    WHERE id = %s;
                    """,
                    (lab_id,),
                )

                row = cursor.fetchone()

        if not row:
            return None

        lab = self._row_to_dict(row)

        labs = self._attach_standards([lab])

        return labs[0]


postgres_lab_repository = PostgreSQLLabRepository()