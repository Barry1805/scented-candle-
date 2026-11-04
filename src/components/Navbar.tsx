import React from 'react';
import { ShoppingBag, Sparkles, Heart, User, UserCheck } from 'lucide-react';
import { Currency, UserProfile } from '../types/candle';

interface NavbarProps {
  primaryCurrency: Currency;
  onCurrencyToggle: (curr: Currency) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  primaryCurrency,
  onCurrencyToggle,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  currentUser,
  onOpenAuth
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      {/* Strict Top Bar Contract: Exactly 3 Zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-serif tracking-widest text-stone-900 uppercase font-semibold whitespace-nowrap shrink-0 hover:text-amber-900 transition-colors"
        >
          L'AURA ATELIER
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-stone-600">
          <a 
            href="#shop" 
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Shop Candles
          </a>
          <a 
            href="#custom-studio" 
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-amber-900 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Bespoke Studio
          </a>
          <button 
            type="button"
            onClick={onOpenQuiz}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Scent Quiz
          </button>
          <a 
            href="#care" 
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Candle Care
          </a>
          <a 
            href="#reviews" 
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: Action lockup with Currency Switcher, Wishlist, Account, and Cart */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dual Currency Switcher */}
          <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg text-[11px] font-mono">
            <button
              type="button"
              onClick={() => onCurrencyToggle('NGN')}
              className={`px-2 py-1 rounded-md transition-all font-semibold ${
                primaryCurrency === 'NGN'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Display Nigerian Naira as primary currency"
            >
              ₦ NGN
            </button>
            <button
              type="button"
              onClick={() => onCurrencyToggle('USD')}
              className={`px-2 py-1 rounded-md transition-all font-semibold ${
                primaryCurrency === 'USD'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Display US Dollars as primary currency"
            >
              $ USD
            </button>
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={onOpenWishlist}
            className="px-2.5 sm:px-3 py-1.5 bg-white border border-stone-200 hover:border-amber-400 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            aria-label={`View personal wishlist with ${wishlistCount} items`}
            title="Open personal wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'fill-rose-600 text-rose-600' : 'text-stone-600'}`} />
            <span className="hidden sm:inline">Wishlist</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] min-w-4 text-center font-mono ${
              wishlistCount > 0 ? 'bg-rose-100 text-rose-800 font-bold' : 'bg-stone-100 text-stone-500'
            }`}>
              {wishlistCount}
            </span>
          </button>

          {/* Account Profile / Sign In Button */}
          <button
            type="button"
            onClick={onOpenAuth}
            className={`px-2.5 sm:px-3 py-1.5 border rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer ${
              currentUser && currentUser.isRegistered
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
            }`}
            aria-label="User Account"
            title={currentUser && currentUser.isRegistered ? `Signed in as ${currentUser.name}` : 'Sign in or register for persistent wishlist'}
          >
            <User className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden md:inline max-w-20 truncate">
              {currentUser && currentUser.isRegistered ? currentUser.name.split(' ')[0] : 'Sign In'}
            </span>
            {currentUser && currentUser.isRegistered && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-white" title="Persistent cloud session" />
            )}
          </button>

          {/* Cart Bag Action Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            aria-label={`View shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.2 rounded-full text-[10px] min-w-4 text-center">
              {cartCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
