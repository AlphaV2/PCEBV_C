import React, { useState, useEffect } from 'react';
import { GALLERY_CONTENT } from '../../constants';
import { MapPin, Layers, X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- SUB-COMPONENT: Carousel Card ---
const CarouselCard = ({ 
    items, 
    intervalTime = 3000, 
    onOpenLightbox, // 🚨 Updated prop to pass index
    showOfferBadge = false
}: { 
    items: any[], 
    intervalTime?: number, 
    onOpenLightbox: (index: number) => void,
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
            className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-800 shadow-md h-full w-full cursor-pointer hover:border-blue-500/50 transition-all duration-300"
            // 🚨 Pass the current index so Lightbox knows where to start
            onClick={() => onOpenLightbox(currentIndex)}
        >
            <img
                src={currentItem.src}
                alt={currentItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image')}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-80"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-3 z-20 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                 {currentItem.tagline && (
                    <div className="inline-flex items-center gap-1 px-1.5 py-0.5 mb-1 text-[8px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/90 backdrop-blur-sm rounded border border-blue-800/50 shadow-sm">
                       <Layers size={8} /> {currentItem.tagline}
                    </div>
                 )}
                 <h3 className="text-sm font-bold text-white leading-snug drop-shadow-md line-clamp-1">{currentItem.title}</h3>
                 {currentItem.location && (
                     <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><MapPin size={10}/> {currentItem.location}</p>
                 )}
            </div>

            {showOfferBadge && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-[9px] font-extrabold px-2 py-0.5 rounded-sm shadow-lg z-30 animate-pulse pointer-events-none tracking-wide border border-yellow-400">
                    OFFER
                </div>
            )}
            
            {items.length > 1 && (
                <div className="absolute top-2 left-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {items.map((_, idx) => (
                        <span key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-3 bg-blue-500' : 'w-1 bg-white/30'}`}></span>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- MAIN COMPONENT ---
const Gallery: React.FC = () => {
    // 🚨 NEW STATE: Holds the entire list being viewed AND the current index
    const [lightboxState, setLightboxState] = useState<{ items: any[], index: number } | null>(null);

    const content = GALLERY_CONTENT as any;
    const { verticalBanners, droneFleet, specialOffers, innovations, exhibitions } = content;

    // --- Lightbox Handlers ---
    const openLightbox = (items: any[], index: number) => {
        setLightboxState({ items, index });
    };

    const closeLightbox = () => {
        setLightboxState(null);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!lightboxState) return;
        const nextIndex = (lightboxState.index + 1) % lightboxState.items.length;
        setLightboxState({ ...lightboxState, index: nextIndex });
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!lightboxState) return;
        const prevIndex = (lightboxState.index - 1 + lightboxState.items.length) % lightboxState.items.length;
        setLightboxState({ ...lightboxState, index: prevIndex });
    };

    return (
        <section id="gallery" className="py-12 bg-slate-950 text-white scroll-mt-20 overflow-hidden border-t border-slate-900">
            <div className="container mx-auto px-4 md:px-8">
                
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 mb-2 text-[9px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/50 rounded-full border border-blue-900">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            Visual Intelligence
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">Operational Highlights</h2>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-right max-w-xs">
                        From autonomous field missions to global exhibitions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:h-[400px] lg:h-[450px]">
                    
                    {/* COL 1 */}
                    <div className="h-[250px] md:h-full lg:col-span-1">
                         <CarouselCard 
                            items={verticalBanners || []} 
                            intervalTime={6000} 
                            onOpenLightbox={(idx) => openLightbox(verticalBanners, idx)}
                         />
                    </div>

                    {/* COL 2 */}
                    <div className="flex flex-col gap-3 h-[300px] md:h-full lg:col-span-1">
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                                items={specialOffers || []} 
                                intervalTime={4500} 
                                onOpenLightbox={(idx) => openLightbox(specialOffers, idx)}
                                showOfferBadge={true}
                            />
                         </div>
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                                items={droneFleet || []} 
                                intervalTime={3500} 
                                onOpenLightbox={(idx) => openLightbox(droneFleet, idx)}
                            />
                         </div>
                    </div>

                    {/* COL 3 */}
                    <div className="flex flex-col gap-3 h-[300px] md:h-full md:col-span-2 lg:col-span-1">
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                                items={innovations || []} 
                                intervalTime={4000} 
                                onOpenLightbox={(idx) => openLightbox(innovations, idx)}
                            />
                         </div>
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                               items={exhibitions || []} 
                               intervalTime={5000} 
                               onOpenLightbox={(idx) => openLightbox(exhibitions, idx)}
                            />
                         </div>
                    </div>

                </div>
            </div>

            {/* --- MEDIUM FIT LIGHTBOX WITH MANUAL CONTROLS --- */}
            {lightboxState && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button 
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full z-50"
                        onClick={closeLightbox}
                    >
                        <X size={20} />
                    </button>

                    {/* 🚨 MEDIUM FIT CONTAINER 🚨 */}
                    <div 
                        className="relative w-full max-w-3xl max-h-[85vh] bg-black rounded-lg shadow-2xl flex flex-col overflow-hidden border border-slate-800"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Image Viewer */}
                        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                            <img 
                                src={lightboxState.items[lightboxState.index].src} 
                                alt="View" 
                                className="max-w-full max-h-[70vh] object-contain"
                            />
                            
                            {/* 🚨 LEFT / RIGHT BUTTONS 🚨 */}
                            {lightboxState.items.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-blue-600 transition-all border border-white/10"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-blue-600 transition-all border border-white/10"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Caption Footer */}
                        <div className="bg-slate-900 p-4 border-t border-slate-800 shrink-0">
                            <h3 className="text-lg font-bold text-white">{lightboxState.items[lightboxState.index].title}</h3>
                            {lightboxState.items[lightboxState.index].location && (
                                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                                    <MapPin size={12} /> {lightboxState.items[lightboxState.index].location}
                                </p>
                            )}
                            <div className="mt-2 text-xs text-slate-600 font-mono text-right">
                                {lightboxState.index + 1} / {lightboxState.items.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;