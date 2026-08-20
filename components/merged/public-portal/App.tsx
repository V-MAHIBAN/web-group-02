import React, { useState, useEffect } from 'react';
import { ScreenType, UserSession } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CommunityStats } from './components/CommunityStats';
import { ProgramsPage } from './components/ProgramsPage';
import { GalleryPage } from './components/GalleryPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { DashboardSelection } from './components/DashboardSelection';
import { StudentLogin } from './components/StudentLogin';
import { VolunteerLogin } from './components/VolunteerLogin';
import { StaffLogin } from './components/StaffLogin';
import { AdminLogin } from './components/AdminLogin';
import { PasswordResetPage } from './components/PasswordResetPage';
import { AdminSignupPage } from './components/AdminSignupPage';
import { StudentPortal } from './components/StudentPortal';
import { VolunteerPortal } from './components/VolunteerPortal';
import { AdminPortal } from './components/AdminPortal';
import { UnifiedPortalShell } from '../../portal/UnifiedPortalShell';
import type { PortalWorkspace } from '../../portal/UnifiedPortalShell';

interface AppProps {
  onOpenWorkspace?: (workspace: 'academic' | 'community') => void;
}

export function App({ onOpenWorkspace }: AppProps) {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userSession, setUserSession] = useState<UserSession | null>(() => StorageService.getUserSession());
  const [selectedPortalWorkspace, setSelectedPortalWorkspace] = useState<PortalWorkspace>('academic');

  // URL Hash Sync for clean routing and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenType;
      const validScreens: ScreenType[] = [
        'home',
        'about',
        'programs',
        'gallery',
        'dashboard-selection',
        'unified-portal',
        'student-login',
        'volunteer-login',
        'staff-login',
        'admin-login',
        'password-reset',
        'admin-signup',
        'student-portal',
        'volunteer-portal',
        'staff-portal',
        'admin-portal',
        'contact'
      ];
      if (validScreens.includes(hash)) {
        setCurrentScreen(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.location.hash = screen;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (session: UserSession) => {
    setUserSession(session);
    StorageService.setUserSession(session);
  };

  const handleLogout = () => {
    setUserSession(null);
    StorageService.setUserSession(null);
    handleNavigate('home');
  };

  const handleSelectPortal = (workspace: PortalWorkspace) => {
    setSelectedPortalWorkspace(workspace);
    handleNavigate('unified-portal');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#121c2a] selection:bg-[#ffdad9] selection:text-[#900020]">
      {/* Universal Top Navigation Header */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenWorkspace={onOpenWorkspace}
        userSession={userSession}
        onLogout={handleLogout}
      />

      {/* Main Screen Router */}
      <main className="flex-grow w-full">
        {currentScreen === 'home' && (
          <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-6 md:py-10 flex flex-col gap-12 md:gap-16">
            <HeroSection onNavigate={handleNavigate} />
            <AboutSection onNavigate={handleNavigate} />
            <CommunityStats />
          </div>
        )}

        {currentScreen === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentScreen === 'programs' && (
          <ProgramsPage />
        )}

        {currentScreen === 'gallery' && (
          <GalleryPage />
        )}

        {currentScreen === 'unified-portal' && (
          <UnifiedPortalShell initialWorkspace={selectedPortalWorkspace} />
        )}

        {currentScreen === 'dashboard-selection' && (
          <DashboardSelection onNavigate={handleNavigate} onSelectPortal={handleSelectPortal} />
        )}

        {currentScreen === 'student-login' && (
          <StudentLogin
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'volunteer-login' && (
          <VolunteerLogin
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'staff-login' && (
          <StaffLogin
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'admin-login' && (
          <AdminLogin
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {currentScreen === 'password-reset' && (
          <PasswordResetPage onNavigate={handleNavigate} />
        )}

        {currentScreen === 'admin-signup' && (
          <AdminSignupPage onNavigate={handleNavigate} />
        )}

        {currentScreen === 'student-portal' && (
          userSession?.type === 'student' ? (
            <StudentPortal session={userSession} onNavigate={handleNavigate} />
          ) : (
            <StudentLogin
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )
        )}

        {currentScreen === 'volunteer-portal' && (
          userSession?.type === 'volunteer' ? (
            <VolunteerPortal session={userSession} onNavigate={handleNavigate} />
          ) : (
            <VolunteerLogin
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )
        )}

        {currentScreen === 'staff-portal' && (
          userSession?.type === 'staff' ? (
            <div className="min-h-screen w-full max-w-7xl mx-auto px-4 md:px-10 py-10 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-md border border-[#c4c6d2]/40 p-8 text-center">
                <h1 className="text-4xl font-bold text-[#00153e] mb-4">Welcome, {userSession.name}!</h1>
                <p className="text-lg text-[#444650] mb-6">Staff Portal - Coming Soon</p>
                <p className="text-sm text-[#747781]">The staff dashboard and administrative tools are under development.</p>
              </div>
            </div>
          ) : (
            <StaffLogin
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )
        )}

        {currentScreen === 'admin-portal' && (
          userSession?.type === 'admin' ? (
            <AdminPortal session={userSession} onNavigate={handleNavigate} />
          ) : (
            <AdminLogin
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )
        )}

        {currentScreen === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
