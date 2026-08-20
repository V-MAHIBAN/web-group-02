import React from 'react';
import { OverviewMetrics, AttendanceRecord, SystemActivity } from '../../types';
import { DataService } from '../../services/api';

interface DailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: OverviewMetrics;
  records: AttendanceRecord[];
  activities: SystemActivity[];
}

export const DailyReportModal: React.FC<DailyReportModalProps> = ({
  isOpen,
  onClose,
  metrics,
  records,
  activities,
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    DataService.exportAttendanceCSV(records);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#002868] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <span className="material-symbols-outlined text-[22px]">summarize</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]">Daily Academic Attendance & Incident Report</h3>
              <p className="text-[12px] text-[#CED9FF]/80">{todayStr} • Academic Nexus Administration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#CED9FF] hover:text-white p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 print:p-0">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#EFF4FF] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Total Present</p>
              <p className="text-[24px] font-bold text-[#1D4ED8]">{metrics.totalPresent}</p>
              <p className="text-[11px] text-[#64748B]">of {metrics.totalEnrolled} enrolled</p>
            </div>
            <div className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Attendance Rate</p>
              <p className="text-[24px] font-bold text-[#16A34A]">{Math.round((metrics.totalPresent / metrics.totalEnrolled) * 100)}%</p>
              <p className="text-[11px] text-[#16A34A]">+2.4% vs benchmark</p>
            </div>
            <div className="p-3.5 bg-[#FFFBEB] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Late Arrivals</p>
              <p className="text-[24px] font-bold text-[#F59E0B]">{metrics.lateArrivals}</p>
              <p className="text-[11px] text-[#D97706]">Logged at gates</p>
            </div>
            <div className="p-3.5 bg-[#FFDAD6] border border-[#CBD5E1] rounded-lg text-center">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Security Alerts</p>
              <p className="text-[24px] font-bold text-[#BA1A1A]">{metrics.pendingAlerts}</p>
              <p className="text-[11px] text-[#BA1A1A]">Pending action</p>
            </div>
          </div>

          {/* Key Incidents / Recent Activity */}
          <div>
            <h4 className="font-bold text-[15px] text-[#121C2A] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#1D4ED8]">history</span>
              Session Incident & Event Log
            </h4>
            <div className="border border-[#E2E8F0] rounded-lg divide-y divide-[#E2E8F0]">
              {activities.map(act => (
                <div key={act.id} className="p-3 flex items-start justify-between gap-3 text-[13px]">
                  <div>
                    <span className={`font-semibold ${act.severity === 'high' ? 'text-[#BA1A1A]' : 'text-[#121C2A]'}`}>
                      {act.title}:
                    </span>{' '}
                    <span className="text-[#64748B]">{act.description}</span>
                  </div>
                  <span className="text-[11px] text-[#64748B] whitespace-nowrap">{act.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Attendance Roster Sample */}
          <div>
            <h4 className="font-bold text-[15px] text-[#121C2A] mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#1D4ED8]">fact_check</span>
              Verified Check-Ins ({records.length} records)
            </h4>
            <div className="border border-[#E2E8F0] rounded-lg overflow-hidden max-h-48 overflow-y-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-2 px-3 font-semibold text-[#64748B]">Student</th>
                    <th className="py-2 px-3 font-semibold text-[#64748B]">ID</th>
                    <th className="py-2 px-3 font-semibold text-[#64748B]">Course</th>
                    <th className="py-2 px-3 font-semibold text-[#64748B]">Time</th>
                    <th className="py-2 px-3 font-semibold text-[#64748B] text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {records.map(r => (
                    <tr key={r.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-2 px-3 font-medium text-[#121C2A]">{r.studentName}</td>
                      <td className="py-2 px-3 text-[#64748B]">{r.studentId}</td>
                      <td className="py-2 px-3 text-[#121C2A]">{r.class}</td>
                      <td className="py-2 px-3 text-[#64748B]">{r.dateTime}</td>
                      <td className="py-2 px-3 text-right font-medium">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                          r.status === 'Present' ? 'bg-[#16A34A]/10 text-[#16A34A]' :
                          r.status === 'Late' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' : 'bg-[#DC2626]/10 text-[#DC2626]'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F1F5F9] rounded-lg text-[13px] font-medium text-[#121C2A] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download CSV Data
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-[#1D4ED8] text-[#1D4ED8] hover:bg-[#EFF4FF] rounded-lg text-[13px] font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              Print Summary
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg text-[13px] font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
