import React, { useState } from 'react';
import { DataService } from '../../services/api';
import { playSound } from '../../utils/sound';

interface BroadcastAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const BroadcastAlertModal: React.FC<BroadcastAlertModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('Campus Weather & Entry Notice');
  const [message, setMessage] = useState('All faculty and students please note Main Gate 2 is temporarily reserved for campus shuttle access.');
  const [targetGroup, setTargetGroup] = useState('All Staff & Faculty');
  const [severity, setSeverity] = useState<'high' | 'warning' | 'info'>('warning');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    DataService.broadcastAlert(title, message, targetGroup, severity);
    playSound('alert');
    setIsSent(true);
    onSuccess();
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#BF0A30] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <span className="material-symbols-outlined text-[22px]">campaign</span>
            </div>
            <div>
              <h3 className="font-bold text-[18px]">Broadcast Campus Alert</h3>
              <p className="text-[12px] text-white/80">Send immediate notifications to staff, security, or students</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
              Alert Headline / Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Science Wing Gate Inspection"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A] focus:border-[#BF0A30] focus:ring-2 focus:ring-[#BF0A30]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Target Group
              </label>
              <select
                value={targetGroup}
                onChange={e => setTargetGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              >
                <option value="All Staff & Faculty">All Staff & Faculty</option>
                <option value="Campus Security & Gates">Campus Security & Gates</option>
                <option value="Senior Class (Grade 12)">Senior Class (Grade 12)</option>
                <option value="Junior Class (Grade 11)">Junior Class (Grade 11)</option>
                <option value="All Enrolled Students">All Enrolled Students</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
                Priority Level
              </label>
              <select
                value={severity}
                onChange={e => setSeverity(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A]"
              >
                <option value="high">High Priority (Red Alert)</option>
                <option value="warning">Warning / Operational</option>
                <option value="info">Informational Note</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-[#121C2A] mb-1.5">
              Alert Message Content
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter detailed broadcast instructions..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#CBD5E1] text-[14px] text-[#121C2A] focus:border-[#BF0A30] focus:ring-2 focus:ring-[#BF0A30]/20"
            />
          </div>

          {isSent && (
            <div className="p-3 bg-[#16A34A]/10 text-[#16A34A] rounded-lg text-[13px] font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Broadcast transmitted successfully to all active stations!
            </div>
          )}

          {/* Footer actions */}
          <div className="pt-3 border-t border-[#E2E8F0] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[14px] font-medium text-[#64748B] hover:text-[#121C2A] hover:bg-[#E2E8F0]/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg font-semibold text-[14px] shadow-xs transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Broadcast Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
