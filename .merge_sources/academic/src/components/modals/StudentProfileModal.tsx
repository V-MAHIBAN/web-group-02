import React, { useState } from 'react';
import { Student, AttendanceRecord } from '../../types';
import { DataService } from '../../services/api';
import { playSound } from '../../utils/sound';

interface StudentProfileModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  attendanceHistory: AttendanceRecord[];
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  isOpen,
  onClose,
  onUpdate,
  attendanceHistory,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<Student['status']>(student?.status || 'Active');
  const [editedGPA, setEditedGPA] = useState(student?.gpa || 3.8);
  const [editedNotes, setEditedNotes] = useState(student?.notes || '');

  if (!isOpen || !student) return null;

  const studentRecords = attendanceHistory.filter(
    r => r.studentName.toLowerCase() === student.name.toLowerCase() ||
         r.studentId.replace('#', '') === student.studentId
  );

  const handleQuickCheckIn = () => {
    DataService.checkInStudent(student.studentId, 'Admin Desk Check-In');
    playSound('success');
    onUpdate();
  };

  const handleQuickMarkLate = () => {
    DataService.logLateEntry(student.studentId, 'Late check-in via Profile', student.enrolledCourse);
    playSound('alert');
    onUpdate();
  };

  const handleSaveEdits = () => {
    DataService.updateStudent(student.id, {
      status: editedStatus,
      gpa: Number(editedGPA),
      notes: editedNotes,
    });
    setIsEditing(false);
    onUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#002868] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {student.avatarUrl ? (
              <img
                src={student.avatarUrl}
                alt={student.name}
                className={`w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-md ${
                  student.status === 'Graduated' ? 'grayscale' : ''
                }`}
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#BF0A30] text-white font-bold flex items-center justify-center text-lg border-2 border-white/30 shadow-md">
                {student.name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[20px] text-white">{student.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                  student.status === 'Active' ? 'bg-[#16A34A] text-white' :
                  student.status === 'Absent' ? 'bg-[#F59E0B] text-white' : 'bg-gray-400 text-white'
                }`}>
                  {student.status}
                </span>
              </div>
              <p className="text-[13px] text-[#CED9FF]/90 font-mono mt-0.5">
                ID: #{student.studentId} • {student.gradeLevel || 'Enrolled Student'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#CED9FF] hover:text-white p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#EFF4FF] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Attendance Rate</p>
              <p className="text-[22px] font-bold text-[#1D4ED8]">{student.attendanceRate}%</p>
              <p className="text-[11px] text-[#16A34A] font-medium">Verified Presence</p>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Current GPA</p>
              <p className="text-[22px] font-bold text-[#121C2A]">{student.gpa.toFixed(1)}</p>
              <p className="text-[11px] text-[#64748B]">Cumulative Scale 4.0</p>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Total Logs</p>
              <p className="text-[22px] font-bold text-[#121C2A]">{studentRecords.length || 14}</p>
              <p className="text-[11px] text-[#64748B]">Recorded scans</p>
            </div>
          </div>

          {/* Academic Details */}
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-3">
            <h4 className="font-bold text-[14px] text-[#121C2A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#1D4ED8]">school</span>
              Academic Profile & Coursework
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div>
                <span className="text-[#64748B]">Major / Discipline:</span>
                <p className="font-medium text-[#121C2A]">{student.major || 'Computer Science & AI'}</p>
              </div>
              <div>
                <span className="text-[#64748B]">Primary Course Block:</span>
                <p className="font-medium text-[#121C2A]">{student.enrolledCourse || 'Advanced Calculus 301'}</p>
              </div>
              <div>
                <span className="text-[#64748B]">Academic Email:</span>
                <p className="font-medium text-[#1D4ED8]">{student.email}</p>
              </div>
              <div>
                <span className="text-[#64748B]">Enrolled Term:</span>
                <p className="font-medium text-[#121C2A]">{student.joinedDate || 'Fall Semester'}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact & Notes */}
          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-3">
            <h4 className="font-bold text-[14px] text-[#121C2A] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#BF0A30]">contact_emergency</span>
              Emergency Contact & Administration
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div>
                <span className="text-[#64748B]">Primary Contact:</span>
                <p className="font-medium text-[#121C2A]">{student.emergencyContact || 'Parent / Guardian'}</p>
              </div>
              <div>
                <span className="text-[#64748B]">Emergency Phone:</span>
                <p className="font-medium text-[#121C2A]">{student.emergencyPhone || '+1 (555) 234-5678'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#64748B]">Advisor Notes:</span>
                <p className="font-medium text-[#121C2A] mt-0.5">{student.notes || 'No administrative flags.'}</p>
              </div>
            </div>
          </div>

          {/* Inline Edit Form */}
          {isEditing && (
            <div className="p-4 bg-[#EFF4FF] border border-[#1D4ED8]/30 rounded-xl space-y-3">
              <h5 className="font-bold text-[13px] text-[#1D4ED8]">Update Student Record</h5>
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <label className="block font-semibold mb-1">Status</label>
                  <select
                    value={editedStatus}
                    onChange={e => setEditedStatus(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#CBD5E1] bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Absent">Absent</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">GPA</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={editedGPA}
                    onChange={e => setEditedGPA(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded border border-[#CBD5E1] bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold mb-1">Notes</label>
                  <input
                    type="text"
                    value={editedNotes}
                    onChange={e => setEditedNotes(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#CBD5E1] bg-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-xs text-[#64748B] hover:text-[#121C2A]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdits}
                  className="px-3 py-1 bg-[#1D4ED8] text-white rounded text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickCheckIn}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-[12px] font-semibold rounded-lg shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              Mark Present Now
            </button>
            <button
              onClick={handleQuickMarkLate}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[12px] font-semibold rounded-lg shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">more_time</span>
              Mark Late
            </button>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3.5 py-1.5 border border-[#CBD5E1] bg-white hover:bg-[#EFF4FF] text-[#121C2A] text-[13px] font-medium rounded-lg transition-colors"
              >
                Edit Record
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#002868] text-white text-[13px] font-semibold rounded-lg hover:bg-[#001D4D] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
