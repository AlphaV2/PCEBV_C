import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { FOOTER, ROUTES } from '../config';
import { useTranslatedNavLinks, useTranslatedServices } from '../hooks/useTranslatedData';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const services = useTranslatedServices();
  const navLinks = useTranslatedNavLinks();
  const { footer } = HOMEPAGE_CONFIG;

  return (
    <footer 
      className="bg-[#181A1F] text-zinc-300 border-t-[4px] border-[#F25C19] font-sans"
      style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
    >
      <div className="container mx-auto px-6 pt-16 pb-8">
        
        {/* Main Grid: Compact & Stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/logo/company_logo.webp" alt="PCE BV" className="h-9 w-auto object-contain" width="36" height="36" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500">Engineering & Project Execution</span>
                <span className="text-xl font-extrabold text-white leading-none">PCE BV.</span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-[250px]">
              {t('footer.description', FOOTER.companyLine || footer.company_line)}
            </p>
            {SOCIAL_LINKS.linkedin && (
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-[#0A66C2] transition-colors duration-300"
                 aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            )}
          </div>

          {/* 2. Solutions - With Hover Effect */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Solutions</h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a href={`/services#${service.id}`} className="group flex items-center text-xs font-medium text-zinc-400 hover:text-white transition-all w-max">
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#F25C19]" />
                    {service.shortTitle || service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Company */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="group flex items-center text-xs font-medium text-zinc-400 hover:text-white transition-all w-max">
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#F25C19]" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-6">Contact</h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex gap-2 items-center"><Mail size={14} className="text-[#F25C19]" /> {FOOTER.contactInfo.email}</li>
              <li className="flex gap-2 items-center"><Phone size={14} className="text-[#F25C19]" /> {FOOTER.contactInfo.phone}</li>
              <li className="flex gap-2 items-start"><MapPin size={14} className="text-[#F25C19] mt-0.5" /> {FOOTER.contactInfo.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-zinc-500">
          <p>&copy; {new Date().getFullYear()} PCE BV. All rights reserved.</p>
          <div className="flex gap-6">
            <a href={ROUTES.privacy} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href={ROUTES.terms} className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <a href="https://interxectlabs.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Developed by InterXect Labs
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;