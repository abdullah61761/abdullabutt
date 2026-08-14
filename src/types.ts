export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: string[];
  description: string;
  isHotDeal?: boolean;
  isNewArrival?: boolean;
  discountPercentage?: number;
  stockCount?: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  tags?: string[];
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  itemCount: number;
  subcategories?: string[];
  featuredImage?: string;
}

export type ViewTab = 'all' | 'footwear' | 'bags' | 'accessories' | 'heels';
