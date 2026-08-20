import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  UserCheck, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Plus, 
  Sparkles,
  ShieldCheck,
  Globe,
  Droplets
} from 'lucide-react';
import { ActiveTab, UserRole } from '../types';
import { USER_SARAH, USER_ADMIN } from '../data/mockData';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenCreatePost: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenCreatePost,
  isOpenMobile,
  onCloseMobile
}) => {
  const currentUser = userRole === 'admin' ? USER_ADMIN : USER_SARAH;

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: userRole === 'admin' ? 'Overview' : 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'courses' as ActiveTab,
      label: 'My Courses',
      icon: BookOpen,
      badge: '3'
    },
    {
      id: 'ai-assistant' as ActiveTab,
      label: 'EduAssist AI',
      icon: Sparkles,
      badge: 'AI'
    },
    {
      id: 'communities' as ActiveTab,
      label: 'Communities',
      icon: Users,
      badge: '12'
    },
    {
      id: 'schedule' as ActiveTab,
      label: 'Schedule & Tracker',
      icon: Calendar,
      badge: '3'
    },
    {
      id: 'members' as ActiveTab,
      label: 'Members',
      icon: UserCheck,
      badge: null
    },
    {
      id: 'settings' as ActiveTab,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside 
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#002868] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="p-5 flex flex-col flex-1 overflow-y-auto">
        {/* User Profile Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-white/10">
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#002868] rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base leading-snug truncate text-white">
              {currentUser.name}
            </h2>
            <p className="text-xs text-white/70 truncate flex items-center gap-1">
              {userRole === 'admin' ? (
                <span className="inline-flex items-center text-amber-300 font-medium">
                  <ShieldCheck className="w-3 h-3 mr-0.5 inline" /> Admin Portal
                </span>
              ) : (
                'Management Portal'
              )}
            </p>
          </div>
        </div>

        {/* Create Post Button */}
        <button
          id="btn-create-post-sidebar"
          onClick={onOpenCreatePost}
          className="w-full bg-[#BF0A30] hover:bg-[#D7263D] active:scale-[0.99] text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all duration-200 mb-6 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide">+ Create Post</span>
        </button>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-white/45 px-3 mb-2">
            Main Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white font-semibold shadow-inner'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-white/80'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    item.badge === 'AI'
                      ? 'bg-amber-400 text-slate-900 shadow-sm'
                      : isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-white/15 text-white/90'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* View Mode Switcher */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-white/45 px-3 mb-2">
            View Switcher
          </p>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-black/20 rounded-xl">
            <button
              onClick={() => {
                setUserRole('student');
                setActiveTab('dashboard');
              }}
              className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                userRole === 'student'
                  ? 'bg-white text-[#002868] font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Student View
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setActiveTab('dashboard');
              }}
              className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                userRole === 'admin'
                  ? 'bg-white text-[#002868] font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Admin View
            </button>
          </div>

          <button
            onClick={() => handleNavClick('landing')}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Landing Page</span>
          </button>
        </div>
      </div>

      {/* Footer Support & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/10 space-y-1">
        <button
          onClick={() => handleNavClick('settings')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/75 hover:bg-white/10 hover:text-white transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support & Help</span>
        </button>
        <button
          onClick={() => handleNavClick('landing')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-rose-300 hover:bg-rose-500/20 hover:text-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit / Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
