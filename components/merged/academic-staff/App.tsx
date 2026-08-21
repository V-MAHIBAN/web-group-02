import { useState, useEffect, useCallback } from 'react';
import { Sidebar, NavigationTab } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/views/DashboardView';
import { AttendanceHistoryView } from './components/views/AttendanceHistoryView';
import { StudentManagementView } from './components/views/StudentManagementView';
import { QRScannerView } from './components/views/QRScannerView';
import { SettingsView } from './components/views/SettingsView';
import { SupportView } from './components/views/SupportView';

import { CheckInModal } from './components/modals/CheckInModal';
import { LogLateEntryModal } from './components/modals/LogLateEntryModal';
import { BroadcastAlertModal } from './components/modals/BroadcastAlertModal';
import { DailyReportModal } from './components/modals/DailyReportModal';
import { NewStudentModal } from './components/modals/NewStudentModal';
import { StudentProfileModal } from './components/modals/StudentProfileModal';

import { Student, AttendanceRecord, SystemActivity, OverviewMetrics } from './types';
import { DataService } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core Data States
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [activities, setActivities] = useState<SystemActivity[]>([]);
  const [metrics, setMetrics] = useState<OverviewMetrics>(DataService.getMetrics());

  // Modal States
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isLogLateOpen, setIsLogLateOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
  const [isNewStudentOpen, setIsNewStudentOpen] = useState(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);

  // Sync data from DataService
  const refreshAllData = useCallback(() => {
    setStudents(DataService.getStudents());
    setAttendanceRecords(DataService.getAttendanceRecords());
    setActivities(DataService.getActivities());
    setMetrics(DataService.getMetrics());
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const handleResetData = () => {
    DataService.resetToDefaults();
    refreshAllData();
    alert('Demo roster and check-in logs restored to initial state.');
  };

  return (
    <div className="flex min-h-screen w-full max-w-full overflow-hidden bg-[#F3F5F8] text-[#121C2A] font-sans selection:bg-[#FFDAD6] selection:text-[#940021]">
      {/* Side Navigation Bar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={tab => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenCheckIn={() => setIsCheckInOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col bg-[#F3F5F8] transition-all duration-200">
        {/* Top Navigation Bar */}
        <TopHeader
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onOpenCheckIn={() => setIsCheckInOpen(true)}
          students={students}
          activities={activities}
          attendanceRecords={attendanceRecords}
          onSelectStudent={student => setSelectedStudentForProfile(student)}
          onNavigateToTab={tab => setCurrentTab(tab)}
        />

        {/* Dynamic Page Views Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 md:px-8 lg:px-10">
            {currentTab === 'dashboard' && (
              <DashboardView
                metrics={metrics}
                activities={activities}
                students={students}
                onOpenLogLate={() => setIsLogLateOpen(true)}
                onOpenBroadcast={() => setIsBroadcastOpen(true)}
                onOpenReport={() => setIsDailyReportOpen(true)}
                onOpenCheckIn={() => setIsCheckInOpen(true)}
                onViewAllActivity={() => setCurrentTab('attendance_history')}
                onSelectStudent={student => setSelectedStudentForProfile(student)}
              />
            )}

            {currentTab === 'attendance_history' && (
              <AttendanceHistoryView
                records={attendanceRecords}
                metrics={metrics}
                onOpenCheckIn={() => setIsCheckInOpen(true)}
              />
            )}

            {currentTab === 'students' && (
              <StudentManagementView
                students={students}
                onOpenNewStudent={() => setIsNewStudentOpen(true)}
                onSelectStudent={student => setSelectedStudentForProfile(student)}
              />
            )}

            {currentTab === 'qr_scanner' && (
              <QRScannerView
                students={students}
                onAttendanceUpdated={refreshAllData}
                onSelectStudent={student => setSelectedStudentForProfile(student)}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView onResetData={handleResetData} />
            )}

            {currentTab === 'support' && (
              <SupportView />
            )}
          </div>
        </main>

        {/* Interactive Modals */}
        <CheckInModal
          isOpen={isCheckInOpen}
          onClose={() => setIsCheckInOpen(false)}
          onSuccess={refreshAllData}
          students={students}
        />

        <LogLateEntryModal
          isOpen={isLogLateOpen}
          onClose={() => setIsLogLateOpen(false)}
          onSuccess={refreshAllData}
          students={students}
        />

        <BroadcastAlertModal
          isOpen={isBroadcastOpen}
          onClose={() => setIsBroadcastOpen(false)}
          onSuccess={refreshAllData}
        />

        <DailyReportModal
          isOpen={isDailyReportOpen}
          onClose={() => setIsDailyReportOpen(false)}
          metrics={metrics}
          records={attendanceRecords}
          activities={activities}
        />

        <NewStudentModal
          isOpen={isNewStudentOpen}
          onClose={() => setIsNewStudentOpen(false)}
          onSuccess={refreshAllData}
        />

        <StudentProfileModal
          student={selectedStudentForProfile}
          isOpen={selectedStudentForProfile !== null}
          onClose={() => setSelectedStudentForProfile(null)}
          onUpdate={refreshAllData}
          attendanceHistory={attendanceRecords}
        />
      </div>
    </div>
  );
}
