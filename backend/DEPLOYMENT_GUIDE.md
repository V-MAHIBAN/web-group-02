"""
DEPLOYMENT AND SETUP GUIDE

This guide provides step-by-step instructions for setting up the ACB Backend
for development, testing, and production environments.
"""

# ============================================================================
# SECTION 1: LOCAL DEVELOPMENT SETUP
# ============================================================================

"""
1.1 Prerequisites
  - Python 3.11+
  - PostgreSQL 14+ (or Supabase account)
  - pip or pipenv
  - Git

1.2 Clone and Setup
  
  $ cd backend
  $ python -m venv venv
  $ source venv/bin/activate  # On Windows: venv\Scripts\activate
  $ pip install -r requirements.txt
  
1.3 Environment Configuration
  
  $ cp .env.example .env
  
  Then edit .env with your values:
    - DATABASE_URL: Your PostgreSQL connection string
    - SECRET_KEY: Generate a random key (min 32 chars)
    - CORS_ORIGINS: http://localhost:3000 for local frontend
  
1.4 Database Setup
  
  Option A: Using Alembic migrations
  $ alembic upgrade head
  
  Option B: Direct model creation (development only)
  $ python -c "from app.models import Base; from app.core.database import engine; Base.metadata.create_all(engine)"
  
1.5 Run Development Server
  
  $ python main.py
  
  Or with auto-reload:
  $ uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  
  Access API docs at: http://localhost:8000/api/docs
"""


# ============================================================================
# SECTION 2: DATABASE CONFIGURATION
# ============================================================================

"""
2.1 Local PostgreSQL Setup
  
  # Install PostgreSQL
  $ sudo apt-get install postgresql postgresql-contrib  # Ubuntu/Debian
  $ brew install postgresql  # macOS
  
  # Start service
  $ sudo systemctl start postgresql  # Linux
  $ brew services start postgresql  # macOS
  
  # Create database and user
  $ psql -U postgres
  postgres=# CREATE USER acb_user WITH PASSWORD 'strong_password';
  postgres=# CREATE DATABASE acb_db OWNER acb_user;
  postgres=# GRANT ALL PRIVILEGES ON DATABASE acb_db TO acb_user;
  postgres=# \q
  
  # Connection string for .env
  DATABASE_URL=postgresql://acb_user:strong_password@localhost:5432/acb_db

2.2 Supabase PostgreSQL Setup
  
  1. Create account at https://supabase.com
  2. Create new project
  3. Go to Project Settings → Database → Connection string (URI)
  4. Copy connection string to .env
  
  # Connection string for .env
  DATABASE_URL=postgresql://postgres:PASSWORD@db.supabase.co:5432/postgres

2.3 Database Initialization Script
  
  Create initial_setup.py in backend root:
  ```python
  from app.core.database import engine
  from app.models import Base
  
  Base.metadata.create_all(bind=engine)
  print("Database tables created successfully!")
  ```
  
  Run: python initial_setup.py

2.4 Create Admin User (after DB setup)
  
  Create init_admin.py in backend root:
  ```python
  from sqlalchemy.orm import Session
  from app.core.database import SessionLocal
  from app.core.security import hash_password
  from app.models import User, UserRole, UserStatus
  
  db = SessionLocal()
  
  admin = User(
      name="Admin User",
      email="admin@acb.org",
      hashed_password=hash_password("SecurePassword123!"),
      status=UserStatus.ACTIVE,
      roles=[UserRole.ADMIN]
  )
  
  db.add(admin)
  db.commit()
  
  print("Admin user created successfully!")
  db.close()
  ```
  
  Run: python init_admin.py
"""


# ============================================================================
# SECTION 3: ENVIRONMENT VARIABLES REFERENCE
# ============================================================================

"""
3.1 Required Variables

DATABASE_URL
  - Format: postgresql://user:password@host:port/database
  - Example: postgresql://acb_user:pass@localhost:5432/acb_db
  - Supabase: postgresql://postgres:PASSWORD@db.supabase.co:5432/postgres

SECRET_KEY
  - Generate with: python -c "import secrets; print(secrets.token_urlsafe(32))"
  - Min 32 characters
  - Different per environment

ALGORITHM
  - Default: HS256 (HMAC with SHA-256)
  - Keep as default unless JWT library updated

3.2 Optional Variables

ENVIRONMENT
  - development (default)
  - production
  - testing

DEBUG
  - True (development)
  - False (production)

CORS_ORIGINS
  - Development: http://localhost:3000,http://localhost:5173
  - Production: https://yourdomain.com
  - Multiple: comma-separated list

LOG_LEVEL
  - DEBUG
  - INFO (default)
  - WARNING
  - ERROR
  - CRITICAL

3.3 External Services

GOOGLE_GENAI_API_KEY
  - Get from Google AI Studio
  - For EduAssist AI chat feature
  - Optional (feature disabled if not set)

SENDGRID_API_KEY
  - Get from SendGrid
  - For email notifications
  - Optional (email disabled if not set)

RATE_LIMIT_LOGIN_ATTEMPTS
  - Default: 5
  - Attempts before account lock

RATE_LIMIT_WINDOW_MINUTES
  - Default: 15
  - Time window for rate limiting
"""


