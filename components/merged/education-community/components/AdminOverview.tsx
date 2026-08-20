import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Download, 
  Search, 
  Filter, 
  Calendar,
  MoreVertical,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { MONTHLY_REGISTRATIONS } from '../data/mockData';

export const AdminOverview: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [exportNotice, setExportNotice] = useState(false);

  const metrics = [
    {
      label: 'Total Users',
      value: '12,450',
      change: '+8%',
      trend: 'up',
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      label: 'Active Students',
      value: '8,920',
      change: '+12%',
      trend: 'up',
      icon: GraduationCap,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100'
    },
    {
      label: 'Volunteers',
      value: '1,240',
      change: '0%',
      trend: 'neutral',
      icon: HeartHandshake,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100'
    },
    {
      label: 'Staff Members',
      value: '324',
      change: '-2%',
      trend: 'down',
      icon: ShieldCheck,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    }
  ];

  const recentLogs = [
    { id: 1, action: "Curriculum Module Approved", target: "Data Governance in Public Sector (Unit 4)", user: "Dr. Arthur Vance", time: "25 mins ago", status: "completed" },
    { id: 2, action: "Batch Certificates Issued", target: "Advanced Civic Leadership (42 Students)", user: "System Automation", time: "2 hours ago", status: "completed" },
    { id: 3, action: "New Member Role Assigned", target: "Maya Lin promoted to Volunteer Lead", user: "Arthur Vance", time: "5 hours ago", status: "completed" },
    { id: 4, action: "Scheduled Database Backup", target: "PostgreSQL Production DB Snapshot", user: "Cloud Infrastructure", time: "Yesterday, 03:00 AM", status: "completed" }
  ];

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Key metrics and recent administrative activity for EduCommunity Pro.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search records, logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] w-48 sm:w-60 shadow-2xs"
            />
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 px-3 py-2 focus:outline-none shadow-2xs cursor-pointer"
          >
            <option value="2026">Year 2026</option>
            <option value="2025">Year 2025</option>
            <option value="all">All Time</option>
          </select>

          <button
            id="btn-export-report"
            onClick={handleExport}
            className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-medium text-emerald-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Executive report CSV generated and downloaded successfully.</span>
        </div>
      )}

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx}
              className={`bg-white p-5 rounded-2xl border ${m.borderColor} shadow-xs hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl ${m.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${m.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                  m.trend === 'up' 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : m.trend === 'down' 
                    ? 'bg-rose-50 text-rose-700' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {m.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                  {m.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                  {m.trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
                  <span>{m.change}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500">{m.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                  {m.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Registrations Interactive Bar Chart (Matches Screen 4) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Monthly Registrations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Student enrollment trajectory across academic terms</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#002868]"></span>
              <span className="text-slate-600">Standard Growth</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-[#BF0A30]"></span>
              <span className="text-slate-600 font-semibold">Peak Month (March)</span>
            </div>
          </div>
        </div>

        {/* Custom Responsive SVG / Canvas-Grade Bar Chart */}
        <div className="pt-8 pb-4">
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 px-2 sm:px-6 border-b border-slate-200 relative">
            {/* Background horizontal grid lines */}
            <div className="absolute inset-x-0 top-0 border-t border-dashed border-slate-100" />
            <div className="absolute inset-x-0 top-1/4 border-t border-dashed border-slate-100" />
            <div className="absolute inset-x-0 top-2/4 border-t border-dashed border-slate-100" />
            <div className="absolute inset-x-0 top-3/4 border-t border-dashed border-slate-100" />

            {MONTHLY_REGISTRATIONS.map((item) => {
              const isHovered = hoveredMonth === item.month;
              return (
                <div 
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item.month)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer z-10"
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg z-20 whitespace-nowrap animate-fadeIn">
                      <span className="text-slate-300">{item.fullMonth}: </span>
                      <span className={item.isPeak ? 'text-amber-300' : 'text-white'}>{item.value.toLocaleString()} users</span>
                      {item.isPeak && <span className="text-[10px] ml-1 text-rose-300">🔥 Peak!</span>}
                    </div>
                  )}

                  {/* Bar */}
                  <div 
                    className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 ${
                      item.isPeak 
                        ? 'bg-[#BF0A30] hover:bg-[#D7263D] shadow-md shadow-rose-900/20' 
                        : 'bg-[#002868] hover:bg-[#003890]'
                    }`}
                    style={{ height: `${item.heightPercent}%` }}
                  />

                  {/* Month Label */}
                  <span className={`text-xs font-semibold mt-3 ${
                    item.isPeak ? 'text-[#BF0A30]' : 'text-slate-600'
                  }`}>
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Recent Administrative Logs</h2>
          <span className="text-xs font-medium text-slate-500">Live system records</span>
        </div>

        <div className="divide-y divide-slate-100">
          {recentLogs.map((log) => (
            <div key={log.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#002868]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{log.action}</h4>
                  <p className="text-slate-500">{log.target}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="font-medium text-slate-700">{log.user}</p>
                <p className="text-slate-400 text-[11px]">{log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
