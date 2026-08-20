import { Student, AttendanceRecord, SystemActivity, OverviewMetrics } from '../types';
import { INITIAL_STUDENTS, INITIAL_ATTENDANCE_RECORDS, INITIAL_ACTIVITIES, INITIAL_METRICS } from '../data/mockData';

const STORAGE_KEYS = {
  STUDENTS: 'academic_nexus_students_v1',
  ATTENDANCE: 'academic_nexus_attendance_v1',
  ACTIVITIES: 'academic_nexus_activities_v1',
  METRICS: 'academic_nexus_metrics_v1',
  SUPABASE_CONFIG: 'academic_nexus_supabase_config_v1',
};

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  fastApiBackendUrl: string;
  isConnected: boolean;
}

export class DataService {
  private static getStored<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setStored<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }

  static getStudents(): Student[] {
    return this.getStored<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  }

  static saveStudents(students: Student[]): void {
    this.setStored(STORAGE_KEYS.STUDENTS, students);
  }

  static getAttendanceRecords(): AttendanceRecord[] {
    return this.getStored<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE_RECORDS);
  }

  static saveAttendanceRecords(records: AttendanceRecord[]): void {
    this.setStored(STORAGE_KEYS.ATTENDANCE, records);
  }

  static getActivities(): SystemActivity[] {
    return this.getStored<SystemActivity[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }

  static saveActivities(activities: SystemActivity[]): void {
    this.setStored(STORAGE_KEYS.ACTIVITIES, activities);
  }

  static getMetrics(): OverviewMetrics {
    return this.getStored<OverviewMetrics>(STORAGE_KEYS.METRICS, INITIAL_METRICS);
  }

  static saveMetrics(metrics: OverviewMetrics): void {
    this.setStored(STORAGE_KEYS.METRICS, metrics);
  }

  static getSupabaseConfig(): SupabaseConfig {
    return this.getStored<SupabaseConfig>(STORAGE_KEYS.SUPABASE_CONFIG, {
      supabaseUrl: 'https://xyzcompany.supabase.co',
      supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      fastApiBackendUrl: 'http://localhost:8000/api/v1',
      isConnected: true,
    });
  }

  static saveSupabaseConfig(config: SupabaseConfig): void {
    this.setStored(STORAGE_KEYS.SUPABASE_CONFIG, config);
  }

  // Quick check-in operation
  static checkInStudent(studentIdOrCode: string, gateOrRoom: string = 'Main Entrance'): { success: boolean; student?: Student; record?: AttendanceRecord; message: string } {
    const cleanId = studentIdOrCode.trim().replace(/^#/, '');
    const students = this.getStudents();
    const student = students.find(
      s => s.studentId.toLowerCase() === cleanId.toLowerCase() ||
           s.name.toLowerCase() === cleanId.toLowerCase() ||
           s.id === cleanId
    );

    if (!student) {
      // Log unrecognized alert
      const activities = this.getActivities();
      const newAlert: SystemActivity = {
        id: `alert-${Date.now()}`,
        type: 'alert',
        title: 'System Alert Triggered',
        description: `Unrecognized ID scan attempted (${studentIdOrCode}) at ${gateOrRoom}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeAgo: 'Just now',
        severity: 'high',
      };
      this.saveActivities([newAlert, ...activities]);

      // Increment pending alerts
      const metrics = this.getMetrics();
      this.saveMetrics({ ...metrics, pendingAlerts: metrics.pendingAlerts + 1 });

      return {
        success: false,
        message: `Student with ID "${studentIdOrCode}" was not found. Security alert generated.`,
      };
    }

    // If student found, record check-in
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Update status to Active
    const updatedStudents = students.map(s => (s.id === student.id ? { ...s, status: 'Active' as const } : s));
    this.saveStudents(updatedStudents);

    // Create attendance record
    const records = this.getAttendanceRecords();
    const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const newRecord: AttendanceRecord = {
      id: `rec-${Date.now()}`,
      studentName: student.name,
      studentId: `#${student.studentId}`,
      class: student.enrolledCourse || 'General Academic Session',
      dateTime: `${formattedDate}, ${formattedTime}`,
      timestamp: Date.now(),
      status: 'Present',
      roomOrGate: gateOrRoom,
      avatarInitials: initials,
      avatarColor: 'bg-[#1D4ED8] text-white',
    };
    this.saveAttendanceRecords([newRecord, ...records]);

    // Create activity
    const activities = this.getActivities();
    const newActivity: SystemActivity = {
      id: `act-${Date.now()}`,
      type: 'check_in',
      title: 'Student Check-in',
      description: `${student.name} (ID: ${student.studentId}) checked in at ${gateOrRoom}.`,
      timestamp: formattedTime,
      timeAgo: 'Just now',
      severity: 'normal',
      studentId: student.studentId,
    };
    this.saveActivities([newActivity, ...activities]);

    // Update metrics
    const metrics = this.getMetrics();
    this.saveMetrics({
      ...metrics,
      totalPresent: metrics.totalPresent + 1,
      historicalTotalPresent: metrics.historicalTotalPresent + 1,
    });

    return {
      success: true,
      student,
      record: newRecord,
      message: `${student.name} (ID: ${student.studentId}) successfully checked in.`,
    };
  }

  // Log late entry
  static logLateEntry(studentId: string, reason: string, className?: string, minutesLate: number = 15): { success: boolean; message: string } {
    const students = this.getStudents();
    const student = students.find(s => s.studentId === studentId || s.id === studentId);

    if (!student) {
      return { success: false, message: 'Selected student not found.' };
    }

    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const initials = student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    // Create attendance record
    const records = this.getAttendanceRecords();
    const newRecord: AttendanceRecord = {
      id: `rec-late-${Date.now()}`,
      studentName: student.name,
      studentId: `#${student.studentId}`,
      class: className || student.enrolledCourse || 'Morning Core Block',
      dateTime: `${formattedDate}, ${formattedTime}`,
      timestamp: Date.now(),
      status: 'Late',
      roomOrGate: 'Tardy Desk / Registrar',
      note: `Late: ${reason} (${minutesLate} min)`,
      avatarInitials: initials,
      avatarColor: 'bg-[#F59E0B] text-white',
    };
    this.saveAttendanceRecords([newRecord, ...records]);

    // Create activity
    const activities = this.getActivities();
    const newActivity: SystemActivity = {
      id: `act-late-${Date.now()}`,
      type: 'late_entry',
      title: 'Late Entry Recorded',
      description: `${student.name} (ID: ${student.studentId}) recorded late. Reason: ${reason}.`,
      timestamp: formattedTime,
      timeAgo: 'Just now',
      severity: 'warning',
      studentId: student.studentId,
    };
    this.saveActivities([newActivity, ...activities]);

    // Update metrics
    const metrics = this.getMetrics();
    this.saveMetrics({
      ...metrics,
      lateArrivals: metrics.lateArrivals + 1,
    });

    return { success: true, message: `Late entry for ${student.name} logged successfully.` };
  }

  // Broadcast Alert
  static broadcastAlert(title: string, message: string, targetGroup: string, severity: 'high' | 'warning' | 'info' = 'high'): { success: boolean; message: string } {
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const activities = this.getActivities();
    const newAlert: SystemActivity = {
      id: `broadcast-${Date.now()}`,
      type: 'alert',
      title: `Broadcast: ${title}`,
      description: `[Target: ${targetGroup}] ${message}`,
      timestamp: formattedTime,
      timeAgo: 'Just now',
      severity,
    };
    this.saveActivities([newAlert, ...activities]);

    const metrics = this.getMetrics();
    this.saveMetrics({
      ...metrics,
      pendingAlerts: metrics.pendingAlerts + 1,
    });

    return { success: true, message: 'Broadcast alert published to all staff terminals.' };
  }

  // Add new student
  static addStudent(studentData: Omit<Student, 'id'>): Student {
    const students = this.getStudents();
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
    };
    this.saveStudents([newStudent, ...students]);

    const metrics = this.getMetrics();
    this.saveMetrics({
      ...metrics,
      totalEnrolled: metrics.totalEnrolled + 1,
    });

    return newStudent;
  }

  // Update existing student
  static updateStudent(id: string, updates: Partial<Student>): Student | null {
    const students = this.getStudents();
    let updatedStudent: Student | null = null;
    const updatedList = students.map(s => {
      if (s.id === id || s.studentId === id) {
        updatedStudent = { ...s, ...updates };
        return updatedStudent;
      }
      return s;
    });

    if (updatedStudent) {
      this.saveStudents(updatedList);
    }
    return updatedStudent;
  }

  // Export CSV
  static exportAttendanceCSV(records: AttendanceRecord[]): void {
    const headers = ['Student Name', 'Student ID', 'Course / Class', 'Date & Time', 'Status', 'Location / Gate', 'Notes'];
    const rows = records.map(r => [
      `"${r.studentName.replace(/"/g, '""')}"`,
      `"${r.studentId}"`,
      `"${r.class.replace(/"/g, '""')}"`,
      `"${r.dateTime}"`,
      `"${r.status}"`,
      `"${r.roomOrGate || 'Main Hall'}"`,
      `"${(r.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `academic_nexus_attendance_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Reset to default seed
  static resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITIES);
    localStorage.removeItem(STORAGE_KEYS.METRICS);
  }
}
