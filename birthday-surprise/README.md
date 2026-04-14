# 🎂 LoveBeats — Surpresa de Aniversário

> Site estilo Spotify personalizado com player de música, galeria de fotos e carta de amor.

---

## 🗂️ Estrutura de Arquivos

```
birthday-surprise/
├── index.html          ← Página principal
├── style.css           ← Estilos (tema dark love)
├── script.js           ← Lógica + CONFIG personalização ← EDITE AQUI!
└── assets/
    ├── hero_bg.png     ← Imagem de fundo do banner
    ├── photos/         ← 📸 Coloque as fotos de vocês aqui!
    │   ├── photo1.png  (substitua pelas fotos reais)
    │   ├── photo2.png
    │   ├── photo3.png
    │   └── photo4.png
    └── music/          ← 🎵 Coloque as músicas aqui!
        ├── musica1.mp3
        ├── musica2.mp3
        └── ...
```

---

## ✏️ Como Personalizar

Abra o arquivo **`script.js`** e edite o objeto `CONFIG` no topo:

### 1. Nome da namorada
```js
girlfriendName: "Nome dela aqui",
```

### 2. Músicas
```js
playlist: [
  {
    title: "Nome da música",
    artist: "Nome do artista",
    album: "Nome do álbum",
    file: "assets/music/musica1.mp3",   // caminho do arquivo .mp3
    cover: "assets/photos/photo1.png",  // foto de capa (opcional)
    duration: "3:45",                   // duração (será lida automaticamente)
  },
  // ... adicione quantas quiser!
],
```

### 3. Fotos
```js
photos: [
  { file: "assets/photos/foto1.jpg", caption: "Nossa primeira viagem 💕" },
  { file: "assets/photos/foto2.jpg", caption: "Juntos para sempre 🌅" },
  // ...
],
```

### 4. Carta de amor
```js
loveMessage: [
  "Meu amor,",
  "Escreva aqui sua mensagem...",
  "Cada parágrafo é um item do array.",
],
loveSignature: "Com amor,<br><strong>Seu nome</strong>",
```

---

## 🚀 Como Abrir

Abra o arquivo `index.html` diretamente no navegador — **funciona sem servidor!**

> O player de música só funciona com arquivos `.mp3` reais na pasta `assets/music/`.

---

## 🎵 Formatos de áudio suportados
- `.mp3` ✅
- `.wav` ✅  
- `.ogg` ✅
- `.m4a` ✅

---

*Feito com ❤️ para a surpresa mais especial do ano.*
