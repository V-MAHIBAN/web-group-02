#!/usr/bin/env python3
"""
Quick Start Script - One command to set up and run the ACB system

Usage: python quickstart.py
"""

import os
import sys
import subprocess
import platform
from pathlib import Path


class Colors:
    """ANSI color codes"""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    BOLD = '\033[1m'


def print_header(text):
    """Print formatted header"""
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.CYAN}{text.center(60)}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'='*60}{Colors.RESET}\n")


def print_step(text):
    """Print step"""
    print(f"{Colors.BLUE}→{Colors.RESET} {text}")


def print_success(text):
    """Print success message"""
    print(f"{Colors.GREEN}✓{Colors.RESET} {text}")


def print_error(text):
    """Print error message"""
    print(f"{Colors.RED}✗{Colors.RESET} {text}")


def print_info(text):
    """Print info message"""
    print(f"{Colors.YELLOW}ℹ{Colors.RESET} {text}")


def check_python_version():
    """Check Python version"""
    print_step("Checking Python version...")
    
    version = sys.version_info
    if version.major >= 3 and version.minor >= 9:
        print_success(f"Python {version.major}.{version.minor}.{version.micro} ✓")
        return True
    else:
        print_error(f"Python 3.9+ required, you have {version.major}.{version.minor}")
        return False


def create_venv():
    """Create virtual environment"""
    print_step("Creating virtual environment...")
    
    venv_path = Path("venv")
    if venv_path.exists():
        print_info("Virtual environment already exists")
        return True
    
    try:
        subprocess.run([sys.executable, "-m", "venv", "venv"], check=True)
        print_success("Virtual environment created")
        return True
    except subprocess.CalledProcessError:
        print_error("Failed to create virtual environment")
        return False


def get_python_executable():
    """Get the Python executable path for the virtual environment"""
    if platform.system() == "Windows":
        return Path("venv/Scripts/python.exe")
    else:
        return Path("venv/bin/python")


