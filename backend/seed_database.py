"""
Database seed script - creates dummy data for testing

Run with: python seed_database.py
"""

from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.core import hash_password, SessionLocal
from app.models import (
    User, Student, Program, VolunteerProfile, VolunteerApplication,
    Task, TaskEnrollment, VolunteerHourEntry, Course, CourseModule,
    Deadline, CourseEnrollment, NewsArticle, GalleryAlbum, GalleryItem,
    Announcement, CommunityPost, CommunityReply, ChatSession, ChatMessage,
    UserRole, UserStatus, StudentStatus, AttendanceStatus, ProgramStatus,
    VolunteerApplicationStatus, NewsArticleStatus, AnnouncementAudience,
    HourEntryStatus, CertificateStatus, AttendanceRecord
)
import random
from uuid import uuid4


def create_users(db: Session):
    """Create test users"""
    users = []
    
    # Admin user
    admin = User(
        id=str(uuid4()),
        name="Admin User",
        email="admin@acb.org",
        phone="+94701234567",
        hashed_password=hash_password("SecurePassword123!"),
        status=UserStatus.ACTIVE,
        department="Administration",
        roles=[UserRole.ADMIN]
    )
    db.add(admin)
    users.append(admin)
    
    # Staff users
    for i in range(3):
        staff = User(
            id=str(uuid4()),
            name=f"Staff Member {i+1}",
            email=f"staff{i+1}@acb.org",
            phone=f"+9470123456{i}",
            hashed_password=hash_password("SecurePassword123!"),
            status=UserStatus.ACTIVE,
            department="Staff",
            roles=[UserRole.STAFF]
        )
        db.add(staff)
        users.append(staff)
    
    # Student users
    for i in range(10):
        student_user = User(
            id=str(uuid4()),
            name=f"Student {i+1}",
            email=f"student{i+1}@acb.org",
            phone=f"+9470223456{i}",
            hashed_password=hash_password("SecurePassword123!"),
            status=UserStatus.ACTIVE,
            roles=[UserRole.STUDENT]
        )
        db.add(student_user)
        users.append(student_user)
    
    # Volunteer users
    for i in range(5):
        volunteer_user = User(
            id=str(uuid4()),
            name=f"Volunteer {i+1}",
            email=f"volunteer{i+1}@acb.org",
            phone=f"+9470323456{i}",
            hashed_password=hash_password("SecurePassword123!"),
            status=UserStatus.ACTIVE,
            roles=[UserRole.VOLUNTEER]
        )
        db.add(volunteer_user)
        users.append(volunteer_user)
    
    db.commit()
    print(f"✓ Created {len(users)} users")
    return users


def create_students(db: Session, users):
    """Create student profiles"""
    students = []
    student_users = [u for u in users if UserRole.STUDENT in u.roles]
    
    for i, user in enumerate(student_users):
        student = Student(
            id=str(uuid4()),
            user_id=user.id,
            student_id=f"STU{1001+i:04d}",
            status=StudentStatus.ACTIVE,
            grade_level=f"Year {random.randint(1, 4)}",
            major=random.choice(["Computer Science", "Business", "Engineering", "Arts"]),
            gpa=round(random.uniform(2.5, 4.0), 2),
            attendance_rate=round(random.uniform(75, 100), 1),
            emergency_contact="Parent/Guardian",
            emergency_phone="+94701234567"
        )
        db.add(student)
        students.append(student)
    
    db.commit()
    print(f"✓ Created {len(students)} student profiles")
    return students


def create_volunteer_profiles(db: Session, users):
    """Create volunteer profiles"""
    volunteers = []
    volunteer_users = [u for u in users if UserRole.VOLUNTEER in u.roles]
    
    for user in volunteer_users:
        volunteer = VolunteerProfile(
            id=str(uuid4()),
            user_id=user.id,
            hours_total=random.uniform(0, 200),
            events_total=random.randint(0, 20),
            verified_hours=random.uniform(0, 150),
            tier=random.choice(["Bronze", "Silver", "Gold"])
        )
        db.add(volunteer)
        volunteers.append(volunteer)
    
    db.commit()
    print(f"✓ Created {len(volunteers)} volunteer profiles")
    return volunteers


