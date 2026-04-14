/* ============================================
   🎵 LOVEBEATS — JavaScript Engine
   ============================================ */

// ─── CONFIG: Edit this to personalize ─────────────────────────────────────────
const CONFIG = {
  /** Nome da sua namorada — aparece na tela inicial */
  girlfriendName: "Meu Amor",

  /** Mensagem de amor — aparece na seção "Carta de Amor" */
  loveMessage: [
    "Meu amor,",
    "Hoje é um dia muito especial — <strong>seu aniversário</strong>. E eu queria fazer algo diferente, algo que mostrasse o quanto você significa pra mim.",
    "Então criei esta playlist com as músicas que me fazem pensar em você, nas nossas risadas, nos nossos momentos... em tudo que torna essa vida mais linda ao seu lado.",
    "Cada música é um sentimento. Cada foto é uma memória que carrego no coração.",
    "Obrigado por existir, por sorrir daquele jeito, por ser você.",
  ],
  loveSignature: "Com todo o meu amor,<br><strong>Seu amor ❤️</strong>",

  /**
   * PLAYLIST: Adicione suas músicas aqui!
   * - file: caminho para o arquivo de áudio (ex: "assets/music/musica1.mp3")
   *   OU uma URL (ex: https://archive.org/download/...)
   * - coverFile: (opcional) imagem de capa
   */
  playlist: [
    {
      title: "State of Grace",
      artist: "Taylor Swift",
      album: "Red",
      file: "assets/music/musica1.mp3",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/25/0d/7e/250d7e42-3a2f-19ac-f865-f1e04a4a1f97/12UMDIM01007.rgb.jpg/600x600bb.jpg",
      duration: "4:55",
    },
    {
      title: "Lover",
      artist: "Taylor Swift",
      album: "Lover",
      file: "assets/music/musica2.mp3",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/600x600bb.jpg",
      duration: "3:41",
    },
    {
      title: "Long Live",
      artist: "Taylor Swift",
      album: "Speak Now",
      file: "assets/music/musica3.mp3",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d4/23/57/d423579f-24f7-5c82-ed10-fbfd21ceef25/10UMDIM00487.rgb.jpg/600x600bb.jpg",
      duration: "5:17",
    },
    {
      title: "Te Vivo",
      artist: "Luan Santana",
      album: "Quando Chega a Noite (Ao Vivo)",
      file: "assets/music/musica4.mp3",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6e/84/2f/6e842fd2-38c3-171f-da8b-92effb82f9cf/dj.ofryewvd.jpg/600x600bb.jpg",
      duration: "3:12",
    },
    {
      title: "A Rua",
      artist: "Jão",
      album: "LOBOS (Deluxe)",
      file: "assets/music/musica5.mp3",
      cover: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b7/9b/81/b79b8138-b95e-bf0d-1e7c-92a28bbf71a1/19UMGIM02269.rgb.jpg/600x600bb.jpg",
      duration: "2:36",
    },
  ],

  /**
   * FOTOS: Adicione as fotos de vocês!
   * - file: caminho da imagem
   * - caption: texto/legenda da foto
   */
  photos: [
    { file: "assets/photos/photo1.png", caption: "Um momento especial 💕" },
    { file: "assets/photos/photo2.png", caption: "Juntos para sempre 🌅" },
    { file: "assets/photos/photo3.png", caption: "Nosso jantar especial 🕯️" },
    { file: "assets/photos/photo4.png", caption: "Risadas e amor 🌿" },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── STATE ───────────────────────────────────────────────────────────────────
let currentTrack = -1;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentSlide = 0;
let slideshowTimer = null;
let isLiked = false;

// ─── DOM REFS ──────────────────────────────────────────────────────────────────
const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleCtrl = document.getElementById("shuffle-ctrl");
const repeatBtn = document.getElementById("repeat-btn");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progress-fill");
const progressThumb = document.getElementById("progress-thumb");
const timeCurrent = document.getElementById("time-current");
const timeTotal = document.getElementById("time-total");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerAlbumArt = document.getElementById("player-album-art");
const volumeSlider = document.getElementById("volume-slider");
const volumeFill = document.getElementById("volume-fill");
const likeBtn = document.getElementById("like-btn");

// ─── INIT ─────────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("girlfriend-name").textContent = CONFIG.girlfriendName + " ✨";
  renderPlaylist();
  renderPhotos();
  renderMessage();
  buildFloatingHearts();
  audio.volume = 0.8;
});

