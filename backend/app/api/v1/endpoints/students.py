"""Student management API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db
from app.models import User, Student, UserRole, StudentStatus, UserStatus
from app.schemas.schemas import StudentResponse, StudentCreate, StudentUpdate
from app.middleware.auth import get_current_staff

router = APIRouter(tags=["students"], prefix="/students")


@router.get("", response_model=List[StudentResponse])
async def list_students(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: StudentStatus = Query(None),
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """List all students"""
    query = db.query(Student)

    if status_filter:
        query = query.filter(Student.status == status_filter)

    total = query.count()
    students = query.offset(skip).limit(limit).all()

    return students


@router.get("/search", response_model=List[StudentResponse])
async def search_students(
    q: str = Query(..., min_length=1),
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Search students by name, email, or student ID"""
    students = (
        db.query(Student)
        .join(User)
        .filter(
            (Student.student_id.ilike(f"%{q}%"))
            | (User.name.ilike(f"%{q}%"))
            | (User.email.ilike(f"%{q}%"))
        )
        .limit(20)
        .all()
    )

    return students


@router.get("/{student_id}", response_model=StudentResponse)
async def get_student(
    student_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Get student by ID"""
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Student not found"
        )

    return student


@router.post("", response_model=StudentResponse)
async def create_student(
    request: StudentCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Create new student"""

    # Check if student_id already exists
    existing = (
        db.query(Student).filter(Student.student_id == request.student_id).first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Student ID already exists"
        )

    # Check if user exists
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    student = Student(**request.dict())

    db.add(student)
    db.commit()
    db.refresh(student)

    return student


@router.put("/{student_id}", response_model=StudentResponse)
async def update_student(
    student_id: str,
    request: StudentUpdate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Update student profile"""

    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Student not found"
        )

    update_data = request.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(student, field, value)

    db.commit()
    db.refresh(student)

    return student


@router.delete("/{student_id}")
async def delete_student(
    student_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Delete/deactivate student"""

    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Student not found"
        )

    student.status = StudentStatus.SUSPENDED
    db.commit()

    return {"message": "Student deactivated successfully"}
