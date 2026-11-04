import React from 'react';
import { Flame, Scissors, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const CandleCareSection: React.FC = () => {
  const rituals = [
    {
      num: '01',
      title: 'The First Burn Memory Pool',
      desc: 'Allow the wax to liquefy completely across the diameter to the jar walls (approx. 3–4 hours). Soy wax has a memory; this prevents tunneling for the entire life of your candle.'
    },
    {
      num: '02',
      title: 'Trim Wick to 5mm',
      desc: 'Always trim the wooden or cotton wick to 5mm before each relight. A trimmed wick ensures a steady, dancing flame without soot or carbon mushrooms.'
    },
    {
      num: '03',
      title: 'Snuff With the Lid',
      desc: 'Extinguish your candle by gently placing the brass or walnut lid atop the vessel. This starves the flame of oxygen cleanly without blowing aromatic smoke into the room.'
    },
    {
      num: '04',
      title: 'Repurpose the Stoneware',
      desc: 'When only 1/2 inch of wax remains, clean the vessel with warm soapy water. Upcycle your amber glass or terracotta container into an espresso cup, brush holder, or succulent planter.'
    }
  ];

  return (
    <section id="care" className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            The Burning Ritual
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-white">
            Essential Candle Care Guide
          </h2>
          <p className="mt-3 text-stone-400 text-sm leading-relaxed">
            Four simple practices to double your candle burn longevity and preserve the purity of every fragrance note.
          </p>
        </div>

        {/* 4 Ritual Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rituals.map((r) => (
            <div key={r.num} className="bg-stone-800/60 p-6 rounded-2xl border border-stone-800 flex flex-col justify-between">
              <div>
                <span className="font-serif text-3xl font-bold text-amber-400 block mb-3">
                  {r.num}
                </span>
                <h3 className="text-base font-semibold text-white mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {r.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-700/60 flex items-center justify-between text-[11px] text-stone-400">
                <span>Atelier Principle</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
