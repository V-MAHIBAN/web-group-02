"""Pydantic schemas for request/response validation"""

from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, validator
from app.models import (
    UserRole,
    UserStatus,
    StudentStatus,
    AttendanceStatus,
    ProgramStatus,
    VolunteerApplicationStatus,
    NewsArticleStatus,
    AnnouncementAudience,
    CertificateStatus,
    HourEntryStatus,
)

# ============================================================================
# Authentication Schemas
# ============================================================================


class LoginRequest(BaseModel):
    """Login request"""

    email: EmailStr
    password: str = Field(..., min_length=8, max_length=255)


class LoginResponse(BaseModel):
    """Login response"""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user_id: str
    roles: List[UserRole]


class TokenRefreshRequest(BaseModel):
    """Token refresh request"""

    refresh_token: str


class TokenRefreshResponse(BaseModel):
    """Token refresh response"""

    access_token: str
    token_type: str = "bearer"


class PasswordResetRequest(BaseModel):
    """Password reset request"""

    email: EmailStr


class PasswordReset(BaseModel):
    """Password reset"""

    token: str
    new_password: str = Field(..., min_length=12)
    confirm_password: str


class UserSignup(BaseModel):
    """User signup"""

    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: Optional[str] = None
    password: str = Field(..., min_length=12)
    confirm_password: str
    role: UserRole

    @validator("password")
    def validate_password(cls, v):
        """Validate password strength"""
        if not any(c.isupper() for c in v):
            raise ValueError("Password must contain uppercase letter")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain digit")
        if not any(c in "!@#$%^&*" for c in v):
            raise ValueError("Password must contain special character")
        return v


# ============================================================================
# User Schemas
# ============================================================================


class UserBase(BaseModel):
    """Base user schema"""

    name: str
    email: EmailStr
    phone: Optional[str] = None
    status: UserStatus = UserStatus.ACTIVE
    avatar_url: Optional[str] = None
    department: Optional[str] = None


class UserCreate(UserBase):
    """User creation"""

    password: str
    roles: List[UserRole] = [UserRole.GUEST]


class UserUpdate(BaseModel):
    """User update"""

    name: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    department: Optional[str] = None


class UserResponse(UserBase):
    """User response"""

    id: str
    roles: List[UserRole]
    last_login: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ============================================================================
# Student Schemas
# ============================================================================


class StudentBase(BaseModel):
    """Base student schema"""

    student_id: str
    status: StudentStatus = StudentStatus.ACTIVE
    grade_level: Optional[str] = None
    major: Optional[str] = None
    gpa: Optional[float] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    notes: Optional[str] = None


class StudentCreate(StudentBase):
    """Student creation"""

    user_id: str


class StudentUpdate(BaseModel):
    """Student update"""

    status: Optional[StudentStatus] = None
    grade_level: Optional[str] = None
    major: Optional[str] = None
    gpa: Optional[float] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    notes: Optional[str] = None


class StudentResponse(StudentBase):
    """Student response"""

    id: str
    user_id: str
    attendance_rate: float
    enrolled_courses: int
    joined_date: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class StudentDetailResponse(StudentResponse):
    """Student detail with relationships"""

    user: Optional[UserResponse] = None
    attendance_records: List["AttendanceRecordResponse"] = []
    programs: List["ProgramResponse"] = []


# ============================================================================
# Attendance Schemas
# ============================================================================


class AttendanceCheckIn(BaseModel):
    """Check-in request"""

    student_id: str
    program_id: str
    status: AttendanceStatus = AttendanceStatus.PRESENT
    room_or_gate: Optional[str] = None
    notes: Optional[str] = None


class AttendanceUpdate(BaseModel):
    """Attendance record update"""

    status: Optional[AttendanceStatus] = None
    notes: Optional[str] = None


class AttendanceRecordResponse(BaseModel):
    """Attendance record response"""

    id: str
    student_id: str
    program_id: str
    check_in_date: datetime
    status: AttendanceStatus
    room_or_gate: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ============================================================================
# Program Schemas
# ============================================================================


class ProgramBase(BaseModel):
    """Base program schema"""

    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    status: ProgramStatus = ProgramStatus.UPCOMING
    instructor: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    capacity: Optional[int] = None
    level: Optional[str] = None
    image_url: Optional[str] = None
    prerequisites: List[str] = []
    topics: List[str] = []


