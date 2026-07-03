import React from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, HardHat, Ruler, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROUTES } from '../config'; // Using your centralized routes module

type Pillar = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
};

export default function PillarsSection(): React.ReactElement {
  const { t } = useTranslation();

  const pillars: Pillar[] = [
    {
      id: 'project-controls',
      title: t('servicesSection.pillars.projectControls.title', 'Project Controls'),
      subtitle: t('servicesSection.pillars.projectControls.subtitle', 'Planning, Scheduling & Cost Control'),
      description: t('servicesSection.pillars.projectControls.description', 'Planning, scheduling, cost control, risk management, and progress tracking for disciplined delivery.'),
      highlights: [
        t('servicesSection.pillars.projectControls.h1', 'Planning'),
        t('servicesSection.pillars.projectControls.h2', 'Scheduling'),
        t('servicesSection.pillars.projectControls.h3', 'Cost Control'),
        t('servicesSection.pillars.projectControls.h4', 'Risk Management'),
      ],
      icon: ClipboardList,
    },
    {
      id: 'detail-engineering',
      title: t('servicesSection.pillars.engineeringDeliverables.title', 'Engineering Deliverables'),
      subtitle: t('servicesSection.pillars.engineeringDeliverables.subtitle', 'Process to 3D Modelling'),
      description: t('servicesSection.pillars.engineeringDeliverables.description', 'Process, piping, mechanical, electrical, instrumentation, and 3D modelling deliverables across the project lifecycle.'),
      highlights: [
        t('servicesSection.pillars.engineeringDeliverables.h1', 'Process'),
        t('servicesSection.pillars.engineeringDeliverables.h2', 'Piping'),
        t('servicesSection.pillars.engineeringDeliverables.h3', 'Mechanical'),
        t('servicesSection.pillars.engineeringDeliverables.h4', '3D Modelling'),
      ],
      icon: Ruler,
    },
    {
      id: 'execution-support',
      title: t('servicesSection.pillars.dai.title', 'DAI & Execution Support'),
      subtitle: t('servicesSection.pillars.dai.subtitle', 'Design Interface & Field Support'),
      description: t('servicesSection.pillars.dai.description', 'Design interface management, vendor coordination, engineering documentation, and field support to keep delivery moving.'),
      highlights: [
        t('servicesSection.pillars.dai.h1', 'Interface Mgmt.'),
        t('servicesSection.pillars.dai.h2', 'Vendor Coordination'),
        t('servicesSection.pillars.dai.h3', 'Documentation'),
        t('servicesSection.pillars.dai.h4', 'Field Support'),
      ],
      icon: HardHat,
    },
  ];

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <section className="relative w-full bg-white py-12 lg:py-16 overflow-hidden flex flex-col justify-center min-h-[auto] lg:min-h-[85vh]">
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#071B34 1px, transparent 1px), linear-gradient(90deg, #071B34 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        aria-hidden="true" 
      />

      <div className="relative mx-auto max-w-[1400px] w-full px-6 lg:px-12 flex flex-col items-center">
        
        {/* COMPACT HEADER */}
        <div className="text-center mb-10 w-full max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-6 h-[2px] bg-[#F25C19]" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F25C19]">
              {t('servicesSection.badge', 'Core Capabilities')}
            </span>
            <span className="w-6 h-[2px] bg-[#F25C19]" />
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-[#071B34] mb-3 leading-tight">
            {t('servicesSection.pillarsHeadingPrefix', 'Pillars of')} <span className="text-[#F25C19]">{t('servicesSection.pillarsHeadingSuffix', 'PCE BV')}</span>
          </h2>

          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">
            {t('servicesSection.pillarsDescription', 'Integrated capabilities and disciplined execution delivering control, clarity, and results across every phase.')}
          </p>
        </div>

        {/* HIGH-DENSITY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onClick={() => handleNavigation(ROUTES.services || '/services')}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden cursor-pointer outline-none focus:ring-2 focus:ring-[#F25C19] focus:ring-offset-2"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#F25C19] transition-colors duration-300" />

                {/* CARD HEADER */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#071B34] group-hover:bg-[#F25C19] group-hover:text-white group-hover:border-[#F25C19] transition-colors duration-300">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5 group-hover:text-[#F25C19] transition-colors">
                      {pillar.subtitle}
                    </h4>
                    <h3 className="text-xl font-extrabold text-[#071B34] tracking-tight leading-none">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-[13px] text-slate-600 leading-relaxed mb-5 flex-grow">
                  {pillar.description}
                </p>

                {/* HIGHLIGHTS AS PILLS */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pillar.highlights.map((highlight) => (
                    <span 
                      key={highlight} 
                      className="px-2.5 py-1 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-md group-hover:border-slate-200 transition-colors"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* FOOTER ACTION */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation(); // Stops event bubbling so card click doesn't trigger
                    handleNavigation(ROUTES.contact || '/contact');
                  }}
                  className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between group-hover:border-slate-200 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-extrabold text-[#071B34] uppercase tracking-wider group-hover:text-[#F25C19] transition-colors">
                    {t('servicesSection.requestConsultation', 'Request Consultation')}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#F25C19]/10 transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#071B34] group-hover:text-[#F25C19] transform group-hover:translate-x-0.5 transition-all" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}