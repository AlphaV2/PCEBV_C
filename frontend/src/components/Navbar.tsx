import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  ChevronDown,
  Activity,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

/**
 * CONFIGURATION DATA
 */
const MAIN_NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', hasDropdown: true as const },
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
  },
  {
    id: 'detail-engineering',
    href: '/services#detail-engineering',
    title: 'Detail Engineering',
    description: 'Multi-discipline design and deliverables.',
  },
  {
    id: 'procurement-construction',
    href: '/services#procurement-construction',
    title: 'Execution Support',
    description: 'Vendor, site, and construction-stage support.',
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
  const { i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePanelActive, setIsMobilePanelActive] = useState(false);

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
    setIsMobilePanelActive(false);
    setTimeout(() => setIsMobileMenuOpen(false), 300);
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      const timer = setTimeout(() => setIsMobilePanelActive(true), 10);
      return () => {
        const savedScrollY = Math.abs(parseInt(document.body.style.top || '0', 10));
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
        clearTimeout(timer);
      };
    }
  }, [isMobileMenuOpen]);

  const isActiveRoute = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || (href === '/services' && currentPath.startsWith('/services'));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] w-full transition-all duration-500 ${
        isScrolled
          ? 'border-b border-slate-200/70 bg-white/95 py-2.5 shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-white/50 py-4 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-12">
        
        {/* LOGO & BRANDING */}
        <div 
          className="flex shrink-0 cursor-pointer items-center gap-3" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative flex items-center">
            <img
              src="/logo/company_logo.png"
              alt="PCE BV Logo"
              className={`w-auto rounded-md object-contain transition-all duration-300 ${
                isScrolled ? 'h-9 sm:h-11' : 'h-11 sm:h-14'
              }`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
              }}
            />
            {/* Fallback Icon Updated to new Brand Blue */}
            <div className="fallback-icon hidden flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071E3] text-white shadow-lg">
              <Activity size={22} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="hidden sm:block text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">Engineering & Project Execution</div>
            <div className="text-lg sm:text-xl font-black tracking-tighter text-slate-900 leading-none">PCE BV.</div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-slate-200/60 bg-white/90 p-1 shadow-sm">
          {MAIN_NAV_ITEMS.map((link) => (
            <div key={link.name} className="group relative">
              <a
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  isActiveRoute(link.href) 
                    ? 'bg-[#0071E3] text-white shadow-md' // Updated Brand Blue Active State
                    : 'text-slate-600 hover:bg-blue-50 hover:text-[#0071E3]' // Updated Brand Blue Hover
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform opacity-50" />}
              </a>
              {link.hasDropdown && (
                <div className="pointer-events-none absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-black/5">
                    {SERVICE_PILLARS.map((p) => (
                      <a key={p.id} href={p.href} onClick={(e) => handleNavigate(e, p.href)} className="block rounded-xl p-3 hover:bg-blue-50 transition-colors">
                        <div className="text-sm font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-500 leading-tight">{p.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* HEADER ACTIONS */}
        <div className="flex items-center gap-2">
          {/* EN/NL Toggle */}
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`rounded px-2.5 py-1 text-[10px] font-black transition-all ${activeLanguage === 'en' ? 'bg-[#0071E3] text-white shadow-sm' : 'text-slate-400 hover:text-[#0071E3]'}`}
            >
              EN
            </button>
            <button 
              onClick={() => handleLanguageChange('nl')} 
              className={`rounded px-2.5 py-1 text-[10px] font-black transition-all ${activeLanguage === 'nl' ? 'bg-[#0071E3] text-white shadow-sm' : 'text-slate-400 hover:text-[#0071E3]'}`}
            >
              NL
            </button>
          </div>

          {/* Mobile Hamburger - Updated to new Brand Blue */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex lg:hidden items-center justify-center rounded-lg bg-[] p-2.5 text-white shadow-lg shadow-[#0071E3]/20 active:scale-90 transition-transform"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          <div 
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isMobilePanelActive ? 'opacity-100' : 'opacity-0'}`} 
            onClick={closeMobileMenu}
          />
          
          <div className={`absolute right-0 top-0 bottom-0 h-[100dvh] w-[85%] sm:w-[65%] max-w-[360px] transform bg-white/95 backdrop-blur-3xl shadow-[-10px_0_40px_rgba(0,0,0,0.1)] border-l border-slate-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform ${isMobilePanelActive ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex h-full flex-col px-6 py-8">
              
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-100">
                <div className="flex flex-col">
                  {/* Brand Blue text update */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0071E3] mb-0.5">Navigation</span>
                  <span className="text-2xl font-black tracking-tighter text-slate-900">PCE BV.</span>
                </div>
                <button onClick={closeMobileMenu} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full transition-colors active:scale-90">
                  <X size={24} strokeWidth={2} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain pr-2">
                <nav className="flex flex-col gap-3">
                  {MAIN_NAV_ITEMS.map((link) => {
                    const isContact = link.name === 'Contact';
                    const isActive = isActiveRoute(link.href);
                    
                    if (isContact) return null;

                    return (
                      <div key={link.name} className="flex flex-col">
                        <a
                          href={link.href}
                          onClick={(e) => handleNavigate(e, link.href)}
                          className={`flex items-center justify-between py-3 text-2xl font-black tracking-tight transition-all active:scale-95 rounded-xl px-2 ${
                            // Active state uses Updated Brand Blue background tint and text color
                            isActive ? 'text-[#0071E3] bg-[#0071E3]/10' : 'text-slate-900 hover:text-[#0071E3]'
                          }`}
                        >
                          {link.name}
                          <ArrowUpRight size={20} className={isActive ? 'opacity-100' : 'opacity-20'} />
                        </a>
                        
                        {link.hasDropdown && (
                          <div className="mt-2 space-y-1 border-l-2 border-slate-200 ml-4 pl-4 py-2">
                            {SERVICE_PILLARS.map((p) => (
                              <a 
                                key={p.id} 
                                href={p.href} 
                                onClick={(e) => handleNavigate(e, p.href)} 
                                // Hover state updated to new Brand Blue
                                className="block text-xs font-black uppercase tracking-[0.15em] text-slate-700 hover:text-[#0071E3] transition-colors py-2.5"
                              >
                                {p.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-auto pt-6 shrink-0">
                <button 
                  onClick={(e: any) => handleNavigate(e, '/contact')}
                  className="w-full py-4 bg-[#FF6A2A] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#e95f20] shadow-lg shadow-orange-500/20 transition-all active:scale-95 mb-6 flex items-center justify-center gap-2"
                >
                  Contact Us <ArrowRight size={16} />
                </button>

                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <div className="flex gap-4">
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-[#0071E3] transition-colors">LinkedIn</a>
                  </div>
                  <span>© 2026 PCE BV.</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;