class ProgramCreate(ProgramBase):
    """Program creation"""

    pass


class ProgramUpdate(BaseModel):
    """Program update"""

    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    status: Optional[ProgramStatus] = None
    instructor: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    capacity: Optional[int] = None
    level: Optional[str] = None
    image_url: Optional[str] = None


class ProgramResponse(ProgramBase):
    """Program response"""

    id: str
    enrolled_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ============================================================================
# Volunteer Schemas
# ============================================================================


class VolunteerProfileResponse(BaseModel):
    """Volunteer profile response"""

    id: str
    user_id: str
    hours_total: float
    events_total: int
    tier: Optional[str] = None
    verified_hours: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class VolunteerApplicationCreate(BaseModel):
    """Volunteer application creation"""

    program_id: str
    motivation: Optional[str] = None
    skills: List[str] = []
    education: Optional[str] = None
    experience: Optional[str] = None


class VolunteerApplicationUpdate(BaseModel):
    """Volunteer application update"""

    status: Optional[VolunteerApplicationStatus] = None
    notes: Optional[str] = None
    rejection_reason: Optional[str] = None


class VolunteerApplicationResponse(BaseModel):
    """Volunteer application response"""

    id: str
    volunteer_id: str
    program_id: str
    status: VolunteerApplicationStatus
    motivation: Optional[str] = None
    skills: List[str] = []
    applied_at: datetime

    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    """Task creation"""

    program_id: str
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    task_date: datetime
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    location: Optional[str] = None
    hours_required: float = 0.0


class TaskResponse(BaseModel):
    """Task response"""

    id: str
    program_id: str
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    status: ProgramStatus
    task_date: datetime
    location: Optional[str] = None
    hours_required: float
    enrolled_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class VolunteerHourEntryCreate(BaseModel):
    """Hour entry creation"""

    task_id: Optional[str] = None
    hours: float = Field(..., gt=0, le=24)
    category: Optional[str] = None
    notes: Optional[str] = None


class VolunteerHourEntryResponse(BaseModel):
    """Hour entry response"""

    id: str
    volunteer_id: str
    hours: float
    category: Optional[str] = None
    status: HourEntryStatus
    entry_date: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class CertificateResponse(BaseModel):
    """Certificate response"""

    id: str
    volunteer_id: str
    program_id: str
    title: str
    credential_id: str
    issued_date: datetime
    expires_date: Optional[datetime] = None
    status: CertificateStatus
    skills: List[str] = []

    class Config:
        from_attributes = True


# ============================================================================
# Course Schemas
# ============================================================================


class CourseModuleCreate(BaseModel):
    """Course module creation"""

    title: str
    description: Optional[str] = None
    module_type: Optional[str] = None
    content: Optional[str] = None
    duration_minutes: Optional[int] = None
    order: int


class CourseModuleResponse(BaseModel):
    """Course module response"""

    id: str
    title: str
    module_type: Optional[str] = None
    duration_minutes: Optional[int] = None
    is_completed: bool

    class Config:
        from_attributes = True


class DeadlineCreate(BaseModel):
    """Deadline creation"""

    title: str
    description: Optional[str] = None
    due_date: datetime
    priority: Optional[str] = None


class DeadlineResponse(BaseModel):
    """Deadline response"""

    id: str
    title: str
    due_date: datetime
    priority: Optional[str] = None
    is_completed: bool

    class Config:
        from_attributes = True


class CourseCreate(BaseModel):
    """Course creation"""

    title: str
    description: Optional[str] = None
    instructor: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    image_url: Optional[str] = None
    duration_days: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


class CourseResponse(BaseModel):
    """Course response"""

    id: str
    title: str
    instructor: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
    progress_percentage: float
    total_modules: int
    completed_modules: int
    created_at: datetime

    class Config:
        from_attributes = True


class CourseDetailResponse(CourseResponse):
    """Course detail with modules and deadlines"""

    modules: List[CourseModuleResponse] = []
    deadlines: List[DeadlineResponse] = []


# ============================================================================
# Community Schemas
# ============================================================================


class CommunityPostCreate(BaseModel):
    """Community post creation"""

    title: str
    content: str
    tags: List[str] = []
    category: Optional[str] = None


