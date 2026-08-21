"""Volunteer management API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from app.core import get_db
from app.models import (
    User,
    VolunteerProfile,
    VolunteerApplication,
    VolunteerHourEntry,
    Certificate,
    Task,
    TaskEnrollment,
    VolunteerApplicationStatus,
    HourEntryStatus,
    CertificateStatus,
    ProgramStatus,
)
from app.schemas.schemas import (
    VolunteerProfileResponse,
    VolunteerApplicationResponse,
    VolunteerApplicationCreate,
    VolunteerHourEntryResponse,
    VolunteerHourEntryCreate,
    CertificateResponse,
    TaskResponse,
    TaskCreate,
)
from app.middleware.auth import (
    get_current_volunteer,
    get_current_staff,
    get_current_user,
)

router = APIRouter(tags=["volunteers"], prefix="/volunteers")


@router.get("/me", response_model=VolunteerProfileResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Get current volunteer profile"""
    profile = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    return profile


@router.post("/applications", response_model=VolunteerApplicationResponse)
async def apply_to_program(
    request: VolunteerApplicationCreate,
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Submit volunteer application to program"""

    # Get volunteer profile
    volunteer = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    # Check for existing application
    existing = (
        db.query(VolunteerApplication)
        .filter(
            VolunteerApplication.volunteer_id == volunteer.id,
            VolunteerApplication.program_id == request.program_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Already applied to this program",
        )

    application = VolunteerApplication(
        volunteer_id=volunteer.id,
        program_id=request.program_id,
        motivation=request.motivation,
        skills=request.skills,
        education=request.education,
        experience=request.experience,
        status=VolunteerApplicationStatus.PENDING,
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


@router.get("/applications", response_model=List[VolunteerApplicationResponse])
async def get_my_applications(
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Get my volunteer applications"""

    volunteer = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    applications = (
        db.query(VolunteerApplication)
        .filter(VolunteerApplication.volunteer_id == volunteer.id)
        .all()
    )

    return applications


@router.post("/hours", response_model=VolunteerHourEntryResponse)
async def log_hours(
    request: VolunteerHourEntryCreate,
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Log volunteer hours"""

    volunteer = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    entry = VolunteerHourEntry(
        volunteer_id=volunteer.id,
        task_id=request.task_id,
        hours=request.hours,
        category=request.category,
        notes=request.notes,
        status=HourEntryStatus.PENDING,
    )

    db.add(entry)
    db.commit()
    db.refresh(entry)

    return entry


@router.get("/hours", response_model=List[VolunteerHourEntryResponse])
async def get_my_hours(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: HourEntryStatus = Query(None),
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Get my logged hours"""

    volunteer = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    query = db.query(VolunteerHourEntry).filter(
        VolunteerHourEntry.volunteer_id == volunteer.id
    )

    if status_filter:
        query = query.filter(VolunteerHourEntry.status == status_filter)

    entries = query.offset(skip).limit(limit).all()

    return entries


@router.get("/certificates", response_model=List[CertificateResponse])
async def get_my_certificates(
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Get my certificates"""

    volunteer = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    certificates = (
        db.query(Certificate).filter(Certificate.volunteer_id == volunteer.id).all()
    )

    return certificates


@router.post("/tasks/{task_id}/enroll")
async def enroll_in_task(
    task_id: str,
    current_user: User = Depends(get_current_volunteer),
    db: Session = Depends(get_db),
):
    """Enroll in volunteer task"""

    volunteer = (
        db.query(VolunteerProfile)
        .filter(VolunteerProfile.user_id == current_user.id)
        .first()
    )

    if not volunteer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Volunteer profile not found"
        )

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Task not found"
        )

    # Check for existing enrollment
    existing = (
        db.query(TaskEnrollment)
        .filter(
            TaskEnrollment.volunteer_id == volunteer.id,
            TaskEnrollment.task_id == task_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Already enrolled in this task"
        )

    enrollment = TaskEnrollment(
        volunteer_id=volunteer.id,
        task_id=task_id,
    )

    task.enrolled_count += 1

    db.add(enrollment)
    db.commit()

    return {"message": "Successfully enrolled in task"}


# Staff endpoints for volunteer management


@router.get("/applications/all", response_model=List[VolunteerApplicationResponse])
async def get_all_applications(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status_filter: VolunteerApplicationStatus = Query(None),
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Get all volunteer applications (staff only)"""

    query = db.query(VolunteerApplication)

    if status_filter:
        query = query.filter(VolunteerApplication.status == status_filter)

    applications = query.offset(skip).limit(limit).all()

    return applications


@router.put("/applications/{app_id}/approve")
async def approve_application(
    app_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Approve volunteer application"""

    application = (
        db.query(VolunteerApplication).filter(VolunteerApplication.id == app_id).first()
    )

    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
        )

    application.status = VolunteerApplicationStatus.APPROVED
    application.reviewed_by = current_user.id
    application.reviewed_at = __import__("datetime").datetime.utcnow()

    db.commit()

    return {"message": "Application approved"}


@router.put("/hours/{entry_id}/verify")
async def verify_hours(
    entry_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Verify volunteer hour entry"""

    entry = (
        db.query(VolunteerHourEntry).filter(VolunteerHourEntry.id == entry_id).first()
    )

    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Hour entry not found"
        )

    entry.status = HourEntryStatus.VERIFIED
    entry.verified_by = current_user.id
    entry.verified_at = __import__("datetime").datetime.utcnow()

    # Update volunteer total hours
    volunteer = entry.volunteer
    volunteer.verified_hours += entry.hours
    volunteer.hours_total += entry.hours

    # Update tier
    if volunteer.verified_hours >= 100:
        volunteer.tier = "Gold"
    elif volunteer.verified_hours >= 50:
        volunteer.tier = "Silver"
    else:
        volunteer.tier = "Bronze"

    db.commit()

    return {"message": "Hours verified"}
