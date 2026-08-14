import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Star, Tag } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { Product } from '../types';

interface HeroSliderProps {
  onShopNow: () => void;
  onQuickView: (product: Product) => void;
  allProducts: Product[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopNow, onQuickView, allProducts }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slide = HERO_SLIDES[currentSlideIndex];

  // Auto-advance slides every 5s
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Find matching product in catalog
  const matchingProduct = allProducts.find(
    p => p.name.toLowerCase().includes('bag') || p.name.toLowerCase().includes('sneakers') || p.name.toLowerCase().includes('heels')
  );

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-[#2D3138] to-slate-900 text-white overflow-hidden py-10 lg:py-16">
      {/* Subtle Geometric Grid Pattern Background */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F39C12_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      {/* Decorative Glow Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F39C12]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Typography & CTA Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2D3138] border border-[#F39C12]/40 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#F39C12] shadow-lg animate-in fade-in duration-300">
              <Sparkles className="w-3.5 h-3.5 text-[#F39C12]" />
              <span className="uppercase tracking-widest">{slide.badge}</span>
              <span className="bg-[#F39C12] text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-black ml-1">
                {slide.discountText}
              </span>
            </div>

            {/* Main Headline Prompt Requirement: "FASHION FOR MEN" */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-amber-400 font-extrabold text-sm tracking-widest uppercase flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#F39C12]" />
                {slide.tagline}
              </p>
            </div>

            {/* Subtitle Description */}
            <p className="text-gray-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              {slide.subtitle} Handcrafted with top-grain Italian leathers and ultra-comfort soles designed for executive lifestyle and daily durability.
            </p>

            {/* CTA Buttons & Trust Points */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="bg-[#F39C12] hover:bg-amber-500 text-slate-950 font-black text-sm px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#F39C12]/20 transition-all transform hover:-translate-y-0.5 flex items-center gap-3 uppercase tracking-wider group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {matchingProduct && (
                <button
                  onClick={() => onQuickView(matchingProduct)}
                  className="bg-slate-800/80 hover:bg-slate-800 text-white font-bold text-sm px-6 py-4 rounded-xl border border-gray-700 hover:border-[#F39C12] transition-colors flex items-center gap-2"
                >
                  <Star className="w-4 h-4 text-[#F39C12] fill-[#F39C12]" />
                  <span>Quick Product Specs</span>
                </button>
              )}
            </div>

            {/* Rating & Assurance */}
            <div className="pt-4 flex items-center gap-6 border-t border-gray-800/80 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex text-[#F39C12]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F39C12]" />
                  ))}
                </div>
                <span className="font-bold text-gray-200">4.9 / 5.0</span>
                <span>(1,240+ Verified Reviews)</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>30-Day Money Back</span>
              </div>
            </div>
          </div>

          {/* High-End Isolated Product Photography Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Main Isolated Photography Stage */}
            <div
              className="relative w-full max-w-lg aspect-[4/3] rounded-2xl bg-gradient-to-b from-gray-100 to-gray-200 p-6 shadow-2xl border-4 border-gray-700/50 flex items-center justify-center group overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Soft studio shadow backdrop */}
              <div className="absolute inset-x-8 bottom-4 h-8 bg-black/20 rounded-full blur-xl transform scale-90 pointer-events-none"></div>

              {/* Primary High-Resolution Isolated Product Photo */}
              <img
                src={slide.primaryImage}
                alt={slide.title}
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500 transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Secondary Floating Accent Product Thumbnail Badge */}
              <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-gray-700 shadow-xl flex items-center gap-3">
                <img
                  src={slide.secondaryImage}
                  alt="Accent product"
                  className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left text-xs pr-2">
                  <span className="text-[10px] text-[#F39C12] font-bold uppercase tracking-wider block">MATCHING ACCESSORY</span>
                  <span className="font-bold text-gray-200 block truncate max-w-[120px]">Pro Sneakers & Leather</span>
                </div>
              </div>

              {/* Exclusive Hot Tag */}
              <div className="absolute top-4 left-4 bg-[#F39C12] text-slate-900 px-3 py-1 rounded-lg text-xs font-black shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FEATURED MODEL</span>
              </div>
            </div>

            {/* Slider Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 bg-slate-900/90 hover:bg-[#F39C12] hover:text-slate-900 text-white p-3 rounded-full shadow-2xl border border-gray-700 transition-all z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 bg-slate-900/90 hover:bg-[#F39C12] hover:text-slate-900 text-white p-3 rounded-full shadow-2xl border border-gray-700 transition-all z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Slide Indicator Dots & Thumbnails */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`transition-all ${
                currentSlideIndex === idx
                  ? 'w-8 h-3 bg-[#F39C12] rounded-full'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-400 rounded-full'
              }`}
              title={s.title}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
