"""Middleware module"""

from app.middleware.auth import (
    get_current_user,
    get_current_admin,
    get_current_staff,
    get_current_volunteer,
    get_current_student,
    get_current_user_optional,
    require_role,
)
from app.middleware.error_handler import setup_exception_handlers
from app.middleware.logging import LoggingMiddleware

__all__ = [
    "get_current_user",
    "get_current_admin",
    "get_current_staff",
    "get_current_volunteer",
    "get_current_student",
    "get_current_user_optional",
    "require_role",
    "setup_exception_handlers",
    "LoggingMiddleware",
]
