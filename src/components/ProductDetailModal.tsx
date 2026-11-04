import React, { useState } from 'react';
import { X, Flame, Shield, Clock, Sparkles, Check, ShoppingBag, Heart } from 'lucide-react';
import { CandleProduct, Currency } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';

interface ProductDetailModalProps {
  product: CandleProduct | null;
  isOpen: boolean;
  onClose: () => void;
  primaryCurrency: Currency;
  isWishlisted: boolean;
  onAddToCart: (product: CandleProduct, quantity: number) => void;
  onToggleWishlist: (product: CandleProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  primaryCurrency,
  isWishlisted,
  onAddToCart,
  onToggleWishlist
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left: Product Image */}
          <div className="md:col-span-5 flex flex-col">
            <div className="aspect-[4/3] md:aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded">
                {product.intensity} Throw
              </div>
            </div>

            {/* Quick Specs */}
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-400">Burn Duration:</span>
                <span className="font-medium text-stone-800">{product.burnTimeHours} Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Vessel:</span>
                <span className="font-medium text-stone-800">{product.vesselType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Wax Composition:</span>
                <span className="font-medium text-stone-800">{product.waxType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Wick:</span>
                <span className="font-medium text-stone-800">{product.wickType}</span>
              </div>
            </div>
          </div>

          {/* Right: Olfactory Notes & Actions */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                {product.collection} · {product.scentFamily}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                {product.subtitle}
              </p>

              {/* Dual-currency Price Tag */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 mb-5">
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block mb-1">
                  Retail Price (Dual Currency Tag)
                </span>
                <DualPriceTag
                  priceUSD={product.priceUSD}
                  priceNGN={product.priceNGN}
                  primaryCurrency={primaryCurrency}
                  size="xl"
                  showCurrencyLabels={true}
                />
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Fragrance Pyramid Breakdown */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Olfactory Pyramid Notes
                </h4>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg">
                    <span className="w-14 text-[11px] font-mono uppercase text-stone-400 shrink-0">Top</span>
                    <span className="font-medium text-stone-800">{product.notes.top.join(' · ')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg">
                    <span className="w-14 text-[11px] font-mono uppercase text-stone-400 shrink-0">Heart</span>
                    <span className="font-medium text-stone-800">{product.notes.heart.join(' · ')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-stone-50 rounded-lg">
                    <span className="w-14 text-[11px] font-mono uppercase text-stone-400 shrink-0">Base</span>
                    <span className="font-medium text-stone-800">{product.notes.base.join(' · ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Stepper, Wishlist & Add Button */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 text-sm font-semibold"
                >
                  −
                </button>
                <span className="px-2 text-xs font-semibold tabular-nums text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 text-sm font-semibold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3 rounded-lg border transition-all flex items-center justify-center ${
                  isWishlisted 
                    ? 'border-rose-300 bg-rose-50 text-rose-600' 
                    : 'border-stone-200 hover:border-stone-300 text-stone-600 hover:text-rose-600 bg-white'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  added 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
