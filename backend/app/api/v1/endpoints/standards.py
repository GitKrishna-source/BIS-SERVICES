from typing import Optional, List, Dict, Any
from fastapi import APIRouter, Query, HTTPException, status

from app.services.standard_service import standard_service
from app.schemas.standard import StandardSchema, StandardSearchResponse, ClauseSchema

router = APIRouter()


@router.get("/search", response_model=StandardSearchResponse)
def search_standards(
    q: Optional[str] = Query(None, description="Search query across code, title, category, description"),
    query: Optional[str] = Query(None, description="Alias for q"),
    category: str = Query("all", description="Category filter (e.g. 'all', 'Consumer Goods', 'Electronics')"),
    qcoOnly: Optional[bool] = Query(None, description="Filter for mandatory QCO standards only"),
    qco_only: Optional[bool] = Query(None, description="Snake_case alias for qcoOnly"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("relevance", description="Sorting field: relevance, code, date, labs")
):
    """
    Search and filter Indian Standards (IS) with full-text search, categories, and QCO status.
    """
    search_term = q if q is not None else (query or "")
    is_qco_only = qcoOnly if qcoOnly is not None else bool(qco_only)

    return standard_service.search_standards(
        query=search_term,
        category=category,
        qco_only=is_qco_only,
        page=page,
        limit=limit,
        sort_by=sort_by
    )


@router.get("", response_model=StandardSearchResponse)
def list_standards(
    q: Optional[str] = Query(None, description="Search query"),
    query: Optional[str] = Query(None, description="Alias for q"),
    category: str = Query("all", description="Category filter"),
    qcoOnly: Optional[bool] = Query(None, description="Filter for mandatory QCO standards only"),
    qco_only: Optional[bool] = Query(None, description="Snake_case alias for qcoOnly"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    sort_by: str = Query("relevance", description="Sorting field")
):
    """
    List standards with optional query and filtering.
    """
    return search_standards(
        q=q,
        query=query,
        category=category,
        qcoOnly=qcoOnly,
        qco_only=qco_only,
        page=page,
        limit=limit,
        sort_by=sort_by
    )


@router.get("/categories")
def get_standard_categories():
    """
    Retrieve all product and industry categories with associated standard counts.
    """
    categories = standard_service.get_categories()
    return {
        "success": True,
        "data": categories,
        "total": len(categories)
    }


@router.get("/{standard_id}", response_model=Dict[str, Any])
def get_standard_detail(standard_id: str):
    """
    Get comprehensive details, metadata, and technical clauses of a single Indian Standard by ID or IS Code.
    """
    standard = standard_service.get_standard_by_id(standard_id)
    if not standard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Standard with ID or Code '{standard_id}' not found."
        )

    return {
        "success": True,
        "data": standard.model_dump()
    }


@router.get("/{standard_id}/clauses", response_model=Dict[str, Any])
def get_standard_clauses(standard_id: str):
    """
    Get the list of technical test clauses and statutory specifications for a given standard.
    """
    standard = standard_service.get_standard_by_id(standard_id)
    if not standard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Standard with ID or Code '{standard_id}' not found."
        )

    return {
        "success": True,
        "standard_id": standard.id,
        "standard_code": standard.code,
        "data": [c.model_dump() for c in standard.clauses]
    }


@router.get("/{standard_id}/telemetry", response_model=Dict[str, Any])
def get_standard_telemetry(standard_id: str):
    """
    Get testing specifications, turnaround time metrics, and thermal/mechanical test curves.
    """
    standard = standard_service.get_standard_by_id(standard_id)
    if not standard:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Standard with ID or Code '{standard_id}' not found."
        )

    telemetry = {
        "standardId": standard.id,
        "standardCode": standard.code,
        "riskLevel": "LOW" if standard.statusType == "mandatory" else "MODERATE",
        "turnaroundDays": standard.labsCount or 14,
        "testingScheme": standard.certificationScheme,
        "testCurve": [
            {"label": "0h (Initial)", "value": 98.0, "unit": "°C"},
            {"label": "2h", "value": 86.4, "unit": "°C"},
            {"label": "4h", "value": 73.1, "unit": "°C"},
            {"label": "6h (Final Spec)", "value": 64.2, "unit": "°C"}
        ]
    }

    return {
        "success": True,
        "data": telemetry
    }
