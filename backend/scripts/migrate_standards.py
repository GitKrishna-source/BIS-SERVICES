from datetime import datetime
from getpass import getpass

import psycopg

from app.repositories.standards_data import ALL_STANDARDS


DATABASE_NAME = "bisync"
DATABASE_USER = "postgres"
DATABASE_HOST = "localhost"
DATABASE_PORT = 5432


def parse_date(value):
    """Convert BISync's date string into a PostgreSQL-compatible date."""
    if not value:
        return None

    return datetime.strptime(value, "%d %b %Y").date()


def migrate():
    password = getpass("PostgreSQL password: ")

    connection_string = (
        f"dbname={DATABASE_NAME} "
        f"user={DATABASE_USER} "
        f"host={DATABASE_HOST} "
        f"port={DATABASE_PORT}"
    )

    print(f"Preparing to migrate {len(ALL_STANDARDS)} standards...")

    # Check that no standard code belongs to a different ID
    # already present in the database.
    with psycopg.connect(
        connection_string,
        password=password,
    ) as check_conn:
        with check_conn.cursor() as check_cursor:
            for standard in ALL_STANDARDS:
                check_cursor.execute(
                    """
                    SELECT id
                    FROM standards
                    WHERE code = %s AND id <> %s;
                    """,
                    (standard["code"], standard["id"]),
                )

                conflict = check_cursor.fetchone()

                if conflict:
                    raise RuntimeError(
                        f"Code conflict: {standard['code']} already belongs "
                        f"to ID {conflict[0]}, but incoming data uses ID "
                        f"{standard['id']}."
                    )

    with psycopg.connect(
        connection_string,
        password=password,
    ) as conn:

        with conn.cursor() as cursor:

            # ---------------------------------------------------------
            # 1. Insert/update standards
            # ---------------------------------------------------------
            for standard in ALL_STANDARDS:
                cursor.execute(
                    """
                    INSERT INTO standards (
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
                    )
                    VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s, %s
                    )
                    ON CONFLICT (id)
                    DO UPDATE SET
                        code = EXCLUDED.code,
                        title = EXCLUDED.title,
                        description = EXCLUDED.description,
                        status = EXCLUDED.status,
                        status_type = EXCLUDED.status_type,
                        ics = EXCLUDED.ics,
                        enforced_date = EXCLUDED.enforced_date,
                        ministry = EXCLUDED.ministry,
                        pages = EXCLUDED.pages,
                        pdf_url = EXCLUDED.pdf_url,
                        verified = EXCLUDED.verified,
                        category = EXCLUDED.category,
                        labs_count = EXCLUDED.labs_count,
                        certification_scheme = EXCLUDED.certification_scheme;
                    """,
                    (
                        standard["id"],
                        standard["code"],
                        standard["title"],
                        standard.get("description"),
                        standard.get("status"),
                        standard.get("statusType"),
                        standard.get("ics"),
                        parse_date(standard.get("enforcedDate")),
                        standard.get("ministry"),
                        standard.get("pages"),
                        standard.get("pdfUrl"),
                        standard.get("verified", False),
                        standard.get("category"),
                        standard.get("labsCount"),
                        standard.get("certificationScheme"),
                    ),
                )

            # ---------------------------------------------------------
            # 2. Replace clauses for each standard
            # ---------------------------------------------------------
            for standard in ALL_STANDARDS:

                # Remove the existing clauses for this standard.
                # This makes the migration safely repeatable.
                cursor.execute(
                    """
                    DELETE FROM standard_clauses
                    WHERE standard_id = %s;
                    """,
                    (standard["id"],),
                )

                # Insert the current clauses from the Python dataset.
                for clause in standard.get("clauses", []):
                    cursor.execute(
                        """
                        INSERT INTO standard_clauses (
                            standard_id,
                            number,
                            title,
                            tag,
                            description
                        )
                        VALUES (%s, %s, %s, %s, %s);
                        """,
                        (
                            standard["id"],
                            clause.get("number"),
                            clause.get("title"),
                            clause.get("tag"),
                            clause.get("description"),
                        ),
                    )

        # If anything above fails, the transaction is rolled back.
        # If everything succeeds, it is committed automatically.
        print("Migration completed successfully.")


if __name__ == "__main__":
    migrate()