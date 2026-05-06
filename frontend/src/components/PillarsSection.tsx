// src/components/PillarsSection.tsx
import React, { useState } from 'react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

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
    description: 'Integrated cost, schedule, risk and change management to keep projects on track with disciplined governance.',
    highlights: ['L3/L4 schedule development', 'Cost & budget tracking', 'Risk & opportunity management', 'Stakeholder reporting'],
    color: 'blue',
    image: '/pillar/pillar1.jpg',
  },
  {
    id: 'detail-engineering',
    title: 'Detail Engineering',
    subtitle: 'Multi‑Discipline Delivery',
    description: 'Process, piping, mechanical, electrical, instrumentation and civil design from FEED to IFC with QA processes.',
    highlights: ['3D plant modelling', 'Process design & PIDs', 'Equipment specifications', 'Construction packages'],
    color: 'orange',
    image: '/pillar/pillar4.jpg',
  },
  {
    id: 'execution-support',
    title: 'Execution Support',
    subtitle: 'Vendor & Site Coordination',
    description: 'Procurement coordination, field engineering and construction-stage support to ensure smooth execution.',
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
  },
  orange: {
    accent: BRAND_ORANGE,
    tagBg: '#FFF4EE',
    tagText: '#7A2F00',
  },
} as const;

export default function PillarsSection(): JSX.Element {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-slate-50 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 
          CONTAINED BANNER ("Island" Design):
          - Wrapped inside the container to prevent edge-to-edge stretching.
          - Added rounded-[2rem] for a sleek, modern card-like banner.
          - Reduced padding (pt-12 pb-24) to keep it compact.
        */}
        <div className="relative bg-slate-700 rounded-[2rem] pt-4 pb-24 overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: 'url("/pillar/pillar1.png")' }}
            aria-hidden="true"
          />
          {/* Dark Blue Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 to-blue-950/90 mix-blend-multiply" />
          
          {/* Banner Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-2xl">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-blue-300">
                Our Services
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Pillars of PCE BV
              </h2>
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                {pillars.map((p) => (
                  <span
                    key={p.id}
                    className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-bold border border-white/10 shadow-sm"
                  >
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 
          COMPACT CARDS GRID:
          - Overlaps the banner (-mt-16) to connect them visually.
          - Uses smaller padding and image heights to fit on standard screens.
        */}
        <div className="max-w-6xl mx-auto grid gap-5 sm:gap-6 grid-cols-1 md:grid-cols-3 -mt-16 relative z-20 px-2 sm:px-4">
          {pillars.map((p) => {
            const isOpen = open === p.id;
            const colors = colorMap[p.color];
            
            return (
              <article
                key={p.id}
                onMouseEnter={() => setOpen(p.id)}
                onMouseLeave={() => setOpen(null)}
                onFocus={() => setOpen(p.id)}
                onBlur={() => setOpen(null)}
                tabIndex={0}
                aria-expanded={isOpen}
                className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 ease-out cursor-pointer focus:outline-none ${
                  isOpen 
                    ? 'border-[#0056A3] shadow-2xl shadow-blue-900/15 -translate-y-1' 
                    : 'border-transparent shadow-lg hover:shadow-xl hover:-translate-y-1'
                }`}
                style={{
                  borderColor: isOpen ? colors.accent : undefined,
                }}
              >
                
                {/* Image Top Half - Reduced height to h-36/40 for compactness */}
                <div className="h-36 sm:h-40 w-full relative overflow-hidden bg-slate-900 shrink-0">
                  <div
                    className={`absolute inset-0 bg-center bg-cover transition-transform duration-700 ease-out will-change-transform ${
                      isOpen ? 'scale-110' : 'scale-100'
                    }`}
                    style={{ backgroundImage: `url(${p.image ?? '/pillars/placeholder.jpg'})` }}
                    aria-hidden="true"
                  />
                  {/* Text Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute left-4 bottom-4 right-4 flex flex-col text-white">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/80 mb-1">
                      {p.subtitle}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold leading-tight">
                      {p.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body Bottom Half - Tightened Padding */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    {/* Hardware Accelerated SVG Chevron */}
                    <button
                      aria-expanded={isOpen}
                      className={`shrink-0 flex items-center justify-center rounded-full w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 border ${
                        isOpen ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <svg
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.accent}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Expandable Accordion Highlights */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="space-y-2">
                      {p.highlights.map((h, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 p-2 rounded-lg border border-slate-100" 
                          style={{ backgroundColor: colors.tagBg }}
                        >
                          <span 
                            className="w-1.5 h-1.5 rounded-full shrink-0" 
                            style={{ backgroundColor: colors.accent }} 
                          />
                          <span 
                            className="text-[11px] sm:text-xs font-bold" 
                            style={{ color: colors.tagText }}
                          >
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}