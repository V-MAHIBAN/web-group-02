import React from 'react';
import {
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  CalendarDays,
  UserPlus,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react';
import { NavigationTab, ActivityItem, CalendarEvent } from '../../types';

interface DashboardViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onReviewApplication: (appId: string) => void;
  pendingAppsCount: number;
  totalVolunteers: number;
  activeProgramsCount: number;
  recentActivities: ActivityItem[];
  calendarEvents: CalendarEvent[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onReviewApplication,
  pendingAppsCount,
  totalVolunteers,
  activeProgramsCount,
  recentActivities,
  calendarEvents,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Header */}
      <div>
        <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Good morning, Admin.
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Here is the operational overview of American Corner Batticaloa for today.
        </p>
      </div>

      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 - Total Volunteers */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Total Volunteers
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                {totalVolunteers}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#002868]">
              <Users size={22} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs font-medium">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              <TrendingUp size={14} className="mr-1" /> 12%
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Metric 2 - Active Programs */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Active Programs
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                {activeProgramsCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Calendar size={22} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs">
            <span className="text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100 font-medium">
              3 starting this week
            </span>
          </div>
        </div>

        {/* Metric 3 - Monthly Attendance */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Monthly Attendance
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                1.2k
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs font-medium">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
              <TrendingUp size={14} className="mr-1" /> 5%
            </span>
            <span className="text-gray-400">vs last month</span>
          </div>
        </div>

        {/* Metric 4 - Pending Apps */}
        <div className="bg-red-50/40 rounded-2xl p-6 border border-red-100 shadow-xs hover:shadow-md transition-all relative group">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#BF0A30] font-['Geist',sans-serif]">
                Pending Apps
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                {pendingAppsCount}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#BF0A30] flex items-center justify-center text-white shadow-xs">
              <AlertCircle size={22} />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => onNavigateTab('volunteers')}
              className="text-[#BF0A30] hover:text-[#D7263D] font-semibold text-xs inline-flex items-center gap-1 transition-colors"
            >
              Review Now <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Activity & Calendar Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900">
              Recent Activity
            </h3>
            <button
              onClick={() => onNavigateTab('volunteers')}
              className="text-xs font-semibold text-gray-500 hover:text-[#002868] transition-colors inline-flex items-center gap-1 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/80 transition-colors border border-transparent hover:border-gray-100"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#002868] flex items-center justify-center shrink-0">
                  {activity.type === 'volunteer' && <UserPlus size={18} />}
                  {activity.type === 'program' && <CalendarCheck size={18} />}
                  {activity.type === 'attendance' && <CheckCircle2 size={18} />}
                  {activity.type === 'system' && <CheckCircle2 size={18} />}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-sm text-gray-800 leading-snug">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">
                    {activity.timestamp}
                  </p>
                </div>

                {activity.actionLabel && (
                  <button
                    onClick={() => {
                      if (activity.actionPayload) {
                        onReviewApplication(activity.actionPayload);
                      } else {
                        onNavigateTab('volunteers');
                      }
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 shadow-2xs hover:border-gray-300 transition-colors shrink-0"
                  >
                    {activity.actionLabel}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Programs Widget */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900">
                Upcoming
              </h3>
              <button
                onClick={() => onNavigateTab('programs')}
                className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                title="View Calendar"
              >
                <CalendarDays size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {calendarEvents.map((evt) => (
                <div
                  key={evt.id}
                  className={`p-4 rounded-xl border-l-4 transition-all hover:shadow-xs ${
                    evt.isPrimary
                      ? 'bg-blue-50/60 border-[#002868]'
                      : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-1.5">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                      {evt.title}
                    </h4>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        evt.dayLabel === 'Today'
                          ? 'bg-[#002868] text-white shadow-2xs'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {evt.dayLabel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-2">
                    <Clock size={13} className="text-gray-400" />
                    <span>{evt.timing}</span>
                  </p>
                  {evt.location && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      {evt.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('programs')}
            className="w-full mt-6 py-2.5 px-4 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs text-center"
          >
            Open Full Calendar
          </button>
        </div>
      </div>
    </div>
  );
};
