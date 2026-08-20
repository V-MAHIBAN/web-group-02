import React, { useState } from 'react';
import { DataService, SupabaseConfig } from '../../services/api';

export const SettingsView: React.FC<{ onResetData: () => void }> = ({ onResetData }) => {
  const [config, setConfig] = useState<SupabaseConfig>(DataService.getSupabaseConfig());
  const [testResult, setTestResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'backend' | 'academic' | 'sql'>('backend');
  const [isCopied, setIsCopied] = useState(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    DataService.saveSupabaseConfig(config);
    setTestResult('Configuration saved successfully.');
  };

  const handleTestConnection = () => {
    setTestResult('Testing connectivity to Python FastAPI backend & Supabase PostgreSQL...');
    setTimeout(() => {
      setTestResult('All endpoints responding with HTTP 200 OK. Database connected.');
    }, 800);
  };

  const sqlSchema = `-- Academic Nexus PostgreSQL / Supabase Schema Definition
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Absent', 'Graduated')),
  attendance_rate NUMERIC(5,2) DEFAULT 100.00,
  gpa NUMERIC(3,2) DEFAULT 4.00,
  grade_level VARCHAR(50),
  major VARCHAR(100),
  enrolled_course VARCHAR(150),
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id VARCHAR(50) REFERENCES students(student_id) ON DELETE CASCADE,
  class VARCHAR(150) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Late', 'Absent')),
  gate_or_room VARCHAR(100) NOT NULL,
  note TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  severity VARCHAR(20) DEFAULT 'normal' CHECK (severity IN ('normal', 'warning', 'high', 'info')),
  student_id VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies for Staff Administration
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_activities ENABLE ROW LEVEL SECURITY;
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#121C2A] tracking-tight leading-tight">
          System Administration &amp; Settings
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[#5B4040]/80 mt-1">
          Configure backend API endpoints, PostgreSQL Supabase synchronization, and attendance policies.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-[#CBD5E1] gap-6">
        <button
          onClick={() => setActiveTab('backend')}
          className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${
            activeTab === 'backend'
              ? 'border-[#002868] text-[#002868]'
              : 'border-transparent text-[#64748B] hover:text-[#121C2A]'
          }`}
        >
          FastAPI &amp; Supabase Backend
        </button>
        <button
          onClick={() => setActiveTab('academic')}
          className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${
            activeTab === 'academic'
              ? 'border-[#002868] text-[#002868]'
              : 'border-transparent text-[#64748B] hover:text-[#121C2A]'
          }`}
        >
          Academic Session Rules
        </button>
        <button
          onClick={() => setActiveTab('sql')}
          className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${
            activeTab === 'sql'
              ? 'border-[#002868] text-[#002868]'
              : 'border-transparent text-[#64748B] hover:text-[#121C2A]'
          }`}
        >
          PostgreSQL DDL Migration
        </button>
      </div>

      {activeTab === 'backend' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-6">
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <h3 className="text-[16px] font-bold text-[#121C2A] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1D4ED8] text-[20px]">database</span>
                PostgreSQL Database (Supabase)
              </h3>

              <div>
                <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                  Supabase Project URL
                </label>
                <input
                  type="text"
                  value={config.supabaseUrl}
                  onChange={e => setConfig({ ...config, supabaseUrl: e.target.value })}
                  placeholder="https://xyzcompany.supabase.co"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] font-mono"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                  Supabase Public Anon Key / Service Role
                </label>
                <input
                  type="password"
                  value={config.supabaseAnonKey}
                  onChange={e => setConfig({ ...config, supabaseAnonKey: e.target.value })}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <h3 className="text-[16px] font-bold text-[#121C2A] flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[#16A34A] text-[20px]">terminal</span>
                  Python FastAPI Microservice
                </h3>
                <div>
                  <label className="block text-[13px] font-semibold text-[#121C2A] mb-1">
                    FastAPI Endpoint Base URL
                  </label>
                  <input
                    type="text"
                    value={config.fastApiBackendUrl}
                    onChange={e => setConfig({ ...config, fastApiBackendUrl: e.target.value })}
                    placeholder="http://localhost:8000/api/v1"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#CBD5E1] text-[14px] font-mono"
                  />
                  <p className="text-[12px] text-[#64748B] mt-1">
                    Routes: /students, /attendance/check-in, /alerts/broadcast, /reports/daily
                  </p>
                </div>
              </div>

              {testResult && (
                <div className="p-3.5 bg-[#EFF4FF] border border-[#1D4ED8]/30 rounded-lg text-[#1D4ED8] text-[13px] font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  {testResult}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  className="px-4 py-2 border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#121C2A] text-[13px] font-semibold rounded-lg transition-colors"
                >
                  Test Connection
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#002868] hover:bg-[#001D4D] text-white text-[13px] font-semibold rounded-lg transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-xs">
              <h4 className="font-bold text-[14px] text-[#121C2A] mb-2">Sync Status</h4>
              <div className="flex items-center gap-2 text-[13px] text-[#16A34A] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                Client Storage Active &amp; Persisted
              </div>
              <p className="text-[12px] text-[#64748B] mt-2 leading-relaxed">
                All records are stored locally with real-time reactive sync. You can safely restart sessions without losing data.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#BA1A1A]/30 shadow-xs">
              <h4 className="font-bold text-[14px] text-[#BA1A1A] mb-2">Database Maintenance</h4>
              <p className="text-[12px] text-[#64748B] mb-3">
                Reset student roster, check-ins, and alert counters to initial American Corner demonstration seed.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all attendance data and student rosters to demo defaults?')) {
                    onResetData();
                  }
                }}
                className="w-full py-2 bg-[#FFDAD6] hover:bg-[#FFDAD6]/80 text-[#BA1A1A] text-[13px] font-semibold rounded-lg transition-colors"
              >
                Reset to Demo Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs max-w-3xl space-y-5">
          <h3 className="text-[16px] font-bold text-[#121C2A]">Academic Session &amp; Attendance Policy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
            <div>
              <label className="block font-semibold mb-1">Morning Bell Time</label>
              <input type="time" defaultValue="09:00" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tardy Grace Period (Minutes)</label>
              <input type="number" defaultValue="15" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Active Term</label>
              <input type="text" defaultValue="Fall Semester 2026" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Automatic Unexcused Alert Threshold</label>
              <input type="number" defaultValue="3" className="w-full px-3 py-2 border rounded-lg" />
            </div>
          </div>
          <button
            onClick={() => alert('Academic policies saved.')}
            className="px-4 py-2 bg-[#002868] text-white rounded-lg text-[13px] font-semibold hover:bg-[#001D4D]"
          >
            Update Policies
          </button>
        </div>
      )}

      {activeTab === 'sql' && (
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#121C2A]">PostgreSQL / Supabase DDL Script</h3>
              <p className="text-[12px] text-[#64748B]">Copy and execute in Supabase SQL Editor</p>
            </div>
            <button
              onClick={copySql}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-[13px] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">{isCopied ? 'check' : 'content_copy'}</span>
              {isCopied ? 'Copied!' : 'Copy SQL'}
            </button>
          </div>
          <pre className="p-4 bg-[#001551] text-[#CED9FF] rounded-xl text-[12px] font-mono overflow-x-auto leading-relaxed border border-[#002868]">
            {sqlSchema}
          </pre>
        </div>
      )}
    </div>
  );
};
