import React, { useState } from 'react';
import { X, Send, Tag, Paperclip, Sparkles, MessageSquare } from 'lucide-react';
import { CommunityPost, UserRole } from '../types';
import { USER_SARAH, USER_ADMIN } from '../data/mockData';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  onPostCreated: (post: CommunityPost) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  userRole,
  onPostCreated
}) => {
  if (!isOpen) return null;

  const currentUser = userRole === 'admin' ? USER_ADMIN : USER_SARAH;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Urban Planning');

  const tags = ['Urban Planning', 'Data Governance', 'Transit', 'Civic Policy', 'Ethics', 'General'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'Administrator' ? 'Administrator & Faculty' : 'Civic Leadership Student',
      authorAvatar: currentUser.avatar,
      timestamp: 'Just now',
      title: title.trim(),
      content: content.trim(),
      tags: [selectedTag],
      likes: 0,
      hasLiked: false,
      replies: []
    };

    onPostCreated(newPost);
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4 bg-[#002868] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#BF0A30] flex items-center justify-center text-white font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-white">Start a Community Discussion</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="font-bold text-sm text-slate-900">{currentUser.name}</p>
              <p className="text-xs text-slate-400">Posting to EduCommunity Pro channels</p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Discussion Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Analysis of Transit Subsidies on Low-Income Commutes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Topic Category</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            >
              {tags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700">Content / Research Details</label>
            <textarea
              required
              rows={4}
              placeholder="Share key insights, citations, inquiry questions, or case study drafts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs p-3 mt-1 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              title="Add attachment"
            >
              <Paperclip className="w-4 h-4" />
              <span>Attach File</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#BF0A30] hover:bg-[#D7263D] active:scale-95 text-white shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
