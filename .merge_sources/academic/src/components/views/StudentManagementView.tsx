import React, { useState, useMemo } from 'react';
import { Student } from '../../types';

interface StudentManagementViewProps {
  students: Student[];
  onOpenNewStudent: () => void;
  onSelectStudent: (student: Student) => void;
}

export const StudentManagementView: React.FC<StudentManagementViewProps> = ({
  students,
  onOpenNewStudent,
  onSelectStudent,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Absent' | 'Graduated'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesFilter = activeFilter === 'All' || s.status === activeFilter;
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.includes(searchQuery) ||
        (s.enrolledCourse && s.enrolledCourse.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.major && s.major.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [students, activeFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-[32px] sm:text-[38px] md:text-[48px] font-bold text-[#121C2A] tracking-tight leading-tight">
            Students
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#5B4040]/80 mt-1">
            Manage student records, attendance, and academic performance.
          </p>
        </div>

        <button
          onClick={onOpenNewStudent}
          id="new-student-btn"
          className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-95 text-white px-5 py-2.5 rounded-lg font-semibold text-[14px] shadow-xs transition-all duration-150 flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Student</span>
        </button>
      </div>

      {/* Mobile / Inline Search Input */}
      <div className="flex items-center bg-white rounded-lg border border-[#CBD5E1] focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#1D4ED8]/20 transition-all px-4 py-2.5 shadow-xs">
        <span className="material-symbols-outlined text-[#64748B] text-[20px] mr-2">search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search students by name, ID, major, or course..."
          className="w-full bg-transparent border-none outline-none text-[14px] text-[#121C2A] placeholder:text-[#64748B]/70"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs text-[#64748B] hover:text-[#121C2A]">
            ✕
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
        <span className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mr-2 hidden md:block">
          Filter By:
        </span>

        <button
          onClick={() => setActiveFilter('All')}
          className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
            activeFilter === 'All'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'bg-white text-[#121C2A] border border-[#CBD5E1] hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
          }`}
        >
          All ({students.length})
        </button>

        <button
          onClick={() => setActiveFilter('Active')}
          className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
            activeFilter === 'Active'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'bg-white text-[#121C2A] border border-[#CBD5E1] hover:border-[#16A34A] hover:text-[#16A34A]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
          Active ({students.filter(s => s.status === 'Active').length})
        </button>

        <button
          onClick={() => setActiveFilter('Absent')}
          className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
            activeFilter === 'Absent'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'bg-white text-[#121C2A] border border-[#CBD5E1] hover:border-[#F59E0B] hover:text-[#F59E0B]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
          Absent ({students.filter(s => s.status === 'Absent').length})
        </button>

        <button
          onClick={() => setActiveFilter('Graduated')}
          className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors flex items-center gap-1.5 ${
            activeFilter === 'Graduated'
              ? 'bg-[#002868] text-white shadow-xs'
              : 'bg-white text-[#121C2A] border border-[#CBD5E1] hover:border-[#64748B] hover:text-[#64748B]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#64748B]"></span>
          Graduated ({students.filter(s => s.status === 'Graduated').length})
        </button>
      </div>

      {/* Bento Grid / Student Cards Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => {
          const isGraduated = student.status === 'Graduated';
          const isAbsent = student.status === 'Absent';

          return (
            <div
              key={student.id}
              className={`bg-white rounded-xl border border-[#E2E8F0] p-6 hover:shadow-md transition-all duration-200 flex flex-col relative group ${
                isGraduated ? 'opacity-85' : ''
              }`}
            >
              {/* Status Badge in Top Right */}
              <div className="absolute top-6 right-6">
                {student.status === 'Active' && (
                  <span className="flex items-center gap-1.5 bg-[#16A34A]/10 text-[#16A34A] px-2.5 py-1 rounded-full text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                    Active
                  </span>
                )}
                {student.status === 'Absent' && (
                  <span className="flex items-center gap-1.5 bg-[#F59E0B]/10 text-[#F59E0B] px-2.5 py-1 rounded-full text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    Absent
                  </span>
                )}
                {student.status === 'Graduated' && (
                  <span className="flex items-center gap-1.5 bg-[#D9E3F6] text-[#5B4040] px-2.5 py-1 rounded-full text-[12px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B4040]"></span>
                    Graduated
                  </span>
                )}
              </div>

              {/* Student Avatar & Basic Info */}
              <div className="flex items-center gap-4 mb-6 pr-18">
                {student.avatarUrl ? (
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className={`w-16 h-16 rounded-lg object-cover border border-[#E2E8F0] shrink-0 ${
                      isGraduated ? 'grayscale' : ''
                    }`}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-[#002868] text-white flex items-center justify-center font-bold text-xl shrink-0">
                    {student.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-[#121C2A] mb-0.5 truncate">{student.name}</h3>
                  <p className="text-[12px] text-[#5B4040]/80 font-mono">ID: {student.studentId}</p>
                  <p className="text-[11px] text-[#1D4ED8] truncate mt-0.5">{student.enrolledCourse}</p>
                </div>
              </div>

              {/* Metrics Grid inside Card */}
              <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                  <p className="text-[12px] font-medium text-[#5B4040]/80 mb-0.5">
                    {isGraduated ? 'Final Attend.' : 'Attendance'}
                  </p>
                  <p className={`text-[20px] font-bold ${isAbsent ? 'text-[#F59E0B]' : 'text-[#121C2A]'}`}>
                    {student.attendanceRate}%
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-lg p-3 border border-[#E2E8F0]">
                  <p className="text-[12px] font-medium text-[#5B4040]/80 mb-0.5">
                    {isGraduated ? 'Final GPA' : 'Current GPA'}
                  </p>
                  <p className="text-[20px] font-bold text-[#121C2A]">{student.gpa.toFixed(1)}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectStudent(student)}
                className={`w-full py-2.5 rounded-lg font-semibold text-[14px] transition-colors ${
                  isGraduated
                    ? 'border border-[#CBD5E1] text-[#5B4040] hover:bg-[#F1F5F9]'
                    : 'border border-[#BF0A30] text-[#BF0A30] hover:bg-[#BF0A30] hover:text-white'
                }`}
              >
                {isGraduated ? 'View Records' : 'View Profile'}
              </button>
            </div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E2E8F0]">
          <p className="text-[16px] font-semibold text-[#121C2A]">No students found</p>
          <p className="text-[13px] text-[#64748B] mt-1">Try changing the search query or filter selection.</p>
        </div>
      )}
    </div>
  );
};
