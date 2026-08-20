import React from 'react';
import { ScreenType } from '../types';
import { GraduationCap, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';

interface CommunityRolesSectionProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CommunityRolesSection: React.FC<CommunityRolesSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="community-section"
      className="bg-[#002868] text-white rounded-2xl p-8 md:p-12 lg:p-14 flex flex-col gap-10 shadow-xl relative overflow-hidden border border-[#274484]"
    >
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#de2a43] rounded-full mix-blend-screen filter blur-3xl opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7792d7] rounded-full mix-blend-screen filter blur-3xl opacity-15 transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="text-center max-w-2xl mx-auto relative z-10">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#dae2ff] mb-2 bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
          Get Involved
        </span>
        <h2 className="text-3xl md:text-4xl font-black mb-3 text-white tracking-tight">
          Join Our Community
        </h2>
        <p className="text-base md:text-lg text-[#dae2ff] leading-relaxed">
          Be a part of a vibrant network of learners, mentors, community volunteers, and civic leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Student Role Card */}
        <div
          onClick={() => onNavigate('student-login')}
          className="bg-white text-[#121c2a] rounded-2xl p-7 flex flex-col items-center text-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer border border-[#c4c6d2]/30 group"
        >
          <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center group-hover:bg-[#ffdad9] transition-colors">
            <GraduationCap className="w-9 h-9 text-[#ba022d]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#00153e] group-hover:text-[#ba022d] transition-colors">
            Student
          </h3>
          <p className="text-sm text-[#444650] leading-relaxed flex-grow">
            Access learning resources, attend certified courses, join robotics & AI labs, and develop modern career skills.
          </p>
          <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002868] group-hover:text-[#ba022d] transition-colors pt-2">
            <span>Student Portal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Volunteer Role Card */}
        <div
          onClick={() => onNavigate('volunteer-login')}
          className="bg-white text-[#121c2a] rounded-2xl p-7 flex flex-col items-center text-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer border border-[#c4c6d2]/30 group"
        >
          <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center group-hover:bg-[#ffdad9] transition-colors">
            <HeartHandshake className="w-9 h-9 text-[#ba022d]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#00153e] group-hover:text-[#ba022d] transition-colors">
            Volunteer
          </h3>
          <p className="text-sm text-[#444650] leading-relaxed flex-grow">
            Contribute your time, facilitate workshops, guide peer English circles, and support community outreach projects.
          </p>
          <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002868] group-hover:text-[#ba022d] transition-colors pt-2">
            <span>Volunteer Portal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Admin Role Card */}
        <div
          onClick={() => onNavigate('admin-login')}
          className="bg-white text-[#121c2a] rounded-2xl p-7 flex flex-col items-center text-center gap-4 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer border border-[#c4c6d2]/30 group"
        >
          <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center group-hover:bg-[#ffdad9] transition-colors">
            <ShieldCheck className="w-9 h-9 text-[#ba022d]" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#00153e] group-hover:text-[#ba022d] transition-colors">
            Admin
          </h3>
          <p className="text-sm text-[#444650] leading-relaxed flex-grow">
            Manage programs, review applications, coordinate events, and oversee corner operations in Batticaloa.
          </p>
          <div className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002868] group-hover:text-[#ba022d] transition-colors pt-2">
            <span>Admin Console</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </section>
  );
};
