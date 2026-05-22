import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Globe, ArrowUpRight, Settings, PenTool, HardHat } from 'lucide-react';
import { useTranslatedNavLinks, useTranslatedServices } from '../hooks/useTranslatedData';

/**
 * CONFIGURATION DATA
 */
const MAIN_NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const SERVICE_PILLARS = [
  {
    id: 'project-controls',
    href: '/services#project-controls',
    title: 'Project Controls',
    description: 'Cost, planning, risk, and change governance.',
    icon: Settings
  },
  {
    id: 'detail-engineering',
    href: '/services#detail-engineering',
    title: 'Detail Engineering',
    description: 'Multi-discipline design and deliverables.',
    icon: PenTool
  },
  {
    id: 'procurement-construction',
    href: '/services#procurement-construction',
    title: 'Execution Support',
    description: 'Vendor, site, and construction-stage support.',
    icon: HardHat
  },
];

interface NavbarProps {
  onToggleLanguage?: () => void;
  onChangeLanguage?: (language: 'en' | 'nl') => void;
  currentLanguage?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  onToggleLanguage,
  onChangeLanguage,
  currentLanguage,
}) => {
  const { t, i18n } = useTranslation();
  const navLinks = useTranslatedNavLinks();
  const translatedServices = useTranslatedServices();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const labelByKey = new Map(navLinks.map((link) => [link.navKey ?? link.name.toLowerCase(), link.name] as const));
  const mainNavItems = MAIN_NAV_ITEMS.map((link) => ({
    ...link,
    name: labelByKey.get(link.name.toLowerCase()) ?? link.name,
  }));
  const servicePillars = translatedServices
    .filter((service) => ['project-controls', 'detail-engineering', 'procurement-construction'].includes(service.id))
    .map((service) => ({
      id: service.id,
      href: `/services#${service.id}`,
      title: service.shortTitle || service.title,
      description: service.description,
      icon: service.id === 'project-controls' ? Settings : service.id === 'detail-engineering' ? PenTool : HardHat,
    }));

  const currentPath = typeof window !== 'undefined'
    ? window.location.pathname.replace(/\/+$/, '') || '/'
    : '/';
  
  const activeLanguage = (currentLanguage || i18n.resolvedLanguage || i18n.language || 'en')
    .toLowerCase().startsWith('nl') ? 'nl' : 'en';

  const handleLanguageChange = (language: 'en' | 'nl') => {
    if (onChangeLanguage) {
      onChangeLanguage(language);
    } else if (onToggleLanguage && language !== activeLanguage) {
      onToggleLanguage();
    } else {
      i18n.changeLanguage(language);
    }
  };

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setTimeout(() => setMobileServicesOpen(false), 300);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        // Keep services expanded by default to reduce taps in mobile nav.
        setMobileServicesOpen(true);
      }
      return nextOpen;
    });
  }, []);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const normalizedHref = href.replace(/\/+$/, '') || '/';
    if (normalizedHref.startsWith('/') || normalizedHref.startsWith('#')) {
      e.preventDefault();
      closeMobileMenu();
      const [path, hash] = normalizedHref.split('#');
      if (currentPath === (path || '/')) {
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.location.assign(normalizedHref);
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMobileMenu();

    if (currentPath === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.location.assign('/');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof window === 'undefined') return;

    const syncHeaderHeight = () => {
      const headerHeight = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--navbar-height', `${headerHeight}px`);
      document.documentElement.style.setProperty('--hero-offset', `${headerHeight}px`);
    };

    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
    return () => window.removeEventListener('resize', syncHeaderHeight);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isActiveRoute = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || (href === '/services' && currentPath.startsWith('/services'));
  };

  return (
    <>
      <header 
        ref={headerRef} 
        className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#181A1F] shadow-xl border-b border-white/5' 
            : 'bg-[#181A1F]/95 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* LOGO & TEXT SECTION */}
            <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0" aria-label="Go to homepage">
              <img src="/logo/company_logo.png" alt="Company Logo" className="h-7 sm:h-8 md:h-10 object-contain bg-white/10 p-1 rounded shrink-0 transition-transform group-hover:scale-105" />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[6.5px] min-[375px]:text-[7.5px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-zinc-400 leading-none mb-0.5 sm:mb-1 truncate">
                  Engineering & Project Execution
                </span>
                <span className="text-sm min-[375px]:text-base sm:text-lg md:text-xl font-extrabold text-white leading-none tracking-tight truncate">
                  PCE BV.
                </span>
              </div>
            </a>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-8 h-full">
              {mainNavItems.map((link) => (
                <div key={link.name} className={`relative flex items-center h-full ${link.hasDropdown ? 'group' : ''}`}>
                  <a 
                    href={link.href} 
                    onClick={link.hasDropdown ? (e) => e.preventDefault() : (e) => handleNavigate(e, link.href)} 
                    className={`text-sm font-bold uppercase tracking-wide transition-colors flex items-center gap-1 ${
                      isActiveRoute(link.href) 
                        ? 'text-[var(--accent,#F25C19)]' 
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                  </a>

                  {/* DESKTOP DROPDOWN */}
                  {link.hasDropdown && (
                    <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 w-[340px] bg-white border border-gray-200 rounded-b-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:bg-transparent">
                      <div className="h-1 w-full bg-[var(--accent,#F25C19)]"></div>
                      <div className="p-2 flex flex-col">
                        {servicePillars.map((service, index) => (
                          <div key={service.id} className="flex flex-col">
                            <a 
                              href={service.href}
                              onClick={(e) => handleNavigate(e, service.href)}
                              className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group/item"
                            >
                              <div className="bg-white border border-gray-100 shadow-sm p-2.5 rounded-md text-gray-500 group-hover/item:border-[#2563EB] group-hover/item:text-[#2563EB] transition-all">
                                <service.icon size={18} />
                              </div>
                              <div className="mt-0.5">
                                <div className="text-sm font-extrabold text-gray-900 mb-0.5 group-hover/item:text-[#2563EB] transition-colors">{service.title}</div>
                                <div className="text-xs text-gray-500 leading-relaxed font-medium">{service.description}</div>
                              </div>
                            </a>
                            {index < SERVICE_PILLARS.length - 1 && (
                              <div className="h-[1px] w-[calc(100%-2rem)] mx-auto bg-gray-100 my-1"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-5 shrink-0">
              
              {/* LANGUAGE SWITCHER - Embedded directly in top bar for Mobile & Desktop */}
              <div className="flex items-center bg-white/10 p-0.5 sm:p-1 rounded-full border border-white/10 backdrop-blur-sm">
                <Globe size={14} className="hidden sm:block text-zinc-300 ml-2 mr-1" />
                <div className="flex gap-0.5 sm:gap-1">
                  <button 
                    onClick={() => handleLanguageChange('en')} 
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold transition-all rounded-full ${activeLanguage === 'en' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-zinc-300 hover:text-white'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => handleLanguageChange('nl')} 
                    className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold transition-all rounded-full ${activeLanguage === 'nl' ? 'bg-[#2563EB] text-white shadow-sm' : 'text-zinc-300 hover:text-white'}`}
                  >
                    NL
                  </button>
                </div>
              </div>

              {/* Mobile Hamburger Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 sm:p-2.5 text-white hover:bg-white/10 rounded-md transition-colors min-h-11 min-w-11"
                aria-label="Open Menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <Menu size={26} className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

          </div>

          {/* MOBILE QUICK NAV (reduces dependence on burger menu) */}
          <div className="lg:hidden pb-2">
            <nav className="flex items-center gap-2 overflow-x-auto" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} aria-label="Quick navigation">
              {mainNavItems.map((link) => {
                const active = isActiveRoute(link.href);
                return (
                  <a
                    key={`quick-${link.href}`}
                    href={link.href}
                    onClick={(e) => handleNavigate(e, link.href)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-colors ${
                      active
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-white/10 text-zinc-200 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[2000] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobileMenu} />
        
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] h-[100dvh] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out overflow-hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] mb-1">Navigation</div>
              <div className="text-2xl font-extrabold text-gray-900 tracking-tight">PCE BV.</div>
            </div>
            <button 
              onClick={closeMobileMenu} 
              className="p-2 bg-white text-gray-400 shadow-sm border border-gray-100 hover:bg-gray-50 hover:text-gray-900 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Links */}
          <nav id="mobile-navigation" className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
            {mainNavItems.filter((link) => link.href !== '/contact').map((link) => {
              const active = isActiveRoute(link.href);

              return (
                <div key={link.name} className="flex flex-col">
                  <div 
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      active && !link.hasDropdown ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <a 
                      href={link.href} 
                      onClick={(e) => {
                        if (link.hasDropdown) {
                          e.preventDefault();
                          setMobileServicesOpen(!mobileServicesOpen);
                        } else {
                          handleNavigate(e, link.href);
                        }
                      }} 
                      className="text-2xl font-extrabold tracking-tight flex-1 flex items-center min-h-12"
                    >
                      {link.name}
                    </a>
                    
                    {link.hasDropdown ? (
                      <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="p-1 text-gray-400">
                        <ChevronDown size={24} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-gray-900' : ''}`} />
                      </button>
                    ) : (
                      <ArrowUpRight size={20} className={active ? 'text-[#2563EB]' : 'text-gray-300'} />
                    )}
                  </div>
                  
                  {/* Mobile Accordion */}
                  {link.hasDropdown && (
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? 'max-h-[400px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-6 border-l-2 border-gray-100 ml-6 flex flex-col gap-5 py-2">
                        {servicePillars.map(service => (
                          <a 
                            key={service.id} 
                            href={service.href} 
                            onClick={(e) => handleNavigate(e, service.href)}
                            className="text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-gray-900"
                          >
                            {service.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Drawer Footer (Removed redundant language switcher) */}
          <div className="p-6 bg-white border-t border-gray-100 flex flex-col justify-end">
            <a 
              href="/contact"
              onClick={(e) => handleNavigate(e, '/contact')} 
              className="w-full py-4 flex items-center justify-center gap-2 bg-[var(--accent,#F25C19)] text-white font-extrabold uppercase tracking-widest rounded-xl shadow-[0_8px_20px_-8px_rgba(242,92,25,0.6)] hover:brightness-105 active:scale-[0.98] transition-all"
            >
              {t('navbar.contactUs', 'Contact Us')} <ArrowUpRight size={18} />
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;