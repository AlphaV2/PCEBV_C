import React, { useState, useEffect } from 'react';

import {

  Menu, X, ChevronRight, ChevronDown,

  MessageCircle, Box, Shield, Globe,

  Phone, Mail, Zap, Target, Sliders,

  Server, HardHat, Activity, Image as ImageIcon, Camera, PlayCircle

} from 'lucide-react';

// Assuming these are defined and imported from the central constants file

import {

    NAV_LINKS, SERVICES, PRODUCTS, ABOUT_SECTION_CONTENT, CONTACT_SECTION_DETAILS,

    WHATSAPP_NUMBER, WHATSAPP_LINK

} from '../../constants';

import { Product } from '../../types';

import {Service } from '../../types';
const IndiaFlag = () => <span className="w-6 h-4 flex items-center justify-center text-lg shadow-sm mr-2" aria-label="India Flag">🇮🇳</span>;
const NetherlandsFlag = () => <span className="w-6 h-4 flex items-center justify-center text-lg shadow-sm mr-2" aria-label="Netherlands Flag">🇳🇱</span>;
// Use imported constants directly

const MOCK_NAV_LINKS = NAV_LINKS as any;

const MOCK_SERVICES = SERVICES as any;

const MOCK_PRODUCTS = PRODUCTS as any;

const MOCK_ABOUT_SECTION_CONTENT = ABOUT_SECTION_CONTENT as any;

const MOCK_CONTACT_SECTION_DETAILS = CONTACT_SECTION_DETAILS as any;



interface NavbarProps {

  onOpenService: (service: Service) => void;

  onOpenProduct: (product: Product) => void;

  // 🚨 NEW PROP ADDED HERE

  onOpenGallery: (tab: 'demos' | 'exhibitions') => void;

}



