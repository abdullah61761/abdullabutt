import React, { useState, useEffect } from 'react';
import { TopUtilityBar } from './components/TopUtilityBar';
import { MainHeader } from './components/MainHeader';
import { MainNavigation } from './components/MainNavigation';
import { HeroSlider } from './components/HeroSlider';
import { TrustBadges } from './components/TrustBadges';
import { HotDeals } from './components/HotDeals';
import { CategoryGrid } from './components/CategoryGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';

import { PRODUCTS } from './data/products';
import { Product, CartItem, ViewTab } from './types';
import { User, X, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial default cart item for instant demo
    return [
      { product: PRODUCTS[0], quantity: 1, selectedColor: 'Royal Suede Blue', selectedSize: 'EU 38' },
      { product: PRODUCTS[1], quantity: 1, selectedColor: 'Cognac Brown', selectedSize: '45L Carry-On' }
    ];
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(['p3', 'p4']);
  const [activeTab, setActiveTab] = useState<ViewTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [currency, setCurrency] = useState('PKR (Rs.)');
  const [language, setLanguage] = useState('EN');

  // Modals & Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Promo Code State
  const [appliedPromoCode, setAppliedPromoCode] = useState('FREESHIP');
  const [discountRate, setDiscountRate] = useState(0.10);

  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; type: 'cart' | 'wishlist' | 'info'; message: string }[]>([]);

  const addToast = (type: 'cart' | 'wishlist' | 'info', message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const handleAddToCart = (product: Product, selectedColor?: string, selectedSize?: string, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: selectedColor || (product.colors?.[0]?.name),
            selectedSize: selectedSize || (product.sizes?.[0])
          }
        ];
      }
    });
    addToast('cart', `Added ${product.name} to your shopping cart!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        addToast('info', `Removed ${product?.name || 'item'} from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        addToast('wishlist', `Saved ${product?.name || 'item'} to Wishlist!`);
        return [...prev, productId];
      }
    });
  };

  const handleBuyNow = (product: Product, selectedColor?: string, selectedSize?: string, quantity = 1) => {
    handleAddToCart(product, selectedColor, selectedSize, quantity);
    setIsCheckoutOpen(true);
  };

  const handleMoveAllWishlistToCart = () => {
    const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
    wishlistProducts.forEach((p) => handleAddToCart(p));
    setWishlistIds([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    addToast('cart', 'Moved all wishlist items into your Cart!');
  };

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased flex flex-col justify-between selection:bg-[#F39C12] selection:text-slate-900">
      <div>
        {/* Top Utility Header Bar */}
        <TopUtilityBar
          currency={currency}
          setCurrency={setCurrency}
          language={language}
          setLanguage={setLanguage}
          onOpenHelp={() => setIsAccountOpen(true)}
        />

        {/* Main Header with Search & Live Cart Badge */}
        <MainHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          cartItems={cartItems}
          wishlistIds={wishlistIds}
          products={products}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onQuickView={(p) => setQuickViewProduct(p)}
          onOpenAccount={() => setIsAccountOpen(true)}
        />

        {/* Main Navigation Bar with Full Category Dropdown */}
        <MainNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenFlashSale={() => {
            setActiveTab('all');
            const dealsElem = document.getElementById('hot-deals');
            if (dealsElem) dealsElem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Hero Slider Section ("FASHION FOR MEN" & Product Photography) */}
        <HeroSlider
          onShopNow={() => {
            const dealsElem = document.getElementById('hot-deals');
            if (dealsElem) dealsElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickView={(p) => setQuickViewProduct(p)}
          allProducts={products}
        />

        {/* 4-Column Feature Trust Strip */}
        <TrustBadges />

        {/* "HOT DEALS" 4-Column Product Grid Showcase */}
        <HotDeals
          products={products}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickView={(p) => setQuickViewProduct(p)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Curated Department Category Grid */}
        <CategoryGrid
          onSelectTab={(tab) => {
            setActiveTab(tab);
            const dealsElem = document.getElementById('hot-deals');
            if (dealsElem) dealsElem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Newsletter Offer Box */}
        <Newsletter />
      </div>

      {/* Footer in #2D3138 */}
      <Footer
        onSelectCategory={(cat) => {
          if (cat === 'footwear') setActiveTab('footwear');
          else if (cat === 'bags') setActiveTab('bags');
          else if (cat === 'heels') setActiveTab('heels');
          else if (cat === 'accessories') setActiveTab('accessories');
          else setActiveTab('all');
          const dealsElem = document.getElementById('hot-deals');
          if (dealsElem) dealsElem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onBuyNow={handleBuyNow}
      />

      {/* Interactive Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromoCode={appliedPromoCode}
        setAppliedPromoCode={setAppliedPromoCode}
        discountRate={discountRate}
        setDiscountRate={setDiscountRate}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
        discountRate={discountRate}
      />

      {/* Wishlist Saved Items Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onMoveAllToCart={handleMoveAllWishlistToCart}
      />

      {/* User Account / Store Details Modal */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#2D3138] text-[#F39C12] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-[#2D3138]">Store Information & Sign In</h3>
              </div>
              <button onClick={() => setIsAccountOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Store Information Summary */}
            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-gray-900">
                <span className="text-gray-600">CEO & Owner:</span>
                <span>Abdullah Butt</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span className="text-gray-600">Phone / Support:</span>
                <span className="font-mono text-[#2D3138]">03107461744</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span className="text-gray-600">JazzCash Account:</span>
                <span className="font-mono text-[#F39C12]">03107461744</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span className="text-gray-600">Email:</span>
                <span>abdullahbutthhk@gmail.com</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900">
                <span className="text-gray-600">Shop Address:</span>
                <span>Ayub Colony, Jhang Road, Faisalabad</span>
              </div>
            </div>

            <div className="space-y-3 text-xs pt-1">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="email" defaultValue="abdullahbutthhk@gmail.com" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="password" defaultValue="••••••••••••" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none" />
                </div>
              </div>

              <button
                onClick={() => {
                  setIsAccountOpen(false);
                  addToast('info', 'Signed into Abdullah Butt Storefront!');
                }}
                className="w-full py-3 bg-[#F39C12] text-slate-950 font-black rounded-xl shadow-md uppercase tracking-wider"
              >
                SIGN IN / ACCESS STOREFRONT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Toast Notifications */}
      <NotificationToast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
