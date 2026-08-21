"""Application configuration settings"""

from typing import List
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings from environment variables"""

    # App Info
    PROJECT_NAME: str = "ACB Management System"
    PROJECT_VERSION: str = "1.0.0"
    DESCRIPTION: str = "American Corner Batticaloa - Unified Management Platform"

    # Database
    DATABASE_URL: str = "postgresql://localhost/acb_db"

    # JWT
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
    ]

    # File Upload
    MAX_FILE_SIZE: int = 10485760  # 10MB
    ALLOWED_IMAGE_FORMATS: List[str] = ["jpg", "jpeg", "png", "gif", "webp"]

    # API
    API_V1_STR: str = "/api/v1"

    # External Services
    GOOGLE_GENAI_API_KEY: str = ""
    SENDGRID_API_KEY: str = ""

    # Rate Limiting
    RATE_LIMIT_LOGIN_ATTEMPTS: int = 5
    RATE_LIMIT_WINDOW_MINUTES: int = 15

    # Logging
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
