import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { WHATSAPP_LINK } from '../../constants';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { hero } = HOMEPAGE_CONFIG;
  const bgImages = hero.background_images as { src: string; alt: string; focalPoint?: string }[];
  
  // Carousel State
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    if (!bgImages || bgImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [bgImages]);

  return (
    <section 
      id="hero" 
      className="relative w-full overflow-hidden bg-[#F8F9FA] flex flex-col lg:flex-row"
      style={{ 
        paddingTop: 'var(--hero-offset, calc(92px + 1.5rem))', 
        minHeight: '90vh' 
      }}
    >
      {/* --- BACKGROUND DECORATIONS --- */}
      <div 
        className="absolute top-[20%] left-[35%] w-32 h-32 opacity-20 pointer-events-none hidden lg:block animate-pulse"
        style={{ backgroundImage: 'radial-gradient(#071B34 2px, transparent 2px)', backgroundSize: '16px 16px', animationDuration: '4s' }}
      />
      <div 
        className="absolute bottom-10 left-10 w-40 h-40 opacity-20 pointer-events-none hidden lg:block animate-pulse"
        style={{ backgroundImage: 'radial-gradient(#071B34 2px, transparent 2px)', backgroundSize: '16px 16px', animationDuration: '5s' }}
      />

      {/* --- MOBILE CAROUSEL (Hidden on Desktop) --- */}
      <div className="w-full h-[40vh] lg:hidden block relative z-0 overflow-hidden">
        {bgImages.map((img, index) => (
          <img 
            key={img.src}
            src={img.src} 
            alt={img.alt || 'Industrial Project'} 
            loading={index === 0 ? "eager" : "lazy"}
            {...(index === 0 ? { fetchPriority: "high" } : {})}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentMediaIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ objectPosition: img.focalPoint || 'center' }}
          />
        ))}
        {/* Dark overlay for better blend into the white section below */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8F9FA] to-transparent z-10" />
      </div>

      {/* --- MAIN CONTENT & CONTAINERS --- */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-20 relative z-10 flex-grow flex items-center py-10 lg:py-0 w-full">
        <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-center relative">
          
          <h1 
            className="heading-font font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] uppercase tracking-tight mb-6 flex flex-col gap-1 lg:gap-2 animate-[slideInUp_0.8s_ease-out]" 
            style={{ lineHeight: 1.1 }}
          >
            <span className="block text-[#071B34]">{t('hero.titleLine1', hero.h1.split('\n')[0])}</span>
            <span className="block text-[var(--accent,#F25C19)]">{t('hero.titleHighlight', hero.h1.split('\n')[1] ?? 'for Complex EPC Projects')}</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4A5568] font-medium mb-10 max-w-[480px] leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_both]">
            {t('hero.subtitle', hero.h2)}
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-[fadeIn_1s_ease-out_0.6s_both]">
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noreferrer" 
              className="group inline-flex items-center gap-2 rounded-md bg-[var(--accent,#F25C19)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]"
            >
              {t('hero.cta_primary', 'Consult Us')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            <a 
              href="#services" 
              className="group inline-flex items-center gap-2 rounded-md border-2 border-[#071B34] bg-transparent px-8 py-3 text-sm font-semibold text-[#071B34] hover:bg-[#071B34] hover:text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-[#071B34]"
            >
              {t('hero.cta_secondary', 'Explore Services')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>

          <div className="absolute -bottom-32 -left-10 w-96 h-96 opacity-[0.03] pointer-events-none mix-blend-multiply hidden lg:block z-[-1]">
             <div className="w-full h-full bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/blueprint.png)' }} />
          </div>
        </div>
      </div>

      {/* --- DESKTOP ANGLED CAROUSEL (Right Side) --- */}
      <div 
        className="hidden lg:block absolute top-0 right-0 w-[58%] h-full z-0 overflow-hidden pointer-events-none bg-[#071B34]"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} 
      >
        {bgImages.map((img, index) => (
          <img 
            key={img.src}
            src={img.src} 
            alt={img.alt || 'Industrial Project'} 
            decoding="async" 
            loading={index === 0 ? "eager" : "lazy"}
            {...(index === 0 ? { fetchPriority: "high" } : {})}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-auto transition-all duration-[1200ms] ease-in-out ${
              index === currentMediaIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{ 
              objectPosition: img.focalPoint || 'center',
              filter: 'contrast(1.05) saturate(1.1) brightness(0.90)'
            }} 
          />
        ))}
        {/* Inner shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
      </div>

      {/* --- REFINED SNOWY WHITE COMPACT FEATURES BANNER --- */}
          <div className="hidden lg:flex absolute bottom-6 xl:bottom-10 right-0 z-20 w-[56%] xl:w-[50%] bg-white/95 backdrop-blur-md text-[#071B34] rounded-l-xl shadow-[-10px_15px_40px_rgba(0,0,0,0.08)] py-5 px-8 xl:px-12 flex-row items-center justify-between border-y border-l border-gray-100 animate-[slideInRight_1s_ease-out]">
        
        {/* Feature 1 */}
        <div className="flex items-center gap-3 group cursor-default">
          <div className="text-[var(--accent,#F25C19)] bg-[#F25C19]/10 p-2 rounded-full transition-transform group-hover:scale-110 duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <span className="text-xs font-extrabold tracking-widest uppercase leading-tight">
            {t('hero.feature1', 'Engineering')}
            <br />
            {t('hero.feature1Line2', 'Excellence')}
          </span>
        </div>

        {/* Crisp subtle divider */}
        <div className="w-[1px] h-10 bg-gray-200"></div>

        {/* Feature 2 */}
        <div className="flex items-center gap-3 group cursor-default">
          <div className="text-[var(--accent,#F25C19)] bg-[#F25C19]/10 p-2 rounded-full transition-transform group-hover:scale-110 duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span className="text-xs font-extrabold tracking-widest uppercase leading-tight">
            {t('hero.feature2', 'Disciplined')}
            <br />
            {t('hero.feature2Line2', 'Execution')}
          </span>
        </div>

        {/* Crisp subtle divider */}
        <div className="w-[1px] h-10 bg-gray-200"></div>

        {/* Feature 3 */}
        <div className="flex items-center gap-3 group cursor-default">
          <div className="text-[var(--accent,#F25C19)] bg-[#F25C19]/10 p-2 rounded-full transition-transform group-hover:scale-110 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
          </div>
          <span className="text-xs font-extrabold tracking-widest uppercase leading-tight">
            {t('hero.feature3', 'Global')}
            <br />
            {t('hero.feature3Line2', 'Perspective')}
          </span>
        </div>

      </div>
    </section>
  );
};

export default Hero;