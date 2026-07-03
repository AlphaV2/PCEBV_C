import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight, ArrowLeft, X, Layers, Briefcase } from 'lucide-react';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { ROUTES } from '../config';

interface ProjectsCarouselProps {
  isHomepage?: boolean; // Controls header visibility and project limits
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ isHomepage = true }) => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Home Page gets only top 3, Projects Page displays all 10 entries dynamically
  const projectIds = isHomepage 
    ? ['project1', 'project2', 'project3']
    : ['project1', 'project2', 'project3', 'project4', 'project5', 'project6', 'project7', 'project8', 'project9', 'project10'];

  // Prevent background viewport scroll leak when overlay slides open
  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeId]);

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  const highlightKeywords = (text: string) => {
    const keywords = [
      "detail engineering", "multi-discipline coordination", "3D Plant Models", "As-Built", "P&ID optimization", "clash detection",
      "process execution design models", "infrastructure modifications", "Stress calculation", "dynamic loading", "piping material takeoff",
      "vendor equipment modules", "isometric documentation matrices", "equipment layout", "estimation manifests",
      "project execution coordination", "delivery governance validation", "multi-discipline design engineering",
      "engineering interface checkouts", "licensor designs", "detailed drawings review", "constructability tracking",
      "Construction coordination records", "field installation checklists", "operational commissioning support"
    ];
    
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="font-bold text-slate-900">$1</span>');
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <section id="projects" className={`relative overflow-hidden bg-white scroll-mt-28 ${isHomepage ? 'py-12 md:py-16' : 'py-6 pb-16'}`}>
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Render headers ONLY if accessed from the Homepage layout section context */}
        {isHomepage && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: HOMEPAGE_CONFIG.colors.primary_blue }}>
              {t('projects.badge')}
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {t('projects.heading')}
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              {t('projects.subheading')}
            </p>
          </div>
        )}

        {/* Portfolio Stacking Matrix Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-8">
          {projectIds.map((id, idx) => {
            const imageBg = `/background/bg${(idx % 3) + 1}.webp`;

            return (
              <div
                key={id}
                onClick={() => setActiveId(id)}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-200">
                  <img
                    src={imageBg}
                    alt={t(`projects.items.${id}.name`)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-slate-700 shadow-xs">
                    {t(`projects.items.${id}.status`)}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-sm font-bold tracking-tight">{t(`projects.items.${id}.name`)}</h3>
                    <p className="text-[10px] text-white/70 mt-1 flex items-center gap-1">
                      {t('projects.tapToExpand')}
                    </p>
                  </div>

                  <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-xs">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side Panel Overlay Workspace Drawer */}
        {activeId && (
          <div 
            className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex justify-end animate-fade-in"
            onClick={() => setActiveId(null)}
          >
            <div 
              className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col relative border-l border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                <button 
                  onClick={() => setActiveId(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-200/70"
                >
                  <ArrowLeft size={14} />
                  {t('projects.back', 'Back')}
                </button>
                
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-md">
                  <Briefcase size={12} className="text-blue-600" />
                  <span className="text-[9px] font-black tracking-widest text-blue-600 uppercase">
                    {t(`projects.items.${activeId}.status`)}
                  </span>
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-5 text-slate-700 custom-scrollbar bg-white">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {t(`projects.items.${activeId}.name`)}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-inner">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('projects.overview')}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {highlightKeywords(t(`projects.items.${activeId}.description`))}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('projects.scope')}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {highlightKeywords(t(`projects.items.${activeId}.scope`))}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t('projects.deliverables')}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {highlightKeywords(t(`projects.items.${activeId}.deliverables`))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between">
                <button onClick={() => setActiveId(null)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  <X size={14} /> {t('projects.back', 'Close Details')}
                </button>
                <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>PCE BV Portfolio</span>
                  <Layers size={12} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Button Context Switcher */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleNavigation(isHomepage ? (ROUTES.projects || '/projects') : (ROUTES.contact || '/contact'))}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:shadow-lg hover:scale-102"
            style={{ backgroundColor: HOMEPAGE_CONFIG.colors.primary_blue }}
          >
            {isHomepage ? t('navbar.projects', 'Explore Projects') : t('projects.contactCta', 'Request Consultation')} 
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProjectsCarousel;