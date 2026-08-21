"""API v1 routes"""

from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    users,
    students,
    attendance,
    programs,
    volunteers,
    courses,
    community,
    content,
)

api_router = APIRouter()

# Include routers
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(students.router)
api_router.include_router(attendance.router)
api_router.include_router(programs.router)
api_router.include_router(volunteers.router)
api_router.include_router(courses.router)
api_router.include_router(community.router)
api_router.include_router(content.router)
