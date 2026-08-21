# Backend for American Corner Batticaloa (ACB) Management System

A production-grade FastAPI backend for the ACB multi-application platform.

## Overview

This backend serves five integrated applications:
- **Academic-Staff**: Student attendance and academic management
- **Admin-Portal**: Central operations and content management
- **Education-Community**: Online learning and community platform
- **Public-Portal**: Public access and authentication gateway
- **Volunteer-Connect**: Volunteer hour tracking and engagement

## Tech Stack

- **Framework**: FastAPI 0.104.1
- **Database**: PostgreSQL (via Supabase)
- **ORM**: SQLAlchemy 2.0
- **Authentication**: JWT with refresh tokens
- **Server**: Uvicorn
- **Validation**: Pydantic v2

## Project Structure

```
backend/
├── app/
│   ├── core/              # Core configuration, database, security
│   ├── models/            # SQLAlchemy models
│   ├── schemas/           # Pydantic request/response schemas
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/ # API route handlers
│   ├── services/          # Business logic services
│   ├── middleware/        # Custom middleware and auth
│   ├── utils/             # Utility functions
│   └── main.py            # FastAPI app factory
├── migrations/            # Alembic database migrations
├── tests/                 # Test suite
├── requirements.txt       # Python dependencies
├── .env.example           # Environment template
├── Dockerfile             # Docker configuration
└── docker-compose.yml     # Docker Compose setup
```

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

**Required variables:**
- `DATABASE_URL`: PostgreSQL connection string (Supabase)
- `SECRET_KEY`: JWT secret key
- `CORS_ORIGINS`: Allowed frontend domains

### 3. Database Initialization

```bash
# Create tables
python -m alembic upgrade head

# Or create from models directly (development only)
python -c "from app.models import Base; from app.core.database import engine; Base.metadata.create_all(engine)"
```

### 4. Run Development Server

```bash
python main.py
```

Server will be available at `http://localhost:8000`

## API Documentation

Interactive API docs are available at:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## Authentication

All protected endpoints require JWT authentication via Bearer token:

```
Authorization: Bearer {access_token}
```

### Login Flow

1. POST `/api/v1/auth/login` with email and password
2. Receive `access_token` (30 min) and `refresh_token` (30 days)
3. Use access token for API requests
4. Refresh token when expired using `/api/v1/auth/refresh-token`

## Key Features

### 1. Multi-Role Access Control

- **Admin**: Full system access
- **Staff**: Manage students, programs, attendance
- **Volunteer**: Track hours, view tasks, community access
- **Student**: Profile, courses, community, registrations
- **Guest**: Public access only

### 2. Attendance Management

- Real-time check-in/check-out
- Late entry logging with reasons
- Attendance metrics and reporting
- Bulk import support

### 3. Program Management

- Program lifecycle (enrolling → completed)
- Student enrollment with capacity limits
- Volunteer applications with workflow
- Progress tracking

### 4. Volunteer Management

- Task/opportunity browsing
- Hour entry and verification
- Tier calculation (Gold/Silver/Bronze)
- Certificate generation

### 5. Education Platform

- Course enrollment and progress
- Interactive modules (video, reading, quiz, workshop)
- Assignment deadlines with reminders
- Community discussion board
- AI chat assistant (lesson planning)

### 6. Content Management

- News articles with scheduling
- Photo/video galleries
- System announcements with audience targeting
- Audit logging for all actions

## Error Handling

All errors follow standard format:

```json
{
  "error": "Human-readable message",
  "code": "ERROR_CODE",
  "status_code": 400,
  "details": {}
}
```

Common status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Validation Error
- `429`: Rate Limited
- `500`: Internal Server Error

## Database Schema

### Core Entities

**Users**
- User (authentication and profile)
- Student (academic info)
- VolunteerProfile (engagement tracking)

**Programs & Attendance**
- Program (course/program definition)
- AttendanceRecord (check-in/check-out)
- StudentApplication (program applications)

