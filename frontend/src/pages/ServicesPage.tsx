// src/pages/ServicesPage.tsx
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslatedServices } from '../hooks/useTranslatedData';
import { ROUTES, SERVICES_PAGE, buildWhatsAppUrl } from '../config';

// ============================================
// COMPACT ENTERPRISE TEXT BUTTON ENGINE
// ============================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children, className = '', ...props }) => {
  const baseStyle = "group inline-flex items-center justify-center gap-2 rounded-md font-bold text-sm transition-all duration-300 focus:ring-2 focus:ring-offset-2 select-none whitespace-nowrap";
  
  const variants = {
    primary: "bg-[#F25C19] text-white px-8 py-3.5 shadow-md hover:shadow-lg hover:brightness-110 focus:ring-[#F25C19]",
    secondary: "border-2 border-white bg-transparent text-white px-8 py-3 hover:bg-white hover:text-[#071B34] focus:ring-white"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ============================================
// CENTERED INVERTED-V DIAGONAL HERO MODULE
// ============================================
interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const { t } = useTranslation();

  const redirectToHome = () => {
    window.location.href = ROUTES.home;
  };

  return (
    <section 
      className="relative min-h-[48vh] lg:min-h-[52vh] flex items-center bg-[#071B34] text-white overflow-hidden pt-24 pb-20 lg:pt-20 lg:pb-24"
      style={{
        clipPath: 'polygon(0 100%, 50% 86%, 100% 100%, 100% 0, 0 0)'
      }}
    >
      {/* Cinematic Dark Charcoal Texture Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        <img
          src="/background/servicesbg.webp"
          alt="PCE BV Industrial Plant Refinery Infrastructure"
          className="w-full h-full object-cover opacity-25 filter brightness-[60%] contrast-[110%] scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071B34] via-[#071B34]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B34] via-[#071B34]/70 to-transparent z-10" />
      </div>

      {/* Hero Content Area - Fully Offset to Prevent Mobile Navbar Collision */}
      <div className="container relative z-20 mx-auto px-6 lg:px-12 max-w-7xl h-full flex flex-col justify-center mt-2 lg:mt-0">
        
        {/* Interactive Breadcrumb Component */}
        <div className="flex items-center gap-2 text-[11px] font-black tracking-[0.15em] text-white/50 mb-3 uppercase">
          <span onClick={redirectToHome} className="hover:text-[#F25C19] transition-colors cursor-pointer">Home</span>
          <span>&gt;</span>
          <span onClick={redirectToHome} className="hover:text-[#F25C19] transition-colors cursor-pointer">Services</span>
        </div>

        {/* Home Routing Main Heading Asset */}
        <h1 
          onClick={redirectToHome}
          className="text-4xl sm:text-5xl lg:text-[72px] font-black text-white mb-2 tracking-tight leading-none cursor-pointer hover:text-slate-200 transition-colors inline-block select-none"
        >
          {t('servicesSection.heroTitle', SERVICES_PAGE.hero.title)}
        </h1>
        
        <div className="w-16 h-[3px] bg-[#F25C19] mb-5" />
        
        <p className="text-xs sm:text-sm lg:text-base text-slate-200 mb-6 max-w-xl leading-relaxed font-normal">
          {t('servicesSection.subheading', SERVICES_PAGE.hero.subheading)}
        </p>

        {/* Corporate Trust Matrix Details */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-8 pb-4 border-b border-white/10 text-[9px] sm:text-[10px] font-black tracking-[0.15em] text-white/70 uppercase select-none">
          <span>EPC Expertise</span>
          <span className="text-white/20">|</span>
          <span>Global Delivery</span>
          <span className="text-white/20">|</span>
          <span>Quality Assured</span>
        </div>

        {/* Closely Aligned Action Button Set */}
        <div className="flex flex-wrap items-center gap-3">
          <a 
            href={buildWhatsAppUrl(SERVICES_PAGE.hero.whatsappPrompt)}
            target="_blank" 
            rel="noreferrer"
          >
            <Button variant="primary">
              Consult Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </a>

          <Button variant="secondary" onClick={onExploreClick}>
            Explore Services
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CORE SERVICES ORCHESTRATION ARCHITECTURE
// ============================================
export const ServicesPage: React.FC = () => {
  const rawServices = useTranslatedServices() || [];
  const mainExecutionZoneRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const extracted = Array.from(new Set(rawServices.map((s) => s.category)));
    return extracted.length > 0 ? extracted : SERVICES_PAGE.fallbackCategories;
  }, [rawServices]);

  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const currentCategoryServices = useMemo(() => {
    return rawServices.filter((s) => s.category === activeCategory);
  }, [rawServices, activeCategory]);

  const [activeServiceId, setActiveServiceId] = useState('');

  useEffect(() => {
    if (currentCategoryServices.length > 0) {
      setActiveServiceId(currentCategoryServices[0].id);
    }
  }, [currentCategoryServices]);

  const selectedService = useMemo(() => {
    return currentCategoryServices.find((s) => s.id === activeServiceId) || currentCategoryServices[0] || null;
  }, [currentCategoryServices, activeServiceId]);

  const scrollToAnchorZone = () => {
    if (mainExecutionZoneRef.current) {
      // Offset context tracking smoothly past sticky navbar thresholds
      const viewportYOffset = mainExecutionZoneRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: viewportYOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F1F5F9] text-[#071B34] antialiased min-h-screen font-sans selection:bg-[#1D4ED8] selection:text-white">
      
      {/* 1. GEOMETRIC DEEP ANGLED HERO COMPONENT */}
      <Hero onExploreClick={scrollToAnchorZone} />

      {/* 2. CORE STRATEGIC STATEMENT MODULE */}
      <section ref={mainExecutionZoneRef} className="bg-white pt-24 pb-16 border-b border-[#CBD5E1] px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-[44px] font-black text-[#071B34] mb-3 tracking-tight leading-none">
            End-to-End Engineering Solutions
          </h2>
          <div className="w-12 h-[3px] bg-[#F25C19] mx-auto mb-4" />
          <p className="text-base lg:text-lg text-[#334155] leading-relaxed max-w-2xl mx-auto font-medium">
            Delivering cross-discipline asset planning, risk governance, and detailed engineering execution structures.
          </p>
        </div>
      </section>

      {/* 3. TRACK SELECTOR TABS (ORANGE SYSTEM VS BLUE TRACKS) */}
      <div className="sticky top-20 z-40 bg-white border-b border-[#CBD5E1] shadow-sm">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => {
            const isSelected = cat === activeCategory;
            const isProjectTrack = cat.toLowerCase().includes('control') || cat.toLowerCase().includes('management');
            const isEngineeringTrack = cat.toLowerCase().includes('engine');

            let activeColorClass = 'bg-[#1D4ED8] text-white';
            if (isSelected) {
              if (isProjectTrack) activeColorClass = 'bg-[#1D4ED8] text-white shadow-md'; 
              if (isEngineeringTrack) activeColorClass = 'bg-[#F25C19] text-white shadow-md';
            }

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-md transition-all duration-300 outline-none ${
                  isSelected ? activeColorClass : 'bg-[#F1F5F9] text-[#334155] hover:text-[#071B34] hover:bg-[#CBD5E1]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CONTENT FRAMEWORK INTERACTIVE GRID DESKTOP/MOBILE STRUCTURE */}
      <main className="py-12 px-4 lg:px-12 max-w-7xl mx-auto container">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-8 items-start">
          
          {/* DESKTOP MATRIX CAPABILITIES DIRECTORY */}
          <div className="space-y-3 lg:sticky lg:top-44 hidden lg:block">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#475569] block mb-1 px-1">
              Capabilities Directory
            </span>
            {currentCategoryServices.map((service) => {
              const isSelected = service.id === activeServiceId;
              return (
                <div 
                  key={service.id}
                  className={`bg-white border rounded-md transition-all duration-300 overflow-hidden ${
                    isSelected ? 'border-[#1D4ED8] shadow-sm' : 'border-[#CBD5E1] hover:border-[#1D4ED8]'
                  }`}
                >
                  <button
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-4 flex items-center justify-between font-bold text-xs uppercase tracking-wide transition-colors ${
                      isSelected ? 'text-[#1D4ED8] border-l-[4px] border-l-[#1D4ED8]' : 'text-[#071B34]'
                    }`}
                  >
                    <span className="pr-4">{service.title}</span>
                    <span className="text-base font-light text-[#475569]">{isSelected ? '−' : '+'}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* DESKTOP SPECIFICATIONS ACTIVE DATASHEET WORKSPACE VIEWPORT */}
          <div className="hidden lg:block">
            {selectedService ? (
              <div className="bg-white border border-[#CBD5E1] rounded-md p-10 shadow-sm space-y-8">
                <div>
                  <span className="text-xs font-black tracking-[0.2em] text-[#1D4ED8] uppercase block mb-1">
                    {selectedService.category}
                  </span>
                  <h3 className="text-2xl lg:text-[38px] font-black text-[#071B34] tracking-tight mb-4 leading-tight">
                    {selectedService.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[#334155] leading-relaxed font-medium">
                    {selectedService.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#CBD5E1]">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#071B34] mb-3 pb-1 border-b border-slate-200">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedService.features?.map((feat, i) => (
                        <li key={i} className="flex items-start text-xs lg:text-sm text-[#334155] font-semibold">
                          <span className="text-[#1D4ED8] mr-2.5 font-bold">•</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#071B34] mb-3 pb-1 border-b border-slate-200">
                      Expected Handovers
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedService.details?.technicalSpecs?.map((spec, i) => (
                        <li key={i} className="flex items-start text-xs lg:text-sm text-[#334155] font-semibold">
                          <span className="text-[#1D4ED8] mr-2.5 font-bold">•</span>
                          {spec}
                        </li>
                      )) || (
                        <li className="flex items-start text-xs lg:text-sm text-[#334155] font-semibold">
                          <span className="text-[#1D4ED8] mr-2.5 font-bold">•</span>Standard Project Handover Documentation Dossier
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#CBD5E1] flex items-center justify-end">
                  <a href={`https://wa.me/+31611596812?text=Hi%2C%20I'm%20interested%20in%20PCE%20BV%20services%20for%20${encodeURIComponent(selectedService.title)}.`} target="_blank" rel="noreferrer">
                    <button className="group inline-flex items-center justify-center gap-2 rounded-md bg-[#F25C19] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-sm hover:brightness-110">
                      Talk to Expert
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#CBD5E1] rounded-md p-12 text-center text-[#475569] font-medium text-sm">
                Select configuration metrics from the directory parameters to execute inspection.
              </div>
            )}
          </div>

          {/* ADAPTIVE MOBILE DISCLOSURE ACCORDIONS MODULE */}
          <div className="lg:hidden space-y-4 w-full">
            {currentCategoryServices.map((service) => {
              const isItemExpanded = service.id === activeServiceId;
              return (
                <div key={service.id} className="bg-white border border-[#CBD5E1] rounded-md overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setActiveServiceId(isItemExpanded ? '' : service.id)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-sm uppercase tracking-wide text-[#071B34]"
                  >
                    <span>{service.title}</span>
                    <span className="text-xs font-black text-slate-400">{isItemExpanded ? '▲' : '▼'}</span>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isItemExpanded ? 'max-h-[1200px] border-t border-[#CBD5E1] p-5 space-y-6' : 'max-h-0'}`}>
                    <div>
                      <p className="text-sm text-[#334155] leading-relaxed mb-4 font-semibold">{service.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="text-xs font-black uppercase tracking-wider text-[#071B34]">Track Capabilities</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {service.features?.map((f, i) => (
                          <span key={i} className="bg-[#F1F5F9] text-[#071B34] border border-[#CBD5E1] text-xs px-2.5 py-1 rounded-md font-bold">{f}</span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <a 
                        href={`https://wa.me/+31611596812?text=Hi%2C%20I'm%20interested%20in%20PCE%20BV%20mobile%20services%20for%20${encodeURIComponent(service.title)}.`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full text-center block bg-[#F25C19] text-white py-3.5 text-sm font-bold rounded-md shadow-md"
                      >
                        Talk to Expert
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ServicesPage;