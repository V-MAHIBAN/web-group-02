import React, { useState } from 'react';
import { ScreenType, UserSession } from '../types';
import { CONTACT_INFO, LOGOS } from '../data/mockData';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onNavigate,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your administrator email and password.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      const session: UserSession = {
        userId: 'admin-01',
        name: 'Corner Director / Coordinator',
        email: email.trim(),
        type: 'admin',
        role: 'Admin'
      };
      onLoginSuccess(session);
      onNavigate('admin-portal');
    }, 600);
  };

  const handleDemoAdmin = () => {
    setEmail('coordinator@acbatticaloa.org');
    setPassword('AdminSecure2025!');
    setTimeout(() => {
      const session: UserSession = {
        userId: 'admin-lead-01',
        name: 'Corner Director / Coordinator',
        email: 'coordinator@acbatticaloa.org',
        type: 'admin',
        role: 'Admin'
      };
      onLoginSuccess(session);
      onNavigate('admin-portal');
    }, 300);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#c4c6d2]/40 overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#00153e] px-6 py-8 text-center relative">
          <button
            onClick={() => onNavigate('home')}
            className="absolute top-4 left-4 text-[#dae2ff] hover:text-white flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>

          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 border border-white/20">
            <ShieldCheck className="w-8 h-8 text-[#ffdad9]" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Admin Portal
          </h2>
          <p className="text-xs text-[#dae2ff] mt-1">
            Sign in to manage the American Corner Batticaloa system
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
                Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@acbatticaloa.org"
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

            <div className="flex items-center justify-end text-xs pt-1">
              <button
                type="button"
                onClick={() => setShowWhatsappModal(true)}
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
              {loading ? <span>Authenticating...</span> : <span>Sign In to Admin Portal</span>}
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="mt-6 pt-5 border-t border-[#c4c6d2]/40 text-center">
            <p className="text-xs text-[#747781] mb-2">Evaluate the Admin Management Console:</p>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#eff4ff] hover:bg-[#d9e3f6] text-[#002868] text-xs font-bold transition-colors border border-[#d9e3f6]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
              <span>One-Click Admin Demo Login</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-[#444650]">
              Don't have an admin account?{' '}
              <button
                onClick={() => onNavigate('admin-signup')}
                className="text-[#002868] font-bold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Coordinator Password Reset Modal (Matching Screenshot 18) */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#c4c6d2] text-center animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-[#00153e] mb-1">
              Admin Password Reset
            </h3>

            <p className="text-xs text-[#444650] leading-relaxed mb-4">
              For security compliance, admin credentials must be manually verified. Please contact the WhatsApp Coordinator directly:
            </p>

            <div className="bg-[#eff4ff] p-3 rounded-xl border border-[#d9e3f6] mb-5">
              <span className="text-xs text-[#747781] block">Coordinator Hotline:</span>
              <strong className="text-base text-[#002868] font-black">{CONTACT_INFO.whatsappCoordinator}</strong>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={CONTACT_INFO.whatsappCoordinatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Message on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowWhatsappModal(false)}
                className="w-full py-2 border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 font-semibold text-xs rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
