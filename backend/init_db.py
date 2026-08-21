"""
Database initialization script

This script will:
1. Create all tables from models
2. Seed the database with dummy data

Run with: python init_db.py
"""

import sys
from app.core.database import engine
from app.models import Base
from seed_database import seed_database


def init_database():
    """Initialize database"""
    print("\n" + "="*60)
    print("DATABASE INITIALIZATION")
    print("="*60 + "\n")
    
    # Create all tables
    print("📊 Creating database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ Tables created successfully!\n")
    except Exception as e:
        print(f"❌ Error creating tables: {str(e)}\n")
        sys.exit(1)
    
    # Seed database
    print("📝 Seeding database with dummy data...")
    try:
        seed_database()
    except Exception as e:
        print(f"❌ Error seeding database: {str(e)}\n")
        sys.exit(1)
    
    print("\n" + "="*60)
    print("✓ DATABASE INITIALIZATION COMPLETE!")
    print("="*60)
    print("\nYou can now run the application:")
    print("  $ python main.py\n")


if __name__ == "__main__":
    init_database()
