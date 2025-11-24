
import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/100?text=User';
  };

  return (
    <section className="py-12 md:py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
           <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Trusted by Leaders</h2>
           <p className="text-slate-500 text-sm">Our protocols protect billions in assets worldwide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="group bg-slate-50 p-6 rounded-3xl relative transition-all duration-300 hover:bg-white hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] border border-transparent hover:border-blue-300"
            >
              <Quote className="absolute top-6 right-6 text-blue-200 w-8 h-8 opacity-50 group-hover:text-primary group-hover:opacity-100 transition-all" />
              <p className="text-slate-700 leading-relaxed mb-6 relative z-10 font-medium text-sm">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-primary transition-colors"
                  onError={handleImageError}
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">{testimonial.name}</div>
                  <div className="text-[10px] text-slate-500">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
              
              {/* Neon Glow Line Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl"></div>
            </div>
          ))}
        </div>
        
        {/* ISO Badges */}
        <div className="mt-12 pt-8 border-t border-slate-100">
           <div className="flex flex-wrap justify-center gap-8 md:gap-12">
             {/* Placeholder Badges using CSS/HTML for cleaner look than external SVG dependencies */}
             <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                <div className="w-8 h-8 border-2 border-slate-800 rounded-full flex items-center justify-center font-bold text-[7px] text-slate-800">ISO<br/>27001</div>
                <div className="text-[10px] font-bold text-slate-700">Information<br/>Security</div>
             </div>
             <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                <div className="w-8 h-8 border-2 border-slate-800 rounded-full flex items-center justify-center font-bold text-[7px] text-slate-800">SOC<br/>TYPE 2</div>
                <div className="text-[10px] font-bold text-slate-700">Service Org<br/>Control</div>
             </div>
             <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all cursor-default">
                <div className="w-8 h-8 border-2 border-slate-800 rounded-full flex items-center justify-center font-bold text-[7px] text-slate-800">GDPR</div>
                <div className="text-[10px] font-bold text-slate-700">Data<br/>Protection</div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