# ============================================================================
# SECTION 4: DOCKER DEPLOYMENT
# ============================================================================

"""
4.1 Build Docker Image
  
  $ docker build -t acb-backend:latest .
  
  # With custom tag
  $ docker build -t ghcr.io/acb/backend:v1.0.0 .

4.2 Run Single Container
  
  $ docker run -d \
      --name acb-backend \
      -p 8000:8000 \
      --env-file .env \
      acb-backend:latest

4.3 Docker Compose (recommended)
  
  $ docker-compose up -d
  
  # View logs
  $ docker-compose logs -f backend
  
  # Restart services
  $ docker-compose restart
  
  # Shut down
  $ docker-compose down

4.4 Production Docker Setup
  
  Edit docker-compose.yml:
  
  environment:
    - ENVIRONMENT=production
    - DEBUG=False
    - DATABASE_URL=postgresql://user:pass@db-host:5432/acb_db
    - SECRET_KEY=your-production-secret-key
    - CORS_ORIGINS=https://yourdomain.com

4.5 Push to Registry
  
  # GitHub Container Registry
  $ docker login ghcr.io
  $ docker tag acb-backend:latest ghcr.io/acb/backend:latest
  $ docker push ghcr.io/acb/backend:latest
"""


# ============================================================================
# SECTION 5: TESTING
# ============================================================================

"""
5.1 Unit Tests
  
  $ pytest tests/ -v
  
  # Specific test file
  $ pytest tests/test_auth.py -v
  
  # Specific test function
  $ pytest tests/test_auth.py::test_login -v

5.2 With Coverage
  
  $ pytest tests/ --cov=app --cov-report=html
  
  # View HTML report
  $ open htmlcov/index.html  # macOS
  $ xdg-open htmlcov/index.html  # Linux

5.3 Test Database (automatically created)
  
  Tests use separate test database configured in conftest.py
  Database is created before tests and dropped after

5.4 Load Testing
  
  Install: pip install locust
  
  Create locustfile.py:
  ```python
  from locust import HttpUser, task, between
  
  class APIUser(HttpUser):
      wait_time = between(1, 5)
      
      @task
      def list_students(self):
          self.client.get("/api/v1/students")
  ```
  
  Run: locust -f locustfile.py --host http://localhost:8000
"""


# ============================================================================
# SECTION 6: PRODUCTION DEPLOYMENT
# ============================================================================

"""
6.1 Pre-deployment Checklist
  
  ✓ Set ENVIRONMENT=production in .env
  ✓ Set DEBUG=False
  ✓ Generate new strong SECRET_KEY
  ✓ Configure CORS_ORIGINS for production domain only
  ✓ Set up HTTPS/SSL certificates
  ✓ Configure database backups
  ✓ Set up monitoring and logging
  ✓ Run tests: pytest tests/
  ✓ Run security checks: bandit -r app/
  ✓ Run code quality: flake8 app/

6.2 Deploy to Cloud Platforms

  6.2.1 Heroku
  
    $ heroku create acb-backend
    $ heroku config:set DATABASE_URL=postgresql://...
    $ heroku config:set SECRET_KEY=...
    $ git push heroku main
    
  6.2.2 AWS EC2
  
    1. Launch EC2 instance (Ubuntu 22.04)
    2. Install Docker and Docker Compose
    3. Clone repository
    4. Create .env file
    5. Run: docker-compose up -d
    6. Configure Nginx reverse proxy
    7. Set up SSL with Let's Encrypt
    
  6.2.3 DigitalOcean App Platform
  
    1. Connect GitHub repository
    2. Configure environment variables
    3. Set database connection string
    4. Deploy from main branch

6.3 Nginx Reverse Proxy Configuration
  
  /etc/nginx/sites-available/acb-api:
  
  server {
      listen 80;
      server_name api.yourdomain.com;
      
      location / {
          proxy_pass http://localhost:8000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_cache_bypass $http_upgrade;
      }
  }
  
  Enable: sudo ln -s /etc/nginx/sites-available/acb-api /etc/nginx/sites-enabled/
  Test: sudo nginx -t
  Reload: sudo systemctl reload nginx

6.4 SSL Certificate with Let's Encrypt
  
  $ sudo apt-get install certbot python3-certbot-nginx
  $ sudo certbot certonly --nginx -d api.yourdomain.com
  
  Update Nginx configuration with SSL certificate paths

6.5 Process Management with Supervisor
  
  /etc/supervisor/conf.d/acb-backend.conf:
  
  [program:acb-backend]
  command=/app/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
  directory=/app
  user=www-data
  autostart=true
  autorestart=true
  redirect_stderr=true
  stdout_logfile=/var/log/acb-backend.log
  
  Enable: sudo supervisorctl reread && sudo supervisorctl update

6.6 Logging and Monitoring
  
  ELK Stack (Elasticsearch, Logstash, Kibana):
  - Aggregate logs from all instances
  - Real-time monitoring
  - Performance analytics
  
  Datadog / New Relic:
  - Full-stack monitoring
  - APM (Application Performance Monitoring)
  - Alert management
"""


