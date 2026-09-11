from getpass import getpass

import psycopg

from app.repositories.lab_repository import INITIAL_LABS


DATABASE_NAME = "bisync"
DATABASE_USER = "postgres"
DATABASE_HOST = "localhost"
DATABASE_PORT = 5432


def migrate():
    password = getpass("PostgreSQL password: ")

    connection_string = (
        f"dbname={DATABASE_NAME} "
        f"user={DATABASE_USER} "
        f"host={DATABASE_HOST} "
        f"port={DATABASE_PORT}"
    )

    print(f"Preparing to migrate {len(INITIAL_LABS)} laboratories...")

    with psycopg.connect(
        connection_string,
        password=password,
    ) as conn:

        with conn.cursor() as cursor:

            for lab in INITIAL_LABS:

                # Insert or update laboratory information.
                cursor.execute(
                    """
                    INSERT INTO laboratories (
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
                    )
                    VALUES (
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s
                    )
                    ON CONFLICT (id)
                    DO UPDATE SET
                        name = EXCLUDED.name,
                        city = EXCLUDED.city,
                        state = EXCLUDED.state,
                        pincode = EXCLUDED.pincode,
                        accreditation = EXCLUDED.accreditation,
                        contact = EXCLUDED.contact,
                        email = EXCLUDED.email,
                        turnaround_days = EXCLUDED.turnaround_days,
                        rating = EXCLUDED.rating,
                        status = EXCLUDED.status,
                        image = EXCLUDED.image;
                    """,
                    (
                        lab["id"],
                        lab["name"],
                        lab.get("city"),
                        lab.get("state"),
                        lab.get("pincode"),
                        lab.get("accreditation"),
                        lab.get("contact"),
                        lab.get("email"),
                        lab.get("turnaroundDays"),
                        lab.get("rating"),
                        lab.get("status"),
                        lab.get("image"),
                    ),
                )

                # Replace the standard scope for this laboratory.
                cursor.execute(
                    """
                    DELETE FROM laboratory_standards
                    WHERE laboratory_id = %s;
                    """,
                    (lab["id"],),
                )

                for standard_code in lab.get("standards", []):
                    cursor.execute(
                        """
                        INSERT INTO laboratory_standards (
                            laboratory_id,
                            standard_code
                        )
                        VALUES (%s, %s);
                        """,
                        (
                            lab["id"],
                            standard_code,
                        ),
                    )

        print("Laboratory migration completed successfully.")


if __name__ == "__main__":
    migrate()