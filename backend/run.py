#!/usr/bin/env python
"""
BISync FastAPI Backend Runner
"""
import sys
import uvicorn
from app.core.config import settings

if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    print(f"Starting {settings.PROJECT_NAME} on http://{settings.HOST}:{settings.PORT}")
    print(f"Interactive Swagger Docs: http://localhost:{settings.PORT}/docs")
    print(f"ReDoc Documentation: http://localhost:{settings.PORT}/redoc")
    print(f"API Base: http://localhost:{settings.PORT}{settings.API_V1_STR}")
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
