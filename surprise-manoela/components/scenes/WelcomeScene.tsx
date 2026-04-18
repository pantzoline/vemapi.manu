'use client';

import { useState } from 'react';
import { SceneWrapperProps } from '@/types';

export function WelcomeScene({ scene, onNext }: SceneWrapperProps) {
  const [isStarted, setIsStarted] = useState(false);
  const content = scene.content as { title: string; subtitle: string; ctaText: string };

  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
      data-theme={scene.theme}
    >
      <div className="text-center px-4 animate-fade-in">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6 animate-bounce-in">
          {content.title}
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 mb-8 italic animate-slide-up delay-300">
          {content.subtitle}
        </p>
        
        <button
          onClick={handleStart}
          className={`
            px-8 py-4 bg-white text-black font-semibold rounded-full
            transform transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-lg hover:shadow-white/25
            active:scale-95 animate-pulse-anim
            ${isStarted ? 'opacity-0 scale-110' : 'opacity-100'}
          `}
        >
          {content.ctaText}
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}
