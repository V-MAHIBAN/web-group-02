import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  ShieldCheck,
  Bell,
  Lock,
  Plus,
  X,
  Camera,
  CheckCircle2,
  Sparkles,
  Save
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile } from '../../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);
  const [interests, setInterests] = useState<string[]>(user.interests);
  const [newInterest, setNewInterest] = useState('');
  const [showAddInterest, setShowAddInterest] = useState(false);
  const [availability, setAvailability] = useState(user.availability);
  const [emailNotifications, setEmailNotifications] = useState(user.notifications.email);
  const [smsAlerts, setSmsAlerts] = useState(user.notifications.sms);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      phone,
      location,
      interests,
      availability,
      notifications: {
        email: emailNotifications,
        sms: smsAlerts,
      },
    });

    setSavedSuccess(true);
    try {
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleRemoveInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
      setShowAddInterest(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
            My Account
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your personal information, volunteer preferences, and notification settings.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>{savedSuccess ? 'Saved Successfully!' : 'Save All Changes'}</span>
        </button>
      </div>

      {/* Main Grid: Left Profile Card (4 cols) & Right Settings Form (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFFFF] rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-center">
            {/* Header Pattern */}
            <div className="h-28 bg-[#002868] relative">
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '12px 12px',
                }}
              ></div>
            </div>

            {/* Avatar */}
            <div className="relative -mt-14 px-6 pb-6">
              <div className="relative inline-block">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md mx-auto"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 p-1.5 bg-[#BF0A30] text-white rounded-full hover:bg-[#D7263D] shadow-sm transition-transform active:scale-90 cursor-pointer"
                  title="Change avatar photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#1F2937] mt-3">
                {name}
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                {user.role}
              </p>

              {/* Gold Volunteer Tier Box */}
              <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-left">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F59E0B]" />
                  <div>
                    <h4 className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">
                      {user.tier}
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Top 10% of contributors this month
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Impact Box */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-3 text-left">
                  Your Impact
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                    <Clock className="w-5 h-5 text-[#002868] mb-1" />
                    <span className="text-xl font-extrabold text-[#002868]">
                      {user.hoursTotal}
                    </span>
                    <span className="text-[11px] text-slate-500">Hours Contributed</span>
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                    <Award className="w-5 h-5 text-[#16A34A] mb-1" />
                    <span className="text-xl font-extrabold text-[#16A34A]">
                      {user.eventsTotal}
                    </span>
                    <span className="text-[11px] text-slate-500">Events Attended</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Form Sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Personal Information */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <User className="w-5 h-5 text-[#002868]" />
              <h3 className="font-bold text-base text-[#1F2937]">
                Personal Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                  Location (City, State)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Volunteer Preferences */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Sparkles className="w-5 h-5 text-[#002868]" />
              <h3 className="font-bold text-base text-[#1F2937]">
                Volunteer Preferences
              </h3>
            </div>

            {/* Areas of Interest */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Areas of Interest
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-blue-50 text-[#002868] text-xs font-bold px-3 py-1 rounded-full border border-blue-200"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(item)}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {showAddInterest ? (
                  <form onSubmit={handleAddInterest} className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Interest name..."
                      className="px-2.5 py-1 text-xs border border-[#002868] rounded-full focus:outline-none bg-white"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 text-xs font-bold bg-[#BF0A30] text-white rounded-full cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddInterest(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddInterest(true)}
                    className="inline-flex items-center gap-1 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full border border-dashed border-slate-300 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-[#002868]" /> Add Interest
                  </button>
                )}
              </div>
            </div>

            {/* Typical Availability */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Typical Availability
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={availability.weekdaysAm}
                    onChange={(e) =>
                      setAvailability({ ...availability, weekdaysAm: e.target.checked })
                    }
                    className="rounded text-[#002868] focus:ring-[#002868] w-4 h-4"
                  />
                  <span className="text-xs font-medium text-[#1F2937]">
                    Weekdays (Morning)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={availability.weekdaysPm}
                    onChange={(e) =>
                      setAvailability({ ...availability, weekdaysPm: e.target.checked })
                    }
                    className="rounded text-[#002868] focus:ring-[#002868] w-4 h-4"
                  />
                  <span className="text-xs font-medium text-[#1F2937]">
                    Weekdays (Evening)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={availability.weekends}
                    onChange={(e) =>
                      setAvailability({ ...availability, weekends: e.target.checked })
                    }
                    className="rounded text-[#002868] focus:ring-[#002868] w-4 h-4"
                  />
                  <span className="text-xs font-medium text-[#1F2937]">
                    Weekends (Sat & Sun)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-[#F8FAFC] cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    checked={availability.flexible}
                    onChange={(e) =>
                      setAvailability({ ...availability, flexible: e.target.checked })
                    }
                    className="rounded text-[#002868] focus:ring-[#002868] w-4 h-4"
                  />
                  <span className="text-xs font-medium text-[#1F2937]">
                    Flexible Schedule
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Security & Notifications */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <ShieldCheck className="w-5 h-5 text-[#002868]" />
              <h3 className="font-bold text-base text-[#1F2937]">
                Security & Notifications
              </h3>
            </div>

            {/* Change Password Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#F8FAFC] rounded-xl border border-slate-200 gap-3">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-slate-500" />
                <div>
                  <h4 className="text-xs font-bold text-[#1F2937]">Account Password</h4>
                  <p className="text-[11px] text-slate-500">Last updated 3 months ago</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(true)}
                className="px-3 py-1.5 text-xs font-bold text-[#002868] hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                Change Password
              </button>
            </div>

            {/* Notification Switches */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1F2937]">Email Notifications</h4>
                  <p className="text-[11px] text-slate-500">
                    Receive shift reminders, cohort announcements, and monthly impact reports.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    emailNotifications ? 'bg-[#16A34A]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <h4 className="text-xs font-bold text-[#1F2937]">SMS Alerts</h4>
                  <p className="text-[11px] text-slate-500">
                    Receive real-time text alerts for emergency volunteer callouts and schedule adjustments.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    smsAlerts ? 'bg-[#16A34A]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      smsAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-[#1F2937]">Change Password</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-slate-300 rounded-lg bg-[#F8FAFC] text-[#1F2937] focus:border-[#002868] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-slate-300 rounded-lg bg-[#F8FAFC] text-[#1F2937] focus:border-[#002868] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  alert('Password updated successfully!');
                }}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#BF0A30] hover:bg-[#D7263D] rounded-lg cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
