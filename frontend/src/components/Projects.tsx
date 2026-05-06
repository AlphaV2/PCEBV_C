import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ZoomIn, Loader2, Database, Briefcase, Settings } from 'lucide-react';
import { Project } from '../../types';
import { PROJECTS as STATIC_PROJECTS } from '../../constants';
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const resolveImageSrc = (img?: string) => {
    // If no image provided, we will render a background placeholder (see EXAMPLE_PROJECT_BG below)
    if (!img) return '/background/bg1.jpg';
    if (/^https?:\/\//.test(img)) return img;
    if (img.startsWith('/')) return img;
    return `/projects/${img}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      let loadedProjects: Project[] = [];
      try {
        const response = await fetch(`${API_BASE_URL}/getprojects.php`);
        if (!response.ok) throw new Error('Network error or invalid status.');

        const json = await response.json();
        if (json.status === true && Array.isArray(json.data) && json.data.length > 0) {
          loadedProjects = json.data;
        } else {
          console.warn('API returned empty data. Using static fallback.');
          loadedProjects = STATIC_PROJECTS as Project[];
        }
      } catch (error) {
        console.warn('API fetch failed or encountered an error:', error);
        loadedProjects = STATIC_PROJECTS as Project[];
      } finally {
        setProjects(loadedProjects);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_BASE_URL]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // fallback to a known existing background image in public/background/
    e.currentTarget.src = '/background/bg1.jpg';
  };

  // Example background image paths (place your card backgrounds here):
  // - public/projects/project-1.jpg
  // - public/projects/project-2.jpg
  // - public/projects/project-3.jpg
  // - public/projects/project-4.jpg
  // In code below we will use `/projects/${project.id || index + 1}.jpg` if project.image is not provided.

  if (loading) {
    return (
      <section className="py-32 bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          {t('projects.loadingDeployments', 'Loading Project Data...')}
        </p>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-[10px] font-black tracking-widest text-blue-700 uppercase bg-blue-100/50 rounded-full border border-blue-200">
            <Database size={12} /> {t('projects.badge', 'Portfolio')}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            {t('projects.heading', 'Execution in the Field')}
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">
            {t('projects.subheading', 'Explore our recent engagements across detailed engineering, project controls, and EPC execution support.')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, idx) => {
            // Replaced "Drone" logic with EPC relevant logic
            const isEngineering = project.category?.toLowerCase().includes('engineering');

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                {/* Image Section */}
                <div className="h-48 overflow-hidden relative shrink-0 bg-slate-100">
                  {/* If a project image exists, render it; otherwise use a background image from public/projects/ */}
                  {project.image ? (
                    <img
                      src={resolveImageSrc(project.image)}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
                      onError={handleImageError}
                    />
                  ) : (
                    <div
                      aria-hidden
                      style={{ backgroundImage: `url(/projects/${project.id || idx + 1}.jpg)` }}
                      className="w-full h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest text-slate-900 border border-slate-200 shadow-sm z-10 flex items-center gap-1.5">
                    {isEngineering ? (
                      <Settings size={10} className="text-orange-500" />
                    ) : (
                      <Briefcase size={10} className="text-blue-600" />
                    )}
                    {project.category || 'Project'}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <ZoomIn className="text-white" size={18} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-black text-slate-900 mb-2 flex items-start justify-between group-hover:text-blue-600 transition-colors leading-tight">
                    <span className="line-clamp-2 pr-2">{project.title}</span>
                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 mt-0.5" />
                  </h3>
                  
                  <p className="text-slate-600 text-xs leading-relaxed mb-5 line-clamp-3 font-medium">
                    {project.description}
                  </p>

                  {/* Metrics Array */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                      {project.metrics.slice(0, 2).map((metric: string, idx: number) => (
                        <div key={idx} className="bg-slate-50 px-2 py-2 rounded-lg border border-slate-100">
                          <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                            {t('projects.metric', 'Highlight')}
                          </div>
                          <div className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight" title={metric}>
                            {metric}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;