def create_programs(db: Session, users):
    """Create programs"""
    programs = []
    staff_user = [u for u in users if UserRole.STAFF in u.roles][0]
    
    program_names = [
        "English Conversation Classes",
        "American Culture Workshop",
        "TOEFL Preparation",
        "Business English",
        "Computer Skills Training",
        "Leadership Development",
        "Internship Program",
        "Volunteer Orientation"
    ]
    
    for i, name in enumerate(program_names):
        start_date = datetime.utcnow() + timedelta(days=random.randint(1, 30))
        program = Program(
            id=str(uuid4()),
            title=name,
            description=f"This is a comprehensive {name} program for all participants.",
            category=random.choice(["Language", "Career", "Development", "Community"]),
            status=random.choice([ProgramStatus.UPCOMING, ProgramStatus.ONGOING, ProgramStatus.ENROLLING]),
            instructor="ACB Staff Member",
            start_date=start_date,
            end_date=start_date + timedelta(days=30),
            location=random.choice(["Main Hall", "Conference Room", "Online", "Library"]),
            capacity=random.randint(20, 50),
            enrolled_count=random.randint(5, 30),
            level=random.choice(["Beginner", "Intermediate", "Advanced"]),
            image_url="https://via.placeholder.com/300x200",
            prerequisites=[],
            topics=["Communication", "Skills", "Development"],
            created_by=staff_user.id
        )
        db.add(program)
        programs.append(program)
    
    db.commit()
    print(f"✓ Created {len(programs)} programs")
    return programs


def create_courses(db: Session, programs):
    """Create courses"""
    courses = []
    
    course_names = [
        "English Fundamentals",
        "Advanced English",
        "Business Communication",
        "Digital Marketing",
        "Web Development Basics",
        "Leadership Skills"
    ]
    
    for i, name in enumerate(course_names):
        course = Course(
            id=str(uuid4()),
            program_id=random.choice(programs).id,
            title=name,
            description=f"Online course: {name}",
            instructor="Course Instructor",
            category=random.choice(["Language", "Technology", "Business"]),
            level=random.choice(["Beginner", "Intermediate", "Advanced"]),
            status=random.choice([ProgramStatus.UPCOMING, ProgramStatus.ONGOING]),
            total_modules=random.randint(5, 15),
            completed_modules=0,
            image_url="https://via.placeholder.com/300x200",
            duration_days=30
        )
        db.add(course)
        courses.append(course)
    
    db.commit()
    print(f"✓ Created {len(courses)} courses")
    return courses


def create_tasks(db: Session, programs):
    """Create volunteer tasks"""
    tasks = []
    
    task_names = [
        "Event Registration",
        "Venue Setup",
        "Participant Support",
        "Photography/Videography",
        "Social Media Coverage",
        "Cleanup Crew"
    ]
    
    for program in programs[:5]:  # Create tasks for first 5 programs
        for task_name in task_names[:random.randint(2, 4)]:
            task_date = datetime.utcnow() + timedelta(days=random.randint(1, 30))
            task = Task(
                id=str(uuid4()),
                program_id=program.id,
                title=task_name,
                description=f"Help with {task_name}",
                category=random.choice(["Event", "Support", "Administrative"]),
                status=random.choice([ProgramStatus.UPCOMING, ProgramStatus.ONGOING]),
                task_date=task_date,
                start_time="09:00",
                end_time="17:00",
                location=program.location,
                hours_required=random.uniform(2, 8),
                enrolled_count=random.randint(0, 10)
            )
            db.add(task)
            tasks.append(task)
    
    db.commit()
    print(f"✓ Created {len(tasks)} volunteer tasks")
    return tasks


