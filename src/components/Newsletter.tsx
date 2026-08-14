import React, { useState } from 'react';
import { Mail, Sparkles, Check, Gift } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="bg-[#2D3138] text-white py-14 relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F39C12_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-gray-700 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#F39C12] text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" />
              <span>10% INSTANT WELCOME DISCOUNT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              JOIN THE FASHION INSIDERS
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Subscribe to get secret promo codes, private flash sale alerts, and VIP early access to new footwear & leather drops.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px] sm:min-w-[420px]">
            {isSubscribed ? (
              <div className="bg-emerald-900/60 border border-emerald-500/80 p-4 rounded-2xl text-center space-y-1">
                <p className="text-sm font-extrabold text-emerald-300 flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" /> YOU'RE IN THE CLUB!
                </p>
                <p className="text-xs text-emerald-200">
                  Use coupon code <span className="font-mono font-bold bg-slate-900 px-2 py-0.5 rounded text-[#F39C12]">VERVE10</span> at checkout for 10% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 text-xs bg-slate-900 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#F39C12]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#F39C12] hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-colors uppercase tracking-wider shrink-0"
                >
                  CLAIM 10% OFF
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
