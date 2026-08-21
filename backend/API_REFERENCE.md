# API Quick Reference Guide

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@acb.org",
  "password": "SecurePassword123!"
}

Response:
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "123",
    "name": "Admin User",
    "email": "admin@acb.org",
    "roles": ["admin"]
  }
}
```

### Refresh Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refresh_token": "your_refresh_token"
}
```

### Headers for Authenticated Requests
```
Authorization: Bearer your_access_token
Content-Type: application/json
```

---

## Students

### Get All Students
```http
GET /students
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "STU001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+94701234567",
    "grade_level": "Year 1",
    "major": "Computer Science",
    "gpa": 3.8,
    "attendance_rate": 92.5,
    "status": "ACTIVE"
  }
]
```

### Create Student
```http
POST /students
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+94701234568",
  "student_id": "STU002",
  "status": "ACTIVE",
  "grade_level": "Year 2",
  "major": "Business",
  "gpa": 3.5,
  "emergency_contact": "Parent",
  "emergency_phone": "+94701234567"
}

Response:
{
  "id": "uuid-123",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Search Students
```http
GET /students/search?query=Jane
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "STU002",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+94701234568"
  }
]
```

### Get Single Student
```http
GET /students/{student_id}
Authorization: Bearer YOUR_TOKEN
```

### Update Student
```http
PUT /students/{student_id}
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "gpa": 3.7,
  "attendance_rate": 95.0,
  "status": "ACTIVE"
}
```

### Delete Student
```http
DELETE /students/{student_id}
Authorization: Bearer YOUR_TOKEN
```

---

## Attendance

### Record Check-In
```http
POST /attendance/check-in
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "student_id": "STU001",
  "program_id": "PRG001",
  "room_or_gate": "Main Gate",
  "notes": "On time"
}

Response:
{
  "id": "ATT001",
  "student_id": "STU001",
  "status": "PRESENT",
  "check_in_date": "2024-01-20T09:00:00Z"
}
```

### Get Attendance Records
```http
GET /attendance/records?student_id=STU001&program_id=PRG001
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "ATT001",
    "student_id": "STU001",
    "program_id": "PRG001",
    "check_in_date": "2024-01-20T09:00:00Z",
    "status": "PRESENT"
  }
]
```

### Get Attendance Metrics
```http
GET /attendance/metrics/summary?student_id=STU001
Authorization: Bearer YOUR_TOKEN

Response:
{
  "total_sessions": 20,
  "present": 18,
  "late": 2,
  "absent": 0,
  "attendance_rate": 90.0
}
```

---

## Programs

### Get All Programs
```http
GET /programs
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "PRG001",
    "title": "English Conversation Classes",
    "description": "Learn conversational English",
    "status": "ONGOING",
    "instructor": "John Smith",
    "start_date": "2024-01-01T00:00:00Z",
    "end_date": "2024-02-01T00:00:00Z",
    "location": "Main Hall",
    "capacity": 50,
    "enrolled_count": 35,
    "level": "Intermediate"
  }
]
```

### Create Program
```http
POST /programs
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "New Workshop",
  "description": "Description here",
  "category": "Language",
  "status": "UPCOMING",
  "instructor": "Jane Doe",
  "start_date": "2024-02-01T00:00:00Z",
  "end_date": "2024-03-01T00:00:00Z",
  "location": "Conference Room",
  "capacity": 30,
  "level": "Beginner"
}
```

### Get Program Details
```http
GET /programs/{program_id}
Authorization: Bearer YOUR_TOKEN
```

### Update Program
```http
PUT /programs/{program_id}
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "status": "COMPLETED",
  "enrolled_count": 40
}
```

### Delete Program
```http
DELETE /programs/{program_id}
Authorization: Bearer YOUR_TOKEN
```

---

## Courses

### Get All Courses
```http
GET /courses
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "CRS001",
    "program_id": "PRG001",
    "title": "English Fundamentals",
    "instructor": "John Smith",
    "level": "Beginner",
    "status": "ONGOING",
    "total_modules": 10,
    "completed_modules": 5
  }
]
```

### Create Course
```http
POST /courses
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "program_id": "PRG001",
  "title": "Advanced English",
  "description": "Advanced level English course",
  "instructor": "Jane Doe",
  "category": "Language",
  "level": "Advanced",
  "status": "UPCOMING",
  "total_modules": 15,
  "duration_days": 60
}
```

### Enroll in Course
```http
POST /courses/enroll
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "course_id": "CRS001",
  "student_id": "STU001"
}
```

### Get Course Modules
```http
GET /courses/{course_id}/modules
Authorization: Bearer YOUR_TOKEN
```

### Create Course Deadline
```http
POST /courses/deadlines
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "course_id": "CRS001",
  "title": "Assignment 1",
  "due_date": "2024-02-15T23:59:59Z",
  "description": "Submit your first assignment"
}
```

---

## Volunteers

### Get Current Volunteer Profile
```http
GET /volunteers/me
Authorization: Bearer YOUR_TOKEN

