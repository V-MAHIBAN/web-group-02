"""Program API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db
from app.models import User, Program, ProgramStatus
from app.schemas.schemas import (
    ProgramResponse,
    ProgramCreate,
    ProgramUpdate,
)
from app.middleware.auth import get_current_staff, get_current_user_optional

router = APIRouter(tags=["programs"], prefix="/programs")


@router.get("", response_model=List[ProgramResponse])
async def list_programs(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    status_filter: ProgramStatus = Query(None),
    current_user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """List all programs"""
    query = db.query(Program)

    if category:
        query = query.filter(Program.category == category)

    if status_filter:
        query = query.filter(Program.status == status_filter)

    total = query.count()
    programs = query.offset(skip).limit(limit).all()

    return programs


@router.get("/{program_id}", response_model=ProgramResponse)
async def get_program(
    program_id: str,
    current_user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    """Get program by ID"""
    program = db.query(Program).filter(Program.id == program_id).first()

    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Program not found"
        )

    return program


@router.post("", response_model=ProgramResponse)
async def create_program(
    request: ProgramCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Create new program"""

    program = Program(**request.dict(), created_by=current_user.id)

    db.add(program)
    db.commit()
    db.refresh(program)

    return program


@router.put("/{program_id}", response_model=ProgramResponse)
async def update_program(
    program_id: str,
    request: ProgramUpdate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Update program"""

    program = db.query(Program).filter(Program.id == program_id).first()

    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Program not found"
        )

    update_data = request.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(program, field, value)

    db.commit()
    db.refresh(program)

    return program


@router.delete("/{program_id}")
async def delete_program(
    program_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Archive program"""

    program = db.query(Program).filter(Program.id == program_id).first()

    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Program not found"
        )

    program.status = ProgramStatus.CANCELLED
    db.commit()

    return {"message": "Program archived successfully"}
