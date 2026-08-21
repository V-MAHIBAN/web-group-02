"""
BACKEND SYSTEM ARCHITECTURE AND INTEGRATION GUIDE

This document provides a comprehensive overview of the ACB Backend system
architecture, data models, and integration patterns.
"""

# ============================================================================
# SYSTEM ARCHITECTURE OVERVIEW
# ============================================================================

"""
LAYERED ARCHITECTURE

┌─────────────────────────────────────────────────────────────────┐
│                    FastAPI Application Layer                    │
│                         (Port 8000)                              │
│  - HTTP Request/Response Handling                                │
│  - CORS, Authentication, Rate Limiting                           │
│  - Automatic API Documentation (Swagger, ReDoc)                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API Routes (v1)                             │
│                                                                   │
│  ├─ /auth         → Authentication & Authorization               │
│  ├─ /users        → User Management                              │
│  ├─ /students     → Student Management                           │
│  ├─ /attendance   → Attendance Tracking                          │
│  ├─ /programs     → Program Management                           │
│  ├─ /volunteers   → Volunteer Operations                         │
│  ├─ /courses      → Education Management                         │
│  ├─ /community    → Community & Chat                             │
│  └─ /content      → News, Gallery, Announcements                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                          │
│                                                                   │
│  ├─ Services/       → Complex operation handlers                 │
│  ├─ Middleware/     → Authentication, Authorization, Logging     │
│  └─ Utils/          → Helper functions, Validation               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Data Validation & Serialization                 │
│                                                                   │
│  ├─ Pydantic Schemas → Input/Output validation                   │
│  └─ Type Hints       → Python type checking                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      ORM & Models Layer                          │
│                                                                   │
│  ├─ SQLAlchemy      → Database abstraction                       │
│  ├─ Models          → Entity definitions                         │
│  └─ Relationships   → Associations between entities              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Database Layer                              │
│                                                                   │
│  ├─ PostgreSQL      → Primary database                           │
│  ├─ Supabase        → Managed PostgreSQL                         │
│  └─ Connection Pool → NullPool for Supabase                      │
└─────────────────────────────────────────────────────────────────┘
"""


# ============================================================================
# DATA MODEL RELATIONSHIPS
# ============================================================================

"""
ENTITY-RELATIONSHIP DIAGRAM

User (Central Auth Model)
  ├─ Student (1:1)
  │   ├─ AttendanceRecord (1:M)
  │   ├─ StudentApplication (1:M)
  │   └─ Programs (M:M via student_programs table)
  │
  ├─ VolunteerProfile (1:1)
  │   ├─ VolunteerApplication (1:M)
  │   ├─ VolunteerHourEntry (1:M)
  │   ├─ Certificate (1:M)
  │   └─ TaskEnrollment (1:M)
  │
  ├─ AuditLog (1:M)
  │   └─ All user actions logged
  │
  └─ CommunityPost (1:M)
      └─ Discussion posts created

Program (Core Entity)
  ├─ Student (M:M)
  ├─ AttendanceRecord (1:M)
  ├─ VolunteerApplication (1:M)
  ├─ Course (1:M)
  ├─ Task (1:M)
  └─ Certificate (1:M)

Course (Education Module)
  ├─ CourseModule (1:M)
  ├─ Deadline (1:M)
  ├─ CourseEnrollment (1:M)
  └─ Program (M:1)

Task (Volunteer Opportunities)
  ├─ Program (M:1)
  └─ TaskEnrollment (1:M)

Content (News & Gallery)
  ├─ NewsArticle (1:M)
  ├─ GalleryAlbum (1:M)
  │   └─ GalleryItem (1:M)
  └─ Announcement (1:M)

Communication
  ├─ CommunityPost (1:M)
  │   └─ CommunityReply (1:M)
  └─ ChatSession (1:M)
      └─ ChatMessage (1:M)
"""


# ============================================================================
# API REQUEST/RESPONSE FLOW
# ============================================================================