**Volunteering**
- VolunteerApplication (program applications)
- Task (volunteer opportunities)
- VolunteerHourEntry (hours logged)
- Certificate (achievement tracking)

**Education**
- Course (online courses)
- CourseModule (lesson components)
- Deadline (assignment due dates)
- CourseEnrollment (student enrollment)

**Community**
- CommunityPost (discussion posts)
- CommunityReply (post responses)
- ChatSession (AI chat)
- ChatMessage (chat messages)

**Content**
- NewsArticle (news/blog)
- GalleryAlbum (photo albums)
- GalleryItem (photos/videos)
- Announcement (system announcements)

**System**
- SystemActivity (activity feed)
- AuditLog (security audit trail)
- ContactMessage (contact form submissions)

### Relationships

```
User
 ├─ Student (1:1)
 │  ├─ AttendanceRecord (1:*)
 │  ├─ Programs (M:M via student_programs)
 │  └─ StudentApplication (1:*)
 ├─ VolunteerProfile (1:1)
 │  ├─ VolunteerApplication (1:*)
 │  ├─ VolunteerHourEntry (1:*)
 │  ├─ Certificate (1:*)
 │  └─ TaskEnrollment (1:*)
 ├─ AuditLog (1:*)
 └─ CommunityPost (1:*)

Program
 ├─ Students (M:M via student_programs)
 ├─ AttendanceRecord (1:*)
 ├─ VolunteerApplication (1:*)
 ├─ Course (1:*)
 ├─ Task (1:*)
 └─ Certificate (1:*)

Task
 ├─ Program (M:1)
 └─ TaskEnrollment (1:*)

Course
 ├─ Program (M:1)
 ├─ CourseModule (1:*)
 ├─ Deadline (1:*)
 └─ CourseEnrollment (1:*)
```

## Testing

Run tests with pytest:

```bash
pytest tests/ -v

# With coverage
pytest tests/ --cov=app --cov-report=html
```

## Deployment

### Docker

```bash
# Build image
docker build -t acb-backend .

# Run container
docker run -p 8000:8000 --env-file .env acb-backend
```

### Docker Compose

```bash
docker-compose up -d
```

### Production

1. Set `ENVIRONMENT=production`
2. Use strong `SECRET_KEY`
3. Configure `CORS_ORIGINS` for frontend domain only
4. Enable `DEBUG=False`
5. Set up proper logging and monitoring
6. Use HTTPS/SSL certificates
7. Configure database backups

## Security Best Practices

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ CORS configuration
- ✅ Rate limiting on auth endpoints
- ✅ SQL injection prevention (ORM)
- ✅ XSS prevention (parametrized queries)
- ✅ Audit logging
- ✅ Session timeout (30 min)
- ✅ Optional 2FA support
- ✅ Data encryption in transit (HTTPS)

## Performance Considerations

- Connection pooling (NullPool for Supabase)
- Database indexing on frequently queried fields
- Pagination (default 20, max 100 items)
- Lazy loading for relationships
- Response caching (configurable)
- Query optimization with joins

## API Endpoints Summary

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/signup` | User registration |
| POST | `/api/v1/auth/refresh-token` | Refresh access token |
| GET | `/api/v1/users` | List users (admin) |
| GET | `/api/v1/students` | List students (staff) |
| POST | `/api/v1/attendance/check-in` | Record attendance |
| GET | `/api/v1/programs` | List programs |
| POST | `/api/v1/programs` | Create program (staff) |

See `/api/docs` for complete API documentation.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/acb` |
| `SECRET_KEY` | JWT secret key | `your-super-secret-key` |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry | `30` |
| `ENVIRONMENT` | Environment mode | `development` |
| `CORS_ORIGINS` | Allowed origins | `http://localhost:3000` |
| `DEBUG` | Debug mode | `True` |

## Contributing

1. Create feature branch
2. Follow PEP 8 style guide
3. Add tests for new features
4. Submit pull request

## License

© American Corner Batticaloa (ACB) - All rights reserved

## Support

For issues or questions, contact the development team.
