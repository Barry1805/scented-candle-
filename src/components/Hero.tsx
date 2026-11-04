import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Compass } from 'lucide-react';
import { Currency } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';

interface HeroProps {
  primaryCurrency: Currency;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ primaryCurrency, onOpenQuiz }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] pt-6 pb-16 lg:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Editorial Story & Action (6 columns) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Quiet 1-line kicker with dual price anchor */}
            <div className="inline-flex items-center gap-2 text-xs text-amber-900 font-medium">
              <span>Artisanal Pouring Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Lagos & Global Dispatch</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-stone-900">From ₦42,000 / $28.00</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 tracking-tight leading-[1.08] text-balance">
              Scented candles crafted for ritual, peace & memory.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Hand-poured in small batches using 100% botanical soy and coconut wax, fine French fragrance oils, and crackling wood wicks. Customize your own bespoke blend with personalized label dedications.
            </p>

            {/* Dual Currency Price Transparency Banner */}
            <div className="p-3.5 bg-stone-100/90 rounded-xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-200/60 rounded-md text-amber-900">
                  <Flame className="w-3.5 h-3.5" />
                </span>
                <span className="text-stone-700">
                  Dual-Currency Checkout: Pay in <strong className="text-stone-900">Naira (₦)</strong> or <strong className="text-stone-900">Dollars ($)</strong>
                </span>
              </div>
              <div className="text-[11px] font-mono text-stone-500">
                Fixed Rate: $1.00 = ₦1,500
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#shop"
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm hover:translate-y-[-1px]"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#custom-studio"
                className="px-6 py-3.5 bg-amber-100 hover:bg-amber-200/80 text-amber-950 border border-amber-300 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Customize A Candle</span>
              </a>

              <button
                type="button"
                onClick={onOpenQuiz}
                className="px-4 py-3.5 text-stone-600 hover:text-stone-900 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Find Your Scent Quiz</span>
              </button>
            </div>

          </div>

          {/* RIGHT: High-Fidelity Hero Image Showcase (6 columns) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-300/70 bg-stone-100 aspect-[16/10] sm:aspect-[16/10]">
              <img
                src="/src/assets/images/hero_candle_atelier_1793796449377.jpg"
                alt="Artisanal hand-poured scented candles glowing on a travertine tray with botanical dried lavender and amber glow"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
              
              {/* Image Floating Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div>
                  <span className="font-serif text-base block font-medium">The Sanctuary Collection</span>
                  <span className="text-stone-300 text-[11px]">Sandalwood, Amber & Wild Fig</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-300 block">Starting at</span>
                  <span className="font-semibold text-amber-300 font-mono">₦42,000 / $28.00</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Adjacency Row: 3 Disciplined Trust Proofs */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
          <div className="flex items-start gap-3">
            <span className="text-amber-800 font-serif text-xl font-bold">01.</span>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">100% Non-Toxic Clean Wax</strong>
              <span>Organic Midwest soy & coconut apricot creme. Free from phthalates, parabens, and synthetic dyes.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-800 font-serif text-xl font-bold">02.</span>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Bespoke Custom Studio</strong>
              <span>Personalize vessel materials, fragrance triads, and print customized dedicated messages on luxury labels.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-800 font-serif text-xl font-bold">03.</span>
            <div>
              <strong className="block text-stone-900 font-semibold mb-0.5">Transparent Dual Currency</strong>
              <span>Instant price visibility in both Nigerian Naira (₦) and US Dollars ($) with nationwide and international delivery.</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