Response:
{
  "id": "VOL001",
  "user_id": "USR001",
  "hours_total": 150.5,
  "events_total": 12,
  "verified_hours": 140.0,
  "tier": "Gold"
}
```

### Log Volunteer Hours
```http
POST /volunteers/hours
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "volunteer_id": "VOL001",
  "hours": 5.0,
  "task_id": "TASK001",
  "date": "2024-01-20T00:00:00Z",
  "description": "Event support",
  "status": "PENDING"
}

Response:
{
  "id": "HOUR001",
  "volunteer_id": "VOL001",
  "hours": 5.0,
  "status": "PENDING",
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Get Volunteer Hours
```http
GET /volunteers/hours?volunteer_id=VOL001
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "HOUR001",
    "hours": 5.0,
    "status": "VERIFIED",
    "task_id": "TASK001",
    "date": "2024-01-20T00:00:00Z"
  }
]
```

### Submit Volunteer Application
```http
POST /volunteers/applications
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "volunteer_id": "VOL001",
  "task_id": "TASK001",
  "cover_letter": "I would like to help with this task"
}

Response:
{
  "id": "APP001",
  "volunteer_id": "VOL001",
  "task_id": "TASK001",
  "status": "PENDING",
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Get Volunteer Certificates
```http
GET /volunteers/certificates
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "CERT001",
    "volunteer_id": "VOL001",
    "title": "Volunteer Excellence",
    "issued_date": "2024-01-15T00:00:00Z",
    "status": "ISSUED"
  }
]
```

---

## Community

### Get Community Posts
```http
GET /community/posts
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "POST001",
    "author_id": "USR001",
    "title": "How to improve English?",
    "content": "Share your tips...",
    "category": "Learning",
    "likes_count": 5,
    "replies_count": 3,
    "created_at": "2024-01-20T10:30:00Z"
  }
]
```

### Create Post
```http
POST /community/posts
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "New Discussion Topic",
  "content": "Let's discuss this topic...",
  "category": "General",
  "tags": ["Discussion", "Learning"]
}

Response:
{
  "id": "POST002",
  "title": "New Discussion Topic",
  "author_id": "USR001",
  "created_at": "2024-01-20T11:00:00Z"
}
```

### Like Post
```http
POST /community/posts/{post_id}/like
Authorization: Bearer YOUR_TOKEN
```

### Reply to Post
```http
POST /community/posts/{post_id}/reply
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "content": "Great discussion!"
}

Response:
{
  "id": "REPLY001",
  "post_id": "POST001",
  "author_id": "USR001",
  "content": "Great discussion!",
  "created_at": "2024-01-20T11:30:00Z"
}
```

---

## Content

### Get News Articles
```http
GET /content/news
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "NEWS001",
    "title": "Important Announcement",
    "excerpt": "Summary of news",
    "content": "Full content here",
    "category": "News",
    "featured": true,
    "published_date": "2024-01-20T00:00:00Z"
  }
]
```

### Create News Article
```http
POST /content/news
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "New Program Launch",
  "excerpt": "We are launching...",
  "content": "Full article content...",
  "category": "News",
  "featured": true
}
```

### Get Announcements
```http
GET /content/announcements
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "ANN001",
    "title": "System Maintenance",
    "content": "Scheduled maintenance on...",
    "priority": "high",
    "audience": "ALL_MEMBERS",
    "published_date": "2024-01-20T00:00:00Z",
    "expiry_date": "2024-02-20T00:00:00Z"
  }
]
```

### Get Gallery Albums
```http
GET /content/gallery
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "ALB001",
    "title": "Event Photos",
    "description": "Photos from our event",
    "category": "Events",
    "media_count": 15,
    "media_type": "photos"
  }
]
```

### Get Gallery Items
```http
GET /content/gallery/{album_id}/items
Authorization: Bearer YOUR_TOKEN

