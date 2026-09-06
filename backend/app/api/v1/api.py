from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    standards,
    labs,
    services,
    rag,
    feedback
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & Security"])
api_router.include_router(standards.router, prefix="/standards", tags=["Indian Standards (IS) Directory"])
api_router.include_router(labs.router, prefix="/labs", tags=["Accredited Testing Laboratories"])
api_router.include_router(services.router, prefix="/services", tags=["BIS Digital Services & HUID"])
api_router.include_router(rag.router, prefix="/rag", tags=["AI Regulatory Reasoning (RAG)"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["Public Consultation & Feedback"])
