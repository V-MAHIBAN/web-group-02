import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Award,
  Download,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { HourEntry } from '../../types';

interface HoursViewProps {
  hoursHistory: HourEntry[];
  onOpenLogHours: () => void;
}

export const HoursView: React.FC<HoursViewProps> = ({
  hoursHistory,
  onOpenLogHours,
}) => {
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Six-month trend data
  const monthlyTrend = [
    { month: 'Aug', hours: 24, heightPercent: 57 },
    { month: 'Sep', hours: 32, heightPercent: 76 },
    { month: 'Oct', hours: 18, heightPercent: 43 },
    { month: 'Nov', hours: 28, heightPercent: 66 },
    { month: 'Dec', hours: 42, heightPercent: 100 },
    { month: 'Jan', hours: 38, heightPercent: 90 },
  ];

  // Calculations
  const lifetimeHours = hoursHistory.reduce((acc, curr) => acc + curr.hours, 0) + 290; // mock total around 342
  const thisYearHours = 124;
  const thisMonthHours = 18;
  const targetMilestone = 350;
  const remainingHours = Math.max(0, targetMilestone - lifetimeHours);
  const milestonePercent = Math.min(100, Math.round((lifetimeHours / targetMilestone) * 100));

  // Filter
  const filteredHistory = hoursHistory.filter((item) => {
    if (projectFilter !== 'all' && !item.project.toLowerCase().includes(projectFilter.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.project.toLowerCase().includes(q) ||
        item.date.toLowerCase().includes(q) ||
        (item.notes && item.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage) || 1;
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportCSV = () => {
    const headers = 'Date,Project,Hours,Status,Category,Notes\n';
    const rows = hoursHistory
      .map(
        (h) =>
          `"${h.date}","${h.project}",${h.hours},"${h.status}","${h.category}","${h.notes || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Volunteer_Hours_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Hours Tracking
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            View your logged volunteer hours, monthly trends, and milestone progress.
          </p>
        </div>
        <button
          onClick={onOpenLogHours}
          className="px-4 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Hours</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Lifetime Hours
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#002868] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#002868]" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
            342
          </p>
          <p className="text-xs text-slate-500 mt-1">Total verified service hours</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hours This Year
            </span>
            <div className="w-9 h-9 rounded-lg bg-green-50 text-[#16A34A] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#16A34A]" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
            {thisYearHours}
          </p>
          <p className="text-xs text-[#16A34A] font-medium mt-1">2024 annual total</p>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Hours This Month
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
            {thisMonthHours}
          </p>
          <p className="text-xs text-slate-500 mt-1">October logged shifts</p>
        </div>
      </div>

      {/* Grid: 6-Month Trend Chart (8 cols) & Next Milestone (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trend Bar Chart */}
        <div className="lg:col-span-8 bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-[#1F2937]">
                Trend: Last 6 Months
              </h3>
              <p className="text-xs text-slate-500">
                Monthly breakdown of verified contribution volume
              </p>
            </div>
            <button
              onClick={exportCSV}
              className="text-xs font-bold text-[#002868] hover:text-[#001e50] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#002868]" /> Export CSV
            </button>
          </div>

          {/* Responsive Bar Chart Canvas */}
          <div className="h-52 w-full flex items-end justify-between gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-200">
            {monthlyTrend.map((item, idx) => {
              const isHovered = hoveredBar === idx;
              return (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Floating tooltip */}
                  {isHovered && (
                    <div className="absolute -top-10 bg-[#002868] text-white text-[11px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 animate-fadeIn">
                      {item.hours} hrs in {item.month}
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full max-w-[42px] rounded-t-lg transition-all duration-500 relative ${
                      isHovered ? 'bg-[#BF0A30]' : 'bg-[#002868]'
                    }`}
                    style={{ height: `${item.heightPercent}%` }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#1F2937] transition-opacity">
                      {item.hours}h
                    </span>
                  </div>

                  {/* Month Label */}
                  <span className="text-xs font-semibold text-slate-500 mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Milestone Card */}
        <div className="lg:col-span-4 bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center mb-4 ring-4 ring-amber-50">
              <Award className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] bg-amber-50 border border-amber-100 px-2.5 py-0.5 rounded-full">
              Next Milestone
            </span>
            <h3 className="text-xl font-bold text-[#1F2937] mt-2">
              350-Hour Gold Badge
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              You are only <strong className="text-[#16A34A]">{remainingHours} hours</strong> away from earning your Gold Volunteer Service Award & digital certificate!
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#1F2937]">
              <span>Progress</span>
              <span className="text-[#002868]">{milestonePercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#16A34A] h-full rounded-full transition-all duration-700"
                style={{ width: `${milestonePercent}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500 text-right">342 / 350 Hours</p>
          </div>
        </div>
      </div>

      {/* Hours History Table */}
      <div className="bg-[#FFFFFF] rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-[#1F2937]">Hours History</h3>
            <p className="text-xs text-slate-500">Complete historical log of your verified volunteer sessions</p>
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
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
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

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F8FAFC] text-slate-600 uppercase text-[11px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Project / Task</th>
                <th className="py-3.5 px-5">Hours</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedHistory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No hour records match your query.
                  </td>
                </tr>
              ) : (
                paginatedHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-[#1F2937] whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-[#002868]">
                      {item.project}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-[#1F2937]">
                      {item.hours.toFixed(1)} hrs
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      {item.status === 'Verified' ? (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-[#16A34A] border border-green-100 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-[#F59E0B] border border-amber-100 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3 text-[#F59E0B]" /> Pending
                        </span>
                      )}
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

        {/* Table Footer Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing {Math.min(filteredHistory.length, (currentPage - 1) * itemsPerPage + 1)} to{' '}
            {Math.min(filteredHistory.length, currentPage * itemsPerPage)} of {filteredHistory.length} records
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
