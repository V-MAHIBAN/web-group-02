"""Database models using SQLAlchemy"""

from datetime import datetime
from enum import Enum
from typing import List
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    DateTime,
    Boolean,
    Text,
    Enum as SQLEnum,
    ForeignKey,
    Table,
    JSON,
    UniqueConstraint,
    Index,
    CheckConstraint,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from uuid import uuid4

Base = declarative_base()


# ============================================================================
# Enums
# ============================================================================


class UserRole(str, Enum):
    """User roles"""

    ADMIN = "admin"
    STAFF = "staff"
    VOLUNTEER = "volunteer"
    STUDENT = "student"
    GUEST = "guest"


class UserStatus(str, Enum):
    """User account status"""

    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    PENDING = "pending"


class StudentStatus(str, Enum):
    """Student enrollment status"""

    ACTIVE = "active"
    ABSENT = "absent"
    GRADUATED = "graduated"
    SUSPENDED = "suspended"


class AttendanceStatus(str, Enum):
    """Attendance recording status"""

    PRESENT = "present"
    LATE = "late"
    ABSENT = "absent"
    EXCUSED = "excused"


class ProgramStatus(str, Enum):
    """Program/course status"""

    ENROLLING = "enrolling"
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    FULL = "full"


class VolunteerApplicationStatus(str, Enum):
    """Volunteer application workflow status"""

    PENDING = "pending"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"


class NewsArticleStatus(str, Enum):
    """News article publication status"""

    DRAFT = "draft"
    PUBLISHED = "published"
    SCHEDULED = "scheduled"
    ARCHIVED = "archived"


class AnnouncementAudience(str, Enum):
    """Who can see announcement"""

    ALL_MEMBERS = "all_members"
    STAFF_ONLY = "staff_only"
    VOLUNTEERS_ONLY = "volunteers_only"
    STUDENTS_ONLY = "students_only"
    PUBLIC = "public"


class CertificateStatus(str, Enum):
    """Certificate validity status"""

    VALID = "valid"
    EXPIRED = "expired"
    WARNING = "warning"  # Expiring soon


class HourEntryStatus(str, Enum):
    """Volunteer hour entry approval status"""

    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"


class ActivityType(str, Enum):
    """System activity type"""

    CHECK_IN = "check_in"
    ALERT = "alert"
    LATE_ENTRY = "late_entry"
    BROADCAST = "broadcast"
    USER_LOGIN = "user_login"
    USER_LOGOUT = "user_logout"
    APPLICATION = "application"
    ENROLLMENT = "enrollment"


class Severity(str, Enum):
    """Activity/alert severity"""

    INFO = "info"
    NORMAL = "normal"
    WARNING = "warning"
    HIGH = "high"
    CRITICAL = "critical"


# ============================================================================
# Association Tables (Many-to-Many)
# ============================================================================

user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", String(36), ForeignKey("user.id", ondelete="CASCADE")),
    Column("role", SQLEnum(UserRole)),
)

student_programs = Table(
    "student_programs",
    Base.metadata,
    Column("student_id", String(36), ForeignKey("student.id", ondelete="CASCADE")),
    Column("program_id", String(36), ForeignKey("program.id", ondelete="CASCADE")),
    UniqueConstraint("student_id", "program_id", name="uq_student_program"),
)

volunteer_interests = Table(
    "volunteer_interests",
    Base.metadata,
    Column(
        "volunteer_id",
        String(36),
        ForeignKey("volunteer_profile.id", ondelete="CASCADE"),
    ),
    Column("interest", String(100)),
)

community_post_likes = Table(
    "community_post_likes",
    Base.metadata,
    Column("post_id", String(36), ForeignKey("community_post.id", ondelete="CASCADE")),
    Column("user_id", String(36), ForeignKey("user.id", ondelete="CASCADE")),
    UniqueConstraint("post_id", "user_id", name="uq_post_user_like"),
)

# ============================================================================
# Core User Management
# ============================================================================


