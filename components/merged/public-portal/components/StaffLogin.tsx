'use client';

import React, { useState } from 'react';
import { ScreenType, UserSession } from '../types';
import { LOGOS } from '../data/mockData';
import { Eye, EyeOff, Lock, User, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

interface StaffLoginProps {
  onNavigate: (screen: ScreenType) => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const StaffLogin: React.FC<StaffLoginProps> = ({
  onNavigate,
  onLoginSuccess
}) => {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId || !password) {
      setError('Please fill in both Staff ID and Password.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      // Create session
      const session: UserSession = {
        userId: staffId,
        name: staffId.toUpperCase().includes('STAFF') ? 'Staff Member' : 'Registered Staff',
        email: 'staff@acbatticaloa.org',
        type: 'staff',
        memberId: staffId.trim()
      };
      onLoginSuccess(session);
      onNavigate('staff-portal');
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setStaffId('ACB-STAFF-2024-001');
    setPassword('StaffDemo2025!');
    setTimeout(() => {
      const session: UserSession = {
        userId: 'ACB-STAFF-2024-001',
        name: 'Staff Administrator',
        email: 'staff.admin@example.com',
        type: 'staff',
        memberId: 'ACB-STAFF-2024-001'
      };
      onLoginSuccess(session);
      onNavigate('staff-portal');
    }, 300);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-[#c4c6d2]/40 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-8 text-center relative">
          <button
            onClick={() => onNavigate('dashboard-selection')}
            className="absolute top-4 left-4 text-amber-100 hover:text-white flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <img
            src={LOGOS.americanCorner}
            alt="ACB Logo"
            className="h-12 w-auto mx-auto mb-3 object-contain drop-shadow"
          />

          <h2 className="text-2xl font-black text-white tracking-tight">
            Staff Login
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Welcome. Access staff dashboard and administrative tools.
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
                Staff ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="Enter your staff ID"
                  className="w-full pl-10 pr-4 py-2.5 border border-[#c4c6d2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-[#c4c6d2] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border border-[#c4c6d2] rounded bg-white cursor-pointer"
                />
                <span className="text-[#444650]">Remember me</span>
              </label>
              <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-[#747781]">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Demo Login Button */}
          <button
            onClick={handleQuickDemoLogin}
            className="w-full border-2 border-amber-200 text-amber-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Demo Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
