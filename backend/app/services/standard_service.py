from typing import List, Dict, Any, Optional
import math
from app.repositories.standard_repository import standard_repository
from app.schemas.standard import StandardSchema, StandardSearchResponse


class StandardService:
    def __init__(self, repository=standard_repository):
        self.repo = repository

    def search_standards(
        self,
        query: str = "",
        category: str = "all",
        qco_only: bool = False,
        page: int = 1,
        limit: int = 10,
        sort_by: str = "relevance"
    ) -> StandardSearchResponse:
        page = max(1, page)
        limit = max(1, min(100, limit))

        data, total = self.repo.search(
            query=query,
            category=category,
            qco_only=qco_only,
            page=page,
            limit=limit,
            sort_by=sort_by
        )

        total_pages = max(1, math.ceil(total / limit)) if total > 0 else 1

        return StandardSearchResponse(
            success=True,
            data=[StandardSchema(**item) for item in data],
            total=total,
            page=page,
            totalPages=total_pages
        )

    def get_standard_by_id(self, standard_id: str) -> Optional[StandardSchema]:
        item = self.repo.get_by_id(standard_id)
        if item:
            return StandardSchema(**item)
        return None

    def get_categories(self) -> List[Dict[str, Any]]:
        return self.repo.get_categories()


standard_service = StandardService()
