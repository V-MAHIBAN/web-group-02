import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (screen: ScreenType) => void;
}

const ABOUT_US_IMAGE = '/placeholder.jpg';

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-10 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Column: Image */}
        <div className="w-full relative group">
          <div className="overflow-hidden rounded-2xl border border-[#c4c6d2]/40 bg-white shadow-md">
            {imageError ? (
              <div className="flex h-[360px] w-full items-center justify-center rounded-2xl border border-dashed border-[#c4c6d2] bg-[#eef2f7] text-[#4b5563] md:h-[420px]">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">📷</div>
                  <p className="text-sm font-medium">Image unavailable</p>
                </div>
              </div>
            ) : (
              <img
                alt="American Corner exterior entrance"
                className="h-[360px] w-full rounded-2xl object-cover shadow-md transition-transform duration-500 group-hover:scale-105 bg-gray-200 md:h-[420px]"
                src={ABOUT_US_IMAGE}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <div className="absolute -bottom-4 -right-4 hidden lg:flex items-center gap-3 bg-white p-3.5 rounded-xl shadow-lg border border-[#c4c6d2]/50">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-[#002868]">Open to Public Mon - Sat</span>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col gap-5 justify-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-[#ba022d] rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#00153e] tracking-tight">
              About Us
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#444650] leading-relaxed">
            We are a dedicated space for learning and cultural connection, providing resources, programs, and networking opportunities to foster growth and mutual understanding within the community.
          </p>

          <div className="flex flex-col gap-4 mt-1 bg-[#eff4ff]/60 p-5 rounded-xl border border-[#d9e3f6]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ba022d]" />
                <h3 className="text-xs font-bold text-[#00153e] uppercase tracking-wider">
                  Vision
                </h3>
              </div>
              <p className="text-sm text-[#444650] pl-6 leading-relaxed">
                To be the premier space for innovation, cultural exchange, and lifelong learning in Batticaloa.
              </p>
            </div>

            <div className="flex flex-col gap-1 pt-2 border-t border-[#d9e3f6]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#002868]" />
                <h3 className="text-xs font-bold text-[#00153e] uppercase tracking-wider">
                  Mission
                </h3>
              </div>
              <p className="text-sm text-[#444650] pl-6 leading-relaxed">
                To provide access to high-quality educational resources, foster professional development, and strengthen the ties between the United States and Sri Lanka through collaborative programming.
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#c4c6d2] text-[#ba022d] hover:text-white font-semibold text-sm hover:bg-[#ba022d] hover:border-[#ba022d] transition-all shadow-sm group"
            >
              <span>Learn More About American Spaces</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
