'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SceneWrapperProps } from '@/types';
import { restaurantCards } from '@/data/content';

interface VlogContent {
  title: string;
  subtitle: string;
}

export function VlogScene({ scene, onNext }: SceneWrapperProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const content = scene.content as VlogContent;

  return (
    <div 
      className="w-full h-full bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900 overflow-y-auto"
      data-theme={scene.theme}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/40 backdrop-blur-md px-4 py-6">
        <h2 className="text-white text-3xl font-bold text-center">🎬 {content.title}</h2>
        <p className="text-white/70 text-center text-lg mt-2">{content.subtitle}</p>
      </div>

      {/* Video Placeholder (9:16 aspect ratio) */}
      <div className="max-w-sm mx-auto mt-8 mb-8">
        <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
          {/* Video placeholder with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-pink-900/50 to-orange-900/50" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>

          {/* Video info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-semibold">Vlog: Planejando o Dia</p>
            <p className="text-white/70 text-sm">Toque para assistir</p>
          </div>
        </div>
      </div>

      {/* Restaurant Cards Section */}
      <div className="px-4 pb-8">
        <h3 className="text-white text-2xl font-bold text-center mb-6">
          🍽️ Onde vamos celebrar?
        </h3>

        <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-2">
          {restaurantCards.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant.id)}
              className={`
                relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden
                transform transition-all duration-500 cursor-pointer
                hover:scale-105 hover:rotate-y-12
                ${selectedRestaurant === restaurant.id 
                  ? 'ring-4 ring-pink-500 scale-105' 
                  : ''
                }
              `}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Image */}
              <div className="relative h-48 bg-gradient-to-br from-pink-400/30 to-purple-500/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🍷</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                    {restaurant.id === 'kharina-batel' ? 'Batel' : 'Cabral'}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h4 className="text-white text-xl font-bold mb-2">{restaurant.name}</h4>
                <p className="text-white/70 text-sm mb-4">{restaurant.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-white/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{restaurant.address}</span>
                  </div>
                  
                  {restaurant.phone && (
                    <div className="flex items-center gap-2 text-white/60">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{restaurant.phone}</span>
                    </div>
                  )}
                </div>

                {/* Selection indicator */}
                {selectedRestaurant === restaurant.id && (
                  <div className="mt-4 flex items-center gap-2 text-pink-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Selecionado!</span>
                  </div>
                )}
              </div>

              {/* 3D Hover Effect Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  transform: 'translateZ(20px)'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-4 pb-8">
        <button
          onClick={onNext}
          className="w-full max-w-md mx-auto block py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg"
        >
          {selectedRestaurant 
            ? `Perfeito! Vamos para o ${selectedRestaurant === 'kharina-batel' ? 'Batel' : 'Cabral'} →` 
            : 'Continuar →'
          }
        </button>
      </div>

      <style jsx>{`
        .rotate-y-12:hover {
          transform: rotateY(12deg);
        }
      `}</style>
    </div>
  );
}
