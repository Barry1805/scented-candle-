import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CANDLE_PRODUCTS } from '../data/candles';
import { CandleProduct, Currency } from '../types/candle';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  primaryCurrency: Currency;
  onAddToCart: (product: CandleProduct) => void;
  onQuickView: (product: CandleProduct) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  primaryCurrency,
  onAddToCart,
  onQuickView
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVessel, setSelectedVessel] = useState<string>('all');

  const scentFamilies = [
    { id: 'all', label: 'All Fragrances' },
    { id: 'Woody & Warm', label: 'Woody & Warm' },
    { id: 'Fresh & Citrus', label: 'Fresh & Citrus' },
    { id: 'Floral & Botanical', label: 'Floral & Botanical' },
    { id: 'Gourmand & Spiced', label: 'Gourmand & Spiced' },
  ];

  const filteredProducts = useMemo(() => {
    return CANDLE_PRODUCTS.filter(candle => {
      const matchesFamily = selectedFamily === 'all' || candle.scentFamily === selectedFamily;
      const matchesSearch = searchQuery.trim() === '' || 
        candle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candle.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candle.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candle.notes.top.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candle.notes.heart.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        candle.notes.base.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesVessel = selectedVessel === 'all' || candle.collection.toLowerCase().includes(selectedVessel.toLowerCase());

      return matchesFamily && matchesSearch && matchesVessel;
    });
  }, [selectedFamily, searchQuery, selectedVessel]);

  return (
    <section id="shop" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
              The Candle Collection
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              Curated Artisanal Fragrances
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-xl">
              Each candle features transparent dual-currency pricing in Nigerian Naira and US Dollars. Hand-poured with natural botanical wax and crackling wicks.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search scent, note, or wax..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row (§1.A Segmented Controls) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-xl overflow-x-auto text-xs font-medium">
            {scentFamilies.map(fam => (
              <button
                key={fam.id}
                type="button"
                onClick={() => setSelectedFamily(fam.id)}
                className={`px-3.5 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedFamily === fam.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {fam.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-500 tabular-nums">
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'candle' : 'candles'}
          </div>
        </div>

        {/* Product Grid (3 columns on desktop, generous gap-8) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(candle => (
              <ProductCard
                key={candle.id}
                product={candle}
                primaryCurrency={primaryCurrency}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <Sparkles className="w-8 h-8 text-amber-700 mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-serif font-bold text-stone-900 mb-1">
              No matching candle scents found
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto mb-4">
              Try adjusting your fragrance family or search query, or design your exact custom scent in our Bespoke Studio.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFamily('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
