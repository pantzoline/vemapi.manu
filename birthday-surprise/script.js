/* =========================================
   LOVEBEATS - WRAPPED EDITION LOGIC
   ========================================= */

const SCENES_COUNT = 13;
let currentSceneIndex = 0;
let isStarted = false;

// YOUTUBE IDs mapping by scene
const ytSongs = [
  { sceneIndex: 2, id: '2Bv6r79hH6U' }, // State of Grace
  { sceneIndex: 3, id: '-BjZmE2gtdo' }, // Lover
  { sceneIndex: 4, id: 'R9D7U5k2Jfs' }, // Long Live
  { sceneIndex: 5, id: 'T8lV8iJ_Sjs' }, // Te Vivo
  { sceneIndex: 6, id: 'kYJ41KjVqR0' }, // A Rua
  { sceneIndex: 7, id: 'p9KNo8Kx_iA' }  // Algum Ritmo (Novo!)
];

const lyricsData = {
  7: [
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
};

const instaData = [
  { img: 'assets/photos/photo1.png', defaultImg: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80', description: 'Onde tudo começou...' },
  { img: 'assets/photos/photo2.png', defaultImg: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80', description: 'Aquele dia que não esquecemos.' },
  { img: 'assets/photos/photo3.png', defaultImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', description: 'Você sendo perfeita, como sempre.' },
  { img: 'assets/photos/photo4.png', defaultImg: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=600&q=80', description: 'Nosso pequeno mundo.' }
];

const quizQuestions = [
  { q: "Qual o seu encontro ideal?", a: ["Jantar à luz de velas", "Aventura na natureza", "Noite de filmes"], weights: [1, 0, 0] },
  { q: "O que você mais valoriza?", a: ["Amizade e Lealdade", "Poder e Estilo", "Liberdade"], weights: [1, 0, 0] },
  { q: "Escolha um instrumento:", a: ["Violão/Guitarra", "Piano", "Flauta"], weights: [1, 0, 0] }
];

let ytPlayers = {};
let apiReady = false;

// 1. INITIALIZE YOUTUBE IFRAME API
window.onYouTubeIframeAPIReady = function() {
  apiReady = true;
  const container = document.getElementById('yt-players');
  
  ytSongs.forEach((song, idx) => {
    const div = document.createElement('div');
    div.id = `yt-player-${idx}`;
    container.appendChild(div);

    ytPlayers[song.sceneIndex] = new YT.Player(div.id, {
      height: '10',
      width: '10',
      videoId: song.id,
      playerVars: {
        'playsinline': 1,
        'controls': 0,
        'disablekb': 1,
        'fs': 0,
        'rel': 0,
        'autoplay': 0
      }
    });
  });
};

// 2. BOOTSTRAP APP
function initApp() {
  buildProgressBars();
  updateScenes(); // Set scene 0
}

function buildProgressBars() {
  const container = document.getElementById('progress-container');
  // Criar barras visuais apenas para Cenas 1 até 8 (8 barras, correspondendo às telas de música e fotos).
  for(let i = 1; i < SCENES_COUNT; i++) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar-segment';
    bar.id = `progress-bar-${i}`;
    bar.innerHTML = '<div class="progress-fill"></div>';
    container.appendChild(bar);
  }
}

// 3. UI PROGRESS
let autoProgressTimeout;
function updateProgressUI() {
  const container = document.getElementById('progress-container');
  
  // Hide in Scene 0 (Start button only)
  if (currentSceneIndex === 0) {
    container.style.opacity = '0';
    return;
  }
  container.style.opacity = '1';

  clearTimeout(autoProgressTimeout);

  for(let i = 1; i < SCENES_COUNT; i++) {
    const bar = document.getElementById(`progress-bar-${i}`);
    if(!bar) continue;
    
    const fill = bar.querySelector('.progress-fill');
    
    if (i < currentSceneIndex) {
      // Past scenes
      bar.classList.add('filled');
      fill.style.transition = 'none';
      fill.style.width = '100%';
    } else if (i === currentSceneIndex) {
      // Current scene
      bar.classList.remove('filled');
      fill.style.transition = 'none';
      fill.style.width = '0%';
      
      // Começa a animar o progresso atual com timeout
      setTimeout(() => {
        let duration = (i >= 2 && i <= 7) ? 20000 : 10000;
        if(i === 8) duration = 25000; // Instagram Feed
        if(i === 9) duration = 40000; // Quiz
        if(i === 11) duration = 60000; // Kharina Comparison
        if(i === 12) duration = 60000; // Letter

        fill.style.transition = `width ${duration}ms linear`;
        fill.style.width = '100%';
        
        // Auto avançar (exceto cenas longas/interativas)
        if(![8, 9, 10, 11, 12].includes(i)) {
          autoProgressTimeout = setTimeout(() => {
             nextScene();
          }, duration);
        }
      }, 50);
      
    } else {
      // Future scenes
      bar.classList.remove('filled');
      fill.style.transition = 'none';
      fill.style.width = '0%';
    }
  }
}

// 4. SCENE CONTROLLER
function updateScenes() {
  // Toggle Visibility Classes
  document.querySelectorAll('.scene').forEach((scene, index) => {
    if(index === currentSceneIndex) {
      scene.classList.add('active');
    } else {
      scene.classList.remove('active');
    }
  });

  // Vertical transform translation
  document.getElementById('scenes-wrapper').style.transform = `translateY(-${currentSceneIndex * 100}vh)`;
  
  // Progress
  updateProgressUI();

  // Navigation visibility
  const nav = document.getElementById('nav-controls');
  if(nav) {
    nav.style.opacity = currentSceneIndex === 0 ? '0' : '1';
  }

  // YouTube Audio Context
  Object.values(ytPlayers).forEach(p => {
    if(p && typeof p.pauseVideo === 'function') {
      p.pauseVideo();
    }
  });

  if (currentSceneIndex > 0 && isStarted) {
    if (ytPlayers[currentSceneIndex] && typeof ytPlayers[currentSceneIndex].playVideo === 'function') {
      // Resets the video to 0 to ensure it plays from the beginning on fast clicks
      ytPlayers[currentSceneIndex].seekTo(0);
      ytPlayers[currentSceneIndex].playVideo();
    }
  }

  // Features by scene
  if(currentSceneIndex === 7) {
    initLyrics(7);
  } else {
    stopLyrics();
  }

  if(currentSceneIndex === 8) {
    renderInstaFeed();
  }

  if(currentSceneIndex === 9) {
    initQuiz();
  }

  if(currentSceneIndex === 12) {
    startConfetti();
    if (ytPlayers[3]) {
      ytPlayers[3].seekTo(0);
      ytPlayers[3].setVolume(30);
      ytPlayers[3].playVideo();
    }
  }
}

function nextScene() {
  if(!isStarted && currentSceneIndex === 0) {
    isStarted = true;
  }
  if(currentSceneIndex < SCENES_COUNT - 1) {
    currentSceneIndex++;
    updateScenes();
  }
}

function prevScene() {
  if (currentSceneIndex > 1) {
    currentSceneIndex--;
    updateScenes();
  }
}

// Permite voltar também clicando do lado esquerdo da tela
document.addEventListener('click', (e) => {
  // If we are in the intro, ignore screen clicks unless it's the button
  if (currentSceneIndex === 0) return;
  // Video and Final letter scenes block auto-click forward anywhere to allow reading/watching.
  // They have their own explicit buttons
  if(currentSceneIndex === 8 || currentSceneIndex === 9) return;

  const w = window.innerWidth;
  // If clicked on left 30% of screen, go back
  if (e.clientX < w * 0.3) {
    if(currentSceneIndex > 1) {
      currentSceneIndex--;
      updateScenes();
    }
  }
});


// 5. MEDIA CONTROLS
let barbieAudio = null;

function playBarbieAudio() {
  const btn = document.getElementById('play-barbie-btn');
  const waveform = document.getElementById('audio-waveform');
  
  if (!barbieAudio) {
    barbieAudio = new Audio('assets/barbie_audio.mp3');
    
    barbieAudio.addEventListener('ended', () => {
      btn.innerHTML = '▶ Ouvir Novamente';
      waveform.classList.add('hidden');
    });
  }

  // Ensure all background YT songs are paused
  Object.values(ytPlayers).forEach(p => {
    if(p && typeof p.pauseVideo === 'function') p.pauseVideo();
  });

  if (barbieAudio.paused) {
    barbieAudio.play().then(() => {
      btn.innerHTML = '⏸ Pausar';
      waveform.classList.remove('hidden');
    }).catch(e => {
      alert("Áudio não encontrado. Lembre-se de salvar barbie_audio.mp3 na pasta assets.");
    });
  } else {
    barbieAudio.pause();
    btn.innerHTML = '▶ Continuar';
    waveform.classList.add('hidden');
  }
}


// 7. LYRICS ENGINE (Spotify Style)
let lyricsInterval;
function initLyrics(sceneIdx) {
  const container = document.getElementById(`lyrics-container-${sceneIdx}`);
  const lines = lyricsData[sceneIdx] || [];
  container.innerHTML = lines.map((l, i) => `<div class="lyric-line" id="lyric-${sceneIdx}-${i}">${l.text}</div>`).join('');
  
  const popup = document.getElementById('romantic-popup');
  
  lyricsInterval = setInterval(() => {
    const player = ytPlayers[sceneIdx];
    if(player && typeof player.getCurrentTime === 'function') {
      const time = player.getCurrentTime();
      
      lines.forEach((l, i) => {
        const el = document.getElementById(`lyric-${sceneIdx}-${i}`);
        if(time >= l.time) {
          el.classList.add('active');
          el.classList.remove('blur');
        } else {
          el.classList.remove('active');
          el.classList.add('blur');
        }
      });

      // Romantic Pop-up trigger (ex: around 20s of Algum Ritmo)
      if(sceneIdx === 7 && time > 15 && time < 25) {
        popup.classList.add('visible');
      } else {
        popup.classList.remove('visible');
      }
    }
  }, 500);
}

function stopLyrics() {
  clearInterval(lyricsInterval);
}

// 8. INSTAGRAM FEED
function renderInstaFeed() {
  const container = document.getElementById('insta-feed');
  if(!container) return;
  container.innerHTML = instaData.map(item => `
    <div class="insta-card">
      <div class="insta-user-header" style="padding:10px; display:flex; align-items:center; gap:10px;">
        <div style="width:30px; height:30px; border-radius:50%; background:#ddd;"></div>
        <span style="font-weight:bold; font-size:0.9rem;">vitor_castro</span>
      </div>
      <img src="${item.img}" onerror="this.src='${item.defaultImg}'" class="insta-photo">
      <div class="insta-actions"><span>❤️</span> <span>💬</span> <span>✈️</span></div>
      <div class="insta-dedication">
        <span class="insta-user">vitor_castro</span> ${item.description}
      </div>
    </div>
  `).join('');
}

// 9. BARBIE QUIZ LOGIC
let currentQuizStep = 0;
function initQuiz() {
  currentQuizStep = 0;
  renderQuizStep();
}

function renderQuizStep() {
  const box = document.getElementById('quiz-question-box');
  if(currentQuizStep >= quizQuestions.length) {
    showQuizResult();
    return;
  }
  const q = quizQuestions[currentQuizStep];
  box.innerHTML = `
    <p style="margin-bottom:1.5rem; font-weight:bold;">${q.q}</p>
    ${q.a.map((opt, i) => `<div class="quiz-option" onclick="nextQuizStep()">${opt}</div>`).join('')}
  `;
}

function nextQuizStep() {
  currentQuizStep++;
  renderQuizStep();
}

function showQuizResult() {
  document.getElementById('quiz-container').classList.add('fade-out');
  setTimeout(() => {
    nextScene(); // Pula para a cena do resultado
    setTimeout(() => {
      document.getElementById('result-castle').classList.remove('hidden');
    }, 500);
  }, 800);
}

// 10. KHARINA SELECTION
function selectDest(unit) {
  const cards = document.querySelectorAll('.dest-card');
  cards.forEach(c => c.style.border = '1px solid rgba(255,255,255,0.2)');
  document.querySelector(`.${unit}`).style.border = '2px solid #fff';
  console.log(`Selecionado: Kharina ${unit}`);
}

// 6. CONFETTI (Final Celebration)
function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const emojis = ["❤️", "💖", "🎂", "✨", "🎉"];
  const colors = ["#e91e8c", "#f8b5c8", "#FFD700", "#1ed760", "#ffffff"];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: Math.random() > 0.6 ? emojis[Math.floor(Math.random() * emojis.length)] : null,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5,
      opacity: 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      
      if (p.y > canvas.height) { 
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.emoji) {
        ctx.font = `${p.size * 2}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

window.onload = initApp;
