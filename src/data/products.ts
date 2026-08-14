import { Product, Category } from '../types';

// Import local generated high-res studio photos
import heroLeatherBagImg from '../assets/images/hero_leather_bag_1786616458993.jpg';
import heroAthleticSneakersImg from '../assets/images/hero_athletic_sneakers_1786616474376.jpg';
import blueSuedeHeelsImg from '../assets/images/blue_suede_heels_1786616489722.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'men-clothing',
    name: "Men's Clothing",
    iconName: 'Shirt',
    itemCount: 142,
    subcategories: ['Jackets & Coats', 'Shirts & Polos', 'Denim & Pants', 'Suits & Blazers', 'Activewear'],
    featuredImage: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'footwear',
    name: 'Footwear & Sneakers',
    iconName: 'Footprints',
    itemCount: 98,
    subcategories: ['Athletic Sneakers', 'Leather Oxfords', 'Casual Loafers', 'Boots', 'Running Shoes'],
    featuredImage: heroAthleticSneakersImg
  },
  {
    id: 'bags-leather',
    name: 'Bags & Leather Goods',
    iconName: 'Briefcase',
    itemCount: 64,
    subcategories: ['Duffel & Travel Bags', 'Executive Briefcases', 'Leather Backpacks', 'Wallets', 'Belts'],
    featuredImage: heroLeatherBagImg
  },
  {
    id: 'heels-women',
    name: "Women's Heels & Luxury",
    iconName: 'Sparkles',
    itemCount: 86,
    subcategories: ['Suede High Heels', 'Designer Pumps', 'Stiletto Sandals', 'Evening Clutch Bags'],
    featuredImage: blueSuedeHeelsImg
  },
  {
    id: 'watches-accessories',
    name: 'Watches & Accessories',
    iconName: 'Watch',
    itemCount: 112,
    subcategories: ['Chronograph Watches', 'Polarized Sunglasses', 'Leather Bracelets', 'Cufflinks'],
    featuredImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Elegant Blue Suede High Heels',
    category: 'heels',
    price: 14500,
    originalPrice: 19500,
    discountPercentage: 26,
    rating: 4.9,
    reviewsCount: 142,
    image: blueSuedeHeelsImg,
    gallery: [
      blueSuedeHeelsImg,
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'E-commerce product shot of elegant blue suede high heels. Handcrafted premium Italian suede upper with soft leather cushioned footbed and a slender 3.5-inch heel. Ideal for galas, evening events, and executive power styling.',
    isHotDeal: true,
    stockCount: 6,
    colors: [
      { name: 'Royal Suede Blue', hex: '#1E3A8A' },
      { name: 'Classic Onyx Black', hex: '#111827' },
      { name: 'Crimson Velvet', hex: '#991B1B' }
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40'],
    tags: ['Heels', 'Women', 'Suede', 'Luxury', 'Hot Deal'],
    specs: {
      'Material': '100% Genuine Italian Suede Leather',
      'Heel Height': '3.5 inches (9 cm)',
      'Sole': 'Non-slip genuine leather outsole',
      'Origin': 'Made in Florence, Italy'
    }
  },
  {
    id: 'p2',
    name: 'Executive Brown Leather Duffel Bag',
    category: 'bags',
    price: 24500,
    originalPrice: 32000,
    discountPercentage: 23,
    rating: 5.0,
    reviewsCount: 198,
    image: heroLeatherBagImg,
    gallery: [
      heroLeatherBagImg,
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Studio product photography of a premium brown leather duffel bag. Crafted from full-grain vegetable-tanned bovine leather with brass hardware, reinforced shoe compartment, and padded laptop sleeve.',
    isHotDeal: true,
    stockCount: 4,
    colors: [
      { name: 'Cognac Brown', hex: '#78350F' },
      { name: 'Espresso Dark', hex: '#3B1F0E' },
      { name: 'Heritage Tan', hex: '#B45309' }
    ],
    sizes: ['45L Carry-On', '60L Weekender'],
    tags: ['Travel', 'Leather', 'Duffel', 'Bags', 'Hot Deal'],
    specs: {
      'Capacity': '45 Liters (TSA Carry-On Compliant)',
      'Hardware': 'Antiqued Solid Brass Zippers',
      'Pockets': '1 Laptop Sleeve (16"), 1 Shoe Bay, 3 Zip Pockets',
      'Weight': '3.2 lbs (1.45 kg)'
    }
  },
  {
    id: 'p3',
    name: 'Pro Athletic Red & White Sneakers',
    category: 'footwear',
    price: 12500,
    originalPrice: 16500,
    discountPercentage: 24,
    rating: 4.8,
    reviewsCount: 215,
    image: heroAthleticSneakersImg,
    gallery: [
      heroAthleticSneakersImg,
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800'
    ],
    description: "Sleek men's red and white athletic sneakers with lightweight nitrogen-injected midsole, breathable micro-mesh upper, and high-grip rubber tread for street style and high performance.",
    isHotDeal: true,
    stockCount: 9,
    colors: [
      { name: 'Sport Red / White', hex: '#DC2626' },
      { name: 'Phantom Black', hex: '#18181B' },
      { name: 'Arctic White / Cyan', hex: '#0284C7' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    tags: ['Footwear', 'Sneakers', 'Men', 'Athletic', 'Hot Deal'],
    specs: {
      'Upper': 'Engineered Micro-Mesh & Synthetic Overlays',
      'Cushioning': 'Air-Responsive Foam Cell',
      'Weight': '290g per shoe',
      'Arch Support': 'Neutral / Dynamic'
    }
  },
  {
    id: 'p4',
    name: 'Chronograph Steel & Dark Leather Watch',
    category: 'accessories',
    price: 18500,
    originalPrice: 24000,
    discountPercentage: 23,
    rating: 4.9,
    reviewsCount: 87,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Precision Japanese quartz chronograph watch encased in 316L brushed stainless steel with sapphire crystal glass and genuine dark Italian leather strap.',
    isHotDeal: true,
    stockCount: 5,
    colors: [
      { name: 'Charcoal Dial / Brown Strap', hex: '#2D3138' },
      { name: 'Silver Dial / Black Strap', hex: '#000000' }
    ],
    sizes: ['42mm Case Width'],
    tags: ['Watch', 'Accessories', 'Chronograph', 'Luxury'],
    specs: {
      'Movement': 'Miyota 6S21 Quartz Chronograph',
      'Water Resistance': '10 ATM / 100 meters',
      'Glass': 'Scratch-resistant Sapphire Crystal',
      'Strap Width': '22mm Quick Release'
    }
  },
  {
    id: 'p5',
    name: 'Polarized Aviator Matte Sunglasses',
    category: 'accessories',
    price: 5500,
    originalPrice: 8500,
    discountPercentage: 35,
    rating: 4.7,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-lightweight titanium alloy frame aviators with polarized UV400 lenses that reduce glare while enhancing contrast and visual clarity.',
    isHotDeal: true,
    stockCount: 12,
    colors: [
      { name: 'Gunmetal Gray', hex: '#475569' },
      { name: 'Gold / Amber', hex: '#D97706' }
    ],
    sizes: ['Standard Medium'],
    tags: ['Sunglasses', 'Eyewear', 'Accessories']
  },
  {
    id: 'p6',
    name: 'Heritage Minimalist Bifold Leather Wallet',
    category: 'bags',
    price: 4500,
    originalPrice: 6500,
    discountPercentage: 30,
    rating: 4.9,
    reviewsCount: 164,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    description: 'Slim RFID-blocking bifold wallet crafted from full-grain vegetable tanned leather with quick-access card slots and cash pocket.',
    isHotDeal: true,
    stockCount: 15,
    colors: [
      { name: 'Chestnut Tan', hex: '#9A3412' },
      { name: 'Obsidian Black', hex: '#111827' }
    ],
    sizes: ['One Size'],
    tags: ['Wallet', 'Leather', 'Accessories']
  },
  {
    id: 'p7',
    name: 'Classic Vintage Denim Trucker Jacket',
    category: 'footwear',
    price: 8900,
    originalPrice: 12000,
    discountPercentage: 25,
    rating: 4.8,
    reviewsCount: 93,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
    description: 'Heavyweight 14oz organic cotton indigo denim jacket with copper shank buttons, dual chest pockets, and relaxed tailored fit.',
    isHotDeal: true,
    stockCount: 7,
    colors: [
      { name: 'Vintage Indigo Wash', hex: '#2563EB' },
      { name: 'Washed Black', hex: '#1E293B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['Jacket', 'Denim', 'Men']
  },
  {
    id: 'p8',
    name: 'Handcrafted Oxford Leather Dress Shoes',
    category: 'footwear',
    price: 13900,
    originalPrice: 18500,
    discountPercentage: 24,
    rating: 4.9,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800',
    description: 'Timeless cap-toe Oxford shoe in burnished calfskin leather with Goodyear welted leather sole and memory foam arch support.',
    isHotDeal: true,
    stockCount: 5,
    colors: [
      { name: 'Burnished Mahogany', hex: '#713F12' },
      { name: 'Midnight Black', hex: '#0F172A' }
    ],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    tags: ['Oxfords', 'Dress Shoes', 'Leather', 'Footwear']
  }
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'ABDULLAH BUTT STOREFRONT 2026',
    title: 'FASHION FOR MEN',
    subtitle: 'High-end handcrafted leather goods, footwear & luxury accessories in Pakistan.',
    ctaText: 'SHOP COLLECTION NOW',
    discountText: 'JAZZCASH READY',
    primaryImage: heroLeatherBagImg,
    secondaryImage: heroAthleticSneakersImg,
    tagline: 'DIRECT ORDER VIA 03107461744',
    accentColor: '#F39C12'
  },
  {
    id: 'slide-2',
    badge: 'ATHLETIC PERFORMANCE',
    title: 'RED & WHITE PRO SNEAKERS',
    subtitle: 'Commercial grade comfort with nitrogen air-cushioned soles and ultra breathable upper.',
    ctaText: 'DISCOVER SNEAKERS',
    discountText: 'FLASH SALE Rs. 12,500',
    primaryImage: heroAthleticSneakersImg,
    secondaryImage: heroLeatherBagImg,
    tagline: 'LIGHTWEIGHT & DYNAMIC',
    accentColor: '#DC2626'
  },
  {
    id: 'slide-3',
    badge: 'LUXURY FOOTWEAR COLLECTION',
    title: 'BLUE SUEDE HIGH HEELS',
    subtitle: 'Handcrafted in Florence, Italy. Elegant slender silhouette for formal & evening luxury.',
    ctaText: 'EXPLORE HEELS NOW',
    discountText: 'LIMITED EDITION',
    primaryImage: blueSuedeHeelsImg,
    secondaryImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    tagline: 'REDEFINE ELEGANCE',
    accentColor: '#1E3A8A'
  }
];
