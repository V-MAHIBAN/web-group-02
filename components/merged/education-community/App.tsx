import React, { useState } from 'react';
import { Menu, X, Bell, Droplets, Sparkles, GraduationCap } from 'lucide-react';
import { ActiveTab, UserRole, Course, Deadline, CommunityPost } from './types';
import { 
  ALL_COURSES, 
  UPCOMING_DEADLINES, 
  INITIAL_COMMUNITY_POSTS, 
  USER_SARAH, 
  USER_ADMIN 
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { StudentDashboard } from './components/StudentDashboard';
import { PublicLanding } from './components/PublicLanding';
import { AiAssistant } from './components/AiAssistant';
import { AdminOverview } from './components/AdminOverview';
import { MyCoursesView } from './components/MyCoursesView';
import { CommunitiesView } from './components/CommunitiesView';
import { ScheduleView } from './components/ScheduleView';
import { MembersView } from './components/MembersView';
import { SettingsView } from './components/SettingsView';
import { CourseModal } from './components/CourseModal';
import { CreatePostModal } from './components/CreatePostModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Global State
  const [courses, setCourses] = useState<Course[]>(ALL_COURSES);
  const [deadlines, setDeadlines] = useState<Deadline[]>(UPCOMING_DEADLINES);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  const handleToggleDeadline = (id: string) => {
    setDeadlines(prev => prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d));
  };

  const handleAddDeadline = (newDl: Partial<Deadline>) => {
    const fullDl: Deadline = {
      id: `dl-${Date.now()}`,
      title: newDl.title || 'New Assignment',
      course: newDl.course || 'Civic Leadership',
      dueMonth: newDl.dueMonth || 'OCT',
      dueDay: newDl.dueDay || 25,
      dateStr: newDl.dateStr || '2026-10-25',
      completed: false,
      priority: newDl.priority || 'high',
      reminderSet: true,
      reminderTime: newDl.reminderTime || '10:00 AM'
    };
    setDeadlines(prev => [fullDl, ...prev]);
  };

  const handleUpdateCourseProgress = (courseId: string, progress: number) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, progress } : c));
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse(prev => prev ? { ...prev, progress } : null);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasLiked = !p.hasLiked;
        return {
          ...p,
          hasLiked,
          likes: hasLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const handleAddReply = (postId: string, content: string) => {
    const reply = {
      id: `reply-${Date.now()}`,
      authorName: userRole === 'admin' ? USER_ADMIN.name : USER_SARAH.name,
      authorAvatar: userRole === 'admin' ? USER_ADMIN.avatar : USER_SARAH.avatar,
      content,
      timestamp: 'Just now'
    };
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: [...p.replies, reply] } : p));
  };

  const handlePostCreated = (newPost: CommunityPost) => {
    setPosts([newPost, ...posts]);
  };

  const isPublicLanding = activeTab === 'landing';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* TopNav is shown on Public Landing page or can be opened anytime */}
      {isPublicLanding && (
        <TopNav 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      )}

      {/* Main App Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar only shown in Portal views (Dashboard, Courses, AI, Communities, etc.) */}
        {!isPublicLanding && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
            setUserRole={setUserRole}
            onOpenCreatePost={() => setIsCreatePostOpen(true)}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile backdrop for sidebar */}
        {!isPublicLanding && isMobileSidebarOpen && (
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}

        {/* Right Main Content Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col min-w-0">
          {/* Top Bar for portal screens */}
          {!isPublicLanding && (
            <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                  className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
                  aria-label="Toggle menu"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#BF0A30] flex items-center justify-center text-white font-bold text-xs">
                    EC
                  </div>
                  <span className="font-bold text-base text-[#002868] hidden sm:inline">
                    EduCommunity <span className="text-[#BF0A30]">Pro</span>
                  </span>
                </div>
              </div>

              {/* Top Bar Quick Controls */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveTab('schedule')}
                  className="p-2 text-slate-500 hover:text-[#002868] hover:bg-slate-100 rounded-xl transition-colors relative"
                  title="Water & Study Reminders"
                >
                  <Droplets className="w-4 h-4 text-sky-500" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-400 rounded-full animate-ping"></span>
                </button>

                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">EduAssist AI</span>
                </button>

                <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

                {/* View switcher badge */}
                <button
                  onClick={() => {
                    const next = userRole === 'student' ? 'admin' : 'student';
                    setUserRole(next);
                  }}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="capitalize">{userRole} Mode</span>
                </button>
              </div>
            </header>
          )}

          {/* View Container */}
          <div className={`flex-1 ${isPublicLanding ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6' : 'p-4 sm:p-8'}`}>
            {activeTab === 'landing' && (
              <PublicLanding
                setActiveTab={setActiveTab}
                setUserRole={setUserRole}
                onSelectCourse={(c) => setSelectedCourse(c)}
              />
            )}

            {activeTab === 'dashboard' && (
              userRole === 'admin' ? (
                <AdminOverview />
              ) : (
                <StudentDashboard
                  setActiveTab={setActiveTab}
                  onSelectCourse={(c) => setSelectedCourse(c)}
                  deadlines={deadlines}
                  onToggleDeadline={handleToggleDeadline}
                />
              )
            )}

            {activeTab === 'courses' && (
              <MyCoursesView
                courses={courses}
                onSelectCourse={(c) => setSelectedCourse(c)}
              />
            )}

            {activeTab === 'ai-assistant' && (
              <AiAssistant />
            )}

            {activeTab === 'communities' && (
              <CommunitiesView
                posts={posts}
                onOpenCreatePost={() => setIsCreatePostOpen(true)}
                onLikePost={handleLikePost}
                onAddReply={handleAddReply}
              />
            )}

            {activeTab === 'schedule' && (
              <ScheduleView
                deadlines={deadlines}
                onToggleDeadline={handleToggleDeadline}
                onAddDeadline={handleAddDeadline}
              />
            )}

            {activeTab === 'members' && (
              <MembersView />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                userRole={userRole}
                setUserRole={setUserRole}
              />
            )}
          </div>
        </main>
      </div>

      {/* Course Detail / Interactive Player Modal */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onUpdateCourseProgress={handleUpdateCourseProgress}
      />

      {/* Create Discussion Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        userRole={userRole}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}
