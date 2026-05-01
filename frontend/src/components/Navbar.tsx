import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Box,
  Phone,
  Activity,
  Mail,
  Briefcase,
  ShieldAlert,
  Users,
} from 'lucide-react';

import { PROJECTS, WHATSAPP_LINK } from '../../constants';
import {
  useTranslatedContactEmails,
  useTranslatedContactOffices,
  useTranslatedNavLinks,
  useTranslatedProducts,
  useTranslatedServices,
} from '../hooks/useTranslatedData';
import { Product, Service } from '../../types';

const IndiaFlag = () => <span className="mr-2 flex h-4 w-6 items-center justify-center text-lg shadow-sm" aria-label="India Flag">🇮🇳</span>;
const NetherlandsFlag = () => <span className="mr-2 flex h-4 w-6 items-center justify-center text-lg shadow-sm" aria-label="Netherlands Flag">🇳🇱</span>;

interface NavbarProps {
  onOpenService: (service: Service) => void;
  onOpenProduct: (product: Product) => void;
  onOpenGallery?: (tab: 'demos' | 'exhibitions') => void;
  onToggleLanguage?: () => void;
  onChangeLanguage?: (language: 'en' | 'nl') => void;
  currentLanguage?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenService,
  onOpenProduct,
  onOpenGallery,
  onToggleLanguage,
  onChangeLanguage,
  currentLanguage,
}) => {
  const { i18n, t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuOpenTimestampRef = useRef(0);

  const navLinks = useTranslatedNavLinks();
  const services = useTranslatedServices();
  const products = useTranslatedProducts();
  const projectHighlights = PROJECTS.slice(0, 3);
  const contactOffices = useTranslatedContactOffices();
  const contactEmails = useTranslatedContactEmails();
  const currentPath = typeof window !== 'undefined'
    ? window.location.pathname.replace(/\/+$/, '') || '/'
    : '/';

  const activeLanguage = (currentLanguage || i18n.resolvedLanguage || i18n.language || 'en').toLowerCase().startsWith('nl') ? 'nl' : 'en';

  const handleLanguageChange = (language: 'en' | 'nl') => {
    if (onChangeLanguage) {
      onChangeLanguage(language);
      return;
    }

    if (onToggleLanguage) {
      if (language !== activeLanguage) {
        onToggleLanguage();
      }
      return;
    }

    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen || typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const body = document.body;
    const scrollY = window.scrollY;
    const previousStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);

      body.style.overflow = previousStyles.overflow;
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;

      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const normalizedHref = href.replace(/\/+$/, '') || '/';
    const isHashLink = normalizedHref.startsWith('#');
    const isRouteLink = normalizedHref.startsWith('/');

    if (!isHashLink && !isRouteLink) {
      return;
    }

    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isRouteLink) {
      const [targetPathRaw, targetHash] = normalizedHref.split('#');
      const targetPath = targetPathRaw.replace(/\/+$/, '') || '/';

      if (currentPath === targetPath) {
        if (targetHash) {
          const targetElement = document.getElementById(targetHash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      window.location.assign(normalizedHref);
      return;
    }

    if (currentPath !== '/') {
      window.location.assign(`/${normalizedHref}`);
      return;
    }

    const targetId = normalizedHref.slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else if (normalizedHref === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProductSelect = (product: Product) => {
    setIsMobileMenuOpen(false);
    onOpenProduct(product);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleNavigate(e, href);
  };

  return (
    <header
      className={`fixed top-0 z-[80] w-full border-b transition-all duration-500 ${
        isScrolled
          ? 'border-slate-200/70 bg-white/85 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl'
          : 'border-transparent bg-white/55 py-4 backdrop-blur-md'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0071E3]/50 to-transparent" />

      <div className="container mx-auto flex items-center justify-between gap-3 px-3 relative sm:px-4 md:px-8">
        <div className="flex shrink-0 cursor-pointer items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="/logo/company_logo.png"
            alt="PCE BV Logo"
            className={`w-auto rounded-md object-contain transition-all duration-300 ${isScrolled ? 'h-9 sm:h-11 lg:h-12' : 'h-12 sm:h-14 lg:h-16'}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement | null;
              fallback?.classList.remove('hidden');
            }}
          />
          <div className="fallback-icon hidden h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 text-white shadow-lg shadow-blue-500/20">
            <Activity size={24} />
          </div>
          <div className="hidden xl:block">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">Petroleum Consulting Engineers</div>
            <div className="text-sm font-bold tracking-tight text-slate-900">PCE BV</div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 rounded-full border border-slate-200/80 bg-white/65 px-5 py-2 shadow-sm backdrop-blur-md lg:flex xl:gap-8">
          {(navLinks as any[]).map((link: any) => (
            <div key={link.name} className="group relative">
              <a
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className="relative flex items-center gap-1 py-2 text-sm font-medium tracking-wide text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:text-blue-600"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={12} className="opacity-80 transition-transform group-hover:rotate-180" />}
                <span className="absolute bottom-2 left-0 h-[1px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </a>

              {link.hasDropdown && (
                <div
                  className={`absolute left-[-1rem] top-full z-[60] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl border border-slate-100 bg-white opacity-0 invisible shadow-2xl transition-all duration-300 transform translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 w-[360px]`}
                >
                  {link.dropdownKey === 'services' && (
                    <div className="w-full p-2.5">
                      <div className="mb-2.5 flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] text-blue-600">Services</h4>
                        </div>
                        <a href="/services" onClick={(e) => handleNavigate(e, '/services')} className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 hover:text-blue-700">All →</a>
                      </div>

                      <div className="space-y-1.5">
                        {(services as any[]).slice(0, 4).map((service: any) => (
                          <a
                            key={service.id}
                            href={`/services#${service.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsMobileMenuOpen(false);
                              onOpenService(service);
                              handleNavigate(e, `/services#${service.id}`);
                            }}
                            className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600 text-sm">{service.icon ? <service.icon size={14} /> : <ShieldAlert size={12} />}</div>
                            <div className="flex-1">
                              <div className="text-[11px] font-semibold text-slate-900 line-clamp-1">{service.shortTitle || service.title}</div>
                              <div className="mt-0.5 text-[9px] text-slate-600 line-clamp-1">{service.tagline || service.description || ''}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {link.dropdownKey === 'products' && (
                    <div className="p-2.5">
                      <div className="mb-2.5 flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">Solutions</h4>
                        <a href="/services" onClick={(e) => handleNavigate(e, '/services')} className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 hover:text-blue-700">All →</a>
                      </div>

                      <div className="space-y-1.5">
                        {(products as any[]).slice(0, 4).map((product: any) => (
                          <a
                            key={product.id}
                            href="/services"
                            onClick={(e) => { e.preventDefault(); handleProductSelect(product); handleNavigate(e, '/services'); }}
                            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50"
                          >
                            <img src={product.image || '/logo/company_logo.jpg'} className="h-7 w-7 rounded bg-slate-200 object-cover" alt="" onError={(e) => (e.currentTarget.src = '/logo/company_logo.jpg')} />
                            <div className="flex-1">
                              <div className="text-[11px] font-semibold text-slate-900 line-clamp-1">{product.name}</div>
                              <div className="mt-0.5 text-[9px] text-slate-600 line-clamp-1">{product.tagline || ''}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {link.dropdownKey === 'projects' && (
                    <div className="p-2.5">
                      <div className="mb-2.5 flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">Featured Projects</h4>
                        <a href="/projects" onClick={(e) => handleNavigate(e, '/projects')} className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 hover:text-blue-700">All →</a>
                      </div>

                      <div className="space-y-1.5">
                        {projectHighlights.map((project) => (
                          <a
                            key={project.id}
                            href="/projects"
                            onClick={(e) => handleNavigate(e, '/projects')}
                            className="group block rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50"
                          >
                            <div className="text-[11px] font-semibold text-slate-900">{project.title}</div>
                            <div className="mt-0.5 text-[9px] text-slate-600 line-clamp-1">{project.category}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {link.dropdownKey === 'about' && (
                    <div className="p-2.5">
                      <h4 className="mb-2.5 border-b border-slate-100 pb-2.5 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">About Us</h4>
                      <div className="space-y-1.5">
                        <a href="/about#story" onClick={(e) => handleNavigate(e, '/about#story')} className="block rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50">
                          <div className="text-[11px] font-semibold text-slate-900">Company Story</div>
                          <div className="mt-0.5 text-[9px] text-slate-600">Our mission & history</div>
                        </a>
                        <a href="/about#founders" onClick={(e) => handleNavigate(e, '/about#founders')} className="block rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50">
                          <div className="text-[11px] font-semibold text-slate-900">Founders</div>
                          <div className="mt-0.5 text-[9px] text-slate-600">Meet the team</div>
                        </a>
                        <a href="/about#experience" onClick={(e) => handleNavigate(e, '/about#experience')} className="block rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50">
                          <div className="text-[11px] font-semibold text-slate-900">Experience</div>
                          <div className="mt-0.5 text-[9px] text-slate-600">20+ years expertise</div>
                        </a>
                        <a href="/about" onClick={(e) => handleNavigate(e, '/about')} className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-[10px] font-bold text-white transition-all hover:bg-blue-700">
                          View Full Profile
                        </a>
                      </div>
                    </div>
                  )}

                  {link.dropdownKey === 'contact' && (
                    <div className="p-2.5 space-y-2.5">
                      <div className="border-b border-slate-100 pb-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">Get In Touch</h4>
                      </div>
                      
                      <a href="/contact#offices" onClick={(e) => handleNavigate(e, '/contact#offices')} className="block rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50">
                        <div className="text-[11px] font-semibold text-slate-900">Global Offices</div>
                        <div className="mt-0.5 text-[9px] text-slate-600">Netherlands & India</div>
                      </a>

                      <a href="/contact#form" onClick={(e) => handleNavigate(e, '/contact#form')} className="block rounded-lg border border-slate-200 bg-white px-3 py-2 transition-all hover:border-blue-300 hover:bg-blue-50">
                        <div className="text-[11px] font-semibold text-slate-900">Direct Message</div>
                        <div className="mt-0.5 text-[9px] text-slate-600">Send us an inquiry</div>
                      </a>

                      <a href="/contact" onClick={(e) => handleNavigate(e, '/contact')} className="w-full rounded-lg bg-blue-600 py-2 text-center text-[10px] font-bold text-white transition-all hover:bg-blue-700">
                        Full Contact Info
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button type="button" onClick={() => handleLanguageChange('en')} className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-colors ${activeLanguage === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`} aria-label="Switch language to English">EN</button>
            <button type="button" onClick={() => handleLanguageChange('nl')} className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide transition-colors ${activeLanguage === 'nl' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`} aria-label="Switch language to Dutch">NL</button>
          </div>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-all hover:scale-105 hover:text-blue-600">
            <MessageCircle size={16} className="text-slate-500 transition-colors hover:text-blue-600" />
            <span className="hidden xl:inline">{t('navbar.quickChat', 'Quick Chat')}</span>
          </a>

          <a
  href="#contact"
  onClick={(e) => handleScrollToSection(e, '#contact')}
  className="group relative inline-flex max-w-full shrink items-center justify-center 
  rounded-full bg-slate-900 px-4 sm:px-5 py-2.5 text-sm font-bold text-white 
  shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
>
  <span className="flex items-center gap-2 truncate">
    {t('navbar.bookConsultation', 'Book Consultation')}
    <ChevronRight size={10} className="transition-transform group-hover:translate-x-1" />
  </span>
</a>
        </div>

        <div className="relative z-50 flex items-center gap-2 lg:hidden">
          <div className="inline-flex max-w-[52vw] items-center gap-1 rounded-full border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur-sm sm:max-w-none">
            <button type="button" onClick={() => handleLanguageChange('en')} className={`rounded-full px-1.5 py-1 text-[9px] font-bold tracking-wide transition-colors sm:px-2 sm:text-[10px] ${activeLanguage === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`} aria-label="Switch language to English">EN</button>
            <button type="button" onClick={() => handleLanguageChange('nl')} className={`rounded-full px-1.5 py-1 text-[9px] font-bold tracking-wide transition-colors sm:px-2 sm:text-[10px] ${activeLanguage === 'nl' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`} aria-label="Switch language to Dutch">NL</button>
          </div>

          <button
            className="rounded-lg p-2 text-slate-900 transition-colors hover:bg-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              const nextOpen = !isMobileMenuOpen;
              if (nextOpen) {
                menuOpenTimestampRef.current = Date.now();
              }
              setIsMobileMenuOpen(nextOpen);
            }}
          >
            {isMobileMenuOpen ? <X size={26} className="text-slate-900" /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[95] bg-slate-900/20 backdrop-blur-[1px] lg:hidden"
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            if (Date.now() - menuOpenTimestampRef.current < 120) return;
            setIsMobileMenuOpen(false);
          }}
        >
          <div className="mobile-menu-panel absolute bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-2 right-2 top-[calc(64px+env(safe-area-inset-top))] flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-sm sm:left-3 sm:right-3 sm:top-[calc(74px+env(safe-area-inset-top))]" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 pb-6 pt-4 scroll-smooth">
              {(navLinks as any[]).map((link: any) => (
                <div key={link.name} className="border-b border-slate-100 last:border-0">
                  {link.hasDropdown ? (
                    <details className="group overflow-hidden">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-base font-bold text-slate-900 select-none sm:text-lg">
                        <div className="flex items-center gap-2">{link.name}</div>
                        <ChevronDown size={18} className="text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="animate-in slide-in-from-top-2 space-y-2 pb-4 pl-2 duration-200">
                        {link.dropdownKey === 'services' && (services as any[]).slice(0,4).map((s: any) => (
                          <button key={s.id} onClick={() => { onOpenService(s); setIsMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-all hover:bg-slate-50">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600"><s.icon size={14} /></div>
                            <span className="text-sm font-semibold text-slate-700">{s.shortTitle}</span>
                          </button>
                        ))}

                        {link.dropdownKey === 'products' && (products as any[]).slice(0, 4).map((p: any) => (
                          <button key={p.id} onClick={() => { handleProductSelect(p); setIsMobileMenuOpen(false); }} className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-all hover:bg-slate-50">
                            <img src={p.image || 'https://placehold.co/40x40'} className="h-8 w-8 rounded bg-slate-200 object-cover" alt="" onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40')} />
                            <span className="text-sm font-semibold text-slate-700">{p.name}</span>
                          </button>
                        ))}

                        {link.dropdownKey === 'projects' && (
                          <>
                            {projectHighlights.map((project, index) => (
                              <a key={project.id} href="/projects" className={`flex w-full items-center gap-3 rounded-lg border p-2.5 text-left transition-all hover:bg-slate-50 ${index === 1 ? 'border-slate-950/10 bg-slate-950/5' : 'border-slate-100'}`}>
                                <img src={project.image || 'https://placehold.co/40x40'} className="h-8 w-8 shrink-0 rounded bg-slate-200 object-cover" alt="" onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40')} />
                                <span className="line-clamp-1 text-sm font-semibold text-slate-700">{project.title}</span>
                              </a>
                            ))}
                            <a href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-2.5 text-left transition-all hover:bg-slate-50">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600"><Box size={14} /></div>
                              <span className="text-sm font-semibold text-slate-700">{t('navbar.viewAll', 'Open Projects Page')}</span>
                            </a>
                          </>
                        )}

                        {link.dropdownKey === 'about' && (
                          <>
                            <a href="/about#story" onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-2.5 text-left transition-all hover:bg-slate-50">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600"><Activity size={14} /></div>
                              <span className="text-sm font-semibold text-slate-700">Company story</span>
                            </a>
                            <a href="/about#founders" onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-2.5 text-left transition-all hover:bg-slate-50">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-100 bg-purple-50 text-purple-600"><Users size={14} /></div>
                              <span className="text-sm font-semibold text-slate-700">Founders</span>
                            </a>
                          </>
                        )}

                        {link.dropdownKey === 'contact' && (
                          <>
                            <a href="/contact#strategy" onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-2.5 text-left transition-all hover:bg-slate-50">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600"><ShieldAlert size={14} /></div>
                              <span className="text-sm font-semibold text-slate-700">Strategy</span>
                            </a>
                            <a href="/contact#form" onClick={() => setIsMobileMenuOpen(false)} className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-2.5 text-left transition-all hover:bg-slate-50">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-purple-100 bg-purple-50 text-purple-600"><Mail size={14} /></div>
                              <span className="text-sm font-semibold text-slate-700">Form</span>
                            </a>
                          </>
                        )}
                      </div>
                    </details>
                  ) : (
                    <a href={link.href} onClick={(e) => handleNavigate(e, link.href)} className="flex items-center justify-between py-3.5 text-base font-bold text-slate-900 sm:text-lg">
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-slate-100 bg-white/95 p-4">
              <div className="grid grid-cols-2 gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 rounded-xl border border-green-100 bg-green-50 p-3 text-xs font-bold text-green-700 transition-transform active:scale-95">
                  <MessageCircle size={20} />
                  <span>{t('navbar.whatsapp', 'WhatsApp')}</span>
                </a>
                <a href="#contact" onClick={(e) => handleNavigate(e, '#contact')} className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-900 p-3 text-xs font-bold text-white transition-transform active:scale-95 shadow-lg shadow-slate-200">
                  <Phone size={20} />
                  <span>{t('navbar.contact', 'Contact')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;