export type ProductCategory =
  | 'smartphone'
  | 'earbuds'
  | 'headphones'
  | 'case'
  | 'charger'
  | 'powerbank'
  | 'watch'
  | 'protector';

export interface ProductSpec {
  display?: string;
  chip?: string;
  camera?: string;
  battery?: string;
  os?: string;
  storage?: string;
  ram?: string;
  weight?: string;
  connectivity?: string;
  waterResistance?: string;
  driver?: string;
  anc?: string;
  batteryLife?: string;
  size?: string;
  health?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  inStock: boolean;
  badge?: string;
  colors?: string[];
  storage?: string[];
  specs: ProductSpec;
  description: string;
  shortDescription?: string;
}

export const products: Product[] = [
  // ─── SMARTPHONES ─────────────────────────────────────────────────────────
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphone',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=700&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=700&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.9,
    reviewCount: 3241,
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'BEST SELLER',
    colors: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
    storage: ['256GB', '512GB', '1TB'],
    specs: {
      display: '6.7" Super Retina XDR OLED',
      chip: 'Apple A17 Pro',
      camera: '48MP + 12MP + 12MP Tele',
      battery: '4422 mAh · 29hr video',
      os: 'iOS 17',
      storage: 'Up to 1TB',
      ram: '8GB',
      weight: '221g',
      connectivity: '5G · Wi-Fi 6E · BT 5.3',
      waterResistance: 'IP68',
    },
    description:
      'The most powerful iPhone ever built. Featuring titanium design, the A17 Pro chip, and a 48MP camera system with 5× optical zoom for pro-level photography.',
    shortDescription: 'A17 Pro · 48MP · Titanium · 5× Zoom',
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'smartphone',
    price: 999,
    image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&h=700&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 2108,
    isFeatured: true,
    isNew: true,
    inStock: true,
    badge: 'NEW',
    colors: ['Natural Titanium', 'Black Titanium', 'White Titanium', 'Blue Titanium'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: {
      display: '6.1" Super Retina XDR OLED',
      chip: 'Apple A17 Pro',
      camera: '48MP + 12MP + 12MP Tele',
      battery: '3274 mAh · 23hr video',
      os: 'iOS 17',
      storage: 'Up to 1TB',
      ram: '8GB',
      weight: '187g',
      connectivity: '5G · Wi-Fi 6E · BT 5.3',
      waterResistance: 'IP68',
    },
    description:
      'Pro performance in a compact titanium form. The A17 Pro chip with hardware ray tracing and a versatile 48MP camera system.',
    shortDescription: 'A17 Pro · 48MP · Titanium · Compact',
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphone',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1610945415814-7a1f82fd38ab?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945415814-7a1f82fd38ab?w=600&h=700&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377cb?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 2765,
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'S PEN',
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    storage: ['256GB', '512GB', '1TB'],
    specs: {
      display: '6.8" QHD+ Dynamic AMOLED 2X',
      chip: 'Snapdragon 8 Gen 3',
      camera: '200MP + 50MP + 10MP + 12MP',
      battery: '5000 mAh · 27W Fast Charge',
      os: 'Android 14 · One UI 6.1',
      storage: 'Up to 1TB',
      ram: '12GB',
      weight: '232g',
      connectivity: '5G · Wi-Fi 7 · BT 5.3',
      waterResistance: 'IP68',
    },
    description:
      'The ultimate Galaxy experience with built-in S Pen, 200MP camera, and AI-powered features. Titanium frame for premium durability.',
    shortDescription: '200MP · S Pen · AI · Titanium',
  },
  {
    id: 'samsung-s24-plus',
    name: 'Galaxy S24+',
    brand: 'Samsung',
    category: 'smartphone',
    price: 999,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377cb?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377cb?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.7,
    reviewCount: 1432,
    isOnSale: true,
    inStock: true,
    colors: ['Cobalt Violet', 'Marble Gray', 'Onyx Black', 'Jade Green'],
    storage: ['256GB', '512GB'],
    specs: {
      display: '6.7" QHD+ Dynamic AMOLED 2X',
      chip: 'Snapdragon 8 Gen 3',
      camera: '50MP + 12MP + 10MP',
      battery: '4900 mAh · 45W Fast Charge',
      os: 'Android 14 · One UI 6.1',
      storage: 'Up to 512GB',
      ram: '12GB',
      weight: '196g',
      connectivity: '5G · Wi-Fi 7 · BT 5.3',
      waterResistance: 'IP68',
    },
    description:
      'The Galaxy S24+ brings a large 6.7" display and pro-grade camera to a sleek, refined form factor with Galaxy AI built in.',
    shortDescription: '50MP · 45W · Galaxy AI · Large Display',
  },
  {
    id: 'google-pixel-8-pro',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    category: 'smartphone',
    price: 999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.7,
    reviewCount: 1876,
    isFeatured: true,
    isNew: true,
    inStock: true,
    badge: 'AI',
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    storage: ['128GB', '256GB', '1TB'],
    specs: {
      display: '6.7" LTPO OLED 120Hz',
      chip: 'Google Tensor G3',
      camera: '50MP + 48MP + 48MP Tele',
      battery: '5050 mAh · 30W Wireless',
      os: 'Android 14',
      storage: 'Up to 1TB',
      ram: '12GB',
      weight: '213g',
      connectivity: '5G · Wi-Fi 7 · BT 5.3',
      waterResistance: 'IP68',
    },
    description:
      "Google's most capable phone with Tensor G3, the best computational photography, and exclusive AI features like Magic Eraser and Best Take.",
    shortDescription: 'Tensor G3 · 50MP · AI Magic · 7 Years Updates',
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'smartphone',
    price: 799,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 943,
    isNew: true,
    inStock: true,
    badge: '100W',
    colors: ['Silky Black', 'Flowy Emerald'],
    storage: ['256GB', '512GB'],
    specs: {
      display: '6.82" LTPO3 AMOLED 4K · 120Hz',
      chip: 'Snapdragon 8 Gen 3',
      camera: '50MP Hasselblad + 48MP + 64MP',
      battery: '5400 mAh · 100W SUPERVOOC',
      os: 'OxygenOS 14 · Android 14',
      storage: 'Up to 512GB',
      ram: '16GB',
      weight: '220g',
      connectivity: '5G · Wi-Fi 7 · BT 5.4',
      waterResistance: 'IP65',
    },
    description:
      'Flagship power with Hasselblad-tuned cameras, the fastest 100W charging, and a smooth 120Hz LTPO display. Value-to-performance king.',
    shortDescription: 'Hasselblad · 100W Charge · 16GB RAM',
  },
  {
    id: 'xiaomi-14-pro',
    name: 'Xiaomi 14 Pro',
    brand: 'Xiaomi',
    category: 'smartphone',
    price: 899,
    image: 'https://images.unsplash.com/photo-1490167638588-4dc782d99b8c?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1490167638588-4dc782d99b8c?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 712,
    isNew: true,
    inStock: true,
    colors: ['Black', 'White', 'Titanium'],
    storage: ['256GB', '512GB', '1TB'],
    specs: {
      display: '6.73" LTPO AMOLED 4K · 120Hz',
      chip: 'Snapdragon 8 Gen 3',
      camera: '50MP Leica + 50MP + 50MP',
      battery: '4880 mAh · 120W HyperCharge',
      os: 'MIUI 15 · Android 14',
      storage: 'Up to 1TB',
      ram: '16GB',
      weight: '223g',
      connectivity: '5G · Wi-Fi 7 · BT 5.4',
      waterResistance: 'IP68',
    },
    description:
      'Co-engineered with Leica for extraordinary photography. 120W HyperCharge fills the battery in 23 minutes. Pure performance.',
    shortDescription: 'Leica · 120W · Snapdragon 8 Gen 3',
  },
  {
    id: 'samsung-galaxy-a55',
    name: 'Galaxy A55',
    brand: 'Samsung',
    category: 'smartphone',
    price: 449,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1567581935814-cc73ede43c4a?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1567581935814-cc73ede43c4a?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.4,
    reviewCount: 1523,
    isOnSale: true,
    inStock: true,
    badge: 'VALUE',
    colors: ['Awesome Iceblue', 'Awesome Navy', 'Awesome Lilac', 'Awesome Lemon'],
    storage: ['128GB', '256GB'],
    specs: {
      display: '6.6" FHD+ Super AMOLED · 120Hz',
      chip: 'Exynos 1480',
      camera: '50MP + 12MP + 5MP',
      battery: '5000 mAh · 25W Fast Charge',
      os: 'Android 14 · One UI 6.1',
      storage: 'Up to 256GB + microSD',
      ram: '8GB',
      weight: '213g',
      connectivity: '5G · Wi-Fi 6 · BT 5.3',
      waterResistance: 'IP67',
    },
    description:
      'Premium mid-range design with IP67 water resistance, vibrant AMOLED display, and four years of OS updates guaranteed.',
    shortDescription: '50MP · IP67 · 5000mAh · 4 Year Updates',
  },

  // ─── EARBUDS ──────────────────────────────────────────────────────────────
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    category: 'earbuds',
    price: 249,
    originalPrice: 279,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 4312,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'TOP RATED',
    colors: ['White'],
    specs: {
      driver: 'Custom Apple driver',
      anc: 'Active Noise Cancellation + Transparency Mode',
      batteryLife: '6hr · 30hr with case',
      connectivity: 'Bluetooth 5.3 · H2 chip',
      waterResistance: 'IPX4',
      weight: '5.3g per bud',
    },
    description:
      'Industry-leading Active Noise Cancellation with Adaptive Audio. Up to 2× more noise cancellation vs. first generation.',
    shortDescription: 'H2 Chip · ANC · Adaptive Audio · 30hr',
  },
  {
    id: 'samsung-buds3-pro',
    name: 'Galaxy Buds3 Pro',
    brand: 'Samsung',
    category: 'earbuds',
    price: 229,
    image: 'https://images.unsplash.com/photo-1609091839311-d5b66ff3d1b5?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5b66ff3d1b5?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 876,
    isNew: true,
    inStock: true,
    colors: ['Silver', 'White'],
    specs: {
      driver: '10.5mm + 6.1mm dual drivers',
      anc: 'Intelligent ANC · 360° Audio',
      batteryLife: '6hr · 26hr with case',
      connectivity: 'Bluetooth 5.4',
      waterResistance: 'IPX7',
      weight: '6.3g per bud',
    },
    description:
      'Blade-shaped design with 360° audio capture, real-time translation, and Intelligent ANC that adapts to your environment.',
    shortDescription: 'Dual Driver · IPX7 · 360° Audio',
  },
  {
    id: 'sony-wf-1000xm5',
    name: 'WF-1000XM5',
    brand: 'Sony',
    category: 'earbuds',
    price: 279,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1624728197048-b59f29d6a7db?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1624728197048-b59f29d6a7db?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 2134,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'AUDIOPHILE',
    colors: ['Black', 'Silver'],
    specs: {
      driver: '8.4mm custom driver',
      anc: 'Industry-leading ANC · Auto NC Optimizer',
      batteryLife: '8hr · 24hr with case',
      connectivity: 'Bluetooth 5.3 · LDAC · multipoint',
      waterResistance: 'IPX4',
      weight: '5.9g per bud',
    },
    description:
      "Sony's best-ever earbuds with industry-leading ANC, LDAC high-resolution audio, and 40% smaller than previous gen.",
    shortDescription: 'LDAC · Industry-Leading ANC · 8hr',
  },

  // ─── HEADPHONES ────────────────────────────────────────────────────────────
  {
    id: 'sony-wh-1000xm5',
    name: 'WH-1000XM5',
    brand: 'Sony',
    category: 'headphones',
    price: 349,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.9,
    reviewCount: 5621,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'EDITOR\'S CHOICE',
    colors: ['Black', 'Platinum Silver'],
    specs: {
      driver: '30mm custom driver',
      anc: 'Industry-leading ANC · 8 microphones',
      batteryLife: '30hr with ANC · 40hr without',
      connectivity: 'Bluetooth 5.2 · LDAC · multipoint',
      weight: '250g',
    },
    description:
      "The world's best noise-cancelling headphones with 30 hours of battery and crystal-clear call quality from 8 microphones.",
    shortDescription: 'Best-in-Class ANC · 30hr · LDAC · 8 Mics',
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max',
    brand: 'Apple',
    category: 'headphones',
    price: 549,
    image: 'https://images.unsplash.com/photo-1567333971-38944a09a9a7?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1567333971-38944a09a9a7?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 1874,
    isFeatured: true,
    inStock: true,
    colors: ['Midnight', 'Starlight', 'Sky Blue', 'Pink', 'Orange'],
    specs: {
      driver: '40mm Apple-designed dynamic driver',
      anc: 'Computational Audio · Transparency Mode',
      batteryLife: '20hr with ANC',
      connectivity: 'Bluetooth 5.0 · H1 chip (×2)',
      weight: '385g',
    },
    description:
      "Premium over-ear headphones with aluminium ear cups, knitted mesh headband, and Apple's computational audio engine.",
    shortDescription: 'H1 Chip · Spatial Audio · Premium Materials',
  },

  // ─── CASES ─────────────────────────────────────────────────────────────────
  {
    id: 'otterbox-defender-iphone15',
    name: 'OtterBox Defender iPhone 15 Pro',
    brand: 'OtterBox',
    category: 'case',
    price: 59,
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.7,
    reviewCount: 2341,
    isBestSeller: true,
    inStock: true,
    colors: ['Black', 'Blue', 'Green', 'Purple'],
    specs: {
      protection: 'Multi-layer defense',
      compatibility: 'iPhone 15 Pro',
      waterResistance: 'Dust/port protection',
      weight: '45g',
    },
    description:
      'Three-layer protection that goes above and beyond to guard your iPhone from drops, dirt, dust, and daily hazards.',
    shortDescription: 'Triple Layer · Port Protection · MagSafe',
  },
  {
    id: 'spigen-ultra-hybrid',
    name: 'Spigen Ultra Hybrid Galaxy S24',
    brand: 'Spigen',
    category: 'case',
    price: 29,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 3102,
    inStock: true,
    colors: ['Frost Clear', 'Matte Black', 'Navy Blue'],
    specs: {
      protection: 'Air Cushion Technology',
      compatibility: 'Samsung Galaxy S24',
      weight: '22g',
    },
    description:
      "Military-grade certified protection in a slim, transparent case that shows off your phone's design.",
    shortDescription: 'Military Grade · Slim · Crystal Clear',
  },

  // ─── CHARGERS ─────────────────────────────────────────────────────────────
  {
    id: 'anker-65w-gan',
    name: 'Anker 65W GaN Charger',
    brand: 'Anker',
    category: 'charger',
    price: 45,
    originalPrice: 55,
    image: 'https://images.unsplash.com/photo-1614033671037-56ca62bbbd29?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1614033671037-56ca62bbbd29?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 4521,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    specs: {
      power: '65W GaN technology',
      ports: '2× USB-C + 1× USB-A',
      compatibility: 'iPhone · Android · Laptop',
      size: '48 × 48 × 32mm',
      weight: '130g',
    },
    description:
      'GaN technology packs 65W into a charger smaller than the original Apple 30W. Charges MacBook, iPhone, and Android simultaneously.',
    shortDescription: '65W · GaN · 3-Port · Universal',
  },
  {
    id: 'apple-magsafe-charger',
    name: 'Apple MagSafe Charger 2m',
    brand: 'Apple',
    category: 'charger',
    price: 39,
    image: 'https://images.unsplash.com/photo-1574920162043-b872873f19c8?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1574920162043-b872873f19c8?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.5,
    reviewCount: 6234,
    isBestSeller: true,
    inStock: true,
    specs: {
      power: '15W magnetic wireless',
      compatibility: 'iPhone 12 and later',
      cableLength: '2 metres',
      connector: 'USB-C',
    },
    description:
      'Faster wireless charging with a perfectly aligned magnetic connection. Works with all MagSafe-compatible accessories.',
    shortDescription: '15W · Magnetic · Perfect Alignment · 2m',
  },

  // ─── POWER BANKS ───────────────────────────────────────────────────────────
  {
    id: 'anker-powercore-26800',
    name: 'Anker PowerCore 26800',
    brand: 'Anker',
    category: 'powerbank',
    price: 79,
    originalPrice: 89,
    image: 'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.7,
    reviewCount: 8231,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'HIGH CAPACITY',
    colors: ['Black'],
    specs: {
      capacity: '26,800 mAh',
      power: '65W USB-C PD',
      ports: '2× USB-C + 1× USB-A',
      weight: '465g',
      size: '166 × 62 × 22mm',
    },
    description:
      'Massive 26,800mAh capacity charges an iPhone 15 nearly 7 times. 65W USB-C PD charges your laptop, tablet, and phone simultaneously.',
    shortDescription: '26800mAh · 65W PD · 3 Devices · 7× Charge',
  },

  // ─── SMARTWATCHES ──────────────────────────────────────────────────────────
  {
    id: 'apple-watch-series-9',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'watch',
    price: 399,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.8,
    reviewCount: 3421,
    isFeatured: true,
    isBestSeller: true,
    isOnSale: true,
    inStock: true,
    badge: 'FEATURED',
    colors: ['Midnight', 'Starlight', 'Pink', 'Red', 'Silver'],
    storage: ['41mm', '45mm'],
    specs: {
      display: 'Always-On Retina OLED',
      chip: 'Apple S9 SiP',
      health: 'Heart rate · ECG · Blood O2 · Temperature',
      batteryLife: '18hr · 36hr Low Power',
      connectivity: 'GPS · LTE · Wi-Fi 4 · BT 5.3',
      waterResistance: 'WR50 · Swim-proof',
      os: 'watchOS 10',
    },
    description:
      'Smarter, brighter, and more capable than ever. New Double Tap gesture, brighter Always-On display, and carbon-neutral option.',
    shortDescription: 'S9 SiP · Double Tap · ECG · Always-On',
  },
  {
    id: 'samsung-galaxy-watch6-classic',
    name: 'Galaxy Watch6 Classic',
    brand: 'Samsung',
    category: 'watch',
    price: 379,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.6,
    reviewCount: 1234,
    isNew: true,
    inStock: true,
    colors: ['Black', 'Silver'],
    storage: ['43mm', '47mm'],
    specs: {
      display: '1.5" Super AMOLED',
      chip: 'Exynos W930',
      health: 'BIA · BPM · ECG · Sleep Coach',
      batteryLife: '40hr',
      connectivity: 'GPS · LTE · Wi-Fi 5 · BT 5.3',
      waterResistance: '5ATM + IP68',
      os: 'Wear OS 4 · One UI Watch 5',
    },
    description:
      'Classic rotating bezel design with advanced health tracking including BIA body composition, ECG, and a personalised sleep coach.',
    shortDescription: 'Rotating Bezel · ECG · BIA · 40hr',
  },

  // ─── SCREEN PROTECTORS ─────────────────────────────────────────────────────
  {
    id: 'zagg-invisibleshield-iphone15',
    name: 'ZAGG InvisibleShield Ultra Clear',
    brand: 'ZAGG',
    category: 'protector',
    price: 49,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=700&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=700&fit=crop&q=80',
    ],
    rating: 4.5,
    reviewCount: 2891,
    isBestSeller: true,
    inStock: true,
    colors: ['Clear'],
    specs: {
      material: 'Tempered glass · 9H hardness',
      compatibility: 'iPhone 15 Pro Max',
      protection: 'Anti-scratch · Anti-fingerprint',
      thickness: '0.33mm',
    },
    description:
      'Case-friendly tempered glass screen protection with edge-to-edge coverage and a smudge-resistant oleophobic coating.',
    shortDescription: '9H Glass · Anti-Fingerprint · Case Friendly',
  },
];

