import React, { useState } from 'react';
import { ScreenType, UserSession, VolunteerHourLog } from '../types';
import { StorageService } from '../services/storage';
import { HeartHandshake, Clock, PlusCircle, CheckCircle2, Award, Calendar, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VolunteerPortalProps {
  session: UserSession;
  onNavigate: (screen: ScreenType) => void;
}

export const VolunteerPortal: React.FC<VolunteerPortalProps> = ({ session, onNavigate }) => {
  const [hoursList, setHoursList] = useState<VolunteerHourLog[]>(() => StorageService.getVolunteerHours());
  const [showLogModal, setShowLogModal] = useState(false);
  const [activityTitle, setActivityTitle] = useState('');
  const [hours, setHours] = useState('3.0');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const totalApprovedHours = hoursList
    .filter(h => h.status === 'Approved')
    .reduce((sum, h) => sum + h.hours, 0);

  const pendingHours = hoursList
    .filter(h => h.status === 'Pending')
    .reduce((sum, h) => sum + h.hours, 0);

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle || !hours || !date) return;

    setSubmitting(true);
    setTimeout(() => {
      const newLog = StorageService.submitVolunteerHours({
        volunteerId: session.memberId || 'ACB-VOL-2024-001',
        volunteerName: session.name,
        activityTitle: activityTitle.trim(),
        hours: parseFloat(hours),
        date,
        notes: notes.trim() || 'Service hours completed at ACB.'
      });

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      setHoursList(StorageService.getVolunteerHours());
      setSubmitting(false);
      setShowLogModal(false);
      setActivityTitle('');
      setNotes('');
    }, 500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-8">
      {/* Volunteer Welcome Banner */}
      <div className="bg-gradient-to-r from-[#ba022d] via-[#900020] to-[#5b0013] text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white text-[#ba022d] font-bold px-2.5 py-0.5 rounded-full">
                Active Volunteer
              </span>
              <span className="text-xs text-[#ffdad9] font-mono">
                {session.memberId || 'ACB-VOL-2024-001'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
              Welcome, {session.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#ffdad9] mt-0.5">
              Thank you for dedicating your time to empower youth across Batticaloa
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="px-5 py-3 bg-white hover:bg-[#ffdad9] text-[#900020] text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log Volunteer Hours</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#c4c6d2]/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#747781] font-semibold uppercase">Approved Service</span>
            <h3 className="text-2xl font-black text-[#00153e]">{totalApprovedHours.toFixed(1)} hrs</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#c4c6d2]/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#747781] font-semibold uppercase">Pending Verification</span>
            <h3 className="text-2xl font-black text-[#00153e]">{pendingHours.toFixed(1)} hrs</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#c4c6d2]/40 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-[#002868] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#747781] font-semibold uppercase">Recognition Tier</span>
            <h3 className="text-2xl font-black text-[#00153e]">Silver Award (50h)</h3>
          </div>
        </div>
      </div>

      {/* Activity Log History Table */}
      <div className="bg-white rounded-xl border border-[#c4c6d2]/40 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#c4c6d2]/40 flex justify-between items-center">
          <h3 className="text-base font-bold text-[#00153e] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#ba022d]" />
            <span>My Service Hours History</span>
          </h3>
          <button
            onClick={() => setShowLogModal(true)}
            className="text-xs font-bold text-[#ba022d] hover:underline"
          >
            + New Entry
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#f8f9ff] text-[#747781] uppercase font-bold border-b border-[#c4c6d2]/30">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Activity / Project</th>
                <th className="py-3 px-4">Hours</th>
                <th className="py-3 px-4">Supervisor Notes</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hoursList.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono text-[#00153e] font-semibold">{log.date}</td>
                  <td className="py-3 px-4 font-bold text-[#121c2a]">{log.activityTitle}</td>
                  <td className="py-3 px-4 font-black text-[#002868]">{log.hours.toFixed(1)} hrs</td>
                  <td className="py-3 px-4 text-[#444650] max-w-xs truncate">{log.notes || '—'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        log.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Hours Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c4c6d2] animate-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-[#00153e] mb-1">
              Log Volunteer Service Hours
            </h3>
            <p className="text-xs text-[#747781] mb-4">
              Enter your session details for coordinator verification.
            </p>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Activity / Program Name *
                </label>
                <input
                  type="text"
                  required
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  placeholder="e.g. English Cafe Facilitation, MakerSpace Demo"
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none focus:border-[#ba022d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Hours *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    required
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none focus:border-[#ba022d]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none focus:border-[#ba022d]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Service Summary / Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly describe your tasks (e.g. setup, teaching, registration desk)..."
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs outline-none focus:border-[#ba022d]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-[#ba022d] hover:bg-[#900020] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Log Hours'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="py-2.5 px-4 border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
