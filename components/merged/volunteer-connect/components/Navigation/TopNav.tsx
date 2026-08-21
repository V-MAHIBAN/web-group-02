import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Menu, X, CheckCircle2, User, ChevronDown } from 'lucide-react';
import { TabType, UserProfile } from '../../types';

interface TopNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleMobileMenu: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  user,
  searchQuery,
  onSearchChange,
  onToggleMobileMenu,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Volunteer Dashboard';
      case 'tasks':
        return 'Task Management';
      case 'hours':
        return 'Hours Tracking & History';
      case 'programs':
        return 'Program Overview';
      case 'certificates':
        return 'Certificates Hub';
      case 'attendance':
        return 'Attendance Record & Impact';
      case 'profile':
        return 'Profile & Settings';
      default:
        return 'Volunteer Dashboard';
    }
  };

  return (
    <header className="bg-[#FFFFFF] border-b border-slate-200 h-16 md:h-20 px-4 md:px-8 flex justify-between items-center sticky top-0 z-30 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      {/* Left side: Hamburger on mobile + Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#002868] hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5 text-[#002868]" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-[#1F2937] tracking-tight truncate">
          {getTitle()}
        </h2>
      </div>

      {/* Right side: Search bar + Notification + Help + Profile avatar */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {/* Search input */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-[#002868] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, programs, history..."
            className="pl-9 pr-8 py-2 rounded-full border border-slate-300 focus:border-[#002868] focus:ring-1 focus:ring-[#002868] focus:outline-none bg-[#F8FAFC] text-xs md:text-sm text-[#1F2937] w-48 lg:w-64 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-[#002868] hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#002868]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#FFFFFF] rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-xs text-[#002868] uppercase tracking-wider">
                  Notifications (2 new)
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between font-semibold text-[#1F2937]">
                    <span>Shift Reminder: Tomorrow</span>
                    <span className="text-[10px] text-slate-500">1h ago</span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Community Garden Prep at Riverside Park starts at 09:00 AM.
                  </p>
                </div>
                <div className="p-2.5 bg-[#FFFFFF] rounded-lg border border-slate-200">
                  <div className="flex items-center justify-between font-semibold text-[#16A34A]">
                    <span>Hours Verified!</span>
                    <span className="text-[10px] text-slate-500">Yesterday</span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Your 4.0 hours for Winter Coat Drive Sorting were approved.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Tooltip Button */}
        <div className="relative">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-full text-[#002868] hover:bg-slate-100 transition-colors cursor-pointer"
            title="Help & FAQ"
          >
            <HelpCircle className="w-5 h-5 text-[#002868]" />
          </button>

          {showHelp && (
            <div className="absolute right-0 mt-2 w-72 bg-[#FFFFFF] rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-fadeIn text-xs">
              <h4 className="font-bold text-[#002868] mb-2">Quick Support & Guide</h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>• <strong>Log Hours:</strong> Click the red "Log Hours" button on any page.</li>
                <li>• <strong>Verification:</strong> Completed shifts are verified within 48 hours.</li>
                <li>• <strong>Certificates:</strong> Automatically unlocked upon reaching milestone hours.</li>
              </ul>
              <div className="mt-3 pt-2 border-t border-slate-100 text-right">
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-xs text-[#1D4ED8] font-semibold hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Quick Switch */}
        <button
          onClick={() => onTabChange('profile')}
          className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-[#002868]"
          />
        </button>
      </div>
    </header>
  );
};
