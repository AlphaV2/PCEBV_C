import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import FloatingContactForm from './src/components/FloatingContactForm';
import HomePage from './src/pages/HomePage';
import ServicesPage from './src/pages/ServicesPage';
import ProjectsPage from './src/pages/ProjectsPage';
import AboutPage from './src/pages/AboutPage';
import ContactPage from './src/pages/ContactPage';
import HOMEPAGE_CONFIG from './src/config/homepage.config';

import { WHATSAPP_NUMBER } from './constants';
import { Service, Product } from './types';

const ServiceModal = lazy(() => import('./src/components/ServiceModal'));
const ProductModal = lazy(() => import('./src/components/ProductModal'));

const normalizePath = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

const App: React.FC = () => {
  const BRAND = HOMEPAGE_CONFIG.colors;
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { i18n, t } = useTranslation();
  const currentPath = typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/';

  const whatsappMessage = t('whatsapp.message', "Hi, I'm interested in PCE BV engineering and project controls services.");
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        fetch(`${API_BASE_URL}/track_visitor.php`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ page: currentPath, referrer: document.referrer })
        }).catch(() => {});
      } catch (e) {
        // Silent fail
      }
    };
    trackVisitor();
  }, []);

  const handleOpenService = (service: Service) => setSelectedService(service);
  const handleOpenProduct = (product: Product) => setSelectedProduct(product);

  const handleChangeLanguage = (language: 'en' | 'nl') => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const language = i18n.resolvedLanguage || i18n.language || 'en';
    document.documentElement.lang = language;
    document.title = t('app.title', 'PCE BV | Engineering and Project Controls');
  }, [i18n.language, i18n.resolvedLanguage, t]);
  
  const handleCloseAll = () => {
    setSelectedService(null);
    setSelectedProduct(null);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/services':
        return <ServicesPage />;
      case '/projects':
        return <ProjectsPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className="brand-surface min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth"
      style={{
        ['--brand-blue' as string]: BRAND.primary_blue,
        ['--brand-orange' as string]: BRAND.accent_orange,
        ['--brand-white' as string]: BRAND.primary_white,
        ['--brand-black' as string]: '#000000',
      }}
    >
      <Navbar 
        onChangeLanguage={handleChangeLanguage}
        currentLanguage={i18n.resolvedLanguage || i18n.language}
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer />

      <Suspense fallback={<div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/20"><Loader2 className="animate-spin text-white"/></div>}>
        
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleCloseAll} />
        )}
        
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseAll} />
        )}

      </Suspense>

      {/* Floating Contact Form */}
      <FloatingContactForm />

      <style>{`
        .brand-surface ::selection {
          background: var(--brand-blue);
          color: var(--brand-white);
        }
      `}</style>
    </div>
  );
};

export default App;