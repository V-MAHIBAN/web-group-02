import React, { useState } from 'react';
import { Student } from '../../types';
import { DataService } from '../../services/api';
import { playSound } from '../../utils/sound';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  students: Student[];
}

export const CheckInModal: React.FC<CheckInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  students,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [selectedGate, setSelectedGate] = useState('Main Entrance');
  const [lastCheckedStudent, setLastCheckedStudent] = useState<Student | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setIsProcessing(true);
    setErrorMsg(null);

    const res = DataService.checkInStudent(inputVal, selectedGate);
    if (res.success && res.student) {
      playSound('success');
      setLastCheckedStudent(res.student);
      setInputVal('');
      onSuccess();
    } else {
      playSound('alert');
      setErrorMsg(res.message);
      setLastCheckedStudent(null);
      onSuccess(); // Refresh activities so security alert appears
    }
    setIsProcessing(false);
  };

  const handleQuickStudentSelect = (student: Student) => {
    setInputVal(student.studentId);
    const res = DataService.checkInStudent(student.studentId, selectedGate);
    if (res.success && res.student) {
      playSound('success');
      setLastCheckedStudent(res.student);
      setErrorMsg(null);
      onSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#002868] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#BF0A30] rounded-lg">
              <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]">Student Check-In Terminal</h3>
              <p className="text-[12px] text-[#CED9FF]/80">Instant barcode, QR, or Student ID verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#CED9FF] hover:text-white p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleCheckInSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Check-in Gate / Station
              </label>
              <select
                value={selectedGate}
                onChange={e => setSelectedGate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-[14px] text-[#121C2A] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
              >
                <option value="Main Entrance">Main Entrance (Gate A)</option>
                <option value="Library Entrance">Library Entrance (Gate B)</option>
                <option value="Science Wing Gate 3">Science Wing Gate 3</option>
                <option value="Arts & Humanities Hall">Arts & Humanities Hall</option>
                <option value="East Athletic Complex">East Athletic Complex</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Scan QR / Enter Student ID or Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                  qr_code_scanner
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder="e.g. 1009483, 10924, or Marcus"
                  autoFocus
                  className="w-full pl-10 pr-24 py-2.5 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A] focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 font-mono"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !inputVal.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-[#BF0A30] hover:bg-[#D7263D] disabled:opacity-50 text-white rounded font-medium text-[13px] transition-colors flex items-center gap-1"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>

          {/* Quick Roster Buttons */}
          <div>
            <p className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider mb-2">
              Quick Select From Roster:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {students.slice(0, 5).map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleQuickStudentSelect(s)}
                  className="px-2.5 py-1 rounded bg-[#F1F5F9] hover:bg-[#EFF4FF] hover:text-[#1D4ED8] text-[12px] text-[#121C2A] font-medium border border-[#E2E8F0] transition-colors"
                >
                  #{s.studentId} {s.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Result Alert / Confirmation */}
          {lastCheckedStudent && (
            <div className="p-4 bg-[#16A34A]/10 border border-[#16A34A]/30 rounded-xl flex items-center gap-4 animate-in fade-in duration-200">
              {lastCheckedStudent.avatarUrl ? (
                <img
                  src={lastCheckedStudent.avatarUrl}
                  alt={lastCheckedStudent.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#16A34A]/40"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white font-bold flex items-center justify-center text-sm">
                  {lastCheckedStudent.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#16A34A] text-[18px]">check_circle</span>
                  <p className="font-bold text-[14px] text-[#121C2A]">{lastCheckedStudent.name}</p>
                </div>
                <p className="text-[12px] text-[#64748B]">
                  ID: #{lastCheckedStudent.studentId} • {lastCheckedStudent.enrolledCourse}
                </p>
                <p className="text-[11px] text-[#16A34A] font-semibold mt-0.5">
                  Checked in at {selectedGate} • Status: Present
                </p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 bg-[#FFDAD6] border border-[#BA1A1A]/30 rounded-xl text-[#BA1A1A] flex items-start gap-2.5 text-[13px] animate-in fade-in duration-200">
              <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">error</span>
              <div className="flex-1">
                <p className="font-bold">Check-In Verification Failed</p>
                <p className="text-[12px] mt-0.5">{errorMsg}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[14px] font-medium text-[#64748B] hover:text-[#121C2A] hover:bg-[#E2E8F0]/50 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
