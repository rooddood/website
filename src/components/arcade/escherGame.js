// ============================================================================
// ESCHER VALLEY: THE NON-EUCLIDEAN LABYRINTH
// M.C. Escher (Relativity, Ascending & Descending, Waterfall) + Monument Valley
// + Mario Platforming across an interconnected, paradoxical multi-room world
// ============================================================================

const CHAMBERS = [
  {
    id: 0,
    name: 'CHAMBER I: HALL OF RELATIVITY',
    hint: 'Press [Q] or [S] ANYTIME to Flip Gravity! Doorways loop to impossible balconies in the SAME room!',
    palette: {
      bgTop: '#181828',
      bgBot: '#2d3142',
      blockTop: '#f2cc8f',
      blockFront: '#e07a5f',
      blockSide: '#9c4127',
      bridgeTop: '#81b29a',
      bridgeFront: '#3d5a80',
      accent: '#2ec4b6',
      gold: '#ffb703',
      crow: '#11111d'
    },
    platforms: [
      // Full Floor & Full Inverted Ceiling so Gravity Flip ALWAYS lands on solid architecture!
      { x: 20, y: 428, w: 720, h: 24, stairs: true },
      { x: 20, y: 54, w: 720, h: 22, stairs: true, isCeiling: true },
      // Lower Left & Lower Right Balconies
      { x: 45, y: 330, w: 200, h: 20, stairs: true },
      { x: 515, y: 330, w: 200, h: 20, stairs: true },
      // Central Floating Escher Cross-Landing
      { x: 270, y: 245, w: 220, h: 22, stairs: false },
      // Upper Left & Upper Right Ceiling Mezzanines (reachable by Gravity Flip or Paradox Doors!)
      { x: 55, y: 155, w: 195, h: 20, stairs: true },
      { x: 510, y: 155, w: 195, h: 20, stairs: true }
    ],
    rotors: [
      { x: 255, y: 330, w: 110, h: 18, state: 1 },
      { x: 505, y: 155, w: 110, h: 18, state: 0 }
    ],
    // Non-Euclidean Paradox Portals: Walking into one teleports you to an impossible spot/gravity!
    portals: [
      // Walking into the bottom-right door teleports you OUT of the top-left ceiling door UPSIDE DOWN!
      { x: 675, y: 404, toChamber: 0, toX: 115, toY: 92, toGrav: -1, glyph: '∆', color: '#2ec4b6', label: 'PARADOX LOOP ∆' },
      // Walking into the lower-left balcony door teleports you to the upper-right balcony!
      { x: 85, y: 306, toChamber: 0, toX: 645, toY: 130, toGrav: 1, glyph: '∞', color: '#ffb703', label: 'SAME-ROOM WARP ∞' },
      // Central door warps to Chamber II (The Infinite Cloister)
      { x: 380, y: 221, toChamber: 1, toX: 95, toY: 400, toGrav: 1, glyph: 'Ω', color: '#ff006e', label: 'TO CLOISTER II ▶' },
      // Ceiling door warps to Chamber III (Escher Waterfall) — or back to floor!
      { x: 640, y: 92, toChamber: 2, toX: 660, toY: 395, toGrav: 1, glyph: 'Ψ', color: '#00f5d4', label: 'TO AQUEDUCT III ▶' }
    ],
    qBlocks: [
      { x: 150, y: 260, hit: false },
      { x: 605, y: 260, hit: false }
    ],
    shards: [
      { id: 'c0_s0', x: 145, y: 295, taken: false },
      { id: 'c0_s1', x: 380, y: 100, taken: false }, // On the inverted ceiling!
      { id: 'c0_s2', x: 610, y: 120, taken: false }
    ],
    crows: [
      { x: 350, y: 410, minX: 180, maxX: 560, vx: 1.4, grav: 1, alive: true },
      { x: 380, y: 88, minX: 220, maxX: 540, vx: -1.5, grav: -1, alive: true } // Upside-down ceiling Crow!
    ]
  },
  {
    id: 1,
    name: 'CHAMBER II: THE PENROSE CLOISTER (ASCENDING & DESCENDING)',
    hint: 'Walking off the RIGHT edge brings you out on the LEFT — one story HIGHER in the same room!',
    palette: {
      bgTop: '#0f1026',
      bgBot: '#1c2541',
      blockTop: '#cbf3f0',
      blockFront: '#2ec4b6',
      blockSide: '#0f4c5c',
      bridgeTop: '#ffd166',
      bridgeFront: '#f77f00',
      accent: '#ffbe0b',
      gold: '#ffd166',
      crow: '#0b0914'
    },
    // Special rule: horizontal screen wrap shifts Y by -90px (ascending forever in the same room!)
    wrapStepY: -88,
    platforms: [
      { x: 15, y: 428, w: 730, h: 24, stairs: true },
      { x: 15, y: 54, w: 730, h: 22, stairs: true, isCeiling: true },
      // 3 Tiered Penrose Staircase Decks spanning the room
      { x: 40, y: 340, w: 280, h: 20, stairs: true },
      { x: 440, y: 340, w: 285, h: 20, stairs: true },
      { x: 40, y: 252, w: 260, h: 20, stairs: true },
      { x: 460, y: 252, w: 265, h: 20, stairs: true },
      { x: 180, y: 164, w: 400, h: 20, stairs: true }
    ],
    rotors: [
      { x: 380, y: 340, w: 130, h: 18, state: 0 },
      { x: 380, y: 252, w: 165, h: 18, state: 1 }
    ],
    portals: [
      // Top staircase door loops paradoxically back to the BOTTOM floor of the same room!
      { x: 380, y: 140, toChamber: 1, toX: 380, toY: 400, toGrav: -1, glyph: '↻', color: '#ffbe0b', label: 'PENROSE RESET ↻' },
      // Left balcony door returns to Chamber I (but on its upper ceiling!)
      { x: 75, y: 228, toChamber: 0, toX: 380, toY: 95, toGrav: -1, glyph: '∆', color: '#2ec4b6', label: '◀ HALL CEILING I' },
      // Right balcony door leads to Chamber III (The Waterfall Aqueduct)
      { x: 675, y: 228, toChamber: 2, toX: 110, toY: 395, toGrav: 1, glyph: 'Ψ', color: '#ff006e', label: 'TO AQUEDUCT III ▶' }
    ],
    qBlocks: [
      { x: 240, y: 280, hit: false },
      { x: 520, y: 190, hit: false }
    ],
    shards: [
      { id: 'c1_s0', x: 580, y: 305, taken: false },
      { id: 'c1_s1', x: 160, y: 218, taken: false },
      { id: 'c1_s2', x: 380, y: 125, taken: false }
    ],
    crows: [
      { x: 180, y: 322, minX: 55, maxX: 300, vx: 1.5, grav: 1, alive: true },
      { x: 380, y: 146, minX: 200, maxX: 550, vx: -1.6, grav: 1, alive: true },
      { x: 500, y: 88, minX: 160, maxX: 600, vx: 1.6, grav: -1, alive: true }
    ]
  },
  {
    id: 2,
    name: 'CHAMBER III: THE PERPETUAL WATERFALL SANCTUM',
    hint: 'Upward Waterfalls levitate you to the ceiling! Collect 6+ Shards across the Labyrinth to unlock the Crown Altar!',
    palette: {
      bgTop: '#10002b',
      bgBot: '#240046',
      blockTop: '#e0aaff',
      blockFront: '#9d4edd',
      blockSide: '#3c096c',
      bridgeTop: '#00f5d4',
      bridgeFront: '#00bbf9',
      accent: '#00f5d4',
      gold: '#fee440',
      crow: '#240046'
    },
    wrapStepY: 85,
    platforms: [
      { x: 20, y: 428, w: 720, h: 24, stairs: true },
      { x: 20, y: 54, w: 720, h: 22, stairs: true, isCeiling: true },
      { x: 50, y: 325, w: 210, h: 20, stairs: true },
      { x: 500, y: 325, w: 210, h: 20, stairs: true },
      { x: 250, y: 235, w: 260, h: 22, stairs: false },
      { x: 70, y: 148, w: 200, h: 20, stairs: true },
      { x: 490, y: 148, w: 200, h: 20, stairs: true }
    ],
    rotors: [
      { x: 380, y: 325, w: 180, h: 18, state: 1 },
      { x: 380, y: 148, w: 180, h: 18, state: 0 }
    ],
    waterfalls: [
      { x: 145, yTop: 76, yBot: 428, w: 42, dir: -1 }, // Flows UPWARD
      { x: 615, yTop: 76, yBot: 428, w: 42, dir: 1 }   // Flows DOWNWARD
    ],
    portals: [
      // Stepping into the bottom-center door teleports you to the TOP-LEFT of the same room with flipped gravity!
      { x: 380, y: 404, toChamber: 2, toX: 145, toY: 120, toGrav: 1, glyph: '∞', color: '#00f5d4', label: 'AQUEDUCT LOOP ∞' },
      // Left upper door loops back to Chamber I (Hall of Relativity)
      { x: 105, y: 124, toChamber: 0, toX: 380, toY: 215, toGrav: 1, glyph: '∆', color: '#ffb703', label: '◀ TO HALL I' },
      // Right upper door loops back to Chamber II (Penrose Cloister)
      { x: 645, y: 124, toChamber: 1, toX: 380, toY: 310, toGrav: 1, glyph: 'Ω', color: '#ff006e', label: '◀ TO CLOISTER II' }
    ],
    altar: { x: 380, y: 200 },
    qBlocks: [
      { x: 380, y: 365, hit: false },
      { x: 380, y: 105, hit: false }
    ],
    shards: [
      { id: 'c2_s0', x: 145, y: 265, taken: false },
      { id: 'c2_s1', x: 615, y: 265, taken: false },
      { id: 'c2_s2', x: 380, y: 95, taken: false }
    ],
    crows: [
      { x: 330, y: 217, minX: 260, maxX: 490, vx: 1.6, grav: 1, alive: true },
      { x: 280, y: 88, minX: 170, maxX: 580, vx: -1.7, grav: -1, alive: true }
    ]
  }
];

