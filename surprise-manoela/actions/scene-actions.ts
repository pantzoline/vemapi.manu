'use server';

import { Scene, QuizQuestion, Post, QuizResult, ApiResponse } from '@/types';
import { scenes, quizQuestions, instaData } from '@/data/content';

// Action: Get scene data by ID
export async function getSceneData(sceneId: number): Promise<ApiResponse<Scene>> {
  try {
    const scene = scenes.find(s => s.id === sceneId);
    
    if (!scene) {
      return { 
        success: false, 
        error: `Scene with ID ${sceneId} not found` 
      };
    }
    
    return { 
      success: true, 
      data: scene 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to load scene data' 
    };
  }
}

// Action: Get all scenes
export async function getAllScenes(): Promise<ApiResponse<Scene[]>> {
  try {
    return { 
      success: true, 
      data: scenes 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to load scenes' 
    };
  }
}

// Action: Get next scene
export async function getNextScene(currentSceneId: number): Promise<ApiResponse<Scene | null>> {
  try {
    const nextScene = scenes.find(s => s.id === currentSceneId + 1);
    
    if (!nextScene) {
      return { 
        success: true, 
        data: null 
      };
    }
    
    return { 
      success: true, 
      data: nextScene 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to get next scene' 
    };
  }
}

// Action: Process quiz answer
export async function submitQuizAnswer(
  questionId: number, 
  answerIndex: number,
  currentScore: number
): Promise<{
  success: boolean;
  nextQuestion?: QuizQuestion;
  isComplete?: boolean;
  result?: QuizResult;
  error?: string;
}> {
  try {
    const currentQuestion = quizQuestions.find(q => q.id === questionId);
    
    if (!currentQuestion) {
      return { 
        success: false, 
        error: 'Question not found' 
      };
    }

    // Calculate new score based on weights
    const weight = currentQuestion.weights[answerIndex] || 0;
    const newScore = currentScore + weight;
    
    // Check if there are more questions
    const nextQuestion = quizQuestions.find(q => q.id === questionId + 1);
    
    if (nextQuestion) {
      return {
        success: true,
        nextQuestion,
        isComplete: false
      };
    } else {
      // Quiz is complete - always return Diamond Castle
      return {
        success: true,
        isComplete: true,
        result: {
          movie: 'Barbie e o Castelo de Diamante',
          score: Math.max(newScore, 3) // Ensure minimum score for Diamond Castle
        }
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to process quiz answer' 
    };
  }
}

// Action: Get quiz questions
export async function getQuizQuestions(): Promise<ApiResponse<QuizQuestion[]>> {
  try {
    return { 
      success: true, 
      data: quizQuestions 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to load quiz questions' 
    };
  }
}

// Action: Get Instagram posts
export async function getInstagramPosts(): Promise<ApiResponse<Post[]>> {
  try {
    return { 
      success: true, 
      data: instaData 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to load posts' 
    };
  }
}

// Action: Track user interaction (for analytics)
export async function trackUserInteraction(
  sceneId: number, 
  action: string, 
  metadata?: Record<string, unknown>
): Promise<ApiResponse<void>> {
  try {
    // In a real application, this would save to a database
    // For now, we just log it
    console.log('User Interaction:', {
      sceneId,
      action,
      metadata,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: true 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to track interaction' 
    };
  }
}

// Action: Handle photo upload (if needed)
export async function uploadPhoto(formData: FormData): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const file = formData.get('photo') as File;
    
    if (!file) {
      return { 
        success: false, 
        error: 'No file provided' 
      };
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return { 
        success: false, 
        error: 'Invalid file type. Only JPEG, PNG and GIF are allowed.' 
      };
    }
    
    // In a real application, this would upload to cloud storage
    // For now, return a mock URL
    const mockUrl = `/assets/uploads/${Date.now()}-${file.name}`;
    
    return { 
      success: true, 
      url: mockUrl 
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to upload photo' 
    };
  }
}

// Action: Get current lyric line based on time
export async function getCurrentLyricLine(
  sceneId: number, 
  currentTime: number
): Promise<{
  success: boolean;
  line?: { time: number; text: string } | null;
  lineIndex?: number;
  error?: string;
}> {
  try {
    // This would typically come from a database or external API
    // For now, using local data
    const { lyricsData } = await import('@/data/content');
    const lyrics = lyricsData[sceneId];
    
    if (!lyrics) {
      return { 
        success: true, 
        line: null,
        lineIndex: -1
      };
    }
    
    // Find the current line based on time
    let currentLine = null;
    let currentLineIndex = -1;
    
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        currentLine = lyrics[i];
        currentLineIndex = i;
      } else {
        break;
      }
    }
    
    return {
      success: true,
      line: currentLine,
      lineIndex: currentLineIndex
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to get current lyric' 
    };
  }
}

// Action: Check if romantic popup should show
export async function shouldShowRomanticPopup(
  sceneId: number, 
  currentTime: number
): Promise<{
  success: boolean;
  shouldShow: boolean;
  message?: string;
  error?: string;
}> {
  try {
    // Only show on scene 7 (Algum Ritmo) between 15-25 seconds
    if (sceneId === 7 && currentTime >= 15 && currentTime <= 25) {
      return {
        success: true,
        shouldShow: true,
        message: "✨ Este momento é especial porque representa nossa conexão única ✨"
      };
    }
    
    return {
      success: true,
      shouldShow: false
    };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to check popup condition',
      shouldShow: false
    };
  }
}
