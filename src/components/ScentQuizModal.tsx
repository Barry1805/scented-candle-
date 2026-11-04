import React, { useState } from 'react';
import { X, Sparkles, Compass, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { CANDLE_PRODUCTS } from '../data/candles';
import { CandleProduct, Currency } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryCurrency: Currency;
  onAddToCart: (product: CandleProduct) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  primaryCurrency,
  onAddToCart
}) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    room: '',
    mood: '',
    texture: ''
  });
  const [recommendedCandle, setRecommendedCandle] = useState<CandleProduct | null>(null);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (field: 'room' | 'mood' | 'texture', value: string) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate match
      let match = CANDLE_PRODUCTS[0];
      if (updated.texture === 'Citrus' || updated.mood === 'Energy') {
        match = CANDLE_PRODUCTS.find(c => c.id === 'candle-03') || CANDLE_PRODUCTS[2];
      } else if (updated.texture === 'Oud' || updated.mood === 'Romantic') {
        match = CANDLE_PRODUCTS.find(c => c.id === 'candle-02') || CANDLE_PRODUCTS[1];
      } else if (updated.texture === 'Spice' || updated.mood === 'Cozy') {
        match = CANDLE_PRODUCTS.find(c => c.id === 'candle-04') || CANDLE_PRODUCTS[3];
      } else {
        match = CANDLE_PRODUCTS.find(c => c.id === 'candle-01') || CANDLE_PRODUCTS[0];
      }
      setRecommendedCandle(match);
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ room: '', mood: '', texture: '' });
    setRecommendedCandle(null);
  };

  const handleAdd = () => {
    if (recommendedCandle) {
      onAddToCart(recommendedCandle);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-800">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Olfactory Scent Profiler
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Answer 3 quick sensory questions to find your candle soulmate.
          </p>

          {step <= 3 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all ${
                    s === step ? 'w-8 bg-amber-800' : s < step ? 'w-4 bg-stone-400' : 'w-4 bg-stone-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Step 1: Room Space */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 text-center">
              1. Where will this candle most often burn?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'living', label: 'Living Room Lounge', desc: 'Open space, welcoming guests' },
                { id: 'bedroom', label: 'Bedroom Sanctuary', desc: 'Winding down, intimate quiet' },
                { id: 'office', label: 'Creative Studio/Desk', desc: 'Focus, inspiration, clarity' },
                { id: 'bath', label: 'Bath & Spa Ritual', desc: 'Warm soaks, deep restorative' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('room', opt.id)}
                  className="p-3.5 rounded-xl border border-stone-200 text-left hover:border-amber-700 hover:bg-amber-50/30 transition-all text-xs"
                >
                  <span className="font-semibold text-stone-900 block">{opt.label}</span>
                  <span className="text-[11px] text-stone-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Atmosphere Mood */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 text-center">
              2. What atmosphere do you wish to invite?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'Grounding', label: 'Grounding Calm', desc: 'Earthy, centering, meditative' },
                { id: 'Energy', label: 'Uplifting Clarity', desc: 'Fresh, vibrant, sparkling' },
                { id: 'Romantic', label: 'Intoxicating Romance', desc: 'Velvet, nocturnal, mysterious' },
                { id: 'Cozy', label: 'Fireside Warmth', desc: 'Spiced chai, roasted woods' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('mood', opt.id)}
                  className="p-3.5 rounded-xl border border-stone-200 text-left hover:border-amber-700 hover:bg-amber-50/30 transition-all text-xs"
                >
                  <span className="font-semibold text-stone-900 block">{opt.label}</span>
                  <span className="text-[11px] text-stone-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Aromatic Note Texture */}
        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 text-center">
              3. Which fragrance chord resonates most?
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'Woods', label: 'Sandalwood & Amber', desc: 'Creamy timbers & bourbon vanilla' },
                { id: 'Citrus', label: 'Bergamot & Neroli', desc: 'Crisp green rind & white petals' },
                { id: 'Oud', label: 'Dark Oud & Jasmine', desc: 'Resinous, rare agarwood & smoke' },
                { id: 'Spice', label: 'Cedar & Tonka', desc: 'Cardamom pods & toasted bean' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect('texture', opt.id)}
                  className="p-3.5 rounded-xl border border-stone-200 text-left hover:border-amber-700 hover:bg-amber-50/30 transition-all text-xs"
                >
                  <span className="font-semibold text-stone-900 block">{opt.label}</span>
                  <span className="text-[11px] text-stone-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Result Match */}
        {step === 4 && recommendedCandle && (
          <div className="space-y-5 animate-in fade-in">
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 block mb-1">
                Your Curated Olfactory Match
              </span>
              <h4 className="text-xl font-serif font-bold text-stone-900">
                {recommendedCandle.name}
              </h4>
              <p className="text-xs text-stone-600 mt-1 mb-3">
                {recommendedCandle.subtitle}
              </p>

              {/* Dual Currency Price Tag */}
              <div className="flex justify-center mb-3">
                <DualPriceTag
                  priceUSD={recommendedCandle.priceUSD}
                  priceNGN={recommendedCandle.priceNGN}
                  primaryCurrency={primaryCurrency}
                  size="lg"
                  showCurrencyLabels={true}
                />
              </div>

              <div className="text-xs text-stone-600 line-clamp-2 italic mb-3">
                "{recommendedCandle.description}"
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    added ? 'bg-emerald-700 text-white' : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Match to Bag</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-2 text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
