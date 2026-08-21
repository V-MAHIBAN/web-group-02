import React from 'react';
import { OverviewMetrics, SystemActivity, Student } from '../../types';

interface DashboardViewProps {
  metrics: OverviewMetrics;
  activities: SystemActivity[];
  students: Student[];
  onOpenLogLate: () => void;
  onOpenBroadcast: () => void;
  onOpenReport: () => void;
  onOpenCheckIn: () => void;
  onViewAllActivity: () => void;
  onSelectStudent: (student: Student) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  activities,
  students,
  onOpenLogLate,
  onOpenBroadcast,
  onOpenReport,
  onViewAllActivity,
  onSelectStudent,
}) => {
  const attendancePct = Math.round((metrics.totalPresent / metrics.totalEnrolled) * 100);

  const handleActivityClick = (act: SystemActivity) => {
    if (act.studentId) {
      const found = students.find(s => s.studentId === act.studentId || s.id === act.studentId);
      if (found) {
        onSelectStudent(found);
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] space-y-6">
      {/* Page Header */}
      <div className="mb-2">
        <h2 className="text-[30px] font-bold leading-tight tracking-tight text-[#121C2A] sm:text-[36px] lg:text-[44px]">
          Today's Overview
        </h2>
        <p className="mt-1 text-[15px] text-[#5B4040]/80 sm:text-[16px]">
          Real-time attendance and alert metrics for current academic session.
        </p>
      </div>

      {/* Bento Grid Metrics Row */}
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {/* Metric Card 1: Total Students */}
        <div className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
          <div className="flex justify-between items-start mb-4 gap-4">
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-[#5B4040]">Total Students</h3>
              <p className="text-[13px] text-[#5B4040]/70 mt-0.5">Present / Enrolled</p>
            </div>
            <div className="p-2.5 bg-[#DCE1FF] text-[#001551] rounded-lg flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[40px] md:text-[44px] font-bold text-[#121C2A] tracking-tight leading-none">
              {metrics.totalPresent}
            </span>
            <span className="text-[18px] font-semibold text-[#5B4040]/70">
              / {metrics.totalEnrolled}
            </span>
          </div>
          <div className="w-full bg-[#E6EEFF] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#1D4ED8] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(attendancePct, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Metric Card 2: Late Arrivals */}
        <div className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#5B4040]">Late Arrivals</h3>
              <p className="mt-0.5 text-[13px] text-[#5B4040]/70">Recorded today</p>
            </div>
            <div className="flex-shrink-0 rounded-lg bg-[#DEE9FC] p-2.5 text-[#121C2A]">
              <span className="material-symbols-outlined text-[24px]">schedule</span>
            </div>
          </div>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-[40px] font-bold leading-none tracking-tight text-[#121C2A] md:text-[44px]">
              {metrics.lateArrivals}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#BA1A1A]">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+{metrics.lateArrivalsChangePct}% vs yesterday</span>
          </div>
        </div>

        {/* Metric Card 3: Pending Alerts (Crimson Accent) */}
        <div className="flex min-h-[220px] flex-col justify-between rounded-xl border border-[#FFDAD6] bg-[#FFDAD9] p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-semibold text-[#400009]">Pending Alerts</h3>
              <p className="mt-0.5 text-[13px] text-[#920021]">Requires attention</p>
            </div>
            <div className="flex-shrink-0 rounded-lg bg-[#BF0A30] p-2.5 text-white shadow-sm">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
          </div>
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-[40px] font-bold leading-none tracking-tight text-[#940021] md:text-[44px]">
              {metrics.pendingAlerts}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-[#940021]">
            <span>High priority</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Activity Feed + Quick Actions */}
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(260px,0.8fr)]">
        {/* Left Column: Recent Activity */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-5 py-4 md:px-6 md:py-5">
            <h3 className="text-[18px] font-bold text-[#121C2A] md:text-[20px]">Recent Activity</h3>
            <button
              onClick={onViewAllActivity}
              id="view-all-activity-btn"
              className="cursor-pointer whitespace-nowrap text-[12px] font-semibold text-[#1D4ED8] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ul className="divide-y divide-[#E2E8F0]">
              {activities.map(act => {
                let iconName = 'qr_code_scanner';
                let iconBg = 'bg-[#DCE1FF] text-[#001551]';

                if (act.type === 'alert' || act.severity === 'high') {
                  iconName = 'campaign';
                  iconBg = 'bg-[#FFDAD6] text-[#93000A]';
                } else if (act.type === 'late_entry' || act.severity === 'warning') {
                  iconName = 'person_remove';
                  iconBg = 'bg-[#DAE2FF] text-[#001946]';
                }

                return (
                  <li
                    key={act.id}
                    onClick={() => handleActivityClick(act)}
                    className="group flex cursor-pointer items-start gap-3 px-4 py-4 transition-colors hover:bg-[#EFF4FF]/60 sm:px-5"
                  >
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg} transition-transform group-hover:scale-105`}>
                      <span className="material-symbols-outlined text-[18px]">{iconName}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className={`min-w-0 flex-1 break-words text-[14px] font-semibold leading-snug ${act.type === 'alert' ? 'text-[#BA1A1A]' : 'text-[#121C2A]'}`}>
                          {act.title}
                        </p>
                        <span className="shrink-0 pt-0.5 text-[11px] font-medium text-[#5B4040]/70">{act.timeAgo}</span>
                      </div>
                      <p className="mt-1 break-words text-[13px] leading-relaxed text-[#5B4040]/90">{act.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right Column: Quick Actions */}
        <div className="flex flex-col gap-5 md:gap-4">
          {/* Action 1: Log Late Entry */}
          <div
            onClick={onOpenLogLate}
            id="action-log-late"
            className="bg-white p-5 md:p-6 rounded-lg border border-[#E2E8F0] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 mb-2">
              <div className="p-2.5 bg-[#E6EEFF] rounded-lg text-[#121C2A] group-hover:bg-[#1D4ED8] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">more_time</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#121C2A]">Log Late Entry</h3>
            </div>
            <p className="text-[13px] text-[#5B4040]/80 pl-1">
              Manually record a student arriving after the bell.
            </p>
          </div>

          {/* Action 2: Broadcast Alert (Red Accent line) */}
          <div
            onClick={onOpenBroadcast}
            id="action-broadcast-alert"
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] border-l-4 border-l-[#BF0A30] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 mb-2">
              <div className="p-2.5 bg-[#FFDAD6] rounded-lg text-[#93000A] group-hover:bg-[#BF0A30] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">campaign</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#121C2A]">Broadcast Alert</h3>
            </div>
            <p className="text-[13px] text-[#5B4040]/80 pl-1">
              Send a mass notification to staff or specific grade levels.
            </p>
          </div>

          {/* Action 3: Generate Daily Report */}
          <div
            onClick={onOpenReport}
            id="action-generate-report"
            className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 mb-2">
              <div className="p-2.5 bg-[#E6EEFF] rounded-lg text-[#121C2A] group-hover:bg-[#1D4ED8] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[22px]">summarize</span>
              </div>
              <h3 className="text-[16px] font-bold text-[#121C2A]">Generate Daily Report</h3>
            </div>
            <p className="text-[13px] text-[#5B4040]/80 pl-1">
              Compile attendance and incident metrics for today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
