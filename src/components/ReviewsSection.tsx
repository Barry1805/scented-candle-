import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/candles';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
            Client Testimonials & Community
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
            Loved Across Lagos, Abuja & Worldwide
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-stone-600">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-stone-900">4.9 / 5.0 Average Rating</span>
            <span aria-hidden="true">·</span>
            <span>Over 450+ Hand-poured Candles Delivered</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating & Verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-stone-500">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified Order
                    </span>
                  )}
                </div>

                {/* Candle reference */}
                <div className="text-[11px] font-mono text-amber-800 uppercase tracking-wider mb-2">
                  {rev.candleName}
                </div>

                {/* Comment */}
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author and Location footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-900 block">{rev.author}</span>
                  <span className="text-[11px] text-stone-500">{rev.location}</span>
                </div>
                <span className="text-[10px] text-stone-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
