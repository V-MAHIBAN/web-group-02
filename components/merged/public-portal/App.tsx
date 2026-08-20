import React, { useState, useEffect } from 'react';
import { ScreenType, UserSession } from './types';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CommunityStats } from './components/CommunityStats';
import { CommunityRolesSection } from './components/CommunityRolesSection';
import { ProgramsPage } from './components/ProgramsPage';
import { GalleryPage } from './components/GalleryPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { StudentLogin } from './components/StudentLogin';
import { VolunteerLogin } from './components/VolunteerLogin';
import { AdminLogin } from './components/AdminLogin';
import { PasswordResetPage } from './components/PasswordResetPage';
import { AdminSignupPage } from './components/AdminSignupPage';
import { StudentPortal } from './components/StudentPortal';
import { VolunteerPortal } from './components/VolunteerPortal';
import { AdminPortal } from './components/AdminPortal';

interface AppProps {
  onOpenWorkspace?: (workspace: 'academic' | 'community') => void;
}

export function App({ onOpenWorkspace }: AppProps) {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userSession, setUserSession] = useState<UserSession | null>(() => StorageService.getUserSession());

  // URL Hash Sync for clean routing and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenType;
      const validScreens: ScreenType[] = [
        'home',
        'about',
        'programs',
        'gallery',
        'student-login',
        'volunteer-login',
        'admin-login',
        'password-reset',
        'admin-signup',
        'student-portal',
        'volunteer-portal',
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
            <CommunityRolesSection onNavigate={handleNavigate} />
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
