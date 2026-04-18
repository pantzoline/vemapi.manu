'use client';

import { useEffect, useState } from 'react';

interface RomanticPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function RomanticPopup({ message, isVisible, onClose }: RomanticPopupProps) {
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowSparkles(true);
      const timer = setTimeout(() => {
        setShowSparkles(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-300 text-2xl animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
      
      {/* Popup Content */}
      <div 
        className="relative z-10 max-w-md mx-4 p-8 bg-gradient-to-br from-pink-500/90 via-purple-500/90 to-indigo-500/90 rounded-3xl shadow-2xl backdrop-blur-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Heart decoration */}
        <div className="text-center mb-6">
          <div className="inline-block text-6xl animate-pulse">💝</div>
        </div>

        {/* Message */}
        <p className="text-white text-center text-lg md:text-xl font-medium leading-relaxed">
          {message}
        </p>

        {/* Decorative hearts */}
        <div className="absolute -top-2 -left-2 text-pink-300 text-4xl animate-float delay-300">💖</div>
        <div className="absolute -bottom-2 -right-2 text-purple-300 text-4xl animate-float delay-500">💜</div>
        <div className="absolute top-1/2 -left-4 text-red-300 text-3xl animate-float delay-700">❤️</div>
        <div className="absolute top-1/3 -right-4 text-pink-200 text-3xl animate-float delay-1000">💕</div>
      </div>
    </div>
  );
}
