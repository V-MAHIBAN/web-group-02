'use client';

import React from 'react';
import { ScreenType } from '../types';
import { LOGOS } from '../data/mockData';
import { GraduationCap, HeartHandshake, ShieldCheck, Briefcase, ArrowRight } from 'lucide-react';
import type { PortalWorkspace } from '../../portal/UnifiedPortalShell';

interface DashboardSelectionProps {
  onNavigate: (screen: ScreenType) => void;
  onSelectPortal: (workspace: PortalWorkspace) => void;
}

export const DashboardSelection: React.FC<DashboardSelectionProps> = ({ onNavigate, onSelectPortal }) => {
  const dashboards = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access learning resources, attend certified courses, join robotics & AI labs, and develop modern career skills.',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      onSelect: () => onSelectPortal('academic')
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Contribute your time, facilitate workshops, guide peer English circles, and support community outreach projects.',
      icon: HeartHandshake,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      borderColor: 'border-rose-200',
      onSelect: () => onSelectPortal('volunteer')
    },
    {
      id: 'staff',
      title: 'Staff',
      description: 'Manage programs, coordinate events, oversee operations, and access administrative tools for the American Corner.',
      icon: Briefcase,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      onSelect: () => onSelectPortal('academic')
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Review applications, manage programs, coordinate events, and oversee corner operations in Batticaloa.',
      icon: ShieldCheck,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
      onSelect: () => onSelectPortal('admin')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002868] via-[#f8f9ff] to-[#f8f9ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6 gap-3">
            <img
              src={LOGOS.usEmbassy}
              alt="U.S. Embassy Logo"
              className="h-12 w-auto object-contain"
            />
            <img
              src={LOGOS.americanCorner}
              alt="American Corner Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#00153e] mb-3">
            Select Your Portal
          </h1>
          <p className="text-lg text-[#444650] max-w-2xl mx-auto">
            Choose your role to access the appropriate dashboard and login to your account.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboards.map((dashboard) => {
            const IconComponent = dashboard.icon;
            return (
              <div
                key={dashboard.id}
                onClick={() => dashboard.onSelect()}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#c4c6d2]/30 overflow-hidden"
              >
                {/* Top gradient bar */}
                <div className={`h-1 bg-gradient-to-r ${dashboard.color}`} />

                {/* Card content */}
                <div className="p-6 flex flex-col gap-4 h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${dashboard.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`w-7 h-7 ${dashboard.textColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-[#00153e] group-hover:text-[#ba022d] transition-colors">
                    {dashboard.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#444650] leading-relaxed flex-grow">
                    {dashboard.description}
                  </p>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dashboard.onSelect();
                    }}
                    className={`inline-flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-gradient-to-r ${dashboard.color} text-white font-semibold text-sm hover:opacity-90 transition-all group-hover:gap-3`}
                  >
                    <span>Login</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to home link */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#002868] hover:text-[#ba022d] font-semibold text-sm transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