def create_announcements(db: Session, users):
    """Create announcements"""
    announcements = []
    staff_user = [u for u in users if UserRole.STAFF in u.roles][0]
    
    announcement_texts = [
        "Welcome to ACB! We're excited to have you here.",
        "Don't forget to attend the upcoming orientation session.",
        "New programs launching this month - enroll now!",
        "Volunteer opportunities available - help make a difference!",
        "System maintenance scheduled for weekend.",
        "Important: Update your profile information."
    ]
    
    for text in announcement_texts:
        announcement = Announcement(
            id=str(uuid4()),
            title=text.split()[0:3],
            excerpt=text,
            content=text + " Please check the details for more information.",
            priority=random.choice(["high", "medium", "low"]),
            audience=random.choice([
                AnnouncementAudience.ALL_MEMBERS,
                AnnouncementAudience.STUDENTS_ONLY,
                AnnouncementAudience.VOLUNTEERS_ONLY
            ]),
            published_date=datetime.utcnow(),
            expiry_date=datetime.utcnow() + timedelta(days=30),
            status=NewsArticleStatus.PUBLISHED,
            created_by=staff_user.id
        )
        db.add(announcement)
        announcements.append(announcement)
    
    db.commit()
    print(f"✓ Created {len(announcements)} announcements")
    return announcements


def create_news_articles(db: Session, users):
    """Create news articles"""
    articles = []
    staff_user = [u for u in users if UserRole.STAFF in u.roles][0]
    
    article_titles = [
        "New Partnership Announced",
        "Student Success Stories",
        "Volunteer Impact Report",
        "Program Expansion News",
        "Community Achievements",
        "Upcoming Events"
    ]
    
    for title in article_titles:
        article = NewsArticle(
            id=str(uuid4()),
            author_id=staff_user.id,
            title=title,
            excerpt=f"Summary of {title}",
            content=f"Full article about {title}. This is an important update for our community.",
            category=random.choice(["News", "Updates", "Stories", "Events"]),
            status=NewsArticleStatus.PUBLISHED,
            featured=random.choice([True, False]),
            image_url="https://via.placeholder.com/600x400",
            published_date=datetime.utcnow() - timedelta(days=random.randint(0, 30))
        )
        db.add(article)
        articles.append(article)
    
    db.commit()
    print(f"✓ Created {len(articles)} news articles")
    return articles


def create_gallery_albums(db: Session, users):
    """Create gallery albums"""
    albums = []
    staff_user = [u for u in users if UserRole.STAFF in u.roles][0]
    
    album_names = [
        "Opening Ceremony Photos",
        "Workshop Images",
        "Team Building Event",
        "Graduation Celebration",
        "Community Activities"
    ]
    
    for name in album_names:
        album = GalleryAlbum(
            id=str(uuid4()),
            title=name,
            description=f"Photos from {name}",
            category=random.choice(["Events", "Activities", "Achievements"]),
            uploader_id=staff_user.id,
            cover_image_url="https://via.placeholder.com/400x300",
            media_count=random.randint(5, 20),
            media_type="photos"
        )
        db.add(album)
        
        # Add gallery items
        for i in range(random.randint(3, 8)):
            item = GalleryItem(
                id=str(uuid4()),
                album_id=album.id,
                title=f"Photo {i+1}",
                media_url=f"https://via.placeholder.com/800x600?text=Photo+{i+1}",
                thumbnail_url=f"https://via.placeholder.com/200x150?text=Photo+{i+1}",
                media_type="image",
                order=i
            )
            db.add(item)
        
        albums.append(album)
    
    db.commit()
    print(f"✓ Created {len(albums)} gallery albums with items")
    return albums


def create_attendance_records(db: Session, students, programs):
    """Create attendance records"""
    records = []
    
    for student in students[:5]:  # Create records for first 5 students
        for program in programs[:3]:  # And first 3 programs
            for day in range(random.randint(10, 20)):
                record = AttendanceRecord(
                    id=str(uuid4()),
                    student_id=student.id,
                    program_id=program.id,
                    check_in_date=datetime.utcnow() - timedelta(days=day),
                    status=random.choice([
                        AttendanceStatus.PRESENT,
                        AttendanceStatus.PRESENT,
                        AttendanceStatus.LATE,
                        AttendanceStatus.ABSENT
                    ]),
                    room_or_gate="Main Gate",
                    notes="Regular attendance"
                )
                db.add(record)
                records.append(record)
    
    db.commit()
    print(f"✓ Created {len(records)} attendance records")
    return records


