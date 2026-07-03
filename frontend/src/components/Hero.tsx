import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { COMPANY, ROUTES, buildWhatsAppUrl } from '../config';

type HeroImage = {
  src: string;
  alt: string;
  mobilePosition?: string;
  tabletPosition?: string;
  desktopPosition?: string;
  focalPoint?: string;
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { hero } = HOMEPAGE_CONFIG;
  const bgImages = hero.background_images as HeroImage[];
  const whatsappLink = buildWhatsAppUrl(t('whatsapp.message', COMPANY.whatsappMessage));
  
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
      className="relative w-full overflow-hidden bg-[#F8F9FA] flex flex-col lg:flex-row min-h-[82dvh] md:min-h-[80dvh] lg:min-h-[85vh]"
      style={{ 
        paddingTop: 'var(--hero-offset, calc(92px + 1.5rem))',
      }}
    >
      <div className="absolute inset-0 lg:hidden overflow-hidden">
        <div className="absolute inset-0 md:hidden overflow-hidden">
          {bgImages.map((img, index) => (
            <img
              key={`${img.src}-mobile`}
              src={img.src}
              alt={img.alt || 'Industrial Project'}
              loading={index === 0 ? 'eager' : 'lazy'}
              {...(index === 0 ? { fetchPriority: 'high' } : {})}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectPosition: img.mobilePosition || '68% center' }}
            />
          ))}
        </div>

        <div className="absolute inset-0 hidden md:block lg:hidden overflow-hidden">
          {bgImages.map((img, index) => (
            <img
              key={`${img.src}-tablet`}
              src={img.src}
              alt={img.alt || 'Industrial Project'}
              loading={index === 0 ? 'eager' : 'lazy'}
              {...(index === 0 ? { fetchPriority: 'high' } : {})}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ objectPosition: img.tabletPosition || '62% center' }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,52,0.9)_0%,rgba(7,27,52,0.72)_45%,rgba(7,27,52,0.92)_100%)]" />
      </div>

      <div className="absolute inset-0 z-10 flex items-end lg:hidden">
        <div className="container mx-auto px-6 sm:px-8 pb-8 md:pb-10 w-full">
          <div className="max-w-xl text-white">
            <div className="inline-flex items-center gap-3 mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/70">
              <span className="h-[2px] w-8 bg-[#F25C19]" />
              {t('hero.badge', hero.label)}
            </div>

            <h1 className="heading-font font-extrabold text-[2.2rem] leading-[1.02] sm:text-[2.6rem] md:text-[2.75rem] tracking-tight mb-4 flex flex-col gap-1.5">
              <span className="block">{t('hero.titleLine1', hero.h1.split('\n')[0])}</span>
              <span className="block text-[#F25C19]">{t('hero.titleHighlight', hero.h1.split('\n')[1] ?? 'for Complex EPC Projects')}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/82 font-medium mb-6 max-w-[34rem] leading-relaxed">
              {t('hero.subtitle', hero.h2)}
            </p>

            <div className="flex flex-col gap-3 sm:max-w-sm">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-slate-100 focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                {t('hero.cta_primary', 'Consult Us')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>

              <a
                href={ROUTES.contact}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/75 bg-transparent px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black focus:ring-2 focus:ring-offset-2 focus:ring-white"
              >
                {t('hero.cta_secondary', 'Request Consultation')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              {[
                t('hero.strip.controls', 'Project Controls'),
                t('hero.strip.deliverables', 'Engineering Deliverables'),
                t('hero.strip.execution', 'DAI & Execution Support'),
              ].map((item, idx) => (
                <React.Fragment key={item}>
                  <div className="text-[10px] font-black uppercase tracking-[0.24em] text-white">
                    {item}
                  </div>
                  {idx < 2 && <span className="hidden sm:block h-6 w-px bg-white/20" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT & CONTAINERS --- */}
      <div className="hidden lg:flex container mx-auto px-6 sm:px-8 lg:px-20 relative z-10 flex-grow items-center py-8 lg:py-0 w-full">
        <div className="w-full lg:w-[50%] xl:w-[45%] max-w-[34rem] flex flex-col justify-center relative">
          
          <h1 
            className="heading-font font-extrabold text-3xl sm:text-4xl lg:text-[3.25rem] xl:text-[3.5rem] tracking-tight mb-5 flex flex-col gap-1 lg:gap-1.5 animate-[slideInUp_0.8s_ease-out]" 
            style={{ lineHeight: 1.08 }}
          >
            <span className="block text-[#071B34]">{t('hero.titleLine1', hero.h1.split('\n')[0])}</span>
            <span className="block text-[var(--accent,#F25C19)]">{t('hero.titleHighlight', hero.h1.split('\n')[1] ?? 'for Complex EPC Projects')}</span>
          </h1>

          <p className="text-base sm:text-lg text-[#4A5568] font-medium mb-8 max-w-[34rem] leading-relaxed animate-[fadeIn_1s_ease-out_0.3s_both]">
            {t('hero.subtitle', hero.h2)}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 animate-[fadeIn_1s_ease-out_0.6s_both]">
            <a 
              href={ROUTES.contact}
              className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#111111] px-8 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-[#111111]"
            >
              {t('hero.cta_primary', 'Consult Us')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            <a 
              href={ROUTES.contact} 
              className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-[#071B34]/25 bg-white px-8 text-sm font-semibold text-[#071B34] transition-all duration-300 hover:border-[#071B34] hover:bg-[#071B34] hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-[#071B34]"
            >
              {t('hero.cta_secondary', 'Request Consultation')}
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
              objectPosition: img.desktopPosition || img.focalPoint || 'center',
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
            {t('hero.strip.controls', 'Project Controls')}
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
            {t('hero.strip.deliverables', 'Engineering Deliverables')}
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
            {t('hero.strip.execution', 'DAI & Execution Support')}
          </span>
        </div>

      </div>
    </section>
  );
};

export default Hero;