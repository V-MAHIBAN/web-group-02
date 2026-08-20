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
    <div className="max-w-7xl mx-auto w-full space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-[32px] sm:text-[38px] md:text-[48px] font-bold text-[#121C2A] tracking-tight leading-tight">
          Today's Overview
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#5B4040]/80 mt-1">
          Real-time attendance and alert metrics for current academic session.
        </p>
      </div>

      {/* Bento Grid Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full\">\n        {/* Metric Card 1: Total Students */}
        <div className=\"bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200\">\n          <div className=\"flex justify-between items-start mb-4 gap-4\">\n            <div className=\"flex-1\">\n              <h3 className=\"text-[15px] font-semibold text-[#5B4040]\">Total Students</h3>\n              <p className=\"text-[13px] text-[#5B4040]/70 mt-0.5\">Present / Enrolled</p>\n            </div>\n            <div className=\"p-2.5 bg-[#DCE1FF] text-[#001551] rounded-lg flex-shrink-0\">\n              <span className=\"material-symbols-outlined text-[24px]\">school</span>\n            </div>\n          </div>\n          <div className=\"flex items-baseline gap-2 mb-4\">\n            <span className=\"text-[40px] md:text-[44px] font-bold text-[#121C2A] tracking-tight leading-none\">\n              {metrics.totalPresent}\n            </span>\n            <span className=\"text-[18px] font-semibold text-[#5B4040]/70\">\n              / {metrics.totalEnrolled}\n            </span>\n          </div>\n          <div className=\"w-full bg-[#E6EEFF] rounded-full h-1.5 overflow-hidden\">\n            <div\n              className=\"bg-[#1D4ED8] h-1.5 rounded-full transition-all duration-500\"\n              style={{ width: `${Math.min(attendancePct, 100)}%` }}\n            ></div>\n          </div>\n        </div>

        {/* Metric Card 2: Late Arrivals */}
        <div className=\"bg-white p-6 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200\">\n          <div className=\"flex justify-between items-start mb-4 gap-4\">\n            <div className=\"flex-1\">\n              <h3 className=\"text-[15px] font-semibold text-[#5B4040]\">Late Arrivals</h3>\n              <p className=\"text-[13px] text-[#5B4040]/70 mt-0.5\">Recorded today</p>\n            </div>\n            <div className=\"p-2.5 bg-[#DEE9FC] text-[#121C2A] rounded-lg flex-shrink-0\">\n              <span className=\"material-symbols-outlined text-[24px]\">schedule</span>\n            </div>\n          </div>\n          <div className=\"flex items-baseline gap-2 mb-4\">\n            <span className=\"text-[40px] md:text-[44px] font-bold text-[#121C2A] tracking-tight leading-none\">\n              {metrics.lateArrivals}\n            </span>\n          </div>\n          <div className=\"flex items-center gap-1.5 text-[12px] font-semibold text-[#BA1A1A]\">\n            <span className=\"material-symbols-outlined text-[16px]\">trending_up</span>\n            <span>+{metrics.lateArrivalsChangePct}% vs yesterday</span>\n          </div>\n        </div>

        {/* Metric Card 3: Pending Alerts (Crimson Accent) */}
        <div className="bg-[#FFDAD9] p-6 rounded-lg border border-[#FFDAD6] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-4 gap-4">
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-[#400009]">Pending Alerts</h3>
              <p className="text-[13px] text-[#920021] mt-0.5">Requires attention</p>
            </div>
            <div className="p-2.5 bg-[#BF0A30] text-white rounded-lg flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[40px] md:text-[44px] font-bold text-[#940021] tracking-tight leading-none">
              {metrics.pendingAlerts}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[12px] font-bold text-[#940021] uppercase tracking-wider">
            <span>High priority</span>
          </div>
        </div>
      </div>
      </div>

      {/* Main Grid: Activity Feed (8 cols) + Quick Actions (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Left Column: Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-5 md:p-6 border-b border-[#E2E8F0] flex justify-between items-center bg-white">
            <h3 className="text-[18px] md:text-[20px] font-bold text-[#121C2A]">Recent Activity</h3>
            <button
              onClick={onViewAllActivity}
              id="view-all-activity-btn"
              className="text-[12px] font-semibold text-[#1D4ED8] hover:underline cursor-pointer whitespace-nowrap"
            >
              View All
            </button>
          </div>

          <div className="p-0 flex-1 overflow-y-auto">
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
                    className="p-4 sm:px-6 hover:bg-[#EFF4FF]/60 transition-colors flex items-start gap-4 cursor-pointer group"
                  >
                    <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                      <span className="material-symbols-outlined text-[20px]">{iconName}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-[15px] font-semibold ${act.type === 'alert' ? 'text-[#BA1A1A]' : 'text-[#121C2A]'}`}>
                          {act.title}
                        </p>
                        <span className="text-[12px] text-[#5B4040]/70 shrink-0 font-medium">{act.timeAgo}</span>
                      </div>
                      <p className="text-[14px] text-[#5B4040]/90 mt-1 leading-relaxed">{act.description}</p>
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
