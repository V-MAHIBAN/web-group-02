"""Attendance API endpoints"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, date
from app.core import get_db
from app.models import User, AttendanceRecord, Student, Program, AttendanceStatus
from app.schemas.schemas import (
    AttendanceRecordResponse,
    AttendanceCheckIn,
    AttendanceUpdate,
)
from app.middleware.auth import get_current_staff, get_current_student

router = APIRouter(tags=["attendance"], prefix="/attendance")


@router.post("/check-in", response_model=AttendanceRecordResponse)
async def check_in(
    request: AttendanceCheckIn,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Record student check-in"""

    # Verify student and program exist
    student = db.query(Student).filter(Student.id == request.student_id).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Student not found"
        )

    program = db.query(Program).filter(Program.id == request.program_id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Program not found"
        )

    # Check for duplicate check-in today
    today = date.today()
    existing = (
        db.query(AttendanceRecord)
        .filter(
            AttendanceRecord.student_id == request.student_id,
            AttendanceRecord.program_id == request.program_id,
            AttendanceRecord.check_in_date
            >= datetime(today.year, today.month, today.day),
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Student already checked in today",
        )

    # Create attendance record
    record = AttendanceRecord(
        student_id=request.student_id,
        program_id=request.program_id,
        check_in_date=datetime.utcnow(),
        status=request.status,
        room_or_gate=request.room_or_gate,
        notes=request.notes,
        verified_by=current_user.id,
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


@router.get("/records", response_model=List[AttendanceRecordResponse])
async def get_attendance_records(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    student_id: str = Query(None),
    program_id: str = Query(None),
    status_filter: AttendanceStatus = Query(None),
    date_from: datetime = Query(None),
    date_to: datetime = Query(None),
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Get attendance records with filtering"""

    query = db.query(AttendanceRecord)

    if student_id:
        query = query.filter(AttendanceRecord.student_id == student_id)

    if program_id:
        query = query.filter(AttendanceRecord.program_id == program_id)

    if status_filter:
        query = query.filter(AttendanceRecord.status == status_filter)

    if date_from:
        query = query.filter(AttendanceRecord.check_in_date >= date_from)

    if date_to:
        query = query.filter(AttendanceRecord.check_in_date <= date_to)

    total = query.count()
    records = (
        query.order_by(AttendanceRecord.check_in_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return records


@router.get("/records/{record_id}", response_model=AttendanceRecordResponse)
async def get_attendance_record(
    record_id: str,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Get attendance record by ID"""

    record = db.query(AttendanceRecord).filter(AttendanceRecord.id == record_id).first()

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Attendance record not found"
        )

    return record


@router.put("/records/{record_id}", response_model=AttendanceRecordResponse)
async def update_attendance_record(
    record_id: str,
    request: AttendanceUpdate,
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Update attendance record"""

    record = db.query(AttendanceRecord).filter(AttendanceRecord.id == record_id).first()

    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Attendance record not found"
        )

    update_data = request.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(record, field, value)

    record.verified_by = current_user.id

    db.commit()
    db.refresh(record)

    return record


@router.get("/metrics/summary")
async def get_attendance_metrics(
    program_id: str = Query(None),
    date: date = Query(None),
    current_user: User = Depends(get_current_staff),
    db: Session = Depends(get_db),
):
    """Get attendance metrics summary"""

    query = db.query(AttendanceRecord)

    if program_id:
        query = query.filter(AttendanceRecord.program_id == program_id)

    if date:
        query = query.filter(
            AttendanceRecord.check_in_date >= datetime(date.year, date.month, date.day)
        )

    records = query.all()

    total_present = sum(1 for r in records if r.status == AttendanceStatus.PRESENT)
    total_late = sum(1 for r in records if r.status == AttendanceStatus.LATE)
    total_absent = sum(1 for r in records if r.status == AttendanceStatus.ABSENT)
    total_excused = sum(1 for r in records if r.status == AttendanceStatus.EXCUSED)

    return {
        "total_present": total_present,
        "total_late": total_late,
        "total_absent": total_absent,
        "total_excused": total_excused,
        "total_records": len(records),
    }
