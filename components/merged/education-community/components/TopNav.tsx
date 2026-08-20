import React from 'react';
import { Search, GraduationCap, ArrowRight, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { ActiveTab, UserRole } from '../types';

interface TopNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#BF0A30] flex items-center justify-center text-white shadow-sm group-hover:bg-[#D7263D] transition-colors">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-[#002868]">
              EduCommunity <span className="text-[#BF0A30]">Pro</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Civic Education & Leadership
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <button 
            onClick={() => setActiveTab('landing')}
            className={`hover:text-[#BF0A30] transition-colors cursor-pointer ${
              activeTab === 'landing' ? 'text-[#BF0A30] font-semibold' : ''
            }`}
          >
            Programs
          </button>
          <button 
            onClick={() => {
              setUserRole('student');
              setActiveTab('communities');
            }}
            className={`hover:text-[#BF0A30] transition-colors cursor-pointer ${
              activeTab === 'communities' ? 'text-[#BF0A30] font-semibold' : ''
            }`}
          >
            Communities
          </button>
          <button 
            onClick={() => {
              setUserRole('student');
              setActiveTab('ai-assistant');
            }}
            className={`hover:text-[#BF0A30] transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ai-assistant' ? 'text-[#BF0A30] font-semibold' : ''
            }`}
          >
            <span>Resources & AI</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
              AI
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('landing')}
            className="hover:text-[#BF0A30] transition-colors cursor-pointer"
          >
            About
          </button>
        </nav>

        {/* Right Section: Search & Portal Access */}
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative hidden sm:block w-44 lg:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search curriculum..." 
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#BF0A30]/30 focus:border-[#BF0A30] transition-all"
            />
          </div>

          {/* Direct portal actions */}
          <button
            onClick={() => {
              setUserRole('student');
              setActiveTab('dashboard');
            }}
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#002868] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4 text-[#002868]" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => {
              setUserRole('admin');
              setActiveTab('dashboard');
            }}
            className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};
