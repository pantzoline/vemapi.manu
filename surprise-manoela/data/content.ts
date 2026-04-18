import { Song, Scene, QuizQuestion, Post, RestaurantCard } from '@/types';

// YouTube Songs Mapping
export const songs: Song[] = [
  {
    id: 'state-of-grace',
    title: 'State of Grace',
    artist: 'Taylor Swift',
    youtubeId: '2Bv6r79hH6U',
    albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop',
    lyrics: []
  },
  {
    id: 'lover',
    title: 'Lover',
    artist: 'Taylor Swift',
    youtubeId: '-BjZmE2gtdo',
    albumArt: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=600&fit=crop',
    lyrics: []
  },
  {
    id: 'long-live',
    title: 'Long Live',
    artist: 'Taylor Swift',
    youtubeId: 'R9D7U5k2Jfs',
    albumArt: 'https://images.unsplash.com/photo-1459749411177-0473ef716175?w=600&h=600&fit=crop',
    lyrics: []
  },
  {
    id: 'te-vivo',
    title: 'Te Vivo',
    artist: 'Luan Santana',
    youtubeId: 'T8lV8iJ_Sjs',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop',
    lyrics: []
  },
  {
    id: 'a-rua',
    title: 'A Rua',
    artist: 'Luan Santana',
    youtubeId: 'kYJ41KjVqR0',
    albumArt: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=600&fit=crop',
    lyrics: []
  },
  {
    id: 'algum-ritmo',
    title: 'Algum Ritmo',
    artist: 'Luan Santana',
    youtubeId: 'p9KNo8Kx_iA',
    albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop',
    lyrics: [
      { time: 0, text: "Algum ritmo em comum..." },
      { time: 4, text: "Fez-nos encontrar" },
      { time: 8, text: "Algum ritmo em comum..." },
      { time: 12, text: "Fez-nos conversar" },
      { time: 16, text: "Neste lugar," },
      { time: 20, text: "Ondas não são do mar" },
      { time: 24, text: "Quero em breve," },
      { time: 28, text: "Vida leve" },
      { time: 32, text: "Mas se eu ficar..." },
      { time: 36, text: "Noites em alto-mar" }
    ]
  }
];

// Lyrics Data for Synchronization
export const lyricsData: Record<number, { time: number; text: string }[]> = {
  7: songs.find(s => s.id === 'algum-ritmo')?.lyrics || []
};

// Scenes Configuration
export const scenes: Scene[] = [
  {
    id: 0,
    type: 'welcome',
    theme: 'dark',
    content: {
      title: 'Para Você.',
      subtitle: 'Certifique-se que o volume está no máximo',
      ctaText: 'Iniciar'
    }
  },
  {
    id: 1,
    type: 'music',
    theme: 'love-intense',
    content: {
      title: 'Feliz Aniversário,',
      subtitle: 'Manoela Mariani Martins',
      body: 'Tudo começa agora.'
    }
  },
  {
    id: 2,
    type: 'music',
    theme: 'dark-red',
    content: {
      song: songs[0],
      lyric: "Neste dia especial, eu queria te dar o mundo..."
    }
  },
  {
    id: 3,
    type: 'music',
    theme: 'lilac-dream',
    content: {
      song: songs[1],
      lyric: "We could leave the Christmas lights up 'til January..."
    }
  },
  {
    id: 4,
    type: 'music',
    theme: 'golden-hour',
    content: {
      song: songs[2],
      lyric: "Long live all the mountains we moved..."
    }
  },
  {
    id: 5,
    type: 'music',
    theme: 'dark',
    content: {
      song: songs[3],
      lyric: "Eu te vivo em cada momento..."
    }
  },
  {
    id: 6,
    type: 'music',
    theme: 'love-intense',
    content: {
      song: songs[4],
      lyric: "A rua que nos viu passar..."
    }
  },
  {
    id: 7,
    type: 'lyrics-sync',
    theme: 'lilac-dream',
    content: {
      song: songs[5],
      showLyrics: true,
      showRomanticPopup: true,
      popupTimeRange: { start: 15, end: 25 },
      popupMessage: "✨ Este momento é especial porque... ✨"
    }
  },
  {
    id: 8,
    type: 'instagram-feed',
    theme: 'dark',
    content: {
      title: 'Nossa História',
      subtitle: 'Swipe para ver mais'
    }
  },
  {
    id: 9,
    type: 'vlog',
    theme: 'golden-hour',
    content: {
      title: 'Onde vamos comemorar?',
      subtitle: 'Escolha o Kharina'
    }
  },
  {
    id: 10,
    type: 'quiz',
    theme: 'barbie-pink',
    content: {
      title: 'Qual filme da Barbie te representa?',
      subtitle: 'Responda as perguntas e descubra!'
    }
  },
  {
    id: 11,
    type: 'final',
    theme: 'barbie-pink',
    content: {
      title: 'Castelo de Diamante',
      subtitle: 'Você é única e especial!',
      audioFile: '/assets/barbie_audio.mp3'
    }
  }
];

