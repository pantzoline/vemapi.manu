'use client';

import { useState, useCallback, useEffect } from 'react';
import { Scene } from '@/types';
import { scenes } from '@/data/content';
import { ProgressBar } from './ProgressBar';
import { WelcomeScene } from './scenes/WelcomeScene';
import { MusicScene } from './scenes/MusicScene';
import { LyricsSyncScene } from './scenes/LyricsSyncScene';
import { InstagramFeedScene } from './scenes/InstagramFeedScene';
import { VlogScene } from './scenes/VlogScene';
import { QuizScene } from './scenes/QuizScene';
import { FinalScene } from './scenes/FinalScene';

export function SceneWrapper() {
  const [currentSceneId, setCurrentSceneId] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentScene = scenes.find(s => s.id === currentSceneId) || scenes[0];
  const progress = ((currentSceneId + 1) / scenes.length) * 100;

  const handleNext = useCallback(() => {
    if (currentSceneId < scenes.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSceneId(prev => prev + 1);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentSceneId, isTransitioning]);

  const handlePrevious = useCallback(() => {
    if (currentSceneId > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSceneId(prev => prev - 1);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentSceneId, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  const renderScene = () => {
    const sceneProps = {
      scene: currentScene,
      isActive: !isTransitioning,
      onNext: handleNext,
      onPrevious: handlePrevious,
      progress
    };

    switch (currentScene.type) {
      case 'welcome':
        return <WelcomeScene {...sceneProps} />;
      case 'music':
        return <MusicScene {...sceneProps} />;
      case 'lyrics-sync':
        return <LyricsSyncScene {...sceneProps} />;
      case 'instagram-feed':
        return <InstagramFeedScene {...sceneProps} />;
      case 'vlog':
        return <VlogScene {...sceneProps} />;
      case 'quiz':
        return <QuizScene {...sceneProps} />;
      case 'final':
        return <FinalScene {...sceneProps} />;
      default:
        return <WelcomeScene {...sceneProps} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <ProgressBar progress={progress} totalScenes={scenes.length} currentScene={currentSceneId} />
      
      <div 
        className={`w-full h-full transition-all duration-500 ease-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {renderScene()}
      </div>

      {/* Navigation Hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-white/50 text-sm">
        <span>← Anterior</span>
        <span>•</span>
        <span>Próximo →</span>
      </div>
    </div>
  );
}
