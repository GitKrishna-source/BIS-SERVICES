import time
from datetime import datetime, timezone
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.core.config import settings
from app.api.v1.api import api_router

# Initialize FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="""
# 🇮🇳 BISync - Bureau of Indian Standards Intelligence & Compliance API

The BISync Backend provides a high-performance REST API and AI reasoning engine for Indian Standards:
* **Indian Standards (IS) Directory**: Instant query, category classification, mandatory Quality Control Orders (QCO).
* **Accredited Laboratory Locator**: Search NABL / BIS recognized test labs by IS standard, state, and pincode.
* **AI Regulatory Assistant (RAG Pipeline)**: Grounded standard analysis, clause-level cross-referencing, and telemetry curves.
* **BIS Digital Services**: Modules for Hallmarking & HUID 6-digit verification, e-BIS, Manakonline, and LIMS.
* **Enterprise Authentication**: Secure PBKDF2 hashing, JWT tokens, and multi-persona support.
    """,
    version="2.5.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Mount API v1 Routers
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """
    Middleware to calculate response latency and append X-Process-Time header.
    """
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = f"{process_time * 1000:.2f}ms"
    return response


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Standardized JSON error formatting for request schema validation failures.
    """
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "error": {
                "code": 422,
                "message": "Validation Error in request parameters or payload.",
                "details": exc.errors()
            }
        }
    )


@app.get("/", tags=["Health & Root"])
def root():
    """
    Root endpoint displaying server metadata and documentation links.
    """
    return {
        "success": True,
        "name": settings.PROJECT_NAME,
        "version": "2.5.0",
        "status": "online",
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc",
            "openapi_json": f"{settings.API_V1_STR}/openapi.json"
        },
        "api_v1_base": settings.API_V1_STR,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


@app.get("/health", tags=["Health & Root"])
def health_check():
    """
    Health check probe for monitoring systems and container orchestrators.
    """
    return {
        "status": "healthy",
        "service": "BISync-FastAPI-Backend",
        "version": "2.5.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
