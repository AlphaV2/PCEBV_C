import React from 'react';
import { Database, ArrowRight, Layers3 } from 'lucide-react';
import Projects from '../components/Projects';

const ProjectsPage: React.FC = () => {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-white pt-28 pb-12 sm:pt-32 sm:pb-14">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
        <div className="absolute left-0 top-14 h-64 w-64 rounded-full bg-[#0071E3]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#FF6A2A]/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0071E3]">Projects</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Past and ongoing project experience
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                Selected references from engineering, estimation, and project controls engagements. The page keeps the focus on outcomes, not clutter.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: 'References', value: '4' },
                { label: 'Delivery', value: 'Multi-region' },
                { label: 'Style', value: 'Compact cards' },
              ].map((item, idx) => (
                <div key={item.label} className={`rounded-[1.5rem] p-4 shadow-sm ${idx === 1 ? 'bg-slate-950 text-white' : idx === 2 ? 'bg-[#EEF6FF] text-slate-900 border border-blue-100' : 'bg-white text-slate-900 border border-slate-200'}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-70">{item.label}</p>
                  <p className="mt-3 text-lg font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700 hover:border-[#0071E3] hover:text-[#0071E3]">
              <Database className="h-4 w-4" /> Project track record
            </a>
            <a href="/services" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700 hover:border-[#0071E3] hover:text-[#0071E3]">
              <Layers3 className="h-4 w-4" /> View services
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-[#0056A3]">
              <ArrowRight className="h-4 w-4" /> Discuss a project
            </a>
          </div>
        </div>
      </section>

      <Projects />
    </div>
  );
};

export default ProjectsPage;