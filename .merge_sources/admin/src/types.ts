export type NavigationTab =
  | 'dashboard'
  | 'users'
  | 'volunteers'
  | 'programs'
  | 'attendance'
  | 'news'
  | 'gallery'
  | 'announcements'
  | 'reports'
  | 'settings';

export type UserRole = 'Admin' | 'Staff' | 'Volunteer';
export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  avatarUrl?: string;
  initials?: string;
  department?: string;
}

export type VolunteerAppStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected';

export interface VolunteerApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  appliedForProgram: string;
  programId?: string;
  date: string;
  status: VolunteerAppStatus;
  initials: string;
  colorClass: string;
  motivation?: string;
  skills?: string[];
  education?: string;
  experience?: string;
  notes?: string;
}

export type ProgramStatus = 'Enrolling' | 'Full' | 'Completed' | 'Upcoming';

export type ProgramCategory =
  | 'Workshops'
  | 'STEM Education'
  | 'English Programs'
  | 'Cultural Events'
  | 'Youth Leadership'
  | 'Technology'
  | 'Makerspace'
  | 'Culture & Arts';

export interface Program {
  id: string;
  title: string;
  status: ProgramStatus;
  dateRange: string;
  location: string;
  enrolledCount: number;
  capacity: number;
  imageUrl: string;
  category: ProgramCategory;
  description?: string;
  instructor?: string;
  isPast?: boolean;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  initials?: string;
  program: string;
  programCohort?: string;
  date: string;
  timeIn?: string;
  timeOut?: string;
  status: AttendanceStatus;
  remarks?: string;
}

export type NewsStatus = 'Published' | 'Draft' | 'Scheduled' | 'Archived';
export type NewsCategory = 'Academic' | 'Community' | 'Events' | 'Cultural' | 'Workshops';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: NewsCategory;
  author: string;
  date: string;
  views: string;
  viewsCount: number;
  status: NewsStatus;
  imageUrl?: string;
  featured?: boolean;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category: 'Workshops' | 'English Programs' | 'Cultural Events' | 'Makerspace' | 'Diplomatic Visits';
  date: string;
  photosCount: number;
  videosCount?: number;
  coverImage: string;
  uploadedBy: string;
  uploaderInitials: string;
  mediaType: 'Photos' | 'Videos' | 'Mixed';
  description?: string;
  images?: string[];
}

export type AnnouncementPriority = 'High' | 'Medium' | 'Low';
export type AnnouncementAudience = 'All Members' | 'Staff Only' | 'Volunteers' | 'Students' | 'Public';
export type AnnouncementStatus = 'Active' | 'Scheduled' | 'Expired';

export interface Announcement {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  priority: AnnouncementPriority;
  audience: AnnouncementAudience;
  publishedDate: string;
  expiryDate?: string;
  status: AnnouncementStatus;
  views?: string;
}

export interface ReportItem {
  id: string;
  title?: string;
  name?: string;
  category?: 'Attendance' | 'Volunteers' | 'Programs' | 'General';
  generatedBy: string;
  createdDate?: string;
  period?: string;
  status?: 'Ready' | 'Processing' | 'Failed';
  fileSize?: string;
  type?: 'CSV' | 'Excel' | 'PDF';
  format?: 'PDF' | 'XLSX' | 'CSV' | 'Excel';
}

export interface SystemSettingsData {
  orgName?: string;
  cornerName?: string;
  contactEmail: string;
  phoneNumber?: string;
  contactPhone?: string;
  timeZone?: string;
  timezone?: string;
  officeAddress?: string;
  address?: string;
  operatingHours?: string;
  orgLogo?: string;
  require2FA?: boolean;
  requireMFA?: boolean;
  autoLockSessions?: boolean;
  emailAlertsOnVolunteerApp?: boolean;
  programCapacityAlerts?: boolean;
  backupFrequency?: string;
  sessionTimeoutMinutes?: number;
  passwordPolicy?: 'strict' | 'medium';
  appVersion?: string;
  serverEnvironment?: string;
  databaseStatus?: 'Connected' | 'Disconnected' | 'Syncing';
  databaseProvider?: string;
  phpVersion?: string;
  licenseStatus?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  ipAddress: string;
  details: string;
  type: 'security' | 'user' | 'program' | 'system';
}

export interface ActivityItem {
  id: string;
  type: 'volunteer' | 'program' | 'attendance' | 'system';
  title: string;
  highlightText?: string;
  detail?: string;
  timestamp: string;
  iconName?: string;
  actionLabel?: string;
  actionPayload?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  timing: string;
  dayLabel: 'Today' | 'Tomorrow' | 'Upcoming';
  isPrimary?: boolean;
  location?: string;
  instructor?: string;
}
