import React, { useState } from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import Services from './src/components/Services';
// import Products from './src/components/Products'; // 🚨 REMOVED TO FIX DUPLICATION 🚨
import Projects from './src/components/Projects';
import Testimonials from './src/components/Testimonials';
import About from './src/components/About';
import Contact from './src/components/Contact';
import Footer from './src/components/Footer';
import ServiceModal from './src/components/ServiceModal';
import ProductModal from './src/components/ProjectModal'; 
import { MessageCircle, Loader2 } from 'lucide-react';
// 🚨 FIX APPLIED HERE: Added WHATSAPP_LINK to imports 🚨
import { SERVICES, PRODUCTS, WHATSAPP_LINK } from './constants';
import { Service, Product } from './types';

const App: React.FC = () => {
    // --- Service Modal State ---
    const [openedServiceId, setOpenedServiceId] = useState<string | null>(null);
    const selectedService = SERVICES.find(s => s.id === openedServiceId);

    const handleOpenService = (id: string) => {
        setOpenedServiceId(id);
    };

    const handleCloseService = () => {
        setOpenedServiceId(null);
    };

    // --- Product Modal State ---
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    
    const handleOpenProduct = (product: Product) => {
        setSelectedProduct(product);
    };
    
    const handleCloseProduct = () => {
        setSelectedProduct(null);
    };


    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white scroll-smooth">
        
        {/* Navbar */}
        <Navbar 
          onOpenService={handleOpenService} 
          onOpenProduct={handleOpenProduct}
        />
        
        <main>
          <Hero />
          <Services onOpenService={handleOpenService} />
          {/* <Products /> WAS HERE - REMOVED */}
          <Projects /> 
          <Testimonials />
          <About />
          <Contact />
        </main>

        <Footer />

        {/* Service Details Modal */}
        {selectedService && (
          <ServiceModal service={selectedService as Service} onClose={handleCloseService} />
        )}
        
        {/* Product Details Modal */}
        {selectedProduct && (
          <ProductModal project={selectedProduct as any} onClose={handleCloseProduct} />
        )}

        {/* Floating WhatsApp Button */}
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 group flex items-center gap-1.5 overflow-hidden w-12 h-12 hover:w-auto"
        >
          <MessageCircle size={24} fill="white" className="text-white shrink-0" />
          <span className="whitespace-nowrap font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-1">Quick Chat</span>
        </a>
      </div>
    );
};

export default App;