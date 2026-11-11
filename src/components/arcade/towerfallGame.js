// ============================================================================
// TOWERFALL: ARROW ASCENT (Homage to Matt Thorson / Matt Makes Games)
// Single-screen 2D archery arena with screen-wrap, 8-way aim, dodge-catch & waves
// ============================================================================

export function initTowerfallGame({
  canvas,
  ctx,
  W = 760,
  H = 480,
  difficulty = 'MEDIUM',
  isPressed,
  addHighScore,
  onCrash
}) {
  let animId = null;
  let crashed = false;
  let score = 0;
  let wave = 1;
  const maxWaves = 10;
  let inStartScreen = true;
  let gameOver = false;
  let victory = false;
  let waveState = 'WAVE_START'; // 'WAVE_START' | 'ACTIVE' | 'WAVE_CLEAR'
  let waveTimer = 75;

  let jumpWasDown = false;
  let shootWasDown = false;
  let dashWasDown = false;

  const startLives = difficulty === 'EASY' ? 4 : difficulty === 'HARD' ? 2 : 3;
  const initialQuiver = difficulty === 'EASY' ? 4 : 3;

  // Classic TowerFall Symmetrical Arena with Open Screen-Wrap Archways & Pit!
  // Left/right side walls leave open archways between y=270..390 and top pit x=320..440
  const WRAP_GAP_MIN_X = 325;
  const WRAP_GAP_MAX_X = 435;
  const SIDE_ARCH_TOP = 285;
  const SIDE_ARCH_BOT = 395;

  const platforms = [
    // Split Ground Floor (leaves center drop-wrap pit x=325..435)
    { x: 24, y: H - 32, w: WRAP_GAP_MIN_X - 24, h: 32, type: 'stone' },
    { x: WRAP_GAP_MAX_X, y: H - 32, w: W - 24 - WRAP_GAP_MAX_X, h: 32, type: 'stone' },

    // Lower One-Way Wood Ledges
    { x: 46, y: 365, w: 145, h: 10, type: 'wood' },
    { x: W - 191, y: 365, w: 145, h: 10, type: 'wood' },

    // Center Wood Bridge over Wrap Pit
    { x: 275, y: 342, w: 210, h: 10, type: 'wood' },

    // Mid Stone Pillars / Ledges
    { x: 75, y: 245, w: 155, h: 14, type: 'stone' },
    { x: W - 230, y: 245, w: 155, h: 14, type: 'stone' },

    // Center High Pedestal
    { x: 285, y: 170, w: 190, h: 14, type: 'stone' },

    // Upper Corner Wood Perches
    { x: 52, y: 112, w: 120, h: 10, type: 'wood' },
    { x: W - 172, y: 112, w: 120, h: 10, type: 'wood' },

    // Castle Side Walls (with open middle archway from SIDE_ARCH_TOP..SIDE_ARCH_BOT)
    { x: 0, y: 0, w: 26, h: SIDE_ARCH_TOP, type: 'wall' },
    { x: 0, y: SIDE_ARCH_BOT, w: 26, h: H - SIDE_ARCH_BOT, type: 'wall' },
    { x: W - 26, y: 0, w: 26, h: SIDE_ARCH_TOP, type: 'wall' },
    { x: W - 26, y: SIDE_ARCH_BOT, w: 26, h: H - SIDE_ARCH_BOT, type: 'wall' },

    // Split Ceiling (leaves center top wrap shaft x=325..435)
    { x: 0, y: 0, w: WRAP_GAP_MIN_X, h: 22, type: 'wall' },
    { x: WRAP_GAP_MAX_X, y: 0, w: W - WRAP_GAP_MAX_X, h: 22, type: 'wall' }
  ];

  // Moody Castle Torches
  const torches = [
    { x: 76, y: 345 },
    { x: W - 76, y: 345 },
    { x: 110, y: 226 },
    { x: W - 110, y: 226 },
    { x: W / 2, y: 150 }
  ];

  // Player State
  const player = {
    x: 120,
    y: H - 60,
    vx: 0,
    vy: 0,
    w: 16,
    h: 22,
    facing: 1,
    aimX: 1,
    aimY: 0,
    grounded: false,
    onWall: 0,
    dropTimer: 0,
    lives: startLives,
    quiver: initialQuiver,
    maxQuiver: 6,
    canDash: true,
    isDashing: false,
    dashTimer: 0,
    dashVx: 0,
    dashVy: 0,
    dodgeInvuln: 0,
    afterimages: [],
    shootCooldown: 0
  };

  const arrows = [];
  const enemies = [];
  const spawnPortals = [];
  const dustPuffs = [];    // Subtle small dust / spark particles (clean, never chaotic)
  const impactRings = [];  // Crisp clean TowerFall expanding ring feedback
  const floatTexts = [];

  const addFloatText = (x, y, text, color = '#ffd60a') => {
    floatTexts.push({ x, y, text, color, life: 42 });
  };

  const addImpactRing = (x, y, color = '#ffd60a', maxR = 18) => {
    impactRings.push({ x, y, r: 3, maxR, color, life: 12, maxLife: 12 });
  };

  const addDust = (x, y, color = '#94a3b8', count = 3, speed = 1.6) => {
    for (let i = 0; i < count; i++) {
      dustPuffs.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 4,
        vx: (Math.random() - 0.5) * speed,
        vy: -Math.random() * speed * 0.8,
        color,
        size: 2,
        life: 14 + Math.floor(Math.random() * 8),
        maxLife: 22
      });
    }
  };

  // Screen wrap helper (classic TowerFall edge-to-edge warp)
  const applyScreenWrap = (ent) => {
    if (ent.x < -8) ent.x = W + 6;
    else if (ent.x > W + 8) ent.x = -6;
    if (ent.y > H + 10) ent.y = -6;
    else if (ent.y < -12) ent.y = H + 6;
  };

  // Wave planner: Wave 1 starts cleanly with 1 solitary slime
  const startWave = (wNum) => {
    waveState = 'WAVE_START';
    waveTimer = 65;
    enemies.length = 0;
    spawnPortals.length = 0;

    player.quiver = Math.max(player.quiver, initialQuiver);

    const plan = [];
    if (wNum === 1) {
      plan.push({ type: 'slime', delay: 25, x: W - 140, y: 340 });
    } else if (wNum === 2) {
      plan.push({ type: 'slime', delay: 25, x: 140, y: 340 });
      plan.push({ type: 'bat', delay: 65, x: W - 150, y: 95 });
    } else if (wNum === 3) {
      plan.push({ type: 'archer', delay: 25, x: W - 120, y: 95 });
      plan.push({ type: 'slime', delay: 75, x: 150, y: 225 });
    } else if (wNum === 4) {
      plan.push({ type: 'knight', delay: 25, x: W / 2, y: 150 });
      plan.push({ type: 'bat', delay: 70, x: 115, y: 95 });
    } else if (wNum === 5) {
      plan.push({ type: 'archer', delay: 25, x: 115, y: 95 });
      plan.push({ type: 'knight', delay: 55, x: W / 2, y: 320 });
      plan.push({ type: 'slime', delay: 90, x: W - 120, y: 225 });
    } else {
      const count = Math.min(4, 2 + Math.floor(wNum / 3));
      const types = ['slime', 'bat', 'archer', 'knight'];
      const spots = [
        { x: 115, y: 95 },
        { x: W - 115, y: 95 },
        { x: W / 2, y: 150 },
        { x: W - 145, y: 225 },
        { x: 145, y: 225 }
      ];
      for (let i = 0; i < count; i++) {
        const t = types[(i + wNum) % types.length];
        const spot = spots[(i + wNum) % spots.length];
        plan.push({ type: t, delay: 25 + i * 45, x: spot.x, y: spot.y });
      }
    }

    plan.forEach((p) => {
      spawnPortals.push({
        x: p.x,
        y: p.y,
        timer: p.delay,
        maxTimer: p.delay,
        enemyType: p.type
      });
    });
  };

  startWave(1);

  const computeAim = () => {
    const left = isPressed('a') || isPressed('arrowleft');
    const right = isPressed('d') || isPressed('arrowright');
    const up = isPressed('w') || isPressed('arrowup');
    const down = isPressed('s') || isPressed('arrowdown');

    let ax = right ? 1 : left ? -1 : 0;
    let ay = up ? -1 : down ? 1 : 0;

    if (ax === 0 && ay === 0) {
      ax = player.facing;
    }
    player.aimX = ax;
    player.aimY = ay;
  };

  const triggerJump = () => {
    const down = isPressed('s') || isPressed('arrowdown');
    if (player.grounded) {
      if (down) {
        // Check if standing on a one-way wood ledge -> drop through cleanly!
        const standingWood = platforms.some(
          (p) =>
            p.type === 'wood' &&
            player.x + player.w / 2 > p.x &&
            player.x - player.w / 2 < p.x + p.w &&
            Math.abs(player.y + player.h / 2 - p.y) < 4
        );
        if (standingWood) {
          player.dropTimer = 14;
          player.grounded = false;
          player.vy = 2.0;
          return;
        }
      }
      player.vy = -10.2;
      player.grounded = false;
      addDust(player.x, player.y + player.h / 2, '#cbd5e1', 3, 1.4);
    } else if (player.onWall !== 0) {
      player.vy = -9.6;
      player.vx = -player.onWall * 7.2;
      player.facing = -player.onWall;
      player.onWall = 0;
      addDust(player.x, player.y, '#cbd5e1', 3, 1.5);
    }
  };

  const triggerDash = () => {
    if (!player.canDash || player.isDashing) return;
    player.canDash = false;
    player.isDashing = true;
    player.dashTimer = 10;
    player.dodgeInvuln = 16;

    let dx = 0;
    let dy = 0;
    if (isPressed('a') || isPressed('arrowleft')) dx = -1;
    if (isPressed('d') || isPressed('arrowright')) dx = 1;
    if (isPressed('w') || isPressed('arrowup')) dy = -1;
    if (isPressed('s') || isPressed('arrowdown')) dy = 1;
    if (dx === 0 && dy === 0) dx = player.facing;

    const mag = Math.hypot(dx, dy) || 1;
    player.dashVx = (dx / mag) * 11.5;
    player.dashVy = (dy / mag) * 11.5;
    player.vx = player.dashVx;
    player.vy = player.dashVy;

    addImpactRing(player.x, player.y, '#38bdf8', 16);
  };

  const triggerShoot = () => {
    if (player.shootCooldown > 0 || player.quiver <= 0) return;
    player.shootCooldown = 16;
    player.quiver--;

    computeAim();
    const mag = Math.hypot(player.aimX, player.aimY) || 1;
    const speed = 14.5;
    const vx = (player.aimX / mag) * speed;
    const vy = (player.aimY / mag) * speed;

    arrows.push({
      x: player.x + (player.aimX / mag) * 12,
      y: player.y - 1 + (player.aimY / mag) * 12,
      vx,
      vy,
      stuck: false,
      owner: 'player',
      angle: Math.atan2(vy, vx),
      life: 360
    });
  };

  // ============================================================================
  // MAIN GAME LOOP
  // ============================================================================
  const loop = () => {
    if (crashed) return;
    try {
    ctx.imageSmoothingEnabled = false;

    // 1. Moody Twilight Stone Tower Backdrop
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, W, H);

    // Subtle stone dungeon brick masonry
    ctx.fillStyle = '#101624';
    for (let by = 24; by < H - 32; by += 32) {
      for (let bx = 28 + ((by / 32) % 2) * 24; bx < W - 28; bx += 48) {
        ctx.fillRect(bx, by, 44, 28);
      }
    }

    // Subtle Screen-Wrap Warp Guides at open pit & archways
    const warpAlpha = 0.14 + Math.sin(Date.now() * 0.005) * 0.05;
    ctx.fillStyle = `rgba(56, 189, 248, ${warpAlpha})`;
    ctx.fillRect(WRAP_GAP_MIN_X, 0, WRAP_GAP_MAX_X - WRAP_GAP_MIN_X, 6);
    ctx.fillRect(WRAP_GAP_MIN_X, H - 6, WRAP_GAP_MAX_X - WRAP_GAP_MIN_X, 6);
    ctx.fillRect(0, SIDE_ARCH_TOP, 5, SIDE_ARCH_BOT - SIDE_ARCH_TOP);
    ctx.fillRect(W - 5, SIDE_ARCH_TOP, 5, SIDE_ARCH_BOT - SIDE_ARCH_TOP);

    // Draw Torch Glow & Wall Brackets
    torches.forEach((t) => {
      const grad = ctx.createRadialGradient(t.x, t.y - 6, 2, t.x, t.y - 6, 48);
      grad.addColorStop(0, 'rgba(249, 115, 22, 0.22)');
      grad.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(t.x - 48, t.y - 54, 96, 96);

      ctx.fillStyle = '#475569';
      ctx.fillRect(t.x - 2, t.y, 4, 9);
      ctx.fillRect(t.x - 4, t.y - 2, 8, 3);
      const flick = Math.round(Math.sin(Date.now() * 0.018 + t.x));
      ctx.fillStyle = '#f97316';
      ctx.fillRect(t.x - 2 + flick, t.y - 8, 5, 7);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(t.x - 1 + flick, t.y - 10, 2, 5);
    });

    // Draw Platforms & Walls
    platforms.forEach((p) => {
      if (p.type === 'wall') {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(p.x + 2, p.y + 2, p.w - 4, p.h - 4);
      } else if (p.type === 'stone') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
        ctx.fillStyle = '#334155';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(p.x, p.y, p.w, 3);
        ctx.fillStyle = '#1e293b';
        for (let nx = p.x + 28; nx < p.x + p.w - 6; nx += 36) {
          ctx.fillRect(nx, p.y + 3, 2, p.h - 3);
        }
      } else {
        // Wood one-way platform
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(p.x - 1, p.y - 1, p.w + 2, p.h + 2);
        ctx.fillStyle = '#78350f';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(p.x, p.y, p.w, 2);
      }
    });

    // --------------------------------------------------------------------------
    // START SCREEN
    // --------------------------------------------------------------------------
    if (inStartScreen) {
      ctx.fillStyle = 'rgba(6, 9, 18, 0.88)';
      ctx.fillRect(60, 46, W - 120, H - 92);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 46, W - 120, H - 92);

      ctx.fillStyle = '#ffd60a';
      ctx.font = '22px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TOWERFALL', W / 2, 112);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('ARROW ASCENT', W / 2, 138);

      // Archer Portrait
      const cx = W / 2;
      const cy = 192;
      ctx.fillStyle = '#065f46';
      ctx.fillRect(cx - 10, cy - 14, 20, 28);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(cx - 8, cy - 12, 16, 24);
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(cx - 4, cy - 8, 8, 6);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(cx + 8, cy - 10, 4, 16);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(cx - 14, cy - 12, 3, 24);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillText('A / D: RUN & WRAP THROUGH ARCHWAYS', W / 2, 254);
      ctx.fillText('W / UP: JUMP & WALL-JUMP   •   S+W: DROP LEDGE', W / 2, 278);
      ctx.fillText('SPACE / F: SHOOT ARROW (8-WAY AIM)', W / 2, 302);
      ctx.fillText('SHIFT / B: AIR-DODGE & CATCH ENEMY ARROWS', W / 2, 326);
      ctx.fillText('STOMP HEADS OR RETRIEVE ARROWS FROM WALLS', W / 2, 350);

      const pulse = Math.floor(Date.now() / 420) % 2 === 0;
      ctx.fillStyle = pulse ? '#ffd60a' : '#d97706';
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.fillText('PRESS SPACE TO START', W / 2, 398);

      const startPressed = Boolean(isPressed(' ') || isPressed('enter') || isPressed('f'));
      if (startPressed && !shootWasDown) {
        inStartScreen = false;
        startWave(1);
      }
      shootWasDown = startPressed;

      animId = requestAnimationFrame(loop);
      return;
    }

    // --------------------------------------------------------------------------
    // GAME OVER / VICTORY OVERLAY
    // --------------------------------------------------------------------------
    if (gameOver || victory) {
      ctx.fillStyle = 'rgba(4, 7, 16, 0.90)';
      ctx.fillRect(140, 120, W - 280, 240);
      ctx.strokeStyle = victory ? '#10b981' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.strokeRect(140, 120, W - 280, 240);

      ctx.fillStyle = victory ? '#10b981' : '#ef4444';
      ctx.font = '20px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(victory ? 'TOWER CLEARED!' : 'GAME OVER', W / 2, 180);

      ctx.fillStyle = '#ffd60a';
      ctx.font = '11px "Press Start 2P", monospace';
      ctx.fillText(`SCORE: ${score}`, W / 2, 222);
      ctx.fillText(`WAVE ${Math.min(wave, maxWaves)} / ${maxWaves}`, W / 2, 250);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('PRESS SPACE TO PLAY AGAIN', W / 2, 304);

      const replayDown = Boolean(isPressed(' ') || isPressed('enter') || isPressed('r'));
      if (replayDown && !shootWasDown) {
        player.lives = startLives;
        player.quiver = initialQuiver;
        player.x = 120;
        player.y = H - 60;
        player.vx = 0;
        player.vy = 0;
        arrows.length = 0;
        dustPuffs.length = 0;
        impactRings.length = 0;
        score = 0;
        wave = 1;
        gameOver = false;
        victory = false;
        startWave(1);
      }
      shootWasDown = replayDown;

      animId = requestAnimationFrame(loop);
      return;
    }

    // --------------------------------------------------------------------------
    // INPUTS & AIMING
    // --------------------------------------------------------------------------
    const leftDown = Boolean(isPressed('a') || isPressed('arrowleft'));
    const rightDown = Boolean(isPressed('d') || isPressed('arrowright'));
    const jumpDown = Boolean(isPressed('w') || isPressed('arrowup') || isPressed('k'));
    const shootDown = Boolean(isPressed(' ') || isPressed('f') || isPressed('enter') || isPressed('j'));
    const dashDown = Boolean(isPressed('shift') || isPressed('b') || isPressed('l'));

    if (jumpDown && !jumpWasDown) triggerJump();
    if (shootDown && !shootWasDown) triggerShoot();
    if (dashDown && !dashWasDown) triggerDash();

    jumpWasDown = jumpDown;
    shootWasDown = shootDown;
    dashWasDown = dashDown;

    if (player.shootCooldown > 0) player.shootCooldown--;
    if (player.dodgeInvuln > 0) player.dodgeInvuln--;
    if (player.dropTimer > 0) player.dropTimer--;

    // --------------------------------------------------------------------------
    // PLAYER PHYSICS & COLLISIONS
    // --------------------------------------------------------------------------
    if (player.isDashing) {
      player.dashTimer--;
      player.vx = player.dashVx;
      player.vy = player.dashVy;
      if (player.dashTimer % 3 === 0) {
        player.afterimages.push({ x: player.x, y: player.y, life: 10 });
      }
      if (player.dashTimer <= 0) {
        player.isDashing = false;
        player.vx *= 0.45;
        player.vy *= 0.45;
      }
    } else {
      const accel = player.grounded ? 1.15 : 0.78;
      const maxSpeed = 4.6;
      if (leftDown) {
        player.vx -= accel;
        player.facing = -1;
      }
      if (rightDown) {
        player.vx += accel;
        player.facing = 1;
      }
      if (!leftDown && !rightDown) {
        player.vx *= player.grounded ? 0.7 : 0.9;
      }
      player.vx = Math.max(-maxSpeed, Math.min(maxSpeed, player.vx));

      if (player.onWall !== 0 && player.vy > 0) {
        player.vy = Math.min(2.0, player.vy + 0.18);
        player.canDash = true;
      } else {
        player.vy = Math.min(11, player.vy + 0.5);
      }
    }

    computeAim();

    player.x += player.vx;
    player.y += player.vy;

    const wasGrounded = player.grounded;
    player.grounded = false;
    player.onWall = 0;

    platforms.forEach((p) => {
      if (p.type === 'wall') {
        if (
          player.x - player.w / 2 < p.x + p.w &&
          player.x + player.w / 2 > p.x &&
          player.y - player.h / 2 < p.y + p.h &&
          player.y + player.h / 2 > p.y
        ) {
          if (player.vx < 0 && player.x > p.x + p.w - 10) {
            player.x = p.x + p.w + player.w / 2;
            player.vx = 0;
            player.onWall = -1;
          } else if (player.vx > 0 && player.x < p.x + 10) {
            player.x = p.x - player.w / 2;
            player.vx = 0;
            player.onWall = 1;
          } else if (player.vy < 0 && p.y === 0) {
            player.y = p.y + p.h + player.h / 2;
            player.vy = 0;
          }
        }
      } else {
        // Solid stone top OR one-way wood platform
        if (p.type === 'wood' && player.dropTimer > 0) return;

        const feetY = player.y + player.h / 2;
        const prevFeetY = feetY - player.vy;
        if (
          player.vy >= 0 &&
          player.x + player.w / 2 > p.x &&
          player.x - player.w / 2 < p.x + p.w &&
          feetY >= p.y &&
          prevFeetY <= p.y + 8
        ) {
          player.y = p.y - player.h / 2;
          player.vy = 0;
          player.grounded = true;
          player.canDash = true;
          if (!wasGrounded) {
            addDust(player.x, p.y, '#94a3b8', 2, 1.0);
          }
        }
      }
    });

    applyScreenWrap(player);

    // --------------------------------------------------------------------------
    // ARROWS UPDATE & COLLISIONS
    // --------------------------------------------------------------------------
    for (let i = arrows.length - 1; i >= 0; i--) {
      const a = arrows[i];
      if (!a.stuck) {
        a.vy += 0.16; // Classic TowerFall slight gravity drop
        a.x += a.vx;
        a.y += a.vy;
        a.angle = Math.atan2(a.vy, a.vx);

        // Arrows screen-wrap cleanly through open archways & pits too!
        applyScreenWrap(a);

        // Stick into solid stone & walls (passes cleanly through bottom of wood ledges if rising)
        for (const p of platforms) {
          if (p.type === 'wood' && a.vy < 0) continue;
          if (a.x >= p.x && a.x <= p.x + p.w && a.y >= p.y && a.y <= p.y + p.h) {
            a.stuck = true;
            a.vx = 0;
            a.vy = 0;
            addImpactRing(a.x, a.y, '#cbd5e1', 9);
            break;
          }
        }

        // Player Arrow hits Enemy
        if (!a.stuck && a.owner === 'player') {
          for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
            const e = enemies[eIdx];
            if (Math.hypot(a.x - e.x, a.y - e.y) < Math.max(e.w, e.h) * 0.85) {
              if (e.type === 'knight') {
                const hittingFront = (a.vx > 0 && e.facing === -1) || (a.vx < 0 && e.facing === 1);
                if (hittingFront) {
                  a.stuck = true;
                  addImpactRing(a.x, a.y, '#fde047', 14);
                  addFloatText(e.x, e.y - 18, 'CLANG!', '#cbd5e1');
                  break;
                }
              }

              e.hp -= 1;
              a.stuck = true;
              addImpactRing(e.x, e.y, '#ff3864', 18);
              if (e.hp <= 0) {
                enemies.splice(eIdx, 1);
                const pts = e.type === 'knight' ? 250 : e.type === 'archer' ? 150 : 100;
                score += pts;
                addDust(e.x, e.y, '#94a3b8', 5, 2.2);
                addFloatText(e.x, e.y - 14, `+${pts}`, '#ffd60a');
              }
              break;
            }
          }
        }

        // Enemy Arrow hits Player
        if (!a.stuck && a.owner === 'enemy') {
          if (Math.hypot(a.x - player.x, a.y - player.y) < 16) {
            if (player.dodgeInvuln > 0) {
              // Signature TowerFall Dodge-Catch!
              arrows.splice(i, 1);
              player.quiver = Math.min(player.maxQuiver, player.quiver + 1);
              addImpactRing(player.x, player.y, '#38bdf8', 22);
              addFloatText(player.x, player.y - 18, 'CAUGHT!', '#38bdf8');
              continue;
            } else {
              player.lives--;
              a.stuck = true;
              addImpactRing(player.x, player.y, '#ef4444', 24);
              if (player.lives <= 0) {
                gameOver = true;
                addHighScore('towerfall', score);
              } else {
                player.x = 120;
                player.y = H - 60;
                player.vx = 0;
                player.vy = 0;
                player.dodgeInvuln = 55;
              }
            }
          }
        }
      } else {
        // Retrieve stuck arrow cleanly without noisy splatter
        if (Math.hypot(player.x - a.x, player.y - a.y) < 20) {
          if (player.quiver < player.maxQuiver) {
            player.quiver++;
            arrows.splice(i, 1);
            addImpactRing(a.x, a.y, '#ffd60a', 10);
            continue;
          }
        }
      }

      a.life--;
      if (a.life <= 0) arrows.splice(i, 1);
    }

    // --------------------------------------------------------------------------
    // SPAWN PORTAL RINGS (Ethereal shrinking portals)
    // --------------------------------------------------------------------------
    for (let pIdx = spawnPortals.length - 1; pIdx >= 0; pIdx--) {
      const sp = spawnPortals[pIdx];
      sp.timer--;
      const progress = Math.max(0.1, sp.timer / sp.maxTimer);
      const radius = 6 + progress * 16;

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, radius, 0, Math.PI * 2);
      ctx.stroke();

      if (sp.timer <= 0) {
        enemies.push({
          id: Date.now() + Math.random(),
          type: sp.enemyType,
          x: sp.x,
          y: sp.y,
          vx: 0,
          vy: 0,
          w: sp.enemyType === 'knight' ? 18 : 16,
          h: sp.enemyType === 'knight' ? 24 : 16,
          hp: sp.enemyType === 'knight' ? 3 : 1,
          facing: sp.x < player.x ? 1 : -1,
          shootTimer: 75 + Math.floor(Math.random() * 35),
          grounded: false,
          jumpTimer: 0
        });
        addImpactRing(sp.x, sp.y, '#a855f7', 18);
        spawnPortals.splice(pIdx, 1);
      }
    }

    // --------------------------------------------------------------------------
    // ENEMY UPDATES (Distinct roles & clear combat tells)
    // --------------------------------------------------------------------------
    for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
      const e = enemies[eIdx];
      e.facing = e.x < player.x ? 1 : -1;

      if (e.type === 'slime') {
        e.jumpTimer = (e.jumpTimer || 0) + 1;
        if (e.grounded && e.jumpTimer > 60) {
          e.vy = -7.2;
          e.vx = e.facing * (2.0 + Math.random() * 0.6);
          e.grounded = false;
          e.jumpTimer = 0;
        }
      } else if (e.type === 'bat') {
        e.phase = (e.phase || 0) + 0.05;
        e.diveTimer = (e.diveTimer || 0) + 1;
        if (e.diveTimer > 130 && e.diveTimer < 168) {
          const dx = player.x - e.x;
          const dy = player.y - e.y;
          const dist = Math.hypot(dx, dy) || 1;
          e.vx = (dx / dist) * 3.1;
          e.vy = (dy / dist) * 3.1;
        } else {
          const hoverY = 105 + Math.sin(e.phase) * 28;
          e.vy = (hoverY - e.y) * 0.07;
          e.vx = e.facing * 1.4;
          if (e.diveTimer >= 168) e.diveTimer = 0;
        }
        e.x += e.vx;
        e.y += e.vy;
      } else if (e.type === 'archer') {
        const distToPlayer = Math.abs(player.x - e.x);
        if (distToPlayer < 85 && e.grounded) {
          e.vx = -e.facing * 1.6;
        } else {
          e.vx *= 0.78;
        }
        e.shootTimer--;
        if (e.shootTimer <= 0) {
          e.shootTimer = 135;
          const adx = player.x - e.x;
          const ady = player.y - e.y;
          const amag = Math.hypot(adx, ady) || 1;
          arrows.push({
            x: e.x + e.facing * 12,
            y: e.y - 2,
            vx: (adx / amag) * 9.0,
            vy: (ady / amag) * 9.0 - 0.8,
            stuck: false,
            owner: 'enemy',
            angle: Math.atan2(ady, adx),
            life: 260
          });
        }
      } else if (e.type === 'knight') {
        // Patrol platform carefully without walking blindly off edges
        const edgeCheckX = e.x + e.facing * 14;
        const hasFloorAhead = platforms.some(
          (p) =>
            p.type !== 'wall' &&
            edgeCheckX > p.x &&
            edgeCheckX < p.x + p.w &&
            Math.abs(e.y + e.h / 2 - p.y) < 6
        );
        e.vx = hasFloorAhead || !e.grounded ? e.facing * 1.15 : 0;
      }

      if (e.type !== 'bat') {
        e.vy = Math.min(10, e.vy + 0.42);
        e.x += e.vx;
        e.y += e.vy;
        e.grounded = false;

        platforms.forEach((p) => {
          if (p.type === 'wall') {
            if (
              e.x - e.w / 2 < p.x + p.w &&
              e.x + e.w / 2 > p.x &&
              e.y - e.h / 2 < p.y + p.h &&
              e.y + e.h / 2 > p.y
            ) {
              if (e.vx < 0) e.x = p.x + p.w + e.w / 2;
              else if (e.vx > 0) e.x = p.x - e.w / 2;
              e.vx = 0;
            }
          } else if (
            e.vy >= 0 &&
            e.x + e.w / 2 > p.x &&
            e.x - e.w / 2 < p.x + p.w &&
            e.y + e.h / 2 >= p.y &&
            e.y + e.h / 2 - e.vy <= p.y + 8
          ) {
            e.y = p.y - e.h / 2;
            e.vy = 0;
            e.grounded = true;
          }
        });
        applyScreenWrap(e);
      }

      // Player-Enemy Contact (Head-Stomp vs Hurt)
      if (Math.hypot(player.x - e.x, player.y - e.y) < 18) {
        if (player.vy > 1.0 && player.y < e.y - 6) {
          // Classic TowerFall Head-Stomp!
          e.hp -= 1;
          player.vy = -8.8;
          player.canDash = true;
          addImpactRing(e.x, e.y, '#ffd60a', 18);
          addFloatText(e.x, e.y - 16, 'STOMP!', '#ffd60a');
          if (e.hp <= 0) {
            score += e.type === 'knight' ? 250 : 150;
            enemies.splice(eIdx, 1);
          }
        } else if (player.dodgeInvuln <= 0) {
          player.lives--;
          addImpactRing(player.x, player.y, '#ef4444', 24);
          if (player.lives <= 0) {
            gameOver = true;
            addHighScore('towerfall', score);
          } else {
            player.x = 120;
            player.y = H - 60;
            player.vx = 0;
            player.vy = 0;
            player.dodgeInvuln = 55;
          }
        }
      }
    }

    // --------------------------------------------------------------------------
    // WAVE PROGRESSION
    // --------------------------------------------------------------------------
    if (enemies.length === 0 && spawnPortals.length === 0 && !gameOver) {
      if (waveState === 'ACTIVE') {
        waveState = 'WAVE_CLEAR';
        waveTimer = 70;
        score += wave * 200;
        addFloatText(W / 2, H / 2 - 20, `WAVE ${wave} CLEARED!`, '#10b981');
      } else if (waveState === 'WAVE_CLEAR') {
        waveTimer--;
        if (waveTimer <= 0) {
          if (wave >= maxWaves) {
            victory = true;
            addHighScore('towerfall', score + 1000);
          } else {
            wave++;
            startWave(wave);
          }
        }
      }
    } else {
      waveState = 'ACTIVE';
    }

    // --------------------------------------------------------------------------
    // RENDER ENTITIES
    // --------------------------------------------------------------------------
    // Dash Afterimages
    for (let i = player.afterimages.length - 1; i >= 0; i--) {
      const img = player.afterimages[i];
      ctx.fillStyle = `rgba(56, 189, 248, ${(img.life / 10) * 0.5})`;
      ctx.fillRect(Math.round(img.x) - 7, Math.round(img.y) - 11, 14, 22);
      img.life--;
      if (img.life <= 0) player.afterimages.splice(i, 1);
    }

    // Draw Player Archer
    const px = Math.round(player.x);
    const py = Math.round(player.y);
    const invulnBlink = player.dodgeInvuln > 0 && Math.floor(Date.now() / 60) % 2 === 0;

    if (!invulnBlink) {
      // Subtle 8-way aim dots when player holds an arrow
      if (player.quiver > 0) {
        const aimMag = Math.hypot(player.aimX, player.aimY) || 1;
        const ux = player.aimX / aimMag;
        const uy = player.aimY / aimMag;
        ctx.fillStyle = 'rgba(253, 224, 71, 0.45)';
        for (let step = 18; step <= 42; step += 12) {
          ctx.fillRect(Math.round(px + ux * step) - 1, Math.round(py - 1 + uy * step) - 1, 2, 2);
        }
      }

      ctx.fillStyle = '#060912';
      ctx.fillRect(px - 9, py - 13, 18, 26);

      // Emerald Ranger Cloak
      ctx.fillStyle = '#059669';
      ctx.fillRect(px - 8, py - 12, 16, 24);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(px - 6, py - 10, 12, 18);

      // Hood & Face
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(px - 4, py - 8, 8, 6);
      ctx.fillStyle = '#060912';
      ctx.fillRect(px + player.facing * 2 - 1, py - 6, 2, 2);

      // Quiver & Arrows
      ctx.fillStyle = '#78350f';
      ctx.fillRect(px - player.facing * 8 - 2, py - 6, 4, 13);
      for (let q = 0; q < Math.min(3, player.quiver); q++) {
        ctx.fillStyle = '#fde047';
        ctx.fillRect(px - player.facing * 8 - 1, py - 8 - q * 2, 2, 2);
      }

      // Bow angled toward 8-way aim
      const aimAngle = Math.atan2(player.aimY, player.aimX);
      ctx.save();
      ctx.translate(px, py - 1);
      ctx.rotate(aimAngle);
      ctx.fillStyle = '#92400e';
      ctx.fillRect(6, -7, 3, 14);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(5, -6, 1, 12);
      ctx.restore();
    }

    // Draw Arrows (stuck arrows subtly glint so player knows they can pick them up)
    arrows.forEach((a) => {
      ctx.save();
      ctx.translate(Math.round(a.x), Math.round(a.y));
      ctx.rotate(a.angle);
      ctx.fillStyle = a.owner === 'player' ? '#fde047' : '#ef4444';
      ctx.fillRect(-9, -1, 14, 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(5, -2, 4, 4);
      ctx.fillStyle = a.owner === 'player' ? '#38bdf8' : '#7f1d1d';
      ctx.fillRect(-10, -2, 3, 4);
      ctx.restore();

      if (a.stuck && Math.floor(Date.now() / 220) % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(Math.round(a.x) - 1, Math.round(a.y) - 3, 2, 2);
      }
    });

    // Draw Enemies
    enemies.forEach((e) => {
      const ex = Math.round(e.x);
      const ey = Math.round(e.y);

      if (e.type === 'slime') {
        // Wind-up squash right before jump!
        const windingUp = e.grounded && e.jumpTimer > 42;
        const sh = windingUp ? 9 : 12;
        const sw = windingUp ? 18 : 16;
        const sy = ey + (12 - sh) / 2;
        ctx.fillStyle = '#060912';
        ctx.fillRect(ex - sw / 2 - 1, sy - 7, sw + 2, sh + 2);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(ex - sw / 2, sy - 6, sw, sh);
        ctx.fillStyle = '#fde047';
        ctx.fillRect(ex + e.facing * 3 - 1, sy - 2, 3, 2);
      } else if (e.type === 'bat') {
        ctx.fillStyle = '#060912';
        ctx.fillRect(ex - 9, ey - 7, 18, 14);
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(ex - 8, ey - 6, 16, 12);
        const flap = Math.floor(Math.sin(Date.now() * 0.028 + ex) * 4);
        ctx.fillRect(ex - 13, ey - 7 + flap, 5, 7);
        ctx.fillRect(ex + 8, ey - 7 + flap, 5, 7);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(ex + e.facing * 3 - 1, ey - 2, 2, 2);
      } else if (e.type === 'archer') {
        ctx.fillStyle = '#060912';
        ctx.fillRect(ex - 8, ey - 10, 16, 20);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(ex - 7, ey - 9, 14, 18);
        // Crimson pre-shot telegraph glint!
        const aboutToShoot = e.shootTimer < 26;
        ctx.fillStyle = aboutToShoot ? '#ef4444' : '#060912';
        ctx.fillRect(ex + e.facing * 2 - 1, ey - 6, 3, 3);
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(ex + e.facing * 6, ey - 8, 2, 16);
      } else if (e.type === 'knight') {
        ctx.fillStyle = '#060912';
        ctx.fillRect(ex - 10, ey - 13, 20, 26);
        ctx.fillStyle = '#475569';
        ctx.fillRect(ex - 9, ey - 12, 18, 24);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(ex + e.facing * 3 - 3, ey - 6, 6, 2);
        ctx.fillStyle = '#cbd5e1';
        ctx.fillRect(ex + e.facing * 7, ey - 8, 4, 17);
      }
    });

    // Subtle Dust Puffs
    for (let i = dustPuffs.length - 1; i >= 0; i--) {
      const p = dustPuffs[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      ctx.globalAlpha = 1;
      if (p.life <= 0) dustPuffs.splice(i, 1);
    }

    // Crisp Expanding Impact Rings
    for (let i = impactRings.length - 1; i >= 0; i--) {
      const ir = impactRings[i];
      ir.r += (ir.maxR - ir.r) * 0.25;
      ir.life--;
      ctx.globalAlpha = Math.max(0, ir.life / ir.maxLife);
      ctx.strokeStyle = ir.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(ir.x, ir.y, ir.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      if (ir.life <= 0) impactRings.splice(i, 1);
    }

    // Floating Text Notifications
    for (let i = floatTexts.length - 1; i >= 0; i--) {
      const ft = floatTexts[i];
      ft.y -= 0.5;
      ft.life--;
      ctx.fillStyle = ft.color;
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      if (ft.life <= 0) floatTexts.splice(i, 1);
    }

    // --------------------------------------------------------------------------
    // CLEAN RETRO HUD
    // --------------------------------------------------------------------------
    ctx.fillStyle = '#060912';
    ctx.fillRect(34, 8, 150, 26);
    ctx.strokeStyle = '#ffd60a';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 8, 150, 26);
    ctx.fillStyle = '#ffd60a';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`PTS:${score}`, 44, 25);

    ctx.fillStyle = '#060912';
    ctx.fillRect(W / 2 - 72, 8, 144, 26);
    ctx.strokeStyle = '#38bdf8';
    ctx.strokeRect(W / 2 - 72, 8, 144, 26);
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(`WAVE ${wave}/${maxWaves}`, W / 2, 25);

    ctx.fillStyle = '#060912';
    ctx.fillRect(W - 210, 8, 176, 26);
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(W - 210, 8, 176, 26);
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'left';
    ctx.fillText(`${'♥'.repeat(Math.max(0, player.lives))}`, W - 200, 25);

    // Draw tiny arrow icons for remaining quiver!
    for (let q = 0; q < player.quiver; q++) {
      const ax = W - 120 + q * 14;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(ax, 15, 2, 11);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(ax - 1, 13, 4, 3);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(ax - 1, 25, 4, 2);
    }

    animId = requestAnimationFrame(loop);
    } catch (err) {
      crashed = true;
      if (animId) cancelAnimationFrame(animId);
      if (typeof onCrash === 'function') onCrash(err);
    }
  };

  loop();

  return () => {
    crashed = true;
    if (animId) cancelAnimationFrame(animId);
  };
}
