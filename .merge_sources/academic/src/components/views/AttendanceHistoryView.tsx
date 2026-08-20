import React, { useState, useMemo } from 'react';
import { AttendanceRecord, OverviewMetrics } from '../../types';
import { DataService } from '../../services/api';

interface AttendanceHistoryViewProps {
  records: AttendanceRecord[];
  metrics: OverviewMetrics;
  onOpenCheckIn: () => void;
}

export const AttendanceHistoryView: React.FC<AttendanceHistoryViewProps> = ({
  records,
  metrics,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Present' | 'Late' | 'Absent'>('All');
  const [classFilter, setClassFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive unique classes for filter
  const uniqueClasses = useMemo(() => {
    const set = new Set<string>();
    records.forEach(r => {
      if (r.class) set.add(r.class);
    });
    return Array.from(set);
  }, [records]);

  // Filter & Sort
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchSearch =
        r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.class.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchClass = classFilter === 'All' || r.class === classFilter;

      return matchSearch && matchStatus && matchClass;
    }).sort((a, b) => {
      if (sortOrder === 'newest') return b.timestamp - a.timestamp;
      if (sortOrder === 'oldest') return a.timestamp - b.timestamp;
      return a.studentName.localeCompare(b.studentName);
    });
  }, [records, searchTerm, statusFilter, classFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsPerPage));
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    DataService.exportAttendanceCSV(filteredRecords);
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#121C2A] tracking-tight leading-tight">
            Attendance History
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#5B4040]/80 mt-1">
            Review historical check-in data and export reports.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            id="filter-toggle-btn"
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-[#121C2A] font-semibold text-[14px] transition-colors ${
              statusFilter !== 'All' || classFilter !== 'All'
                ? 'border-[#1D4ED8] bg-[#EFF4FF] text-[#1D4ED8]'
                : 'border-[#CBD5E1] bg-white hover:bg-[#F8FAFC]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span>Filter {statusFilter !== 'All' || classFilter !== 'All' ? '(Active)' : ''}</span>
          </button>

          <button
            onClick={handleExportCSV}
            id="export-csv-btn"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#BF0A30] hover:bg-[#D7263D] active:scale-95 text-white rounded-lg font-semibold text-[14px] shadow-xs transition-all duration-150"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Popover Panel */}
      {isFilterOpen && (
        <div className="bg-white p-4 rounded-xl border border-[#CBD5E1] shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-150">
          <div>
            <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={e => {
                setStatusFilter(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 border border-[#CBD5E1] rounded-lg text-[13px] bg-[#F8FAFC]"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">
              Filter by Course / Class
            </label>
            <select
              value={classFilter}
              onChange={e => {
                setClassFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 border border-[#CBD5E1] rounded-lg text-[13px] bg-[#F8FAFC]"
            >
              <option value="All">All Courses</option>
              {uniqueClasses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                setStatusFilter('All');
                setClassFilter('All');
                setSearchTerm('');
              }}
              className="px-4 py-2 text-[13px] text-[#64748B] hover:text-[#121C2A] hover:bg-[#F1F5F9] rounded-lg font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Metrics Bento Grid (3 Column) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Avg Attendance */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-[#5B4040]">
            <span className="font-semibold text-[13px] uppercase tracking-wider">Avg Attendance</span>
            <span className="material-symbols-outlined text-[#284585] text-[22px]">trending_up</span>
          </div>
          <div className="text-[44px] md:text-[48px] font-bold text-[#121C2A] tracking-tight leading-none">
            {metrics.avgAttendanceRate}<span className="text-2xl text-[#5B4040]/70 font-normal">%</span>
          </div>
          <div className="text-[13px] text-[#5B4040]/80 mt-auto pt-2 border-t border-[#E2E8F0]">
            <span className="text-[#16A34A] font-semibold">+2.4%</span> vs last term
          </div>
        </div>

        {/* Metric 2: Total Present */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-[#5B4040]">
            <span className="font-semibold text-[13px] uppercase tracking-wider">Total Present</span>
            <span className="material-symbols-outlined text-[#16A34A] text-[22px]">check_circle</span>
          </div>
          <div className="text-[44px] md:text-[48px] font-bold text-[#121C2A] tracking-tight leading-none">
            {metrics.historicalTotalPresent.toLocaleString()}
          </div>
          <div className="text-[13px] text-[#5B4040]/80 mt-auto pt-2 border-t border-[#E2E8F0]">
            Across 12 active courses
          </div>
        </div>

        {/* Metric 3: Total Absent */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-[#5B4040]">
            <span className="font-semibold text-[13px] uppercase tracking-wider">Total Absent</span>
            <span className="material-symbols-outlined text-[#DC2626] text-[22px]">cancel</span>
          </div>
          <div className="text-[44px] md:text-[48px] font-bold text-[#121C2A] tracking-tight leading-none">
            {metrics.historicalTotalAbsent}
          </div>
          <div className="text-[13px] text-[#5B4040]/80 mt-auto pt-2 border-t border-[#E2E8F0]">
            <span className="text-[#DC2626] font-semibold">+{metrics.reviewNeededCount}</span> needing review
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col overflow-hidden">
        {/* Table Title & Sort Bar */}
        <div className="px-6 py-4 border-b-2 border-[#002868] flex flex-wrap justify-between items-center bg-white gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-[18px] font-bold text-[#121C2A]">Recent Records</h3>
            <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#EFF4FF] text-[#1D4ED8] font-bold">
              {filteredRecords.length} entries
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search table..."
                className="pl-8 pr-3 py-1 border border-[#CBD5E1] rounded-lg text-[13px] w-40 sm:w-52"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px]">
                search
              </span>
            </div>

            <button
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : prev === 'oldest' ? 'name' : 'newest')}
              className="text-[#1D4ED8] hover:text-[#1E40AF] transition-colors text-[14px] font-medium flex items-center gap-1 cursor-pointer"
            >
              <span>Sort: {sortOrder === 'newest' ? 'Date (Newest)' : sortOrder === 'oldest' ? 'Date (Oldest)' : 'Student Name'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#D9E3F6] border-b border-[#E2E8F0]">
                <th className="py-3 px-6 text-[14px] font-semibold text-[#5B4040]">Student Name</th>
                <th className="py-3 px-6 text-[14px] font-semibold text-[#5B4040]">ID</th>
                <th className="py-3 px-6 text-[14px] font-semibold text-[#5B4040]">Class</th>
                <th className="py-3 px-6 text-[14px] font-semibold text-[#5B4040]">Date &amp; Time</th>
                <th className="py-3 px-6 text-[14px] font-semibold text-[#5B4040] text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((r, idx) => {
                  const isZebra = idx % 2 === 1;
                  return (
                    <tr
                      key={r.id}
                      className={`border-b border-[#E2E8F0] hover:bg-[#E6EEFF] transition-colors ${
                        isZebra ? 'bg-[#F1F5F9]' : 'bg-white'
                      }`}
                    >
                      <td className="py-3 px-6 text-[#121C2A] font-medium flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${r.avatarColor || 'bg-[#415D9F] text-[#CED9FF]'} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                          {r.avatarInitials || r.studentName.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="truncate">{r.studentName}</span>
                      </td>
                      <td className="py-3 px-6 text-[#5B4040] font-mono text-[13px]">{r.studentId}</td>
                      <td className="py-3 px-6 text-[#121C2A]">{r.class}</td>
                      <td className="py-3 px-6 text-[#5B4040] text-[13px]">{r.dateTime}</td>
                      <td className="py-3 px-6 text-right">
                        {r.status === 'Present' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-[12px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                            Present
                          </span>
                        )}
                        {r.status === 'Late' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-[12px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                            Late
                          </span>
                        )}
                        {r.status === 'Absent' && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] text-[12px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                            Absent
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#64748B]">
                    No attendance records matching filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-4 bg-white rounded-b-xl">
          <span className="text-[14px] text-[#5B4040]">
            Showing <span className="font-semibold text-[#121C2A]">{filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
            <span className="font-semibold text-[#121C2A]">{Math.min(currentPage * itemsPerPage, filteredRecords.length)}</span> of{' '}
            <span className="font-semibold text-[#121C2A]">5,215</span> results
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] text-[#5B4040] hover:bg-[#F1F5F9] transition-colors disabled:opacity-40"
              aria-label="Previous Page"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[12px] font-semibold transition-colors ${
                currentPage === 1 ? 'bg-[#002868] text-white' : 'border border-[#E2E8F0] text-[#5B4040] hover:bg-[#F1F5F9]'
              }`}
            >
              1
            </button>

            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[12px] font-semibold transition-colors ${
                currentPage === 2 ? 'bg-[#002868] text-white' : 'border border-[#E2E8F0] text-[#5B4040] hover:bg-[#F1F5F9]'
              }`}
            >
              2
            </button>

            <button
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[12px] font-semibold transition-colors ${
                currentPage === 3 ? 'bg-[#002868] text-white' : 'border border-[#E2E8F0] text-[#5B4040] hover:bg-[#F1F5F9]'
              }`}
            >
              3
            </button>

            <span className="text-[#5B4040] px-1">...</span>

            <button
              onClick={() => setCurrentPage(104)}
              className={`w-8 h-8 flex items-center justify-center rounded text-[12px] font-semibold transition-colors ${
                currentPage === 104 ? 'bg-[#002868] text-white' : 'border border-[#E2E8F0] text-[#5B4040] hover:bg-[#F1F5F9]'
              }`}
            >
              104
            </button>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] text-[#5B4040] hover:bg-[#F1F5F9] transition-colors disabled:opacity-40"
              aria-label="Next Page"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
