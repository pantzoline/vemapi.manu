import { z } from 'zod';

// Zod Schemas for Validation
export const SongSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  youtubeId: z.string(),
  albumArt: z.string().url(),
  lyrics: z.array(z.object({
    time: z.number(),
    text: z.string()
  }))
});

export const SceneTypeSchema = z.enum([
  'welcome', 
  'music', 
  'lyrics-sync', 
  'instagram-feed', 
  'vlog', 
  'quiz', 
  'final'
]);

export const SceneSchema = z.object({
  id: z.number(),
  type: SceneTypeSchema,
  theme: z.string(),
  duration: z.number().optional(),
  content: z.unknown()
});

export const QuizQuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  options: z.array(z.string()),
  weights: z.array(z.number()),
  correctMovie: z.string()
});

export const PostSchema = z.object({
  id: z.number(),
  image: z.string().url(),
  description: z.string(),
  likes: z.number().default(0),
  comments: z.array(z.string()).default([])
});

// TypeScript Interfaces
export type Song = z.infer<typeof SongSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
export type Post = z.infer<typeof PostSchema>;
export type SceneType = z.infer<typeof SceneTypeSchema>;

// Quiz Result Type
export interface QuizResult {
  movie: string;
  score: number;
}

// Scene Content Types
export interface WelcomeContent {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface MusicContent {
  song: Song;
  showLyrics: boolean;
}

export interface InstagramFeedContent {
  posts: Post[];
}

export interface VlogContent {
  videoUrl: string;
  restaurants: {
    name: string;
    address: string;
    image: string;
  }[];
}

export interface QuizContent {
  questions: QuizQuestion[];
  targetResult: string;
}

// UI State Types
export type UIState = 'idle' | 'loading' | 'success' | 'error' | 'empty';
export type LyricSyncState = 'loading' | 'syncing' | 'highlighting' | 'paused' | 'error';
export type QuizState = 'welcome' | 'question' | 'processing' | 'result' | 'error';
export type PopupState = 'hidden' | 'appearing' | 'visible' | 'disappearing';

// Component Props Types
export interface SceneWrapperProps {
  scene: Scene;
  isActive: boolean;
  onNext: () => void;
  onPrevious: () => void;
  progress: number;
}

export interface LyricsSyncProps {
  song: Song;
  currentTime: number;
  isActive: boolean;
  onLineChange?: (lineIndex: number) => void;
}

export interface InstagramFeedProps {
  posts: Post[];
  onPostClick: (postId: number) => void;
  onLoadMore?: () => void;
}

export interface QuizContainerProps {
  questions: QuizQuestion[];
  targetResult: string;
  onComplete: (result: QuizResult) => void;
}

export interface RomanticPopupProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// YouTube Player Types
export interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

// Theme Types
export type Theme = 
  | 'dark' 
  | 'love-intense' 
  | 'dark-red' 
  | 'lilac-dream' 
  | 'golden-hour' 
  | 'barbie-pink';

// Animation Types
export type AnimationType = 
  | 'fade-in' 
  | 'slide-up' 
  | 'bounce-in' 
  | 'pulse-anim' 
  | 'glow';

// Interaction Tracking Types
export interface UserInteraction {
  sceneId: number;
  action: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// Restaurant Card Types
export interface RestaurantCard {
  id: string;
  name: string;
  address: string;
  image: string;
  description: string;
  phone?: string;
  website?: string;
}
