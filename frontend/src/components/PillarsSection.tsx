// src/components/PillarsSection.tsx
import React, { useState } from 'react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

/**
 * Compact PillarsSection
 * - Each card has a full-size image container at the top (same size as card)
 * - Left-aligned overlay text sits on the image; on hover (or tap) the card expands to reveal highlights
 * - No external icon libraries used (inline chevron SVG only)
 * - Small, compact heights and tidy layout for home/about pages
 *
 * Public images expected (replace with your own):
 *  /pillars/project-controls.jpg
 *  /pillars/detail-engineering.jpg
 *  /pillars/execution-support.jpg
 *  /pillars/banner.jpg
 *
 * Tailwind CSS utilities assumed.
 */

type Pillar = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  color: 'blue' | 'orange';
  image?: string;
};

const BRAND_BLUE = HOMEPAGE_CONFIG?.colors?.primary_blue ?? '#0056A3';
const BRAND_ORANGE = HOMEPAGE_CONFIG?.colors?.accent_orange ?? '#FF6A2A';

const pillars: Pillar[] = [
  {
    id: 'project-controls',
    title: 'Project Controls',
    subtitle: 'Planning & Governance',
    description:
      'Integrated cost, schedule, risk and change management to keep projects on track with disciplined governance.',
    highlights: ['L3/L4 schedule development', 'Cost & budget tracking', 'Risk & opportunity management', 'Stakeholder reporting'],
    color: 'blue',
    image: '/pillar/pillar1.jpg',
  },
  {
    id: 'detail-engineering',
    title: 'Detail Engineering',
    subtitle: 'Multi‑Discipline Delivery',
    description:
      'Process, piping, mechanical, electrical, instrumentation and civil design from FEED to IFC with QA processes.',
    highlights: ['3D plant modelling', 'Process design & PIDs', 'Equipment specifications', 'Construction packages'],
    color: 'orange',
    image: '/pillar/pillar4.jpg',
  },
  {
    id: 'execution-support',
    title: 'Execution Support',
    subtitle: 'Vendor & Site Coordination',
    description:
      'Procurement coordination, field engineering and construction-stage support to ensure smooth execution.',
    highlights: ['Vendor coordination', 'Site documentation', 'Field engineering support', 'Commissioning assistance'],
    color: 'blue',
    image: '/pillar/pillar3.jpg',
  },
];

const colorMap = {
  blue: {
    accent: BRAND_BLUE,
    tagBg: '#E8F3FF',
    tagText: '#0A3A6B',
    cardBg: '#F7FBFF',
  },
  orange: {
    accent: BRAND_ORANGE,
    tagBg: '#FFF4EE',
    tagText: '#7A2F00',
    cardBg: '#FFFBF7',
  },
} as const;

export default function PillarsSection(): JSX.Element {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-white">
      {/* Compact hero/banner above the cards */}
      <div
        className="relative h-36 sm:h-44 md:h-48 overflow-hidden rounded-b-2xl"
        style={{
          backgroundImage: "url('/pillar/pillar1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0056A3] via-white to-transparent" />
        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center text-black">
            <p className="text-xs font-semibold uppercase tracking-widest text-black/80">Our Services</p>
            <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold">Pillars of PCE BV</h2>
            <div className="mt-3 flex flex-wrap gap-2 justify-center text-sm">
              {pillars.map((p) => (
                <span
                  key={p.id}
                  className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90"
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
          {pillars.map((p) => {
            const isOpen = open === p.id;
            const colors = colorMap[p.color];
            return (
              <article
                key={p.id}
                className={`relative rounded-xl overflow-hidden border transition-shadow duration-200 cursor-pointer focus:outline-none`}
                style={{
                  borderColor: isOpen ? colors.accent : '#E6E9EE',
                  boxShadow: isOpen ? '0 10px 30px rgba(2,6,23,0.08)' : undefined,
                }}
                onMouseEnter={() => setOpen(p.id)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(p.id)}
                onBlur={() => setOpen(null)}
                tabIndex={0}
                aria-expanded={isOpen}
              >
                {/* Image container (same width as card, fixed height) */}
                <div className="h-40 md:h-36 w-full overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-center bg-cover transform transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${p.image ?? '/pillars/placeholder.jpg'})`,
                      transform: isOpen ? 'scale(1.06)' : 'scale(1.02)',
                    }}
                    aria-hidden
                  />
                  {/* left overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                  {/* overlay text on image (left) */}
                  <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-center text-white max-w-[70%]">
                    <p className="text-xs font-semibold uppercase tracking-wider">{p.subtitle}</p>
                    <h3 className="mt-1 text-lg font-bold leading-tight">{p.title}</h3>
                    <p className="mt-2 text-xs text-white/90 hidden md:block">{p.description}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 md:p-5 bg-white" style={{ backgroundColor: colors.cardBg }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
                      <p className="text-xs mt-1" style={{ color: colors.accent }}>
                        {p.subtitle}
                      </p>
                    </div>

                    {/* small chevron button */}
                    <button
                      onClick={() => setOpen(isOpen ? null : p.id)}
                      aria-expanded={isOpen}
                      className="ml-2 inline-flex items-center justify-center rounded-full p-2 bg-white border border-slate-200 shadow-sm hover:bg-slate-50"
                      title={isOpen ? 'Collapse' : 'Expand'}
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.accent}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-slate-700 leading-relaxed line-clamp-3">{p.description}</p>

                  {/* expandable highlights */}
                  <div
                    className={`mt-4 overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-48' : 'max-h-0'}`}
                    aria-hidden={!isOpen}
                  >
                    <div className="space-y-2">
                      {p.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded-md" style={{ backgroundColor: colors.tagBg }}>
                          <span className="inline-block w-2 h-2 rounded-full mt-2" style={{ backgroundColor: colors.accent }} />
                          <span className="text-sm font-medium" style={{ color: colors.tagText }}>
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                    <span className="uppercase font-semibold">{isOpen ? 'Showing details' : 'Tap to expand'}</span>
                    <span className="text-xs" style={{ color: colors.accent }}>
                      PCEBV
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* small centered banner below grid (image container) */}
        <div className="mt-8 flex items-center justify-center">
          <div
            className="w-full max-w-3xl h-24 rounded-2xl overflow-hidden shadow-md"
            style={{
              backgroundImage: "url('/pillars/pillar1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
