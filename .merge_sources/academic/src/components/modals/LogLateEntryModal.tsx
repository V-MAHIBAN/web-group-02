import React, { useState } from 'react';
import { Student } from '../../types';
import { DataService } from '../../services/api';
import { playSound } from '../../utils/sound';

interface LogLateEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  students: Student[];
}

export const LogLateEntryModal: React.FC<LogLateEntryModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  students,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.studentId || '');
  const [reason, setReason] = useState('Transport delay');
  const [customReason, setCustomReason] = useState('');
  const [minutesLate, setMinutesLate] = useState(15);
  const [selectedClass, setSelectedClass] = useState('Advanced Calculus 301');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = reason === 'Other' ? customReason || 'Late arrival (unspecified)' : reason;
    const res = DataService.logLateEntry(selectedStudentId, finalReason, selectedClass, minutesLate);

    if (res.success) {
      playSound('success');
      setStatusMessage(res.message);
      onSuccess();
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 1200);
    } else {
      playSound('alert');
      setStatusMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#002868] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#F59E0B] text-white rounded-lg">
              <span className="material-symbols-outlined text-[22px]">more_time</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]">Log Late Entry</h3>
              <p className="text-[12px] text-[#CED9FF]/80">Record student arriving after the academic bell</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
              Select Student
            </label>
            <select
              value={selectedStudentId}
              onChange={e => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-[14px] text-[#121C2A] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
            >
              {students.map(s => (
                <option key={s.id} value={s.studentId}>
                  {s.name} (ID: #{s.studentId}) — {s.gradeLevel || 'Student'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Class / Period
              </label>
              <select
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              >
                <option value="Advanced Calculus 301">Advanced Calculus 301</option>
                <option value="Modern Physics 405">Modern Physics 405</option>
                <option value="Literature 202">Literature 202</option>
                <option value="Thermodynamics 201">Thermodynamics 201</option>
                <option value="Organic Chemistry 101">Organic Chemistry 101</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Minutes Tardy
              </label>
              <input
                type="number"
                min={1}
                max={120}
                value={minutesLate}
                onChange={e => setMinutesLate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
              Reason for Tardiness
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-[14px] text-[#121C2A]"
            >
              <option value="Transport delay">Transport delay (Bus / Train / Traffic)</option>
              <option value="Medical appointment">Medical / Dental appointment (with pass)</option>
              <option value="Weather / Road condition">Severe weather / Road condition</option>
              <option value="Administrative meeting">Administrative / Counselor meeting</option>
              <option value="Family emergency">Family emergency</option>
              <option value="Other">Other reason...</option>
            </select>
          </div>

          {reason === 'Other' && (
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Specify Reason
              </label>
              <input
                type="text"
                value={customReason}
                onChange={e => setCustomReason(e.target.value)}
                placeholder="Enter explanation..."
                className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px]"
              />
            </div>
          )}

          {statusMessage && (
            <div className="p-3 bg-[#16A34A]/10 text-[#16A34A] rounded-lg text-[13px] font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              {statusMessage}
            </div>
          )}

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
              Save Late Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
