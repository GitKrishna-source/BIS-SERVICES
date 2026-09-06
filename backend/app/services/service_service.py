from typing import List, Optional
from app.repositories.service_repository import service_repository
from app.schemas.service import ServiceModuleSchema, HuidVerifyResponse, HuidVerificationData


class ServiceService:
    def __init__(self, repository=service_repository):
        self.repo = repository

    def list_services(self) -> List[ServiceModuleSchema]:
        data = self.repo.list_all()
        return [ServiceModuleSchema(**item) for item in data]

    def get_service_by_id(self, service_id: str) -> Optional[ServiceModuleSchema]:
        item = self.repo.get_by_id(service_id)
        if item:
            return ServiceModuleSchema(**item)
        return None

    def verify_huid(self, code: str) -> HuidVerifyResponse:
        result = self.repo.verify_huid(code)
        return HuidVerifyResponse(
            success=True,
            data=HuidVerificationData(**result)
        )


service_service = ServiceService()
