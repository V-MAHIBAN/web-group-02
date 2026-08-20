import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { AttendanceItem } from '../../types';

interface AttendanceViewProps {
  attendanceList: AttendanceItem[];
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendanceList,
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const totalSessions = 42;
  const attendanceRate = 92;

  // Filter logic
  const filtered = attendanceList.filter((item) => {
    if (statusFilter !== 'all' && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.programName.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportAttendanceCSV = () => {
    const headers = 'Date,Program Name,Status,Duration,Notes\n';
    const rows = attendanceList
      .map(
        (a) =>
          `"${a.date}","${a.programName}","${a.status}","${a.duration}","${a.notes || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Volunteer_Attendance_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Attendance Record
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Track your event check-ins, punctuality records, and verified shift participation.
          </p>
        </div>

        <button
          onClick={exportAttendanceCSV}
          className="px-4 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2 self-start sm:self-auto transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* 2 Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Sessions
            </span>
            <p className="text-4xl font-extrabold text-[#1F2937] tracking-tight mt-1">
              {totalSessions}
            </p>
            <p className="text-xs text-[#16A34A] font-semibold mt-1">+4 completed this month</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#002868] flex items-center justify-center">
            <Calendar className="w-7 h-7 text-[#002868]" />
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Overall Attendance
            </span>
            <p className="text-4xl font-extrabold text-[#16A34A] tracking-tight mt-1">
              {attendanceRate}%
            </p>
            <p className="text-xs text-slate-500 mt-1">Exemplary Standing (Top Tier)</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-green-50 text-[#16A34A] flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-[#16A34A]" />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-[#FFFFFF] rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Top Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-[#1F2937]">Recent History</h3>
            <p className="text-xs text-slate-500">Verified event log with supervisor check-ins</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#F8FAFC] border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1F2937]"
            >
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="excused">Excused</option>
              <option value="absent">Absent</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#002868] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-xs text-[#1F2937] focus:outline-none focus:border-[#002868]"
              />
            </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F8FAFC] text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Program / Activity</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Duration</th>
                <th className="py-3.5 px-5 text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                    No attendance records match your filter.
                  </td>
                </tr>
              ) : (
                paginated.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-[#1F2937] whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-[#002868]">
                      {item.programName}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      {item.status === 'Present' && (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-[#16A34A] border border-green-100 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Present
                        </span>
                      )}
                      {item.status === 'Excused' && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-slate-500" /> Excused
                        </span>
                      )}
                      {item.status === 'Absent' && (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-[#DC2626] border border-red-100 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-[#DC2626]" /> Absent
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-[#1F2937]">
                      {item.duration}
                    </td>
                    <td className="py-3.5 px-5 text-right text-xs text-slate-500 max-w-xs truncate">
                      {item.notes || '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {Math.min(filtered.length, (currentPage - 1) * itemsPerPage + 1)} to{' '}
            {Math.min(filtered.length, currentPage * itemsPerPage)} of {filtered.length} records
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#002868]" />
            </button>
            <span className="px-2 font-bold text-[#1F2937]">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-300 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-[#002868]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