Response:
[
  {
    "id": "ITEM001",
    "album_id": "ALB001",
    "title": "Photo 1",
    "media_url": "https://...",
    "thumbnail_url": "https://...",
    "media_type": "image"
  }
]
```

---

## Users (Admin Only)

### Get All Users
```http
GET /users
Authorization: Bearer YOUR_TOKEN
```

### Get User Details
```http
GET /users/{user_id}
Authorization: Bearer YOUR_TOKEN
```

### Get Current User
```http
GET /users/me
Authorization: Bearer YOUR_TOKEN

Response:
{
  "id": "USR001",
  "name": "Admin User",
  "email": "admin@acb.org",
  "phone": "+94701234567",
  "roles": ["admin"],
  "status": "ACTIVE",
  "department": "Administration"
}
```

### Create User (Admin)
```http
POST /users
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "New Staff",
  "email": "newstaff@acb.org",
  "phone": "+94701234569",
  "password": "SecurePassword123!",
  "roles": ["staff"],
  "status": "ACTIVE",
  "department": "Operations"
}
```

### Update User
```http
PUT /users/{user_id}
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "department": "New Department"
}
```

### Delete User (Admin)
```http
DELETE /users/{user_id}
Authorization: Bearer YOUR_TOKEN
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Not authenticated"
}
```

### 403 Forbidden
```json
{
  "detail": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "Invalid email format",
      "type": "value_error.email"
    }
  ]
}
```

### 500 Server Error
```json
{
  "detail": "Internal server error"
}
```

---

## Pagination

For endpoints that return lists:

```http
GET /students?skip=0&limit=10
Authorization: Bearer YOUR_TOKEN
```

- `skip`: Number of records to skip (default: 0)
- `limit`: Number of records to return (default: 10, max: 100)

---

## Status Values

### User Status
- `ACTIVE`
- `INACTIVE`
- `SUSPENDED`
- `BANNED`

### Student Status
- `ACTIVE`
- `INACTIVE`
- `GRADUATED`
- `SUSPENDED`

### Program Status
- `UPCOMING`
- `ONGOING`
- `ENROLLING`
- `COMPLETED`
- `CANCELLED`

### Attendance Status
- `PRESENT`
- `LATE`
- `ABSENT`

### Hour Entry Status
- `PENDING`
- `VERIFIED`
- `REJECTED`

---

## Role Hierarchy

1. **Admin** - Full system access
2. **Staff** - Manage programs and attendance
3. **Volunteer** - Log hours, view tasks
4. **Student** - View programs, attend events
5. **Guest** - Limited read-only access

---

## Testing with cURL

```bash
# Login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@acb.org","password":"SecurePassword123!"}'

# Get current user (replace TOKEN)
curl -X GET "http://localhost:8000/api/v1/users/me" \
  -H "Authorization: Bearer TOKEN"

# Get all students
curl -X GET "http://localhost:8000/api/v1/students" \
  -H "Authorization: Bearer TOKEN"

# Create student
curl -X POST "http://localhost:8000/api/v1/students" \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@acb.org","phone":"+94701234567",...}'
```

---

## Interactive API Documentation

Access Swagger UI: **http://localhost:8000/docs**

All endpoints are documented with:
- Request/response schemas
- Example data
- Authorization requirements
- Try-it-out functionality

---

**Last Updated:** 2026-08-21  
**API Version:** v1  
**Status:** Production Ready
