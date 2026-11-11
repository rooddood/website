// ============================================================================
// STICKMAN SMASH BRAWL (Super Smash Bros Homage)
// Character Select Screen (CSS), % Damage Knockback, Stocks & Stage Blast Zones!
// ============================================================================

export const FIGHTER_ROSTER = [
  {
    id: 'blaze',
    name: 'BLAZE',
    title: 'FIRE NINJA',
    color: '#ef4444',
    accentColor: '#f97316',
    speed: 4.8,
    weight: 1.0,
    power: 14,
    special: 'FIRE KICK',
    stats: { spd: 5, pwr: 3, wgt: 2 }
  },
  {
    id: 'frost',
    name: 'FROST',
    title: 'ICE SHINOBI',
    color: '#06b6d4',
    accentColor: '#38bdf8',
    speed: 4.2,
    weight: 1.2,
    power: 16,
    special: 'ICE SLASH',
    stats: { spd: 4, pwr: 4, wgt: 3 }
  },
  {
    id: 'titan',
    name: 'TITAN',
    title: 'HEAVY BRAWLER',
    color: '#f59e0b',
    accentColor: '#fbbf24',
    speed: 3.2,
    weight: 1.8,
    power: 24,
    special: 'TITAN SLAM',
    stats: { spd: 2, pwr: 5, wgt: 5 }
  },
  {
    id: 'phantom',
    name: 'PHANTOM',
    title: 'VOID MAGE',
    color: '#a855f7',
    accentColor: '#c084fc',
    speed: 3.8,
    weight: 1.1,
    power: 18,
    special: 'VOID BURST',
    stats: { spd: 3, pwr: 4, wgt: 2 }
  }
];

