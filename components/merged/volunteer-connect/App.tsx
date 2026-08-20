/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SideNav } from './components/Navigation/SideNav';
import { TopNav } from './components/Navigation/TopNav';
import { MobileNav } from './components/Navigation/MobileNav';
import { DashboardView } from './components/Dashboard/DashboardView';
import { TasksView } from './components/Tasks/TasksView';
import { HoursView } from './components/Hours/HoursView';
import { ProgramsView } from './components/Programs/ProgramsView';
import { CertificatesView } from './components/Certificates/CertificatesView';
import { AttendanceView } from './components/Attendance/AttendanceView';
import { ProfileView } from './components/Profile/ProfileView';

import { LogHoursModal } from './components/Modals/LogHoursModal';
import { TaskDetailsModal } from './components/Modals/TaskDetailsModal';
import { CertificateModal } from './components/Modals/CertificateModal';

import {
  INITIAL_USER_PROFILE,
  INITIAL_TASKS,
  INITIAL_HOURS_HISTORY,
  INITIAL_PROGRAMS,
  INITIAL_CERTIFICATES,
  INITIAL_ATTENDANCE,
} from './data/mockData';

import { TabType, UserProfile, Task, HourEntry, Certificate } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // App Data with localStorage persistence fallback
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('vc_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('vc_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [hoursHistory, setHoursHistory] = useState<HourEntry[]>(() => {
    const saved = localStorage.getItem('vc_hours');
    return saved ? JSON.parse(saved) : INITIAL_HOURS_HISTORY;
  });

  const [programs] = useState(INITIAL_PROGRAMS);
  const [certificates] = useState(INITIAL_CERTIFICATES);
  const [attendance] = useState(INITIAL_ATTENDANCE);

  // Modals state
  const [isLogHoursOpen, setIsLogHoursOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('vc_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vc_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('vc_hours', JSON.stringify(hoursHistory));
  }, [hoursHistory]);

  // Handlers
  const handleLogHours = (entry: Omit<HourEntry, 'id' | 'status'>) => {
    const newEntry: HourEntry = {
      id: `hr-${Date.now()}`,
      status: 'Pending',
      ...entry,
    };
    setHoursHistory([newEntry, ...hoursHistory]);
    setUser((prev) => ({
      ...prev,
      hoursTotal: prev.hoursTotal + Number(entry.hours),
    }));
    showToast(`Logged ${entry.hours} hours for ${entry.project}! Submitted for coordinator verification.`);
  };

  const handleToggleEnroll = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextEnrolled = !t.enrolled;
          showToast(
            nextEnrolled
              ? `You have successfully enrolled in "${t.title}".`
              : `You have withdrawn from "${t.title}".`
          );
          return {
            ...t,
            enrolled: nextEnrolled,
            status: nextEnrolled ? 'upcoming' : 'pending',
          };
        }
        return t;
      })
    );
  };

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast('Account details & volunteer preferences updated.');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#002868] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-400/30 text-xs md:text-sm font-semibold flex items-center gap-3 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shrink-0"></span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/70 hover:text-white ml-2 text-base leading-none cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Desktop Fixed Side Navigation */}
      <SideNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenLogHours={() => setIsLogHoursOpen(true)}
        user={user}
      />

      {/* Mobile Drawer & Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenLogHours={() => setIsLogHoursOpen(true)}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        user={user}
      />

      {/* Main Content Area */}
      <div className="pl-0 md:pl-64 min-w-0 flex-1 flex flex-col min-h-screen pb-20 md:pb-12">
        {/* Sticky Top Header */}
        <TopNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          user={user}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
        />

        {/* View Contents */}
        <main className="p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              user={user}
              tasks={tasks}
              hoursHistory={hoursHistory}
              programs={programs}
              onOpenLogHours={() => setIsLogHoursOpen(true)}
              onNavigateToTasks={() => setActiveTab('tasks')}
              onNavigateToHours={() => setActiveTab('hours')}
              onNavigateToPrograms={() => setActiveTab('programs')}
              onSelectTask={(task) => setSelectedTask(task)}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onSelectTask={(task) => setSelectedTask(task)}
              onOpenLogHours={() => setIsLogHoursOpen(true)}
            />
          )}

          {activeTab === 'hours' && (
            <HoursView
              hoursHistory={hoursHistory}
              onOpenLogHours={() => setIsLogHoursOpen(true)}
            />
          )}

          {activeTab === 'programs' && (
            <ProgramsView
              programs={programs}
              onOpenCertificate={() => {
                if (certificates.length > 0) {
                  setSelectedCert(certificates[0]);
                }
              }}
              onOpenLogHours={() => setIsLogHoursOpen(true)}
            />
          )}

          {activeTab === 'certificates' && (
            <CertificatesView
              certificates={certificates}
              user={user}
              onSelectCertificate={(cert) => setSelectedCert(cert)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView attendanceList={attendance} />
          )}

          {activeTab === 'profile' && (
            <ProfileView user={user} onUpdateUser={handleUpdateUser} />
          )}
        </main>
      </div>

      {/* Interactive Global Modals */}
      <LogHoursModal
        isOpen={isLogHoursOpen}
        onClose={() => setIsLogHoursOpen(false)}
        onLogHours={handleLogHours}
      />

      <TaskDetailsModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onToggleEnroll={handleToggleEnroll}
      />

      <CertificateModal
        certificate={selectedCert}
        user={user}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
