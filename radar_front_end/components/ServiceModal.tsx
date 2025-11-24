
import React from 'react';
import { Service } from '../types';
import { X, Download, CheckCircle, MessageCircle, ArrowRight, Cpu, Activity } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const handleViewProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      try {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error("Navigation error:", err);
      }
    }, 100);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-white relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            aria-label="Close Modal"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary rounded-xl">
              {service.icon ? <service.icon size={32} /> : <Activity size={32} />}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{service.title || 'Service Details'}</h2>
              <p className="text-slate-400">Detailed Solution Overview</p>
            </div>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl">
            {service.details?.intro || 'Information unavailable.'}
          </p>
        </div>

        {/* Content Scroll Area */}
        <div className="p-8 overflow-y-auto flex-1 bg-slate-50 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Technical Specs Section */}
              {service.details?.technicalSpecs && service.details.technicalSpecs.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-primary" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.details.technicalSpecs.map((spec, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
                          <span className="text-sm font-bold text-slate-700">{spec.split(':')[0] || 'Spec'}</span>
                          <span className="text-sm font-mono text-blue-600">{spec.split(':')[1] || 'Value'}</span>
                       </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flow Diagram Section */}
              {service.details?.flowDiagram && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-primary" />
                    Process Flow Diagram
                  </h3>
                  <div className="rounded-lg overflow-hidden border border-slate-100 relative group">
                    <img 
                      src={service.details.flowDiagram} 
                      alt="Process Diagram" 
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-wider">
                       System Architecture Visualization
                    </div>
                  </div>
                </div>
              )}

              {/* Standard Text Sections */}
              {service.details?.sections?.map((section, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{section.heading}</h3>
                  
                  {section.type === 'list' ? (
                    <ul className="space-y-3">
                      {(section.body as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                          <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3">
                      {(section.body as string[]).map((para, i) => (
                        <p key={i} className="text-slate-600 leading-relaxed text-sm">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Sidebar / CTA Column */}
            <div className="space-y-6">
              
              {/* Features List */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {service.features?.map((feat, i) => (
                    <li key={i} className="flex items-center text-sm text-blue-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sticky top-6">
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
                >
                  Request Quote
                  <ArrowRight size={18} />
                </a>

                <a 
                  href={`https://wa.me/?text=Hi, I'm interested in ${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-100"
                >
                  <MessageCircle size={18} />
                  WhatsApp Support
                </a>

                <button 
                  onClick={handleViewProjects}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-700 rounded-xl font-bold transition-all"
                >
                  View Projects
                </button>

                 {service.details?.downloadText && (
                  <a 
                    href={service.details.downloadLink || "#"}
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
                    onClick={e => e.preventDefault()} // Prevent actual download in demo
                  >
                    <Download size={16} />
                    {service.details.downloadText}
                  </a>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;