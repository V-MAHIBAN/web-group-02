import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';
import { Program } from '../../types';

interface ProgramsViewProps {
  programs: Program[];
  onOpenCertificate: () => void;
  onOpenLogHours: () => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  programs,
  onOpenCertificate,
  onOpenLogHours,
}) => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed' | 'upcoming'>('all');

  const filtered = programs.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'in_progress') return p.status === 'in_progress';
    if (filter === 'completed') return p.status === 'completed';
    if (filter === 'upcoming') return p.status === 'upcoming';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Enrolled Programs
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your long-term volunteer initiatives, cohorts, and skill learning tracks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] p-1 rounded-xl border border-slate-200 self-start sm:self-auto shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#002868] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Programs
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filter === 'in_progress'
                ? 'bg-[#002868] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filter === 'completed'
                ? 'bg-[#002868] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((program) => {
          const isInProgress = program.status === 'in_progress';
          const isCompleted = program.status === 'completed';
          const isUpcoming = program.status === 'upcoming';

          return (
            <div
              key={program.id}
              className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Header with Badge Overlay */}
                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={program.image}
                    alt={program.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {isInProgress && (
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        In Progress
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="bg-[#002868] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        Upcoming
                      </span>
                    )}
                    {isCompleted && (
                      <span className="bg-white text-[#1F2937] text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-[#16A34A]" /> Completed
                      </span>
                    )}
                  </div>

                  {/* Hours Badge if present */}
                  {program.hoursLogged && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                      {program.hoursLogged} hrs logged
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#BF0A30] uppercase tracking-wider">
                      {program.organization}
                    </span>
                    <h3 className="text-lg font-bold text-[#1F2937] group-hover:text-[#002868] transition-colors line-clamp-1">
                      {program.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#002868]" />
                      <span>{program.dateRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#002868]" />
                      <span>{program.schedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Avatars & CTA */}
              <div className="p-4 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between">
                {/* Volunteer team stack */}
                <div className="flex items-center -space-x-2">
                  {program.teamAvatars.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Team member"
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  {program.additionalTeamCount && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-[#002868] font-bold text-[10px] flex items-center justify-center border-2 border-white">
                      +{program.additionalTeamCount}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {isCompleted ? (
                    <button
                      onClick={onOpenCertificate}
                      className="text-xs font-bold text-[#16A34A] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-[#16A34A]" /> Certificate
                    </button>
                  ) : (
                    <button
                      onClick={onOpenLogHours}
                      className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Log Hours <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
