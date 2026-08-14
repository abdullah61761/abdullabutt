import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { ViewTab } from '../types';

interface CategoryGridProps {
  onSelectTab: (tab: ViewTab) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectTab }) => {
  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-[#F39C12] bg-[#2D3138] px-2.5 py-0.5 rounded uppercase tracking-wider">
              CURATED DEPARTMENTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3138] uppercase tracking-tight mt-1">
              EXPLORE POPULAR CATEGORIES
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-md">
            Discover curated luxury footwear, executive leather travel luggage, and hand-finished accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.id.includes('footwear')) onSelectTab('footwear');
                else if (cat.id.includes('bags')) onSelectTab('bags');
                else if (cat.id.includes('heels')) onSelectTab('heels');
                else onSelectTab('accessories');
              }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 border border-gray-200 shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300"
            >
              {cat.featuredImage && (
                <img
                  src={cat.featuredImage}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] font-extrabold bg-[#F39C12] text-slate-950 px-2 py-0.5 rounded uppercase w-max mb-1">
                  {cat.itemCount}+ ITEMS
                </span>
                <h3 className="text-lg font-black tracking-tight text-white group-hover:text-[#F39C12] transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Shop Department</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
