export type TabType = 
  | 'dashboard'
  | 'tasks'
  | 'hours'
  | 'programs'
  | 'certificates'
  | 'attendance'
  | 'profile'
  | 'opportunities';

export interface Task {
  id: string;
  title: string;
  organization?: string;
  date: string;
  formattedDate: string;
  timeRange: string;
  location: string;
  status: 'upcoming' | 'completed' | 'pending';
  hours?: number;
  description: string;
  category: 'Environment' | 'Community' | 'Education' | 'Senior Care' | 'Food Security';
  enrolled: boolean;
  coordinator?: {
    name: string;
    email: string;
    phone: string;
  };
  notes?: string;
}

export interface HourEntry {
  id: string;
  date: string;
  project: string;
  hours: number;
  status: 'Verified' | 'Pending';
  category: string;
  notes?: string;
  verifiedBy?: string;
}

export interface Program {
  id: string;
  title: string;
  organization: string;
  dateRange: string;
  schedule: string;
  status: 'in_progress' | 'upcoming' | 'completed';
  image: string;
  description: string;
  hoursLogged?: number;
  cohortName?: string;
  teamAvatars: string[];
  additionalTeamCount?: number;
  certificateAvailable?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  issuedDate: string;
  expiresDate?: string;
  duration: string;
  status: 'valid' | 'expired' | 'warning';
  credentialId: string;
  skills: string[];
  badgeColor: 'blue' | 'green' | 'amber';
  instructor: string;
}

export interface AttendanceItem {
  id: string;
  date: string;
  programName: string;
  status: 'Present' | 'Excused' | 'Absent';
  duration: string;
  hours: number;
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  tier: string;
  hoursTotal: number;
  eventsTotal: number;
  avatarUrl: string;
  interests: string[];
  availability: {
    weekdaysAm: boolean;
    weekdaysPm: boolean;
    weekends: boolean;
    flexible: boolean;
  };
  notifications: {
    email: boolean;
    sms: boolean;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}
