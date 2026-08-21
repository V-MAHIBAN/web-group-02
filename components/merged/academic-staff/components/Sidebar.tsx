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
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[290px] shrink-0 flex-col bg-[#002868] px-3 py-5 text-white shadow-xl transition-transform duration-300 ease-in-out select-none md:static md:z-auto md:w-[300px] md:translate-x-0 md:shadow-none ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Staff Profile */}
        <div className="mb-7 flex items-center justify-between gap-3 px-1.5">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={BRAND_ASSETS.staffAvatar}
              alt="Staff Profile Picture"
              className="h-11 w-11 rounded-full border border-white/20 object-cover shadow-xs"
            />
            <div className="min-w-0 leading-tight">
              <h1 className="text-[20px] font-bold tracking-tight text-white">Staff Portal</h1>
              <p className="text-[12px] font-medium tracking-wide text-[#CED9FF]/80">Academic Administration</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-md p-1 text-[#CED9FF] hover:text-white md:hidden"
            aria-label="Close Sidebar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-0.5">
          {navItems.map(item => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                id={`nav-${item.tab}`}
                className={`flex w-full min-h-[46px] items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium leading-none transition-all duration-150 ${
                  isActive
                    ? 'bg-white/15 text-white shadow-inner'
                    : 'text-[#CED9FF]/80 hover:bg-white/8 hover:text-white'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined flex h-5 w-5 shrink-0 items-center justify-center text-[18px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="block min-w-0 flex-1 truncate text-left text-[15px] leading-normal">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Navigation & CTA */}
        <div className="mt-auto space-y-1 border-t border-white/10 pt-5">
          <button
            onClick={() => handleNavClick('settings')}
            id="nav-settings"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium leading-none transition-colors ${
              currentTab === 'settings'
                ? 'bg-white/10 text-white'
                : 'text-[#CED9FF]/80 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span aria-hidden="true" className="material-symbols-outlined flex h-5 w-5 shrink-0 items-center justify-center text-[18px]">settings</span>
            <span>Settings</span>
          </button>

          <button
            onClick={() => handleNavClick('support')}
            id="nav-support"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] font-medium leading-none transition-colors ${
              currentTab === 'support'
                ? 'bg-white/10 text-white'
                : 'text-[#CED9FF]/80 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span aria-hidden="true" className="material-symbols-outlined flex h-5 w-5 shrink-0 items-center justify-center text-[18px]">help</span>
            <span>Support</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to log out of the Academic Nexus staff portal?')) {
                alert('Staff session closed.');
              }
            }}
            id="nav-logout"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
