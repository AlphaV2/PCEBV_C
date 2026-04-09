import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HologramRadar from './HologramRadar';
import { WHATSAPP_LINK } from '../../constants';

// ⚡ PERFORMANCE: Static background data
const BACKGROUND_MEDIA = [
  {
    type: 'image',
    // ⚠️ Note: Ensure this path is correct for your public folder setup (usually just /products/...)
    src: '/products/survey_drone.jpeg', 
    alt: 'Survey Drone Close-up',
  },
  // {
  //   type: 'image',
  //   // ⚠️ Note: Ensure this path is correct for your public folder setup (usually just /products/...)
  //   src: '/products/krishi_11l.jpeg', 
  //   alt: 'Survey Drone Close-up',
  // },
  
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1920&auto=format&fit=crop',
    alt: 'Surveillance Drone monitoring landscape terrain',
  },
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4', 
    alt: 'Real-time security surveillance feed interface',
  },
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_MEDIA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleMediaError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>) => {
    const target = e.target as HTMLElement;
    target.style.display = 'none';
  };

  return (
    <section 
      id="hero" 
      // 📱 LAYOUT OPTIMIZATION:
      // 'min-h-[85dvh]' on mobile: prevents content from being too tall/spread out.
      // 'md:min-h-[100dvh]' on desktop: keeps the immersive full-screen experience.
      className="relative w-full min-h-[85dvh] md:min-h-[100dvh] flex flex-col justify-center pt-24 md:pt-32 pb-8 overflow-hidden bg-slate-50" 
    >
      
      {/* ========================================= */}
      {/* 1. BACKGROUND LAYER (Enhanced & Scaled)   */}
      {/* ========================================= */}
      <div className="absolute inset-0 z-0 w-full h-full select-none" aria-hidden="true">
        {isLoaded && BACKGROUND_MEDIA.map((media, index) => {
          const isActive = index === currentImageIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out will-change-opacity ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              {media.type === 'video' ? (
                <video
                  autoPlay muted loop playsInline
                  // ⚡ VISUAL FIX: 'object-center' ensures perfect centering on all screens.
                  // 'opacity-100' makes the video clearer (less washed out).
                  className="w-full h-full object-cover object-center opacity-100"
                  onError={handleMediaError}
                >
                  <source src={media.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={media.src}
                  alt={media.alt}
                  // ⚡ VISUAL FIX: Auto-scales to cover the container perfectly.
                  className={`w-full h-full object-cover object-center transition-transform duration-[8000ms] ease-linear ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  onError={handleMediaError}
                />
              )}
            </div>
          );
        })}
        
        {/* 🎨 GRADIENT OVERLAY FIX: 
            Adjusted to 'via-slate-50/70' so the image background is more visible 
            while keeping text readable. 
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent z-10"></div>
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply pointer-events-none z-10"></div>
      </div>

      {/* ========================================= */}
      {/* 2. CONTENT LAYER                          */}
      {/* ========================================= */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 z-20 relative h-full flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* --- LEFT: Text Content --- */}
          {/* 📱 MOBILE ORDER: Text comes 2nd (Bottom) so Drone/Hologram is seen first */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 lg:mb-6 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-[10px] font-bold uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
                {t('hero.badge', 'AI-Powered Defense Systems')}
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-4 lg:mb-6 drop-shadow-sm text-balance"> 
              {t('hero.titleLine1', 'Turn Airspace Into An')} <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">
                {t('hero.titleHighlight', 'Intelligent Shield.')}
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed font-medium text-pretty">
              {t('hero.subtitle', 'RadarSnipers (OPC) Private Ltd presents AI-Powered Drones & Cybersecurity for a smarter future.')}
              <span className="block mt-2 text-slate-900 font-bold">{t('hero.subtitleStrong', 'Smart Drones. Strong Security. Safer Tomorrow.')}</span>
            </p>
            
            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto lg:mx-0 mb-8">
              <a
                href="#products"
                className="group relative flex-1 px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-sm transition-all shadow-xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative flex items-center gap-2">
                  {t('hero.ctaProducts', 'Explore Products')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:border-slate-300"
              >
                <MessageCircle size={18} className="text-green-600" /> {t('hero.ctaWhatsapp', 'WhatsApp Chat')}
              </a>
            </div>

            {/* 🚨 RECOGNITION & INCUBATION SECTION 🚨 */}
            <div className="mt-6 pt-6 border-t border-slate-200/60 flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
               
               {/* 1. Recognition Logos */}
               <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-6">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     {t('hero.recognizedBy', 'Recognized By')}
                   </p>
                   <div className="flex flex-wrap justify-center items-center gap-5 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                        {/* MSME */}
                        <div className="flex items-center gap-2">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/MSME_Logo.png/800px-MSME_Logo.png" 
                                alt="MSME Registered" 
                                className="h-7 w-auto object-contain opacity-90"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                            <div className="text-left block">
                                <span className="block text-[10px] font-black text-slate-800 leading-none">UDHYAM</span>
                              <span className="block text-[8px] font-bold text-slate-500">{t('hero.msmeStatus', 'Registered')}</span>
                            </div>
                        </div>
                        {/* Divider */}
                        <div className="w-px h-6 bg-slate-300 hidden sm:block"></div>
                        {/* Startup India */}
                        <div className="flex items-center gap-2">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/en/2/2b/Startup_India_Logo.svg" 
                                alt="Startup India Recognized" 
                                className="h-7 w-auto object-contain opacity-90"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                            />
                            <div className="text-left block">
                                <span className="block text-[10px] font-black text-slate-800 leading-none">STARTUP INDIA</span>
                              <span className="block text-[8px] font-bold text-slate-500">{t('hero.startupIndiaStatus', 'Recognized')}</span>
                            </div>
                        </div>
                   </div>
               </div>

               {/* 2. Incubation Facility Badge */}
               <div className="flex items-start justify-center lg:justify-start gap-3 bg-white/60 rounded-xl p-3 border border-slate-200/60 backdrop-blur-sm w-fit mx-auto lg:mx-0 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-default max-w-full sm:max-w-none">
                  <div className="p-1.5 bg-white rounded-full shadow-sm text-blue-600 ring-1 ring-slate-100 mt-0.5 shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-xs text-slate-500 font-medium">
                      {t('hero.incubationPrefix', 'Designed &')} <span className="font-bold text-slate-900">{t('hero.incubationEmphasis', 'manufactured')}</span> {t('hero.incubationSuffix', 'in certified incubation facilities:')}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-blue-900 mt-0.5 leading-snug">
                      {t('hero.incubationInstitute', 'Auto Cluster Development & Research Institute, Pune')}
                    </p>
                  </div>
               </div>

            </div>
          </div>

          {/* --- RIGHT: Visual / Hologram / Drone --- */}
          {/* 📱 MOBILE ORDER: Order 1 (Top) ensures the drone is the first thing users see */}
          <div className="flex lg:col-span-5 justify-center lg:justify-end relative h-[250px] sm:h-[350px] lg:h-auto items-center order-1 lg:order-2">
            
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-400/20 blur-[80px] rounded-full pointer-events-none mix-blend-multiply"></div>
            
            {/* Hologram Component */}
            <div className="relative z-10 scale-90 sm:scale-100 lg:scale-110 transition-transform duration-700 ease-out cursor-pointer hover:scale-105">
              <HologramRadar />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;