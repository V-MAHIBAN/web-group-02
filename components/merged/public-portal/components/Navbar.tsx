'use client';

import React, { useState, useEffect } from 'react';
import { ScreenType, UserSession } from '../types';
import { LOGOS } from '../data/mockData';
import { Menu, X, Home, BookOpen, Image as ImageIcon, Mail, LogOut, Info } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
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



          <button
            onClick={() => handleNav('dashboard-selection')}
            className="font-semibold text-sm transition-all duration-200 px-3.5 py-1 rounded-full text-[#444650] hover:text-[#BF0A30] border border-transparent hover:border-[#c4c6d2]/40 bg-white/50"
          >
            <span>Login</span>
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
          {isHydrated && userSession && (
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
          {isHydrated && userSession && (
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



          <button
            onClick={() => handleNav('dashboard-selection')}
            className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#121c2a] hover:bg-gray-50"
          >
            Login
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
