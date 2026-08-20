import React, { useState } from 'react';
import { DataService } from '../../services/api';
import { playSound } from '../../utils/sound';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const NewStudentModal: React.FC<NewStudentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [gradeLevel, setGradeLevel] = useState('Freshman');
  const [major, setMajor] = useState('Computer Science');
  const [enrolledCourse, setEnrolledCourse] = useState('Advanced Calculus 301');
  const [gpa, setGpa] = useState(3.8);
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !studentId.trim()) return;

    DataService.addStudent({
      studentId: studentId.replace(/^#/, ''),
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@academicnexus.edu`,
      status: 'Active',
      attendanceRate: 100,
      gpa: Number(gpa) || 4.0,
      gradeLevel,
      major,
      enrolledCourse,
      emergencyContact: emergencyContact || 'Guardian on file',
      emergencyPhone: emergencyPhone || '+1 (555) 000-0000',
      notes: notes || 'New student registration.',
      joinedDate: 'Current Term',
    });

    playSound('success');
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#002868] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#BF0A30] text-white rounded-lg">
              <span className="material-symbols-outlined text-[22px]">person_add</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]">Register New Student</h3>
              <p className="text-[12px] text-[#CED9FF]/80">Add student profile to Academic Nexus directory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#CED9FF] hover:text-white p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Jessica Taylor"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Student ID *
              </label>
              <input
                type="text"
                required
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="e.g. 1009490"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Academic Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="j.taylor@academicnexus.edu"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Grade / Standing
              </label>
              <select
                value={gradeLevel}
                onChange={e => setGradeLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate / Research">Graduate / Research</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Primary Course / Class
              </label>
              <input
                type="text"
                value={enrolledCourse}
                onChange={e => setEnrolledCourse(e.target.value)}
                placeholder="e.g. Modern Physics 405"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Current GPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={gpa}
                onChange={e => setGpa(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
              Major / Academic Department
            </label>
            <input
              type="text"
              value={major}
              onChange={e => setMajor(e.target.value)}
              placeholder="e.g. Biomedical Engineering"
              className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Emergency Contact Name
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                placeholder="Parent / Guardian"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                Emergency Phone
              </label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={e => setEmergencyPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
              Administrative Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Scholarships, extracurriculars, or special accommodations..."
              className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
            />
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-[#E2E8F0] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#64748B] hover:text-[#121C2A] hover:bg-[#E2E8F0]/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg font-semibold text-[14px] shadow-xs transition-colors"
            >
              Create Student Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
