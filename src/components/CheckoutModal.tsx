import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, ArrowRight, Truck, ShoppingBag, Sparkles, Smartphone, Building } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
  discountRate: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
  discountRate
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'card' | 'cod'>('jazzcash');
  const [formData, setFormData] = useState({
    fullName: 'Customer',
    email: 'abdullahbutthhk@gmail.com',
    address: 'Ayub Colony, Jhang Road',
    city: 'Faisalabad',
    phone: '03107461744',
    jazzcashNumber: '03107461744',
    transactionId: 'TXN-98421'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const shippingCost = subtotal >= 10000 || subtotal === 0 ? 0 : 350;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const [orderId, setOrderId] = useState('');

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = 'VRV-PK-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-3xl w-full overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="p-4 px-6 bg-[#2D3138] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#F39C12]" />
            <h3 className="font-black text-base uppercase tracking-wider">
              {step === 'details' ? 'SECURE CHECKOUT - ABDULLAH BUTT STOREFRONT' : 'ORDER CONFIRMED'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-700 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Shipping & Payment Form */}
            <div className="md:col-span-7 space-y-4">
              <h4 className="font-extrabold text-xs text-[#2D3138] uppercase tracking-wider border-b border-gray-200 pb-2">
                1. Shipping & Contact Information
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Street / Area</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F39C12] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <h4 className="font-extrabold text-xs text-[#2D3138] uppercase tracking-wider border-b border-gray-200 pb-2 pt-2">
                2. Select Payment Method
              </h4>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'jazzcash'
                        ? 'border-[#F39C12] bg-amber-50 text-slate-900 ring-2 ring-[#F39C12]/20'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-[#F39C12]" />
                    <span>JazzCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-[#F39C12] bg-amber-50 text-slate-900 ring-2 ring-[#F39C12]/20'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#F39C12]" />
                    <span>Card Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-1 ${
                      paymentMethod === 'cod'
                        ? 'border-[#F39C12] bg-amber-50 text-slate-900 ring-2 ring-[#F39C12]/20'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#F39C12]" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'jazzcash' && (
                  <div className="p-3 bg-[#2D3138] text-white rounded-xl space-y-2 border border-gray-700">
                    <p className="text-[11px] text-amber-300 font-bold">
                      JazzCash Account Number: <span className="font-mono text-white text-sm bg-slate-800 px-2 py-0.5 rounded border border-gray-600">03107461744</span>
                    </p>
                    <p className="text-[10px] text-gray-300">
                      Account Title: <span className="font-bold text-white">Abdullah Butt</span>
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Please send Rs. {total.toFixed(0)} to JazzCash 03107461744 and enter your transaction Reference ID below:
                    </p>
                    <input
                      type="text"
                      placeholder="Enter 12-digit JazzCash Transaction ID"
                      required
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-600 bg-slate-900 rounded-lg text-white font-mono text-xs focus:border-[#F39C12]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#F39C12] hover:bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider mt-4"
              >
                <Lock className="w-4 h-4" /> CONFIRM ORDER (Rs. {total.toFixed(0)})
              </button>
            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-[#2D3138] uppercase tracking-wider border-b border-gray-200 pb-2">
                  Store Order Summary ({cartItems.length})
                </h4>

                <div className="divide-y divide-gray-200 max-h-56 overflow-y-auto py-2 space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="pt-2 flex items-center gap-3 text-xs">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 object-contain rounded bg-white border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{item.product.name}</p>
                        <p className="text-[10px] text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">Rs. {(item.product.price * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-gray-200 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-Rs. {discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping (Pakistan)</span>
                  <span>{shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 border-t border-gray-200 pt-2">
                  <span>Total PKR</span>
                  <span className="text-[#F39C12]">Rs. {total.toFixed(0)}</span>
                </div>
              </div>
            </div>

          </form>
        ) : (
          /* Confirmation Success View */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black bg-[#F39C12] text-slate-950 px-3 py-1 rounded-full uppercase">
                ORDER PLACED WITH VERVE STOREFRONT
              </span>
              <h2 className="text-3xl font-black text-[#2D3138]">Thank You, {formData.fullName}!</h2>
              <p className="text-xs text-gray-500">
                Your order ID is <span className="font-mono font-bold text-[#2D3138]">{orderId}</span>. A confirmation receipt has been dispatched to <span className="font-semibold text-gray-800">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 max-w-md mx-auto text-xs text-left space-y-2 font-medium">
              <div className="flex justify-between border-b border-gray-200/60 pb-1">
                <span className="text-gray-500">Store CEO:</span>
                <span className="font-bold text-gray-900">Abdullah Butt</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/60 pb-1">
                <span className="text-gray-500">Contact Number:</span>
                <span className="font-mono font-bold text-gray-900">03107461744</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/60 pb-1">
                <span className="text-gray-500">JazzCash Account:</span>
                <span className="font-mono font-bold text-[#F39C12]">03107461744</span>
              </div>
              <div className="flex justify-between border-b border-gray-200/60 pb-1">
                <span className="text-gray-500">Store Location:</span>
                <span className="font-bold text-gray-800">Ayub Colony, Jhang Road, Faisalabad</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700">2-3 Business Days Across Pakistan</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 bg-[#2D3138] hover:bg-[#F39C12] hover:text-slate-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors uppercase tracking-wider"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
