import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  FlameKindling, 
  Check, 
  Volume2, 
  VolumeX, 
  Gift, 
  Layers, 
  Feather, 
  RotateCcw,
  ShoppingBag,
  Sliders,
  Heart
} from 'lucide-react';
import { 
  VESSEL_OPTIONS, 
  WAX_OPTIONS, 
  WICK_OPTIONS, 
  FRAGRANCE_PRESETS,
  TOP_NOTES_LIST,
  HEART_NOTES_LIST,
  BASE_NOTES_LIST 
} from '../data/candles';
import { CustomCandleConfig, Currency } from '../types/candle';
import { DualPriceTag } from './DualPriceTag';
import { convertUSDToNGN } from '../utils/currency';

interface BespokeStudioProps {
  primaryCurrency: Currency;
  onAddToCart: (config: CustomCandleConfig, priceUSD: number, priceNGN: number) => void;
  onSaveToWishlist?: (config: CustomCandleConfig, priceUSD: number, priceNGN: number) => void;
}

const DEFAULT_CONFIG: CustomCandleConfig = {
  vesselId: 'amber-glass',
  sizeOz: 8,
  waxId: 'soy',
  wickId: 'wood-crackling',
  scentBlendType: 'preset',
  presetId: 'preset-sanctuary',
  topNote: 'Italian Bergamot',
  heartNote: 'Velvet Sandalwood',
  baseNote: 'Golden Resinous Amber',
  scentIntensity: 'Balanced',
  customTitle: 'Sanctuary of Calm',
  customSubtitle: 'Hand-poured Small Batch',
  customDedication: 'May this light bring peace & warmth to your home',
  dateOrLocation: 'Lagos Atelier · 2026',
  labelFont: 'serif',
  lidOption: 'brass',
  giftPackaging: true,
  giftCardMessage: 'Specially crafted for someone extraordinary.',
  waxColorTint: 'natural-cream'
};

