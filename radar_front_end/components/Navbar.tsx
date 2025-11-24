import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronDown, MessageCircle, Box, Shield, Globe, Phone, Mail, Zap, Target, Sliders, Server, HardHat } from 'lucide-react';
// Assuming these are defined and imported from the central constants file
import { NAV_LINKS, SERVICES, PRODUCTS, ABOUT_SECTION_CONTENT, CONTACT_SECTION_DETAILS } from '../constants'; 


// --- START MOCK DEFINITIONS (REQUIRED for component structure) ---
// NOTE: Ensure your constants file exports these if they aren't auto-resolved.

const IndiaFlag = () => <span className="w-6 h-4 flex items-center justify-center text-lg shadow-sm" aria-label="India Flag">🇮🇳</span>;
const NetherlandsFlag = () => <span className="w-6 h-4 flex items-center justify-center text-lg shadow-sm" aria-label="Netherlands Flag">🇳🇱</span>;

// Use imported constants directly, mapping to local variables to satisfy TS/React expectations
const MOCK_NAV_LINKS = NAV_LINKS as any; 
const MOCK_SERVICES = SERVICES as any;
const MOCK_PRODUCTS = PRODUCTS as any;
const MOCK_ABOUT_SECTION_CONTENT = ABOUT_SECTION_CONTENT as any;
const MOCK_CONTACT_SECTION_DETAILS = CONTACT_SECTION_DETAILS as any;

// --- END MOCK DEFINITIONS ---