// ─── INTRO SCREEN ─────────────────────────────────────────────────────────────
document.getElementById("enter-btn").addEventListener("click", () => {
  startConfetti();
  const introScreen = document.getElementById("intro-screen");
  introScreen.style.transition = "opacity 0.8s ease";
  introScreen.style.opacity = "0";
  setTimeout(() => {
    introScreen.style.display = "none";
    document.getElementById("main-app").style.display = "grid";
    document.getElementById("player-bar").style.display = "grid";
    document.getElementById("main-app").style.animation = "fadeInUp 0.6s ease";
  }, 800);
});

// ─── CONFETTI ─────────────────────────────────────────────────────────────────
function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const emojis = ["❤️", "💖", "🎂", "✨", "🎉", "💕", "🌹", "💗"];
  const colors = ["#e91e8c", "#f8b5c8", "#9c27b0", "#1ed760", "#fff"];

  for (let i = 0; i < 120; i++) {
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

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      if (p.y > canvas.height) { p.opacity -= 0.05; }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.emoji) {
        ctx.font = `${p.size * 1.8}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
    });

    frame++;
    if (frame < 200) requestAnimationFrame(animate);
  }
  animate();
}

// ─── RENDER PLAYLIST ─────────────────────────────────────────────────────────
function renderPlaylist() {
  const sidebarList = document.getElementById("sidebar-playlist");
  const homeList = document.getElementById("home-track-list");
  const fullList = document.getElementById("playlist-track-list");
  const count = document.getElementById("playlist-count");

  count.textContent = `${CONFIG.playlist.length} músicas`;

  CONFIG.playlist.forEach((track, i) => {
    sidebarList.appendChild(createSidebarTrack(track, i));
    homeList.appendChild(createHomeTrackItem(track, i));
    fullList.appendChild(createFullTrackItem(track, i));
  });
}

function createSidebarTrack(track, i) {
  const div = document.createElement("div");
  div.className = "sidebar-track";
  div.id = `sidebar-track-${i}`;
  div.onclick = () => playTrack(i);
  div.innerHTML = `
    <div class="sidebar-track-thumb">
      <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
    </div>
    <div class="sidebar-track-info">
      <p class="sidebar-track-name">${track.title}</p>
      <p class="sidebar-track-artist">${track.artist}</p>
    </div>
  `;
  return div;
}

function createHomeTrackItem(track, i) {
  const div = document.createElement("div");
  div.className = "track-item";
  div.id = `home-track-${i}`;
  div.onclick = () => playTrack(i);
  div.innerHTML = `
    <div class="track-num">
      <span class="track-num-text">${i + 1}</span>
      <div class="playing-wave">
        <span style="height:4px"></span><span style="height:8px"></span><span style="height:14px"></span><span style="height:6px"></span>
      </div>
    </div>
    <div class="track-info">
      <div class="track-art">${track.cover ? `<img src="${track.cover}" alt="" onerror="this.style.display='none'">` : ''}<svg viewBox="0 0 24 24" fill="white" width="16" height="16" style="position:absolute"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>
      <div class="track-texts">
        <p class="track-name">${track.title}</p>
        <p class="track-artist">${track.artist}</p>
      </div>
    </div>
    <span class="track-duration" id="home-dur-${i}">${track.duration}</span>
  `;
  return div;
}

function createFullTrackItem(track, i) {
  const div = document.createElement("div");
  div.className = "track-item";
  div.id = `full-track-${i}`;
  div.onclick = () => playTrack(i);
  div.innerHTML = `
    <div class="track-num">
      <span class="track-num-text">${i + 1}</span>
      <div class="playing-wave">
        <span style="height:4px"></span><span style="height:8px"></span><span style="height:14px"></span><span style="height:6px"></span>
      </div>
    </div>
    <div class="track-info">
      <div class="track-art" style="position:relative;">${track.cover ? `<img src="${track.cover}" alt="" onerror="this.style.display='none'">` : ''}<svg viewBox="0 0 24 24" fill="white" width="16" height="16" style="position:absolute"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>
      <div class="track-texts">
        <p class="track-name">${track.title}</p>
        <p class="track-artist">${track.artist}</p>
      </div>
    </div>
    <span class="track-album">${track.album}</span>
    <span class="track-duration" id="full-dur-${i}">${track.duration}</span>
  `;
  return div;
}

// ─── RENDER PHOTOS ────────────────────────────────────────────────────────────
function renderPhotos() {
  const slideshowTrack = document.getElementById("slideshow-track");
  const dotsContainer = document.getElementById("slide-dots");
  const grid = document.getElementById("photo-grid");

  CONFIG.photos.forEach((photo, i) => {
    // Slideshow slides
    const slide = document.createElement("div");
    slide.className = "slideshow-slide";
    slide.innerHTML = `
      <img src="${photo.file}" alt="${photo.caption}" onerror="this.parentElement.style.background='var(--gradient-love)'">
      <div class="slide-caption">${photo.caption}</div>
    `;
    slideshowTrack.appendChild(slide);

    // Dot
    const dot = document.createElement("button");
    dot.className = "slide-dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);

    // Grid thumb
    const thumb = document.createElement("div");
    thumb.className = "photo-thumb";
    thumb.onclick = () => { showSection("photos"); goToSlide(i); };
    thumb.innerHTML = `
      <img src="${photo.file}" alt="${photo.caption}" onerror="this.parentElement.style.background='var(--gradient-love)'">
      <div class="photo-overlay"></div>
    `;
    grid.appendChild(thumb);
  });

  startSlideshow();
}

function goToSlide(index) {
  currentSlide = index;
  document.getElementById("slideshow-track").style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll(".slide-dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function startSlideshow() {
  if (slideshowTimer) clearInterval(slideshowTimer);
  slideshowTimer = setInterval(() => {
    currentSlide = (currentSlide + 1) % CONFIG.photos.length;
    goToSlide(currentSlide);
  }, 4000);
}

document.getElementById("slide-prev").onclick = () => {
  currentSlide = (currentSlide - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  goToSlide(currentSlide);
  startSlideshow();
};

document.getElementById("slide-next").onclick = () => {
  currentSlide = (currentSlide + 1) % CONFIG.photos.length;
  goToSlide(currentSlide);
  startSlideshow();
};

// ─── RENDER MESSAGE ───────────────────────────────────────────────────────────
function renderMessage() {
  const body = document.getElementById("message-body");
  body.innerHTML = CONFIG.loveMessage.map(p => `<p>${p}</p>`).join("") +
    `<p class="message-signature">${CONFIG.loveSignature}</p>`;
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(`section-${name}`).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById(`nav-${name}`);
  if (btn) btn.classList.add("active");
  document.querySelector(".main-content").scrollTop = 0;
}

// ─── AUDIO PLAYER ────────────────────────────────────────────────────────────
function playTrack(index) {
  if (index < 0 || index >= CONFIG.playlist.length) return;

  const wasPlaying = currentTrack === index && isPlaying;

  // Deactivate previous
  if (currentTrack >= 0) {
    [`home-track-${currentTrack}`, `full-track-${currentTrack}`, `sidebar-track-${currentTrack}`]
      .forEach(id => document.getElementById(id)?.classList.remove("playing"));
  }

  currentTrack = index;
  const track = CONFIG.playlist[index];

  // Update player UI
  playerTitle.textContent = track.title;
  playerArtist.textContent = track.artist;

  // Album art
  playerAlbumArt.innerHTML = "";
  if (track.cover) {
    const img = document.createElement("img");
    img.src = track.cover;
    img.onerror = () => { playerAlbumArt.innerHTML = defaultMusicSvg(); };
    playerAlbumArt.appendChild(img);
  } else {
    playerAlbumArt.innerHTML = defaultMusicSvg();
  }

  // Activate new
  [`home-track-${index}`, `full-track-${index}`, `sidebar-track-${index}`]
    .forEach(id => document.getElementById(id)?.classList.add("playing"));

  // Load audio
  if (track.file) {
    audio.src = track.file;
    audio.load();
    audio.play().then(() => {
      isPlaying = true;
      updatePlayPauseUI();
    }).catch(() => {
      // File not found — still show UI as if playing
      isPlaying = true;
      updatePlayPauseUI();
      timeCurrent.textContent = "0:00";
      timeTotal.textContent = track.duration || "0:00";
    });
  }
}

function defaultMusicSvg() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
}

function togglePlayPause() {
  if (currentTrack < 0) {
    playTrack(0);
    return;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play().catch(() => { isPlaying = true; });
    isPlaying = true;
  }
  updatePlayPauseUI();
}

function updatePlayPauseUI() {
  playIcon.style.display = isPlaying ? "none" : "block";
  pauseIcon.style.display = isPlaying ? "block" : "none";
}

playPauseBtn.addEventListener("click", togglePlayPause);

prevBtn.addEventListener("click", () => {
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  let prev = currentTrack - 1;
  if (prev < 0) prev = CONFIG.playlist.length - 1;
  playTrack(prev);
});

nextBtn.addEventListener("click", () => {
  playNext();
});

function playNext() {
  if (isShuffle) {
    let rand = Math.floor(Math.random() * CONFIG.playlist.length);
    while (rand === currentTrack && CONFIG.playlist.length > 1) rand = Math.floor(Math.random() * CONFIG.playlist.length);
    playTrack(rand);
  } else {
    let next = currentTrack + 1;
    if (next >= CONFIG.playlist.length) next = 0;
    playTrack(next);
  }
}

shuffleCtrl.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleCtrl.classList.toggle("active", isShuffle);
  document.getElementById("shuffle-btn")?.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
  audio.loop = isRepeat;
});

likeBtn.addEventListener("click", () => {
  isLiked = !isLiked;
  likeBtn.classList.toggle("liked", isLiked);
  if (isLiked) burstHearts(likeBtn);
});

// Play buttons
document.getElementById("play-all-btn").addEventListener("click", () => { playTrack(0); });
document.getElementById("play-playlist-btn").addEventListener("click", () => { playTrack(0); });
document.getElementById("shuffle-btn").addEventListener("click", () => {
  isShuffle = true;
  shuffleCtrl.classList.add("active");
  document.getElementById("shuffle-btn").classList.add("active");
  const rand = Math.floor(Math.random() * CONFIG.playlist.length);
  playTrack(rand);
});

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + "%";
  progressThumb.style.left = pct + "%";
  timeCurrent.textContent = formatTime(audio.currentTime);
  timeTotal.textContent = formatTime(audio.duration);

  // Update sidebar duration
  if (currentTrack >= 0) {
    [`home-dur-${currentTrack}`, `full-dur-${currentTrack}`].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = formatTime(audio.duration);
    });
  }
});

audio.addEventListener("ended", () => {
  if (!isRepeat) playNext();
});

progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = pct * audio.duration;
});

// Progress drag
let dragging = false;
progressBar.addEventListener("mousedown", (e) => {
  dragging = true;
  seekTo(e);
});
document.addEventListener("mousemove", (e) => { if (dragging) seekTo(e); });
document.addEventListener("mouseup", () => { dragging = false; });

function seekTo(e) {
  const rect = progressBar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  progressFill.style.width = (pct * 100) + "%";
  progressThumb.style.left = (pct * 100) + "%";
  if (audio.duration) audio.currentTime = pct * audio.duration;
}

// ─── VOLUME ───────────────────────────────────────────────────────────────────
volumeSlider.addEventListener("click", (e) => {
  const rect = volumeSlider.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.volume = pct;
  volumeFill.style.width = (pct * 100) + "%";
});

document.getElementById("volume-btn").addEventListener("click", () => {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeFill.style.width = "0%";
  } else {
    audio.volume = 0.8;
    volumeFill.style.width = "80%";
  }
});

// ─── FLOATING HEARTS ─────────────────────────────────────────────────────────
function buildFloatingHearts() {
  const container = document.getElementById("floating-hearts");
  const hearts = ["❤️", "💖", "💕", "✨", "🎶"];
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.animationDuration = (Math.random() * 6 + 5) + "s";
    h.style.animationDelay = (Math.random() * 8) + "s";
    h.style.fontSize = (Math.random() * 16 + 12) + "px";
    container.appendChild(h);
  }
}

function burstHearts(el) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const h = document.createElement("div");
    h.textContent = "💖";
    h.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top}px;
      font-size: ${Math.random() * 14 + 12}px;
      pointer-events: none;
      z-index: 9999;
      animation: heartBurst 1s ease forwards;
      --dx: ${(Math.random() - 0.5) * 100}px;
      --dy: ${-(Math.random() * 80 + 40)}px;
    `;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}

// Add heart burst keyframe dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes heartBurst {
    from { transform: translate(0,0) scale(1); opacity: 1; }
    to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ─── UTILS ────────────────────────────────────────────────────────────────────
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
