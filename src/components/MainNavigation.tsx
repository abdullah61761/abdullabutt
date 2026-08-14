import React, { useState } from 'react';
import { Menu, ChevronDown, Flame, Sparkles, Tag, ArrowRight, X, ChevronRight, Briefcase, Footprints, Shirt, Watch } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ViewTab } from '../types';

interface MainNavigationProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onOpenFlashSale: () => void;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenFlashSale
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [selectedMegaCategory, setSelectedMegaCategory] = useState(CATEGORIES[0]);

  const navLinks: { label: string; tab: ViewTab; icon?: React.ReactNode; isHot?: boolean }[] = [
    { label: 'Home', tab: 'all' },
    { label: '🔥 HOT DEALS', tab: 'all', isHot: true },
    { label: 'Footwear', tab: 'footwear' },
    { label: 'Bags & Leather', tab: 'bags' },
    { label: "Women's Heels", tab: 'heels' },
    { label: 'Accessories', tab: 'accessories' }
  ];

  return (
    <nav className="bg-[#2D3138] text-white border-b border-gray-800 relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Full-width Category Dropdown Toggle Button */}
        <div className="relative">
          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            className="bg-[#F39C12] hover:bg-amber-500 text-slate-900 font-extrabold text-sm px-5 py-3.5 flex items-center gap-3 transition-colors uppercase tracking-wider"
          >
            <Menu className="w-5 h-5" />
            <span>ALL CATEGORIES</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Full-Width Mega Menu Panel */}
          {isMegaMenuOpen && (
            <div
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="absolute left-0 top-full w-80 sm:w-[680px] bg-white text-slate-900 rounded-b-xl shadow-2xl border border-gray-200 z-50 overflow-hidden grid grid-cols-1 sm:grid-cols-12 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* Category Navigation Column */}
              <div className="sm:col-span-5 bg-gray-50 border-r border-gray-200 py-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setSelectedMegaCategory(cat)}
                    onClick={() => {
                      if (cat.id.includes('footwear')) setActiveTab('footwear');
                      else if (cat.id.includes('bags')) setActiveTab('bags');
                      else if (cat.id.includes('heels')) setActiveTab('heels');
                      else if (cat.id.includes('watches')) setActiveTab('accessories');
                      else setActiveTab('all');
                      setIsMegaMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between text-xs font-bold transition-all ${
                      selectedMegaCategory.id === cat.id
                        ? 'bg-white text-[#F39C12] border-l-4 border-[#F39C12] shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#F39C12]" />
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-200/80 px-2 py-0.5 rounded-full font-mono">
                      {cat.itemCount}
                    </span>
                  </button>
                ))}
              </div>

              {/* Subcategory Details & Featured Banner */}
              <div className="sm:col-span-7 p-5 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                    <h4 className="font-extrabold text-sm text-[#2D3138] uppercase tracking-wide">
                      {selectedMegaCategory.name}
                    </h4>
                    <span className="text-[11px] text-[#F39C12] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured Collection
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {selectedMegaCategory.subcategories?.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveTab('all');
                          setIsMegaMenuOpen(false);
                        }}
                        className="text-left text-xs font-medium text-gray-600 hover:text-[#F39C12] py-1 transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo Card inside Mega Menu */}
                <div className="relative rounded-lg overflow-hidden bg-slate-900 text-white p-3.5 flex items-center justify-between gap-3 shadow-inner">
                  {selectedMegaCategory.featuredImage && (
                    <img
                      src={selectedMegaCategory.featuredImage}
                      alt={selectedMegaCategory.name}
                      className="w-16 h-16 object-cover rounded border border-gray-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-[#F39C12] text-slate-900 px-1.5 py-0.5 rounded font-extrabold uppercase">
                      NEW ARRIVAL
                    </span>
                    <p className="text-xs font-bold text-gray-100 mt-1 truncate">
                      Special Discount on {selectedMegaCategory.name}
                    </p>
                    <p className="text-[10px] text-amber-400 font-semibold">Save Up To 35% Today</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Horizontal Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 font-semibold text-xs tracking-wide">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setActiveTab(link.tab)}
              className={`px-4 py-3.5 transition-colors relative flex items-center gap-1.5 ${
                activeTab === link.tab
                  ? 'text-[#F39C12] font-bold'
                  : link.isHot
                  ? 'text-amber-400 hover:text-[#F39C12]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
              {activeTab === link.tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F39C12]"></span>
              )}
            </button>
          ))}
        </div>

        {/* Right Action: Flash Sale Banner Button */}
        <button
          onClick={onOpenFlashSale}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-lg shadow-sm transition-all transform hover:scale-105"
        >
          <Flame className="w-4 h-4 fill-slate-950 animate-bounce" />
          <span>FLASH SALE 50% OFF</span>
        </button>

      </div>
    </nav>
  );
};
