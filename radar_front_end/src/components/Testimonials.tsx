import React, { useState, useEffect } from 'react';
import { Quote, Loader2 } from 'lucide-react';
import { TESTIMONIALS as STATIC_TESTIMONIALS } from '../../constants'; // Fallback
import { Project } from '../../types'; // Assuming Project type or a generic type for structure

// Define a simple type for the fetched testimonial data
interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
}

const Testimonials: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Get API URL (assuming structure based on other components)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                // Assuming an API endpoint for testimonials
                const response = await fetch(`${API_BASE_URL}/gettestimonials.php`);
                if (!response.ok) throw new Error("Network error");

                const json = await response.json();
                
                // Check for successful status AND valid data array
                if (json.status === true && Array.isArray(json.data) && json.data.length > 0) {
                    setTestimonials(json.data);
                } else {
                    // Fallback to static if API fails or returns no data
                    setTestimonials(STATIC_TESTIMONIALS as Testimonial[]);
                }
            } catch (error) {
                console.warn("Using static testimonials:", error);
                setTestimonials(STATIC_TESTIMONIALS as Testimonial[]);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);
    
    // ------------------------------------

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/100?text=User';
    };
    
    // Conditional Rendering of Loader
    if (loading) {
        return (
            <section className="py-10 md:py-12 bg-white text-center border-t border-slate-100">
                <Loader2 className="animate-spin inline-block text-blue-600" size={28} />
                <p className="text-slate-500 text-sm font-medium mt-2">Loading client feedback...</p>
            </section>
        );
    }
    
    // Conditional Rendering of Section (Only show if data exists)
    if (testimonials.length === 0) {
        return null;
    }

    // ------------------------------------

    return (
        <section className="py-10 md:py-12 bg-white border-t border-slate-100"> {/* ⬇️ Reduced vertical padding ⬇️ */}
            <div className="container mx-auto px-4 md:px-8">
                
                {/* Header Section ⬇️ Reduced Spacing and Font Size ⬇️ */}
                <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Trusted by Leaders</h2>
                    <p className="text-slate-500 text-xs">Our protocols protect billions in assets worldwide.</p>
                </div>

                {/* Testimonial Grid ⬇️ Reduced Padding and Font Size ⬇️ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {testimonials.map((testimonial) => (
                        <div 
                            key={testimonial.id} 
                            className="group bg-slate-50 p-4 rounded-xl relative transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-blue-300 border border-transparent"
                        >
                            <Quote className="absolute top-4 right-4 text-blue-300 w-6 h-6 opacity-60 group-hover:text-blue-600 transition-all" /> {/* Reduced icon size and moved closer to corner */}
                            <p className="text-slate-700 leading-snug mb-4 relative z-10 font-medium text-xs"> {/* Reduced font size and leading */}
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-3">
                                <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name} 
                                    className="w-8 h-8 rounded-full object-cover border-1 border-white shadow-sm group-hover:border-blue-600 transition-colors" // ⬇️ Reduced avatar size ⬇️
                                    onError={handleImageError}
                                />
                                <div>
                                    <div className="font-bold text-slate-900 text-xs">{testimonial.name}</div> {/* Reduced font size */}
                                    <div className="text-[9px] text-slate-500">{testimonial.role}, {testimonial.company}</div> {/* Reduced font size */}
                                </div>
                            </div>
                            
                            {/* Neon Glow Line Bottom */}
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl"></div> {/* Reduced height */}
                        </div>
                    ))}
                </div>
                
                {/* ISO Badges ⬇️ Reduced Margin and Padding ⬇️ */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8"> {/* Reduced gap */}
                        {/* Placeholder Badges */}
                        <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                            <div className="w-7 h-7 border border-slate-800 rounded-full flex items-center justify-center font-bold text-[6px] text-slate-800 leading-tight">ISO<br/>27001</div> {/* Reduced size and font */}
                            <div className="text-[9px] font-bold text-slate-700 leading-snug">Information<br/>Security</div> {/* Reduced font */}
                        </div>
                        <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                            <div className="w-7 h-7 border border-slate-800 rounded-full flex items-center justify-center font-bold text-[6px] text-slate-800 leading-tight">SOC<br/>TYPE 2</div>
                            <div className="text-[9px] font-bold text-slate-700 leading-snug">Service Org<br/>Control</div>
                        </div>
                        <div className="flex items-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                            <div className="w-7 h-7 border border-slate-800 rounded-full flex items-center justify-center font-bold text-[6px] text-slate-800 leading-tight">GDPR</div>
                            <div className="text-[9px] font-bold text-slate-700 leading-snug">Data<br/>Protection</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;