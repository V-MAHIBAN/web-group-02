import React, { useState } from 'react';
import { ScreenType } from '../types';
import { StorageService } from '../services/storage';
import { ShieldCheck, ArrowLeft, CheckCircle2, UserCheck, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminSignupPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AdminSignupPage: React.FC<AdminSignupPageProps> = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nic, setNic] = useState('');
  const [role, setRole] = useState<'coordinator' | 'moderator' | 'staff' | 'advisor'>('coordinator');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !nic || !address || !phone || !email || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      StorageService.submitAdminSignup({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        nic: nic.trim(),
        role,
        address: address.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim() || phone.trim(),
        email: email.trim()
      });

      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-[#c4c6d2]/40 overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#00153e] px-6 py-8 text-center relative">
          <button
            onClick={() => onNavigate('admin-login')}
            className="absolute top-4 left-4 text-[#dae2ff] hover:text-white flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Admin Login
          </button>

          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 border border-white/20">
            <UserCheck className="w-6 h-6 text-[#ffdad9]" />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            Admin Registration
          </h2>
          <p className="text-xs text-[#dae2ff] mt-1">
            Submit your details for administrative review and credential provisioning
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 flex flex-col items-center gap-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#00153e]">Application Submitted for Review</h3>
              <p className="text-xs sm:text-sm text-[#444650] max-w-md leading-relaxed">
                Thank you, <strong>{firstName} {lastName}</strong>. Your administrative onboarding request has been forwarded to the Corner Director and U.S. Embassy American Spaces coordinator. You will receive an activation email at <strong>{email}</strong> upon clearance.
              </p>

              <button
                onClick={() => onNavigate('admin-login')}
                className="mt-4 px-6 py-2.5 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors"
              >
                Return to Admin Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-lg">
                  {error}
                </div>
              )}

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
                    placeholder="e.g. Sivathas"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
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
                    placeholder="e.g. Navaratnam"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>
              </div>

              {/* NIC & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    placeholder="e.g. 199512345678"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Requested Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  >
                    <option value="coordinator">Corner Coordinator</option>
                    <option value="moderator">Program Moderator</option>
                    <option value="staff">Operations Staff</option>
                    <option value="advisor">EducationUSA Advisor</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Residential / Office Address *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, City, Postal Code"
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                />
              </div>

              {/* Contact: Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="077XXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="076XXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Official / Personal Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin.name@acbatticaloa.org"
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs sm:text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{loading ? 'Submitting Registration...' : 'Submit Registration'}</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-[#444650]">
                  Already have an approved account?{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('admin-login')}
                    className="text-[#002868] font-bold hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
