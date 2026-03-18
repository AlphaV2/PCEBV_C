import React, { useState, useEffect, useCallback, memo } from 'react';
import { GALLERY_CONTENT } from '../../constants';
import { MapPin, Layers, X, ChevronLeft, ChevronRight, Zap, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';

// --- CONFIGURATION ---
const SLIDE_DURATION_PAMPHLET = 4000; 
const SLIDE_DURATION_GRID = 8000;

// --- HELPER: Preload Image ---
const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
};

// ============================================================================
// 📱 COMPONENT: Mobile Swipe Card (Optimized)
// ============================================================================
const MobileSwipeCard: React.FC<{ item: any; onClick: () => void; priority?: boolean }> = memo(({ item, onClick, priority = false }) => {
  const isPamphlet = item.id?.toString().includes('pamphlet') || item.tagline === 'Brochure';

  return (
    <div 
      onClick={onClick}
      className="relative min-w-[85vw] aspect-[4/5] snap-center rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl shrink-0 first:ml-4 last:mr-4 active:scale-[0.98] transition-transform duration-200"
    >
      {/* Background Loader */}
      <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />

      {/* Optimized Image */}
      <img 
        src={item.src} 
        alt={item.title} 
        // ⚡ OPTIMIZATION: High priority for the first card, lazy for the rest
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`absolute inset-0 w-full h-full transition-all duration-500 z-10
          ${isPamphlet ? 'object-contain p-2' : 'object-cover'} 
        `}
        // ⚡ OPTIMIZATION: Helps browser calculate layout before image loads
        sizes="(max-width: 768px) 85vw, 30vw"
        onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x800?text=No+Image')}
      />
      
      {/* Gradient & Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 z-20 pointer-events-none"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-5 z-30">
        {item.tagline && (
          <div className="inline-flex items-center gap-1.5 px-2 py-1 mb-2 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-950/80 backdrop-blur-md rounded border border-blue-500/30">
            <Layers size={10} /> {item.tagline}
          </div>
        )}
        <h3 className="text-xl font-bold text-white leading-tight mb-1 drop-shadow-md">{item.title}</h3>
        {item.description && (
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">{item.description}</p>
        )}
      </div>
    </div>
  );
});
MobileSwipeCard.displayName = "MobileSwipeCard";

// ============================================================================
// 💻 COMPONENT: Desktop Carousel Card (Optimized)
// ============================================================================
const CarouselCard = memo(({ 
    items, 
    intervalTime = 3000, 
    onOpenLightbox,
    showOfferBadge = false,
    className = "",
    objectFit = "cover",
    autoPlay = true 
}: { 
    items: any[], 
    intervalTime?: number, 
    onOpenLightbox: (index: number) => void,
    showOfferBadge?: boolean,
    className?: string,
    objectFit?: "cover" | "contain",
    autoPlay?: boolean
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        setIsImageLoaded(false);
        // Preload next image logic kept
        if (items.length > 1) {
            const nextIndex = (currentIndex + 1) % items.length;
            preloadImage(items[nextIndex].src);
        }
    }, [currentIndex, items]);

    useEffect(() => {
        if (!autoPlay || !items || items.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, intervalTime);
        return () => clearInterval(interval);
    }, [items, intervalTime, isHovered, autoPlay]);

    if (!items || items.length === 0) return null;
    const currentItem = items[currentIndex];
    if (!currentItem) return null;

    return (
        <div 
            className={`relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-lg cursor-pointer hover:border-blue-500/50 transition-all duration-300 touch-action-manipulation ${className}`}
            onClick={() => onOpenLightbox(currentIndex)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
            <img
                src={currentItem.src}
                alt={currentItem.title}
                // ⚡ OPTIMIZATION: First image is eager/high priority. Others lazy.
                loading={currentIndex === 0 ? "eager" : "lazy"}
                fetchPriority={currentIndex === 0 ? "high" : "auto"}
                decoding="async"
                onLoad={() => setIsImageLoaded(true)}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out z-10
                    ${objectFit === 'contain' ? 'object-contain bg-slate-950 p-1 md:p-4' : 'object-cover'}
                    ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'}
                    ${objectFit === 'cover' ? 'group-hover:scale-105' : ''}
                `}
                sizes="(max-width: 768px) 100vw, 33vw"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image')}
            />
            {objectFit === 'cover' && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 opacity-90 pointer-events-none"></div>
            )}
            
            <div className="absolute bottom-0 left-0 w-full p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 {currentItem.tagline && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-1.5 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-950/80 backdrop-blur-md rounded border border-blue-500/30">
                       <Layers size={10} /> {currentItem.tagline}
                    </div>
                 )}
                 <h3 className="text-sm md:text-base font-bold text-white leading-tight drop-shadow-lg line-clamp-2">{currentItem.title}</h3>
                 {currentItem.description && (
                    <p className="text-[10px] md:text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed opacity-80">
                        {currentItem.description}
                    </p>
                 )}
            </div>

            {showOfferBadge && (
                <div className="absolute top-3 right-3 bg-red-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded shadow-lg z-30 animate-pulse pointer-events-none tracking-wider border border-yellow-300 flex items-center gap-1">
                    <Zap size={10} fill="currentColor" /> OFFER
                </div>
            )}
            
            {items.length > 1 && (
                <div className="absolute top-3 left-3 flex gap-1 z-20 pointer-events-none">
                    {items.map((_, idx) => (
                        <span key={idx} className={`h-1 rounded-full shadow-sm transition-all duration-500 ${idx === currentIndex ? 'w-5 bg-blue-500' : 'w-1.5 bg-white/30'}`}></span>
                    ))}
                </div>
            )}
        </div>
    );
});
CarouselCard.displayName = "CarouselCard";


// ============================================================================
// 🚀 MAIN COMPONENT: Gallery
// ============================================================================
const Gallery: React.FC = () => {
    // Desktop State
    const [activeSectionSlide, setActiveSectionSlide] = useState(0); 
    const [isSectionHovered, setIsSectionHovered] = useState(false);
    const [lightboxState, setLightboxState] = useState<{ items: any[], index: number } | null>(null);
    
    // Data Loading
    const content = GALLERY_CONTENT as any;
    const verticalBanners = content?.verticalBanners || [];
    const droneFleet = content?.droneFleet || [];
    const specialOffers = content?.specialOffers || [];
    const innovations = content?.innovations || [];
    const exhibitions = content?.exhibitions || [];
    const pamphletContent = content?.pamphlet || [
        { id: 'def', src: '/gallery/pamphlet.jpeg', title: 'Full Specifications', tagline: 'Brochure' }
    ];

    // 📱 MOBILE DATA MERGE
    const mobileGalleryItems = [
        ...pamphletContent,
        ...specialOffers,
        ...droneFleet,
        ...verticalBanners,
        ...innovations,
        ...exhibitions
    ];

    // --- DESKTOP TIMER ---
    useEffect(() => {
        if (window.innerWidth < 768) return; 
        if (isSectionHovered || lightboxState) return;

        const duration = activeSectionSlide === 0 ? SLIDE_DURATION_PAMPHLET : SLIDE_DURATION_GRID;
        const timer = setTimeout(() => {
            setActiveSectionSlide(prev => (prev === 0 ? 1 : 0));
        }, duration);

        return () => clearTimeout(timer);
    }, [activeSectionSlide, isSectionHovered, lightboxState]);

    // Handlers
    const openLightbox = useCallback((items: any[], index: number) => {
        setLightboxState({ items, index });
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxState(null);
    }, []);

    const nextImage = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setLightboxState(prev => prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : null);
    }, []);

    const prevImage = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setLightboxState(prev => prev ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length } : null);
    }, []);

    const handleWhatsAppClick = (item: any) => {
        const phoneNumber = "+917400468929"; 
        const message = `Hi, I am interested in "${item.title}".`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const nextSection = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSectionSlide(prev => (prev === 0 ? 1 : 0));
    };
    
    const prevSection = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveSectionSlide(prev => (prev === 0 ? 1 : 0));
    };

    return (
        <section 
            id="gallery" 
            className="py-10 md:py-16 bg-slate-950 text-white scroll-mt-20 overflow-hidden border-t border-slate-900"
            onMouseEnter={() => setIsSectionHovered(true)}
            onMouseLeave={() => setIsSectionHovered(false)}
        >
            <div className="container mx-auto px-0 md:px-6 lg:px-8">
                
                {/* --- HEADER --- */}
                <div className="px-4 md:px-0 mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-800/50 pb-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/30 rounded-full border border-blue-900/50">
                            <span className={`w-1.5 h-1.5 rounded-full ${activeSectionSlide === 0 ? 'bg-green-500' : 'bg-blue-500'} animate-pulse`}></span>
                            {activeSectionSlide === 0 ? "Featured Spotlight" : "Operational Grid"}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                            Drone Fleet & Operations Gallery
                        </h2>
                    </div>
                    
                    {/* Navigation Dots */}
                    <div className="hidden md:flex gap-2">
                        <button 
                            onClick={() => setActiveSectionSlide(0)} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeSectionSlide === 0 ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                        />
                        <button 
                            onClick={() => setActiveSectionSlide(1)} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeSectionSlide === 1 ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
                        />
                    </div>
                </div>

                {/* ========================================= */}
                {/* 📱 MOBILE LAYOUT (Horizontal Swipe List)  */}
                {/* ========================================= */}
                <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 no-scrollbar px-4 pt-2">
                    {mobileGalleryItems.map((item, index) => (
                        <MobileSwipeCard 
                            key={item.id || index} 
                            item={item} 
                            // ⚡ OPTIMIZATION: Only the first card gets high priority
                            priority={index === 0}
                            onClick={() => openLightbox(mobileGalleryItems, index)}
                        />
                    ))}
                </div>

                {/* ========================================= */}
                {/* 💻 DESKTOP LAYOUT (The Original Bento)    */}
                {/* ========================================= */}
                <div className="hidden md:block relative group/main min-h-[600px]">
                    
                    <button 
                        onClick={prevSection}
                        aria-label="Previous Image"
                        className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 hover:bg-blue-600 text-white rounded-full border border-white/10 opacity-0 group-hover/main:opacity-100 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div className="relative min-h-[600px] transition-all duration-500 ease-in-out">
                        
                        {/* === SLIDE 1: PAMPHLET === */}
                        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeSectionSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                             <div className="w-full h-[600px]">
                                <CarouselCard 
                                    items={pamphletContent} 
                                    onOpenLightbox={() => openLightbox(pamphletContent, 0)} 
                                    className="h-full w-full border-blue-500/30 bg-slate-900"
                                    objectFit="contain" 
                                />
                            </div>
                        </div>

                        {/* === SLIDE 2: GRID GALLERY === */}
                        <div className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${activeSectionSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                                
                                {/* Col 1 */}
                                <div className="h-full w-full">
                                    <CarouselCard 
                                        items={verticalBanners} 
                                        intervalTime={3000} 
                                        onOpenLightbox={(idx) => openLightbox(verticalBanners, idx)}
                                        className="h-full"
                                        autoPlay={activeSectionSlide === 1} 
                                    />
                                </div>

                                {/* Col 2 */}
                                <div className="flex flex-col gap-4 h-full">
                                    <div className="flex-1 relative">
                                        <CarouselCard 
                                            items={specialOffers} 
                                            intervalTime={4500} 
                                            onOpenLightbox={(idx) => openLightbox(specialOffers, idx)}
                                            showOfferBadge={true}
                                            className="h-full"
                                            autoPlay={activeSectionSlide === 1}
                                        />
                                    </div>
                                    <div className="flex-1 relative">
                                        <CarouselCard 
                                            items={droneFleet} 
                                            intervalTime={3500} 
                                            onOpenLightbox={(idx) => openLightbox(droneFleet, idx)}
                                            className="h-full"
                                            autoPlay={activeSectionSlide === 1}
                                        />
                                    </div>
                                </div>

                                {/* Col 3 */}
                                <div className="flex flex-col gap-4 h-full">
                                    <div className="flex-1 relative">
                                        <CarouselCard 
                                            items={innovations} 
                                            intervalTime={3000} 
                                            onOpenLightbox={(idx) => openLightbox(innovations, idx)}
                                            className="h-full"
                                            autoPlay={activeSectionSlide === 1}
                                        />
                                    </div>
                                    <div className="flex-1 relative">
                                        <CarouselCard 
                                            items={exhibitions} 
                                            intervalTime={3000} 
                                            onOpenLightbox={(idx) => openLightbox(exhibitions, idx)}
                                            className="h-full"
                                            autoPlay={activeSectionSlide === 1}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <button 
                        onClick={nextSection}
                        className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 hover:bg-blue-600 text-white rounded-full border border-white/10 opacity-0 group-hover/main:opacity-100 transition-all"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>

            </div>

            {/* --- LIGHTBOX (unchanged) --- */}
            {lightboxState && (
                <div 
                    className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    <button 
                        className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        <X size={24} />
                    </button>

                    <div 
                        className="relative w-full max-w-5xl max-h-[90vh] bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <div className="relative flex-1 bg-black flex items-center justify-center p-4 group select-none">
                            <img 
                                src={lightboxState.items[lightboxState.index].src} 
                                alt="View" 
                                className="max-w-full max-h-[50vh] md:max-h-[80vh] object-contain"
                            />
                            {lightboxState.items.length > 1 && (
                                <>
                                    <button onClick={prevImage} className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-blue-600 transition-all border border-white/10 opacity-0 group-hover:opacity-100 md:opacity-100">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button onClick={nextImage} className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-blue-600 transition-all border border-white/10 opacity-0 group-hover:opacity-100 md:opacity-100">
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="bg-slate-900/90 backdrop-blur-md p-6 border-t md:border-t-0 md:border-l border-slate-800 w-full md:w-96 flex flex-col shrink-0">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">{lightboxState.items[lightboxState.index].title}</h3>
                                {lightboxState.items[lightboxState.index].tagline && (
                                    <div className="inline-block px-2 py-0.5 mb-4 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-900/30 rounded border border-blue-800">
                                        {lightboxState.items[lightboxState.index].tagline}
                                    </div>
                                )}
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {lightboxState.items[lightboxState.index].description || "Operational view captured during recent field deployment."}
                                </p>
                                <button 
                                    onClick={() => handleWhatsAppClick(lightboxState.items[lightboxState.index])}
                                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-green-900/50 group"
                                >
                                    <MessageCircle size={20} className="group-hover:scale-110 transition-transform"/>
                                    Inquire on WhatsApp
                                </button>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-800">
                                {lightboxState.items[lightboxState.index].location && (
                                    <p className="text-sm text-slate-300 flex items-center gap-2 mb-2">
                                        <MapPin size={14} className="text-blue-500" /> {lightboxState.items[lightboxState.index].location}
                                    </p>
                                )}
                                <div className="text-xs text-slate-500 font-mono text-right">
                                    Image {lightboxState.index + 1} of {lightboxState.items.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;