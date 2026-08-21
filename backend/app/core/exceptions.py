"""Custom application exceptions"""

from typing import Any, Dict, Optional


class AppException(Exception):
    """Base application exception"""

    def __init__(
        self,
        message: str,
        error_code: str = "INTERNAL_ERROR",
        status_code: int = 500,
        details: Optional[Dict[str, Any]] = None,
    ):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code
        self.details = details or {}
        super().__init__(self.message)


class ValidationException(AppException):
    """Validation error"""

    def __init__(
        self,
        message: str = "Validation failed",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            message=message,
            error_code="VALIDATION_ERROR",
            status_code=422,
            details=details,
        )


class AuthenticationException(AppException):
    """Authentication error"""

    def __init__(self, message: str = "Authentication failed"):
        super().__init__(
            message=message, error_code="AUTHENTICATION_ERROR", status_code=401
        )


class AuthorizationException(AppException):
    """Authorization/permission error"""

    def __init__(self, message: str = "Insufficient permissions"):
        super().__init__(
            message=message, error_code="AUTHORIZATION_ERROR", status_code=403
        )


class NotFoundException(AppException):
    """Resource not found"""

    def __init__(self, resource: str = "Resource", identifier: Any = None):
        message = f"{resource} not found"
        if identifier:
            message += f" (ID: {identifier})"
        super().__init__(message=message, error_code="NOT_FOUND", status_code=404)


class ConflictException(AppException):
    """Resource conflict"""

    def __init__(
        self,
        message: str = "Resource already exists",
        details: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(
            message=message, error_code="CONFLICT", status_code=409, details=details
        )


class RateLimitException(AppException):
    """Rate limit exceeded"""

    def __init__(self, message: str = "Rate limit exceeded"):
        super().__init__(
            message=message, error_code="RATE_LIMIT_EXCEEDED", status_code=429
        )
