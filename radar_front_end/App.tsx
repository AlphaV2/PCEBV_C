import React, { useState, useEffect, Suspense, lazy } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';

// --- COMPONENTS ---
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import Services from './src/components/Services';
import Products from './src/components/Products';
import Gallery from './src/components/Gallery_'; // 🚨 Embedded Gallery
import Projects from './src/components/Projects';
import Testimonials from './src/components/Testimonials';
import About from './src/components/About';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';

// --- DATA & TYPES ---
import { WHATSAPP_LINK } from './constants';
import { Service, Product } from './types';

// --- LAZY LOAD MODALS ---
const ServiceModal = lazy(() => import('./src/components/ServiceModal'));
const ProductModal = lazy(() => import('./src/components/ProductModal')); 
// Note: ProjectModal is handled internally by Projects.tsx

const App: React.FC = () => {
  // --- STATE ---
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- VISITOR TRACKING ---
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        // Fire and forget tracking request
        fetch(`${API_BASE_URL}/track_visitor.php`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ page: 'home', referrer: document.referrer })
        }).catch(() => {});
      } catch (e) {
        // Silent fail
      }
    };
    trackVisitor();
  }, []);

  // --- HANDLERS ---
  const handleOpenService = (service: Service) => setSelectedService(service);
  const handleOpenProduct = (product: Product) => setSelectedProduct(product);
  
  const handleCloseAll = () => {
    setSelectedService(null);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white scroll-smooth">
      
      {/* Navigation */}
      <Navbar 
        onOpenService={handleOpenService} 
        onOpenProduct={handleOpenProduct}
      />
      
      <main>
        <Hero />
        <Services onOpenService={handleOpenService} />
        <Products onOpenProduct={handleOpenProduct} />
        
        {/* 🚨 Gallery Section (Displayed On-Page) 🚨 */}
        <Gallery />

        <Projects /> 
        <Testimonials />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* --- MODALS (Suspense Wrapper) --- */}
      <Suspense fallback={<div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/20"><Loader2 className="animate-spin text-white"/></div>}>
        
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleCloseAll} />
        )}
        
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={handleCloseAll} />
        )}

      </Suspense>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center w-12 h-12"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default App;