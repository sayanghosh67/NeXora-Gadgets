export const products = [
  /* ─── Headphones ───────────────────────────────────────────────────────── */
  {
    id: 'hx-900',
    name: 'NeXora Pulse HX-900',
    category: 'Headphones',
    price: 21999,
    rating: 4.8,
    stock: 18,
    badge: 'Top Rated',
    shortDescription: 'Wireless ANC headphones with spatial audio.',
    description:
      'Immersive over-ear headphones with adaptive noise cancelation, 40-hour battery life, and low-latency Bluetooth 5.4 for gaming and streaming. Features class-leading ANC that adapts in real time to your environment.',
    image:
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'buds-s',
    name: 'NeXora Echo Buds S',
    category: 'Headphones',
    price: 9999,
    rating: 4.4,
    stock: 40,
    badge: 'Popular',
    shortDescription: 'Compact ANC earbuds with all-day comfort.',
    description:
      'Pocket-friendly ANC earbuds with crystal-clear call quality, responsive touch controls, and all-day comfort in a matte midnight finish. IPX4 water resistance for workouts and daily commutes.',
    image:
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },

  /* ─── Smart Watches ─────────────────────────────────────────────────────── */
  {
    id: 'sw-pro-2',
    name: 'NeXora Orbit Watch Pro 2',
    category: 'Smart Watches',
    price: 28999,
    rating: 4.7,
    stock: 12,
    badge: 'New',
    shortDescription: 'Premium smartwatch with AMOLED display.',
    description:
      'Track health metrics, workouts, and daily productivity with a sapphire-crystal AMOLED display, 7-day battery, precision haptic feedback, and 50+ sport modes. ECG & SpO2 monitoring included.',
    image:
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'sw-lite',
    name: 'NeXora Orbit Watch Lite',
    category: 'Smart Watches',
    price: 14999,
    rating: 4.3,
    stock: 25,
    badge: 'Best Value',
    shortDescription: 'Affordable smartwatch with 5-day battery.',
    description:
      'A sleek entry-level smartwatch with continuous heart rate monitoring, sleep tracking, built-in GPS, and IP68 water resistance — designed for everyday wellness without compromising on style.',
    image:
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },

  /* ─── Mechanical Keyboards ──────────────────────────────────────────────── */
  {
    id: 'kb-rgb-75',
    name: 'NeXora Forge 75 MK',
    category: 'Mechanical Keyboards',
    price: 14999,
    rating: 4.9,
    stock: 22,
    badge: 'Top Rated',
    shortDescription: 'Hot-swappable 75% keyboard with per-key RGB.',
    description:
      'Compact 75% aluminum mechanical keyboard featuring a gasket-mount design for a smooth, bouncy typing feel. PBT double-shot keycaps, tri-mode connectivity (USB-C, Bluetooth, 2.4 GHz), and per-key RGB.',
    image:
      'https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'kb-tenkeyless',
    name: 'NeXora Forge TKL Pro',
    category: 'Mechanical Keyboards',
    price: 11499,
    rating: 4.6,
    stock: 15,
    shortDescription: 'TKL keyboard with silent linear switches.',
    description:
      'Professional tenkeyless layout with pre-lubed silent linear switches, CNC-machined aluminum case, and foam dampening for a whisper-quiet yet incredibly satisfying typing experience.',
    image:
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },

  /* ─── Gaming Mouse ──────────────────────────────────────────────────────── */
  {
    id: 'gm-viper',
    name: 'NeXora Viper X',
    category: 'Gaming Mouse',
    price: 7999,
    rating: 4.6,
    stock: 34,
    badge: 'Popular',
    shortDescription: 'Ultra-light gaming mouse with 26K DPI sensor.',
    description:
      'Engineered for precision with a top-tier optical sensor supporting up to 26,000 DPI, optical switches rated for 100M clicks, and a low-latency 1 ms wireless connection for marathon sessions.',
    image:
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'gm-phantom',
    name: 'NeXora Phantom Pro',
    category: 'Gaming Mouse',
    price: 5999,
    rating: 4.5,
    stock: 28,
    badge: 'New',
    shortDescription: 'Ergonomic right-handed gaming mouse.',
    description:
      'Sculpted ergonomic gaming mouse with a 16K DPI optical sensor, seven programmable buttons, and ultra-low-latency wired mode. Customizable RGB zones and grippy textured sides for hours of comfort.',
    image:
      'https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },

  /* ─── Monitors ──────────────────────────────────────────────────────────── */
  {
    id: 'mn-34-ultra',
    name: 'NeXora Vision 34 Ultra',
    category: 'Monitors',
    price: 62999,
    rating: 4.8,
    stock: 7,
    badge: 'Limited',
    shortDescription: '34″ curved ultrawide 165 Hz gaming monitor.',
    description:
      'QHD (3440×1440) ultrawide curved panel with a 1 ms GTG response time, HDR600 certification, and deep contrast—tuned for competitive gaming and cinematic creative workflows.',
    image:
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'mn-27-pro',
    name: 'NeXora Vision 27 Pro',
    category: 'Monitors',
    price: 38999,
    rating: 4.6,
    stock: 11,
    shortDescription: '27″ 4K IPS monitor for creative pros.',
    description:
      'Factory-calibrated 4K IPS panel with 100% sRGB and 95% DCI-P3 coverage, 60W USB-C power delivery, ergonomic stand with full adjustment, and ultra-thin bezels for a clean minimal setup.',
    image:
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },

  /* ─── Tech Accessories ──────────────────────────────────────────────────── */
  {
    id: 'dock-air',
    name: 'NeXora Dock Air',
    category: 'Tech Accessories',
    price: 6999,
    rating: 4.5,
    stock: 29,
    shortDescription: '11-in-1 USB-C hub for hybrid setups.',
    description:
      'Slim CNC-aluminum hub with dual 4K HDMI, USB 3.2 Gen 2, SD / microSD card reader, Gigabit Ethernet, and 100W USB-C passthrough — the backbone of a powerful desk setup.',
    image:
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'stand-pro',
    name: 'NeXora Flex Stand Pro',
    category: 'Tech Accessories',
    price: 3499,
    rating: 4.3,
    stock: 55,
    shortDescription: 'Adjustable aluminum laptop stand.',
    description:
      'Minimalist anodised-aluminum stand with 17 height positions, anti-slip silicone pads, and a foldable form factor that slips into any bag — engineered for clean, ergonomic workspaces.',
    image:
      'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'pad-xl',
    name: 'NeXora HexGrid XL Pad',
    category: 'Tech Accessories',
    price: 2499,
    rating: 4.7,
    stock: 80,
    badge: 'Popular',
    shortDescription: 'Extra-large desk pad with stitched edges.',
    description:
      'Premium extended mouse pad with a smooth micro-weave surface optimised for both optical and laser sensors, a heavy-duty non-slip rubber base, and reinforced stitched edges for lasting durability.',
    image:
      'https://images.pexels.com/photos/4792009/pexels-photo-4792009.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
]

export const categories = [
  'All',
  'Headphones',
  'Smart Watches',
  'Mechanical Keyboards',
  'Gaming Mouse',
  'Monitors',
  'Tech Accessories',
]
