import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Building2, Zap } from 'lucide-react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const BRAND_BLUE = HOMEPAGE_CONFIG.colors.primary_blue;

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
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
    <section className="py-8 md:py-12 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div
            className="inline-block px-3 py-1.5 mb-3 text-[10px] md:text-xs font-bold tracking-widest text-white uppercase rounded-full"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            How We Deliver
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Execution Model
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Clear organizational separation ensures responsive governance and scalable execution excellence.
          </p>
        </div>

        <div ref={containerRef} className="max-w-6xl mx-auto">
          {/* MOBILE: stacked cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isHighlight = stage.highlight;
              const baseDelay = idx * 90;

              return (
                <div
                  key={stage.label}
                  aria-label={stage.title}
                  className={`rounded-xl p-4 border flex gap-3 items-start ${
                    isHighlight ? 'text-white shadow-lg' : 'bg-white text-slate-900 shadow-sm'
                  }`}
                  style={
                    isHighlight
                      ? {
                          borderColor: BRAND_BLUE,
                          backgroundImage: `linear-gradient(to bottom right, ${BRAND_BLUE}, #0056A3)`,
                          transform: inView ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.99)',
                          opacity: inView ? 1 : 0,
                          transition: `transform 600ms cubic-bezier(.2,.9,.2,1) ${baseDelay}ms, opacity 450ms ${baseDelay}ms`,
                        }
                      : {
                          transform: inView ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.99)',
                          opacity: inView ? 1 : 0,
                          transition: `transform 600ms cubic-bezier(.2,.9,.2,1) ${baseDelay}ms, opacity 450ms ${baseDelay}ms`,
                        }
                  }
                >
                  <div
                    className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-lg ${
                      isHighlight ? 'bg-white/20 text-white' : 'bg-blue-100'
                    }`}
                    style={!isHighlight ? { color: BRAND_BLUE } : {}}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                        isHighlight ? 'text-blue-100' : ''
                      }`}
                      style={!isHighlight ? { color: BRAND_BLUE } : {}}
                    >
                      {stage.label}
                    </p>

                    <h3 className={`text-sm font-semibold mb-1 ${isHighlight ? 'text-white' : 'text-slate-900'}`}>
                      {stage.title}
                    </h3>

                    <p className={`text-xs leading-relaxed ${isHighlight ? 'text-blue-50' : 'text-slate-600'}`}>
                      {stage.description}
                    </p>

                    {isHighlight && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="text-[10px] font-semibold text-blue-100 mb-2">Key Functions:</p>
                        <ul className="space-y-1 text-[11px] text-blue-50">
                          <li>✓ Single Point of Contact</li>
                          <li>✓ Governance & Compliance</li>
                          <li>✓ Stakeholder Reporting</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP: horizontal flow */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isHighlight = stage.highlight;
              const baseDelay = idx * 120;

              return (
                <React.Fragment key={stage.label}>
                  <div
                    role="group"
                    aria-label={stage.title}
                    className={`stage-card relative rounded-2xl flex-1 min-w-0 border-2 transition-all

                    ${isHighlight 
                      ? 'p-5 lg:p-6 text-white shadow-2xl scale-[1.02]' 
                      : 'p-3 lg:p-4 bg-white text-slate-900 shadow-sm opacity-95'
                    }

                    ${isHighlight
                      ? 'border-slate-200'
                      : 'border-slate-200'
                    }
                  `}
                    style={{
                      ...(isHighlight
                        ? {
                            borderColor: BRAND_BLUE,
                            backgroundImage: `linear-gradient(to bottom right, ${BRAND_BLUE}, #0056A3)`,
                          }
                        : {}),
                      transform: inView ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.99)',
                      opacity: inView ? 1 : 0,
                      transition: `transform 650ms cubic-bezier(.2,.9,.2,1) ${baseDelay}ms, opacity 450ms ${baseDelay}ms`,
                    }}
                  >
                    <div className="relative z-10">
                      <p
                        className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${
                          isHighlight ? 'text-blue-100' : ''
                        }`}
                        style={!isHighlight ? { color: BRAND_BLUE } : {}}
                      >
                        {stage.label}
                      </p>

                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                          isHighlight ? 'bg-white/20 text-white' : 'bg-blue-100'
                        }`}
                        style={!isHighlight ? { color: BRAND_BLUE } : {}}
                      >
                        <Icon size={18} />
                      </div>

                      <h3 className={`text-base font-bold mb-2 ${isHighlight ? 'text-white' : 'text-slate-900'}`}>
                        {stage.title}
                      </h3>

                      <p className={`text-sm leading-relaxed ${isHighlight ? 'text-blue-50' : 'text-slate-600'}`}>
                        {stage.description}
                      </p>

                      {isHighlight && (
                        <div className="mt-3 pt-3 border-t border-white/20">
                          <p className="text-[10px] font-semibold text-blue-100 mb-1.5">Key Functions:</p>
                          <ul className="space-y-1 text-[11px] text-blue-50">
                            <li>✓ Single Point of Contact</li>
                            <li>✓ Governance & Compliance</li>
                            <li>✓ Stakeholder Reporting</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {idx < stages.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center w-8 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-0.5 w-8"
                          style={{ backgroundImage: `linear-gradient(to right, #60A5FA, ${BRAND_BLUE})` }}
                        />
                        <ArrowRight size={18} style={{ color: BRAND_BLUE }} />
                        <div
                          className="h-0.5 w-8"
                          style={{ backgroundImage: `linear-gradient(to right, #60A5FA, ${BRAND_BLUE})` }}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Bottom info cards */}
        <div className="mt-5 md:mt-6 max-w-6xl mx-auto grid gap-3 grid-cols-1 md:grid-cols-3">
          <div className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors text-xs">
            <h4 className="font-semibold text-slate-900 mb-1">EU Governance</h4>
            <p className="text-slate-600">Client interface and compliance.</p>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-400 transition-colors text-xs">
            <h4 className="font-semibold text-slate-900 mb-1">Integrated Delivery</h4>
            <p className="text-slate-700">Seamless coordination.</p>
          </div>

          <div className="p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-300 transition-colors text-xs">
            <h4 className="font-semibold text-slate-900 mb-1">India Execution</h4>
            <p className="text-slate-600">Engineering & site support.</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .stage-card {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ExecutionModelSection;