"""
AUTHENTICATION FLOW

1. User Login
   POST /api/v1/auth/login
   ├─ Receive: {email, password}
   ├─ Validate: Credentials against User model
   ├─ Hash check: Use bcrypt to verify password
   ├─ Create tokens: JWT access (30 min) + refresh (30 days)
   └─ Return: {access_token, refresh_token, user_id, roles}

2. API Request with Auth
   GET /api/v1/students
   ├─ Header: Authorization: Bearer <access_token>
   ├─ Middleware: Extract and validate JWT
   ├─ Check: Token not expired
   ├─ Verify: User exists and is active
   ├─ Apply: Role-based authorization
   └─ Process: Execute endpoint logic

3. Token Refresh
   POST /api/v1/auth/refresh-token
   ├─ Receive: {refresh_token}
   ├─ Validate: Token not expired
   ├─ Generate: New access_token
   └─ Return: {access_token, token_type}

DATA FLOW: Request to Response

Frontend Request
    ↓
FastAPI Router matches endpoint
    ↓
Authentication middleware validates JWT
    ↓
Authorization middleware checks role
    ↓
Endpoint handler processes request
    ↓
Pydantic schema validates input
    ↓
Business logic executes
    ↓
SQLAlchemy queries execute
    ↓
Database returns data
    ↓
Response schema serializes data
    ↓
JSON Response with status code
    ↓
Frontend receives response
"""


# ============================================================================
# MIDDLEWARE PIPELINE
# ============================================================================

"""
REQUEST PROCESSING PIPELINE

Request Enters
    ↓
[1] CORS Middleware
    ├─ Check allowed origins
    ├─ Validate method (GET, POST, etc.)
    └─ Add CORS headers to response
    ↓
[2] Trusted Host Middleware
    ├─ Verify host header
    └─ Prevent host header attacks
    ↓
[3] Logging Middleware
    ├─ Log request: method, path, query params
    ├─ Record start time
    └─ Capture client IP
    ↓
[4] Route Matching
    ├─ Find matching endpoint
    └─ Extract path parameters
    ↓
[5] Authentication Middleware (if required)
    ├─ Extract Bearer token from Authorization header
    ├─ Decode JWT
    ├─ Validate signature and expiry
    └─ Fetch User from database
    ↓
[6] Authorization Middleware (if required)
    ├─ Check user roles against endpoint requirements
    └─ Verify permissions
    ↓
[7] Endpoint Handler
    ├─ Receive validated request data
    ├─ Execute business logic
    ├─ Interact with database
    └─ Return response
    ↓
[8] Response Validation
    ├─ Serialize response with Pydantic schema
    ├─ Convert to JSON
    └─ Add response headers
    ↓
[9] Logging Middleware (response)
    ├─ Log response status code
    ├─ Calculate process time
    └─ Add timing header (X-Process-Time)
    ↓
Response Sent to Frontend
"""


# ============================================================================
# DATABASE SCHEMA DESIGN
# ============================================================================

"""
NAMING CONVENTIONS

Tables:
  ├─ Singular: student, not students
  ├─ Lowercase: user, not User
  └─ Underscores: course_module, not courseModule

Columns:
  ├─ Lowercase with underscores: check_in_date
  ├─ Use standard prefixes:
  │   ├─ id (primary key)
  │   ├─ *_id (foreign key)
  │   ├─ is_* (boolean)
  │   ├─ created_at, updated_at (timestamps)
  │   └─ count (aggregates)
  └─ Avoid reserved words: use "status" not "state"

Relationships:
  ├─ Foreign key naming: <table>_id
  ├─ Many-to-many table: <table1>_<table2>
  └─ Join table ordering: alphabetical

INDEXES

Primary Indexes:
  ├─ All primary keys (id)
  ├─ All foreign keys (*_id)
  └─ Unique columns (email, student_id)

Performance Indexes:
  ├─ Frequently filtered: status, created_at
  ├─ Join columns: user_id, program_id
  └─ Search columns: name, email

Composite Indexes:
  ├─ (student_id, program_id, check_in_date)
  └─ For queries filtering on multiple columns
"""


# ============================================================================
# ERROR HANDLING & VALIDATION
# ============================================================================

