import psycopg

from app.core.config import settings


def get_connection():
    """Create and return a PostgreSQL database connection."""
    return psycopg.connect(
        dbname=settings.DATABASE_NAME,
        user=settings.DATABASE_USER,
        password=settings.DATABASE_PASSWORD,
        host=settings.DATABASE_HOST,
        port=settings.DATABASE_PORT,
    )