export const brands = [
  { id: 'apple', name: 'Apple', logo: '🍎', productCount: 6 },
  { id: 'samsung', name: 'Samsung', logo: '◆', productCount: 5 },
  { id: 'google', name: 'Google', logo: 'G', productCount: 1 },
  { id: 'sony', name: 'Sony', logo: 'S', productCount: 2 },
  { id: 'oneplus', name: 'OnePlus', logo: '1+', productCount: 1 },
  { id: 'xiaomi', name: 'Xiaomi', logo: 'Mi', productCount: 1 },
  { id: 'anker', name: 'Anker', logo: 'A', productCount: 2 },
  { id: 'zagg', name: 'ZAGG', logo: 'Z', productCount: 1 },
];

export const categories: { id: ProductCategory; label: string; icon: string; description: string }[] = [
  { id: 'smartphone', label: 'Smartphones', icon: '📱', description: 'Latest flagship & mid-range phones' },
  { id: 'earbuds', label: 'Earbuds', icon: '🎧', description: 'True wireless with ANC' },
  { id: 'headphones', label: 'Headphones', icon: '🎵', description: 'Over-ear premium audio' },
  { id: 'watch', label: 'Smartwatches', icon: '⌚', description: 'Health & fitness tracking' },
  { id: 'case', label: 'Cases', icon: '🛡️', description: 'Drop & scratch protection' },
  { id: 'charger', label: 'Chargers', icon: '⚡', description: 'Fast & wireless charging' },
  { id: 'powerbank', label: 'Power Banks', icon: '🔋', description: 'Portable battery packs' },
  { id: 'protector', label: 'Screen Protectors', icon: '🔲', description: 'Glass & film protection' },
];