// Instagram Posts Data
export const instaData: Post[] = [
  { 
    id: 1,
    image: '/assets/photos/photo1.png', 
    description: 'Onde tudo começou...',
    likes: 152,
    comments: ['Que momento especial!', 'Lindos juntos']
  },
  { 
    id: 2,
    image: '/assets/photos/photo2.png', 
    description: 'Aquele dia que não esquecemos.',
    likes: 89,
    comments: ['Perfeitos!', 'Amo vocês']
  },
  { 
    id: 3,
    image: '/assets/photos/photo3.png', 
    description: 'Você sendo perfeita, como sempre.',
    likes: 234,
    comments: ['Maravilhosa!', 'Que sorriso']
  },
  { 
    id: 4,
    image: '/assets/photos/photo4.png', 
    description: 'Nosso pequeno mundo.',
    likes: 167,
    comments: ['Casal top!', 'Meta de relacionamento']
  }
];

// Default images for fallback
export const defaultImages = [
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=600&q=80'
];

// Quiz Questions Data
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual o seu encontro ideal?",
    options: ["Jantar à luz de velas", "Aventura na natureza", "Noite de filmes"],
    weights: [1, 0, 0],
    correctMovie: "Barbie e o Castelo de Diamante"
  },
  {
    id: 2,
    question: "O que você mais valoriza?",
    options: ["Amizade e Lealdade", "Poder e Estilo", "Liberdade"],
    weights: [1, 0, 0],
    correctMovie: "Barbie e o Castelo de Diamante"
  },
  {
    id: 3,
    question: "Escolha um instrumento:",
    options: ["Violão/Guitarra", "Piano", "Flauta"],
    weights: [1, 0, 0],
    correctMovie: "Barbie e o Castelo de Diamante"
  }
];

// Restaurant Cards Data
export const restaurantCards: RestaurantCard[] = [
  {
    id: 'kharina-batel',
    name: 'Kharina Batel',
    address: 'Av. do Batel, 1234 - Batel, Curitiba',
    image: '/assets/restaurants/kharina-batel.jpg',
    description: 'Atmosfera sofisticada no coração do Batel. Perfeito para noites especiais.',
    phone: '(41) 1234-5678',
    website: 'https://kharina.com.br/batel'
  },
  {
    id: 'kharina-cabral',
    name: 'Kharina Cabral',
    address: 'Rua Cabral, 567 - Centro, Curitiba',
    image: '/assets/restaurants/kharina-cabral.jpg',
    description: 'Charme clássico com um toque moderno. Ideal para celebrações memoráveis.',
    phone: '(41) 9876-5432',
    website: 'https://kharina.com.br/cabral'
  }
];

// YouTube Songs Mapping by Scene
export const ytSongs = [
  { sceneIndex: 2, id: '2Bv6r79hH6U' }, // State of Grace
  { sceneIndex: 3, id: '-BjZmE2gtdo' }, // Lover
  { sceneIndex: 4, id: 'R9D7U5k2Jfs' }, // Long Live
  { sceneIndex: 5, id: 'T8lV8iJ_Sjs' }, // Te Vivo
  { sceneIndex: 6, id: 'kYJ41KjVqR0' }, // A Rua
  { sceneIndex: 7, id: 'p9KNo8Kx_iA' }  // Algum Ritmo
];

// Romantic Popup Configuration
export const romanticPopupConfig = {
  triggerTime: { start: 15, end: 25 },
  message: "✨ Este momento é especial porque representa nossa conexão única ✨",
  autoCloseDelay: 5000
};

// Animation Timing
export const animationConfig = {
  transitionDuration: 500, // ms
  cubicBezier: 'cubic-bezier(0.4, 0, 0.2, 1)',
  springConfig: {
    stiffness: 100,
    damping: 10
  }
};

// Responsive Breakpoints
export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  tv: 1920
};

// Audio Configuration
export const audioConfig = {
  barbieAudioPath: '/assets/barbie_audio.mp3',
  volume: 1.0,
  fadeInDuration: 2000
};
