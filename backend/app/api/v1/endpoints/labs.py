from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Query, HTTPException, status

from app.services.lab_service import lab_service
from app.schemas.lab import LabSchema, LabListResponse
from app.repositories.lab_repository import lab_repository

router = APIRouter()


@router.get("", response_model=LabListResponse)
def list_and_filter_labs(
    standard: Optional[str] = Query(None, description="Standard code filter (e.g. IS 17803:2022)"),
    pincode: Optional[str] = Query(None, description="Postal PIN code (e.g. 110020 or 560068)"),
    state: Optional[str] = Query(None, description="State name filter (e.g. Delhi, Karnataka)"),
    query: Optional[str] = Query(None, description="Search across lab name, city, and scope"),
    q: Optional[str] = Query(None, description="Alias for query")
):
    """
    Search and find accredited testing laboratories by Indian Standard, geographical state, or postal PIN code.
    """
    search_q = query if query is not None else (q or "")
    return lab_service.get_labs(
        standard=standard or "",
        pincode=pincode or "",
        state=state or "",
        query=search_q
    )


@router.get("/stats/summary")
def get_labs_summary_stats():
    """
    Get aggregate statistical metrics regarding NABL / BIS accredited laboratory infrastructure.
    """
    all_labs = lab_repository.list_all()
    unique_states = {lab["state"] for lab in all_labs}
    all_standards = set()
    for lab in all_labs:
        all_standards.update(lab.get("standards", []))

    avg_rating = sum(lab.get("rating", 4.5) for lab in all_labs) / len(all_labs) if all_labs else 4.8

    return {
        "success": True,
        "data": {
            "totalLabs": len(all_labs),
            "statesCovered": len(unique_states),
            "standardsTested": len(all_standards),
            "averageRating": round(avg_rating, 2),
            "accreditationStandards": ["ISO/IEC 17025:2017", "NABL Verified", "BIS Conformity Assessment"]
        }
    }


@router.get("/{lab_id}", response_model=Dict[str, Any])
def get_lab_detail(lab_id: str):
    """
    Get in-depth specifications and contact details for a specific testing laboratory.
    """
    lab = lab_service.get_lab_by_id(lab_id)
    if not lab:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Laboratory with ID '{lab_id}' not found."
        )

    return {
        "success": True,
        "data": lab.model_dump()
    }
