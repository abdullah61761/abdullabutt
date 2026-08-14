import React from 'react';
import { Check, ShoppingBag, Heart, Sparkles, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  message: string;
}

interface NotificationToastProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#2D3138] text-white p-3.5 px-4 rounded-xl shadow-2xl border border-gray-700 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 fade-in duration-200"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#F39C12] text-slate-950 font-bold flex items-center justify-center shrink-0">
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : toast.type === 'wishlist' ? (
                <Heart className="w-4 h-4 fill-slate-950" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>
            <p className="text-xs font-bold text-gray-100 truncate">{toast.message}</p>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-gray-400 hover:text-white shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
