import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Clock,
  GraduationCap,
  Award,
  BarChart3,
  User,
  PlusCircle,
  X
} from 'lucide-react';
import { TabType, UserProfile } from '../../types';

interface MobileNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenLogHours: () => void;
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  onOpenLogHours,
  isOpen,
  onClose,
  user,
}) => {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks' as TabType, label: 'Tasks', icon: ClipboardList },
    { id: 'hours' as TabType, label: 'Hours', icon: Clock },
    { id: 'programs' as TabType, label: 'Learning', icon: GraduationCap },
    { id: 'attendance' as TabType, label: 'Impact', icon: BarChart3 },
    { id: 'certificates' as TabType, label: 'Certs', icon: Award },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
          onClick={onClose}
        >
          <div
            className="w-72 bg-[#002868] text-white h-full p-5 flex flex-col justify-between shadow-2xl animate-slideRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#BF0A30] text-white flex items-center justify-center font-bold shadow-md">
                    VC
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">VolunteerConnect</h3>
                    <p className="text-xs text-blue-200">Community Portal</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1 rounded-md text-blue-200 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        onTabChange(tab.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#BF0A30] text-white shadow-md'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/15">
              <button
                onClick={() => {
                  onClose();
                  onOpenLogHours();
                }}
                className="w-full bg-[#BF0A30] hover:bg-[#D7263D] text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Log Hours
              </button>
              <div className="flex items-center gap-3 p-2.5 bg-white/10 rounded-lg border border-white/10">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <div className="text-xs">
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-[#F59E0B] font-medium">{user.tier}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar (Mobile only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FFFFFF] border-t border-slate-200 z-40 flex items-center justify-around px-2 shadow-lg">
        {tabs.slice(0, 5).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                isActive ? 'text-[#BF0A30]' : 'text-slate-500'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-red-50 text-[#BF0A30]' : 'text-[#002868]'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
