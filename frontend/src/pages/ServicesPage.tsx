import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, X, Activity, Search, Layers, Briefcase, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTranslatedServices } from '../hooks/useTranslatedData';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { Service } from '../../types';

const PRIMARY_BLUE = HOMEPAGE_CONFIG.colors.primary_blue;
const ACCENT_ORANGE = HOMEPAGE_CONFIG.colors.accent_orange;

const CATEGORY_META = {
  'Project Management': {
    eyebrow: 'Governance, planning, and controls',
    summary:
      'Structured delivery support for cost, schedule, risk, and change. Designed to reduce ambiguity and give decision-makers clear signals early.',
    accent: 'from-orange-500/15 to-orange-500/0',
    icon: Briefcase,
  },
  Engineering: {
    eyebrow: 'Design, execution, and delivery support',
    summary:
      'Multi-discipline engineering services organized around FEED, detail design, 3D coordination, procurement support, and field readiness.',
    accent: 'from-blue-500/15 to-blue-500/0',
    icon: Layers,
  },
} as const;

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const allServices = useTranslatedServices() || [];

  // State management
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Project Management' | 'Engineering'>('All');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services by category
  const filteredServices = useMemo(() => {
    let services = allServices;
    
    if (selectedCategory !== 'All') {
      services = services.filter(s => s.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      services = services.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.shortTitle?.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    }
    
    return services;
  }, [allServices, selectedCategory, searchQuery]);

  // Group services by category
  const servicesByCategory = useMemo(() => {
    return {
      'Project Management': filteredServices.filter(s => s.category === 'Project Management'),
      'Engineering': filteredServices.filter(s => s.category === 'Engineering'),
    };
  }, [filteredServices]);

  const categories: ('All' | 'Project Management' | 'Engineering')[] = ['All', 'Project Management', 'Engineering'];

  const totalServices = filteredServices.length;
  const managementCount = servicesByCategory['Project Management'].length;
  const engineeringCount = servicesByCategory['Engineering'].length;

  return (
    <div className="bg-slate-100 text-slate-900 antialiased min-h-screen overflow-x-hidden">
      
      {/* HERO */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-slate-950 text-white">
        
        {/* CSS-Only Performance Animations */}
        <style>{`
          @keyframes slow-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
          .animate-bg-zoom {
            animation: slow-zoom 30s ease-in-out infinite alternate;
            will-change: transform;
          }
        `}</style>

        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/background/servicesbg.webp"
            alt="EPC Engineering Background"
            className="w-full h-full object-cover animate-bg-zoom opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
        </div>

        {/* Hero Content (Compact Glassmorphism) */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl grid gap-6 lg:grid-cols-[1.35fr_0.9fr] items-end">
            <div className="max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl">
            
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-[10px] font-black tracking-[0.15em] text-white uppercase rounded-full shadow-lg" 
                style={{ backgroundColor: ACCENT_ORANGE }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Our Capabilities
              </div>
            
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                Complete Engineering <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                  & Project Services
                </span>
              </h1>
            
              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-medium max-w-xl">
                From conceptual planning through operational handover, PCE BV delivers integrated project management and engineering services across the full EPC lifecycle.
              </p>
            
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('Project Management');
                    document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] active:scale-95 flex items-center justify-center gap-2 text-sm"
                  style={{ backgroundColor: PRIMARY_BLUE }}
                >
                  Project Management
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory('Engineering');
                    document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl font-bold transition-all border-2 border-white/20 text-white hover:bg-white hover:text-slate-900 active:scale-95 text-center text-sm"
                >
                  Engineering Design
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-xl">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-300 mb-2">Service Families</div>
                <div className="text-2xl font-black text-white">2</div>
                <div className="text-sm text-slate-300 mt-1">Clear grouped pathways</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-xl">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-300 mb-2">Current Results</div>
                <div className="text-2xl font-black text-white">{totalServices}</div>
                <div className="text-sm text-slate-300 mt-1">Filtered service modules</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-xl">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-300 mb-2">Balance</div>
                <div className="text-2xl font-black text-white">{managementCount + engineeringCount}</div>
                <div className="text-sm text-slate-300 mt-1">Project + engineering depth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FLOATING FILTER ISLAND 
          (Overlaps the dark hero for a seamless transition)
          ============================================ */}
      <section className="sticky top-[4.5rem] z-30 px-4 sm:px-6 lg:px-8 -mt-8" id="services-grid">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-lg rounded-2xl p-2 sm:p-3 flex flex-col md:flex-row gap-3 items-center justify-between">
            
            <div className="flex w-full md:w-auto gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-1 md:flex-none ${
                    selectedCategory === category
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="w-full md:w-64 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find a service..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-sm"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES GRID 
          ============================================ */}
      <div className="pt-12 pb-24 space-y-10">
        {/* Project Management Grid */}
        {servicesByCategory['Project Management'].length > 0 && selectedCategory !== 'Engineering' && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-orange-100 bg-white p-6 sm:p-7 shadow-[0_16px_40px_-28px_rgba(249,115,22,0.22)]">
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-orange-700">
                    <Briefcase size={12} /> {CATEGORY_META['Project Management'].eyebrow}
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 mb-2">Project Management</h2>
                  <p className="text-slate-600 text-base max-w-2xl">
                    {CATEGORY_META['Project Management'].summary}
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-orange-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {servicesByCategory['Project Management'].length} modules
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {servicesByCategory['Project Management'].map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isExpanded={expandedCardId === service.id}
                    onToggleExpand={() => setExpandedCardId(expandedCardId === service.id ? null : service.id)}
                    onViewDetails={() => setSelectedService(service)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Engineering Grid */}
        {servicesByCategory['Engineering'].length > 0 && selectedCategory !== 'Project Management' && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 sm:p-7 shadow-[0_16px_40px_-28px_rgba(37,99,235,0.22)]">
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                    <Layers size={12} /> {CATEGORY_META.Engineering.eyebrow}
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 mb-2">Engineering Services</h2>
                  <p className="text-slate-600 text-base max-w-2xl">
                    {CATEGORY_META.Engineering.summary}
                  </p>
                </div>
                <div className="rounded-2xl bg-white border border-blue-100 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {servicesByCategory['Engineering'].length} modules
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {servicesByCategory['Engineering'].map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isExpanded={expandedCardId === service.id}
                    onToggleExpand={() => setExpandedCardId(expandedCardId === service.id ? null : service.id)}
                    onViewDetails={() => setSelectedService(service)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <section className="flex justify-center items-center px-4 mt-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-400" size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No services found</h3>
              <p className="text-sm text-slate-500">Try adjusting your search criteria.</p>
            </div>
          </section>
        )}
      </div>

      {/* ============================================
          SERVICE DETAILS MODAL
          ============================================ */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
};

// ============================================
// SERVICE CARD COMPONENT (Kept unchanged mostly, just adjusted padding)
// ============================================
interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onViewDetails: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isExpanded, onToggleExpand, onViewDetails }) => {
  const Icon = service.icon;
  const isEngineering = service.category === 'Engineering';
  const borderTone = isEngineering ? 'border-blue-100' : 'border-orange-100';
  const topTone = isEngineering ? 'from-blue-500/10' : 'from-orange-500/10';
  const iconTone = isEngineering ? 'text-blue-600' : 'text-orange-600';

  return (
    <div
      id={service.id}
      className={`group relative flex flex-col rounded-2xl border ${borderTone} bg-white p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden cursor-pointer shadow-[0_12px_28px_-20px_rgba(15,23,42,0.3)]`}
      onClick={onToggleExpand}
      style={{ scrollMarginTop: '10rem' }}
    >
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className={`inline-flex p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-950 transition-colors duration-300 self-start`}>
            <Icon size={18} className={`${iconTone} group-hover:text-white transition-colors duration-300`} />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
            className="mt-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Toggle Details"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>

        <h3 className="text-base font-black text-slate-900 mb-1.5 leading-tight group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        {service.shortTitle && (
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">{service.shortTitle}</p>
        )}

        <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed line-clamp-3 flex-1">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.features.slice(0, 2).map((feature, idx) => (
            <span key={idx} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
              {feature}
            </span>
          ))}
        </div>

        {isExpanded && (
          <div className="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-900 mb-3">Key Highlights</p>
            <ul className="space-y-2.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                  <ChevronRight size={14} className="text-blue-500 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {service.details.technicalSpecs && service.details.technicalSpecs.length > 0 && (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {service.details.technicalSpecs.slice(0, 4).map((spec, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    {spec}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-3 border-t border-slate-100 mt-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
            className="flex-1 px-4 py-2 text-xs font-bold rounded-lg text-white transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
            style={{ backgroundColor: PRIMARY_BLUE }}
          >
            Explore More
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleExpand(); }}
            className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors active:scale-95"
            aria-label="Toggle Details"
          >
            <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SERVICE DETAILS MODAL COMPONENT (Kept as is)
// ============================================
interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="relative p-6 sm:p-8 shrink-0 overflow-hidden" style={{ backgroundColor: PRIMARY_BLUE }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hidden sm:block">
                <Icon size={28} className="text-white" />
              </div>
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-blue-200 mb-1">{service.category}</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">{service.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors shrink-0">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed font-medium">
            {service.details.intro}
          </p>

          {service.details.technicalSpecs && service.details.technicalSpecs.length > 0 && (
            <div className="mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.details.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">{spec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.details.sections && (
            <div className="space-y-8">
              {service.details.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">{section.heading}</h4>
                  {section.type === 'list' && Array.isArray(section.body) ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {section.body.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-600 font-medium text-sm">
                          <ChevronRight size={16} className="text-blue-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-600 font-medium leading-relaxed space-y-3 text-sm">
                      {Array.isArray(section.body) ? section.body.map((para, i) => <p key={i}>{para}</p>) : <p>{section.body}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-50 border-t border-slate-100 p-5 shrink-0 flex flex-col sm:flex-row gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-100 transition-colors active:scale-95 text-sm">
            Close Overview
          </button>
          <a
            href={`https://wa.me/31611596812?text=${encodeURIComponent(`Hi, I'm interested in the ${service.title} services.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg active:scale-95 text-center flex items-center justify-center gap-2 text-sm"
            style={{ backgroundColor: ACCENT_ORANGE }}
          >
            Contact via WhatsApp
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;