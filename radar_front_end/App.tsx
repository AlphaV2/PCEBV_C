import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServiceModal from './components/ServiceModal';
import { MessageCircle, Loader2 } from 'lucide-react';
import { SERVICES } from './constants'; // Assumed to be imported correctly

const App: React.FC = () => {
  const [openedServiceId, setOpenedServiceId] = useState<string | null>(null);
  const selectedService = SERVICES.find(s => s.id === openedServiceId);

  const handleOpenService = (id: string) => {
    setOpenedServiceId(id);
  };

  const handleCloseService = () => {
    setOpenedServiceId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary selection:text-white scroll-smooth">
      <Navbar onOpenService={handleOpenService} />
      
      <main>
        <Hero />
        <Services onOpenService={handleOpenService} />
        <Products />
        <Projects />
        <Testimonials />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseService} />
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/?text=Hi,%20I'm%20interested%20in%20Radar%20Sniper%20solutions"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:scale-110 transition-all duration-300 group flex items-center gap-2 overflow-hidden max-w-[60px] hover:max-w-[200px]"
      >
        <MessageCircle size={28} fill="white" className="text-white shrink-0" />
        <span className="whitespace-nowrap font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pl-1">Quick Chat</span>
      </a>
    </div>
  );
};

export default App;