import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { buildWhatsAppUrl } from '../config';

const FloatingContactForm: React.FC = () => {
  const { t } = useTranslation();
  
  const whatsappUrl = buildWhatsAppUrl(
    t('whatsapp.quickEnquiry', "Hello, I'm interested in your engineering services. I'd like to discuss a project.")
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black uppercase tracking-wider text-white shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:scale-105 hover:bg-[#1fb157] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#25D366]"
      aria-label={t('whatsapp.quickEnquiryText', "Quick Enquiry via WhatsApp")}
    >
      <MessageCircle size={18} />
      {t('whatsapp.quickEnquiryShort', 'Quick Enquiry')}
    </a>
  );
};

export default FloatingContactForm;
