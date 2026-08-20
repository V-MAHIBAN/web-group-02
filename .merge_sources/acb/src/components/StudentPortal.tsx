import React, { useState } from 'react';
import { ScreenType, UserSession, StudentApplication, Program } from '../types';
import { StorageService } from '../services/storage';
import { BookOpen, Calendar, Award, Clock, Download, CheckCircle, Bell, ArrowRight, User, Sparkles } from 'lucide-react';

interface StudentPortalProps {
  session: UserSession;
  onNavigate: (screen: ScreenType) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ session, onNavigate }) => {
  const [applications] = useState<StudentApplication[]>(() => StorageService.getApplications());
  const [announcements] = useState(() => StorageService.getAnnouncements().filter(a => a.targetAudience === 'all' || a.targetAudience === 'students'));
  const [programs] = useState<Program[]>(() => StorageService.getPrograms());

  const myApplications = applications.filter(a => 
    (a.studentId && a.studentId.toLowerCase() === (session.memberId || '').toLowerCase()) ||
    a.email.toLowerCase() === session.email.toLowerCase() ||
    session.userId === 'ACB-STU-2024-042'
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-8">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-[#00153e] via-[#002868] to-[#1a3d82] text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-[#274484]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#ba022d] text-white font-bold px-2.5 py-0.5 rounded-full">
                Active Student
              </span>
              <span className="text-xs text-[#dae2ff] font-mono">
                {session.memberId || 'ACB-STU-2024-042'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
              Welcome, {session.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#dae2ff] mt-0.5">
              Eastern Province Youth Empowerment & Learning Cohort 2025
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('programs')}
            className="px-4 py-2.5 bg-[#ba022d] hover:bg-[#de2a43] text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Browse More Courses</span>
          </button>
        </div>
      </div>

      {/* Announcements Notification Banner */}
      {announcements.length > 0 && (
        <div className="bg-[#eff4ff] border border-[#d9e3f6] rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <Bell className="w-5 h-5 text-[#ba022d] flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#002868]">
              Corner Announcement ({announcements[0].date})
            </h4>
            <p className="text-sm font-semibold text-[#121c2a] mt-0.5">
              {announcements[0].title}
            </p>
            <p className="text-xs text-[#444650] mt-1">
              {announcements[0].content}
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: My Programs & Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: My Active Courses & Enrolled Programs */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#00153e] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#ba022d]" />
              <span>My Enrolled Courses & Applications</span>
            </h2>
            <span className="text-xs text-[#747781] font-semibold">
              {myApplications.length} Course{myApplications.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-4">
            {myApplications.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl p-5 border border-[#c4c6d2]/40 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#002868] uppercase bg-[#eff4ff] px-2.5 py-0.5 rounded">
                      {app.programTitle}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#00153e] mt-1">
                    {app.programTitle} - Batch 05
                  </h3>
                  <p className="text-xs text-[#747781] flex items-center gap-2">
                    <span>Applied on: {app.appliedDate}</span>
                    <span>•</span>
                    <span>Saturdays 9:30 AM - 12:30 PM</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => onNavigate('programs')}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#00153e] hover:bg-[#ba022d] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    View Syllabus
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Learning Materials & Downloads */}
          <div className="bg-white rounded-xl p-6 border border-[#c4c6d2]/40 shadow-sm">
            <h3 className="text-base font-bold text-[#00153e] mb-4 flex items-center gap-2">
              <Download className="w-4 h-4 text-[#ba022d]" />
              <span>Recommended Study Guides & Resources</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e6eeff] flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-[#00153e]">Web Dev Week 1-4 Cheatsheet</h4>
                  <p className="text-[11px] text-[#747781]">PDF • 3.2 MB • American Corner Lab</p>
                </div>
                <button
                  onClick={() => alert('Downloading official student course handbook...')}
                  className="p-2 bg-white hover:bg-[#00153e] hover:text-white rounded-md border border-[#c4c6d2]/40 text-[#002868] transition-colors"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 bg-[#f8f9ff] rounded-lg border border-[#e6eeff] flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-[#00153e]">DynEd English Level 2 Guide</h4>
                  <p className="text-[11px] text-[#747781]">PDF • 1.8 MB • Language Fellow</p>
                </div>
                <button
                  onClick={() => alert('Downloading English language study material...')}
                  className="p-2 bg-white hover:bg-[#00153e] hover:text-white rounded-md border border-[#c4c6d2]/40 text-[#002868] transition-colors"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Progress, Certificate Status, Corner Hours */}
        <div className="flex flex-col gap-6">
          {/* Certificate Tracker */}
          <div className="bg-white rounded-xl p-6 border border-[#c4c6d2]/40 shadow-sm">
            <h3 className="text-base font-bold text-[#00153e] mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ba022d]" />
              <span>Certificate Progress</span>
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#00153e]">Attendance (85% required)</span>
                  <span className="text-emerald-600">92% Completed</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-[#00153e]">Lab Project Milestones</span>
                  <span className="text-[#002868]">3 of 4 Submitted</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#002868] h-2 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#d9e3f6] text-xs text-[#444650]">
                <p className="font-semibold text-[#002868] flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>On track for Graduation Ceremony!</span>
                </p>
                <p className="mt-1 text-[11px]">Certificates are officially endorsed by U.S. Embassy Sri Lanka.</p>
              </div>
            </div>
          </div>

          {/* EducationUSA Advising Box */}
          <div className="bg-gradient-to-br from-[#00153e] to-[#002868] text-white rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-white mb-2">
              EducationUSA Advising
            </h3>
            <p className="text-xs text-[#dae2ff] leading-relaxed mb-4">
              Get free, unbiased guidance on U.S. higher education admissions, GRE/TOEFL prep materials, and scholarships.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-2 bg-white hover:bg-[#ffdad9] text-[#00153e] font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Book Advising Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
