import React, { useState } from 'react';
import {
  Download,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  LogIn,
  LogOut,
  Edit2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  CalendarCheck,
} from 'lucide-react';
import { AttendanceRecord, AttendanceStatus } from '../../types';

interface AttendanceManagementViewProps {
  attendanceRecords: AttendanceRecord[];
  onOpenManualEntry: () => void;
  onExportReport: () => void;
  onEditRecord: (record: AttendanceRecord) => void;
}

export const AttendanceManagementView: React.FC<AttendanceManagementViewProps> = ({
  attendanceRecords,
  onOpenManualEntry,
  onExportReport,
  onEditRecord,
}) => {
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredRecords = attendanceRecords.filter((rec) => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(search.toLowerCase()) ||
      rec.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesProgram = !programFilter || rec.program.toLowerCase().includes(programFilter.toLowerCase());
    const matchesStatus = !statusFilter || rec.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate = !dateFilter || rec.date.includes(dateFilter);
    return matchesSearch && matchesProgram && matchesStatus && matchesDate;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRecords.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRecords.map((r) => r.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'Present':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Present
          </span>
        );
      case 'Late':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Late
          </span>
        );
      case 'Absent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Absent
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Attendance Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage program attendance efficiently across all cohorts.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onExportReport}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs transition-colors"
          >
            <Download size={16} className="text-[#002868]" />
            <span>Export Report</span>
          </button>

          <button
            onClick={onOpenManualEntry}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-2xs transition-all"
          >
            <Plus size={16} />
            <span>+ Manual Entry</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider font-['Geist',sans-serif]">
              Total Sessions
            </span>
            <span className="p-2 bg-blue-50 text-[#002868] rounded-xl">
              <CalendarCheck size={18} />
            </span>
          </div>
          <div className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-2">
            1,248
          </div>
          <div className="text-xs text-gray-400 mt-2 font-medium">
            <span className="text-emerald-700 font-semibold">+12%</span> from last month
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider font-['Geist',sans-serif]">
              Today's Attendance
            </span>
            <span className="p-2 bg-blue-50 text-[#002868] rounded-xl">
              <UserCheck size={18} />
            </span>
          </div>
          <div className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-2">
            85%
          </div>
          <div className="text-xs text-gray-400 mt-2 font-medium">
            <span className="text-amber-600 font-semibold">-2%</span> from yesterday
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center text-gray-500 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider font-['Geist',sans-serif]">
              Present Students
            </span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={18} />
            </span>
          </div>
          <div className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-2 relative z-10">
            342
          </div>
          <div className="text-xs text-gray-500 mt-2 font-medium relative z-10">
            Across 12 active programs
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center text-gray-500 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-wider font-['Geist',sans-serif]">
              Absent Students
            </span>
            <span className="p-2 bg-red-50 text-red-600 rounded-xl">
              <XCircle size={18} />
            </span>
          </div>
          <div className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-2 relative z-10">
            45
          </div>
          <div className="text-xs text-red-600 mt-2 font-medium relative z-10">
            Requires follow-up
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {/* Filters Toolbar */}
        <div className="p-5 border-b border-gray-200/80 bg-gray-50/50 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Student Search */}
            <div className="relative w-full sm:w-64">
              <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student name or ID..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
              />
            </div>

            {/* Program Filter */}
            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">All Programs</option>
              <option value="English Access">English Access Microscholarship</option>
              <option value="STEM Workshop">STEM Workshop Series</option>
              <option value="Leadership Training">Leadership Training</option>
            </select>

            {/* Date Input */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20"
            />

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl py-2 px-3 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
            <span>Showing {filteredRecords.length} records</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredRecords.length}
                    onChange={toggleSelectAll}
                    className="rounded text-[#002868] border-gray-300 focus:ring-[#002868]"
                  />
                </th>
                <th className="p-4 font-semibold">Student</th>
                <th className="p-4 font-semibold">Program</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Time Log</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Remarks</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No attendance records match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(rec.id)}
                        onChange={() => toggleSelectRow(rec.id)}
                        className="rounded text-[#002868] border-gray-300 focus:ring-[#002868]"
                      />
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {rec.avatarUrl ? (
                          <img
                            src={rec.avatarUrl}
                            alt={rec.studentName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-[#002868] flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">
                            {rec.initials || rec.studentName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900 leading-tight">
                            {rec.studentName}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            ID: {rec.studentId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{rec.program}</div>
                      {rec.programCohort && (
                        <div className="text-[11px] text-gray-400">{rec.programCohort}</div>
                      )}
                    </td>

                    <td className="p-4 whitespace-nowrap text-gray-500 text-xs">
                      {rec.date}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5 text-xs">
                        {rec.timeIn ? (
                          <span className="flex items-center gap-1 text-gray-700">
                            <LogIn size={13} className="text-emerald-600" />
                            {rec.timeIn}
                          </span>
                        ) : (
                          <span className="text-gray-400">--:--</span>
                        )}
                        {rec.timeOut ? (
                          <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                            <LogOut size={13} className="text-gray-400" />
                            {rec.timeOut}
                          </span>
                        ) : null}
                      </div>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {getStatusBadge(rec.status)}
                    </td>

                    <td className="p-4 text-xs text-gray-500 max-w-[180px] truncate">
                      {rec.remarks || '-'}
                    </td>

                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onEditRecord(rec)}
                        className="text-gray-400 hover:text-[#002868] p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Edit Attendance"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-gray-200/80 bg-gray-50/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>Showing 1 to {filteredRecords.length} of {attendanceRecords.length} entries</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold"
            >
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-[#002868] text-white font-bold">1</button>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
