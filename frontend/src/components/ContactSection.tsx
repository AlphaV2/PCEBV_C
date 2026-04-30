import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Mail, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const ContactSection: React.FC = () => {
  const { contact, footer } = HOMEPAGE_CONFIG;
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const projectSteps = [
    'Share your scope and target outcome.',
    'We map the right controls, engineering, and documentation support.',
    'Delivery starts with a clear line of ownership and next actions.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 scroll-mt-28">
      <div className="absolute inset-x-0 top-0 h-24 bg-white pointer-events-none" />
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#0071E3]/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#FF6A2A]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
          <div className="flex flex-col justify-between rounded-[2rem] bg-slate-950 p-7 sm:p-8 text-white shadow-2xl shadow-slate-950/20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">Get Started</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Projects begin with clarity.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
                We keep the first touchpoint simple: define the project, identify the right support model, and move quickly without crowding the conversation.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {projectSteps.map((point, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border px-4 py-4 ${idx % 2 === 0 ? 'border-white/15 bg-white/6' : 'border-white/10 bg-white/10'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      0{idx + 1}
                    </div>
                    <span className="text-sm leading-relaxed text-white/90">{point}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">Direct Contact</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/90" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Email</p>
                    <p className="text-sm font-medium text-white">{footer.contact_info.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="h-4 w-4 text-white/90" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Call</p>
                    <p className="text-sm font-medium text-white">{footer.contact_info.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
            {submitted ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t('contact.form.successTitle', 'Opened in WhatsApp!')}</h3>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm font-semibold text-[#0071E3] hover:text-[#0056A3]">
                  {t('contact.form.sendAnother', 'Send another')}
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0071E3]">Contact Us</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{t('contact.form.title', 'Quick Enquiry')}</h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {contact.form_fields.map((field) => {
                    if (field.type === 'textarea') {
                      return (
                        <textarea
                          key={field.name}
                          name={field.name}
                          placeholder={field.label}
                          className="sm:col-span-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 outline-none transition-colors focus:border-[#0071E3] focus:bg-white"
                          rows={4}
                        />
                      );
                    }

                    if (field.type === 'select' && 'options' in field) {
                      return (
                        <select
                          key={field.name}
                          name={field.name}
                          className="sm:col-span-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0071E3] focus:bg-white"
                          required={field.required}
                        >
                          <option value="">{field.label}</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      );
                    }

                    return (
                      <input
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        placeholder={field.label}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 outline-none transition-colors focus:border-[#0071E3] focus:bg-white"
                        required={field.required}
                      />
                    );
                  })}
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6A2A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e95f20]"
                >
                  <MessageCircle size={18} /> {contact.submit_button}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
