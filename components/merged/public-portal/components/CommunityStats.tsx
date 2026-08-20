import React from 'react';
import { GraduationCap, HeartHandshake, BookOpenCheck, Award } from 'lucide-react';

export const CommunityStats: React.FC = () => {
  const stats = [
    {
      icon: GraduationCap,
      value: '500+',
      label: 'Students Reached',
      accentColor: 'text-[#ba022d]'
    },
    {
      icon: HeartHandshake,
      value: '20+',
      label: 'Active Volunteers',
      accentColor: 'text-[#ba022d]'
    },
    {
      icon: BookOpenCheck,
      value: '25+',
      label: 'Programs Offered',
      accentColor: 'text-[#ba022d]'
    },
    {
      icon: Award,
      value: '5+',
      label: 'Years of Excellence',
      accentColor: 'text-[#ba022d]'
    }
  ];

  return (
    <section className="bg-[#eff4ff] rounded-2xl p-8 md:p-12 flex flex-col gap-8 shadow-sm border border-[#d9e3f6]">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#00153e] mb-2 tracking-tight">
          Empowering Our Community
        </h2>
        <p className="text-sm md:text-base text-[#444650] leading-relaxed">
          Empowering the Eastern Province through dedicated public service, tech literacy, and educational excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl flex flex-col items-center text-center gap-2 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-[#c4c6d2]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-[#f8f9ff] flex items-center justify-center mb-1 group-hover:bg-[#ffdad9]/40 transition-colors">
                <Icon className={`w-7 h-7 ${stat.accentColor}`} />
              </div>
              <span className="text-3xl lg:text-4xl font-black text-[#002868] tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#444650]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
