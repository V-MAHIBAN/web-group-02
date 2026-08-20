import React, { useState } from 'react';
import {
  ScreenType,
  UserSession,
  Program,
  StudentApplication,
  PasswordResetRequest,
  AdminRegistrationRequest,
  ContactMessage,
  VolunteerHourLog,
  Announcement
} from '../types';
import { StorageService } from '../services/storage';
import { CONTACT_INFO } from '../data/mockData';
import {
  ShieldCheck,
  BookOpen,
  Users,
  KeyRound,
  UserPlus,
  Mail,
  Clock,
  Bell,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminPortalProps {
  session: UserSession;
  onNavigate: (screen: ScreenType) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ session, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'programs' | 'applications' | 'resets' | 'signups' | 'volunteer-hours' | 'messages' | 'announcements'
  >('programs');

  // Live state from storage
  const [programs, setPrograms] = useState<Program[]>(() => StorageService.getPrograms());
  const [applications, setApplications] = useState<StudentApplication[]>(() => StorageService.getApplications());
  const [resets, setResets] = useState<PasswordResetRequest[]>(() => StorageService.getResetRequests());
  const [signups, setSignups] = useState<AdminRegistrationRequest[]>(() => StorageService.getAdminSignups());
  const [volunteerHours, setVolunteerHours] = useState<VolunteerHourLog[]>(() => StorageService.getVolunteerHours());
  const [messages, setMessages] = useState<ContactMessage[]>(() => StorageService.getContactMessages());
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => StorageService.getAnnouncements());

  // Modal for adding a program
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'certificate' | 'thematic'>('certificate');
  const [newDuration, setNewDuration] = useState('8 Weeks');
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newInstructor, setNewInstructor] = useState('ACB Lead Faculty');
  const [newSchedule, setNewSchedule] = useState('Saturdays 10:00 AM - 1:00 PM');

  // Modal for new announcement
  const [showAddAnnModal, setShowAddAnnModal] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annAudience, setAnnAudience] = useState<'all' | 'students' | 'volunteers'>('all');

  // Handlers
  const handleApproveApp = (id: string) => {
    StorageService.updateApplicationStatus(id, 'Approved');
    setApplications(StorageService.getApplications());
  };

  const handleRejectApp = (id: string) => {
    StorageService.updateApplicationStatus(id, 'Rejected');
    setApplications(StorageService.getApplications());
  };

  const handleResolveReset = (id: string) => {
    StorageService.updateResetRequestStatus(id, 'Resolved');
    setResets(StorageService.getResetRequests());
  };

  const handleApproveAdmin = (id: string) => {
    StorageService.updateAdminSignupStatus(id, 'Approved');
    setSignups(StorageService.getAdminSignups());
  };

  const handleRejectAdmin = (id: string) => {
    StorageService.updateAdminSignupStatus(id, 'Rejected');
    setSignups(StorageService.getAdminSignups());
  };

  const handleApproveHours = (id: string) => {
    StorageService.updateVolunteerHourStatus(id, 'Approved');
    setVolunteerHours(StorageService.getVolunteerHours());
  };

  const handleDeleteProgram = (id: string) => {
    if (confirm('Are you sure you want to remove this program from public listings?')) {
      StorageService.deleteProgram(id);
      setPrograms(StorageService.getPrograms());
    }
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const prog: Program = {
      id: 'prog-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      duration: newDuration.trim(),
      description: newDesc.trim(),
      image: newImage.trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvAArYMcIe7W-AzudTU6w6YqAao5zWHDB4pzkkN__Owhdf0iQ1QVJxtFt0TryCnd5t5AdVsZOrlPRpt4iA5yfNLutLy3VhZqBEU_ahb6QML5vwkB4gIuAzpEJU69PiR_9Q1qDvbyPWQT0vzqn5aJCOiQWQ8znojyiNCSlHsXg64rEN3L3phjNYF1jOn0_TO5S_cY2hODT1ixlwCM_Z5IxFAQgazTlxYPw_KBXwLl6Yf9AX9D2pHjFd',
      instructor: newInstructor.trim(),
      schedule: newSchedule.trim(),
      enrolledCount: 0,
      maxCapacity: 40,
      status: 'Open',
      topics: ['Orientation & Fundamentals', 'Hands-on Labs', 'Final Project Presentation']
    };

    StorageService.saveProgram(prog);
    setPrograms(StorageService.getPrograms());
    setShowAddProgramModal(false);
    setNewTitle('');
    setNewDesc('');

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    StorageService.addAnnouncement({
      title: annTitle.trim(),
      content: annContent.trim(),
      targetAudience: annAudience,
      priority: 'important'
    });

    setAnnouncements(StorageService.getAnnouncements());
    setShowAddAnnModal(false);
    setAnnTitle('');
    setAnnContent('');
  };

  const pendingAppsCount = applications.filter(a => a.status === 'Pending').length;
  const pendingResetsCount = resets.filter(r => r.status === 'Pending').length;
  const pendingSignupsCount = signups.filter(s => s.status === 'Pending').length;
  const pendingHoursCount = volunteerHours.filter(v => v.status === 'Pending').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-8">
      {/* Admin Header */}
      <div className="bg-[#00153e] text-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#274484]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <ShieldCheck className="w-8 h-8 text-[#ffdad9]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#ba022d] text-white font-bold px-2.5 py-0.5 rounded-full">
                Admin Control Room
              </span>
              <span className="text-xs text-[#dae2ff] font-mono">
                American Corner Batticaloa
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
              Management Dashboard
            </h1>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAddProgramModal(true)}
            className="px-4 py-2.5 bg-[#ba022d] hover:bg-[#de2a43] text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Program</span>
          </button>
          <button
            onClick={() => setShowAddAnnModal(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 border border-white/20"
          >
            <Bell className="w-4 h-4" />
            <span>Post Announcement</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#c4c6d2]">
        <button
          onClick={() => setActiveTab('programs')}
          className={`py-2 px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'programs'
              ? 'bg-[#00153e] text-white shadow-sm'
              : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/40'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Programs ({programs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`py-2 px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'applications'
              ? 'bg-[#00153e] text-white shadow-sm'
              : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/40'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Applications {pendingAppsCount > 0 && <span className="bg-red-500 text-white px-1.5 py-0.2 rounded-full text-[10px]">{pendingAppsCount}</span>}</span>
        </button>

        <button
          onClick={() => setActiveTab('resets')}
          className={`py-2 px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'resets'
              ? 'bg-[#00153e] text-white shadow-sm'
              : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/40'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Password Resets {pendingResetsCount > 0 && <span className="bg-red-500 text-white px-1.5 py-0.2 rounded-full text-[10px]">{pendingResetsCount}</span>}</span>
        </button>

        <button
          onClick={() => setActiveTab('signups')}
          className={`py-2 px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'signups'
              ? 'bg-[#00153e] text-white shadow-sm'
              : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/40'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Admin Registrations {pendingSignupsCount > 0 && <span className="bg-red-500 text-white px-1.5 py-0.2 rounded-full text-[10px]">{pendingSignupsCount}</span>}</span>
        </button>

        <button
          onClick={() => setActiveTab('volunteer-hours')}
          className={`py-2 px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'volunteer-hours'
              ? 'bg-[#00153e] text-white shadow-sm'
              : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/40'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Volunteer Hours {pendingHoursCount > 0 && <span className="bg-amber-500 text-white px-1.5 py-0.2 rounded-full text-[10px]">{pendingHoursCount}</span>}</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`py-2 px-4 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-[#00153e] text-white shadow-sm'
              : 'bg-white text-[#444650] hover:bg-[#eff4ff] border border-[#c4c6d2]/40'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Messages ({messages.length})</span>
        </button>
      </div>

      {/* Tab 1: Programs Management */}
      {activeTab === 'programs' && (
        <div className="bg-white rounded-2xl border border-[#c4c6d2]/40 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#00153e]">Programs & Curriculum</h2>
              <p className="text-xs text-[#747781]">Add, edit, and organize public program listings.</p>
            </div>
            <button
              onClick={() => setShowAddProgramModal(true)}
              className="px-4 py-2 bg-[#00153e] hover:bg-[#ba022d] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Program</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((prog) => (
              <div key={prog.id} className="border border-[#d9e3f6] rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
                <div className="h-36 w-full relative">
                  <img src={prog.image} alt={prog.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[10px] uppercase font-bold text-white bg-[#002868]/90 px-2 py-0.5 rounded">
                    {prog.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#00153e] line-clamp-1">{prog.title}</h3>
                    <p className="text-xs text-[#747781] mt-0.5">{prog.duration} • {prog.instructor}</p>
                    <p className="text-xs text-[#444650] mt-2 line-clamp-2">{prog.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100">
                    <span className="text-xs font-semibold text-emerald-600">Status: {prog.status}</span>
                    <button
                      onClick={() => handleDeleteProgram(prog.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Program"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Student Applications */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-2xl border border-[#c4c6d2]/40 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#c4c6d2]/40">
            <h2 className="text-xl font-bold text-[#00153e]">Student Course Applications</h2>
            <p className="text-xs text-[#747781]">Review incoming registrations and assign approval statuses.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8f9ff] text-[#747781] font-bold uppercase border-b border-[#c4c6d2]/30">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Program</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Motivation / Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#00153e]">{app.fullName}</div>
                      <div className="text-[11px] text-[#747781]">{app.studentId || 'New Applicant'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#121c2a]">{app.programTitle}</td>
                    <td className="py-3.5 px-4">
                      <div>{app.phone}</div>
                      <div className="text-[11px] text-[#747781]">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-xs text-[#444650]">{app.reason}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          app.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {app.status === 'Pending' && (
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => handleApproveApp(app.id)}
                            className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-xs rounded hover:bg-emerald-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectApp(app.id)}
                            className="px-2.5 py-1 bg-red-600 text-white font-bold text-xs rounded hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Password Resets */}
      {activeTab === 'resets' && (
        <div className="bg-white rounded-2xl border border-[#c4c6d2]/40 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#c4c6d2]/40">
            <h2 className="text-xl font-bold text-[#00153e]">Member Password Reset Tickets</h2>
            <p className="text-xs text-[#747781]">Student and volunteer identity verification queue.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8f9ff] text-[#747781] font-bold uppercase border-b border-[#c4c6d2]/30">
                <tr>
                  <th className="py-3 px-4">Member ID</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {resets.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#002868]">{r.memberId}</td>
                    <td className="py-3.5 px-4 uppercase text-[11px] font-bold">{r.userType}</td>
                    <td className="py-3.5 px-4 font-medium text-[#121c2a]">{r.firstName} {r.lastName}</td>
                    <td className="py-3.5 px-4">{r.phone}</td>
                    <td className="py-3.5 px-4 text-[#747781]">{r.submittedAt}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          r.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {r.status === 'Pending' && (
                        <button
                          onClick={() => handleResolveReset(r.id)}
                          className="px-3 py-1 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs rounded transition-colors"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Admin Signups */}
      {activeTab === 'signups' && (
        <div className="bg-white rounded-2xl border border-[#c4c6d2]/40 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#c4c6d2]/40">
            <h2 className="text-xl font-bold text-[#00153e]">Admin Registrations</h2>
            <p className="text-xs text-[#747781]">Coordinator, Moderator, and Staff credential clearances.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8f9ff] text-[#747781] font-bold uppercase border-b border-[#c4c6d2]/30">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">NIC</th>
                  <th className="py-3 px-4">Requested Role</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {signups.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-4 font-bold text-[#00153e]">{s.firstName} {s.lastName}</td>
                    <td className="py-3.5 px-4 font-mono text-xs">{s.nic}</td>
                    <td className="py-3.5 px-4 uppercase text-[11px] font-bold text-[#ba022d]">{s.role}</td>
                    <td className="py-3.5 px-4">
                      <div>{s.email}</div>
                      <div className="text-[11px] text-[#747781]">Tel: {s.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-xs text-[#444650]">{s.address}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          s.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {s.status === 'Pending' && (
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => handleApproveAdmin(s.id)}
                            className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-xs rounded hover:bg-emerald-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectAdmin(s.id)}
                            className="px-2.5 py-1 bg-red-600 text-white font-bold text-xs rounded hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Volunteer Hours */}
      {activeTab === 'volunteer-hours' && (
        <div className="bg-white rounded-2xl border border-[#c4c6d2]/40 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#c4c6d2]/40">
            <h2 className="text-xl font-bold text-[#00153e]">Volunteer Service Hours Verification</h2>
            <p className="text-xs text-[#747781]">Approve logged community service and outreach hours.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#f8f9ff] text-[#747781] font-bold uppercase border-b border-[#c4c6d2]/30">
                <tr>
                  <th className="py-3 px-4">Volunteer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Activity</th>
                  <th className="py-3 px-4">Hours</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {volunteerHours.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/70">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#00153e]">{v.volunteerName}</div>
                      <div className="text-[11px] font-mono text-[#747781]">{v.volunteerId}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{v.date}</td>
                    <td className="py-3.5 px-4 font-medium text-[#121c2a]">{v.activityTitle}</td>
                    <td className="py-3.5 px-4 font-black text-[#002868]">{v.hours} hrs</td>
                    <td className="py-3.5 px-4 max-w-xs text-xs text-[#444650] truncate">{v.notes}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          v.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {v.status === 'Pending' && (
                        <button
                          onClick={() => handleApproveHours(v.id)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded transition-colors"
                        >
                          Approve Hours
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Contact Messages */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl border border-[#c4c6d2]/40 shadow-sm p-6">
          <h2 className="text-xl font-bold text-[#00153e] mb-1">Public Inquiries & Messages</h2>
          <p className="text-xs text-[#747781] mb-6">Messages received via the Contact Us form.</p>

          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="p-4 bg-[#f8f9ff] rounded-xl border border-[#e6eeff] flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-[#00153e]">{m.name}</h3>
                    <p className="text-xs text-[#747781]">{m.email} • {m.phone || 'No phone'} • {m.createdAt}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold bg-blue-100 text-[#002868] px-2 py-0.5 rounded">
                    {m.subject}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#444650] leading-relaxed bg-white p-3 rounded-lg border border-[#c4c6d2]/20">
                  {m.message}
                </p>
                <div className="flex justify-end gap-2 pt-1">
                  <a
                    href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                    className="px-3 py-1 bg-[#00153e] hover:bg-[#ba022d] text-white text-xs font-semibold rounded transition-colors"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {showAddProgramModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#c4c6d2] animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#00153e] mb-1">Add New Program</h3>
            <p className="text-xs text-[#747781] mb-4">Create a new course or thematic series for the public catalogue.</p>

            <form onSubmit={handleCreateProgram} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Data Analytics with Python"
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none focus:border-[#002868]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none"
                  >
                    <option value="certificate">Certificate Program</option>
                    <option value="thematic">Thematic Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="e.g. 10 Weeks"
                    className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Summary of course content and learning goals..."
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Instructor</label>
                <input
                  type="text"
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  placeholder="e.g. Lead Instructor Name"
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Publish Program
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProgramModal(false)}
                  className="py-2.5 px-4 border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAddAnnModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c4c6d2] animate-in zoom-in-95 duration-150">
            <h3 className="text-xl font-bold text-[#00153e] mb-1">Post Announcement</h3>
            <p className="text-xs text-[#747781] mb-4">Broadcast an update to student and volunteer dashboards.</p>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Schedule Update for Saturday Class"
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Target Audience</label>
                <select
                  value={annAudience}
                  onChange={(e) => setAnnAudience(e.target.value as any)}
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm outline-none"
                >
                  <option value="all">Everyone (Public & All Portals)</option>
                  <option value="students">Students Only</option>
                  <option value="volunteers">Volunteers Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">Announcement Body *</label>
                <textarea
                  rows={3}
                  required
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Details of the announcement..."
                  className="w-full px-3.5 py-2 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-xs outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#ba022d] hover:bg-[#de2a43] text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Broadcast Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddAnnModal(false)}
                  className="py-2.5 px-4 border border-[#c4c6d2] text-[#444650] hover:bg-gray-50 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
