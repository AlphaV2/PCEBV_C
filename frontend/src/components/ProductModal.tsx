import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedData';
import { Product } from '../../types';
import { X, MessageCircle, CheckCircle, Briefcase } from 'lucide-react';
import { buildWhatsAppUrl } from '../config';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { t } = useTranslation();
  const translatedProducts = useTranslatedProducts();
  const translatedProduct = translatedProducts.find((item) => item.id === product.id) || product;
  const whatsappUrl = buildWhatsAppUrl(
    t('productModal.whatsappInterest', "Hi, I'm interested in {{product}}", { product: translatedProduct.name })
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/800x600?text=Image+Unavailable';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-2xl max-h-[92dvh] sm:max-h-[90vh] rounded-lg sm:rounded-xl shadow-2xl overflow-hidden flex flex-col relative animate-scale-up border border-slate-700" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-50 backdrop-blur-sm border border-white/10">
          <X size={18} />
        </button>
        
        <div className="relative h-40 sm:h-48 shrink-0 bg-black">
          <img src={translatedProduct.image} alt={translatedProduct.name} className="w-full h-full object-cover opacity-90" onError={handleImageError} />
          <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
             <div className="flex items-center gap-2 mb-1 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                <Briefcase size={12} />
               {t('productModal.solutionPackage', 'Solution Package')}
             </div>
               <h2 className="text-xl sm:text-2xl font-bold text-white break-words">{translatedProduct.name}</h2>
               <p className="text-xs sm:text-sm text-slate-300">{translatedProduct.tagline}</p>
          </div>
        </div>

             <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-900 custom-scrollbar">
          
          <div className="mb-6">
            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{t('productModal.overview', 'Overview')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-blue-600 pl-3">
              {translatedProduct.description}
            </p>
          </div>

          <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">{t('productModal.technicalSpecifications', 'Technical Specifications')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {translatedProduct.specs?.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 text-xs">
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                    <span className="font-mono text-slate-300">{spec}</span>
                </div>
            ))}
          </div>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-900/20 text-sm">
            <MessageCircle size={16} /> {t('productModal.requestPricingDemo', 'Request Pricing & Demo')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;