export type StudentStatus = 'active' | 'absent' | 'graduated' | 'late';

export interface Student {
  id: string;
  studentId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  status: 'Active' | 'Absent' | 'Graduated';
  attendanceRate: number; // e.g. 94%
  gpa: number; // e.g. 3.8
  gradeLevel?: string;
  major?: string;
  enrolledCourse?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
  joinedDate?: string;
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  studentId: string;
  class: string;
  dateTime: string;
  timestamp: number;
  status: 'Present' | 'Late' | 'Absent';
  roomOrGate?: string;
  note?: string;
  avatarInitials?: string;
  avatarColor?: string;
}

export interface SystemActivity {
  id: string;
  type: 'check_in' | 'alert' | 'late_entry' | 'broadcast';
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  severity?: 'normal' | 'warning' | 'high' | 'info';
  studentId?: string;
}

export interface OverviewMetrics {
  totalPresent: number;
  totalEnrolled: number;
  lateArrivals: number;
  lateArrivalsChangePct: number;
  pendingAlerts: number;
  avgAttendanceRate: number;
  historicalTotalPresent: number;
  historicalTotalAbsent: number;
  reviewNeededCount: number;
}
