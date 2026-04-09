import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, ChevronRight, ChevronDown,
  MessageCircle, Box, Shield,
  Phone, Activity, Camera, PlayCircle,
  Mail, Briefcase, ShieldAlert
} from 'lucide-react';

// Imported constants
import {
  WHATSAPP_LINK
} from '../../constants';
import {
  useTranslatedAbout,
  useTranslatedContactEmails,
  useTranslatedContactOffices,
  useTranslatedNavLinks,
  useTranslatedProducts,
  useTranslatedServices,
} from '../hooks/useTranslatedData';

import { Product, Service } from '../../types';

// Simple Flag Components
const IndiaFlag = () => <span className="w-6 h-4 flex items-center justify-center text-lg shadow-sm mr-2" aria-label="India Flag">🇮🇳</span>;
const NetherlandsFlag = () => <span className="w-6 h-4 flex items-center justify-center text-lg shadow-sm mr-2" aria-label="Netherlands Flag">🇳🇱</span>;

interface NavbarProps {
  onOpenService: (service: Service) => void;
  onOpenProduct: (product: Product) => void;
  // 🚨 FIX 1: Made optional (?) to prevent crashes if App.tsx doesn't pass it
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
  const aboutParagraphs = useTranslatedAbout();
  const contactOffices = useTranslatedContactOffices();
  const contactEmails = useTranslatedContactEmails();
  const activeLanguage = (currentLanguage || i18n.resolvedLanguage || i18n.language || 'en')
    .toLowerCase()
    .startsWith('nl')
    ? 'nl'
    : 'en';

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