"""
VALIDATION LAYERS

Layer 1: HTTP Request Validation
  ├─ Pydantic schemas validate JSON
  ├─ Type checking (int, str, email, etc.)
  ├─ Required field validation
  └─ Custom validators (@validator)

Layer 2: Business Logic Validation
  ├─ Database constraints (unique, foreign key)
  ├─ Business rules (capacity limits, status transitions)
  ├─ Duplicate check (not already applied)
  └─ State validation (can only check-in during program time)

Layer 3: Database Validation
  ├─ Database constraints (NOT NULL, UNIQUE)
  ├─ Referential integrity (foreign keys)
  ├─ Check constraints (value ranges)
  └─ Default values

ERROR RESPONSE FORMAT

Standard error response (application exceptions):
{
    "error": "Human-readable message",
    "code": "ERROR_CODE_IDENTIFIER",
    "status_code": 400,
    "details": {
        "field": "Additional error info"
    }
}

Status codes used:
├─ 200: OK - Request successful
├─ 201: Created - Resource created successfully
├─ 204: No Content - Successful but no content
├─ 400: Bad Request - Invalid input
├─ 401: Unauthorized - No valid authentication
├─ 403: Forbidden - Authenticated but insufficient permissions
├─ 404: Not Found - Resource doesn't exist
├─ 409: Conflict - Duplicate resource or state conflict
├─ 422: Unprocessable Entity - Validation failed
├─ 429: Too Many Requests - Rate limit exceeded
└─ 500: Internal Server Error - Unhandled exception

EXCEPTION HIERARCHY

AppException (Base)
├─ ValidationException (422)
├─ AuthenticationException (401)
├─ AuthorizationException (403)
├─ NotFoundException (404)
├─ ConflictException (409)
└─ RateLimitException (429)
"""


# ============================================================================
# AUTHENTICATION & SECURITY
# ============================================================================

"""
MULTI-ROLE ACCESS CONTROL

Role Hierarchy (most to least permissive):
┌────────────────────────────────┐
│ Admin                          │
│ ├─ Full system access          │
│ ├─ User management             │
│ ├─ System settings             │
│ └─ Can act as any role         │
└────────────────────────────────┘
         ↓
┌────────────────────────────────┐
│ Staff                          │
│ ├─ Student management          │
│ ├─ Attendance recording        │
│ ├─ Program management          │
│ └─ Content creation            │
└────────────────────────────────┘
         ↓
┌────────────────────────────────┐
│ Volunteer                      │
│ ├─ Task viewing/enrollment     │
│ ├─ Hour logging                │
│ ├─ Community participation     │
│ └─ Profile management          │
└────────────────────────────────┘
         ↓
┌────────────────────────────────┐
│ Student                        │
│ ├─ Profile management          │
│ ├─ Course enrollment           │
│ ├─ Program registration        │
│ └─ Community participation     │
└────────────────────────────────┘
         ↓
┌────────────────────────────────┐
│ Guest                          │
│ ├─ Public landing page         │
│ ├─ Gallery viewing             │
│ ├─ Program browsing            │
│ └─ Contact form                │
└────────────────────────────────┘

TOKEN SECURITY

Access Token:
├─ Duration: 30 minutes (configurable)
├─ Contains: user_id, exp, iat
├─ Stored: In Authorization header
└─ Use: For API requests

Refresh Token:
├─ Duration: 30 days (configurable)
├─ Contains: user_id, exp, iat
├─ Stored: Secure HTTP-only cookie
└─ Use: To obtain new access token

Password Requirements:
├─ Minimum: 12 characters
├─ Must include:
│   ├─ Uppercase letter (A-Z)
│   ├─ Lowercase letter (a-z)
│   ├─ Number (0-9)
│   └─ Special character (!@#$%^&*)
└─ Hashing: bcrypt with salt

Rate Limiting:
├─ Login attempts: 5 per 15 minutes
├─ Failed login: Account lock for 15 minutes
└─ Password reset: 1 per 24 hours per email
"""


# ============================================================================
# PERFORMANCE OPTIMIZATION
# ============================================================================

"""
DATABASE OPTIMIZATION

Query Optimization:
├─ Use SELECT * only when necessary
├─ Add specific columns needed
├─ Use JOIN instead of multiple queries
├─ Add WHERE clauses to filter early
└─ Use LIMIT to restrict results

Indexing Strategy:
├─ Indexes on foreign keys
├─ Indexes on frequently filtered columns
├─ Composite indexes for common filters
└─ Avoid indexes on low-cardinality columns

Connection Management:
├─ Use connection pooling (NullPool for Supabase)
├─ Set max pool size based on traffic
├─ Use read replicas for reporting queries
└─ Monitor connection count

CACHING STRATEGY

Query Caching:
├─ Cache programs list (5 min)
├─ Cache attendance metrics (10 min)
├─ Cache user roles (until logout)
└─ Invalidate on changes

Response Caching:
├─ ETag headers for conditional requests
├─ Cache-Control headers per endpoint
├─ Redis for distributed caching
└─ CDN for static assets

N+1 Query Prevention:
├─ Use SQLAlchemy eager loading
├─ Use .joinedload() for relationships
├─ Use .selectinload() for collections
└─ Profile queries with echo=True

PAGINATION

Best Practices:
├─ Default: 20 items per page
├─ Maximum: 100 items per page
├─ Skip-limit pagination (not offset-limit for large datasets)
├─ Return total count for UI
└─ Sort by creation date by default

Cursor-based pagination (for large datasets):
├─ More efficient than offset
├─ Use ID as cursor
├─ Return next cursor in response
└─ Better performance on large tables
"""


