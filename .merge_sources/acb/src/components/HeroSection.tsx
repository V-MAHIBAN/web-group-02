import React from 'react';
import { ScreenType } from '../types';
import { HERO_IMAGES } from '../data/mockData';
import { ArrowRight, Sparkles, Users } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (screen: ScreenType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center bg-white rounded-2xl overflow-hidden shadow-[0px_2px_4px_rgba(0,0,0,0.05)] border border-[#c4c6d2]/30">
      <div className="md:col-span-5 p-6 md:p-10 lg:p-12 flex flex-col gap-6 justify-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] text-[#002868] rounded-full text-xs font-bold uppercase tracking-wider w-fit">
          <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
          <span>American Spaces Network</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#00153e] tracking-tight leading-[1.15]">
          Empowering Minds, Building Community
        </h1>

        <p className="text-base sm:text-lg text-[#444650] leading-relaxed">
          The American Corner Batticaloa is your gateway to learning, cultural exchange, and professional development in a modern, welcoming environment.
        </p>

        <div className="flex flex-wrap gap-3.5 pt-2">
          <button
            onClick={() => onNavigate('programs')}
            className="px-6 py-3 rounded-lg bg-[#00153e] text-white hover:bg-[#ba022d] font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 group transform hover:-translate-y-0.5"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('community-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-lg bg-[#ba022d] text-white hover:bg-[#de2a43] font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4" />
            <span>Join Our Community</span>
          </button>
        </div>
      </div>

      <div className="md:col-span-7 h-72 md:h-[480px] lg:h-[520px] relative overflow-hidden">
        <img
          alt="A professional, high-quality photograph of a modern classroom at the American Corner Batticaloa."
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          src={HERO_IMAGES.classroom}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