  // Handle Scroll Effect for Transparent to White transition
  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 20);
      } catch (e) {}
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

    // More reliable lock than overflow only, especially on mobile browsers.
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

    const handleHashChange = () => setIsMobileMenuOpen(false);

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('hashchange', handleHashChange);
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

  // Smooth Scroll Handler
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') || href === '/') {
        e.preventDefault();
        try {
            const targetId = href.startsWith('#') ? href.substring(1) : href;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else if (href === '#hero' || href === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            window.history.pushState({}, '', href);
            setIsMobileMenuOpen(false);
        } catch (err) {
            console.error("Scroll error:", err);
        }
    }
  };

  const handleProductSelect = (product: Product) => {
      setIsMobileMenuOpen(false);
      onOpenProduct(product);
  };

  const handleGallerySelect = (tab: 'demos' | 'exhibitions') => {
      // 1. Close Menu
      setIsMobileMenuOpen(false);
      
      // 🚨 FIX 2: Check if function exists before calling to prevent crash
      if (onOpenGallery) {
        onOpenGallery(tab);
      }

      // 2. Wait 100ms for React to update, then Scroll
      setTimeout(() => {
          const gallerySection = document.getElementById('gallery');
          if (gallerySection) {
              gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
              window.location.href = '#gallery';
          }
      }, 100);
  };

  return (
    <header
      className={`fixed top-0 w-full z-[80] transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-md'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
        
        {/* --- LOGO SECTION --- */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img
              src="/logo/company_logo.jpg"
              alt="Radar Snipers Logo"
              className={`w-auto object-contain rounded transition-all duration-300 ${isScrolled ? 'h-10 sm:h-12 lg:h-14' : 'h-16 sm:h-18 lg:h-20'}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.querySelector('.fallback-icon')!.classList.remove('hidden');
              }}
            />
            {/* Fallback Icon if Image Fails */}
            <div className="fallback-icon hidden w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Activity size={24} />
            </div>
          </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav className="hidden lg:flex items-center gap-8">
          {(navLinks as any[]).map((link: any) => (
            <div key={link.name} className="relative group">
              <a 
                href={link.href}
                // 🚨 FIX 3: Removed the ternary check that was blocking 'gallery' clicks. Now all links scroll.
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-sm font-medium text-slate-700 transition-all duration-300 relative flex items-center gap-1 py-4 tracking-wide group-hover:-translate-y-0.5 hover:text-blue-600"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform opacity-80" />}
                <span className="absolute bottom-2 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* --- MEGA MENUS --- */}
              {link.hasDropdown && (
                <div className={`absolute top-full -left-4 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-[60] ${
                    link.dropdownKey === 'about' ? 'w-[350px]' :
                    link.dropdownKey === 'contact' ? 'w-[650px]' :
                    link.dropdownKey === 'gallery' ? 'w-[300px]' :
                    'w-[250px]'
                }`}>
                  
                  {/* Services Mega Menu */}
                  {link.dropdownKey === 'services' && (
                    <div className="flex flex-col divide-y divide-slate-100">
                      {(services as any[]).map((service: any) => {
                        const Icon = service.icon;
                        return (
                          <button key={service.id} onClick={() => onOpenService(service)} className="flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 group/item transition-all duration-200 first:rounded-t-xl last:rounded-b-xl relative overflow-hidden">
                            <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                            <div className="p-2 bg-white text-slate-600 rounded-lg border border-slate-200 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 group-hover/item:border-blue-100 transition-all shadow-sm shrink-0"><Icon size={16} /></div>
                            <div>
                               <span className="block text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors mb-0.5">{service.shortTitle}</span>
                               <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider group-hover/item:text-slate-700 flex items-center gap-1">{t('navbar.exploreSolutions', 'Explore Solutions')} <ChevronRight size={10} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" /></span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Products Mega Menu */}
                  {link.dropdownKey === 'products' && (
                      <div className="p-4">
                          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 pl-1 border-b border-slate-100 pb-2">{t('navbar.featuredInventory', 'Featured Inventory')}</h4>
                          <div className="flex flex-col gap-2 mb-4">
                            {(products as any[]).slice(0, 3).map((product: any) => (
                               <div key={product.id} onClick={() => handleProductSelect(product)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/prod border border-transparent hover:border-slate-100">
                                 <img src={product.image || 'https://placehold.co/40x40'} alt={product.name} className="w-10 h-10 rounded-md object-cover shadow-sm border border-slate-200" onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40')} />
                                 <div>
                                    <div className="text-xs font-bold text-slate-900 group-hover/prod:text-blue-600 transition-colors">{product.name}</div>
                                    <div className="text-[9px] text-slate-600 truncate max-w-[120px]">{product.tagline}</div>
                                 </div>
                               </div>
                            ))}
                          </div>
                            <a href="#products" onClick={(e) => handleScrollToSection(e, '#products')} className="w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200 hover:border-blue-600 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300"><Box size={14} /> {t('navbar.fullInventory', 'Full Inventory')}</a>
                      </div>
                  )}

                  {/* Gallery Mega Menu */}
                  {link.dropdownKey === 'gallery' && (
                    <div className="p-2">
                        <button onClick={() => handleGallerySelect('demos')} className="flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg w-full group/item transition-colors">
                           <div className="p-2 bg-white border border-slate-200 rounded text-blue-600 group-hover/item:bg-blue-50"><PlayCircle size={16} /></div>
                          <div><span className="block text-xs font-bold text-slate-900 group-hover/item:text-blue-600">{t('navbar.productDemos', 'Product Demos')}</span><span className="block text-[10px] text-slate-500">{t('navbar.watchVideos', 'Watch Videos')}</span></div>
                        </button>
                        <button onClick={() => handleGallerySelect('exhibitions')} className="flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg w-full group/item transition-colors">
                           <div className="p-2 bg-white border border-slate-200 rounded text-purple-600 group-hover/item:bg-purple-50"><Camera size={16} /></div>
                          <div><span className="block text-xs font-bold text-slate-900 group-hover/item:text-purple-600">{t('navbar.exhibitions', 'Exhibitions')}</span><span className="block text-[10px] text-slate-500">{t('navbar.eventPhotos', 'Event Photos')}</span></div>
                        </button>
                    </div>
                  )}

                  {/* About Mega Menu */}
                  {link.dropdownKey === 'about' && (
                    <div className="p-5">
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">{t('navbar.missionVision', 'Mission & Vision')}</h4>
                        <div className="space-y-3">
                            {(aboutParagraphs as any[]).slice(0, 3).map((para: string, idx: number) => (
                               <p key={idx} className="text-[10px] text-slate-800 leading-relaxed font-medium">{para}</p>
                           ))}
                           <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                             <Shield size={12} className="text-blue-600" />
                              <p className="text-[10px] font-bold text-slate-900 italic">"{(aboutParagraphs as any[])[3]}"</p>
                           </div>
                        </div>
                        <a href="#about" onClick={(e) => handleScrollToSection(e, '#about')} className="mt-4 w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200 hover:border-blue-600 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300"><Activity size={14} /> {t('navbar.readOurStory', 'Read Our Story')}</a>
                    </div>
                  )}

                  {/* Contact Mega Menu */}
                  {link.dropdownKey === 'contact' && (
                    <div className="flex h-full">
                      <div className="w-1/2 p-5 bg-slate-50 border-r border-slate-100">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pl-1 border-b border-slate-200 pb-2">{t('nav.globalOffices', 'Global Headquarters')}</h4>
                        <div className="flex flex-col gap-6">
                          {(contactOffices as any[]).slice(0,2).map((office: any, i: number) => (
                               <div key={i}>
                                 <h5 className="font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
                                    {office.title.includes('Netherland') ? <NetherlandsFlag /> : <IndiaFlag />}
                                    <span className="truncate">{office.title.split('(')[0]}</span>
                                </h5>
                                <div className="text-[10px] text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200">
                                  {office.lines.map((line: string, idx: number) => (
                                    <span key={idx} className="block w-full">{line}</span>
                                  ))}
                               </div>
                               </div>
                            ))}
                        </div>
                      </div>

                      <div className="w-1/2 p-5 bg-white">
                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 pl-1 border-b border-slate-100 pb-2">{t('nav.departments', 'Departments')}</h4>
                        <div className="flex flex-col gap-3">
                          {(contactEmails as any[]).map((email: any, i: number) => {
                             let subject = "New Enquiry";
                             if (email.icon === 'briefcase') subject = "Job Application";
                             if (email.icon === 'shield') subject = "Partnership Proposal";
                             
                             const Icon = email.icon === 'briefcase' ? Briefcase : email.icon === 'shield' ? ShieldAlert : Mail;

                             return (
                               <a 
                                 key={i}
                                 href={`mailto:${email.email}?subject=${encodeURIComponent(subject)}`}
                                 className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-all group/email border border-transparent hover:border-slate-100"
                               >
                                  <div className={`mt-0.5 shrink-0 ${email.role.includes('Director') ? 'text-amber-500' : 'text-slate-400 group-hover/email:text-blue-500'}`}>
                                    <Icon size={16} />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-0.5">{email.role.split(' ')[0]}</span>
                                    <span className="block text-sm font-bold text-slate-900 break-words group-hover/email:text-blue-600 transition-colors">{email.email}</span>
                                  </div>
                               </a>
                             )
                           })}
                        </div>
                        <a href="#contact" onClick={(e) => handleScrollToSection(e, '#contact')} className="mt-4 w-full py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                          {t('navbar.contactUs', 'Contact Us')} <ChevronRight size={12} />
                        </a>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}
        </nav>

        {/* --- DESKTOP ACTIONS --- */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors ${
                activeLanguage === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('nl')}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors ${
                activeLanguage === 'nl'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Switch language to Dutch"
            >
              NL
            </button>
          </div>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-all hover:scale-105">
            <MessageCircle size={16} className="text-slate-500 hover:text-blue-600" />
            <span className="hidden xl:inline">{t('navbar.quickChat', 'Quick Chat')}</span>
          </a>
          
          <a href="#contact" onClick={(e) => handleScrollToSection(e, '#contact')} className="group relative px-6 py-2.5 rounded-lg font-bold text-sm bg-slate-900 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-blue-600">
            <span className="relative flex items-center gap-2">{t('navbar.bookConsultation', 'Book Consultation')} <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
          </a>
        </div>

        {/* --- MOBILE ACTIONS --- */}
        <div className="lg:hidden relative z-50 flex items-center gap-2">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors ${
                activeLanguage === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('nl')}
              className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors ${
                activeLanguage === 'nl'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Switch language to Dutch"
            >
              NL
            </button>
          </div>

          <button
            className="p-2 text-slate-900 transition-colors hover:bg-slate-100 rounded-lg"
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

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[95] bg-slate-900/20 backdrop-blur-[1px]"
          onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            if (Date.now() - menuOpenTimestampRef.current < 120) return;
            setIsMobileMenuOpen(false);
          }}
        >
          <div className="mobile-menu-panel absolute left-3 right-3 bottom-3 top-[72px] sm:top-[84px] bg-white/95 border border-slate-200 rounded-2xl shadow-2xl backdrop-blur-sm flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 space-y-2 px-4 pt-4 pb-6 overflow-y-auto overscroll-contain scroll-smooth">
            {(navLinks as any[]).map((link: any) => (
              <div key={link.name} className="border-b border-slate-100 last:border-0">
                {link.hasDropdown && link.dropdownKey !== 'about' && link.dropdownKey !== 'contact' ? (
                  <details className="group overflow-hidden">
                    <summary className="flex items-center justify-between py-3.5 cursor-pointer list-none text-base sm:text-lg font-bold text-slate-900 select-none">
                      <div className="flex items-center gap-2">{link.name}</div>
                      <ChevronDown size={18} className="text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <div className="pb-4 pl-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                      {link.dropdownKey === 'services' && (services as any[]).map((s: any) => (
                        <button key={s.id} onClick={() => { onOpenService(s); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-slate-50 transition-all text-left">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"><s.icon size={14} /></div>
                          <span className="text-sm font-semibold text-slate-700">{s.shortTitle}</span>
                        </button>
                      ))}
                      {link.dropdownKey === 'products' && (products as any[]).map((p: any) => (
                        <button key={p.id} onClick={() => { handleProductSelect(p); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-slate-50 transition-all text-left">
                           <img src={p.image || 'https://placehold.co/40x40'} className="w-8 h-8 rounded bg-slate-200 object-cover" alt="" onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40')} />
                           <span className="text-sm font-semibold text-slate-700">{p.name}</span>
                        </button>
                      ))}
                      {link.dropdownKey === 'gallery' && (
                        <>
                           <button onClick={() => { handleGallerySelect('demos'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-slate-50 transition-all text-left">
                               <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100"><PlayCircle size={14} /></div>
                                 <span className="text-sm font-semibold text-slate-700">{t('navbar.productDemos', 'Product Demos')}</span>
                           </button>
                           <button onClick={() => { handleGallerySelect('exhibitions'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-slate-50 transition-all text-left">
                               <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100"><Camera size={14} /></div>
                                 <span className="text-sm font-semibold text-slate-700">{t('navbar.exhibitions', 'Exhibitions')}</span>
                           </button>
                        </>
                      )}
                      {(link.dropdownKey === 'about' || link.dropdownKey === 'contact') && (
                          <div className="p-2 text-sm text-slate-500 italic">Tap main link to visit.</div>
                      )}
                    </div>
                  </details>
                ) : (
                  <a href={link.href} onClick={(e) => { handleScrollToSection(e, link.href); setIsMobileMenuOpen(false); }} className="flex items-center justify-between py-3.5 text-base sm:text-lg font-bold text-slate-900">{link.name}</a>
                )}
              </div>
            ))}
            </div>

            <div className="mt-auto border-t border-slate-100 p-4 bg-white/95">
              <div className="grid grid-cols-2 gap-3">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-700 rounded-xl font-bold text-xs gap-1 active:scale-95 transition-transform border border-green-100">
                  <MessageCircle size={20} />
                  <span>{t('navbar.whatsapp', 'WhatsApp')}</span>
                </a>
                <a href="#contact" onClick={(e) => { handleScrollToSection(e, '#contact'); setIsMobileMenuOpen(false); }} className="flex flex-col items-center justify-center p-3 bg-slate-900 text-white rounded-xl font-bold text-xs gap-1 active:scale-95 transition-transform shadow-lg shadow-slate-200">
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