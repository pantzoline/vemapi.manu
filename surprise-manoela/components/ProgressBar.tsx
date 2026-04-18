'use client';

interface ProgressBarProps {
  progress: number;
  totalScenes: number;
  currentScene: number;
}

export function ProgressBar({ progress, totalScenes, currentScene }: ProgressBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-4">
      <div className="flex gap-1">
        {Array.from({ length: totalScenes }).map((_, index) => (
          <div
            key={index}
            className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                index < currentScene 
                  ? 'bg-white w-full' 
                  : index === currentScene 
                  ? 'bg-white' 
                  : 'w-0'
              }`}
              style={{
                width: index === currentScene ? `${progress}%` : index < currentScene ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
