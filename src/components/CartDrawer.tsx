import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, ArrowRight, Tag, Gift, Check } from 'lucide-react';
import { CartItem, Currency } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';
import { formatNGN, formatUSD } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  primaryCurrency: Currency;
  onProceedToCheckout: (appliedDiscountPercent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  primaryCurrency,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const subtotalUSD = items.reduce((sum, item) => sum + item.unitPriceUSD * item.quantity, 0);
  const subtotalNGN = items.reduce((sum, item) => sum + item.unitPriceNGN * item.quantity, 0);

  const discountPercent = appliedPromo ? appliedPromo.percent : 0;
  const discountUSD = (subtotalUSD * discountPercent) / 100;
  const discountNGN = Math.round((subtotalNGN * discountPercent) / 100);

  const finalUSD = Math.max(0, subtotalUSD - discountUSD);
  const finalNGN = Math.max(0, subtotalNGN - discountNGN);

  // Free shipping threshold: ₦50,000 / ~$35
  const freeThresholdNGN = 50000;
  const freeThresholdUSD = 35;
  const progressPercent = Math.min(100, Math.round((subtotalNGN / freeThresholdNGN) * 100));
  const remainingNGN = Math.max(0, freeThresholdNGN - subtotalNGN);
  const remainingUSD = Math.max(0, freeThresholdUSD - subtotalUSD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME10' || code === 'LAURA10' || code === 'SCENT10') {
      setAppliedPromo({ code, percent: 10 });
      setPromoCode('');
    } else {
      setPromoError('Invalid code. Try "WELCOME10" for 10% off.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-200/50 text-xs">
            {progressPercent >= 100 ? (
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You've unlocked Free Nationwide Delivery!</span>
              </div>
            ) : (
              <div>
                <p className="text-stone-700">
                  Add <strong className="text-stone-900 font-mono">{formatNGN(remainingNGN)}</strong> ({formatUSD(remainingUSD)}) for <strong className="text-amber-900">Free Delivery</strong>
                </p>
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 text-stone-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-stone-300" />
                <p className="font-serif text-lg text-stone-700 mb-1">Your bag is empty</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto mb-6">
                  Discover our curated candles or craft your bespoke creation.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map(item => (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-[#FAF8F5] flex gap-3 text-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-stone-200 overflow-hidden shrink-0 relative">
                    {item.type === 'standard' && item.product ? (
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-900 to-stone-900 flex items-center justify-center text-amber-200">
                        <Sparkles className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-stone-900 text-sm font-serif">
                          {item.type === 'standard' ? item.product?.name : item.bespokeConfig?.customTitle || 'Bespoke Candle'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtitle / Custom specs */}
                      {item.type === 'standard' ? (
                        <p className="text-stone-500 text-[11px] mt-0.5">
                          {item.product?.subtitle}
                        </p>
                      ) : (
                        <div className="text-[10px] text-stone-600 mt-1 space-y-0.5 bg-white/70 p-1.5 rounded">
                          <div><strong>Vessel:</strong> {item.bespokeConfig?.vesselId.replace('-', ' ')} · {item.bespokeConfig?.sizeOz}oz</div>
                          <div><strong>Dedication:</strong> "{item.bespokeConfig?.customDedication}"</div>
                          {item.bespokeConfig?.giftPackaging && (
                            <div className="text-amber-800 font-medium">Includes Luxury Gift Box & Card</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Dual Price & Steppers */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 mt-2">
                      <DualPriceTag
                        priceUSD={item.unitPriceUSD * item.quantity}
                        priceNGN={item.unitPriceNGN * item.quantity}
                        primaryCurrency={primaryCurrency}
                        size="sm"
                        layout="stacked"
                      />

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-stone-600 hover:text-stone-900 font-semibold"
                        >
                          −
                        </button>
                        <span className="px-2 font-mono font-semibold text-stone-900 text-[11px]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-stone-600 hover:text-stone-900 font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  placeholder="Promo code (e.g. WELCOME10)"
                  className="flex-1 text-xs px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700 uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold rounded-lg"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200">
                  <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent}% off)</span>
                  <button 
                    type="button" 
                    onClick={() => setAppliedPromo(null)}
                    className="text-stone-400 hover:text-stone-700 text-xs ml-2"
                  >
                    ✕
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-rose-600">{promoError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <div className="text-right font-mono tabular-nums">
                    <span>{formatNGN(subtotalNGN)}</span>
                    <span className="text-stone-400 ml-1.5">({formatUSD(subtotalUSD)})</span>
                  </div>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedPromo.percent}%):</span>
                    <div className="text-right font-mono tabular-nums">
                      <span>−{formatNGN(discountNGN)}</span>
                      <span className="text-emerald-600 ml-1.5">(−{formatUSD(discountUSD)})</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-stone-200 font-semibold text-stone-900 text-sm">
                  <span>Estimated Total:</span>
                  <DualPriceTag
                    priceUSD={finalUSD}
                    priceNGN={finalNGN}
                    primaryCurrency={primaryCurrency}
                    size="md"
                    layout="stacked"
                  />
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => onProceedToCheckout(discountPercent)}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Proceed to Dual-Currency Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-400">
                🔒 Safe checkout · Accepts Naira & USD via Card, Paystack & Bank Transfer
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
