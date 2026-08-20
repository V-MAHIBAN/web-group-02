import { Course, Deadline, CommunityPost, ChatSession, Member, RegistrationMonthData, WaterTrackerState } from '../types';

export const USER_SARAH = {
  name: "Sarah Jenkins",
  displayName: "Sarah",
  role: "Student",
  portal: "Management Portal",
  email: "sarah.jenkins@educommunity.org",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXoJAKG_DmxyZ0fmCJkl23Q6LJGzG8SY8Pg2oTcI4yVPqhGZDioPUgnnDMlyM8EjJ26jbBgbt1RZZ03nV0aV30AH5ZGcvxPvQG2p5D2AMR-53baz0G9w982AeoNjaL9QJ_kB7_vgbvk1umH34irOFGLBPLmAVNQ8KwcpjJQDA6eBvscl67sDnHPs66O_4y-MBCGMK22dSWajSvPIVzjmV7zJrLXzhiBVkpTFm3OPbDmEfDpCobARs6",
  badges: ["Civic Fellow", "Dean's List 2024", "Top Contributor"],
  bio: "Graduate student in Civic Leadership & Urban Infrastructure Policy."
};

export const USER_ADMIN = {
  name: "Dr. Arthur Vance",
  displayName: "Arthur",
  role: "Administrator",
  portal: "System Admin Portal",
  email: "admin@educommunity.org",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAANi-laCDvS9hYgD-XkgTsdsXNfjH73kBdZ3-AVpojP3iomVAF6eUnPaOE8wawcoWjyPIi0NfqseZGXDJB9UmAk3NbFfID_znOWDKdQ9GRq4knX4BAUzMAU6vnosCmUD0BeLD1mdFQ29mVPvKgtMAAi_ExwlzQCfYeCYHGIG9flMtnLkNhNgo3Ca3x_KoAFCiulChE71BZ9gz0E6lowimQjY4vuglq9E8mEUqrAJBduAxuvHZGI5j_",
  badges: ["System Architect", "Faculty Lead"],
  bio: "Managing institutional partnerships and academic integrity."
};

export const FEATURED_COURSE: Course = {
  id: "civic-leadership-adv",
  title: "Advanced Civic Leadership Strategies",
  instructor: "Dr. Eleanor Vance",
  category: "Leadership",
  progress: 65,
  completedModules: 7,
  totalModules: 11,
  durationRemaining: "2h 15m remaining",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8zO7wU7nJJD6Y3CX9hLrJ-_NRmbXiZzDgB5LeMiHenNxtza2i-sJIPfVu5RlQNeTJuDjbDsOOfgKl1OhjE2S9MLN-sEp7IFUK5TwVTdBIeKnrOnyzaJWsGnmPswiUZmhr3QN4SleLx5sEjYkJR9l29Qv2Ev0Dfe5M1Jn5tnjDH-CL90Fo-Mw4mAIqVic2gnCNHYuoDqpao5IwHtGDWGxYDJ-KOTrI2sQ7a502FGc5GvXMiQSfBnG7",
  description: "Master modern community engagement protocols, cross-agency consensus building, and institutional decision frameworks.",
  level: "Advanced",
  syllabus: [
    { id: "mod-1", title: "Foundations of Public Trust & Ethics", duration: "45 mins", completed: true, type: "video" },
    { id: "mod-2", title: "Stakeholder Mapping & Civic Analysis", duration: "50 mins", completed: true, type: "reading" },
    { id: "mod-3", title: "Crisis Communication in Public Sector", duration: "60 mins", completed: true, type: "workshop" },
    { id: "mod-4", title: "Module 4: Community Engagement Protocols", duration: "40 mins", completed: true, type: "video" },
    { id: "mod-5", title: "Intergovernmental Negotiation Strategies", duration: "55 mins", completed: false, type: "workshop" },
    { id: "mod-6", title: "Capstone Simulation: Regional Crisis Response", duration: "80 mins", completed: false, type: "quiz" }
  ]
};

