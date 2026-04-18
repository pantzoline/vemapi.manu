'use client';

import { useState, useEffect, useRef } from 'react';
import { SceneWrapperProps } from '@/types';

interface FinalContent {
  title: string;
  subtitle: string;
  audioFile: string;
}

export function FinalScene({ scene }: SceneWrapperProps) {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const content = scene.content as FinalContent;

  const messages = [
    "Você é a Barbie do meu castelo de diamante 💎",
    "Cada momento com você é mágico ✨",
    "Feliz Aniversário, meu amor! 🎂",
    "Que este dia seja tão especial quanto você 💕"
  ];

  useEffect(() => {
    // Auto-play audio after 2 seconds
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setAudioPlayed(true);
          setShowSparkles(true);
        }).catch(err => {
          console.log('Audio autoplay blocked:', err);
          // Show manual play button
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Rotate messages
  useEffect(() => {
    if (!audioPlayed) return;

    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [audioPlayed, messages.length]);

  const handleManualPlay = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setAudioPlayed(true);
        setShowSparkles(true);
      });
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 relative overflow-hidden"
      data-theme={scene.theme}
    >
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={content.audioFile}
        preload="auto"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        {/* Crown Icon */}
        <div className="text-9xl mb-6 animate-bounce-slow">👑</div>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
          {content.title}
        </h1>

        {/* Animated Message */}
        <div className="h-16 flex items-center justify-center">
          <p 
            key={messageIndex}
            className="text-xl md:text-3xl text-white/90 font-medium animate-fade-in-up"
          >
            {messages[messageIndex]}
          </p>
        </div>

        {/* Manual Play Button (if autoplay blocked) */}
        {!audioPlayed && (
          <button
            onClick={handleManualPlay}
            className="mt-8 px-8 py-4 bg-white text-pink-600 font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
          >
            🎵 Tocar Surpresa Especial
          </button>
        )}

        {/* Playing indicator */}
        {audioPlayed && (
          <div className="mt-8 flex items-center justify-center gap-2 text-white/70">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white rounded-full animate-music-bar"
                  style={{
                    height: `${20 + Math.random() * 30}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <span className="text-sm">Tocando...</span>
          </div>
        )}

        {/* Replay button */}
        {audioPlayed && (
          <button
            onClick={handleManualPlay}
            className="mt-4 text-white/60 hover:text-white text-sm underline transition-colors"
          >
            Tocar novamente
          </button>
        )}
      </div>

      {/* Sparkles Effect */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sparkle-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            >
              {['✨', '💎', '🌟', '💖', '🎀'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Floating Diamonds */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`diamond-${i}`}
            className="absolute text-white/20 text-4xl animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            💎
          </div>
        ))}
      </div>

      {/* Heart Border */}
      <div className="absolute inset-8 border-4 border-white/20 rounded-3xl pointer-events-none" />

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes sparkle-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes music-bar {
          0%, 100% { height: 20px; }
          50% { height: 50px; }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(10deg);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-sparkle-fall {
          animation: sparkle-fall linear forwards;
        }
        
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
