import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Filter,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles
} from 'lucide-react';
import { Task } from '../../types';

interface TasksViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onOpenLogHours: () => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onSelectTask,
  onOpenLogHours,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('any');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Filtering
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && task.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchLoc = task.location.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
            My Tasks
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your volunteer tasks, schedules, and shift commitments.
          </p>
        </div>
        <button
          onClick={onOpenLogHours}
          className="px-4 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Hours for Shift</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-[#002868]" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#F8FAFC] border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1F2937] focus:border-[#002868] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Date filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#F8FAFC] border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1F2937] focus:border-[#002868] focus:outline-none"
            >
              <option value="any">Any Date</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#F8FAFC] border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1F2937] focus:border-[#002868] focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Environment">Environment</option>
              <option value="Food Security">Food Security</option>
              <option value="Senior Care">Senior Care</option>
              <option value="Education">Education</option>
              <option value="Community">Community</option>
            </select>
          </div>
        </div>

        {/* Search inside tasks */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#002868] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 pr-3 py-1.5 bg-[#F8FAFC] border border-slate-300 rounded-lg text-xs text-[#1F2937] focus:border-[#002868] focus:outline-none w-full md:w-56"
          />
        </div>
      </div>

      {/* Tasks List */}
      {paginatedTasks.length === 0 ? (
        <div className="bg-[#FFFFFF] rounded-xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-slate-500 text-sm">No tasks found matching your filter criteria.</p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setCategoryFilter('all');
              setDateFilter('any');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-[#1D4ED8] underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedTasks.map((task) => {
            const isUpcoming = task.status === 'upcoming';
            const isCompleted = task.status === 'completed';
            const isPending = task.status === 'pending';

            return (
              <div
                key={task.id}
                className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left Task Info */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Status Badge */}
                    {isUpcoming && (
                      <span className="bg-blue-50 text-[#002868] border border-blue-100 text-xs font-bold px-3 py-0.5 rounded-full">
                        Upcoming
                      </span>
                    )}
                    {isCompleted && (
                      <span className="bg-green-50 text-[#16A34A] border border-green-100 text-xs font-bold px-3 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                    {isPending && (
                      <span className="bg-amber-50 text-[#F59E0B] border border-amber-100 text-xs font-bold px-3 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                    <span className="text-xs font-medium text-slate-500">
                      {task.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1F2937]">
                    {task.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {task.description}
                  </p>

                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium text-[#1F2937]">
                      <Calendar className="w-3.5 h-3.5 text-[#002868]" />
                      <span>{task.formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#002868]" />
                      <span>{task.timeRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#002868]" />
                      <span>{task.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex items-center gap-2">
                  {isCompleted ? (
                    <button
                      onClick={() => onSelectTask(task)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#002868] text-xs font-bold rounded-lg border border-slate-300 transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectTask(task)}
                      className="px-4 py-2 bg-[#002868] hover:bg-[#001e50] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
        <p>
          Showing {Math.min(filteredTasks.length, (currentPage - 1) * itemsPerPage + 1)} to{' '}
          {Math.min(filteredTasks.length, currentPage * itemsPerPage)} of {filteredTasks.length} tasks
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-[#002868]" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-[#002868] text-white'
                  : 'border border-slate-300 hover:bg-slate-100 text-[#1F2937]'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 text-[#002868]" />
          </button>
        </div>
      </div>
    </div>
  );
};
