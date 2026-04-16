# 🎂 Projeto Surpresa Manoela: Guia de Implementação Master

Este documento serve como a especificação detalhada da jornada interativa criada para a Manoela. Ele descreve as 4 partes fundamentais solicitadas e como cada uma foi tecnicamente abordada, servindo de base para futuras expansões (ex: via Claude).

---

## 📖 Visão Geral das 4 Partes

### 1. Spotify Wrapped Stories (Sincronização de Letras) 🎵
*   **Solicitação**: "Stories" no estilo retrospectiva do Spotify, mostrando a letra das músicas sincronizada, capa e um pop-up romântico.
*   **Implementação**:
    *   **Motor de Sincronização**: Uso de `setInterval` (500ms) que compara o `getCurrentTime()` da API do YouTube com um banco de dados de letras (`lyricsData`).
    *   **Visual**: Letras em fonte gigante, com destaque na linha atual (`active`) e desfoque nas demais (`blur`).
    *   **Pop-up Dinâmico**: Na música "Algum Ritmo", um componente `romantic-popup` aparece em um timestamp específico (15-25s) com a mensagem dedicada.

### 2. Transições & Experiência Multi-Plataforma 📸
*   **Solicitação**: Transições dinâmicas entre músicas, responsividade (Mobile, TV, PC) e feed estilo Instagram para fotos.
*   **Implementação**:
    *   **Transições**: CSS `transform` e `opacity` com curvas `cubic-bezier` para simular movimentos fluidos e orgânicos.
    *   **Responsividade**: Uso de `units` flexíveis (vh/vw) e media queries para garantir que o layout se adapte de telas pequenas até smart TVs.
    *   **Feed Instagram**: Uma cena específica (`scene-8`) que altera o fluxo de navegação para scroll vertical, contendo cards com fotos e campos de dedicatória (comentários).

### 3. Vlog Guide & Cards Kharina 3D 🗓️
*   **Solicitação**: Vídeo estilo Vlog/TikTok com o planejamento do dia e um mapa dinâmico/3D do Restaurante Kharina.
*   **Implementação**:
    *   **Video Container**: Um placeholder 9:16 otimizado para vídeos verticais gravados em celular.
    *   **Cards de Decisão**: Como o local ainda será escolhido, implementamos cards comparativos para **Kharina Batel** e **Kharina Cabral**.
    *   **Estética 3D**: Uso de `perspective` e `rotateY` no hover para dar profundidade de card colecionável às opções de restaurante.

### 4. Quiz da Barbie (Diamond Castle) 💎
*   **Solicitação**: Quiz "Qual filme da Barbie te representa?", que leva obrigatoriamente ao "Castelo de Diamante", com perguntas reais e áudio da dubladora.
*   **Implementação**:
    *   **Motor de Quiz**: Sistema de perguntas e respostas injetadas via JS.
    *   **Lógica de Resultado**: Embora as perguntas pareçam genuínas, a pontuação converge para o ID do Castelo de Diamante.
    *   **Final Master**: Disparo da função `playBarbieAudio()` ao fim do quiz, acionando o áudio `assets/barbie_audio.mp3` sincronizado com uma explosão de brilhos no tema Barbie Pink.

---

## 🛠️ Stack Técnica
- **Frontend**: HTML5 Semântico, Vanilla CSS (com variáveis para temas dinâmicos).
- **Lógica**: Vanilla JavaScript (sem frameworks externos para máxima portabilidade).
- **Mídia**: YouTube Iframe API (Áudio de alta qualidade nos bastidores).
- **Servidor**: Micro-servidor em Node.js (`serve.js`) incluído para evitar bloqueios de segurança do navegador (CORS).

---

## 🚀 Como Refinar (Prompt para Claude)
Se você for levar este projeto para o Claude, use o seguinte comando:
> "Claude, estou com as 4 partes fundamentais do projeto 'Surprise Manoela' implementadas. Quero que você refine a sincronização das letras no script.js e adicione mais interatividade aos cards 3D do Kharina, mantendo a estética premium e as transições de mola que já existem no estilo.css."
