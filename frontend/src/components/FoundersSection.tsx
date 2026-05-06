// src/components/FoundersSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { TEAM, SOCIAL_LINKS } from '../../constants';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const BRAND_BLUE = HOMEPAGE_CONFIG?.colors?.primary_blue ?? '#0056A3';
const BRAND_ORANGE = HOMEPAGE_CONFIG?.colors?.accent_orange ?? '#FF6A2A';

// Public fallback image (use any existing image inside public/founderprofile/)
// Note: repo already includes `founder_image.jpeg` and `founder_image2.jpeg`.
const PUBLIC_PLACEHOLDER = '/founderprofile/founder_image.jpeg';

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
    <section id="founders" className="py-12 sm:py-16 bg-[linear-gradient(180deg,rgba(226,232,240,0.95),rgba(241,245,249,0.92))] border-y border-slate-200/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto rounded-[2rem] border border-white/70 bg-white/75 px-6 py-8 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0071E3]">Our Founders</p>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">Strategic leadership across EU and India operations</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Two distinct leaders, two distinct responsibilities, presented in a stronger visual frame so each portrait and role stands out clearly.
          </p>
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
            <article className="rounded-[2rem] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.55)] flex gap-4 items-start h-full ring-1 ring-white/60">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-200/70">
                <img
                  src={fallback[leftFounder.id ?? 'left'] || leftFounder.image || PUBLIC_PLACEHOLDER}
                  alt={leftFounder.name}
                  onError={() => onImgError(leftFounder.id ?? 'left')}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
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
                      <span key={t} className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-[#0B5FDB]">
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
                    className="inline-flex items-center gap-2 rounded-full bg-[#0056A3] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
                    aria-label={`Connect with ${leftFounder.name} on LinkedIn`}
                  >
                    <Linkedin className="h-4 w-4" /> Connect
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Center info (compact) */}
          <div className="hidden md:flex flex-col justify-center items-center text-center space-y-4 py-4 rounded-[2rem] border border-slate-200/80 bg-white/85 shadow-[0_18px_48px_-32px_rgba(15,23,42,0.45)] backdrop-blur-sm">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Leadership</div>
            <div className="text-lg font-bold text-slate-900">Focused. Accountable. Experienced.</div>

            <div className="mt-2 grid gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left w-56 shadow-sm">
                <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Founded</p>
                <p className="text-sm text-slate-700">Registered with KVK on <span className="font-semibold">30 Apr 2025</span></p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left w-56 shadow-sm">
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
            <article className="rounded-[2rem] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_20px_55px_-30px_rgba(15,23,42,0.55)] flex gap-4 items-start h-full ring-1 ring-white/60">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 ring-1 ring-slate-200/70">
                <img
                  src={fallback[rightFounder.id ?? 'right'] || rightFounder.image || PUBLIC_PLACEHOLDER}
                  alt={rightFounder.name}
                  onError={() => onImgError(rightFounder.id ?? 'right')}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
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
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF6A2A] px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20"
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
          <div className="p-2 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Founded</p>
            <p className="text-sm text-slate-900">30 Apr 2025</p>
          </div>
          <div className="p-2 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
            <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Partner</p>
            <p className="text-sm text-slate-900">PCE PL, Mumbai</p>
          </div>
          <div className="p-2 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
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
