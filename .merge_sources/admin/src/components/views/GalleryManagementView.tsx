import React, { useState } from 'react';
import {
  FolderPlus,
  Image as ImageIcon,
  Video,
  HardDrive,
  Calendar,
  Layers,
  ChevronRight,
  Edit2,
  Share2,
  Download,
  Plus,
  PlayCircle,
} from 'lucide-react';
import { GalleryAlbum } from '../../types';

interface GalleryManagementViewProps {
  albums: GalleryAlbum[];
  onCreateAlbumClick: () => void;
  onOpenAlbum: (album: GalleryAlbum) => void;
}

export const GalleryManagementView: React.FC<GalleryManagementViewProps> = ({
  albums,
  onCreateAlbumClick,
  onOpenAlbum,
}) => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [mediaTypeFilter, setMediaTypeFilter] = useState('');

  const filteredAlbums = albums.filter((alb) => {
    const matchesCategory = !categoryFilter || alb.category === categoryFilter;
    const matchesMediaType =
      !mediaTypeFilter ||
      (mediaTypeFilter === 'Photos Only' && alb.mediaType === 'Photos') ||
      (mediaTypeFilter === 'Videos Only' && (alb.mediaType === 'Videos' || (alb.videosCount ?? 0) > 0));
    return matchesCategory && matchesMediaType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Gallery Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and organize visual assets for American Corner events and programs.
          </p>
        </div>

        <button
          onClick={onCreateAlbumClick}
          className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all w-fit"
        >
          <Plus size={16} />
          <span>Upload Media</span>
        </button>
      </div>

      {/* 4 Stats KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-[#002868] rounded-xl text-white">
              <Layers size={20} />
            </div>
            <span className="text-xs font-semibold text-[#1D4ED8] bg-[#dbeafe] px-2.5 py-1 rounded-md">
              +12 this month
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
              Total Albums
            </p>
            <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
              142
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-[#002868]/85 rounded-xl text-white">
              <ImageIcon size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
              Total Photos
            </p>
            <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
              4,890
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-[#002868]/60 rounded-xl text-white">
              <Video size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
              Total Videos
            </p>
            <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
              215
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="p-3 bg-gray-500 rounded-xl text-white">
              <HardDrive size={20} />
            </div>
            <span className="text-xs font-bold text-[#DC2626] bg-red-100 px-2.5 py-1 rounded-md">
              85% Full
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
              Storage Used
            </p>
            <h3 className="font-['Poppins',sans-serif] text-3xl font-bold text-gray-900 mt-1">
              425 GB
            </h3>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#DC2626] h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
          >
            <option value="">All Categories</option>
            <option value="Workshops">Workshops</option>
            <option value="English Programs">English Programs</option>
            <option value="Cultural Events">Cultural Events</option>
            <option value="Makerspace">Makerspace</option>
          </select>

          <select
            value={mediaTypeFilter}
            onChange={(e) => setMediaTypeFilter(e.target.value)}
            className="bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
          >
            <option value="">All Media Types</option>
            <option value="Photos Only">Photos Only</option>
            <option value="Videos Only">Videos Only</option>
          </select>

          <select className="bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer">
            <option>Last 30 Days</option>
            <option>This Year</option>
            <option>2023</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 font-semibold">Sort by:</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-800">Date Added</span>
          <div className="h-5 w-px bg-gray-200 mx-1" />
          <button
            onClick={() => alert('Exporting media asset registry as CSV...')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs"
          >
            <Download size={14} className="text-[#002868]" />
            <span>Export List</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAlbums.map((album) => (
          <div
            key={album.id}
            onClick={() => onOpenAlbum(album)}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={album.coverImage}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAlbum(album);
                  }}
                  className="bg-white text-[#002868] p-2 rounded-full hover:bg-[#BF0A30] hover:text-white transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Album link copied to clipboard!');
                  }}
                  className="bg-white text-[#002868] p-2 rounded-full hover:bg-[#BF0A30] hover:text-white transition-colors"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-[#002868] uppercase tracking-wide border border-gray-200/60 shadow-2xs">
                {album.category}
              </span>

              {album.videosCount && album.videosCount > 0 && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[11px] font-semibold">
                  <PlayCircle size={13} />
                  <span>{album.videosCount} Videos</span>
                </div>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-['Poppins',sans-serif] text-base font-bold text-gray-900 group-hover:text-[#1D4ED8] transition-colors leading-snug line-clamp-1 mb-2">
                  {album.title}
                </h4>
                <div className="flex items-center gap-4 text-gray-500 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-[#002868]" /> {album.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <ImageIcon size={14} className="text-[#002868]" /> {album.photosCount} Photos
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#002868] text-white flex items-center justify-center font-bold text-[10px]">
                    {album.uploaderInitials}
                  </div>
                  <span className="text-xs text-gray-500">Uploaded by {album.uploadedBy}</span>
                </div>
                <ChevronRight size={16} className="text-[#002868] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}

        {/* Ghost Card: Create New Album */}
        <div
          onClick={onCreateAlbumClick}
          className="rounded-2xl border-2 border-dashed border-gray-200 bg-[#F8FAFC]/60 hover:bg-[#F8FAFC] hover:border-[#002868]/60 transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer min-h-[300px] group text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md transition-all text-[#002868]">
            <FolderPlus size={32} />
          </div>
          <h4 className="font-['Poppins',sans-serif] text-lg font-bold text-gray-900">
            Create New Album
          </h4>
          <p className="text-xs text-gray-500 mt-1 max-w-xs">
            Organize new photos or videos into a dedicated collection.
          </p>
        </div>
      </div>
    </div>
  );
};
