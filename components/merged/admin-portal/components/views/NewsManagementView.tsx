import React, { useState } from 'react';
import {
  FileText,
  FileEdit,
  Clock,
  Eye,
  Plus,
  Search,
  Image as ImageIcon,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NewsArticle, NewsCategory, NewsStatus } from '../../types';

interface NewsManagementViewProps {
  newsArticles: NewsArticle[];
  onAddNewsClick: () => void;
  onEditNews: (article: NewsArticle) => void;
  onDeleteNews: (id: string) => void;
}

export const NewsManagementView: React.FC<NewsManagementViewProps> = ({
  newsArticles,
  onAddNewsClick,
  onEditNews,
  onDeleteNews,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.author.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || article.category === categoryFilter;
    const matchesStatus = !statusFilter || article.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const publishedCount = newsArticles.filter((a) => a.status === 'Published').length + 122;
  const draftCount = newsArticles.filter((a) => a.status === 'Draft').length + 17;
  const scheduledCount = newsArticles.filter((a) => a.status === 'Scheduled').length + 5;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-['Poppins',sans-serif] text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            News Overview
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and monitor all published articles, releases, and drafts.
          </p>
        </div>

        <button
          onClick={onAddNewsClick}
          className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-98 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Plus size={16} />
          <span>+ Add News</span>
        </button>
      </div>

      {/* 4 Bento KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[#002868]">
            <FileText size={48} />
          </div>
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
            Published Articles
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Poppins',sans-serif] text-3xl font-bold text-[#002868]">
              {publishedCount}
            </span>
            <span className="text-xs font-semibold text-[#BF0A30]">+12% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[#002868]">
            <FileEdit size={48} />
          </div>
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
            Draft News
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Poppins',sans-serif] text-3xl font-bold text-[#002868]">
              {draftCount}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[#002868]">
            <Clock size={48} />
          </div>
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
            Scheduled Posts
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Poppins',sans-serif] text-3xl font-bold text-[#002868]">
              {scheduledCount}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-[#002868]">
            <Eye size={48} />
          </div>
          <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 font-['Geist',sans-serif]">
            Total Views
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-['Poppins',sans-serif] text-3xl font-bold text-[#002868]">
              45.2k
            </span>
          </div>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        {/* Filters Bar */}
        <div className="p-5 border-b border-gray-200/80 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Community">Community</option>
              <option value="Events">Events</option>
              <option value="Cultural">Cultural</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
            </select>
          </div>

          <div className="relative w-full md:w-72">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title or author..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4 px-6">Featured</th>
                <th className="p-4 px-6">News Title</th>
                <th className="p-4 px-6 hidden md:table-cell">Category</th>
                <th className="p-4 px-6 hidden lg:table-cell">Author</th>
                <th className="p-4 px-6 hidden sm:table-cell">Date</th>
                <th className="p-4 px-6">Status</th>
                <th className="p-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No news articles match your filter.
                  </td>
                </tr>
              ) : (
                filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="p-4 px-6 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center text-gray-400">
                        {art.imageUrl ? (
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-[#002868]" />
                        )}
                      </div>
                    </td>

                    <td className="p-4 px-6">
                      <p className="font-semibold text-[#002868] hover:underline cursor-pointer line-clamp-1">
                        {art.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{art.views}</p>
                    </td>

                    <td className="p-4 px-6 hidden md:table-cell text-xs font-medium text-gray-700">
                      {art.category}
                    </td>

                    <td className="p-4 px-6 hidden lg:table-cell text-xs text-gray-600">
                      {art.author}
                    </td>

                    <td className="p-4 px-6 hidden sm:table-cell text-xs text-gray-500">
                      {art.date}
                    </td>

                    <td className="p-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                          art.status === 'Published'
                            ? 'bg-emerald-600 text-white'
                            : art.status === 'Draft'
                            ? 'bg-amber-500 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {art.status}
                      </span>
                    </td>

                    <td className="p-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEditNews(art)}
                          className="p-1.5 text-gray-400 hover:text-[#002868] rounded-lg hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteNews(art.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-gray-200/80 bg-gray-50/40 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to {filteredArticles.length} of {newsArticles.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40" disabled>
              Prev
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
