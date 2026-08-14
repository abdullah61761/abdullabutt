import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check, Sparkles, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onBuyNow: (product: Product, selectedColor?: string, selectedSize?: string, quantity?: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onBuyNow
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100 bg-gray-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-[#2D3138] text-[#F39C12] px-2.5 py-0.5 rounded uppercase tracking-wider">
              QUICK VIEW
            </span>
            <span className="text-xs text-gray-500 font-medium capitalize">
              {product.category} ID: {product.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            {/* Main Active Image Display */}
            <div className="relative aspect-[4/3] bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-center overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-md"
                referrerPolicy="no-referrer"
              />
              {product.discountPercentage && (
                <span className="absolute top-3 left-3 bg-[#F39C12] text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md uppercase">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-lg border-2 p-1 bg-gray-50 overflow-hidden shrink-0 transition-all ${
                      activeImage === img ? 'border-[#F39C12] ring-2 ring-[#F39C12]/20' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Specs Summary */}
            {product.specs && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                <h5 className="font-extrabold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F39C12]" /> Product Specifications
                </h5>
                <div className="divide-y divide-gray-200/60">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="py-1.5 flex items-center justify-between">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="font-bold text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Details, Purchasing & CTA */}
          <div className="md:col-span-6 space-y-5">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-[#F39C12]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F39C12]" />
                  ))}
                </div>
                <span className="font-bold text-gray-900 text-sm">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviewsCount} customer reviews)</span>
              </div>

              <h2 className="text-2xl font-black text-[#2D3138] leading-snug">{product.name}</h2>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
              <span className="text-3xl font-black text-[#F39C12]">Rs. {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through font-medium">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="ml-auto text-xs font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                IN STOCK & READY TO SHIP
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Select Color: <span className="text-[#F39C12] font-semibold">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-[#F39C12] bg-[#2D3138] text-white shadow-sm ring-2 ring-[#F39C12]/20'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-gray-400" style={{ backgroundColor: c.hex }}></span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-gray-800 uppercase tracking-wider">
                    Select Size: <span className="text-[#F39C12] font-semibold">{selectedSize}</span>
                  </label>
                  <button className="text-[11px] text-[#F39C12] font-bold hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-lg border text-xs font-extrabold transition-all ${
                        selectedSize === size
                          ? 'bg-[#F39C12] text-slate-950 border-[#F39C12] shadow-sm'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Wishlist */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-black text-gray-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
                  isAddedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2D3138] hover:bg-[#F39C12] hover:text-slate-950 text-white'
                }`}
              >
                {isAddedSuccess ? (
                  <>
                    <Check className="w-5 h-5" /> ADDED TO CART ({quantity})
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-[#F39C12]" /> ADD TO CART
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onBuyNow(product, selectedColor, selectedSize, quantity);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#F39C12] hover:bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-md transition-colors uppercase tracking-wider"
              >
                BUY NOW (EXPRESS CHECKOUT)
              </button>
            </div>

            {/* Assurance List */}
            <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-[11px] text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#F39C12]" />
                <span>Express 2-3 Day Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F39C12]" />
                <span>100% Authentic Quality</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-[#F39C12]" />
                <span>Free 30-Day Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F39C12]" />
                <span>Original Manufacturer Box</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
