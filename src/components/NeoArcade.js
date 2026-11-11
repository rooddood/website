import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './NeoArcade.css';
import { initTowerfallGame } from './arcade/towerfallGame';
import { initSmashBrawlGame } from './arcade/smashBrawlGame';
import { initTankGame } from './arcade/tankGame';
import { initLineRiderGame } from './arcade/lineRiderGame';
import { initRaftWarsGame } from './arcade/raftWarsGame';
import { initHeistGame } from './arcade/heistGame';
import { initCampsiteGame } from './arcade/campsiteGame';
import { initMovie8BitGame } from './arcade/movie8BitGame';
import { initEscherGame } from './arcade/escherGame';

// ============================================================================
// GAMES CATALOG
// ============================================================================
const GAMES_PER_PAGE = 4;

const BUILTIN_GAMES = [
  {
    id: 'towerfall',
    title: 'TowerFall: Arrow Ascent',
    tags: ['#ACTION', '#ARCADE'],
    supports2P: false,
    desc: 'Single-screen archery arena with air-dodge, arrow catch & waves.'
  },
  {
    id: 'stickman',
    title: 'Super Stick Brawl',
    tags: ['#ACTION', '#2P'],
    supports2P: true,
    desc: 'Smash Bros combat: choose your fighter, build % damage & launch off-stage!'
  },
  {
    id: 'tanks',
    title: 'Scorched Tanks 2D',
    tags: ['#ACTION', '#RPG', '#2P'],
    supports2P: true,
    desc: 'Turn-based destructible pixel artillery with shop, upgrades & weapons.'
  },
  {
    id: 'hotdog',
    title: '3D Hot Dog Ninja',
    tags: ['#ACTION', '#ARCADE'],
    supports2P: false,
    desc: 'Slice 3D shaded hot dogs with blazing katana combos. Watch out for bombs!'
  }
  /* Hidden WIP games — kept in codebase for future refinement:
  {
    id: 'movie8bit',
    title: '8-Bit Blockbusters',
    tags: ['#8BIT', '#RPG', '#ACTION'],
    supports2P: false
  },
  {
    id: 'escher',
    title: 'Escher Valley: Odyssey',
    tags: ['#8BIT', '#ARCADE', '#ACTION'],
    supports2P: false
  },
  {
    id: 'raftwars',
    title: 'Raft Wars: Pirate Siege',
    tags: ['#ACTION', '#RPG', '#ARCADE'],
    supports2P: false
  },
  {
    id: 'heist',
    title: 'The Grand Heist',
    tags: ['#RPG', '#ACTION'],
    supports2P: false
  },
  {
    id: 'campsite',
    title: '8-Bit Cryptid Camp',
    tags: ['#8BIT', '#RPG', '#ARCADE'],
    supports2P: false
  },
  {
    id: 'linerider',
    title: 'Line Rider Studio',
    tags: ['#ARCADE', '#ACTION'],
    supports2P: false
  }
  */
];

const DEFAULT_CSV_TEXT = `game,player,score
towerfall,MATT_ARCHER,4200
towerfall,CELESTE_PRO,2850
stickman,SMASH_CHAMP,3400
stickman,BLOX_NINJA,2100
tanks,SCORCH_KING,2450
tanks,BOMB_BOSS,1750
tanks,KYLE,1200
hotdog,GLIZZY_GOD,1850
hotdog,MUSTARD_KING,1240`;

const KID_AI_PROMPT = `Make me a single-file HTML5 game! Put all HTML, CSS, and JS in one file using a 720x460 canvas. On Game Over, send the score with: window.parent.postMessage({ type: 'NEO_ARCADE_SCORE', score: finalScore }, '*');`;

