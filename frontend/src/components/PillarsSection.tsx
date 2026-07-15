import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../config';

type Pillar = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
};

export default function PillarsSection(): React.ReactElement {
  const { t } = useTranslation();

  const pillars: Pillar[] = [
    {
      id: 'project-controls',
      title: t('servicesSection.pillars.projectControls.title', 'Project Controls'),
      subtitle: t('servicesSection.pillars.projectControls.subtitle', 'Disciplined Governance'),
      description: t('servicesSection.pillars.projectControls.description', 'Planning, scheduling, cost control, risk management, and progress tracking for disciplined delivery.'),
      highlights: [t('servicesSection.pillars.projectControls.h1'),t('servicesSection.pillars.projectControls.h2'),  t('servicesSection.pillars.projectControls.h3'),],},
    {
      id: 'detail-engineering',
      title: t('servicesSection.pillars.engineeringDeliverables.title', 'Engineering Design'),
      subtitle: t('servicesSection.pillars.engineeringDeliverables.subtitle', 'Multi-Discipline Precision'),
      description: t('servicesSection.pillars.engineeringDeliverables.description', 'Process, piping, mechanical, electrical, instrumentation, and 3D modelling deliverables across the project lifecycle.'),
      highlights: ['Multidisciplinary Design', '3D Modelling', 'QA/QC Delivery'],
    },
    {
      id: 'execution-support',
      title: t('servicesSection.pillars.dai.title', 'Digital Asset Intelligence'),
      subtitle: t('servicesSection.pillars.dai.subtitle', 'Engineering Data Transformation'),
      description: t('servicesSection.pillars.dai.description', 'Transforming legacy engineering information into structured digital assets for revamps, maintenance, and future project cycles.'),
      highlights: ['Legacy Digitization', 'Vendor Integration', 'Digital Twin Ready'],
    },
  ];

  return (
    <section className="relative w-full py-16 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1200px] px-6">
        
        {/* Header - Compact & Clean */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F25C19] mb-3 block">
            {t('servicesSection.badge', 'Core Capabilities')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#071B34] mb-4 tracking-tight">
            {t('servicesSection.pillarsHeadingPrefix', 'Pillars of')} <span className="text-[#F25C19]">{t('servicesSection.pillarsHeadingSuffix', 'PCE BV')}</span>
          </h2>
          <p className="text-sm lg:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t('servicesSection.pillarsDescription', 'Integrated engineering, controls, and documentation services delivering clarity across every phase.')}
          </p>
        </div>

        {/* Grid - Clean & Consistent */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => window.location.href = ROUTES.services}
              className="group bg-white border border-[#E2E8F0] rounded-lg p-6 lg:p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col relative overflow-hidden"
            >
              {/* Top Accent - Architectural Anchor */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#F25C19]" />

              {/* Header */}
              <div className="mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#F25C19] mb-1">
                  {pillar.subtitle}
                </h4>
                <h3 className="text-2xl font-extrabold text-[#071B34] tracking-tight">
                  {pillar.title}
                </h3>
              </div>

              {/* Description - Optimized for Readability */}
              <p className="text-[16px leading-8] text-slate-600 leading-[1.7] mb-8 flex-grow">
                {pillar.description}
              </p>

              {/* Highlights - Compact Chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {pillar.highlights.map((feat) => (
                  <span key={feat} className="bg-[#F8FAFC] border border-[#E2E8F0] text-[#1E293B] font-semibold text-[11px] px-3 py-1.5 rounded-full">
                    {feat}
                  </span>
                ))}
              </div>

              {/* CTA - Text Only, Elegant */}
              <div className="text-[12px] font-bold text-[#143A63] group-hover:text-[#F25C19] transition-colors uppercase tracking-wider">
                {t('servicesSection.explore', 'Explore Solutions')} →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}