import React, { useState } from 'react';
import { X, UserCheck, Shield, KeyRound, Sparkles, LogOut, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types/candle';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  guestItemsCount: number;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  guestItemsCount
}) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const user: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name || email.split('@')[0],
      email: email.trim().toLowerCase(),
      isRegistered: true
    };

    onLogin(user);
    onClose();
  };

  const handleQuickDemoUser = (demoName: string, demoEmail: string) => {
    const user: UserProfile = {
      id: `usr_${demoEmail}`,
      name: demoName,
      email: demoEmail,
      isRegistered: true
    };
    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser && currentUser.isRegistered ? (
          /* User Profile View */
          <div className="space-y-6 text-center">
            <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-900 font-serif font-bold text-xl">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-semibold block mb-1">
                ✓ Persistent Session Active
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                {currentUser.name}
              </h3>
              <p className="text-xs font-mono text-stone-500 mt-0.5">
                {currentUser.email}
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span>Account Status:</span>
                <span className="font-semibold text-stone-900">Registered Patron</span>
              </div>
              <div className="flex justify-between">
                <span>Wishlist Synchronization:</span>
                <span className="font-semibold text-emerald-700">Active (Multi-session)</span>
              </div>
              <div className="flex justify-between">
                <span>Currency Preference:</span>
                <span className="font-mono text-stone-700">Dual NGN (₦) / USD ($)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold"
              >
                Continue Browsing
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="py-2.5 px-4 border border-stone-200 hover:border-rose-300 text-stone-600 hover:text-rose-600 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Register Form */
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1 block">
                Atelier Account
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                {tab === 'signin' ? 'Sign In to Your Account' : 'Create Your Patron Profile'}
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Registered users' wishlists and custom candle formulations are securely preserved across all browser sessions.
              </p>

              {guestItemsCount > 0 && (
                <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>
                    Your <strong>{guestItemsCount}</strong> guest wishlist {guestItemsCount === 1 ? 'candle' : 'candles'} will be seamlessly merged into your account!
                  </span>
                </div>
              )}
            </div>

            {/* Toggle Tabs */}
            <div className="flex p-1 bg-stone-100 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setTab('signin')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'signin'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'register'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div>
                  <label className="text-[11px] font-medium text-stone-700 block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Folake Adeyemi"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-medium text-stone-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-stone-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>{tab === 'signin' ? 'Sign In & Sync Wishlist' : 'Create Account & Save Wishlist'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick 1-click Demo Profiles */}
            <div className="pt-4 border-t border-stone-200">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block text-center mb-2">
                Or Quick Test with a Patron Profile:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoUser('Folake Adeyemi', 'folake@laura.com')}
                  className="p-2 border border-stone-200 hover:border-amber-700 rounded-lg text-left text-[11px] hover:bg-amber-50/40 transition-colors"
                >
                  <strong className="block text-stone-900">Folake Adeyemi</strong>
                  <span className="text-stone-500 font-mono text-[10px]">Lagos Patron</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoUser('Marcus Vance', 'marcus@laura.com')}
                  className="p-2 border border-stone-200 hover:border-amber-700 rounded-lg text-left text-[11px] hover:bg-amber-50/40 transition-colors"
                >
                  <strong className="block text-stone-900">Marcus Vance</strong>
                  <span className="text-stone-500 font-mono text-[10px]">US Patron</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
