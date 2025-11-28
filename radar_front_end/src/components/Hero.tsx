import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, Grid } from 'lucide-react';
import HologramRadar from './HologramRadar';
import { WHATSAPP_LINK } from '../../constants';

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Updated with high-quality drone images (first) and smooth videos
  const backgroundMedia = [
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1920&auto=format&fit=crop',
      alt: 'Drone Landscape View'
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1920&auto=format&fit=crop',
      alt: 'High Tech Drone Hovering'
    },
    
    {
      type: 'video',
      src: 'https://videos.pexels.com/video-files/3129671/3129671-hd_1280_720_30fps.mp4', 
      alt: 'Security Surveillance Feed'
    },
    
    {
      type: 'video',
      src: 'https://videos.pexels.com/video-files/5240562/5240562-uhd_2560_1440_25fps.mp4',
      alt: 'Futuristic Smart City'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    // 6 second interval for relaxed pacing
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundMedia.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundMedia.length]);

  const handleMediaError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement, Event>) => {
    const target = e.target as HTMLElement;
    target.style.display = 'none';
    console.warn('Hero background media failed to load.');
  };

  return (
    <section 
      id="hero" 
      className="relative w-screen max-w-none min-h-[100vh] flex flex-col justify-center pt-32 pb-12 overflow-hidden bg-slate-50" 
    >
      {/* Background Media - Enhanced Visibility */}
      <div className="absolute inset-0 z-0 bg-slate-100 w-screen max-w-none">
        {isLoaded && backgroundMedia.map((media, index) => (
          <div
            key={index}
            // Long, smooth cross-dissolve (2500ms)
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2500ms] ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            {media.type === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                // Increased opacity (85%) and reduced brightness slightly for text contrast, but much clearer than before
                className="w-full h-full object-cover opacity-85 scale-105"
                onError={handleMediaError}
              >
                <source src={media.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={media.src}
                alt={media.alt}
                // Subtle zoom effect (scale-110) for smoother movement
                className={`w-full h-full object-cover opacity-85 transition-transform duration-[8000ms] ease-linear ${index === currentImageIndex ? 'scale-110' : 'scale-100'}`}
                onError={handleMediaError}
              />
            )}
          </div>
        ))}

        {/* Cinematic Overlays - Lighter to show background */}
        {/* Main gradient for text readability on the left, but transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-transparent pointer-events-none"></div>
        
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Subtle noise texture, reduced opacity */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Content Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 text-left relative pt-10 lg:pt-0">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm"> 
              Turn Airspace Into An <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 animate-pulse-glow">
                Intelligent Shield.
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mb-8 leading-relaxed font-medium">
              RadarSnipers (OPC) Private Ltd Presents You AI-Powered Drones & Cybersecurity for a Smarter, Safer Future — <span className="text-slate-800 font-semibold">Smart Drones. Strong Security. Safer Tomorrow.</span>
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#products"
                className="group relative px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 min-w-[140px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#services"
                className="px-6 py-3.5 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-w-[140px] shadow-sm hover:shadow-md"
              >
                <Grid size={16} />
                View Services
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-green-50/90 backdrop-blur-sm hover:bg-green-100 text-green-700 border border-green-200 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-w-[140px]"
              >
                <MessageCircle size={16} />
                WhatsApp Chat
              </a>
            </div>

            {/* Trust Strip */}
            <div className="mt-10 flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="h-6 w-20 bg-slate-300/50 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-slate-300/50 rounded animate-pulse delay-100"></div>
              <div className="h-6 w-20 bg-slate-300/50 rounded animate-pulse delay-200"></div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative min-h-[300px]">
            {/* Reduced blur background size */}
            <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-[50px] -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none animate-pulse-glow"></div>
            <div className="relative z-10 scale-100 hover:scale-105 transition-transform duration-500">
              <HologramRadar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
