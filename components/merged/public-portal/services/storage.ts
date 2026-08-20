import {
  Program,
  GalleryItem,
  StudentApplication,
  PasswordResetRequest,
  AdminRegistrationRequest,
  ContactMessage,
  VolunteerHourLog,
  Announcement,
  UserSession
} from '../types';
import { INITIAL_PROGRAMS, GALLERY_ITEMS, INITIAL_ANNOUNCEMENTS } from '../data/mockData';

const STORAGE_KEYS = {
  PROGRAMS: 'acb_programs_v1',
  GALLERY: 'acb_gallery_v1',
  APPLICATIONS: 'acb_applications_v1',
  RESETS: 'acb_password_resets_v1',
  ADMIN_SIGNUPS: 'acb_admin_signups_v1',
  MESSAGES: 'acb_contact_messages_v1',
  VOLUNTEER_HOURS: 'acb_volunteer_hours_v1',
  ANNOUNCEMENTS: 'acb_announcements_v1',
  SESSION: 'acb_user_session_v1',
};

// Safe JSON parser helper
function getStored<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to store data', err);
  }
}

export const StorageService = {
  // Programs
  getPrograms: (): Program[] => {
    return getStored<Program[]>(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
  },

  saveProgram: (program: Program): void => {
    const programs = StorageService.getPrograms();
    const existingIndex = programs.findIndex(p => p.id === program.id);
    if (existingIndex >= 0) {
      programs[existingIndex] = program;
    } else {
      programs.unshift(program);
    }
    setStored(STORAGE_KEYS.PROGRAMS, programs);
  },

  deleteProgram: (id: string): void => {
    const programs = StorageService.getPrograms().filter(p => p.id !== id);
    setStored(STORAGE_KEYS.PROGRAMS, programs);
  },

  // Gallery
  getGallery: (): GalleryItem[] => {
    return getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, GALLERY_ITEMS);
  },

  // Student Applications / Enrollments
  getApplications: (): StudentApplication[] => {
    return getStored<StudentApplication[]>(STORAGE_KEYS.APPLICATIONS, [
      {
        id: 'app-1',
        studentId: 'ACB-STU-2024-042',
        fullName: 'Kabilan Thangavel',
        email: 'kabilan.t@example.com',
        phone: '0772345678',
        programId: 'cert-web-dev',
        programTitle: 'Web Development',
        reason: 'Passionate about frontend development and seeking international certification.',
        appliedDate: '2025-03-01',
        status: 'Approved'
      },
      {
        id: 'app-2',
        studentId: 'ACB-STU-2024-089',
        fullName: 'Nivetha Senthilkumar',
        email: 'nivetha.s@example.com',
        phone: '0778765432',
        programId: 'cert-ai-bot',
        programTitle: 'AI & Chatbot Dev',
        reason: 'Eager to build generative AI integrations for regional educational tools.',
        appliedDate: '2025-03-05',
        status: 'Pending'
      }
    ]);
  },

  submitApplication: (app: Omit<StudentApplication, 'id' | 'appliedDate' | 'status'>): StudentApplication => {
    const applications = StorageService.getApplications();
    const newApp: StudentApplication = {
      ...app,
      id: 'app-' + Date.now(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    applications.unshift(newApp);
    setStored(STORAGE_KEYS.APPLICATIONS, applications);
    return newApp;
  },

  updateApplicationStatus: (id: string, status: 'Pending' | 'Approved' | 'Rejected'): void => {
    const applications = StorageService.getApplications().map(a => 
      a.id === id ? { ...a, status } : a
    );
    setStored(STORAGE_KEYS.APPLICATIONS, applications);
  },

  // Password Reset Requests
  getResetRequests: (): PasswordResetRequest[] => {
    return getStored<PasswordResetRequest[]>(STORAGE_KEYS.RESETS, [
      {
        id: 'rst-1',
        userType: 'student',
        memberId: 'ACB-STU-2024-015',
        firstName: 'Prashanth',
        lastName: 'Ramanathan',
        phone: '0771234567',
        requestDetails: 'I forgot my Student Portal password and cannot access class assignments.',
        submittedAt: '2025-03-08 14:30',
        status: 'Pending'
      },
      {
        id: 'rst-2',
        userType: 'volunteer',
        memberId: 'ACB-VOL-2024-008',
        firstName: 'Dharshini',
        lastName: 'Mahendran',
        phone: '0779988776',
        requestDetails: 'Need password recovery for my volunteer hours tracking account.',
        submittedAt: '2025-03-09 11:15',
        status: 'Pending'
      }
    ]);
  },

  submitResetRequest: (req: Omit<PasswordResetRequest, 'id' | 'submittedAt' | 'status'>): PasswordResetRequest => {
    const resets = StorageService.getResetRequests();
    const newReq: PasswordResetRequest = {
      ...req,
      id: 'rst-' + Date.now(),
      submittedAt: new Date().toLocaleString(),
      status: 'Pending'
    };
    resets.unshift(newReq);
    setStored(STORAGE_KEYS.RESETS, resets);
    return newReq;
  },

  updateResetRequestStatus: (id: string, status: 'Pending' | 'Resolved'): void => {
    const resets = StorageService.getResetRequests().map(r => 
      r.id === id ? { ...r, status } : r
    );
    setStored(STORAGE_KEYS.RESETS, resets);
  },

  // Admin Sign Ups
  getAdminSignups: (): AdminRegistrationRequest[] => {
    return getStored<AdminRegistrationRequest[]>(STORAGE_KEYS.ADMIN_SIGNUPS, [
      {
        id: 'adm-req-1',
        firstName: 'Vithuran',
        lastName: 'Kumaravel',
        nic: '199612345678',
        role: 'moderator',
        address: 'No 45, Covington Road, Batticaloa',
        phone: '0773344556',
        whatsapp: '0773344556',
        email: 'vithuran.k@example.com',
        submittedAt: '2025-03-07 09:20',
        status: 'Pending'
      }
    ]);
  },

  submitAdminSignup: (req: Omit<AdminRegistrationRequest, 'id' | 'submittedAt' | 'status'>): AdminRegistrationRequest => {
    const signups = StorageService.getAdminSignups();
    const newReq: AdminRegistrationRequest = {
      ...req,
      id: 'adm-req-' + Date.now(),
      submittedAt: new Date().toLocaleString(),
      status: 'Pending'
    };
    signups.unshift(newReq);
    setStored(STORAGE_KEYS.ADMIN_SIGNUPS, signups);
    return newReq;
  },

  updateAdminSignupStatus: (id: string, status: 'Pending' | 'Approved' | 'Rejected'): void => {
    const signups = StorageService.getAdminSignups().map(s => 
      s.id === id ? { ...s, status } : s
    );
    setStored(STORAGE_KEYS.ADMIN_SIGNUPS, signups);
  },

  // Contact Messages
  getContactMessages: (): ContactMessage[] => {
    return getStored<ContactMessage[]>(STORAGE_KEYS.MESSAGES, [
      {
        id: 'msg-1',
        name: 'Tharunika Yogarajah',
        email: 'tharunika.y@gmail.com',
        phone: '0771239876',
        subject: 'Inquiry on EducationUSA Advising Session',
        message: 'Hello ACB Team, I would like to know if there is one-on-one EducationUSA advising available this Saturday for US university scholarship applications.',
        createdAt: '2025-03-10 16:45',
        status: 'Unread'
      },
      {
        id: 'msg-2',
        name: 'Dr. S. Sivanesan',
        email: 'sivanesan.s@univ.ac.lk',
        phone: '0652223344',
        subject: 'Partnership for Robotics STEM Workshop',
        message: 'We would love to collaborate on a joint maker-space event with Eastern University undergraduate volunteers.',
        createdAt: '2025-03-08 10:15',
        status: 'Read'
      }
    ]);
  },

  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage => {
    const messages = StorageService.getContactMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toLocaleString(),
      status: 'Unread'
    };
    messages.unshift(newMsg);
    setStored(STORAGE_KEYS.MESSAGES, messages);
    return newMsg;
  },

  updateMessageStatus: (id: string, status: 'Unread' | 'Read' | 'Replied'): void => {
    const messages = StorageService.getContactMessages().map(m => 
      m.id === id ? { ...m, status } : m
    );
    setStored(STORAGE_KEYS.MESSAGES, messages);
  },

  // Volunteer Hours
  getVolunteerHours: (): VolunteerHourLog[] => {
    return getStored<VolunteerHourLog[]>(STORAGE_KEYS.VOLUNTEER_HOURS, [
      {
        id: 'vh-1',
        volunteerId: 'ACB-VOL-2024-001',
        volunteerName: 'Akeelan Pathmanathan',
        activityTitle: 'English Cafe Facilitation & Sound Tech',
        hours: 4.5,
        date: '2025-03-06',
        notes: 'Coordinated audio setup, welcome desk, and breakout conversation groups.',
        status: 'Approved'
      },
      {
        id: 'vh-2',
        volunteerId: 'ACB-VOL-2024-005',
        volunteerName: 'Gayathri S.',
        activityTitle: 'Youth Oratory Prep & Registration Desk',
        hours: 3.0,
        date: '2025-03-08',
        notes: 'Assisted 45 high school participants with name tags and room allocation.',
        status: 'Pending'
      }
    ]);
  },

  submitVolunteerHours: (log: Omit<VolunteerHourLog, 'id' | 'status'>): VolunteerHourLog => {
    const logs = StorageService.getVolunteerHours();
    const newLog: VolunteerHourLog = {
      ...log,
      id: 'vh-' + Date.now(),
      status: 'Pending'
    };
    logs.unshift(newLog);
    setStored(STORAGE_KEYS.VOLUNTEER_HOURS, logs);
    return newLog;
  },

  updateVolunteerHourStatus: (id: string, status: 'Pending' | 'Approved'): void => {
    const logs = StorageService.getVolunteerHours().map(l => 
      l.id === id ? { ...l, status } : l
    );
    setStored(STORAGE_KEYS.VOLUNTEER_HOURS, logs);
  },

  // Announcements
  getAnnouncements: (): Announcement[] => {
    return getStored<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  },

  addAnnouncement: (ann: Omit<Announcement, 'id' | 'date'>): Announcement => {
    const announcements = StorageService.getAnnouncements();
    const newAnn: Announcement = {
      ...ann,
      id: 'ann-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    announcements.unshift(newAnn);
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
    return newAnn;
  },

  // Session Management
  getUserSession: (): UserSession | null => {
    return getStored<UserSession | null>(STORAGE_KEYS.SESSION, null);
  },

  setUserSession: (session: UserSession | null): void => {
    setStored(STORAGE_KEYS.SESSION, session);
  }
};
