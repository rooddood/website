import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './NeoArcade.css';

// ============================================================================
// SAMPLE AI-GENERATED HTML DEMO GAME (Supports EASY / MEDIUM / HARD)
// ============================================================================
const buildDodgerHtml = (diff = 'MEDIUM') => {
  const spawnRate = diff === 'EASY' ? 0.05 : diff === 'HARD' ? 0.13 : 0.085;
  const baseSpeed = diff === 'EASY' ? 2.2 : diff === 'HARD' ? 5.2 : 3.5;
  const hitAllowance = diff === 'EASY' ? 9 : 12;
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Star Dodger</title>
<style>
  body { margin: 0; background: #05070e; color: #00e676; font-family: sans-serif; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; user-select: none; }
  canvas { border: 2px solid #00c8ff; border-radius: 10px; background: #080b14; max-width: 96%; max-height: 85%; }
  .hud { margin-bottom: 6px; font-size: 15px; font-weight: bold; display: flex; gap: 20px; color: #fff; }
</style>
</head>
<body>
  <div class="hud">
    <span style="color:#ffd60a">STAR DODGER (${diff})</span>
    <span id="score">SCORE: 0</span>
    <span style="color:#9eb0d2">Mouse or Arrows</span>
  </div>
  <canvas id="c" width="680" height="400"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let px = 340, score = 0, alive = true, meteors = [], keys = {};
    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup', e => keys[e.key] = false);
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      px = (e.clientX - r.left) * (canvas.width / r.width);
    });
    canvas.addEventListener('click', () => {
      if (!alive) { alive = true; score = 0; meteors = []; }
    });
    function loop() {
      ctx.fillStyle = '#080b14';
      ctx.fillRect(0, 0, 680, 400);
      if (alive) {
        if (keys['ArrowLeft'] || keys['a']) px -= 7.5;
        if (keys['ArrowRight'] || keys['d']) px += 7.5;
        px = Math.max(20, Math.min(660, px));
        if (Math.random() < ${spawnRate}) meteors.push({ x: Math.random() * 640 + 20, y: -10, r: 9 + Math.random() * 11, vy: ${baseSpeed} + Math.random() * 3.5 });
        score++;
        document.getElementById('score').textContent = 'SCORE: ' + score;
      }
      ctx.fillStyle = '#00e676';
      ctx.beginPath();
      ctx.moveTo(px, 355); ctx.lineTo(px - 15, 385); ctx.lineTo(px + 15, 385);
      ctx.fill();
      ctx.fillStyle = '#ff2a85';
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (alive) m.y += m.vy;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2); ctx.fill();
        if (alive && Math.hypot(m.x - px, m.y - 370) < m.r + ${hitAllowance}) {
          alive = false;
          window.parent.postMessage({ type: 'NEO_ARCADE_SCORE', score }, '*');
        }
        if (m.y > 420) meteors.splice(i, 1);
      }
      if (!alive) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCORE: ' + score + ' (Click to Retry)', 340, 200);
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
};

const SAMPLE_DODGER_HTML = buildDodgerHtml('MEDIUM');

// ============================================================================
// GAMES CATALOG WITH TAGS
// ============================================================================
const ALL_TAGS = ['ALL', '#3D', '#ACTION', '#2P', '#ARCADE', '#AI'];

const BUILTIN_GAMES = [
  {
    id: 'hotdog',
    title: '3D Hot Dog Ninja',
    tags: ['#3D', '#ACTION', '#ARCADE'],
    supports2P: false
  },
  {
    id: 'stickman',
    title: 'Stickman Brawl',
    tags: ['#ACTION', '#2P'],
    supports2P: true
  },
  {
    id: 'tanks',
    title: 'Tank Battle Royale',
    tags: ['#ACTION', '#2P'],
    supports2P: true
  },
  {
    id: 'pinball',
    title: 'Cyber Pinball',
    tags: ['#ARCADE'],
    supports2P: false
  },
  {
    id: 'snake',
    title: 'Neon Snake Race',
    tags: ['#ARCADE', '#2P'],
    supports2P: true
  },
  {
    id: 'dodger',
    title: 'Star Dodger Demo',
    tags: ['#AI', '#ARCADE'],
    supports2P: false,
    isCustom: true,
    htmlContent: SAMPLE_DODGER_HTML
  }
];

const DEFAULT_CSV_TEXT = `game,player,score
hotdog,GLIZZY_GOD,1850
hotdog,MUSTARD_KING,1240
hotdog,KYLE,920
stickman,BLOX_NINJA,1200
stickman,VICTORY_ROYALE,950
stickman,KYLE,700
tanks,TANK_BOSS,1600
tanks,BLASTER_99,1100
tanks,KYLE,800
pinball,PIXEL_KING,4250
pinball,NEON_FOX,3100
pinball,KYLE,2400
snake,SPEED_VIPER,950
snake,GLITCH_KID,650
snake,KYLE,450
dodger,STAR_PILOT,1420
dodger,ASTRO_KID,890`;

const KID_AI_PROMPT = `Make me a single-file HTML5 game! Put all HTML, CSS, and JS in one file using a 720x460 canvas. On Game Over, send the score with: window.parent.postMessage({ type: 'NEO_ARCADE_SCORE', score: finalScore }, '*');`;

// ============================================================================
// ACTUAL VISUAL GAME PREVIEW ARTWORK (NO EMOJIS)
// ============================================================================
const GamePreviewThumb = ({ gameId }) => {
  if (gameId === 'hotdog') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#090d1a" />
          {/* 3D Bun & Sausage */}
          <g transform="translate(40,28) rotate(-18)">
            <rect x="-24" y="-9" width="48" height="18" rx="9" fill="#d97706" />
            <rect x="-28" y="-5" width="56" height="10" rx="5" fill="#b91c1c" />
            <path d="M-20,0 Q-10,-5 0,0 T20,0" stroke="#ffd60a" strokeWidth="2.5" fill="none" />
          </g>
          {/* Glowing Katana Slash */}
          <line x1="10" y1="46" x2="70" y2="8" stroke="#00e5ff" strokeWidth="3" />
          <circle cx="52" cy="16" r="2.5" fill="#ffd60a" />
          <circle cx="28" cy="38" r="2" fill="#ef4444" />
        </svg>
      </div>
    );
  }
  if (gameId === 'stickman') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#090d1a" />
          <rect x="10" y="42" width="60" height="4" fill="#00e5ff" />
          {/* Green Stickman */}
          <circle cx="26" cy="20" r="4.5" stroke="#00e676" strokeWidth="2.2" fill="none" />
          <line x1="26" y1="25" x2="26" y2="35" stroke="#00e676" strokeWidth="2.2" />
          <line x1="26" y1="28" x2="37" y2="25" stroke="#00e676" strokeWidth="2.2" />
          <line x1="26" y1="35" x2="21" y2="42" stroke="#00e676" strokeWidth="2.2" />
          <line x1="26" y1="35" x2="31" y2="42" stroke="#00e676" strokeWidth="2.2" />
          {/* Pink Stickman */}
          <circle cx="54" cy="20" r="4.5" stroke="#ff2a85" strokeWidth="2.2" fill="none" />
          <line x1="54" y1="25" x2="54" y2="35" stroke="#ff2a85" strokeWidth="2.2" />
          <line x1="54" y1="28" x2="43" y2="25" stroke="#ff2a85" strokeWidth="2.2" />
          <line x1="54" y1="35" x2="49" y2="42" stroke="#ff2a85" strokeWidth="2.2" />
          <line x1="54" y1="35" x2="59" y2="42" stroke="#ff2a85" strokeWidth="2.2" />
        </svg>
      </div>
    );
  }
  if (gameId === 'tanks') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#090d1a" />
          <rect x="37" y="14" width="6" height="26" fill="#1e293b" stroke="#00e5ff" strokeWidth="1" />
          <rect x="10" y="21" width="14" height="12" rx="2" fill="#00e676" />
          <rect x="20" y="25" width="9" height="4" fill="#fff" />
          <rect x="56" y="21" width="14" height="12" rx="2" fill="#ff2a85" />
          <rect x="51" y="25" width="9" height="4" fill="#fff" />
          <circle cx="32" cy="27" r="2.5" fill="#ffd60a" />
        </svg>
      </div>
    );
  }
  if (gameId === 'pinball') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#090d1a" />
          <circle cx="26" cy="16" r="6" fill="#00e5ff" />
          <circle cx="54" cy="16" r="6" fill="#ff2a85" />
          <circle cx="40" cy="25" r="7" fill="#ffd60a" />
          <circle cx="44" cy="36" r="3.5" fill="#fff" />
          <line x1="20" y1="46" x2="35" y2="41" stroke="#00e676" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="60" y1="46" x2="45" y2="41" stroke="#00e676" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (gameId === 'snake') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#090d1a" />
          <polyline points="12,38 28,38 28,20 46,20" fill="none" stroke="#00e676" strokeWidth="5" strokeLinecap="square" />
          <polyline points="68,14 54,14 54,36" fill="none" stroke="#ff2a85" strokeWidth="5" strokeLinecap="square" />
          <rect x="38" y="32" width="6" height="6" fill="#ffd60a" />
        </svg>
      </div>
    );
  }
  return (
    <div className="game-preview-thumb">
      <svg viewBox="0 0 80 54">
        <rect width="80" height="54" fill="#090d1a" />
        <polygon points="40,34 32,46 48,46" fill="#00e676" />
        <circle cx="24" cy="16" r="5" fill="#ff2a85" />
        <circle cx="55" cy="22" r="6" fill="#ff2a85" />
        <circle cx="40" cy="12" r="4" fill="#ffd60a" />
      </svg>
    </div>
  );
};

