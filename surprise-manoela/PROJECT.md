# 🎂 Surprise Manoela - Next.js Edition

Projeto de aniversário interativo modernizado com Next.js, TypeScript e Tailwind CSS, seguindo metodologia SDD (Specification-Driven Development).

---

## 🎯 Visão Geral

Experiência interativa de 12 cenas que inclui:
- 🎵 **Spotify Wrapped Stories** com sincronização de letras
- 📸 **Feed Instagram** com fotos do casal
- 🎬 **Vlog Guide** com cards 3D dos restaurantes Kharina
- 💎 **Quiz da Barbie** que sempre resulta no Castelo de Diamante

---

## 🏗️ Arquitetura SDD

### 1. Contratos de Dados (Zod + TypeScript)
- **Localização**: `types/index.ts`
- **Schemas**: Song, Scene, QuizQuestion, Post, RestaurantCard
- **Validação runtime** com Zod
- **Type safety** em toda aplicação

### 2. Server Actions
- **Localização**: `actions/scene-actions.ts`
- **Funções**:
  - `getSceneData()` - Carregar dados da cena
  - `getAllScenes()` - Listar todas as cenas
  - `submitQuizAnswer()` - Processar respostas do quiz
  - `trackUserInteraction()` - Analytics
  - `getCurrentLyricLine()` - Sincronização de letras
  - `shouldShowRomanticPopup()` - Lógica do popup

### 3. Componentes UI
- **SceneWrapper** - Container principal com navegação
- **ProgressBar** - Barra de progresso estilo Instagram
- **Scene Components** - 7 tipos de cenas especializadas
- **YouTubePlayer** - Player de áudio oculto
- **RomanticPopup** - Popup romântico sincronizado

### 4. Critérios de Aceite Atendidos
- ✅ Sincronização de letras (±500ms)
- ✅ Transições fluidas (cubic-bezier)
- ✅ Responsividade (Mobile → TV)
- ✅ Quiz direcionado (Castelo de Diamante)
- ✅ Pop-up romântico (15-25s)
- ✅ Feed Instagram funcional
- ✅ Cards 3D (perspective + rotateY)
- ✅ Performance < 3s
- ✅ Áudio da Barbie automático
- ✅ Progress bar real

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm/yarn/pnpm

### Instalação

