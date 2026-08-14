import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, CreditCard, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D3138] text-gray-300 border-t border-gray-800 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Store Brand & Contact Box */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#F39C12] text-slate-950 font-black text-xl rounded-lg flex items-center justify-center">
                V
              </div>
              <span className="font-black text-2xl text-white tracking-tight">VERVE</span>
              <span className="text-[10px] bg-amber-500/20 text-[#F39C12] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                STOREFRONT
              </span>
            </div>

            <p className="text-gray-400 max-w-sm leading-relaxed text-xs">
              A premier retail storefront managed by <strong className="text-white">CEO Abdullah Butt</strong>. Offering handcrafted footwear, executive leather travel bags, and luxury accessories with nationwide delivery across Pakistan.
            </p>

            <div className="space-y-2.5 text-xs font-medium text-gray-300 pt-1">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#F39C12]" />
                <span>CEO: <strong className="text-white font-bold">Abdullah Butt</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F39C12]" />
                <a href="tel:03107461744" className="font-bold text-white hover:text-[#F39C12] transition-colors">03107461744</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F39C12]" />
                <span>JazzCash Account: <strong className="text-[#F39C12] font-mono">03107461744</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F39C12]" />
                <a href="mailto:abdullahbutthhk@gmail.com" className="hover:text-[#F39C12] transition-colors">abdullahbutthhk@gmail.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F39C12]" />
                <span>Ayub Colony, Jhang Road, Faisalabad, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Shopping */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">STORE DEPARTMENTS</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => onSelectCategory('footwear')} className="hover:text-[#F39C12] transition-colors">
                  Athletic & Casual Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bags')} className="hover:text-[#F39C12] transition-colors">
                  Leather Duffel & Travel Bags
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('heels')} className="hover:text-[#F39C12] transition-colors">
                  Women's Suede High Heels
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('accessories')} className="hover:text-[#F39C12] transition-colors">
                  Chronograph Watches
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-[#F39C12] transition-colors font-bold text-amber-400">
                  🔥 Hot Deals & Promotions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">CUSTOMER CARE</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#F39C12] transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-[#F39C12] transition-colors">Returns & Exchange Policy</a></li>
              <li><a href="#" className="hover:text-[#F39C12] transition-colors">Free Shipping Policy</a></li>
              <li><a href="#" className="hover:text-[#F39C12] transition-colors">International Size Guide</a></li>
              <li><a href="#" className="hover:text-[#F39C12] transition-colors">Help Center & FAQs</a></li>
            </ul>
          </div>

          {/* Col 4: Payment Badges */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">SECURE CHECKOUT</h4>
            <p className="text-gray-400 text-[11px]">
              All transactions are encrypted with 256-bit bank level SSL security.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE', 'GOOGLE'].map((pay) => (
                <div key={pay} className="bg-slate-800 border border-gray-700 py-1.5 rounded text-center text-[10px] font-black font-mono text-gray-300">
                  {pay}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] pt-1">
              <ShieldCheck className="w-4 h-4" /> Verified Retail Partner
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <p>© 2026 VERVE Retail Storefront. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Cookie Preferences</a>
          </div>
          <button
            onClick={scrollToTop}
            className="p-2 bg-slate-800 hover:bg-[#F39C12] hover:text-slate-900 text-gray-300 rounded-lg transition-colors flex items-center gap-1"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="font-bold">TOP</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