// Parse/Format CSV helpers
function parseScoresCsv(csvText) {
  if (!csvText) return [];
  return csvText
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map(line => {
      const [game, player, score] = line.split(',');
      return { game: (game || '').trim(), player: (player || 'P1').trim(), score: parseInt(score, 10) || 0 };
    })
    .filter(r => r.game && r.score > 0);
}

function rowsToCsv(rows) {
  return ['game,player,score', ...rows.map(r => `${r.game},${r.player.replace(/,/g, '')},${r.score}`)].join('\n');
}

// ============================================================================
// 3D HOT DOG RENDERER HELPER (Draws Whole or Sliced 3D Hot Dogs on Canvas)
// ============================================================================
function draw3DHotDog(ctx, item) {
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.rotate(item.angle);
  const s = item.scale || 1;
  ctx.scale(s, s);

  if (item.isBomb) {
    // 3D Spiky Grill Bomb
    const grad = ctx.createRadialGradient(-8, -8, 3, 0, 0, 26);
    grad.addColorStop(0, '#64748b');
    grad.addColorStop(0.6, '#1e293b');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ff2a85';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Burning Fuse + Spark
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(14, -14);
    ctx.quadraticCurveTo(24, -26, 30, -20);
    ctx.stroke();

    ctx.fillStyle = Math.random() > 0.5 ? '#ffd60a' : '#ff2a85';
    ctx.beginPath();
    ctx.arc(30, -20, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  // If it's a sliced half-hot-dog, clip to left or right half
  const half = item.half; // 0 = whole, -1 = left half, 1 = right half
  if (half === -1) {
    ctx.beginPath();
    ctx.rect(-65, -40, 65, 80);
    ctx.clip();
  } else if (half === 1) {
    ctx.beginPath();
    ctx.rect(0, -40, 65, 80);
    ctx.clip();
  }

  // 3D Drop Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.roundRect(-42, -14, 84, 34, 16);
  ctx.fill();

  // Bottom 3D Toasted Bun Cushion
  const bunBottomGrad = ctx.createLinearGradient(0, -18, 0, 18);
  bunBottomGrad.addColorStop(0, '#fbbf24');
  bunBottomGrad.addColorStop(0.5, '#d97706');
  bunBottomGrad.addColorStop(1, '#78350f');
  ctx.fillStyle = bunBottomGrad;
  ctx.beginPath();
  ctx.roundRect(-42, -16, 84, 32, 15);
  ctx.fill();

  // 3D Glossy Sausage Link (sticks out both ends of the bun)
  const meatGrad = ctx.createLinearGradient(0, -12, 0, 12);
  meatGrad.addColorStop(0, '#f87171');
  meatGrad.addColorStop(0.35, '#dc2626');
  meatGrad.addColorStop(0.8, '#991b1b');
  meatGrad.addColorStop(1, '#450a0a');
  ctx.fillStyle = meatGrad;
  ctx.beginPath();
  ctx.roundRect(-54, -10, 108, 20, 10);
  ctx.fill();

  // 3D Specular Highlight on Sausage
  ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
  ctx.beginPath();
  ctx.roundRect(-46, -7, 92, 5, 3);
  ctx.fill();

  // Wavy Yellow Mustard + Red Ketchup Squiggle
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  for (let x = -38; x <= 38; x += 4) {
    const y = Math.sin(x * 0.28) * 4.5;
    if (x === -38) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Top Bun Rim Overlap for 3D Depth
  const bunTopGrad = ctx.createLinearGradient(0, 4, 0, 18);
  bunTopGrad.addColorStop(0, '#f59e0b');
  bunTopGrad.addColorStop(1, '#92400e');
  ctx.fillStyle = bunTopGrad;
  ctx.beginPath();
  ctx.roundRect(-40, 5, 80, 11, 6);
  ctx.fill();

  // If sliced, draw the 3D cross-section meat cut face at x=0!
  if (half !== 0) {
    ctx.fillStyle = '#fca5a5';
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

const NeoArcade = () => {
  const location = useLocation();

  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedGameId, setSelectedGameId] = useState('hotdog');
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [mode, setMode] = useState('1P');
  const [difficulty, setDifficulty] = useState('MEDIUM'); // 'EASY' | 'MEDIUM' | 'HARD'
  const [restartKey, setRestartKey] = useState(0);
  const [toast, setToast] = useState('');

  // Live visual state for keyboard keycaps on the bottom arcade deck
  const [pressedUI, setPressedUI] = useState({});

  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('neo_player_name') || 'PLAYER_1';
  });

  const [uploadedGames, setUploadedGames] = useState(() => {
    try {
      const saved = localStorage.getItem('neo_uploaded_games_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [scoreRows, setScoreRows] = useState(() => {
    const savedCsv = localStorage.getItem('neo_highscores_csv');
    return parseScoresCsv(savedCsv || DEFAULT_CSV_TEXT);
  });

  // Upload inputs
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameHtml, setNewGameHtml] = useState('');

  const canvasRef = useRef(null);
  // Shared virtual input state so the bottom Arcade Deck Joystick & Buttons control the games too!
  const virtualKeysRef = useRef({});

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Load URL parameters (`?game=...&mode=...`) so shared links jump right in
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sharedGame = params.get('game');
    const sharedMode = params.get('mode');
    const sharedDiff = params.get('diff');
    const sharedTitle = params.get('title');
    const sharedCode = params.get('code');

    if (sharedCode) {
      try {
        const decodedHtml = decodeURIComponent(escape(atob(sharedCode)));
        const sharedId = `shared-${Date.now()}`;
        const customObj = {
          id: sharedId,
          title: sharedTitle || 'Shared Game',
          tags: ['#AI'],
          isCustom: true,
          htmlContent: decodedHtml
        };
        setUploadedGames(prev => [customObj, ...prev]);
        setSelectedGameId(sharedId);
        setShowUploadScreen(false);
        return;
      } catch {}
    }
    if (sharedGame) {
      setSelectedGameId(sharedGame);
      setShowUploadScreen(false);
    }
    if (sharedMode === '2P' || sharedMode === '1P') {
      setMode(sharedMode);
    }
    if (['EASY', 'MEDIUM', 'HARD'].includes(sharedDiff)) {
      setDifficulty(sharedDiff);
    }
  }, [location.search]);

  useEffect(() => {
    localStorage.setItem('neo_player_name', playerName);
  }, [playerName]);

  useEffect(() => {
    try {
      localStorage.setItem('neo_uploaded_games_v2', JSON.stringify(uploadedGames));
    } catch {}
  }, [uploadedGames]);

  const addHighScore = useCallback((gameId, rawScore) => {
    const cleanScore = Math.floor(Number(rawScore) || 0);
    if (cleanScore <= 0) return;
    const cleanPlayer = (playerName || 'P1').trim().toUpperCase();
    setScoreRows(prev => {
      const updated = [...prev, { game: gameId, player: cleanPlayer, score: cleanScore }];
      localStorage.setItem('neo_highscores_csv', rowsToCsv(updated));
      return updated;
    });
  }, [playerName]);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.data && e.data.type === 'NEO_ARCADE_SCORE' && typeof e.data.score === 'number') {
        addHighScore(selectedGameId, e.data.score);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [selectedGameId, addHighScore]);

  const allGames = [...BUILTIN_GAMES, ...uploadedGames];
  const filteredGames = selectedTag === 'ALL'
    ? allGames
    : allGames.filter(g => (g.tags || []).includes(selectedTag));

  const activeGame = allGames.find(g => g.id === selectedGameId) || BUILTIN_GAMES[0];

  const activeGameScores = scoreRows
    .filter(r => r.game === activeGame.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Cycle games via Arcade Cabinet Deck buttons
  const cycleGame = (dir) => {
    setShowUploadScreen(false);
    const idx = allGames.findIndex(g => g.id === activeGame.id);
    const nextIdx = (idx + dir + allGames.length) % allGames.length;
    setSelectedGameId(allGames[nextIdx].id);
  };

  // Share Game Link
  const handleShareGame = (gameToShare = activeGame) => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let shareUrl = `${baseUrl}?game=${encodeURIComponent(gameToShare.id)}&mode=${mode}&diff=${difficulty}`;
    if (gameToShare.isCustom && gameToShare.id !== 'dodger' && gameToShare.htmlContent && gameToShare.htmlContent.length < 12000) {
      try {
        const b64 = btoa(unescape(encodeURIComponent(gameToShare.htmlContent)));
        shareUrl = `${baseUrl}?title=${encodeURIComponent(gameToShare.title)}&code=${encodeURIComponent(b64)}`;
      } catch {}
    }
    navigator.clipboard?.writeText(shareUrl);
    triggerToast(`🔗 Link Copied for ${gameToShare.title}!`);
  };

  const handleDownloadCsv = () => {
    const blob = new Blob([rowsToCsv(scoreRows)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'highscores.csv';
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('📥 Saved highscores.csv');
  };

  // Helper to press virtual arcade deck keyboard keycaps
  const holdVirtualKey = (key, isDown) => {
    const k = key.toLowerCase();
    virtualKeysRef.current[key] = isDown;
    virtualKeysRef.current[k] = isDown;
    setPressedUI(prev => ({ ...prev, [k]: isDown }));
  };

  // Dynamic labels for the keyboard deck based on active game
  const getDeckLabels = () => {
    if (selectedGameId === 'hotdog') {
      return {
        wasdCaption: 'WASD / ARROWS: SLASH ZONES',
        wSub: 'TOP',
        aSub: 'LEFT',
        sSub: 'LOW',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — SPIN SLASH!',
        showMouse: true
      };
    }
    if (selectedGameId === 'pinball') {
      return {
        wasdCaption: 'A / D or ◄ / ►: FLIPPERS',
        wSub: 'BUMP',
        aSub: 'FLIP L',
        sSub: 'PULL',
        dSub: 'FLIP R',
        spaceLabel: 'SPACE — LAUNCH BALL!',
        showMouse: false
      };
    }
    if (selectedGameId === 'stickman') {
      return {
        wasdCaption: mode === '2P' ? 'P1: WASD MOVE & JUMP' : 'WASD / ARROWS: MOVE & JUMP',
        wSub: 'JUMP',
        aSub: 'LEFT',
        sSub: 'DROP',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — PUNCH / HIT!',
        showMouse: false
      };
    }
    if (selectedGameId === 'tanks') {
      return {
        wasdCaption: mode === '2P' ? 'P1: WASD DRIVE' : 'WASD / ARROWS: DRIVE TANK',
        wSub: 'UP',
        aSub: 'LEFT',
        sSub: 'DOWN',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — FIRE SHELL!',
        showMouse: false
      };
    }
    if (selectedGameId === 'snake') {
      return {
        wasdCaption: mode === '2P' ? 'P1: WASD TURN' : 'WASD / ARROWS: STEER SNAKE',
        wSub: 'UP',
        aSub: 'LEFT',
        sSub: 'DOWN',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — RESTART',
        showMouse: false
      };
    }
    return {
      wasdCaption: 'KEYBOARD / MOUSE CONTROLS',
      wSub: 'UP',
      aSub: 'LEFT',
      sSub: 'DOWN',
      dSub: 'RIGHT',
      spaceLabel: 'SPACE — ACTION',
      showMouse: true
    };
  };

  const deckLabels = getDeckLabels();

  // ============================================================================
  // MAIN CANVAS GAME ENGINES
  // ============================================================================
  useEffect(() => {
    if (showUploadScreen || activeGame.isCustom) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId = null;
    const keys = {};

    const isPressed = (k) => Boolean(keys[k] || virtualKeysRef.current[k]);

    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      const k = e.key.toLowerCase();
      keys[e.key] = true;
      keys[k] = true;
      setPressedUI(prev => (prev[k] ? prev : { ...prev, [k]: true }));
    };

    const onKeyUp = (e) => {
      const k = e.key.toLowerCase();
      keys[e.key] = false;
      keys[k] = false;
      setPressedUI(prev => (!prev[k] ? prev : { ...prev, [k]: false }));
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const scoreMult = difficulty === 'HARD' ? 1.5 : difficulty === 'MEDIUM' ? 1.25 : 1;

    // ==========================================================================
    // 1. 3D HOT DOG NINJA (Fruit Ninja with 3D Shaded Hot Dogs!)
    // ==========================================================================
    if (selectedGameId === 'hotdog') {
      const W = 760, H = 480;
      let score = 0;
      let misses = 0;
      const maxMisses = difficulty === 'EASY' ? 5 : 3;
      const spawnInterval = difficulty === 'EASY' ? 56 : difficulty === 'HARD' ? 30 : 44;
      const bombChance = difficulty === 'EASY' ? 0.06 : difficulty === 'HARD' ? 0.25 : 0.14;
      const grav = difficulty === 'EASY' ? 0.2 : difficulty === 'HARD' ? 0.31 : 0.25;
      let gameOver = false;
      let spawnTimer = 0;

      const hotdogs = [];
      const halves = [];
      const splatters = [];
      const bladeTrail = [];
      let pointer = { x: W / 2, y: H / 2, down: false };

      const getCanvasPos = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        return {
          x: (clientX - rect.left) * (W / rect.width),
          y: (clientY - rect.top) * (H / rect.height)
        };
      };

      const sliceAt = (px, py) => {
        bladeTrail.push({ x: px, y: py, life: 12 });
        if (gameOver) return;

        for (let i = hotdogs.length - 1; i >= 0; i--) {
          const hd = hotdogs[i];
          const hitRadius = hd.isBomb ? 32 : 46 * hd.scale;
          if (Math.hypot(hd.x - px, hd.y - py) < hitRadius) {
            if (hd.isBomb) {
              // Bomb Exploded!
              gameOver = true;
              addHighScore('hotdog', score);
              for (let s = 0; s < 35; s++) {
                splatters.push({
                  x: hd.x,
                  y: hd.y,
                  vx: (Math.random() - 0.5) * 16,
                  vy: (Math.random() - 0.5) * 16,
                  r: 4 + Math.random() * 6,
                  color: s % 2 === 0 ? '#ff2a85' : '#ffd60a',
                  life: 40
                });
              }
              return;
            }

            // Slice 3D Hot Dog into 2 rotating 3D halves!
            score += Math.round(50 * scoreMult);
            halves.push(
              {
                x: hd.x - 12,
                y: hd.y,
                vx: hd.vx - 3.5,
                vy: hd.vy - 2,
                angle: hd.angle,
                vAngle: -0.09,
                scale: hd.scale,
                half: -1
              },
              {
                x: hd.x + 12,
                y: hd.y,
                vx: hd.vx + 3.5,
                vy: hd.vy - 2,
                angle: hd.angle,
                vAngle: 0.09,
                scale: hd.scale,
                half: 1
              }
            );

            // Ketchup & Mustard Splatter Particles
            for (let s = 0; s < 16; s++) {
              splatters.push({
                x: hd.x,
                y: hd.y,
                vx: (Math.random() - 0.5) * 11,
                vy: (Math.random() - 0.5) * 11,
                r: 3 + Math.random() * 5,
                color: s % 2 === 0 ? '#fde047' : '#ef4444',
                life: 32
              });
            }

            hotdogs.splice(i, 1);
          }
        }
      };

      const onMouseMove = (e) => {
        const pos = getCanvasPos(e.clientX, e.clientY);
        pointer.x = pos.x;
        pointer.y = pos.y;
        sliceAt(pos.x, pos.y);
      };

      const onTouchMove = (e) => {
        if (e.touches.length > 0) {
          const pos = getCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
          sliceAt(pos.x, pos.y);
        }
      };

      const onClick = () => {
        if (gameOver) {
          score = 0;
          misses = 0;
          hotdogs.length = 0;
          halves.length = 0;
          splatters.length = 0;
          gameOver = false;
        }
      };

      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('touchmove', onTouchMove);
      canvas.addEventListener('mousedown', onClick);

      const loop = () => {
        // Dojo Wood / Cyber Grill Backdrop
        const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 460);
        bgGrad.addColorStop(0, '#161f38');
        bgGrad.addColorStop(1, '#060913');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        if (!gameOver) {
          // Keyboard Zone & Spin Slash support so playing with WASD / Arrows / Space is super easy!
          const sweepSlash = (cx, cy, radius) => {
            const ang = Date.now() * 0.032;
            const sx = cx + Math.cos(ang) * radius;
            const sy = cy + Math.sin(ang) * (radius * 0.6);
            sliceAt(sx, sy);
          };
          if (isPressed('a') || isPressed('arrowleft')) sweepSlash(210, 250, 130);
          if (isPressed('d') || isPressed('arrowright')) sweepSlash(550, 250, 130);
          if (isPressed('w') || isPressed('arrowup')) sweepSlash(380, 155, 150);
          if (isPressed('s') || isPressed('arrowdown')) sweepSlash(380, 330, 150);
          if (isPressed(' ') || isPressed('f')) {
            // Smart katana slash: slices nearest non-bomb hot dog or spins wide arc!
            const targetDog = hotdogs.find(h => !h.isBomb && h.y < H - 20);
            if (targetDog) {
              bladeTrail.push({ x: targetDog.x - 45, y: targetDog.y + 25, life: 10 });
              sliceAt(targetDog.x, targetDog.y);
            } else {
              sweepSlash(W / 2, H / 2, 160);
            }
          }

          spawnTimer++;
          if (spawnTimer % spawnInterval === 0) {
            const count = difficulty === 'HARD' && Math.random() < 0.45 ? 3 : Math.random() < 0.35 ? 2 : 1;
            for (let c = 0; c < count; c++) {
              const startX = 120 + Math.random() * (W - 240);
              const isBomb = Math.random() < bombChance;
              hotdogs.push({
                x: startX,
                y: H + 40,
                vx: (W / 2 - startX) * 0.012 + (Math.random() - 0.5) * 2.5,
                vy: -(11.2 + grav * 8) - Math.random() * 2.8,
                angle: Math.random() * Math.PI * 2,
                vAngle: (Math.random() - 0.5) * 0.06,
                scale: 0.9,
                vScale: 0.004,
                half: 0,
                isBomb
              });
            }
          }
        } else if (isPressed(' ') || isPressed('r')) {
          score = 0;
          misses = 0;
          hotdogs.length = 0;
          halves.length = 0;
          splatters.length = 0;
          gameOver = false;
        }

        // Splatters on background
        for (let i = splatters.length - 1; i >= 0; i--) {
          const sp = splatters[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vx *= 0.92;
          sp.vy *= 0.92;
          sp.life--;
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.life / 35);
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          if (sp.life <= 0) splatters.splice(i, 1);
        }

        // Update & Draw Whole 3D Hot Dogs
        for (let i = hotdogs.length - 1; i >= 0; i--) {
          const hd = hotdogs[i];
          if (!gameOver) {
            hd.vy += grav;
            hd.x += hd.vx;
            hd.y += hd.vy;
            hd.angle += hd.vAngle;
            hd.scale = Math.min(1.28, hd.scale + hd.vScale);
          }
          draw3DHotDog(ctx, hd);

          if (hd.y > H + 70 && hd.vy > 0) {
            if (!hd.isBomb && !gameOver) {
              misses++;
              if (misses >= maxMisses) {
                gameOver = true;
                addHighScore('hotdog', score);
              }
            }
            hotdogs.splice(i, 1);
          }
        }

        // Update & Draw Sliced 3D Half Hot Dogs
        for (let i = halves.length - 1; i >= 0; i--) {
          const hf = halves[i];
          hf.vy += 0.32;
          hf.x += hf.vx;
          hf.y += hf.vy;
          hf.angle += hf.vAngle;
          draw3DHotDog(ctx, hf);
          if (hf.y > H + 80) halves.splice(i, 1);
        }

        // Glowing Katana Blade Trail
        if (bladeTrail.length > 1) {
          ctx.save();
          for (let i = 1; i < bladeTrail.length; i++) {
            const p0 = bladeTrail[i - 1];
            const p1 = bladeTrail[i];
            ctx.strokeStyle = '#00e5ff';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 14;
            ctx.lineWidth = (p1.life / 12) * 8;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
          }
          ctx.restore();
        }
        for (let i = bladeTrail.length - 1; i >= 0; i--) {
          bladeTrail[i].life--;
          if (bladeTrail[i].life <= 0) bladeTrail.splice(i, 1);
        }

        // Minimal HUD: Score + X Strikes
        ctx.fillStyle = '#ffd60a';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${score}`, 22, 38);

        ctx.textAlign = 'right';
        ctx.font = 'bold 22px sans-serif';
        for (let m = 0; m < maxMisses; m++) {
          ctx.fillStyle = m < misses ? '#ff2a85' : 'rgba(255,255,255,0.2)';
          ctx.fillText('✖', W - 22 - m * 28, 38);
        }

        if (gameOver) {
          ctx.fillStyle = 'rgba(5, 8, 18, 0.85)';
          ctx.fillRect(210, 160, 340, 150);
          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 3;
          ctx.strokeRect(210, 160, 340, 150);
          ctx.fillStyle = '#ffd60a';
          ctx.font = 'bold 28px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`SCORE: ${score}`, 380, 215);
          ctx.fillStyle = '#00e676';
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText('CLICK OR PRESS SPACE', 380, 265);
        }

        animId = requestAnimationFrame(loop);
      };
      loop();

      return () => {
        if (animId) cancelAnimationFrame(animId);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('mousedown', onClick);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 2. STICKMAN BRAWL
    // ==========================================================================
    if (selectedGameId === 'stickman') {
      const W = 760, H = 480;
      let score = 0, gameOver = false, winnerText = '';
      const startLives = difficulty === 'EASY' ? 4 : 3;
      const botSpeedMult = difficulty === 'EASY' ? 0.6 : difficulty === 'HARD' ? 1.22 : 0.92;
      const botAttackProb = difficulty === 'EASY' ? 0.06 : difficulty === 'HARD' ? 0.28 : 0.16;

      const makeFighter = (x, color, isBot) => ({
        x, y: 240, vx: 0, vy: 0, hp: 100, lives: isBot ? 3 : startLives, facing: isBot ? -1 : 1,
        color, isBot, cooldown: 0, punchTimer: 0, grounded: false
      });

      const p1 = makeFighter(220, '#00e676', false);
      const p2 = makeFighter(540, '#ff2a85', mode !== '2P');
      const platforms = [
        { x: 110, y: 375, w: 540, h: 16 },
        { x: 185, y: 265, w: 145, h: 12 },
        { x: 430, y: 265, w: 145, h: 12 }
      ];

      const updateFighter = (f, enemy, ctrl) => {
        const accel = f.isBot ? 0.9 * botSpeedMult : 0.9;
        if (ctrl.left) { f.vx -= accel; f.facing = -1; }
        if (ctrl.right) { f.vx += accel; f.facing = 1; }
        if (ctrl.jump && f.grounded) { f.vy = -12; f.grounded = false; }

        if (f.cooldown > 0) f.cooldown--;
        if (f.punchTimer > 0) f.punchTimer--;

        if (ctrl.attack && f.cooldown === 0) {
          f.cooldown = 20;
          f.punchTimer = 10;
          const dx = enemy.x - f.x;
          const dy = Math.abs(enemy.y - f.y);
          if (Math.sign(dx) === f.facing && Math.abs(dx) < 78 && dy < 55) {
            const dmg = !f.isBot && difficulty === 'EASY' ? 20 : 15;
            enemy.hp = Math.max(0, enemy.hp - dmg);
            enemy.vx = f.facing * (8 + (100 - enemy.hp) * 0.12);
            enemy.vy = -6.5;
            if (f === p1) score += Math.round(50 * scoreMult);
          }
        }

        f.vy += 0.52;
        f.vx *= 0.85;
        f.x += f.vx;
        f.y += f.vy;
        f.grounded = false;

        platforms.forEach(p => {
          if (f.vy >= 0 && f.x > p.x - 10 && f.x < p.x + p.w + 10 && f.y >= p.y && f.y - f.vy <= p.y + 12) {
            f.y = p.y;
            f.vy = 0;
            f.grounded = true;
          }
        });

        if (f.y > H + 50 || f.x < -50 || f.x > W + 50 || f.hp <= 0) {
          f.lives--;
          if (f === p2) score += 250;
          if (f.lives <= 0) {
            gameOver = true;
            winnerText = f === p2 ? `${playerName} WINS!` : (mode === '2P' ? 'P2 WINS!' : 'BOT WINS!');
            addHighScore('stickman', score);
          } else {
            f.x = f === p1 ? 230 : 530;
            f.y = 140;
            f.vx = 0;
            f.vy = 0;
            f.hp = 100;
          }
        }
      };

      const drawFighter = (f, name) => {
        const hx = f.x, hy = f.y - 44;
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(hx, hy, 11, 0, Math.PI * 2);
        ctx.moveTo(hx, hy + 11);
        ctx.lineTo(hx, f.y - 18);
        ctx.moveTo(hx, f.y - 18);
        ctx.lineTo(hx - 11, f.y);
        ctx.moveTo(hx, f.y - 18);
        ctx.lineTo(hx + 11, f.y);
        const reach = f.punchTimer > 0 ? f.facing * 32 : f.facing * 14;
        ctx.moveTo(hx - f.facing * 10, hy + 20);
        ctx.lineTo(hx + reach, hy + 16);
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${name} (${'●'.repeat(f.lives)})`, hx, hy - 26);
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(hx - 24, hy - 20, 48, 6);
        ctx.fillStyle = f.color;
        ctx.fillRect(hx - 24, hy - 20, (f.hp / 100) * 48, 6);
      };

      const loop = () => {
        ctx.fillStyle = '#070a14';
        ctx.fillRect(0, 0, W, H);

        platforms.forEach(p => {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, p.y, p.w, p.h);
        });

        if (!gameOver) {
          const c1 = {
            left: isPressed('a') || (mode === '1P' && isPressed('arrowleft')),
            right: isPressed('d') || (mode === '1P' && isPressed('arrowright')),
            jump: isPressed('w') || (mode === '1P' && isPressed('arrowup')),
            attack: isPressed(' ') || isPressed('f')
          };
          const dist = p1.x - p2.x;
          const c2 = mode === '2P'
            ? { left: isPressed('arrowleft'), right: isPressed('arrowright'), jump: isPressed('arrowup'), attack: isPressed('enter') || isPressed('/') }
            : { left: dist < -35, right: dist > 35, jump: p1.y < p2.y - 30 && Math.random() < 0.07, attack: Math.abs(dist) < 70 && Math.random() < botAttackProb };

          updateFighter(p1, p2, c1);
          updateFighter(p2, p1, c2);
        } else if (isPressed(' ') || isPressed('r')) {
          p1.lives = startLives; p1.hp = 100; p1.x = 220; p1.y = 200;
          p2.lives = 3; p2.hp = 100; p2.x = 540; p2.y = 200;
          score = 0; gameOver = false;
        }

        drawFighter(p1, playerName);
        drawFighter(p2, mode === '2P' ? 'P2' : 'BOT');

        ctx.fillStyle = '#ffd60a';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${score}`, 22, 36);

        if (gameOver) {
          ctx.fillStyle = 'rgba(0,0,0,0.85)';
          ctx.fillRect(210, 160, 340, 140);
          ctx.fillStyle = '#ffd60a';
          ctx.font = 'bold 26px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(winnerText, 380, 215);
          ctx.fillStyle = '#00e676';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('PRESS SPACE', 380, 260);
        }

        animId = requestAnimationFrame(loop);
      };
      loop();
    }

    // ==========================================================================
    // 3. TANK BATTLE ROYALE
    // ==========================================================================
    else if (selectedGameId === 'tanks') {
      const W = 760, H = 480;
      let score = 0, gameOver = false, winner = '';
      const botDriveSpd = difficulty === 'EASY' ? 1.2 : difficulty === 'HARD' ? 2.5 : 1.9;
      const botFireChance = difficulty === 'EASY' ? 0.018 : difficulty === 'HARD' ? 0.065 : 0.038;
      const shellSpeed = difficulty === 'EASY' ? 5.6 : difficulty === 'HARD' ? 8.2 : 6.8;
      const maxBounces = difficulty === 'HARD' ? 3 : 2;
      const walls = [
        { x: 220, y: 120, w: 28, h: 240 },
        { x: 512, y: 120, w: 28, h: 240 },
        { x: 350, y: 215, w: 60, h: 50 }
      ];
      const p1 = { x: 100, y: 240, angle: 0, hp: 100, cd: 0, color: '#00e676' };
      const p2 = { x: 660, y: 240, angle: Math.PI, hp: 100, cd: 0, color: '#ff2a85' };
      const bullets = [];

      const fire = (t, owner) => {
        if (t.cd > 0) return;
        t.cd = 18;
        bullets.push({
          x: t.x + Math.cos(t.angle) * 22,
          y: t.y + Math.sin(t.angle) * 22,
          vx: Math.cos(t.angle) * shellSpeed,
          vy: Math.sin(t.angle) * shellSpeed,
          bounces: maxBounces,
          owner
        });
      };

      const move = (t, dx, dy) => {
        const nx = Math.max(24, Math.min(W - 24, t.x + dx));
        const ny = Math.max(24, Math.min(H - 24, t.y + dy));
        if (!walls.some(w => nx + 16 > w.x && nx - 16 < w.x + w.w && ny + 16 > w.y && ny - 16 < w.y + w.h)) {
          t.x = nx; t.y = ny;
        }
        if (dx !== 0 || dy !== 0) t.angle = Math.atan2(dy, dx);
      };

      const loop = () => {
        ctx.fillStyle = '#070a14';
        ctx.fillRect(0, 0, W, H);

        walls.forEach(w => {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(w.x, w.y, w.w, w.h);
          ctx.strokeStyle = '#00e5ff';
          ctx.strokeRect(w.x, w.y, w.w, w.h);
        });

        if (!gameOver) {
          if (p1.cd > 0) p1.cd--;
          if (p2.cd > 0) p2.cd--;

          let dx1 = 0, dy1 = 0;
          if (isPressed('a') || (mode === '1P' && isPressed('arrowleft'))) dx1 -= 3.2;
          if (isPressed('d') || (mode === '1P' && isPressed('arrowright'))) dx1 += 3.2;
          if (isPressed('w') || (mode === '1P' && isPressed('arrowup'))) dy1 -= 3.2;
          if (isPressed('s') || (mode === '1P' && isPressed('arrowdown'))) dy1 += 3.2;
          move(p1, dx1, dy1);
          if (isPressed(' ') || isPressed('f')) fire(p1, 'p1');

          if (mode === '2P') {
            let dx2 = 0, dy2 = 0;
            if (isPressed('arrowleft')) dx2 -= 3.2;
            if (isPressed('arrowright')) dx2 += 3.2;
            if (isPressed('arrowup')) dy2 -= 3.2;
            if (isPressed('arrowdown')) dy2 += 3.2;
            move(p2, dx2, dy2);
            if (isPressed('enter') || isPressed('/')) fire(p2, 'p2');
          } else {
            const ang = Math.atan2(p1.y - p2.y, p1.x - p2.x);
            p2.angle = ang;
            if (Math.hypot(p1.x - p2.x, p1.y - p2.y) > 150) {
              move(p2, Math.cos(ang) * botDriveSpd, Math.sin(ang) * botDriveSpd);
            }
            if (Math.random() < botFireChance) fire(p2, 'p2');
          }

          for (let i = bullets.length - 1; i >= 0; i--) {
            const b = bullets[i];
            b.x += b.vx; b.y += b.vy;
            if (b.x < 8 || b.x > W - 8) { b.vx *= -1; b.bounces--; }
            if (b.y < 8 || b.y > H - 8) { b.vy *= -1; b.bounces--; }
            walls.forEach(w => {
              if (b.x > w.x && b.x < w.x + w.w && b.y > w.y && b.y < w.y + w.h) {
                b.vx *= -1; b.bounces--;
              }
            });

            if (b.owner !== 'p1' && Math.hypot(b.x - p1.x, b.y - p1.y) < 18) {
              p1.hp = Math.max(0, p1.hp - 25);
              bullets.splice(i, 1);
              if (p1.hp <= 0) {
                gameOver = true;
                winner = mode === '2P' ? 'P2 WINS!' : 'BOT WINS!';
                addHighScore('tanks', score);
              }
              continue;
            }
            if (b.owner !== 'p2' && Math.hypot(b.x - p2.x, b.y - p2.y) < 18) {
              p2.hp = Math.max(0, p2.hp - 25);
              bullets.splice(i, 1);
              score += 100;
              if (p2.hp <= 0) {
                if (mode === '1P') {
                  score += 300;
                  p2.hp = 100;
                  p2.x = p1.x < 380 ? 660 : 100;
                  p2.y = 80 + Math.random() * 320;
                } else {
                  gameOver = true;
                  winner = `${playerName} WINS!`;
                  addHighScore('tanks', score);
                }
              }
              continue;
            }
            if (b.bounces < 0) bullets.splice(i, 1);
          }
        } else if (isPressed(' ') || isPressed('r')) {
          p1.hp = 100; p1.x = 100; p1.y = 240;
          p2.hp = 100; p2.x = 660; p2.y = 240;
          bullets.length = 0; score = 0; gameOver = false;
        }

        [ [p1, playerName], [p2, mode === '2P' ? 'P2' : 'BOT'] ].forEach(([t, label]) => {
          ctx.save();
          ctx.translate(t.x, t.y);
          ctx.rotate(t.angle);
          ctx.fillStyle = t.color;
          ctx.fillRect(-16, -13, 32, 26);
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, -4, 24, 8);
          ctx.restore();
          ctx.fillStyle = '#fff';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${label} (${t.hp}%)`, t.x, t.y - 22);
        });

        bullets.forEach(b => {
          ctx.fillStyle = '#ffd60a';
          ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2); ctx.fill();
        });

        ctx.fillStyle = '#ffd60a';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${score}`, 22, 36);

        if (gameOver) {
          ctx.fillStyle = 'rgba(0,0,0,0.85)';
          ctx.fillRect(210, 160, 340, 140);
          ctx.fillStyle = '#ffd60a';
          ctx.font = 'bold 26px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(winner, 380, 215);
          ctx.fillStyle = '#00e676';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('PRESS SPACE', 380, 260);
        }

        animId = requestAnimationFrame(loop);
      };
      loop();
    }

    // ==========================================================================
    // 4. CYBER PINBALL
    // ==========================================================================
    else if (selectedGameId === 'pinball') {
      const W = 760, H = 480;
      const startBalls = difficulty === 'EASY' ? 5 : difficulty === 'HARD' ? 2 : 3;
      const pinGravity = difficulty === 'EASY' ? 0.17 : difficulty === 'HARD' ? 0.28 : 0.22;
      const flipLen = difficulty === 'EASY' ? 72 : difficulty === 'HARD' ? 58 : 65;
      let score = 0, balls = startBalls, gameOver = false, charge = 0;
      const ball = { x: 568, y: 390, vx: 0, vy: 0, r: 9, inChute: true };
      const bumpers = [
        { x: 290, y: 130, r: 26, pts: 150, color: '#00e5ff', flash: 0 },
        { x: 410, y: 130, r: 26, pts: 150, color: '#ff2a85', flash: 0 },
        { x: 350, y: 210, r: 30, pts: 250, color: '#ffd60a', flash: 0 },
        { x: 265, y: 270, r: 22, pts: 100, color: '#00e676', flash: 0 },
        { x: 435, y: 270, r: 22, pts: 100, color: '#9d4edd', flash: 0 },
        ...(difficulty === 'EASY' ? [{ x: 364, y: 422, r: 14, pts: 50, color: '#00e676', flash: 0 }] : [])
      ];

      const resetBall = () => {
        ball.x = 568; ball.y = 390; ball.vx = 0; ball.vy = 0; ball.inChute = true;
      };

      const loop = () => {
        ctx.fillStyle = '#070a14';
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 3;
        ctx.strokeRect(180, 18, 408, 442);
        ctx.beginPath();
        ctx.moveTo(548, 95); ctx.lineTo(548, 458);
        ctx.moveTo(180, 340); ctx.lineTo(265, 410);
        ctx.moveTo(548, 340); ctx.lineTo(463, 410);
        ctx.stroke();

        const lAct = isPressed('arrowleft') || isPressed('a');
        const rAct = isPressed('arrowright') || isPressed('d') || isPressed('f');
        const lAng = lAct ? -0.42 : 0.35;
        const rAng = rAct ? Math.PI + 0.42 : Math.PI - 0.35;

        if (!gameOver) {
          if (ball.inChute) {
            if (isPressed(' ') || isPressed('arrowdown') || isPressed('s') || isPressed('w') || isPressed('arrowup')) {
              ball.vy = -16.5;
              ball.vx = -2;
              charge = 0;
            }
          }

          if (!ball.inChute || ball.vy < 0) {
            ball.vy += pinGravity;
            ball.x += ball.vx;
            ball.y += ball.vy;
            if (ball.inChute && ball.y < 85) {
              ball.inChute = false;
              ball.vx = -5 - Math.random() * 2;
              ball.vy = 2;
            }
          }

          if (ball.y < 30) { ball.y = 30; ball.vy = Math.abs(ball.vy) * 0.85; }
          if (ball.x < 192) { ball.x = 192; ball.vx = Math.abs(ball.vx) * 0.88; }
          if (!ball.inChute && ball.x > 538) { ball.x = 538; ball.vx = -Math.abs(ball.vx) * 0.88; }

          if (!ball.inChute && ball.y > 340 && ball.y < 415) {
            if (ball.x < 265) { ball.vx = Math.abs(ball.vx) + 2; ball.vy = -Math.abs(ball.vy) * 0.7; }
            else if (ball.x > 463) { ball.vx = -Math.abs(ball.vx) - 2; ball.vy = -Math.abs(ball.vy) * 0.7; }
          }

          const checkFlip = (px, py, ang, act) => {
            const tx = px + Math.cos(ang) * flipLen, ty = py + Math.sin(ang) * flipLen;
            const dx = tx - px, dy = ty - py, len2 = dx * dx + dy * dy;
            const t = Math.max(0, Math.min(1, ((ball.x - px) * dx + (ball.y - py) * dy) / len2));
            const cx = px + t * dx, cy = py + t * dy;
            if (Math.hypot(ball.x - cx, ball.y - cy) < ball.r + 7 && ball.vy > -2) {
              ball.y = cy - ball.r - 7;
              ball.vy = act ? -12.5 : -Math.abs(ball.vy) * 0.75 - 3;
              ball.vx += (ball.x - 364) * 0.06;
              score += Math.round(25 * scoreMult);
            }
          };
          checkFlip(270, 415, lAng, lAct);
          checkFlip(458, 415, rAng, rAct);

          bumpers.forEach(b => {
            if (b.flash > 0) b.flash--;
            if (Math.hypot(ball.x - b.x, ball.y - b.y) < ball.r + b.r) {
              const ang = Math.atan2(ball.y - b.y, ball.x - b.x);
              const spd = Math.min(13, Math.hypot(ball.vx, ball.vy) + 3.5);
              ball.vx = Math.cos(ang) * spd;
              ball.vy = Math.sin(ang) * spd;
              b.flash = 10;
              score += Math.round(b.pts * scoreMult);
            }
          });

          if (ball.y > 465) {
            balls--;
            if (balls <= 0) {
              gameOver = true;
              addHighScore('pinball', score);
            } else resetBall();
          }
        } else if (isPressed(' ') || isPressed('r')) {
          score = 0; balls = startBalls; gameOver = false; resetBall();
        }

        bumpers.forEach(b => {
          ctx.fillStyle = b.flash > 0 ? '#fff' : b.color;
          ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#070a14';
          ctx.font = 'bold 12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`+${b.pts}`, b.x, b.y + 4);
        });

        ctx.strokeStyle = '#00e676';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(270, 415); ctx.lineTo(270 + Math.cos(lAng) * flipLen, 415 + Math.sin(lAng) * flipLen);
        ctx.moveTo(458, 415); ctx.lineTo(458 + Math.cos(rAng) * flipLen, 415 + Math.sin(rAng) * flipLen);
        ctx.stroke();

        ctx.fillStyle = '#ff2a85';
        ctx.fillRect(556, 405 + charge * 1.5, 24, 35);

        ctx.fillStyle = '#ffd60a';
        ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#ffd60a';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${score}`, 24, 44);
        ctx.fillStyle = '#00e676';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(`${'● '.repeat(balls)}`, 24, 74);

        if (gameOver) {
          ctx.fillStyle = 'rgba(0,0,0,0.85)';
          ctx.fillRect(210, 160, 340, 140);
          ctx.fillStyle = '#ffd60a';
          ctx.font = 'bold 24px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`SCORE: ${score}`, 380, 215);
          ctx.fillStyle = '#00e676';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('PRESS SPACE', 380, 260);
        }

        animId = requestAnimationFrame(loop);
      };
      loop();
    }

    // ==========================================================================
    // 5. NEON SNAKE RACE
    // ==========================================================================
    else if (selectedGameId === 'snake') {
      const W = 760, H = 480, G = 20, COLS = W / G, ROWS = H / G;
      const tickInterval = difficulty === 'EASY' ? 7 : difficulty === 'HARD' ? 3 : 5;
      const scoreMult = difficulty === 'EASY' ? 1 : difficulty === 'HARD' ? 2.5 : 1.5;
      const obstacles = difficulty === 'HARD' ? [
        { x: 18, y: 7 }, { x: 19, y: 7 }, { x: 18, y: 16 }, { x: 19, y: 16 }
      ] : [];
      let score = 0, gameOver = false, msg = '', tick = 0;
      const s1 = { body: [{ x: 8, y: 12 }, { x: 7, y: 12 }, { x: 6, y: 12 }], dx: 1, dy: 0, color: '#00e676' };
      const s2 = { body: [{ x: 29, y: 12 }, { x: 30, y: 12 }, { x: 31, y: 12 }], dx: -1, dy: 0, color: '#ff2a85', active: mode === '2P' };
      let apple = { x: 19, y: 12 };

      const loop = () => {
        tick++;
        if ((isPressed('w') || (mode === '1P' && isPressed('arrowup'))) && s1.dy === 0) { s1.dx = 0; s1.dy = -1; }
        else if ((isPressed('s') || (mode === '1P' && isPressed('arrowdown'))) && s1.dy === 0) { s1.dx = 0; s1.dy = 1; }
        else if ((isPressed('a') || (mode === '1P' && isPressed('arrowleft'))) && s1.dx === 0) { s1.dx = -1; s1.dy = 0; }
        else if ((isPressed('d') || (mode === '1P' && isPressed('arrowright'))) && s1.dx === 0) { s1.dx = 1; s1.dy = 0; }

        if (s2.active) {
          if (isPressed('arrowup') && s2.dy === 0) { s2.dx = 0; s2.dy = -1; }
          else if (isPressed('arrowdown') && s2.dy === 0) { s2.dx = 0; s2.dy = 1; }
          else if (isPressed('arrowleft') && s2.dx === 0) { s2.dx = -1; s2.dy = 0; }
          else if (isPressed('arrowright') && s2.dx === 0) { s2.dx = 1; s2.dy = 0; }
        }

        if (!gameOver && tick % tickInterval === 0) {
          const step = (sn, other, name) => {
            let head = { x: sn.body[0].x + sn.dx, y: sn.body[0].y + sn.dy };
            if (difficulty === 'EASY') {
              head.x = (head.x + COLS) % COLS;
              head.y = (head.y + ROWS) % ROWS;
            }
            if (
              head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
              obstacles.some(o => o.x === head.x && o.y === head.y) ||
              sn.body.some(b => b.x === head.x && b.y === head.y) ||
              (other.active && other.body.some(b => b.x === head.x && b.y === head.y))
            ) {
              gameOver = true;
              msg = `${name} CRASHED!`;
              addHighScore('snake', score);
              return;
            }
            sn.body.unshift(head);
            if (head.x === apple.x && head.y === apple.y) {
              score += Math.round(50 * scoreMult);
              apple = { x: 2 + Math.floor(Math.random() * (COLS - 4)), y: 2 + Math.floor(Math.random() * (ROWS - 4)) };
            } else sn.body.pop();
          };
          step(s1, s2, playerName);
          if (s2.active && !gameOver) step(s2, { ...s1, active: true }, 'P2');
        } else if (gameOver && (isPressed(' ') || isPressed('r'))) {
          s1.body = [{ x: 8, y: 12 }, { x: 7, y: 12 }, { x: 6, y: 12 }]; s1.dx = 1; s1.dy = 0;
          s2.body = [{ x: 29, y: 12 }, { x: 30, y: 12 }, { x: 31, y: 12 }]; s2.dx = -1; s2.dy = 0;
          score = 0; gameOver = false;
        }

        ctx.fillStyle = '#070a14';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ffd60a';
        ctx.fillRect(apple.x * G + 2, apple.y * G + 2, G - 4, G - 4);

        obstacles.forEach(o => {
          ctx.fillStyle = '#ff3d00';
          ctx.fillRect(o.x * G + 1, o.y * G + 1, G - 2, G - 2);
        });

        [s1, ...(s2.active ? [s2] : [])].forEach(sn => {
          sn.body.forEach((b, i) => {
            ctx.fillStyle = i === 0 ? '#fff' : sn.color;
            ctx.fillRect(b.x * G + 1, b.y * G + 1, G - 2, G - 2);
          });
        });

        ctx.fillStyle = '#ffd60a';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${score}`, 22, 36);

        if (gameOver) {
          ctx.fillStyle = 'rgba(0,0,0,0.85)';
          ctx.fillRect(210, 160, 340, 140);
          ctx.fillStyle = '#ffd60a';
          ctx.font = 'bold 24px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(msg, 380, 215);
          ctx.fillStyle = '#00e676';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('PRESS SPACE', 380, 260);
        }

        animId = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [showUploadScreen, selectedGameId, activeGame.isCustom, mode, difficulty, playerName, restartKey, addHighScore]);

  // ============================================================================
  // UPLOAD HTML HANDLERS
  // ============================================================================
  const handleHtmlFileSelect = (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const cleanTitle = newGameTitle.trim() || file.name.replace(/\.html?$/i, '') || 'My AI Game';
      const customObj = {
        id: `game-${Date.now()}`,
        title: cleanTitle,
        tags: ['#AI'],
        isCustom: true,
        htmlContent: e.target.result
      };
      setUploadedGames(prev => [customObj, ...prev]);
      setSelectedGameId(customObj.id);
      setNewGameTitle('');
      setShowUploadScreen(false);
      triggerToast(`🎉 Playing ${customObj.title}!`);
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = (e) => {
    e.preventDefault();
    if (!newGameHtml.trim()) return;
    const customObj = {
      id: `game-${Date.now()}`,
      title: newGameTitle.trim() || `AI Game #${uploadedGames.length + 1}`,
      tags: ['#AI'],
      isCustom: true,
      htmlContent: newGameHtml
    };
    setUploadedGames(prev => [customObj, ...prev]);
    setSelectedGameId(customObj.id);
    setNewGameTitle('');
    setNewGameHtml('');
    setShowUploadScreen(false);
    triggerToast(`🚀 Playing ${customObj.title}!`);
  };

  return (
    <div className="neo-arcade-shell">
      {/* =====================================================================
          LEFT: GIANT ARCADE CABINET (BEZEL SCREEN + JOYSTICK & BUTTONS DECK)
          ===================================================================== */}
      <div className="arcade-cabinet-outer">
        {/* Thin Cabinet Marquee Strip */}
        <div className="arcade-marquee-strip">
          <span className="arcade-marquee-title">
            {showUploadScreen ? 'UPLOAD HTML GAME' : activeGame.title.toUpperCase()}
          </span>
          <div className="arcade-marquee-right">
            {!showUploadScreen && (!activeGame.isCustom || activeGame.id === 'dodger') && (
              <div className="diff-selector" role="group" aria-label="Difficulty">
                {['EASY', 'MEDIUM', 'HARD'].map(d => (
                  <button
                    key={d}
                    type="button"
                    className={`diff-btn ${d.toLowerCase()} ${difficulty === d ? 'active' : ''}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {d === 'MEDIUM' ? 'MED' : d}
                  </button>
                ))}
              </div>
            )}
            {(activeGame.tags || []).map(t => (
              <span key={t} className="arcade-tag-chip-header">{t}</span>
            ))}
          </div>
        </div>

        {/* Giant Game Screen Bezel */}
        <div className="arcade-Bezel">
          {toast && <div className="arcade-toast">{toast}</div>}

          {showUploadScreen ? (
            <div className="upload-screen-panel">
              <label
                className="upload-drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleHtmlFileSelect(e.dataTransfer.files);
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#00e5ff' }}>
                  DROP .HTML FILE HERE
                </div>
                <div style={{ fontSize: '13px', color: '#9eb0d2' }}>
                  Or click to pick an HTML game file
                </div>
                <button
                  type="button"
                  className="deck-pill-btn share-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard?.writeText(KID_AI_PROMPT);
                    triggerToast('📋 Copied AI Prompt!');
                  }}
                >
                  Copy AI Game Prompt
                </button>
                <input
                  type="file"
                  accept=".html,.htm"
                  style={{ display: 'none' }}
                  onChange={(e) => handleHtmlFileSelect(e.target.files)}
                />
              </label>

              <form className="upload-form-col" onSubmit={handlePasteSubmit}>
                <input
                  type="text"
                  className="upload-input"
                  placeholder="Game Name"
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                />
                <textarea
                  className="upload-textarea"
                  placeholder="Or paste <!DOCTYPE html>... code here"
                  value={newGameHtml}
                  onChange={(e) => setNewGameHtml(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="sidebar-upload-btn" style={{ flex: 1 }}>
                    PLAY NOW ▶
                  </button>
                  <button
                    type="button"
                    className="deck-pill-btn"
                    onClick={() => setShowUploadScreen(false)}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          ) : activeGame.isCustom ? (
            <iframe
              key={`${activeGame.id}-${difficulty}-${restartKey}`}
              title={activeGame.title}
              srcDoc={activeGame.id === 'dodger' ? buildDodgerHtml(difficulty) : activeGame.htmlContent}
              sandbox="allow-scripts allow-pointer-lock allow-modals"
              className="arcade-iframe"
            />
          ) : (
            <canvas
              ref={canvasRef}
              width={760}
              height={480}
              className="arcade-canvas"
            />
          )}
        </div>

        {/* Bottom Arcade Keyboard Control Deck (Interactive Keycaps) */}
        <div className="arcade-control-deck">
          <div className="key-cluster-wrap">
            {/* WASD Mechanical Keycap Cluster */}
            <div className="key-cluster">
              <div className="key-row">
                <button
                  className={`arcade-keycap ${pressedUI['w'] || pressedUI['arrowup'] ? 'pressed' : ''}`}
                  onMouseDown={() => holdVirtualKey('w', true)}
                  onMouseUp={() => holdVirtualKey('w', false)}
                  onMouseLeave={() => holdVirtualKey('w', false)}
                >
                  <span>W</span>
                  <span className="keycap-sub">{deckLabels.wSub}</span>
                </button>
              </div>
              <div className="key-row">
                <button
                  className={`arcade-keycap ${pressedUI['a'] || (mode === '1P' && pressedUI['arrowleft']) ? 'pressed' : ''}`}
                  onMouseDown={() => holdVirtualKey('a', true)}
                  onMouseUp={() => holdVirtualKey('a', false)}
                  onMouseLeave={() => holdVirtualKey('a', false)}
                >
                  <span>A</span>
                  <span className="keycap-sub">{deckLabels.aSub}</span>
                </button>
                <button
                  className={`arcade-keycap ${pressedUI['s'] || (mode === '1P' && pressedUI['arrowdown']) ? 'pressed' : ''}`}
                  onMouseDown={() => holdVirtualKey('s', true)}
                  onMouseUp={() => holdVirtualKey('s', false)}
                  onMouseLeave={() => holdVirtualKey('s', false)}
                >
                  <span>S</span>
                  <span className="keycap-sub">{deckLabels.sSub}</span>
                </button>
                <button
                  className={`arcade-keycap ${pressedUI['d'] || (mode === '1P' && pressedUI['arrowright']) ? 'pressed' : ''}`}
                  onMouseDown={() => holdVirtualKey('d', true)}
                  onMouseUp={() => holdVirtualKey('d', false)}
                  onMouseLeave={() => holdVirtualKey('d', false)}
                >
                  <span>D</span>
                  <span className="keycap-sub">{deckLabels.dSub}</span>
                </button>
              </div>
              <span className="key-cluster-caption">{deckLabels.wasdCaption}</span>
            </div>

            {/* Wide SPACE Bar Action Keycap */}
            <div className="key-cluster">
              <button
                className={`arcade-keycap space-key ${pressedUI[' '] ? 'pressed' : ''}`}
                onMouseDown={() => holdVirtualKey(' ', true)}
                onMouseUp={() => holdVirtualKey(' ', false)}
                onMouseLeave={() => holdVirtualKey(' ', false)}
              >
                <span>[ SPACE ]</span>
                <span className="keycap-sub">{deckLabels.spaceLabel}</span>
              </button>
              <span className="key-cluster-caption">MAIN ACTION KEY</span>
            </div>

            {/* Mouse Swipe Badge for Hot Dog Ninja / Custom Games */}
            {deckLabels.showMouse && (
              <div className="mouse-hint-badge">
                <span>🖱️ MOUSE SWIPE</span>
                <span style={{ fontSize: '10px', color: '#fff' }}>OR PRESS SPACE</span>
              </div>
            )}

            {/* Player 2 Arrow Key Cluster when 2P Mode is ON */}
            {activeGame.supports2P && mode === '2P' && (
              <div className="key-cluster">
                <div className="key-row">
                  <button
                    className={`arcade-keycap p2-key ${pressedUI['arrowup'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('ArrowUp', true)}
                    onMouseUp={() => holdVirtualKey('ArrowUp', false)}
                    onMouseLeave={() => holdVirtualKey('ArrowUp', false)}
                  >
                    <span>▲</span>
                  </button>
                  <button
                    className={`arcade-keycap p2-key ${pressedUI['enter'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('Enter', true)}
                    onMouseUp={() => holdVirtualKey('Enter', false)}
                    onMouseLeave={() => holdVirtualKey('Enter', false)}
                  >
                    <span>ENTER</span>
                    <span className="keycap-sub">P2 ACT</span>
                  </button>
                </div>
                <div className="key-row">
                  <button
                    className={`arcade-keycap p2-key ${pressedUI['arrowleft'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('ArrowLeft', true)}
                    onMouseUp={() => holdVirtualKey('ArrowLeft', false)}
                    onMouseLeave={() => holdVirtualKey('ArrowLeft', false)}
                  >
                    <span>◄</span>
                  </button>
                  <button
                    className={`arcade-keycap p2-key ${pressedUI['arrowdown'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('ArrowDown', true)}
                    onMouseUp={() => holdVirtualKey('ArrowDown', false)}
                    onMouseLeave={() => holdVirtualKey('ArrowDown', false)}
                  >
                    <span>▼</span>
                  </button>
                  <button
                    className={`arcade-keycap p2-key ${pressedUI['arrowright'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('ArrowRight', true)}
                    onMouseUp={() => holdVirtualKey('ArrowRight', false)}
                    onMouseLeave={() => holdVirtualKey('ArrowRight', false)}
                  >
                    <span>►</span>
                  </button>
                </div>
                <span className="key-cluster-caption" style={{ color: '#ff85b3' }}>
                  PLAYER 2 KEYS
                </span>
              </div>
            )}
          </div>

          {/* Right Cabinet Navigation & Mode Keys */}
          <div className="deck-center-controls">
            <button className="deck-pill-btn" onClick={() => cycleGame(-1)} title="Previous Game">
              ◀ PREV
            </button>
            <button className="deck-pill-btn" onClick={() => cycleGame(1)} title="Next Game">
              NEXT ▶
            </button>
            {activeGame.supports2P && (
              <button
                className={`deck-pill-btn ${mode === '2P' ? 'active-mode' : ''}`}
                onClick={() => setMode(m => (m === '1P' ? '2P' : '1P'))}
              >
                {mode === '2P' ? '👥 2P ON' : '1P / 2P'}
              </button>
            )}
            <button
              className="deck-pill-btn"
              onClick={() => setRestartKey(k => k + 1)}
            >
              ↻ RESET
            </button>
            <button
              className="deck-pill-btn share-btn"
              onClick={() => handleShareGame(activeGame)}
            >
              🔗 SHARE
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          RIGHT SIDEBAR: ADDICTINGGAMES STYLE (UPLOAD + TAGS + VISUAL CARDS)
          ===================================================================== */}
      <aside className="arcade-sidebar">
        <button
          className="sidebar-upload-btn"
          onClick={() => setShowUploadScreen(s => !s)}
        >
          {showUploadScreen ? '◀ BACK TO GAME' : '+ UPLOAD HTML GAME'}
        </button>

        {/* Tag Filters */}
        <div className="sidebar-tag-bar">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`tag-filter-pill ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Related Games with Visual Previews */}
        <div className="sidebar-games-list">
          {filteredGames.map(g => (
            <div
              key={g.id}
              className={`sidebar-game-card ${!showUploadScreen && selectedGameId === g.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedGameId(g.id);
                setShowUploadScreen(false);
              }}
            >
              <GamePreviewThumb gameId={g.id} />

              <div className="sidebar-card-info">
                <h4 className="sidebar-card-title">{g.title}</h4>
                <div className="sidebar-card-tags">
                  {(g.tags || []).map(t => (
                    <span
                      key={t}
                      className="mini-tag"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTag(t);
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button
                className="sidebar-share-icon-btn"
                title="Copy Share Link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareGame(g);
                }}
              >
                🔗
              </button>
            </div>
          ))}
        </div>

        {/* Compact CSV High Scores Footer */}
        <div className="sidebar-scores-box">
          <div className="sidebar-scores-header">
            <span>TOP SCORES</span>
            <input
              type="text"
              maxLength={10}
              className="sidebar-name-mini"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
              placeholder="NAME"
            />
            <button
              className="tag-filter-pill"
              style={{ padding: '2px 6px', fontSize: '10px' }}
              onClick={handleDownloadCsv}
              title="Download highscores.csv"
            >
              CSV ⬇
            </button>
          </div>
          {activeGameScores.map((r, i) => (
            <div key={i} className="sidebar-score-row">
              <span>#{i + 1} {r.player}</span>
              <span style={{ color: '#ffd60a', fontWeight: 700 }}>{r.score}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default NeoArcade;
