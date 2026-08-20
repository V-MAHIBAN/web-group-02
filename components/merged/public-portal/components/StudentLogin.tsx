import React, { useState } from 'react';
import { ScreenType, UserSession } from '../types';
import { LOGOS } from '../data/mockData';
import { Eye, EyeOff, Lock, User, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

interface StudentLoginProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({
  onNavigate,
  onLoginSuccess
}) => {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId || !password) {
      setError('Please fill in both Student ID and Password.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      // Create session
      const session: UserSession = {
        userId: memberId,
        name: memberId.toUpperCase().includes('KABILAN') ? 'Kabilan Thangavel' : 'Registered Student',
        email: 'student@acbatticaloa.org',
        type: 'student',
        memberId: memberId.trim()
      };
      onLoginSuccess(session);
      onNavigate('student-portal');
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setMemberId('ACB-STU-2024-042');
    setPassword('DemoStudent2025!');
    setTimeout(() => {
      const session: UserSession = {
        userId: 'ACB-STU-2024-042',
        name: 'Kabilan Thangavel',
        email: 'kabilan.t@example.com',
        type: 'student',
        memberId: 'ACB-STU-2024-042'
      };
      onLoginSuccess(session);
      onNavigate('student-portal');
    }, 300);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#c4c6d2]/40 overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#002868] px-6 py-8 text-center relative">
          <button
            onClick={() => onNavigate('home')}
            className="absolute top-4 left-4 text-[#dae2ff] hover:text-white flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>

          <img
            src={LOGOS.americanCorner}
            alt="ACB Logo"
            className="h-12 w-auto mx-auto mb-3 object-contain drop-shadow"
          />

          <h2 className="text-2xl font-black text-white tracking-tight">
            Student Login
          </h2>
          <p className="text-xs text-[#dae2ff] mt-1">
            Welcome back. Access your classes, schedules, and learning resources.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                Student ID / Member ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder="e.g. ACB-STU-2024-042"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#747781] hover:text-[#121c2a]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#444650]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#c4c6d2] text-[#002868] focus:ring-[#002868]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => onNavigate('password-reset')}
                className="text-[#ba022d] font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? <span>Logging in...</span> : <span>Log In</span>}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-5 border-t border-[#c4c6d2]/40 text-center">
            <p className="text-xs text-[#747781] mb-2">Want to test the Student experience immediately?</p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#d9e3f6] text-[#002868] text-xs font-bold transition-colors border border-[#d9e3f6]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
              <span>One-Click Student Demo Login</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-[#444650]">
              New student?{' '}
              <button
                onClick={() => onNavigate('programs')}
                className="text-[#002868] font-bold hover:underline"
              >
                Enroll in a Program
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
