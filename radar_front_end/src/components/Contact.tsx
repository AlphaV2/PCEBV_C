import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useTranslatedContactEmails, useTranslatedContactOffices } from '../hooks/useTranslatedData';
import {
  MapPin, CheckCircle2, MessageCircle,
  Mail, Briefcase, ShieldAlert, Copy
} from "lucide-react";
import { WHATSAPP_NUMBER } from "../../constants";

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const emails = useTranslatedContactEmails();
  const offices = useTranslatedContactOffices();
  const inquiryTopics = [
    t('contact.form.topics.general', 'General Inquiry'),
    t('contact.form.topics.support', 'Product Support'),
    t('contact.form.topics.sales', 'Sales & Quotes'),
    t('contact.form.topics.partnership', 'Partnership Opportunities'),
    t('contact.form.topics.careers', 'Careers'),
  ];

  const [formState, setFormState] = useState<"idle" | "success">("idle");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase': return <Briefcase size={18} />;
      case 'shield': return <ShieldAlert size={18} />;
      default: return <Mail size={18} />;
    }
  };

  const handleCopy = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    alert(`${t('contact.copied', 'Copied')}: ${email}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const inquiryType = formData.get("inquiryType") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message || !inquiryType) {
      alert(t('contact.form.fillAll', 'Please fill in all required fields.'));
      return;
    }

    const whatsappMessage =
`*${t('contact.form.whatsappTitle', 'New Website Inquiry')}* 🚀
👤 *${t('contact.form.nameLabel', 'Name')}:* ${name}
📧 *${t('contact.form.emailLabel', 'Email')}:* ${email}
📌 *${t('contact.form.topicLabel', 'Topic')}:* ${inquiryType}
📝 *${t('contact.form.messageLabel', 'Message')}:* ${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    setFormState("success");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-16 bg-white relative scroll-mt-20 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          <div>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                {t('contact.heading', 'Start the Conversation.')}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                {t('contact.subheading', 'Select the right channel below for faster resolution, or use the quick form.')}
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                {t('nav.departments', 'Departments')}
              </h3>

              <div className="flex flex-col gap-3">
                {(emails as any[]).map((contact, idx) => (
                  <div
                    key={idx}
                    className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                      ${contact.role.includes('Director') || contact.role.includes('Directeur')
                        ? 'bg-amber-50/50 border-amber-100 hover:border-amber-300 hover:shadow-md'
                        : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
                      }
                    `}
                  >
                    <div className={`shrink-0 p-3 rounded-lg flex items-center justify-center
                      ${contact.role.includes('Director') || contact.role.includes('Directeur')
                        ? 'bg-amber-100 text-amber-700'
                        : contact.icon === 'briefcase'
                          ? 'bg-purple-50 text-purple-600'
                          : 'bg-blue-50 text-blue-600'
                      }
                    `}>
                      {getIcon(contact.icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5
                        ${contact.role.includes('Director') || contact.role.includes('Directeur')
                          ? 'text-amber-600' : 'text-slate-400'}
                      `}>
                        {contact.role}
                      </p>
                      <a href={`mailto:${contact.email}`} className="block text-base font-bold text-slate-900 truncate hover:underline decoration-slate-300 underline-offset-4">
                        {contact.email}
                      </a>
                      <p className="text-xs text-slate-500 mt-0.5">{contact.desc}</p>
                    </div>

                    <button
                      onClick={(e) => handleCopy(e, contact.email)}
                      className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title={t('contact.copyEmail', 'Copy Email Address')}
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                {t('nav.globalOffices', 'Global Headquarters')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(offices as any[]).map((office, idx) => (
                  <div key={idx} className="flex gap-3">
                    <MapPin size={18} className="text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{office.title}</h4>
                      {office.lines.map((line: string, i: number) => (
                        <p key={i} className="text-xs text-slate-500 leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 h-fit">
            {formState === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {t('contact.form.successTitle', 'Opened in WhatsApp!')}
                </h3>
                <button onClick={() => setFormState("idle")} className="mt-4 text-blue-600 text-sm font-bold hover:underline">
                  {t('contact.form.sendAnother', 'Send another')}
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h3 className="font-bold text-slate-900 mb-4">{t('contact.form.title', 'Quick Enquiry')}</h3>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('contact.form.nameLabel', 'Your Name')}</label>
                  <input name="name" required type="text" className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors" placeholder={t('contact.form.namePlaceholder', 'John Doe')} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('contact.form.emailLabel', 'Email Address')}</label>
                  <input name="email" required type="email" className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors" placeholder={t('contact.form.emailPlaceholder', 'john@company.com')} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('contact.form.interestedIn', "I'm interested in...")}</label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      required
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled hidden>{t('contact.form.selectTopic', 'Select a topic')}</option>
                      <option value={inquiryTopics[0]}>{inquiryTopics[0]}</option>
                      <option value={inquiryTopics[1]}>{inquiryTopics[1]}</option>
                      <option value={inquiryTopics[2]}>{inquiryTopics[2]}</option>
                      <option value={inquiryTopics[3]}>{inquiryTopics[3]}</option>
                      <option value={inquiryTopics[4]}>{inquiryTopics[4]}</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">{t('contact.form.messageLabel', 'Message')}</label>
                  <textarea name="message" required className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500 transition-colors h-28 resize-none" placeholder={t('contact.form.messagePlaceholder', 'How can we help?')} />
                </div>
                <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
                  <MessageCircle size={18} /> {t('contact.form.submitButton', 'Chat via WhatsApp')}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;