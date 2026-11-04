/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { BespokeStudio } from './components/BespokeStudio';
import { CandleCareSection } from './components/CandleCareSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CANDLE_PRODUCTS } from './data/candles';
import { CandleProduct, CustomCandleConfig, CartItem, Currency } from './types/candle';

export default function App() {
  // Currency State (defaults to Nigerian Naira NGN, user can toggle USD anytime)
  const [primaryCurrency, setPrimaryCurrency] = useState<Currency>('NGN');

  // Shopping Bag State (initial default candle gives instant tactile feedback)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-item-1',
      type: 'standard',
      product: CANDLE_PRODUCTS[0],
      quantity: 1,
      unitPriceUSD: CANDLE_PRODUCTS[0].priceUSD,
      unitPriceNGN: CANDLE_PRODUCTS[0].priceNGN
    }
  ]);

  // Modal / Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<CandleProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Cart operations
  const handleAddToCart = (product: CandleProduct, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.type === 'standard' && item.product?.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === existing.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          type: 'standard',
          product,
          quantity,
          unitPriceUSD: product.priceUSD,
          unitPriceNGN: product.priceNGN
        }
      ];
    });
  };

  const handleAddBespokeToCart = (config: CustomCandleConfig, priceUSD: number, priceNGN: number) => {
    setCartItems(prev => [
      ...prev,
      {
        id: `bespoke-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'bespoke',
        bespokeConfig: config,
        quantity: 1,
        unitPriceUSD: priceUSD,
        unitPriceNGN: priceNGN
      }
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => 
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleProceedToCheckout = (discountPercent: number) => {
    setCheckoutDiscount(discountPercent);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        primaryCurrency={primaryCurrency}
        onCurrencyToggle={setPrimaryCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Campaign Section */}
        <Hero
          primaryCurrency={primaryCurrency}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 3. Catalog Section with 8 Candles & Dual Currency Price Tags */}
        <CatalogSection
          primaryCurrency={primaryCurrency}
          onAddToCart={handleAddToCart}
          onQuickView={setQuickViewProduct}
        />

        {/* 4. Bespoke Product Customization Studio */}
        <BespokeStudio
          primaryCurrency={primaryCurrency}
          onAddToCart={handleAddBespokeToCart}
        />

        {/* 5. Candle Longevity & Care Guide */}
        <CandleCareSection />

        {/* 6. Customer Testimonials */}
        <ReviewsSection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* MODALS & DRAWERS */}
      {/* Product Detail Quick View */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        primaryCurrency={primaryCurrency}
        onAddToCart={handleAddToCart}
      />

      {/* Scent Profiler Quiz */}
      <ScentQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        primaryCurrency={primaryCurrency}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Cart Drawer with Dual Currency Subtotals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        primaryCurrency={primaryCurrency}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Dual Currency Checkout Simulator */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountPercent={checkoutDiscount}
        primaryCurrency={primaryCurrency}
        onOrderSuccess={handleOrderSuccess}
      />

    </div>
  );
}
