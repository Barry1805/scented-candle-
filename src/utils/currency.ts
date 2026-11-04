import { Currency } from '../types/candle';

export const USD_TO_NGN_RATE = 1500;

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function convertUSDToNGN(usd: number): number {
  return Math.round(usd * USD_TO_NGN_RATE);
}

export function convertNGNToUSD(ngn: number): number {
  return Number((ngn / USD_TO_NGN_RATE).toFixed(2));
}

export function formatDualCurrency(priceUSD: number, priceNGN: number, primary: Currency = 'NGN'): { primaryText: string; secondaryText: string } {
  if (primary === 'NGN') {
    return {
      primaryText: formatNGN(priceNGN),
      secondaryText: formatUSD(priceUSD)
    };
  } else {
    return {
      primaryText: formatUSD(priceUSD),
      secondaryText: formatNGN(priceNGN)
    };
  }
}
