"""Course and education API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db
from app.models import (
    User,
    Course,
    CourseModule,
    Deadline,
    CourseEnrollment,
    Student,
    ProgramStatus,
)
from app.schemas.schemas import (
    CourseResponse,
    CourseCreate,
    CourseDetailResponse,
    CourseModuleCreate,
    CourseModuleResponse,
    DeadlineCreate,
    DeadlineResponse,
)
from app.middleware.auth import get_current_user, get_current_staff, get_current_student

router = APIRouter(tags=["courses"], prefix="/courses")


@router.get("", response_model=List[CourseResponse])
async def list_courses(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: str = Query(None),
    level: str = Query(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all courses"""

    query = db.query(Course)

    if category:
        query = query.filter(Course.category == category)

    if level:
        query = query.filter(Course.level == level)

    courses = query.offset(skip).limit(limit).all()

    return courses


@router.get("/{course_id}", response_model=CourseDetailResponse)
async def get_course(
    course_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get course with modules and deadlines"""

    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Course not found"
        )

    return course


@router.post("", response_model=CourseResponse)
async def create_course(
    request: CourseCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Create new course"""

    course = Course(**request.dict())

    db.add(course)
    db.commit()
    db.refresh(course)

    return course


@router.post("/{course_id}/enroll")
async def enroll_in_course(
    course_id: str,
    current_user: User = Depends(get_current_student),
    db: Session = Depends(get_db),
):
    """Enroll student in course"""

    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Course not found"
        )

    # Get student profile
    student = db.query(Student).filter(Student.user_id == current_user.id).first()

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Student profile not found"
        )

    # Check for existing enrollment
    existing = (
        db.query(CourseEnrollment)
        .filter(
            CourseEnrollment.course_id == course_id,
            CourseEnrollment.student_id == student.id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Already enrolled in this course",
        )

    enrollment = CourseEnrollment(
        course_id=course_id,
        student_id=student.id,
    )

    student.enrolled_courses += 1

    db.add(enrollment)
    db.commit()

    return {"message": "Successfully enrolled in course"}


@router.post("/{course_id}/modules", response_model=CourseModuleResponse)
async def add_module(
    course_id: str,
    request: CourseModuleCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Add module to course"""

    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Course not found"
        )

    module = CourseModule(course_id=course_id, **request.dict())

    course.total_modules += 1

    db.add(module)
    db.commit()
    db.refresh(module)

    return module


@router.get("/{course_id}/deadlines", response_model=List[DeadlineResponse])
async def get_course_deadlines(
    course_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get deadlines for course"""

    deadlines = db.query(Deadline).filter(Deadline.course_id == course_id).all()

    return deadlines


@router.post("/{course_id}/deadlines", response_model=DeadlineResponse)
async def add_deadline(
    course_id: str,
    request: DeadlineCreate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Add deadline to course"""

    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Course not found"
        )

    deadline = Deadline(course_id=course_id, **request.dict())

    db.add(deadline)
    db.commit()
    db.refresh(deadline)

    return deadline
