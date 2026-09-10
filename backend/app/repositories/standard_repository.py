from typing import List, Optional, Tuple, Dict, Any
from app.repositories.standards_data import ALL_STANDARDS

INITIAL_STANDARDS: List[Dict[str, Any]] = ALL_STANDARDS



class InMemoryStandardRepository:
    """
    In-memory data repository for Indian Standards.
    Provides standard database interface: find, find_by_id, list_categories.
    """
    def __init__(self):
        self._standards: List[Dict[str, Any]] = [dict(s) for s in INITIAL_STANDARDS]

    def list_all(self) -> List[Dict[str, Any]]:
        return list(self._standards)

    def search(
        self,
        query: str = "",
        category: str = "all",
        qco_only: bool = False,
        page: int = 1,
        limit: int = 10,
        sort_by: str = "relevance"
    ) -> Tuple[List[Dict[str, Any]], int]:
        results = list(self._standards)

        # 1. Text Query Filter
        if query and query.strip():
            q = query.strip().lower()
            results = [
                s for s in results
                if (
                    q in s.get("code", "").lower() or
                    q in s.get("title", "").lower() or
                    q in s.get("description", "").lower() or
                    q in s.get("category", "").lower() or
                    q in s.get("ics", "").lower()
                )
            ]

        # 2. Category Filter
        if category and category.lower() != "all":
            cat_lower = category.lower()
            results = [
                s for s in results
                if cat_lower in s.get("category", "").lower()
            ]

        # 3. Mandatory QCO Filter
        if qco_only:
            results = [s for s in results if s.get("statusType") == "mandatory"]

        # 4. Sorting
        if sort_by == "latestRevision":
            results.sort(key=lambda s: s.get("enforcedDate", ""), reverse=True)
        elif sort_by == "mandatoryFirst":
            results.sort(key=lambda s: 1 if s.get("statusType") == "mandatory" else 0, reverse=True)

        total = len(results)

        # 5. Pagination
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_data = results[start_idx:end_idx]

        return paginated_data, total

    def get_by_id(self, standard_id_or_code: str) -> Optional[Dict[str, Any]]:
        target = standard_id_or_code.strip().lower()
        for s in self._standards:
            if s.get("id", "").lower() == target or s.get("code", "").lower() == target:
                return s
        return None

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
            {"id": "medical", "label": "Medical Devices"}
        ]


standard_repository = InMemoryStandardRepository()
