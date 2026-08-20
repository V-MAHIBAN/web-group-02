import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Plus, 
  Clock, 
  MessageSquare, 
  FileText, 
  Lightbulb, 
  Check, 
  Copy, 
  Share2, 
  Bot,
  User,
  Loader2,
  BookOpen
} from 'lucide-react';
import { ChatSession, ChatMessage } from '../types';
import { INITIAL_CHAT_SESSIONS, USER_SARAH } from '../data/mockData';

export const AiAssistant: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_CHAT_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('chat-today-1');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const text = customPrompt || inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: USER_SARAH.avatar
    };

    const updatedMessages = [...activeSession.messages, userMsg];
    
    // Update active session locally
    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: updatedMessages } : s));
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: updatedMessages.slice(-6)
        })
      });

      const data = await res.json();
      const replyContent = data.reply || "I'm ready to assist with any civic or educational inquiries.";

      const botMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...updatedMessages, botMsg] } : s));
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: "Here is guidance on your request: Focus on student engagement and clear civic assessment criteria.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...updatedMessages, errorMsg] } : s));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: `chat-session-${Date.now()}`,
      title: 'New Educational Inquiry',
      category: 'Today',
      icon: 'chat',
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          role: 'assistant',
          content: "Hello! I am EduAssist AI. Ask me to formulate lesson plans, draft policy summaries, create formative quizzes, or brainstorm civic roleplay simulations.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedPrompts = [
    { label: "Elaborate on activity", prompt: "Elaborate on the 'ATP Factory' role-play activity with exact materials and instructions." },
    { label: "Generate quiz questions", prompt: "Generate 5 formative assessment quiz questions with answers for this topic." },
    { label: "Link to next unit", prompt: "How should I link this unit to the upcoming Photosynthesis and Ecological Systems unit?" }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[640px] animate-fadeIn">
      {/* Left Chat History Sidebar */}
      <div className="w-full md:w-72 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200/80">
          <button
            onClick={handleNewChat}
            className="w-full bg-white hover:bg-slate-100 active:scale-[0.99] text-slate-800 font-semibold py-2.5 px-4 rounded-xl border border-slate-200/90 shadow-2xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#BF0A30]" />
            <span>New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Today */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
              Today
            </p>
            <div className="space-y-1">
              {sessions.filter(s => s.category === 'Today').map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <button
                    key={sess.id}
                    onClick={() => setActiveSessionId(sess.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-[#002868] text-white shadow-2xs font-semibold' 
                        : 'text-slate-700 hover:bg-slate-200/60'
                    }`}
                  >
                    <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span className="truncate flex-1">{sess.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Yesterday */}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
              Yesterday
            </p>
            <div className="space-y-1">
              {sessions.filter(s => s.category === 'Yesterday').map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <button
                    key={sess.id}
                    onClick={() => setActiveSessionId(sess.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-[#002868] text-white shadow-2xs font-semibold' 
                        : 'text-slate-700 hover:bg-slate-200/60'
                    }`}
                  >
                    <Lightbulb className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                    <span className="truncate flex-1">{sess.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gemini Engine Footer */}
        <div className="p-3.5 bg-slate-100/80 border-t border-slate-200 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Powered by Gemini 3.7 Flash</span>
          </div>
        </div>
      </div>

      {/* Main Conversation Canvas */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Chat Canvas Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#BF0A30] to-rose-500 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-none">
                EduAssist AI
              </h2>
              <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Ready for lesson planning, civic policy analysis & quizzes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleSendMessage("Summarize key objectives for this entire session.")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Session Summary
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSession.messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex gap-4 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {isUser ? (
                    <img 
                      src={msg.avatar || USER_SARAH.avatar} 
                      alt="User" 
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#002868]/20"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#BF0A30] flex items-center justify-center text-white shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className={`space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser 
                      ? 'bg-[#002868] text-white rounded-tr-xs shadow-xs' 
                      : 'bg-slate-50 text-slate-800 rounded-tl-xs border border-slate-200/80 shadow-xs'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Rich Lesson Plan Card if present (Matches Screen 3) */}
                    {msg.lessonData && (
                      <div className="mt-4 bg-white rounded-xl border border-slate-200 p-4 space-y-3 text-slate-900 shadow-2xs">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <h4 className="font-bold text-sm text-[#002868] flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-[#BF0A30]" />
                            {msg.lessonData.title}
                          </h4>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md">
                            45 mins
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {msg.lessonData.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                              <span className="font-bold text-slate-700 w-28 shrink-0">
                                {item.phase} ({item.duration})
                              </span>
                              <span className="text-slate-600">
                                {item.description}
                              </span>
                            </div>
                          ))}
                        </div>

                        {msg.lessonData.promptFollowup && (
                          <p className="text-xs font-medium text-slate-600 pt-1">
                            {msg.lessonData.promptFollowup}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions & Timestamp */}
                  <div className={`flex items-center gap-2 text-[11px] text-slate-400 ${isUser ? 'justify-end' : ''}`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button 
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-700 transition-colors ml-1 p-0.5"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-4 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-[#BF0A30] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-50 border border-slate-200 text-sm text-slate-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#BF0A30]" />
                <span>EduAssist is formulating your instructional plan...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-2">
          {suggestedPrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s.prompt)}
              className="text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs transition-all hover:border-slate-300 active:scale-[0.98] cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Input Form Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-slate-50 rounded-2xl border border-slate-200 p-2 focus-within:ring-2 focus-within:ring-[#002868]/20 focus-within:border-[#002868] transition-all"
          >
            <button
              type="button"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/60 transition-colors"
              title="Attach document or syllabus"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask EduAssist to create lessons, summarize policies, or generate quizzes..."
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none px-2"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className={`p-2.5 rounded-xl font-medium transition-all ${
                inputMessage.trim() && !isLoading
                  ? 'bg-[#BF0A30] text-white hover:bg-[#D7263D] active:scale-95 shadow-xs cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
