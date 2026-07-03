import React, { useState, useCallback } from 'react';
import { MessageCircle, CheckCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const ContactSection: React.FC = () => {
  const { contact, footer } = HOMEPAGE_CONFIG;
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, []);

  return (
    <section id="contact" className="relative bg-[#111827] py-12 md:py-14 lg:py-16 scroll-mt-20 overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid gap-5 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6 lg:p-8 shadow-sm backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F25C19] mb-2">{t('contactSection.badge', 'Get Started')}</p>
            <h2 className="text-2xl lg:text-3xl font-black leading-tight tracking-tighter text-white">
              {t('contactSection.heading', 'Projects begin with clarity.')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {t('contactSection.subheading', 'Use the contact form for a direct technical enquiry or reach us through the contact details below.')}
            </p>

            <div className="mt-6 space-y-3">
              <InfoRow label={t('contactSection.phoneLabel', 'Phone')} value={footer.contact_info.phone} />
              <InfoRow label={t('contactSection.emailLabel', 'Email')} value={footer.contact_info.email} />
              <InfoRow label={t('contactSection.businessHours', 'Business Hours')} value={t('contactSection.businessHoursValue', 'Mon-Fri, 08:30-17:30 CET')} />
              <InfoRow label={t('contactSection.responseTime', 'Response Time')} value={t('contactSection.responseTimeValue', '< 24 hrs')} />
              <InfoRow label={t('contactSection.primaryContact', 'Primary Contact')} value={t('contactSection.primaryContactValue', 'Managing Director')} />
            </div>
          </div>

          {/* Right: Interactive White Card */}
          <div className="w-full rounded-[2rem] border border-white/10 bg-[#0F172A] p-5 sm:p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] relative flex flex-col justify-center">
              {submitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-black text-white">{t('contactSection.requestSent', 'Request Sent')}</h3>
                  <p className="mt-2 text-sm text-white/65 font-medium italic">{t('contactSection.openingWhatsApp', 'Opening WhatsApp Secure Line...')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F25C19] mb-1">{t('contactSection.quickEnquiry', 'Quick Enquiry')}</p>
                    <h3 className="text-2xl font-black text-white tracking-tight">{t('contactSection.sendMessage', 'Send a message.')}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {contact.form_fields.map((field) => {
                      const inputClasses = "w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-xs font-semibold text-slate-900 transition-all focus:border-[#F25C19] focus:bg-white focus:ring-4 focus:ring-[#F25C19]/15 outline-none appearance-none placeholder:text-slate-400";
                      
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
                              <option value="" disabled>{field.label}</option>
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
                    className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C65300] px-6 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-900/20 transition-all hover:bg-[#A94D00] hover:shadow-xl active:scale-[0.98] will-change-transform"
                  >
                    <MessageCircle size={18} className="transition-transform group-hover:scale-110" />
                    {t('contactSection.submit', contact.submit_button)}
                  </button>

                  <div className="mt-4 text-center text-[11px] text-white/60">
                    {t('contactSection.formNote', 'All fields are handled securely and only used for response purposes.')}
                  </div>
                </form>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/55">{label}</span>
      <span className="text-sm font-semibold text-white text-left sm:text-right break-words">{value}</span>
    </div>
  );
}