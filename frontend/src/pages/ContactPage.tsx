import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Mail, PhoneCall, MapPin, MessageCircle } from 'lucide-react';
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
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-slate-50 py-16">
      <div className="container mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#0071E3]">{t('nav.contact', 'Contact')}</p>
          <h1 className="text-3xl font-bold mt-3 text-slate-900">
            {t('contact.heading', 'Get in touch')}
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            {t('contact.subheading', 'Share your requirement. We’ll respond with the right team.')}
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">

          {/* LEFT — DIRECT CONTACT (SECONDARY) */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 rounded-2xl border border-slate-200">

            <h3 className="text-lg font-semibold text-slate-900">
              {t('contact.directContact', 'Direct Contact')}
            </h3>

            <div className="mt-6 space-y-4">

              {/* EMAIL + PHONE */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs uppercase text-slate-500">
                    <Mail size={14} /> {t('contact.emailLabel', 'Email')}
                  </div>
                  <p className="mt-2 text-sm font-medium break-words">
                    {footer.contact_info.email}
                  </p>
                </div>

                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-xs uppercase text-slate-500">
                    <PhoneCall size={14} /> {t('contact.phoneLabel', 'Phone')}
                  </div>
                  <p className="mt-2 text-sm font-medium break-words">
                    {footer.contact_info.phone}
                  </p>
                </div>
              </div>

              {/* ROLE EMAILS */}
              <div className="space-y-3">
                {contactEmails.map((email) => (
                  <a
                    key={email.role}
                    href={`mailto:${email.email}`}
                    className="block p-4 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl hover:border-[#0071E3] transition"
                  >
                    <p className="text-sm font-semibold">{email.role}</p>
                    <p className="text-xs text-slate-500 mt-1">{email.desc}</p>
                    <p className="text-sm text-[#0071E3] mt-2 break-words">
                      {email.email}
                    </p>
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT — FORM (PRIMARY) */}
          <div className="bg-[#0F2A44] text-white p-6 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.4)]">

            <div className="mb-4 inline-block rounded-full bg-[#C65300]/20 px-3 py-1 text-xs font-semibold text-[#C65300]">
              {t('contact.routingBadge', 'Fast Response • Structured Routing')}
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <CheckCircle className="text-green-400 mb-3" size={32} />
                <p className="font-semibold">{t('contact.sentSuccessfully', 'Message sent successfully')}</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>

                <div>
                  <h3 className="text-lg font-semibold">
                    {t('contact.sendEnquiry', 'Send Enquiry')}
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    {t('contact.tellUsNeed', 'Tell us what you need.')}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {contact.form_fields.map((field) => {
                    if (field.type === 'textarea') {
                      return (
                        <textarea
                          key={field.name}
                          placeholder={field.label}
                          className="sm:col-span-2 w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-[#C65300] outline-none"
                        />
                      );
                    }

                    if (field.type === 'select' && 'options' in field) {
                      return (
                        <select
                          key={field.name}
                          className="sm:col-span-2 w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-[#C65300]"
                        >
                          <option>{field.label}</option>
                          {field.options?.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
                        </select>
                      );
                    }

                    return (
                      <input
                        key={field.name}
                        type={field.type}
                        placeholder={field.label}
                        className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:border-[#C65300]"
                      />
                    );
                  })}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C65300] py-3 rounded-full flex items-center justify-center gap-2 
                  shadow-[0_10px_30px_rgba(255,106,42,0.5)] hover:scale-[1.02] hover:bg-[#e65c1f] transition"
                >
                  <MessageCircle size={18} /> {t('contact.submit', 'Submit')}
                </button>

              </form>
            )}
          </div>

        </div>

        {/* OFFICES */}
{/* OFFICES */}
<div className="mt-12 grid md:grid-cols-2 gap-6">

  {contactOffices.map((office, index) => (
    
    <div
      key={office.title}
      className={`p-6 rounded-xl transition-all duration-300 hover:-translate-y-1
      ${
        index === 0
          ? 'bg-gradient-to-br from-[#0F2A44] to-[#003F7A] text-white border border-[#0A4C8A] shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
          : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
      }`}
    >

      <div className="flex gap-3">

        {/* ICON */}
        <MapPin
          className={`mt-1 ${
            index === 0 ? 'text-white/80' : 'text-[#0071E3]'
          }`}
        />

        <div>

          {/* TITLE */}
          <h4
            className={`font-semibold ${
              index === 0 ? 'text-white' : 'text-slate-900'
            }`}
          >
            {office.title}
          </h4>

          {/* CONTENT */}
          <div
            className={`text-sm mt-2 space-y-1 ${
              index === 0 ? 'text-white/70' : 'text-slate-600'
            }`}
          >
            {office.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

        </div>
      </div>

    </div>
  ))}

</div>
      </div>
    </div>
  );
};

export default ContactPage;