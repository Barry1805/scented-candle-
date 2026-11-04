export type Currency = 'NGN' | 'USD';

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface CandleProduct {
  id: string;
  name: string;
  subtitle: string;
  collection: 'Apothecary' | 'Ceramic Noir' | 'Fluted Glass' | 'Terracotta Artisan';
  scentFamily: 'Woody & Warm' | 'Fresh & Citrus' | 'Floral & Botanical' | 'Gourmand & Spiced';
  priceUSD: number;
  priceNGN: number;
  rating: number;
  reviewsCount: number;
  burnTimeHours: number;
  sizeOz: number;
  waxType: string;
  wickType: string;
  vesselType: string;
  intensity: 'Subtle' | 'Medium' | 'Intense';
  image: string;
  description: string;
  notes: ScentNotes;
  inStock: boolean;
  featured?: boolean;
}

export interface VesselOption {
  id: string;
  name: string;
  material: string;
  description: string;
  colorClass: string;
  textureLabel: string;
  basePriceUSD: number;
  basePriceNGN: number;
  previewGradient: string;
  labelBg: string;
  labelTextColor: string;
}

export interface WaxOption {
  id: string;
  name: string;
  description: string;
  burnCharacteristic: string;
  addedPriceUSD: number;
  addedPriceNGN: number;
}

export interface WickOption {
  id: string;
  name: string;
  description: string;
  soundEffect: string;
  addedPriceUSD: number;
  addedPriceNGN: number;
}

export interface FragranceNoteItem {
  id: string;
  name: string;
  scentProfile: string;
}

export interface CustomCandleConfig {
  vesselId: string;
  sizeOz: 4 | 8 | 14;
  waxId: string;
  wickId: string;
  scentBlendType: 'preset' | 'bespoke';
  presetId?: string;
  topNote: string;
  heartNote: string;
  baseNote: string;
  scentIntensity: 'Subtle' | 'Balanced' | 'Rich';
  customTitle: string;
  customSubtitle: string;
  customDedication: string;
  dateOrLocation: string;
  labelFont: 'serif' | 'sans' | 'typewriter' | 'script';
  lidOption: 'brass' | 'walnut' | 'black' | 'none';
  giftPackaging: boolean;
  giftCardMessage: string;
  waxColorTint: 'natural-cream' | 'warm-amber' | 'botanical-sage' | 'charcoal-noir';
}

export interface CartItem {
  id: string;
  type: 'standard' | 'bespoke';
  product?: CandleProduct;
  bespokeConfig?: CustomCandleConfig;
  quantity: number;
  unitPriceUSD: number;
  unitPriceNGN: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  candleName: string;
  comment: string;
  verified: boolean;
}

export interface WishlistItem {
  id: string;
  type: 'standard' | 'bespoke';
  productId?: string;
  product?: CandleProduct;
  bespokeConfig?: CustomCandleConfig;
  priceUSD: number;
  priceNGN: number;
  addedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isRegistered: boolean;
}