export const ENROLLED_COURSES: Course[] = [
  {
    id: "course-1",
    title: "Urban Planning Fundamentals",
    instructor: "Prof. Miller",
    category: "Planning",
    progress: 30,
    completedModules: 4,
    totalModules: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC2E_uGI1uocDeaQv9i7zFqzBHVM8Ew2q4FJcPisVzLNazMnKWyU0rXhKuH1RLCkiLqjbACyQpiVDfz1l2lFWYiaKzSo-mhOCPqj8xu0SLsT7lTr2mIkmG3oP13S8y5CSHzgo0d-1uR_B4eHuhhXZmJXnnnNjUgA7_jXixS53cbnG9yIn3seWyAlNJzYqowIxCpFKsFfybSyeDm0YvUtW8fFUASrUlupoo3dsD2GbyttXa-KXCJzQM",
    description: "Explore zoning frameworks, transit-oriented development, and spatial layout simulations for sustainable 21st-century cities.",
    level: "Beginner",
    syllabus: [
      { id: "up-1", title: "History of Modern Urban Zoning", duration: "30 mins", completed: true, type: "video" },
      { id: "up-2", title: "GIS Mapping and Population Density", duration: "45 mins", completed: true, type: "reading" },
      { id: "up-3", title: "Transportation Corridors and Walkability", duration: "50 mins", completed: true, type: "workshop" },
      { id: "up-4", title: "Environmental Impact Assessment Guidelines", duration: "40 mins", completed: true, type: "quiz" },
      { id: "up-5", title: "Smart City Sensor Infrastructure", duration: "55 mins", completed: false, type: "video" }
    ]
  },
  {
    id: "course-2",
    title: "Data Governance in Public Sector",
    instructor: "Dr. Chen",
    category: "Technology",
    progress: 85,
    completedModules: 10,
    totalModules: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3avyYxxL7qCDosjUNEPcSN-bg5aeYZnMIlI4bmC8XEit0anQC1ek8koI2TgtiNTE-MGdMP8vevPvMQyOpQMFroClpi6C-ha8fClYkA-MmksH_7WcwojdbIMJRmwOqMIdXGvd0yK7kmUbkTlRXwfppSHuSpxV8MScpsUh8MRAs1f4S_MSQA_qE061ISXOkhwkfzaALkB2DGevEF--jZjv4xnikukZEgA-hb835ABglbXAMuVNqB5W2",
    description: "Comprehensive study on data integrity, privacy compliance (GDPR/FOIA), and open data standards in governmental agencies.",
    level: "Intermediate",
    syllabus: [
      { id: "dg-1", title: "Open Data Directives and Freedom of Information", duration: "35 mins", completed: true, type: "reading" },
      { id: "dg-2", title: "Cybersecurity Baselines in Municipal Networks", duration: "50 mins", completed: true, type: "video" },
      { id: "dg-3", title: "Automated Data Cleansing & Validation", duration: "45 mins", completed: true, type: "workshop" },
      { id: "dg-4", title: "Final Institutional Audit Preparation", duration: "60 mins", completed: false, type: "quiz" }
    ]
  },
  {
    id: "course-3",
    title: "Public Speaking for Leaders",
    instructor: "Sarah Jenkins",
    category: "Communications",
    progress: 10,
    completedModules: 1,
    totalModules: 10,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1bQYuG1A1bojlL1E2AIrMdbjB987Aw-DZzSB1sjSIfkxL0hwaHzqK_r7_mErdXLgxNt7lf5uqXk9uLVlDHUd_HOZXlOnImL-fFmZPSLSk9hb-YOnA8_Ks2WSehgaZAlxnEcNZz9ascDNZEQIU4jN8t_dcZNekY7jE_5iv7RHj7LqwZY9mWxH29rkcak676Xzx6jqKgbbedUM0iqYK4vm4BQG26QtFtMAy9xNupCmyUhzCt6fCBS-z",
    description: "Convey complex policy concepts with clarity, persuasive rhetoric, and poise before town halls and legislative bodies.",
    level: "Beginner",
    syllabus: [
      { id: "ps-1", title: "Overcoming Stage Anxiety & Voice Warmups", duration: "25 mins", completed: true, type: "video" },
      { id: "ps-2", title: "Structuring Persuasive Arguments with Ethos & Logos", duration: "40 mins", completed: false, type: "reading" },
      { id: "ps-3", title: "Q&A Navigation and Handling Hostile Inquiries", duration: "45 mins", completed: false, type: "workshop" }
    ]
  }
];

