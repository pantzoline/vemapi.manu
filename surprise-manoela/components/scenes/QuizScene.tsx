'use client';

import { useState, useEffect } from 'react';
import { SceneWrapperProps, QuizQuestion, QuizState, QuizResult } from '@/types';
import { getQuizQuestions, submitQuizAnswer } from '@/actions/scene-actions';

interface QuizContent {
  title: string;
  subtitle: string;
}

export function QuizScene({ scene, onNext }: SceneWrapperProps) {
  const [quizState, setQuizState] = useState<QuizState>('welcome');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const content = scene.content as QuizContent;

  useEffect(() => {
    const loadQuestions = async () => {
      const result = await getQuizQuestions();
      if (result.success && result.data) {
        setQuestions(result.data);
      }
    };

    loadQuestions();
  }, []);

  const handleStartQuiz = () => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setQuizState('question');
    }
  };

  const handleAnswerSelect = async (optionIndex: number) => {
    if (isProcessing || !currentQuestion) return;

    setIsProcessing(true);
    setSelectedOption(optionIndex);

    // Simulate thinking animation
    setQuizState('processing');

    setTimeout(async () => {
      const response = await submitQuizAnswer(
        currentQuestion.id,
        optionIndex,
        score
      );

      if (response.success) {
        if (response.isComplete && response.result) {
          // Quiz complete
          setResult(response.result);
          setQuizState('result');
        } else if (response.nextQuestion) {
          // Next question
          setScore(prev => prev + (currentQuestion.weights[optionIndex] || 0));
          setCurrentQuestion(response.nextQuestion);
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedOption(null);
          setQuizState('question');
        }
      }

      setIsProcessing(false);
    }, 1500);
  };

  const handleContinueToResult = () => {
    onNext();
  };

  // Welcome Screen
  if (quizState === 'welcome') {
    return (
      <div 
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-pink-400 to-rose-500"
        data-theme={scene.theme}
      >
        <div className="text-center px-4 max-w-2xl">
          {/* Barbie Logo Area */}
          <div className="mb-8">
            <div className="text-8xl mb-4 animate-bounce">👑</div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Barbie Quiz
            </h1>
            <div className="w-32 h-1 bg-white/50 mx-auto rounded-full" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {content.subtitle}
          </p>

          <button
            onClick={handleStartQuiz}
            className="px-12 py-4 bg-white text-pink-600 font-bold text-xl rounded-full hover:scale-105 hover:shadow-xl transition-all shadow-lg"
          >
            ✨ Iniciar Quiz ✨
          </button>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 text-6xl animate-float">💎</div>
          <div className="absolute top-20 right-20 text-5xl animate-float delay-500">🎀</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-float delay-1000">⭐</div>
          <div className="absolute bottom-10 right-10 text-6xl animate-float delay-1500">💖</div>
        </div>
      </div>
    );
  }

  // Question Screen
  if (quizState === 'question' && currentQuestion) {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-pink-400 to-rose-500 p-4"
        data-theme={scene.theme}
      >
        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/80 text-center text-sm mt-2">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-2xl bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isProcessing}
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-lg
                  transition-all duration-300 transform
                  ${selectedOption === index 
                    ? 'bg-white text-pink-600 scale-105 shadow-lg' 
                    : 'bg-white/20 text-white hover:bg-white/30 hover:scale-102'
                  }
                  ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          Escolha com o coração 💕
        </div>
      </div>
    );
  }

  // Processing Screen
  if (quizState === 'processing') {
    return (
      <div 
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 via-pink-400 to-rose-500"
        data-theme={scene.theme}
      >
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">💭</div>
          <p className="text-2xl text-white font-bold animate-pulse">
            Calculando seu filme...
          </p>
        </div>
      </div>
    );
  }

  // Result Screen
  if (quizState === 'result' && result) {
    return (
      <div 
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 via-pink-400 to-rose-500 p-4"
        data-theme={scene.theme}
      >
        {/* Result Card */}
        <div className="text-center max-w-2xl">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          
          <p className="text-white/80 text-xl mb-4">Seu filme é...</p>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            {result.movie}
          </h2>

          {/* Diamond Castle Visual */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-50 animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-br from-blue-300 via-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-8xl">🏰</span>
            </div>
            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-300 text-2xl animate-sparkle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>

          <p className="text-white text-lg mb-8">
            Como a Liana e a Alexa, você também é única e especial!
          </p>

          <button
            onClick={handleContinueToResult}
            className="px-12 py-4 bg-white text-pink-600 font-bold text-xl rounded-full hover:scale-105 hover:shadow-xl transition-all shadow-lg animate-pulse"
          >
            Ver Surpresa Final 🎁
          </button>
        </div>

        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  return (
    <div className="w-full h-full flex items-center justify-center bg-pink-500">
      <div className="text-center text-white">
        <p className="text-xl">Oops! Algo deu errado.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-white text-pink-500 rounded-full"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