export const testimonials = [
  {
    id: '1',
    name: 'Amara Osei',
    role: 'Tech Enthusiast',
    avatar: 'AO',
    rating: 5,
    review:
      'Ordered my iPhone 15 Pro Max and it arrived next day, sealed in original packaging. The unboxing experience was incredible. Kure\'s is now my go-to for everything tech.',
    product: 'iPhone 15 Pro Max',
    date: '2024-12-01',
  },
  {
    id: '2',
    name: 'Kwame Mensah',
    role: 'Software Developer',
    avatar: 'KM',
    rating: 5,
    review:
      'Best online phone store I\'ve used. The AI assistant helped me choose between the S24 Ultra and Pixel 8 Pro. Ended up with the S24 Ultra and couldn\'t be happier.',
    product: 'Galaxy S24 Ultra',
    date: '2024-11-20',
  },
  {
    id: '3',
    name: 'Efua Darko',
    role: 'Content Creator',
    avatar: 'ED',
    rating: 5,
    review:
      'The Sony WH-1000XM5 arrived faster than expected. Super easy checkout, secure payment, and the product is exactly as described. Premium experience all around.',
    product: 'Sony WH-1000XM5',
    date: '2024-11-15',
  },
  {
    id: '4',
    name: 'Kofi Agyemang',
    role: 'Business Professional',
    avatar: 'KA',
    rating: 5,
    review:
      'I love how I can compare phones side-by-side. Really helped me make an informed decision. The delivery tracking updates are excellent — I knew exactly when it arrived.',
    product: 'OnePlus 12',
    date: '2024-11-08',
  },
  {
    id: '5',
    name: 'Abena Frimpong',
    role: 'Student',
    avatar: 'AF',
    rating: 4,
    review:
      'Great selection and competitive prices. The wishlist feature helped me save up for my AirPods Pro. When they dropped in price I got an instant notification. Love that!',
    product: 'AirPods Pro 2',
    date: '2024-10-30',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getOnSaleProducts(): Product[] {
  return products.filter((p) => p.isOnSale && p.originalPrice);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}
