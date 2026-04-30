import React, { useState } from 'react';
import { CheckCircle, Mail, PhoneCall, MapPin, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { useTranslatedContactEmails, useTranslatedContactOffices } from '../hooks/useTranslatedData';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { contact, footer } = HOMEPAGE_CONFIG;
  const contactEmails = useTranslatedContactEmails();
  const contactOffices = useTranslatedContactOffices();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-slate-50">
      <section id="strategy" className="relative overflow-hidden bg-white pt-28 pb-14 sm:pt-32 sm:pb-16">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute -left-20 top-8 h-64 w-64 rounded-full bg-[#0071E3]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-[#FF6A2A]/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0071E3]">Contact</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Start the conversation with a clear intent.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                {contact.heading} The first step is simple: share the project context, the service area, and the outcome you need. We will respond through the right channel and keep the discussion compact.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Response', value: 'Structured' },
                  { label: 'Privacy', value: 'Controlled' },
                  { label: 'Action', value: 'Fast follow-up' },
                ].map((item, idx) => (
                  <div key={item.label} className={`rounded-[1.5rem] p-4 shadow-sm ${idx === 1 ? 'bg-slate-950 text-white' : idx === 2 ? 'bg-[#EEF6FF] text-slate-900 border border-blue-100' : 'bg-white text-slate-900 border border-slate-200'}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-70">{item.label}</p>
                    <p className="mt-3 text-lg font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
                <ShieldCheck className="h-4 w-4 text-[#FF6A2A]" /> Clear strategy
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">One lead channel, one clear next step.</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/78">
                We keep contact structured so the right person sees the right message quickly. That means less back-and-forth and a better handoff into service or project discussion.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  'Use the form for new enquiries and scope discussions.',
                  'Use direct email for coordination or follow-up documents.',
                  'Use the location cards to route office-specific communication.'
                ].map((line) => (
                  <div key={line} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white/84">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6A2A]" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="pb-14 sm:pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0071E3]">Direct contact</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Reach the right team without the noise.</h3>
              <div className="mt-6 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 min-w-0">
                    <div className="flex items-center gap-2 text-slate-900">
                      <Mail className="h-4 w-4 text-[#0071E3]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">Email</span>
                    </div>
                    <p className="mt-3 break-words text-sm font-medium text-slate-700">{footer.contact_info.email}</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 min-w-0">
                    <div className="flex items-center gap-2 text-slate-900">
                      <PhoneCall className="h-4 w-4 text-[#0071E3]" />
                      <span className="text-xs font-semibold uppercase tracking-[0.24em]">Phone</span>
                    </div>
                    <p className="mt-3 break-words text-sm font-medium text-slate-700">{footer.contact_info.phone}</p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {contactEmails.map((email) => (
                    <a key={email.role} href={`mailto:${email.email}`} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 transition-colors hover:border-[#0071E3] hover:bg-slate-50 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF6FF] text-[#0B5FDB] ring-1 ring-blue-100">
                        {email.icon === 'briefcase' ? <ArrowRight className="h-4 w-4" /> : email.icon === 'shield' ? <ShieldCheck className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">{email.role}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500 break-words">{email.desc}</p>
                        <p className="mt-2 text-sm font-medium text-[#0071E3] break-words">{email.email}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
              {submitted ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
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
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0071E3]">{t('contact.form.title', 'Quick Enquiry')}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Tell us what you need.</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Share your service focus, project stage, and target outcome. We will route the request without unnecessary noise.
                    </p>
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6A2A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e95f20]"
                  >
                    <MessageCircle size={18} /> {contact.submit_button}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div id="offices" className="mt-8 grid gap-4 md:grid-cols-2">
            {contactOffices.map((office) => (
              <article key={office.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm min-w-0">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EEF6FF] text-[#0B5FDB] ring-1 ring-blue-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0B5FDB]">Office</p>
                    <h4 className="mt-1 text-base font-bold text-slate-900 break-words">{office.title}</h4>
                    <div className="mt-3 space-y-1 text-sm leading-relaxed text-slate-600 break-words">
                      {office.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;