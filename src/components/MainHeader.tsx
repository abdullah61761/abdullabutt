import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, ChevronDown, X, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { Product, CartItem } from '../types';

interface MainHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  cartItems: CartItem[];
  wishlistIds: string[];
  products: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onQuickView: (product: Product) => void;
  onOpenAccount: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  cartItems,
  wishlistIds,
  products,
  onOpenCart,
  onOpenWishlist,
  onQuickView,
  onOpenAccount
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Filter products for search autocomplete preview
  const searchResults = searchQuery.trim()
    ? products.filter(p => {
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (selectedCategoryFilter === 'All') return matchesQuery;
        return matchesQuery && p.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
      })
    : [];

  // Close search overlay on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 bg-[#2D3138] rounded-xl flex items-center justify-center text-white shadow-md group-hover:bg-[#F39C12] transition-colors duration-300">
            <span className="font-extrabold text-xl tracking-tighter text-[#F39C12] group-hover:text-slate-900 transition-colors">V</span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-2xl tracking-tight text-[#2D3138] font-sans">VERVE</span>
              <span className="w-2 h-2 rounded-full bg-[#F39C12] animate-pulse"></span>
            </div>
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest -mt-1">RETAIL STOREFRONT</span>
          </div>
        </a>

        {/* Central Search Bar with Category Dropdown */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl hidden md:block">
          <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-[#F39C12] focus-within:ring-2 focus-within:ring-[#F39C12]/20 transition-all bg-gray-50">
            {/* Category Filter Dropdown */}
            <div className="relative border-r border-gray-300 bg-white px-3 py-2.5 flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition-colors shrink-0">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none appearance-none pr-4"
              >
                <option value="All">All Categories</option>
                <option value="footwear">Footwear & Shoes</option>
                <option value="bags">Bags & Leather</option>
                <option value="heels">Women's Heels</option>
                <option value="accessories">Accessories</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 pointer-events-none absolute right-2" />
            </div>

            {/* Input Field */}
            <div className="relative flex-1 flex items-center bg-white">
              <input
                type="text"
                placeholder="Search over 10,000+ fashion deals, shoes, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search CTA Button */}
            <button className="bg-[#F39C12] hover:bg-amber-500 text-slate-900 px-5 py-2.5 font-bold text-sm flex items-center gap-2 transition-colors shrink-0">
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Search</span>
            </button>
          </div>

          {/* Live Search Autocomplete Dropdown Overlay */}
          {isSearchFocused && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden max-h-96">
              <div className="p-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Matching Search Results ({searchResults.length})</span>
                <span className="text-[#F39C12] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Inventory
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="divide-y divide-gray-100 overflow-y-auto max-h-80">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-amber-50/50 flex items-center gap-3 transition-colors group cursor-pointer"
                      onClick={() => {
                        onQuickView(product);
                        setIsSearchFocused(false);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md border border-gray-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 group-hover:text-[#F39C12] truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-gray-500 capitalize">{product.category}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-bold text-[#F39C12]">Rs. {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              Rs. {product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="p-1.5 bg-gray-100 hover:bg-[#F39C12] hover:text-slate-900 text-gray-600 rounded-md transition-colors shrink-0">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-gray-500">
                  No products found for "{searchQuery}". Try searching for <span className="font-semibold text-gray-700">"heels"</span>, <span className="font-semibold text-gray-700">"leather"</span>, or <span className="font-semibold text-gray-700">"sneakers"</span>.
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Action Badges */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* User Account / Login */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
            title="My Account"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#2D3138]">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left text-xs">
              <span className="block text-gray-400 text-[10px] uppercase font-bold">Sign In</span>
              <span className="font-bold text-gray-800">My Account</span>
            </div>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors flex items-center"
            title="View Wishlist"
          >
            <Heart className="w-6 h-6 text-gray-700" />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {wishlistIds.length}
              </span>
            )}
            <span className="hidden xl:inline text-xs font-semibold ml-1.5 text-gray-700">Saved</span>
          </button>

          {/* Live Cart Button & Badge */}
          <button
            onClick={onOpenCart}
            className="bg-[#2D3138] hover:bg-slate-800 text-white p-2 sm:px-4 sm:py-2.5 rounded-lg flex items-center gap-3 transition-all transform active:scale-95 shadow-md border border-slate-700 group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#F39C12] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-[#F39C12] text-slate-900 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#2D3138]">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">MY CART</span>
              <span className="font-extrabold text-sm text-[#F39C12]">${cartTotal.toFixed(2)}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 md:hidden">
        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
          <input
            type="text"
            placeholder="Search fashion deals, sneakers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs focus:outline-none"
          />
          <button className="bg-[#F39C12] p-2 text-slate-900">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
