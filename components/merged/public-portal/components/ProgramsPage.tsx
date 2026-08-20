import React, { useState } from 'react';
import { Program, ProgramCategory } from '../types';
import { StorageService } from '../services/storage';
import { ProgramDetailModal } from './ProgramDetailModal';
import { Search, Filter, Sparkles, BookOpen, Clock, Layers } from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProgramCategory>('thematic'); // default to thematic or certificate based on tab clicks
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [programs] = useState<Program[]>(() => StorageService.getPrograms());

  const filteredPrograms = programs.filter(p => {
    const matchesCategory = p.category === activeTab;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16">
      {/* Hero Section */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] text-[#002868] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
          <span>Curriculum & Workshops</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#00153e] mb-4 tracking-tight">
          Our Programs
        </h1>
        <p className="text-base sm:text-lg text-[#444650] leading-relaxed max-w-3xl mx-auto">
          Empowering the community through dynamic education, skill-building workshops, and cultural exchange. Discover your next learning opportunity below.
        </p>
      </section>

      {/* Tabs Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#c4c6d2] mb-10 gap-4 pb-1">
        <div className="flex space-x-4 md:space-x-8">
          <button
            onClick={() => setActiveTab('certificate')}
            className={`py-3 px-4 font-bold text-sm md:text-base transition-all relative ${
              activeTab === 'certificate'
                ? 'text-[#00153e]'
                : 'text-[#444650] hover:text-[#00153e]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ba022d]" />
              <span>Certificate Programs</span>
            </span>
            {activeTab === 'certificate' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ba022d] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('thematic')}
            className={`py-3 px-4 font-bold text-sm md:text-base transition-all relative ${
              activeTab === 'thematic'
                ? 'text-[#00153e]'
                : 'text-[#444650] hover:text-[#00153e]'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#ba022d]" />
              <span>Thematic Programs</span>
            </span>
            {activeTab === 'thematic' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#ba022d] rounded-t-full" />
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#747781] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#c4c6d2] rounded-full text-xs sm:text-sm focus:outline-none focus:border-[#002868] focus:ring-1 focus:ring-[#002868] shadow-sm"
          />
        </div>
      </div>

      {/* Certificate Programs Grid */}
      {activeTab === 'certificate' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-[#d9e3f6] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group transform hover:-translate-y-1"
            >
              {/* Card Image with 4px institutional Navy top border */}
              <div className="h-48 w-full overflow-hidden border-t-4 border-[#00153e] relative">
                <img
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={program.image}
                />
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-bold text-[#00153e] group-hover:text-[#ba022d] transition-colors leading-tight">
                      {program.title}
                    </h3>
                    <span className="bg-[#002868] text-[#dae2ff] text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0">
                      {program.duration}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#444650] mb-4 leading-relaxed line-clamp-3">
                    {program.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProgram(program)}
                  className="w-full py-2.5 bg-[#00153e] text-white font-semibold text-xs sm:text-sm rounded-lg hover:bg-[#ba022d] transition-colors shadow-sm mt-auto"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Thematic Programs Grid (4 Columns on Desktop matching Screenshot 3) */}
      {activeTab === 'thematic' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-[#d9e3f6] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group transform hover:-translate-y-1"
            >
              <div className="h-40 w-full overflow-hidden border-t-4 border-[#00153e]">
                <img
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={program.image}
                />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#00153e] mb-1 leading-snug group-hover:text-[#ba022d] transition-colors line-clamp-2">
                    {program.title}
                  </h3>
                  <p className="text-xs text-[#444650] mb-4 leading-relaxed line-clamp-2">
                    {program.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedProgram(program)}
                  className="w-full py-2 bg-[#e6eeff] text-[#00153e] font-semibold text-xs rounded-lg hover:bg-[#00153e] hover:text-white transition-colors mt-auto"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#c4c6d2]/30 p-8">
          <Filter className="w-12 h-12 text-[#747781] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#00153e]">No programs match your search</h3>
          <p className="text-sm text-[#444650] mt-1">Try searching with a different keyword or switch categories.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-[#00153e] text-white text-xs font-semibold rounded-lg hover:bg-[#ba022d] transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}

      {/* Modal Popup */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};
