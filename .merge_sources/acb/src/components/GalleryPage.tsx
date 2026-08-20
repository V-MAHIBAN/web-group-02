import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { StorageService } from '../services/storage';
import { X, Sparkles, Filter, Calendar, Tag, Share2, Maximize2 } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [galleryItems] = useState<GalleryItem[]>(() => StorageService.getGallery());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Education', 'Workshops', 'Events', 'Awards', 'Celebrations'];

  const filteredItems = galleryItems.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16">
      {/* Header */}
      <section className="text-center mb-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] text-[#002868] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
          <span>Visual Archive</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#00153e] mb-4 tracking-tight">
          Photo Gallery
        </h1>
        <p className="text-base sm:text-lg text-[#444650] leading-relaxed">
          Moments of learning, leadership, and community connection at the American Corner Batticaloa.
        </p>
      </section>

      {/* Filter Chips */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm ${
              selectedCategory === cat
                ? 'bg-[#00153e] text-white shadow-md'
                : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxItem(item)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#c4c6d2]/30 flex flex-col transform hover:-translate-y-1"
          >
            <div className="h-56 w-full overflow-hidden bg-gray-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs text-white font-medium flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  <Maximize2 className="w-3 h-3" /> View Photo
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-grow bg-white">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-bold text-[#ba022d] bg-red-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-[11px] text-[#747781] flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {item.date}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#00153e] line-clamp-2 leading-snug group-hover:text-[#ba022d] transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-4 flex items-center justify-between border-b border-[#c4c6d2]/40 bg-[#f8f9ff]">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-[#ba022d] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                  {activeLightboxItem.category}
                </span>
                <span className="text-xs text-[#747781]">{activeLightboxItem.date}</span>
              </div>
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="w-8 h-8 rounded-full bg-white text-[#121c2a] hover:bg-[#ba022d] hover:text-white flex items-center justify-center transition-colors shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Container */}
            <div className="max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Details Footer */}
            <div className="p-5 bg-white flex flex-col gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-[#00153e]">
                {activeLightboxItem.title}
              </h2>
              {activeLightboxItem.description && (
                <p className="text-sm text-[#444650] leading-relaxed">
                  {activeLightboxItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
