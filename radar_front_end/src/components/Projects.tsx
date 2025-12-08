import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ZoomIn, Loader2, Database, Shield, Zap } from 'lucide-react';
import { Project } from '../../types'; 
// Fallback data
import { PROJECTS as STATIC_PROJECTS } from '../../constants'; 
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
    // 🚨 FIX 1: Initialize projects with an empty array 🚨
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProjects = async () => {
            let loadedProjects: Project[] = []; // Temporary variable to hold the final data list

            try {
                const response = await fetch(`${API_BASE_URL}/getprojects.php`);
                
                if (!response.ok) {
                    throw new Error("Network error or invalid status.");
                }
                
                const json = await response.json();
                
                if (json.status === true && Array.isArray(json.data) && json.data.length > 0) {
                    // Success: Use API data
                    loadedProjects = json.data;
                } else {
                    // API returned successfully but with no valid data or empty array, fall back
                    console.warn("API returned empty data. Using static fallback.");
                    loadedProjects = STATIC_PROJECTS as Project[];
                }
            } catch (error) {
                // Network or other error, fall back to static data
                console.warn("API fetch failed or encountered an error:", error);
                loadedProjects = STATIC_PROJECTS as Project[];
            } finally {
                // 🚨 FIX 2: Set the state once inside the finally block 🚨
                setProjects(loadedProjects);
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
            <section id="projects" className="py-20 bg-slate-50 text-center">
                 <Loader2 className="animate-spin inline-block text-blue-600" size={32} />
                 <p className="text-slate-500 font-medium mt-2">Loading Deployments...</p>
            </section>
        );
    }
    
    // Optional: Render nothing if projects list is still empty after loading
    if (projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="py-10 md:py-12 bg-slate-50 scroll-mt-28">
            <div className="container mx-auto px-4 md:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-3">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-2 text-[10px] font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
                           <Database size={10} /> Track Record
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-snug">
                            Deployed in the Field
                        </h2>
                        <p className="text-slate-600 text-sm">
                            Real-world implementations of our security architecture across Smart Cities, Airports, and Defense sectors.
                        </p>
                    </div>
                </div>

                {/* RESPONSIVE GRID SYSTEM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => setSelectedProject(project)}
                            className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer h-full"
                        >
                            {/* Image Container */}
                            <div className="h-32 sm:h-36 overflow-hidden relative shrink-0">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={handleImageError}
                                />
                                
                                {/* Badge */}
                                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider text-slate-900 border border-slate-200 shadow-sm z-10 flex items-center gap-1">
                                    {project.category.includes('Drone') ? <Zap size={8} className="text-yellow-500" /> : <Shield size={8} className="text-blue-500" />}
                                    {project.category}
                                </div>
                                
                                {/* Overlay (Desktop Only) */}
                                <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                                        <ZoomIn className="text-blue-600" size={16} />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Card Content */}
                            <div className="p-3 flex-1 flex flex-col">
                                <h3 className="text-xs font-bold text-slate-900 mb-1 flex items-start justify-between group-hover:text-blue-600 transition-colors">
                                    <span className="line-clamp-1">{project.title}</span>
                                    <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0" />
                                </h3>
                                
                                <p className="text-slate-600 text-[10px] leading-snug mb-3 line-clamp-3">
                                    {project.description}
                                </p>
                                
                                {/* Metrics Footer */}
                                <div className="mt-auto pt-2 border-t border-slate-100">
                                    <div className="grid grid-cols-2 gap-1">
                                        {project.metrics?.slice(0,2).map((metric: string, idx: number) => (
                                            <div key={idx} className="bg-slate-50 px-1 py-1 rounded-md border border-slate-100 text-center">
                                                <div className="text-[8px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Metric</div>
                                                <div className="text-[9px] font-bold text-slate-800 truncate" title={metric}>
                                                    {metric}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </section>
    );
};

export default Projects;