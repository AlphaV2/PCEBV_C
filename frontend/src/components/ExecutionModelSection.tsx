import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Building2, Zap } from 'lucide-react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const BRAND_BLUE = HOMEPAGE_CONFIG.colors.primary_blue;
const BRAND_ORANGE = HOMEPAGE_CONFIG.colors.accent_orange;

type Stage = {
  label: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color?: 'blue' | 'orange' | 'neutral';
  highlight?: boolean;
};

const stages: Stage[] = [
  {
    label: 'CLIENT',
    title: 'Your Objectives',
    description: 'Project goals, scope, timeline, and delivery requirements',
    icon: Globe,
    color: 'neutral',
    highlight: false,
  },
  {
    label: 'PCE BV (The Hague)',
    title: 'EU Operations',
    description: 'Commercial interface, governance, approvals, and client relationship management',
    icon: Building2,
    color: 'blue',
    highlight: true,
  },
  {
    label: 'PCE PL (Mumbai)',
    title: 'Engineering Execution',
    description: 'Multi-discipline delivery, 3D modeling, vendor coordination, and site support',
    icon: Zap,
    color: 'orange',
    highlight: false,
  },
];

const ExecutionModelSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // IntersectionObserver: trigger when element is between ~20% and 60% visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          // reveal when at least 20% visible, keep revealed until it leaves viewport
          if (ratio >= 0.2) setInView(true);
          else setInView(false);
        });
      },
      { threshold: [0, 0.2, 0.4, 0.6, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-widest text-white uppercase rounded-full" style={{ backgroundColor: BRAND_BLUE }}>
            How We Deliver
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Execution Model</h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Clear organizational separation ensures responsive governance and scalable execution excellence.
          </p>
        </div>

        {/* Single-row flow (horizontal scroll on small screens) */}
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto overflow-x-auto md:overflow-visible"
          aria-hidden={false}
        >
          <div
            className={`flex items-center gap-4 md:gap-6 w-max md:w-full transition-all`}
            // keep layout compact: allow horizontal scroll on small screens, single row on md+
          >
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isHighlight = stage.highlight;
              const baseDelay = idx * 120; // stagger reveal
              return (
                <React.Fragment key={stage.label}>
                  {/* Stage card */}
                  <div
                    role="group"
                    aria-label={stage.title}
                    className={`stage-card relative rounded-2xl p-5 md:p-6 min-w-[18rem] md:min-w-0 md:flex-1 flex-shrink-0
                      ${isHighlight ? 'border-2 border-slate-200 text-white shadow-2xl' : 'border-2 border-slate-200 bg-white text-slate-900 shadow-sm'}
                    `}
                    style={{
                      ...(isHighlight ? { borderColor: BRAND_BLUE, backgroundImage: `linear-gradient(to bottom right, ${BRAND_BLUE}, #0056A3)` } : {}),
                      transform: inView ? 'translateX(0) scale(1)' : 'translateX(-18%) scale(0.98)',
                      opacity: inView ? 1 : 0,
                      transition: `transform 700ms cubic-bezier(.2,.9,.2,1) ${baseDelay}ms, opacity 500ms ${baseDelay}ms`,
                    }}
                  >
                    <div className="relative z-10">
                      <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isHighlight ? 'text-blue-100' : ''}`} style={!isHighlight ? { color: BRAND_BLUE } : {}}>
                        {stage.label}
                      </p>

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isHighlight ? 'bg-white/20 text-white' : 'bg-blue-100'}`}
                        style={!isHighlight ? { color: BRAND_BLUE } : {}}
                      >
                        <Icon size={20} />
                      </div>

                      <h3 className={`text-lg font-bold mb-2 ${isHighlight ? 'text-white' : 'text-slate-900'}`}>{stage.title}</h3>

                      <p className={`text-sm leading-relaxed ${isHighlight ? 'text-blue-50' : 'text-slate-600'}`}>
                        {stage.description}
                      </p>

                      {isHighlight && (
                        <div className="mt-4 pt-4 border-t border-white/20">
                          <p className="text-xs font-semibold text-blue-100 mb-2">Key Functions:</p>
                          <ul className="space-y-1 text-xs text-blue-50">
                            <li>✓ Single Point of Contact</li>
                            <li>✓ Governance & Compliance</li>
                            <li>✓ Stakeholder Reporting</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow between cards (visible on md+) */}
                  {idx < stages.length - 1 && (
                    <div className="hidden md:flex items-center justify-center w-12 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="h-0.5 w-12" style={{ backgroundImage: `linear-gradient(to right, #60A5FA, ${BRAND_BLUE})` }} />
                        <ArrowRight size={20} style={{ color: BRAND_BLUE }} />
                        <div className="h-0.5 w-12" style={{ backgroundImage: `linear-gradient(to right, #60A5FA, ${BRAND_BLUE})` }} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Bottom info cards (compact, single row on md) */}
        <div className="mt-8 max-w-6xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-3">
          <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-colors text-sm">
            <h4 className="font-semibold text-slate-900 mb-1">EU Governance</h4>
            <p className="text-slate-600 text-sm">Netherlands-based client interface, contract management and compliance oversight.</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-400 transition-colors text-sm">
            <h4 className="font-semibold text-slate-900 mb-1">Integrated Delivery</h4>
            <p className="text-slate-700 text-sm">Seamless coordination between governance and execution for consistent quality.</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-colors text-sm">
            <h4 className="font-semibold text-slate-900 mb-1">India Execution</h4>
            <p className="text-slate-600 text-sm">Multi-discipline engineering, 3D modeling and on-site support in Mumbai.</p>
          </div>
        </div>
      </div>

      {/* Reduced-motion fallback */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .stage-card {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }

        /* Ensure horizontal scroll snaps to cards on small screens for better UX */
        .max-w-6xl > .flex {
          scroll-snap-type: x mandatory;
        }
        .stage-card {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
};

export default ExecutionModelSection;
