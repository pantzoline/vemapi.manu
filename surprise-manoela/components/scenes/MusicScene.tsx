'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { SceneWrapperProps, Song } from '@/types';
import { YouTubePlayer } from '@/components/YouTubePlayer';

interface MusicContent {
  title?: string;
  subtitle?: string;
  body?: string;
  song?: Song;
  lyric?: string;
}

// Spotify-style Player Controls
function PlayerControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  currentTime,
  duration,
  onSeek
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
        <div className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            onSeek(percent * duration);
          }}
        >
          <div 
            className="h-full bg-white rounded-full group-hover:bg-green-400 transition-colors"
            style={{ width: `${progress}%` }}
          >
            <div className="hidden group-hover:block w-3 h-3 bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 shadow-lg" />
          </div>
        </div>
        <span className="text-xs text-white/60 w-10">{formatTime(duration)}</span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6">
        <button 
          onClick={onPrevious}
          className="text-white/70 hover:text-white transition-colors p-2"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>

        <button 
          onClick={onPlayPause}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        <button 
          onClick={onNext}
          className="text-white/70 hover:text-white transition-colors p-2"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function MusicScene({ scene, onNext, onPrevious }: SceneWrapperProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // Default 3 minutes
  const [showLyric, setShowLyric] = useState(true);
  const content = scene.content as MusicContent;

  // Auto-play on mount when there's a song
  useEffect(() => {
    if (content.song) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [content.song]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Handle lyric display toggle
  const toggleLyric = () => {
    setShowLyric(prev => !prev);
  };

  return (
    <div 
      className={`
        w-full h-full flex flex-col items-center justify-center relative overflow-hidden
        ${getThemeStyles(scene.theme)}
      `}
      data-theme={scene.theme}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80 z-0" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 py-8">
        
        {/* Title/Subtitle Display (for non-song scenes) */}
        {content.title && !content.song && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-light text-white/90 mb-4 animate-slide-up">
              {content.title}
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up delay-100">
              {content.subtitle}
            </h1>
            {content.body && (
              <p className="text-xl md:text-2xl text-white/80 animate-slide-up delay-200">
                {content.body}
              </p>
            )}
          </div>
        )}

        {/* Spotify-Style Player */}
        {content.song && (
          <div className="flex flex-col items-center w-full max-w-lg animate-fade-in">
            
            {/* Album Art - Large and Centered like Spotify */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 mb-8 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={content.song.albumArt}
                alt={content.song.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Song Info */}
            <div className="text-center mb-6 w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 truncate px-4">
                {content.song.title}
              </h3>
              <p className="text-lg text-white/60 truncate px-4">
                {content.song.artist}
              </p>
            </div>

            {/* Lyric Display (toggleable) */}
            {content.lyric && showLyric && (
              <div 
                className="mb-6 max-w-lg cursor-pointer"
                onClick={toggleLyric}
              >
                <p className="text-xl md:text-2xl text-white/90 text-center leading-relaxed italic">
                  &ldquo;{content.lyric}&rdquo;
                </p>
              </div>
            )}

            {/* Player Controls */}
            <div className="w-full px-4">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={onPrevious}
                onNext={onNext}
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeek}
              />
            </div>

            {/* Hidden YouTube Player */}
            <div className="absolute top-0 left-0 w-1 h-1 overflow-hidden opacity-0 pointer-events-none">
              <YouTubePlayer
                videoId={content.song.youtubeId}
                isPlaying={isPlaying}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onNext}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="flex items-center justify-center gap-8 text-white/50 text-sm">
          <button 
            onClick={onPrevious}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            Anterior
          </button>
          <span className="text-white/30">|</span>
          <button 
            onClick={onNext}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            Próximo
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function getThemeStyles(theme: string): string {
  const themes: Record<string, string> = {
    'dark': 'bg-gray-900',
    'love-intense': 'bg-gradient-to-br from-red-900 via-red-800 to-pink-900',
    'dark-red': 'bg-gradient-to-br from-gray-900 via-red-950 to-black',
    'lilac-dream': 'bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900',
    'golden-hour': 'bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-900',
    'barbie-pink': 'bg-gradient-to-br from-pink-600 via-pink-500 to-rose-600'
  };
  return themes[theme] || themes['dark'];
}