# ============================================================================
# MONITORING & LOGGING
# ============================================================================

"""
LOGGING STRATEGY

Log Levels:
├─ DEBUG: Detailed diagnostic information (dev only)
├─ INFO: General informational messages (events)
├─ WARNING: Warning messages (potential issues)
├─ ERROR: Error messages (failures)
└─ CRITICAL: Critical errors (system down)

Structured Logging:
{
    "timestamp": "2024-01-15T10:30:45Z",
    "level": "INFO",
    "service": "acb-backend",
    "user_id": "uuid",
    "action": "student_check_in",
    "status": "success",
    "duration_ms": 245,
    "details": {...}
}

Audit Logging:
├─ User login/logout
├─ Role changes
├─ Data modifications (create, update, delete)
├─ Admin actions
├─ Failed authentication attempts
└─ Permission denials

Log Retention:
├─ Development: Keep all
├─ Staging: 30 days
├─ Production: 90 days
└─ Audit logs: 1 year

MONITORING

Health Checks:
├─ Endpoint: GET /health
├─ Checks:
│   ├─ Application is running
│   ├─ Database connection
│   └─ External services (optional)
└─ Return: {"status": "ok", "version": "1.0.0"}

Metrics to Monitor:
├─ Request rate (requests/second)
├─ Response time (p50, p95, p99)
├─ Error rate (errors per second)
├─ Database query time
├─ Connection pool usage
└─ CPU & memory usage

Alerts:
├─ Error rate > 1%
├─ Response time > 1000ms (p95)
├─ Database connection pool > 80%
├─ Disk space < 10%
└─ API availability < 99%
"""


# ============================================================================
# DEPLOYMENT CHECKLIST
# ============================================================================

"""
PRE-DEPLOYMENT

Code Quality:
  ✓ Run tests: pytest tests/
  ✓ Security scan: bandit -r app/
  ✓ Code style: flake8 app/
  ✓ Type check: mypy app/
  ✓ Dependency audit: pip-audit

Configuration:
  ✓ Verify all .env variables set
  ✓ Ensure SECRET_KEY is strong (random)
  ✓ Set CORS_ORIGINS to production domain only
  ✓ Set ENVIRONMENT=production
  ✓ Set DEBUG=False
  ✓ Configure logging level to INFO

Database:
  ✓ Test connection to production database
  ✓ Run migrations: alembic upgrade head
  ✓ Verify backups are working
  ✓ Check database size and growth
  ✓ Create backup before deployment

Infrastructure:
  ✓ Set up monitoring and alerting
  ✓ Configure log aggregation
  ✓ Set up load balancer (if needed)
  ✓ Configure reverse proxy (Nginx)
  ✓ Install SSL certificate
  ✓ Test failover procedures

DEPLOYMENT

Rolling Deployment (zero downtime):
  1. Keep existing instances running
  2. Start new instances with new code
  3. Route traffic to new instances gradually
  4. Remove old instances once stable
  5. Total time: 5-10 minutes

Blue-Green Deployment:
  1. Deploy new version to "green" environment
  2. Test in green environment
  3. Switch traffic to green
  4. Keep blue as fallback
  5. Rollback instantly if needed

POST-DEPLOYMENT

Verification:
  ✓ All endpoints responding
  ✓ Database queries working
  ✓ Authentication functioning
  ✓ No unusual errors in logs
  ✓ Response times normal
  ✓ Error rate < 0.1%

Monitoring:
  ✓ Dashboard showing metrics
  ✓ Alerts firing correctly
  ✓ Log aggregation working
  ✓ Performance baseline established

Rollback Plan:
  ✓ Know previous version
  ✓ Database migration rollback ready
  ✓ DNS change prepared
  ✓ Time to rollback < 2 minutes
"""

print(__doc__)
