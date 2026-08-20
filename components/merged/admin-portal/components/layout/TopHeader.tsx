import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  Plus,
  ChevronDown,
  LogOut,
  Settings,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface TopHeaderProps {
  currentTab: NavigationTab;
  onOpenMobileMenu: () => void;
  onQuickAction: (actionType: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onOpenSupportModal: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  onOpenMobileMenu,
  onQuickAction,
  searchQuery,
  onSearchChange,
  onOpenSupportModal,
  onNavigateTab,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSearchPlaceholder = () => {
    switch (currentTab) {
      case 'programs':
        return 'Search programs, workshops, locations...';
      case 'users':
        return 'Search users by name, email, or role...';
      case 'volunteers':
        return 'Search volunteer applications...';
      case 'attendance':
        return 'Search student attendance logs...';
      case 'news':
        return 'Search published news & articles...';
      case 'gallery':
        return 'Search albums, media events...';
      case 'announcements':
        return 'Search announcements...';
      case 'reports':
        return 'Search reports and analytics...';
      case 'settings':
        return 'Search system settings...';
      default:
        return 'Search programs, volunteers, members...';
    }
  };

  const getPrimaryActionConfig = () => {
    switch (currentTab) {
      case 'programs':
        return { label: 'New Program', action: 'new_program' };
      case 'users':
        return { label: 'Add New User', action: 'new_user' };
      case 'volunteers':
        return { label: 'New Program', action: 'new_program' };
      case 'attendance':
        return { label: 'Manual Entry', action: 'manual_attendance' };
      case 'news':
        return { label: 'Add News', action: 'new_news' };
      case 'gallery':
        return { label: 'Upload Media', action: 'new_album' };
      case 'announcements':
        return { label: 'Add New', action: 'new_announcement' };
      case 'reports':
        return { label: 'Generate Report', action: 'new_report' };
      case 'settings':
        return { label: 'Save Changes', action: 'save_settings' };
      default:
        return { label: 'New Program', action: 'new_program' };
    }
  };

  const actionConfig = getPrimaryActionConfig();

  return (
    <header className="fixed top-0 right-0 left-0 md:left-[280px] h-16 md:h-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all">
      {/* Left side: Mobile menu toggle + Context Search */}
      <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#002868] hover:bg-gray-100 transition-colors focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <h2 className="hidden xl:block font-['Poppins',sans-serif] text-base lg:text-lg font-bold text-[#002868] tracking-tight whitespace-nowrap">
          American Corner Batticaloa
        </h2>

        {/* Global / Context Search Bar */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={getSearchPlaceholder()}
            className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] hover:bg-gray-100/80 focus:bg-white border border-gray-200 rounded-full text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-gray-200 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-300"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Right side: Actions, Notifications, Support, Profile */}
      <div className="flex items-center gap-2 sm:gap-4 ml-3 shrink-0">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-[#002868] hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#BF0A30] rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                  <span className="bg-[#BF0A30]/10 text-[#BF0A30] text-xs font-bold px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <button
                  onClick={() => onNavigateTab('volunteers')}
                  className="text-xs text-[#1D4ED8] hover:underline font-medium"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-gray-50 mt-2 max-h-72 overflow-y-auto">
                <div className="py-2.5 flex items-start gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer" onClick={() => onNavigateTab('volunteers')}>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#002868] flex items-center justify-center shrink-0">
                    <UserCheck size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-800 font-medium">New Volunteer Application</p>
                    <p className="text-[11px] text-gray-500">Amara Silva applied for Technology Bootcamp</p>
                    <span className="text-[10px] text-gray-400">10m ago</span>
                  </div>
                </div>

                <div className="py-2.5 flex items-start gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer" onClick={() => onNavigateTab('programs')}>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-800 font-medium">Program Capacity Full</p>
                    <p className="text-[11px] text-gray-500">Advanced STEM Workshop reached 20/20 capacity</p>
                    <span className="text-[10px] text-gray-400">1h ago</span>
                  </div>
                </div>

                <div className="py-2.5 flex items-start gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer" onClick={() => onNavigateTab('settings')}>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-800 font-medium">Cloud Backup Completed</p>
                    <p className="text-[11px] text-gray-500">32.4 GB synced with PostgreSQL storage</p>
                    <span className="text-[10px] text-gray-400">04:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support Button */}
        <button
          onClick={onOpenSupportModal}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-xs"
        >
          <Info size={14} className="text-gray-500" />
          Support
        </button>

        {/* Contextual Primary Action Button */}
        <button
          id="top-header-primary-action"
          onClick={() => onQuickAction(actionConfig.action)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white rounded-xl shadow-xs transition-all tracking-wide whitespace-nowrap"
        >
          <Plus size={16} className="shrink-0" />
          <span>{actionConfig.label}</span>
        </button>

        <div className="h-6 w-px bg-gray-200 hidden sm:block mx-0.5" />

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 sm:pr-2.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="User Profile Menu"
          >
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChKZaO9Zuw4ZaSXgB9IghjbTlNCF2fNgeNQfQKcF8ANYRCC7yW32yoe7t0p8HOSXhKfN1xAB4nLEivY5FpGUMdFDaDKJwKxNxy5aycMGhaIVm2eEPrLYu1ZxHgL4yKYWmYmG6bM_iNZEcHiPke2ppEZxez39aIeV1smCgBeuvPAOHT_jFcwWhE24ut9uHYwNdzrgfDD3BnjZJMT5V5o8Y7tSbyZpjhaMjANJJAffGqu8W49-uiU-Jj"
                alt="Jane Doe"
                className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-gray-900 leading-tight">Jane Doe</span>
              <span className="text-[10px] text-gray-500 font-medium">Administrator</span>
            </div>
            <ChevronDown size={14} className="text-gray-400 hidden lg:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-gray-100 mb-1">
                <p className="text-xs font-bold text-gray-900">Jane Doe</p>
                <p className="text-[11px] text-gray-500">admin@acbatticaloa.org</p>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                  <ShieldCheck size={12} /> Super Administrator
                </div>
              </div>

              <button
                onClick={() => {
                  onNavigateTab('settings');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#002868] rounded-xl transition-colors text-left"
              >
                <Settings size={15} />
                <span>System Settings</span>
              </button>

              <button
                onClick={() => {
                  onNavigateTab('users');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#002868] rounded-xl transition-colors text-left"
              >
                <UserCheck size={15} />
                <span>User Permissions</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  alert('Session refreshed.');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