// ============================================================================
// ACTUAL VISUAL GAME PREVIEW ARTWORK (NO EMOJIS)
// ============================================================================
const GamePreviewThumb = ({ gameId }) => {
  if (gameId === 'towerfall') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54" shapeRendering="crispEdges">
          {/* Dark Castle Arena */}
          <rect width="80" height="54" fill="#0a0d18" />
          <rect x="0" y="44" width="80" height="10" fill="#1e293b" />
          <rect x="0" y="44" width="80" height="2" fill="#64748b" />
          {/* Floating Stone Ledge */}
          <rect x="18" y="28" width="44" height="6" fill="#334155" />
          <rect x="18" y="28" width="44" height="2" fill="#94a3b8" />
          {/* Torch Flicker */}
          <rect x="66" y="24" width="3" height="6" fill="#64748b" />
          <rect x="66" y="20" width="3" height="4" fill="#f97316" />
          {/* Green Archer with Bow */}
          <rect x="22" y="14" width="8" height="14" fill="#10b981" />
          <rect x="24" y="12" width="6" height="4" fill="#047857" />
          <rect x="29" y="16" width="2" height="10" fill="#fde047" />
          {/* Flying Arrow with blue streak */}
          <line x1="33" y1="20" x2="48" y2="18" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="48" y="17" width="3" height="3" fill="#f8fafc" />
          {/* Enemy Bat / Slime */}
          <rect x="56" y="16" width="7" height="6" fill="#a855f7" />
          <rect x="54" y="18" width="2" height="3" fill="#ef4444" />
        </svg>
      </div>
    );
  }
  if (gameId === 'movie8bit') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#060914" />
          {/* 8-Bit Film Strip Clapperboard & Pixel Hero */}
          <rect x="8" y="8" width="64" height="10" fill="#1e293b" stroke="#ffd60a" strokeWidth="1.2" />
          <line x1="18" y1="8" x2="14" y2="18" stroke="#ffd60a" strokeWidth="2" />
          <line x1="34" y1="8" x2="30" y2="18" stroke="#ffd60a" strokeWidth="2" />
          <line x1="50" y1="8" x2="46" y2="18" stroke="#ffd60a" strokeWidth="2" />
          <rect x="8" y="42" width="64" height="5" fill="#00e676" />
          {/* 8-Bit Hero & Boss */}
          <rect x="20" y="29" width="8" height="13" fill="#00e5ff" />
          <rect x="28" y="33" width="8" height="3" fill="#ffd60a" />
          <rect x="52" y="25" width="11" height="17" fill="#ff2a85" />
        </svg>
      </div>
    );
  }
  if (gameId === 'escher') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#1d1e2c" />
          {/* Impossible Penrose Triangle / Monument Valley Arch */}
          <polygon points="14,42 36,42 40,36 18,36" fill="#f2cc8f" />
          <rect x="14" y="42" width="22" height="7" fill="#e07a5f" />
          <polygon points="40,30 68,30 72,24 44,24" fill="#a8dadc" />
          <rect x="40" y="30" width="28" height="7" fill="#457b9d" />
          {/* Golden Rotor Wheel */}
          <circle cx="38" cy="34" r="4.5" fill="#ffb703" stroke="#ffffff" strokeWidth="1.2" />
          {/* Pilgrim in Conical Hat */}
          <polygon points="24,25 20,36 28,36" fill="#ffffff" />
          <polygon points="24,18 19,26 29,26" fill="#ffb703" />
        </svg>
      </div>
    );
  }
  if (gameId === 'tanks') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54" shapeRendering="crispEdges">
          {/* 16-Bit Stepped Sunset Sky */}
          <rect width="80" height="12" fill="#2a0b38" />
          <rect y="12" width="80" height="10" fill="#6e1848" />
          <rect y="22" width="80" height="12" fill="#d9383a" />
          <rect y="34" width="80" height="20" fill="#ff8c24" />
          {/* Sliced Pixel Sun */}
          <rect x="44" y="14" width="18" height="4" fill="#fff1d0" />
          <rect x="42" y="19" width="22" height="4" fill="#ffbe0b" />
          <rect x="44" y="25" width="18" height="3" fill="#ff6b2b" />
          {/* Stepped Pixel Terrain */}
          <rect x="0" y="34" width="28" height="20" fill="#8c222a" />
          <rect x="28" y="38" width="22" height="16" fill="#8c222a" />
          <rect x="50" y="32" width="30" height="22" fill="#8c222a" />
          <rect x="0" y="34" width="28" height="3" fill="#ffbe0b" />
          <rect x="28" y="38" width="22" height="3" fill="#ffbe0b" />
          <rect x="50" y="32" width="30" height="3" fill="#ffbe0b" />
          {/* 8-Bit Tank & Pixel Arc */}
          <rect x="8" y="28" width="14" height="6" fill="#ffbe0b" />
          <rect x="11" y="25" width="8" height="3" fill="#fff1d0" />
          <rect x="19" y="24" width="8" height="2" fill="#fff1d0" />
          <rect x="30" y="18" width="3" height="3" fill="#fff1d0" />
          <rect x="38" y="14" width="3" height="3" fill="#ffbe0b" />
          <rect x="46" y="16" width="3" height="3" fill="#ffbe0b" />
          <rect x="54" y="23" width="5" height="5" fill="#ff3864" />
        </svg>
      </div>
    );
  }
  if (gameId === 'raftwars') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#09152b" />
          <path d="M0,40 Q20,36 40,40 T80,40 L80,54 L0,54 Z" fill="#00b4d8" />
          {/* Raft */}
          <polygon points="8,36 28,36 24,41 12,41" fill="#ca8a04" />
          <circle cx="18" cy="30" r="3.5" fill="#fde047" />
          {/* Pirate Ship */}
          <polygon points="48,34 74,34 69,41 53,41" fill="#78350f" />
          <line x1="61" y1="34" x2="61" y2="15" stroke="#fff" strokeWidth="1.8" />
          <rect x="61" y="15" width="11" height="8" fill="#ef4444" />
        </svg>
      </div>
    );
  }
  if (gameId === 'heist') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#070b16" />
          {/* Vault Door */}
          <rect x="44" y="10" width="28" height="34" rx="3" fill="#1e293b" stroke="#ffd60a" strokeWidth="2" />
          <circle cx="58" cy="27" r="8" fill="none" stroke="#ffd60a" strokeWidth="2" />
          {/* Laser & Operative */}
          <line x1="34" y1="6" x2="34" y2="48" stroke="#ff2a85" strokeWidth="1.5" strokeDasharray="3,2" />
          <circle cx="18" cy="28" r="5" fill="#00e676" />
        </svg>
      </div>
    );
  }
  if (gameId === 'campsite') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#060913" />
          <rect x="0" y="42" width="80" height="12" fill="#052e16" />
          {/* 8-Bit Tent & Campfire */}
          <polygon points="14,42 26,24 38,42" fill="#d97706" />
          <rect x="44" y="34" width="8" height="8" fill="#f97716" />
          <rect x="46" y="29" width="4" height="6" fill="#fde047" />
          {/* UFO & Sasquatch */}
          <ellipse cx="60" cy="14" rx="9" ry="3.5" fill="#00e676" />
          <rect x="62" y="28" width="8" height="14" fill="#78350f" />
        </svg>
      </div>
    );
  }
  if (gameId === 'linerider') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54">
          <rect width="80" height="54" fill="#070b16" />
          <path d="M8,16 Q32,42 52,32 T74,18" fill="none" stroke="#00e5ff" strokeWidth="3" />
          <circle cx="38" cy="23" r="3.5" fill="#ffffff" />
          <line x1="29" y1="29" x2="45" y2="27" stroke="#ffd60a" strokeWidth="2.5" />
          <path d="M35,23 Q26,21 20,25" fill="none" stroke="#ff2a85" strokeWidth="2.5" />
        </svg>
      </div>
    );
  }
  if (gameId === 'hotdog') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54" shapeRendering="crispEdges">
          {/* Stepped Sunset Sky */}
          <rect width="80" height="14" fill="#240933" />
          <rect y="14" width="80" height="14" fill="#6b1546" />
          <rect y="28" width="80" height="14" fill="#bd2d3b" />
          <rect y="42" width="80" height="12" fill="#f26427" />
          {/* 16-Bit Pixel Hot Dog */}
          <rect x="18" y="20" width="44" height="14" fill="#e07a24" />
          <rect x="12" y="23" width="56" height="8" fill="#c92a2a" />
          <rect x="20" y="26" width="8" height="3" fill="#ffbe0b" />
          <rect x="30" y="24" width="8" height="3" fill="#ffbe0b" />
          <rect x="40" y="26" width="8" height="3" fill="#ffbe0b" />
          <rect x="50" y="24" width="8" height="3" fill="#ffbe0b" />
          {/* Stepped Pixel Fire Blade Slash */}
          <rect x="14" y="40" width="8" height="4" fill="#ff3864" />
          <rect x="24" y="34" width="10" height="4" fill="#ff6b2b" />
          <rect x="36" y="26" width="10" height="4" fill="#ffbe0b" />
          <rect x="48" y="18" width="10" height="4" fill="#fff1d0" />
          <rect x="60" y="10" width="8" height="4" fill="#ffbe0b" />
        </svg>
      </div>
    );
  }
  if (gameId === 'stickman') {
    return (
      <div className="game-preview-thumb">
        <svg viewBox="0 0 80 54" shapeRendering="crispEdges">
          <rect width="80" height="54" fill="#080c18" />
          {/* Floating Smash Island */}
          <rect x="12" y="38" width="56" height="8" fill="#1e293b" />
          <rect x="12" y="38" width="56" height="2" fill="#38bdf8" />
          {/* P1 Blaze (Red) */}
          <rect x="22" y="18" width="8" height="20" fill="#ef4444" />
          <rect x="20" y="20" width="12" height="3" fill="#f97316" />
          <rect x="28" y="23" width="8" height="4" fill="#ffd60a" />
          {/* P2 Frost (Cyan) Launching into air */}
          <rect x="48" y="14" width="8" height="20" fill="#06b6d4" />
          <rect x="48" y="16" width="12" height="3" fill="#38bdf8" />
          <circle cx="44" cy="22" r="3" fill="#ffd60a" />
          {/* % Badge */}
          <rect x="52" y="3" width="24" height="8" fill="#ef4444" />
          <text x="64" y="9" fill="#fff" fontSize="5" fontFamily="monospace" textAnchor="middle">120%</text>
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
// 16-BIT PIXEL ART HOT DOG & GRILL BOMB RENDERER (Chunky Stepped Pixel Blocks)
// ============================================================================
function draw3DHotDog(ctx, item) {
  ctx.save();
  ctx.translate(Math.round(item.x), Math.round(item.y));
  // Snap rotation to 16 discrete retro sprite angles for authentic 16-bit feel!
  const qAngle = Math.round(item.angle / (Math.PI / 8)) * (Math.PI / 8);
  ctx.rotate(qAngle);
  const s = item.scale || 1;
  ctx.scale(s, s);

  if (item.isBomb) {
    // 8-Bit Stepped Pixel Grill Bomb
    ctx.fillStyle = '#12041c';
    ctx.fillRect(-20, -16, 40, 32);
    ctx.fillRect(-16, -20, 32, 40);

    ctx.fillStyle = '#38124a';
    ctx.fillRect(-16, -12, 32, 24);
    ctx.fillRect(-12, -16, 24, 32);

    // Pixel highlight & danger skull cross
    ctx.fillStyle = '#ff3864';
    ctx.fillRect(-8, -4, 16, 8);
    ctx.fillRect(-4, -8, 8, 16);
    ctx.fillStyle = '#fff1d0';
    ctx.fillRect(-12, -12, 6, 6);

    // Stepped Pixel Fuse & Flickering 8-Bit Spark
    ctx.fillStyle = '#ff8c24';
    ctx.fillRect(12, -20, 6, 4);
    ctx.fillRect(18, -24, 6, 4);
    ctx.fillStyle = Math.random() > 0.5 ? '#ffbe0b' : '#ff3864';
    ctx.fillRect(22, -30, 10, 10);
    ctx.fillStyle = '#fff1d0';
    ctx.fillRect(25, -27, 4, 4);
    ctx.restore();
    return;
  }

  // If it's a sliced half-hot-dog, clip to left or right half
  const half = item.half; // 0 = whole, -1 = left half, 1 = right half
  if (half === -1) {
    ctx.beginPath();
    ctx.rect(-68, -40, 68, 80);
    ctx.clip();
  } else if (half === 1) {
    ctx.beginPath();
    ctx.rect(0, -40, 68, 80);
    ctx.clip();
  }

  // 8-Bit Pixel Outline Shadow
  ctx.fillStyle = '#160622';
  ctx.fillRect(-44, -18, 88, 36);
  ctx.fillRect(-56, -10, 112, 20);

  // Bottom Toasted Pixel Bun (Stepped 4px blocks)
  ctx.fillStyle = '#b54818';
  ctx.fillRect(-40, -14, 80, 28);
  ctx.fillStyle = '#f28c28';
  ctx.fillRect(-36, -14, 72, 12);
  ctx.fillStyle = '#ffbe0b';
  ctx.fillRect(-32, -14, 64, 4);

  // 16-Bit Pixel Sausage Link (Sticks out both ends of bun)
  ctx.fillStyle = '#8c1d2c';
  ctx.fillRect(-52, -8, 104, 16);
  ctx.fillStyle = '#d9383a';
  ctx.fillRect(-48, -8, 96, 12);
  // Crisp Pixel Specular Shine Blocks on Sausage
  ctx.fillStyle = '#fff1d0';
  ctx.fillRect(-42, -6, 16, 3);
  ctx.fillRect(-18, -6, 28, 3);
  ctx.fillRect(18, -6, 14, 3);

  // Stepped 8-Bit Pixel Mustard & Ketchup Zig-Zag Blocks
  for (let x = -36; x <= 32; x += 8) {
    const stepY = ((x / 8) % 2 === 0) ? -3 : 1;
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(x, stepY, 8, 4);
    ctx.fillStyle = '#ff3864';
    ctx.fillRect(x + 2, -stepY, 6, 3);
  }

  // Top Pixel Bun Rim Overlap
  ctx.fillStyle = '#d96b1f';
  ctx.fillRect(-38, 6, 76, 8);
  ctx.fillStyle = '#ff9e22';
  ctx.fillRect(-34, 6, 68, 4);

  // If sliced, draw the 8-bit pixel meat cross-section at x=0!
  if (half !== 0) {
    ctx.fillStyle = '#ff8fa3';
    ctx.fillRect(-4, -8, 8, 16);
    ctx.fillStyle = '#fff1d0';
    ctx.fillRect(-2, -4, 4, 8);
  }

  ctx.restore();
}

const NeoArcade = () => {
  const location = useLocation();

  const [gamePage, setGamePage] = useState(0);
  const [selectedGameId, setSelectedGameId] = useState('towerfall');
  const [showHomeMenu, setShowHomeMenu] = useState(true);
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [mode, setMode] = useState('1P');
  const [difficulty, setDifficulty] = useState('MEDIUM'); // 'EASY' | 'MEDIUM' | 'HARD'
  const [restartKey, setRestartKey] = useState(0);
  const [toast, setToast] = useState('');
  const [activeMovieTitle, setActiveMovieTitle] = useState('Jaws');

  // Miyazaki-inspired Arcade Theme: 'warm' (golden sunset) vs 'cool' (twilight night)
  // Defaults based on local system time (warm during day 6AM-7PM, cool at night)
  const [arcadeTheme, setArcadeTheme] = useState(() => {
    const h = new Date().getHours();
    return (h >= 6 && h < 19) ? 'warm' : 'cool';
  });

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
  const [gameError, setGameError] = useState(null);

  const canvasRef = useRef(null);
  // Shared virtual input state so the bottom Arcade Deck Joystick & Buttons control the games too!
  const virtualKeysRef = useRef({});

  const handleGameCrash = useCallback((err) => {
    console.error('Arcade cartridge error:', err);
    const msg = err && err.message ? String(err.message) : 'Unexpected cartridge runtime error.';
    setGameError(msg);
  }, []);

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
        setShowHomeMenu(false);
        return;
      } catch {}
    }
    if (sharedGame) {
      setSelectedGameId(sharedGame);
      setShowUploadScreen(false);
      setShowHomeMenu(false);
    }
    if (sharedMode === '2P' || sharedMode === '1P') {
      setMode(sharedMode);
    }
    if (['EASY', 'MEDIUM', 'HARD'].includes(sharedDiff)) {
      setDifficulty(sharedDiff);
    }
    if (sharedTitle) {
      setActiveMovieTitle(sharedTitle);
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

  const allGames = useMemo(() => [...BUILTIN_GAMES, ...uploadedGames], [uploadedGames]);
  const totalPages = Math.max(1, Math.ceil(allGames.length / GAMES_PER_PAGE));
  const safePage = Math.min(gamePage, totalPages - 1);
  const pagedGames = allGames.slice(
    safePage * GAMES_PER_PAGE,
    safePage * GAMES_PER_PAGE + GAMES_PER_PAGE
  );

  const activeGame = allGames.find(g => g.id === selectedGameId) || BUILTIN_GAMES[0];

  const activeGameScores = scoreRows
    .filter(r => r.game === activeGame.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Cycle games via Arcade Cabinet Deck buttons & auto-turn page
  const cycleGame = useCallback((dir) => {
    setShowUploadScreen(false);
    setSelectedGameId(prevId => {
      const idx = allGames.findIndex(g => g.id === prevId);
      const nextIdx = (idx + dir + allGames.length) % allGames.length;
      setGamePage(Math.floor(nextIdx / GAMES_PER_PAGE));
      return allGames[nextIdx].id;
    });
  }, [allGames]);

  // Global keyboard listener to animate the joystick and 3D pushbuttons in real time
  useEffect(() => {
    const onGlobalKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      const k = e.key.toLowerCase();
      setPressedUI(prev => ({ ...prev, [k]: true, [e.key]: true }));

      // If on Home Menu, use WASD / Arrows to navigate cartridges and Space / Enter to play!
      if (showHomeMenu && !showUploadScreen) {
        if (k === 'a' || k === 'arrowleft') {
          e.preventDefault();
          cycleGame(-1);
        } else if (k === 'd' || k === 'arrowright') {
          e.preventDefault();
          cycleGame(1);
        } else if (k === ' ' || k === 'enter') {
          e.preventDefault();
          setShowHomeMenu(false);
        }
      } else {
        if (k === 'escape') {
          setShowHomeMenu(true);
        }
      }
    };

    const onGlobalKeyUp = (e) => {
      const k = e.key.toLowerCase();
      setPressedUI(prev => ({ ...prev, [k]: false, [e.key]: false }));
    };

    window.addEventListener('keydown', onGlobalKeyDown);
    window.addEventListener('keyup', onGlobalKeyUp);
    return () => {
      window.removeEventListener('keydown', onGlobalKeyDown);
      window.removeEventListener('keyup', onGlobalKeyUp);
    };
  }, [showHomeMenu, showUploadScreen, cycleGame]);

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
    if (selectedGameId === 'towerfall') {
      return {
        wasdCaption: 'A/D: RUN • W: JUMP • S: AIM/DROP • SHIFT/B: DODGE',
        wSub: 'JUMP',
        aSub: 'LEFT',
        sSub: 'DROP',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — SHOOT ARROW!',
        showMouse: false
      };
    }
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
    if (selectedGameId === 'stickman') {
      return {
        wasdCaption: mode === '2P' ? 'P1: WASD MOVE | P2: ARROWS' : 'WASD/ARROWS: MOVE • W: JUMP • E: SPECIAL',
        wSub: 'JUMP',
        aSub: 'LEFT',
        sSub: 'DOWN',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — SMASH ATTACK!',
        showMouse: false
      };
    }
    if (selectedGameId === 'tanks') {
      return {
        wasdCaption: 'A/D: MOVE TANK  |  W/S: ANGLE  |  Q/E: POWER',
        wSub: 'ANG+',
        aSub: 'LEFT',
        sSub: 'ANG-',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — FIRE BOMB!',
        showMouse: true
      };
    }
    if (selectedGameId === 'raftwars') {
      return {
        wasdCaption: 'W/S: AIM ANGLE  |  A/D: SHOT POWER',
        wSub: 'ANG+',
        aSub: 'PWR-',
        sSub: 'ANG-',
        dSub: 'PWR+',
        spaceLabel: 'SPACE — FIRE VOLLEY!',
        showMouse: true
      };
    }
    if (selectedGameId === 'heist') {
      return {
        wasdCaption: 'WASD: SNEAK  |  KEYS 1-4: CREW SKILLS',
        wSub: 'UP',
        aSub: 'LEFT',
        sSub: 'DOWN',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — CRACK / DRILL!',
        showMouse: true
      };
    }
    if (selectedGameId === 'campsite') {
      return {
        wasdCaption: 'IDLE CHANCE ENCOUNTERS  |  SAVE/LOAD FILE',
        wSub: 'CALL',
        aSub: 'LEFT',
        sSub: 'SAVE',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — STOKE FIRE / ZAP!',
        showMouse: true
      };
    }
    if (selectedGameId === 'linerider') {
      return {
        wasdCaption: 'MOUSE: DRAW TRACK  |  A/D: AIR FLIP',
        wSub: 'PAN ▲',
        aSub: 'FLIP L',
        sSub: 'PAN ▼',
        dSub: 'FLIP R',
        spaceLabel: 'SPACE — RIDE / EDIT!',
        showMouse: true
      };
    }
    if (selectedGameId === 'movie8bit') {
      return {
        wasdCaption: 'SELECT CARTRIDGE ABOVE  |  WASD: MOVE  |  E: INTERACT',
        wSub: 'UP',
        aSub: 'LEFT',
        sSub: 'DOWN',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — MAIN MOVIE ACTION!',
        showMouse: true
      };
    }
    if (selectedGameId === 'escher') {
      return {
        wasdCaption: 'A/D: RUN  |  W/SPACE: JUMP  |  S/Q: FLIP GRAVITY  |  E/CLICK: ROTATE BRIDGES',
        wSub: 'JUMP',
        aSub: 'LEFT',
        sSub: 'GRAV ⇅',
        dSub: 'RIGHT',
        spaceLabel: 'SPACE — JUMP / STOMP CROWS!',
        showMouse: true
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
    setGameError(null);
  }, [showUploadScreen, showHomeMenu, selectedGameId, restartKey]);

  useEffect(() => {
    if (showUploadScreen || showHomeMenu || activeGame.isCustom || gameError) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      handleGameCrash(new Error('2D display context unavailable.'));
      return undefined;
    }

    let animId = null;
    const keys = {};

    const isPressed = (k) => Boolean(keys[k] || virtualKeysRef.current[k]);

    const onKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
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

    try {
    // ==========================================================================
    // 1. 3D HOT DOG NINJA (Fruit Ninja with 3D Shaded Hot Dogs!)
    // ==========================================================================
    if (selectedGameId === 'hotdog') {
      const W = 760, H = 480;
      let crashed = false;
      let score = 0;
      let misses = 0;
      const maxMisses = difficulty === 'EASY' ? 5 : 3;
      const spawnInterval = difficulty === 'EASY' ? 56 : difficulty === 'HARD' ? 30 : 44;
      const bombChance = difficulty === 'EASY' ? 0.06 : difficulty === 'HARD' ? 0.25 : 0.14;
      const grav = difficulty === 'EASY' ? 0.2 : difficulty === 'HARD' ? 0.31 : 0.25;
      let gameOver = false;
      let inStartScreen = true;
      let spawnTimer = 0;

      const hotdogs = [];
      const halves = [];
      const splatters = [];
      const bladeTrail = [];
      let pointer = { x: W / 2, y: H / 2, down: false };

      const getCanvasPos = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const rw = rect.width || W;
        const rh = rect.height || H;
        return {
          x: (clientX - rect.left) * (W / rw),
          y: (clientY - rect.top) * (H / rh)
        };
      };

      const sliceAt = (px, py) => {
        if (bladeTrail.length < 24) {
          bladeTrail.push({ x: px, y: py, life: 12 });
        }
        if (inStartScreen || gameOver) return;

        for (let i = hotdogs.length - 1; i >= 0; i--) {
          const hd = hotdogs[i];
          const hitRadius = hd.isBomb ? 32 : 46 * hd.scale;
          if (Math.hypot(hd.x - px, hd.y - py) < hitRadius) {
            if (hd.isBomb) {
              // Bomb Exploded!
              gameOver = true;
              addHighScore('hotdog', score);
              const blastCount = Math.min(20, Math.max(0, 70 - splatters.length));
              for (let s = 0; s < blastCount; s++) {
                splatters.push({
                  x: hd.x,
                  y: hd.y,
                  vx: (Math.random() - 0.5) * 14,
                  vy: (Math.random() - 0.5) * 14,
                  r: 4 + Math.random() * 5,
                  color: s % 2 === 0 ? '#ff2a85' : '#ffd60a',
                  life: 36
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

            // Ketchup & Mustard Splatter Particles (capped cleanly)
            const splatCount = Math.min(10, Math.max(0, 70 - splatters.length));
            for (let s = 0; s < splatCount; s++) {
              splatters.push({
                x: hd.x,
                y: hd.y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                r: 3 + Math.random() * 4,
                color: s % 2 === 0 ? '#fde047' : '#ef4444',
                life: 28
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
        if (inStartScreen) {
          inStartScreen = false;
          return;
        }
        if (gameOver) {
          score = 0;
          misses = 0;
          hotdogs.length = 0;
          halves.length = 0;
          splatters.length = 0;
          bladeTrail.length = 0;
          gameOver = false;
        }
      };

      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('touchmove', onTouchMove);
      canvas.addEventListener('mousedown', onClick);

      const loop = () => {
        if (crashed) return;
        try {
        ctx.imageSmoothingEnabled = false;

        if (inStartScreen) {
          if (isPressed(' ') || isPressed('enter')) inStartScreen = false;

          // Background
          ctx.fillStyle = '#0a0d18';
          ctx.fillRect(0, 0, W, H);

          ctx.fillStyle = 'rgba(6, 9, 18, 0.9)';
          ctx.fillRect(70, 50, W - 140, H - 100);
          ctx.strokeStyle = '#ffd60a';
          ctx.lineWidth = 4;
          ctx.strokeRect(70, 50, W - 140, H - 100);
          ctx.strokeStyle = '#ff3864';
          ctx.lineWidth = 2;
          ctx.strokeRect(76, 56, W - 152, H - 112);

          ctx.fillStyle = '#ffd60a';
          ctx.font = '18px "Press Start 2P", monospace';
          ctx.textAlign = 'center';
          ctx.fillText('3D HOT DOG NINJA', W / 2, 115);

          ctx.fillStyle = '#ff6b2b';
          ctx.font = '10px "Press Start 2P", monospace';
          ctx.fillText('DOJO SLICE COMBAT // 1989 COIN-OP', W / 2, 142);

          // Pixel Hot Dog Icon
          ctx.fillStyle = '#e07a24';
          ctx.fillRect(W / 2 - 24, 168, 48, 16);
          ctx.fillStyle = '#c92a2a';
          ctx.fillRect(W / 2 - 32, 171, 64, 10);
          ctx.fillStyle = '#ffd60a';
          ctx.fillRect(W / 2 - 20, 174, 40, 4);

          ctx.fillStyle = '#f8fafc';
          ctx.font = '9px "Press Start 2P", monospace';
          ctx.fillText('• SWIPE MOUSE OR PRESS [A / D] FOR SWEEP SLASHES', W / 2, 230);
          ctx.fillText('• SLICE FLYING 3D HOT DOGS FOR +50 POINTS', W / 2, 255);
          ctx.fillText('• BEWARE OF BOMB TRAPS - DO NOT SLICE BOMBS!', W / 2, 280);
          ctx.fillText(`• MAXIMUM STRIKES: ${maxMisses} MISSES`, W / 2, 305);

          const pulse = Math.floor(Date.now() / 350) % 2 === 0;
          ctx.fillStyle = pulse ? '#ffd60a' : '#f59e0b';
          ctx.font = '12px "Press Start 2P", monospace';
          ctx.fillText('► PRESS SPACE / CLICK TO BEGIN DOJO ◄', W / 2, 360);

          animId = requestAnimationFrame(loop);
          return;
        }

        // 16-Bit Stepped Horizon Backdrop (Miyazaki Day Sunset vs Cool Night)
        const isWarm = arcadeTheme === 'warm';
        const skyBands = isWarm
          ? ['#191024', '#2c123d', '#521447', '#8a1d45', '#c43338', '#f06226', '#ff9e22', '#fcd34d']
          : ['#030712', '#081734', '#0d284f', '#143b6b', '#1a5276', '#147487', '#2dd4bf', '#a7f3d0'];

        const bandH = Math.ceil(H / skyBands.length);
        for (let b = 0; b < skyBands.length; b++) {
          ctx.fillStyle = skyBands[b];
          ctx.fillRect(0, b * bandH, W, bandH + 2);
          if (b > 0) {
            ctx.fillStyle = skyBands[b - 1];
            for (let dx = (b % 2) * 4; dx < W; dx += 8) {
              ctx.fillRect(dx, b * bandH, 4, 4);
            }
          }
        }

        // Stepped Celestial Body (Warm Sunset Sun or Cool Moon + Stars)
        if (!isWarm) {
          // Pixel Stars in the upper twilight sky
          ctx.fillStyle = '#a7f3d0';
          const starSeed = [
            [40, 30], [120, 55], [200, 25], [310, 70], [450, 35], [560, 60], [680, 28],
            [90, 85], [250, 95], [390, 110], [510, 80], [640, 105], [710, 75]
          ];
          starSeed.forEach(([sx, sy], sIdx) => {
            const twinkle = ((Date.now() >> 8) + sIdx) % 3 === 0;
            const sz = twinkle ? 4 : 2;
            ctx.fillRect(sx, sy, sz, sz);
          });
        }

        // Giant Sliced 16-Bit Sun / Moon
        const sunCx = W >> 1;
        const sunCy = 250;
        const sunR = 86;
        for (let py = -sunR; py <= sunR; py += 4) {
          if (py > 8 && Math.floor(py / 4) % 3 === 0) continue;
          const halfW = Math.floor(Math.sqrt(Math.max(0, sunR * sunR - py * py)) / 4) * 4;
          const tRatio = (py + sunR) / (2 * sunR);
          if (isWarm) {
            ctx.fillStyle = tRatio < 0.35 ? '#fff1d0' : tRatio < 0.7 ? '#ffbe0b' : '#ff3864';
          } else {
            ctx.fillStyle = tRatio < 0.35 ? '#e0f2fe' : tRatio < 0.7 ? '#38bdf8' : '#0284c7';
          }
          ctx.fillRect(sunCx - halfW, sunCy + py, halfW * 2, 4);
        }

        // 8-Bit Pixel Clouds drifting across the sky
        const timeSec = Date.now() * 0.0008;
        const drawPixelCloud = (cx, cy, clr) => {
          ctx.fillStyle = clr;
          ctx.fillRect(cx - 32, cy, 64, 12);
          ctx.fillRect(cx - 20, cy - 8, 44, 8);
          ctx.fillRect(cx - 8, cy - 14, 24, 6);
        };
        const cloudColor = isWarm ? 'rgba(255, 235, 205, 0.42)' : 'rgba(167, 243, 208, 0.28)';
        drawPixelCloud(Math.floor((timeSec * 35) % (W + 120)) - 60, 68, cloudColor);
        drawPixelCloud(Math.floor(((timeSec * 22) + 380) % (W + 120)) - 60, 118, cloudColor);

        // 8-Bit Dojo Roof / Horizon Silhouette at Bottom
        ctx.fillStyle = isWarm ? '#14051e' : '#040816';
        ctx.fillRect(0, H - 36, W, 36);
        ctx.fillStyle = isWarm ? '#ff6b2b' : '#2dd4bf';
        ctx.fillRect(0, H - 36, W, 4);

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
          bladeTrail.length = 0;
          gameOver = false;
        }

        // 8-Bit Square Pixel Splatters on background
        for (let i = splatters.length - 1; i >= 0; i--) {
          const sp = splatters[i];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vx *= 0.92;
          sp.vy *= 0.92;
          sp.life--;
          ctx.fillStyle = sp.color;
          ctx.globalAlpha = Math.max(0, sp.life / 35);
          const sz = Math.max(4, Math.round(sp.r * 1.5));
          ctx.fillRect(Math.round(sp.x) - (sz >> 1), Math.round(sp.y) - (sz >> 1), sz, sz);
          ctx.globalAlpha = 1;
          if (sp.life <= 0) splatters.splice(i, 1);
        }

        // Update & Draw Whole 16-Bit Pixel Hot Dogs
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

        // Update & Draw Sliced 16-Bit Half Hot Dogs
        for (let i = halves.length - 1; i >= 0; i--) {
          const hf = halves[i];
          hf.vy += 0.32;
          hf.x += hf.vx;
          hf.y += hf.vy;
          hf.angle += hf.vAngle;
          draw3DHotDog(ctx, hf);
          if (hf.y > H + 80) halves.splice(i, 1);
        }

        // Stepped 16-Bit Sunset Fire Katana Blade Trail
        if (bladeTrail.length > 1) {
          for (let i = 1; i < bladeTrail.length; i++) {
            const p0 = bladeTrail[i - 1];
            const p1 = bladeTrail[i];
            const steps = 5;
            for (let s = 0; s <= steps; s++) {
              const tx = Math.round(p0.x + ((p1.x - p0.x) * s) / steps);
              const ty = Math.round(p0.y + ((p1.y - p0.y) * s) / steps);
              const sz = Math.max(4, Math.round((p1.life / 12) * 10));
              ctx.fillStyle = p1.life > 8 ? '#fff1d0' : p1.life > 4 ? '#ffbe0b' : '#ff3864';
              ctx.fillRect(tx - (sz >> 1), ty - (sz >> 1), sz, sz);
            }
          }
        }
        for (let i = bladeTrail.length - 1; i >= 0; i--) {
          bladeTrail[i].life--;
          if (bladeTrail[i].life <= 0) bladeTrail.splice(i, 1);
        }

        // 8-Bit Pixel HUD: Score + X Strikes
        ctx.fillStyle = '#160622';
        ctx.fillRect(14, 12, 160, 34);
        ctx.strokeStyle = '#ffbe0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(14, 12, 160, 34);
        ctx.fillStyle = '#ffbe0b';
        ctx.font = '14px "Press Start 2P", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${score}`, 26, 35);

        ctx.textAlign = 'right';
        ctx.font = '16px "Press Start 2P", monospace';
        for (let m = 0; m < maxMisses; m++) {
          ctx.fillStyle = m < misses ? '#ff3864' : 'rgba(255, 241, 208, 0.28)';
          ctx.fillText('X', W - 22 - m * 28, 36);
        }

        if (gameOver) {
          ctx.fillStyle = '#180726';
          ctx.fillRect(190, 155, 380, 155);
          ctx.strokeStyle = '#ffbe0b';
          ctx.lineWidth = 4;
          ctx.strokeRect(190, 155, 380, 155);
          ctx.fillStyle = '#ffbe0b';
          ctx.font = '18px "Press Start 2P", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`SCORE: ${score}`, 380, 215);
          ctx.fillStyle = '#ff6b2b';
          ctx.font = '11px "Press Start 2P", monospace';
          ctx.fillText('PRESS SPACE TO SLICE AGAIN', 380, 265);
        }

        animId = requestAnimationFrame(loop);
        } catch (err) {
          crashed = true;
          if (animId) cancelAnimationFrame(animId);
          handleGameCrash(err);
        }
      };
      loop();

      return () => {
        crashed = true;
        if (animId) cancelAnimationFrame(animId);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('mousedown', onClick);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 2. SUPER STICK BRAWL (Super Smash Bros Homage - CSS, %, Knockback & Stocks)
    // ==========================================================================
    else if (selectedGameId === 'stickman') {
      const cleanupGame = initSmashBrawlGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        mode,
        difficulty,
        playerName,
        isPressed,
        addHighScore,
        theme: arcadeTheme,
        onCrash: handleGameCrash
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // TOWERFALL: ARROW ASCENT (Matt Makes Games Homage - Archery, Air Dash & Waves)
    // ==========================================================================
    else if (selectedGameId === 'towerfall') {
      const cleanupGame = initTowerfallGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        difficulty,
        playerName,
        isPressed,
        addHighScore,
        theme: arcadeTheme,
        onCrash: handleGameCrash
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 3. SCORCHED TANKS 2D (Turn-Based Destructible Pixel Terrain + Upgrades)
    // ==========================================================================
    else if (selectedGameId === 'tanks') {
      const cleanupGame = initTankGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        mode,
        difficulty,
        playerName,
        isPressed,
        addHighScore,
        theme: arcadeTheme,
        onCrash: handleGameCrash
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 4. LINE RIDER STUDIO
    // ==========================================================================
    else if (selectedGameId === 'linerider') {
      const cleanupGame = initLineRiderGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        difficulty,
        isPressed,
        addHighScore
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 6. RAFT WARS: PIRATE SIEGE
    // ==========================================================================
    else if (selectedGameId === 'raftwars') {
      const cleanupGame = initRaftWarsGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        difficulty,
        playerName,
        isPressed,
        addHighScore
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 7. THE GRAND HEIST
    // ==========================================================================
    else if (selectedGameId === 'heist') {
      const cleanupGame = initHeistGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        difficulty,
        isPressed,
        addHighScore
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 8. 8-BIT CRYPTID CAMP (Idle Chance Encounters + Save/Load Camp File)
    // ==========================================================================
    else if (selectedGameId === 'campsite') {
      const cleanupGame = initCampsiteGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        playerName,
        isPressed,
        addHighScore,
        triggerToast
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 9. 8-BIT BLOCKBUSTERS: CURATED HAND-CRAFTED MOVIE GAMES
    // ==========================================================================
    else if (selectedGameId === 'movie8bit') {
      const cleanupGame = initMovie8BitGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        movieQuery: activeMovieTitle,
        difficulty,
        keys,
        isPressed,
        addHighScore,
        triggerToast
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    // ==========================================================================
    // 10. ESCHER VALLEY: IMPOSSIBLE ODYSSEY (Monument Valley + Mario Platformer)
    // ==========================================================================
    else if (selectedGameId === 'escher') {
      const cleanupGame = initEscherGame({
        canvas,
        ctx,
        W: 760,
        H: 480,
        difficulty,
        keys,
        isPressed,
        addHighScore,
        triggerToast
      });
      return () => {
        if (cleanupGame) cleanupGame();
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    } catch (err) {
      if (animId) cancelAnimationFrame(animId);
      handleGameCrash(err);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [showUploadScreen, showHomeMenu, selectedGameId, activeGame.isCustom, mode, difficulty, playerName, restartKey, addHighScore, activeMovieTitle, arcadeTheme, gameError, handleGameCrash]);

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

  // Live deflection for 8-way ball-top joystick (-1, 0, 1)
  const joyX = (pressedUI['d'] || pressedUI['arrowright'] ? 1 : 0) - (pressedUI['a'] || pressedUI['arrowleft'] ? 1 : 0);
  const joyY = (pressedUI['s'] || pressedUI['arrowdown'] ? 1 : 0) - (pressedUI['w'] || pressedUI['arrowup'] ? 1 : 0);
  const isJoyTilted = joyX !== 0 || joyY !== 0;

  return (
    <div className={`neo-arcade-shell theme-${arcadeTheme}`}>
      {/* =====================================================================
          ARCADE CABINET MACHINE BOX
          ===================================================================== */}
      <div className="arcade-cabinet-outer">
        {/* Top Illuminated Arcade Marquee Strip */}
        <div className="arcade-marquee-strip">
          <div className="arcade-marquee-left">
            <span className="arcade-marquee-badge">1989 COIN-OP</span>
            <span className="arcade-marquee-title">
              {showUploadScreen
                ? 'UPLOAD HTML GAME'
                : showHomeMenu
                ? '★ SELECT YOUR GAME ★'
                : activeGame.title.toUpperCase()}
            </span>
          </div>

          <div className="arcade-marquee-right">
            <button
              type="button"
              className="theme-switch-btn"
              onClick={() => setArcadeTheme(t => (t === 'warm' ? 'cool' : 'warm'))}
              title="Toggle Miyazaki Day Sunset / Cool Twilight Night"
            >
              {arcadeTheme === 'warm' ? '☀️ DAY SUNSET' : '🌙 COOL NIGHT'}
            </button>

            {!showHomeMenu && !showUploadScreen && (
              <button
                type="button"
                className="deck-pill-btn home-menu-btn"
                onClick={() => setShowHomeMenu(true)}
                title="Return to Game Selection (ESC)"
              >
                ◀ MENU
              </button>
            )}

            {(!activeGame.isCustom || activeGame.id === 'dodger') && (
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
          </div>
        </div>

        {/* Giant CRT Game Screen Bezel */}
        <div className="arcade-Bezel">
          {toast && <div className="arcade-toast">{toast}</div>}

          {/* Quick Floating Top Bar when inside an active game */}
          {!showHomeMenu && !showUploadScreen && (
            <div className="crt-in-game-hud-strip">
              <button
                type="button"
                className="crt-menu-return-btn"
                onClick={() => setShowHomeMenu(true)}
              >
                ◀ MENU (ESC)
              </button>
            </div>
          )}

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
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffbe0b' }}>
                  DROP .HTML FILE HERE
                </div>
                <div style={{ fontSize: '10px', color: '#f5c299' }}>
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
          ) : showHomeMenu ? (
            /* ===================================================================
               ON-SCREEN RETRO ARCADE "SELECT YOUR GAME" HOMEPAGE MENU (NO SCROLL)
               =================================================================== */
            <div className="crt-home-screen">
              <div className="crt-pixel-scenery">
                <div className="crt-celestial-body" />
                <div className="crt-pixel-mountains" />
              </div>

              <div className="crt-home-header">
                <div className="crt-home-title-block">
                  <h2 className="crt-home-main-title">★ SELECT GAME ★</h2>
                  <span className="crt-home-subtitle">
                    [A/D / ARROWS] SELECT • [SPACE] PLAY
                  </span>
                </div>

                {totalPages > 1 && (
                  <div className="crt-pager" role="navigation" aria-label="Game Pages">
                    <button
                      type="button"
                      className="tag-filter-pill"
                      onClick={() => setGamePage(p => (p - 1 + totalPages) % totalPages)}
                    >
                      ◄
                    </button>
                    <span className="crt-page-indicator">
                      PAGE {safePage + 1}/{totalPages}
                    </span>
                    <button
                      type="button"
                      className="tag-filter-pill"
                      onClick={() => setGamePage(p => (p + 1) % totalPages)}
                    >
                      ►
                    </button>
                  </div>
                )}
              </div>

              {/* Paged Cartridge Grid (Fits cleanly inside CRT screen with zero scrolling) */}
              <div className="crt-cartridge-grid">
                {pagedGames.map(g => {
                  const isSelected = selectedGameId === g.id;
                  return (
                    <div
                      key={g.id}
                      className={`crt-cartridge-card ${isSelected ? 'focused' : ''}`}
                      onClick={() => {
                        setSelectedGameId(g.id);
                        setShowHomeMenu(false);
                      }}
                    >
                      <div className="crt-cartridge-art">
                        <GamePreviewThumb gameId={g.id} />
                      </div>

                      <h3 className="crt-cartridge-title">{g.title}</h3>

                      {g.desc && (
                        <p className="crt-cartridge-desc">{g.desc}</p>
                      )}

                      <button
                        type="button"
                        className="crt-cartridge-play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGameId(g.id);
                          setShowHomeMenu(false);
                        }}
                      >
                        {isSelected ? 'PLAY NOW ▶' : 'SELECT'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* CRT Footer Bar: High Scores & Quick Actions */}
              <div className="crt-home-footer">
                <div className="crt-scores-inline">
                  <span style={{ color: '#ffbe0b' }}>TOP:</span>
                  {activeGameScores.length > 0 ? (
                    activeGameScores.map((r, i) => (
                      <span key={i} className="crt-score-pill">
                        #{i + 1} {r.player}: {r.score}
                      </span>
                    ))
                  ) : (
                    <span className="crt-score-pill">NO SCORES YET</span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="text"
                    maxLength={10}
                    className="sidebar-name-mini"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                    placeholder="PLAYER"
                    title="Player Name"
                  />
                  <button
                    type="button"
                    className="tag-filter-pill"
                    onClick={handleDownloadCsv}
                    title="Download highscores.csv"
                  >
                    CSV ⬇
                  </button>
                  <button
                    type="button"
                    className="tag-filter-pill"
                    style={{ background: '#ff6b2b', color: '#160622', borderColor: '#ffbe0b' }}
                    onClick={() => setShowUploadScreen(true)}
                  >
                    + UPLOAD
                  </button>
                </div>
              </div>
            </div>
          ) : gameError ? (
            <div className="crt-crash-screen" role="alert">
              <div className="crt-crash-box">
                <h3 className="crt-crash-title">⚠ CARTRIDGE FAULT ⚠</h3>
                <p className="crt-crash-subtitle">
                  {activeGame.title} hit a runtime exception and halted safely.
                </p>
                <div className="crt-crash-detail">{gameError}</div>
                <div className="crt-crash-actions">
                  <button
                    type="button"
                    className="crt-cartridge-play-btn"
                    onClick={() => {
                      setGameError(null);
                      setRestartKey(k => k + 1);
                    }}
                  >
                    ↻ REBOOT GAME
                  </button>
                  <button
                    type="button"
                    className="tag-filter-pill"
                    onClick={() => {
                      setGameError(null);
                      setShowHomeMenu(true);
                    }}
                  >
                    ◄ SELECT GAME
                  </button>
                </div>
              </div>
            </div>
          ) : activeGame.isCustom ? (
            <iframe
              key={`${activeGame.id}-${difficulty}-${restartKey}`}
              title={activeGame.title}
              srcDoc={activeGame.htmlContent}
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

        {/* =====================================================================
            SLANTED ARCADE CONTROL PANEL (ANIMATED JOYSTICK + 3D PUSHBUTTONS)
            ===================================================================== */}
        <div className="arcade-control-deck">
          <div className="deck-left-hardware">
            {/* 8-Way Animated Physical Joystick */}
            <div className="joystick-station">
              <div
                className={`joystick-base-plate ${isJoyTilted ? 'tilted' : ''}`}
                style={{ '--jx': joyX, '--jy': joyY }}
              >
                <button
                  type="button"
                  className={`joy-dir-sensor up ${pressedUI['w'] || pressedUI['arrowup'] ? 'active' : ''}`}
                  onMouseDown={() => holdVirtualKey('w', true)}
                  onMouseUp={() => holdVirtualKey('w', false)}
                  onMouseLeave={() => holdVirtualKey('w', false)}
                  title="Up (W / ArrowUp)"
                >
                  ▲
                </button>
                <button
                  type="button"
                  className={`joy-dir-sensor left ${pressedUI['a'] || pressedUI['arrowleft'] ? 'active' : ''}`}
                  onMouseDown={() => {
                    holdVirtualKey('a', true);
                    if (showHomeMenu) cycleGame(-1);
                  }}
                  onMouseUp={() => holdVirtualKey('a', false)}
                  onMouseLeave={() => holdVirtualKey('a', false)}
                  title="Left (A / ArrowLeft)"
                >
                  ◄
                </button>
                <div className="joystick-dust-washer">
                  <div className="joystick-shaft" />
                  <div className="joystick-ball-top" />
                </div>
                <button
                  type="button"
                  className={`joy-dir-sensor right ${pressedUI['d'] || pressedUI['arrowright'] ? 'active' : ''}`}
                  onMouseDown={() => {
                    holdVirtualKey('d', true);
                    if (showHomeMenu) cycleGame(1);
                  }}
                  onMouseUp={() => holdVirtualKey('d', false)}
                  onMouseLeave={() => holdVirtualKey('d', false)}
                  title="Right (D / ArrowRight)"
                >
                  ►
                </button>
                <button
                  type="button"
                  className={`joy-dir-sensor down ${pressedUI['s'] || pressedUI['arrowdown'] ? 'active' : ''}`}
                  onMouseDown={() => holdVirtualKey('s', true)}
                  onMouseUp={() => holdVirtualKey('s', false)}
                  onMouseLeave={() => holdVirtualKey('s', false)}
                  title="Down (S / ArrowDown)"
                >
                  ▼
                </button>
              </div>
              <span className="key-cluster-caption">
                {showHomeMenu ? 'SELECT: [A/D/ARROWS]' : deckLabels.wasdCaption}
              </span>
            </div>

            {/* 3D Physical Pushbuttons (Animated Plungers that press into sockets) */}
            <div className="arcade-pushbuttons-grid">
              {/* PRIMARY FIRE / ACTION RED PLUNGER */}
              <div className="arcade-btn-col">
                <div className="arcade-socket">
                  <button
                    type="button"
                    className={`arcade-plunger btn-fire ${pressedUI[' '] || pressedUI['enter'] ? 'pressed' : ''}`}
                    onMouseDown={() => {
                      holdVirtualKey(' ', true);
                      if (showHomeMenu) setShowHomeMenu(false);
                    }}
                    onMouseUp={() => holdVirtualKey(' ', false)}
                    onMouseLeave={() => holdVirtualKey(' ', false)}
                    title="Fire / Jump / Action (Space / Enter)"
                  >
                    <span className="plunger-key-badge">[ SPACE ]</span>
                    <span className="plunger-sub-label">
                      {showHomeMenu ? 'PLAY GAME' : deckLabels.spaceLabel.split('—')[1] || 'FIRE'}
                    </span>
                  </button>
                </div>
                <span className="key-cluster-caption">ACTION 1</span>
              </div>

              {/* SECONDARY ALT / SHOP / BOMB GOLD PLUNGER */}
              <div className="arcade-btn-col">
                <div className="arcade-socket">
                  <button
                    type="button"
                    className={`arcade-plunger btn-gold ${pressedUI['b'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('b', true)}
                    onMouseUp={() => holdVirtualKey('b', false)}
                    onMouseLeave={() => holdVirtualKey('b', false)}
                    title="Shop / Bomb / Special (B)"
                  >
                    <span className="plunger-key-badge">[ B ]</span>
                    <span className="plunger-sub-label">SHOP / BOMB</span>
                  </button>
                </div>
                <span className="key-cluster-caption">ACTION 2</span>
              </div>

              {/* AUXILIARY PWR- / ANG- ORANGE PLUNGER */}
              <div className="arcade-btn-col">
                <div className="arcade-socket">
                  <button
                    type="button"
                    className={`arcade-plunger btn-orange ${pressedUI['q'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('q', true)}
                    onMouseUp={() => holdVirtualKey('q', false)}
                    onMouseLeave={() => holdVirtualKey('q', false)}
                    title="Power - / Elevation (Q)"
                  >
                    <span className="plunger-key-badge">[ Q ]</span>
                    <span className="plunger-sub-label">PWR -</span>
                  </button>
                </div>
                <span className="key-cluster-caption">POWER -</span>
              </div>

              {/* AUXILIARY PWR+ / ANG+ VIOLET PLUNGER */}
              <div className="arcade-btn-col">
                <div className="arcade-socket">
                  <button
                    type="button"
                    className={`arcade-plunger btn-violet ${pressedUI['e'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('e', true)}
                    onMouseUp={() => holdVirtualKey('e', false)}
                    onMouseLeave={() => holdVirtualKey('e', false)}
                    title="Power + / Elevation (E)"
                  >
                    <span className="plunger-key-badge">[ E ]</span>
                    <span className="plunger-sub-label">PWR +</span>
                  </button>
                </div>
                <span className="key-cluster-caption">POWER +</span>
              </div>

              {/* WEAPON CYCLE PLUNGER */}
              <div className="arcade-btn-col">
                <div className="arcade-socket">
                  <button
                    type="button"
                    className={`arcade-plunger btn-gold ${pressedUI['c'] ? 'pressed' : ''}`}
                    onMouseDown={() => holdVirtualKey('c', true)}
                    onMouseUp={() => holdVirtualKey('c', false)}
                    onMouseLeave={() => holdVirtualKey('c', false)}
                    title="Cycle Weapon (C)"
                  >
                    <span className="plunger-key-badge">[ C ]</span>
                    <span className="plunger-sub-label">WEAPON</span>
                  </button>
                </div>
                <span className="key-cluster-caption">CYCLE</span>
              </div>
            </div>
          </div>

          {/* Right Cabinet System Controls */}
          <div className="deck-center-controls">
            <button
              type="button"
              className="deck-pill-btn home-menu-btn"
              onClick={() => setArcadeTheme(t => (t === 'warm' ? 'cool' : 'warm'))}
              title="Toggle Miyazaki Day Sunset / Cool Twilight Night"
            >
              {arcadeTheme === 'warm' ? '☀️ DAY' : '🌙 NIGHT'}
            </button>

            <button
              type="button"
              className={`deck-pill-btn home-menu-btn ${showHomeMenu ? 'pressed' : ''}`}
              onClick={() => setShowHomeMenu(m => !m)}
              title="Toggle Game Selection Menu"
            >
              {showHomeMenu ? 'RESUME ▶' : '🕹️ MENU'}
            </button>

            {activeGame.supports2P && (
              <button
                type="button"
                className={`deck-pill-btn ${mode === '2P' ? 'active-mode' : ''}`}
                onClick={() => setMode(m => (m === '1P' ? '2P' : '1P'))}
              >
                {mode === '2P' ? '👥 2P ON' : '1P / 2P'}
              </button>
            )}

            <button
              type="button"
              className="deck-pill-btn"
              onClick={() => setRestartKey(k => k + 1)}
              title="Reset Round"
            >
              ↻ RESET
            </button>

            <button
              type="button"
              className="deck-pill-btn share-btn"
              onClick={() => handleShareGame(activeGame)}
            >
              🔗 SHARE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoArcade;
