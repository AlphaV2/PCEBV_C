import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Twitter, Instagram, Activity, Facebook, Mail, PhoneCall, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../../constants';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { useTranslatedNavLinks, useTranslatedServices } from '../hooks/useTranslatedData';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const services = useTranslatedServices();
  const navLinks = useTranslatedNavLinks();
  const { footer } = HOMEPAGE_CONFIG;

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0071E3] to-transparent" />
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#0071E3]/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#FF6A2A]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 py-12 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-center md:text-left">
          <div className="md:col-span-2">
            <div
              className="mb-4 flex cursor-pointer items-center justify-center gap-3 group md:justify-start"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/logo/company_logo.jpg"
                alt="PCE BV"
                className="h-8 w-auto rounded bg-white object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <div className="fallback-icon hidden flex h-8 w-8 items-center justify-center rounded-lg bg-[#0071E3] text-white shadow-lg">
                <Activity size={18} />
              </div>
              <span className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-[#5EA8FF]">PCE BV</span>
            </div>

            <p className="mx-auto mb-6 max-w-md leading-relaxed text-slate-400 md:mx-0">
              {t('footer.description', footer.company_line)}
            </p>

            <div className="flex justify-center gap-4 md:justify-start">
              {SOCIAL_LINKS.linkedin && (
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0077b5] hover:text-white">
                  <Linkedin size={15} />
                </a>
              )}
              {SOCIAL_LINKS.twitter && (
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1DA1F2] hover:text-white">
                  <Twitter size={15} />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E1306C] hover:text-white">
                  <Instagram size={15} />
                </a>
              )}
              {SOCIAL_LINKS.facebook && (
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1877F2] hover:text-white">
                  <Facebook size={15} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#5EA8FF]">{t('footer.solutions', 'Solutions')}</h4>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a href={`/services#${service.id}`} className="block py-1 transition-colors duration-200 hover:text-white">
                    {service.shortTitle || service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#5EA8FF]">{t('footer.company', 'Company')}</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="block py-1 transition-colors duration-200 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="block py-1 transition-colors duration-200 hover:text-white">
                  {t('footer.support', 'Support')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <Mail className="h-4 w-4 text-[#5EA8FF]" />
            <span className="text-sm">{footer.contact_info.email}</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <PhoneCall className="h-4 w-4 text-[#5EA8FF]" />
            <span className="text-sm">{footer.contact_info.phone}</span>
          </div>
          <div className="flex items-center justify-center gap-3 md:justify-end">
            <MapPin className="h-4 w-4 text-[#5EA8FF]" />
            <span className="text-sm">{footer.contact_info.address}</span>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium text-slate-500">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Petroleum Consulting Engineers BV. {t('footer.rights', 'All rights reserved.')}</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="transition-colors hover:text-white">{t('footer.privacy', 'Privacy Policy')}</a>
            <a href="#" className="transition-colors hover:text-white">{t('footer.terms', 'Terms of Service')}</a>
            <a href="#" className="transition-colors hover:text-white">{t('footer.cookies', 'Cookie Settings')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;