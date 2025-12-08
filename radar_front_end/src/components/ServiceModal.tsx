import React from 'react';
import { Service } from '../../types';
import { X, Download, CheckCircle, MessageCircle, ArrowRight, Cpu, Activity } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  // Generate WhatsApp link based on the specific service title
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+','')}?text=${encodeURIComponent(`Hi, I'm interested in learning more about ${service.title}`)}`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-xl max-h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="bg-slate-900 p-4 text-white relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50"
            aria-label="Close Modal"
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg shrink-0">
              {service.icon ? <service.icon size={20} /> : <Activity size={20} />}
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">{service.title}</h2>
              <p className="text-xs text-slate-400">Solution Overview</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            {service.details?.intro}
          </p>
        </div>

        {/* Content Scroll Area */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-50 custom-scrollbar">
          <div className="flex flex-col gap-4">
            
            {/* Technical Specs */}
            {service.details?.technicalSpecs && service.details.technicalSpecs.length > 0 && (
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2 uppercase tracking-wider">
                  <Cpu size={14} className="text-blue-600" />
                  Technical Specs
                </h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  {service.details.technicalSpecs.map((spec, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px] py-0.5 border-b border-slate-100 last:border-0">
                        {/* Splitting spec string if it contains a colon, e.g. "Range: 5km" */}
                        <span className="font-medium text-slate-600">{spec.includes(':') ? spec.split(':')[0] : 'Feature'}</span>
                        <span className="font-mono text-blue-600">{spec.includes(':') ? spec.split(':')[1] : spec}</span>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Flow Diagram */}
            {service.details?.flowDiagram && (
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-2 uppercase tracking-wider">
                  <Activity size={14} className="text-blue-600" />
                  Process Flow
                </h3>
                <div className="rounded-md overflow-hidden border border-slate-100 relative h-32 w-full">
                  <img 
                    src={service.details.flowDiagram} 
                    alt="Process Diagram" 
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>
              </div>
            )}

            {/* Detailed Sections (The paragraphs and lists) */}
            {service.details?.sections?.map((section, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-2">{section.heading}</h3>
                {section.type === 'list' ? (
                  <ul className="space-y-1.5">
                    {(section.body as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-600 text-xs">
                        <CheckCircle size={12} className="text-blue-600 mt-1 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-1.5">
                    {(section.body as string[]).map((para, i) => (
                      <p key={i} className="text-slate-600 text-xs leading-snug">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <a 
                        href="#contact" 
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-800 text-white rounded-lg font-bold text-xs transition-all shadow-lg shadow-blue-200"
                    >
                        Request Quote <ArrowRight size={14} />
                    </a>
                    <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-xs transition-all shadow-lg shadow-green-100"
                    >
                        <MessageCircle size={14} /> WhatsApp
                    </a>
                </div>
                
                {service.details?.downloadText && (
                    <div className="flex justify-center text-[10px] text-slate-500">
                        <a href={service.details.downloadLink || "#"} className="flex items-center gap-1 hover:text-blue-600 transition-colors" onClick={e => e.preventDefault()}>
                            <Download size={10} /> {service.details.downloadText}
                        </a>
                    </div>
                )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;