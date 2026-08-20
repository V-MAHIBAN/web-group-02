import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarCheck,
  ClipboardCheck,
  Newspaper,
  Images,
  Megaphone,
  BarChart3,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface SideNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  pendingApplicationsCount?: number;
}

interface NavItemConfig {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: number;
}

const navItems: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'volunteers', label: 'Volunteer Applications', icon: UserPlus },
  { id: 'programs', label: 'Program Management', icon: CalendarCheck },
  { id: 'attendance', label: 'Attendance Management', icon: ClipboardCheck },
  { id: 'news', label: 'News Management', icon: Newspaper },
  { id: 'gallery', label: 'Gallery Management', icon: Images },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'settings', label: 'System Settings', icon: Settings },
];

export const SideNav: React.FC<SideNavProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  pendingApplicationsCount = 24,
}) => {
  const content = (
    <div className="flex flex-col h-full bg-[#002868] text-white select-none">
      {/* Header / Logo */}
      <div className="p-6 pb-6 flex flex-col items-center border-b border-white/10 relative">
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden absolute top-4 right-4 p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}

        <div className="w-16 h-16 rounded-full bg-white p-1.5 flex items-center justify-center mb-3 shadow-lg ring-4 ring-white/10 transition-transform hover:scale-105">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBrDYnMkdO25NZuRkmlpgLookwzO-0sWFZg1YW7yIVOp3i9cboEb4cPQP_gVX9eY25nSAfMZ6inWaFGBq81E9zPJOEVgFMpudN98KxNd4j3oi3N3ctWmDZQaJvNI305cE7J9qauz_QLjXrL8NZ3G_43cnyBYMA5ABPFrKfOv9gWQQGG1aYDQWnKp_ITrvPWQATfsV4UBK9oLDwDRxaQLtIobjNkUA6DReTuJrnkZwgl1Q_x6Yx6PsPrf6FaMP4Z0A_Iw"
            alt="American Corner Batticaloa Logo"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <h1 className="font-['Poppins',sans-serif] text-xl font-bold text-white text-center leading-tight tracking-tight">
          AC Batticaloa
        </h1>
        <p className="text-xs uppercase tracking-widest text-white/70 mt-1 font-medium font-['Geist',sans-serif]">
          Admin Portal
        </p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                isActive
                  ? 'bg-white/10 text-white font-semibold border-l-4 border-[#BF0A30] shadow-sm pl-3'
                  : 'text-white/75 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={19}
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-[#ffb3b3]' : 'text-white/70 group-hover:text-white'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.id === 'volunteers' && pendingApplicationsCount > 0 && (
                <span className="bg-[#BF0A30] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {pendingApplicationsCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Branding & Help */}
      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <button
          onClick={() => onSelectTab('settings')}
          className="flex items-center gap-3 px-3.5 py-2.5 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm w-full text-left"
        >
          <HelpCircle size={18} className="text-white/70" />
          <span>Help Center</span>
        </button>
        <div className="pt-2 text-center text-[11px] text-white/40 font-mono">
          ACIMS v2.4.1 &bull; Batticaloa
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] shadow-2xl z-40 border-r border-white/10 flex-col">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-[280px] max-w-[85vw] h-full shadow-2xl z-50">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