export const ALL_COURSES: Course[] = [
  FEATURED_COURSE,
  ...ENROLLED_COURSES,
  {
    id: "course-4",
    title: "Fiscal Policy and Municipal Budgets",
    instructor: "Prof. Kenneth Moore",
    category: "Civic",
    progress: 0,
    completedModules: 0,
    totalModules: 8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOPNloBKhmn2kPm-h5K3N7L0SMOos2QwwsD_iXNlvR6qXgxu1pdPXJ3-tD-nySID2mkU67_NKRUjer1b1AqazAINCArKZqQkAm_BJqv_Rb8vrqqH0thjm0GtBFDzqNXm3z7LTVl5dvhS5Fk4G4CPYYredSTUcuvg5aL7yLBDxEUM5H_YWemt8WCIN-9wbmeRmmvsMTkAScm-dei_kUdJ1lpx7gKe2bg-peK4qR_jbKkBeAqhBOBaeg",
    description: "Learn zero-based budgeting, capital expenditure scheduling, and public bond issuance mechanics.",
    level: "Intermediate",
    syllabus: [
      { id: "fp-1", title: "Principles of Revenue Forecasts", duration: "30 mins", completed: false, type: "video" },
      { id: "fp-2", title: "Capital Asset Lifecycle Management", duration: "45 mins", completed: false, type: "reading" }
    ]
  }
];

export const UPCOMING_DEADLINES: Deadline[] = [
  {
    id: "dead-1",
    title: "Policy Analysis Essay",
    course: "Civic Leadership",
    dueMonth: "OCT",
    dueDay: 12,
    dateStr: "2026-10-12",
    completed: false,
    priority: "high",
    reminderSet: true,
    reminderTime: "09:00 AM"
  },
  {
    id: "dead-2",
    title: "Group Project Draft",
    course: "Urban Planning 101",
    dueMonth: "OCT",
    dueDay: 15,
    dateStr: "2026-10-15",
    completed: false,
    priority: "medium",
    reminderSet: true,
    reminderTime: "02:00 PM"
  },
  {
    id: "dead-3",
    title: "Final Quiz",
    course: "Data Governance",
    dueMonth: "OCT",
    dueDay: 20,
    dateStr: "2026-10-20",
    completed: false,
    priority: "high",
    reminderSet: false,
    reminderTime: "11:30 AM"
  }
];

