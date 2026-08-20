import React, { useState } from 'react';
import { X, Clock, Calendar, Tag, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HourEntry } from '../../types';

interface LogHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogHours: (entry: Omit<HourEntry, 'id' | 'status'>) => void;
}

export const LogHoursModal: React.FC<LogHoursModalProps> = ({
  isOpen,
  onClose,
  onLogHours,
}) => {
  const [project, setProject] = useState('Community Garden Cleanup');
  const [hours, setHours] = useState<number>(3.5);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('Environment');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#BF0A30', '#002868', '#16A34A', '#F59E0B'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      // Format date
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      onLogHours({
        date: formattedDate,
        project,
        hours: Number(hours),
        category,
        notes,
      });

      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-[#002868] text-white px-6 py-4 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Log Volunteer Hours</h3>
              <p className="text-xs text-blue-100">Record your community contribution & earn verified impact</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Project / Opportunity
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="w-full bg-[#F8FAFC] border-2 border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none transition-colors"
              required
            >
              <option value="Community Garden Cleanup">Community Garden Cleanup</option>
              <option value="Food Bank Distribution">Food Bank Distribution</option>
              <option value="Senior Center Tech Support">Senior Center Tech Support</option>
              <option value="Youth Mentorship Reading">Youth Mentorship Reading</option>
              <option value="Winter Coat Drive Sorting">Winter Coat Drive Sorting</option>
              <option value="Park Trail Maintenance">Park Trail Maintenance</option>
              <option value="Animal Shelter Dog Walking">Animal Shelter Dog Walking</option>
              <option value="Independent Community Action">Independent Community Action</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Hours Contributed
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  value={hours}
                  onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#F8FAFC] border-2 border-slate-300 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none transition-colors"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
                  hrs
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Date Completed
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#F8FAFC] border-2 border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Impact Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {['Environment', 'Food Security', 'Senior Care', 'Education', 'Community'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#002868] text-white border-[#002868] shadow-xs font-semibold'
                      : 'bg-[#F8FAFC] text-[#1F2937] border-slate-300 hover:border-[#002868]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Activity Summary & Impact Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Briefly describe what tasks you completed and key milestones..."
              className="w-full bg-[#F8FAFC] border-2 border-slate-300 rounded-lg p-3 text-sm text-[#1F2937] focus:border-[#002868] focus:outline-none transition-colors resize-none placeholder:text-slate-400"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || hours <= 0}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#BF0A30] hover:bg-[#D7263D] rounded-lg shadow-md transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Submit Hours for Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
