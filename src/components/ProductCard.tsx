import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check, Sparkles, Flame } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, product.sizes?.[0]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Image Stage */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden p-4 flex items-center justify-center">
        {/* Discount Badge */}
        {product.discountPercentage && (
          <span className="absolute top-3 left-3 bg-[#F39C12] text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-md shadow-md z-10 uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 fill-slate-950" />
            -{product.discountPercentage}% OFF
          </span>
        )}

        {/* Wishlist & Quick View Overlay Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className={`p-2 rounded-full shadow-md transition-all transform hover:scale-110 ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-gray-700 hover:text-rose-500 hover:bg-white'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 bg-white/90 text-gray-700 hover:text-[#F39C12] hover:bg-white rounded-full shadow-md transition-all transform hover:scale-110"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product High-Res Photo */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain filter group-hover:scale-108 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Quick Add Overlay Bar on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 hidden sm:block">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 rounded-lg font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#2D3138] hover:bg-[#F39C12] hover:text-slate-900 text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" /> ADDED TO CART
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#F39C12] group-hover:text-slate-900" /> QUICK ADD TO CART
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Star Ratings */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#F39C12] fill-[#F39C12]" />
              <span className="font-extrabold text-gray-800 text-[11px]">{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#F39C12] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Color Swatches if available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 my-2" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-4 h-4 rounded-full border transition-transform ${
                    selectedColor === c.name
                      ? 'ring-2 ring-[#F39C12] scale-110 border-white'
                      : 'border-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-extrabold text-[#F39C12]">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-medium">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Progress Bar */}
          {product.stockCount && product.stockCount < 10 && (
            <div className="mt-2.5 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-[10px] font-bold text-rose-600 mb-1">
                <span>🔥 Only {product.stockCount} left in stock</span>
                <span>Fast Shipping</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${(product.stockCount / 15) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Mobile Direct Add Button */}
          <button
            onClick={handleAdd}
            className="w-full mt-3 py-2 bg-[#2D3138] active:bg-[#F39C12] text-white active:text-slate-900 rounded-lg text-xs font-bold sm:hidden flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#F39C12]" /> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
