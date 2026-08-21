"""Utility functions for common operations"""

from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import json


def calculate_attendance_rate(
    total_days: int,
    present_days: int,
    late_days: int = 0,
    late_counts_half: bool = True,
) -> float:
    """Calculate attendance rate percentage

    Args:
        total_days: Total days in period
        present_days: Number of present days
        late_days: Number of late days
        late_counts_half: Whether late counts as 0.5 present

    Returns:
        Attendance rate as percentage (0-100)
    """
    if total_days == 0:
        return 100.0

    counted_present = present_days
    if late_counts_half:
        counted_present += late_days * 0.5
    else:
        counted_present += late_days

    rate = (counted_present / total_days) * 100
    return min(100.0, round(rate, 2))


def calculate_volunteer_tier(verified_hours: float) -> str:
    """Calculate volunteer tier based on hours

    Args:
        verified_hours: Number of verified volunteer hours

    Returns:
        Tier name (Bronze, Silver, Gold, Platinum)
    """
    if verified_hours >= 250:
        return "Platinum"
    elif verified_hours >= 100:
        return "Gold"
    elif verified_hours >= 50:
        return "Silver"
    else:
        return "Bronze"


def send_email(
    to_email: str, subject: str, html_content: str, from_email: str = "noreply@acb.org"
) -> bool:
    """Send email via SendGrid

    Args:
        to_email: Recipient email
        subject: Email subject
        html_content: HTML email body
        from_email: Sender email

    Returns:
        True if successful, False otherwise
    """
    try:
        from sendgrid import SendGridAPIClient
        from sendgrid.helpers.mail import Mail
        from app.core.config import settings

        if not settings.SENDGRID_API_KEY:
            return False

        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=html_content,
        )

        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        sg.send(message)

        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False


def send_deadline_reminder(
    user_email: str, deadline_title: str, due_date: datetime
) -> bool:
    """Send deadline reminder email"""

    html_content = f"""
    <h2>Assignment Deadline Reminder</h2>
    <p>You have an upcoming deadline:</p>
    <h3>{deadline_title}</h3>
    <p>Due: {due_date.strftime('%B %d, %Y at %I:%M %p')}</p>
    <p>Please complete your assignment before the deadline.</p>
    """

    return send_email(
        to_email=user_email,
        subject=f"Reminder: {deadline_title} is due soon",
        html_content=html_content,
    )


def send_enrollment_confirmation(
    user_email: str, program_name: str, program_date: datetime
) -> bool:
    """Send program enrollment confirmation email"""

    html_content = f"""
    <h2>Program Enrollment Confirmation</h2>
    <p>You have been successfully enrolled in:</p>
    <h3>{program_name}</h3>
    <p>Start Date: {program_date.strftime('%B %d, %Y')}</p>
    <p>We look forward to seeing you!</p>
    """

    return send_email(
        to_email=user_email,
        subject=f"Enrollment Confirmation: {program_name}",
        html_content=html_content,
    )


def send_hours_verification_notification(
    volunteer_email: str, hours: float, status: str
) -> bool:
    """Send volunteer hour verification notification"""

    action = "approved" if status == "verified" else "rejected"
    html_content = f"""
    <h2>Volunteer Hours {action.title()}</h2>
    <p>Your logged volunteer hours have been {action}:</p>
    <h3>{hours} hours</h3>
    <p>Thank you for your service!</p>
    """

    return send_email(
        to_email=volunteer_email,
        subject=f"Volunteer Hours {action.title()}",
        html_content=html_content,
    )


def format_phone_number(phone: str, country_code: str = "+94") -> str:
    """Format phone number with country code

    Args:
        phone: Phone number (can be with or without country code)
        country_code: Country code (default: +94 for Sri Lanka)

    Returns:
        Formatted phone number
    """
    # Remove all non-digit characters
    digits = "".join(filter(str.isdigit, phone))

    # Remove leading country code if present
    if len(digits) > 10 and digits[:2] in ["94", "00"]:
        digits = digits[2:]

    # Add country code
    return f"{country_code}{digits}"


def validate_phone_number(phone: str) -> bool:
    """Validate phone number format"""
    digits = "".join(filter(str.isdigit, phone))

    # Valid phone should have 10+ digits
    if len(digits) < 10:
        return False

    return True


def generate_credentials_id() -> str:
    """Generate unique credential ID for certificates"""
    import uuid

    return str(uuid.uuid4())[:8].upper()


def get_date_range(days_back: int = 30) -> tuple:
    """Get date range for last N days

    Returns:
        (start_date, end_date) tuple
    """
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=days_back)

    return (start_date, end_date)


def group_by_month(items: List[Dict[str, Any]], date_key: str = "created_at") -> Dict:
    """Group items by month

    Args:
        items: List of items with date field
        date_key: Name of date field

    Returns:
        Dict grouped by month
    """
    grouped = {}

    for item in items:
        date = item.get(date_key)
        if isinstance(date, str):
            date = datetime.fromisoformat(date)

        month_key = date.strftime("%Y-%m")

        if month_key not in grouped:
            grouped[month_key] = []

        grouped[month_key].append(item)

    return grouped


def paginate_items(items: List[Any], skip: int = 0, limit: int = 20) -> tuple:
    """Paginate a list of items

    Args:
        items: Items to paginate
        skip: Number to skip
        limit: Number to return

    Returns:
        (paginated_items, total_count) tuple
    """
    total = len(items)
    paginated = items[skip : skip + limit]

    return (paginated, total)