# ============================================================================
# SECTION 7: TROUBLESHOOTING
# ============================================================================

"""
7.1 Database Connection Issues
  
  Error: "could not connect to server: Connection refused"
  
  Solution:
  - Ensure PostgreSQL is running
  - Verify DATABASE_URL is correct
  - Check firewall rules (port 5432)
  - Test connection: psql -c "SELECT 1" -h host -U user
  
  Supabase specific:
  - Ensure IP whitelist allows your connection
  - Check for SSL mode: sslmode=require

7.2 JWT/Authentication Issues
  
  Error: "Invalid token" or "Token expired"
  
  Solution:
  - Verify SECRET_KEY hasn't changed
  - Check token timestamp hasn't drifted
  - Ensure ALGORITHM is correct
  - Clear browser cookies and login again

7.3 CORS Issues
  
  Error: "No 'Access-Control-Allow-Origin' header"
  
  Solution:
  - Add frontend URL to CORS_ORIGINS
  - Ensure no typos in domain
  - Remove http:// or https:// duplicates
  - Restart backend server

7.4 File Upload Issues
  
  Error: "File too large" or "Invalid format"
  
  Solution:
  - Check MAX_FILE_SIZE setting
  - Verify ALLOWED_IMAGE_FORMATS
  - Ensure S3/storage credentials are correct

7.5 Performance Issues
  
  Solutions:
  - Add database indexes: Index("idx_name", "column")
  - Enable query logging: echo=True in database config
  - Use connection pooling
  - Implement caching for frequent queries
  - Monitor with: logging + APM tools
"""


# ============================================================================
# SECTION 8: MAINTENANCE
# ============================================================================

"""
8.1 Database Backups
  
  Manual backup (PostgreSQL):
  $ pg_dump -h localhost -U acb_user -d acb_db > backup.sql
  
  Restore:
  $ psql -h localhost -U acb_user -d acb_db < backup.sql
  
  Supabase automatic:
  - Goes to Dashboard → Database → Backups
  - Daily automated backups
  - Point-in-time recovery available

8.2 Database Migrations (Alembic)
  
  Create migration after model changes:
  $ alembic revision --autogenerate -m "Add column X"
  
  Review generated migration in migrations/versions/
  
  Apply migration:
  $ alembic upgrade head
  
  Rollback:
  $ alembic downgrade -1

8.3 Log Rotation
  
  /etc/logrotate.d/acb-backend:
  
  /var/log/acb-backend.log {
      daily
      rotate 14
      compress
      delaycompress
      notifempty
      create 0640 www-data www-data
      sharedscripts
      postrotate
          systemctl reload acb-backend > /dev/null 2>&1 || true
      endscript
  }

8.4 Security Updates
  
  Check for outdated packages:
  $ pip list --outdated
  
  Update requirements:
  $ pip install --upgrade -r requirements.txt
  
  Security audit:
  $ pip-audit
  $ bandit -r app/

8.5 Monitoring Checklist
  
  Daily:
  - Check application logs
  - Monitor error rates
  - Verify database connectivity
  
  Weekly:
  - Review performance metrics
  - Check disk usage
  - Update security patches
  
  Monthly:
  - Analyze error patterns
  - Optimize slow queries
  - Review user analytics
"""


# ============================================================================
# SECTION 9: API DOCUMENTATION
# ============================================================================

"""
9.1 Interactive Documentation
  
  - Swagger UI: http://localhost:8000/api/docs
  - ReDoc: http://localhost:8000/api/redoc
  - OpenAPI JSON: http://localhost:8000/api/openapi.json

9.2 Authentication Flow Example
  
  Step 1: Login
  POST /api/v1/auth/login
  Content-Type: application/json
  
  {
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
  
  Response:
  {
    "access_token": "eyJhbG...",
    "refresh_token": "eyJhbG...",
    "token_type": "bearer",
    "user_id": "uuid",
    "roles": ["student"]
  }
  
  Step 2: Use Access Token
  GET /api/v1/users/me
  Authorization: Bearer eyJhbG...
  
  Step 3: Refresh Token (when expired)
  POST /api/v1/auth/refresh-token
  Content-Type: application/json
  
  {
    "refresh_token": "eyJhbG..."
  }

9.3 Error Response Format
  
  {
    "error": "Validation failed",
    "code": "VALIDATION_ERROR",
    "status_code": 422,
    "details": {
      "email": ["Invalid email format"]
    }
  }

9.4 Pagination Example
  
  GET /api/v1/students?skip=0&limit=20
  
  Response:
  [
    {"id": "...", "name": "...", ...},
    ...
  ]
  
  For total count, add to response model:
  {
    "items": [...],
    "total": 150,
    "skip": 0,
    "limit": 20
  }
"""


print(__doc__)
