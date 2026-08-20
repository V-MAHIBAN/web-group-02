import React, { useRef } from 'react';
import { X, Download, Printer, CheckCircle2, Award, ShieldCheck, Calendar, Clock, UserCheck } from 'lucide-react';
import { Certificate, UserProfile } from '../../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  user,
  isOpen,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="bg-[#002868] text-white px-6 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <span className="font-semibold text-sm">Official Credential Viewer</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-[#F8FAFC]">
          <div
            ref={printRef}
            className="bg-white rounded-xl p-8 border-8 border-double border-[#002868] shadow-lg relative overflow-hidden"
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-[#002868]"></div>
            <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-[#002868]"></div>
            <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-[#002868]"></div>
            <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-[#002868]"></div>

            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <Award className="w-96 h-96 text-[#002868]" />
            </div>

            {/* Header */}
            <div className="text-center relative z-10 space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-[#002868] border-2 border-[#002868] mb-1">
                <ShieldCheck className="w-8 h-8 text-[#002868]" />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-bold">
                Volunteer Impact Network • Credential of Honor
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002868] tracking-tight">
                Certificate of Achievement
              </h1>
              <div className="w-24 h-0.5 bg-[#BF0A30] mx-auto"></div>
            </div>

            {/* Recipient */}
            <div className="text-center my-6 relative z-10 space-y-1">
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">
                This acknowledges that
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2937] underline decoration-[#16A34A] decoration-2 underline-offset-8">
                {user.name}
              </h2>
              <p className="text-xs text-slate-500 pt-2">
                has successfully completed all requirements for
              </p>
            </div>

            {/* Course / Program Title */}
            <div className="text-center bg-[#F8FAFC] py-4 px-6 rounded-lg border border-slate-200 my-4 relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-[#002868]">
                {certificate.title}
              </h3>
              <p className="text-xs font-medium text-slate-600 mt-0.5">
                Organized by {certificate.organization}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                {certificate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white px-2 py-0.5 rounded-full font-medium text-[#16A34A] border border-green-200"
                  >
                    • {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Meta and Signatures */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-4 border-t border-slate-200 relative z-10 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Issued Date & Duration</p>
                <p className="font-semibold text-[#1F2937] mt-0.5">{certificate.issuedDate} ({certificate.duration})</p>
                <p className="text-[10px] text-slate-400 mt-1">ID: {certificate.credentialId}</p>
              </div>
              <div className="text-right">
                <div className="inline-block border-b border-slate-700 pb-1 min-w-[140px]">
                  <p className="font-serif italic text-sm text-[#002868] font-semibold">{certificate.instructor.split(',')[0]}</p>
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 font-medium">{certificate.instructor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Digitally Verified Credential
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#BF0A30] hover:bg-[#D7263D] rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
