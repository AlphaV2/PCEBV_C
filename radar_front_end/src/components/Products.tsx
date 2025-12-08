import React, { useState } from 'react';
import { Zap, Shield, Loader2, Info, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../constants'; 
import ProductModal from './ProductModal'; 

interface ProductsProps {
  onOpenProduct: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onOpenProduct }) => {
  
  return (
    <section id="products" className="py-16 bg-slate-50 scroll-mt-28">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10 max-w-3xl">
           <div className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-widest text-blue-600 uppercase bg-white rounded-md border border-blue-100 shadow-sm">
            Tactical Hardware
          </div>
           <h2 className="text-3xl font-bold text-slate-900 mb-3">Advanced Drone Systems</h2>
           <p className="text-slate-500 text-sm">High-performance aerial solutions for agriculture and surveillance.</p>
        </div>

        {/* Grid - Updated to 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
          {PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              onClick={() => onOpenProduct(product)}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              {/* Image - Reduced Height */}
              <div className="h-40 w-full overflow-hidden relative bg-slate-100 shrink-0"> 
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/800x600?text=Drone+Image')} 
                />
                <div className="absolute top-2 right-2 z-20 px-1.5 py-0.5 bg-white/95 backdrop-blur-md rounded text-[9px] font-bold uppercase border border-slate-200 text-blue-600 shadow-sm flex items-center gap-1">
                  {product.type === 'drone' ? <Zap size={8} /> : <Shield size={8} />} 
                  {product.type === 'drone' ? 'UAV' : 'HDW'}
                </div>
              </div>

              {/* Content - Reduced Padding & Spacing */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-base font-bold mb-1 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{product.name}</h3>
                <p className="text-slate-500 text-[10px] mb-3 font-medium leading-relaxed line-clamp-2">{product.tagline}</p>
                
                {/* Mini Specs (First 2) - Smaller text */}
                <div className="space-y-1.5 mt-auto">
                  {product.specs.slice(0, 2).map((spec, idx) => (
                    <div key={idx} className="flex items-center text-[10px] text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <div className="w-1 h-1 rounded-full bg-blue-500 mr-1.5"></div>
                      <span className="truncate font-medium">{spec}</span>
                    </div>
                  ))}
                  
                  {/* View Details Button */}
                  <div className="pt-2 flex items-center text-blue-600 text-[10px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-1 group-hover:translate-y-0">
                    View Full Specs <ChevronRight size={12} className="ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;