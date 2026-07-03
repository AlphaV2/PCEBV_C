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
    <footer className="bg-[#181A1F] text-zinc-300 border-t-[4px] border-[var(--accent,#F25C19)] font-sans">
      <div className="container mx-auto px-6 lg:px-12 pt-16 pb-8">
        
        {/* COMPACT TOP GRID: 4 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          {/* COLUMN 1: Brand & Description */}
          <div className="flex flex-col">
            <div 
              className="flex items-center gap-3 cursor-pointer group mb-6 w-max"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo/company_logo.png"
                alt="PCE BV"
                className="h-9 w-auto rounded bg-white/10 p-1 object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-zinc-500 leading-none mb-1">
                  Engineering & Project Execution
                </span>
                <span className="text-xl font-extrabold text-white leading-none tracking-tight">
                  PCE BV.
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed mb-6 max-w-xs">
              {t('footer.description', FOOTER.companyLine || footer.company_line)}
            </p>

            {/* LinkedIn Icon */}
            {SOCIAL_LINKS.linkedin && (
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>

          {/* COLUMN 2: Solutions */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
              {t('footer.solutions', 'Solutions')}
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a 
                    href={`/services#${service.id}`} 
                    className="group flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors w-max"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 group-hover:text-[var(--accent,#F25C19)]" />
                    {service.shortTitle || service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
              {t('footer.company', 'Company')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors w-max"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 group-hover:text-[var(--accent,#F25C19)]" />
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact" 
                  className="group flex items-center text-sm font-medium text-zinc-400 hover:text-white transition-colors w-max"
                >
                  <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 group-hover:text-[var(--accent,#F25C19)]" />
                  {t('footer.support', 'Support')}
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact Information (Compressed from cards to inline list) */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6">
              {t('footer.contact', 'Contact')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${FOOTER.contactInfo.email || footer.contact_info.email}`} className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-1.5 rounded bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 group-hover:text-[var(--accent,#F25C19)] group-hover:border-[var(--accent,#F25C19)] transition-colors">
                    <Mail size={14} />
                  </div>
                  <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                    {FOOTER.contactInfo.email || footer.contact_info.email}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${FOOTER.contactInfo.phone || footer.contact_info.phone}`} className="flex items-start gap-3 group">
                  <div className="mt-0.5 p-1.5 rounded bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 group-hover:text-[var(--accent,#F25C19)] group-hover:border-[var(--accent,#F25C19)] transition-colors">
                    <Phone size={14} />
                  </div>
                  <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">
                    {FOOTER.contactInfo.phone || footer.contact_info.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded bg-zinc-800/50 border border-zinc-700/50 text-zinc-400">
                  <MapPin size={14} />
                </div>
                <span className="text-sm font-medium text-zinc-400">
                  {FOOTER.contactInfo.address || footer.contact_info.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR: Legal & Credits */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-500">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span>&copy; {new Date().getFullYear()} Petroleum Consulting Engineers BV.</span>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700"></div>
            <span>{t('footer.rights', 'All rights reserved.')}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
            <a href={ROUTES.privacy} className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</a>
            <a href={ROUTES.terms} className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</a>
          </div>

          <div className="flex items-center gap-1.5 mt-2 lg:mt-0">
            <span>{t('footer.developedBy', 'Developed & Maintained by')}</span>
            <a 
              href="https://interxect.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white font-bold hover:text-[var(--accent,#F25C19)] transition-colors"
            >
              InterXect Labs
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;