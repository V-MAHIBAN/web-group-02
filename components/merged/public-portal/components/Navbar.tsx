import React, { useState } from 'react';
import { ScreenType, UserSession } from '../types';
import { LOGOS } from '../data/mockData';
import { ChevronDown, Menu, X, Home, BookOpen, Image as ImageIcon, User, ShieldCheck, Mail, LogOut, Info, BriefcaseBusiness, UsersRound } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenWorkspace?: (workspace: 'academic' | 'community') => void;
  userSession: UserSession | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenWorkspace,
  userSession,
  onLogout
}) => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    setLoginDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isHome = currentScreen === 'home';
  const isAbout = currentScreen === 'about';
  const isPrograms = currentScreen === 'programs';
  const isGallery = currentScreen === 'gallery';
  const isContact = currentScreen === 'contact';
  const isAdmin = currentScreen.startsWith('admin');
  const isStudent = currentScreen.startsWith('student');
  const isVolunteer = currentScreen.startsWith('volunteer');

  return (
    <header className="w-full top-0 sticky z-50 border-b border-[#c4c6d2] shadow-sm transition-all duration-300 bg-[#FFFFFF]">
      <div className="flex justify-between items-center w-full px-4 md:px-10 max-w-7xl mx-auto py-2 h-20 gap-4">
        {/* Brand with Dual Logos */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 md:gap-3 text-left group focus:outline-none"
        >
          <img
            alt="U.S. Embassy Logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGOS.usEmbassy}
          />
          <img
            alt="American Corner Batticaloa Logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            src={LOGOS.americanCorner}
          />
          <span className="font-bold text-base md:text-xl lg:text-2xl text-[#002868] ml-1 tracking-tight">
            American Corner Batticaloa
          </span>
        </button>

        {/* Nav Links (Desktop Capsule) */}
        <nav
          className="hidden md:flex items-center gap-2 lg:gap-3 border rounded-full px-3 lg:px-4 py-1.5 shadow-sm backdrop-blur-lg border-white/40"
          style={{
            background:
              'linear-gradient(135deg, rgba(60, 59, 110, 0.06) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(178, 34, 52, 0.06) 100%)',
            boxShadow: 'rgba(255, 255, 255, 0.5) 0px 1px 2px inset, rgba(0, 0, 0, 0.08) 0px 3px 6px -1px'
          }}
        >
          {/* Home */}
          <button
            onClick={() => handleNav('home')}
            className={`font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full ${
              isHome
                ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
            }`}
          >
            Home
          </button>

          {/* About Us */}
          <button
            onClick={() => handleNav('about')}
            className={`font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full ${
              isAbout
                ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
            }`}
          >
            About Us
          </button>

          {/* Programs */}
          <button
            onClick={() => handleNav('programs')}
            className={`font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full ${
              isPrograms
                ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
            }`}
          >
            Programs
          </button>

          {/* Gallery */}
          <button
            onClick={() => handleNav('gallery')}
            className={`font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full ${
              isGallery
                ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
            }`}
          >
            Gallery
          </button>

          {/* Login Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
              onBlur={() => setTimeout(() => setLoginDropdownOpen(false), 200)}
              className={`flex items-center gap-1 font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full ${
                (isStudent || isVolunteer) && !isAdmin
                  ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                  : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
              }`}
            >
              <span>{userSession && userSession.type !== 'admin' ? `${userSession.type === 'student' ? 'Student Portal' : 'Volunteer Portal'}` : 'Login'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {loginDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#c4c6d2] rounded-xl shadow-xl z-50 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleNav(userSession?.type === 'student' ? 'student-portal' : 'student-login')}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#121c2a] hover:bg-[#eff4ff] hover:text-[#002868] flex items-center gap-2.5 transition-colors"
                >
                  <User className="w-4 h-4 text-[#002868]" />
                  <span>{userSession?.type === 'student' ? 'My Student Portal' : 'Student Login'}</span>
                </button>
                <button
                  onClick={() => handleNav(userSession?.type === 'volunteer' ? 'volunteer-portal' : 'volunteer-login')}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-[#121c2a] hover:bg-[#eff4ff] hover:text-[#002868] flex items-center gap-2.5 transition-colors border-t border-[#eff4ff]"
                >
                  <User className="w-4 h-4 text-[#ba022d]" />
                  <span>{userSession?.type === 'volunteer' ? 'My Volunteer Portal' : 'Volunteer Login'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Admin */}
          <button
            onClick={() => handleNav(userSession?.type === 'admin' ? 'admin-portal' : 'admin-login')}
            className={`font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full flex items-center gap-1.5 ${
              isAdmin
                ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{userSession?.type === 'admin' ? 'Admin Dashboard' : 'Admin'}</span>
          </button>

          <button
            onClick={() => onOpenWorkspace?.('academic')}
            className="font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full flex items-center gap-1.5 text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50"
          >
            <BriefcaseBusiness className="w-3.5 h-3.5" />
            <span>Staff</span>
          </button>

          <button
            onClick={() => onOpenWorkspace?.('community')}
            className="font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full flex items-center gap-1.5 text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50"
          >
            <UsersRound className="w-3.5 h-3.5" />
            <span>Community</span>
          </button>

          {/* Contact Us */}
          <button
            onClick={() => handleNav('contact')}
            className={`font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full ${
              isContact
                ? 'text-[#BF0A30] font-bold border border-[#BF0A30] bg-white/90 shadow-sm'
                : 'text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50'
            }`}
          >
            Contact Us
          </button>

          {/* User Session Logout Pill if logged in */}
          {userSession && (
            <button
              onClick={onLogout}
              title="Log out of session"
              className="flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-full transition-colors ml-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {userSession && (
            <button
              onClick={onLogout}
              className="p-1.5 text-red-600 bg-red-50 rounded-md text-xs font-medium flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#002868] hover:bg-[#eff4ff] rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#c4c6d2] shadow-xl px-4 py-3 flex flex-col gap-1 divide-y divide-gray-100 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
              isHome ? 'text-[#BF0A30] bg-red-50' : 'text-[#121c2a] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2"><Home className="w-4 h-4" /> Home</span>
          </button>

          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
              isAbout ? 'text-[#BF0A30] bg-red-50' : 'text-[#121c2a] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2"><Info className="w-4 h-4" /> About Us</span>
          </button>

          <button
            onClick={() => handleNav('programs')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
              isPrograms ? 'text-[#BF0A30] bg-red-50' : 'text-[#121c2a] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Programs & Workshops</span>
          </button>

          <button
            onClick={() => handleNav('gallery')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
              isGallery ? 'text-[#BF0A30] bg-red-50' : 'text-[#121c2a] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Gallery & Photos</span>
          </button>

          <div className="pt-2 pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#747781] px-3">Portals & Login</span>
            <div className="flex flex-col gap-1 mt-1">
              <button
                onClick={() => handleNav(userSession?.type === 'student' ? 'student-portal' : 'student-login')}
                className="w-full text-left py-2 px-3 pl-6 rounded-lg text-sm font-medium text-[#121c2a] hover:bg-gray-50 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#002868]" />
                <span>{userSession?.type === 'student' ? 'Student Dashboard' : 'Student Login'}</span>
              </button>
              <button
                onClick={() => handleNav(userSession?.type === 'volunteer' ? 'volunteer-portal' : 'volunteer-login')}
                className="w-full text-left py-2 px-3 pl-6 rounded-lg text-sm font-medium text-[#121c2a] hover:bg-gray-50 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#ba022d]" />
                <span>{userSession?.type === 'volunteer' ? 'Volunteer Dashboard' : 'Volunteer Login'}</span>
              </button>
              <button
                onClick={() => handleNav(userSession?.type === 'admin' ? 'admin-portal' : 'admin-login')}
                className="w-full text-left py-2 px-3 pl-6 rounded-lg text-sm font-medium text-[#121c2a] hover:bg-gray-50 flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#002868]" />
                <span>{userSession?.type === 'admin' ? 'Admin Dashboard' : 'Admin Login'}</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => { onOpenWorkspace?.('academic'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center gap-2 text-[#121c2a] hover:bg-gray-50"
          >
            <BriefcaseBusiness className="w-4 h-4" /> Staff workspace
          </button>
          <button
            onClick={() => { onOpenWorkspace?.('community'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center gap-2 text-[#121c2a] hover:bg-gray-50"
          >
            <UsersRound className="w-4 h-4" /> Community workspace
          </button>

          <button
            onClick={() => handleNav('contact')}
            className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-between ${
              isContact ? 'text-[#BF0A30] bg-red-50' : 'text-[#121c2a] hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Contact Us</span>
          </button>
        </div>
      )}
    </header>
  );
};
