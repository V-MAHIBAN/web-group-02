"""Authentication middleware and dependencies"""

from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from sqlalchemy.orm import Session
from app.core import (
    decode_token,
    AuthenticationException,
    get_db,
)
from app.models import User, UserRole

security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    """Get current authenticated user from JWT token"""
    token = credentials.credentials

    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id: str = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def require_role(*required_roles: UserRole):
    """Require user to have one of the specified roles"""

    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_roles = [role for role in current_user.roles]
        if not any(role in user_roles for role in required_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user

    return role_checker


async def get_current_admin(
    current_user: User = Depends(require_role(UserRole.ADMIN)),
) -> User:
    """Require admin role"""
    return current_user


async def get_current_staff(
    current_user: User = Depends(require_role(UserRole.ADMIN, UserRole.STAFF))
) -> User:
    """Require staff or admin role"""
    return current_user


async def get_current_volunteer(
    current_user: User = Depends(require_role(UserRole.VOLUNTEER, UserRole.ADMIN))
) -> User:
    """Require volunteer or admin role"""
    return current_user


async def get_current_student(
    current_user: User = Depends(require_role(UserRole.STUDENT, UserRole.ADMIN))
) -> User:
    """Require student or admin role"""
    return current_user


async def get_current_user_optional(
    credentials: Optional[HTTPAuthCredentials] = Depends(security),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """Get current user if authenticated, otherwise None"""
    if not credentials:
        return None

    payload = decode_token(credentials.credentials)
    if not payload:
        return None

    user_id: str = payload.get("sub")
    if not user_id:
        return None

    return db.query(User).filter(User.id == user_id).first()
