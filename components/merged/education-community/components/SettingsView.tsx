import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  ShieldCheck, 
  Droplets, 
  Lock, 
  Save, 
  CheckCircle,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { UserRole } from '../types';
import { USER_SARAH, USER_ADMIN } from '../data/mockData';

interface SettingsViewProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userRole,
  setUserRole
}) => {
  const currentUser = userRole === 'admin' ? USER_ADMIN : USER_SARAH;
  const [displayName, setDisplayName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [waterInterval, setWaterInterval] = useState('60');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Account & Portal Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal profile, notification triggers, and learning wellness configurations.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Profile and study reminder preferences updated successfully!</span>
        </div>
      )}

      {/* Role Switch Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002868] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Active View Mode</h3>
            <p className="text-xs text-slate-500">Currently operating as: <span className="font-semibold text-[#BF0A30]">{userRole.toUpperCase()}</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUserRole('student')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              userRole === 'student' ? 'bg-[#002868] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Student Mode
          </button>
          <button
            onClick={() => setUserRole('admin')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              userRole === 'admin' ? 'bg-[#002868] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Admin Mode
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-[#002868]" />
          <span>Profile Information</span>
        </h3>

        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-200 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h4 className="font-bold text-sm text-slate-900">{currentUser.name}</h4>
            <p className="text-xs text-slate-500">{currentUser.portal}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700">Academic & Civic Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
          />
        </div>

        {/* Study Wellness & Reminder Preferences */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-sky-600" />
            <span>Study Hydration & Reminder Interval</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Water Reminder Interval</label>
              <select
                value={waterInterval}
                onChange={(e) => setWaterInterval(e.target.value)}
                className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                <option value="30">Every 30 Minutes</option>
                <option value="45">Every 45 Minutes</option>
                <option value="60">Every 60 Minutes (Recommended)</option>
                <option value="90">Every 90 Minutes</option>
              </select>
            </div>

            <div className="flex flex-col justify-center space-y-2">
              <label className="text-xs font-bold text-slate-700">Notification Channels</label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#BF0A30] focus:ring-[#BF0A30]"
                />
                <span>Email alerts for upcoming assignments & grades</span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
