import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedData';
import { Product } from '../../types';
import { X, MessageCircle, Zap, Shield, CheckCircle, Cpu, FileText } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants'; 

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { t } = useTranslation();
  if (!product) return null;

  const translatedProducts = useTranslatedProducts();
  const translatedProduct = translatedProducts.find((item) => item.id === product.id) || product;

  // Dynamic WhatsApp Link
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('productModal.whatsappInterest', "Hi, I'm interested in {{product}}", { product: translatedProduct.name }))}`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/800x600?text=Image+Unavailable';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-xl max-h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up" onClick={e => e.stopPropagation()}>
        
        {/* Header Section */}
        <div className="relative h-48 shrink-0 bg-slate-900">
          <img 
            src={translatedProduct.image} 
            alt={translatedProduct.name} 
            className="w-full h-full object-cover opacity-90" 
            onError={handleImageError} 
          />
          <button onClick={onClose} className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-50 backdrop-blur-sm border border-white/10">
            <X size={18} />
          </button>
          
          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
             <div className="flex items-center gap-2 mb-1 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                {translatedProduct.type === 'drone' ? <Zap size={12} /> : <Shield size={12} />}
               {translatedProduct.type === 'drone' ? t('productModal.aerialSystem', 'Aerial System') : t('productModal.hardware', 'Hardware')}
             </div>
             <h2 className="text-2xl font-bold text-white">{translatedProduct.name}</h2>
             <p className="text-slate-300 text-sm">{translatedProduct.tagline}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 custom-scrollbar">
          
          {/* Description */}
          <div className="mb-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center gap-2">
              <FileText size={14} className="text-blue-600"/> {t('productModal.overview', 'Overview')}
            </h4>
            <p className="text-slate-600 text-xs leading-relaxed">
              {translatedProduct.description}
            </p>
          </div>

          {/* Specs Grid */}
          {translatedProduct.specs && translatedProduct.specs.length > 0 && (
            <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Cpu size={14} className="text-blue-600"/> {t('productModal.technicalSpecifications', 'Technical Specifications')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {translatedProduct.specs.map((spec, i) => {
                        // Split string "Tank: 11 Litres" into ["Tank", "11 Litres"]
                        const [label, value] = spec.includes(':') ? spec.split(':') : [spec, ''];
                        return (
                            <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-xs">
                                <span className="font-medium text-slate-600">{label}</span>
                                {value && <span className="font-mono text-blue-700 font-bold">{value}</span>}
                                {!value && <CheckCircle size={12} className="text-green-500"/>}
                            </div>
                        );
                    })}
                </div>
            </div>
          )}

          {/* CTA Button */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/10 text-sm">
            <MessageCircle size={16} /> {t('productModal.requestPricingDemo', 'Request Pricing & Demo')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;