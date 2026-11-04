import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Philosophy (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-serif tracking-widest text-white uppercase font-bold block">
              L'AURA ATELIER
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisanal candle atelier handcrafting botanical soy candles and bespoke olfactory blends. Every flame is an invitation to pause, restore, and savor serenity.
            </p>
            <div className="pt-2 text-xs text-stone-500">
              <span className="text-stone-300 font-medium">Dual-Currency Pricing:</span> Nigerian Naira (₦) & US Dollars ($) accepted worldwide with nationwide and global door-to-door delivery.
            </div>
          </div>

          {/* Quick Links (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#shop" className="hover:text-white transition-colors">Apothecary Amber</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Obsidian Ceramic</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Fluted Frosted</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Terracotta Artisan</a></li>
              <li><a href="#custom-studio" className="hover:text-amber-300 transition-colors">Bespoke Studio</a></li>
            </ul>
          </div>

          {/* Client Care (2 columns) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#care" className="hover:text-white transition-colors">Candle Care Rituals</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><span className="text-stone-400">Lagos Atelier Studio</span></li>
              <li><span className="text-stone-400">contact@laura-atelier.com</span></li>
              <li><span className="text-stone-400">+234 1 293 8400</span></li>
            </ul>
          </div>

          {/* Newsletter (3 columns) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-semibold">
              Private Circle
            </h4>
            <p className="text-xs text-stone-400">
              Receive secret scent releases, bespoke seasonal batches, and private atelier invitations.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full text-xs p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder:text-stone-600"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-amber-600 text-stone-950 rounded-md hover:bg-amber-500 transition-colors"
                  aria-label="Submit newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-amber-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Welcome to the L'Aura circle.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar (§1.B quiet footer) */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} L'AURA ATELIER. Hand-poured with intention.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Shipping & Exchange in ₦ / $</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
