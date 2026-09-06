from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, status

from app.services.service_service import service_service
from app.schemas.service import ServiceModuleSchema, HuidVerifyRequest, HuidVerifyResponse

router = APIRouter()


@router.get("", response_model=Dict[str, Any])
def list_bis_services():
    """
    List all Bureau of Indian Standards core digital service modules.
    """
    services = service_service.list_services()
    return {
        "success": True,
        "data": [s.model_dump() for s in services],
        "total": len(services)
    }


@router.get("/{service_id}", response_model=Dict[str, Any])
def get_bis_service_detail(service_id: str):
    """
    Get detailed module architecture and direct operational portal links for a BIS digital service.
    """
    service = service_service.get_service_by_id(service_id)
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service module '{service_id}' not found."
        )

    return {
        "success": True,
        "data": service.model_dump()
    }


@router.post("/verify-huid", response_model=HuidVerifyResponse)
def verify_gold_hallmark_huid(request: HuidVerifyRequest):
    """
    Verify 6-character alphanumeric Hallmarking Unique Identification (HUID) code against BIS statutory registry.
    """
    code = request.code.strip().upper()
    if len(code) != 6 or not code.isalnum():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="HUID must be exactly 6 alphanumeric characters (e.g. AB9124, 7H8821)."
        )

    return service_service.verify_huid(code)
