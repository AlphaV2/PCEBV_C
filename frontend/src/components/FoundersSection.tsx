// src/components/FoundersSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { TEAM, SOCIAL_LINKS } from '../../constants';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const BRAND_BLUE = HOMEPAGE_CONFIG?.colors?.primary_blue ?? '#0056A3';
const BRAND_ORANGE = HOMEPAGE_CONFIG?.colors?.accent_orange ?? '#FF6A2A';

// Public fallback image (place this file in public/founderprofile/)
const PUBLIC_PLACEHOLDER = '/founderprofile/founder-placeholder.jpg';

type Founder = {
  id?: string;
  name: string;
  title?: string;
  image?: string;
  bio?: string;
  tags?: string[];
  linkedin?: string;
};

const safeTeam = (TEAM as Founder[] | undefined) || [];

const defaultLeft: Founder = {
  id: 'nishikant',
  name: 'Nishikant Vishnu Choudhary',
  title: 'Managing Director - EU Operations',
  image: '/founderprofile/founder_image.jpeg',
  bio: 'EU operations lead with governance, client interface and project controls expertise.',
  tags: ['Governance', 'Client Interface', 'Project Controls'],
  linkedin: SOCIAL_LINKS?.linkedin ?? '#',
};

const defaultRight: Founder = {
  id: 'kiran',
  name: 'Kiran V. Kulkarni',
  title: 'Managing Director - India Operations',
  image: '/founderprofile/founder_image2.jpeg',
  bio: 'India execution lead with discipline expertise in long‑cycle engineering delivery and execution planning.',
  tags: ['India Operations', 'Engineering Delivery', 'Execution Planning'],
  linkedin: SOCIAL_LINKS?.linkedin ?? '#',
};

const FoundersSection: React.FC = () => {
  // Use provided TEAM entries if available, otherwise fall back to defaults
  const leftFounder = safeTeam[0] ?? defaultLeft;
  const rightFounder = safeTeam[1] ?? defaultRight;

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
    <section className="py-10 sm:py-14 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">Our Founders</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">Strategic leadership across EU and India operations</h2>
        </div>

        <div
          ref={containerRef}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {/* Left founder card */}
          <div
            className={`transition-transform duration-700 ease-[cubic-bezier(.2,.9,.2,1)] ${
              reveal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
            aria-hidden={!reveal}
          >
            <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex gap-4 items-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={fallback[leftFounder.id ?? 'left'] || leftFounder.image || PUBLIC_PLACEHOLDER}
                  alt={leftFounder.name}
                  onError={() => onImgError(leftFounder.id ?? 'left')}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '320px' }}
                />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0B5FDB]">{leftFounder.title}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{leftFounder.name}</h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{leftFounder.bio}</p>

                {leftFounder.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {leftFounder.tags.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full border border-blue-100 bg-[#EEF6FF] px-2.5 py-0.5 text-xs font-semibold text-[#0B5FDB]">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4">
                  <a
                    href={leftFounder.linkedin ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0056A3] px-3 py-2 text-sm font-semibold text-white"
                    aria-label={`Connect with ${leftFounder.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" /> Connect
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Center info (compact) */}
          <div className="hidden md:flex flex-col justify-center items-center text-center space-y-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Leadership</div>
            <div className="text-lg font-bold text-slate-900">Focused. Accountable. Experienced.</div>

            <div className="mt-2 grid gap-3">
              <div className="p-3 rounded-lg bg-white border border-blue-100 text-left w-56">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Founded</p>
                <p className="text-sm text-slate-700">Registered with KVK on <span className="font-semibold">30 Apr 2025</span></p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-blue-100 text-left w-56">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Partner</p>
                <p className="text-sm text-slate-700">PCE PL, Mumbai (Execution)</p>
              </div>
            </div>
          </div>

          {/* Right founder card */}
          <div
            className={`transition-transform duration-700 ease-[cubic-bezier(.2,.9,.2,1)] ${
              reveal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
            aria-hidden={!reveal}
          >
            <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm flex gap-4 items-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={fallback[rightFounder.id ?? 'right'] || rightFounder.image || PUBLIC_PLACEHOLDER}
                  alt={rightFounder.name}
                  onError={() => onImgError(rightFounder.id ?? 'right')}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '320px' }}
                />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FF6A2A]">{rightFounder.title}</p>
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
                    href={rightFounder.linkedin ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF6A2A] px-3 py-2 text-sm font-semibold text-white"
                    aria-label={`Connect with ${rightFounder.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" /> Connect
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Mobile summary row */}
        <div className="md:hidden mt-6 grid grid-cols-3 gap-3">
          <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Founded</p>
            <p className="text-sm text-slate-900">30 Apr 2025</p>
          </div>
          <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Partner</p>
            <p className="text-sm text-slate-900">PCE PL, Mumbai</p>
          </div>
          <div className="p-2 rounded-lg bg-white border border-blue-100 text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Lineage</p>
            <p className="text-sm text-slate-900">Since 1991</p>
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
