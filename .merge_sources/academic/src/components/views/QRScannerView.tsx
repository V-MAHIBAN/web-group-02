import React, { useState, useEffect } from 'react';
import { Student, AttendanceRecord } from '../../types';
import { DataService } from '../../services/api';
import { playSound } from '../../utils/sound';

interface QRScannerViewProps {
  students: Student[];
  onAttendanceUpdated: () => void;
  onSelectStudent: (student: Student) => void;
}

export const QRScannerView: React.FC<QRScannerViewProps> = ({
  students,
  onAttendanceUpdated,
  onSelectStudent,
}) => {
  const [selectedGate, setSelectedGate] = useState('Main Entrance');
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(true);
  const [lastScanResult, setLastScanResult] = useState<{
    success: boolean;
    student?: Student;
    message: string;
  } | null>(null);
  const [recentScans, setRecentScans] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Load initial scans
    const records = DataService.getAttendanceRecords().slice(0, 5);
    setRecentScans(records);
  }, []);

  const handleTriggerScan = (codeToScan: string) => {
    playSound('scanner');
    setTimeout(() => {
      const res = DataService.checkInStudent(codeToScan, selectedGate);
      if (res.success && res.student) {
        playSound('success');
        setLastScanResult({
          success: true,
          student: res.student,
          message: `${res.student.name} (ID: #${res.student.studentId}) successfully checked in.`,
        });
      } else {
        playSound('alert');
        setLastScanResult({
          success: false,
          message: res.message,
        });
      }
      onAttendanceUpdated();
      setRecentScans(DataService.getAttendanceRecords().slice(0, 6));
    }, 400);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleTriggerScan(manualCode);
    setManualCode('');
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#121C2A] tracking-tight leading-tight">
            Academic QR &amp; Barcode Scanner
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#5B4040]/80 mt-1">
            Real-time student card reader, gate turnstile checkpoint, and attendance verifier.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Gate Station:</label>
          <select
            value={selectedGate}
            onChange={e => setSelectedGate(e.target.value)}
            className="px-3.5 py-1.5 border border-[#CBD5E1] rounded-lg text-[13px] bg-white font-medium text-[#121C2A]"
          >
            <option value="Main Entrance">Main Entrance (Gate A)</option>
            <option value="Library Entrance">Library Entrance (Gate B)</option>
            <option value="Science Wing Gate 3">Science Wing Gate 3</option>
            <option value="Arts & Humanities Hall">Arts & Humanities Hall</option>
            <option value="East Athletic Complex">East Athletic Complex</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Viewfinder Column */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping"></span>
              <span className="text-[13px] font-bold text-[#121C2A]">Hardware Scanner Active</span>
            </div>
            <button
              onClick={() => setIsScanning(!isScanning)}
              className="text-xs text-[#1D4ED8] font-semibold hover:underline"
            >
              {isScanning ? 'Pause Optical Feed' : 'Resume Scanner'}
            </button>
          </div>

          {/* Interactive Scanner Viewport */}
          <div className="relative w-full max-w-md aspect-square bg-[#001946] rounded-2xl overflow-hidden border-4 border-[#002868] shadow-inner flex flex-col items-center justify-center p-6">
            {/* Corner Targeting Guides */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#FFDAD9] rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#FFDAD9] rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#FFDAD9] rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#FFDAD9] rounded-br-lg"></div>

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#BF0A30] to-transparent shadow-[0_0_15px_#BF0A30] animate-bounce top-1/3"></div>
            )}

            {/* Centered QR Graphic */}
            <div className="w-44 h-44 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex flex-col items-center justify-center p-4 text-center text-white">
              <span className="material-symbols-outlined text-[64px] text-white/90">
                qr_code_2
              </span>
              <p className="text-[11px] text-[#CED9FF] uppercase tracking-wider font-semibold mt-1">
                Hold Student ID to Lens
              </p>
            </div>

            <p className="text-white/70 text-[12px] mt-4 font-mono">
              Station: {selectedGate}
            </p>
          </div>

          {/* Manual Input Bar */}
          <form onSubmit={handleManualSubmit} className="w-full max-w-md mt-6 flex gap-2">
            <input
              type="text"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              placeholder="Or type Student ID barcode..."
              className="flex-1 px-4 py-2.5 border border-[#CBD5E1] rounded-lg text-[14px] font-mono focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#002868] hover:bg-[#001D4D] text-white rounded-lg font-semibold text-[14px] shadow-xs transition-colors"
            >
              Scan
            </button>
          </form>

          {/* Demo Quick-Scan Simulation Badges */}
          <div className="w-full max-w-md mt-4">
            <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
              Test Student Barcode Simulator:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {students.slice(0, 6).map(s => (
                <button
                  key={s.id}
                  onClick={() => handleTriggerScan(s.studentId)}
                  className="p-2 bg-[#F1F5F9] hover:bg-[#EFF4FF] hover:border-[#1D4ED8] border border-[#E2E8F0] rounded-lg text-left transition-colors"
                >
                  <p className="text-[12px] font-bold text-[#121C2A] truncate">{s.name}</p>
                  <p className="text-[11px] font-mono text-[#64748B]">#{s.studentId}</p>
                </button>
              ))}
              <button
                onClick={() => handleTriggerScan('UNKNOWN-999')}
                className="p-2 bg-[#FFDAD6] hover:bg-[#FFDAD6]/80 border border-[#BA1A1A]/30 rounded-lg text-left transition-colors"
              >
                <p className="text-[12px] font-bold text-[#BA1A1A]">Test Rogue ID</p>
                <p className="text-[11px] font-mono text-[#BA1A1A]/80">#UNKNOWN-999</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Scan Result & Realtime Verification Log */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Result Card */}
          <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs">
            <h3 className="text-[16px] font-bold text-[#121C2A] mb-3">Verification Feedback</h3>
            {lastScanResult ? (
              <div className={`p-4 rounded-xl border ${
                lastScanResult.success ? 'bg-[#16A34A]/10 border-[#16A34A]/30' : 'bg-[#FFDAD6] border-[#BA1A1A]/30'
              }`}>
                <div className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-[24px] ${
                    lastScanResult.success ? 'text-[#16A34A]' : 'text-[#BA1A1A]'
                  }`}>
                    {lastScanResult.success ? 'check_circle' : 'error'}
                  </span>
                  <div className="flex-1">
                    <p className={`font-bold text-[14px] ${
                      lastScanResult.success ? 'text-[#121C2A]' : 'text-[#BA1A1A]'
                    }`}>
                      {lastScanResult.success ? 'Access Authorized' : 'Security Alert Triggered'}
                    </p>
                    <p className="text-[13px] text-[#5B4040] mt-1">{lastScanResult.message}</p>

                    {lastScanResult.student && (
                      <div className="mt-3 pt-3 border-t border-[#16A34A]/20 flex items-center justify-between">
                        <span className="text-[12px] text-[#64748B]">Current GPA: {lastScanResult.student.gpa.toFixed(1)}</span>
                        <button
                          onClick={() => lastScanResult.student && onSelectStudent(lastScanResult.student)}
                          className="text-[12px] font-bold text-[#1D4ED8] hover:underline"
                        >
                          View Full Dossier →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#F8FAFC] rounded-xl border border-dashed border-[#CBD5E1] text-[#64748B]">
                <span className="material-symbols-outlined text-[36px] text-[#64748B]/60">badge</span>
                <p className="text-[13px] font-medium mt-1">Ready for next badge or QR scan</p>
              </div>
            )}
          </div>

          {/* Recent Scans Feed */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-bold text-[#121C2A]">Station Check-In Stream</h3>
            </div>
            <div className="divide-y divide-[#E2E8F0] max-h-72 overflow-y-auto">
              {recentScans.map(scan => (
                <div key={scan.id} className="p-3.5 hover:bg-[#F8FAFC] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {scan.avatarInitials || scan.studentName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#121C2A]">{scan.studentName}</p>
                      <p className="text-[11px] text-[#64748B]">{scan.studentId} • {scan.roomOrGate || selectedGate}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    scan.status === 'Present' ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'
                  }`}>
                    {scan.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
