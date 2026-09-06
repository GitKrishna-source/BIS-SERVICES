from typing import Optional, Dict, Any, List
from fastapi import APIRouter, Depends, HTTPException, status

from app.services.ai_service import ai_service
from app.core.dependencies import get_optional_user
from app.schemas.ai import AIChatRequest, AISessionResponse

router = APIRouter()


@router.post("/query", response_model=AISessionResponse)
async def query_regulatory_assistant(
    request: AIChatRequest,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)
):
    """
    Intelligent Regulatory Assistant (RAG Pipeline).
    Takes a natural language question about Indian Standards, applies domain-specific grounding,
    and returns authoritative clauses, telemetry graphs, and statutory next steps.
    """
    if not request.query or len(request.query.strip()) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query string cannot be empty."
        )

    return await ai_service.generate_response(request, current_user)


@router.post("/chat", response_model=AISessionResponse)
async def chat_regulatory_assistant(
    request: AIChatRequest,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)
):
    """
    Alias for /query endpoint for conversational interfaces.
    """
    return await query_regulatory_assistant(request, current_user)


@router.get("/prompts")
def get_sample_prompts():
    """
    Retrieve curated regulatory prompts for quick exploration and testing.
    """
    prompts = [
        {
            "id": "flask",
            "title": "Stainless Steel Vacuum Flasks",
            "query": "What standard applies to stainless steel vacuum flasks and what are the mandatory testing clauses?",
            "category": "Consumer Goods"
        },
        {
            "id": "ev-battery",
            "title": "EV Lithium-Ion Battery Packs",
            "query": "What are the fire safety and thermal runaway requirements for electric vehicle battery packs?",
            "category": "Automotive & EV"
        },
        {
            "id": "toys",
            "title": "Safety Requirements for Toys",
            "query": "What are the mandatory mechanical, physical, and chemical migration limits for children toys?",
            "category": "Consumer Goods"
        },
        {
            "id": "gold-hallmark",
            "title": "Gold Hallmarking & HUID",
            "query": "What are the mandatory hallmarking requirements and purity tolerances for 22K and 18K gold jewelry?",
            "category": "Precious Metals"
        },
        {
            "id": "solar-pv",
            "title": "Solar Photovoltaic Modules",
            "query": "What are the statutory design qualification and safety requirements for terrestrial crystalline solar PV modules?",
            "category": "Renewable Energy"
        }
    ]
    return {
        "success": True,
        "data": prompts
    }
