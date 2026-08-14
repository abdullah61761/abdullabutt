import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, ViewTab } from '../types';

interface HotDealsProps {
  products: Product[];
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
}

export const HotDeals: React.FC<HotDealsProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  activeTab,
  setActiveTab
}) => {
  // Countdown Timer state: 8 hours, 24 mins, 12 secs
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 24, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products by selected tab
  const filteredProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'footwear') return p.category.toLowerCase().includes('footwear');
    if (activeTab === 'bags') return p.category.toLowerCase().includes('bags');
    if (activeTab === 'heels') return p.category.toLowerCase().includes('heels');
    if (activeTab === 'accessories') return p.category.toLowerCase().includes('accessories');
    return true;
  });

  const categoryTabs: { label: string; value: ViewTab }[] = [
    { label: 'All Hot Deals', value: 'all' },
    { label: 'Footwear & Sneakers', value: 'footwear' },
    { label: 'Bags & Leather', value: 'bags' },
    { label: "Women's Heels", value: 'heels' },
    { label: 'Accessories', value: 'accessories' }
  ];

  return (
    <section id="hot-deals" className="py-12 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header with Title & Live Countdown Timer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#2D3138] text-[#F39C12] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-[#F39C12] animate-bounce" />
              <span>SPECIAL PROMOTION</span>
            </div>
            {/* Main Header prompt requirement: "HOT DEALS" */}
            <h2 className="text-3xl sm:text-4xl font-black text-[#2D3138] tracking-tight uppercase flex items-center gap-3">
              <span>HOT DEALS</span>
              <span className="text-sm font-bold bg-[#F39C12] text-slate-950 px-2.5 py-0.5 rounded-md self-center">
                LIMITED STOCK
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg font-medium">
              Handpicked footwear, executive bags, and luxury accessories at unprecedented prices.
            </p>
          </div>

          {/* Deal Countdown Timer Widget */}
          <div className="bg-[#2D3138] text-white p-3.5 rounded-2xl shadow-lg border border-gray-700 flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
              <Clock className="w-4 h-4 text-[#F39C12]" />
              <span className="uppercase tracking-wider hidden sm:inline">OFFER EXPIRES IN:</span>
            </div>

            <div className="flex items-center gap-2 text-center font-mono">
              <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-gray-700">
                <span className="text-base font-extrabold text-[#F39C12]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-gray-400 font-sans uppercase">HRS</span>
              </div>
              <span className="text-[#F39C12] font-bold">:</span>
              <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-gray-700">
                <span className="text-base font-extrabold text-[#F39C12]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-gray-400 font-sans uppercase">MIN</span>
              </div>
              <span className="text-[#F39C12] font-bold">:</span>
              <div className="bg-slate-800 px-2.5 py-1 rounded-lg border border-gray-700">
                <span className="text-base font-extrabold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-gray-400 font-sans uppercase">SEC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tab Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 uppercase tracking-wider ${
                activeTab === tab.value
                  ? 'bg-[#2D3138] text-[#F39C12] shadow-md border border-[#2D3138]'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.value && <Sparkles className="w-3.5 h-3.5 text-[#F39C12]" />}
            </button>
          ))}
        </div>

        {/* 4-Column Product Grid Prompt Requirement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3">
            <p className="text-base font-bold text-gray-700">No deals found for this category.</p>
            <button
              onClick={() => setActiveTab('all')}
              className="px-4 py-2 bg-[#F39C12] text-slate-900 font-bold text-xs rounded-lg"
            >
              Show All Hot Deals
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
