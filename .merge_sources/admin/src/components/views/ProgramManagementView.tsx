import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Program, ProgramStatus } from '../../types';

interface ProgramManagementViewProps {
  programs: Program[];
  onOpenNewProgramModal: () => void;
  onManageProgram: (program: Program) => void;
}

export const ProgramManagementView: React.FC<ProgramManagementViewProps> = ({
  programs,
  onOpenNewProgramModal,
  onManageProgram,
}) => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const filteredPrograms = programs.filter((prog) => {
    const isPastMatch = activeTab === 'Past' ? prog.isPast || prog.status === 'Completed' : !prog.isPast && prog.status !== 'Completed';
    const matchesSearch =
      prog.title.toLowerCase().includes(search.toLowerCase()) ||
      prog.location.toLowerCase().includes(search.toLowerCase()) ||
      (prog.category && prog.category.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = !categoryFilter || prog.category === categoryFilter;
    return isPastMatch && matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: ProgramStatus) => {
    switch (status) {
      case 'Enrolling':
        return (
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs shadow-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-gray-200/60">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-[12px] font-semibold text-gray-800">Enrolling</span>
          </div>
        );
      case 'Full':
        return (
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs shadow-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-gray-200/60">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-[12px] font-semibold text-gray-800">Full</span>
          </div>
        );
      case 'Completed':
        return (
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs shadow-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-gray-200/60">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-[12px] font-semibold text-gray-800">Completed</span>
          </div>
        );
      default:
        return (
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs shadow-xs px-3 py-1 rounded-full flex items-center gap-1.5 border border-gray-200/60">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[12px] font-semibold text-gray-800">Upcoming</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Program Catalog
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage, track, and organize institutional events and academic bootcamps.
          </p>
        </div>

        {/* Active / Past Toggle pill + New Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex bg-white p-1 rounded-full border border-gray-200/80 shadow-2xs w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('Active')}
              className={`flex-1 sm:flex-none px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'Active'
                  ? 'bg-[#F8FAFC] shadow-xs text-gray-900 border border-gray-200/60'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('Past')}
              className={`flex-1 sm:flex-none px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'Past'
                  ? 'bg-[#F8FAFC] shadow-xs text-gray-900 border border-gray-200/60'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Past
            </button>
          </div>

          <button
            onClick={onOpenNewProgramModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white rounded-full shadow-xs transition-all tracking-wide"
          >
            <Plus size={16} />
            <span>New Program</span>
          </button>
        </div>
      </div>

      {/* Program Grid */}
      {filteredPrograms.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 text-gray-400">
          <p className="text-base font-medium">No programs found under {activeTab} view.</p>
          <button
            onClick={onOpenNewProgramModal}
            className="mt-4 px-4 py-2 bg-[#002868] text-white rounded-xl text-xs font-semibold hover:bg-[#002868]/90"
          >
            Create New Program
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <article
              key={prog.id}
              onClick={() => onManageProgram(prog)}
              className="bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              {/* Image & Status */}
              <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                {getStatusBadge(prog.status)}
                <img
                  src={prog.imageUrl}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#002868] uppercase tracking-wider mb-1">
                    {prog.category}
                  </div>
                  <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#002868] transition-colors">
                    {prog.title}
                  </h3>
                </div>

                <div className="pt-4 space-y-2.5 mt-auto">
                  <div className="flex items-center gap-2.5 text-gray-600 text-xs sm:text-sm">
                    <Calendar size={15} className="text-gray-400 shrink-0" />
                    <span>{prog.dateRange}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-gray-600 text-xs sm:text-sm">
                    <MapPin size={15} className="text-gray-400 shrink-0" />
                    <span className="truncate">{prog.location}</span>
                  </div>

                  {/* Progress Bar & Capacity Ratio */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <Users size={15} className="text-gray-500" />
                      <span>
                        {prog.enrolledCount} / {prog.capacity}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onManageProgram(prog);
                      }}
                      className="text-[#BF0A30] hover:text-[#D7263D] font-bold text-xs hover:underline transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
