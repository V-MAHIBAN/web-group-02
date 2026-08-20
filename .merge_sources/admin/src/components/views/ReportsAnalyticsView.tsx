import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Download,
  Calendar,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Award,
  Users,
  Layers,
  Sparkles,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { ReportItem } from '../../types';

interface ReportsAnalyticsViewProps {
  reports: ReportItem[];
  onGenerateNewReport: () => void;
}

const attendanceChartData = [
  { month: 'Jan', attendance: 840, volunteers: 110 },
  { month: 'Feb', attendance: 920, volunteers: 118 },
  { month: 'Mar', attendance: 1150, volunteers: 125 },
  { month: 'Apr', attendance: 1050, volunteers: 130 },
  { month: 'May', attendance: 1280, volunteers: 138 },
  { month: 'Jun', attendance: 1420, volunteers: 142 },
];

const categoryDistribution = [
  { name: 'STEM & Tech', value: 45, color: '#002868' },
  { name: 'English Access', value: 30, color: '#1D4ED8' },
  { name: 'Youth Leadership', value: 15, color: '#BF0A30' },
  { name: 'Cultural Exchange', value: 10, color: '#F59E0B' },
];

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({
  reports,
  onGenerateNewReport,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Quarter');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Reports & Analytics
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Generate institutional reports, monitor engagement metrics, and track key performance indicators.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer focus:outline-none"
            >
              <option>This Quarter</option>
              <option>Year to Date</option>
              <option>Last 12 Months</option>
              <option>Custom Range</option>
            </select>
          </div>

          <button
            onClick={onGenerateNewReport}
            className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all tracking-wide"
          >
            <Sparkles size={16} />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Total Engagement
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                14,820
              </h3>
            </div>
            <div className="p-3 bg-blue-50 text-[#002868] rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
            +18.4% vs last period
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Completion Rate
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                92.6%
              </h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Award size={20} />
            </div>
          </div>
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
            +3.2% vs target
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Active Volunteers
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                142
              </h3>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users size={20} />
            </div>
          </div>
          <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md w-fit">
            98.2% retention
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
                Resource Usage
              </p>
              <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
                87.4%
              </h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Layers size={20} />
            </div>
          </div>
          <div className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md w-fit">
            Across labs & spaces
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trends Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900">
                Monthly Program Attendance
              </h3>
              <p className="text-xs text-gray-400">Total verified participant check-ins per month</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#002868]" /> Attendance
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#BF0A30]" /> Volunteers
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                  }}
                />
                <Bar dataKey="attendance" fill="#002868" radius={[6, 6, 0, 0]} />
                <Bar dataKey="volunteers" fill="#BF0A30" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900">
              Program Distribution
            </h3>
            <p className="text-xs text-gray-400 mb-4">By subject area and focus track</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
            {categoryDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600 font-medium truncate">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Reports Registry */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-5 px-6 border-b border-gray-200/80 bg-gray-50/50 flex items-center justify-between">
          <h3 className="font-['Poppins',sans-serif] text-base font-bold text-gray-900">
            Generated Official Reports
          </h3>
          <span className="text-xs text-gray-500">{reports.length} archived files</span>
        </div>

        <div className="divide-y divide-gray-100">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-5 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-[#BF0A30] rounded-xl shrink-0">
                  {report.format === 'PDF' ? <FileText size={20} /> : <FileSpreadsheet size={20} />}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm hover:text-[#002868] cursor-pointer">
                    {report.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                    <span>Generated by {report.generatedBy}</span>
                    <span>&bull;</span>
                    <span>{report.period}</span>
                    <span>&bull;</span>
                    <span className="font-medium text-gray-600">
                      {report.format} ({report.fileSize})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => alert(`Downloading ${report.title} (${report.format})...`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-2xs transition-colors"
                >
                  <Download size={14} className="text-[#002868]" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
