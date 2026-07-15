// src/components/FoundersSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../../constants';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { useTranslatedTeam } from '../hooks/useTranslatedData';

const BRAND_BLUE = HOMEPAGE_CONFIG?.colors?.primary_blue ?? '#0056A3';
const BRAND_ORANGE = HOMEPAGE_CONFIG?.colors?.accent_orange ?? '#C65300';

const PUBLIC_PLACEHOLDER = '/founderprofile/founder_image.webp';

type Founder = {
  id?: string;
  name: string;
  title?: string;
  image?: string;
  bio?: string;
  tags?: string[];
  linkedin?: string;
};

const defaultLeft: Founder = {
  id: 'nishikant',
  name: 'Nishikant Vishnu Choudhary',
  title: 'Managing Director - EU Operations',
  image: '/founderprofile/founder_image.webp',
  bio: 'EU operations lead with governance, client interface and project controls expertise.',
  tags: ['Governance', 'Client Interface', 'Project Controls'],
  linkedin: SOCIAL_LINKS?.linkedin_nishikant ?? '#',
};

const defaultRight: Founder = {
  id: 'kiran',
  name: 'Kiran V. Kulkarni',
  title: 'Managing Director - India Operations',
  image: '/founderprofile/founder_image2.webp',
  bio: 'India execution lead with discipline expertise in long‑cycle engineering delivery and execution planning.',
  tags: ['India Operations', 'Engineering Delivery', 'Execution Planning'],
  linkedin: SOCIAL_LINKS?.linkedin_kiran ?? '#',
};

