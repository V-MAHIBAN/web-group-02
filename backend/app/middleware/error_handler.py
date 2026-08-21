"""Error handling and exception middleware"""

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from app.core.exceptions import AppException
import logging

logger = logging.getLogger(__name__)


def setup_exception_handlers(app: FastAPI):
    """Setup exception handlers for the application"""

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        """Handle application exceptions"""
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.message,
                "code": exc.error_code,
                "status_code": exc.status_code,
                "details": exc.details if exc.details else None,
            },
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        """Handle general exceptions"""
        logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": "Internal server error",
                "code": "INTERNAL_ERROR",
                "status_code": 500,
                "details": None,
            },
        )
