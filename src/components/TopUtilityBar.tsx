import React from 'react';
import { Phone, HelpCircle, MapPin, Truck, ChevronDown, ShieldCheck, Mail } from 'lucide-react';

interface TopUtilityBarProps {
  currency: string;
  setCurrency: (c: string) => void;
  language: string;
  setLanguage: (l: string) => void;
  onOpenHelp: () => void;
}

export const TopUtilityBar: React.FC<TopUtilityBarProps> = ({
  currency,
  setCurrency,
  language,
  setLanguage,
  onOpenHelp
}) => {
  return (
    <div className="bg-[#2D3138] text-gray-300 text-xs border-b border-gray-700/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Side: Announcement & Ticker */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 bg-[#F39C12] text-slate-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
            <Truck className="w-3 h-3" /> FREE SHIPPING
          </span>
          <p className="truncate text-gray-200 font-medium">
            Free Express Delivery Across Pakistan | Code: <span className="text-[#F39C12] font-semibold">FREESHIP</span>
          </p>
        </div>

        {/* Right Side: Phone Badge & Settings */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Phone Badge */}
          <a href="tel:03107461744" className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded border border-gray-700 text-gray-200 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-[#F39C12]" />
            <span className="font-semibold text-gray-100">03107461744</span>
            <span className="hidden lg:inline text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-medium">JAZZCASH READY</span>
          </a>

          <div className="hidden sm:flex items-center gap-4 text-gray-300">
            <a href="mailto:abdullahbutthhk@gmail.com" className="flex items-center gap-1 hover:text-[#F39C12] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#F39C12]" />
              <span>abdullahbutthhk@gmail.com</span>
            </a>
            <button onClick={onOpenHelp} className="flex items-center gap-1 hover:text-[#F39C12] transition-colors">
              <MapPin className="w-3.5 h-3.5 text-[#F39C12]" />
              <span>Ayub Colony, Faisalabad</span>
            </button>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-3 pl-2 border-l border-gray-700">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-white transition-colors">
                <span className="font-medium text-[#F39C12]">{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute right-0 mt-1 w-24 bg-slate-900 border border-gray-700 rounded shadow-lg hidden group-hover:block z-50">
                {['PKR (Rs.)', 'USD ($)', 'EUR (€)'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr.split(' ')[0])}
                    className="block w-full text-left px-3 py-1.5 text-xs text-gray-200 hover:bg-[#F39C12] hover:text-slate-900 transition-colors"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