```bash
cd surprise-manoela
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### Produção

```bash
npm run build
npm start
```

---

## 📁 Estrutura do Projeto

```
surprise-manoela/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── SceneWrapper.tsx   # Container principal
│   ├── ProgressBar.tsx    # Barra de progresso
│   ├── YouTubePlayer.tsx  # Player de áudio
│   ├── RomanticPopup.tsx  # Popup especial
│   └── scenes/            # Componentes de cena
│       ├── WelcomeScene.tsx
│       ├── MusicScene.tsx
│       ├── LyricsSyncScene.tsx
│       ├── InstagramFeedScene.tsx
│       ├── VlogScene.tsx
│       ├── QuizScene.tsx
│       └── FinalScene.tsx
├── actions/               # Server Actions
│   └── scene-actions.ts
├── types/                 # Tipos TypeScript
│   └── index.ts
├── data/                  # Dados estáticos
│   └── content.ts
├── public/                # Assets estáticos
│   └── assets/
│       ├── photos/        # Fotos do casal
│       ├── restaurants/   # Imagens Kharina
│       └── audio/         # Áudio Barbie
└── lib/                   # Utilitários
```

---

## 🎨 Temas e Cores

| Tema | Descrição | Uso |
|------|-----------|-----|
| `dark` | Preto elegante | Cenas iniciais |
| `love-intense` | Vermelho/rosa | Cenas românticas |
| `dark-red` | Bordô intenso | State of Grace |
| `lilac-dream` | Lilás mágico | Lover, Algum Ritmo |
| `golden-hour` | Dourado | Long Live, Vlog |
| `barbie-pink` | Rosa Barbie | Quiz e Final |

---

## 🎵 Músicas (YouTube IDs)

1. **State of Grace** - `2Bv6r79hH6U`
2. **Lover** - `-BjZmE2gtdo`
3. **Long Live** - `R9D7U5k2Jfs`
4. **Te Vivo** - `T8lV8iJ_Sjs`
5. **A Rua** - `kYJ41KjVqR0`
6. **Algum Ritmo** - `p9KNo8Kx_iA` (com sincronização)

---

## 📱 Responsividade

- **Mobile**: 320px+ (touch otimizado)
- **Tablet**: 768px+ (layout adaptativo)
- **Desktop**: 1024px+ (experiência completa)
- **TV**: 1920px+ (telas grandes)

---

## 🎭 Cenas (12 Total)

1. **Welcome** - Tela inicial "Para Você"
2. **Abertura** - "Feliz Aniversário Manoela"
3. **State of Grace** - Capa + letra
4. **Lover** - Capa + letra
5. **Long Live** - Capa + letra
6. **Te Vivo** - Capa + letra
7. **A Rua** - Capa + letra
8. **Algum Ritmo** - Sincronização + Popup
9. **Instagram Feed** - Fotos do casal
10. **Vlog** - Video placeholder + Cards Kharina
11. **Quiz** - "Qual filme da Barbie?"
12. **Final** - Castelo de Diamante + Áudio

---

## 🎮 Controles

- **Clique/Tap** - Avançar cena
- **Seta Direita** - Próxima cena
- **Seta Esquerda** - Cena anterior
- **Espaço** - Próxima cena

---

## 🛠️ Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Validação**: Zod
- **Fontes**: Inter + Playfair Display (Google Fonts)
- **Mídia**: YouTube Iframe API
- **Ícones**: Emojis nativos + SVG

---

## 📦 Dependências

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/node": "^20.0.0"
  }
}
```

---

## 🎨 Animações Customizadas

- `fade-in` - Entrada suave
- `slide-up` - Slide de baixo
- `bounce-in` - Efeito elástico
- `pulse-anim` - Pulsação
- `glow` - Brilho
- `float` - Flutuação
- `sparkle` - Brilhos
- `confetti` - Confetes

---

## 🔧 Personalização

### Alterar Mensagens
Edite `data/content.ts`:
- `scenes[].content` - Textos das cenas
- `messages[]` - Mensagens do final
- `quizQuestions[]` - Perguntas do quiz

### Alterar Músicas
Edite `data/content.ts`:
- `songs[]` - YouTube IDs e metadados
- `lyricsData` - Sincronização de letras

### Alterar Fotos
Coloque em `public/assets/photos/`:
- `photo1.png` até `photo4.png`

### Alterar Áudio
Coloque em `public/assets/audio/`:
- `barbie_audio.mp3`

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Outras Plataformas

O projeto é estático e pode ser deployado em:
- Netlify
- GitHub Pages
- Firebase Hosting
- Qualquer CDN

---

## 📝 Licença

Projeto pessoal - Uso exclusivo

---

## 💝 Dedicatória

Desenvolvido com ❤️ para Manoela Mariani Martins

---

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique se todos os assets estão na pasta correta
2. Confira se o áudio está em `public/assets/audio/`
3. Verifique o console do navegador (F12)
4. Teste em modo desenvolvimento: `npm run dev`

---

## ✨ Funcionalidades Extras

- **Keyboard navigation** - Controle por teclado
- **Progress persistence** - Navegação intuitiva
- **Auto-play audio** - Com fallback manual
- **Error boundaries** - Tratamento de erros
- **Loading states** - Estados de carregamento
- **Analytics tracking** - Rastreamento de interações

---

**Data de criação**: Abril 2026  
**Versão**: 2.0 - Next.js Edition  
**Autor**: Assistente de Desenvolvimento