interface NavbarProps {
  onOpenService: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenService }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 20);
      } catch (e) {
        // Fallback
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState({}, '', window.location.pathname);
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Scroll error:", err);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-md' // Slightly higher opacity when scrolled
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
        
        {/* Logo (Fixed Size & Responsive Scroll) */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            
            <img 
              src="/company_logo.jpg" 
              alt="Radar Snipers Logo" 
              className={`
                w-auto object-contain rounded transition-all duration-300
                ${isScrolled ? 'h-10 sm:h-12 lg:h-14' : 'h-16 sm:h-18 lg:h-20'} 
              `}
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.querySelector('.fallback-icon')!.classList.remove('hidden');
              }}
            />
            
            {/* Fallback Icon (Hidden by default unless image fails) */}
            <div className="fallback-icon hidden w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                 <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <span className="text-xl font-extrabold tracking-tight text-slate-900 hidden sm:block">
              
            </span>
          </div>

        {/* --- DESKTOP NAV --- */}
        <nav className="hidden lg:flex items-center gap-8">
          {MOCK_NAV_LINKS.map((link: any) => (
            <div key={link.name} className="relative group">
              <a 
                href={link.href} 
                onClick={(e) => {
                  if (link.href === '#hero') {
                    handleScrollToTop(e);
                  }
                }}
                className="text-sm font-medium text-slate-700 transition-all duration-300 relative flex items-center gap-1 py-4 tracking-wide group-hover:-translate-y-0.5 hover:text-blue-600"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={12} className="group-hover:rotate-180 transition-transform opacity-80" />}
                
                {/* Hover Underline */}
                <span className="absolute bottom-2 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* --- MEGA MENUS (assuming full data from constants) --- */}
              {link.hasDropdown && (
                <div className={`absolute top-full -left-4 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-[60] ${link.dropdownKey === 'about' ? 'w-[600px]' : link.dropdownKey === 'contact' ? 'w-[500px]' : 'w-[360px]'}`}>
                  
                  {/* Services Mega Menu */}
                  {link.dropdownKey === 'services' && (
                    <div className="flex flex-col divide-y divide-slate-100">
                      {MOCK_SERVICES.map((service: any) => {
                        const Icon = service.icon;
                        return (
                          <button 
                            key={service.id}
                            onClick={() => onOpenService(service.id)}
                            className="flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-50 group/item transition-all duration-200 first:rounded-t-xl last:rounded-b-xl relative overflow-hidden"
                          >
                            <div className="absolute left-0 top-0 w-1 h-full bg-blue-600 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300"></div>
                            <div className="p-2.5 bg-white text-slate-600 rounded-lg border border-slate-200 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 group-hover/item:border-blue-100 transition-all shadow-sm shrink-0">
                              <Icon size={18} />
                            </div>
                            <div>
                               <span className="block text-sm font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors mb-0.5">{service.shortTitle}</span>
                               <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider group-hover/item:text-slate-700 flex items-center gap-1">
                                  Explore Solutions <ChevronRight size={10} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                               </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Products Mega Menu */}
                  {link.dropdownKey === 'products' && (
                      <div className="p-5">
                         <h4 className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4 pl-1 border-b border-slate-100 pb-2">Featured Inventory</h4>
                         <div className="flex flex-col gap-3 mb-5">
                            {MOCK_PRODUCTS.slice(0, 3).map((product: any) => (
                               <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group/prod border border-transparent hover:border-slate-100">
                                 <img src={product.image || 'https://placehold.co/50x50/3b82f6/ffffff?text=Product'} alt={product.name} className="w-12 h-12 rounded-md object-cover shadow-sm border border-slate-200" onError={(e) => (e.currentTarget.src = 'https://placehold.co/50x50/3b82f6/ffffff?text=Product')} />
                                 <div>
                                   <div className="text-sm font-bold text-slate-900 group-hover/prod:text-blue-600 transition-colors">{product.name}</div>
                                   <div className="text-[10px] text-slate-600 truncate max-w-[150px]">{product.tagline}</div>
                                 </div>
                               </div>
                            ))}
                         </div>
                         <a 
                           href="#products"
                           className="w-full py-3 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-800 border border-slate-200 hover:border-blue-600 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
                         >
                           <Box size={14} />
                           Explore Full Inventory
                         </a>
                      </div>
                  )}

                  {/* About Mega Menu */}
                  {link.dropdownKey === 'about' && (
                    <div className="p-6">
                       <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Mission & Vision</h4>
                       <div className="space-y-4">
                          {MOCK_ABOUT_SECTION_CONTENT.slice(0, 3).map((para: string, idx: number) => (
                             <p key={idx} className="text-xs text-slate-800 leading-relaxed font-medium">
                                {para}
                             </p>
                          ))}
                          <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                            <Shield size={14} className="text-blue-600" />
                            <p className="text-xs font-bold text-slate-900 italic">
                                "{MOCK_ABOUT_SECTION_CONTENT[5]}"
                            </p>
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Contact Mega Menu - Replicating the user's detailed structure */}
                  {link.dropdownKey === 'contact' && (
                    <div className="p-6">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 text-center border-b border-slate-50 pb-2">Our Locations</h4>
                      <div className="grid grid-cols-2 gap-6">
                        {/* India Office */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-6 h-4 rounded-sm shadow-sm" />
                            <h5 className="font-bold text-slate-900 text-sm">Registered Office</h5>
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed pl-1 border-l-2 border-blue-100">
                            <p className="font-semibold text-blue-700">Radar Snipers™</p>
                            <p>22, Mezzanine Floor,</p>
                            <p>Mona Shopping Centre,</p>
                            <p>Near Navrang Cinema, JP Road,</p>
                            <p>Andheri West, Mumbai - 400 058.</p>
                            <p className="font-semibold">INDIA</p>
                          </div>
                          <div className="pt-2 space-y-1">
                            <a href="tel:+919004112868" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition-colors">
                               <Phone size={12} className="text-blue-600" /> +91 90041 12868
                            </a>
                            <a href="mailto:info@radarsnipers.com" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition-colors">
                               <Mail size={12} className="text-blue-600" /> info@radarsnipers.com
                            </a>
                          </div>
                        </div>

                        {/* Netherlands Office */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg" alt="Netherlands" className="w-6 h-4 rounded-sm shadow-sm" />
                            <h5 className="font-bold text-slate-900 text-sm">Netherlands Branch</h5>
                          </div>
                          <div className="text-xs text-slate-600 leading-relaxed pl-1 border-l-2 border-blue-100">
                            <p>Ereprijsweg 14</p>
                            <p>2565 AJ</p>
                            <p>Den Haag</p>
                            <p className="font-semibold">The Netherlands</p>
                          </div>
                          <div className="pt-2">
                            <a href="tel:0031611596812" className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition-colors">
                               <Phone size={12} className="text-blue-600" /> 0031-611596812
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* Added CTA button for consistency and quick action */}
                      <a 
                        href="#contact"
                        className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                        onClick={() => setIsMobileMenuOpen(false)} // Scroll to contact section when clicked
                      >
                        <MessageCircle size={14} /> Send a Message
                      </a>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}
        </nav>

        {/* --- ACTIONS --- */}
        <div className="hidden lg:flex items-center gap-6">
          <a 
            href="https://wa.me/?text=Hi,%20I'd%20like%20a%20quick%20chat%20about%20Radar%20Sniper%20solutions." 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-all hover:scale-105"
          >
            <MessageCircle size={16} className="text-slate-500 hover:text-blue-600" />
            <span className="hidden xl:inline">Quick Chat</span>
          </a>
          
          <a href="#contact" className="group relative px-6 py-2.5 rounded-lg font-bold text-sm bg-slate-900 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 hover:bg-blue-600"> 
            <span className="relative flex items-center gap-2">
              Request Demo
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* --- MOBILE TOGGLE --- */}
        <button 
          className="lg:hidden p-2 text-slate-900 transition-colors relative z-50 hover:bg-slate-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={28} className="text-slate-900" /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU (White Theme) --- */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-40 pt-24 px-6 flex flex-col gap-4 animate-fade-in overflow-y-auto text-slate-900">
          {MOCK_NAV_LINKS.map((link: any) => (
            <div key={link.name} className="border-b border-slate-100 pb-2">
               <a 
                href={link.href} 
                onClick={(e) => {
                  if (link.href === '#hero') {
                    handleScrollToTop(e);
                  } else {
                    !link.hasDropdown && setIsMobileMenuOpen(false);
                  }
                }}
                className="text-xl font-bold text-slate-900 flex justify-between items-center py-2"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={16} className="text-slate-400" />}
              </a>
              
              {/* Mobile Submenu: Services */}
              {link.dropdownKey === 'services' && (
                 <div className="pl-4 mt-2 space-y-3 border-l-2 border-slate-100">
                    {MOCK_SERVICES.map((s: any) => (
                      <button key={s.id} onClick={() => { onOpenService(s.id); setIsMobileMenuOpen(false); }} className="block text-sm text-slate-600 hover:text-blue-600 py-1 w-full text-left transition-colors font-medium">
                        {s.shortTitle}
                      </button>
                    ))}
                 </div>
              )}

              {/* Mobile Submenu: Products */}
              {link.dropdownKey === 'products' && (
                 <div className="pl-4 mt-2 space-y-3 border-l-2 border-slate-100">
                    {MOCK_PRODUCTS.map((p: any) => (
                      <a href="#products" key={p.id} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-slate-600 hover:text-blue-600 py-1 transition-colors font-medium">
                        {p.name}
                      </a>
                    ))}
                 </div>
              )}
            </div>
          ))}
          
          <div className="mt-8 flex flex-col gap-4 pb-8">
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-center shadow-lg"
            >
              Request Demo
            </a>
            <a 
              href="https://wa.me/?text=Hi,%20I'd%20like%20a%20quick%20chat%20about%20Radar%20Sniper%20solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-slate-100 text-slate-900 border border-slate-200 rounded-xl font-semibold text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;