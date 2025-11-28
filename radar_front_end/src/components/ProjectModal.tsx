import React from 'react';
import { Project } from '../../types';
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
      {/* MODIFIED: Reduced max-w-3xl for compact feel */}
      <div className="bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up border border-slate-700" onClick={e => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-50 backdrop-blur-sm border border-white/10" // Reduced padding
          aria-label="Close Modal"
        >
          <X size={16} /> {/* Reduced icon size */}
        </button>

        {/* Hero Section - ⬇️ Reduced height ⬇️ */}
        <div className="relative h-32 sm:h-36 shrink-0 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-4"> {/* Reduced padding */}
            <div className="flex items-center gap-2 mb-1">
              <span className="px-1.5 py-0.5 bg-green-500/20 text-green-300 border border-green-500/30 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"> {/* Reduced padding and font size */}
                {project.category}
              </span>
            </div>
            {/* ⬇️ Reduced Title Size ⬇️ */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h2>
            
            <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs"> {/* Reduced gap */}
              {project.fullDetails?.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-blue-500" /> {/* Reduced icon size */}
                  {project.fullDetails.location}
                </div>
              )}
              {project.fullDetails?.duration && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} className="text-blue-500" /> {/* Reduced icon size */}
                  {project.fullDetails.duration}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Scroll Area - ⬇️ Reduced Padding and Gap ⬇️ */}
        <div className="flex-1 overflow-y-auto p-5 bg-slate-800 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Challenges & Solutions */}
            <div className="space-y-5"> {/* Reduced space */}
              {project.fullDetails?.challenge && (
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"> {/* Reduced padding and rounded corners */}
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"> {/* Reduced font size and margin */}
                    <span className="w-0.5 h-3 bg-red-500 rounded-full"></span> {/* Reduced marker size */}
                    The Challenge
                  </h3>
                  <p className="text-slate-300 text-xs leading-snug"> {/* Reduced font size and leading */}
                    {project.fullDetails.challenge}
                  </p>
                </div>
              )}

              {project.fullDetails?.solution && (
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"> {/* Reduced font size and margin */}
                    <span className="w-0.5 h-3 bg-blue-500 rounded-full"></span> {/* Reduced marker size */}
                    Solution
                  </h3>
                  <ul className="space-y-1.5"> {/* Reduced space */}
                    {project.fullDetails.solution.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs"> {/* Reduced font size */}
                        <div className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0"></div> {/* Reduced dot size */}
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Impact & Metrics */}
            <div className="space-y-5"> {/* Reduced space */}
               {/* Client Info - ⬇️ Reduced Padding and Font Size ⬇️ */}
               {project.fullDetails?.client && (
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Client</p>
                  <p className="text-base text-white font-bold">{project.fullDetails.client}</p>
                </div>
              )}

              {project.fullDetails?.impact && (
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"> {/* Reduced font size and margin */}
                    <span className="w-0.5 h-3 bg-green-500 rounded-full"></span> {/* Reduced marker size */}
                    Impact
                  </h3>
                  <ul className="space-y-1.5"> {/* Reduced space */}
                    {project.fullDetails.impact.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs"> {/* Reduced gap and font size */}
                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {/* Reduced icon size */}
                        <span className="text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ⬇️ Reduced CTA Padding and Icon Size ⬇️ */}
              <a 
                href={`WHATSAPP_LINK, I'd like to discuss the ${encodeURIComponent(project.title)} case study.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 group text-sm"
              >
                <MessageCircle size={16} />
                Discuss Case Study
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal