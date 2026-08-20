import React from 'react';
import { ScreenType } from '../types';
import { HERO_IMAGES, LOGOS } from '../data/mockData';
import { AboutSection } from './AboutSection';
import { CommunityStats } from './CommunityStats';
import { Sparkles, Globe, BookOpen, Users, Award, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const pillars = [
    {
      icon: BookOpen,
      title: 'English Language Learning',
      desc: 'Weekly English Cafes, DynEd multimedia labs, and visiting English Language Fellows supporting students and teachers.'
    },
    {
      icon: Globe,
      title: 'EducationUSA Advising',
      desc: 'Free and authentic educational counseling for students seeking undergraduate and graduate degrees in the United States.'
    },
    {
      icon: Users,
      title: 'Youth & Leadership Development',
      desc: 'Public speaking, model UN simulations, democratic civic engagement, and community volunteer service.'
    },
    {
      icon: Award,
      title: 'STEM & Digital Skills',
      desc: 'Modern web development, AI chatbot programming, robotics prototyping, and digital media tools.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 flex flex-col gap-12">
      {/* About Header */}
      <section className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] text-[#002868] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
          <span>American Spaces Sri Lanka</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#00153e] mb-4 tracking-tight">
          About American Corner Batticaloa
        </h1>
        <p className="text-base sm:text-lg text-[#444650] leading-relaxed">
          Operating as part of the worldwide network of over 600 American Spaces, American Corner Batticaloa provides free educational resources, cultural exchange programs, and digital skill building.
        </p>
      </section>

      {/* Main About Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* Community Stats */}
      <CommunityStats />

      {/* 4 Core Pillars */}
      <section className="py-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#00153e] mb-2 tracking-tight">
            Our Four Core Pillars
          </h2>
          <p className="text-sm md:text-base text-[#444650]">
            Every program conducted at the American Corner Batticaloa aligns with one of our strategic focus areas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#d9e3f6] shadow-sm hover:shadow-lg transition-all flex flex-col gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#002868] group-hover:bg-[#ffdad9] group-hover:text-[#ba022d] flex items-center justify-center transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#00153e]">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#444650] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Embassy Partnership Banner */}
      <section className="bg-gradient-to-r from-[#00153e] to-[#002868] text-white rounded-2xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-[#274484]">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#dae2ff]">
            Public Diplomacy & Cultural Cooperation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Supported by the U.S. Embassy in Sri Lanka
          </h2>
          <p className="text-sm text-[#dae2ff] leading-relaxed">
            All programs, books, and high-speed internet facilities at the Corner are provided free of charge to the public through the support of the American people.
          </p>
        </div>

        <button
          onClick={() => onNavigate('programs')}
          className="px-6 py-3 bg-[#ba022d] hover:bg-[#de2a43] text-white font-bold text-sm rounded-lg shadow-md transition-all whitespace-nowrap flex items-center gap-2"
        >
          <span>Explore All Free Programs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
