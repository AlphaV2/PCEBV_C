import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronRight, X, Search, Layers, Briefcase, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTranslatedServices } from '../hooks/useTranslatedData';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { Service } from '../../types';

// Unified Corporate Colors
const PRIMARY_BLUE = HOMEPAGE_CONFIG.colors.primary_blue;
const ACCENT_ORANGE = HOMEPAGE_CONFIG.colors.accent_orange;

const CATEGORY_META = {
  'Project Management': {
    eyebrow: 'Governance, planning, and controls',
    summary: 'Structured delivery support designed to reduce ambiguity and give decision-makers clear signals early.',
    icon: Briefcase,
  },
  Engineering: {
    eyebrow: 'Design, execution, and delivery support',
    summary: 'Multi-discipline engineering services organized around FEED, detail design, and field readiness.',
    icon: Layers,
  },
} as const;

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const allServices = useTranslatedServices() || [];

  const categoryLabelMap: Record<'All' | 'Project Management' | 'Engineering', string> = {
    All: t('servicesSection.categoryAll', 'All'),
    'Project Management': t('servicesSection.projectManagement', 'Project Management'),
    Engineering: t('servicesSection.engineeringDesign', 'Engineering Design'),
  };

  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Project Management' | 'Engineering'>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const servicesByCategory = useMemo(() => {
    return {
      'Project Management': filteredServices.filter(s => s.category === 'Project Management'),
      'Engineering': filteredServices.filter(s => s.category === 'Engineering'),
    };
  }, [filteredServices]);

  const categories: ('All' | 'Project Management' | 'Engineering')[] = ['All', 'Project Management', 'Engineering'];

  return (
    <div className="bg-[#F8F9FA] text-slate-900 antialiased min-h-screen overflow-x-hidden font-sans">
      
      {/* --- HERO SECTION --- */}
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

        {/* Hero Content (De-cluttered and Centered Focus) */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl backdrop-blur-md bg-white/5 border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl">
            
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-[10px] font-black tracking-[0.15em] text-white uppercase rounded-full shadow-lg" 
              style={{ backgroundColor: ACCENT_ORANGE }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {t('servicesSection.badge', 'Our Capabilities')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
              {t('servicesSection.heroPrefix', 'Complete Engineering')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                {t('servicesSection.heading', '& Project Services')}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-medium max-w-xl">
              {t('servicesSection.subheading', 'From conceptual planning through operational handover, PCE BV delivers integrated project management and engineering services across the full EPC lifecycle.')}
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
                {t('servicesSection.projectManagementCta', 'Project Management')}
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Engineering');
                  document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl font-bold transition-all border-2 border-white/20 text-white hover:bg-white hover:text-slate-900 active:scale-95 text-center text-sm"
              >
                {t('servicesSection.engineeringDesignCta', 'Engineering Design')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FLOATING FILTER ISLAND --- */}
      <section className="sticky top-[4.5rem] z-30 px-6 lg:px-12 -mt-12" id="services-grid">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-2 sm:p-3 flex flex-col md:flex-row gap-3 items-center justify-between">
            
            <div className="flex w-full md:w-auto gap-1 bg-slate-50 p-1 rounded-xl overflow-x-auto hide-scrollbar border border-slate-100">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-1 md:flex-none ${
                    selectedCategory === category
                      ? 'bg-white text-[#071B34] shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-[#071B34] hover:bg-slate-200/50 border border-transparent'
                  }`}
                >
                  {categoryLabelMap[category]}
                </button>
              ))}
            </div>

            <div className="w-full md:w-72 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('servicesSection.searchPlaceholder', 'Find a service...')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#071B34] focus:ring-1 focus:ring-[#071B34] transition-colors font-medium text-sm"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <div className="pt-16 pb-24 space-y-20">
        
        {/* Project Management Section */}
        {servicesByCategory['Project Management'].length > 0 && selectedCategory !== 'Engineering' && (
          <section className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center gap-2 text-[#F25C19] mb-3">
                  <Briefcase size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{CATEGORY_META['Project Management'].eyebrow}</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#071B34]">{t('servicesSection.projectManagement', 'Project Management')}</h2>
              </div>
              <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {servicesByCategory['Project Management'].length} {t('servicesSection.modules', 'Modules')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesByCategory['Project Management'].map((service) => (
                <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} />
              ))}
            </div>
          </section>
        )}

        {/* Engineering Section */}
        {servicesByCategory['Engineering'].length > 0 && selectedCategory !== 'Project Management' && (
          <section className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center gap-2 text-[#071B34] mb-3">
                  <Layers size={16} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{CATEGORY_META['Engineering'].eyebrow}</span>
                </div>
                <h2 className="text-3xl font-extrabold text-[#071B34]">{t('servicesSection.engineeringDesign', 'Engineering Design')}</h2>
              </div>
              <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                {servicesByCategory['Engineering'].length} {t('servicesSection.modules', 'Modules')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesByCategory['Engineering'].map((service) => (
                <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <section className="flex justify-center items-center px-6 mt-12">
            <div className="text-center p-10 bg-white rounded-2xl shadow-sm border border-slate-200 max-w-md w-full">
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
                <Search className="text-slate-400" size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-[#071B34] mb-2">{t('servicesSection.noServicesFound', 'No services found')}</h3>
              <p className="text-sm text-slate-500">{t('servicesSection.noServicesMessage', 'We could not find anything matching "{{query}}". Try adjusting your search criteria.', { query: searchQuery })}</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-[#071B34] text-sm font-bold rounded-lg transition-colors"
              >
                {t('servicesSection.clearSearch', 'Clear Search')}
              </button>
            </div>
          </section>
        )}
      </div>

      {/* --- MODAL --- */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </div>
  );
};

// ============================================
// REDESIGNED PREMIUM SERVICE CARD
// ============================================
interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const { t } = useTranslation();
  const Icon = service.icon;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(7,27,52,0.12)] hover:border-slate-300 hover:-translate-y-1 h-full relative overflow-hidden"
    >
      {/* Interactive Top Glow Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#071B34] to-[#F25C19] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header: Icon & Action Arrow */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#071B34] group-hover:bg-[#071B34] group-hover:text-white transition-colors duration-300 shadow-sm">
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
        
        {/* Sleek Native-App Arrow Indicator */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-[#F25C19] group-hover:text-white transition-all duration-300">
          <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" strokeWidth={2.5} />
        </div>
      </div>

      {/* Context: Title & Description */}
      {service.shortTitle && (
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F25C19] mb-2 block">
          {service.shortTitle}
        </span>
      )}
      
      <h3 className="text-xl font-extrabold text-[#071B34] tracking-tight mb-3">
        {service.title}
      </h3>

      <p className="text-[13px] text-slate-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
        {service.description}
      </p>

      {/* Metadata: Condensed Tags anchored at bottom */}
      <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-slate-100">
        {service.features.slice(0, 3).map((feature, idx) => (
          <span key={idx} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 rounded-md">
            {feature}
          </span>
        ))}
        {service.features.length > 3 && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 border border-slate-100 rounded-md">
            +{service.features.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================
// SERVICE DETAILS MODAL (Maintained Functionality)
// ============================================
interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const { t } = useTranslation();
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071B34]/40 backdrop-blur-sm p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 shrink-0 bg-[#071B34]">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 hidden sm:block">
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F25C19] mb-1.5">{service.category}</div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">{service.title}</h2>
              </div>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors shrink-0 border border-white/10">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-[#F8F9FA]">
          <p className="text-base text-slate-600 mb-8 leading-relaxed font-medium">
            {service.details.intro}
          </p>

          {service.details.technicalSpecs && service.details.technicalSpecs.length > 0 && (
            <div className="mb-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-[#071B34] mb-4">{t('servicesSection.technicalSpecifications', 'Technical Specifications')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.details.technicalSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F25C19] shrink-0" />
                    <p className="text-sm font-semibold text-slate-700">{spec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.details.sections && (
            <div className="space-y-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              {service.details.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-bold text-[#071B34] mb-4">{section.heading}</h4>
                  {section.type === 'list' && Array.isArray(section.body) ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      {section.body.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-600 font-medium text-sm">
                          <ChevronRight size={16} className="text-[#F25C19] mt-0.5 shrink-0" />
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

        {/* Modal Footer */}
        <div className="bg-white border-t border-slate-200 p-5 shrink-0 flex flex-col sm:flex-row gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 font-bold text-[#071B34] hover:bg-slate-50 transition-colors active:scale-95 text-sm">
            {t('servicesSection.closeOverview', 'Close Overview')}
          </button>
          <a
            href={`https://wa.me/31611596812?text=${encodeURIComponent(t('servicesSection.whatsappInterest', "Hi, I'm interested in the {{service}} services.", { service: service.title }))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95 text-center flex items-center justify-center gap-2 text-sm shadow-[0_4px_14px_rgba(242,92,25,0.4)]"
            style={{ backgroundColor: '#F25C19' }}
          >
            {t('servicesSection.contactViaWhatsApp', 'Contact via WhatsApp')}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;