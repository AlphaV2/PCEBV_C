
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, ZoomIn } from 'lucide-react';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Project+Image+Unavailable';
  };

  return (
    <section id="projects" className="py-12 md:py-16 bg-slate-50 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div>
             <div className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase bg-white rounded-md border border-slate-200 shadow-sm">
              Track Record
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Deployed in the Field
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Real-world implementations of our security architecture.
            </p>
          </div>
        </div>

        {/* Grid Updated: 4 columns on LG screens, compact sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECTS.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] hover:border-green-400/30 transition-all duration-500 flex flex-col cursor-pointer relative"
            >
              {/* Reduced Image Height */}
              <div className="h-40 overflow-hidden relative">
                 <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-75"
                   onError={handleImageError}
                 />
                 <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide text-slate-800 z-10">
                   {project.category}
                 </div>
                 
                 {/* Hover Overlay Icon */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                      <ZoomIn className="text-white" size={20} />
                    </div>
                 </div>
              </div>
              
              {/* Compact Padding */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between group-hover:text-primary transition-colors">
                  {project.title}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-500" />
                </h3>
                <p className="text-slate-500 text-[11px] leading-relaxed mb-3 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-3 border-t border-slate-100 grid grid-cols-3 gap-1">
                   {project.metrics?.slice(0,3).map((metric, idx) => (
                     <div key={idx} className="text-center">
                       <div className="text-[8px] uppercase font-bold text-slate-400 mb-0.5">Metric</div>
                       <div className="text-[9px] font-bold text-slate-800 bg-slate-50 py-0.5 rounded group-hover:bg-green-50 group-hover:text-green-700 transition-colors truncate px-1">{metric}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;