export function initSmashBrawlGame({
  canvas,
  ctx,
  W = 760,
  H = 480,
  mode = '1P',
  difficulty = 'MEDIUM',
  playerName = 'PLAYER 1',
  isPressed,
  addHighScore,
  theme = 'warm',
  onCrash
}) {
  let animId = null;
  let crashed = false;
  let gameState = 'CHAR_SELECT'; // 'CHAR_SELECT' | 'FIGHTING' | 'MATCH_OVER'
  let p1FighterIdx = 0;
  let p2FighterIdx = 1;
  let p1Locked = false;
  let p2Locked = mode !== '2P'; // Auto-locked in 1P mode
  let spaceWasDown = false;
  let leftWasDown = false;
  let rightWasDown = false;
  let p2LeftWasDown = false;
  let p2RightWasDown = false;
  let winnerText = '';
  let aiActionCooldown = 0;
  let aiJumpCooldown = 0;

  const botSpeedMult = difficulty === 'EASY' ? 0.65 : difficulty === 'HARD' ? 1.15 : 0.9;
  const botAggro = difficulty === 'EASY' ? 0.045 : difficulty === 'HARD' ? 0.16 : 0.1;

  // Smash Battlefield Platforms (floating over open blast zones)
  const platforms = [
    // Main Center Island
    { x: 170, y: 355, w: 420, h: 20, type: 'main' },
    // Left Floating Platform
    { x: 190, y: 250, w: 140, h: 12, type: 'float' },
    // Right Floating Platform
    { x: 430, y: 250, w: 140, h: 12, type: 'float' },
    // Top Floating Platform
    { x: 310, y: 165, w: 140, h: 12, type: 'float' }
  ];

  // Visual Effects & Particles (capped so combat stays readable, never noisy)
  const particles = [];
  const addImpact = (x, y, color = '#ffd60a', count = 8) => {
    const allowed = Math.min(count, Math.max(0, 70 - particles.length));
    for (let i = 0; i < allowed; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 9.5,
        vy: (Math.random() - 0.5) * 9.5,
        color,
        size: 3 + Math.floor(Math.random() * 3),
        life: 16 + Math.floor(Math.random() * 10)
      });
    }
  };

  const createFighter = (cfg, startX, isBot = false) => ({
    cfg,
    x: startX,
    y: 200,
    vx: 0,
    vy: 0,
    w: 18,
    h: 36,
    facing: startX < W / 2 ? 1 : -1,
    damagePercent: 0, // Smash Bros % (starts at 0% and climbs!)
    stocks: 3,        // 3 Lives / Stocks
    grounded: false,
    jumpsLeft: 2,     // Double jump
    isBot,
    attackTimer: 0,
    attackCooldown: 0,
    hitstun: 0,
    shieldTimer: 0,
    invulnTimer: 45,
    respawning: false,
    jumpWasDown: false,
    attackWasDown: false,
    specialWasDown: false
  });

  let p1 = null;
  let p2 = null;

  const startMatch = () => {
    particles.length = 0;
    const f1Cfg = FIGHTER_ROSTER[p1FighterIdx] || FIGHTER_ROSTER[0];
    const f2Cfg = FIGHTER_ROSTER[p2FighterIdx] || FIGHTER_ROSTER[1];
    p1 = createFighter(f1Cfg, 260, false);
    p2 = createFighter(f2Cfg, 500, mode !== '2P');
    aiActionCooldown = 15;
    aiJumpCooldown = 15;
    gameState = 'FIGHTING';
  };

  // Mouse selection on character grid
  const onCanvasClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const rw = rect.width || W;
    const rh = rect.height || H;
    const mx = (e.clientX - rect.left) * (W / rw);
    const my = (e.clientY - rect.top) * (H / rh);

    if (gameState === 'MATCH_OVER') {
      gameState = 'CHAR_SELECT';
      p1Locked = false;
      p2Locked = mode !== '2P';
      return;
    }

    if (gameState !== 'CHAR_SELECT') return;

    // Match rendered card hitboxes: cardX = 65 + idx * 160, cardY = 95, cardW = 142, cardH = 250
    for (let idx = 0; idx < FIGHTER_ROSTER.length; idx++) {
      const cardX = 65 + idx * 160;
      const cardY = 95;
      const cardW = 142;
      const cardH = 250;
      if (mx >= cardX && mx <= cardX + cardW && my >= cardY && my <= cardY + cardH) {
        if (mode !== '2P') {
          if (p1FighterIdx === idx && p1Locked) {
            startMatch();
          } else {
            p1FighterIdx = idx;
            p1Locked = true;
            p2FighterIdx = (idx + 1) % FIGHTER_ROSTER.length;
            p2Locked = true;
          }
        } else {
          if (!p1Locked) {
            p1FighterIdx = idx;
            p1Locked = true;
          } else {
            p2FighterIdx = idx;
            p2Locked = true;
          }
        }
        return;
      }
    }

    // Bottom Start Battle Strip (y: H - 75 .. H)
    if (my >= H - 75 && my <= H) {
      if (mode !== '2P') {
        p1Locked = true;
        p2FighterIdx = (p1FighterIdx + 1) % FIGHTER_ROSTER.length;
        p2Locked = true;
        startMatch();
      } else if (p1Locked && p2Locked) {
        startMatch();
      }
    }
  };

  canvas.addEventListener('mousedown', onCanvasClick);

  // ============================================================================
  // LOOP
  // ============================================================================
  const loop = () => {
    if (crashed) return;
    try {
    ctx.imageSmoothingEnabled = false;

    // --------------------------------------------------------------------------
    // 1. CHARACTER SELECTION SCREEN (SUPER SMASH BROS CSS)
    // --------------------------------------------------------------------------
    if (gameState === 'CHAR_SELECT') {
      // Dark retro arena backdrop
      ctx.fillStyle = '#060914';
      ctx.fillRect(0, 0, W, H);

      // Angled stadium floodlights in background
      ctx.fillStyle = '#0f172a';
      for (let i = 0; i < W; i += 60) {
        ctx.fillRect(i, 0, 30, H);
      }

      // Marquee Header Banner
      ctx.fillStyle = '#0a0e1c';
      ctx.fillRect(0, 0, W, 70);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, W, 70);

      ctx.fillStyle = '#ffd60a';
      ctx.font = '18px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SUPER STICK BRAWL', W / 2, 34);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('★ CHOOSE YOUR FIGHTER ★', W / 2, 56);

      // Keyboard navigation for Character Grid
      const leftPress = mode === '2P' ? isPressed('a') : (isPressed('a') || isPressed('arrowleft'));
      const rightPress = mode === '2P' ? isPressed('d') : (isPressed('d') || isPressed('arrowright'));
      const p2Left = mode === '2P' && isPressed('arrowleft');
      const p2Right = mode === '2P' && isPressed('arrowright');
      const spacePress = isPressed(' ') || isPressed('enter');

      if (leftPress && !leftWasDown) {
        p1FighterIdx = (p1FighterIdx - 1 + FIGHTER_ROSTER.length) % FIGHTER_ROSTER.length;
        if (mode !== '2P') {
          p2FighterIdx = (p1FighterIdx + 1) % FIGHTER_ROSTER.length;
        }
      }
      if (rightPress && !rightWasDown) {
        p1FighterIdx = (p1FighterIdx + 1) % FIGHTER_ROSTER.length;
        if (mode !== '2P') {
          p2FighterIdx = (p1FighterIdx + 1) % FIGHTER_ROSTER.length;
        }
      }
      if (p2Left && !p2LeftWasDown && !p2Locked) {
        p2FighterIdx = (p2FighterIdx - 1 + FIGHTER_ROSTER.length) % FIGHTER_ROSTER.length;
      }
      if (p2Right && !p2RightWasDown && !p2Locked) {
        p2FighterIdx = (p2FighterIdx + 1) % FIGHTER_ROSTER.length;
      }
      if (spacePress && !spaceWasDown) {
        if (mode !== '2P') {
          p1Locked = true;
          p2FighterIdx = (p1FighterIdx + 1) % FIGHTER_ROSTER.length;
          p2Locked = true;
          startMatch();
        } else if (!p1Locked) {
          p1Locked = true;
        } else if (!p2Locked) {
          p2Locked = true;
        } else {
          startMatch();
        }
      }
      leftWasDown = leftPress;
      rightWasDown = rightPress;
      p2LeftWasDown = p2Left;
      p2RightWasDown = p2Right;
      spaceWasDown = spacePress;

      // 4 Fighter Selection Cards
      FIGHTER_ROSTER.forEach((f, idx) => {
        const cardX = 65 + idx * 160;
        const cardY = 95;
        const cardW = 142;
        const cardH = 250;

        const isP1 = p1FighterIdx === idx;
        const isP2 = p2FighterIdx === idx;

        // Card Container
        ctx.fillStyle = isP1 || isP2 ? '#0f172a' : '#040711';
        ctx.fillRect(cardX, cardY, cardW, cardH);
        ctx.strokeStyle = isP1 ? '#ef4444' : isP2 ? '#06b6d4' : '#334155';
        ctx.lineWidth = isP1 || isP2 ? 4 : 2;
        ctx.strokeRect(cardX, cardY, cardW, cardH);

        // Fighter Token Badges
        if (isP1) {
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(cardX + 4, cardY + 4, 46, 16);
          ctx.fillStyle = '#fff';
          ctx.font = '8px "Press Start 2P", monospace';
          ctx.textAlign = 'center';
          ctx.fillText('P1', cardX + 27, cardY + 16);
        }
        if (isP2) {
          ctx.fillStyle = '#06b6d4';
          ctx.fillRect(cardX + cardW - 50, cardY + 4, 46, 16);
          ctx.fillStyle = '#fff';
          ctx.font = '8px "Press Start 2P", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(mode === '2P' ? 'P2' : 'CPU', cardX + cardW - 27, cardY + 16);
        }

        // Fighter Sprite Preview
        const spriteX = cardX + cardW / 2;
        const spriteY = cardY + 95;

        // Outline
        ctx.fillStyle = '#000';
        ctx.fillRect(spriteX - 12, spriteY - 24, 24, 48);

        // Head
        ctx.fillStyle = f.color;
        ctx.fillRect(spriteX - 10, spriteY - 22, 20, 20);

        // Headband
        ctx.fillStyle = f.accentColor;
        ctx.fillRect(spriteX - 12, spriteY - 16, 24, 4);
        ctx.fillRect(spriteX + 10, spriteY - 14, 8, 4);

        // Body & Limbs
        ctx.fillStyle = f.color;
        ctx.fillRect(spriteX - 6, spriteY - 2, 12, 18);
        ctx.fillRect(spriteX - 10, spriteY + 16, 8, 12);
        ctx.fillRect(spriteX + 2, spriteY + 16, 8, 12);

        // Name & Title
        ctx.fillStyle = f.color;
        ctx.font = '11px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(f.name, cardX + cardW / 2, cardY + 155);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.fillText(f.title, cardX + cardW / 2, cardY + 172);

        // Stats Bars
        const drawStat = (label, val, yOff) => {
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '6px "Press Start 2P", monospace';
          ctx.textAlign = 'left';
          ctx.fillText(label, cardX + 12, cardY + yOff);
          for (let s = 0; s < 5; s++) {
            ctx.fillStyle = s < val ? f.color : '#1e293b';
            ctx.fillRect(cardX + 48 + s * 16, cardY + yOff - 6, 12, 6);
          }
        };

        drawStat('SPD', f.stats.spd, 195);
        drawStat('PWR', f.stats.pwr, 210);
        drawStat('WGT', f.stats.wgt, 225);

        // Special Move text
        ctx.fillStyle = '#ffd60a';
        ctx.font = '6px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`SP: ${f.special}`, cardX + cardW / 2, cardY + 242);
      });

      // Bottom Start Battle Strip
      ctx.fillStyle = '#0a0e1c';
      ctx.fillRect(0, H - 75, W, 75);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, H - 75, W, 75);

      const pulse = Math.floor(Date.now() / 320) % 2 === 0;
      ctx.fillStyle = pulse ? '#ffd60a' : '#f59e0b';
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.textAlign = 'center';

      if (mode !== '2P') {
        ctx.fillText('A / D OR CLICK TO PICK  |  ► SPACE TO BATTLE! ◄', W / 2, H - 35);
      } else if (!p1Locked) {
        ctx.fillText('SELECT P1 FIGHTER [A/D] THEN PRESS SPACE', W / 2, H - 35);
      } else if (!p2Locked) {
        ctx.fillText('SELECT P2 FIGHTER [ARROWS] THEN PRESS SPACE', W / 2, H - 35);
      } else {
        ctx.fillText('► PRESS SPACE / CLICK TO BATTLE! ◄', W / 2, H - 35);
      }

      animId = requestAnimationFrame(loop);
      return;
    }

    // --------------------------------------------------------------------------
    // 2. SMASH BATTLEFIELD ARENA
    // --------------------------------------------------------------------------
    // Stadium Dusk Sky
    ctx.fillStyle = '#080c18';
    ctx.fillRect(0, 0, W, H);

    // Distant Stadium Pillars & Crowd lights
    ctx.fillStyle = '#0f172a';
    for (let c = 40; c < W; c += 80) {
      ctx.fillRect(c, H - 120, 24, 120);
    }

    // Outer Blast Zone indicators (Flashing warning red edges if near edge)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, W - 8, H - 8);

    // Draw Platforms
    platforms.forEach(p => {
      ctx.fillStyle = '#060912'; // Solid dark outline
      ctx.fillRect(p.x - 2, p.y - 2, p.w + 4, p.h + 4);

      if (p.type === 'main') {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(p.x, p.y, p.w, 4);
      } else {
        ctx.fillStyle = '#334155';
        ctx.fillRect(p.x, p.y, p.w, p.h);
        ctx.fillStyle = '#ffd60a';
        ctx.fillRect(p.x, p.y, p.w, 3);
      }
    });

    // --------------------------------------------------------------------------
    // MATCH OVER OVERLAY
    // --------------------------------------------------------------------------
    if (gameState === 'MATCH_OVER') {
      ctx.fillStyle = 'rgba(4, 7, 16, 0.88)';
      ctx.fillRect(150, 120, W - 300, 240);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 4;
      ctx.strokeRect(150, 120, W - 300, 240);

      ctx.fillStyle = '#ffd60a';
      ctx.font = '20px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME!', W / 2, 185);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '14px "Press Start 2P", monospace';
      ctx.fillText(winnerText, W / 2, 230);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('PRESS SPACE TO REMATCH', W / 2, 290);

      const spacePress = isPressed(' ') || isPressed('enter') || isPressed('r');
      if (spacePress && !spaceWasDown) {
        gameState = 'CHAR_SELECT';
        p1Locked = false;
        p2Locked = mode !== '2P';
      }
      spaceWasDown = spacePress;

      animId = requestAnimationFrame(loop);
      return;
    }

    if (!p1 || !p2) {
      gameState = 'CHAR_SELECT';
      animId = requestAnimationFrame(loop);
      return;
    }

    // --------------------------------------------------------------------------
    // FIGHTER PHYSICS & SMASH CONTROLS
    // --------------------------------------------------------------------------
    const applyHit = (attacker, defender, power, rangeX, rangeY, facingReq) => {
      if (defender.invulnTimer > 0) return false;
      const dx = defender.x - attacker.x;
      const dy = Math.abs(defender.y - attacker.y);
      const inFront = !facingReq || Math.sign(dx) === attacker.facing || Math.abs(dx) < 16;
      if (inFront && Math.abs(dx) < rangeX && dy < rangeY) {
        defender.damagePercent = Math.min(999, defender.damagePercent + power);
        const launchDir = dx === 0 ? attacker.facing : Math.sign(dx);
        const launchMult = (1 + defender.damagePercent * 0.015) / defender.cfg.weight;
        defender.vx = launchDir * (6.8 * launchMult);
        defender.vy = -5.8 * launchMult;
        defender.grounded = false;
        defender.hitstun = 10 + Math.min(18, Math.floor(defender.damagePercent * 0.08));
        addImpact(defender.x, defender.y, attacker.cfg.accentColor, 8);
        return true;
      }
      return false;
    };

    const updateFighter = (f, enemy, ctrl) => {
      if (f.invulnTimer > 0) f.invulnTimer--;
      if (f.attackCooldown > 0) f.attackCooldown--;
      if (f.attackTimer > 0) f.attackTimer--;
      if (f.hitstun > 0) f.hitstun--;

      const maxSpeed = f.isBot ? f.cfg.speed * botSpeedMult : f.cfg.speed;
      if (f.hitstun === 0) {
        if (ctrl.left) {
          f.vx -= 1.0;
          f.facing = -1;
        }
        if (ctrl.right) {
          f.vx += 1.0;
          f.facing = 1;
        }
        if (!ctrl.left && !ctrl.right) {
          f.vx *= f.grounded ? 0.78 : 0.94;
        }
        f.vx = Math.max(-maxSpeed, Math.min(maxSpeed, f.vx));

        // Edge-triggered Jump & Double Jump
        if (ctrl.jump && !f.jumpWasDown && f.jumpsLeft > 0) {
          f.vy = f.grounded ? -11.5 : -10.0;
          f.jumpsLeft--;
          f.grounded = false;
          addImpact(f.x, f.y + f.h / 2, f.cfg.accentColor, 3);
        }

        // Edge-triggered Up-Special Recovery + Close Burst Strike
        if (ctrl.special && !f.specialWasDown && f.attackCooldown === 0) {
          f.attackCooldown = 36;
          f.attackTimer = 10;
          f.vy = -12.0;
          f.vx = f.facing * 4.5;
          addImpact(f.x, f.y, f.cfg.color, 6);
          applyHit(f, enemy, Math.round(f.cfg.power * 0.85), 54, 50, false);
        }

        // Edge-triggered Standard Smash Attack
        if (ctrl.attack && !f.attackWasDown && f.attackCooldown === 0) {
          f.attackCooldown = 18;
          f.attackTimer = 10;
          applyHit(f, enemy, f.cfg.power, 64, 44, true);
        }
      } else {
        f.vx *= 0.98;
      }

      f.jumpWasDown = Boolean(ctrl.jump);
      f.attackWasDown = Boolean(ctrl.attack);
      f.specialWasDown = Boolean(ctrl.special);

      // Gravity
      f.vy = Math.min(14, f.vy + 0.54);
      f.x += f.vx;
      f.y += f.vy;

      // Platform collisions
      f.grounded = false;
      platforms.forEach(p => {
        const feetY = f.y + f.h / 2;
        const prevFeetY = feetY - f.vy;
        if (f.vy >= 0 &&
            f.x + f.w / 2 > p.x &&
            f.x - f.w / 2 < p.x + p.w &&
            feetY >= p.y && prevFeetY <= p.y + 10) {
          f.y = p.y - f.h / 2;
          f.vy = 0;
          f.grounded = true;
          f.jumpsLeft = 2; // Restore double jumps on landing
        }
      });

      // ------------------------------------------------------------------------
      // BLAST ZONE DETECTION (K.O. & STOCK LOSS)
      // ------------------------------------------------------------------------
      if (f.x < -30 || f.x > W + 30 || f.y > H + 40 || f.y < -60) {
        addImpact(Math.max(20, Math.min(W - 20, f.x)), Math.max(20, Math.min(H - 20, f.y)), '#ef4444', 14);
        f.stocks--;

        if (f.stocks <= 0) {
          gameState = 'MATCH_OVER';
          winnerText = f === p2 ? `${playerName} WINS!` : (mode === '2P' ? 'P2 WINS!' : 'CPU WINS!');
          if (f === p2) addHighScore('stickman', 1500);
        } else {
          // Respawn over center stage
          f.x = f === p1 ? 260 : 500;
          f.y = 140;
          f.vx = 0;
          f.vy = 0;
          f.hitstun = 0;
          f.damagePercent = 0;
          f.invulnTimer = 60;
          f.jumpsLeft = 2;
        }
      }
    };

    // Controller Inputs
    const c1 = {
      left: isPressed('a'),
      right: isPressed('d'),
      jump: isPressed('w'),
      attack: isPressed(' ') || isPressed('f'),
      special: isPressed('e') || isPressed('q')
    };

    if (aiActionCooldown > 0) aiActionCooldown--;
    if (aiJumpCooldown > 0) aiJumpCooldown--;

    const offStageLeft = p2.x < 175;
    const offStageRight = p2.x > 585;
    const offStage = offStageLeft || offStageRight || p2.y > 350;
    const dist = p1.x - p2.x;

    let c2;
    if (mode === '2P') {
      c2 = {
        left: isPressed('arrowleft'),
        right: isPressed('arrowright'),
        jump: isPressed('arrowup'),
        attack: isPressed('enter') || isPressed('/'),
        special: isPressed('.') || isPressed(',')
      };
    } else if (offStage) {
      const wantJump = aiJumpCooldown === 0 && p2.y > 315 && p2.vy > 0.2 && p2.jumpsLeft > 0;
      if (wantJump) aiJumpCooldown = 14;
      c2 = {
        left: p2.x > W / 2,
        right: p2.x < W / 2,
        jump: wantJump,
        attack: false,
        special: p2.y > 362 && p2.jumpsLeft === 0
      };
    } else {
      const wantJump = aiJumpCooldown === 0 && p1.y < p2.y - 38 && Math.random() < 0.08;
      if (wantJump) aiJumpCooldown = 26;
      const wantAttack = aiActionCooldown === 0 && Math.abs(dist) < 62 && Math.abs(p1.y - p2.y) < 42 && Math.random() < botAggro;
      if (wantAttack) aiActionCooldown = 20;
      c2 = {
        left: dist < -28,
        right: dist > 28,
        jump: wantJump,
        attack: wantAttack,
        special: false
      };
    }

    updateFighter(p1, p2, c1);
    updateFighter(p2, p1, c2);

    // --------------------------------------------------------------------------
    // DRAWING FIGHTERS & PARTICLES
    // --------------------------------------------------------------------------
    const drawFighter = (f, label) => {
      const fx = Math.round(f.x);
      const fy = Math.round(f.y);

      // Invulnerability halo
      if (f.invulnTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(fx - 14, fy - 22, 28, 44);
      }

      // Black Outline
      ctx.fillStyle = '#060912';
      ctx.fillRect(fx - 10, fy - 20, 20, 40);

      // Head
      ctx.fillStyle = f.cfg.color;
      ctx.fillRect(fx - 8, fy - 18, 16, 16);

      // Headband & Fluttering Tail
      ctx.fillStyle = f.cfg.accentColor;
      ctx.fillRect(fx - 9, fy - 14, 18, 4);
      const wave = Math.floor(Math.sin(Date.now() * 0.02) * 3);
      ctx.fillRect(fx - f.facing * 12, fy - 14 + wave, 5, 4);

      // Eyes
      ctx.fillStyle = '#060912';
      ctx.fillRect(fx + f.facing * 3 - 2, fy - 11, 3, 3);

      // Body & Belt
      ctx.fillStyle = f.cfg.color;
      ctx.fillRect(fx - 5, fy - 2, 10, 16);
      ctx.fillStyle = '#060912';
      ctx.fillRect(fx - 6, fy + 6, 12, 3);

      // Legs
      const stride = Math.abs(f.vx) > 0.4 ? Math.floor(Math.sin(Date.now() * 0.03) * 6) : 0;
      ctx.fillStyle = f.cfg.color;
      ctx.fillRect(fx - 8 + stride, fy + 14, 6, 12);
      ctx.fillRect(fx + 2 - stride, fy + 14, 6, 12);

      // Attack Fist / Special Flame
      if (f.attackTimer > 0) {
        ctx.fillStyle = f.cfg.accentColor;
        ctx.fillRect(fx + f.facing * 14, fy - 4, 14, 12);
      }
    };

    drawFighter(p1, playerName);
    drawFighter(p2, mode === '2P' ? 'P2' : 'CPU');

    // Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      if (p.life <= 0) particles.splice(i, 1);
    }

    // --------------------------------------------------------------------------
    // SMASH BROS DAMAGE % HUD (BIG BOLD RETRO PERCENTAGES!)
    // --------------------------------------------------------------------------
    // P1 Damage Card
    ctx.fillStyle = '#060912';
    ctx.fillRect(40, H - 70, 180, 56);
    ctx.strokeStyle = p1.cfg.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(40, H - 70, 180, 56);

    ctx.fillStyle = '#fff';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${p1.cfg.name} (${playerName})`, 50, H - 52);

    // Stock Icons ♥ ♥ ♥
    ctx.fillStyle = '#ef4444';
    ctx.fillText(`${'♥'.repeat(Math.max(0, p1.stocks))}`, 50, H - 24);

    // Giant % Number that turns orange and red as damage climbs
    const p1Pct = Math.round(p1.damagePercent);
    ctx.fillStyle = p1Pct > 100 ? '#ef4444' : p1Pct > 50 ? '#f59e0b' : '#f8fafc';
    ctx.font = '22px "Press Start 2P", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${p1Pct}%`, 210, H - 26);

    // P2 / CPU Damage Card
    ctx.fillStyle = '#060912';
    ctx.fillRect(W - 220, H - 70, 180, 56);
    ctx.strokeStyle = p2.cfg.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(W - 220, H - 70, 180, 56);

    ctx.fillStyle = '#fff';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`${p2.cfg.name} (${mode === '2P' ? 'P2' : 'CPU'})`, W - 210, H - 52);

    ctx.fillStyle = '#06b6d4';
    ctx.fillText(`${'♥'.repeat(Math.max(0, p2.stocks))}`, W - 210, H - 24);

    const p2Pct = Math.round(p2.damagePercent);
    ctx.fillStyle = p2Pct > 100 ? '#ef4444' : p2Pct > 50 ? '#f59e0b' : '#f8fafc';
    ctx.font = '22px "Press Start 2P", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`${p2Pct}%`, W - 50, H - 26);

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
    canvas.removeEventListener('mousedown', onCanvasClick);
  };
}
