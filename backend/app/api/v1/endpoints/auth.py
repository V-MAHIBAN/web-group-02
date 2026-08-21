"""Authentication API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from app.core import (
    get_db,
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.models import User, UserRole, UserStatus
from app.schemas.schemas import (
    LoginRequest,
    LoginResponse,
    TokenRefreshRequest,
    TokenRefreshResponse,
    UserSignup,
    UserResponse,
)
from app.middleware.auth import get_current_user

router = APIRouter(tags=["auth"])


@router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """User login endpoint"""

    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )

    if user.status != UserStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Account is not active"
        )

    # Update last login
    user.last_login = __import__("datetime").datetime.utcnow()
    user.login_attempts = 0
    db.commit()

    # Create tokens
    access_token = create_access_token({"sub": user.id})
    refresh_token = create_refresh_token({"sub": user.id})

    return LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user_id=user.id,
        roles=[role for role in user.roles],
    )


@router.post("/auth/refresh-token", response_model=TokenRefreshResponse)
async def refresh_token(request: TokenRefreshRequest, db: Session = Depends(get_db)):
    """Refresh access token using refresh token"""

    payload = decode_token(request.refresh_token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token"
        )

    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    access_token = create_access_token({"sub": user.id})

    return TokenRefreshResponse(access_token=access_token)


@router.post("/auth/signup", response_model=UserResponse)
async def signup(request: UserSignup, db: Session = Depends(get_db)):
    """User signup endpoint"""

    # Validate password confirmation
    if request.password != request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match"
        )

    # Check if email already exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
        )

    # Create new user
    user = User(
        name=request.name,
        email=request.email,
        phone=request.phone,
        hashed_password=hash_password(request.password),
        status=(
            UserStatus.ACTIVE
            if request.role == UserRole.STUDENT
            else UserStatus.PENDING
        ),
    )

    # Add role
    user.roles = [request.role]

    db.add(user)
    db.commit()
    db.refresh(user)

    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        status=user.status,
        roles=user.roles,
        created_at=user.created_at,
        updated_at=user.updated_at,
    )


@router.post("/auth/logout")
async def logout(current_user: User = Depends(get_current_user)):
    """User logout endpoint (JWT is stateless, this is for frontend reference)"""
    return {"message": "Successfully logged out"}


@router.post("/auth/verify-token")
async def verify_token(current_user: User = Depends(get_current_user)):
    """Verify if current token is valid"""
    return {
        "valid": True,
        "user_id": current_user.id,
        "email": current_user.email,
        "roles": [role for role in current_user.roles],
    }