export const MONTHLY_REGISTRATIONS: RegistrationMonthData[] = [
  { month: "Jan", fullMonth: "January", value: 2100, heightPercent: 40 },
  { month: "Feb", fullMonth: "February", value: 2800, heightPercent: 55 },
  { month: "Mar", fullMonth: "March", value: 4200, heightPercent: 85, isPeak: true },
  { month: "Apr", fullMonth: "April", value: 3500, heightPercent: 70 },
  { month: "May", fullMonth: "May", value: 3100, heightPercent: 60 },
  { month: "Jun", fullMonth: "June", value: 3800, heightPercent: 75 },
  { month: "Jul", fullMonth: "July", value: 2400, heightPercent: 45 },
  { month: "Aug", fullMonth: "August", value: 1900, heightPercent: 35 }
];

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  {
    id: "chat-today-1",
    title: "Lesson Plan Generation",
    category: "Today",
    icon: "chat",
    messages: [
      {
        id: "msg-1",
        role: "assistant",
        content: "Hello! I'm EduAssist. How can I help you support your students today?",
        timestamp: "10:14 AM"
      },
      {
        id: "msg-2",
        role: "user",
        content: "I need help generating a 45-minute lesson plan for high school biology, focusing on cellular respiration. I want to include an interactive component.",
        timestamp: "10:15 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4EcBQranIDmmuMRQpJfGTH5scpXqsMLLcV7MtHx-aIQEVtDpSbWp3kfysbxXGtK38KTSc4zkJu2czcn5SubEByOCOXExwNBLshrYO0zFoVbUqzN_hLAhASD6grhKSx5rat5qjWmssX9W6rYzmedGCXNSuhgTMB7B_j4Eug4ko9Fs_p0siHbJjXBRf-yjNXw0DSOILaG2owxxT7EvhCn8BZs7xID3gmo0dZGk3KMx6ch8CbgZIuHH"
      },
      {
        id: "msg-3",
        role: "assistant",
        content: "Certainly! Here is a structured 45-minute lesson plan on Cellular Respiration with an interactive component.",
        timestamp: "10:15 AM",
        lessonData: {
          title: "Lesson: Cellular Respiration - The Energy Factory",
          items: [
            { phase: "Warm-up", duration: "5 mins", description: "Quick discussion on why we need food and how cellular chemical bonds yield energy." },
            { phase: "Direct Instruction", duration: "15 mins", description: "Overview of glycolysis, Krebs cycle, and electron transport chain with visual flow diagrams." },
            { phase: "Interactive Activity", duration: "20 mins", description: "'ATP Factory' role-play where students act as different stages of the process passing 'electrons' with token chips." },
            { phase: "Wrap-up", duration: "5 mins", description: "Exit ticket summarizing the main input (Glucose + O2) and output (ATP, CO2, H2O) of respiration." }
          ],
          promptFollowup: "Would you like me to elaborate on the 'ATP Factory' role-play activity or generate formative assessment questions?"
        }
      }
    ]
  },
  {
    id: "chat-today-2",
    title: "Curriculum Guidelines 2024",
    category: "Today",
    icon: "description",
    messages: [
      {
        id: "cg-1",
        role: "assistant",
        content: "Welcome! I have indexed the latest 2024 Educational Standards & Civic Governance Guidelines. What module shall we review?",
        timestamp: "08:30 AM"
      }
    ]
  },
  {
    id: "chat-yesterday-1",
    title: "Brainstorming Group Activities",
    category: "Yesterday",
    icon: "lightbulb",
    messages: [
      {
        id: "bg-1",
        role: "assistant",
        content: "Here are 5 collaborative roleplay formats tailored for civic policymaking and community consensus building.",
        timestamp: "Yesterday, 3:45 PM"
      }
    ]
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    authorName: "Marcus Thorne",
    authorRole: "Civic Policy Researcher",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4EcBQranIDmmuMRQpJfGTH5scpXqsMLLcV7MtHx-aIQEVtDpSbWp3kfysbxXGtK38KTSc4zkJu2czcn5SubEByOCOXExwNBLshrYO0zFoVbUqzN_hLAhASD6grhKSx5rat5qjWmssX9W6rYzmedGCXNSuhgTMB7B_j4Eug4ko9Fs_p0siHbJjXBRf-yjNXw0DSOILaG2owxxT7EvhCn8BZs7xID3gmo0dZGk3KMx6ch8CbgZIuHH",
    timestamp: "2 hours ago",
    title: "Framework for High-Density Urban Transit Feasibility",
    content: "We just published the updated multi-modal transit analysis comparing bus rapid transit (BRT) and light rail expansion models in mid-sized metropolitan areas. Key findings suggest a 24% reduction in congestion when dedicated lanes connect secondary civic centers.",
    tags: ["Urban Planning", "Transit", "Case Study"],
    likes: 42,
    hasLiked: true,
    replies: [
      {
        id: "rep-1",
        authorName: "Sarah Jenkins",
        authorAvatar: USER_SARAH.avatar,
        content: "This matches the data from our Module 3 case review. Did you factor in off-peak grid load balancing?",
        timestamp: "1 hour ago"
      },
      {
        id: "rep-2",
        authorName: "Dr. Chen",
        authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3avyYxxL7qCDosjUNEPcSN-bg5aeYZnMIlI4bmC8XEit0anQC1ek8koI2TgtiNTE-MGdMP8vevPvMQyOpQMFroClpi6C-ha8fClYkA-MmksH_7WcwojdbIMJRmwOqMIdXGvd0yK7kmUbkTlRXwfppSHuSpxV8MScpsUh8MRAs1f4S_MSQA_qE061ISXOkhwkfzaALkB2DGevEF--jZjv4xnikukZEgA-hb835ABglbXAMuVNqB5W2",
        content: "Excellent synthesis Marcus. We will feature this in next Thursday's seminar.",
        timestamp: "30 mins ago"
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Elena Rostova",
    authorRole: "Public Sector Ethics Fellow",
    authorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAANi-laCDvS9hYgD-XkgTsdsXNfjH73kBdZ3-AVpojP3iomVAF6eUnPaOE8wawcoWjyPIi0NfqseZGXDJB9UmAk3NbFfID_znOWDKdQ9GRq4knX4BAUzMAU6vnosCmUD0BeLD1mdFQ29mVPvKgtMAAi_ExwlzQCfYeCYHGIG9flMtnLkNhNgo3Ca3x_KoAFCiulChE71BZ9gz0E6lowimQjY4vuglq9E8mEUqrAJBduAxuvHZGI5j_",
    timestamp: "5 hours ago",
    title: "Open Data Directives: Balancing Transparency and Personal Privacy",
    content: "When municipal open data portals publish micro-level housing permits, what threshold of anonymization is legally defensible? Check out our guidelines draft attached in the Resources directory.",
    tags: ["Data Governance", "Ethics", "Legislation"],
    likes: 29,
    replies: []
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: "mem-1",
    name: "Sarah Jenkins",
    role: "Student",
    email: "sarah.jenkins@educommunity.org",
    avatar: USER_SARAH.avatar,
    department: "Civic Leadership",
    coursesCount: 4,
    status: "active",
    joinedDate: "Sept 2023"
  },
  {
    id: "mem-2",
    name: "Dr. Arthur Vance",
    role: "Staff",
    email: "a.vance@educommunity.org",
    avatar: USER_ADMIN.avatar,
    department: "Executive Board",
    coursesCount: 6,
    status: "active",
    joinedDate: "Jan 2021"
  },
  {
    id: "mem-3",
    name: "Prof. Thomas Miller",
    role: "Faculty",
    email: "t.miller@educommunity.org",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC2E_uGI1uocDeaQv9i7zFqzBHVM8Ew2q4FJcPisVzLNazMnKWyU0rXhKuH1RLCkiLqjbACyQpiVDfz1l2lFWYiaKzSo-mhOCPqj8xu0SLsT7lTr2mIkmG3oP13S8y5CSHzgo0d-1uR_B4eHuhhXZmJXnnnNjUgA7_jXixS53cbnG9yIn3seWyAlNJzYqowIxCpFKsFfybSyeDm0YvUtW8fFUASrUlupoo3dsD2GbyttXa-KXCJzQM",
    department: "Urban Development",
    coursesCount: 3,
    status: "active",
    joinedDate: "Mar 2022"
  },
  {
    id: "mem-4",
    name: "Dr. Wei Chen",
    role: "Faculty",
    email: "w.chen@educommunity.org",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3avyYxxL7qCDosjUNEPcSN-bg5aeYZnMIlI4bmC8XEit0anQC1ek8koI2TgtiNTE-MGdMP8vevPvMQyOpQMFroClpi6C-ha8fClYkA-MmksH_7WcwojdbIMJRmwOqMIdXGvd0yK7kmUbkTlRXwfppSHuSpxV8MScpsUh8MRAs1f4S_MSQA_qE061ISXOkhwkfzaALkB2DGevEF--jZjv4xnikukZEgA-hb835ABglbXAMuVNqB5W2",
    department: "Data & Technology",
    coursesCount: 5,
    status: "active",
    joinedDate: "Nov 2022"
  },
  {
    id: "mem-5",
    name: "Maya Lin",
    role: "Volunteer",
    email: "maya.lin@volunteer.org",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK4EcBQranIDmmuMRQpJfGTH5scpXqsMLLcV7MtHx-aIQEVtDpSbWp3kfysbxXGtK38KTSc4zkJu2czcn5SubEByOCOXExwNBLshrYO0zFoVbUqzN_hLAhASD6grhKSx5rat5qjWmssX9W6rYzmedGCXNSuhgTMB7B_j4Eug4ko9Fs_p0siHbJjXBRf-yjNXw0DSOILaG2owxxT7EvhCn8BZs7xID3gmo0dZGk3KMx6ch8CbgZIuHH",
    department: "Community Outreach",
    coursesCount: 2,
    status: "offline",
    joinedDate: "Feb 2024"
  }
];

export const INITIAL_WATER_TRACKER: WaterTrackerState = {
  targetMl: 2500,
  consumedMl: 1750,
  glassSizeMl: 250,
  reminderIntervalMinutes: 60,
  remindersEnabled: true,
  lastDrinkTime: "45 mins ago",
  streakDays: 12,
  history: [
    { time: "08:15 AM", amountMl: 250 },
    { time: "09:30 AM", amountMl: 250 },
    { time: "11:00 AM", amountMl: 500 },
    { time: "01:15 PM", amountMl: 250 },
    { time: "03:45 PM", amountMl: 500 }
  ]
};
