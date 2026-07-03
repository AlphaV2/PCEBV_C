import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Loader2, Database, Briefcase, Settings, ArrowLeft, ChevronDown } from 'lucide-react';
import { Project } from '../../types';
import { PROJECTS as STATIC_PROJECTS } from '../../constants';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const resolveImageSrc = (img?: string, idx: number = 0) => {
    const bgFallback = `/background/bg${(idx % 3) + 1}.webp`;
    if (!img) return bgFallback;

    const raw = String(img).trim();
    if (!raw || raw.toLowerCase() === 'null' || raw.toLowerCase() === 'undefined') {
      return bgFallback;
    }

    // Fully-qualified URLs should be used directly.
    if (/^https?:\/\//i.test(raw)) return raw;

    // Public folder absolute paths (e.g. /background/bg1.webp) can be used directly.
    if (raw.startsWith('/')) return raw;

    const normalized = raw.replace(/^\.\/?/, '');

    // Backend data often stores uploads as relative paths such as "uploads/x.jpg".
    // Convert API base (/api) to site root and point to the backend asset URL.
    if (normalized.startsWith('uploads/')) {
      const backendRoot = (API_BASE_URL || '').replace(/\/api\/?$/i, '');
      return backendRoot ? `${backendRoot}/${normalized}` : `/${normalized}`;
    }

    // If API sends public-like paths without a leading slash, normalize them.
    if (/^(background|founderprofile|logo|pillar|gallery)\//i.test(normalized)) {
      return `/${normalized}`;
    }

    // Last resort: treat image as a bare filename and map to local background fallback.
    return bgFallback;
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, idx?: number) => {
    const choice = typeof idx === 'number' ? (idx % 3) + 1 : 1;
    e.currentTarget.src = `/background/bg${choice}.webp`;
  };

  const hasSensitiveText = (value?: string) => !!value && /(client|cost|contract|revenue|billing|invoice|internal|identifier|ref\.?|\$|€|£)/i.test(value);

  const getSafeTitle = (project: Project) => {
    return hasSensitiveText(project.title) ? t('projects.selectedProject', 'Selected Engineering Project') : project.title;
  };

  const getSafeDescription = (project: Project) => {
    return hasSensitiveText(project.description)
      ? t('projects.overviewDefault', 'Representative engineering delivery with a focus on scope, discipline coordination, and deliverable quality.')
      : project.description;
  };

  const getSafeBullets = (items?: string[], fallback?: string[]) => {
    const cleaned = (items || []).filter((item) => !hasSensitiveText(item));
    return cleaned.length > 0 ? cleaned : (fallback || []);
  };

  const disciplineItems = [
    t('projects.disciplineProcess', 'Process'),
    t('projects.disciplinePiping', 'Piping'),
    t('projects.disciplineMechanical', 'Mechanical'),
    t('projects.disciplineElectrical', 'Electrical'),
    t('projects.disciplineInstrumentation', 'Instrumentation'),
  ];

  const capabilityItems = [
    t('projects.capabilityCoordination', 'Interface coordination'),
    t('projects.capabilityDocumentControl', 'Document control discipline'),
    t('projects.capabilityQuality', 'Quality review and consistency checks'),
    t('projects.capabilityExecution', 'Execution support across work packages'),
  ];

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

        <div className="lg:hidden space-y-4">
          {projects.map((project, idx) => {
            const isSelected = selectedProject?.id === project.id;

            if (selectedProject && !isSelected) return null;

            return (
              <article
                key={project.id}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${isSelected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(isSelected ? null : project)}
                  className="block w-full text-left"
                  aria-expanded={isSelected}
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    {project.image ? (
                      <img
                        src={resolveImageSrc(project.image, idx)}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(e) => handleImageError(e, idx)}
                      />
                    ) : (
                      <div aria-hidden style={{ backgroundImage: `url(/background/bg${(idx % 3) + 1}.webp)` }} className="h-full w-full bg-cover bg-center" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-[0.24em] text-slate-700">
                      {t('projects.tapToExpand', 'Tap to expand')}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-black text-white leading-tight">{getSafeTitle(project)}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/85 line-clamp-2">{getSafeDescription(project)}</p>
                    </div>
                  </div>
                </button>

                {isSelected && (
                  <div className="space-y-5 p-5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(null)}
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-[10px] font-black uppercase tracking-[0.22em] text-slate-900 shadow-sm"
                    >
                      <ArrowLeft size={14} />
                      {t('projects.back', 'Back')}
                    </button>

                    <DetailBlock
                      title={t('projects.overview', 'Overview')}
                      items={[getSafeDescription(project)]}
                    />

                    <DetailBlock
                      title={t('projects.scope', 'Engineering Scope')}
                      items={getSafeBullets(project.fullDetails?.solution, [t('projects.scopeDefault', 'Representative multidisciplinary engineering delivery.')])}
                    />

                    <DetailBlock
                      title={t('projects.disciplines', 'Disciplines Involved')}
                      items={disciplineItems}
                    />

                    <DetailBlock
                      title={t('projects.deliverables', 'Deliverables')}
                      items={getSafeBullets(project.fullDetails?.impact, [t('projects.deliverablesDefault', 'Technical deliverables aligned with project governance.')])}
                    />

                    <DetailBlock
                      title={t('projects.capabilities', 'Key Engineering Capabilities')}
                      items={capabilityItems}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="hidden lg:grid gap-6 lg:grid-cols-[0.92fr_1.08fr] items-start">
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 ${selectedProject ? 'lg:opacity-95' : ''}`}>
          {projects.map((project, idx) => {
            const isEngineering = project.category?.toLowerCase().includes('engineering');

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group flex flex-col bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${selectedProject?.id === project.id ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                {/* Image Section */}
                <div className="h-48 overflow-hidden relative shrink-0 bg-slate-100">
                  {/* If a project image exists, render it; otherwise use a background image from public/projects/ */}
                  {project.image ? (
                    <img
                      src={resolveImageSrc(project.image, idx)}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform"
                      onError={(e) => handleImageError(e, idx)}
                    />
                  ) : (
                    <div
                      aria-hidden
                      // If there is no project image, use one of the existing public/background/bg*.webp
                      // files (bg1/bg2/bg3). This avoids referencing a non-existent /projects/ folder.
                      style={{ backgroundImage: `url(/background/bg${(idx % 3) + 1}.webp)` }}
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

                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-base font-black text-slate-900 mb-2 flex items-start justify-between group-hover:text-blue-600 transition-colors leading-tight">
                    <span className="line-clamp-2 pr-2">{getSafeTitle(project)}</span>
                    <ArrowUpRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 mt-0.5" />
                  </h3>
                  
                  <p className="text-slate-600 text-xs leading-relaxed mb-5 line-clamp-3 font-medium">
                    {getSafeDescription(project)}
                  </p>
                </div>
              </div>
            );
          })}
          </div>

          <div className="lg:sticky lg:top-28">
            {selectedProject ? (
              <article className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                <div className="relative h-56 sm:h-72 bg-slate-100">
                  <img
                    src={resolveImageSrc(selectedProject.image, 0)}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => handleImageError(e)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-slate-900 shadow-lg"
                  >
                    <ArrowLeft size={14} />
                    {t('projects.back', 'Back')}
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#F25C19]">
                      {t('projects.detailsBadge', 'Selected Project')}
                    </p>
                    <h3 className="mt-2 text-2xl font-black leading-tight">{getSafeTitle(selectedProject)}</h3>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400 mb-2">{t('projects.overview', 'Overview')}</h4>
                    <p className="text-sm leading-relaxed text-slate-600">{getSafeDescription(selectedProject)}</p>
                  </div>

                  <DetailBlock
                    title={t('projects.scope', 'Engineering Scope')}
                    items={getSafeBullets(selectedProject.fullDetails?.solution, [t('projects.scopeDefault', 'Representative multidisciplinary engineering delivery.')])}
                  />

                  <DetailBlock
                    title={t('projects.disciplines', 'Disciplines Involved')}
                    items={disciplineItems}
                  />

                  <DetailBlock
                    title={t('projects.deliverables', 'Deliverables')}
                    items={getSafeBullets(selectedProject.fullDetails?.impact, [t('projects.deliverablesDefault', 'Technical deliverables aligned with project governance.')])}
                  />

                  <DetailBlock
                    title={t('projects.capabilities', 'Key Engineering Capabilities')}
                    items={capabilityItems}
                  />
                </div>
              </article>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500 shadow-sm">
                {t('projects.selectPrompt', 'Select a project to view its engineering scope and deliverables.')}
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Projects;

function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400 mb-2">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#F25C19] shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}