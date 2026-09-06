"""
Repository Layer: In-Memory Data Stores for Development
Note: Designed to be seamlessly replaced with SQLAlchemy / PostgreSQL models in production.
"""
from app.repositories.standard_repository import standard_repository
from app.repositories.lab_repository import lab_repository
from app.repositories.service_repository import service_repository
from app.repositories.user_repository import user_repository

__all__ = [
    "standard_repository",
    "lab_repository",
    "service_repository",
    "user_repository"
]
