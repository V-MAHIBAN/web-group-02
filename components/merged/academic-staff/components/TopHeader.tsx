import React, { useState, useRef, useEffect } from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { Student, AttendanceRecord, SystemActivity } from '../types';

interface TopHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenCheckIn: () => void;
  students: Student[];
  activities: SystemActivity[];
  attendanceRecords: AttendanceRecord[];
  onSelectStudent: (student: Student) => void;
  onNavigateToTab: (tab: any) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileMenu,
  onOpenCheckIn,
  students,
  activities,
  onSelectStudent,
  onNavigateToTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim() === '' ? [] : students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.includes(searchQuery) ||
    (s.enrolledCourse && s.enrolledCourse.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 5);

  const alerts = activities.filter(a => a.type === 'alert' || a.severity === 'high' || a.severity === 'warning');

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6 md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
        {/* Left Area: Mobile Menu Trigger & Institutional Logos */}
        <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-4">
          <button
            onClick={onOpenMobileMenu}
            id="mobile-menu-trigger"
            className="md:hidden p-2 -ml-2 text-[#121C2A] hover:bg-[#EFF4FF] rounded-lg transition-colors flex-shrink-0"
            aria-label="Open Mobile Menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Dual Logos (US Embassy American Corner + Academic Nexus) */}
          <div className="hidden min-w-0 items-center gap-1.5 sm:gap-3 md:flex">
            <img
              src={BRAND_ASSETS.usEmbassyLogo}
              alt="US Embassy Logo"
              className="h-7 w-auto shrink-0 object-contain md:h-9"
            />
            <div className="hidden h-6 w-px bg-[#E2E8F0] sm:block"></div>
            <img
              src={BRAND_ASSETS.academicNexusLogo}
              alt="Academic Nexus Logo"
              className="h-8 w-auto shrink-0 object-contain md:h-10"
            />
          </div>
        </div>

        {/* Right Area: Search, Quick Actions & User Menu */}
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:gap-3">
          {/* Live Search Input */}
          <div ref={searchRef} className="relative hidden md:block">
            <div className="flex w-[220px] items-center rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-1.5 transition-all focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/20 lg:w-[300px]">
              <span className="material-symbols-outlined mr-2 shrink-0 text-[18px] text-[#64748B]">search</span>
              <input
                type="text"
                id="top-search-input"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search students..."
                className="w-full min-w-0 border-none bg-transparent text-[13px] text-[#121C2A] outline-none placeholder:text-[#64748B]/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 shrink-0 text-xs text-[#64748B] hover:text-[#121C2A]"
                >
                  ✕
                </button>
              )}
            </div>

          {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="p-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                  Matching Students ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#E2E8F0] max-h-72 overflow-y-auto">
                    {searchResults.map(student => (
                      <button
                        key={student.id}
                        onClick={() => {
                          onSelectStudent(student);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full p-3 text-left hover:bg-[#EFF4FF] transition-colors flex items-center gap-3"
                      >
                        {student.avatarUrl ? (
                          <img src={student.avatarUrl} alt={student.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {student.name.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-semibold text-[#121C2A] truncate">{student.name}</p>
                          <p className="text-[12px] text-[#64748B]">ID: #{student.studentId} • {student.enrolledCourse || 'General'}</p>
                        </div>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          student.status === 'Active' ? 'bg-[#16A34A]/10 text-[#16A34A]' :
                          student.status === 'Absent' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {student.status}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-[13px] text-[#64748B]">
                    No matching student records found.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notifications Icon Button with Badge */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            id="notifications-button"
            className="p-2 text-[#64748B] hover:text-[#BF0A30] hover:bg-[#EFF4FF] rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#BA1A1A] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Flyout */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[14px] text-[#121C2A]">System Notifications</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFDAD6] text-[#BA1A1A] text-[11px] font-bold">
                    {alerts.length} Pending
                  </span>
                </div>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-xs text-[#1D4ED8] hover:underline"
                >
                  Close
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#E2E8F0]">
                {activities.slice(0, 5).map(act => (
                  <div key={act.id} className="p-3 hover:bg-[#F8FAFC] transition-colors flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      act.type === 'alert' ? 'bg-[#FFDAD6] text-[#BA1A1A]' :
                      act.type === 'late_entry' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#EFF4FF] text-[#1D4ED8]'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {act.type === 'alert' ? 'warning' : act.type === 'late_entry' ? 'schedule' : 'how_to_reg'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-[13px] font-semibold ${act.severity === 'high' ? 'text-[#BA1A1A]' : 'text-[#121C2A]'}`}>
                          {act.title}
                        </p>
                        <span className="text-[11px] text-[#64748B]">{act.timeAgo}</span>
                      </div>
                      <p className="text-[12px] text-[#64748B] mt-0.5 leading-relaxed">{act.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    onNavigateToTab('dashboard');
                  }}
                  className="text-[12px] font-semibold text-[#1D4ED8] hover:underline"
                >
                  View Activity Feed on Dashboard →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Apps Launcher Icon */}
        <div ref={appsRef} className="relative">
          <button
            onClick={() => setIsAppsOpen(!isAppsOpen)}
            id="apps-launcher-button"
            className="p-2 text-[#64748B] hover:text-[#1D4ED8] hover:bg-[#EFF4FF] rounded-full transition-colors hidden sm:flex items-center justify-center"
            aria-label="Apps launcher"
          >
            <span className="material-symbols-outlined text-[22px]">apps</span>
          </button>

          {isAppsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 p-3 grid grid-cols-3 gap-2">
              {[
                { label: 'Overview', icon: 'dashboard', tab: 'dashboard' },
                { label: 'Scanner', icon: 'qr_code_scanner', tab: 'qr_scanner' },
                { label: 'Students', icon: 'group', tab: 'students' },
                { label: 'History', icon: 'history', tab: 'attendance_history' },
                { label: 'Settings', icon: 'settings', tab: 'settings' },
                { label: 'Support', icon: 'help', tab: 'support' },
              ].map(app => (
                <button
                  key={app.tab}
                  onClick={() => {
                    onNavigateToTab(app.tab);
                    setIsAppsOpen(false);
                  }}
                  className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-[#EFF4FF] text-[#121C2A] transition-colors group"
                >
                  <span className="material-symbols-outlined text-[24px] text-[#1D4ED8] group-hover:scale-110 transition-transform">
                    {app.icon}
                  </span>
                  <span className="text-[11px] font-medium mt-1 text-center">{app.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

          <div className="mx-1 hidden h-6 w-px bg-[#E2E8F0] sm:block"></div>

          {/* Primary CTA Check In Button (Academic Crimson #BF0A30) */}
          <button
            onClick={onOpenCheckIn}
            id="header-checkin-btn"
            className="flex items-center gap-2 rounded-lg bg-[#BF0A30] px-3 py-2 text-[13px] font-semibold text-white shadow-xs transition-all duration-150 hover:bg-[#D7263D] active:scale-95 sm:px-4 sm:text-[14px]"
          >
            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
            <span className="whitespace-nowrap">Check In</span>
          </button>

          {/* User Profile Avatar with dropdown */}
          <div ref={userRef} className="relative">
            <img
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              src={BRAND_ASSETS.userHeaderAvatar}
              alt="User Avatar"
              className="h-8 w-8 cursor-pointer rounded-full border border-[#E2E8F0] object-cover transition-all hover:ring-2 hover:ring-[#1D4ED8]/40"
            />

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 py-1 overflow-hidden">
                <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <p className="text-[13px] font-bold text-[#121C2A]">Administrator</p>
                  <p className="text-[11px] text-[#64748B] truncate">admin@academicnexus.edu</p>
                </div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigateToTab('settings');
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#121C2A] hover:bg-[#EFF4FF] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#64748B]">settings</span>
                  System Settings
                </button>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onNavigateToTab('support');
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#121C2A] hover:bg-[#EFF4FF] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#64748B]">help</span>
                  Help & Docs
                </button>
                <div className="border-t border-[#E2E8F0] my-1"></div>
                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    alert('Session logged out.');
                  }}
                  className="w-full px-4 py-2 text-left text-[13px] text-[#BA1A1A] hover:bg-[#FFDAD6]/30 flex items-center gap-2 font-medium"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
