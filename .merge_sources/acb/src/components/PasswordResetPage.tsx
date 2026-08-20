import React, { useState } from 'react';
import { ScreenType } from '../types';
import { StorageService } from '../services/storage';
import { CONTACT_INFO } from '../data/mockData';
import { ArrowLeft, KeyRound, CheckCircle2, MessageCircle, Send, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PasswordResetPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PasswordResetPage: React.FC<PasswordResetPageProps> = ({ onNavigate }) => {
  const [userType, setUserType] = useState<'student' | 'volunteer'>('student');
  const [memberId, setMemberId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [requestDetails, setRequestDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId || !firstName || !lastName || !phone) return;

    setLoading(true);
    setTimeout(() => {
      StorageService.submitResetRequest({
        userType,
        memberId: memberId.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        requestDetails: requestDetails.trim() || 'Password recovery requested.'
      });

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#c4c6d2]/40 overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#002868] px-6 py-8 text-center relative">
          <button
            onClick={() => onNavigate('home')}
            className="absolute top-4 left-4 text-[#dae2ff] hover:text-white flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>

          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 border border-white/20">
            <KeyRound className="w-6 h-6 text-[#ffdad9]" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Password Reset Request
          </h2>
          <p className="text-xs text-[#dae2ff] mt-1">
            Submit your membership details to verify your identity with corner administration.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 flex flex-col items-center gap-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#00153e]">Request Submitted Successfully</h3>
              <p className="text-xs text-[#444650] max-w-md leading-relaxed">
                Your reset request for <strong>{memberId}</strong> has been logged in the Admin Queue. A temporary access code will be sent to <strong>{phone}</strong> after administrator review.
              </p>

              {/* Coordinator Hotline Box */}
              <div className="w-full bg-[#eff4ff] p-4 rounded-xl border border-[#d9e3f6] text-left mt-2">
                <p className="text-xs font-bold text-[#002868] flex items-center gap-1 mb-1">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Need instant reset assistance?</span>
                </p>
                <p className="text-xs text-[#444650]">
                  Contact the Coordinator directly via WhatsApp at <strong>{CONTACT_INFO.whatsappCoordinator}</strong>.
                </p>
                <a
                  href={CONTACT_INFO.whatsappCoordinatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <span>Open WhatsApp Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <button
                onClick={() => onNavigate(userType === 'student' ? 'student-login' : 'volunteer-login')}
                className="mt-4 px-6 py-2.5 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs rounded-lg transition-colors"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-2">
                  I am requesting reset for:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType('student')}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all border ${
                      userType === 'student'
                        ? 'bg-[#002868] text-white border-[#002868] shadow-sm'
                        : 'bg-[#f8f9ff] text-[#444650] border-[#c4c6d2] hover:bg-gray-100'
                    }`}
                  >
                    Student Account
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType('volunteer')}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all border ${
                      userType === 'volunteer'
                        ? 'bg-[#ba022d] text-white border-[#ba022d] shadow-sm'
                        : 'bg-[#f8f9ff] text-[#444650] border-[#c4c6d2] hover:bg-gray-100'
                    }`}
                  >
                    Volunteer Account
                  </button>
                </div>
              </div>

              {/* Member ID */}
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Member ID / {userType === 'student' ? 'Student ID' : 'Volunteer ID'} *
                </label>
                <input
                  type="text"
                  required
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  placeholder={userType === 'student' ? 'e.g. ACB-STU-2024-042' : 'e.g. ACB-VOL-2024-001'}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                />
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Registered Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="077XXXXXXX"
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Request Details / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={requestDetails}
                  onChange={(e) => setRequestDetails(e.target.value)}
                  placeholder="Reason for password recovery..."
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Reset Request'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(userType === 'student' ? 'student-login' : 'volunteer-login')}
                  className="py-3 px-5 border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 text-xs sm:text-sm font-semibold rounded-lg"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
