import React from 'react';
import { useTranslation } from 'react-i18next';
import { Database, ArrowRight, Layers3 } from 'lucide-react';
import Projects from '../components/Projects';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Premium Cinematic Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
        {/* Background Textures */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.4),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(255,106,42,0.4),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center max-w-6xl mx-auto">
            
            {/* Left: Headline & Copy */}
            <div className="max-w-2xl">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                {t('projects.badge', 'Track Record')}
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                {t('projects.heading', 'Past and ongoing project experience.')}
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300 font-medium">
                {t('projects.subheading', 'Selected references from engineering, estimation, and project controls engagements. We keep the focus on real-world outcomes and deliverable quality.')}
              </p>
              
              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects-grid" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                  <Database size={16} /> {t('projects.viewProjects', 'View Projects')}
                </a>
                <a href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-slate-900 transition-all active:scale-95">
                  <Layers3 size={16} /> {t('projects.servicesCta', 'Services')}
                </a>
              </div>
            </div>

            {/* Right: Quick Stats */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {[
                { label: t('projects.stats.activeReferences', 'Active References'), value: '12+', color: 'blue' },
                { label: t('projects.stats.globalDelivery', 'Global Delivery'), value: 'Multi-Region', color: 'orange' },
                { label: t('projects.stats.coreFocus', 'Core Focus'), value: 'EPC Lifecycle', color: 'slate' },
              ].map((item, idx) => (
                <div key={item.label} className="rounded-2xl p-5 border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* The Grid Component */}
      <div id="projects-grid" className="scroll-mt-24">
        <Projects />
      </div>
    </div>
  );
};

export default ProjectsPage;