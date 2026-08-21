"""FastAPI application factory"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.core.config import settings
from app.core.database import engine
from app.models import Base
from app.middleware import setup_exception_handlers, LoggingMiddleware
from app.api.v1 import api_router

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)


def create_app() -> FastAPI:
    """Create and configure FastAPI application"""

    app = FastAPI(
        title=settings.PROJECT_NAME,
        description=settings.DESCRIPTION,
        version=settings.PROJECT_VERSION,
        docs_url="/api/docs",
        openapi_url="/api/openapi.json",
        redoc_url="/api/redoc",
    )

    # Middleware: CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["X-Process-Time"],
    )

    # Middleware: Trusted Host
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=["*"],  # Configure based on deployment
    )

    # Middleware: Logging
    app.add_middleware(LoggingMiddleware)

    # Exception handlers
    setup_exception_handlers(app)

    # API routes
    app.include_router(api_router, prefix=settings.API_V1_STR)

    # Health check endpoint
    @app.get("/health")
    async def health_check():
        """Health check endpoint"""
        return {"status": "ok", "version": settings.PROJECT_VERSION}

    # Root endpoint
    @app.get("/")
    async def root():
        """Root endpoint"""
        return {
            "name": settings.PROJECT_NAME,
            "version": settings.PROJECT_VERSION,
            "docs": "/api/docs",
        }

    return app


# Create app instance
app = create_app()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
    )
