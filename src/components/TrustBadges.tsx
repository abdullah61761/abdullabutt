import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Headphones, CreditCard } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Truck className="w-6 h-6 text-[#F39C12]" />,
      title: 'FREE EXPRESS SHIPPING',
      description: 'On all domestic orders over $99.00'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#F39C12]" />,
      title: '30-DAY EASY RETURNS',
      description: 'No questions asked hassle-free refund'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#F39C12]" />,
      title: '100% SECURE PAYMENTS',
      description: '256-Bit SSL Encrypted checkout'
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#F39C12]" />,
      title: '24/7 DEDICATED SUPPORT',
      description: 'Expert fashion specialists online'
    }
  ];

  return (
    <section className="bg-white border-y border-gray-200 py-6 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#F39C12]/40 transition-all hover:bg-amber-50/30"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2D3138] flex items-center justify-center shrink-0 shadow-sm">
                {b.icon}
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-[#2D3138] uppercase tracking-wider">{b.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
