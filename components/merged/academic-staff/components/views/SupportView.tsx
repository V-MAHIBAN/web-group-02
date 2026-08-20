import React from 'react';

export const SupportView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      <div className="mb-2">
        <h1 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-[#121C2A] tracking-tight leading-tight">
          Help &amp; Academic Administration Support
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[#5B4040]/80 mt-1">
          Knowledge base, terminal troubleshooting, and emergency escalation protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h3 className="text-[16px] font-bold text-[#121C2A] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#BF0A30]">qr_code_scanner</span>
            QR Scanning &amp; Turnstile Operations
          </h3>
          <p className="text-[13px] text-[#5B4040] leading-relaxed">
            Ensure optical lens is angled 10-15cm from student ID cards. Unrecognized badges immediately trigger high-priority security events visible on the dashboard and staff terminals.
          </p>
          <div className="p-3 bg-[#EFF4FF] rounded-lg text-[12px] text-[#1D4ED8] font-medium">
            Hotkeys: Press "Space" in Scanner view to trigger instant autofocus reader.
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <h3 className="text-[16px] font-bold text-[#121C2A] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#16A34A]">menu_book</span>
            Attendance Compliance &amp; CSV Exports
          </h3>
          <p className="text-[13px] text-[#5B4040] leading-relaxed">
            Daily reports are generated automatically at 17:00. You can generate mid-day compilations or download filtered raw CSV datasets anytime via the Attendance History panel.
          </p>
        </div>
      </div>

      <div className="bg-[#002868] text-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-[18px] font-bold">Academic Nexus Staff Technical Desk</h4>
          <p className="text-[13px] text-[#CED9FF] mt-0.5">
            Emergency hotline for hardware gate turnstile failures and credential resets.
          </p>
        </div>
        <button
          onClick={() => alert('Support ticket logged with Academic Nexus IT department.')}
          className="px-5 py-2.5 bg-[#BF0A30] hover:bg-[#D7263D] text-white rounded-lg font-semibold text-[14px] shadow-xs transition-colors whitespace-nowrap"
        >
          Contact Support Desk
        </button>
      </div>
    </div>
  );
};
