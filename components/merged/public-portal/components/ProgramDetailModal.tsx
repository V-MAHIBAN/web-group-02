import React, { useState } from 'react';
import { Program, StudentApplication } from '../types';
import { StorageService } from '../services/storage';
import { X, Calendar, Clock, User, Award, CheckCircle2, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onSuccessApply?: (app: StudentApplication) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onSuccessApply
}) => {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentId, setStudentId] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!program) return null;

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setSubmitting(true);
    setTimeout(() => {
      const app = StorageService.submitApplication({
        studentId: studentId.trim() || undefined,
        fullName,
        email,
        phone,
        programId: program.id,
        programTitle: program.title,
        reason: reason || 'Excited to build practical skills in this program.'
      });

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}

      setSubmitting(false);
      setSubmitted(true);
      if (onSuccessApply) onSuccessApply(app);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c4c6d2] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-[#121c2a] hover:bg-[#ba022d] hover:text-white flex items-center justify-center transition-all shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header / Banner */}
        <div className="h-56 sm:h-64 w-full relative overflow-hidden border-t-4 border-[#00153e]">
          <img
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-8">
            <div>
              <span className="inline-block px-3 py-1 bg-[#ba022d] text-white text-xs font-bold uppercase rounded-full mb-2">
                {program.category === 'certificate' ? 'Certificate Program' : 'Thematic Series'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {program.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!showApplyForm ? (
            <div className="flex flex-col gap-6">
              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#eff4ff] p-4 rounded-xl border border-[#d9e3f6]">
                <div className="flex flex-col">
                  <span className="text-xs text-[#747781] font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#002868]" /> Duration
                  </span>
                  <span className="text-sm font-bold text-[#00153e] mt-0.5">{program.duration}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-[#747781] font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#002868]" /> Level
                  </span>
                  <span className="text-sm font-bold text-[#00153e] mt-0.5">{program.level || 'All Levels'}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-[#747781] font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#002868]" /> Status
                  </span>
                  <span className="text-sm font-bold text-emerald-600 mt-0.5">{program.status}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-[#747781] font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#002868]" /> Instructor
                  </span>
                  <span className="text-xs font-bold text-[#00153e] mt-0.5 truncate" title={program.instructor}>
                    {program.instructor ? program.instructor.split('(')[0] : 'ACB Lead Faculty'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-[#00153e] mb-2">Program Overview</h3>
                <p className="text-sm text-[#444650] leading-relaxed">
                  {program.description}
                </p>
                {program.schedule && (
                  <p className="text-sm text-[#002868] font-semibold mt-3 bg-blue-50/70 p-3 rounded-lg border border-blue-100 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#ba022d]" />
                    <span><strong>Schedule:</strong> {program.schedule}</span>
                  </p>
                )}
              </div>

              {/* Topics Breakdown */}
              {program.topics && program.topics.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-[#00153e] mb-3">Curriculum & Focus Areas</h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {program.topics.map((topic, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-[#f8f9ff] p-3 rounded-lg border border-[#e6eeff]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#121c2a]">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {program.prerequisites && program.prerequisites.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#747781] uppercase tracking-wider mb-2">Prerequisites & Eligibility</h3>
                  <ul className="list-disc list-inside text-sm text-[#444650] space-y-1">
                    {program.prerequisites.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#c4c6d2]/40">
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="flex-1 py-3 px-6 rounded-lg bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enroll / Apply for Free</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-lg border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 font-semibold text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              {submitted ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#00153e]">Application Submitted!</h3>
                  <p className="text-sm text-[#444650] max-w-md">
                    Thank you for applying to <strong>{program.title}</strong>. Your application has been logged with the ACB coordinator. You will receive an orientation notification via email and SMS.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-lg bg-[#00153e] hover:bg-[#ba022d] text-white font-semibold text-sm transition-all"
                    >
                      Back to Programs
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#c4c6d2]/40">
                    <div>
                      <h3 className="text-xl font-bold text-[#00153e]">Student Application Form</h3>
                      <p className="text-xs text-[#747781]">Applying for: <strong>{program.title}</strong></p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="text-xs text-[#ba022d] hover:underline font-semibold"
                    >
                      &larr; View Details
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. S. Dharshan"
                        className="w-full bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg px-3.5 py-2.5 text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dharshan@example.com"
                        className="w-full bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg px-3.5 py-2.5 text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0771234567"
                        className="w-full bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg px-3.5 py-2.5 text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                        ACB Student ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. ACB-STU-2024-..."
                        className="w-full bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg px-3.5 py-2.5 text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                      Why do you want to join this program? (Brief Motivation)
                    </label>
                    <textarea
                      rows={3}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Share your goals and what you hope to achieve..."
                      className="w-full bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg p-3 text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none resize-y"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 rounded-lg bg-[#002868] hover:bg-[#ba022d] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Free Enrollment</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="py-3 px-5 rounded-lg border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
