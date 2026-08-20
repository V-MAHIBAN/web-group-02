import React from 'react';
import { 
  Award, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Play, 
  Calendar, 
  ChevronRight, 
  ArrowUpRight,
  BookOpen,
  Bell,
  Sparkles,
  User
} from 'lucide-react';
import { Course, Deadline, ActiveTab } from '../types';
import { FEATURED_COURSE, ENROLLED_COURSES, UPCOMING_DEADLINES } from '../data/mockData';

interface StudentDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectCourse: (course: Course) => void;
  deadlines: Deadline[];
  onToggleDeadline: (id: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  setActiveTab,
  onSelectCourse,
  deadlines,
  onToggleDeadline
}) => {
  const metrics = [
    {
      label: 'Certificates',
      value: '4',
      icon: Award,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      label: 'Hours Learned',
      value: '128',
      icon: Clock,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100'
    },
    {
      label: 'Current Streak',
      value: '12 Days',
      icon: Flame,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100'
    },
    {
      label: 'Completed Courses',
      value: '7',
      icon: CheckCircle2,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, Sarah
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your civic leadership progress and continue active modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-xl shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Ask EduAssist AI</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-2xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>View Calendar</span>
          </button>
        </div>
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx}
              className={`bg-white p-5 rounded-2xl border ${m.borderColor} shadow-xs hover:shadow-sm transition-all duration-200 flex items-center gap-4`}
            >
              <div className={`w-12 h-12 rounded-xl ${m.bgColor} flex items-center justify-center shrink-0`}>
                <Icon className={`w-6 h-6 ${m.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 truncate">{m.label}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
                  {m.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid: Hero Course & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Featured Course Banner */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-sm transition-all">
            <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
              <img 
                src={FEATURED_COURSE.image} 
                alt={FEATURED_COURSE.title}
                className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#BF0A30] text-white rounded-lg shadow-sm">
                  In Progress
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-black/50 backdrop-blur-md text-white rounded-lg">
                  {FEATURED_COURSE.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-medium text-slate-300">Instructor: {FEATURED_COURSE.instructor}</p>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow-sm mt-0.5">
                  {FEATURED_COURSE.title}
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              {/* Progress & Duration */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700">
                    {FEATURED_COURSE.progress}% Completed
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {FEATURED_COURSE.durationRemaining}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#BF0A30] h-full rounded-full transition-all duration-500"
                    style={{ width: `${FEATURED_COURSE.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                  {FEATURED_COURSE.description}
                </p>
                <button
                  id="btn-continue-learning-hero"
                  onClick={() => onSelectCourse(FEATURED_COURSE)}
                  className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-[0.98] text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Continue Learning</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enrolled Courses Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Enrolled Courses</h2>
              <button 
                onClick={() => setActiveTab('courses')}
                className="text-xs font-semibold text-[#002868] hover:text-[#BF0A30] flex items-center gap-1 transition-colors"
              >
                <span>View All ({ENROLLED_COURSES.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ENROLLED_COURSES.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="h-32 overflow-hidden relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-slate-800 rounded-md">
                        {course.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-[#BF0A30] transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5 font-medium">
                      <span>Progress</span>
                      <span className="font-bold text-slate-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#002868] h-full rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Upcoming Deadlines Widget */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#BF0A30]" />
                <h2 className="font-bold text-base text-slate-900">Upcoming Deadlines</h2>
              </div>
              <button 
                onClick={() => setActiveTab('schedule')}
                className="text-xs font-semibold text-slate-500 hover:text-[#002868]"
              >
                Schedule
              </button>
            </div>

            <div className="space-y-3.5">
              {deadlines.map((dl) => (
                <div 
                  key={dl.id}
                  className={`p-3 rounded-xl border transition-all flex items-start gap-3.5 ${
                    dl.completed 
                      ? 'bg-slate-50 border-slate-200 opacity-60' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {/* Calendar Badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#002868]/5 border border-[#002868]/15 flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#BF0A30] uppercase tracking-wider leading-none">
                      {dl.dueMonth}
                    </span>
                    <span className="text-base font-extrabold text-[#002868] leading-none mt-1">
                      {dl.dueDay}
                    </span>
                  </div>

                  {/* Task details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className={`text-sm font-semibold leading-snug truncate ${
                        dl.completed ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}>
                        {dl.title}
                      </h4>
                      <input 
                        type="checkbox"
                        checked={dl.completed}
                        onChange={() => onToggleDeadline(dl.id)}
                        className="w-4 h-4 mt-0.5 rounded text-[#BF0A30] focus:ring-[#BF0A30] cursor-pointer"
                      />
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{dl.course}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        dl.priority === 'high' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200/60' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                      }`}>
                        {dl.priority.toUpperCase()} PRIORITY
                      </span>
                      {dl.reminderSet && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                          <Bell className="w-3 h-3 text-slate-400" />
                          {dl.reminderTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('schedule')}
              className="w-full mt-4 py-2.5 border border-dashed border-slate-300 hover:border-slate-400 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Open Study & Wellness Planner</span>
            </button>
          </div>

          {/* Quick AI Tip Card */}
          <div className="bg-gradient-to-br from-[#002868] to-slate-900 text-white rounded-2xl p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 w-28 h-28 bg-[#BF0A30]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>EduAssist Tip</span>
            </div>
            <p className="text-sm font-medium text-white/90 leading-relaxed mb-4">
              "Review the Module 4 Civic Engagement Protocols before Thursday to prepare for the regional crisis simulation."
            </p>
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="text-xs font-semibold bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Consult EduAssist</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
