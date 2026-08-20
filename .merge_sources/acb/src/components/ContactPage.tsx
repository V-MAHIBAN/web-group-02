import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { CONTACT_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setTimeout(() => {
      StorageService.submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        subject,
        message: message.trim()
      });

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16">
      {/* Header */}
      <section className="text-center mb-12 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] text-[#002868] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ba022d]" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#00153e] mb-4 tracking-tight">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-[#444650] leading-relaxed">
          Have questions about our free educational courses, EducationUSA advising, or community partnerships? Reach out to our team.
        </p>
      </section>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Contact Information Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#c4c6d2]/40 shadow-sm flex flex-col gap-6">
            <h2 className="text-xl font-bold text-[#00153e] pb-2 border-b border-gray-100">
              Corner Information
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#002868] flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-[#ba022d]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#747781] uppercase tracking-wider">Location</h3>
                <p className="text-sm font-semibold text-[#00153e] mt-0.5">{CONTACT_INFO.address}</p>
              </div>
            </div>

            {/* Telephone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#002868] flex items-center justify-center flex-shrink-0 mt-1">
                <Phone className="w-5 h-5 text-[#ba022d]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#747781] uppercase tracking-wider">Direct Hotline</h3>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                  className="text-base font-bold text-[#00153e] hover:text-[#ba022d] transition-colors mt-0.5 block"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#002868] flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-5 h-5 text-[#ba022d]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#747781] uppercase tracking-wider">Email Support</h3>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm font-bold text-[#00153e] hover:text-[#ba022d] transition-colors mt-0.5 block break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Visiting Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#002868] flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-5 h-5 text-[#ba022d]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#747781] uppercase tracking-wider">Visiting Hours</h3>
                <p className="text-xs text-[#444650] mt-0.5 leading-relaxed">
                  {CONTACT_INFO.hours}
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Chat Card */}
          <div className="bg-[#eff4ff] border border-[#d9e3f6] rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#00153e] flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Coordinator Direct Chat</span>
            </h3>
            <p className="text-xs text-[#444650] leading-relaxed">
              Connect directly with our corner coordinator for rapid questions on course registration or facility bookings.
            </p>
            <a
              href={CONTACT_INFO.whatsappCoordinatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
            >
              <span>Chat on WhatsApp (+94 76 236 9699)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 border border-[#c4c6d2]/40 shadow-md">
          {submitted ? (
            <div className="text-center py-12 flex flex-col items-center gap-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-[#00153e]">Message Dispatched!</h2>
              <p className="text-xs sm:text-sm text-[#444650] max-w-md leading-relaxed">
                Thank you for contacting the American Corner Batticaloa. Our administrative desk has received your note and will reply within 24–48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-xs rounded-lg transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#00153e] mb-1">
                  Send a Message
                </h2>
                <p className="text-xs text-[#747781] mb-5">
                  Fill in your details below and our team will get back to you promptly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyanthi Senanayake"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priyanthi@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="077XXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                    Subject / Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Course Registration">Course Registration</option>
                    <option value="EducationUSA Advising">EducationUSA Advising</option>
                    <option value="Volunteer Application">Volunteer Application</option>
                    <option value="School Partnership">School Partnership & Outreach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121c2a] uppercase mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with our programs or services?"
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#c4c6d2] rounded-lg text-sm focus:border-[#002868] focus:ring-1 focus:ring-[#002868] outline-none resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-[#00153e] hover:bg-[#ba022d] text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
