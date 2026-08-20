import React, { useState } from 'react';
import {
  Megaphone,
  Calendar,
  History,
  Eye,
  Plus,
  Download,
  Edit2,
  Copy,
  Trash2,
  SlidersHorizontal,
} from 'lucide-react';
import { Announcement, AnnouncementPriority, AnnouncementStatus } from '../../types';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  onAddAnnouncementClick: () => void;
  onEditAnnouncement: (announcement: Announcement) => void;
  onDuplicateAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  onAddAnnouncementClick,
  onEditAnnouncement,
  onDuplicateAnnouncement,
  onDeleteAnnouncement,
}) => {
  const [audienceFilter, setAudienceFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAnnouncements = announcements.filter((anc) => {
    const matchesAudience = !audienceFilter || anc.audience === audienceFilter;
    const matchesPriority = !priorityFilter || anc.priority === priorityFilter;
    const matchesStatus = !statusFilter || anc.status === statusFilter;
    return matchesAudience && matchesPriority && matchesStatus;
  });

  const getPriorityBadge = (priority: AnnouncementPriority) => {
    switch (priority) {
      case 'High':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: AnnouncementStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#002868] border border-blue-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#002868]" /> Scheduled
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Expired
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Announcements
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage institutional communications and broadcast messages.
          </p>
        </div>

        <button
          onClick={onAddAnnouncementClick}
          className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all w-fit"
        >
          <Plus size={16} />
          <span>+ Add New</span>
        </button>
      </div>

      {/* 4 Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Active
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                12
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002868] flex items-center justify-center">
              <Megaphone size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Scheduled
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                4
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002868] flex items-center justify-center">
              <Calendar size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Expired
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                45
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002868] flex items-center justify-center">
              <History size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Total Views
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                8.2k
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002868] flex items-center justify-center">
              <Eye size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar & Data Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 px-6 border-b border-gray-200/80 bg-gray-50/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-medium py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">Audience: All</option>
              <option value="All Members">All Members</option>
              <option value="Staff Only">Staff Only</option>
              <option value="Volunteers">Volunteers</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-medium py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">Priority: All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white rounded-xl border border-gray-200 text-xs sm:text-sm font-medium py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">Status: All</option>
              <option value="Active">Active</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <button
            onClick={() => alert('Exporting announcements as CSV...')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Download size={14} className="text-[#002868]" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Audience</th>
                <th className="px-6 py-4">Published Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No announcements found.
                  </td>
                </tr>
              ) : (
                filteredAnnouncements.map((anc) => (
                  <tr key={anc.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 line-clamp-1">{anc.title}</div>
                      <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{anc.excerpt}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(anc.priority)}
                    </td>

                    <td className="px-6 py-4 text-xs font-medium text-gray-600 whitespace-nowrap">
                      {anc.audience}
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                      {anc.publishedDate}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(anc.status)}
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEditAnnouncement(anc)}
                          className="p-1.5 text-gray-400 hover:text-[#1D4ED8] rounded-lg hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDuplicateAnnouncement(anc)}
                          className="p-1.5 text-gray-400 hover:text-[#002868] rounded-lg hover:bg-gray-100 transition-colors"
                          title="Duplicate"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteAnnouncement(anc.id)}
                          className="p-1.5 text-gray-400 hover:text-[#DC2626] rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-gray-200/80 bg-gray-50/40 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to {filteredAnnouncements.length} of {announcements.length} results</span>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-semibold" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg bg-[#002868] text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 font-semibold" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