class User(Base):
    """Core user account"""

    __tablename__ = "user"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    name = Column(String(255), nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(20), unique=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    roles = relationship("UserRole", secondary=user_roles, collection_class=list)
    status = Column(SQLEnum(UserStatus), default=UserStatus.ACTIVE, nullable=False)
    avatar_url = Column(String(512), nullable=True)
    department = Column(String(100), nullable=True)
    two_fa_enabled = Column(Boolean, default=False)
    two_fa_secret = Column(String(32), nullable=True)
    last_login = Column(DateTime, nullable=True)
    login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    student = relationship(
        "Student", back_populates="user", uselist=False, foreign_keys="Student.user_id"
    )
    volunteer = relationship(
        "VolunteerProfile",
        back_populates="user",
        uselist=False,
        foreign_keys="VolunteerProfile.user_id",
    )
    audit_logs = relationship("AuditLog", back_populates="user")

    __table_args__ = (
        Index("idx_user_email", "email"),
        Index("idx_user_status", "status"),
    )


# ============================================================================
# Student Management
# ============================================================================


class Student(Base):
    """Student profile and academic info"""

    __tablename__ = "student"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(
        String(36),
        ForeignKey("user.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    student_id = Column(String(50), unique=True, nullable=False, index=True)
    status = Column(
        SQLEnum(StudentStatus), default=StudentStatus.ACTIVE, nullable=False
    )
    grade_level = Column(String(50), nullable=True)
    major = Column(String(100), nullable=True)
    gpa = Column(Float, nullable=True)
    attendance_rate = Column(Float, default=0.0)
    enrolled_courses = Column(Integer, default=0)
    emergency_contact = Column(String(255), nullable=True)
    emergency_phone = Column(String(20), nullable=True)
    notes = Column(Text, nullable=True)
    joined_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    user = relationship("User", back_populates="student", foreign_keys=[user_id])
    attendance_records = relationship("AttendanceRecord", back_populates="student")
    programs = relationship(
        "Program", secondary=student_programs, back_populates="students"
    )
    applications = relationship("StudentApplication", back_populates="student")

    __table_args__ = (
        Index("idx_student_id", "student_id"),
        Index("idx_student_status", "status"),
    )


# ============================================================================
# Attendance Management
# ============================================================================


class AttendanceRecord(Base):
    """Individual attendance record"""

    __tablename__ = "attendance_record"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    student_id = Column(
        String(36), ForeignKey("student.id", ondelete="CASCADE"), nullable=False
    )
    program_id = Column(
        String(36), ForeignKey("program.id", ondelete="CASCADE"), nullable=False
    )
    check_in_date = Column(DateTime, nullable=False)
    status = Column(
        SQLEnum(AttendanceStatus), default=AttendanceStatus.ABSENT, nullable=False
    )
    room_or_gate = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)
    verified_by = Column(String(36), ForeignKey("user.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    student = relationship("Student", back_populates="attendance_records")
    program = relationship("Program", back_populates="attendance_records")

    __table_args__ = (
        Index("idx_attendance_student", "student_id"),
        Index("idx_attendance_program", "program_id"),
        Index("idx_attendance_date", "check_in_date"),
        UniqueConstraint(
            "student_id", "program_id", "check_in_date", name="uq_student_program_date"
        ),
    )


# ============================================================================
# Program Management
# ============================================================================


class Program(Base):
    """Program/Course definition"""

    __tablename__ = "program"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    status = Column(
        SQLEnum(ProgramStatus), default=ProgramStatus.UPCOMING, nullable=False
    )
    instructor = Column(String(255), nullable=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    location = Column(String(255), nullable=True)
    capacity = Column(Integer, nullable=True)
    enrolled_count = Column(Integer, default=0)
    level = Column(String(50), nullable=True)  # Beginner, Intermediate, Advanced
    image_url = Column(String(512), nullable=True)
    prerequisites = Column(JSON, default=list, nullable=False)
    topics = Column(JSON, default=list, nullable=False)
    created_by = Column(String(36), ForeignKey("user.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    students = relationship(
        "Student", secondary=student_programs, back_populates="programs"
    )
    attendance_records = relationship("AttendanceRecord", back_populates="program")
    courses = relationship("Course", back_populates="program")
    volunteer_applications = relationship(
        "VolunteerApplication", back_populates="program"
    )
    tasks = relationship("Task", back_populates="program")
    certificates = relationship("Certificate", back_populates="program")

    __table_args__ = (
        Index("idx_program_status", "status"),
        Index("idx_program_date", "start_date", "end_date"),
    )


# ============================================================================
# Volunteer Management
# ============================================================================


class VolunteerProfile(Base):
    """Volunteer profile and engagement info"""

    __tablename__ = "volunteer_profile"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(
        String(36),
        ForeignKey("user.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    hours_total = Column(Float, default=0.0)
    events_total = Column(Integer, default=0)
    tier = Column(String(50), nullable=True)  # Gold, Silver, Bronze based on hours
    verified_hours = Column(Float, default=0.0)
    availability = Column(JSON, nullable=True)  # Weekday morning/evening/weekend
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    user = relationship("User", back_populates="volunteer", foreign_keys=[user_id])
    applications = relationship("VolunteerApplication", back_populates="volunteer")
    hour_entries = relationship("VolunteerHourEntry", back_populates="volunteer")
    certificates = relationship("Certificate", back_populates="volunteer")
    task_enrollments = relationship("TaskEnrollment", back_populates="volunteer")


class VolunteerApplication(Base):
    """Volunteer application to programs"""

    __tablename__ = "volunteer_application"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    volunteer_id = Column(
        String(36),
        ForeignKey("volunteer_profile.id", ondelete="CASCADE"),
        nullable=False,
    )
    program_id = Column(
        String(36), ForeignKey("program.id", ondelete="CASCADE"), nullable=False
    )
    status = Column(
        SQLEnum(VolunteerApplicationStatus),
        default=VolunteerApplicationStatus.PENDING,
        nullable=False,
    )
    motivation = Column(Text, nullable=True)
    skills = Column(JSON, default=list, nullable=False)
    education = Column(Text, nullable=True)
    experience = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    reviewed_by = Column(String(36), ForeignKey("user.id"), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    applied_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    volunteer = relationship("VolunteerProfile", back_populates="applications")
    program = relationship("Program", back_populates="volunteer_applications")

    __table_args__ = (
        UniqueConstraint("volunteer_id", "program_id", name="uq_volunteer_program_app"),
        Index("idx_application_status", "status"),
    )


class Task(Base):
    """Volunteer task/opportunity"""

    __tablename__ = "task"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    program_id = Column(
        String(36), ForeignKey("program.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    status = Column(
        SQLEnum(ProgramStatus), default=ProgramStatus.UPCOMING, nullable=False
    )
    task_date = Column(DateTime, nullable=False)
    start_time = Column(String(10), nullable=True)
    end_time = Column(String(10), nullable=True)
    location = Column(String(255), nullable=True)
    hours_required = Column(Float, default=0.0)
    coordinator_id = Column(String(36), ForeignKey("user.id"), nullable=True)
    coordinator_email = Column(String(255), nullable=True)
    coordinator_phone = Column(String(20), nullable=True)
    enrolled_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    program = relationship("Program", back_populates="tasks")
    enrollments = relationship("TaskEnrollment", back_populates="task")

    __table_args__ = (
        Index("idx_task_date", "task_date"),
        Index("idx_task_status", "status"),
    )


class TaskEnrollment(Base):
    """Volunteer enrollment in task"""

    __tablename__ = "task_enrollment"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    volunteer_id = Column(
        String(36),
        ForeignKey("volunteer_profile.id", ondelete="CASCADE"),
        nullable=False,
    )
    task_id = Column(
        String(36), ForeignKey("task.id", ondelete="CASCADE"), nullable=False
    )
    status = Column(
        SQLEnum(AttendanceStatus), default=AttendanceStatus.ABSENT, nullable=False
    )
    notes = Column(Text, nullable=True)
    enrolled_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    volunteer = relationship("VolunteerProfile", back_populates="task_enrollments")
    task = relationship("Task", back_populates="enrollments")

    __table_args__ = (
        UniqueConstraint("volunteer_id", "task_id", name="uq_volunteer_task"),
    )


class VolunteerHourEntry(Base):
    """Logged volunteer hours"""

    __tablename__ = "volunteer_hour_entry"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    volunteer_id = Column(
        String(36),
        ForeignKey("volunteer_profile.id", ondelete="CASCADE"),
        nullable=False,
    )
    task_id = Column(String(36), ForeignKey("task.id"), nullable=True)
    hours = Column(Float, nullable=False)
    category = Column(String(100), nullable=True)
    status = Column(
        SQLEnum(HourEntryStatus), default=HourEntryStatus.PENDING, nullable=False
    )
    notes = Column(Text, nullable=True)
    entry_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    verified_by = Column(String(36), ForeignKey("user.id"), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    volunteer = relationship("VolunteerProfile", back_populates="hour_entries")

    __table_args__ = (
        Index("idx_hours_volunteer", "volunteer_id"),
        Index("idx_hours_status", "status"),
        Index("idx_hours_date", "entry_date"),
    )


class Certificate(Base):
    """Volunteer/Course certificate"""

    __tablename__ = "certificate"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    volunteer_id = Column(
        String(36),
        ForeignKey("volunteer_profile.id", ondelete="CASCADE"),
        nullable=False,
    )
    program_id = Column(
        String(36), ForeignKey("program.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False)
    credential_id = Column(String(100), unique=True, nullable=False, index=True)
    issued_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    expires_date = Column(DateTime, nullable=True)
    duration = Column(String(100), nullable=True)
    status = Column(
        SQLEnum(CertificateStatus), default=CertificateStatus.VALID, nullable=False
    )
    skills = Column(JSON, default=list, nullable=False)
    badge_color = Column(String(50), nullable=True)  # blue, green, amber
    issued_by = Column(String(255), nullable=True)
    public_accessible = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    volunteer = relationship("VolunteerProfile", back_populates="certificates")
    program = relationship("Program", back_populates="certificates")

    __table_args__ = (
        Index("idx_certificate_status", "status"),
        Index("idx_certificate_expires", "expires_date"),
    )


# ============================================================================
# Education & Courses
# ============================================================================


class Course(Base):
    """Online course definition"""

    __tablename__ = "course"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    program_id = Column(
        String(36), ForeignKey("program.id", ondelete="CASCADE"), nullable=True
    )
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    instructor = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    level = Column(String(50), nullable=True)
    status = Column(
        SQLEnum(ProgramStatus), default=ProgramStatus.UPCOMING, nullable=False
    )
    progress_percentage = Column(Float, default=0.0)
    total_modules = Column(Integer, default=0)
    completed_modules = Column(Integer, default=0)
    image_url = Column(String(512), nullable=True)
    duration_days = Column(Integer, nullable=True)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    program = relationship("Program", back_populates="courses")
    modules = relationship("CourseModule", back_populates="course")
    deadlines = relationship("Deadline", back_populates="course")
    enrollments = relationship("CourseEnrollment", back_populates="course")

    __table_args__ = (Index("idx_course_status", "status"),)


class CourseModule(Base):
    """Course module/lesson"""

    __tablename__ = "course_module"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    course_id = Column(
        String(36), ForeignKey("course.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    module_type = Column(String(50), nullable=True)  # video, reading, quiz, workshop
    content = Column(Text, nullable=True)
    duration_minutes = Column(Integer, nullable=True)
    order = Column(Integer, nullable=False)
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    course = relationship("Course", back_populates="modules")


class Deadline(Base):
    """Course/Assignment deadline"""

    __tablename__ = "deadline"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    course_id = Column(
        String(36), ForeignKey("course.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime, nullable=False)
    priority = Column(String(20), nullable=True)  # high, medium, low
    is_completed = Column(Boolean, default=False)
    reminder_set = Column(Boolean, default=False)
    reminder_time = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    course = relationship("Course", back_populates="deadlines")

    __table_args__ = (
        Index("idx_deadline_due_date", "due_date"),
        Index("idx_deadline_course", "course_id"),
    )


class CourseEnrollment(Base):
    """Student enrollment in course"""

    __tablename__ = "course_enrollment"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    course_id = Column(
        String(36), ForeignKey("course.id", ondelete="CASCADE"), nullable=False
    )
    student_id = Column(
        String(36), ForeignKey("student.id", ondelete="CASCADE"), nullable=False
    )
    progress_percentage = Column(Float, default=0.0)
    completed_modules = Column(Integer, default=0)
    enrolled_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    completed_at = Column(DateTime, nullable=True)

    # Relationships
    course = relationship("Course", back_populates="enrollments")

    __table_args__ = (
        UniqueConstraint("course_id", "student_id", name="uq_course_student"),
    )


# ============================================================================
# Community & Communication
# ============================================================================


class CommunityPost(Base):
    """Community discussion post"""

    __tablename__ = "community_post"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    author_id = Column(
        String(36), ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=False, index=True)
    content = Column(Text, nullable=False)
    tags = Column(JSON, default=list, nullable=False)
    category = Column(String(100), nullable=True)
    likes_count = Column(Integer, default=0)
    replies_count = Column(Integer, default=0)
    views_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    author = relationship("User")
    replies = relationship("CommunityReply", back_populates="post")
    likes = relationship("User", secondary=community_post_likes)

    __table_args__ = (
        Index("idx_post_created", "created_at"),
        Index("idx_post_author", "author_id"),
    )


class CommunityReply(Base):
    """Reply to community post"""

    __tablename__ = "community_reply"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    post_id = Column(
        String(36), ForeignKey("community_post.id", ondelete="CASCADE"), nullable=False
    )
    author_id = Column(
        String(36), ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    post = relationship("CommunityPost", back_populates="replies")
    author = relationship("User")

    __table_args__ = (
        Index("idx_reply_post", "post_id"),
        Index("idx_reply_author", "author_id"),
    )


class ChatSession(Base):
    """AI Chat session"""

    __tablename__ = "chat_session"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(
        String(36), ForeignKey("user.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)
    message_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    messages = relationship("ChatMessage", back_populates="session")


class ChatMessage(Base):
    """Chat message in session"""

    __tablename__ = "chat_message"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    session_id = Column(
        String(36), ForeignKey("chat_session.id", ondelete="CASCADE"), nullable=False
    )
    role = Column(String(20), nullable=False)  # user, assistant
    content = Column(Text, nullable=False)
    metadata = Column(JSON, nullable=True)  # For AI lesson data, citations, etc.
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    session = relationship("ChatSession", back_populates="messages")

    __table_args__ = (Index("idx_message_session", "session_id"),)


# ============================================================================
# Content Management
# ============================================================================


class NewsArticle(Base):
    """News article"""

    __tablename__ = "news_article"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    author_id = Column(String(36), ForeignKey("user.id"), nullable=False)
    title = Column(String(255), nullable=False, index=True)
    excerpt = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    category = Column(String(100), nullable=True)
    status = Column(
        SQLEnum(NewsArticleStatus), default=NewsArticleStatus.DRAFT, nullable=False
    )
    featured = Column(Boolean, default=False)
    image_url = Column(String(512), nullable=True)
    views_count = Column(Integer, default=0)
    published_date = Column(DateTime, nullable=True)
    scheduled_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    author = relationship("User")

    __table_args__ = (
        Index("idx_article_status", "status"),
        Index("idx_article_published", "published_date"),
    )


class GalleryAlbum(Base):
    """Photo/media album"""

    __tablename__ = "gallery_album"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=True)
    uploader_id = Column(String(36), ForeignKey("user.id"), nullable=True)
    cover_image_url = Column(String(512), nullable=True)
    media_count = Column(Integer, default=0)
    media_type = Column(String(50), nullable=True)  # photos, videos, mixed
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    # Relationships
    uploader = relationship("User")
    items = relationship("GalleryItem", back_populates="album")


class GalleryItem(Base):
    """Individual gallery item (photo/video)"""

    __tablename__ = "gallery_item"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    album_id = Column(
        String(36), ForeignKey("gallery_album.id", ondelete="CASCADE"), nullable=False
    )
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    media_url = Column(String(512), nullable=False)
    thumbnail_url = Column(String(512), nullable=True)
    media_type = Column(String(50), nullable=True)  # image, video
    order = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    album = relationship("GalleryAlbum", back_populates="items")

    __table_args__ = (Index("idx_item_album", "album_id"),)


class Announcement(Base):
    """System announcement"""

    __tablename__ = "announcement"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    title = Column(String(255), nullable=False, index=True)
    excerpt = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    priority = Column(String(20), nullable=True)  # high, medium, low
    audience = Column(
        SQLEnum(AnnouncementAudience),
        default=AnnouncementAudience.ALL_MEMBERS,
        nullable=False,
    )
    published_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    expiry_date = Column(DateTime, nullable=True)
    status = Column(
        SQLEnum(NewsArticleStatus), default=NewsArticleStatus.PUBLISHED, nullable=False
    )
    created_by = Column(String(36), ForeignKey("user.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    __table_args__ = (
        Index("idx_announcement_expiry", "expiry_date"),
        Index("idx_announcement_audience", "audience"),
    )


# ============================================================================
# System & Monitoring
# ============================================================================


class SystemActivity(Base):
    """System activity log"""

    __tablename__ = "system_activity"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    student_id = Column(
        String(36), ForeignKey("student.id", ondelete="SET NULL"), nullable=True
    )
    activity_type = Column(SQLEnum(ActivityType), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    severity = Column(SQLEnum(Severity), default=Severity.INFO, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (
        Index("idx_activity_student", "student_id"),
        Index("idx_activity_type", "activity_type"),
        Index("idx_activity_date", "created_at"),
    )


class AuditLog(Base):
    """Audit trail for security"""

    __tablename__ = "audit_log"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    user_id = Column(
        String(36), ForeignKey("user.id", ondelete="SET NULL"), nullable=True
    )
    action = Column(String(255), nullable=False)
    entity_type = Column(String(100), nullable=True)  # user, program, student, etc.
    entity_id = Column(String(36), nullable=True)
    log_type = Column(String(50), nullable=True)  # security, user, program, system
    status = Column(String(20), nullable=True)  # success, failure
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(500), nullable=True)
    details = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    user = relationship("User", back_populates="audit_logs")

    __table_args__ = (
        Index("idx_audit_user", "user_id"),
        Index("idx_audit_date", "created_at"),
        Index("idx_audit_type", "log_type"),
    )


class ApplicationRequest(Base):
    """Student application to programs"""

    __tablename__ = "application_request"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    student_id = Column(
        String(36), ForeignKey("student.id", ondelete="CASCADE"), nullable=False
    )
    program_id = Column(
        String(36), ForeignKey("program.id", ondelete="CASCADE"), nullable=False
    )
    motivation = Column(Text, nullable=True)
    status = Column(
        String(20), default="pending", nullable=False
    )  # pending, approved, rejected
    applied_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    reviewed_at = Column(DateTime, nullable=True)
    reviewed_by = Column(String(36), ForeignKey("user.id"), nullable=True)

    # Relationships
    student = relationship("Student", back_populates="applications")


# Re-add this relationship to Student model
Student.applications = relationship("ApplicationRequest", back_populates="student")


class ContactMessage(Base):
    """Contact form submissions"""

    __tablename__ = "contact_message"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid4()))
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(20), nullable=True)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(
        String(20), default="unread", nullable=False
    )  # unread, read, replied
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    __table_args__ = (
        Index("idx_contact_status", "status"),
        Index("idx_contact_date", "created_at"),
    )
