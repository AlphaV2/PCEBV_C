
import React from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=Image+Unavailable';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up border border-slate-700" onClick={e => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-50 backdrop-blur-sm border border-white/10"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>

        {/* Hero Section within Modal */}
        <div className="relative h-64 md:h-80 shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h2>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              {project.fullDetails?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  {project.fullDetails.location}
                </div>
              )}
              {project.fullDetails?.duration && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {project.fullDetails.duration}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-900 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Case Study Text */}
            <div className="lg:col-span-2 space-y-8">
              {project.fullDetails?.challenge && (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-500 rounded-full"></span>
                    The Challenge
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {project.fullDetails.challenge}
                  </p>
                </div>
              )}

              {project.fullDetails?.solution && (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Our Solution
                  </h3>
                  <ul className="space-y-4">
                    {project.fullDetails.solution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.fullDetails?.impact && (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                    The Impact
                  </h3>
                  <ul className="space-y-4">
                    {project.fullDetails.impact.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-green-500 mt-0.5 shrink-0" />
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {project.fullDetails?.client && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                  <h4 className="font-bold text-white mb-4 relative z-10">Project Client</h4>
                  <p className="text-xl text-blue-200 font-mono mb-2 relative z-10">{project.fullDetails.client}</p>
                  <p className="text-sm text-slate-400 relative z-10">Strategic Partner</p>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
                 <h4 className="font-bold text-white mb-4">Key Metrics</h4>
                 <div className="space-y-3">
                    {project.metrics?.map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-900 rounded border border-slate-700">
                         <span className="text-slate-400 text-xs">Result</span>
                         <span className="text-green-400 font-bold text-sm">{metric}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <a 
                href={`https://wa.me/?text=Hi, I'd like to discuss the ${encodeURIComponent(project.title)} case study.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 group"
              >
                <MessageCircle size={20} />
                Discuss this Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
