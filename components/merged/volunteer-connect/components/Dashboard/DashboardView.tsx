import React from 'react';
import {
  Heart,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Search,
  PlusCircle,
  Clock,
  MapPin,
  MoreVertical,
  Award,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Task, HourEntry, Program, UserProfile } from '../../types';

interface DashboardViewProps {
  user: UserProfile;
  tasks: Task[];
  hoursHistory: HourEntry[];
  programs: Program[];
  onOpenLogHours: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHours: () => void;
  onNavigateToPrograms: () => void;
  onSelectTask: (task: Task) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  tasks,
  hoursHistory,
  programs,
  onOpenLogHours,
  onNavigateToTasks,
  onNavigateToHours,
  onNavigateToPrograms,
  onSelectTask,
}) => {
  const upcomingTasks = tasks.filter((t) => t.status === 'upcoming');
  const completedThisMonth = 8;
  const goalMonthlyTasks = 10;
  const goalPercent = Math.min(100, Math.round((completedThisMonth / goalMonthlyTasks) * 100));

  // Circular progress math (radius: 40, circumference: 251.2, 15/20 hrs = 75% -> offset = 62.8)
  const currentMonthlyHours = 15;
  const goalMonthlyHours = 20;
  const circleOffset = 251.2 * (1 - currentMonthlyHours / goalMonthlyHours);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1F2937] tracking-tight">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">
            Ready to make a difference today? Here's your impact overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToTasks}
            className="px-4 py-2.5 bg-[#002868] hover:bg-[#001e50] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Find New Tasks</span>
          </button>
          <button
            onClick={onOpenLogHours}
            className="px-4 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Hours</span>
          </button>
        </div>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Hours */}
        <div
          onClick={onNavigateToHours}
          className="bg-[#FFFFFF] rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md hover:border-[#002868]/30 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002868] flex items-center justify-center">
              <Heart className="w-5 h-5 fill-[#002868]/10 text-[#002868]" />
            </div>
            <span className="bg-green-50 text-[#16A34A] border border-green-100 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3 text-[#16A34A]" /> +12%
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Hours Contributed
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
              124.5
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Lifetime impact hours</p>
        </div>

        {/* Card 2: Upcoming Tasks */}
        <div
          onClick={onNavigateToTasks}
          className="bg-[#FFFFFF] rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md hover:border-[#002868]/30 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F59E0B] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#002868]" />
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Upcoming Tasks
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
              {upcomingTasks.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Scheduled for this week</p>
        </div>

        {/* Card 3: Completed This Month */}
        <div className="bg-[#FFFFFF] rounded-xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md hover:border-[#002868]/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-[#16A34A] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Completed This Month
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-[#1F2937] tracking-tight">
              {completedThisMonth}
            </span>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-[11px] text-slate-500 mb-1">
              <span>Goal: {goalMonthlyTasks} tasks</span>
              <span className="font-semibold text-[#16A34A]">{goalPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#16A34A] h-full rounded-full transition-all duration-700"
                style={{ width: `${goalPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Activities (Left) & Recent Activity Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Upcoming Activities Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">Upcoming Activities</h2>
            <button
              onClick={onNavigateToTasks}
              className="text-xs font-semibold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Calendar <ChevronRight className="w-3.5 h-3.5 text-[#002868]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Activity Card 1 */}
            <div
              onClick={() => onSelectTask(tasks[0])}
              className="bg-[#FFFFFF] rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#002868]/40 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-50 text-[#002868] border border-blue-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Upcoming
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical className="w-4 h-4 text-[#002868]" />
                  </button>
                </div>
                <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#002868] transition-colors line-clamp-1">
                  Community Garden Prep
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  Help prepare the soil and plant new vegetable seedlings for the spring harvest season.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#002868]" />
                  <span>Tomorrow, 9:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#002868]" />
                  <span>Riverside Park</span>
                </div>
              </div>
            </div>

            {/* Activity Card 2 */}
            <div
              onClick={() => onSelectTask(tasks[4] || tasks[1])}
              className="bg-[#FFFFFF] rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#002868]/40 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-50 text-[#002868] border border-blue-100 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Upcoming
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 p-1">
                    <MoreVertical className="w-4 h-4 text-[#002868]" />
                  </button>
                </div>
                <h3 className="font-bold text-base text-[#1F2937] group-hover:text-[#002868] transition-colors line-clamp-1">
                  Food Bank Sorting
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  Sort and package incoming non-perishable donations for weekend family supply boxes.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#002868]" />
                  <span>Oct 24, 1:00 PM - 4:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#002868]" />
                  <span>Downtown Food Pantry</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Highlight Card - Youth Mentorship */}
          <div className="bg-[#002868] text-white rounded-xl p-5 shadow-sm relative overflow-hidden mt-4">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '16px 16px',
              }}
            ></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
                  <Calendar className="w-4 h-4 text-blue-200" /> Next Scheduled Cohort
                </div>
                <h4 className="text-lg font-bold text-white">Youth Mentorship Kickoff</h4>
                <p className="text-xs text-blue-100">Tomorrow • 10:00 AM - 12:00 PM (Central Youth Center)</p>
              </div>
              <button
                onClick={() => onSelectTask(tasks[3] || tasks[0])}
                className="px-4 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Recent Activity Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-[#1F2937]">Recent Activity</h3>
              <Clock className="w-4 h-4 text-[#002868]" />
            </div>

            {/* Timeline */}
            <div className="mt-5 space-y-4 relative">
              {/* Vertical line connecting nodes */}
              <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-slate-200"></div>

              {/* Item 1 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-6 h-6 rounded-full bg-green-50 border-2 border-white text-[#16A34A] flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                </div>
                <div className="flex-1 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>2 days ago</span>
                  </div>
                  <h4 className="font-semibold text-xs text-[#1F2937] mt-0.5">
                    Senior Center Tech Help
                  </h4>
                  <span className="inline-block mt-1 text-[11px] font-bold text-[#16A34A] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                    +3 hours logged
                  </span>
                </div>
              </div>

              {/* Item 2: Milestone Badge */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-6 h-6 rounded-full bg-amber-50 border-2 border-white text-[#F59E0B] flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                </div>
                <div className="flex-1 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>1 week ago</span>
                  </div>
                  <h4 className="font-semibold text-xs text-[#1F2937] mt-0.5">
                    Reached 100 Hours Milestone!
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Earned 'Dedicated Guardian' badge.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-6 h-6 rounded-full bg-green-50 border-2 border-white text-[#16A34A] flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                </div>
                <div className="flex-1 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>2 weeks ago</span>
                  </div>
                  <h4 className="font-semibold text-xs text-[#1F2937] mt-0.5">
                    Park Cleanup Drive
                  </h4>
                  <span className="inline-block mt-1 text-[11px] font-bold text-[#16A34A] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                    +4 hours logged
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly Goal Progress Ring */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Monthly Goal Progress
                </span>
                <span className="text-xs font-bold text-[#002868]">
                  {currentMonthlyHours} / {goalMonthlyHours} hrs
                </span>
              </div>
              <div className="flex items-center gap-4 bg-[#F8FAFC] p-3 rounded-xl border border-slate-200">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#002868"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={circleOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-extrabold text-[#002868]">
                    75%
                  </span>
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-[#1F2937]">Almost there!</p>
                  <p className="text-slate-500 text-[11px]">5 hours remaining to hit your monthly target.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
