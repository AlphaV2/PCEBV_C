import React, { useState, useEffect } from 'react';
// Assuming Product type is defined in a global types file or constants.ts
import { X, MessageCircle, FileText, Download, Phone, Loader2 } from 'lucide-react';
import { PRODUCTS } from '../constants'; // Fallback import or used for initial Product type validation

interface Product {
    id: number;
    name: string;
    tagline: string;
    description: string;
    image: string;
    type: 'drone' | 'sec';
    specs: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💡 Backend Integration: Fetch products dynamically
    fetch('http://localhost:5000/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch products, falling back to mock data if available:", error);
        // Fallback to local mock data if backend fails
        setProducts(PRODUCTS as Product[] || []); 
        setLoading(false);
      });
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Unavailable'; // Fallback
  };

  if (loading) {
    return <section id="products" className="text-center py-20 bg-slate-50 scroll-mt-28"><Loader2 className="animate-spin inline-block mr-2 text-primary" size={24} /> Loading Products...</section>;
  }
  
  return (
    <section id="products" className="py-16 bg-slate-50 text-slate-900 relative overflow-hidden scroll-mt-28">
      {/* Light Grid Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8">
          <div className="max-w-2xl">
             <div className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold tracking-widest text-primary uppercase bg-blue-50 rounded-md border border-blue-100">
              Tactical Hardware
            </div>
             <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">
              Drone Inventory
            </h2>
            <p className="text-slate-500 text-sm max-w-xl">
              Proprietary technology designed for high-stakes environments. From autonomous perimeter defense to zero-trust IoT nodes.
            </p>
          </div>
          <a href="#contact" className="mt-4 md:mt-0 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-all text-xs font-semibold flex items-center gap-2 text-slate-700 shadow-sm">
            <FileText size={14} />
            Request Full Catalog
          </a>
        </div>

        {/* Grid Updated: 4 columns, compact gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Reduced Image Height */}
              <div className="h-40 w-full overflow-hidden relative bg-slate-100 shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={handleImageError}
                />
                <div className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono border border-slate-200 text-primary shadow-sm">
                  {product.type === 'drone' ? 'UAV' : 'SEC'}
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                   <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-white/50 rounded-md text-xs font-bold text-primary shadow-sm">View Details</span>
                </div>
              </div>
              
              {/* Compact Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold mb-0.5 text-slate-900 group-hover:text-primary transition-colors truncate">{product.name}</h3>
                <p className="text-slate-500 text-[10px] mb-3 font-medium flex-1 line-clamp-2">{product.tagline}</p>
                
                <div className="space-y-1.5 mt-auto">
                  {product.specs?.slice(0, 2).map((spec, idx) => (
                    <div key={idx} className="flex items-center text-[10px] text-slate-600 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                      <div className="w-1 h-1 rounded-full bg-primary mr-1.5"></div>
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Enterprise</span>
                   <span className="text-[10px] font-bold text-primary">Get Quote</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal (with dynamic WhatsApp link) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white text-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors z-20 backdrop-blur-md"
              aria-label="Close"
            >
              <X size={20} className="text-white" />
            </button>

            <div className="h-80 w-full bg-slate-100 relative group overflow-hidden">
               <img 
                 src={selectedProduct.image} 
                 alt={selectedProduct.name} 
                 className="w-full h-full object-cover" 
                 onError={handleImageError}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
               <div className="absolute bottom-6 left-8 text-white">
                 <p className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-1">{selectedProduct.type === 'drone' ? 'Aerial Defense' : 'Software Security'}</p>
                 <h3 className="text-4xl font-bold">{selectedProduct.name}</h3>
               </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                   <p className="text-lg text-slate-600 leading-relaxed mb-6">
                     {selectedProduct.description}
                   </p>
                   
                   <div className="mb-8">
                     <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                       Technical Specifications
                       <span className="h-px flex-1 bg-slate-200"></span>
                     </h4>
                     <div className="grid grid-cols-1 gap-3">
                       {selectedProduct.specs?.map((spec, i) => (
                         <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <span className="text-sm text-slate-500 font-medium">Spec {i+1}</span>
                            <span className="text-sm font-bold text-slate-900">{spec}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>

                <div className="w-full md:w-72 flex flex-col gap-4">
                  <div className="p-4 bg-slate-900 rounded-xl text-white text-center mb-2">
                     <div className="text-sm text-slate-400 mb-1">Estimated Price</div>
                     <div className="text-2xl font-bold text-green-400">Request Quote</div>
                     <div className="text-xs text-slate-500 mt-1">Enterprise Licensing</div>
                  </div>

                  {/* Dynamic WhatsApp Quote Request */}
                  {(() => {
                    const prefilledMessage = `Hello, I am interested in requesting a quote for your product: ${selectedProduct.name} (${selectedProduct.tagline}). Please contact me with more details.`;
                    const whatsappLink = `https://wa.me/YOUR_PHONE_NUMBER?text=${encodeURIComponent(prefilledMessage)}`;
                    return (
                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 bg-primary hover:bg-blue-800 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 text-center"
                      >
                         <FileText size={18} />
                         Request Quotation
                      </a>
                    );
                  })()}

                  <a 
                    href={`https://wa.me/YOUR_PHONE_NUMBER?text=Hi, please arrange a callback regarding the ${encodeURIComponent(selectedProduct.name)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                  >
                    <Phone size={18} />
                    Request Call Back
                  </a>
                  
                  <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm">
                    <Download size={16} />
                    Download Brochure
                  </button>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                     <p className="text-xs text-blue-800 leading-tight">
                       <strong>Direct Enquiry:</strong> Clicking the buttons above opens a WhatsApp chat with pre-filled product details for faster processing.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;