export const BespokeStudio: React.FC<BespokeStudioProps> = ({ primaryCurrency, onAddToCart, onSaveToWishlist }) => {
  const [config, setConfig] = useState<CustomCandleConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'vessel' | 'wax-wick' | 'fragrance' | 'label' | 'finishing'>('vessel');
  const [isLit, setIsLit] = useState(true);
  const [isCracklePlaying, setIsCracklePlaying] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [wishlistToast, setWishlistToast] = useState(false);

  const handleSaveWishlist = () => {
    if (onSaveToWishlist) {
      onSaveToWishlist(config, totalUSD, totalNGN);
      setWishlistToast(true);
      setTimeout(() => setWishlistToast(false), 3000);
    }
  };

  // Selected entities
  const selectedVessel = VESSEL_OPTIONS.find(v => v.id === config.vesselId) || VESSEL_OPTIONS[0];
  const selectedWax = WAX_OPTIONS.find(w => w.id === config.waxId) || WAX_OPTIONS[0];
  const selectedWick = WICK_OPTIONS.find(w => w.id === config.wickId) || WICK_OPTIONS[0];
  const selectedPreset = FRAGRANCE_PRESETS.find(p => p.id === config.presetId) || FRAGRANCE_PRESETS[0];

  // Size multipliers
  const sizeCostMultiplier: Record<4 | 8 | 14, { usd: number; ngn: number }> = {
    4: { usd: -6, ngn: -9000 },
    8: { usd: 0, ngn: 0 },
    14: { usd: 12, ngn: 18000 }
  };

  const lidCost: Record<string, { usd: number; ngn: number }> = {
    brass: { usd: 4, ngn: 6000 },
    walnut: { usd: 5, ngn: 7500 },
    black: { usd: 3, ngn: 4500 },
    none: { usd: 0, ngn: 0 }
  };

  const giftCost = config.giftPackaging ? { usd: 5, ngn: 7500 } : { usd: 0, ngn: 0 };

  // Calculate total costs
  const basePriceUSD = selectedVessel.basePriceUSD;
  const basePriceNGN = selectedVessel.basePriceNGN;

  const totalUSD = basePriceUSD + 
    sizeCostMultiplier[config.sizeOz].usd + 
    selectedWax.addedPriceUSD + 
    selectedWick.addedPriceUSD + 
    lidCost[config.lidOption].usd + 
    giftCost.usd;

  const totalNGN = basePriceNGN + 
    sizeCostMultiplier[config.sizeOz].ngn + 
    selectedWax.addedPriceNGN + 
    selectedWick.addedPriceNGN + 
    lidCost[config.lidOption].ngn + 
    giftCost.ngn;

  // Sound effect simulation
  const toggleSound = () => {
    setIsCracklePlaying(!isCracklePlaying);
  };

  const handleAdd = () => {
    onAddToCart(config, totalUSD, totalNGN);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  // Font styling for label
  const fontClasses = {
    serif: 'font-serif tracking-normal',
    sans: 'font-sans uppercase tracking-widest text-xs',
    typewriter: 'font-mono tracking-tight text-xs',
    script: 'font-serif italic tracking-wide'
  };

  return (
    <section id="custom-studio" className="py-20 bg-[#F5F2EB] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
            Bespoke Fragrance Studio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight text-balance">
            Design Your Signature Custom Candle
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Choose handcrafted vessels, custom fragrance oil architecture, clean natural waxes, and personal label messages with real-time pricing in both Naira (₦) and US Dollars ($).
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Live Interactive Visual Candle Preview (5 columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-stone-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-stone-800">
              
              {/* Preview Atmosphere Glow */}
              <div 
                className={`absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
                  isLit ? 'opacity-40 bg-amber-500' : 'opacity-0'
                }`}
              />

              {/* Preview Control Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6 text-xs text-stone-400">
                <span className="flex items-center gap-1.5 font-medium text-stone-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Live Atelier Preview
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLit(!isLit)}
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                      isLit 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' 
                        : 'bg-stone-800 text-stone-400 border border-stone-700 hover:text-white'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${isLit ? 'text-amber-400 fill-amber-400 animate-pulse' : ''}`} />
                    {isLit ? 'Extinguish' : 'Light Flame'}
                  </button>
                  <button
                    onClick={toggleSound}
                    type="button"
                    title={isCracklePlaying ? 'Mute crackle ambience' : 'Play crackle audio cue'}
                    className={`p-1.5 rounded-full border transition-colors ${
                      isCracklePlaying 
                        ? 'bg-amber-900/40 border-amber-600 text-amber-300' 
                        : 'border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {isCracklePlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Central Candle Graphic Renderer */}
              <div className="h-84 flex flex-col items-center justify-end relative pb-4">
                
                {/* Flame and Wick */}
                <div className="relative flex flex-col items-center mb-0 z-20">
                  {/* Glowing Flame */}
                  {isLit && (
                    <div className="relative mb-0 flex flex-col items-center">
                      <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-300 to-amber-100 rounded-full blur-[0.5px] shadow-[0_0_24px_rgba(245,158,11,0.9)] animate-candle-flame" />
                      <div className="w-2.5 h-4 bg-amber-100 rounded-full -mt-5 blur-[0.3px]" />
                    </div>
                  )}

                  {/* Wick Rendering */}
                  {config.wickId === 'wood-crackling' ? (
                    <div className="w-4 h-3 bg-stone-900 border-x border-amber-900/60 shadow-inner rounded-t-xs" />
                  ) : config.wickId === 'dual-cotton' ? (
                    <div className="flex gap-4">
                      <div className="w-1 h-3 bg-stone-900 rounded-t" />
                      <div className="w-1 h-3 bg-stone-900 rounded-t" />
                    </div>
                  ) : (
                    <div className="w-1 h-3 bg-stone-900 rounded-t" />
                  )}
                </div>

                {/* Vessel Physical Body */}
                <div 
                  className={`w-52 sm:w-60 rounded-b-2xl border transition-all duration-300 relative shadow-2xl overflow-hidden flex flex-col justify-between ${
                    config.sizeOz === 4 ? 'h-44' : config.sizeOz === 8 ? 'h-56' : 'h-64'
                  } ${
                    config.vesselId === 'amber-glass' 
                      ? 'bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 border-amber-800/80 shadow-[inset_0_2px_15px_rgba(245,158,11,0.2)]'
                      : config.vesselId === 'matte-ceramic'
                      ? 'bg-stone-900 border-stone-700/80 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]'
                      : config.vesselId === 'frosted-fluted'
                      ? 'bg-gradient-to-b from-stone-200 via-stone-100 to-stone-300 border-stone-300 text-stone-900'
                      : 'bg-gradient-to-b from-amber-800 via-orange-950 to-stone-900 border-amber-700'
                  }`}
                >
                  {/* Rim Detail with optional lid */}
                  <div className="h-4 w-full border-b border-black/20 flex items-center justify-center relative">
                    {config.lidOption !== 'none' && (
                      <div 
                        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-[104%] h-3 rounded-t-sm shadow-md ${
                          config.lidOption === 'brass' 
                            ? 'bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 border border-amber-300/60'
                            : config.lidOption === 'walnut'
                            ? 'bg-amber-950 border border-amber-900'
                            : 'bg-stone-900 border border-stone-800'
                        }`}
                      />
                    )}
                    {/* Wax Top Layer */}
                    <div 
                      className={`w-[90%] h-2 rounded-full shadow-inner ${
                        config.waxColorTint === 'warm-amber' 
                          ? 'bg-amber-200' 
                          : config.waxColorTint === 'botanical-sage' 
                          ? 'bg-stone-300' 
                          : config.waxColorTint === 'charcoal-noir'
                          ? 'bg-stone-800'
                          : 'bg-[#FBF8EF]'
                      }`}
                    />
                  </div>

                  {/* Bespoke Physical Label Attached to Jar */}
                  <div className="px-5 py-4 my-auto">
                    <div 
                      className={`mx-auto max-w-[88%] p-3 text-center rounded border shadow-md transition-all ${
                        config.vesselId === 'matte-ceramic'
                          ? 'bg-stone-950/90 text-stone-200 border-amber-600/30'
                          : config.vesselId === 'frosted-fluted'
                          ? 'bg-white/90 text-stone-900 border-stone-200'
                          : 'bg-[#FAF6EE] text-stone-900 border-amber-900/20'
                      }`}
                    >
                      <p className="text-[9px] uppercase tracking-widest text-amber-700/80 font-mono mb-1">
                        L'Aura Atelier · Pure Wax
                      </p>
                      <h4 className={`text-base font-semibold leading-tight line-clamp-1 ${fontClasses[config.labelFont]}`}>
                        {config.customTitle || 'Your Custom Candle'}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-sans tracking-tight mt-0.5 line-clamp-1">
                        {config.customSubtitle || 'Bespoke Olfactory Formulation'}
                      </p>
                      {config.customDedication && (
                        <p className="text-[10px] italic text-stone-400 mt-1 line-clamp-2 border-t border-stone-200/50 pt-1">
                          "{config.customDedication}"
                        </p>
                      )}
                      <p className="text-[8px] uppercase tracking-wider text-stone-400 font-mono mt-1">
                        {config.sizeOz} oz · {config.dateOrLocation || 'Made in Lagos'}
                      </p>
                    </div>
                  </div>

                  {/* Base Foot */}
                  <div className="h-2 w-full bg-black/20" />
                </div>
              </div>

              {/* Real-time Dual Price Tag Display */}
              <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                    Custom Formulation Total
                  </span>
                  <DualPriceTag 
                    priceUSD={totalUSD} 
                    priceNGN={totalNGN} 
                    primaryCurrency={primaryCurrency}
                    size="lg"
                    showCurrencyLabels={true}
                    className="mt-0.5 text-white"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveWishlist}
                    className="p-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-rose-400 rounded-lg text-xs flex items-center justify-center transition-colors border border-stone-700"
                    title="Save formula to personal wishlist"
                    aria-label="Save custom candle to wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20 whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Added Feedback Toast */}
              {addedToast && (
                <div className="mt-3 py-2 px-3 bg-emerald-950/80 border border-emerald-700/60 rounded text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Custom candle added to bag with dual currency receipt!
                </div>
              )}

              {/* Wishlist Feedback Toast */}
              {wishlistToast && (
                <div className="mt-3 py-2 px-3 bg-rose-950/80 border border-rose-700/60 rounded text-xs text-rose-200 flex items-center gap-2 animate-in fade-in">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  Custom candle formula saved to your personal wishlist!
                </div>
              )}
            </div>

            {/* Quick Scent Architecture Breakdown */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
              <div className="flex justify-between items-center text-stone-900 font-medium">
                <span>Olfactory Notes:</span>
                <span className="text-amber-800 font-semibold">
                  {config.scentBlendType === 'preset' ? selectedPreset.name : 'Custom Triad Blend'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-stone-100">
                <div className="bg-[#FAF8F5] p-2 rounded">
                  <span className="text-[10px] text-stone-400 uppercase block">Top</span>
                  <span className="font-medium text-stone-800 truncate block">
                    {config.scentBlendType === 'preset' ? selectedPreset.top.split('&')[0] : config.topNote}
                  </span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded">
                  <span className="text-[10px] text-stone-400 uppercase block">Heart</span>
                  <span className="font-medium text-stone-800 truncate block">
                    {config.scentBlendType === 'preset' ? selectedPreset.heart.split('&')[0] : config.heartNote}
                  </span>
                </div>
                <div className="bg-[#FAF8F5] p-2 rounded">
                  <span className="text-[10px] text-stone-400 uppercase block">Base</span>
                  <span className="font-medium text-stone-800 truncate block">
                    {config.scentBlendType === 'preset' ? selectedPreset.base.split('&')[0] : config.baseNote}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Customization Controls & Configuration Tabs (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            
            {/* Navigation Tabs for Customization Steps */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl mb-8 overflow-x-auto text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('vessel')}
                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'vessel' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                1. Vessel & Size
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wax-wick')}
                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'wax-wick' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                2. Wax & Wick
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fragrance')}
                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'fragrance' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                3. Fragrance
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('label')}
                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'label' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                4. Label Dedication
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('finishing')}
                className={`px-3 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'finishing' 
                    ? 'bg-white text-stone-900 shadow-xs font-semibold' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                5. Lid & Gift Box
              </button>
            </div>

            {/* TAB 1: Vessel & Size */}
            {activeTab === 'vessel' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
                    Select Your Handcrafted Vessel
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Each container is poured in-house with sustainable weight and reusable architecture.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VESSEL_OPTIONS.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, vesselId: v.id }))}
                        className={`p-4 rounded-xl border text-left transition-all relative ${
                          config.vesselId === v.id
                            ? 'border-amber-700 bg-amber-50/40 shadow-xs ring-1 ring-amber-700'
                            : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-sm text-stone-900">{v.name}</span>
                          {config.vesselId === v.id && (
                            <Check className="w-4 h-4 text-amber-700 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-2 mb-2">{v.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                          <span className="text-[11px] text-stone-500">{v.textureLabel}</span>
                          <DualPriceTag 
                            priceUSD={v.basePriceUSD} 
                            priceNGN={v.basePriceNGN} 
                            primaryCurrency={primaryCurrency}
                            size="sm"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">Vessel Volume & Burn Duration</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { size: 4 as const, name: 'Travel Companion', oz: '4 oz', burn: '25-30 hrs', mod: '−$6 / −₦9,000' },
                      { size: 8 as const, name: 'Atelier Signature', oz: '8 oz', burn: '50-55 hrs', mod: 'Included' },
                      { size: 14 as const, name: 'Grande Hearth', oz: '14 oz', burn: '80-90 hrs', mod: '+$12 / +₦18,000' },
                    ].map(s => (
                      <button
                        key={s.size}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, sizeOz: s.size }))}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          config.sizeOz === s.size
                            ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span className="text-xs font-semibold block text-stone-900">{s.oz}</span>
                        <span className="text-[11px] text-stone-500 block">{s.burn}</span>
                        <span className="text-[10px] text-amber-800 font-mono mt-1 block">{s.mod}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('wax-wick')}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg"
                  >
                    Proceed to Wax & Wick →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Wax & Wick Formulation */}
            {activeTab === 'wax-wick' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
                    Wax Formulation
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    All formulations are 100% natural, biodegradable, and paraben-free.
                  </p>

                  <div className="space-y-3">
                    {WAX_OPTIONS.map(w => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, waxId: w.id }))}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-4 ${
                          config.waxId === w.id
                            ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-stone-900">{w.name}</span>
                            {w.addedPriceUSD === 0 ? (
                              <span className="text-[10px] text-stone-400 font-mono">Standard Formulation</span>
                            ) : (
                              <span className="text-[10px] text-amber-800 font-medium">Premium</span>
                            )}
                          </div>
                          <p className="text-xs text-stone-600 mb-1">{w.description}</p>
                          <p className="text-[11px] text-stone-400 italic">{w.burnCharacteristic}</p>
                        </div>
                        <div className="text-right shrink-0">
                          {w.addedPriceUSD === 0 ? (
                            <span className="text-xs text-stone-400 font-mono">Included</span>
                          ) : (
                            <DualPriceTag 
                              priceUSD={w.addedPriceUSD} 
                              priceNGN={w.addedPriceNGN} 
                              primaryCurrency={primaryCurrency}
                              size="sm"
                              layout="stacked"
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-sm font-semibold text-stone-900 mb-2">Wick Architecture</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {WICK_OPTIONS.map(wk => (
                      <button
                        key={wk.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, wickId: wk.id }))}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          config.wickId === wk.id
                            ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-stone-900">{wk.name}</span>
                          {config.wickId === wk.id && (
                            <Check className="w-3.5 h-3.5 text-amber-700" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500 mb-2">{wk.description}</p>
                        <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px]">
                          <span className="text-stone-400">{wk.soundEffect}</span>
                          <span className="font-mono text-amber-800 font-semibold">
                            {wk.addedPriceUSD === 0 ? 'Included' : `+${wk.addedPriceUSD}$ / +₦${wk.addedPriceNGN.toLocaleString()}`}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('vessel')}
                    className="px-4 py-2 border border-stone-200 text-stone-600 hover:text-stone-900 text-xs rounded-lg"
                  >
                    ← Back to Vessel
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('fragrance')}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg"
                  >
                    Proceed to Fragrance →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Fragrance Architecture */}
            {activeTab === 'fragrance' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900">
                        Olfactory Fragrance Architecture
                      </h3>
                      <p className="text-xs text-stone-500">
                        Choose our master perfumer presets or construct your custom top, middle, and base chord.
                      </p>
                    </div>

                    {/* Blend Mode Toggle */}
                    <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, scentBlendType: 'preset' }))}
                        className={`px-3 py-1 rounded-md transition-all ${
                          config.scentBlendType === 'preset' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-500'
                        }`}
                      >
                        Curated Presets
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, scentBlendType: 'bespoke' }))}
                        className={`px-3 py-1 rounded-md transition-all ${
                          config.scentBlendType === 'bespoke' ? 'bg-white font-medium text-stone-900 shadow-xs' : 'text-stone-500'
                        }`}
                      >
                        Custom Triad
                      </button>
                    </div>
                  </div>

                  {config.scentBlendType === 'preset' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {FRAGRANCE_PRESETS.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, presetId: p.id }))}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            config.presetId === p.id
                              ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs text-stone-900">{p.name}</span>
                            <span className="text-[10px] text-amber-800 uppercase font-mono">{p.category}</span>
                          </div>
                          <p className="text-xs text-stone-500 mb-2">{p.description}</p>
                          <div className="space-y-0.5 text-[11px] text-stone-600 bg-white/60 p-2 rounded">
                            <div><span className="text-stone-400">Top:</span> {p.top}</div>
                            <div><span className="text-stone-400">Heart:</span> {p.heart}</div>
                            <div><span className="text-stone-400">Base:</span> {p.base}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Top Notes */}
                      <div>
                        <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-1.5">
                          Top Note (First Impression · 15 mins)
                        </label>
                        <select
                          value={config.topNote}
                          onChange={e => setConfig(prev => ({ ...prev, topNote: e.target.value }))}
                          className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-700"
                        >
                          {TOP_NOTES_LIST.map(n => (
                            <option key={n.id} value={n.name}>{n.name} — {n.scentProfile}</option>
                          ))}
                        </select>
                      </div>

                      {/* Heart Notes */}
                      <div>
                        <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-1.5">
                          Heart Note (Body & Core Character · 2–4 hours)
                        </label>
                        <select
                          value={config.heartNote}
                          onChange={e => setConfig(prev => ({ ...prev, heartNote: e.target.value }))}
                          className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-700"
                        >
                          {HEART_NOTES_LIST.map(n => (
                            <option key={n.id} value={n.name}>{n.name} — {n.scentProfile}</option>
                          ))}
                        </select>
                      </div>

                      {/* Base Notes */}
                      <div>
                        <label className="text-xs font-semibold text-stone-800 uppercase tracking-wider block mb-1.5">
                          Base Note (Warm Lingering Foundation · 6+ hours)
                        </label>
                        <select
                          value={config.baseNote}
                          onChange={e => setConfig(prev => ({ ...prev, baseNote: e.target.value }))}
                          className="w-full text-xs p-2.5 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-amber-700"
                        >
                          {BASE_NOTES_LIST.map(n => (
                            <option key={n.id} value={n.name}>{n.name} — {n.scentProfile}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scent Intensity */}
                <div className="pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                    Fragrance Load / Scent Throw Intensity
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Subtle', 'Balanced', 'Rich'] as const).map(intensity => (
                      <button
                        key={intensity}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, scentIntensity: intensity }))}
                        className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                          config.scentIntensity === intensity
                            ? 'border-amber-700 bg-amber-50 text-stone-900 font-semibold'
                            : 'border-stone-200 text-stone-600 hover:border-stone-300'
                        }`}
                      >
                        {intensity} Throw
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('wax-wick')}
                    className="px-4 py-2 border border-stone-200 text-stone-600 hover:text-stone-900 text-xs rounded-lg"
                  >
                    ← Back to Wax & Wick
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('label')}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg"
                  >
                    Proceed to Label Design →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: Label Dedication & Personalization */}
            {activeTab === 'label' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
                    Personalized Label & Dedication
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Type your bespoke candle name and personal dedication. It updates instantly on the live jar preview on the left.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Bespoke Candle Title
                      </label>
                      <input
                        type="text"
                        maxLength={32}
                        value={config.customTitle}
                        onChange={e => setConfig(prev => ({ ...prev, customTitle: e.target.value }))}
                        placeholder="e.g., Ada & Kola's New Home, Sunday Reverie"
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Subtitle / Scent Headline
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        value={config.customSubtitle}
                        onChange={e => setConfig(prev => ({ ...prev, customSubtitle: e.target.value }))}
                        placeholder="e.g., Warm Sandalwood · Golden Amber"
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Personal Dedication or Quote (Optional)
                      </label>
                      <textarea
                        rows={2}
                        maxLength={80}
                        value={config.customDedication}
                        onChange={e => setConfig(prev => ({ ...prev, customDedication: e.target.value }))}
                        placeholder="e.g., May this flame bring light, serenity, and joy to your new season."
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                      <span className="text-[10px] text-stone-400 mt-0.5 block text-right">
                        {config.customDedication.length}/80 characters
                      </span>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-1">
                        Date or Location Footnote
                      </label>
                      <input
                        type="text"
                        maxLength={30}
                        value={config.dateOrLocation}
                        onChange={e => setConfig(prev => ({ ...prev, dateOrLocation: e.target.value }))}
                        placeholder="e.g., Victoria Island, Lagos · Nov 2026"
                        className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-stone-700 block mb-2">
                        Label Typography Aesthetic
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'serif', label: 'Bespoke Serif', sample: 'Aa' },
                          { id: 'sans', label: 'Clean Sans', sample: 'AA' },
                          { id: 'typewriter', label: 'Typewriter', sample: 'Aa' },
                          { id: 'script', label: 'Italic Script', sample: 'Aa' },
                        ].map(f => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setConfig(prev => ({ ...prev, labelFont: f.id as any }))}
                            className={`p-2.5 rounded-lg border text-center transition-all ${
                              config.labelFont === f.id
                                ? 'border-amber-700 bg-amber-50 text-stone-900 font-semibold ring-1 ring-amber-700'
                                : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            <span className="text-sm block">{f.sample}</span>
                            <span className="text-[10px] text-stone-500">{f.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab('fragrance')}
                    className="px-4 py-2 border border-stone-200 text-stone-600 hover:text-stone-900 text-xs rounded-lg"
                  >
                    ← Back to Fragrance
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('finishing')}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg"
                  >
                    Proceed to Finishing & Gift Box →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: Lid & Gift Box */}
            {activeTab === 'finishing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
                    Protective Vessel Lid
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Snuffs the candle smoke-free and keeps dust from settling between burns.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'brass', name: 'Brushed Brass', usd: 4, ngn: 6000, desc: 'Lustrous warm gold' },
                      { id: 'walnut', name: 'Hand-carved Walnut', usd: 5, ngn: 7500, desc: 'Dark solid timber' },
                      { id: 'black', name: 'Matte Black Steel', usd: 3, ngn: 4500, desc: 'Sleek architectural' },
                      { id: 'none', name: 'No Lid Included', usd: 0, ngn: 0, desc: 'Open vessel' },
                    ].map(lid => (
                      <button
                        key={lid.id}
                        type="button"
                        onClick={() => setConfig(prev => ({ ...prev, lidOption: lid.id as any }))}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          config.lidOption === lid.id
                            ? 'border-amber-700 bg-amber-50/40 ring-1 ring-amber-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <span className="text-xs font-semibold text-stone-900 block">{lid.name}</span>
                        <span className="text-[10px] text-stone-500 block mb-1.5">{lid.desc}</span>
                        <span className="text-[10px] text-amber-800 font-mono font-medium block">
                          {lid.usd === 0 ? 'Included' : `+${lid.usd}$ / +₦${lid.ngn.toLocaleString()}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gift Packaging Box Option */}
                <div className="p-4 rounded-xl border border-stone-200 bg-[#FAF8F5]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0 mt-0.5">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900">
                          Luxury Gift Box & Handwritten Card (+ $5.00 / ₦7,500)
                        </h4>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Rigid debossed magnetic gift box, wax seal stamp, matches vial, and a handwritten calligraphy card.
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.giftPackaging}
                      onChange={e => setConfig(prev => ({ ...prev, giftPackaging: e.target.checked }))}
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-700 focus:ring-amber-700"
                    />
                  </div>

                  {config.giftPackaging && (
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <label className="text-[11px] font-medium text-stone-700 block mb-1">
                        Handwritten Card Note Message:
                      </label>
                      <input
                        type="text"
                        maxLength={90}
                        value={config.giftCardMessage}
                        onChange={e => setConfig(prev => ({ ...prev, giftCardMessage: e.target.value }))}
                        placeholder="Write your personal gift message here..."
                        className="w-full text-xs p-2 bg-white border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-700"
                      />
                    </div>
                  )}
                </div>

                {/* Final Studio Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Default
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('label')}
                      className="px-4 py-2 border border-stone-200 text-stone-600 hover:text-stone-900 text-xs rounded-lg"
                    >
                      ← Back to Label
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveWishlist}
                      className="px-4 py-2.5 border border-stone-300 hover:border-rose-400 text-stone-700 hover:text-rose-600 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors bg-white"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Save to Wishlist</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add Bespoke Candle to Cart
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