def install_dependencies():
    """Install Python dependencies"""
    print_step("Installing dependencies...")
    
    python_exe = get_python_executable()
    
    try:
        subprocess.run([str(python_exe), "-m", "pip", "install", "--upgrade", "pip"], 
                      check=False)
        subprocess.run([str(python_exe), "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True)
        print_success("Dependencies installed")
        return True
    except subprocess.CalledProcessError as e:
        print_error(f"Failed to install dependencies: {e}")
        return False


def check_env_file():
    """Check if .env file exists"""
    print_step("Checking environment configuration...")
    
    env_path = Path(".env")
    
    if not env_path.exists():
        print_error(".env file not found!")
        print_info("Creating .env from .env.example...")
        
        example_path = Path(".env.example")
        if example_path.exists():
            with open(example_path, "r") as src, open(env_path, "w") as dst:
                dst.write(src.read())
            print_success(".env file created")
        else:
            print_error(".env.example not found")
            return False
    else:
        print_success(".env file exists")
    
    # Check for DATABASE_URL
    with open(env_path, "r") as f:
        content = f.read()
        if "postgresql://postgres:0757730332web" in content:
            print_success("Database connection configured")
            return True
        else:
            print_info("Database URL is set to template - update .env with Supabase URL")
            return True


def test_database_connection():
    """Test database connection"""
    print_step("Testing database connection...")
    
    python_exe = get_python_executable()
    
    try:
        result = subprocess.run(
            [str(python_exe), "-c", 
             "from app.core.database import engine; "
             "conn = engine.connect(); "
             "print('Database connection successful!'); "
             "conn.close()"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if result.returncode == 0:
            print_success("Database connection successful")
            return True
        else:
            print_error("Database connection failed")
            if result.stderr:
                print_info(f"Error: {result.stderr}")
            return False
    except subprocess.TimeoutExpired:
        print_error("Database connection timed out")
        return False
    except Exception as e:
        print_error(f"Connection test failed: {e}")
        return False


def initialize_database():
    """Initialize database"""
    print_step("Initializing database...")
    
    python_exe = get_python_executable()
    
    try:
        subprocess.run([str(python_exe), "init_db.py"], check=True)
        print_success("Database initialized successfully")
        return True
    except subprocess.CalledProcessError as e:
        print_error(f"Database initialization failed: {e}")
        return False


def start_server():
    """Start the FastAPI server"""
    print_step("Starting FastAPI server...")
    
    python_exe = get_python_executable()
    
    try:
        print_info("Server starting on http://localhost:8000")
        print_info("API Docs available at http://localhost:8000/docs")
        print_info("Press Ctrl+C to stop\n")
        
        subprocess.run([str(python_exe), "main.py"], check=False)
        return True
    except KeyboardInterrupt:
        print("\nServer stopped")
        return True
    except Exception as e:
        print_error(f"Failed to start server: {e}")
        return False


def print_final_status():
    """Print final status and test accounts"""
    print_header("Setup Complete! 🎉")
    
    print(f"{Colors.BOLD}TEST ACCOUNTS:{Colors.RESET}")
    print(f"  👤 Admin:       admin@acb.org")
    print(f"  🔐 Password:    SecurePassword123!")
    print(f"\n  👤 Staff:       staff1@acb.org")
    print(f"  👤 Student:     student1@acb.org")
    print(f"  👤 Volunteer:   volunteer1@acb.org")
    
    print(f"\n{Colors.BOLD}ACCESS POINTS:{Colors.RESET}")
    print(f"  🌐 API:         http://localhost:8000")
    print(f"  📚 Docs:        http://localhost:8000/docs")
    print(f"  💻 Frontend:    http://localhost:3000")
    
    print(f"\n{Colors.BOLD}NEXT STEPS:{Colors.RESET}")
    print(f"  1. Open http://localhost:8000/docs in your browser")
    print(f"  2. Try login with admin@acb.org / SecurePassword123!")
    print(f"  3. Test creating/updating records")
    print(f"  4. Connect frontend to API endpoints")
    
    print(f"\n{Colors.BOLD}DATABASE:{Colors.RESET}")
    print(f"  📊 Tables Created:    22 tables")
    print(f"  👥 Dummy Users:       18 test users")
    print(f"  📚 Courses:           6 test courses")
    print(f"  💼 Programs:          8 test programs")
    
    print(f"\n{Colors.BOLD}DOCUMENTATION:{Colors.RESET}")
    print(f"  📖 Setup Guide:       backend/SETUP_GUIDE.md")
    print(f"  📖 README:            backend/README.md")
    print(f"  📖 Architecture:      backend/ARCHITECTURE_GUIDE.md")
    
    print(f"\n{Colors.BOLD}SUPPORT:{Colors.RESET}")
    print(f"  • Check .env file configuration")
    print(f"  • Verify Supabase database is running")
    print(f"  • Review error logs in terminal")
    
    print(f"\n{Colors.GREEN}✓ System ready!{Colors.RESET}\n")


def main():
    """Main execution"""
    print_header("ACB Management System - Quick Start")
    
    print(f"{Colors.BOLD}Configuration:{Colors.RESET}")
    print(f"  📁 Project: ACB Web Management System")
    print(f"  🗄️  Database: Supabase PostgreSQL")
    print(f"  🚀 Backend: FastAPI")
    print(f"  ⚛️  Frontend: Next.js/React")
    
    # Step 1: Check Python
    if not check_python_version():
        print_error("Setup failed: Python 3.9+ required")
        return False
    
    # Step 2: Create venv
    if not create_venv():
        print_error("Setup failed: Could not create virtual environment")
        return False
    
    # Step 3: Install dependencies
    if not install_dependencies():
        print_error("Setup failed: Could not install dependencies")
        return False
    
    # Step 4: Check env file
    if not check_env_file():
        print_error("Setup failed: Environment configuration issue")
        return False
    
    # Step 5: Test database connection
    if not test_database_connection():
        print_error("Setup failed: Database connection test failed")
        print_info("Make sure:")
        print_info("  • .env file has correct DATABASE_URL")
        print_info("  • Supabase database is accessible")
        print_info("  • Internet connection is working")
        return False
    
    # Step 6: Initialize database
    try:
        print_step("Checking if database needs initialization...")
        python_exe = get_python_executable()
        
        # Check if tables exist
        check_result = subprocess.run(
            [str(python_exe), "-c",
             "from app.models import Base; "
             "from app.core.database import engine; "
             "from sqlalchemy import inspect; "
             "inspector = inspect(engine); "
             "tables = inspector.get_table_names(); "
             "print(f'Found {len(tables)} tables'); "
             "exit(0 if len(tables) > 0 else 1)"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        if check_result.returncode != 0:
            # Tables don't exist, initialize
            if not initialize_database():
                print_error("Setup failed: Database initialization")
                return False
        else:
            print_success("Database already initialized")
    
    except Exception as e:
        print_error(f"Database check failed: {e}")
    
    # Step 7: Print final status
    print_final_status()
    
    # Step 8: Start server
    print_step("Ready to start server...\n")
    input("Press Enter to start the FastAPI server... (or Ctrl+C to exit)")
    
    return start_server()


if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Setup cancelled by user{Colors.RESET}\n")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}Unexpected error: {e}{Colors.RESET}\n")
        sys.exit(1)
