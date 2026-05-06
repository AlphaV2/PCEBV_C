import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_LINK } from '../../constants';
import HOMEPAGE_CONFIG from '../config/homepage.config';

type MediaItem = {
  src: string;
  alt: string;
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { hero } = HOMEPAGE_CONFIG;

  // Carousel timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % hero.background_images.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [hero.background_images.length]);

  const bgImages = hero.background_images;

  return (
    // 1. Set to 100dvh so it perfectly fills the screen of any device
    <section id="hero" className="relative flex min-h-[90dvh] w-full items-center justify-center overflow-hidden bg-slate-950 pt-20">
      
      {/* Performance Animations */}
      <style>{`
        .hero-media {
          transition: opacity 1200ms ease-in-out;
          will-change: opacity, transform;
        }
        @keyframes slow-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.15) translate(-1%, 1%); }
        }
        .animate-pan {
          animation: slow-pan 20s ease-in-out infinite alternate;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-media, .animate-pan {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* ============================================
          BACKGROUND IMAGES & DARK OVERLAYS
          ============================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950" aria-hidden="true">
        {bgImages.map((item: MediaItem, index: number) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`hero-media animate-pan absolute inset-0 h-full w-full object-cover object-center ${
              currentMediaIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* 
          CRITICAL FIX: The Dark Gradient Overlay 
          This ensures the text is ALWAYS readable regardless of how bright the photo is.
        */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
      </div>

      {/* ============================================
          HERO CONTENT
          ============================================ */}
      <div className="container relative z-30 mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-left">
          
          {/* Label */}
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#4ea0f5]">
              {t('hero.label', hero.label)}
            </p>
          </div>

          {/* Main Headline - Changed to White */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6">
            {t('hero.h1', hero.h1)}
          </h1>

          {/* Subheadline - Changed to Light Slate */}
          <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
            {t('hero.h2', hero.h2)}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6A2A] px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,106,42,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,106,42,0.5)] active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              {t('hero.cta_primary', hero.cta_primary)}
            </a>
            
            {/* Secondary button updated to look good on dark backgrounds */}
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white hover:text-slate-900 active:scale-95"
            >
              {t('hero.cta_secondary', hero.cta_secondary)}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;