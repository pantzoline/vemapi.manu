'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SceneWrapperProps, Song, PopupState } from '@/types';
import { YouTubePlayer } from '@/components/YouTubePlayer';
import { RomanticPopup } from '@/components/RomanticPopup';

interface LyricsContent {
  song: Song;
  showLyrics: boolean;
  showRomanticPopup: boolean;
  popupTimeRange: { start: number; end: number };
  popupMessage: string;
}

export function LyricsSyncScene({ scene, onNext }: SceneWrapperProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [popupState, setPopupState] = useState<PopupState>('hidden');
  const [popupMessage, setPopupMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const content = scene.content as LyricsContent;
  const { song } = content;
  const lyrics = song.lyrics || [];

  // Sync lyrics with current time
  useEffect(() => {
    let newIndex = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        newIndex = i;
      } else {
        break;
      }
    }
    setCurrentLineIndex(newIndex);
  }, [currentTime, lyrics]);

  // Handle romantic popup
  useEffect(() => {
    const { showRomanticPopup, popupTimeRange, popupMessage: message } = content;
    
    if (showRomanticPopup && popupTimeRange) {
      const { start, end } = popupTimeRange;
      
      if (currentTime >= start && currentTime <= end) {
        if (popupState === 'hidden') {
          setPopupMessage(message);
          setPopupState('appearing');
          setTimeout(() => setPopupState('visible'), 300);
        }
      } else if (currentTime > end && popupState === 'visible') {
        setPopupState('disappearing');
        setTimeout(() => setPopupState('hidden'), 300);
      }
    }
  }, [currentTime, content, popupState]);

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleLineClick = (index: number) => {
    // Seek to line timestamp
    const line = lyrics[index];
    if (line) {
      setCurrentTime(line.time);
    }
  };

  const handleClosePopup = () => {
    setPopupState('disappearing');
    setTimeout(() => setPopupState('hidden'), 300);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 relative overflow-hidden"
      data-theme={scene.theme}
    >
      {/* Album Art */}
      <div className="absolute top-8 left-8 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-2xl opacity-80">
        <img
          src={song.albumArt}
          alt={song.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Lyrics Display */}
      <div className="flex-1 flex items-center justify-center w-full max-w-4xl px-4">
        <div className="w-full space-y-4 text-center">
          {lyrics.map((line, index) => {
            const isActive = index === currentLineIndex;
            const isPast = index < currentLineIndex;
            
            return (
              <div
                key={index}
                onClick={() => handleLineClick(index)}
                className={`
                  font-serif text-2xl md:text-4xl lg:text-5xl leading-relaxed
                  transition-all duration-500 ease-out cursor-pointer
                  ${isActive 
                    ? 'text-white scale-110 font-bold blur-0' 
                    : isPast
                    ? 'text-white/30 scale-100 blur-[1px]'
                    : 'text-white/50 scale-100 blur-[2px]'
                  }
                `}
                style={{
                  transform: `translateY(${(index - currentLineIndex) * 20}px)`,
                  opacity: Math.abs(index - currentLineIndex) > 2 ? 0 : 1
                }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentTime / (lyrics[lyrics.length - 1]?.time || 60)) * 100}%` 
            }}
          />
        </div>
        <div className="flex justify-between text-white/50 text-xs mt-2">
          <span>{formatTime(currentTime)}</span>
          <span onClick={onNext} className="cursor-pointer hover:text-white transition-colors">
            Pular →
          </span>
        </div>
      </div>

      {/* Hidden YouTube Player */}
      <div className="absolute top-0 left-0 w-1 h-1 overflow-hidden opacity-0 pointer-events-none">
        <YouTubePlayer
          videoId={song.youtubeId}
          isPlaying={isPlaying}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onNext}
        />
      </div>

      {/* Romantic Popup */}
      <RomanticPopup
        message={popupMessage}
        isVisible={popupState === 'visible' || popupState === 'appearing'}
        onClose={handleClosePopup}
      />

      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
