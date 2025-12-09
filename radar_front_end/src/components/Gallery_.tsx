import React, { useState, useEffect } from 'react';
import { GALLERY_CONTENT } from '../../constants';
import { MapPin, Layers, Maximize2, X } from 'lucide-react';

// --- SUB-COMPONENT: Independent Carousel Card ---
const CarouselCard = ({ 
    items, 
    intervalTime = 3000, 
    onImageClick,
    showOfferBadge = false
}: { 
    items: any[], 
    intervalTime?: number, 
    onImageClick: (src: string) => void,
    showOfferBadge?: boolean
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [items, intervalTime]);

  if (!items || items.length === 0) return null;
  const currentItem = items[currentIndex];

  return (
    <div 
        className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg h-full min-h-[200px] cursor-pointer"
        onClick={() => onImageClick(currentItem.src)}
    >
      <img
        src={currentItem.src}
        alt={currentItem.title}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x800?text=No+Image')}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10"></div>
      
      {/* Text Info */}
      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
             {currentItem.tagline && (
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 mb-1 text-[8px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/80 backdrop-blur-sm rounded border border-blue-800/50">
                  <Layers size={10} /> {currentItem.tagline}
                </div>
             )}
            <h3 className="text-sm font-bold text-white leading-tight drop-shadow-md">{currentItem.title}</h3>
             {currentItem.location && (
                 <p className="text-[10px] text-slate-300 flex items-center gap-1 mt-1"><MapPin size={10}/> {currentItem.location}</p>
             )}
      </div>

      {/* Offer Badge (Optional) */}
      {showOfferBadge && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded shadow-sm z-30 animate-pulse pointer-events-none">
            OFFER
        </div>
      )}
      
      {/* Slide Indicators (Only show if > 1 image) */}
      {items.length > 1 && (
        <div className="absolute top-2 right-2 flex gap-1 z-20">
            {items.map((_, idx) => (
                <span key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-3 bg-blue-500' : 'w-1 bg-white/50'}`}></span>
            ))}
        </div>
      )}
    </div>
  );
};


// --- MAIN COMPONENT ---
const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Cast constants to avoid typescript strict checks
  const content = GALLERY_CONTENT as any;
  const { verticalBanners, droneFleet, specialOffers, innovations, exhibitions } = content;

  return (
    <section id="gallery" className="py-12 bg-slate-950 text-white scroll-mt-20 overflow-hidden border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/50 rounded-full border border-blue-900">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              Visual Intelligence
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1"> Highlights</h2>
            <p className="text-slate-400 text-sm">Autonomous missions, exclusive offers, and global exhibitions.</p>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-auto lg:h-[600px]">
          
          {/* 🟢 COLUMN 1: VERTICAL BANNERS */}
          <div className="lg:col-span-1 h-[400px] lg:h-full">
             <CarouselCard 
                items={verticalBanners || []} 
                intervalTime={6000} 
                onImageClick={setSelectedImage}
             />
          </div>

          {/* 🟡 COLUMN 2: OFFERS (Top) & FLEET (Bottom) */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-[400px] lg:h-full">
             
             {/* Row 1: Special Offers (MOVED TO TOP) */}
             <div className="flex-1 h-1/2">
                <CarouselCard 
                    items={specialOffers || []} 
                    intervalTime={4500} 
                    onImageClick={setSelectedImage}
                    showOfferBadge={true}
                />
             </div>

             {/* Row 2: Drone Fleet (MOVED TO BOTTOM) */}
             <div className="flex-1 h-1/2">
                <CarouselCard 
                    items={droneFleet || []} 
                    intervalTime={3500} 
                    onImageClick={setSelectedImage}
                />
             </div>
          </div>

          {/* 🔵 COLUMN 3: INNOVATIONS & EXHIBITIONS */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-[400px] lg:h-full">
             
             {/* Row 1: Innovations */}
             <div className="flex-1 h-1/2">
                <CarouselCard 
                    items={innovations || []} 
                    intervalTime={4000} 
                    onImageClick={setSelectedImage}
                />
             </div>

             {/* Row 2: Exhibitions */}
             <div className="flex-1 h-1/2">
                <CarouselCard 
                   items={exhibitions || []} 
                   intervalTime={5000} 
                   onImageClick={setSelectedImage}
                />
             </div>
          </div>

        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;