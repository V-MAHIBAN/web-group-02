import React, { useState } from 'react';
import { 
  X, 
  Play, 
  CheckCircle2, 
  Circle, 
  FileText, 
  BookOpen, 
  Clock, 
  Award, 
  Sparkles,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Course } from '../types';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onUpdateCourseProgress: (courseId: string, progress: number) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onUpdateCourseProgress
}) => {
  if (!course) return null;

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [userNotes, setUserNotes] = useState('');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const activeModule = course.syllabus[activeModuleIndex] || course.syllabus[0];

  const handleMarkCompleted = (index: number) => {
    const updatedSyllabus = [...course.syllabus];
    updatedSyllabus[index].completed = true;
    const completedCount = updatedSyllabus.filter(m => m.completed).length;
    const newProgress = Math.round((completedCount / updatedSyllabus.length) * 100);
    onUpdateCourseProgress(course.id, newProgress);

    if (newProgress === 100) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowCertificate(true);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    // Option 1 is correct for simulation
    const correct = selectedQuizOption === 1;
    setIsQuizCorrect(correct);
    if (correct) {
      handleMarkCompleted(activeModuleIndex);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#002868] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BF0A30] flex items-center justify-center text-white font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold leading-tight truncate text-white">
                {course.title}
              </h2>
              <p className="text-xs text-slate-300">
                Instructor: {course.instructor} • {course.progress}% Completed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body: 2 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          {/* Main Interactive Player Area (2 cols) */}
          <div className="lg:col-span-2 p-6 overflow-y-auto space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
            {/* Header of Active Module */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase bg-blue-50 text-blue-700 rounded-md">
                  Module {activeModuleIndex + 1}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activeModule.duration}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {activeModule.title}
              </h3>
            </div>

            {/* Interactive Simulation / Video Stage */}
            <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-inner min-h-[220px] flex flex-col justify-between">
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Civic Scenario</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Case Study: Cross-Agency Emergency Resource Allocation
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  Analyze municipal coordination protocols between local healthcare networks, transit authorities, and emergency response teams during rapid weather disruptions.
                </p>
              </div>

              <div className="pt-6 relative z-10 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleMarkCompleted(activeModuleIndex)}
                  className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-95 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{activeModule.completed ? 'Completed' : 'Mark Module Complete'}</span>
                </button>
              </div>
            </div>

            {/* Formative Quick Check / Quiz */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#002868]" />
                <span>Knowledge Check: Civic Decision Making</span>
              </h4>
              <p className="text-xs text-slate-600">
                What is the foundational requirement before issuing municipal emergency directives to regional transport agencies?
              </p>

              <div className="space-y-2">
                {[
                  "Unilateral authorization without logging audit trails",
                  "Establishing a unified command protocol with verified stakeholder communications",
                  "Waiting for next business quarter fiscal review"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedQuizOption(idx);
                      setQuizSubmitted(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      selectedQuizOption === idx 
                        ? 'bg-[#002868] text-white border-[#002868] font-semibold' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}) {opt}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleQuizSubmit}
                  disabled={selectedQuizOption === null}
                  className="bg-[#002868] hover:bg-[#003890] disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Submit Check
                </button>

                {quizSubmitted && (
                  <span className={`text-xs font-bold flex items-center gap-1 ${
                    isQuizCorrect ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {isQuizCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Correct! Module updated.
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4" /> Try again (Review Option B).
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Note Taking Pad */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Personal Study Notes & Key Takeaways</label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Type personal reflections, civic references, and assignment ideas here..."
                rows={3}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
              />
            </div>
          </div>

          {/* Right Sidebar: Syllabus Breakdown */}
          <div className="p-5 bg-slate-50/80 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h4 className="font-bold text-sm text-slate-900">Course Syllabus</h4>
                <span className="text-xs font-bold text-[#BF0A30]">
                  {course.syllabus.filter(s => s.completed).length}/{course.syllabus.length} Done
                </span>
              </div>

              <div className="space-y-2">
                {course.syllabus.map((item, idx) => {
                  const isCurrent = idx === activeModuleIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveModuleIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                        isCurrent 
                          ? 'bg-white border-[#002868] shadow-xs' 
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="mt-0.5">
                        {item.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold leading-snug truncate ${isCurrent ? 'text-[#002868]' : 'text-slate-800'}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.type.toUpperCase()} • {item.duration}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Certificate Widget */}
            <div className="pt-6 mt-6 border-t border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-xs text-slate-900">Certificate of Completion</h5>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Complete all modules to unlock your accredited certificate.
                </p>
              </div>
              <button
                disabled={course.progress < 100}
                onClick={() => {
                  confetti({ particleCount: 100, spread: 60 });
                  alert(`Certificate for "${course.title}" issued to Sarah Jenkins!`);
                }}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  course.progress >= 100 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {course.progress >= 100 ? '🎉 Download Certificate' : 'Locked (Requires 100%)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
