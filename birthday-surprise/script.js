/* =========================================
   LOVEBEATS - WRAPPED EDITION LOGIC
   ========================================= */

const SCENES_COUNT = 10;
let currentSceneIndex = 0;
let isStarted = false;

// YOUTUBE IDs mapping by scene
// Real official music videos/audios on YouTube
const ytSongs = [
  { sceneIndex: 2, id: '2Bv6r79hH6U' }, // State of Grace (Taylor's Version)
  { sceneIndex: 3, id: '-BjZmE2gtdo' }, // Lover
  { sceneIndex: 4, id: 'R9D7U5k2Jfs' }, // Long Live
  { sceneIndex: 5, id: 'T8lV8iJ_Sjs' }, // Te Vivo
  { sceneIndex: 6, id: 'kYJ41KjVqR0' }  // A Rua
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
      
      // Começa a animar o progresso atual com timeout (15 a 18s por cena de música, 6s para cena curta)
      setTimeout(() => {
        let duration = (i >= 2 && i <= 6) ? 18000 : 8000;
        if(i === 7) duration = 12000; // Fotos
        if(i === 8) duration = 30000; // Barbie video (does not auto-progress easily, manual click anyway)
        if(i === 9) duration = 60000; // Final letter

        fill.style.transition = `width ${duration}ms linear`;
        fill.style.width = '100%';
        
        // Auto avançar ao acabar o tempo na mesma cena (Para as músicas)
        if(i !== 8 && i !== 9) { // Avoid auto-skip on Video and Letter
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
    startPhotoCarrossel();
  } else {
    stopPhotoCarrossel();
  }

  if(currentSceneIndex === 8) {
    // Audio scene logic: pause bg music
    Object.values(ytPlayers).forEach(p => {
      if(p && typeof p.pauseVideo === 'function') p.pauseVideo();
    });
  }

  if(currentSceneIndex === 9) {
    // Final letter - Confetti rain
    startConfetti();
    // Replay Long Live or A Rua? Let's play 'Lover' softly.
    if (ytPlayers[3] && typeof ytPlayers[3].playVideo === 'function') {
      ytPlayers[3].seekTo(0);
      ytPlayers[3].setVolume(50);
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

let carrosselInterval;
let currentSlide = 0;
function startPhotoCarrossel() {
  const slides = document.querySelectorAll('.photo-slide');
  if(slides.length === 0) return;
  clearInterval(carrosselInterval);
  carrosselInterval = setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 2800);
}
function stopPhotoCarrossel() {
  clearInterval(carrosselInterval);
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
