import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  Shield,
  Bell,
  Database,
  Globe,
  CheckCircle2,
  Server,
  Lock,
  Mail,
  Key,
} from 'lucide-react';
import { SystemSettingsData } from '../../types';

interface SystemSettingsViewProps {
  settings: SystemSettingsData;
  onSaveSettings: (newSettings: SystemSettingsData) => void;
}

export const SystemSettingsView: React.FC<SystemSettingsViewProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<SystemSettingsData>(settings);
  const [activeSubTab, setActiveSubTab] = useState<'general' | 'security' | 'notifications' | 'database'>('general');
  const [isSavedToast, setIsSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            System Settings
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Configure institutional preferences, security rules, notification protocols, and cloud sync parameters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormData(settings)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all tracking-wide"
          >
            <Save size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {isSavedToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-medium animate-in fade-in">
          <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
          <span>System configuration successfully updated and synced with FastAPI backend.</span>
        </div>
      )}

      {/* Subtabs Pill */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveSubTab('general')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'general'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Globe size={16} />
          <span>General Portal</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'security'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Shield size={16} />
          <span>Security & Roles</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'notifications'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Bell size={16} />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeSubTab === 'database'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Database size={16} />
          <span>FastAPI & Supabase</span>
        </button>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        {/* General Tab */}
        {activeSubTab === 'general' && (
          <div className="space-y-6">
            <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Institutional Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Organization Center Name
                </label>
                <input
                  type="text"
                  value={formData.cornerName}
                  onChange={(e) => setFormData({ ...formData, cornerName: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Official Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  System Timezone
                </label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Physical Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeSubTab === 'security' && (
          <div className="space-y-6">
            <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Security & Access Controls
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-gray-900 text-sm block">Two-Factor Authentication (2FA)</span>
                  <span className="text-xs text-gray-500">Require MFA for all administrative roles on login</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.requireMFA}
                  onChange={(e) => setFormData({ ...formData, requireMFA: e.target.checked })}
                  className="w-5 h-5 rounded text-[#002868] focus:ring-[#002868]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-gray-900 text-sm block">Auto-Lock Idle Sessions</span>
                  <span className="text-xs text-gray-500">Lock portal screen after 15 minutes of inactivity</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoLockSessions}
                  onChange={(e) => setFormData({ ...formData, autoLockSessions: e.target.checked })}
                  className="w-5 h-5 rounded text-[#002868] focus:ring-[#002868]"
                />
              </label>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeSubTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Automated Alerts & Dispatch
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-gray-900 text-sm block">Volunteer Application Email Dispatch</span>
                  <span className="text-xs text-gray-500">Send automatic confirmation and notify administrator upon new submission</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emailAlertsOnVolunteerApp}
                  onChange={(e) => setFormData({ ...formData, emailAlertsOnVolunteerApp: e.target.checked })}
                  className="w-5 h-5 rounded text-[#002868] focus:ring-[#002868]"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 cursor-pointer">
                <div>
                  <span className="font-semibold text-gray-900 text-sm block">Program Capacity Warning</span>
                  <span className="text-xs text-gray-500">Notify program coordinators when enrollment reaches 90%</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.programCapacityAlerts}
                  onChange={(e) => setFormData({ ...formData, programCapacityAlerts: e.target.checked })}
                  className="w-5 h-5 rounded text-[#002868] focus:ring-[#002868]"
                />
              </label>
            </div>
          </div>
        )}

        {/* Database & Supabase Tab */}
        {activeSubTab === 'database' && (
          <div className="space-y-6">
            <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              FastAPI + PostgreSQL (Supabase) Integration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2.5 font-bold text-[#002868] text-sm mb-1">
                  <Server size={18} />
                  <span>FastAPI Backend Engine</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 font-mono">
                  Endpoint: https://api.acbatticaloa.org/v1
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Status: Operational (Latency 24ms)</span>
                </div>
              </div>

              <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2.5 font-bold text-emerald-800 text-sm mb-1">
                  <Database size={18} />
                  <span>Supabase PostgreSQL Cluster</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 font-mono">
                  Region: ap-southeast-1 (Singapore)
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Status: Synced &bull; 99.98% Uptime</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Automated Database Snapshot Frequency
              </label>
              <select
                value={formData.backupFrequency}
                onChange={(e) => setFormData({ ...formData, backupFrequency: e.target.value })}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20"
              >
                <option>Daily at 04:00 AM (UTC+05:30)</option>
                <option>Every 12 Hours</option>
                <option>Weekly on Sunday</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
