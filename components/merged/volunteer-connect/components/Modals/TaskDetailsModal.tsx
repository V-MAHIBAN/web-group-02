import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, User, Mail, Phone, CheckCircle, Award, AlertCircle, Share2 } from 'lucide-react';
import { Task } from '../../types';

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleEnroll: (taskId: string) => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  isOpen,
  onClose,
  onToggleEnroll,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !task) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header Banner */}
        <div className="bg-[#002868] text-white p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                task.status === 'upcoming' 
                  ? 'bg-blue-100 text-[#002868]' 
                  : task.status === 'completed' 
                  ? 'bg-green-100 text-[#16A34A]' 
                  : 'bg-amber-100 text-[#F59E0B]'
              }`}>
                {task.status.toUpperCase()}
              </span>
              <h2 className="text-xl font-bold leading-tight">{task.title}</h2>
              <p className="text-xs text-blue-100 mt-1">{task.organization || 'Volunteer Impact Network'}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Quick Details Badges */}
          <div className="grid grid-cols-2 gap-3 bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Calendar className="w-4 h-4 text-[#002868] shrink-0" />
              <div>
                <p className="font-semibold text-[#1F2937]">{task.formattedDate}</p>
                <p className="text-[11px] text-slate-500">{task.timeRange}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-[#002868] shrink-0" />
              <div>
                <p className="font-semibold text-[#1F2937]">{task.location}</p>
                <p className="text-[11px] text-slate-500">{task.category}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">About This Opportunity</h4>
            <p className="text-sm text-[#1F2937] leading-relaxed bg-[#FFFFFF] p-3 rounded-lg border border-slate-200">
              {task.description}
            </p>
          </div>

          {/* Volunteer Coordinator */}
          {task.coordinator && (
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
              <h4 className="text-xs font-bold text-[#002868] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#002868]" /> Event Coordinator
              </h4>
              <p className="font-medium text-sm text-[#1F2937]">{task.coordinator.name}</p>
              <div className="flex flex-col sm:flex-row gap-2 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#002868]" /> {task.coordinator.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#002868]" /> {task.coordinator.phone}
                </span>
              </div>
            </div>
          )}

          {/* Guidelines info */}
          <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-[#F8FAFC] p-3 rounded-lg border border-slate-200">
            <AlertCircle className="w-4 h-4 text-[#002868] shrink-0 mt-0.5" />
            <p>
              Please arrive 10 minutes prior to shift start for orientation and check-in. Wear comfortable, weather-appropriate clothing.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F8FAFC] border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-white border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#002868]" />
            {copied ? 'Link Copied!' : 'Share'}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onToggleEnroll(task.id);
                onClose();
              }}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                task.enrolled
                  ? 'bg-[#DC2626] hover:bg-red-700 text-white'
                  : 'bg-[#BF0A30] hover:bg-[#D7263D] text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {task.enrolled ? 'Leave Shift' : 'Sign Up for Shift'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
