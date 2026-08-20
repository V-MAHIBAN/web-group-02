import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Globe2, 
  PlayCircle,
  GraduationCap
} from 'lucide-react';
import { ActiveTab, UserRole, Course } from '../types';
import { ALL_COURSES } from '../data/mockData';

interface PublicLandingProps {
  setActiveTab: (tab: ActiveTab) => void;
  setUserRole: (role: UserRole) => void;
  onSelectCourse: (course: Course) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  setActiveTab,
  setUserRole,
  onSelectCourse
}) => {
  return (
    <div className="space-y-16 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#002868] text-white shadow-xl min-h-[480px] flex items-center">
        {/* Background Image with heavy elegant overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBANAK6v3Ajghsn__OU8nb6Vvpoiq4SX5MiE5d65C4En4VkOEf1d2de6BRReRgla9hxnWxO3_8YdU9ifOP35eDwSKGH4qnsHAilP6uFsJ4RSnAN5c2KdGxcckiXENELGmtUCzZAqCkqI2nljoHWB2VhdXqVDgmbzxxLB91HBlz3r4B22X86n8UTdc_hnl-A9ysCdOEA6pHgP2VkPZtf_xMMUIHNe4B8zmApkGTRubvqlEKf46V74kY" 
            alt="Civic Education Background" 
            className="w-full h-full object-cover opacity-25 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002868] via-[#002868]/90 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-6 sm:px-12 py-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EduCommunity Pro 2026 Academic Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
            Empowering Civic Education and Professional Excellence
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Connect with peers, access curated learning materials, and lead transformative civic projects in modern municipal and public environments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                setUserRole('student');
                setActiveTab('dashboard');
              }}
              className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-[0.98] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setUserRole('student');
                setActiveTab('courses');
              }}
              className="bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-xl border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-amber-300" />
              <span>Explore Programs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Platform Capabilities Bento Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Platform Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Engineered specifically for public administration, civic leadership, and municipal community impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                Interactive Learning Environments
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Engage in asynchronous modules, live policy simulations, and collaborative capstone assignments.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#002868] flex items-center gap-1 group-hover:text-[#BF0A30] transition-colors">
                Explore Modules <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                Curated Civic Curriculum
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Peer-reviewed syllabi covering urban zoning, public sector data ethics, and crisis communication frameworks.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#002868] flex items-center gap-1 group-hover:text-[#BF0A30] transition-colors">
                View Syllabi <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                Community Forums & Outreach
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Connect directly with faculty advisors, regional volunteers, and municipal researchers across 12+ channels.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#002868] flex items-center gap-1 group-hover:text-[#BF0A30] transition-colors">
                Join Discussions <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#BF0A30] group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                Certification & Credentials
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Earn verifiable digital certificates and credits recognized by public sector agencies nationwide.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#002868] flex items-center gap-1 group-hover:text-[#BF0A30] transition-colors">
                Verify Credentials <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Spotlight */}
      <section className="bg-slate-100/70 rounded-3xl p-6 sm:p-10 border border-slate-200/60 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Course Offerings</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Explore popular programs led by academic fellows and practitioners.</p>
          </div>
          <button 
            onClick={() => {
              setUserRole('student');
              setActiveTab('courses');
            }}
            className="text-xs font-bold text-[#BF0A30] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            Browse All Courses <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_COURSES.slice(0, 3).map((course) => (
            <div 
              key={course.id} 
              onClick={() => {
                setUserRole('student');
                onSelectCourse(course);
              }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold bg-[#002868] text-white rounded-md shadow-sm">
                    {course.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium text-slate-400">Instructor: {course.instructor}</p>
                  <h3 className="font-bold text-base text-slate-900 mt-1 line-clamp-2 group-hover:text-[#BF0A30] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>{course.totalModules} Interactive Modules</span>
                <span className="text-[#BF0A30] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View Syllabus <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Stats Banner */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 bg-[#002868] rounded-3xl text-white text-center shadow-lg">
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-amber-300">12,450+</p>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">Active Learners</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-white">45+</p>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">Accredited Modules</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-white">98.4%</p>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">Completion Rating</p>
        </div>
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">1,240</p>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">Civic Volunteers</p>
        </div>
      </section>
    </div>
  );
};
