import { CandleProduct, VesselOption, WaxOption, WickOption, FragranceNoteItem, Review } from '../types/candle';

export const CANDLE_PRODUCTS: CandleProduct[] = [
  {
    id: 'candle-01',
    name: 'Sanctuary No. 04',
    subtitle: 'Warm Sandalwood & Bourbon Vanilla',
    collection: 'Apothecary',
    scentFamily: 'Woody & Warm',
    priceUSD: 28,
    priceNGN: 42000,
    rating: 4.9,
    reviewsCount: 148,
    burnTimeHours: 55,
    sizeOz: 8,
    waxType: '100% Pure Soy Wax',
    wickType: 'Crackling FSC Wood Wick',
    vesselType: 'Hand-blown Amber Glass',
    intensity: 'Medium',
    image: '/src/assets/images/candle_amber_sandalwood_1793796451448.jpg',
    description: 'An evocative, grounding aroma engineered to evoke a quiet library on a rainy afternoon. Rich golden amber and creamy bourbon vanilla melt effortlessly into smoky Mysore sandalwood.',
    notes: {
      top: ['Sweet Mandarin', 'Spiced Cardamom'],
      heart: ['Bourbon Vanilla', 'Smoked Tonka Bean'],
      base: ['Mysore Sandalwood', 'Golden Amber', 'Cedar Bark']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'candle-02',
    name: 'The Noir & Dark Oud',
    subtitle: 'Smoked Velvet Oud & Midnight Jasmine',
    collection: 'Ceramic Noir',
    scentFamily: 'Woody & Warm',
    priceUSD: 36,
    priceNGN: 54000,
    rating: 5.0,
    reviewsCount: 92,
    burnTimeHours: 65,
    sizeOz: 9,
    waxType: 'Coconut Apricot Creme',
    wickType: 'Dual Organic Cotton Wick',
    vesselType: 'Matte Charcoal Ceramic with Brass Lid',
    intensity: 'Intense',
    image: '/src/assets/images/candle_ceramic_oud_1793796450877.jpg',
    description: 'Sophisticated, mysterious, and intoxicating. Dark Agarwood oud meets night-blooming jasmine and velvety black musk, encased in our signature tactile matte black ceramic stoneware vessel.',
    notes: {
      top: ['Black Pepper', 'Bergamot Zest'],
      heart: ['Night Jasmine', 'Cypriol', 'Damask Rose'],
      base: ['Cambodian Oud', 'Dark Amber', 'Birch Tar']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'candle-03',
    name: 'Neroli & Wild Bergamot',
    subtitle: 'Mediterranean Citrus & Crisp Neroli Petals',
    collection: 'Fluted Glass',
    scentFamily: 'Fresh & Citrus',
    priceUSD: 32,
    priceNGN: 48000,
    rating: 4.8,
    reviewsCount: 114,
    burnTimeHours: 50,
    sizeOz: 8,
    waxType: '100% Pure Soy Wax',
    wickType: 'Braided Organic Cotton',
    vesselType: 'Fluted Frosted Opal Glass',
    intensity: 'Medium',
    image: '/src/assets/images/candle_frosted_citrus_1793796451273.jpg',
    description: 'Bright morning daylight in a vessel. Sparkling Italian bergamot, orange blossom petals, and dew-kissed sea salt deliver an uplifting olfactory freshness for living rooms and home offices.',
    notes: {
      top: ['Italian Bergamot', 'Grapefruit Rind'],
      heart: ['Neroli Blossom', 'White Tea leaves'],
      base: ['Coastal Cedar', 'Soft White Amber']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'candle-04',
    name: 'Terracotta Cedar & Tonka',
    subtitle: 'Spiced Atlas Cedar & Roasted Tonka',
    collection: 'Terracotta Artisan',
    scentFamily: 'Gourmand & Spiced',
    priceUSD: 38,
    priceNGN: 57000,
    rating: 4.9,
    reviewsCount: 86,
    burnTimeHours: 70,
    sizeOz: 12,
    waxType: 'Beeswax & Soy Natural Blend',
    wickType: 'Dual Organic Cotton Wick',
    vesselType: 'Hand-thrown Terracotta Clay Bowl',
    intensity: 'Intense',
    image: '/src/assets/images/candle_terracotta_cedar_1793796452632.jpg',
    description: 'Hand-formed by local clay artisans and double-wicked for an expansive scent throw. Radiates soothing warmth with raw Atlas cedarwood, toasted tonka, and cinnamon bark.',
    notes: {
      top: ['Nutmeg', 'Cinnamon Bark'],
      heart: ['Atlas Cedarwood', 'Cacao Husk'],
      base: ['Toasted Tonka', 'Raw Honey', 'Vetiver']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'candle-05',
    name: 'Lagos Sunset Hibiscus',
    subtitle: 'Sun-drenched Tropical Flora & Vanilla Milk',
    collection: 'Apothecary',
    scentFamily: 'Floral & Botanical',
    priceUSD: 30,
    priceNGN: 45000,
    rating: 4.9,
    reviewsCount: 67,
    burnTimeHours: 55,
    sizeOz: 8,
    waxType: 'Coconut Apricot Creme',
    wickType: 'Crackling FSC Wood Wick',
    vesselType: 'Hand-blown Amber Glass',
    intensity: 'Medium',
    image: '/src/assets/images/candle_amber_sandalwood_1793796451448.jpg',
    description: 'Inspired by warm dusk skies over the Atlantic coast. Tart scarlet hibiscus flower blended with pink guava, sweet ginger, and warm creamy coconut base notes.',
    notes: {
      top: ['Pink Guava', 'Blood Orange'],
      heart: ['Red Hibiscus', 'Crushed Ginger'],
      base: ['Coconut Creme', 'Warm Vanilla', 'Driftwood']
    },
    inStock: true
  },
  {
    id: 'candle-06',
    name: 'Kyoto Moss & Hinoki',
    subtitle: 'Japanese Hinoki Cypress & Sacred Incense',
    collection: 'Ceramic Noir',
    scentFamily: 'Woody & Warm',
    priceUSD: 34,
    priceNGN: 51000,
    rating: 4.7,
    reviewsCount: 53,
    burnTimeHours: 60,
    sizeOz: 9,
    waxType: '100% Pure Soy Wax',
    wickType: 'Braided Organic Cotton',
    vesselType: 'Matte Charcoal Ceramic',
    intensity: 'Medium',
    image: '/src/assets/images/candle_ceramic_oud_1793796450877.jpg',
    description: 'Recreate the meditative quiet of ancient bamboo groves. Crisp Hinoki wood, damp green forest moss, and temple incense invoke deep tranquility and clarity.',
    notes: {
      top: ['Yuzu Rind', 'Eucalyptus'],
      heart: ['Hinoki Wood', 'Wet Forest Moss'],
      base: ['Frankincense', 'Smoked Vetiver']
    },
    inStock: true
  },
  {
    id: 'candle-07',
    name: 'Sunday Cashmere',
    subtitle: 'Fresh Linen, White Amber & Almond Blossom',
    collection: 'Fluted Glass',
    scentFamily: 'Fresh & Citrus',
    priceUSD: 29,
    priceNGN: 43500,
    rating: 4.8,
    reviewsCount: 79,
    burnTimeHours: 50,
    sizeOz: 8,
    waxType: '100% Pure Soy Wax',
    wickType: 'Braided Cotton Wick',
    vesselType: 'Fluted Frosted Opal Glass',
    intensity: 'Subtle',
    image: '/src/assets/images/candle_frosted_citrus_1793796451273.jpg',
    description: 'The pure tactile luxury of clean Egyptian cotton and warm wool throws. Delicate almond blossoms, sheer white musk, and soft cashmeran.',
    notes: {
      top: ['Crisp Clean Air', 'White Aldehydes'],
      heart: ['Almond Blossom', 'Lily of the Valley'],
      base: ['Cashmeran', 'White Musk', 'Warm Sandalwood']
    },
    inStock: true
  },
  {
    id: 'candle-08',
    name: 'Sahara Star & Spiced Amber',
    subtitle: 'Cardamom Pods, Golden Honey & Myrrh',
    collection: 'Terracotta Artisan',
    scentFamily: 'Gourmand & Spiced',
    priceUSD: 35,
    priceNGN: 52500,
    rating: 5.0,
    reviewsCount: 41,
    burnTimeHours: 65,
    sizeOz: 12,
    waxType: 'Beeswax & Soy Blend',
    wickType: 'Dual Wood Crackling Wick',
    vesselType: 'Handmade Terracotta Bowl',
    intensity: 'Intense',
    image: '/src/assets/images/candle_terracotta_cedar_1793796452632.jpg',
    description: 'A rich culinary and resinous tapestry. Green cardamom crushed into sticky golden honey, smoked frankincense, and aged labdanum.',
    notes: {
      top: ['Green Cardamom', 'Star Anise'],
      heart: ['Golden Honeycomb', 'Smoked Myrrh'],
      base: ['Labdanum', 'Dark Patchouli', 'Benzoin']
    },
    inStock: true
  }
];

export const VESSEL_OPTIONS: VesselOption[] = [
  {
    id: 'amber-glass',
    name: 'Amber Apothecary Glass',
    material: 'Hand-blown UV-blocking amber glass with weighted base',
    description: 'Warm vintage glow that filters light beautifully while burning.',
    colorClass: 'bg-amber-950 text-amber-100 border-amber-900',
    textureLabel: 'Warm Amber Luster',
    basePriceUSD: 26,
    basePriceNGN: 39000,
    previewGradient: 'from-amber-950 via-amber-900 to-amber-800',
    labelBg: 'bg-[#F4EEDD]',
    labelTextColor: 'text-stone-900'
  },
  {
    id: 'matte-ceramic',
    name: 'Obsidian Matte Ceramic',
    material: 'Wheel-thrown stoneware ceramic with silky soft-touch finish',
    description: 'Architectural minimalism that looks striking in modern spaces.',
    colorClass: 'bg-stone-900 text-stone-100 border-stone-800',
    textureLabel: 'Tactile Matte Charcoal',
    basePriceUSD: 32,
    basePriceNGN: 48000,
    previewGradient: 'from-stone-950 via-stone-900 to-neutral-800',
    labelBg: 'bg-stone-900',
    labelTextColor: 'text-stone-100'
  },
  {
    id: 'frosted-fluted',
    name: 'Fluted Frosted Opal Glass',
    material: 'Ribbed textured glass with a soft semi-opaque velvet frost',
    description: 'Casts gentle ribbed shadows and an ethereal 360° luminous halo.',
    colorClass: 'bg-stone-100 text-stone-900 border-stone-300',
    textureLabel: 'Translucent Opal Fluting',
    basePriceUSD: 30,
    basePriceNGN: 45000,
    previewGradient: 'from-stone-200 via-neutral-100 to-white',
    labelBg: 'bg-white/90 backdrop-blur-sm',
    labelTextColor: 'text-stone-900'
  },
  {
    id: 'terracotta-clay',
    name: 'Artisan Terracotta Clay',
    material: 'Natural kiln-fired terracotta with raw porous exterior',
    description: 'Earthy, tactile, and reusable as a succulent planter after burning.',
    colorClass: 'bg-amber-800 text-amber-50 border-amber-700',
    textureLabel: 'Warm Natural Clay',
    basePriceUSD: 34,
    basePriceNGN: 51000,
    previewGradient: 'from-amber-800 via-orange-900 to-stone-800',
    labelBg: 'bg-[#EADDC9]',
    labelTextColor: 'text-stone-900'
  }
];

export const WAX_OPTIONS: WaxOption[] = [
  {
    id: 'soy',
    name: '100% Organic Soy Wax',
    description: 'Pure Midwest soybean wax. Non-toxic, zero soot, slow clean burn.',
    burnCharacteristic: 'Cooler burn temperature, preserves delicate floral & citrus notes.',
    addedPriceUSD: 0,
    addedPriceNGN: 0
  },
  {
    id: 'coconut-apricot',
    name: 'Coconut Apricot Creme Blend',
    description: 'Ultra-luxurious velvety blend with outstanding cold and hot fragrance throw.',
    burnCharacteristic: 'Pours with silky porcelain top; disperses scent 35% faster across rooms.',
    addedPriceUSD: 4,
    addedPriceNGN: 6000
  },
  {
    id: 'beeswax-soy',
    name: 'Raw Beeswax & Soy Fusion',
    description: 'Infused with unrefined local cappings beeswax. Naturally releases negative ions.',
    burnCharacteristic: 'Longest burn duration with subtle natural honey undertone.',
    addedPriceUSD: 6,
    addedPriceNGN: 9000
  }
];

export const WICK_OPTIONS: WickOption[] = [
  {
    id: 'wood-crackling',
    name: 'FSC-Certified Wood Wick',
    description: 'Sustainably sourced natural timber that creates a soothing fireside crackle sound.',
    soundEffect: 'Gentle hearth crackle',
    addedPriceUSD: 3,
    addedPriceNGN: 4500
  },
  {
    id: 'cotton-braided',
    name: 'Braided Organic Cotton Wick',
    description: 'Unbleached natural cotton fibers twisted with paper threads. Steady, smoke-free flame.',
    soundEffect: 'Silent meditative burn',
    addedPriceUSD: 0,
    addedPriceNGN: 0
  },
  {
    id: 'dual-cotton',
    name: 'Dual Braided Cotton Wicks',
    description: 'Twin wicks positioned for wide melt pool, ideal for rapid scent diffusion in larger rooms.',
    soundEffect: 'Expansive warm glow',
    addedPriceUSD: 4,
    addedPriceNGN: 6000
  }
];

export const FRAGRANCE_PRESETS = [
  {
    id: 'preset-lagos',
    name: 'Lagos Golden Twilight',
    category: 'Botanical & Citrus',
    top: 'Sweet Blood Orange & Pink Guava',
    heart: 'Scarlet Hibiscus & Crushed Ginger',
    base: 'Creamy Coconut & Warm Amber',
    description: 'An effervescent harmony of Atlantic sea breeze, tropical nectar, and golden twilight warmth.'
  },
  {
    id: 'preset-sanctuary',
    name: 'Atelier Velvet Sandalwood',
    category: 'Woody & Warm',
    top: 'Cardamom & Bergamot',
    heart: 'Bourbon Vanilla & Tonka Bean',
    base: 'Mysore Sandalwood & Cedar Bark',
    description: 'Our house signature. Enveloping, contemplative, and rich with creamy smoked woods.'
  },
  {
    id: 'preset-oud',
    name: 'Midnight Royale & Dark Oud',
    category: 'Intense Resinous',
    top: 'Crushed Peppercorn & Neroli',
    heart: 'Smoked Cypress & Damask Rose',
    base: 'Cambodian Oud & Dark Patchouli',
    description: 'Opulent, deep, and sensual. Leaves an unforgettable aromatic presence.'
  },
  {
    id: 'preset-cashmere',
    name: 'Silk Linen & White Musk',
    category: 'Fresh & Clean',
    top: 'Crisp Morning Air & Bergamot',
    heart: 'White Tea & Almond Petals',
    base: 'Cashmeran & Soft Amber',
    description: 'Like slipping into freshly laundered crisp cotton sheets on a tranquil morning.'
  }
];

export const TOP_NOTES_LIST: FragranceNoteItem[] = [
  { id: 'tn-bergamot', name: 'Italian Bergamot', scentProfile: 'Crisp, citrusy, sparkling and sunny' },
  { id: 'tn-cardamom', name: 'Green Cardamom', scentProfile: 'Spiced aromatic, warm herbal elegance' },
  { id: 'tn-blood-orange', name: 'Blood Orange Zest', scentProfile: 'Juicy, radiant, uplifting sweetness' },
  { id: 'tn-pink-pepper', name: 'Pink Peppercorn', scentProfile: 'Dry, spicy, faintly rosy facet' },
  { id: 'tn-white-tea', name: 'White Tea Leaf', scentProfile: 'Gentle, herbal, pure zen clarity' },
  { id: 'tn-eucalyptus', name: 'Crushed Eucalyptus', scentProfile: 'Cooling, purifying, spa-like breath' }
];

export const HEART_NOTES_LIST: FragranceNoteItem[] = [
  { id: 'hn-jasmine', name: 'Midnight Jasmine', scentProfile: 'Sensual, intoxicating night bloom' },
  { id: 'hn-sandalwood', name: 'Velvet Sandalwood', scentProfile: 'Creamy wood, calming and grounding' },
  { id: 'hn-vanilla', name: 'Bourbon Vanilla Pod', scentProfile: 'Rich, caramelized, comfortingly warm' },
  { id: 'hn-rose', name: 'Damask Rose Petal', scentProfile: 'Romantic, velvety, modern botanical' },
  { id: 'hn-tonka', name: 'Toasted Tonka Bean', scentProfile: 'Sweet almond, tobacco, and coumarin' },
  { id: 'hn-lavender', name: 'Wild French Lavender', scentProfile: 'Herbaceous, floral, sleep-inducing' }
];

export const BASE_NOTES_LIST: FragranceNoteItem[] = [
  { id: 'bn-oud', name: 'Aged Cambodian Oud', scentProfile: 'Smoky, regal, deeply atmospheric' },
  { id: 'bn-amber', name: 'Golden Resinous Amber', scentProfile: 'Glow of warm fossilized resin' },
  { id: 'bn-cedar', name: 'Virginian Cedarwood', scentProfile: 'Pencil-shaving dryness, timeless structure' },
  { id: 'bn-honey', name: 'Raw Forest Honey', scentProfile: 'Warm animalic sweet beeswax depth' },
  { id: 'bn-patchouli', name: 'Earthy Dark Patchouli', scentProfile: 'Rich damp soil, dark chocolate nuance' },
  { id: 'bn-musk', name: 'Sheer Cashmere Musk', scentProfile: 'Clean skin warmth, silky lingering veil' }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Adesuwa O.',
    location: 'Victoria Island, Lagos',
    rating: 5,
    date: '2 days ago',
    candleName: 'Sanctuary No. 04',
    comment: 'The wood wick crackle is pure magic! It fills my entire open-plan apartment with warm sandalwood without being overwhelming. The dual currency price in Naira made checking out with my Nigerian card completely seamless.',
    verified: true
  },
  {
    id: 'rev-02',
    author: 'Marcus Vance',
    location: 'Atlanta, Georgia (USA)',
    rating: 5,
    date: '1 week ago',
    candleName: 'Custom Bespoke Candle',
    comment: 'I personalized an amber jar with our wedding anniversary date and customized the scent with Blood Orange, Bourbon Vanilla, and Oud. The custom linen label was exquisite. Truly luxury tier craftsmanship.',
    verified: true
  },
  {
    id: 'rev-03',
    author: 'Chidinma K.',
    location: 'Maitama, Abuja',
    rating: 5,
    date: '2 weeks ago',
    candleName: 'The Noir & Dark Oud',
    comment: 'The matte black ceramic container feels heavy and opulent. Burns remarkably even with zero soot. Having both ₦ and $ price tags right there made it so simple to budget for gift sets.',
    verified: true
  },
  {
    id: 'rev-04',
    author: 'Evelyn St. Claire',
    location: 'London, UK',
    rating: 5,
    date: '3 weeks ago',
    candleName: 'Neroli & Wild Bergamot',
    comment: 'The fluted frosted glass glows like a little architectural lantern. Cleanest citrus scent throw I have encountered in years.',
    verified: true
  }
];

export const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Rivers (Port Harcourt)', 'Oyo (Ibadan)', 'Enugu', 
  'Delta', 'Kano', 'Kaduna', 'Ogun', 'Anambra', 'Edo', 'Akwa Ibom', 'Other State'
];