class CommunityReplyCreate(BaseModel):
    """Community reply creation"""

    content: str


class CommunityReplyResponse(BaseModel):
    """Community reply response"""

    id: str
    author_id: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class CommunityPostResponse(BaseModel):
    """Community post response"""

    id: str
    author_id: str
    title: str
    content: str
    tags: List[str] = []
    category: Optional[str] = None
    likes_count: int
    replies_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class CommunityPostDetailResponse(CommunityPostResponse):
    """Community post detail with replies"""

    replies: List[CommunityReplyResponse] = []


# ============================================================================
# Chat Schemas
# ============================================================================


class ChatMessageCreate(BaseModel):
    """Chat message creation"""

    content: str


class ChatMessageResponse(BaseModel):
    """Chat message response"""

    id: str
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class ChatSessionCreate(BaseModel):
    """Chat session creation"""

    title: Optional[str] = None
    category: Optional[str] = None


class ChatSessionResponse(BaseModel):
    """Chat session response"""

    id: str
    title: Optional[str] = None
    category: Optional[str] = None
    message_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class ChatSessionDetailResponse(ChatSessionResponse):
    """Chat session detail with messages"""

    messages: List[ChatMessageResponse] = []


# ============================================================================
# Content Schemas
# ============================================================================


class NewsArticleCreate(BaseModel):
    """News article creation"""

    title: str
    excerpt: Optional[str] = None
    content: str
    category: Optional[str] = None
    status: NewsArticleStatus = NewsArticleStatus.DRAFT
    featured: bool = False
    image_url: Optional[str] = None
    scheduled_date: Optional[datetime] = None


class NewsArticleUpdate(BaseModel):
    """News article update"""

    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    status: Optional[NewsArticleStatus] = None
    featured: Optional[bool] = None


class NewsArticleResponse(BaseModel):
    """News article response"""

    id: str
    title: str
    excerpt: Optional[str] = None
    category: Optional[str] = None
    status: NewsArticleStatus
    featured: bool
    views_count: int
    published_date: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class GalleryItemResponse(BaseModel):
    """Gallery item response"""

    id: str
    title: Optional[str] = None
    media_url: str
    thumbnail_url: Optional[str] = None
    media_type: Optional[str] = None

    class Config:
        from_attributes = True


class GalleryAlbumCreate(BaseModel):
    """Gallery album creation"""

    title: str
    description: Optional[str] = None
    category: Optional[str] = None


class GalleryAlbumResponse(BaseModel):
    """Gallery album response"""

    id: str
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    media_count: int
    cover_image_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class GalleryAlbumDetailResponse(GalleryAlbumResponse):
    """Gallery album detail with items"""

    items: List[GalleryItemResponse] = []


# ============================================================================
# Announcement Schemas
# ============================================================================


class AnnouncementCreate(BaseModel):
    """Announcement creation"""

    title: str
    excerpt: Optional[str] = None
    content: str
    priority: Optional[str] = None
    audience: AnnouncementAudience = AnnouncementAudience.ALL_MEMBERS
    expiry_date: Optional[datetime] = None


class AnnouncementResponse(BaseModel):
    """Announcement response"""

    id: str
    title: str
    excerpt: Optional[str] = None
    priority: Optional[str] = None
    audience: AnnouncementAudience
    published_date: datetime
    expiry_date: Optional[datetime] = None

    class Config:
        from_attributes = True


# ============================================================================
# Error Schemas
# ============================================================================


class ErrorResponse(BaseModel):
    """Error response"""

    error: str
    code: str
    status_code: int
    details: Optional[Dict[str, Any]] = None


class ValidationErrorResponse(BaseModel):
    """Validation error response"""

    error: str
    code: str = "VALIDATION_ERROR"
    status_code: int = 422
    details: Dict[str, List[str]]


# ============================================================================
# Pagination Schemas
# ============================================================================


class PaginationParams(BaseModel):
    """Pagination parameters"""

    skip: int = Field(0, ge=0)
    limit: int = Field(20, ge=1, le=100)


class PaginatedResponse(BaseModel):
    """Paginated response"""

    total: int
    skip: int
    limit: int
    items: List[Dict[str, Any]]


# Update forward references
StudentDetailResponse.update_forward_refs()
