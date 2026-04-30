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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % hero.background_images.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);
const bgImages = hero.background_images;

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-slate-50">
      <style>{`
        .hero-media {
          transition: opacity 900ms ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-media {
            transition: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {bgImages.map((item: MediaItem, index: number) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`hero-media absolute inset-0 h-full w-full object-cover object-center ${
              currentMediaIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50/60 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] items-center lg:min-h-[100dvh]">
        <div className="w-full px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-5xl space-y-6 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071E3]">
              {t('hero.label', hero.label)}
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t('hero.h1', hero.h1)}
            </h1>

            <p className="mx-auto max-w-3xl text-lg text-slate-700 lg:mx-0">
              {t('hero.h2', hero.h2)}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF6A2A] px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                {t('hero.cta_primary', hero.cta_primary)}
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0071E3] bg-white px-6 py-3 text-base font-semibold text-[#0071E3] transition-all hover:-translate-y-1 hover:bg-blue-50"
              >
                {t('hero.cta_secondary', hero.cta_secondary)}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
