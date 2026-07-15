import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslatedContactOffices } from '../hooks/useTranslatedData';
import HOMEPAGE_CONFIG from '../config/homepage.config';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { footer } = HOMEPAGE_CONFIG;
  const contactOffices = useTranslatedContactOffices() || [];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      service: formData.get('serviceRequired'),
      requirements: formData.get('requirements'),
    };

    try {
      await fetch(import.meta.env.VITE_API_BASE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setFormStatus('success');
    } catch (error) {
      console.error("Submission failed", error);
      setFormStatus('idle');
      alert("Submission failed. Please check your connection.");
    }
  };

  const faqs = [
    { q: "How quickly do you respond?", a: "All operational and technical engineering enquiries are triaged inside 24 hours by appropriate regional project leadership." },
    { q: "Can you support remote projects?", a: "Yes. Leveraging our global delivery framework, we provide hybrid and remote project controls synchronization globally." },
    { q: "Do you work internationally?", a: "PCE BV is registered in the Netherlands with core delivery capabilities operating across Western Europe and out of our specialized engineering center in India." },
    { q: "Can we hire dedicated engineering resources?", a: "Yes. We offer strategic workforce augmentation contracts for process, piping, mechanical, and project governance disciplines." }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#071B34] antialiased min-h-screen font-sans selection:bg-[#2563EB] selection:text-white">
      
      {/* ============================================
          1. MINIMAL METRIC HERO (COMPACT INTRODUCTION)
         ============================================ */}
      <section className="bg-[#FFFFFF] pt-24 pb-8 border-b border-[#E5E7EB]">
        <div className="container mx-auto px-6 max-w-[1240px] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-black tracking-wider text-[#64748B] mb-2 uppercase">
              <span onClick={() => window.location.href = '/'} className="hover:text-[#F25C19] cursor-pointer transition-colors">HOME</span>
              <span className="select-none text-slate-300">&gt;</span>
              <span className="text-[#071B34]">CONTACT</span>
            </nav>
            <p className="text-sm lg:text-base text-[#475569] max-w-[580px] font-medium leading-relaxed">
              {t('contact.heroText', "Connect directly with our multi-disciplinary project specialist teams. Verified technical briefs are triaged inside 24 operational hours.")}
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-[11px] font-black text-[#071B34] border-t md:border-t-0 border-[#E5E7EB] pt-3 md:pt-0 uppercase tracking-wider whitespace-nowrap select-none">
            <div>HQ <span className="text-[#2563EB] ml-1">NETHERLANDS</span></div>
            <div className="text-slate-300">|</div>
            <div>DELIVERY <span className="text-[#F25C19] ml-1">GLOBAL</span></div>
          </div>
        </div>
      </section>

      {/* ============================================
          2. THE MASTER SPLIT FRAME: COMPACT GRID
         ============================================ */}
      <section className="bg-[#FFFFFF] py-12 px-6">
        <div className="container mx-auto max-w-[1240px]">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-start">
            
            {/* LEFT COLUMN: HIGH-DENSITY SCAN-READY CHANNELS */}
            <div className="space-y-6 lg:sticky lg:top-32">
              <div className="pb-4 border-b border-[#E5E7EB]">
                <h2 className="text-xs font-black tracking-[0.2em] text-[#2563EB] uppercase">Escalation Directory</h2>
                <h3 className="text-xl font-black text-[#071B34] mt-0.5">Start the Conversation</h3>
              </div>

              {/* Grid-Based Scalar Info Strips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-[#E5E7EB] p-4 rounded-md bg-[#F8FAFC]">
                  <span className="text-[10px] font-black text-[#64748B] uppercase tracking-wider block">Telephony</span>
                  <a href={`tel:${footer.contact_info.phone}`} className="text-sm font-black text-[#071B34] hover:text-[#2563EB] transition-colors mt-1 block">{footer.contact_info.phone}</a>
                  <span className="text-[10px] text-[#64748B] block mt-1 font-semibold">08:30 – 17:30 CET</span>
                </div>
                
              </div>

              {/* Clean Single Desk Row Matrix */}
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-wider text-[#64748B] uppercase block px-1">Primary Communications Desk</span>
                <div className="border border-[#E5E7EB] rounded-md overflow-hidden p-4 bg-white hover:bg-[#F8FAFC] transition-colors">
                  <h4 className="text-xs font-black text-[#071B34] uppercase tracking-wide">Corporate Head Office</h4>
                  <p className="text-[11px] text-[#64748B] font-medium mt-1 mb-2">
                    For all global operations, business management services, and technical briefs triage queries.
                  </p>
                  <a href={`mailto:${footer.contact_info.email}`} className="text-xs font-bold text-[#2563EB] hover:underline font-mono tracking-tight block break-all">
                    {footer.contact_info.email}
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-CONTRAST COMPACT DARK FORM */}
            <div className="bg-[#111827] text-white p-6 lg:p-8 rounded-[12px] border border-[#1F2937] shadow-lg">
              <div className="mb-4">
                <h3 className="text-lg font-black tracking-tight text-white">Project Enquiry Registry</h3>
                <p className="text-xs text-[#9CA3AF] font-medium mt-0.5">Supply technical scope parameters to prompt engineering routing.</p>
              </div>

              {formStatus === 'success' ? (
                <div className="bg-[#1F2937] border border-[#374151] p-6 text-center rounded-md animate-[fadeIn_0.25s_ease-out]">
                  <span className="text-[#F25C19] font-black text-sm block mb-1">Enquiry Successfully Transmitted</span>
                  <p className="text-xs text-[#9CA3AF] font-medium">We received your request and our team will get back to you shortly.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="text-[11px] font-bold text-[#9CA3AF]">Full Name</label>
                      <input id="fullName" name="fullName" required type="text" className="w-full h-[40px] bg-[#1F2937] border border-[#374151] text-white px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[11px] font-bold text-[#9CA3AF]">Email Address</label>
                      <input id="email" name="email" required type="email" className="w-full h-[40px] bg-[#1F2937] border border-[#374151] text-white px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs font-semibold" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="company" className="text-[11px] font-bold text-[#9CA3AF]">Company</label>
                      <input id="company" name="company" required type="text" className="w-full h-[40px] bg-[#1F2937] border border-[#374151] text-white px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs font-semibold" />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-[11px] font-bold text-[#9CA3AF]">Phone</label>
                      <input id="phone" name="phone" required type="tel" className="w-full h-[40px] bg-[#1F2937] border border-[#374151] text-white px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs font-semibold" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="serviceRequired" className="text-[11px] font-bold text-[#9CA3AF]">Service Required</label>
                    <select id="serviceRequired" name="serviceRequired" className="w-full h-[40px] bg-[#1F2937] border border-[#374151] text-white px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs font-bold text-white">
                      <option>Project Controls & Scheduling Baseline</option>
                      <option>Multi-Discipline FEED & Detail Design</option>
                      <option>Asset Document Control & Technical Dossiers</option>
                      <option>Field Readiness Coordination</option>
                      <option>Dedicated Strategic Workforce Augmentation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="requirements" className="text-[11px] font-bold text-[#9CA3AF]">Project Requirements</label>
                    <textarea id="requirements" name="requirements" required className="w-full h-[100px] bg-[#1F2937] border border-[#374151] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-xs font-medium resize-none" placeholder="Briefly outline timelines, engineering standards, or asset targets..." />
                  </div>

                  <div className="pt-1">
                    <button type="submit" disabled={formStatus === 'submitting'} className="group w-full h-[44px] bg-[#F25C19] text-white font-black uppercase tracking-wider text-xs rounded-md transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2 focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#111827]">
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Project Enquiry'}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <span className="block text-center text-[11px] text-[#9CA3AF] font-medium mt-2">
                      Your brief is completely confidential and subject to secure data policy.
                    </span>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
          3. COMPACT HORIZONTAL TIMELINE WORKBLOCK
         ============================================ */}
      <section className="bg-[#F8FAFC] py-16 px-6 border-t border-b border-[#E5E7EB]">
        <div className="container mx-auto max-w-[1240px]">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black tracking-[0.2em] text-[#2563EB] uppercase block">Global Framework Alignment</span>
            <h2 className="text-2xl font-black text-[#071B34] tracking-tight mt-0.5">Our Global Delivery Model</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-3xl mx-auto relative">
            <div className="bg-white border border-[#E5E7EB] p-5 rounded-md shadow-sm">
              <span className="text-[11px] font-bold text-[#2563EB] tracking-wider uppercase block mb-0.5">Strategic HQ</span>
              <h3 className="text-lg font-black text-[#071B34]">Netherlands</h3>
              <p className="text-xs text-[#475569] mt-1.5 font-semibold leading-relaxed">
                Client Relations, Master Governance, Risk Allocation, and Direct Onsite Field Coordination.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-2 z-10 select-none">
              <div className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#071B34] shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9-9H3m9 9a9 9 0 01-9-9m9 9c0 5-4 9-9 9m9-9c0-5-4-9-9-9" />
                </svg>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-5 rounded-md shadow-sm">
              <span className="text-[11px] font-bold text-[#F25C19] tracking-wider uppercase block mb-0.5">PCEPL Design Center</span>
              <h3 className="text-lg font-black text-[#071B34]">India</h3>
              <p className="text-xs text-[#475569] mt-1.5 font-semibold leading-relaxed">
                Detail Engineering, CAD Drawings, Level 4 Execution Controls, and Turnover Dossier Verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          4. MINIMAL FAQ ACCORDION SHEET
         ============================================ */}
      <section className="bg-[#FFFFFF] py-16 px-6 border-b border-[#E5E7EB]">
        <div className="container mx-auto max-w-[1240px]">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black tracking-tight text-[#071B34]">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="border border-[#E5E7EB] rounded-md overflow-hidden bg-white">
                  <button onClick={() => setActiveFaq(isOpen ? null : i)} className="w-full text-left p-4 flex items-center justify-between font-bold text-xs text-[#071B34] hover:bg-[#F8FAFC] transition-colors focus:outline-none" aria-expanded={isOpen}>
                    <span>{faq.q}</span>
                    <span className="text-[10px] font-black text-slate-400 select-none">{isOpen ? '▲' : '▼'}</span>
                  </button>
                  <div className={`transition-all duration-200 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-[#E5E7EB] p-4 bg-[#F8FAFC]' : 'max-h-0'}`}>
                    <p className="text-xs text-[#475569] leading-relaxed font-semibold">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          5. MICRO ESCALATION CALL TO ACTION FOOTER
         ============================================ */}
      <section className="bg-[#071B34] text-white py-14 px-6">
        <div className="container mx-auto max-w-[1240px] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h2 className="text-2xl font-black tracking-tight text-white leading-none">Ready to discuss your project?</h2>
            <p className="text-xs text-slate-300 mt-1.5 font-medium">Align your asset performance with trusted technical control frameworks.</p>
          </div>

          <button onClick={() => window.scrollTo({ top: 180, behavior: 'smooth' })} className="shrink-0 group inline-flex items-center justify-center gap-2 rounded-md bg-[#F25C19] text-white font-black uppercase tracking-wider text-[10px] px-6 py-3 shadow-md hover:brightness-110 transition-all duration-300 focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 focus:ring-offset-[#071B34]">
            Consult Us Directly
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;