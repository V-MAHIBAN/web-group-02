import React, { useState } from 'react';
import { SideNav } from './components/layout/SideNav';
import { TopHeader } from './components/layout/TopHeader';
import { DashboardView } from './components/views/DashboardView';
import { UserManagementView } from './components/views/UserManagementView';
import { VolunteerApplicationsView } from './components/views/VolunteerApplicationsView';
import { ProgramManagementView } from './components/views/ProgramManagementView';
import { AttendanceManagementView } from './components/views/AttendanceManagementView';
import { NewsManagementView } from './components/views/NewsManagementView';
import { GalleryManagementView } from './components/views/GalleryManagementView';
import { AnnouncementsView } from './components/views/AnnouncementsView';
import { ReportsAnalyticsView } from './components/views/ReportsAnalyticsView';
import { SystemSettingsView } from './components/views/SystemSettingsView';
import {
  VolunteerReviewModal,
  ProgramModal,
  UserModal,
  AttendanceModal,
  SupportModal,
} from './components/modals/AllModals';
import {
  initialUsers,
  initialVolunteerApplications,
  initialPrograms,
  initialAttendanceRecords,
  initialNewsArticles,
  initialGalleryAlbums,
  initialAnnouncements,
  initialReports,
  initialSettings,
  initialActivities,
  initialCalendarEvents,
} from './data/mockData';
import {
  NavigationTab,
  User,
  VolunteerApplication,
  VolunteerAppStatus,
  Program,
  AttendanceRecord,
  NewsArticle,
  GalleryAlbum,
  Announcement,
  ReportItem,
  SystemSettingsData,
} from './types';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Domain Datasets State
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [volunteerApps, setVolunteerApps] = useState<VolunteerApplication[]>(initialVolunteerApplications);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(initialNewsArticles);
  const [albums, setAlbums] = useState<GalleryAlbum[]>(initialGalleryAlbums);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [reports, setReports] = useState<ReportItem[]>(initialReports);
  const [settings, setSettings] = useState<SystemSettingsData>(initialSettings);
  const [activities, setActivities] = useState(initialActivities);

  // Modal States
  const [reviewingApp, setReviewingApp] = useState<VolunteerApplication | null>(null);
  const [programModalOpen, setProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState<AttendanceRecord | null>(null);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Pending applications count
  const pendingAppsCount = volunteerApps.filter(
    (a) => a.status === 'Pending' || a.status === 'Under Review'
  ).length;

  // Handler: Review Application by ID
  const handleReviewAppById = (appId: string) => {
    const found = volunteerApps.find((a) => a.id === appId);
    if (found) {
      setReviewingApp(found);
    } else {
      setCurrentTab('volunteers');
    }
  };

  // Handler: Update Volunteer Status
  const handleUpdateVolunteerStatus = (id: string, newStatus: VolunteerAppStatus) => {
    setVolunteerApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    // Add to activity log
    const target = volunteerApps.find((a) => a.id === id);
    if (target) {
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          title: `${target.applicantName}'s application marked as ${newStatus}`,
          timestamp: 'Just now',
          type: 'volunteer',
        },
        ...prev,
      ]);
    }
  };

  // Handler: Save Program (Add / Edit)
  const handleSaveProgram = (progData: Partial<Program>) => {
    if (progData.id) {
      setPrograms((prev) =>
        prev.map((p) => (p.id === progData.id ? ({ ...p, ...progData } as Program) : p))
      );
    } else {
      const newProgram: Program = {
        id: `prog-${Date.now()}`,
        title: progData.title || 'New Program',
        category: progData.category || 'Technology',
        status: progData.status || 'Enrolling',
        enrolledCount: progData.enrolledCount || 0,
        capacity: progData.capacity || 30,
        location: progData.location || 'Main Corner Room',
        dateRange: progData.dateRange || 'Nov 01 - Nov 15',
        imageUrl:
          progData.imageUrl ||
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
        isPast: progData.status === 'Completed',
      };
      setPrograms((prev) => [newProgram, ...prev]);
    }
  };

  // Handler: Save User (Add / Edit)
  const handleSaveUser = (userData: Partial<User>) => {
    if (userData.id) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userData.id ? ({ ...u, ...userData } as User) : u))
      );
    } else {
      const newUser: User = {
        id: `u-${Date.now()}`,
        name: userData.name || 'New User',
        email: userData.email || 'user@acbatticaloa.org',
        phone: userData.phone || '+94 77 123 4567',
        role: userData.role || 'Staff',
        status: userData.status || 'Active',
        joinedDate: 'Nov 2024',
        initials: (userData.name || 'NU').slice(0, 2).toUpperCase(),
      };
      setUsers((prev) => [newUser, ...prev]);
    }
  };

  // Handler: Save Attendance Record
  const handleSaveAttendance = (recordData: Partial<AttendanceRecord>) => {
    if (recordData.id) {
      setAttendanceRecords((prev) =>
        prev.map((r) => (r.id === recordData.id ? ({ ...r, ...recordData } as AttendanceRecord) : r))
      );
    } else {
      const newRec: AttendanceRecord = {
        id: `att-${Date.now()}`,
        studentName: recordData.studentName || 'Student Name',
        studentId: recordData.studentId || `ST-2024-${Math.floor(100 + Math.random() * 900)}`,
        program: recordData.program || 'English Access Microscholarship',
        date: recordData.date || 'Today',
        timeIn: recordData.timeIn || '09:00 AM',
        timeOut: recordData.timeOut || '12:00 PM',
        status: recordData.status || 'Present',
        remarks: recordData.remarks || '-',
        initials: (recordData.studentName || 'ST').slice(0, 2).toUpperCase(),
      };
      setAttendanceRecords((prev) => [newRec, ...prev]);
    }
  };

  // Handler: Top Header Quick Action button dispatcher
  const handleQuickAction = (actionType: string) => {
    switch (actionType) {
      case 'new_program':
        setEditingProgram(null);
        setProgramModalOpen(true);
        break;
      case 'new_user':
        setEditingUser(null);
        setUserModalOpen(true);
        break;
      case 'manual_attendance':
        setEditingAttendance(null);
        setAttendanceModalOpen(true);
        break;
      case 'new_news':
        alert('Creating a new article draft...');
        break;
      case 'new_album':
        alert('Opening Media Uploader...');
        break;
      case 'new_announcement':
        alert('Creating a new institutional broadcast message...');
        break;
      case 'new_report':
        alert('Generating quarterly executive audit report...');
        break;
      case 'save_settings':
        alert('System settings synced with backend successfully.');
        break;
      default:
        setEditingProgram(null);
        setProgramModalOpen(true);
    }
  };

  // Export CSV helper
  const handleExportCSV = (filename = 'export.csv') => {
    const csvContent =
      'data:text/csv;charset=utf-8,Applicant,Program,Date,Status\n' +
      volunteerApps
        .map((a) => `"${a.applicantName}","${a.appliedForProgram}","${a.date}","${a.status}"`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app admin-app">
      <div className="sidebar">
        <SideNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpenMobile={isMobileNavOpen}
          onCloseMobile={() => setIsMobileNavOpen(false)}
          pendingApplicationsCount={pendingAppsCount}
        />
      </div>

      <div className="topbar">
        <TopHeader
          currentTab={currentTab}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          onQuickAction={handleQuickAction}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
          onOpenSupportModal={() => setSupportModalOpen(true)}
          onNavigateTab={(tab) => setCurrentTab(tab)}
        />
      </div>

      <main className="main">
        <div className="container">
          {currentTab === 'dashboard' && (
            <DashboardView
              onNavigateTab={setCurrentTab}
              onReviewApplication={handleReviewAppById}
              pendingAppsCount={pendingAppsCount}
              totalVolunteers={volunteerApps.length + 118}
              activeProgramsCount={programs.filter((p) => !p.isPast).length}
              recentActivities={activities}
              calendarEvents={initialCalendarEvents}
            />
          )}

          {currentTab === 'users' && (
            <UserManagementView
              users={users}
              onAddUserClick={() => {
                setEditingUser(null);
                setUserModalOpen(true);
              }}
              onEditUser={(u) => {
                setEditingUser(u);
                setUserModalOpen(true);
              }}
              onDeleteUser={(id) => {
                if (confirm('Are you sure you want to remove this user from the system?')) {
                  setUsers((prev) => prev.filter((u) => u.id !== id));
                }
              }}
            />
          )}

          {currentTab === 'volunteers' && (
            <VolunteerApplicationsView
              applications={volunteerApps}
              onReviewApplication={(app) => setReviewingApp(app)}
              onExportCSV={() => handleExportCSV('ac_batticaloa_volunteers.csv')}
            />
          )}

          {currentTab === 'programs' && (
            <ProgramManagementView
              programs={programs}
              onOpenNewProgramModal={() => {
                setEditingProgram(null);
                setProgramModalOpen(true);
              }}
              onManageProgram={(prog) => {
                setEditingProgram(prog);
                setProgramModalOpen(true);
              }}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceManagementView
              attendanceRecords={attendanceRecords}
              onOpenManualEntry={() => {
                setEditingAttendance(null);
                setAttendanceModalOpen(true);
              }}
              onExportReport={() => handleExportCSV('ac_batticaloa_attendance.csv')}
              onEditRecord={(record) => {
                setEditingAttendance(record);
                setAttendanceModalOpen(true);
              }}
            />
          )}

          {currentTab === 'news' && (
            <NewsManagementView
              newsArticles={newsArticles}
              onAddNewsClick={() => alert('New News article composer open.')}
              onEditNews={(art) => alert(`Editing article: "${art.title}"`)}
              onDeleteNews={(id) => {
                if (confirm('Delete this article from news registry?')) {
                  setNewsArticles((prev) => prev.filter((a) => a.id !== id));
                }
              }}
            />
          )}

          {currentTab === 'gallery' && (
            <GalleryManagementView
              albums={albums}
              onCreateAlbumClick={() => alert('Media Album Creator initialized.')}
              onOpenAlbum={(album) => alert(`Viewing Album: "${album.title}"`)}
            />
          )}

          {currentTab === 'announcements' && (
            <AnnouncementsView
              announcements={announcements}
              onAddAnnouncementClick={() => alert('Broadcast announcement modal initialized.')}
              onEditAnnouncement={(anc) => alert(`Editing Announcement: "${anc.title}"`)}
              onDuplicateAnnouncement={(anc) => {
                const dup: Announcement = {
                  ...anc,
                  id: `anc-${Date.now()}`,
                  title: `${anc.title} (Copy)`,
                  status: 'Draft' as any,
                };
                setAnnouncements((prev) => [dup, ...prev]);
              }}
              onDeleteAnnouncement={(id) => {
                if (confirm('Delete announcement?')) {
                  setAnnouncements((prev) => prev.filter((a) => a.id !== id));
                }
              }}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsAnalyticsView
              reports={reports}
              onGenerateNewReport={() => alert('Generating institutional report...')}
            />
          )}

          {currentTab === 'settings' && (
            <SystemSettingsView
              settings={settings}
              onSaveSettings={(newSettings) => setSettings(newSettings)}
            />
          )}
        </div>
      </main>

      {/* Modals & Drawers */}
      <VolunteerReviewModal
        application={reviewingApp}
        onClose={() => setReviewingApp(null)}
        onUpdateStatus={handleUpdateVolunteerStatus}
      />

      <ProgramModal
        isOpen={programModalOpen}
        program={editingProgram}
        onClose={() => {
          setProgramModalOpen(false);
          setEditingProgram(null);
        }}
        onSave={handleSaveProgram}
      />

      <UserModal
        isOpen={userModalOpen}
        user={editingUser}
        onClose={() => {
          setUserModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
      />

      <AttendanceModal
        isOpen={attendanceModalOpen}
        record={editingAttendance}
        onClose={() => {
          setAttendanceModalOpen(false);
          setEditingAttendance(null);
        }}
        onSave={handleSaveAttendance}
      />

      <SupportModal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
      />
    </div>
  );
}
