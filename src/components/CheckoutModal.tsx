import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Lock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CartItem, Currency } from '../types/candle';
import { NIGERIAN_STATES } from '../data/candles';
import { DualPriceTag } from './DualPriceTag';
import { formatNGN, formatUSD } from '../utils/currency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  primaryCurrency: Currency;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  primaryCurrency,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Folake Adeyemi',
    email: 'folake@example.com',
    phone: '+234 803 123 4567',
    destinationType: 'nigeria' as 'nigeria' | 'international',
    state: 'Lagos',
    country: 'Nigeria',
    streetAddress: '14 Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    notes: 'Please leave package with concierge if unavailable.'
  });

  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'card' | 'transfer'>('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  // Pricing calculations
  const rawSubtotalUSD = items.reduce((sum, item) => sum + item.unitPriceUSD * item.quantity, 0);
  const rawSubtotalNGN = items.reduce((sum, item) => sum + item.unitPriceNGN * item.quantity, 0);

  const discountUSD = (rawSubtotalUSD * discountPercent) / 100;
  const discountNGN = Math.round((rawSubtotalNGN * discountPercent) / 100);

  const discountedSubtotalUSD = rawSubtotalUSD - discountUSD;
  const discountedSubtotalNGN = rawSubtotalNGN - discountNGN;

  // Shipping logic
  let shippingNGN = 0;
  let shippingUSD = 0;

  if (formData.destinationType === 'international') {
    shippingNGN = 25000;
    shippingUSD = 16.67;
  } else {
    // Free shipping threshold for Nigeria: ₦50,000 / $35
    if (rawSubtotalNGN >= 50000) {
      shippingNGN = 0;
      shippingUSD = 0;
    } else if (formData.state === 'Lagos') {
      shippingNGN = 2500;
      shippingUSD = 1.67;
    } else {
      shippingNGN = 4500;
      shippingUSD = 3.00;
    }
  }

  const finalTotalUSD = discountedSubtotalUSD + shippingUSD;
  const finalTotalNGN = discountedSubtotalNGN + shippingNGN;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `LA-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderId(generatedId);
      setStep('confirmation');
      onOrderSuccess();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              {step === 'confirmation' ? 'Order Confirmed' : 'Secure Dual-Currency Checkout'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Details & Address */}
        {step === 'details' && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setStep('payment');
            }} 
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Order Recap Banner */}
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
              <span className="text-stone-600">
                Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items):
              </span>
              <DualPriceTag
                priceUSD={discountedSubtotalUSD}
                priceNGN={discountedSubtotalNGN}
                primaryCurrency={primaryCurrency}
                size="sm"
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                1. Contact & Customer Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-stone-600 block mb-1">Phone Number (For dispatch updates)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                  2. Shipping Destination
                </h4>
                {/* Destination Toggle */}
                <div className="flex bg-stone-100 p-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, destinationType: 'nigeria' })}
                    className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                      formData.destinationType === 'nigeria' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    Nigeria (Nationwide)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, destinationType: 'international' })}
                    className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                      formData.destinationType === 'international' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    International DHL
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.destinationType === 'nigeria' ? (
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Nigerian State</label>
                    <select
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                    >
                      {NIGERIAN_STATES.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] text-stone-600 block mb-1">Destination Country</label>
                    <input
                      type="text"
                      placeholder="e.g. United States, United Kingdom, Canada"
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] text-stone-600 block mb-1">City / Town</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-stone-600 block mb-1">Delivery Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.streetAddress}
                    onChange={e => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              </div>

              {/* Shipping Rate Feedback */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/60 text-xs flex items-center justify-between text-stone-700">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-800" />
                  <span>Calculated Shipping Fee:</span>
                </span>
                <span className="font-mono font-semibold text-stone-900">
                  {shippingNGN === 0 ? (
                    <span className="text-emerald-700">FREE NATIONWIDE SHIPPING</span>
                  ) : (
                    `${formatNGN(shippingNGN)} (${formatUSD(shippingUSD)})`
                  )}
                </span>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Selection & Review */}
        {step === 'payment' && (
          <form onSubmit={handlePay} className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                Select Preferred Payment Method
              </h4>

              <div className="space-y-3">
                {/* Paystack */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paystack')}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'paystack'
                      ? 'border-amber-700 bg-amber-50/50 ring-1 ring-amber-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-700 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-xs text-stone-900 block">
                      Paystack Instant Gateway (Debit Card / USSD / Bank)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Supports all Nigerian bank cards (Mastercard, Visa, Verve) & USSD transfer.
                    </span>
                  </div>
                </button>

                {/* Direct Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'transfer'
                      ? 'border-amber-700 bg-amber-50/50 ring-1 ring-amber-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-stone-700 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-xs text-stone-900 block">
                      Direct Nigerian Bank Transfer
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Transfer directly to our atelier GTBank or Zenith business account.
                    </span>
                  </div>
                </button>

                {/* International Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-amber-700 bg-amber-50/50 ring-1 ring-amber-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <Lock className="w-5 h-5 text-stone-700 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-xs text-stone-900 block">
                      International Credit Card (USD / Multi-currency)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Billed smoothly in US Dollars ($) for international cardholders.
                    </span>
                  </div>
                </button>
              </div>

              {/* If bank transfer chosen, show account details */}
              {paymentMethod === 'transfer' && (
                <div className="mt-4 p-4 bg-stone-100 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <div className="font-semibold text-stone-900">Atelier Bank Details:</div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Bank:</span>
                    <span className="font-mono font-medium">Guaranty Trust Bank (GTBank)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Account Name:</span>
                    <span className="font-mono font-medium">L'AURA ATELIER FRAGRANCES</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Account Number:</span>
                    <span className="font-mono font-bold text-amber-900">0129482019</span>
                  </div>
                </div>
              )}
            </div>

            {/* Total Price Tag Breakdown */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal:</span>
                <span className="font-mono">{formatNGN(discountedSubtotalNGN)} ({formatUSD(discountedSubtotalUSD)})</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery ({formData.state}):</span>
                <span className="font-mono">
                  {shippingNGN === 0 ? 'FREE' : `${formatNGN(shippingNGN)} (${formatUSD(shippingUSD)})`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-900 font-bold text-sm">
                <span>Total Due (Dual Currency):</span>
                <DualPriceTag
                  priceUSD={finalTotalUSD}
                  priceNGN={finalTotalNGN}
                  primaryCurrency={primaryCurrency}
                  size="md"
                  layout="stacked"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-stone-500 hover:text-stone-900 px-3 py-2"
              >
                ← Back to Address
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
              >
                {isProcessing ? (
                  <span>Authorizing Dual-Currency Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Pay {primaryCurrency === 'NGN' ? formatNGN(finalTotalNGN) : formatUSD(finalTotalUSD)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 'confirmation' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest font-mono text-amber-800 font-semibold block mb-1">
                Thank You For Your Order
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Your Atelier Candle Is Being Poured
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Order reference: <strong className="font-mono text-stone-800">{confirmedOrderId}</strong>
              </p>
            </div>

            {/* Dual Currency Receipt Box */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-left space-y-2 max-w-md mx-auto">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Recipient:</span>
                <span className="font-medium text-stone-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Destination:</span>
                <span className="font-medium text-stone-900">{formData.streetAddress}, {formData.city}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-medium text-emerald-700">Confirmed (Dual Currency Verified)</span>
              </div>
              <div className="flex justify-between pt-1 font-semibold text-stone-900">
                <span>Total Amount:</span>
                <span className="font-mono">{formatNGN(finalTotalNGN)} / {formatUSD(finalTotalUSD)}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We have dispatched a confirmation email to <strong>{formData.email}</strong>. Small-batch pouring takes 24 hours to cure before dispatch.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
            >
              Return to Candle Boutique
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
