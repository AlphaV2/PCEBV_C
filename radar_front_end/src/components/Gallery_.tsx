import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_CONTENT } from '../../constants';
import { MapPin, Camera, Layers, ChevronRight, Pause, Play } from 'lucide-react';

// --- SUB-COMPONENT: Individual Card that slides automatically ---
const GalleryCard = ({ collection }: { collection: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaList = collection.media || [];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide logic with random start delay for "alive" feel
  useEffect(() => {
    if (mediaList.length <= 1) return;

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    };

    // Random delay (0-2s) so cards don't switch exactly at the same time
    const randomDelay = Math.floor(Math.random() * 2000); 
    
    timeoutRef.current = setTimeout(() => {
        const interval = setInterval(nextSlide, 4000); // 4 seconds per slide
        return () => clearInterval(interval);
    }, randomDelay);

    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mediaList.length]);

  const currentMedia = mediaList[currentIndex];

  if (!currentMedia) return null;

  return (
    <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg h-[240px]">
      {/* Images */}
      <div className="w-full h-full relative">
          {mediaList.map((item: any, idx: number) => (
             <img 
                key={idx}
                src={item.src} 
                alt={item.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-90 z-10' : 'opacity-0 z-0'}`}
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image')}
            />
          ))}
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 mb-1 text-[8px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/80 backdrop-blur-sm rounded border border-blue-800/50">
          <Layers size={10} /> {collection.tagline}
        </div>
        <h3 className="text-sm font-bold text-white leading-tight">{collection.title}</h3>
      </div>

      {/* Dots Indicator */}
      <div className="absolute top-3 right-3 flex gap-1 z-30">
          {mediaList.map((_: any, idx: number) => (
              <span key={idx} className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-3 bg-blue-500' : 'w-1 bg-slate-600'}`}></span>
          ))}
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Gallery: React.FC = () => {
  const [exhibitionIndex, setExhibitionIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Access the COLLECTIONS and EXHIBITIONS from constants
  // Using 'as any' to bypass strict type checking if types.ts isn't perfectly updated yet
  const content = GALLERY_CONTENT as any; 
  const collections = content.collections || [];
  const exhibitions = content.exhibitions || [];

  // --- Vertical Reel Logic for Exhibitions ---
  useEffect(() => {
    if (isHovered || exhibitions.length === 0) return;
    const interval = setInterval(() => {
      setExhibitionIndex((prev) => (prev + 1) % exhibitions.length);
    }, 3000); // 3 seconds per slide
    return () => clearInterval(interval);
  }, [exhibitions.length, isHovered]);

  return (
    <section id="gallery" className="py-12 bg-slate-950 text-white scroll-mt-20 overflow-hidden border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/50 rounded-full border border-blue-900">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Visual Intelligence
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Operational Gallery</h2>
            <p className="text-slate-400 text-sm">Autonomous missions and global exhibitions.</p>
          </div>
        </div>

        {/* --- MAIN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[500px]">
          
          {/* LEFT: PRODUCT GRID (8 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full overflow-y-auto custom-scrollbar pr-2">
             {collections.map((col: any) => (
                 <GalleryCard key={col.id} collection={col} />
             ))}
          </div>

          {/* RIGHT: EXHIBITION REEL (4 Columns) */}
          <div 
            className="lg:col-span-4 flex flex-col h-full bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Reel Header */}
            <div className="absolute top-0 left-0 w-full p-4 z-20 bg-gradient-to-b from-slate-950 to-transparent flex justify-between items-center">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Camera size={14} className="text-blue-500"/> Exhibition Highlights
                </span>
                <button className="text-slate-400 hover:text-white transition-colors">
                    {isHovered ? <Pause size={12}/> : <Play size={12}/>}
                </button>
            </div>

            {/* Sliding Content */}
            <div className="flex-1 relative overflow-hidden">
                <div 
                    className="absolute w-full h-full transition-transform duration-700 ease-in-out flex flex-col"
                    style={{ transform: `translateY(-${exhibitionIndex * 50}%)` }} // Moves up
                >
                    {/* Double the array for seamless loop effect */}
                    {[...exhibitions, ...exhibitions].map((item: any, idx: number) => (
                        <div key={`${item.id}-${idx}`} className="h-1/2 w-full p-2 box-border">
                            <div className="h-full w-full relative rounded-xl overflow-hidden group cursor-pointer border border-slate-700/50 bg-black">
                                <img 
                                    src={item.src} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                                    onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x300?text=Event')}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-4 flex flex-col justify-end">
                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-blue-400 text-[9px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                            <MapPin size={10} /> {item.location}
                                        </p>
                                        <h4 className="text-white font-bold text-sm leading-snug">{item.title}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Gallery;