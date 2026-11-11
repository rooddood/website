import { QUICK_MOVIE_PICKS, generateMovieConfig, drawLoadingPosterArt } from './movieCatalog';

export { QUICK_MOVIE_PICKS };

// ============================================================================
// 8-BIT BLOCKBUSTERS ENGINE (Celeste / Noita / Hollow Knight / Miyazaki Palette)
// ============================================================================
export function initMovie8BitGame({
  canvas,
  ctx,
  W = 760,
  H = 480,
  movieQuery,
  movieTitle,
  difficulty = 'MEDIUM',
  isPressed,
  keys,
  addHighScore,
  saveScore,
  triggerToast
}) {
  const movie = generateMovieConfig(movieQuery || movieTitle || 'Jaws');
  const recordScore = addHighScore || saveScore || (() => {});

  // Safe key reader (works whether caller passes isPressed(k), keys[k], or local listener)
  const localKeys = {};
  const checkKey = (k) => {
    const low = k.toLowerCase();
    if (typeof isPressed === 'function' && isPressed(low)) return true;
    if (keys && keys[low]) return true;
    return Boolean(localKeys[low]);
  };

  const localMouse = { x: W / 2, y: H / 2 };

  let screenPhase = 'LOADING'; // 'LOADING' | 'PLAYING' | 'VICTORY' | 'GAMEOVER'
  let loadProgress = 0;
  let frame = 0;
  let score = 0;
  let screenShake = 0;
  let dialogueBox = {
    speaker: movie.npc.name,
    text: movie.npc.lines[0],
    timer: 260
  };

  // Noita / Celeste style physical particles + ambient dust/rain/spice motes + afterimages
  let particles = [];
  let afterimages = [];
  const ambientMotes = Array.from({ length: 42 }, (_, i) => ({
    x: (i * 73) % W,
    y: (i * 49) % H,
    r: 1.5 + (i % 3),
    spd: 0.4 + (i % 4) * 0.35,
    phase: i * 0.7
  }));

  const spawnPixels = (x, y, color, count = 16, grav = 0.12) => {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 1.2 + Math.random() * 4.8;
      particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 1.2,
        grav,
        color,
        size: 2 + Math.floor(Math.random() * 3),
        life: 22 + Math.floor(Math.random() * 22)
      });
    }
  };

  const drawGlow = (x, y, radius, hexColor) => {
    const g = ctx.createRadialGradient(x, y, 2, x, y, radius);
    g.addColorStop(0, hexColor + '88');
    g.addColorStop(0.5, hexColor + '33');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  const showLine = (idx) => {
    dialogueBox = {
      speaker: movie.npc.name,
      text: movie.npc.lines[Math.min(idx, movie.npc.lines.length - 1)],
      timer: 260
    };
  };

  const winGame = (bonus = 1500) => {
    if (screenPhase === 'VICTORY') return;
    screenPhase = 'VICTORY';
    score += bonus;
    recordScore('movie8bit', score);
    if (triggerToast) triggerToast(`🎬 CUT! THAT'S A WRAP ON ${movie.title}!`);
  };

  const loseGame = (reason) => {
    if (screenPhase === 'GAMEOVER') return;
    screenPhase = 'GAMEOVER';
    dialogueBox = { speaker: 'DIRECTOR', text: reason, timer: 400 };
    if (score > 0) recordScore('movie8bit', score);
  };

  // ==========================================================================
  // STATE FOR THE 8 CURATED BLOCKBUSTER GAMES
  // ==========================================================================
  // 1. JAWS_BOAT
  const jaws = {
    brodyX: 380,
    floodLevel: 0,
    leaks: [false, false, false, false, false],
    barrelsAttached: 0,
    tankInMouth: false,
    hasTankInHand: false,
    tankDeckX: 245,
    sharkX: 380,
    sharkY: 395,
    sharkVx: 3.3,
    sharkState: 'SWIM', // 'SWIM' | 'RAMMING' | 'STERN_JAWS'
    sharkTimer: 80,
    harpoons: []
  };

  // 2. GOONIES_CAVERN (Bone Organ Notes, Falling Stalactites, Pirate Ship Inferno)
  const goonies = {
    x: 380,
    y: 380,
    notesDone: 0, // Play 5 lit Bone Organ notes to lower the bridge to the Inferno!
    activePipe: 2,
    noteTimer: 220,
    bridgeDown: false,
    stalactites: [],
    doubloons: []
  };

  // 3. INDY_TEMPLE
  const indy = {
    x: 380,
    y: 430,
    act: 1,
    whipTimer: 0,
    sandWeight: 0,
    pouring: false,
    boulderY: -65,
    boulderSpeed: difficulty === 'HARD' ? 2.1 : 1.7,
    darts: [],
    tiles: []
  };

  // 4. STAR_WARS_TRENCH
  const trench = {
    shipX: 0,
    shipY: 20,
    shields: 100,
    distToPort: 2600,
    walls: [],
    ties: [],
    lasers: []
  };

  // 5. DUNE_SANDWORM (Rhythmic Sandwalk, 3 Fremen Thumpers, Mount Shai-Hulud)
  const dune = {
    x: 120,
    y: 380,
    rhythmTremor: 0, // 0..100 (Walking raises tremor; pausing lowers it!)
    thumpersPlanted: 0,
    ridingWorm: false,
    wormRideDist: 1600,
    wormX: 680,
    wormY: 250,
    thumpers: [
      { x: 240, y: 170, planted: false },
      { x: 540, y: 155, planted: false },
      { x: 560, y: 370, planted: false }
    ],
    harvesters: []
  };

  // 6. JURASSIC_STEALTH
  const jurassic = {
    x: 95,
    y: 410,
    moving: false,
    flaresLeft: 4,
    activeFlare: null,
    rexX: 400,
    rexY: 230,
    rexAngle: 0,
    rexTargetX: 520,
    rexTargetY: 250,
    breakers: [
      { x: 185, y: 125, progress: 0, done: false },
      { x: 585, y: 130, progress: 0, done: false },
      { x: 605, y: 375, progress: 0, done: false }
    ],
    jeep: { x: 88, y: 415 }
  };

  // 7. BTTF_88MPH
  const bttf = {
    carX: 0,
    mph: 15,
    gear: 1,
    rpm: 24,
    wireDist: 2500,
    roadZ: 0,
    obstacles: []
  };

  // 8. MATRIX_DODGE
  const matrix = {
    x: 380,
    y: 275,
    hp: 100,
    focus: 100,
    belief: 0,
    limboActive: false,
    bullets: [],
    agents: [
      { x: 125, y: 125, hp: 100, cd: 45 },
      { x: 635, y: 125, hp: 100, cd: 65 },
      { x: 380, y: 88, hp: 150, cd: 35 }
    ]
  };

  const initMode = () => {
    screenPhase = 'PLAYING';
    score = 0;
    particles = [];
    afterimages = [];
    showLine(0);

    if (movie.mode === 'JAWS_BOAT') {
      jaws.brodyX = 380;
      jaws.floodLevel = 6;
      jaws.leaks = [false, false, false, false, false];
      jaws.barrelsAttached = 0;
      jaws.tankInMouth = false;
      jaws.hasTankInHand = false;
      jaws.sharkX = 240;
      jaws.sharkY = 395;
      jaws.sharkState = 'SWIM';
      jaws.sharkTimer = 75;
      jaws.harpoons = [];
    } else if (movie.mode === 'GOONIES_CAVERN') {
      goonies.x = 380;
      goonies.y = 375;
      goonies.notesDone = 0;
      goonies.activePipe = Math.floor(Math.random() * 5);
      goonies.noteTimer = 240;
      goonies.bridgeDown = false;
      goonies.stalactites = [];
      goonies.doubloons = [
        { x: 210, y: 310, taken: false },
        { x: 550, y: 310, taken: false },
        { x: 380, y: 270, taken: false }
      ];
    } else if (movie.mode === 'INDY_TEMPLE') {
      indy.x = 380;
      indy.y = 435;
      indy.act = 1;
      indy.sandWeight = 0;
      indy.pouring = false;
      indy.boulderY = -70;
      indy.darts = [];
      indy.tiles = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 7; c++) {
          const isSkull = (r + c) % 2 === 1 && c !== 3;
          indy.tiles.push({
            x: 170 + c * 60,
            y: 250 + r * 38,
            w: 54,
            h: 32,
            skull: isSkull,
            triggered: false
          });
        }
      }
    } else if (movie.mode === 'STAR_WARS_TRENCH') {
      trench.shipX = 0;
      trench.shipY = 20;
      trench.shields = 100;
      trench.distToPort = 2500;
      trench.walls = [];
      trench.ties = [];
      trench.lasers = [];
    } else if (movie.mode === 'DUNE_SANDWORM') {
      dune.x = 110;
      dune.y = 390;
      dune.rhythmTremor = 0;
      dune.thumpersPlanted = 0;
      dune.ridingWorm = false;
      dune.wormRideDist = 1500;
      dune.wormX = 690;
      dune.wormY = 250;
      dune.thumpers.forEach(t => { t.planted = false; });
      dune.harvesters = [];
    } else if (movie.mode === 'JURASSIC_STEALTH') {
      jurassic.x = 95;
      jurassic.y = 410;
      jurassic.flaresLeft = 4;
      jurassic.activeFlare = null;
      jurassic.rexX = 390;
      jurassic.rexY = 230;
      jurassic.breakers.forEach(b => { b.progress = 0; b.done = false; });
    } else if (movie.mode === 'BTTF_88MPH') {
      bttf.carX = 0;
      bttf.mph = 15;
      bttf.gear = 1;
      bttf.rpm = 24;
      bttf.wireDist = 2500;
      bttf.obstacles = [];
    } else if (movie.mode === 'MATRIX_DODGE') {
      matrix.x = 380;
      matrix.y = 275;
      matrix.hp = 100;
      matrix.focus = 100;
      matrix.belief = 0;
      matrix.bullets = [];
      matrix.agents.forEach((a, i) => {
        a.hp = i === 2 ? 150 : 100;
        a.cd = 35 + i * 20;
      });
    }
  };

  // ==========================================================================
  // DISCRETE ACTION KEY HANDLER
  // ==========================================================================
  const handleAction = (code) => {
    if (screenPhase === 'LOADING') {
      if (loadProgress >= 100) initMode();
      else loadProgress = 100;
      return;
    }
    if (screenPhase === 'VICTORY' || screenPhase === 'GAMEOVER') {
      initMode();
      return;
    }

    if (movie.mode === 'JAWS_BOAT') {
      if (code === 'e') {
        let patched = false;
        jaws.leaks.forEach((leaking, i) => {
          const lx = 190 + i * 95;
          if (leaking && Math.abs(jaws.brodyX - lx) < 50) {
            jaws.leaks[i] = false;
            patched = true;
            score += 150;
            spawnPixels(lx, 250, '#ffbe0b', 16, 0.15);
          }
        });
        if (!patched && Math.abs(jaws.brodyX - jaws.tankDeckX) < 50 && !jaws.hasTankInHand && !jaws.tankInMouth) {
          jaws.hasTankInHand = true;
          showLine(1);
        } else if (jaws.hasTankInHand && jaws.sharkState === 'STERN_JAWS' && jaws.brodyX > 460) {
          jaws.hasTankInHand = false;
          jaws.tankInMouth = true;
          score += 500;
          showLine(2);
          spawnPixels(jaws.sharkX, jaws.sharkY, '#4cc9f0', 22, 0.1);
        }
      }
      if (code === 'space' || code === 'click') {
        const tx = localMouse.x || jaws.sharkX;
        const ty = localMouse.y || jaws.sharkY;
        const ang = Math.atan2(ty - 230, tx - jaws.brodyX);
        jaws.harpoons.push({
          x: jaws.brodyX,
          y: 230,
          vx: Math.cos(ang) * 9.5,
          vy: Math.sin(ang) * 9.5,
          isBullet: jaws.barrelsAttached >= 3
        });
      }
    } else if (movie.mode === 'GOONIES_CAVERN') {
      if (code === 'space' || code === 'e' || code === 'click') {
        // Check if standing near the active glowing Bone Organ pipe!
        const pipeX = 200 + goonies.activePipe * 90;
        if (!goonies.bridgeDown && Math.abs(goonies.x - pipeX) < 48 && goonies.y > 315) {
          goonies.notesDone++;
          score += 320;
          screenShake = 6;
          spawnPixels(pipeX, 345, '#72efdd', 24, -0.05);
          goonies.activePipe = (goonies.activePipe + 1 + Math.floor(Math.random() * 4)) % 5;
          goonies.noteTimer = 230;
          if (goonies.notesDone >= 5) {
            goonies.bridgeDown = true;
            showLine(2);
          }
        }
      }
    } else if (movie.mode === 'INDY_TEMPLE') {
      if (code === 'space' || code === 'click') {
        indy.whipTimer = 18;
        if (indy.act === 1 && indy.y > 175 && indy.y < 255) {
          indy.y = 148;
          score += 250;
          spawnPixels(indy.x, indy.y, '#ffb703', 18, 0.08);
          showLine(1);
        } else if (indy.act === 3 && indy.y > 135 && indy.y < 210) {
          indy.y = 248;
          score += 250;
          spawnPixels(indy.x, indy.y, '#ffb703', 18, 0.08);
        }
      }
    } else if (movie.mode === 'STAR_WARS_TRENCH') {
      if (code === 'space' || code === 'click') {
        trench.lasers.push({ x: trench.shipX - 24, y: trench.shipY, z: 18, isTorpedo: false });
        trench.lasers.push({ x: trench.shipX + 24, y: trench.shipY, z: 18, isTorpedo: false });
      }
      if (code === 'e') {
        trench.lasers.push({ x: trench.shipX, y: trench.shipY, z: 18, isTorpedo: true });
      }
    } else if (movie.mode === 'DUNE_SANDWORM') {
      if (code === 'e' || code === 'space' || code === 'click') {
        dune.thumpers.forEach(t => {
          if (!t.planted && Math.hypot(dune.x - t.x, dune.y - t.y) < 46) {
            t.planted = true;
            dune.thumpersPlanted++;
            score += 400;
            screenShake = 8;
            spawnPixels(t.x, t.y, '#00b4d8', 24, 0.05);
            if (dune.thumpersPlanted >= 3) {
              showLine(2);
            }
          }
        });
        if (dune.thumpersPlanted >= 3 && !dune.ridingWorm && Math.hypot(dune.x - dune.wormX, dune.y - dune.wormY) < 75) {
          dune.ridingWorm = true;
          score += 600;
          screenShake = 12;
          spawnPixels(dune.wormX, dune.wormY, '#f2cc8f', 32, 0.08);
        }
      }
    } else if (movie.mode === 'JURASSIC_STEALTH') {
      if ((code === 'space' || code === 'click') && jurassic.flaresLeft > 0) {
        jurassic.flaresLeft--;
        const fx = Math.max(80, Math.min(W - 80, localMouse.x || (jurassic.x < 380 ? 610 : 150)));
        const fy = Math.max(90, Math.min(H - 60, localMouse.y || 240));
        jurassic.activeFlare = { x: fx, y: fy, timer: 260 };
        spawnPixels(fx, fy, '#ef233c', 22, 0.04);
        showLine(1);
      }
    } else if (movie.mode === 'BTTF_88MPH') {
      if (code === 'space' || code === 'e' || code === 'click') {
        if (bttf.rpm >= 64 && bttf.gear < 5) {
          bttf.gear++;
          bttf.rpm = 28;
          bttf.mph += 14.5;
          score += 320;
          screenShake = 7;
          spawnPixels(W / 2, H - 70, '#00f5d4', 24, 0.05);
        } else if (bttf.gear < 5) {
          bttf.rpm = Math.max(15, bttf.rpm - 18);
          screenShake = 4;
        }
      }
    } else if (movie.mode === 'MATRIX_DODGE') {
      if ((code === 'e' || code === 'click') && matrix.belief >= 100) {
        screenShake = 12;
        spawnPixels(matrix.x, matrix.y, '#52b788', 32, 0.02);
        if (matrix.bullets.length === 0) {
          matrix.agents.forEach(a => {
            if (a.hp > 0) {
              a.hp -= 65;
              score += 300;
              spawnPixels(a.x, a.y, '#52b788', 20, 0.05);
            }
          });
        } else {
          matrix.bullets.forEach(b => {
            b.reflected = true;
            b.vx = -b.vx * 2.3;
            b.vy = -b.vy * 2.3;
          });
        }
      }
    }
  };

  const onKeyDown = (e) => {
    const k = e.key.toLowerCase();
    localKeys[k] = true;
    if (k === ' ') handleAction('space');
    else if (k === 'e' || k === 'enter') handleAction('e');
  };
  const onKeyUp = (e) => {
    localKeys[e.key.toLowerCase()] = false;
  };
  const onMouseMove = (e) => {
    const r = canvas.getBoundingClientRect();
    localMouse.x = (e.clientX - r.left) * (W / r.width);
    localMouse.y = (e.clientY - r.top) * (H / r.height);
  };
  const onMouseDown = () => {
    handleAction('click');
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);

  // ==========================================================================
  // MAIN GAME LOOP
  // ==========================================================================
  let animId;
  const loop = () => {
    frame++;
    if (screenShake > 0) screenShake *= 0.85;
    if (dialogueBox && dialogueBox.timer > 0) dialogueBox.timer--;

    const up = checkKey('w') || checkKey('arrowup');
    const down = checkKey('s') || checkKey('arrowdown');
    const left = checkKey('a') || checkKey('arrowleft');
    const right = checkKey('d') || checkKey('arrowright');
    const holdSpace = checkKey(' ');
    const holdE = checkKey('e') || checkKey('enter');

    ctx.save();
    if (screenShake > 0.5) {
      ctx.translate((Math.random() - 0.5) * screenShake, (Math.random() - 0.5) * screenShake);
    }

    // ------------------------------------------------------------------------
    // CARTRIDGE LOADING SCREEN (Celeste / Hollow Knight Style Title Card)
    // ------------------------------------------------------------------------
    if (screenPhase === 'LOADING') {
      if (loadProgress < 100) loadProgress = Math.min(100, loadProgress + 1.6);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, movie.palette.skyTop);
      bgGrad.addColorStop(1, movie.palette.seaBot);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Floating atmospheric motes
      ambientMotes.forEach(m => {
        const my = (m.y + frame * m.spd) % H;
        ctx.fillStyle = movie.palette.foam + '55';
        ctx.fillRect(m.x, my, m.r, m.r);
      });

      ctx.strokeStyle = movie.palette.accent;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(18, 16, W - 36, H - 32);

      ctx.fillStyle = movie.palette.accent;
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`8-BIT CINEMA EDITION  //  ${movie.year}  //  ${movie.genre}`, 36, 42);

      drawLoadingPosterArt(ctx, movie, 38, 58, 220, 155, frame);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 25px monospace';
      ctx.fillText(movie.title, 278, 84);

      ctx.fillStyle = movie.palette.foam;
      ctx.font = 'bold 12px monospace';
      ctx.fillText(movie.tagline.slice(0, 56), 278, 108);

      ctx.fillStyle = 'rgba(8, 13, 26, 0.78)';
      ctx.fillRect(278, 122, 444, 92);
      ctx.strokeStyle = movie.palette.foam;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(278, 122, 444, 92);

      ctx.fillStyle = movie.palette.accent;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`STARRING: ${movie.hero.name}   |   NEMESIS: ${movie.enemy.name}`, 290, 142);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px monospace';
      const words = movie.motivation.split(' ');
      let line = '';
      let ly = 162;
      words.forEach(w => {
        if ((line + w).length > 58) {
          ctx.fillText(line, 290, ly);
          line = w + ' ';
          ly += 15;
        } else {
          line += w + ' ';
        }
      });
      if (line) ctx.fillText(line, 290, ly);

      ctx.fillStyle = 'rgba(8, 13, 26, 0.85)';
      ctx.fillRect(38, 228, W - 76, 36);
      ctx.strokeStyle = movie.palette.accent;
      ctx.strokeRect(38, 228, W - 76, 36);
      ctx.fillStyle = movie.palette.accent;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`CONTROLS: ${movie.controlsHint}`, 50, 250);

      // Cartridge Boot Bar
      ctx.fillStyle = 'rgba(8, 13, 26, 0.9)';
      ctx.fillRect(38, 286, W - 76, 28);
      ctx.strokeStyle = movie.palette.foam;
      ctx.strokeRect(38, 286, W - 76, 28);
      const blocks = Math.floor((loadProgress / 100) * 26);
      for (let i = 0; i < blocks; i++) {
        ctx.fillStyle = i % 2 === 0 ? movie.palette.accent : movie.palette.foam;
        ctx.fillRect(44 + i * 25.8, 291, 21, 18);
      }

      ctx.textAlign = 'center';
      if (loadProgress >= 100) {
        ctx.fillStyle = Math.floor(frame / 15) % 2 === 0 ? movie.palette.accent : '#ffffff';
        ctx.font = 'bold 20px monospace';
        ctx.fillText('▶ [ PRESS SPACE OR CLICK TO START MOVIE ] ◀', W / 2, 375);
      } else {
        ctx.fillStyle = movie.palette.foam;
        ctx.font = 'bold 15px monospace';
        ctx.fillText(`LOADING CARTRIDGE SHADERS & SPRITES... ${Math.floor(loadProgress)}%`, W / 2, 375);
      }
      ctx.textAlign = 'left';
      ctx.restore();
      animId = requestAnimationFrame(loop);
      return;
    }

    // ========================================================================
    // 1. JAWS_BOAT (Moonlit Miyazaki Ocean, Lantern Orca, Liquid Splash Physics)
    // ========================================================================
    if (movie.mode === 'JAWS_BOAT') {
      if (screenPhase === 'PLAYING') {
        if (left) jaws.brodyX = Math.max(170, jaws.brodyX - 4.2);
        if (right) jaws.brodyX = Math.min(590, jaws.brodyX + 4.2);

        const activeLeaks = jaws.leaks.filter(Boolean).length;
        jaws.floodLevel += activeLeaks * 0.055;
        if (jaws.floodLevel >= 100) {
          loseGame('THE ORCA SANK INTO THE MIDNIGHT SEA! PATCH DECK LEAKS WITH [E]!');
        }

        if (jaws.sharkState === 'SWIM') {
          jaws.sharkX += jaws.sharkVx;
          if (jaws.sharkX < 110 || jaws.sharkX > W - 110) jaws.sharkVx *= -1;
          jaws.sharkY = 395 + Math.sin(frame * 0.06) * 18;
          jaws.sharkTimer--;
          if (jaws.sharkTimer <= 0) {
            if (jaws.barrelsAttached >= 3) {
              jaws.sharkState = 'STERN_JAWS';
              jaws.sharkX = 595;
              jaws.sharkY = 250;
              jaws.sharkTimer = 300;
              showLine(1);
            } else {
              jaws.sharkState = 'RAMMING';
            }
          }
        } else if (jaws.sharkState === 'RAMMING') {
          jaws.sharkY -= 4.6;
          if (jaws.sharkY <= 265) {
            const plankIdx = Math.max(0, Math.min(4, Math.floor((jaws.sharkX - 160) / 95)));
            jaws.leaks[plankIdx] = true;
            jaws.floodLevel = Math.min(100, jaws.floodLevel + 8);
            screenShake = 12;
            spawnPixels(jaws.sharkX, 255, '#a8dadc', 26, 0.16);
            jaws.sharkState = 'SWIM';
            jaws.sharkY = 395;
            jaws.sharkTimer = 75;
          }
        } else if (jaws.sharkState === 'STERN_JAWS') {
          jaws.sharkTimer--;
          if (jaws.sharkTimer <= 0 && !jaws.tankInMouth) {
            jaws.sharkState = 'SWIM';
            jaws.sharkTimer = 60;
          }
        }

        for (let i = jaws.harpoons.length - 1; i >= 0; i--) {
          const h = jaws.harpoons[i];
          h.x += h.vx;
          h.y += h.vy;
          if (Math.hypot(h.x - jaws.sharkX, h.y - jaws.sharkY) < 46) {
            jaws.harpoons.splice(i, 1);
            if (jaws.tankInMouth) {
              spawnPixels(jaws.sharkX, jaws.sharkY, '#ffbe0b', 45, 0.12);
              screenShake = 22;
              winGame(2200);
            } else if (jaws.barrelsAttached < 3) {
              jaws.barrelsAttached++;
              score += 350;
              spawnPixels(jaws.sharkX, jaws.sharkY, '#ffbe0b', 20, 0.14);
              if (jaws.barrelsAttached === 3) showLine(1);
            } else {
              score += 50;
            }
            continue;
          }
          if (h.x < 0 || h.x > W || h.y > H || h.y < 0) jaws.harpoons.splice(i, 1);
        }
      }

      // Painterly Twilight Sky & Full Moon
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 260);
      skyGrad.addColorStop(0, '#0b132b');
      skyGrad.addColorStop(0.6, '#1c2541');
      skyGrad.addColorStop(1, '#3a506b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, 260);

      drawGlow(620, 105, 85, '#fefae0');
      ctx.fillStyle = '#fefae0';
      ctx.beginPath();
      ctx.arc(620, 105, 26, 0, Math.PI * 2);
      ctx.fill();

      // Deep Bioluminescent Sea Gradient
      const seaGrad = ctx.createLinearGradient(0, 250, 0, H);
      seaGrad.addColorStop(0, '#1d3557');
      seaGrad.addColorStop(0.5, '#0f203c');
      seaGrad.addColorStop(1, '#050b16');
      ctx.fillStyle = seaGrad;
      ctx.fillRect(0, 250, W, H - 250);

      const sinkY = (jaws.floodLevel / 100) * 48;
      // Orca Mast, Cabin & Warm Lantern Glow
      ctx.strokeStyle = '#a8dadc';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(340, 95 + sinkY);
      ctx.lineTo(340, 240 + sinkY);
      ctx.lineTo(175, 240 + sinkY);
      ctx.stroke();

      ctx.fillStyle = '#5c3a21';
      ctx.beginPath();
      ctx.moveTo(145, 240 + sinkY);
      ctx.lineTo(620, 240 + sinkY);
      ctx.lineTo(575, 286 + sinkY);
      ctx.lineTo(175, 286 + sinkY);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#e0e1dd';
      ctx.fillRect(285, 175 + sinkY, 105, 65);
      drawGlow(320, 200 + sinkY, 55, '#ffbe0b');
      ctx.fillStyle = '#ffbe0b';
      ctx.fillRect(302, 190 + sinkY, 32, 22);

      // Hull Plank Stations & Water Fountains
      jaws.leaks.forEach((leaking, i) => {
        const lx = 190 + i * 95;
        ctx.fillStyle = leaking ? '#e63946' : '#8d5b4c';
        ctx.fillRect(lx - 32, 240 + sinkY, 64, 9);
        if (leaking) {
          ctx.fillStyle = '#a8dadc';
          ctx.fillRect(lx - 5, 212 + sinkY - (frame % 16), 10, 28);
          ctx.fillStyle = '#ffbe0b';
          ctx.font = 'bold 10px monospace';
          ctx.fillText('[E] PATCH!', lx - 28, 204 + sinkY);
        }
      });

      // Red Pressurized O2 Tank
      if (!jaws.hasTankInHand && !jaws.tankInMouth) {
        ctx.fillStyle = '#e63946';
        ctx.fillRect(jaws.tankDeckX - 12, 225 + sinkY, 24, 13);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('O2 [E]', jaws.tankDeckX - 16, 220 + sinkY);
      }

      // Chief Brody Sprite
      ctx.fillStyle = '#ffbe0b';
      ctx.fillRect(jaws.brodyX - 7, 205 + sinkY, 14, 12);
      ctx.fillStyle = '#4cc9f0';
      ctx.fillRect(jaws.brodyX - 8, 217 + sinkY, 16, 23);
      if (jaws.hasTankInHand) {
        ctx.fillStyle = '#e63946';
        ctx.fillRect(jaws.brodyX + 8, 218 + sinkY, 18, 10);
      }

      // Bruce the Great White Shark
      drawGlow(jaws.sharkX, jaws.sharkY, 70, '#4cc9f0');
      ctx.fillStyle = '#5c677d';
      ctx.beginPath();
      ctx.ellipse(jaws.sharkX, jaws.sharkY, 60, 25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.ellipse(jaws.sharkX, jaws.sharkY + 10, 50, 12, 0, 0, Math.PI);
      ctx.fill();
      // Dorsal Fin
      ctx.fillStyle = '#33415c';
      ctx.beginPath();
      ctx.moveTo(jaws.sharkX - 8, jaws.sharkY - 22);
      ctx.lineTo(jaws.sharkX + 18, jaws.sharkY - 22);
      ctx.lineTo(jaws.sharkX + 4, jaws.sharkY - 50);
      ctx.closePath();
      ctx.fill();
      // Jaws & Teeth
      ctx.fillStyle = '#e63946';
      ctx.fillRect(jaws.sharkX - 46, jaws.sharkY - 12, 34, 20);
      ctx.fillStyle = '#ffffff';
      for (let t = 0; t < 4; t++) {
        ctx.fillRect(jaws.sharkX - 42 + t * 8, jaws.sharkY - 12, 4, 5);
        ctx.fillRect(jaws.sharkX - 42 + t * 8, jaws.sharkY + 3, 4, 5);
      }
      if (jaws.tankInMouth) {
        ctx.fillStyle = '#e63946';
        ctx.fillRect(jaws.sharkX - 42, jaws.sharkY - 5, 24, 10);
        ctx.fillStyle = '#ffbe0b';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('SHOOT O2 TANK! [SPACE / CLICK]', jaws.sharkX - 110, jaws.sharkY - 56);
      } else if (jaws.sharkState === 'STERN_JAWS') {
        ctx.fillStyle = '#a8dadc';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('RUN RIGHT & PRESS [E] TO TOSS O2 TANK IN JAWS!', 405, 170);
      }

      for (let b = 0; b < jaws.barrelsAttached; b++) {
        ctx.fillStyle = '#ffbe0b';
        ctx.fillRect(jaws.sharkX + 15 + b * 18, jaws.sharkY - 36, 14, 10);
      }

      // Rolling Sine-Wave Seafoam Foreground Crest
      ctx.strokeStyle = '#a8dadc';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 16) {
        const wy = 252 + Math.sin(x * 0.03 + frame * 0.08) * 5;
        if (x === 0) ctx.moveTo(x, wy);
        else ctx.lineTo(x, wy);
      }
      ctx.stroke();

      jaws.harpoons.forEach(h => {
        ctx.fillStyle = h.isBullet ? '#e63946' : '#ffbe0b';
        ctx.fillRect(h.x - 4, h.y - 4, 8, 8);
      });
    }

    // ========================================================================
    // 2. GOONIES_CAVERN (Hollow Knight / Celeste Bioluminescent Cavern & Organ)
    // ========================================================================
    else if (movie.mode === 'GOONIES_CAVERN') {
      if (screenPhase === 'PLAYING') {
        if (left) goonies.x = Math.max(90, goonies.x - 3.4);
        if (right) goonies.x = Math.min(W - 90, goonies.x + 3.4);
        if (up) goonies.y = Math.max(95, goonies.y - 3.4);
        if (down) goonies.y = Math.min(425, goonies.y + 3.4);

        if (!goonies.bridgeDown && goonies.y < 235) {
          goonies.y = 235;
        }

        if (!goonies.bridgeDown) {
          goonies.noteTimer--;
          if (goonies.noteTimer <= 0) {
            goonies.noteTimer = 210;
            goonies.activePipe = (goonies.activePipe + 1) % 5;
            screenShake = 8;
          }
        }

        // Falling cavern stalactites
        if (frame % 48 === 0) {
          goonies.stalactites.push({ x: 120 + Math.random() * 520, y: 60, vy: 3.6 });
        }
        for (let i = goonies.stalactites.length - 1; i >= 0; i--) {
          const s = goonies.stalactites[i];
          s.y += s.vy;
          if (Math.hypot(s.x - goonies.x, s.y - goonies.y) < 20) {
            loseGame('CRUSHED BY A CAVERN BOOBY-TRAP! PLAY 5 LIT ORGAN PIPES [SPACE]!');
          }
          if (s.y > H) {
            spawnPixels(s.x, H - 20, '#4cc9f0', 8, 0.1);
            goonies.stalactites.splice(i, 1);
          }
        }

        goonies.doubloons.forEach(d => {
          if (!d.taken && Math.hypot(goonies.x - d.x, goonies.y - d.y) < 24) {
            d.taken = true;
            score += 400;
            spawnPixels(d.x, d.y, '#ffd166', 20, 0.06);
          }
        });

        // Board the Pirate Ship Inferno at the top lagoon!
        if (goonies.bridgeDown && goonies.y <= 135 && Math.abs(goonies.x - 380) < 75) {
          winGame(2400);
        }
      }

      // Bioluminescent Cavern Backdrop (Hollow Knight / Celeste palette)
      const cavGrad = ctx.createLinearGradient(0, 0, 0, H);
      cavGrad.addColorStop(0, '#10002b');
      cavGrad.addColorStop(0.5, '#191233');
      cavGrad.addColorStop(1, '#092338');
      ctx.fillStyle = cavGrad;
      ctx.fillRect(0, 0, W, H);

      // Glowing Turquoise Lagoon & Pirate Ship Inferno at Top
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(70, 70, W - 140, 155);
      drawGlow(380, 125, 130, '#4cc9f0');

      // One-Eyed Willy's Ship "The Inferno"
      ctx.fillStyle = '#5c3a21';
      ctx.fillRect(305, 95, 150, 34);
      ctx.fillStyle = '#e0e1dd';
      ctx.fillRect(335, 64, 34, 28);
      ctx.fillRect(385, 64, 34, 28);
      ctx.fillStyle = '#ffd166';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('⛵ ONE-EYED WILLY\'S SHIP "INFERNO"', 272, 146);

      // Drawbridge across Lagoon
      if (goonies.bridgeDown) {
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(345, 150, 70, 95);
      } else {
        ctx.fillStyle = 'rgba(255, 209, 102, 0.25)';
        ctx.fillRect(345, 215, 70, 14);
      }

      // 5 Skull Bone Organ Pipes at Bottom Ledge
      for (let p = 0; p < 5; p++) {
        const px = 200 + p * 90;
        const isLit = !goonies.bridgeDown && goonies.activePipe === p;
        if (isLit) drawGlow(px, 365, 55, '#72efdd');
        ctx.fillStyle = isLit ? '#72efdd' : '#94a3b8';
        ctx.fillRect(px - 18, 335, 36, 52);
        ctx.fillStyle = '#10002b';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(isLit ? '♪[SPACE]' : '☠', px - (isLit ? 22 : 5), 365);
      }

      // Gold Doubloon Treasures
      goonies.doubloons.forEach(d => {
        if (!d.taken) {
          drawGlow(d.x, d.y, 28, '#ffd166');
          ctx.fillStyle = '#ffd166';
          ctx.beginPath();
          ctx.arc(d.x, d.y, 9, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Falling Stalactites
      goonies.stalactites.forEach(s => {
        ctx.fillStyle = '#4cc9f0';
        ctx.beginPath();
        ctx.moveTo(s.x - 8, s.y - 12);
        ctx.lineTo(s.x + 8, s.y - 12);
        ctx.lineTo(s.x, s.y + 14);
        ctx.closePath();
        ctx.fill();
      });

      // Mikey & Data Sprite with Lantern Halo
      drawGlow(goonies.x, goonies.y, 48, '#ffd166');
      ctx.fillStyle = '#ef476f';
      ctx.fillRect(goonies.x - 8, goonies.y - 14, 16, 10);
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(goonies.x - 8, goonies.y - 4, 16, 18);
    }

    // ========================================================================
    // 3. INDY_TEMPLE (Torchlit Mossy Ruin, Whip Chasm, Sandbag Weight, Boulder)
    // ========================================================================
    else if (movie.mode === 'INDY_TEMPLE') {
      if (screenPhase === 'PLAYING') {
        const spd = indy.act === 3 ? 3.8 : 2.9;
        if (indy.act !== 2) {
          if (left) indy.x = Math.max(165, indy.x - spd);
          if (right) indy.x = Math.min(595, indy.x + spd);
          if (up) indy.y = Math.max(68, indy.y - spd);
          if (down) indy.y = Math.min(450, indy.y + spd);
        }
        if (indy.whipTimer > 0) indy.whipTimer--;

        if (indy.y > 184 && indy.y < 224 && indy.whipTimer === 0) {
          loseGame('FELL INTO THE SPIKE CHASM! PRESS [SPACE] AT THE LEDGE TO WHIP-SWING!');
        }

        indy.tiles.forEach(t => {
          if (indy.x > t.x && indy.x < t.x + t.w && indy.y > t.y && indy.y < t.y + t.h && t.skull && !t.triggered) {
            t.triggered = true;
            indy.darts.push({ x: 145, y: t.y + 16, vx: 6.5 });
            indy.darts.push({ x: 615, y: t.y + 16, vx: -6.5 });
          }
        });

        if (frame % 75 === 0) {
          indy.darts.push({ x: 145, y: 270 + (frame % 3) * 45, vx: 5.2 });
        }
        for (let i = indy.darts.length - 1; i >= 0; i--) {
          const d = indy.darts[i];
          d.x += d.vx;
          if (Math.hypot(d.x - indy.x, d.y - indy.y) < 14) {
            loseGame('POISON BLOWDART! STEP ONLY ON GLOWING GOLD SUN STONES!');
          }
          if (d.x < 130 || d.x > 630) indy.darts.splice(i, 1);
        }

        if (indy.act === 1 && indy.y <= 105 && Math.abs(indy.x - 380) < 42) {
          indy.act = 2;
          showLine(1);
        }

        if (indy.act === 2) {
          if (holdE || holdSpace) {
            indy.pouring = true;
            indy.sandWeight += 0.9;
            if (indy.sandWeight > 100) {
              indy.act = 3;
              showLine(2);
            }
          } else if (indy.pouring && indy.sandWeight > 10) {
            if (indy.sandWeight >= 65 && indy.sandWeight <= 86) {
              score += 1000;
              spawnPixels(380, 82, '#52b788', 25, 0.08);
            } else {
              screenShake = 14;
            }
            indy.act = 3;
            showLine(2);
          }
        }

        if (indy.act === 3) {
          indy.boulderY += indy.boulderSpeed;
          screenShake = 3.5;
          if (Math.hypot(380 - indy.x, indy.boulderY - indy.y) < 56 || indy.boulderY > indy.y + 15) {
            loseGame('FLATTENED BY THE GIANT MOSS BOULDER! SPRINT DOWN [S] & WHIP THE CHASM [SPACE]!');
          }
          if (indy.y >= 438) winGame(2000);
        }
      }

      ctx.fillStyle = '#120f0d';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#26201b';
      ctx.fillRect(150, 50, 460, H - 60);
      ctx.strokeStyle = '#52b788';
      ctx.lineWidth = 4;
      ctx.strokeRect(150, 50, 460, H - 60);

      // Flickering Wall Torches
      [120, 260, 390].forEach(ty => {
        drawGlow(155, ty, 52 + (frame % 7), '#ffb703');
        drawGlow(605, ty, 52 + (frame % 7), '#ffb703');
      });

      // Chasm Pit
      ctx.fillStyle = '#070504';
      ctx.fillRect(154, 182, 452, 44);
      ctx.fillStyle = '#ffb703';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('SPIKE CHASM — PRESS [SPACE] TO WHIP-SWING ACROSS!', 235, 208);

      indy.tiles.forEach(t => {
        ctx.fillStyle = t.skull ? (t.triggered ? '#e63946' : '#3a322c') : '#d97706';
        ctx.fillRect(t.x, t.y, t.w, t.h);
        ctx.fillStyle = '#fefae0';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(t.skull ? '☠' : '☀', t.x + 22, t.y + 20);
      });

      // Sunlit Golden Idol Pedestal
      drawGlow(380, 78, 65, '#ffb703');
      ctx.fillStyle = '#52b788';
      ctx.fillRect(345, 62, 70, 36);
      if (indy.act < 3) {
        ctx.fillStyle = '#ffd166';
        ctx.fillRect(372, 68, 16, 22);
      }

      if (indy.act === 2) {
        ctx.fillStyle = '#120f0d';
        ctx.fillRect(220, 115, 320, 52);
        ctx.strokeStyle = '#ffb703';
        ctx.strokeRect(220, 115, 320, 52);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('HOLD [E] OR [SPACE] TO POUR SANDBAG, RELEASE IN GREEN!', 230, 133);
        ctx.fillStyle = '#334155';
        ctx.fillRect(235, 142, 290, 16);
        ctx.fillStyle = '#52b788';
        ctx.fillRect(235 + 290 * 0.65, 142, 290 * 0.21, 16);
        ctx.fillStyle = '#ffb703';
        ctx.fillRect(235, 142, (indy.sandWeight / 100) * 290, 16);
      }

      ctx.fillStyle = '#e63946';
      indy.darts.forEach(d => ctx.fillRect(d.x - 6, d.y - 2, 12, 4));

      // Indiana Jones + Torch Halo
      drawGlow(indy.x, indy.y, 44, '#ffb703');
      ctx.fillStyle = '#7f4f24';
      ctx.beginPath();
      ctx.arc(indy.x, indy.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(indy.x - 5, indy.y - 5, 10, 10);
      if (indy.whipTimer > 0) {
        ctx.strokeStyle = '#ffb703';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(indy.x, indy.y);
        ctx.lineTo(indy.x, indy.y - 46);
        ctx.stroke();
      }

      if (indy.act === 3) {
        ctx.fillStyle = '#6c757d';
        ctx.beginPath();
        ctx.arc(380, indy.boulderY, 64, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#52b788';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    }

    // ========================================================================
    // 4. STAR_WARS_TRENCH (Neon-CRT 3D Death Star Trench Run)
    // ========================================================================
    else if (movie.mode === 'STAR_WARS_TRENCH') {
      if (screenPhase === 'PLAYING') {
        if (left) trench.shipX = Math.max(-165, trench.shipX - 4.2);
        if (right) trench.shipX = Math.min(165, trench.shipX + 4.2);
        if (up) trench.shipY = Math.max(-75, trench.shipY - 3.5);
        if (down) trench.shipY = Math.min(75, trench.shipY + 3.5);

        trench.distToPort = Math.max(0, trench.distToPort - 3.6);
        if (trench.distToPort < 450 && trench.distToPort > 435) showLine(2);

        if (frame % 48 === 0 && trench.distToPort > 300) {
          trench.walls.push({ side: Math.random() > 0.5 ? -1 : 1, z: 100 });
        }
        if (frame % 65 === 0) {
          trench.ties.push({
            x: (Math.random() - 0.5) * 240,
            y: (Math.random() - 0.5) * 110,
            z: 100
          });
        }

        for (let i = trench.walls.length - 1; i >= 0; i--) {
          const w = trench.walls[i];
          w.z -= 1.85;
          if (w.z < 12 && w.z > 4 && ((w.side === -1 && trench.shipX < 0) || (w.side === 1 && trench.shipX > 0))) {
            trench.shields -= 24;
            screenShake = 10;
            trench.walls.splice(i, 1);
            if (trench.shields <= 0) loseGame('RED FIVE CLIPPED A TRENCH DEFLECTOR WALL!');
            continue;
          }
          if (w.z <= 1) trench.walls.splice(i, 1);
        }

        for (let i = trench.ties.length - 1; i >= 0; i--) {
          const t = trench.ties[i];
          t.z -= 1.4;
          if (t.z <= 6) {
            trench.shields -= 14;
            screenShake = 6;
            trench.ties.splice(i, 1);
            if (trench.shields <= 0) loseGame('DARTH VADER SHOT DOWN RED FIVE!');
            continue;
          }
        }

        for (let i = trench.lasers.length - 1; i >= 0; i--) {
          const l = trench.lasers[i];
          l.z += 4.2;
          for (let ti = trench.ties.length - 1; ti >= 0; ti--) {
            const t = trench.ties[ti];
            if (Math.abs(l.z - t.z) < 14 && Math.hypot(l.x - t.x, l.y - t.y) < 42) {
              score += 300;
              spawnPixels(W / 2 + t.x, H / 2 + t.y, '#06d6a0', 22, 0.04);
              trench.ties.splice(ti, 1);
              l.z = 999;
            }
          }
          if (l.isTorpedo && trench.distToPort <= 250 && l.z > 55 && Math.hypot(l.x, l.y) < 48) {
            winGame(3000);
          }
          if (l.z > 110) trench.lasers.splice(i, 1);
        }
      }

      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, W, H);
      const vx = W / 2 - trench.shipX * 0.25;
      const vy = H / 2 - trench.shipY * 0.25;

      ctx.strokeStyle = '#4361ee';
      ctx.lineWidth = 2;
      for (let d = 1; d <= 6; d++) {
        const s = ((d * 18 - (frame * 1.6) % 18) / 100);
        ctx.strokeRect(vx - s * 360, vy - s * 210, s * 720, s * 420);
      }

      trench.walls.forEach(w => {
        const s = 1 - w.z / 100;
        const wx = w.side === -1 ? vx - s * 340 : vx;
        ctx.fillStyle = 'rgba(255, 0, 110, 0.42)';
        ctx.fillRect(wx, vy - s * 180, s * 340, s * 360);
      });

      trench.ties.forEach(t => {
        const s = 1 - t.z / 100;
        const tx = vx + t.x * s;
        const ty = vy + t.y * s;
        drawGlow(tx, ty, 24 * s, '#4cc9f0');
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(tx, ty, 6 + s * 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(tx - 16 * s, ty - 18 * s, 4, 36 * s);
        ctx.fillRect(tx + 12 * s, ty - 18 * s, 4, 36 * s);
      });

      if (trench.distToPort <= 250) {
        drawGlow(vx, vy, 55, '#ffbe0b');
        ctx.strokeStyle = '#ffbe0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(vx, vy, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = '#ffbe0b';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('EXHAUST PORT — AIM HERE & PRESS [E]!', vx - 115, vy - 38);
      }

      trench.lasers.forEach(l => {
        const s = 1 - l.z / 110;
        ctx.fillStyle = l.isTorpedo ? '#ffbe0b' : '#06d6a0';
        ctx.beginPath();
        ctx.arc(vx + l.x * s, vy + l.y * s, l.isTorpedo ? 8 : 4, 0, Math.PI * 2);
        ctx.fill();
      });

      const sx = W / 2 + trench.shipX;
      const sy = H / 2 + trench.shipY + 85;
      ctx.strokeStyle = '#06d6a0';
      ctx.strokeRect(W / 2 + trench.shipX - 18, H / 2 + trench.shipY - 18, 36, 36);
      drawGlow(sx, sy, 34, '#ff006e');
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(sx - 28, sy - 6, 56, 12);
      ctx.fillStyle = '#ff006e';
      ctx.fillRect(sx - 12, sy - 10, 24, 18);
    }

    // ========================================================================
    // 5. DUNE_SANDWORM (Arrakis Spice Dunes, Rhythmic Sandwalk & Shai-Hulud)
    // ========================================================================
    else if (movie.mode === 'DUNE_SANDWORM') {
      if (screenPhase === 'PLAYING') {
        if (!dune.ridingWorm) {
          const isMoving = up || down || left || right;
          if (left) dune.x = Math.max(55, dune.x - 2.8);
          if (right) dune.x = Math.min(W - 55, dune.x + 2.8);
          if (up) dune.y = Math.max(85, dune.y - 2.8);
          if (down) dune.y = Math.min(H - 45, dune.y + 2.8);

          if (isMoving) {
            dune.rhythmTremor = Math.min(100, dune.rhythmTremor + 0.45);
          } else {
            dune.rhythmTremor = Math.max(0, dune.rhythmTremor - 1.15);
          }

          if (dune.rhythmTremor >= 100 && dune.thumpersPlanted < 3) {
            loseGame('SWALLOWED BY SHAI-HULUD! PAUSE WALKING WHEN TREMOR SPIKES TO WALK WITHOUT RHYTHM!');
          }

          if (dune.thumpersPlanted >= 3) {
            // Giant Sandworm approaches to be mounted!
            dune.wormX += (380 - dune.wormX) * 0.03;
            dune.wormY += (250 - dune.wormY) * 0.03;
          }
        } else {
          // Riding Shai-Hulud across the Spice Plains!
          if (left) dune.wormX = Math.max(120, dune.wormX - 4.5);
          if (right) dune.wormX = Math.min(W - 120, dune.wormX + 4.5);
          if (up) dune.wormY = Math.max(120, dune.wormY - 4.5);
          if (down) dune.wormY = Math.min(H - 60, dune.wormY + 4.5);
          dune.wormRideDist -= 4.5;
          score += 8;
          screenShake = 2.5;
          if (dune.wormRideDist <= 0) winGame(2600);
        }
      }

      // Painterly Arrakis Twilight Desert Gradient
      const duneGrad = ctx.createLinearGradient(0, 0, 0, H);
      duneGrad.addColorStop(0, '#1d1e2c');
      duneGrad.addColorStop(0.28, '#3d405b');
      duneGrad.addColorStop(0.32, '#e07a5f');
      duneGrad.addColorStop(1, '#9c4127');
      ctx.fillStyle = duneGrad;
      ctx.fillRect(0, 0, W, H);

      // Twin Moons of Arrakis
      drawGlow(620, 88, 45, '#f2cc8f');
      ctx.fillStyle = '#f2cc8f';
      ctx.beginPath();
      ctx.arc(620, 88, 14, 0, Math.PI * 2);
      ctx.arc(655, 105, 8, 0, Math.PI * 2);
      ctx.fill();

      // Shimmering Blue Spice Melange Motes
      ambientMotes.forEach(m => {
        const mx = (m.x + frame * m.spd * 1.5) % W;
        ctx.fillStyle = '#00b4d8';
        ctx.fillRect(mx, 160 + (m.y % 290), 3, 3);
      });

      // Fremen Thumpers
      dune.thumpers.forEach((t, idx) => {
        if (t.planted) drawGlow(t.x, t.y, 48 + (frame % 14), '#00b4d8');
        ctx.fillStyle = t.planted ? '#00b4d8' : '#f2cc8f';
        ctx.fillRect(t.x - 10, t.y - 16, 20, 32);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(t.planted ? 'THUMPING!' : `THUMPER #${idx + 1} [E]`, t.x - 36, t.y - 22);
      });

      // Colossal Sandworm (Shai-Hulud)
      if (dune.thumpersPlanted >= 3 || dune.rhythmTremor > 65) {
        for (let seg = 5; seg >= 0; seg--) {
          const sx = dune.wormX + seg * 26;
          const sy = dune.wormY + Math.sin(frame * 0.1 + seg) * 12;
          ctx.fillStyle = seg === 0 ? '#f2cc8f' : '#b55338';
          ctx.beginPath();
          ctx.arc(sx, sy, 34 - seg * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        if (dune.thumpersPlanted >= 3 && !dune.ridingWorm) {
          ctx.fillStyle = '#00b4d8';
          ctx.font = 'bold 11px monospace';
          ctx.fillText('APPROACH SHAI-HULUD & PRESS [SPACE] TO RIDE!', dune.wormX - 130, dune.wormY - 45);
        }
      }

      // Paul Atreides (Eyes of Ibad Blue Glow)
      const px = dune.ridingWorm ? dune.wormX : dune.x;
      const py = dune.ridingWorm ? dune.wormY - 22 : dune.y;
      drawGlow(px, py, 32, '#00b4d8');
      ctx.fillStyle = '#2b2d42';
      ctx.fillRect(px - 8, py - 12, 16, 24);
      ctx.fillStyle = '#00b4d8';
      ctx.fillRect(px - 5, py - 9, 10, 4);
    }

    // ========================================================================
    // 6. JURASSIC_STEALTH (Rainstorm Jungle & T-Rex Vision Stealth)
    // ========================================================================
    else if (movie.mode === 'JURASSIC_STEALTH') {
      if (screenPhase === 'PLAYING') {
        jurassic.moving = Boolean(up || down || left || right);
        if (left) jurassic.x = Math.max(50, jurassic.x - 2.6);
        if (right) jurassic.x = Math.min(W - 50, jurassic.x + 2.6);
        if (up) jurassic.y = Math.max(75, jurassic.y - 2.6);
        if (down) jurassic.y = Math.min(H - 45, jurassic.y + 2.6);

        if (jurassic.activeFlare) {
          jurassic.activeFlare.timer--;
          jurassic.rexTargetX = jurassic.activeFlare.x;
          jurassic.rexTargetY = jurassic.activeFlare.y;
          if (jurassic.activeFlare.timer <= 0) jurassic.activeFlare = null;
        } else if (frame % 140 === 0) {
          jurassic.rexTargetX = 140 + Math.random() * 480;
          jurassic.rexTargetY = 120 + Math.random() * 260;
        }

        const desiredAng = Math.atan2(jurassic.rexTargetY - jurassic.rexY, jurassic.rexTargetX - jurassic.rexX);
        jurassic.rexAngle += Math.sin(desiredAng - jurassic.rexAngle) * 0.045;
        jurassic.rexX += Math.cos(jurassic.rexAngle) * 1.65;
        jurassic.rexY += Math.sin(jurassic.rexAngle) * 1.65;

        const distToPlayer = Math.hypot(jurassic.x - jurassic.rexX, jurassic.y - jurassic.rexY);
        const angToPlayer = Math.atan2(jurassic.y - jurassic.rexY, jurassic.x - jurassic.rexX);
        const angDiff = Math.abs(Math.atan2(Math.sin(angToPlayer - jurassic.rexAngle), Math.cos(angToPlayer - jurassic.rexAngle)));

        if (distToPlayer < 210 && angDiff < 0.52 && jurassic.moving && !jurassic.activeFlare) {
          jurassic.rexTargetX = jurassic.x;
          jurassic.rexTargetY = jurassic.y;
          jurassic.rexX += Math.cos(angToPlayer) * 2.4;
          jurassic.rexY += Math.sin(angToPlayer) * 2.4;
        }
        if (distToPlayer < 34) {
          loseGame('DEVOURED BY THE T-REX! FREEZE STILL WHEN ITS VISION CONE SWEEPS OVER YOU!');
        }

        let allDone = true;
        jurassic.breakers.forEach(b => {
          if (!b.done) {
            allDone = false;
            if (Math.hypot(jurassic.x - b.x, jurassic.y - b.y) < 42 && (holdE || holdSpace)) {
              b.progress += 1.6;
              if (b.progress >= 100) {
                b.done = true;
                score += 450;
                spawnPixels(b.x, b.y, '#74c69d', 20, 0.08);
              }
            }
          }
        });

        if (allDone && Math.hypot(jurassic.x - jurassic.jeep.x, jurassic.y - jurassic.jeep.y) < 48) {
          winGame(2200);
        }
      }

      const jpGrad = ctx.createLinearGradient(0, 0, 0, H);
      jpGrad.addColorStop(0, '#081c15');
      jpGrad.addColorStop(1, '#1b4332');
      ctx.fillStyle = jpGrad;
      ctx.fillRect(0, 0, W, H);

      // Diagonal Rain Streaks
      ctx.strokeStyle = 'rgba(116, 198, 157, 0.28)';
      ctx.lineWidth = 1.5;
      ambientMotes.forEach(m => {
        const rx = (m.x + frame * 4) % W;
        const ry = (m.y + frame * 7) % H;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 6, ry + 12);
        ctx.stroke();
      });

      // T-Rex Vision Cone
      ctx.fillStyle = jurassic.moving ? 'rgba(239, 35, 60, 0.34)' : 'rgba(255, 209, 102, 0.18)';
      ctx.beginPath();
      ctx.moveTo(jurassic.rexX, jurassic.rexY);
      ctx.arc(jurassic.rexX, jurassic.rexY, 210, jurassic.rexAngle - 0.52, jurassic.rexAngle + 0.52);
      ctx.closePath();
      ctx.fill();

      jurassic.breakers.forEach((b, idx) => {
        if (b.done) drawGlow(b.x, b.y, 40, '#74c69d');
        ctx.fillStyle = b.done ? '#74c69d' : '#ef233c';
        ctx.fillRect(b.x - 16, b.y - 16, 32, 32);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(b.done ? 'ONLINE' : `BREAKER #${idx + 1} [HOLD E]`, b.x - 42, b.y - 22);
        if (!b.done && b.progress > 0) {
          ctx.fillStyle = '#ffd166';
          ctx.fillRect(b.x - 20, b.y + 20, (b.progress / 100) * 40, 5);
        }
      });

      drawGlow(jurassic.jeep.x, jurassic.jeep.y, 55, '#ffd166');
      ctx.fillStyle = '#ffd166';
      ctx.fillRect(jurassic.jeep.x - 24, jurassic.jeep.y - 14, 48, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('JEEP EXIT', jurassic.jeep.x - 26, jurassic.jeep.y - 20);

      if (jurassic.activeFlare) {
        drawGlow(jurassic.activeFlare.x, jurassic.activeFlare.y, 75, '#ef233c');
        ctx.fillStyle = '#ef233c';
        ctx.beginPath();
        ctx.arc(jurassic.activeFlare.x, jurassic.activeFlare.y, 8 + (frame % 6), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#52b788';
      ctx.fillRect(jurassic.rexX - 22, jurassic.rexY - 18, 44, 36);
      ctx.fillStyle = '#ffd166';
      ctx.fillText('T-REX', jurassic.rexX - 18, jurassic.rexY - 24);

      ctx.fillStyle = jurassic.moving ? '#4cc9f0' : '#74c69d';
      ctx.beginPath();
      ctx.arc(jurassic.x, jurassic.y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(jurassic.moving ? 'MOVING!' : 'FROZEN (HIDDEN)', jurassic.x - 36, jurassic.y + 24);
    }

    // ========================================================================
    // 7. BTTF_88MPH (Synthwave 3D Hill Valley Clocktower Sprint)
    // ========================================================================
    else if (movie.mode === 'BTTF_88MPH') {
      if (screenPhase === 'PLAYING') {
        if (left) bttf.carX = Math.max(-0.85, bttf.carX - 0.032);
        if (right) bttf.carX = Math.min(0.85, bttf.carX + 0.032);

        if (up) {
          bttf.rpm = Math.min(100, bttf.rpm + 0.75);
          const gearMaxMph = bttf.gear * 18.2;
          if (bttf.mph < gearMaxMph) bttf.mph += 0.16;
        } else {
          bttf.rpm = Math.max(15, bttf.rpm - 0.5);
          bttf.mph = Math.max(10, bttf.mph - 0.08);
        }

        bttf.roadZ += bttf.mph * 0.4;
        bttf.wireDist -= bttf.mph * 0.095;

        if (frame % 42 === 0) {
          bttf.obstacles.push({
            lane: (Math.random() - 0.5) * 1.4,
            z: 100,
            isFlux: Math.random() > 0.42
          });
        }

        for (let i = bttf.obstacles.length - 1; i >= 0; i--) {
          const o = bttf.obstacles[i];
          o.z -= bttf.mph * 0.055;
          if (o.z < 12 && o.z > 2 && Math.abs(o.lane - bttf.carX) < 0.28) {
            if (o.isFlux) {
              bttf.mph = Math.min(92, bttf.mph + 6.5);
              score += 250;
              spawnPixels(W / 2 + bttf.carX * 200, H - 80, '#00f5d4', 18, 0.05);
            } else {
              bttf.mph = Math.max(18, bttf.mph - 14);
              screenShake = 10;
              spawnPixels(W / 2 + bttf.carX * 200, H - 80, '#ff0055', 18, 0.1);
            }
            bttf.obstacles.splice(i, 1);
            continue;
          }
          if (o.z <= 0) bttf.obstacles.splice(i, 1);
        }

        if (bttf.wireDist <= 0) {
          if (bttf.mph >= 88) winGame(2500);
          else loseGame(`ONLY ${bttf.mph.toFixed(1)} MPH AT THE WIRE! SHIFT ALL 5 GEARS [SPACE] TO HIT 88 MPH!`);
        }
      }

      const bttfSky = ctx.createLinearGradient(0, 0, 0, 210);
      bttfSky.addColorStop(0, '#10002b');
      bttfSky.addColorStop(1, '#3c096c');
      ctx.fillStyle = bttfSky;
      ctx.fillRect(0, 0, W, 210);

      drawGlow(W / 2, 132, 85, '#00f5d4');
      ctx.fillStyle = '#240046';
      ctx.fillRect(W / 2 - 48, 95, 96, 115);
      ctx.fillStyle = '#ff9e00';
      ctx.beginPath();
      ctx.arc(W / 2, 132, 18, 0, Math.PI * 2);
      ctx.fill();

      for (let y = 210; y < H; y += 6) {
        const p = (y - 210) / (H - 210);
        const rw = 70 + p * 540;
        const stripe = Math.floor((y + bttf.roadZ) / 18) % 2 === 0;
        ctx.fillStyle = stripe ? '#10002b' : '#190040';
        ctx.fillRect(0, y, W, 6);
        ctx.fillStyle = stripe ? '#2b2d42' : '#3d405b';
        ctx.fillRect(W / 2 - rw / 2, y, rw, 6);
        if (stripe) {
          ctx.fillStyle = '#00f5d4';
          ctx.fillRect(W / 2 - 3, y, 6, 6);
        }
      }

      bttf.obstacles.forEach(o => {
        const p = 1 - o.z / 100;
        const sy = 215 + p * (H - 250);
        const sx = W / 2 + o.lane * (40 + p * 260);
        const sz = 8 + p * 36;
        ctx.fillStyle = o.isFlux ? '#00f5d4' : '#ff0055';
        ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz * 0.7);
      });

      const dx = W / 2 + bttf.carX * 210;
      if (bttf.mph >= 82) {
        drawGlow(dx, H - 55, 70, '#ff9e00');
        ctx.fillStyle = '#ff9e00';
        ctx.fillRect(dx - 38, H - 52, 12, 45);
        ctx.fillRect(dx + 26, H - 52, 12, 45);
      }
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(dx - 44, H - 92, 88, 42);
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(dx - 40, H - 76, 22, 9);
      ctx.fillRect(dx + 18, H - 76, 22, 9);
      ctx.fillStyle = '#00f5d4';
      ctx.fillRect(dx - 16, H - 84, 32, 14);
    }

    // ========================================================================
    // 8. MATRIX_DODGE (Emerald Code Rain & Rooftop Bullet-Time Afterimages)
    // ========================================================================
    else {
      if (screenPhase === 'PLAYING') {
        matrix.limboActive = holdSpace && matrix.focus > 4;
        if (matrix.limboActive) {
          matrix.focus = Math.max(0, matrix.focus - 0.55);
          if (frame % 3 === 0) {
            afterimages.push({ x: matrix.x, y: matrix.y, life: 14 });
          }
        } else {
          matrix.focus = Math.min(100, matrix.focus + 0.35);
        }

        const timeScale = matrix.limboActive ? 0.25 : 1.0;
        const moveSpd = matrix.limboActive ? 4.4 : 3.4;
        if (left) matrix.x = Math.max(120, matrix.x - moveSpd);
        if (right) matrix.x = Math.min(W - 120, matrix.x + moveSpd);
        if (up) matrix.y = Math.max(165, matrix.y - moveSpd);
        if (down) matrix.y = Math.min(H - 65, matrix.y + moveSpd);

        let aliveAgents = 0;
        matrix.agents.forEach(a => {
          if (a.hp <= 0) return;
          aliveAgents++;
          a.cd -= timeScale;
          if (a.cd <= 0) {
            a.cd = 42;
            const ang = Math.atan2(matrix.y - a.y, matrix.x - a.x);
            for (let s = -1; s <= 1; s++) {
              matrix.bullets.push({
                x: a.x,
                y: a.y,
                vx: Math.cos(ang + s * 0.18) * 5.2,
                vy: Math.sin(ang + s * 0.18) * 5.2,
                grazed: false,
                reflected: false
              });
            }
          }
        });

        if (aliveAgents === 0) winGame(2400);

        for (let i = matrix.bullets.length - 1; i >= 0; i--) {
          const b = matrix.bullets[i];
          b.x += b.vx * (b.reflected ? 1 : timeScale);
          b.y += b.vy * (b.reflected ? 1 : timeScale);

          if (b.reflected) {
            for (let ai = 0; ai < matrix.agents.length; ai++) {
              const a = matrix.agents[ai];
              if (a.hp > 0 && Math.hypot(b.x - a.x, b.y - a.y) < 28) {
                a.hp -= 38;
                score += 220;
                spawnPixels(a.x, a.y, '#52b788', 18, 0.04);
                b.x = -999;
              }
            }
          } else {
            const dist = Math.hypot(b.x - matrix.x, b.y - matrix.y);
            if (dist < (matrix.limboActive ? 10 : 15)) {
              matrix.hp -= 18;
              screenShake = 8;
              spawnPixels(matrix.x, matrix.y, '#ff006e', 14, 0.08);
              matrix.bullets.splice(i, 1);
              if (matrix.hp <= 0) loseGame('NEO FALLS! HOLD [SPACE] FOR BULLET-TIME LIMBO!');
              continue;
            } else if (dist < 44 && !b.grazed) {
              b.grazed = true;
              matrix.belief = Math.min(100, matrix.belief + (matrix.limboActive ? 12 : 7));
              score += 85;
              spawnPixels(b.x, b.y, '#52b788', 8, 0.02);
              if (matrix.belief >= 100) showLine(2);
            }
          }
          if (b.x < 0 || b.x > W || b.y < 0 || b.y > H) matrix.bullets.splice(i, 1);
        }
      }

      ctx.fillStyle = matrix.limboActive ? '#041b11' : '#030906';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(82, 183, 136, 0.22)';
      ctx.font = '11px monospace';
      for (let c = 0; c < 24; c++) {
        ctx.fillText(String.fromCharCode(0x30a0 + ((frame + c) % 40)), c * 32 + 10, ((frame * 3 + c * 47) % H));
      }

      ctx.strokeStyle = 'rgba(82, 183, 136, 0.35)';
      ctx.strokeRect(80, 65, W - 160, H - 110);

      // Celeste-style Bullet-Time Afterimages
      for (let i = afterimages.length - 1; i >= 0; i--) {
        const af = afterimages[i];
        af.life--;
        ctx.fillStyle = `rgba(82, 183, 136, ${af.life / 28})`;
        ctx.fillRect(af.x - 10, af.y - 16, 20, 32);
        if (af.life <= 0) afterimages.splice(i, 1);
      }

      matrix.agents.forEach(a => {
        if (a.hp <= 0) return;
        ctx.fillStyle = '#1b4332';
        ctx.fillRect(a.x - 12, a.y - 16, 24, 32);
        ctx.fillStyle = '#d8f3dc';
        ctx.fillRect(a.x - 8, a.y - 26, 16, 12);
        ctx.fillStyle = '#52b788';
        ctx.fillRect(a.x - 18, a.y - 34, (a.hp / 150) * 36, 4);
      });

      matrix.bullets.forEach(b => {
        ctx.strokeStyle = b.reflected ? '#52b788' : 'rgba(183, 228, 199, 0.6)';
        ctx.beginPath();
        ctx.arc(b.x - b.vx * 2, b.y - b.vy * 2, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = b.reflected ? '#52b788' : '#ffffff';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      drawGlow(matrix.x, matrix.y, 45, '#52b788');
      ctx.save();
      ctx.translate(matrix.x, matrix.y);
      if (matrix.limboActive) ctx.rotate(-0.65);
      ctx.fillStyle = '#081c15';
      ctx.fillRect(-10, -16, 20, 32);
      ctx.fillStyle = '#d8f3dc';
      ctx.fillRect(-7, -26, 14, 11);
      ctx.fillStyle = '#52b788';
      ctx.fillRect(-6, -23, 12, 3);
      ctx.restore();

      if (matrix.belief >= 100) {
        ctx.fillStyle = '#74c69d';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('★ NEO AWAKENED! PRESS [E] OR [CLICK] TO STOP & REFLECT BULLETS! ★', 115, 445);
      }
    }

    // ========================================================================
    // NOITA-STYLE PHYSICAL PIXEL PARTICLES & TOP HUD
    // ========================================================================
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.grav || 0;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      if (p.life <= 0) particles.splice(i, 1);
    }

    // Top HUD Bar
    ctx.fillStyle = 'rgba(7, 10, 20, 0.9)';
    ctx.fillRect(0, 0, W, 46);
    ctx.strokeStyle = movie.palette.accent;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 46);
    ctx.lineTo(W, 46);
    ctx.stroke();

    ctx.fillStyle = movie.palette.accent;
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`🎬 ${movie.title} (${movie.genre})`, 12, 18);

    ctx.fillStyle = movie.palette.foam;
    ctx.font = 'bold 11px monospace';
    if (movie.mode === 'JAWS_BOAT') {
      ctx.fillText(`ORCA FLOOD: ${Math.floor(jaws.floodLevel)}%  |  BARRELS: ${jaws.barrelsAttached}/3  |  O2 TANK: ${jaws.tankInMouth ? 'IN JAWS (SHOOT!)' : 'READY [E]'}`, 12, 36);
    } else if (movie.mode === 'GOONIES_CAVERN') {
      ctx.fillText(`BONE ORGAN NOTES: ${goonies.notesDone}/5 [SPACE]  |  BRIDGE: ${goonies.bridgeDown ? 'LOWERED! BOARD INFERNO!' : 'LOCKED'}`, 12, 36);
    } else if (movie.mode === 'INDY_TEMPLE') {
      ctx.fillText(`ACT ${indy.act}/3: ${indy.act === 1 ? 'CROSS SUN TILES & WHIP CHASM' : indy.act === 2 ? 'POUR SANDBAG [HOLD E]' : 'OUTRUN THE BOULDER!'}`, 12, 36);
    } else if (movie.mode === 'STAR_WARS_TRENCH') {
      ctx.fillText(`SHIELDS: ${trench.shields}%  |  EXHAUST PORT: ${Math.floor(trench.distToPort)}m  |  TORPEDO: [E]`, 12, 36);
    } else if (movie.mode === 'DUNE_SANDWORM') {
      ctx.fillText(`THUMPERS: ${dune.thumpersPlanted}/3 [E]  |  SAND TREMOR: ${Math.floor(dune.rhythmTremor)}%  |  ${dune.ridingWorm ? `WORM RIDE: ${Math.floor(dune.wormRideDist)}m` : 'PAUSE TO CALM WORM'}`, 12, 36);
    } else if (movie.mode === 'JURASSIC_STEALTH') {
      const doneCount = jurassic.breakers.filter(b => b.done).length;
      ctx.fillText(`BREAKERS: ${doneCount}/3 [HOLD E]  |  FLARES [SPACE]: ${jurassic.flaresLeft}  |  FREEZE IN CONE!`, 12, 36);
    } else if (movie.mode === 'BTTF_88MPH') {
      ctx.fillText(`SPEED: ${bttf.mph.toFixed(1)} / 88.0 MPH  |  GEAR: ${bttf.gear}/5  |  RPM: ${Math.floor(bttf.rpm)}% (SHIFT [SPACE] @ 65%+)`, 12, 36);
    } else {
      ctx.fillText(`HP: ${matrix.hp}%  |  BULLET-TIME [SPACE]: ${Math.floor(matrix.focus)}%  |  BELIEF: ${Math.floor(matrix.belief)}%`, 12, 36);
    }

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText(`SCORE: ${score}`, W - 14, 26);
    ctx.textAlign = 'left';

    // Dialogue Banner
    if (dialogueBox && dialogueBox.timer > 0) {
      ctx.fillStyle = 'rgba(8, 12, 24, 0.92)';
      ctx.fillRect(85, 52, W - 170, 34);
      ctx.strokeStyle = movie.palette.accent;
      ctx.strokeRect(85, 52, W - 170, 34);
      ctx.fillStyle = movie.palette.accent;
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${dialogueBox.speaker}:`, 96, 66);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(dialogueBox.text.slice(0, 74), 96, 80);
    }

    // End Overlay
    if (screenPhase === 'VICTORY' || screenPhase === 'GAMEOVER') {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.88)';
      ctx.fillRect(120, 140, W - 240, 190);
      ctx.strokeStyle = screenPhase === 'VICTORY' ? movie.palette.accent : movie.palette.danger;
      ctx.lineWidth = 3;
      ctx.strokeRect(120, 140, W - 240, 190);

      ctx.textAlign = 'center';
      ctx.fillStyle = screenPhase === 'VICTORY' ? movie.palette.accent : movie.palette.danger;
      ctx.font = 'bold 24px monospace';
      ctx.fillText(screenPhase === 'VICTORY' ? '★ THE END — CREDITS ROLL! ★' : '🎬 TAKE FAILED — CUT!', W / 2, 188);

      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText(dialogueBox ? dialogueBox.text.slice(0, 62) : movie.tagline, W / 2, 225);

      ctx.fillStyle = movie.palette.foam;
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`BOX OFFICE SCORE: ${score}`, W / 2, 262);

      ctx.fillStyle = movie.palette.accent;
      ctx.font = 'bold 13px monospace';
      ctx.fillText('[ CLICK OR PRESS SPACE FOR ANOTHER TAKE ]', W / 2, 302);
      ctx.textAlign = 'left';
    }

    ctx.restore();
    animId = requestAnimationFrame(loop);
  };

  animId = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mousedown', onMouseDown);
  };
}
