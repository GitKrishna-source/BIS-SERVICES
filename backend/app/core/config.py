import os
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    PROJECT_NAME: str = "BISync - Smart Indian Standards Assistant Backend"
    API_V1_STR: str = "/api/v1"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # PostgreSQL Configuration
    DATABASE_NAME: str = "bisync"
    DATABASE_USER: str = "postgres"
    DATABASE_HOST: str = "localhost"
    DATABASE_PORT: int = 5432
    DATABASE_PASSWORD: str = ""
    
    # CORS Configuration
    FRONTEND_URL: str = "http://localhost:5173"
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8080"
    ]
    
    # Authentication & Security
    SECRET_KEY: str = "bisync-development-secret-key-replace-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # AI / LLM Configuration
    AI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""
    AI_MODEL: str = "gemini-3.6-flash"
    AI_API_BASE_URL: str = "https://api.openai.com/v1"
    AI_EMBEDDING_MODEL: str = "text-embedding-3-small"
    AI_EMBEDDING_DIMENSIONS: int = 256
    RAG_STORE_PATH: str = "data/rag/index.json"
    RAG_DOCUMENTS_DIR: str = "data/rag/documents"
    RAG_TOP_K: int = 6
    RAG_CHUNK_SIZE: int = 1200
    RAG_CHUNK_OVERLAP: int = 180

    @property
    def effective_api_key(self) -> str:
        return (
            self.GEMINI_API_KEY.strip() or
            self.AI_API_KEY.strip() or
            self.GOOGLE_API_KEY.strip() or
            os.getenv("GEMINI_API_KEY", "").strip() or
            os.getenv("AI_API_KEY", "").strip() or
            os.getenv("GOOGLE_API_KEY", "").strip()
        )

    @property
    def effective_model(self) -> str:
        model = self.AI_MODEL.strip() if self.AI_MODEL else ""
        if not model or model.lower() in ["bis-reasoner-v2.5", "default", "gemini", "gemini-1.5-flash"]:
            return "gemini-3.6-flash"
        return model

    model_config = SettingsConfigDict(env_file=".env", extra="allow")



settings = Settings()

# Ensure FRONTEND_URL is included in ALLOWED_ORIGINS
if settings.FRONTEND_URL and settings.FRONTEND_URL not in settings.ALLOWED_ORIGINS:
    settings.ALLOWED_ORIGINS.append(settings.FRONTEND_URL)
