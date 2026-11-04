import React, { useState } from 'react';
import { ShoppingBag, Eye, Star, Flame, Check, Heart } from 'lucide-react';
import { CandleProduct, Currency } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';

interface ProductCardProps {
  product: CandleProduct;
  primaryCurrency: Currency;
  isWishlisted: boolean;
  onAddToCart: (product: CandleProduct) => void;
  onToggleWishlist: (product: CandleProduct) => void;
  onQuickView: (product: CandleProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  primaryCurrency,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView
}) => {
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article 
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer relative"
    >
      {/* 1. Image Container (takes 65-70% visual focus on neutral solid backdrop) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={`${product.name} scented candle`}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Styled Fallback Container */
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-600 p-6 text-center">
            <Flame className="w-8 h-8 text-amber-700 mb-2" />
            <span className="font-serif font-semibold text-stone-800">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.collection}</span>
          </div>
        )}

        {/* Wishlist Heart Button (Always accessible) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all shadow-xs ${
            isWishlisted
              ? 'bg-white text-rose-600 shadow-md ring-1 ring-rose-200'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600'
          }`}
          title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-rose-600 scale-110' : ''}`} />
        </button>

        {/* Hover Quick Action Layer */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-3.5 py-2 bg-white/95 hover:bg-white text-stone-900 rounded-lg text-xs font-medium shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
            aria-label={`View details for ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Notes</span>
          </button>
        </div>

        {/* Subtle 1-line tag if featured */}
        {product.featured && (
          <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded">
            Atelier Classic
          </div>
        )}
      </div>

      {/* 2. Product Information & Pricing Details */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Clean unboxed metadata with typographic separators (§1.A Zero-Pill) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5">
            <span className="font-medium uppercase tracking-wider text-[11px] text-amber-900">
              {product.collection}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.burnTimeHours} hrs burn</span>
            <span aria-hidden="true">·</span>
            <span>{product.sizeOz} oz</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-tight leading-snug group-hover:text-amber-900 transition-colors">
            {product.name}
          </h3>

          {/* Subtitle / Key Scent Notes */}
          <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Scent notes chord sneak-peek */}
          <div className="mt-2.5 text-[11px] text-stone-500 flex flex-wrap gap-1 items-center">
            <span className="text-stone-400">Notes:</span>
            <span className="text-stone-700">{product.notes.top[0]}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-700">{product.notes.heart[0]}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-700">{product.notes.base[0]}</span>
          </div>
        </div>

        {/* Bottom Card Footer: Dual Currency Price Tag + Add to Bag */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Dual-currency price tag showing BOTH Naira and Dollar */}
          <DualPriceTag
            priceUSD={product.priceUSD}
            priceNGN={product.priceNGN}
            primaryCurrency={primaryCurrency}
            size="md"
            layout="stacked"
          />

          <button
            type="button"
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
