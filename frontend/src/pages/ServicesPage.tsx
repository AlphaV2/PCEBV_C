import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTranslatedServices } from '../hooks/useTranslatedData';
import HOMEPAGE_CONFIG from '../config/homepage.config';
import { Service } from '../../types';

const PRIMARY_BLUE = HOMEPAGE_CONFIG.colors.primary_blue;
const ACCENT_ORANGE = HOMEPAGE_CONFIG.colors.accent_orange;

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

  return (
    <div className="bg-white text-slate-900 antialiased">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-widest text-white uppercase rounded-full" style={{ backgroundColor: ACCENT_ORANGE }}>
              Our Capabilities
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Complete Engineering & Project Services
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From conceptual planning through operational handover, PCE BV delivers integrated project management and engineering services across the full EPC lifecycle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setSelectedCategory('Project Management')}
                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                style={{ backgroundColor: PRIMARY_BLUE }}
              >
                Explore Project Management
              </button>
              <button
                onClick={() => setSelectedCategory('Engineering')}
                className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-blue-50"
                style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
              >
                Explore Engineering
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEARCH & FILTER SECTION
          ============================================ */}
      <section className="sticky top-0 z-30 bg-white border-b border-slate-200 py-6 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:flex-1">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  style={selectedCategory === category ? { backgroundColor: ACCENT_ORANGE } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES GRID - PROJECT MANAGEMENT
          ============================================ */}
      {servicesByCategory['Project Management'].length > 0 && selectedCategory !== 'Engineering' && (
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Project Management Services</h2>
              <p className="text-slate-600 max-w-2xl">
                Comprehensive planning, controls, and governance solutions to deliver projects on schedule, within budget, and with sustained stakeholder confidence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesByCategory['Project Management'].map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isExpanded={expandedCardId === service.id}
                  onToggleExpand={() =>
                    setExpandedCardId(expandedCardId === service.id ? null : service.id)
                  }
                  onViewDetails={() => setSelectedService(service)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SERVICES GRID - ENGINEERING
          ============================================ */}
      {servicesByCategory['Engineering'].length > 0 && selectedCategory !== 'Project Management' && (
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Engineering Services</h2>
              <p className="text-slate-600 max-w-2xl">
                Multi-discipline technical expertise spanning process design, equipment engineering, 3D modeling, and construction support across all industrial sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {servicesByCategory['Engineering'].map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isExpanded={expandedCardId === service.id}
                  onToggleExpand={() =>
                    setExpandedCardId(expandedCardId === service.id ? null : service.id)
                  }
                  onViewDetails={() => setSelectedService(service)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          NO RESULTS
          ============================================ */}
      {filteredServices.length === 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No services found</h3>
            <p className="text-slate-600">Try adjusting your search or category filters</p>
          </div>
        </section>
      )}

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
// SERVICE CARD COMPONENT
// ============================================
interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onViewDetails: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isExpanded,
  onToggleExpand,
  onViewDetails,
}) => {
  const Icon = service.icon;

  return (
    <div
      className="group relative h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-200 overflow-hidden cursor-pointer"
      onClick={onToggleExpand}
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-blue-500 to-orange-400 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-colors">
          <Icon size={24} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
          {service.description}
        </p>

        {/* Features - Collapsed */}
        {!isExpanded && (
          <ul className="space-y-2 mb-4">
            {service.features.slice(0, 2).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Features - Expanded */}
        {isExpanded && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-semibold text-blue-900 mb-3">Key Highlights:</p>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg text-white transition-all hover:shadow-md"
            style={{ backgroundColor: PRIMARY_BLUE }}
          >
            Explore More
            <ArrowRight size={14} className="inline ml-1" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
            className="px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <ChevronDown
              size={16}
              className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SERVICE DETAILS MODAL COMPONENT
// ============================================
interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  const Icon = service.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
        {/* Header */}
        <div
          className="sticky top-0 p-6 rounded-t-2xl flex items-start justify-between"
          style={{ backgroundImage: `linear-gradient(to right, ${PRIMARY_BLUE}, #0056A3)` }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/20">
              <Icon size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              <p className="text-blue-100 text-sm mt-1">{service.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Introduction */}
          <p className="text-slate-700 mb-6 leading-relaxed">{service.details.intro}</p>

          {/* Technical Specs */}
          {service.details.technicalSpecs && service.details.technicalSpecs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.details.technicalSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-100"
                  >
                    <p className="text-sm text-slate-700">{spec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {service.details.sections && (
            <div className="space-y-8">
              {service.details.sections.map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">{section.heading}</h4>
                  {section.type === 'list' && Array.isArray(section.body) ? (
                    <ul className="space-y-2">
                      {section.body.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <ChevronRight
                            size={18}
                            className="text-blue-600 mt-0.5 shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-700 space-y-2">
                      {Array.isArray(section.body) ? (
                        section.body.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))
                      ) : (
                        <p>{section.body}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Flow Diagram */}
          {service.details.flowDiagram && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Visual Overview</h3>
              <img
                src={service.details.flowDiagram}
                alt={service.title}
                className="w-full rounded-lg border border-slate-200"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 rounded-b-2xl flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <a
            href={`https://wa.me/31611596812?text=${encodeURIComponent(`Hi, I'm interested in ${service.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: '#FF6A2A' }}
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
