import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Grid } from 'lucide-react';
import HologramRadar from './HologramRadar';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const backgroundMedia = [
    {
      type: 'video',
      src: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4', // Drone flying footage
      alt: 'Drone Surveillance Video'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1920&h=1080', // Blockchain Node Network
      alt: 'Blockchain Network'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920&h=1080', // Cyber Security / SOC
      alt: 'Security Operations Center'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1535378433864-36c94746d657?auto=format&fit=crop&q=80&w=1920&h=1080', // Industrial/Agri Drone
      alt: 'Multi-domain Drone Tech'
    }
  ];

  useEffect(() => {
    // Preload logic could go here
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundMedia.length);
    }, 7000); 
    return () => clearInterval(interval);
  }, [backgroundMedia.length]);

  // Fallback for media error
  const handleMediaError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>) => {
    const target = e.target as HTMLElement;
    target.style.display = 'none'; // Hide broken media
    console.warn('Hero background media failed to load.');
  };

  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-slate-50">
      {/* Background Media Carousel */}
      <div className="absolute inset-0 z-0 bg-white">
        {isLoaded && backgroundMedia.map((media, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            {media.type === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-20 filter saturate-0" // Low opacity for "Milky" effect
                onError={handleMediaError}
              >
                <source src={media.src} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={media.src} 
                alt={media.alt} 
                className={`w-full h-full object-cover opacity-20 filter grayscale ${index === currentImageIndex ? 'animate-ken-burns' : ''}`}
                onError={handleMediaError}
              />
            )}
          </div>
        ))}
        
        {/* Fallback background if everything fails */}
        <div className="absolute inset-0 bg-slate-50 -z-10"></div>
        
        {/* Complex Gradients for Light Tech Look */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-slate-50/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50/80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-multiply pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 text-left relative">
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              Turn Airspace Into An <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-cyan-500 animate-pulse-glow">Intelligent Shield.</span>
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed font-normal italic">
              Enterprise-grade drone solutions for surveillance, defense, and surveying. ISO-certified systems that save time and guarantee compliance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#products" className="group relative px-8 py-4 bg-primary hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 min-w-[180px] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                   Explore Products
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a 
                href="#services"
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[180px] shadow-sm hover:shadow-md"
              >
                <Grid size={18} />
                View Services
              </a>
              <a 
                href="https://wa.me/?text=Hi" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-w-[180px]"
              >
                <MessageCircle size={18} />
                WhatsApp Chat
              </a>
            </div>
            
            {/* Trust Strip */}
            <div className="mt-12 flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Mock Logos - Darker for light bg */}
               <div className="h-8 w-24 bg-slate-300 rounded animate-pulse"></div>
               <div className="h-8 w-24 bg-slate-300 rounded animate-pulse delay-100"></div>
               <div className="h-8 w-24 bg-slate-300 rounded animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Right Visual Column - Hologram Radar */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative min-h-[300px]">
            {/* Glow Effect behind radar - Blue/Indigo for light mode */}
            <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[150px] -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse-glow"></div>
            
            <div className="relative z-10 scale-90 md:scale-100">
               <HologramRadar />
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default Hero;