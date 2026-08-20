import { Program, GalleryItem, Announcement } from '../types';

export const LOGOS = {
  usEmbassy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL7bxuYrbhDPFMABqOFTpGOlsnRidQqLasZ2cslLg-wzcB3H1LhfwBfTTEmo8Bmhev9lhZpdqsjknBGYqHjqlsjsLhmEDIQimoXFsVDruQAa7CmkCwi_MvqvOBfCwmF17TuENDNR6sQK_57UG3Q24I8ELpDc3jILO4TvzVOdW3epecPd7brc_A9zzMiiISVN86F-uG71dGzpyyXaHrH3M-DKEqWJXSTNCBK36ekb095YMs-HP-Fy6hPIztsQTr8LWjXA',
  americanCorner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXI2JpIWXySNXdnXjn2fLwyAgN_P8N2CAIR4Ms6eNEdGlYCnTP6YLgVo4nDMrfz69EbiWeJLQj8G4sCT9ZuySqr4kbyECg0Ok4_IuBR7TGlseyrt2pabxSVMrmwLTfIMJv2OyLPDGty9Cze5o1abaTOYpmXxgv9-Ehmn6Hbqk8oFfDBimBXkpyrz0wGR0EywpZQrZnMKehm2gxv3ILfxZa61-n2m3IKKb2BuVPbA3OmZ3gmFeMK3mtKAASb9Ohw_6yQQ',
  usEmbassySealFooter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLyECChnSGgLMNDOkG9uLIPAF4M-QxNcfUoG6qtUcYhagl7geA3tWSd9Vou9NhN_tru1LxCGNtfhgNz-fFhQLR_TSqtz_C6pbt7grVSydKsjOgq7hGG8JxEPRNqSgqbf-HkzujnozX7e2fSiy5EZmchfKTBmluvAgxz2-JYvYx3bwB3wHr2YCUgXedROpRi_LkAXwKBBVhCuOuQHDKxIVdrfJsFZl_lzW1VUYXHEFNBdBaEWhibiUK2SS2nHuV0EEgJA',
  usEmbassySealSquare: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL4zZ8iMqlfR3sSb-dIXY-OD0ZnL7kzCLPKQ4MEG1r1WKT1xZFhanMl4DfCy-N4y9odu7QHoYj0InT3e9nn9ga4yEG6p68gM6fHrVUa426bm25YTZ14FIY_ctaYgwBHwLEH_jiRfPoWKuvDm-DmvmKvfncPcjDNI7yOgBxAVdbGswlutQA9SdBv9FD4VS9K1eMaSJx6K5wcqGXcCVGs5i5cE3E0g7A2AiwQp_ruSmbvXYQlb1UZ-wxM5qqJmoHwgmYOQ'
};

export const HERO_IMAGES = {
  classroom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl6ouTLjeH76oYul8kJjk7XwlXoHzF6zGV7ZEVMydcF5g9Ckl3kB3dJDjkA28cf_y7UyRMOpDAPp4Ny0OdbWpVj6qPT-MyZX9tfP05kkXuieLydFwsO5Ix1QFhitJ0bN8a3jMGv5c_1ytSdxsALYLsBTTS8bgqxncz1mWuHi2jk30ugjvMV-rEBYd3oCq-CoBcTu-KDall98DXC_mVBKatxabGRH_fR6wYcfOELGcEl_QbCEk_W25Q',
  exterior: 'https://lh3.googleusercontent.com/aida/AP1WRLun5n5vdBtqPWgRTUzFsYXLMjSzgx64YFH7TrZkaqfVJFI7VcGVDnLl2SenNSEhoG3oRt9X7O1PFxb-qlvrgT06RBKshu2J-psHavFsM-NsTkqjxfcXp8NbdzwCyVyuNC-FqjG0TfBPe7PipRgqPaPX0Gg2LabKlH1_oZBfU3cIMedmfLyDJt06YT0S_WgIKNGQRpwh1Nxwgw-T_q-SvIRoyZnVBRfruIIEN-z1zJ7CMCwlP0WDDqyPOu0'
};

