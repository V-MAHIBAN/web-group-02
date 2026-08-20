import React, { useState } from 'react';
import {
  Award,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Certificate, UserProfile } from '../../types';

interface CertificatesViewProps {
  certificates: Certificate[];
  user: UserProfile;
  onSelectCertificate: (cert: Certificate) => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({
  certificates,
  user,
  onSelectCertificate,
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (cert: Certificate) => {
    setDownloadingId(cert.id);
    setTimeout(() => {
      onSelectCertificate(cert);
      setDownloadingId(null);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
              Certificates Hub
            </h1>
            <span className="bg-blue-50 text-[#002868] border border-blue-100 text-xs font-bold px-3 py-1 rounded-full">
              Total Earned: {certificates.length}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            View, verify, and export your accredited community service credentials.
          </p>
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const isWarning = cert.status === 'warning';
          const borderColor =
            cert.badgeColor === 'blue'
              ? 'border-[#002868]'
              : cert.badgeColor === 'green'
              ? 'border-[#16A34A]'
              : 'border-[#F59E0B]';

          const accentBg =
            cert.badgeColor === 'blue'
              ? 'bg-blue-50 text-[#002868]'
              : cert.badgeColor === 'green'
              ? 'bg-green-50 text-[#16A34A]'
              : 'bg-amber-50 text-[#F59E0B]';

          return (
            <div
              key={cert.id}
              className="bg-[#FFFFFF] rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Visual Certificate Graphic Box */}
              <div className="p-4 bg-[#F8FAFC] border-b border-slate-200">
                <div
                  className={`bg-white rounded-xl p-5 border-2 ${borderColor} shadow-xs relative overflow-hidden flex flex-col justify-between h-44`}
                >
                  {/* Watermark */}
                  <Award className="absolute -right-6 -bottom-6 w-32 h-32 opacity-5 text-gray-900 pointer-events-none" />

                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${accentBg}`}>
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">
                        Verified Credential
                      </span>
                    </div>

                    {isWarning ? (
                      <span className="bg-amber-50 text-[#F59E0B] border border-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-[#F59E0B]" /> Expires Soon
                      </span>
                    ) : (
                      <span className="bg-green-50 text-[#16A34A] border border-green-100 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Valid
                      </span>
                    )}
                  </div>

                  <div className="my-auto py-2">
                    <h3 className="font-bold text-sm text-[#1F2937] leading-snug line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {cert.organization}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-100 pt-2">
                    <span>Issued: {cert.issuedDate}</span>
                    <span className="font-bold text-[#1F2937]">{cert.duration}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Details & Actions */}
              <div className="p-5 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-[#F8FAFC] text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCertificate(cert)}
                    className="flex-1 px-3 py-2 bg-[#BF0A30] hover:bg-[#D7263D] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> View PDF
                  </button>
                  <button
                    onClick={() => handleDownload(cert)}
                    className="px-3 py-2 bg-[#F8FAFC] hover:bg-slate-100 text-[#002868] text-xs font-bold rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Download Credential File"
                  >
                    <Download className="w-3.5 h-3.5 text-[#002868]" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
