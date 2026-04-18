'use client';

import { useEffect, useRef, useCallback } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  onTimeUpdate?: (time: number) => void;
  onEnded?: () => void;
  startTime?: number;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: {
            autoplay?: number;
            controls?: number;
            disablekb?: number;
            fs?: number;
            rel?: number;
            start?: number;
          };
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getDuration: () => number;
  destroy: () => void;
}

export function YouTubePlayer({ 
  videoId, 
  isPlaying, 
  onTimeUpdate, 
  onEnded,
  startTime = 0 
}: YouTubePlayerProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeUpdateRef = useRef<number | null>(null);

  // Initialize YouTube Player
  useEffect(() => {
    const initPlayer = () => {
      if (!containerRef.current) return;

      const playerId = `youtube-player-${videoId}`;
      
      // Create player container
      const playerContainer = document.createElement('div');
      playerContainer.id = playerId;
      containerRef.current.appendChild(playerContainer);

      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          start: startTime
        },
        events: {
          onReady: (event) => {
            if (isPlaying) {
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnded?.();
            }
          }
        }
      });
    };

    // Load YouTube API if not loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      if (timeUpdateRef.current) {
        cancelAnimationFrame(timeUpdateRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, startTime]);

  // Handle play/pause
  useEffect(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying]);

  // Time tracking
  const trackTime = useCallback(() => {
    if (playerRef.current && onTimeUpdate) {
      const currentTime = playerRef.current.getCurrentTime();
      onTimeUpdate(currentTime);
    }
    timeUpdateRef.current = requestAnimationFrame(trackTime);
  }, [onTimeUpdate]);

  useEffect(() => {
    if (isPlaying && onTimeUpdate) {
      timeUpdateRef.current = requestAnimationFrame(trackTime);
    } else if (timeUpdateRef.current) {
      cancelAnimationFrame(timeUpdateRef.current);
    }

    return () => {
      if (timeUpdateRef.current) {
        cancelAnimationFrame(timeUpdateRef.current);
      }
    };
  }, [isPlaying, trackTime, onTimeUpdate]);

  return <div ref={containerRef} className="w-full h-full" />;
}
