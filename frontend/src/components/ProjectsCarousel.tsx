import React from 'react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import HOMEPAGE_CONFIG from '../config/homepage.config';

const ProjectsCarousel: React.FC = () => {
  const { projects } = HOMEPAGE_CONFIG;

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-12 md:py-16 scroll-mt-28">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: HOMEPAGE_CONFIG.colors.primary_blue }}>Portfolio</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">{projects.title}</h2>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">{projects.subtitle}</p>
        </div>

        {/* Compact Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mb-8">
          {projects.items.map((project, idx) => (
            <a
              key={idx}
              href="/projects"
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              aria-label={`View project: ${project.name}`}
            >
              {/* Image Container - Compact Aspect */}
              <div className="relative aspect-video overflow-hidden bg-slate-200">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent" />
                
                {/* Project Badge */}
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-slate-700">
                  Project {idx + 1}
                </div>

                {/* Info Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-sm font-bold text-white line-clamp-1">{project.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-white/85">
                    <MapPin size={12} />
                    <span className="line-clamp-1">{project.location}</span>
                  </div>
                </div>

                {/* Arrow Icon on Hover */}
                <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-md"
            style={{ backgroundColor: HOMEPAGE_CONFIG.colors.primary_blue }}
          >
            View All Projects <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