const Navbar: React.FC<NavbarProps> = ({ onOpenService, onOpenProduct, onOpenGallery }) => {

  const [isScrolled, setIsScrolled] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



  useEffect(() => {

    const handleScroll = () => {

      try {

        setIsScrolled(window.scrollY > 20);

      } catch (e) {}

    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);



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



  const handleProductSelect = (product: any) => {

      setIsMobileMenuOpen(false);

      onOpenProduct(product);

  };



  // 🚨 NEW GALLERY HANDLER

  const handleGallerySelect = (tab: 'demos' | 'exhibitions') => {

      setIsMobileMenuOpen(false);

      onOpenGallery(tab);

  };



  return (

    <header

      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${

        isScrolled

          ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-md'

          : 'bg-transparent border-transparent py-5'

      }`}

    >

      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">

       

        {/* Logo */}

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

            <div className="fallback-icon hidden w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">

              <Activity size={24} />

            </div>

          </div>



        {/* --- DESKTOP NAV --- */}

        <nav className="hidden lg:flex items-center gap-8">

          {MOCK_NAV_LINKS.map((link: any) => (

            <div key={link.name} className="relative group">

              <a

                href={link.href}

                onClick={(e) => link.dropdownKey === 'gallery' ? e.preventDefault() : handleScrollToSection(e, link.href)}

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

                    link.dropdownKey === 'contact' ? 'w-[450px]' :

                    link.dropdownKey === 'gallery' ? 'w-[280px]' : // 🚨 Width for Gallery

                    'w-[250px]'

                }`}>

                 

                  {/* Services Mega Menu */}

                  {link.dropdownKey === 'services' && (

                    <div className="flex flex-col divide-y divide-slate-100">

                      {MOCK_SERVICES.map((service: any) => {

                        const Icon = service.icon;

                        return (

                          <button key={service.id} onClick={() => onOpenService(service)} className="flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 group/item transition-all duration-200 first:rounded-t-xl last:rounded-b-xl relative overflow-hidden">

                            <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>

                            <div className="p-2 bg-white text-slate-600 rounded-lg border border-slate-200 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 group-hover/item:border-blue-100 transition-all shadow-sm shrink-0"><Icon size={16} /></div>

                            <div>

                               <span className="block text-xs font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors mb-0.5">{service.shortTitle}</span>

                               <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider group-hover/item:text-slate-700 flex items-center gap-1">Explore Solutions <ChevronRight size={10} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" /></span>

                            </div>

                          </button>

                        );

                      })}

                    </div>

                  )}



                  {/* Products Mega Menu */}

                  {link.dropdownKey === 'products' && (

                      <div className="p-4">

                          <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-3 pl-1 border-b border-slate-100 pb-2">Featured Inventory</h4>

                          <div className="flex flex-col gap-2 mb-4">

                            {MOCK_PRODUCTS.slice(0, 3).map((product: any) => (

                               <div key={product.id} onClick={() => handleProductSelect(product)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/prod border border-transparent hover:border-slate-100">

                                 <img src={product.image || 'https://placehold.co/40x40'} alt={product.name} className="w-10 h-10 rounded-md object-cover shadow-sm border border-slate-200" onError={(e) => (e.currentTarget.src = 'https://placehold.co/40x40')} />

                                 <div>

                                    <div className="text-xs font-bold text-slate-900 group-hover/prod:text-blue-600 transition-colors">{product.name}</div>

                                    <div className="text-[9px] text-slate-600 truncate max-w-[120px]">{product.tagline}</div>

                                 </div>

                               </div>

                            ))}

                          </div>

                          <a href="#products" onClick={(e) => handleScrollToSection(e, '#products')} className="w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200 hover:border-blue-600 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300"><Box size={14} /> Full Inventory</a>

                      </div>

                  )}



                  {/* 🚨 NEW GALLERY MEGA MENU 🚨 */}

                  {link.dropdownKey === 'gallery' && (

                    <div className="p-2">

                        <button onClick={() => handleGallerySelect('demos')} className="flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg w-full group/item transition-colors">

                           <div className="p-2 bg-white border border-slate-200 rounded text-blue-600 group-hover/item:bg-blue-50"><PlayCircle size={16} /></div>

                           <div><span className="block text-xs font-bold text-slate-900 group-hover/item:text-blue-600">Product Demos</span><span className="block text-[10px] text-slate-500">Watch Videos</span></div>

                        </button>

                        <button onClick={() => handleGallerySelect('exhibitions')} className="flex items-center gap-3 p-3 text-left hover:bg-slate-50 rounded-lg w-full group/item transition-colors">

                           <div className="p-2 bg-white border border-slate-200 rounded text-purple-600 group-hover/item:bg-purple-50"><Camera size={16} /></div>

                           <div><span className="block text-xs font-bold text-slate-900 group-hover/item:text-purple-600">Exhibitions</span><span className="block text-[10px] text-slate-500">Event Photos</span></div>

                        </button>

                    </div>

                  )}



                  {/* About Mega Menu */}

                  {link.dropdownKey === 'about' && (

                    <div className="p-5">

                        <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">Mission & Vision</h4>

                        <div className="space-y-3">

                          {MOCK_ABOUT_SECTION_CONTENT.slice(0, 3).map((para: string, idx: number) => (

                               <p key={idx} className="text-[10px] text-slate-800 leading-relaxed font-medium">{para}</p>

                           ))}

                           <div className="pt-2 border-t border-slate-100 flex items-center gap-2">

                             <Shield size={12} className="text-blue-600" />

                             <p className="text-[10px] font-bold text-slate-900 italic">"{MOCK_ABOUT_SECTION_CONTENT[3]}"</p>

                           </div>

                        </div>

                        <a href="#about" onClick={(e) => handleScrollToSection(e, '#about')} className="mt-4 w-full py-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200 hover:border-blue-600 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300"><Target size={14} /> Read Our Story</a>

                    </div>

                  )}



                  {/* Contact Mega Menu */}

                  {link.dropdownKey === 'contact' && (

                    <div className="p-4">

                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-center border-b border-slate-50 pb-2">Our Locations</h4>

                      <div className="grid grid-cols-2 gap-6">

                        {/* ... (Existing Contact Logic) ... */}

                         {MOCK_CONTACT_SECTION_DETAILS.slice(0,2).map((office: any, i: number) => (

                             <div key={i}>

                               <h5 className="font-bold text-slate-900 text-xs mb-1 flex items-center">
                                  {office.title.includes('Netherland') ? <NetherlandsFlag /> : <IndiaFlag />}
                                  {office.title}
                              </h5>
                              {/* Address */}
                              <div className="text-[11px] text-slate-800 border-l-2 border-blue-100 pl-2 leading-relaxed">
                              {office.lines.map((line: string, idx: number) => (
                                <span key={idx} className="block">{line}</span>
                              ))}
                             </div>
                             </div>

                         ))}

                      </div>

                      <a href="#contact" className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md" onClick={(e) => handleScrollToSection(e, '#contact')}><MessageCircle size={12} /> Send a Message</a>

                    </div>

                  )}



                </div>

              )}

            </div>

          ))}

        </nav>

        {/* --- ACTIONS --- */}

        <div className="hidden lg:flex items-center gap-6">

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-all hover:scale-105">

            <MessageCircle size={16} className="text-slate-500 hover:text-blue-600" />

            <span className="hidden xl:inline">Quick Chat</span>

          </a>

         

          <a href="#contact" onClick={(e) => handleScrollToSection(e, '#contact')} className="group relative px-6 py-2.5 rounded-lg font-bold text-sm bg-slate-900 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-blue-600">

            <span className="relative flex items-center gap-2">Request Demo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>

          </a>

        </div>



        {/* --- MOBILE TOGGLE --- */}

        <button className="lg:hidden p-2 text-slate-900 transition-colors relative z-50 hover:bg-slate-100 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

          {isMobileMenuOpen ? <X size={28} className="text-slate-900" /> : <Menu size={28} />}

        </button>

      </div>



      {/* --- MOBILE MENU --- */}

      {isMobileMenuOpen && (

        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-24 px-6 flex flex-col gap-4 animate-fade-in overflow-y-auto text-slate-900">

          {MOCK_NAV_LINKS.map((link: any) => (

            <div key={link.name} className="border-b border-slate-100 pb-2">

               <a href={link.href} onClick={(e) => { if (!link.hasDropdown) { handleScrollToSection(e, link.href); } }} className="text-xl font-bold text-slate-900 flex justify-between items-center py-2">

                {link.name}

                {link.hasDropdown && <ChevronDown size={16} className="text-slate-400" />}

              </a>

             

              {/* Mobile Services */}

              {link.dropdownKey === 'services' && (

                 <div className="pl-4 mt-2 space-y-3 border-l-2 border-slate-100">

                    {MOCK_SERVICES.map((s: any) => (

                      <button key={s.id} onClick={() => { onOpenService(s.id); setIsMobileMenuOpen(false); }} className="block text-sm text-slate-600 hover:text-blue-600 py-1 w-full text-left transition-colors font-medium">{s.shortTitle}</button>

                    ))}

                 </div>

              )}



              {/* Mobile Products */}

              {link.dropdownKey === 'products' && (

                 <div className="pl-4 mt-2 space-y-3 border-l-2 border-slate-100">

                    {MOCK_PRODUCTS.map((p: any) => (

                      <button key={p.id} onClick={() => handleProductSelect(p)} className="block text-sm text-slate-600 hover:text-blue-600 py-1 w-full text-left transition-colors font-medium">{p.name}</button>

                    ))}

                 </div>

              )}



              {/* 🚨 NEW MOBILE GALLERY 🚨 */}

              {link.dropdownKey === 'gallery' && (

                 <div className="pl-4 mt-2 space-y-3 border-l-2 border-slate-100">

                    <button onClick={() => handleGallerySelect('demos')} className="block text-sm text-slate-600 hover:text-blue-600 py-1 w-full text-left transition-colors font-medium">Product Demos</button>

                    <button onClick={() => handleGallerySelect('exhibitions')} className="block text-sm text-slate-600 hover:text-blue-600 py-1 w-full text-left transition-colors font-medium">Exhibitions</button>

                 </div>

              )}



            </div>

          ))}

         

          <div className="mt-8 flex flex-col gap-4 pb-8">

            <a href="#contact" onClick={(e) => handleScrollToSection(e, '#contact')} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-center shadow-lg transition-colors">Request Demo</a>

            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-slate-100 text-slate-900 border border-slate-200 rounded-xl font-semibold text-center flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"><MessageCircle size={18} /> WhatsApp Chat</a>

          </div>

        </div>

      )}

    </header>

  );

};



export default Navbar;