export function initEscherGame({
  canvas,
  ctx,
  W = 760,
  H = 480,
  difficulty = 'MEDIUM',
  keys,
  isPressed,
  addHighScore,
  triggerToast
}) {
  const localKeys = {};
  const checkKey = (k) => {
    const low = k.toLowerCase();
    if (typeof isPressed === 'function' && isPressed(low)) return true;
    if (keys && keys[low]) return true;
    return Boolean(localKeys[low]);
  };

  // Deep clone all 3 interconnected chambers so shard state persists as you teleport back and forth!
  let world = JSON.parse(JSON.stringify(CHAMBERS));
  let curChamberIdx = 0;
  let score = 0;
  let frame = 0;
  let screenShake = 0;
  let warpFlash = 0;
  let gravCooldown = 0;
  let portalCooldown = 0;
  let sWasDown = false;
  let worldMirrorX = false; // Non-Euclidean horizontal mirror state!
  let gameWon = false;

  const player = {
    x: 120,
    y: 390,
    vx: 0,
    vy: 0,
    w: 18,
    h: 26,
    gravDir: 1, // 1 = Floor Gravity (Down), -1 = Escher Ceiling Gravity (Up)
    grounded: false,
    coyote: 0,
    facing: 1,
    invuln: 0
  };

  // Ghost echoes of your past self walking where you teleported from!
  let echoes = [];
  let particles = [];
  let afterimages = [];
  const stars = Array.from({ length: 50 }, (_, i) => ({
    x: (i * 67) % W,
    y: (i * 43) % H,
    r: 1 + (i % 2.5),
    phase: i * 0.6
  }));

  const spawnParticles = (x, y, color, count = 16) => {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 1 + Math.random() * 4.5;
      particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        color,
        size: 2 + Math.floor(Math.random() * 3),
        life: 20 + Math.floor(Math.random() * 20)
      });
    }
  };

  const resetWorld = () => {
    world = JSON.parse(JSON.stringify(CHAMBERS));
    curChamberIdx = 0;
    score = 0;
    gameWon = false;
    worldMirrorX = false;
    player.x = 120;
    player.y = 390;
    player.vx = 0;
    player.vy = 0;
    player.gravDir = 1;
    echoes = [];
    particles = [];
    afterimages = [];
  };

  // ==========================================================================
  // CORE ESCHER ACTIONS: GRAVITY FLIP, ROTORS & PARADOX TELEPORTATION
  // ==========================================================================
  const flipGravity = () => {
    if (gravCooldown > 0 || gameWon) return;
    gravCooldown = 14;
    player.gravDir *= -1;
    player.grounded = false;
    player.vy = 4.2 * player.gravDir;
    screenShake = 5;
    const ch = world[curChamberIdx];
    spawnParticles(player.x, player.y, ch.palette.gold, 22);
  };

  const toggleRotors = () => {
    const ch = world[curChamberIdx];
    ch.rotors.forEach(r => {
      r.state = r.state === 1 ? 0 : 1;
      spawnParticles(r.x, r.y, ch.palette.accent, 18);
    });
    // Paradox twist: toggling bridges also swaps the horizontal mirror illusion of the room!
    screenShake = 6;
  };

  const triggerParadoxTeleport = (portal) => {
    if (portalCooldown > 0) return;
    portalCooldown = 48;
    warpFlash = 14;
    screenShake = 8;

    // Leave a translucent Escher Ghost Echo of yourself walking at the old spot!
    echoes.push({
      chamber: curChamberIdx,
      x: player.x,
      y: player.y,
      vx: player.facing * 1.4,
      gravDir: player.gravDir,
      life: 160
    });

    const oldChamber = curChamberIdx;
    curChamberIdx = portal.toChamber;
    player.x = portal.toX;
    player.y = portal.toY;
    player.vy = 0;
    if (portal.toGrav) player.gravDir = portal.toGrav;

    // Every paradox warp has a chance to mirror the room's non-Euclidean X perspective!
    if (oldChamber === curChamberIdx) {
      worldMirrorX = !worldMirrorX;
    }

    const ch = world[curChamberIdx];
    spawnParticles(player.x, player.y, portal.color || ch.palette.accent, 28);
    score += 75;
    if (triggerToast) {
      triggerToast(`🌀 Paradox Warp: ${portal.label}${oldChamber === curChamberIdx ? ' (Same Room, Different Plane!)' : ''}`);
    }
  };

  const doJump = () => {
    if (gameWon) {
      resetWorld();
      return;
    }
    if (player.grounded || player.coyote > 0) {
      player.vy = -8.6 * player.gravDir;
      player.grounded = false;
      player.coyote = 0;
      spawnParticles(player.x, player.y + player.gravDir * 12, world[curChamberIdx].palette.accent, 12);
    }
  };

  const onKeyDown = (e) => {
    const k = e.key.toLowerCase();
    localKeys[k] = true;
    if (k === 'w' || k === 'arrowup' || k === ' ') {
      doJump();
    } else if (k === 'q' || k === 's' || k === 'arrowdown' || k === 'f') {
      // Flip Gravity works ANYTIME with [Q], [S], [Down], or [F]!
      flipGravity();
    } else if (k === 'e' || k === 'shift' || k === 'enter') {
      toggleRotors();
    }
  };

  const onKeyUp = (e) => {
    localKeys[e.key.toLowerCase()] = false;
  };

  const onMouseDown = (e) => {
    if (gameWon) {
      resetWorld();
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (W / rect.width);
    const my = (e.clientY - rect.top) * (H / rect.height);

    // Top HUD Buttons:
    // 1. [⇅ FLIP GRAVITY (Q/S)] button (x: 410..565, y: 6..42)
    if (mx >= 405 && mx <= 568 && my >= 4 && my <= 44) {
      flipGravity();
      return;
    }
    // 2. [⟳ ROTATE BRIDGES (E)] button (x: 572..748, y: 6..42)
    if (mx >= 570 && mx <= 752 && my >= 4 && my <= 44) {
      toggleRotors();
      return;
    }

    const ch = world[curChamberIdx];
    let hitRotor = false;
    ch.rotors.forEach(r => {
      if (Math.hypot(mx - r.x, my - r.y) < 60) {
        r.state = r.state === 1 ? 0 : 1;
        spawnParticles(r.x, r.y, ch.palette.accent, 18);
        screenShake = 6;
        hitRotor = true;
      }
    });
    if (!hitRotor) {
      // Clicking elsewhere flips gravity or rotates bridges!
      if (e.button === 2) flipGravity();
      else toggleRotors();
    }
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  canvas.addEventListener('mousedown', onMouseDown);

  // ==========================================================================
  // ISOMETRIC ESCHER ARCHITECTURE RENDERER
  // ==========================================================================
  const drawIsoBlock = (x, y, w, h, topCol, frontCol, sideCol, hasStairs = false, isCeiling = false) => {
    const depth = 10;
    ctx.fillStyle = topCol;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + depth, y - depth);
    ctx.lineTo(x + w + depth, y - depth);
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = sideCol;
    ctx.beginPath();
    ctx.moveTo(x + w, y);
    ctx.lineTo(x + w + depth, y - depth);
    ctx.lineTo(x + w + depth, y + h - depth);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = frontCol;
    ctx.fillRect(x, y, w, h);

    // Carved Monument Valley arches on both bottom AND top for ceiling walking!
    ctx.fillStyle = sideCol;
    const archCount = Math.max(2, Math.floor(w / 46));
    const archW = w / archCount;
    for (let i = 0; i < archCount; i++) {
      ctx.beginPath();
      ctx.arc(x + archW * (i + 0.5), isCeiling ? y : y + h, archW * 0.25, isCeiling ? 0 : Math.PI, isCeiling ? Math.PI : 0);
      ctx.fill();
    }

    if (hasStairs) {
      ctx.fillStyle = sideCol;
      for (let sx = x + 10; sx < x + w - 14; sx += 20) {
        ctx.fillRect(sx, y - 4, 10, 4);
        ctx.fillRect(sx, y + h, 10, 4); // Upside-down Escher stairs on the underside too!
      }
    }
  };

  const getTotalShards = () => {
    let taken = 0;
    let total = 0;
    world.forEach(c => {
      c.shards.forEach(s => {
        total++;
        if (s.taken) taken++;
      });
    });
    return { taken, total };
  };

  // ==========================================================================
  // MAIN LOOP
  // ==========================================================================
  let animId;
  const loop = () => {
    frame++;
    if (screenShake > 0) screenShake *= 0.85;
    if (warpFlash > 0) warpFlash--;
    if (gravCooldown > 0) gravCooldown--;
    if (portalCooldown > 0) portalCooldown--;
    if (player.invuln > 0) player.invuln--;

    const ch = world[curChamberIdx];
    const left = checkKey('a') || checkKey('arrowleft');
    const right = checkKey('d') || checkKey('arrowright');
    const up = checkKey('w') || checkKey('arrowup') || checkKey(' ');
    const flipKey = checkKey('s') || checkKey('arrowdown') || checkKey('q');

    if (flipKey && !sWasDown) {
      flipGravity();
    }
    sWasDown = flipKey;

    if (!gameWon) {
      const accel = player.grounded ? 0.65 : 0.45;
      // Non-Euclidean twist: when worldMirrorX is active, controls stay intuitive on screen
      if (left) {
        player.vx = Math.max(-4.3, player.vx - accel);
        player.facing = -1;
      } else if (right) {
        player.vx = Math.min(4.3, player.vx + accel);
        player.facing = 1;
      } else {
        player.vx *= 0.8;
      }

      if (up && player.grounded) {
        doJump();
      }

      // Check Perpetual Escher Waterfalls
      let inWaterfall = false;
      if (ch.waterfalls) {
        ch.waterfalls.forEach(wf => {
          if (
            player.x + player.w / 2 > wf.x - wf.w / 2 &&
            player.x - player.w / 2 < wf.x + wf.w / 2 &&
            player.y > wf.yTop &&
            player.y < wf.yBot
          ) {
            inWaterfall = true;
            player.vy = wf.dir * 3.5;
          }
        });
      }

      if (!inWaterfall) {
        const gForce = (difficulty === 'EASY' ? 0.36 : 0.42) * player.gravDir;
        player.vy = Math.max(-9.5, Math.min(9.5, player.vy + gForce));
      }

      const prevY = player.y;
      player.x += player.vx;
      player.y += player.vy;

      // Non-Euclidean Screen-Edge Wrap!
      // Walking off the right edge wraps to the left AND shifts your Y height onto a different staircase!
      if (player.x > W - 14) {
        player.x = 22;
        if (ch.wrapStepY) {
          player.y = Math.max(85, Math.min(405, player.y + ch.wrapStepY));
          warpFlash = 8;
          spawnParticles(player.x, player.y, ch.palette.accent, 16);
        }
      } else if (player.x < 14) {
        player.x = W - 22;
        if (ch.wrapStepY) {
          player.y = Math.max(85, Math.min(405, player.y - ch.wrapStepY));
          warpFlash = 8;
          spawnParticles(player.x, player.y, ch.palette.accent, 16);
        }
      }

      // Vertical safety wrap (if somehow outside ceiling/floor, wrap to opposite side & invert gravity!)
      if (player.y > H - 18) {
        player.y = 85;
        player.vy = 0;
        player.gravDir = 1;
      } else if (player.y < 52) {
        player.y = 400;
        player.vy = 0;
        player.gravDir = -1;
      }

      // Gather all solid blocks (static platforms + active horizontal rotor bridges)
      const solids = [...ch.platforms];
      ch.rotors.forEach(r => {
        if (r.state === 1) {
          solids.push({
            x: r.x - r.w / 2,
            y: r.y - r.h / 2,
            w: r.w,
            h: r.h
          });
        }
      });

      player.grounded = false;
      solids.forEach(p => {
        const withinX = player.x + player.w * 0.45 > p.x && player.x - player.w * 0.45 < p.x + p.w;
        if (!withinX) return;

        if (player.gravDir === 1) {
          // Normal downward landing on top surface (p.y)
          const prevFoot = prevY + player.h / 2;
          const curFoot = player.y + player.h / 2;
          if (player.vy >= 0 && curFoot >= p.y && prevFoot <= p.y + 14) {
            player.y = p.y - player.h / 2;
            player.vy = 0;
            player.grounded = true;
            player.coyote = 8;
          }
        } else {
          // Inverted Escher Ceiling Landing on underside surface (p.y + p.h)
          const underY = p.y + p.h;
          const prevHead = prevY - player.h / 2;
          const curHead = player.y - player.h / 2;
          if (player.vy <= 0 && curHead <= underY && prevHead >= underY - 14) {
            player.y = underY + player.h / 2;
            player.vy = 0;
            player.grounded = true;
            player.coyote = 8;
          }
        }
      });

      if (!player.grounded && player.coyote > 0) player.coyote--;

      // Check Non-Euclidean Paradox Doorways!
      ch.portals.forEach(pt => {
        if (portalCooldown <= 0 && Math.hypot(player.x - pt.x, player.y - pt.y) < 26) {
          triggerParadoxTeleport(pt);
        }
      });

      // Mario-style Sacred Geometry [?] Blocks
      ch.qBlocks.forEach(qb => {
        if (!qb.hit && Math.hypot(player.x - qb.x, player.y - qb.y) < 26) {
          qb.hit = true;
          score += 250;
          player.vy = -6.5 * player.gravDir;
          spawnParticles(qb.x, qb.y, ch.palette.gold, 22);
        }
      });

      // Sacred Geometry Shards
      ch.shards.forEach(sh => {
        if (!sh.taken && Math.hypot(player.x - sh.x, player.y - sh.y) < 26) {
          sh.taken = true;
          score += 450;
          screenShake = 6;
          spawnParticles(sh.x, sh.y, ch.palette.accent, 26);
        }
      });

      // Crow Sentinels (Patrol both floors and inverted ceilings!)
      ch.crows.forEach(c => {
        if (!c.alive) return;
        c.x += c.vx;
        if (c.x < c.minX || c.x > c.maxX) c.vx *= -1;

        const dx = Math.abs(player.x - c.x);
        const dy = player.y - c.y;
        if (dx < 20 && Math.abs(dy) < 22) {
          const isStomp =
            (player.gravDir === 1 && player.vy > 0 && dy < -3) ||
            (player.gravDir === -1 && player.vy < 0 && dy > 3);
          if (isStomp) {
            c.alive = false;
            player.vy = -7.2 * player.gravDir;
            score += 350;
            screenShake = 6;
            spawnParticles(c.x, c.y, ch.palette.gold, 22);
          } else if (player.invuln <= 0) {
            // Paradox Knockback: instead of dying, touching a Crow teleports you to an impossible balcony!
            player.invuln = 50;
            warpFlash = 10;
            screenShake = 9;
            player.gravDir *= -1;
            player.y = player.gravDir === 1 ? 390 : 95;
            player.vy = 0;
            spawnParticles(player.x, player.y, '#ff006e', 22);
          }
        }
      });

      if (Math.abs(player.vx) > 2.2 || Math.abs(player.vy) > 3.5) {
        if (frame % 3 === 0) {
          afterimages.push({ x: player.x, y: player.y, gravDir: player.gravDir, life: 12 });
        }
      }

      // Check Grand Escher Altar in Chamber III (Unlocked once 6+ Shards are collected across the labyrinth!)
      const shardStats = getTotalShards();
      if (ch.altar && shardStats.taken >= 6 && Math.hypot(player.x - ch.altar.x, player.y - ch.altar.y) < 36) {
        gameWon = true;
        score += 2000;
        if (addHighScore) addHighScore('escher', score);
        if (triggerToast) triggerToast('👑 YOU MASTERED THE IMPOSSIBLE ESCHER LABYRINTH!');
      }
    }

    // ========================================================================
    // RENDER NON-EUCLIDEAN ESCHER CHAMBER
    // ========================================================================
    const pal = ch.palette;
    ctx.save();
    if (screenShake > 0.5) {
      ctx.translate((Math.random() - 0.5) * screenShake, (Math.random() - 0.5) * screenShake);
    }

    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, pal.bgTop);
    bgGrad.addColorStop(1, pal.bgBot);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Twinkling stars & Rotating Penrose Sacred Geometry in background
    stars.forEach(s => {
      const alpha = 0.3 + 0.3 * Math.sin(frame * 0.05 + s.phase);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(s.x, s.y, s.r, s.r);
    });

    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(frame * 0.003 * player.gravDir);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-150, -150, 300, 300);
    ctx.rotate(Math.PI / 4);
    ctx.strokeRect(-150, -150, 300, 300);
    ctx.restore();

    // Perpetual Escher Waterfalls
    if (ch.waterfalls) {
      ch.waterfalls.forEach(wf => {
        ctx.fillStyle = 'rgba(0, 245, 212, 0.24)';
        ctx.fillRect(wf.x - wf.w / 2, wf.yTop, wf.w, wf.yBot - wf.yTop);
        ctx.fillStyle = '#cbf3f0';
        for (let wy = wf.yTop; wy < wf.yBot; wy += 24) {
          const offset = ((frame * 2.4 * wf.dir) % 24 + 24) % 24;
          ctx.fillRect(wf.x - wf.w * 0.35, wy + offset, wf.w * 0.7, 4);
        }
        ctx.fillStyle = pal.accent;
        ctx.font = 'bold 9px monospace';
        ctx.fillText(wf.dir < 0 ? '▲ UPWARD FALLS' : '▼ DOWN FALLS', wf.x - 36, wf.yBot - 8);
      });
    }

    // Draw Isometric Platforms (Floor, Inverted Ceiling, and Staircases)
    ch.platforms.forEach(p => {
      drawIsoBlock(p.x, p.y, p.w, p.h, pal.blockTop, pal.blockFront, pal.blockSide, p.stairs, p.isCeiling);
    });

    // Draw Impossible Rotors / Bridges
    ch.rotors.forEach(r => {
      if (r.state === 1) {
        drawIsoBlock(r.x - r.w / 2, r.y - r.h / 2, r.w, r.h, pal.bridgeTop, pal.bridgeFront, pal.blockSide);
      } else {
        drawIsoBlock(r.x - 11, r.y - r.w * 0.42, 22, r.w * 0.84, pal.bridgeTop, pal.bridgeFront, pal.blockSide);
      }
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.state * (Math.PI / 2));
      ctx.fillStyle = pal.gold;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-13, 0);
      ctx.lineTo(13, 0);
      ctx.moveTo(0, -13);
      ctx.lineTo(0, 13);
      ctx.stroke();
      ctx.restore();
    });

    // Draw Non-Euclidean Paradox Doorways!
    ch.portals.forEach(pt => {
      const pulse = 22 + Math.sin(frame * 0.08) * 4;
      const g = ctx.createRadialGradient(pt.x, pt.y, 2, pt.x, pt.y, pulse + 12);
      g.addColorStop(0, pt.color + 'aa');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pulse + 12, 0, Math.PI * 2);
      ctx.fill();

      // Archway Door Frame
      ctx.fillStyle = '#090b14';
      ctx.fillRect(pt.x - 13, pt.y - 18, 26, 36);
      ctx.strokeStyle = pt.color;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(pt.x - 13, pt.y - 18, 26, 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(pt.glyph, pt.x, pt.y + 5);
      ctx.fillStyle = pt.color;
      ctx.font = 'bold 9px monospace';
      ctx.fillText(pt.label, pt.x, pt.y - 23);
      ctx.textAlign = 'left';
    });

    // Draw Mario-style [?] Cubes
    ch.qBlocks.forEach(qb => {
      const by = Math.sin(frame * 0.08) * 3;
      drawIsoBlock(
        qb.x - 13,
        qb.y - 13 + by,
        26,
        22,
        qb.hit ? '#64748b' : pal.gold,
        qb.hit ? '#475569' : '#fb8500',
        '#1e293b'
      );
      if (!qb.hit) {
        ctx.fillStyle = '#181828';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('?', qb.x - 4, qb.y + 3 + by);
      }
    });

    // Draw Sacred Geometry Shards
    ch.shards.forEach(sh => {
      if (sh.taken) return;
      const hover = Math.sin(frame * 0.09 + sh.x) * 4;
      ctx.save();
      ctx.translate(sh.x, sh.y + hover);
      ctx.rotate(frame * 0.05);
      ctx.fillStyle = pal.accent;
      ctx.fillRect(-8, -8, 16, 16);
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(-8, -8, 16, 16);
      ctx.restore();
    });

    // Draw Grand Escher Altar (in Chamber III)
    const shardStats = getTotalShards();
    if (ch.altar) {
      const unlocked = shardStats.taken >= 6;
      const al = ch.altar;
      ctx.strokeStyle = unlocked ? pal.gold : '#94a3b8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(al.x, al.y - 24);
      ctx.lineTo(al.x + 22, al.y + 14);
      ctx.lineTo(al.x - 22, al.y + 14);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = unlocked ? pal.gold : '#cbd5e1';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        unlocked ? '★ ENTER CROWN ALTAR TO WIN! ★' : `CROWN ALTAR (${shardStats.taken}/6 SHARDS)`,
        al.x,
        al.y - 30
      );
      ctx.textAlign = 'left';
    }

    // Draw Crow Sentinels (upright or upside-down on ceilings!)
    ch.crows.forEach(c => {
      if (!c.alive) return;
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.grav === -1) ctx.scale(1, -1);
      ctx.fillStyle = pal.crow;
      ctx.fillRect(-9, -12, 18, 22);
      ctx.fillStyle = pal.gold;
      const dir = c.vx >= 0 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(dir * 9, -8);
      ctx.lineTo(dir * 17, -4);
      ctx.lineTo(dir * 9, 0);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dir * 3, -9, 3, 3);
      ctx.restore();
    });

    // Draw Paradox Past-Self Ghost Echoes!
    for (let i = echoes.length - 1; i >= 0; i--) {
      const ec = echoes[i];
      ec.x += ec.vx;
      ec.life--;
      if (ec.chamber === curChamberIdx) {
        ctx.save();
        ctx.translate(ec.x, ec.y);
        if (ec.gravDir === -1) ctx.scale(1, -1);
        ctx.globalAlpha = Math.max(0, (ec.life / 160) * 0.55);
        ctx.fillStyle = pal.accent;
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(-10, 12);
        ctx.lineTo(10, 12);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      if (ec.life <= 0) echoes.splice(i, 1);
    }

    // Draw Afterimages
    for (let i = afterimages.length - 1; i >= 0; i--) {
      const af = afterimages[i];
      af.life--;
      ctx.fillStyle = `rgba(255, 255, 255, ${af.life / 28})`;
      ctx.fillRect(af.x - 6, af.y - 10, 12, 20);
      if (af.life <= 0) afterimages.splice(i, 1);
    }

    // Draw Player (Geometric Pilgrim with Flowing Scarf & Conical Hat)
    ctx.save();
    ctx.translate(player.x, player.y);
    if (player.gravDir === -1) ctx.scale(1, -1);

    ctx.strokeStyle = pal.accent;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.quadraticCurveTo(
      -player.facing * 12,
      -6 + Math.sin(frame * 0.2) * 5,
      -player.facing * 20,
      -2 + Math.cos(frame * 0.2) * 5
    );
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(-10, 13);
    ctx.lineTo(10, 13);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = pal.gold;
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(-11, -6);
    ctx.lineTo(11, -6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      if (p.life <= 0) particles.splice(i, 1);
    }

    if (warpFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${warpFlash / 25})`;
      ctx.fillRect(0, 0, W, H);
    }

    // ========================================================================
    // TOP HUD BAR WITH CLICKABLE [FLIP GRAVITY] & [ROTATE BRIDGES] BUTTONS
    // ========================================================================
    ctx.fillStyle = 'rgba(11, 15, 29, 0.92)';
    ctx.fillRect(0, 0, W, 48);
    ctx.strokeStyle = pal.gold;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.lineTo(W, 48);
    ctx.stroke();

    ctx.fillStyle = pal.gold;
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`🏛️ ${ch.name}`, 12, 18);

    ctx.fillStyle = pal.accent;
    ctx.font = 'bold 10px monospace';
    ctx.fillText(
      `SHARDS: ${shardStats.taken}/${shardStats.total}  |  SCORE: ${score}  |  WALK INTO ARCHWAYS TO WARP!`,
      12,
      36
    );

    // Interactive Button 1: Flip Gravity (Q / S)
    ctx.fillStyle = player.gravDir === -1 ? pal.accent : '#1e293b';
    ctx.fillRect(410, 8, 154, 32);
    ctx.strokeStyle = pal.accent;
    ctx.strokeRect(410, 8, 154, 32);
    ctx.fillStyle = player.gravDir === -1 ? '#090d16' : '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`⇅ GRAVITY [Q/S]: ${player.gravDir === 1 ? '▼DOWN' : '▲UP'}`, 487, 28);

    // Interactive Button 2: Rotate Bridges (E / Click)
    ctx.fillStyle = pal.gold;
    ctx.fillRect(574, 8, 172, 32);
    ctx.fillStyle = '#090d16';
    ctx.fillText('⟳ ROTATE BRIDGES [E]', 660, 28);
    ctx.textAlign = 'left';

    if (gameWon) {
      ctx.fillStyle = 'rgba(10, 12, 28, 0.92)';
      ctx.fillRect(120, 140, W - 240, 190);
      ctx.strokeStyle = pal.gold;
      ctx.lineWidth = 3;
      ctx.strokeRect(120, 140, W - 240, 190);

      ctx.textAlign = 'center';
      ctx.fillStyle = pal.gold;
      ctx.font = 'bold 22px monospace';
      ctx.fillText('★ NON-EUCLIDEAN ODYSSEY COMPLETE! ★', W / 2, 188);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillText('You transcended M.C. Escher\'s Impossible Labyrinth!', W / 2, 224);
      ctx.fillStyle = pal.accent;
      ctx.font = 'bold 16px monospace';
      ctx.fillText(`FINAL SCORE: ${score}`, W / 2, 262);
      ctx.fillStyle = pal.gold;
      ctx.font = 'bold 13px monospace';
      ctx.fillText('[ CLICK OR PRESS SPACE TO PLAY AGAIN ]', W / 2, 302);
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
    canvas.removeEventListener('mousedown', onMouseDown);
  };
}