export const INITIAL_PROGRAMS: Program[] = [
  // Certificate Programs
  {
    id: 'cert-web-dev',
    title: 'Web Development',
    category: 'certificate',
    duration: '12 Weeks',
    description: 'Learn modern web technologies from scratch and build responsive websites with HTML, CSS, JavaScript, and React.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvAArYMcIe7W-AzudTU6w6YqAao5zWHDB4pzkkN__Owhdf0iQ1QVJxtFt0TryCnd5t5AdVsZOrlPRpt4iA5yfNLutLy3VhZqBEU_ahb6QML5vwkB4gIuAzpEJU69PiR_9Q1qDvbyPWQT0vzqn5aJCOiQWQ8znojyiNCSlHsXg64rEN3L3phjNYF1jOn0_TO5S_cY2hODT1ixlwCM_Z5IxFAQgazTlxYPw_KBXwLl6Yf9AX9D2pHjFd',
    level: 'Beginner to Intermediate',
    instructor: 'Eng. K. Arulmoli (Full Stack Lead)',
    schedule: 'Saturdays & Sundays 9:30 AM - 12:30 PM',
    enrolledCount: 28,
    maxCapacity: 35,
    status: 'Open',
    featured: true,
    prerequisites: ['Basic computer literacy', 'English proficiency at secondary level'],
    topics: [
      'Modern HTML5 semantics & modern responsive design',
      'Tailwind CSS and UI Component architecture',
      'JavaScript fundamentals, DOM manipulation, and asynchronous APIs',
      'React fundamentals, state management, and modern hooks',
      'Git version control and Cloud deployment on Vercel / GitHub'
    ]
  },
  {
    id: 'cert-bus-comm',
    title: 'Business Communication',
    category: 'certificate',
    duration: '8 Weeks',
    description: 'Improve professional writing and speaking skills for the modern global workplace with practical simulations.',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuRpug3kqtfEJO_zHuwWpbicy4_QhZAs9Xaxu7ffcfXOZxgyyRlTKwVS1gGLDhHr90CsDfOuj2iq4R93RrZS5XL64vogiX4bN9j1a0cI3QZRhL14lYvM-WMeqeOUgocJn7n8QOxqLVpDjVX760qrucJ5kTRRBSZ1dyFnx03WFV_SoCq4pZbe6rkO1vksk2Hefm0e04Ysj5fRTaTtqB-VoarOXO8Y2y-BgnNpPmxp1cH_dQiQqytUwGJqWw',
    level: 'All Levels',
    instructor: 'Ms. Sarah Jenkins & Local Corporate Mentors',
    schedule: 'Tuesdays & Thursdays 4:30 PM - 6:30 PM',
    enrolledCount: 32,
    maxCapacity: 40,
    status: 'Open',
    featured: true,
    prerequisites: ['Commitment to regular attendance', 'Interest in career development'],
    topics: [
      'Executive email drafting and formal reporting',
      'Cross-cultural workplace etiquette and diplomacy',
      'Negotiation dynamics and persuasive pitch delivery',
      'Virtual collaboration via modern cloud suites'
    ]
  },
  {
    id: 'cert-pub-speak',
    title: 'Public Speaking',
    category: 'certificate',
    duration: '6 Weeks',
    description: 'Build confidence and deliver effective, impactful presentations to inspire diverse audiences.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbRn7d6qxiG4ZBcCFmw4szulvFvqzODKVH3TzTjDEEvsmIPF65u2ziBRtbtKXNsa0GQfIrr4UnNdeLGzEr-ryLjN99JmG1Ckulkf6DH6mPAimWMt56D9WJaW4QJpE4onAhCvDn9JJrcA-Z7zXdJ_-2MeEhJil-NSNJfuoIzJWsxt97GV88Bpt2dYKFbQk2bdj31e6RoIIue7tKun8qiCqgEXPgJzmPcR9i3HHb8ceU-rX-EXexUchY',
    level: 'Foundational to Advanced',
    instructor: 'ACB Toastmasters Alumni & Public Affairs Officers',
    schedule: 'Wednesdays 3:30 PM - 6:00 PM',
    enrolledCount: 24,
    maxCapacity: 30,
    status: 'Open',
    featured: true,
    prerequisites: ['Willingness to practice on stage and accept constructive feedback'],
    topics: [
      'Stage presence, posture, body language, and voice modulation',
      'Structuring impromptu speeches using the PREP & STAR frameworks',
      'Overcoming speech anxiety and managing audience engagement',
      'Final Speech Showcase with judges and certificate ceremony'
    ]
  },
  {
    id: 'cert-ai-bot',
    title: 'AI & Chatbot Dev',
    category: 'certificate',
    duration: '10 Weeks',
    description: 'Learn to build chatbots and integrate artificial intelligence into modern applications and business workflows.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFFVOe323ERD42FlMXc-CoM9u7mw4BMlVu3A-nakxHWC4rDlde17sVQeH0A484J2mW-hxHRwAuVnYN6kVLJzrrBQe7MMiuowZSh2LeikzEf8MGC8-QHK2jYyBcpPuTA4di81dc_D-8AfTTrZJ0TpZg5VFsR0t-8VR5mqOWq_pCAvS4R8Eg0m7oe34wdMYXWTgBoTaDWMzQ6JnLwAld1SPFsfhuP1ttslhySeu1LWcNW8bo0OwiIcOo',
    level: 'Intermediate',
    instructor: 'Dr. T. Ravindran (AI Specialist)',
    schedule: 'Saturdays 2:00 PM - 5:30 PM',
    enrolledCount: 30,
    maxCapacity: 35,
    status: 'Open',
    featured: true,
    prerequisites: ['Basic programming knowledge in Python or JavaScript'],
    topics: [
      'Generative AI models, Prompt Engineering & LLM APIs',
      'Retrieval Augmented Generation (RAG) and Vector embeddings',
      'Building conversational assistants for web and WhatsApp',
      'Responsible AI, safety guidelines, and production deployment'
    ]
  },

  // Thematic Programs
  {
    id: 'them-law-liberty',
    title: 'Law, Liberty and Civic Responsibility',
    category: 'thematic',
    duration: '4 Workshops',
    description: 'Learn civic values and responsible citizenship through interactive legal and democratic discussions.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7aoGN7cHJzDDkhlxmXPPkEDDSr_0hsYw3_wI_tAVQtHHOEXudm2nhE-sF6Fh1HHQBICqERn1aYOv1ZzjAo7gzMqUQBxDykgWWP_UzeVdphBiC3uN8mmfdBaAqk8yL-CeKrW81LTX1HzFx2MmkAT6ufBl8f8T8kPGYT-ahlowZR9F2gFf03cala9n1ZYtFESaIboBkq7CRkQgyIp8v3P14d8qRaQBH-1GNjOHLcQdw0Q4Mru0hBzMk',
    level: 'Open to All',
    instructor: 'Senior Legal Practitioners & Civic Scholars',
    schedule: 'Alternate Fridays 3:00 PM - 5:00 PM',
    enrolledCount: 45,
    maxCapacity: 60,
    status: 'Open',
    topics: [
      'Constitutional rights and civic engagement principles',
      'Community advocacy and non-violent civic leadership',
      'Rule of law and democratic institutions'
    ]
  },
  {
    id: 'them-independence-day',
    title: 'U.S. Independence Day',
    category: 'thematic',
    duration: 'Cultural Series',
    description: 'Celebrate culture through community activities, American history insights, and collaborative youth exhibits.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMD1ZXv5-6L1gZOqeiXri_gi9dPdgV8sAVjXrJB35Mbntl5ZihXjkD0xsYCwNeCN1ureZq3NpZah_VuYRrU4pdYGomeg7nmj8daUwMxvLUp75wEzANeb7g_fyDbzflykhqnlvd5-XFGheqPZ4sF3jEpzGDKPX4pXqSaejPC_FyhaXksGMfRfh2hiSb8vHgYqk-VgCmDDIVssvHmHmGs1Adqy24eli1Cqt1twOrdlO1Tquq2N2qmzNS',
    level: 'Community Event',
    instructor: 'ACB Cultural Exchange Team',
    schedule: 'Annual Summer Celebration',
    enrolledCount: 150,
    maxCapacity: 200,
    status: 'Upcoming',
    topics: [
      'American history and the Declaration of Independence',
      'Music, culinary traditions, and trivia competitions',
      'Collaborative youth art installations'
    ]
  },
  {
    id: 'them-notebook-lm',
    title: 'Google Notebook LM',
    category: 'thematic',
    duration: '3 Sessions',
    description: 'Organize research and boost academic productivity with Google AI research tools.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtw1GZ0Sk0Bz01S9yEg6XpYP8XHqzUbtU5plDdLc3XpB3rrnpYn-ObKeamq_fwApoHgd2Q500fhpLe566MeT3pdi1NsQd-4QCpkZi8F4HdP2XXx7JM3i4X6Eexnak2hk3TQn1PrbTSqgcAk_lRlfH15mwx2VbyK-09SOyG8tvtNcTKAJvTjm5RdiCRVJyGqxhCCTnRwTyE5GkAxMPNHHbuNCeR5ft6xs3JklyJFEXmCqubo2_SiIDf',
    level: 'All Students & Researchers',
    instructor: 'Google Certified Educator Mentors',
    schedule: 'Mondays 4:00 PM - 6:00 PM',
    enrolledCount: 38,
    maxCapacity: 50,
    status: 'Open',
    topics: [
      'Synthesizing multiple research papers and PDFs',
      'Generating audio overviews and interactive study guides',
      'Fact-checking and citation attribution with AI'
    ]
  },
  {
    id: 'them-english-cafe',
    title: 'English Cafe',
    category: 'thematic',
    duration: 'Ongoing Weekly',
    description: 'Practice conversational English in a friendly, low-pressure, interactive social environment with peer speakers.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnCWK3H7S-L41ygG1IERwGrKgbMrpjBRjYHYiHS_vsg14IuHOlUKZOwXBv11MZvEQkT6jTDACYbYwnqSWm6qX9wxNlz5x43nF6QS2uxUZkTBCa9pTXuRVMX9tZvDq75WrmU6bjQv2vFH1u-85xsTwsxEKzPfmTTybmZLzMKMu3tlwkw0hzIELQEr1SRzHpWWtSRIOwCnRf9c-xob64ixFgEHTKDFcvaYaLYnQ9mtZeiV_jULg6B9LE',
    level: 'All Levels',
    instructor: 'English Language Fellows & Volunteer Facilitators',
    schedule: 'Every Thursday 4:00 PM - 5:30 PM',
    enrolledCount: 65,
    maxCapacity: 80,
    status: 'Ongoing',
    topics: [
      'Interactive icebreakers and debate games',
      'Idiomatic American English phrases in daily conversation',
      'Pronunciation clinics and storytelling rounds'
    ]
  },
  {
    id: 'them-us-bridge',
    title: 'US Enterprise Bridge',
    category: 'thematic',
    duration: '5 Workshops',
    description: 'Explore U.S. business, entrepreneurial mindsets, venture funding methodologies, and startup incubators.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSur-EmQ1ugqb5nUUXogiyvtWH7Oeal8gJSX-t0vzAQ5HRpRQNONxP0HDJa-A4ZwLvkJUApoSPQP14D3Dwegm3pKcm7-NoQEHjAmKn0ZwIEVpFUm3FYQgQZ8PrByig8xPRUzYNzjtKN3Vs98pjKnGhHCivGIMDLkHsCb4NU9MWQSquBavJ8WADXiIX9bl_4ip5Ai2RhypLMsH5ULGCjvkLrnuFSGdfU6OQcGkN1T6a54i6IhHCMAJN',
    level: 'Youth & Aspiring Founders',
    instructor: 'Visiting U.S. Exchange Scholars & Startup Mentors',
    schedule: 'Saturdays 10:00 AM - 1:00 PM',
    enrolledCount: 40,
    maxCapacity: 45,
    status: 'Open',
    topics: [
      'Lean Startup Canvas & Customer Discovery',
      'Pitch deck engineering and investor storytelling',
      'Connecting to U.S. – Sri Lanka trade and grant networks'
    ]
  },
  {
    id: 'them-dyned',
    title: 'DynEd English Program',
    category: 'thematic',
    duration: 'Self-Paced + Labs',
    description: 'Improve English using award-winning digital learning tools and interactive multimedia speech labs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGFv1rI67wslBzaHpNaSc4HBeYYwP7GVmWmggBALVxNGzl38ytu8nbe0kFjL9vtLTnFUBySr2LZQRRpUt4zRwrwRo-7Fa4JjJ9fYm8AwM8_gyRB3aD39yKeABjfv3lMviQ67m4lmPSzMlUm_15xGitBy84Dmc95Bw61hIpuORsAGAfvBaMIvpHVqJCyK1C5P_-buMFki6Q3lyQGqTaYl6BuHQQ_DJ2qieun6XZ6PGUQFw_kva1Nz1Y',
    level: 'Personalized Leveling (A1 - C2)',
    instructor: 'Certified DynEd Coaches',
    schedule: 'Open Lab Hours: Mon-Fri 10 AM - 4 PM',
    enrolledCount: 85,
    maxCapacity: 100,
    status: 'Ongoing',
    topics: [
      'Speech recognition and natural cadence training',
      'Grammar mastery via recursive listening modules',
      'International CEFR standard certification exams'
    ]
  },
  {
    id: 'them-linkedin',
    title: 'LinkedIn Management',
    category: 'thematic',
    duration: '2 Masterclasses',
    description: 'Build a standout professional profile, grow your international network, and attract global career opportunities.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYbOzl4yCCPp9vB3aCDqaMn2aJVyd0UvatK2XRSNGTDSbBUE0fZDI29knPN4U8A8WF-oKuSyouNv1AAyYKUjXV7SBjNMcaWjoWEyOHWfdvXuh1W1ELDSKht6_npZZdQwplxnCDjXvTJs7tJHNVj0ujITvUFCPkORoIs8Dcynv4b-PJI-8RsPgOQ9ALPLQXhZI8j6nqthUMxAUX1hiOxG1FOt-QO8iqRGnea6FOn3OilApmET5DlWq9',
    level: 'Students & Professionals',
    instructor: 'Career Advisors & Tech Recruiters',
    schedule: 'Weekend Intensive 10:00 AM - 2:00 PM',
    enrolledCount: 50,
    maxCapacity: 50,
    status: 'Open',
    topics: [
      'Optimizing headlines, summary, and experience sections for SEO',
      'Publishing thought leadership articles and portfolio highlights',
      'Direct outreach strategies for internships and scholarships'
    ]
  },
  {
    id: 'them-claude-codex',
    title: 'Claude AI & Codex Program',
    category: 'thematic',
    duration: '4 Weeks',
    description: 'Learn modern AI tools for coding, full-stack automation, and developer productivity in hands-on workshops.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvPQ7vz8LzA-I6_mnJyyMNvLI71rpmCSfDxjC2-X5eSMggQxyp4-ra3wGq1Xa8VlpbOn9CIQrmcnIm_PoTZ5BXWWbecRP-1pbOMP4tIlmAMEcAoykc7QKXPtrJ1ztV3tS6IlxW5bQu8imtRzVG290I-9cYWUJZGyfe_Q9-QLoosaYkshYFQXbmVmM1PlQg5ve_-i4SNQUCb4JgNyKx9UM41VUayPqpXMaaASi_oQefult01cxSHIsP',
    level: 'Tech Enthusiasts & Coders',
    instructor: 'Senior Software Architects & AI Researchers',
    schedule: 'Tuesdays & Thursdays 5:00 PM - 7:00 PM',
    enrolledCount: 42,
    maxCapacity: 45,
    status: 'Open',
    topics: [
      'AI-assisted software engineering workflows and best practices',
      'Test-driven development with AI code generation',
      'Refactoring, debugging complex systems, and deployment automation'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGFUB9-7vo_VSK-N-bEYRbJPrJAlEmzh-Fv166Rbu72cQa_FlRi4DWbztxYGf3LB-bBPoLLAWkByTXmSeEMxB1CCFAbOXkwbYgiR59cN5A_1NeH9-YiDVd8ul4P8utHq7_gsSkCXhz69BkmUcKH7b6nH0OaHyOqJ3jNN7wYqatjDZkodoFmDNgCXedaHwWcTBDc7EPbpS_jPMEJtVwaZwpZIm01Rua55q_pUV1dwL9RTzizHsvjhwfiMMKNVLSNUsBHQ',
    title: 'English Language Program Interactive Session',
    category: 'Education',
    date: 'April 2024',
    description: 'Visiting English language specialist guiding an energetic classroom discussion at ACB.'
  },
  {
    id: 'gal-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLqmg1Hb2YCTtFan47KOCXeyzzawISjOjqM0WnuTvZRA9376zLfcoMH7zduxivbTAWz2J2HY598doqZs4lRz8Lv7vFLtouM78_E4DRBAhBIwONImpNDn0TDno7EyfwQ08w4QNLgqauKrwKyFcuoNosXvDtU2avp6kQVGWW0-vtgFmTDXnVBUvlYrG1XHgGW0__l_GSQKAITLnqhtcFl3SLbu7_O-fEokfbaDxDKZJ4gmseRYDVA9I9Q-HkJ9dXdgQaXA',
    title: 'Leadership & Graduation Cohort',
    category: 'Awards',
    date: 'May 2024',
    description: 'Graduates of the Advanced Youth Leadership Program posing with faculty and dignitaries.'
  },
  {
    id: 'gal-3',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYVZoEEcqxdr9AQ445Cq7Mmng5leo2CyTP__klb9ASs5y8moVevGgCZaBCIOEpNfsR7N3Opukz43yRL7BNAiMBLVI8Zs1LuPFahHkOwjqeFg5HvoKhFV_dgx6XKFFcZCmmfc6IwqhDDYTO3YVZAuWvPoFkWQQwFx5xEPvWoJNH_pFYOGtkJa8AkinuQfVBRwRTKbKY6DEsz_ozuhkiCln-GjOlW-tM8nbMI6VjEICilWzbKPXNoLqADtMGCuplMc0_aA',
    title: 'Awarding Ceremony & Keynote Speech',
    category: 'Celebrations',
    date: 'June 2024',
    description: 'Keynote presentation celebrating outstanding youth innovators in Eastern Province.'
  },
  {
    id: 'gal-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDehC2_LRemeBM_LdzlRisXNdcnydZHs_PJYMgBHZK-eQVWgKfzKTxu9ditFsxnDoBOgiGNqPxaAxOxZtG3_byHlFlAPzK88OIHP2QlGY_h2CL1sPxbhdYmhgvtRMk0Kl_ox6kauALjoyJcXOcH38WKZe5M1DlBavPm5IndiSGKHDF083bFE_-7P0SQ0pNKtEMISrxLJrUW_P5Sb3dELzEb-AOKHUpIuvJa1FmlK9GqmCgPWyvHe8DY6Rmm4h_1nYPWgw',
    title: 'Colors Night Cultural Music Performance',
    category: 'Events',
    date: 'July 2024',
    description: 'Youth music ensemble performing live acoustic songs during community Colors Night.'
  },
  {
    id: 'gal-5',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWl_Usho8jRXp-dtr3CwLiA5xybJ2Gx7Unf-Lw-TwR3NK_S2figglrI27dVj5JKFlUwIXYYo-j2geZU6zlF01EPUmLX1cDUapiUeKmSKHDNb8VEzKn-MsemwlZYpqDh41MaRSepqEAIscR6AgiggYu3YqGZ3e8aA1pwUSZ7hM8Dqtcb3NSwlNoe0kMogd1mBXX7QyG1lYTPg4H0pb7UqkjIBZUN_4by7jzBfcAsSGiLOCdDKQ3I57I-hO9osJpNFBumQ',
    title: 'U.S. 250 Milestone Community Gathering',
    category: 'Celebrations',
    date: 'July 2024',
    description: 'Celebrating the historical ties and friendship between the United States and Sri Lanka.'
  },
  {
    id: 'gal-6',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI_Y9iCGfTh2OHd7jONJOBtPrXjGiBOwwPuWPXFV0Gls0dLUB4erGMKmIglq_vwxzlJU4ajtP87FKlElD5knqFl3bMrsv4HG_I4I-32yTqaC7Pg7Tro36ep-n7kqw0rrldJYfwL9exlApb1Wp_yyAV4LjgE1w1xu1SkbF0zLcMvbdC7yCKJR5AkozaHzFy9wfQf0TZXKU2Nh53i96pGVDsfhI-UMc2sAbFsqhZvxpusVY9C-6hfCVyNiOPXh5wedzZuA',
    title: 'American Corner Refreshments & Socials',
    category: 'Events',
    date: 'August 2024',
    description: 'Community networking over coffee and refreshments following the weekend seminar.'
  },
  {
    id: 'gal-7',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc7JrKfhuNe8k5Z9FewMMnm0ac4VESQRTOHQ6RfzpB4c8QBfjWKmWuuKYLhDjQrZ-pw8uQanpC-eu9y9JHmnP_n7A_YxVq2Hi5Sioo6nJDPL7j7cMouBf8nHtwtN5u4p-TEMJ3jN1wn23FbufAkF469hRE3R-40f54qDZ9gmw4zFjcBRUkwkcostFIOYdZcwhmpgWt2JuWBjks2p-WK620_Y_fs3fhKbSU9XKio_o65kE5yOkc0ypGl9mFGP-n9CbTWg',
    title: 'Public Speaking Batch 04 Graduation',
    category: 'Awards',
    date: 'April 2024',
    description: 'Proud certificate holders of the 6-week Public Speaking Intensive Batch 04.'
  },
  {
    id: 'gal-8',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkE9M6P6KwfyzZIWFjpassV4YUt4VRwjy9bdGlXMmfo20lMkhlMqrw4JWTQqtdx9UPDG6gUGh2Uaap_-uzq2VR71j7WrxvIbJPd1LmWhFzEWFOi7xYJGMGdDIDLzrv5c0erLTtZU-mQTnxZF1prNUMqLbo2RpH_QmtOnD1DX6YUrreMlN30T7xaKlaRsxTcicvpj-6HpMAlEi50S2SuQcn1aDXQfe74bpZAvdBXg7Fp4n33Wi6GW3RKlYjMN2epUazSw',
    title: 'Youth Volunteers Team Spirit',
    category: 'Workshops',
    date: 'May 2024',
    description: 'Our dynamic student and volunteer coordinators celebrating a successful outreach drive.'
  },
  {
    id: 'gal-9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQCKdPo879iUcXfp5HYg-2ruvmEqPlRicZxO_OjpvHS38u5z7PK5ce3Iiv9_o9b9fupuO6KkT5W0_MKnfaPgUe03Hzc4L3t5OrvuRKOmrPTIrDt1m50GZ3pxe1Ix8JXlGdN7eRLtQwG1rLICuI5kHglADQ7CQUtSn5BXlax5kyvoz8e9iNP7xt4WsCtXv7YWZWoeXMVti6cBGyVUFhC8Uwgc5Jf790nOGKwpqXLoYqb8U-GeDFDB5DS-HsIq7bl7bp6A',
    title: 'Dear America Letter Writing Awards',
    category: 'Awards',
    date: 'June 2024',
    description: 'Recognizing outstanding creative writers in the annual regional essay competition.'
  },
  {
    id: 'gal-10',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ1aeNuY6X5sYW_Y2zfeUjCpvuUf5JFFCdcrCqHKGjCWaHo6lE3hqBppU69lOUL-RlJgsscAmyBmpVgIrYqPPLnN6t2EkgGgxM_W0yltkdORqgSPPmvOmIUiZJqzQvAL0Xqb0_mo3aRpCtidn-nZpJpJj_PQbMnFZl9tI7NkdDsKc7-LJjvvjE2-T_d-6Dkv2BjOTh6wcbVcrr7yvra5bjYlxzBkqiR2jVb57DPHmQKBwi8Bgg35Sa9MMXsqBgOdIR1g',
    title: 'School Outreach & Eco Day',
    category: 'Events',
    date: 'July 2024',
    description: 'Tree planting and environmental awareness with school children at Batticaloa.'
  },
  {
    id: 'gal-11',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd9mRI4PT4ZU2NvyjCJ8bT4ayU5yCZBk9G7HWhnWhtngrXFGbUsdQJygEANi1pukEDeQApDpdyp0RBbD8xrGZZK_Y0yJPDQufi1z-JXA9fygrSU7MXCIlyLkPkmR2_Y9gR3pu9YLfvoZTq-FqZov7svGfYQro3PhQhBNyYLncnAxm-B0bAX8QGmuswJQ4rNsd6Yad_Srf4EwUuvwJEAGmXyArFNU81o-kv4ml7f7GnD6tWTBiMwvY9cJbjG5eB7Fu10w',
    title: 'Cultural Exchange & Diplomacy Visit',
    category: 'Events',
    date: 'August 2024',
    description: 'U.S. Embassy delegates interacting with local youth volunteers.'
  },
  {
    id: 'gal-12',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQv0TgsFxhMK-3XowTy5eVtWX2pfGzIRdyW0tT5ksXiG2FRyk-KRHUKFJztwF3pMzZ0BT0wmlLqX9UhsU8LHr7CJ9D0UCb1gjYvsGml0lD27AvftLPVjzBpGA0d3Xurr2FJsZjh7nNntq6bjCUQVqur7-FF8ZPClOPOzeB_AtiDq5JnA1Co0lzyhApClk9u2QjDmg3ZMDuoXz8r4wNgD5NKquZXZDJnNfuLAHr_zuPTu9Qw4nDdU54wH3oGmsJP3G9lw',
    title: 'Regional Spelling Bee Champions',
    category: 'Awards',
    date: 'September 2024',
    description: 'Junior Spelling Bee finalist receiving trophy and gift hamper.'
  },
  {
    id: 'gal-13',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFFWwQqSrzWfkHUHGXyW2aFBlGqCc_C7WuweCMwBKvFOSHRXC4vGiDM2AxjaneKmuP7vrffy2x4Qb57HZz-Ai-VEmhWJq5DUbVEXm_oHl9jjWyR1C_a2YZuc2JcwsCLSN4XlRTbFxxe8iOHUNgECxodbXUhymVqQnUcsV0aPJELPq3smh-YRc_B40W-UkQ7p55u2p4cQsoH6KbfV0HpGdeIZDTnOOV3zz2WliPQe9aS0RqMd95fxQz2OCp9YRrYFin2Q',
    title: 'English Enrichment Certificate Awarding',
    category: 'Awards',
    date: 'September 2024',
    description: 'Honoring dedication and language excellence among secondary educators.'
  },
  {
    id: 'gal-14',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANO9STYshmQDeW2yVmurtOcXFU2P1Dx6K1YLiUXnCf8AfJa-EKxGWBkDnnywM3iyHPokKCOZchfH9u1rt4Fd1e7PKyNACqMr_qHUVF-X8hE7YM3I07f0CSYEaPsP6xIraC4iTAoaAlY48Nub7i1h_iUbKSLaANC5gSp9qSqAM1bMODkUoViJJrCQQhN0w4a7wZY9vUM_vuH018Lzvvw_-7d-5GFrx6V5e2xr3YPt_a1_TCAP6Yj5jEEdIgjW59tTbshg',
    title: 'Essay Contest Winner Accolade',
    category: 'Awards',
    date: 'October 2024',
    description: 'Certificate presentation for high school essay excellence.'
  },
  {
    id: 'gal-15',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB6td2So15BJ96hIxrJPu9dKgpG-LgV467w1QUSf3hxwWe9zp3H-tmYUWVS-Ocwy_aI-1_mYJ3k-neep2UZHzLz20RmSr6yMyqAGh-E5ADMkp2-4fj6Ha2c8SUdXuMsGfJUuUGEVVURZUwxzHANWbROqzU3NeJG4f2WRY_Pve9DwbbNudGJKvJl0YuPtH_occeo_L-Tgyg-w1aasZwwrxhvDct6UVifda5w2us_FixW7KyI1jpw6NEmBVR5RRgbhlUPw',
    title: 'Maker Space & Robotics Demo',
    category: 'Workshops',
    date: 'October 2024',
    description: 'STEM workshop participants demonstrating IoT prototypes.'
  },
  {
    id: 'gal-16',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDldD4Qso45xi6yXYnnFOtUtYPHWAhJxut7p84DkCbjZAfAN6oI-eVkBOPHS13WRSwptyhfsltvTErmRjaVuWCK-CxfPTUeFiQ2Lo9b6j8N5MBl7OGEk8X9vzL_ALRfuaLjbrZSijJTjDoW2UK5kDOdRMSYwS58IXKgcuMaS5Vdmr-nDcCKq9HjrvP_xwRxakkGbBY2BUDa3gEkCh68jMzYQvSEiXOiLZOxgFRpv0LqCpLMqXaU7gHg5cxnfIHe-X0xDA',
    title: 'Leadership Circle & Peer Mentoring',
    category: 'Education',
    date: 'November 2024',
    description: 'Peer leaders gathering for the monthly strategy and community reflection circle.'
  },
  {
    id: 'gal-17',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWMOx74jYGKyVYtigxrqokvB2Zzkrs9KBgBghF5d8-aHh-kbyjkI2JdHLUhTaSI3VP8UZMa0MGq6XBV-_QVnGp4u2uSpaouzg_ZAULLZxFEgkIDPDmR0qFjeNXmXsze1_EM7M3_1UispjcIUBx40sShHXJKfTPCZ1mbX9NlSXi5UExev51KH8Y-roBiw_fFlNpZ4ayH7Jk65NYyn4xVWJ71O8axZWAqTqk4D-HDIkTgWTasEMCxtEeODCowGH1PJdGqQ',
    title: 'Spelling Bee Certificate Distribution',
    category: 'Awards',
    date: 'November 2024',
    description: 'Celebrating high-performing students across 15 regional schools.'
  },
  {
    id: 'gal-18',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_SafD_12XEtYwFpGV2HuV-WLYlrbK7oIEdQUh0Lu_Sc8lz1CFLRVOeOWNwqugcGxwWdfSfh0g9aNLh2grb21kmvZ44ELICVQyKR2deXKc904t_UkimCSZIegB14Wwseu94NITAbo1Vav1rQExQPfDVqv36lNwCaEBDITv96SVy7ed-DZue-KxPhcHu4wy42D6d7xxJ4FS0g4tN7_mcXJpevXDnsJH1kflhJZ_VYSON57NaseJVykDq-YvyUZteEsviQ',
    title: 'Tech Volunteers Workshop Series',
    category: 'Workshops',
    date: 'December 2024',
    description: 'Hands-on programming and digital arts workshop facilitated by alumni.'
  },
  {
    id: 'gal-19',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADjfS3EYoiRmYuRnLDRtgZe4DwMDWOJauUdSusAgJgggGBRxIErUiYyLI_1PJkG3oaeQDkRLuv2_FZHUm_YP-Wpk8WQSYb8QTxXN4H7OssRr8KHicrZrDbQH8PegaMYQ0LTMim4SDeTdX8uxFo5br2ebLFGmTPIYNJrJ8809GjYM_0BjlwHZJrhpmt91FNah8OZGOcaPfDvvitbvod6tBFutd38fzfCJwEzpo-tvkeGuiWBy8q-J2JmExsO-kkKDd0dg',
    title: 'Language Proficiency Honors',
    category: 'Awards',
    date: 'December 2024',
    description: 'Presentation of DynEd Master certificates to dedicated learners.'
  },
  {
    id: 'gal-20',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAbH9u2u_QdF8G5DZIJbiLn1izJXsOghXzuVDRp4OGDeoeAKflBDaMn8Ka5nYKCuJ6IpsBJ6vcEQ1qs6kW_VT7eAFiRwNjINXSjDCBGuVbqEbULsYdTv4v2GJm5ORLye2ILPLV2rvQOjBCtBlaOPXCvj10o1V4k0v71KnPe3KFdppfs1s2LBkF3lOxxwA1HfAI-iFy2WVUHkGghzDkB1eUWSc6NvgcAsIZgcLtRqAXqRpySvvpt9uP9Bvhg0K9qPQ6PA',
    title: 'Spelling Bee Young Scholar Recipient',
    category: 'Awards',
    date: 'January 2025',
    description: 'Empowering young girls in STEM and humanities through recognition.'
  },
  {
    id: 'gal-21',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe5bGkZQzzWfPPzsXmECSEN75uy5XGKA1vWK4vDWDZQkSD93x-lIO_ABaVw39jqDJroYgU7MHn72Hmu9uHNP61qse8hum-8EqZR8dVl-ABOJU_oUxMvggqSmr74kzc5avVFc3xgeZhRT90fc2_340HmNKN7af7XWroUCQhIm7X-feL-iLgNBM2Hh45Lnscrmf1SXw2RRDttWjRUFUyHqjSFVhC0hjxt9QXc27pFvqnzaU2PDbUodFdRZyi6jQcUv-0A',
    title: 'Cultural Fair Youth Ambassadors',
    category: 'Celebrations',
    date: 'February 2025',
    description: 'Youth delegates welcoming attendees to the American cultural exhibition.'
  },
  {
    id: 'gal-22',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgoNZbVma8Y_s9BDkuJXKdkqNf_z37I-1ShuhDuCuyCAq4z1Ofcyf7_SyBiOCQ-a_5wBZJXcy1_OdTvoFNmBcuMTtoWg0Xm9XE1QzZ7Q7cBmC6uXQVseA5Us0HdDcTjVjeHsHhySunfgd0aUECjuY4khyT0iP9vR1zfgp45nLb2We1iCaoEGxETI8X3qOAtS1CgEa0bL15H5AG2svgXo6Xi_2sGAUVUZ9RXhgkbZkOYGSdUJ3FIuJXQ3ZMhpLfiYxQFg',
    title: 'Youth Oratorical Showcase',
    category: 'Education',
    date: 'February 2025',
    description: 'Student deliverings persuasive oratory speech on community resilience.'
  },
  {
    id: 'gal-23',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp6ZFqBwv-62FvVKxOaJLJwI9tcTHOZ3ShgQRs7LyJzLNUs7nM9MlWh4hrpcqfkwTSJ4TVoz4D4kgILn4YJ7Bz_h9TBqnrX-My97t4vqC8EBH3vlJXvyyd30YqBjA4lvTW1n41Dme_7o_X6zevbHYyqVw-c4Nls0MfqlJKxUcXm62L09EmZgD2fixgynae_jdUjNwPZfVcVnjRZVt2gbEBPB4Vuw1_UdTgH6xMbdOIFmJY9bdnqEfT9fOQLMQZltiR3g',
    title: 'Freedom 250 Festival Volunteers',
    category: 'Celebrations',
    date: 'March 2025',
    description: 'Active volunteers ensuring smooth event operations during the annual festival.'
  },
  {
    id: 'gal-24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfla7iz8Gv5zSE_TApTvqWytS6QBFYW3u6ZH--_ZZVxxrA5gv-axaaG58VhuZev_UCgaQrk6mLSkLqS3tpeO_iQQVZ8l4sev-zPzHdXlHadYz5ZpRBINK1wzfALBsI1UHZLVI5HcfRL9PpFwpalmS4bNB2gYCB8RmsZLqL3uYTS90gIlKpVJrIQHpnMGw8Q67pCOHOlFjT9o_77Cu4RYDceTMufoMzXgNRXzAC7rQN58U0CC3RtQR1iBkQCWOM48Ys8A',
    title: 'Spelling Bee Finalist Medallion',
    category: 'Awards',
    date: 'March 2025',
    description: 'Young competitor celebrating a victorious performance in spelling bee finals.'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Registration Open: Web Development & AI Batches for 2025/2026',
    content: 'Applications are now open for the upcoming 12-week Web Development and 10-week AI & Chatbot Development certificate cohorts. Limited seats available.',
    date: 'March 10, 2025',
    targetAudience: 'all',
    priority: 'important'
  },
  {
    id: 'ann-2',
    title: 'English Cafe Special Session with U.S. Exchange Fellows',
    content: 'Join us this Thursday at 4:00 PM for an interactive discussion on American collegiate life, debate tactics, and conversational idioms.',
    date: 'March 12, 2025',
    targetAudience: 'students',
    priority: 'normal'
  },
  {
    id: 'ann-3',
    title: 'Volunteer Monthly Orientation & Service Hours Submission',
    content: 'All active ACB Volunteers are requested to log their community hours by the 28th of every month through the Volunteer Portal.',
    date: 'March 14, 2025',
    targetAudience: 'volunteers',
    priority: 'normal'
  }
];

export const CONTACT_INFO = {
  phone: '0652 226 725',
  phoneDisplay: '0652 226 725',
  email: 'acbatticaloa@lk.americanspaces.info',
  whatsappCoordinator: '076 236 9699',
  whatsappCoordinatorUrl: 'https://wa.me/94762369699?text=Hello%2C%20I%20forgot%20my%20Admin%20Portal%20password.%20I%20would%20like%20to%20request%20a%20password%20reset.',
  social: {
    x: 'https://x.com/amcornerbatti',
    xHandle: 'amcornerbatti',
    linkedin: 'https://www.linkedin.com/company/american-corner-batticaloa',
    linkedinHandle: 'american-corner-batticaloa',
    messenger: 'American Corner Batticaloa',
    instagram: 'https://instagram.com/americancornerbatti',
    facebook: 'https://facebook.com/americancornerbatticaloa'
  },
  address: 'American Corner Batticaloa, Public Library Complex, Batticaloa, Sri Lanka',
  hours: 'Monday – Friday: 9:00 AM – 5:30 PM | Saturday: 9:00 AM – 4:00 PM | Sunday: Special Programs Only'
};
