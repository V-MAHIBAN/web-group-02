import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Clock,
  User,
  Settings,
  LogOut,
  PlusCircle,
  GraduationCap,
  Award,
  BarChart3,
  HeartHandshake
} from 'lucide-react';
import { TabType, UserProfile } from '../../types';

interface SideNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenLogHours: () => void;
  user: UserProfile;
  onLogout?: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({
  activeTab,
  onTabChange,
  onOpenLogHours,
  user,
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as TabType, label: 'Tasks', icon: ClipboardList },
    { id: 'hours' as TabType, label: 'Hours', icon: Clock },
    { id: 'programs' as TabType, label: 'My Learning', icon: GraduationCap },
    { id: 'attendance' as TabType, label: 'Impact Tracking', icon: BarChart3 },
    { id: 'certificates' as TabType, label: 'Certificates', icon: Award },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <aside className="bg-[#002868] text-white h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col shrink-0 shadow-lg border-r border-[#001c4a] z-40 select-none">
      <div className="flex flex-col h-full p-4 gap-2">
        {/* Header / Brand */}
        <div className="mb-5 px-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#BF0A30] text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white/20">
              VC
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-white tracking-tight">
                VolunteerConnect
              </h1>
              <p className="text-[11px] font-medium text-blue-200">
                Impact Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-left cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-[#BF0A30] text-white shadow-md'
                    : 'text-blue-100/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                <span className="leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Log Hours Call-to-Action */}
        <div className="pt-2">
          <button
            onClick={onOpenLogHours}
            className="w-full bg-[#BF0A30] hover:bg-[#D7263D] text-white py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Hours</span>
          </button>
        </div>

        {/* Footer Settings & User Card */}
        <div className="mt-auto border-t border-white/15 pt-3 space-y-2">
          <button
            onClick={() => onTabChange('profile')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-blue-100/80 hover:bg-white/10 hover:text-white transition-colors text-left cursor-pointer"
          >
            <Settings className="w-4 h-4 text-blue-200" />
            <span>Settings</span>
          </button>

          {/* User profile capsule */}
          <div className="flex items-center gap-2.5 px-2.5 py-2 mt-1 bg-white/10 rounded-xl border border-white/10">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-white/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] text-[#F59E0B] font-medium truncate">{user.tier}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
