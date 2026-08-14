import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromoCode: string;
  setAppliedPromoCode: (code: string) => void;
  discountRate: number;
  setDiscountRate: (rate: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromoCode,
  setAppliedPromoCode,
  discountRate,
  setDiscountRate
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 99.00;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const discountAmount = subtotal * discountRate;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.99;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();

    if (code === 'FREESHIP' || code === 'VERVE10') {
      setAppliedPromoCode(code);
      setDiscountRate(0.10);
      setPromoSuccess('10% Discount applied successfully!');
    } else if (code === 'VIP20') {
      setAppliedPromoCode(code);
      setDiscountRate(0.20);
      setPromoSuccess('20% VIP Discount applied!');
    } else {
      setPromoError('Invalid promo code. Try "FREESHIP" or "VERVE10".');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 bg-[#2D3138] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F39C12]" />
            <h3 className="font-extrabold text-base uppercase tracking-wider">
              YOUR CART ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-700 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator Bar */}
        <div className="bg-amber-50 p-3 px-5 border-b border-amber-200/80 shrink-0">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#F39C12]" />
              {amountForFreeShipping > 0
                ? `Add $${amountForFreeShipping.toFixed(2)} more for FREE SHIPPING!`
                : '🎉 UNLOCKED FREE EXPRESS SHIPPING!'}
            </span>
            <span className="text-[#F39C12] font-mono">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F39C12] rounded-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-gray-100">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.product.id} className="py-4 flex gap-3 group">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded-xl bg-gray-50 border border-gray-200 p-1 shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#F39C12] transition-colors truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-black text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-black text-sm text-[#F39C12]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-[#F39C12]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-800">Your shopping cart is empty</h4>
                <p className="text-xs text-gray-500 mt-1">Discover top footwear, leather bags & deals!</p>
              </div>
            </div>
          )}
        </div>

        {/* Promo Code & Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-200 bg-gray-50 space-y-3 shrink-0">
            {/* Promo Code Entry */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. FREESHIP)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#F39C12]"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 bg-[#2D3138] hover:bg-[#F39C12] hover:text-slate-900 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoSuccess && <p className="text-[10px] text-emerald-600 font-bold">{promoSuccess}</p>}
              {promoError && <p className="text-[10px] text-rose-500 font-bold">{promoError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-200/80 pt-2 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedPromoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#2D3138] pt-1 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-[#F39C12] text-xl">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                onProceedToCheckout();
                onClose();
              }}
              className="w-full py-4 bg-[#F39C12] hover:bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted 256-Bit Bank Level Security</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
