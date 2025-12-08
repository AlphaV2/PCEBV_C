import React from 'react';
import { SERVICES } from '../../constants';
import { ChevronRight } from 'lucide-react';
import { Service } from '../../types';

interface ServicesProps {
  // 🚨 CHANGED: Now expects a full Service object, not just a string ID
  onOpenService: (service: Service) => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenService }) => {
  return (
    <section id="services" className="py-12 md:py-16 bg-white relative overflow-hidden scroll-mt-28">
       {/* Decorative background elements */}
       <div className="absolute right-0 top-20 w-64 h-64 bg-blue-50 rounded-l-full z-0 opacity-50 pointer-events-none"></div>
       <div className="absolute left-0 bottom-20 w-96 h-96 bg-blue-50 rounded-r-full z-0 opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-primary uppercase bg-blue-50 rounded-md border border-blue-100">
            Core Expertise
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Solutions Designed for Impact
          </h2>
          <p className="text-slate-500 text-sm">
            Combining aesthetics with engineering to deliver secure infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                // 🚨 FIX: Passing the full 'service' object here
                onClick={() => onOpenService(service)}
                className="group p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <span className="text-slate-300 group-hover:text-primary transition-colors">
                      <ChevronRight size={18} />
                  </span>
                </div>
                
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">{service.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3 flex-1 line-clamp-3">
                  {service.description}
                </p>
                
                <ul className="space-y-1.5 border-t border-slate-100 pt-3 mb-2">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[10px] text-slate-600 font-medium">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mr-2 shrink-0"></span>
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-[10px] font-bold text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1">
                  Details <ChevronRight size={10} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;