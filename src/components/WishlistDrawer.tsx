import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  UserCheck, 
  UserPlus, 
  ArrowRight,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { WishlistItem, Currency, UserProfile, CandleProduct, CustomCandleConfig } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';
import { formatNGN, formatUSD } from '../utils/currency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemoveItem: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
  onAddAllToCart: () => void;
  primaryCurrency: Currency;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onAddToCart,
  onAddAllToCart,
  primaryCurrency,
  currentUser,
  onOpenAuth,
  onClearWishlist
}) => {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSingleAdd = (item: WishlistItem) => {
    onAddToCart(item);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-700 fill-amber-700" />
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Personal Wishlist ({items.length})
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                  title="Share wishlist"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Session Persistence Status Banner */}
          <div className="px-6 py-3.5 border-b text-xs">
            {currentUser && currentUser.isRegistered ? (
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-950">
                    Persistent Across Sessions
                  </p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Saved to account <strong className="font-mono">{currentUser.email}</strong>. Automatically restored on all devices.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50/90 border border-amber-200/80 rounded-xl space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-900 block">
                      Guest Session Wishlist
                    </span>
                    <p className="text-[11px] text-stone-600 leading-snug mt-0.5">
                      Your items are saved for this browser session. Sign in to preserve your curated candles indefinitely across devices.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign In to Save Permanently</span>
                </button>
              </div>
            )}
          </div>

          {copiedLink && (
            <div className="mx-6 mt-3 py-2 px-3 bg-stone-900 text-white text-[11px] rounded-lg text-center animate-in fade-in">
              Wishlist link copied to clipboard!
            </div>
          )}

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-stone-500">
                <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                  <Heart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <p className="font-serif text-lg text-stone-800 mb-1">
                  Your wishlist is empty
                </p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                  Browse our artisanal collection or design a bespoke custom blend and tap the heart icon to curate your personal favorites.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-[#FAF8F5] flex gap-3 text-xs shadow-xs hover:border-stone-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-lg bg-stone-200 overflow-hidden shrink-0 relative">
                    {item.type === 'standard' && item.product ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-900 via-stone-900 to-black flex items-center justify-center text-amber-200">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Info & Actions */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-stone-900 text-sm font-serif">
                          {item.type === 'standard'
                            ? item.product?.name
                            : item.bespokeConfig?.customTitle || 'Bespoke Candle'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtitle / Custom specs */}
                      {item.type === 'standard' ? (
                        <p className="text-stone-500 text-[11px] mt-0.5 line-clamp-1">
                          {item.product?.subtitle}
                        </p>
                      ) : (
                        <div className="text-[10px] text-stone-600 mt-1 space-y-0.5 bg-white/70 p-1.5 rounded">
                          <div>
                            <strong>Vessel:</strong>{' '}
                            {item.bespokeConfig?.vesselId.replace('-', ' ')} ·{' '}
                            {item.bespokeConfig?.sizeOz}oz
                          </div>
                          {item.bespokeConfig?.customDedication && (
                            <div className="italic text-stone-500">
                              "{item.bespokeConfig.customDedication}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dual Price Tag & Move to Bag Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 mt-2">
                      <DualPriceTag
                        priceUSD={item.priceUSD}
                        priceNGN={item.priceNGN}
                        primaryCurrency={primaryCurrency}
                        size="sm"
                        layout="stacked"
                      />

                      <button
                        type="button"
                        onClick={() => handleSingleAdd(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          addedIds[item.id]
                            ? 'bg-emerald-700 text-white'
                            : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                        }`}
                      >
                        {addedIds[item.id] ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Move to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              <button
                type="button"
                onClick={onAddAllToCart}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
              </button>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                <button
                  type="button"
                  onClick={onClearWishlist}
                  className="hover:text-rose-600 transition-colors"
                >
                  Clear Wishlist
                </button>
                <span>Dual Currency Pricing in ₦ and $</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
