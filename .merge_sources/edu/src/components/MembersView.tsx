import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Mail, 
  BookOpen, 
  CheckCircle, 
  ShieldCheck, 
  UserCheck, 
  GraduationCap,
  HeartHandshake
} from 'lucide-react';
import { Member } from '../types';
import { INITIAL_MEMBERS } from '../data/mockData';

export const MembersView: React.FC = () => {
  const [members] = useState<Member[]>(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [contactedMember, setContactedMember] = useState<string | null>(null);

  const roles = ['All', 'Student', 'Faculty', 'Volunteer', 'Staff'];

  const filteredMembers = members.filter(m => {
    const matchesRole = selectedRole === 'All' || m.role === selectedRole;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleContact = (name: string) => {
    setContactedMember(name);
    setTimeout(() => setContactedMember(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Contact alert */}
      {contactedMember && (
        <div className="fixed top-6 right-6 z-50 bg-[#002868] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 animate-fadeIn">
          <Mail className="w-5 h-5 text-amber-300" />
          <span className="text-xs sm:text-sm font-semibold">Direct message thread initiated with {contactedMember}!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Members & Faculty Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Connect with students, civic fellows, faculty advisors, and outreach volunteers.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] w-64 shadow-2xs"
          />
        </div>
      </div>

      {/* Role Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRole(r)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedRole === r
                ? 'bg-[#002868] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                    member.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'
                  }`} />
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                  member.role === 'Student'
                    ? 'bg-blue-50 text-blue-700'
                    : member.role === 'Faculty'
                    ? 'bg-purple-50 text-purple-700'
                    : member.role === 'Staff'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}>
                  {member.role}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{member.department}</p>
                <p className="text-xs text-slate-400 font-mono mt-1 truncate">{member.email}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  {member.coursesCount} Active Courses
                </span>
                <span>Joined {member.joinedDate}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => handleContact(member.name)}
                className="w-full bg-slate-50 hover:bg-[#002868] hover:text-white text-slate-700 text-xs font-semibold py-2.5 rounded-xl border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Message Member</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
