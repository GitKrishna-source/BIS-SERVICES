from typing import Optional

from app.repositories.postgres_lab_repository import (
    postgres_lab_repository,
)
from app.schemas.lab import LabListResponse, LabSchema


class LabService:

    def __init__(self, repository=postgres_lab_repository):
        self.repo = repository

    def get_labs(
        self,
        standard: Optional[str] = None,
        pincode: Optional[str] = None,
        state: Optional[str] = None,
        query: Optional[str] = None,
    ) -> LabListResponse:

        labs = self.repo.filter_labs(
            standard=standard,
            pincode=pincode,
            state=state,
            query=query,
        )

        return LabListResponse(
            success=True,
            data=[LabSchema(**lab) for lab in labs],
            total=len(labs),
        )

    def get_lab_by_id(
        self,
        lab_id: str
    ) -> Optional[LabSchema]:

        lab = self.repo.get_by_id(lab_id)

        if not lab:
            return None

        return LabSchema(**lab)


lab_service = LabService()