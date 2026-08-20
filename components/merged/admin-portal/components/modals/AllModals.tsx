import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  Image as ImageIcon,
  Save,
  Trash2,
  FileText,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import {
  VolunteerApplication,
  VolunteerAppStatus,
  Program,
  User,
  AttendanceRecord,
  NewsArticle,
  GalleryAlbum,
  Announcement,
} from '../../types';

/* -------------------------------------------------------------
 * 1. VOLUNTEER REVIEW MODAL
 * ------------------------------------------------------------- */
interface VolunteerReviewModalProps {
  application: VolunteerApplication | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: VolunteerAppStatus) => void;
}

export const VolunteerReviewModal: React.FC<VolunteerReviewModalProps> = ({
  application,
  onClose,
  onUpdateStatus,
}) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8 animate-in zoom-in-95 duration-150">
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl ${application.colorClass} flex items-center justify-center font-bold text-sm shadow-xs`}
            >
              {application.initials}
            </div>
            <div>
              <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-gray-900 leading-tight">
                {application.applicantName}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Applied on {application.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 font-semibold block">Target Program:</span>
              <span className="font-bold text-gray-900 text-sm mt-0.5 block">
                {application.appliedForProgram}
              </span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block">Current Status:</span>
              <span className="font-bold text-[#002868] text-sm mt-0.5 block">
                {application.status}
              </span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block">Email:</span>
              <span className="text-gray-700 mt-0.5 block">{application.email}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block">Phone:</span>
              <span className="text-gray-700 mt-0.5 block">{application.phone}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Applicant Motivation & Background
            </h4>
            <div className="bg-blue-50/40 p-4 rounded-2xl border border-blue-100 text-gray-800 text-sm leading-relaxed">
              {application.motivation ||
                'Passionate educator and technology enthusiast eager to support community learning and youth digital literacy at American Corner Batticaloa.'}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Key Skills & Focus Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {(application.skills || ['STEM Education', 'Community Organizing', 'English Tutoring', 'Digital Media']).map(
                (skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                onUpdateStatus(application.id, 'Approved');
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 size={15} /> Approve
            </button>
            <button
              onClick={() => {
                onUpdateStatus(application.id, 'Under Review');
                onClose();
              }}
              className="px-4 py-2 bg-[#002868] hover:bg-[#001c4a] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Clock size={15} /> Under Review
            </button>
            <button
              onClick={() => {
                onUpdateStatus(application.id, 'Rejected');
                onClose();
              }}
              className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <AlertCircle size={15} /> Reject
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. PROGRAM CREATE / EDIT MODAL
 * ------------------------------------------------------------- */
interface ProgramModalProps {
  isOpen: boolean;
  program: Program | null;
  onClose: () => void;
  onSave: (prog: Partial<Program>) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  isOpen,
  program,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(program?.title || '');
  const [category, setCategory] = useState(program?.category || 'Technology');
  const [status, setStatus] = useState(program?.status || 'Enrolling');
  const [capacity, setCapacity] = useState(program?.capacity || 30);
  const [enrolledCount, setEnrolledCount] = useState(program?.enrolledCount || 0);
  const [location, setLocation] = useState(program?.location || 'Main Corner Room');
  const [dateRange, setDateRange] = useState(program?.dateRange || 'Nov 01 - Nov 15');
  const [imageUrl, setImageUrl] = useState(
    program?.imageUrl ||
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: program?.id,
      title,
      category,
      status: status as any,
      capacity: Number(capacity),
      enrolledCount: Number(enrolledCount),
      location,
      dateRange,
      imageUrl,
      isPast: status === 'Completed',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-gray-900">
            {program ? 'Edit Program Details' : 'Create New Program'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Program Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. AI & Robotics Bootcamp 2025"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#002868]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
              >
                <option>Technology</option>
                <option>English Access</option>
                <option>Youth Leadership</option>
                <option>Makerspace</option>
                <option>Culture & Arts</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Enrollment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="Enrolling">Enrolling (Green)</option>
                <option value="Full">Full (Amber)</option>
                <option value="Completed">Completed (Gray)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Date Range / Schedule
              </label>
              <input
                type="text"
                required
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="e.g. Oct 15 - Oct 17"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Location / Room
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Corner Room"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Enrolled Count
              </label>
              <input
                type="number"
                value={enrolledCount}
                onChange={(e) => setEnrolledCount(Number(e.target.value))}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Maximum Capacity
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Cover Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-xl font-bold shadow-xs flex items-center gap-2"
            >
              <Save size={16} />
              <span>Save Program</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. USER ADD / EDIT MODAL
 * ------------------------------------------------------------- */
interface UserModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  user,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+94 77 123 4567');
  const [role, setRole] = useState(user?.role || 'Staff');
  const [status, setStatus] = useState(user?.status || 'Active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: user?.id,
      name,
      email,
      phone,
      role: role as any,
      status: status as any,
      initials: name.slice(0, 2).toUpperCase(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-gray-900">
            {user ? 'Edit User Credentials' : 'Add New Organization User'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priyanthi Wickramasinghe"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. p.wickrama@acbatticaloa.org"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Phone Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Assigned Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="Admin">Admin (Full Access)</option>
                <option value="Staff">Staff</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Account Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#002868] hover:bg-[#001c4a] text-white rounded-xl font-bold shadow-xs flex items-center gap-2"
            >
              <Save size={16} />
              <span>Save User</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. ATTENDANCE MANUAL ENTRY MODAL
 * ------------------------------------------------------------- */
interface AttendanceModalProps {
  isOpen: boolean;
  record: AttendanceRecord | null;
  onClose: () => void;
  onSave: (record: Partial<AttendanceRecord>) => void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  record,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState(record?.studentName || '');
  const [studentId, setStudentId] = useState(record?.studentId || 'ST-2024-001');
  const [program, setProgram] = useState(record?.program || 'English Access Microscholarship');
  const [status, setStatus] = useState(record?.status || 'Present');
  const [date, setDate] = useState(record?.date || 'Oct 24, 2024');
  const [timeIn, setTimeIn] = useState(record?.timeIn || '09:00 AM');
  const [timeOut, setTimeOut] = useState(record?.timeOut || '12:00 PM');
  const [remarks, setRemarks] = useState(record?.remarks || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: record?.id,
      studentName,
      studentId,
      program,
      status: status as any,
      date,
      timeIn,
      timeOut,
      remarks,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-gray-900">
            {record ? 'Edit Attendance Entry' : 'Manual Attendance Entry'}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-full text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-5 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Student Name
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Student ID
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Time In
              </label>
              <input
                type="text"
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
                Time Out
              </label>
              <input
                type="text"
                value={timeOut}
                onChange={(e) => setTimeOut(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1 text-[11px]">
              Remarks / Justification
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Transport delay informed"
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-xl font-bold shadow-xs flex items-center gap-2"
            >
              <Save size={16} />
              <span>Save Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 5. SUPPORT & HELP CENTER MODAL
 * ------------------------------------------------------------- */
interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 p-6 sm:p-8">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-[#002868] rounded-xl">
              <HelpCircle size={22} />
            </div>
            <div>
              <h3 className="font-['Poppins',sans-serif] text-xl font-bold text-gray-900">
                Help & Operations Support
              </h3>
              <p className="text-xs text-gray-400">American Corner Batticaloa Portal Manual</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="py-5 space-y-4 text-xs sm:text-sm text-gray-600">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-1">Architecture & Cloud Backend</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              This system communicates with a high-performance Python FastAPI service layer and PostgreSQL (Supabase) for realtime records synchronization and institutional access control.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              Direct Contact & Hotlines
            </h4>
            <p className="flex items-center gap-2 text-xs text-gray-700">
              <Mail size={14} className="text-[#002868]" />
              <span>Director Office: info@acbatticaloa.org</span>
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-700">
              <Phone size={14} className="text-[#002868]" />
              <span>Corner Desk: +94 65 222 6789</span>
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#002868] text-white rounded-xl font-bold text-xs shadow-xs"
          >
            Close Help Center
          </button>
        </div>
      </div>
    </div>
  );
};
