from typing import List, Optional
from app.repositories.lab_repository import lab_repository
from app.schemas.lab import LabSchema, LabListResponse


class LabService:
    def __init__(self, repository=lab_repository):
        self.repo = repository

    def get_labs(
        self,
        standard: str = "",
        pincode: str = "",
        state: str = "",
        query: str = ""
    ) -> LabListResponse:
        data = self.repo.filter_labs(
            standard=standard,
            pincode=pincode,
            state=state,
            query=query
        )
        return LabListResponse(
            success=True,
            data=[LabSchema(**item) for item in data],
            total=len(data)
        )

    def get_lab_by_id(self, lab_id: str) -> Optional[LabSchema]:
        item = self.repo.get_by_id(lab_id)
        if item:
            return LabSchema(**item)
        return None


lab_service = LabService()
