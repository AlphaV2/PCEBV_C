import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Twitter, Instagram, Activity, Facebook } from 'lucide-react';
// 🚨 CENTRALIZATION: Import data from constants 🚨
import { SOCIAL_LINKS } from '../../constants';
import { useTranslatedNavLinks, useTranslatedServices } from '../hooks/useTranslatedData';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const services = useTranslatedServices();
  const navLinks = useTranslatedNavLinks();

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* 📱 MOBILE FIX: Added 'text-center md:text-left' to handle alignment automatically */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-center md:text-left">
          
          {/* --- Column 1 & 2: Brand Info (Spans 2 columns) --- */}
          <div className="col-span-1 md:col-span-2">
             
             {/* Logo Section */}
             {/* 📱 MOBILE FIX: justify-center on mobile, start on desktop */}
             <div 
               className="flex items-center justify-center md:justify-start gap-3 mb-4 cursor-pointer group" 
               onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
             >
                <img 
                  src="/logo/company_logo.jpg" 
                  alt="Radar Snipers" 
                  className="w-auto h-8 object-contain rounded bg-white" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                  }}
                />
                {/* Fallback Icon */}
                <div className="fallback-icon hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <Activity size={18} />
                </div>
                <span className="text-white font-bold text-base tracking-tight group-hover:text-blue-400 transition-colors">RADAR SNIPER</span>
             </div>

            {/* 📱 MOBILE FIX: mx-auto to center the paragraph on mobile */}
            <p className="leading-relaxed max-w-sm mb-6 text-slate-400 mx-auto md:mx-0">
              {t('footer.description', 'Pioneering the future of aerial security and IoT resilience. We empower enterprises to operate safely in an interconnected world through AI-driven defense systems.')}
            </p>
            
            {/* Social Icons */}
            {/* 📱 MOBILE FIX: justify-center on mobile */}
            <div className="flex gap-4 justify-center md:justify-start">
              {SOCIAL_LINKS.linkedin && (
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all duration-300 hover:scale-110">
                  <Linkedin size={15} />
                </a>
              )}
              {SOCIAL_LINKS.twitter && (
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:scale-110">
                  <Twitter size={15} />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300 hover:scale-110">
                  <Instagram size={15} />
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110">
                  <Facebook size={15} />
                </a>
              )}
            </div>
          </div>

          {/* --- Column 3: Solutions --- */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-blue-500">{t('footer.solutions', 'Solutions')}</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a 
                    href="#services" 
                    className="hover:text-blue-400 transition-colors duration-200 block py-1" // Added padding for easier tapping
                  >
                    {service.shortTitle || service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: Company --- */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider text-blue-500">{t('footer.company', 'Company')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="hover:text-blue-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors duration-200 block py-1">
                    {t('footer.support', 'Support')}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- Copyright Bar --- */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium text-slate-500 gap-4">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Radar Snipers (OPC) Pvt Ltd. {t('footer.rights', 'All rights reserved.')}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.cookies', 'Cookie Settings')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;