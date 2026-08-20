import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Tag, 
  Search, 
  Plus, 
  Send, 
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { CommunityPost } from '../types';
import { USER_SARAH } from '../data/mockData';

interface CommunitiesViewProps {
  posts: CommunityPost[];
  onOpenCreatePost: () => void;
  onLikePost: (postId: string) => void;
  onAddReply: (postId: string, replyText: string) => void;
}

export const CommunitiesView: React.FC<CommunitiesViewProps> = ({
  posts,
  onOpenCreatePost,
  onLikePost,
  onAddReply
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const tags = ['All', 'Urban Planning', 'Data Governance', 'Transit', 'Civic Policy', 'Ethics'];

  const filteredPosts = posts.filter(p => {
    const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleReplySubmit = (postId: string) => {
    const text = replyInputs[postId]?.trim();
    if (!text) return;
    onAddReply(postId, text);
    setReplyInputs(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Community Forums & Discussions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Exchange civic research, debate municipal policies, and collaborate on capstone projects.
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="bg-[#BF0A30] hover:bg-[#D7263D] active:scale-[0.98] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Start New Discussion</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedTag === t
                  ? 'bg-[#002868] text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search discussions & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] w-56 shadow-2xs"
          />
        </div>
      </div>

      {/* Discussion Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
          >
            {/* Author details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={post.authorAvatar} 
                  alt={post.authorName} 
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {post.authorName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {post.authorRole} • {post.timestamp}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {post.tags.map((tg, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-600 rounded-md">
                    #{tg}
                  </span>
                ))}
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">
                {post.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* Interaction Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLikePost(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    post.hasLiked ? 'text-[#BF0A30]' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-[#BF0A30]' : ''}`} />
                  <span>{post.likes} Likes</span>
                </button>

                <button
                  onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies.length} Replies</span>
                </button>
              </div>

              <button
                onClick={() => alert(`Share link for discussion copied to clipboard!`)}
                className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Replies Thread */}
            {(expandedPostId === post.id || post.replies.length > 0) && (
              <div className="pt-3 space-y-3 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                {post.replies.map((rep) => (
                  <div key={rep.id} className="flex items-start gap-3 text-xs">
                    <img 
                      src={rep.authorAvatar} 
                      alt={rep.authorName} 
                      className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{rep.authorName}</span>
                        <span className="text-[10px] text-slate-400">{rep.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{rep.content}</p>
                    </div>
                  </div>
                ))}

                {/* Reply Form */}
                <div className="flex items-center gap-2 pt-2">
                  <img 
                    src={USER_SARAH.avatar} 
                    alt="Current user" 
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <input
                    type="text"
                    placeholder="Write a helpful response..."
                    value={replyInputs[post.id] || ''}
                    onChange={(e) => setReplyInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleReplySubmit(post.id);
                    }}
                    className="flex-1 text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868]"
                  />
                  <button
                    onClick={() => handleReplySubmit(post.id)}
                    disabled={!replyInputs[post.id]?.trim()}
                    className="bg-[#002868] hover:bg-[#003890] disabled:bg-slate-300 text-white p-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