const FoundersSection: React.FC = () => {
  const { t } = useTranslation();
  const translatedTeam = useTranslatedTeam() as Founder[];

  // Use translated TEAM entries if available, otherwise fall back to defaults.
  const leftFounder = translatedTeam.find((member) => member.id === 'founder-nishikant') ?? translatedTeam[0] ?? defaultLeft;
  const rightFounder = translatedTeam.find((member) => member.id === 'founder-kiran') ?? translatedTeam[1] ?? defaultRight;

  // FIXED: Explicitly map the new separate links, checking hook fallbacks to guarantee consistency
  const leftLinkedin = leftFounder.linkedin && leftFounder.linkedin !== '#' ? leftFounder.linkedin : (SOCIAL_LINKS?.linkedin_nishikant ?? '#');
  const rightLinkedin = rightFounder.linkedin && rightFounder.linkedin !== '#' ? rightFounder.linkedin : (SOCIAL_LINKS?.linkedin_kiran ?? '#');

  // image fallback map
  const [fallback, setFallback] = useState<Record<string, string>>({});

  // reveal animation state
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.2) setReveal(true);
          else setReveal(false);
        });
      },
      { threshold: [0, 0.2, 0.4, 0.6, 1] }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onImgError = (id: string) => {
    setFallback((m) => ({ ...m, [id]: PUBLIC_PLACEHOLDER }));
  };

  return (
    <section id="founders" className="py-12 sm:py-16 bg-[linear-gradient(180deg,rgba(226,232,240,0.95),rgba(241,245,249,0.92))] border-y border-slate-200/70 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto rounded-[2rem] border border-white/70 bg-white/75 px-6 py-8 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">{t('founders.badge', 'Our Founders')}</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{t('founders.heading', 'Strategic leadership across EU and India operations')}</h2>
        </div>

        <div
          ref={containerRef}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {/* Left founder card */}
          <div
            className={`transition-transform duration-700 ease-[cubic-bezier(.2,.9,.2,1)] ${
              reveal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
            aria-hidden={!reveal}
          >
            <article className="rounded-[2rem] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.55)] flex flex-col sm:flex-row gap-4 items-start h-full ring-1 ring-white/60">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-200/70 mx-auto sm:mx-0">
                <img
                  src={fallback[leftFounder.id ?? 'left'] || leftFounder.image || PUBLIC_PLACEHOLDER}
                  alt={leftFounder.name}
                  onError={() => onImgError(leftFounder.id ?? 'left')}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  style={{ maxHeight: '320px' }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0B5FDB]">{leftFounder.title}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{leftFounder.name}</h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{leftFounder.bio}</p>

                {leftFounder.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {leftFounder.tags.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0B5FDB]">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4">
                  <a
                    href={leftLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0056A3] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
                    aria-label={t('founders.connectAria', 'Connect with {{name}} on LinkedIn', { name: leftFounder.name })}
                  >
                    <Linkedin className="h-4 w-4" /> {t('founders.connect', 'Connect')}
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Center execution model card */}
          <div className="hidden md:flex relative overflow-hidden flex-col justify-between rounded-[2rem] border border-[#DCE4EC] bg-[linear-gradient(180deg,#F2F5F8_0%,#E9EEF3_100%)] px-8 py-8 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.28)] min-h-[420px]">
            {/* subtle texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(7,27,52,0.08) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(7,27,52,0.08) 0 1px, transparent 1px 28px)',
              }}
            />

            <div className="relative z-10">
              {/* label */}
              <span className="text-[10px] uppercase tracking-[0.24em] font-black text-[#F25C19]">
                {t('founders.executionModel', 'Execution Model')}
              </span>

              {/* flow */}
              <div className="mt-10 space-y-7">
                {/* item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-[2px] h-11 rounded-full bg-[#F25C19]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#5B6472]">
                      {t('founders.netherlands', 'Netherlands')}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-relaxed text-[#071B34]">
                      {t('founders.netherlandsBody', 'Governance & Project Oversight')}
                    </p>
                  </div>
                </div>

                {/* item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-[2px] h-11 rounded-full bg-[#2563EB]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#5B6472]">
                      {t('founders.mumbai', 'Mumbai')}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-relaxed text-[#071B34]">
                      {t('founders.mumbaiBody', 'Engineering Execution Support')}
                    </p>
                  </div>
                </div>

                {/* item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-[2px] h-11 rounded-full bg-[#94A3B8]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#5B6472]">
                      {t('founders.delivery', 'Delivery')}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-relaxed text-[#071B34]">
                      {t('founders.deliveryBody', 'Industrial EPC Project Coordination')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="relative z-10 pt-8 mt-8 border-t border-[#D7E0E8]">
              <p className="text-xs leading-relaxed font-medium text-[#5B6472] max-w-[24ch]">
                {t('founders.footer', 'Built for clarity, execution control, and accountable industrial delivery.')}
              </p>
            </div>
          </div>

          {/* Right founder card */}
          <div
            className={`transition-transform duration-700 ease-[cubic-bezier(.2,.9,.2,1)] ${
              reveal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
            aria-hidden={!reveal}
          >
            <article className="rounded-[2rem] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.55)] flex flex-col sm:flex-row gap-4 items-start h-full ring-1 ring-white/60">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-200/70 mx-auto sm:mx-0">
                <img
                  src={fallback[rightFounder.id ?? 'right'] || rightFounder.image || PUBLIC_PLACEHOLDER}
                  alt={rightFounder.name}
                  onError={() => onImgError(rightFounder.id ?? 'right')}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  style={{ maxHeight: '320px' }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#C65300]">{rightFounder.title}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{rightFounder.name}</h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{rightFounder.bio}</p>

                {rightFounder.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rightFounder.tags.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full border border-orange-100 bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4">
                  <a
                    href={rightLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#C65300] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
                    aria-label={t('founders.connectAria', 'Connect with {{name}} on LinkedIn', { name: rightFounder.name })}
                  >
                    <Linkedin className="h-4 w-4" /> {t('founders.connect', 'Connect')}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Mobile summary row */}
        <div className="md:hidden mt-6 grid grid-cols-3 gap-3">
          <div className="p-2 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">{t('founders.mobile.founded', 'Founded')}</p>
            <p className="text-sm text-slate-900">{t('founders.mobile.foundedValue', '2025')}</p>
          </div>
          <div className="p-2 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">{t('founders.mobile.partner', 'Partner')}</p>
            <p className="text-sm text-slate-900">{t('founders.mobile.partnerValue', 'PCE PL, Mumbai')}</p>
          </div>
          <div className="p-2 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">{t('founders.mobile.lineage', 'Lineage')}</p>
            <p className="text-sm text-slate-900">{t('founders.mobile.lineageValue', 'Since 1991')}</p>
          </div>
        </div>
      </div>

      {/* Reduced-motion fallback */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-transform, .transition-all { transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default FoundersSection;