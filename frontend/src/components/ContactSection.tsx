import React, { useState, useCallback, useMemo } from 'react';
import { MessageCircle, CheckCircle, Mail, PhoneCall, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const ContactSection: React.FC = () => {
  const { contact, footer } = HOMEPAGE_CONFIG;
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const projectSteps = useMemo(() => [
    'Share scope and target outcome.',
    'Map controls and engineering support.',
    'Delivery with clear ownership.',
  ], []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, []);

  return (
    <section id="contact" className="relative bg-[#E2E8F0] py-12 lg:py-16 scroll-mt-20 overflow-hidden">
      {/* 
        HIERARCHY-FIRST BACKGROUND:
        - Darker Slate-Grey base (#E2E8F0) to force the white form to "pop".
        - Subtle SVG grid for an "Engineering Blueprint" texture.
        - Strategic vignette glows to prevent the dark grey from feeling flat.
      */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Engineering Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.25]" 
          style={{ 
            backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
        {/* Soft Depth Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.05)_100%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-[40%_1fr] items-stretch">
            
            {/* Left: Informational Dark Card */}
            <div className="flex flex-col justify-between rounded-[2rem] bg-slate-950 p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden border border-white/5">
              <div className="relative z-10">
                <header className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">Get Started</p>
                  <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tighter">
                    Projects begin <br /> with clarity.
                  </h2>
                </header>

                <div className="space-y-3">
                  {projectSteps.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-all hover:bg-white/10">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white">
                        0{idx + 1}
                      </span>
                      <p className="text-xs font-medium text-white/80">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/5 p-2">
                      <Mail size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Email</p>
                      <p className="text-xs font-bold text-white/90">{footer.contact_info.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/5 p-2">
                      <PhoneCall size={14} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/30">Phone</p>
                      <p className="text-xs font-bold text-white/90">{footer.contact_info.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive White Card (NOW PROPERLY GROUNDED) */}
            <div className="rounded-[2rem] border border-slate-300 bg-white p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Request Sent</h3>
                  <p className="mt-2 text-sm text-slate-500 font-medium italic">Opening WhatsApp Secure Line...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1">Quick Enquiry</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Send a message.</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {contact.form_fields.map((field) => {
                      const inputClasses = "w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs font-semibold text-slate-900 transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 outline-none appearance-none placeholder:text-slate-400";
                      
                      if (field.type === 'textarea') {
                        return (
                          <div key={field.name} className="sm:col-span-2">
                            <textarea
                              name={field.name}
                              placeholder={field.label}
                              rows={3}
                              className={`${inputClasses} resize-none`}
                              required={field.required}
                            />
                          </div>
                        );
                      }

                      if (field.type === 'select') {
                        return (
                          <div key={field.name} className="relative sm:col-span-2">
                            <select name={field.name} className={inputClasses} required={field.required}>
                              <option value="" disabled selected>{field.label}</option>
                              {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                              <ChevronRight size={14} className="rotate-90" />
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div key={field.name} className={field.name === 'name' || field.name === 'email' ? 'col-span-1' : 'sm:col-span-2'}>
                          <input type={field.type} name={field.name} placeholder={field.label} className={inputClasses} required={field.required} />
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="submit"
                    className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FF6A2A] px-6 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-200 transition-all hover:bg-[#e95f20] hover:shadow-xl active:scale-[0.98] will-change-transform"
                  >
                    <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
                    {contact.submit_button}
                  </button>

                  <div className="mt-4 text-center">
                    {/* <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      — Secured & Encrypted —
                    </span> */}
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);