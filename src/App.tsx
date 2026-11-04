/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
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
import { WishlistDrawer } from './components/WishlistDrawer';
import { AuthModal } from './components/AuthModal';
import { CANDLE_PRODUCTS } from './data/candles';
import { 
  CandleProduct, 
  CustomCandleConfig, 
  CartItem, 
  Currency, 
  WishlistItem, 
  UserProfile 
} from './types/candle';
import { 
  getStoredActiveUser, 
  saveActiveUser, 
  getGuestWishlist, 
  saveGuestWishlist, 
  getRegisteredWishlist, 
  saveRegisteredWishlist, 
  mergeWishlists 
} from './utils/wishlistStorage';
import { Heart, Check } from 'lucide-react';

export default function App() {
  // Currency State (defaults to Nigerian Naira NGN, user can toggle USD anytime)
  const [primaryCurrency, setPrimaryCurrency] = useState<Currency>('NGN');

  // User Authentication / Session State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredActiveUser());

  // Wishlist State (loaded from persistent user storage or session-based guest storage)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    const user = getStoredActiveUser();
    if (user && user.isRegistered) {
      return getRegisteredWishlist(user.email);
    }
    return getGuestWishlist();
  });

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
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<CandleProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);

  // Floating Toast notification for wishlist actions
  const [wishlistToast, setWishlistToast] = useState<{ message: string; action: 'added' | 'removed' } | null>(null);

  // Sync wishlist to appropriate storage whenever it changes
  useEffect(() => {
    if (currentUser && currentUser.isRegistered) {
      saveRegisteredWishlist(currentUser.email, wishlistItems);
    } else {
      saveGuestWishlist(wishlistItems);
    }
  }, [wishlistItems, currentUser]);

  // Set of wishlisted product IDs for fast lookup
  const wishlistProductIds = useMemo(() => {
    const set = new Set<string>();
    for (const item of wishlistItems) {
      if (item.type === 'standard' && item.productId) {
        set.add(item.productId);
      }
    }
    return set;
  }, [wishlistItems]);

  // Handle User Login / Registration (seamlessly merges guest wishlist into user account)
  const handleLogin = (user: UserProfile) => {
    saveActiveUser(user);
    setCurrentUser(user);

    // Retrieve existing wishlist for this registered user
    const existingUserItems = getRegisteredWishlist(user.email);
    // Current guest session items
    const guestItems = getGuestWishlist();

    // Merge without duplicates
    const combined = mergeWishlists(guestItems, existingUserItems);
    setWishlistItems(combined);
    saveRegisteredWishlist(user.email, combined);

    // Clear guest storage
    saveGuestWishlist([]);

    setWishlistToast({
      message: `Signed in as ${user.name} · Wishlist synchronized across sessions`,
      action: 'added'
    });
    setTimeout(() => setWishlistToast(null), 3500);
  };

  const handleLogout = () => {
    saveActiveUser(null);
    setCurrentUser(null);
    setWishlistItems([]);
    saveGuestWishlist([]);

    setWishlistToast({
      message: 'Signed out · Switched to guest session',
      action: 'removed'
    });
    setTimeout(() => setWishlistToast(null), 3000);
  };

  // Toggle standard candle in wishlist
  const handleToggleWishlist = (product: CandleProduct) => {
    const isCurrentlySaved = wishlistProductIds.has(product.id);

    if (isCurrentlySaved) {
      setWishlistItems(prev => prev.filter(item => item.productId !== product.id));
      setWishlistToast({
        message: `Removed "${product.name}" from your wishlist`,
        action: 'removed'
      });
    } else {
      const newItem: WishlistItem = {
        id: `wish-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'standard',
        productId: product.id,
        product,
        priceUSD: product.priceUSD,
        priceNGN: product.priceNGN,
        addedAt: new Date().toLocaleDateString()
      };
      setWishlistItems(prev => [newItem, ...prev]);
      setWishlistToast({
        message: `Saved "${product.name}" to your wishlist`,
        action: 'added'
      });
    }

    setTimeout(() => setWishlistToast(null), 3000);
  };

  // Save bespoke customized candle to wishlist
  const handleSaveBespokeToWishlist = (config: CustomCandleConfig, priceUSD: number, priceNGN: number) => {
    const newItem: WishlistItem = {
      id: `wish-bespoke-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: 'bespoke',
      bespokeConfig: config,
      priceUSD,
      priceNGN,
      addedAt: new Date().toLocaleDateString()
    };
    setWishlistItems(prev => [newItem, ...prev]);
    setWishlistToast({
      message: `Saved bespoke candle "${config.customTitle || 'Custom Blend'}" to wishlist`,
      action: 'added'
    });
    setTimeout(() => setWishlistToast(null), 3000);
  };

  const handleRemoveWishlistItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  // Move a single wishlist item to shopping bag
  const handleMoveWishlistToCart = (item: WishlistItem) => {
    if (item.type === 'standard' && item.product) {
      handleAddToCart(item.product, 1);
    } else if (item.type === 'bespoke' && item.bespokeConfig) {
      handleAddBespokeToCart(item.bespokeConfig, item.priceUSD, item.priceNGN);
    }
  };

  // Move all wishlist items to shopping bag
  const handleAddAllWishlistToCart = () => {
    for (const item of wishlistItems) {
      handleMoveWishlistToCart(item);
    }
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200 relative">
      
      {/* 1. Header Navigation Bar (Strict 3-zone contract with Currency, Wishlist, Account, Cart) */}
      <Navbar
        primaryCurrency={primaryCurrency}
        onCurrencyToggle={setPrimaryCurrency}
        cartCount={totalCartCount}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Floating Wishlist Toast */}
      {wishlistToast && (
        <div className="fixed bottom-6 right-6 z-50 py-3 px-4 bg-stone-900 text-white rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200 border border-stone-800">
          {wishlistToast.action === 'added' ? (
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{wishlistToast.message}</span>
        </div>
      )}

      <main className="flex-1">
        {/* 2. Hero Campaign Section */}
        <Hero
          primaryCurrency={primaryCurrency}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 3. Catalog Section with 8 Candles, Heart Wishlist Badges & Dual Currency Price Tags */}
        <CatalogSection
          primaryCurrency={primaryCurrency}
          wishlistProductIds={wishlistProductIds}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
        />

        {/* 4. Bespoke Product Customization Studio with Wishlist Formula Saving */}
        <BespokeStudio
          primaryCurrency={primaryCurrency}
          onAddToCart={handleAddBespokeToCart}
          onSaveToWishlist={handleSaveBespokeToWishlist}
        />

        {/* 5. Candle Longevity & Care Guide */}
        <CandleCareSection />

        {/* 6. Customer Testimonials */}
        <ReviewsSection />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* MODALS & DRAWERS */}
      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveWishlistItem}
        onAddToCart={handleMoveWishlistToCart}
        onAddAllToCart={handleAddAllWishlistToCart}
        primaryCurrency={primaryCurrency}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onClearWishlist={handleClearWishlist}
      />

      {/* Account / Session Persistence Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        guestItemsCount={currentUser?.isRegistered ? 0 : wishlistItems.length}
      />

      {/* Product Detail Quick View */}
      <ProductDetailModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        primaryCurrency={primaryCurrency}
        isWishlisted={quickViewProduct ? wishlistProductIds.has(quickViewProduct.id) : false}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
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