def create_community_posts(db: Session, users):
    """Create community posts"""
    posts = []
    
    post_titles = [
        "How to improve English speaking skills?",
        "Tips for TOEFL preparation",
        "Best learning resources",
        "Volunteer opportunities discussion",
        "Program feedback and suggestions"
    ]
    
    for title in post_titles:
        post = CommunityPost(
            id=str(uuid4()),
            author_id=random.choice([u for u in users if u.roles]).id,
            title=title,
            content=f"This is a discussion about: {title}. Please share your thoughts!",
            tags=["Discussion", "Learning", "Community"],
            category=random.choice(["General", "Learning", "Events"]),
            likes_count=random.randint(0, 10),
            replies_count=random.randint(0, 5)
        )
        db.add(post)
        posts.append(post)
        
        # Add some replies
        for _ in range(random.randint(0, 3)):
            reply = CommunityReply(
                id=str(uuid4()),
                post_id=post.id,
                author_id=random.choice([u for u in users if u.roles]).id,
                content="Great point! I agree with this perspective."
            )
            db.add(reply)
    
    db.commit()
    print(f"✓ Created {len(posts)} community posts with replies")
    return posts


def create_chat_sessions(db: Session, users):
    """Create chat sessions"""
    sessions = []
    student_users = [u for u in users if UserRole.STUDENT in u.roles]
    
    for user in student_users[:3]:  # Create for first 3 students
        session = ChatSession(
            id=str(uuid4()),
            user_id=user.id,
            title="Learning Discussion",
            category="Lessons",
            message_count=0
        )
        db.add(session)
        sessions.append(session)
        
        # Add chat messages
        for i in range(random.randint(2, 5)):
            message = ChatMessage(
                id=str(uuid4()),
                session_id=session.id,
                role=random.choice(["user", "assistant"]),
                content="This is a test message in the chat session."
            )
            db.add(message)
            session.message_count += 1
    
    db.commit()
    print(f"✓ Created {len(sessions)} chat sessions with messages")
    return sessions


def seed_database():
    """Main seed function"""
    db = SessionLocal()
    
    try:
        print("\n" + "="*50)
        print("SEEDING DATABASE WITH DUMMY DATA")
        print("="*50 + "\n")
        
        # Check if data already exists
        existing_users = db.query(User).count()
        if existing_users > 0:
            print("⚠️  Database already contains data. Skipping seed.")
            print(f"   Found {existing_users} existing users.")
            return
        
        # Create all data
        users = create_users(db)
        students = create_students(db, users)
        volunteers = create_volunteer_profiles(db, users)
        programs = create_programs(db, users)
        courses = create_courses(db, programs)
        tasks = create_tasks(db, programs)
        announcements = create_announcements(db, users)
        articles = create_news_articles(db, users)
        albums = create_gallery_albums(db, users)
        records = create_attendance_records(db, students, programs)
        posts = create_community_posts(db, users)
        sessions = create_chat_sessions(db, users)
        
        print("\n" + "="*50)
        print("✓ DATABASE SEEDING COMPLETE!")
        print("="*50)
        print("\n📊 SUMMARY:")
        print(f"   ✓ Users: {len(users)}")
        print(f"   ✓ Students: {len(students)}")
        print(f"   ✓ Volunteers: {len(volunteers)}")
        print(f"   ✓ Programs: {len(programs)}")
        print(f"   ✓ Courses: {len(courses)}")
        print(f"   ✓ Tasks: {len(tasks)}")
        print(f"   ✓ Announcements: {len(announcements)}")
        print(f"   ✓ News Articles: {len(articles)}")
        print(f"   ✓ Gallery Albums: {len(albums)}")
        print(f"   ✓ Attendance Records: {len(records)}")
        print(f"   ✓ Community Posts: {len(posts)}")
        print(f"   ✓ Chat Sessions: {len(sessions)}")
        
        print("\n🔐 TEST ACCOUNTS:")
        print("   Admin:      admin@acb.org / SecurePassword123!")
        print("   Staff 1:    staff1@acb.org / SecurePassword123!")
        print("   Student 1:  student1@acb.org / SecurePassword123!")
        print("   Volunteer 1: volunteer1@acb.org / SecurePassword123!")
        print("\n" + "="*50 + "\n")
        
    except Exception as e:
        print(f"\n❌ ERROR during seeding: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
