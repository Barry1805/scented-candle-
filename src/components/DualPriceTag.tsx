import React from 'react';
import { formatNGN, formatUSD } from '../utils/currency';
import { Currency } from '../types/candle';

interface DualPriceTagProps {
  priceUSD: number;
  priceNGN: number;
  primaryCurrency?: Currency;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'inline' | 'stacked';
  className?: string;
  showCurrencyLabels?: boolean;
}

export const DualPriceTag: React.FC<DualPriceTagProps> = ({
  priceUSD,
  priceNGN,
  primaryCurrency = 'NGN',
  size = 'md',
  layout = 'inline',
  className = '',
  showCurrencyLabels = false
}) => {
  const isNgnPrimary = primaryCurrency === 'NGN';
  const mainPrice = isNgnPrimary ? formatNGN(priceNGN) : formatUSD(priceUSD);
  const secondaryPrice = isNgnPrimary ? formatUSD(priceUSD) : formatNGN(priceNGN);
  const mainCode = isNgnPrimary ? 'NGN' : 'USD';
  const secCode = isNgnPrimary ? 'USD' : 'NGN';

  const sizeClasses = {
    sm: {
      main: 'text-sm font-semibold',
      secondary: 'text-xs text-stone-500',
      tag: 'text-[10px] px-1 py-0.5'
    },
    md: {
      main: 'text-base font-semibold',
      secondary: 'text-xs text-stone-500',
      tag: 'text-[11px] px-1.5 py-0.5'
    },
    lg: {
      main: 'text-xl font-bold font-serif',
      secondary: 'text-sm text-stone-500 font-sans',
      tag: 'text-xs px-2 py-0.5'
    },
    xl: {
      main: 'text-2xl lg:text-3xl font-bold font-serif',
      secondary: 'text-base text-stone-500 font-sans',
      tag: 'text-xs px-2 py-0.5'
    }
  };

  const currentSize = sizeClasses[size];

  if (layout === 'stacked') {
    return (
      <div className={`flex flex-col tabular-nums ${className}`}>
        <div className="flex items-baseline gap-1.5">
          <span className={`${currentSize.main} text-stone-900 tracking-tight`}>
            {mainPrice}
          </span>
          {showCurrencyLabels && (
            <span className="text-[10px] text-stone-400 font-mono uppercase">{mainCode}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className={`${currentSize.secondary} tracking-normal`}>
            ≈ {secondaryPrice}
          </span>
          {showCurrencyLabels && (
            <span className="text-[9px] text-stone-400 font-mono uppercase">{secCode}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-baseline gap-2 tabular-nums ${className}`}>
      <span className={`${currentSize.main} text-stone-900 tracking-tight`}>
        {mainPrice}
      </span>
      <span className="text-stone-300 select-none">/</span>
      <span className={`${currentSize.secondary} font-medium tracking-normal text-stone-600`}>
        {secondaryPrice}
      </span>
      {showCurrencyLabels && (
        <span className="text-[10px] text-stone-400 font-mono tracking-wider ml-0.5">
          ({mainCode} / {secCode})
        </span>
      )}
    </div>
  );
};
