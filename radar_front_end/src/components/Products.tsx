import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ZoomIn, Loader2 } from 'lucide-react';
import { Project } from '../../types';
import { PROJECTS as STATIC_PROJECTS } from '../../constants'; // Fallback
import ProjectModal from './ProjectModal'; // Your existing Modal

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Get API URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log(`Fetching projects: ${API_BASE_URL}/getprojects.php`);
        const response = await fetch(`${API_BASE_URL}/getprojects.php`);
        
        if (!response.ok) throw new Error("Network error");
        
        const json = await response.json();
        
        if (json.status === true && Array.isArray(json.data) && json.data.length > 0) {
          setProjects(json.data);
        } else {
          setProjects(STATIC_PROJECTS as Project[]);
        }
      } catch (error) {
        console.warn("Using static projects:", error);
        setProjects(STATIC_PROJECTS as Project[]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/800x600?text=Project+Image';
  };

  if (loading) {
    return (
      <section id="projects" className="py-10 md:py-12 bg-slate-50 text-center scroll-mt-28">
          <Loader2 className="animate-spin inline-block text-blue-600" size={28} /> {/* Reduced size */}
      </section>
    );
  }

  return (
    <section id="projects" className="py-10 md:py-12 bg-slate-50 scroll-mt-28"> {/* Reduced vertical padding */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6"> {/* Reduced bottom margin */}
          <div>
              <div className="inline-block px-2 py-0.5 mb-1 text-[9px] font-bold tracking-widest text-slate-500 uppercase bg-white rounded-md border border-slate-200 shadow-sm"> {/* Reduced padding and font size */}
                Track Record
              </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1"> {/* Reduced font size and bottom margin */}
              Deployed in the Field
            </h2>
            <p className="text-slate-500 text-xs max-w-lg"> {/* Reduced font size and max-width */}
              Real-world implementations of our security architecture.
            </p>
          </div>
        </div>

        {/* 2. Render Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:border-blue-400/30 transition-all duration-500 flex flex-col cursor-pointer relative"
            >
              {/* ⬇️ Reduced Image Height ⬇️ */}
              <div className="h-32 overflow-hidden relative">
                 <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-90"
                    onError={handleImageError}
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wide text-slate-800 z-10"> {/* Reduced padding and font size */}
                    {project.category}
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50"> {/* Reduced size */}
                       <ZoomIn className="text-white" size={16} /> {/* Reduced icon size */}
                     </div>
                  </div>
              </div>
              
              {/* ⬇️ Reduced Card Padding ⬇️ */}
              <div className="p-3 flex-1 flex flex-col">
                {/* ⬇️ Reduced Title Font Size ⬇️ */}
                <h3 className="text-xs font-bold text-slate-900 mb-1 flex items-center justify-between group-hover:text-blue-600 transition-colors">
                  {project.title}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" /> {/* Reduced icon size */}
                </h3>
                {/* ⬇️ Reduced Description Font Size/Leading ⬇️ */}
                <p className="text-slate-500 text-[10px] leading-snug mb-2 line-clamp-3">
                  {project.description}
                </p>
                
                {/* ⬇️ Reduced Metric Section Spacing and Fonts ⬇️ */}
                <div className="mt-auto pt-2 border-t border-slate-100 grid grid-cols-3 gap-0.5">
                   {project.metrics?.slice(0,3).map((metric: string, idx: number) => (
                     <div key={idx} className="text-center">
                       <div className="text-[7px] uppercase font-bold text-slate-400 mb-0.5">Metric</div>
                       <div className="text-[8px] font-bold text-slate-800 bg-slate-50 py-0.5 rounded group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors truncate px-0.5">{metric}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Render Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;