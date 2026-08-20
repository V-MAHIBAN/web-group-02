export type UserRole = 'student' | 'admin' | 'guest';

export type ActiveTab = 
  | 'dashboard'
  | 'courses'
  | 'communities'
  | 'schedule'
  | 'members'
  | 'settings'
  | 'ai-assistant'
  | 'landing';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: 'Planning' | 'Technology' | 'Communications' | 'Leadership' | 'Civic';
  progress: number;
  completedModules: number;
  totalModules: number;
  image: string;
  description: string;
  durationRemaining?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  syllabus: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    type: 'video' | 'reading' | 'quiz' | 'workshop';
    content?: string;
  }[];
}

export interface Deadline {
  id: string;
  title: string;
  course: string;
  dueMonth: string;
  dueDay: number;
  dateStr: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  reminderSet: boolean;
  reminderTime?: string;
}

export interface MetricCard {
  label: string;
  value: string | number;
  icon: string;
  subtext?: string;
  trend?: string;
  trendPositive?: boolean;
}

export interface RegistrationMonthData {
  month: string;
  fullMonth: string;
  value: number;
  heightPercent: number;
  isPeak?: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timestamp: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  hasLiked?: boolean;
  replies: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    timestamp: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  avatar?: string;
  lessonData?: {
    title: string;
    items: { phase: string; duration: string; description: string }[];
    promptFollowup?: string;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  category: 'Today' | 'Yesterday' | 'Previous 7 Days';
  icon: string;
  messages: ChatMessage[];
}

export interface Member {
  id: string;
  name: string;
  role: 'Student' | 'Faculty' | 'Volunteer' | 'Staff';
  email: string;
  avatar: string;
  department: string;
  coursesCount: number;
  status: 'active' | 'offline';
  joinedDate: string;
}

export interface WaterTrackerState {
  targetMl: number;
  consumedMl: number;
  glassSizeMl: number;
  reminderIntervalMinutes: number;
  remindersEnabled: boolean;
  lastDrinkTime: string;
  streakDays: number;
  history: { time: string; amountMl: number }[];
}
