import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Droplets, 
  Bell, 
  Plus, 
  Check, 
  Clock, 
  Flame, 
  Award, 
  RefreshCw, 
  AlertCircle, 
  Volume2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Deadline, WaterTrackerState } from '../types';
import { INITIAL_WATER_TRACKER } from '../data/mockData';

interface ScheduleViewProps {
  deadlines: Deadline[];
  onToggleDeadline: (id: string) => void;
  onAddDeadline: (newDl: Partial<Deadline>) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  deadlines,
  onToggleDeadline,
  onAddDeadline
}) => {
  const [waterData, setWaterData] = useState<WaterTrackerState>(INITIAL_WATER_TRACKER);
  const [activeTab, setActiveTab] = useState<'calendar' | 'hydration'>('calendar');
  const [reminderToast, setReminderToast] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newCourse, setNewCourse] = useState('Civic Leadership');
  const [newDay, setNewDay] = useState(25);
  const [newMonth, setNewMonth] = useState('OCT');
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch live water tracker data from API
  useEffect(() => {
    fetch('/api/wellness/water')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.consumedMl === 'number') {
          setWaterData(data);
        }
      })
      .catch(err => console.log('Water tracker local mode:', err));
  }, []);

  const handleLogWater = async (amount: number) => {
    try {
      const res = await fetch('/api/wellness/water/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountMl: amount })
      });
      const result = await res.json();
      if (result.success && result.waterTracker) {
        setWaterData(result.waterTracker);
      }
    } catch {
      // Local fallback
      setWaterData(prev => {
        const newConsumed = prev.consumedMl + amount;
        return {
          ...prev,
          consumedMl: newConsumed,
          lastDrinkTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          history: [{ time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), amountMl: amount }, ...prev.history]
        };
      });
    }

    // Trigger celebration if reached target
    if (waterData.consumedMl + amount >= waterData.targetMl) {
      confetti({ particleCount: 80, spread: 60 });
      setReminderToast('🎉 Congratulations! You reached your daily hydration target of 2,500ml!');
    } else {
      setReminderToast(`💧 Logged +${amount}ml water intake! Stay refreshed while studying.`);
    }

    setTimeout(() => setReminderToast(null), 3500);
  };

  const handleResetWater = async () => {
    try {
      await fetch('/api/wellness/water/reset', { method: 'POST' });
    } catch {}
    setWaterData(prev => ({ ...prev, consumedMl: 0, history: [] }));
  };

  const handleTriggerReminderTest = () => {
    setReminderToast("⏰ Hydration & Focus Break: Time for a 250ml glass of water!");
    setTimeout(() => setReminderToast(null), 4000);
  };

  const progressPercent = Math.min(100, Math.round((waterData.consumedMl / waterData.targetMl) * 100));

  const handleCreateDeadlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddDeadline({
      title: newTitle,
      course: newCourse,
      dueMonth: newMonth,
      dueDay: Number(newDay),
      dateStr: `2026-${newMonth === 'OCT' ? '10' : '11'}-${newDay}`,
      priority: 'high',
      reminderSet: true,
      reminderTime: '10:00 AM'
    });
    setNewTitle('');
    setShowAddModal(false);
    setReminderToast('📅 New academic deadline & reminder added!');
    setTimeout(() => setReminderToast(null), 3000);
  };

  // Calendar days for October 2026
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Reminder Toast Alert */}
      {reminderToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#002868] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 animate-fadeIn">
          <Droplets className="w-5 h-5 text-sky-300 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{reminderToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Schedule, Reminders & Study Wellness
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage academic assignment timelines and sustain peak cognitive focus with hydration tracking.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'calendar' ? 'bg-white text-[#002868] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Academic Calendar
          </button>
          <button
            onClick={() => setActiveTab('hydration')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hydration' ? 'bg-[#002868] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>Water & Wellness Tracker</span>
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#BF0A30]" />
                <h2 className="text-lg font-bold text-slate-900">October 2026</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Deadline</span>
                </button>
              </div>
            </div>

            {/* Days Grid */}
            <div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 uppercase py-2 mb-1">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {/* 4 empty offset days for Oct 2026 (Thursday start) */}
                <div className="h-16 sm:h-20 p-1.5 rounded-xl bg-slate-50/50 border border-transparent opacity-40"></div>
                <div className="h-16 sm:h-20 p-1.5 rounded-xl bg-slate-50/50 border border-transparent opacity-40"></div>
                <div className="h-16 sm:h-20 p-1.5 rounded-xl bg-slate-50/50 border border-transparent opacity-40"></div>
                <div className="h-16 sm:h-20 p-1.5 rounded-xl bg-slate-50/50 border border-transparent opacity-40"></div>

                {calendarDays.map((day) => {
                  const hasDeadline = deadlines.find(d => d.dueDay === day);
                  const isToday = day === 12;
                  return (
                    <div
                      key={day}
                      className={`h-16 sm:h-20 p-2 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                        isToday 
                          ? 'bg-blue-50/60 border-[#002868] shadow-xs ring-1 ring-[#002868]' 
                          : hasDeadline 
                          ? 'bg-rose-50/50 border-rose-200' 
                          : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isToday ? 'text-[#002868]' : 'text-slate-700'}`}>
                          {day}
                        </span>
                        {isToday && (
                          <span className="text-[9px] bg-[#002868] text-white px-1 rounded font-semibold">Today</span>
                        )}
                      </div>

                      {hasDeadline && (
                        <div className={`p-1 rounded-md text-[10px] font-semibold truncate leading-none ${
                          hasDeadline.completed ? 'bg-slate-200 text-slate-500 line-through' : 'bg-[#BF0A30] text-white'
                        }`}>
                          {hasDeadline.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Deadlines & Tasks (1 Col) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">Active Deadlines</h3>
                <span className="text-xs font-bold text-[#BF0A30]">
                  {deadlines.filter(d => !d.completed).length} Pending
                </span>
              </div>

              <div className="space-y-3">
                {deadlines.map((dl) => (
                  <div
                    key={dl.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                      dl.completed ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200/80 shadow-2xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={dl.completed}
                      onChange={() => onToggleDeadline(dl.id)}
                      className="w-4 h-4 mt-1 rounded text-[#BF0A30] focus:ring-[#BF0A30] cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-semibold truncate ${dl.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {dl.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{dl.course}</p>
                      <div className="flex items-center gap-2 mt-2 text-[10px]">
                        <span className="font-bold text-[#002868] bg-slate-100 px-2 py-0.5 rounded">
                          {dl.dueMonth} {dl.dueDay}
                        </span>
                        {dl.reminderSet && (
                          <span className="text-slate-500 flex items-center gap-1">
                            <Bell className="w-3 h-3 text-amber-500" />
                            {dl.reminderTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Hydration Widget inside schedule view */}
            <div className="bg-gradient-to-br from-sky-900 to-[#002868] text-white rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                  <Droplets className="w-4 h-4" />
                  <span>Hydration Snapshot</span>
                </div>
                <span className="text-xs font-bold text-white/80">{progressPercent}% of Goal</span>
              </div>

              <div>
                <h4 className="text-2xl font-extrabold text-white">
                  {waterData.consumedMl} <span className="text-sm font-normal text-sky-200">/ {waterData.targetMl} ml</span>
                </h4>
                <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleLogWater(250)}
                  className="flex-1 bg-white text-[#002868] hover:bg-sky-50 text-xs font-bold py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  +250ml Glass
                </button>
                <button
                  onClick={() => setActiveTab('hydration')}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Full Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dedicated Water Intake & Reminders Screen */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                <Droplets className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Total Hydration Today</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                  {waterData.consumedMl} <span className="text-sm font-normal text-slate-400">ml</span>
                </h3>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Hydration Streak</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                  {waterData.streakDays} <span className="text-sm font-normal text-slate-400">Days</span>
                </h3>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Bell className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Active Reminders</p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  Every {waterData.reminderIntervalMinutes} mins
                </h3>
              </div>
            </div>
          </div>

          {/* Centerpiece Hydration Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Daily Water Intake Goal</h3>
                  <p className="text-xs text-slate-500">Target: {waterData.targetMl} ml per day for cognitive vitality</p>
                </div>
                <button
                  onClick={handleResetWater}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Today</span>
                </button>
              </div>

              {/* Progress Ring / Visualizer */}
              <div className="py-6 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden">
                <div className="relative w-44 h-44 rounded-full border-8 border-slate-200 flex flex-col items-center justify-center bg-white shadow-inner">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-sky-500 transition-all duration-700"
                    style={{ clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent * 2}% -50%, 100% 100%)` }}
                  />
                  <Droplets className="w-8 h-8 text-sky-500 animate-bounce mb-1" />
                  <span className="text-3xl font-extrabold text-slate-900">{progressPercent}%</span>
                  <span className="text-[11px] text-slate-400 font-medium">{waterData.consumedMl} / {waterData.targetMl} ml</span>
                </div>

                <p className="text-xs text-slate-500 mt-4 font-medium">
                  {waterData.consumedMl >= waterData.targetMl 
                    ? "✨ Daily target achieved! Excellent focus discipline." 
                    : `💧 Just ${waterData.targetMl - waterData.consumedMl}ml left to reach your daily goal!`}
                </p>
              </div>

              {/* Quick Log Buttons */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quick Intake Logger</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleLogWater(250)}
                    className="bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 py-3 rounded-2xl font-bold text-sm flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    <span>+250 ml</span>
                    <span className="text-[10px] font-normal text-sky-600">Standard Glass</span>
                  </button>
                  <button
                    onClick={() => handleLogWater(500)}
                    className="bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-2xl font-bold text-sm flex flex-col items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <span>+500 ml</span>
                    <span className="text-[10px] font-normal text-sky-100">Study Bottle</span>
                  </button>
                  <button
                    onClick={() => handleLogWater(750)}
                    className="bg-[#002868] hover:bg-[#003890] text-white py-3 rounded-2xl font-bold text-sm flex flex-col items-center justify-center shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <span>+750 ml</span>
                    <span className="text-[10px] font-normal text-slate-300">Large Flask</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reminder Settings & Intake History */}
            <div className="space-y-6">
              {/* Reminder Controls */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#BF0A30]" />
                    <h3 className="font-bold text-base text-slate-900">Study Reminders</h3>
                  </div>
                  <button
                    onClick={handleTriggerReminderTest}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Test Alert
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Automatic audio & in-app alerts prompt you to drink water and take cognitive stretch breaks every {waterData.reminderIntervalMinutes} minutes.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Audio Chime Alerts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#BF0A30] rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Desktop Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#BF0A30] rounded cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Intake Log History */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Today's Intake Log</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {waterData.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="font-semibold text-slate-700">{h.time}</span>
                      <span className="font-bold text-sky-600">+{h.amountMl} ml</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Deadline Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Academic Deadline & Reminder</h3>
            <form onSubmit={handleCreateDeadlineSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">Assignment / Quiz Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Municipal Budget Case Synthesis"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 mt-1 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Course</label>
                  <select
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full text-xs p-2.5 mt-1 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option>Civic Leadership</option>
                    <option>Urban Planning 101</option>
                    <option>Data Governance</option>
                    <option>Public Speaking</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Due Day (Oct)</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full text-xs p-2.5 mt-1 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#BF0A30] hover:bg-[#D7263D] text-white shadow-xs"
                >
                  Save Deadline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
