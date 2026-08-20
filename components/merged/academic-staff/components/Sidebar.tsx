import React from 'react';
import { BRAND_ASSETS } from '../data/mockData';

export type NavigationTab = 'dashboard' | 'qr_scanner' | 'students' | 'attendance_history' | 'settings' | 'support';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenCheckIn: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { tab: NavigationTab; label: string; icon: string }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { tab: 'qr_scanner', label: 'QR Scanner', icon: 'qr_code_scanner' },
    { tab: 'students', label: 'Student Management', icon: 'group' },
    { tab: 'attendance_history', label: 'Attendance History', icon: 'history' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[280px] bg-[#002868] text-white z-50 flex flex-col py-6 px-3 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:z-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        } shadow-xl md:shadow-md select-none`}
      >
        {/* Header / Staff Profile */}
        <div className="mb-8 px-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={BRAND_ASSETS.staffAvatar}
              alt="Staff Profile Picture"
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-xs"
            />
            <div className="leading-tight">
              <h1 className="font-bold text-[20px] text-white tracking-tight">Staff Portal</h1>
              <p className="text-[12px] text-[#CED9FF]/80 font-medium tracking-wide">Academic Administration</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden text-[#CED9FF] hover:text-white p-1 rounded-md"
            aria-label="Close Sidebar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1\">\n          {navItems.map(item => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                id={`nav-${item.tab}`}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 font-medium text-[13px] whitespace-nowrap ${
                  isActive
                    ? 'bg-white/15 text-white font-bold shadow-sm'
                    : 'text-[#CED9FF]/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                <span
                  className=\"material-symbols-outlined flex-shrink-0 text-[20px]\"
                  style={isActive ? { fontVariationSettings: \"'FILL' 1\" } : undefined}
                >
                  {item.icon}
                </span>
                <span className=\"truncate text-[13px]\">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Navigation & CTA */}
        <div className="mt-auto pt-6 border-t border-white/10 space-y-1">
          <button
            onClick={() => handleNavClick('settings')}
            id="nav-settings"
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-left transition-colors font-medium text-[14px] ${
              currentTab === 'settings'
                ? 'bg-white/10 text-white font-bold'
                : 'text-[#CED9FF]/80 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span>Settings</span>
          </button>

          <button
            onClick={() => handleNavClick('support')}
            id="nav-support"
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-left transition-colors font-medium text-[14px] ${
              currentTab === 'support'
                ? 'bg-white/10 text-white font-bold'
                : 'text-[#CED9FF]/80 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Support</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out of the Academic Nexus staff portal?')) {
                alert('Staff session closed.');
              }
            }}
            id="nav-logout"
            className="w-full mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors text-[14px] font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
