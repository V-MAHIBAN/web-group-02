import React, { useState } from 'react';
import { ScreenType, UserSession } from '../types';
import { LOGOS } from '../data/mockData';
import { Eye, EyeOff, Lock, User, ArrowLeft, HeartHandshake, Sparkles } from 'lucide-react';

interface VolunteerLoginProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const VolunteerLogin: React.FC<VolunteerLoginProps> = ({
  onNavigate,
  onLoginSuccess
}) => {
  const [volunteerId, setVolunteerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerId || !password) {
      setError('Please provide your Volunteer ID and Password.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      const session: UserSession = {
        userId: volunteerId,
        name: 'Akeelan Pathmanathan',
        email: 'volunteer@acbatticaloa.org',
        type: 'volunteer',
        memberId: volunteerId.trim()
      };
      onLoginSuccess(session);
      onNavigate('volunteer-portal');
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setVolunteerId('ACB-VOL-2024-001');
    setPassword('VolunteerDemo2025!');
    setTimeout(() => {
      const session: UserSession = {
        userId: 'ACB-VOL-2024-001',
        name: 'Akeelan Pathmanathan',
        email: 'akeelan.p@example.com',
        type: 'volunteer',
        memberId: 'ACB-VOL-2024-001'
      };
      onLoginSuccess(session);
      onNavigate('volunteer-portal');
    }, 300);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#c4c6d2]/40 overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#ba022d] px-6 py-8 text-center relative">
          <button
            onClick={() => onNavigate('home')}
            className="absolute top-4 left-4 text-[#ffdad9] hover:text-white flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>

          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <HeartHandshake className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Volunteer Login
          </h2>
          <p className="text-xs text-[#ffdad9] mt-1">
            Log your hours, view event schedules, and collaborate with the community.
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
                Volunteer ID
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={volunteerId}
                  onChange={(e) => setVolunteerId(e.target.value)}
                  placeholder="e.g. ACB-VOL-2024-001"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#ba022d] focus:ring-1 focus:ring-[#ba022d] outline-none"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#ba022d] focus:ring-1 focus:ring-[#ba022d] outline-none"
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
                  className="rounded border-[#c4c6d2] text-[#ba022d] focus:ring-[#ba022d]"
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
              className="w-full py-3 bg-[#ba022d] hover:bg-[#00153e] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {loading ? <span>Logging in...</span> : <span>Log In as Volunteer</span>}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-5 border-t border-[#c4c6d2]/40 text-center">
            <p className="text-xs text-[#747781] mb-2">Evaluate the Volunteer Experience:</p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffdad9]/40 hover:bg-[#ffdad9] text-[#900020] text-xs font-bold transition-colors border border-[#ffdad9]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
              <span>One-Click Volunteer Demo Login</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-[#444650]">
              Interested in becoming a volunteer?{' '}
              <button
                onClick={() => onNavigate('contact')}
                className="text-[#ba022d] font-bold hover:underline"
              >
                Contact us for orientation
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
