export type ScreenType = 
  | 'home'
  | 'about'
  | 'programs'
  | 'gallery'
  | 'contact'
  | 'student-login'
  | 'student-forgot-password'
  | 'student-portal'
  | 'volunteer-login'
  | 'volunteer-forgot-password'
  | 'volunteer-portal'
  | 'admin-login'
  | 'admin-signup'
  | 'admin-forgot-password'
  | 'admin-portal'
  | 'password-reset';

export type ProgramCategory = 'certificate' | 'thematic';

export interface Program {
  id: string;
  title: string;
  description: string;
  category: ProgramCategory;
  duration: string;
  image: string;
  level?: string;
  instructor?: string;
  schedule?: string;
  prerequisites?: string[];
  topics?: string[];
  enrolledCount?: number;
  maxCapacity?: number;
  status: 'Open' | 'Ongoing' | 'Completed' | 'Upcoming';
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'Events' | 'Workshops' | 'Celebrations' | 'Education' | 'Awards';
  date: string;
  description?: string;
}

export interface StudentApplication {
  id: string;
  studentId?: string;
  fullName: string;
  email: string;
  phone: string;
  programId: string;
  programTitle: string;
  reason: string;
  appliedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PasswordResetRequest {
  id: string;
  userType: 'student' | 'volunteer' | 'admin';
  memberId: string; // ACB Student ID or Volunteer ID
  firstName: string;
  lastName: string;
  phone: string;
  requestDetails: string;
  submittedAt: string;
  status: 'Pending' | 'Resolved';
}

export interface AdminRegistrationRequest {
  id: string;
  firstName: string;
  lastName: string;
  nic: string;
  role: 'coordinator' | 'moderator' | 'staff' | 'advisor';
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  profilePhoto?: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface VolunteerHourLog {
  id: string;
  volunteerId: string;
  volunteerName: string;
  activityTitle: string;
  hours: number;
  date: string;
  notes: string;
  status: 'Pending' | 'Approved';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetAudience: 'all' | 'students' | 'volunteers';
  priority: 'normal' | 'important';
}

export interface UserSession {
  type: 'student' | 'volunteer' | 'admin';
  id?: string;
  userId?: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  roleTitle?: string;
  memberId?: string;
  studentId?: string;
  volunteerId?: string;
}
