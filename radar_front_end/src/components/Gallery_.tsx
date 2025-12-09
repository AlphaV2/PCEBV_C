import React, { useState, useEffect } from 'react';
import { GALLERY_CONTENT } from '../../constants';
import { MapPin, Layers, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

// --- SUB-COMPONENT: Carousel Card ---
const CarouselCard = ({ 
    items, 
    intervalTime = 3000, 
    onOpenLightbox,
    showOfferBadge = false,
    className = ""
}: { 
    items: any[], 
    intervalTime?: number, 
    onOpenLightbox: (index: number) => void,
    showOfferBadge?: boolean,
    className?: string
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
            className={`relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-lg cursor-pointer hover:border-blue-500/50 transition-all duration-300 touch-action-manipulation ${className}`}
            onClick={() => onOpenLightbox(currentIndex)}
        >
            <img
                src={currentItem.src}
                alt={currentItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image')}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                 {currentItem.tagline && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mb-1.5 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-950/80 backdrop-blur-md rounded border border-blue-500/30">
                       <Layers size={10} /> {currentItem.tagline}
                    </div>
                 )}
                 <h3 className="text-sm md:text-base font-bold text-white leading-tight drop-shadow-lg line-clamp-2">{currentItem.title}</h3>
                 {currentItem.location && (
                     <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-1 font-medium">
                        <MapPin size={11} className="text-blue-400"/> {currentItem.location}
                     </p>
                 )}
            </div>

            {showOfferBadge && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded shadow-lg z-30 animate-pulse pointer-events-none tracking-wider border border-yellow-300 flex items-center gap-1">
                    <Zap size={10} fill="currentColor" /> OFFER
                </div>
            )}
            
            {/* Progress Indicators */}
            {items.length > 1 && (
                <div className="absolute top-3 left-3 flex gap-1 z-20">
                    {items.map((_, idx) => (
                        <span key={idx} className={`h-1 rounded-full shadow-sm transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-white/40'}`}></span>
                    ))}
                </div>
            )}
        </div>
    );
};


// --- MAIN COMPONENT ---
const Gallery: React.FC = () => {
    const [lightboxState, setLightboxState] = useState<{ items: any[], index: number } | null>(null);

    const content = GALLERY_CONTENT as any;
    const { verticalBanners, droneFleet, specialOffers, innovations, exhibitions } = content;

    // --- Lightbox Handlers ---
    const openLightbox = (items: any[], index: number) => setLightboxState({ items, index });
    const closeLightbox = () => setLightboxState(null);

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
        <section id="gallery" className="py-16 bg-slate-950 text-white scroll-mt-20 overflow-hidden border-t border-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/50 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/30 rounded-full border border-blue-900/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            Visual Intelligence
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Operational Highlights</h2>
                    </div>
                    <p className="text-slate-400 text-sm sm:text-right max-w-sm leading-relaxed">
                        Explore our autonomous field missions, latest drone fleet innovations, and global exhibition showcases.
                    </p>
                </div>

                {/* GRID LAYOUT EXPLAINED:
                   - Mobile (default): Flex-col (stack everything).
                   - Tablet (md): 2 Columns.
                   - Desktop (lg): 3 Columns.
                   - We use `lg:h-[500px]` to lock height on desktop for perfect alignment.
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:h-[550px]">
                    
                    {/* COLUMN 1: Vertical Banner (Tall) */}
                    {/* Mobile: Standard height / Desktop: Full height of grid */}
                    <div className="h-[350px] md:h-[400px] lg:h-full w-full">
                         <CarouselCard 
                            items={verticalBanners || []} 
                            intervalTime={6000} 
                            onOpenLightbox={(idx) => openLightbox(verticalBanners, idx)}
                            className="h-full"
                         />
                    </div>

                    {/* COLUMN 2: Stacked Cards (Offers & Fleet) */}
                    <div className="flex flex-col gap-4 h-[400px] md:h-[400px] lg:h-full">
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                                items={specialOffers || []} 
                                intervalTime={4500} 
                                onOpenLightbox={(idx) => openLightbox(specialOffers, idx)}
                                showOfferBadge={true}
                                className="h-full"
                            />
                         </div>
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                                items={droneFleet || []} 
                                intervalTime={3500} 
                                onOpenLightbox={(idx) => openLightbox(droneFleet, idx)}
                                className="h-full"
                            />
                         </div>
                    </div>

                    {/* COLUMN 3: Stacked Cards (Innovations & Exhibitions) */}
                    {/* On Tablet: Spans full width at bottom (col-span-2) or acts as 3rd col? 
                        Let's keep it simple: On MD it's just a grid cell, might wrap naturally.
                        To make tablet look perfect (2 cols), we can make this stack appear below or side-by-side.
                        Current logic: It will wrap to row 2 on Tablet.
                    */}
                    <div className="flex flex-col gap-4 h-[400px] md:h-[400px] lg:h-full md:col-span-2 lg:col-span-1">
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                                items={innovations || []} 
                                intervalTime={4000} 
                                onOpenLightbox={(idx) => openLightbox(innovations, idx)}
                                className="h-full"
                            />
                         </div>
                         <div className="flex-1 overflow-hidden relative">
                            <CarouselCard 
                               items={exhibitions || []} 
                               intervalTime={5000} 
                               onOpenLightbox={(idx) => openLightbox(exhibitions, idx)}
                               className="h-full"
                            />
                         </div>
                    </div>

                </div>
            </div>

            {/* --- LIGHTBOX (Z-Index Fixed) --- */}
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
                        className="relative w-full max-w-4xl max-h-[85vh] bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Image Area */}
                        <div className="relative flex-1 bg-black flex items-center justify-center p-2 group">
                            <img 
                                src={lightboxState.items[lightboxState.index].src} 
                                alt="View" 
                                className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain"
                            />
                            
                            {lightboxState.items.length > 1 && (
                                <>
                                    <button 
                                        onClick={prevImage}
                                        className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-blue-600 transition-all border border-white/10 opacity-0 group-hover:opacity-100 md:opacity-100 touch-action-manipulation"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        onClick={nextImage}
                                        className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-blue-600 transition-all border border-white/10 opacity-0 group-hover:opacity-100 md:opacity-100 touch-action-manipulation"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Sidebar/Bottom Bar for Info */}
                        <div className="bg-slate-900/50 backdrop-blur-md p-6 border-t md:border-t-0 md:border-l border-slate-800 w-full md:w-80 flex flex-col shrink-0">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2">{lightboxState.items[lightboxState.index].title}</h3>
                                {lightboxState.items[lightboxState.index].tagline && (
                                    <div className="inline-block px-2 py-0.5 mb-4 text-[10px] font-bold tracking-widest text-blue-300 uppercase bg-blue-900/30 rounded border border-blue-800">
                                        {lightboxState.items[lightboxState.index].tagline}
                                    </div>
                                )}
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {lightboxState.items[lightboxState.index].description || "Experience superior aerial surveillance and tactical capabilities."}
                                </p>
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
