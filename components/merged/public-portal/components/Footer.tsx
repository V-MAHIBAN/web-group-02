import React from 'react';
import { ScreenType } from '../types';
import { LOGOS, CONTACT_INFO } from '../data/mockData';
import { Mail, Share2, Globe, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <>
      {/* Embassy Acknowledgement Section */}
      <section className="border-t border-[#c4c6d2]/30 bg-[#f5f7fb] py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 text-center md:px-8">
          <img
            src={LOGOS.usEmbassySealFooter}
            alt="U.S. Embassy Logo"
            className="h-24 w-auto object-contain opacity-90 transition-all duration-300 hover:scale-105 md:h-28"
          />
          <div className="flex flex-col items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4a4d59] md:text-[12px]">
              Thank you for the support of the
            </p>
            <h3 className="text-[2.05rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#00153e] md:text-[4rem]">
              U.S. Embassy Sri Lanka
            </h3>
          </div>
        </div>
      </section>

      {/* Main Global Footer */}
      <footer className="mt-auto w-full bg-[#00153e] text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-[1.1fr_1fr_1fr_1.2fr] md:px-10 md:py-14">
          {/* Brand Column */}
          <div className="flex items-start gap-4 md:pt-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[1.5rem] font-bold text-[#00153e] shadow-sm">
              N
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xl font-bold tracking-tight text-white md:text-2xl">
                American Corner Batticaloa
              </span>
              <p className="text-sm leading-relaxed text-[#c4c6d2]">
                Empowering the Eastern Province community through accessible education, culture, STEM innovation, and global connections.
              </p>
              <div className="pt-2 text-xs text-[#b1c5ff]/80">
                <p>Public Library Complex</p>
                <p>Batticaloa, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col gap-3 md:pt-3">
            <h4 className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-white">Explore</h4>
            <button
              onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              About Us
            </button>
            <button
              onClick={() => { onNavigate('programs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              Programs & Workshops
            </button>
            <button
              onClick={() => { onNavigate('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              Photo Gallery
            </button>
            <button
              onClick={() => { onNavigate('student-login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              Student Portal
            </button>
            <button
              onClick={() => { onNavigate('volunteer-login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              Volunteer Portal
            </button>
          </div>

          {/* Support & Legal Column */}
          <div className="flex flex-col gap-3 md:pt-3">
            <h4 className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-white">Support & Portals</h4>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              Contact & Inquiries
            </button>
            <button
              onClick={() => { onNavigate('admin-login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              Admin Portal
            </button>
            <a
              href="https://lk.usembassy.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-left text-sm text-[#c4c6d2] transition-colors hover:text-[#ffdad9]"
            >
              <span>U.S. Embassy Colombo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="cursor-pointer text-sm text-[#c4c6d2]/70 transition-colors hover:text-white">
              Privacy Policy
            </span>
            <span className="cursor-pointer text-sm text-[#c4c6d2]/70 transition-colors hover:text-white">
              Terms of Service
            </span>
          </div>

          {/* Connect Column */}
          <div className="flex flex-col gap-3 md:pt-3">
            <h4 className="mb-1 text-sm font-bold uppercase tracking-[0.18em] text-white">Connect</h4>
            <p className="text-xs leading-relaxed text-[#c4c6d2]">
              Follow our social channels and stay updated on free educational programs.
            </p>
            <div className="mt-2 flex gap-2.5">
              {/* X / Twitter */}
              <a
                href={CONTACT_INFO.social.x}
                target="_blank"
                rel="noopener noreferrer"
                title="X / Twitter"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ba022d] transition-all text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ba022d] transition-all text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                title="Send Email"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ba022d] transition-all text-white"
              >
                <Mail className="w-4 h-4" />
              </a>

              {/* Web / Share */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'American Corner Batticaloa',
                      text: 'Empowering Minds, Building Community at American Corner Batticaloa',
                      url: window.location.href
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Page link copied to clipboard!');
                  }
                }}
                title="Share Website"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#ba022d] transition-all text-white"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="border-t border-white/10 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-[#c4c6d2]">
            <span>© 2024–2026 American Corner Batticaloa. All rights reserved.</span>
            <span className="mt-1 sm:mt-0 text-[#b1c5ff]">Supported by the U.S. Embassy Sri Lanka</span>
          </div>
        </div>
      </footer>
    </>
  );
};
