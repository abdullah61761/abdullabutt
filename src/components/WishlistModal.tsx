import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onMoveAllToCart: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onMoveAllToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full overflow-hidden my-8 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-6 bg-[#2D3138] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#F39C12] fill-[#F39C12]" />
            <h3 className="font-extrabold text-base uppercase tracking-wider">
              MY WISHLIST ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-700 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 divide-y divide-gray-100">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div key={product.id} className="py-4 flex items-center gap-4 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-contain rounded-lg bg-gray-50 border border-gray-200 p-1 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#F39C12] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 capitalize">{product.category}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-extrabold text-[#F39C12]">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2.5 bg-[#2D3138] hover:bg-[#F39C12] hover:text-slate-950 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#F39C12]" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(product.id)}
                    className="p-2.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-extrabold text-base text-gray-800">Your wishlist is empty</h4>
              <p className="text-xs text-gray-500">Save items by clicking the heart icon on any product.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4">
            <button
              onClick={onMoveAllToCart}
              className="w-full py-3 bg-[#F39C12] hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-colors uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> MOVE ALL ITEMS TO CART
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
