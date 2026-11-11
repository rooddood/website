// ============================================================================
// TANK WARS: SCORCHED TERRAIN (2D Side-View Turn-Based Destructible Pixel Game)
// ============================================================================

export const WEAPON_CATALOG = [
  {
    id: 'standard',
    name: 'Standard Shell',
    cost: 0,
    ammoPerBuy: 999,
    infinite: true,
    color: '#ffd60a',
    radius: 26,
    damage: 28,
    desc: 'Classic ballistic tank shell. Infinite ammo.'
  },
  {
    id: 'roller',
    name: 'Roller Bomb',
    cost: 120,
    ammoPerBuy: 3,
    color: '#00e676',
    radius: 30,
    damage: 38,
    desc: 'Rolls downhill along terrain slopes before detonating!'
  },
  {
    id: 'bouncer',
    name: 'Rubber Bouncer',
    cost: 140,
    ammoPerBuy: 3,
    color: '#ff2a85',
    radius: 28,
    damage: 36,
    desc: 'Bounces 4 times off hills and walls with high elasticity!'
  },
  {
    id: 'cluster',
    name: 'Cluster Bomb',
    cost: 200,
    ammoPerBuy: 3,
    color: '#00e5ff',
    radius: 20,
    damage: 22,
    desc: 'Splits into 6 explosive mini-bomblets at apex or impact!'
  },
  {
    id: 'volley',
    name: 'Multi-Volley x4',
    cost: 220,
    ammoPerBuy: 3,
    color: '#f97316',
    radius: 22,
    damage: 20,
    desc: 'Fires a rapid spread barrage of 4 shells at once!'
  },
  {
    id: 'drill',
    name: 'Bunker Buster',
    cost: 240,
    ammoPerBuy: 2,
    color: '#a855f7',
    radius: 36,
    damage: 48,
    desc: 'Burrows through solid pixel terrain before exploding deep!'
  },
  {
    id: 'napalm',
    name: 'Plasma Rain',
    cost: 260,
    ammoPerBuy: 2,
    color: '#ef4444',
    radius: 24,
    damage: 25,
    desc: 'Unleashes burning plasma droplets that melt terrain & armor!'
  },
  {
    id: 'sniper',
    name: 'Railgun Slug',
    cost: 250,
    ammoPerBuy: 3,
    color: '#38bdf8',
    radius: 18,
    damage: 52,
    desc: 'Ultra-fast flat-trajectory kinetic penetrator!'
  },
  {
    id: 'seeker',
    name: 'Homing Seeker',
    cost: 300,
    ammoPerBuy: 2,
    color: '#ec4899',
    radius: 28,
    damage: 42,
    desc: 'Locks onto nearest enemy tank while descending!'
  },
  {
    id: 'dirt',
    name: 'Dirt Builder',
    cost: 100,
    ammoPerBuy: 4,
    color: '#a16207',
    radius: 38,
    damage: 5,
    desc: 'Constructs a giant mound of solid terrain to bury foes or build cover!'
  },
  {
    id: 'nuke',
    name: 'Atom Nuke',
    cost: 450,
    ammoPerBuy: 1,
    color: '#84cc16',
    radius: 62,
    damage: 75,
    desc: 'Massive thermonuclear crater & shockwave!'
  }
];

export const UPGRADE_CATALOG = [
  { id: 'fuel', name: 'Fuel & Treads', baseCost: 150, maxLvl: 6, desc: '+35 Move Fuel & steeper hill climbing' },
  { id: 'power', name: 'Cannon Range', baseCost: 160, maxLvl: 6, desc: '+15% Max Firing Power & Velocity' },
  { id: 'blast', name: 'Warhead Yield', baseCost: 200, maxLvl: 5, desc: '+12% Blast Radius & +12% Damage' },
  { id: 'armor', name: 'Reactive Armor', baseCost: 180, maxLvl: 6, desc: '+30 Max HP & instant hull repair' },
  { id: 'laser', name: 'Laser Sight', baseCost: 250, maxLvl: 3, desc: 'Extends trajectory prediction arc' },
  { id: 'jetpack', name: 'Jump Thrusters', baseCost: 220, maxLvl: 3, desc: 'Press W+SPACE or THRUST to hop craters' }
];

export const CHASSIS_STYLES = [
  { id: 'classic', name: 'SPIRIT TITAN', color: '#ffbe0b', turret: 'single' },
  { id: 'mammoth', name: 'LAPUTA DUAL', color: '#38bdf8', turret: 'dual' },
  { id: 'stealth', name: 'MONONOKE RAIL', color: '#a78bfa', turret: 'rail' },
  { id: 'inferno', name: 'HOWL MORTAR', color: '#e63946', turret: 'mortar' },
  { id: 'gold', name: 'VALLEY SHELL', color: '#4ade80', turret: 'dome' }
];

// Miyazaki-Inspired Biomes: Warm Golden Sunset Day vs Cool Twilight Night
const WARM_BIOMES = [
  {
    name: 'Laputa Sunset Meadow',
    topColor: '#52b788',       // Lush Ghibli emerald meadow
    bodyColor: '#1b4332',      // Rich spruce earth
    deepColor: '#081c15',      // Bedrock slate
    sunColor: '#ffbe0b',       // Golden saffron sun
    mesaColor: '#13231a',
    skyBands: ['#1d3557', '#2a4d69', '#457b9d', '#6b9080', '#e76f51', '#f4a261', '#f9c74f']
  },
  {
    name: 'Spirited Bathhouse Dunes',
    topColor: '#f77f00',       // Terracotta dune crust
    bodyColor: '#9d0208',      // Volcanic clay
    deepColor: '#370617',      // Deep obsidian
    sunColor: '#ffd166',
    mesaColor: '#2b0918',
    skyBands: ['#1b1026', '#3b1443', '#6f1d56', '#a82c5f', '#d94e43', '#f28e2b', '#ffc048']
  }
];

const COOL_BIOMES = [
  {
    name: 'Twilight Spirit River',
    topColor: '#48cae4',       // Bioluminescent teal bank
    bodyColor: '#023e8a',      // Midnight cobalt earth
    deepColor: '#03045e',      // Abyssal indigo
    sunColor: '#ffd166',       // Glowing spirit lantern moon
    mesaColor: '#060c24',
    skyBands: ['#030712', '#0a1435', '#122b54', '#184570', '#1e5f8a', '#2b82a2', '#38bdf8']
  },
  {
    name: 'Valley of the Wind Night',
    topColor: '#72efdd',       // Glowing mint moss
    bodyColor: '#1f487e',      // Deep sapphire strata
    deepColor: '#0c1b33',      // Night slate
    sunColor: '#f0fdf4',
    mesaColor: '#081326',
    skyBands: ['#020617', '#0f172a', '#1e293b', '#1e3a5f', '#134e4a', '#047857', '#34d399']
  }
];

export function initTankGame({ canvas, ctx, W, H, mode, difficulty, playerName, isPressed, addHighScore, theme = 'warm', onCrash }) {
  // Persistent progression during session
  let wave = 1;
  let crashed = false;
  let cash = difficulty === 'EASY' ? 450 : difficulty === 'HARD' ? 250 : 350;
  let totalScore = 0;
  let showShop = false;
  let shopTab = 'upgrades'; // 'upgrades' | 'weapons' | 'style'

  const upgrades = {
    fuel: 1,
    power: 1,
    blast: 1,
    armor: 1,
    laser: 1,
    jetpack: 0
  };

  const inventory = {
    standard: 999,
    roller: 3,
    bouncer: 2,
    cluster: 2,
    volley: 1,
    drill: 1,
    napalm: 0,
    sniper: 1,
    seeker: 0,
    dirt: 2,
    nuke: 0
  };

  let selectedWeaponId = 'standard';
  let chassisIdx = 0;

  // Destructible 2D pixel terrain buffer: 0 = air, 1 = solid ground, 2 = top crust
  const terrain = new Uint8Array(W * H);
  // Offscreen canvas for fast pixel terrain rendering
  const terrainCanvas = document.createElement('canvas');
  terrainCanvas.width = W;
  terrainCanvas.height = H;
  const tCtx = terrainCanvas.getContext('2d');
  const tImgData = tCtx.createImageData(W, H);

  const activeBiomeList = theme === 'cool' ? COOL_BIOMES : WARM_BIOMES;
  let currentBiome = activeBiomeList[0];

  const hexToRgb = (hex) => {
    const v = parseInt(hex.replace('#', ''), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  };

  const syncTerrainImage = (minX = 0, maxX = W - 1, minY = 0, maxY = H - 1) => {
    const x0 = Math.max(0, Math.floor(minX));
    const x1 = Math.min(W - 1, Math.ceil(maxX));
    const y0 = Math.max(0, Math.floor(minY));
    const y1 = Math.min(H - 1, Math.ceil(maxY));

    const topRgb = hexToRgb(currentBiome.topColor);
    const bodyRgb = hexToRgb(currentBiome.bodyColor);
    const deepRgb = hexToRgb(currentBiome.deepColor);
    const data = tImgData.data;

    for (let y = y0; y <= y1; y++) {
      const rowOff = y * W;
      const by = Math.floor(y / 4);
      for (let x = x0; x <= x1; x++) {
        const idx = rowOff + x;
        const pIdx = idx * 4;
        const val = terrain[idx];
        if (val === 0) {
          data[pIdx + 3] = 0;
        } else {
          const bx = Math.floor(x / 4);
          const dither = (bx + by) % 2 === 0;
          // Check if near surface (8-bit chunky pixel crust within 6 pixels above)
          const isTopCrust =
            y > 6 &&
            (terrain[(y - 2) * W + x] === 0 ||
              terrain[(y - 4) * W + x] === 0 ||
              (dither && terrain[(y - 6) * W + x] === 0));
          if (isTopCrust) {
            data[pIdx] = topRgb[0];
            data[pIdx + 1] = topRgb[1];
            data[pIdx + 2] = topRgb[2];
            data[pIdx + 3] = 255;
          } else {
            // Chunky 4x4 pixel strata + classic 16-bit checkerboard dithering
            const depthBand = Math.min(1, Math.floor((y - 160) / 36) / 7);
            const useDeep = depthBand > 0.55 || (depthBand > 0.3 && dither);
            const blockHash = ((bx * 19 + by * 37) % 5 === 0) ? 16 : 0;
            const baseRgb = useDeep ? deepRgb : bodyRgb;
            data[pIdx] = Math.max(0, Math.min(255, baseRgb[0] + blockHash));
            data[pIdx + 1] = Math.max(0, Math.min(255, baseRgb[1] + (blockHash >> 1)));
            data[pIdx + 2] = Math.max(0, Math.min(255, baseRgb[2] + (blockHash >> 1)));
            data[pIdx + 3] = 255;
          }
        }
      }
    }
    tCtx.putImageData(tImgData, 0, 0, x0, y0, x1 - x0 + 1, y1 - y0 + 1);
  };

  const generateTerrain = () => {
    currentBiome = activeBiomeList[(wave - 1) % activeBiomeList.length];
    terrain.fill(0);
    const phase1 = Math.random() * Math.PI * 2;
    const phase2 = Math.random() * Math.PI * 2;
    const phase3 = Math.random() * Math.PI * 2;
    const amp1 = 42 + Math.random() * 28;
    const amp2 = 20 + Math.random() * 18;
    const baseH = 290 + (Math.random() - 0.5) * 30;

    for (let x = 0; x < W; x++) {
      // Quantize X and Y to 4px steps for authentic 8-bit/16-bit stepped hills!
      const qx = Math.floor(x / 4) * 4;
      let surfaceY = Math.floor(
        baseH +
        Math.sin(qx * 0.009 + phase1) * amp1 +
        Math.cos(qx * 0.023 + phase2) * amp2 +
        Math.sin(qx * 0.055 + phase3) * 8
      );
      surfaceY = Math.floor(Math.max(152, Math.min(H - 48, surfaceY)) / 4) * 4;
      for (let y = surfaceY; y < H; y++) {
        terrain[y * W + x] = 1;
      }
    }
    syncTerrainImage(0, W - 1, 0, H - 1);
  };

  // Find surface Y at a given X near tank's current Y
  const getGroundY = (x, startY = 0) => {
    if (!Number.isFinite(x)) return H - 48;
    const safeStart = Number.isFinite(startY) ? startY : 0;
    const cx = Math.max(0, Math.min(W - 1, Math.round(x)));
    for (let y = Math.max(0, Math.floor(safeStart)); y < H; y++) {
      if (terrain[y * W + cx] !== 0) return y;
    }
    return H - 48;
  };

  const isPixelSolid = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return true;
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || ix >= W || iy >= H - 48) return true;
    if (iy < 0) return false;
    return terrain[iy * W + ix] !== 0;
  };

  // Carve or build circular pixel terrain crater + settle floating columns
  const modifyTerrainCircle = (cx, cy, radius, addDirt = false) => {
    const r = Math.round(radius);
    const x0 = Math.max(0, Math.floor(cx - r));
    const x1 = Math.min(W - 1, Math.ceil(cx + r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const y1 = Math.min(H - 52, Math.ceil(cy + r));

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        if (d2 <= r * r) {
          terrain[y * W + x] = addDirt ? 1 : 0;
        }
      }
    }

    // Settle floating pixels above bedrock floor (H - 48) so tanks stay above bottom dock
    for (let x = x0; x <= x1; x++) {
      let writeY = H - 49;
      for (let y = H - 49; y >= 0; y--) {
        if (terrain[y * W + x] !== 0) {
          if (writeY !== y) {
            terrain[writeY * W + x] = 1;
            terrain[y * W + x] = 0;
          }
          writeY--;
        }
      }
    }

    syncTerrainImage(x0 - 2, x1 + 2, 0, H - 1);
  };

  let tanks = [];
  let activeTankIdx = 0;
  let projectiles = [];
  let particles = [];
  let floatingTexts = [];
  let wind = 0;
  let inStartScreen = true;
  let roundOver = false;
  let roundWinner = '';
  let aiThinkTimer = 0;
  let turnLockTimer = 0;

  const getPlayerMaxHp = () => 100 + (upgrades.armor - 1) * 30;
  const getPlayerMaxFuel = () => 90 + (upgrades.fuel - 1) * 35;
  const getPlayerMaxPower = () => 12.5 * (1 + (upgrades.power - 1) * 0.14);
  const getBlastMult = () => 1 + (upgrades.blast - 1) * 0.12;

  const spawnWave = () => {
    generateTerrain();
    projectiles = [];
    particles = [];
    floatingTexts = [];
    roundOver = false;
    roundWinner = '';
    wind = (Math.random() - 0.5) * 0.055;

    const pStyle = CHASSIS_STYLES[chassisIdx];
    const pMaxHp = getPlayerMaxHp();
    const pMaxFuel = getPlayerMaxFuel();

    const p1X = 95 + Math.floor(Math.random() * 70);
    const p1 = {
      id: 'p1',
      name: playerName || 'PLAYER 1',
      isBot: false,
      x: p1X,
      y: getGroundY(p1X) - 6,
      vx: 0,
      vy: 0,
      angle: 38, // degrees (0 = right, 90 = straight up, 180 = left)
      power: 72, // 10..100%
      hp: pMaxHp,
      maxHp: pMaxHp,
      fuel: pMaxFuel,
      maxFuel: pMaxFuel,
      color: pStyle.color,
      turret: pStyle.turret,
      slopeAngle: 0
    };

    tanks = [p1];

    if (mode === '2P') {
      const p2X = W - 110 - Math.floor(Math.random() * 60);
      tanks.push({
        id: 'p2',
        name: 'PLAYER 2',
        isBot: false,
        x: p2X,
        y: getGroundY(p2X) - 6,
        vx: 0,
        vy: 0,
        angle: 142,
        power: 72,
        hp: pMaxHp,
        maxHp: pMaxHp,
        fuel: pMaxFuel,
        maxFuel: pMaxFuel,
        color: '#ff2a85',
        turret: 'dual',
        slopeAngle: 0
      });
    } else {
      // Progressive AI tanks based on wave
      const enemyCount = Math.min(3, 1 + Math.floor(wave / 2));
      const enemyNames = ['IRON_VIPER', 'DREAD_BOT', 'MEGA_HOWITZER', 'CYBER_PANZER'];
      const enemyColors = ['#ff2a85', '#f97316', '#a855f7'];
      const enemyTurrets = ['single', 'dual', 'mortar', 'rail'];

      for (let i = 0; i < enemyCount; i++) {
        const spacing = Math.floor(340 / enemyCount);
        const ex = W - 90 - i * spacing - Math.floor(Math.random() * 40);
        const eHp = Math.round((85 + wave * 25) * (difficulty === 'EASY' ? 0.8 : difficulty === 'HARD' ? 1.25 : 1));
        tanks.push({
          id: `bot_${i}`,
          name: `${enemyNames[(wave + i) % enemyNames.length]}`,
          isBot: true,
          x: ex,
          y: getGroundY(ex) - 6,
          vx: 0,
          vy: 0,
          angle: 135,
          power: 70,
          hp: eHp,
          maxHp: eHp,
          fuel: 85 + wave * 10,
          maxFuel: 85 + wave * 10,
          color: enemyColors[i % enemyColors.length],
          turret: enemyTurrets[(wave + i) % enemyTurrets.length],
          slopeAngle: 0
        });
      }
    }

    activeTankIdx = 0;
    aiThinkTimer = 45;
  };

  spawnWave();

  const spawnExplosion = (x, y, radius, damage, color, ownerId, isDirt = false) => {
    if (isDirt) {
      modifyTerrainCircle(x, y, radius, true);
      const dirtCount = Math.min(10, Math.max(0, 90 - particles.length));
      for (let i = 0; i < dirtCount; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 1 + Math.random() * 3.5;
        particles.push({
          x, y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 1.5,
          r: 3 + Math.random() * 3,
          color: '#a16207',
          life: 24
        });
      }
      return;
    }

    modifyTerrainCircle(x, y, radius, false);

    // Explosion particles (capped to avoid chaotic particle buildup on cluster/napalm blasts)
    const puffCount = Math.min(14, Math.max(0, 90 - particles.length));
    for (let i = 0; i < puffCount; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 1.4 + Math.random() * 5.8;
      particles.push({
        x, y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 1.5,
        r: 2.5 + Math.random() * 3.5,
        color: i % 3 === 0 ? '#ffffff' : i % 2 === 0 ? color : currentBiome.topColor,
        life: 20 + Math.floor(Math.random() * 14)
      });
    }

    // Damage tanks in blast radius
    tanks.forEach(t => {
      if (t.hp <= 0) return;
      const dist = Math.hypot(t.x - x, (t.y - 8) - y);
      const hitRange = radius + 18;
      if (dist < hitRange) {
        const falloff = Math.max(0.25, 1 - dist / (hitRange + 12));
        const dealt = Math.max(4, Math.round(damage * falloff));
        t.hp = Math.max(0, t.hp - dealt);
        t.vy = -4.5 * falloff;
        t.vx = ((t.x - x) / (dist || 1)) * 3.5 * falloff;

        if (floatingTexts.length < 16) {
          floatingTexts.push({
            x: t.x,
            y: t.y - 28,
            text: `-${dealt} HP`,
            color: '#ff2a85',
            life: 45
          });
        }

        if (ownerId === 'p1' && t.id !== 'p1') {
          const bounty = dealt * 3 + (t.hp <= 0 ? 150 : 0);
          cash += bounty;
          totalScore += bounty;
          if (floatingTexts.length < 16) {
            floatingTexts.push({
              x: t.x,
              y: t.y - 44,
              text: `+$${bounty}`,
              color: '#ffd60a',
              life: 50
            });
          }
        }
      }
    });
  };

  const fireTankWeapon = (tank, wepId) => {
    const wep = WEAPON_CATALOG.find(w => w.id === wepId) || WEAPON_CATALOG[0];
    if (!tank.isBot && tank.id === 'p1' && !wep.infinite) {
      if ((inventory[wep.id] || 0) <= 0) {
        selectedWeaponId = 'standard';
        return fireTankWeapon(tank, 'standard');
      }
      inventory[wep.id]--;
      if (inventory[wep.id] <= 0) selectedWeaponId = 'standard';
    }

    const rad = (tank.angle * Math.PI) / 180;
    const maxV = tank.id === 'p1' ? getPlayerMaxPower() : 12.8;
    const speed = (tank.power / 100) * maxV * (wep.id === 'sniper' ? 1.55 : 1);
    const bMult = tank.id === 'p1' ? getBlastMult() : 1 + (wave - 1) * 0.08;

    const startX = tank.x + Math.cos(rad) * 20;
    const startY = (tank.y - 10) - Math.sin(rad) * 20;

    const count = wep.id === 'volley' ? 4 : 1;
    for (let c = 0; c < count; c++) {
      const spread = count > 1 ? (c - 1.5) * 0.065 : 0;
      const spdVar = count > 1 ? 1 + (c - 1.5) * 0.04 : 1;
      projectiles.push({
        x: startX,
        y: startY,
        vx: Math.cos(rad + spread) * speed * spdVar,
        vy: -Math.sin(rad + spread) * speed * spdVar,
        wepId: wep.id,
        color: wep.color,
        radius: Math.round(wep.radius * bMult),
        damage: Math.round(wep.damage * bMult),
        ownerId: tank.id,
        bouncesLeft: wep.id === 'bouncer' ? 4 : 0,
        rollTicks: wep.id === 'roller' ? 85 : 0,
        rolling: false,
        drillTicks: wep.id === 'drill' ? 22 : 0,
        splitDone: false,
        age: 0,
        trail: []
      });
    }
    turnLockTimer = 25;
  };

  const advanceTurn = () => {
    const aliveTanks = tanks.filter(t => t.hp > 0);
    const p1Alive = tanks[0] && tanks[0].hp > 0;
    const enemiesAlive = tanks.slice(1).some(t => t.hp > 0);

    if (!p1Alive || !enemiesAlive || aliveTanks.length <= 1) {
      roundOver = true;
      if (p1Alive && !enemiesAlive) {
        const bonus = 250 + wave * 100;
        cash += bonus;
        totalScore += bonus;
        roundWinner = mode === '2P' ? `${playerName} WINS!` : `WAVE ${wave} CLEARED! (+$${bonus})`;
        addHighScore('tanks', totalScore);
      } else if (!p1Alive && mode === '2P') {
        roundWinner = 'PLAYER 2 WINS!';
        addHighScore('tanks', totalScore);
      } else {
        roundWinner = `TANK DESTROYED! (SCORE: ${totalScore})`;
        addHighScore('tanks', totalScore);
      }
      return;
    }

    // Next living tank
    for (let step = 1; step <= tanks.length; step++) {
      const idx = (activeTankIdx + step) % tanks.length;
      if (tanks[idx].hp > 0) {
        activeTankIdx = idx;
        tanks[idx].fuel = tanks[idx].maxFuel;
        break;
      }
    }
    wind = Math.max(-0.07, Math.min(0.07, wind + (Math.random() - 0.5) * 0.03));
    aiThinkTimer = 50;
  };

  // Mouse interaction for HUD buttons, Shop, and Direct Aiming
  let spaceWasDown = false;
  let qWasDown = false;

  const getCanvasPos = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    const rw = rect.width || W;
    const rh = rect.height || H;
    return {
      x: (clientX - rect.left) * (W / rw),
      y: (clientY - rect.top) * (H / rh)
    };
  };

  const closeShopAndMaybeAdvance = () => {
    showShop = false;
    if (roundOver) {
      if (tanks[0] && tanks[0].hp > 0) wave++;
      else wave = 1;
      spawnWave();
    }
  };

  const onTankKeyDown = (e) => {
    const k = e.key.toLowerCase();
    if (k === 'b') {
      e.preventDefault();
      if (showShop) closeShopAndMaybeAdvance();
      else showShop = true;
    } else if (showShop && (k === 'escape' || k === ' ' || k === 'enter')) {
      e.preventDefault();
      closeShopAndMaybeAdvance();
    }
  };

  const onMouseDown = (e) => {
    const pos = getCanvasPos(e.clientX, e.clientY);
    const activeTank = tanks[activeTankIdx];

    // Top bar Shop toggle button: (628, 7, 122, 28)
    if (pos.x >= 620 && pos.x <= 756 && pos.y >= 4 && pos.y <= 42) {
      if (showShop) closeShopAndMaybeAdvance();
      else showShop = true;
      return;
    }

    if (showShop) {
      // Clicking outside the modal or on the bottom EXIT SHOP button closes the shop!
      if (
        pos.x < 50 ||
        pos.x > W - 50 ||
        pos.y > H - 24 ||
        (pos.x >= 210 && pos.x <= 550 && pos.y >= 410 && pos.y <= 448)
      ) {
        closeShopAndMaybeAdvance();
        return;
      }

      // Shop Tabs & Top-Right Resume Button
      if (pos.y >= 56 && pos.y <= 98) {
        if (pos.x >= 80 && pos.x <= 240) shopTab = 'upgrades';
        else if (pos.x >= 250 && pos.x <= 420) shopTab = 'weapons';
        else if (pos.x >= 430 && pos.x <= 580) shopTab = 'style';
        else if (pos.x >= 585 && pos.x <= 710) {
          closeShopAndMaybeAdvance();
        }
        return;
      }

      if (shopTab === 'upgrades') {
        UPGRADE_CATALOG.forEach((u, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const bx = 85 + col * 300;
          const by = 112 + row * 92;
          if (pos.x >= bx && pos.x <= bx + 280 && pos.y >= by && pos.y <= by + 78) {
            const lvl = upgrades[u.id] || 0;
            const cost = Math.round(u.baseCost * Math.pow(1.45, lvl));
            if (lvl < u.maxLvl && cash >= cost) {
              cash -= cost;
              upgrades[u.id] = lvl + 1;
              if (u.id === 'armor' && tanks[0]) {
                tanks[0].maxHp = getPlayerMaxHp();
                tanks[0].hp = tanks[0].maxHp;
              }
              if (u.id === 'fuel' && tanks[0]) {
                tanks[0].maxFuel = getPlayerMaxFuel();
                tanks[0].fuel = tanks[0].maxFuel;
              }
            }
          }
        });
      } else if (shopTab === 'weapons') {
        const buyable = WEAPON_CATALOG.filter(w => !w.infinite);
        buyable.forEach((w, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          const bx = 85 + col * 300;
          const by = 108 + row * 64;
          if (pos.x >= bx && pos.x <= bx + 280 && pos.y >= by && pos.y <= by + 56) {
            if (cash >= w.cost) {
              cash -= w.cost;
              inventory[w.id] = (inventory[w.id] || 0) + w.ammoPerBuy;
              selectedWeaponId = w.id;
            }
          }
        });
      } else if (shopTab === 'style') {
        CHASSIS_STYLES.forEach((st, idx) => {
          const bx = 95 + idx * 118;
          const by = 150;
          if (pos.x >= bx && pos.x <= bx + 106 && pos.y >= by && pos.y <= by + 120) {
            chassisIdx = idx;
            if (tanks[0]) {
              tanks[0].color = st.color;
              tanks[0].turret = st.turret;
            }
          }
        });
      }
      return;
    }

    if (roundOver) {
      // Click anywhere on round over banner to open Upgrade Shop or start next wave
      if (pos.x >= 200 && pos.x <= 375 && pos.y >= 245 && pos.y <= 295) {
        showShop = true;
        return;
      }
      if (pos.x >= 385 && pos.x <= 560 && pos.y >= 245 && pos.y <= 295) {
        if (tanks[0] && tanks[0].hp > 0) wave++;
        else wave = 1;
        spawnWave();
        return;
      }
      return;
    }

    // Bottom Weapon Bar clicks (y >= 434)
    if (pos.y >= 432) {
      // FIRE button on bottom right (650..752)
      if (pos.x >= 648 && pos.x <= 754 && activeTank && !activeTank.isBot && projectiles.length === 0) {
        fireTankWeapon(activeTank, activeTank.id === 'p1' ? selectedWeaponId : 'standard');
        return;
      }
      // Weapon slots (x: 10..640)
      const slotW = 57;
      const idx = Math.floor((pos.x - 8) / slotW);
      if (idx >= 0 && idx < WEAPON_CATALOG.length) {
        const w = WEAPON_CATALOG[idx];
        if (w.infinite || (inventory[w.id] || 0) > 0) {
          selectedWeaponId = w.id;
        } else {
          showShop = true;
          shopTab = 'weapons';
        }
      }
      return;
    }

    // Click on playfield to aim angle & power toward mouse cursor!
    if (activeTank && !activeTank.isBot && projectiles.length === 0) {
      const dx = pos.x - activeTank.x;
      const dy = (activeTank.y - 10) - pos.y;
      let deg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
      if (deg < 5) deg = dx < 0 ? 175 : 5;
      if (deg > 175) deg = 175;
      activeTank.angle = deg;
      const dist = Math.hypot(dx, dy);
      activeTank.power = Math.max(15, Math.min(100, Math.round((dist / 360) * 100)));
    }
  };

  canvas.addEventListener('mousedown', onMouseDown);
  window.addEventListener('keydown', onTankKeyDown);

  const update = () => {
    if (inStartScreen) {
      if (isPressed(' ') || isPressed('enter')) {
        inStartScreen = false;
      }
      return;
    }
    if (showShop) return;

    // Update tank physics (gravity & ground settling)
    tanks.forEach(t => {
      if (t.hp <= 0) return;
      const gy = getGroundY(t.x, Math.max(0, t.y - 24));
      if (t.y + 4 < gy) {
        t.vy += 0.38;
        t.x += t.vx;
        t.y += t.vy;
        if (t.y >= gy - 4) {
          t.y = gy - 4;
          t.vy = 0;
          t.vx = 0;
        }
      } else {
        t.y = gy - 4;
        t.vy = 0;
        t.vx *= 0.6;
      }
      t.x = Math.max(20, Math.min(W - 20, t.x));
      const leftY = getGroundY(t.x - 10, t.y - 20);
      const rightY = getGroundY(t.x + 10, t.y - 20);
      t.slopeAngle = Math.atan2(rightY - leftY, 20) * 0.65;
    });

    // Update active projectiles
    if (projectiles.length > 0) {
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.age++;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 18) p.trail.shift();

        if (p.rolling) {
          p.rollTicks--;
          const gy = getGroundY(p.x, p.y - 16);
          const gyL = getGroundY(p.x - 5, p.y - 16);
          const gyR = getGroundY(p.x + 5, p.y - 16);
          const slope = gyR - gyL;
          p.vx += Math.sign(slope || p.vx || 1) * 0.25;
          p.vx = Math.max(-4.5, Math.min(4.5, p.vx * 0.96));
          p.x += p.vx;
          p.y = gy - 4;

          // Explode if hitting a tank or timer runs out
          const hitTank = tanks.find(t => t.hp > 0 && Math.hypot(t.x - p.x, (t.y - 8) - p.y) < 18);
          if (hitTank || p.rollTicks <= 0 || p.x < 6 || p.x > W - 6) {
            spawnExplosion(p.x, p.y, p.radius, p.damage, p.color, p.ownerId, false);
            projectiles.splice(i, 1);
          }
          continue;
        }

        // Gravity + Wind
        const grav = p.wepId === 'sniper' ? 0.08 : 0.21;
        p.vy += grav;
        p.vx += wind * (p.wepId === 'sniper' ? 0.2 : 1);

        // Homing Seeker steers toward closest enemy tank after apex
        if (p.wepId === 'seeker' && p.vy > -1) {
          const target = tanks.find(t => t.hp > 0 && t.id !== p.ownerId);
          if (target) {
            const desiredAng = Math.atan2((target.y - 8) - p.y, target.x - p.x);
            const spd = Math.hypot(p.vx, p.vy);
            p.vx = p.vx * 0.9 + Math.cos(desiredAng) * spd * 0.14;
            p.vy = p.vy * 0.9 + Math.sin(desiredAng) * spd * 0.14;
          }
        }

        // Cluster bomb splits at apex (when vy crosses > 0.5)
        if (p.wepId === 'cluster' && !p.splitDone && p.age > 14 && p.vy > 0.4) {
          p.splitDone = true;
          for (let k = -2; k <= 3; k++) {
            projectiles.push({
              x: p.x,
              y: p.y,
              vx: p.vx + (k - 0.5) * 1.45,
              vy: p.vy - 1.5 + Math.abs(k) * 0.3,
              wepId: 'cluster_sub',
              color: '#00e5ff',
              radius: 20,
              damage: 20,
              ownerId: p.ownerId,
              bouncesLeft: 0,
              rollTicks: 0,
              rolling: false,
              drillTicks: 0,
              splitDone: true,
              age: 0,
              trail: []
            });
          }
          projectiles.splice(i, 1);
          continue;
        }

        // Step sub-pixel for accurate collision
        const steps = 3;
        let destroyed = false;
        for (let s = 0; s < steps; s++) {
          p.x += p.vx / steps;
          p.y += p.vy / steps;

          if (p.x < 2 || p.x >= W - 2) {
            p.vx *= -0.8;
            p.x = Math.max(3, Math.min(W - 3, p.x));
          }
          if (p.y > H + 10 || p.age > 420 || !Number.isFinite(p.x) || !Number.isFinite(p.y)) {
            destroyed = true;
            break;
          }

          // Direct tank hit check
          const hitTank = tanks.find(t => t.hp > 0 && (p.age > 6 || t.id !== p.ownerId) && Math.hypot(t.x - p.x, (t.y - 10) - p.y) < 16);
          if (hitTank) {
            if (p.wepId === 'napalm') {
              for (let n = -3; n <= 3; n++) {
                projectiles.push({
                  x: p.x + n * 6,
                  y: p.y - 10,
                  vx: n * 1.1,
                  vy: -2 - Math.random() * 2,
                  wepId: 'ember',
                  color: '#ef4444',
                  radius: 14,
                  damage: 12,
                  ownerId: p.ownerId,
                  bouncesLeft: 0,
                  rollTicks: 0,
                  rolling: false,
                  drillTicks: 0,
                  splitDone: true,
                  age: 0,
                  trail: []
                });
              }
            }
            spawnExplosion(p.x, p.y, p.radius, p.damage, p.color, p.ownerId, p.wepId === 'dirt');
            destroyed = true;
            break;
          }

          // Terrain pixel hit check
          if (isPixelSolid(p.x, p.y)) {
            if (p.wepId === 'bouncer' && p.bouncesLeft > 0) {
              p.bouncesLeft--;
              p.y -= p.vy / steps;
              p.vy = -Math.abs(p.vy) * 0.78;
              p.vx *= 0.88;
              spawnExplosion(p.x, p.y, 12, 10, p.color, p.ownerId, false);
              break;
            } else if (p.wepId === 'roller' && !p.rolling) {
              p.rolling = true;
              p.vy = 0;
              break;
            } else if (p.wepId === 'drill' && p.drillTicks > 0) {
              p.drillTicks--;
              modifyTerrainCircle(p.x, p.y, 8, false);
              p.vx *= 0.95;
              p.vy *= 0.95;
              continue;
            } else {
              if (p.wepId === 'napalm') {
                for (let n = -3; n <= 3; n++) {
                  projectiles.push({
                    x: p.x + n * 5,
                    y: p.y - 8,
                    vx: n * 1.2,
                    vy: -2.5 - Math.random() * 2,
                    wepId: 'ember',
                    color: '#f97316',
                    radius: 14,
                    damage: 11,
                    ownerId: p.ownerId,
                    bouncesLeft: 0,
                    rollTicks: 0,
                    rolling: false,
                    drillTicks: 0,
                    splitDone: true,
                    age: 0,
                    trail: []
                  });
                }
              }
              spawnExplosion(p.x, p.y, p.radius, p.damage, p.color, p.ownerId, p.wepId === 'dirt');
              destroyed = true;
              break;
            }
          }
        }

        if (destroyed) {
          projectiles.splice(i, 1);
        }
      }

      if (projectiles.length === 0) {
        advanceTurn();
      }
      return;
    }

    if (turnLockTimer > 0) {
      turnLockTimer--;
      return;
    }

    if (roundOver) {
      if (isPressed(' ') || isPressed('r')) {
        if (tanks[0] && tanks[0].hp > 0) wave++;
        else wave = 1;
        spawnWave();
      }
      return;
    }

    const activeTank = tanks[activeTankIdx];
    if (!activeTank || activeTank.hp <= 0) {
      advanceTurn();
      return;
    }

    // AI Bot Turn Logic
    if (activeTank.isBot) {
      const target = tanks[0];
      if (!target || target.hp <= 0) {
        advanceTurn();
        return;
      }
      aiThinkTimer--;
      if (aiThinkTimer > 20 && activeTank.fuel > 30) {
        const dir = target.x < activeTank.x ? -1 : 1;
        const moveStep = (aiThinkTimer % 2 === 0 ? dir : -dir) * 1.2;
        const nextX = Math.max(30, Math.min(W - 30, activeTank.x + moveStep));
        const nextY = getGroundY(nextX, activeTank.y - 16) - 4;
        if (activeTank.y - nextY < 10) {
          activeTank.x = nextX;
          activeTank.y = nextY;
          activeTank.fuel -= 1.2;
        }
      }
      if (aiThinkTimer <= 0) {
        const dx = target.x - activeTank.x;
        const dy = (activeTank.y - 10) - (target.y - 10);
        const aimLeft = dx < 0;
        const baseAngle = aimLeft ? 128 + (Math.random() - 0.5) * 20 : 52 + (Math.random() - 0.5) * 20;
        activeTank.angle = Math.round(baseAngle);

        // Estimate ballistic speed needed
        const rad = (activeTank.angle * Math.PI) / 180;
        const grav = 0.21;
        const absDx = Math.abs(dx);
        const cosA = Math.max(0.2, Math.abs(Math.cos(rad)));
        const sinA = Math.sin(rad);
        const estV = Math.sqrt(Math.max(16, (grav * absDx * absDx) / Math.max(10, 2 * cosA * cosA * (absDx * (sinA / cosA) + dy))));
        const jitter = difficulty === 'EASY' ? (Math.random() - 0.5) * 18 : difficulty === 'HARD' ? (Math.random() - 0.5) * 5 : (Math.random() - 0.5) * 11;
        activeTank.power = Math.max(25, Math.min(98, Math.round((estV / 12.8) * 100 + jitter)));

        const botWeps = ['standard', 'roller', 'bouncer', 'cluster'];
        const chosenWep = wave >= 2 && Math.random() < 0.45 ? botWeps[Math.floor(Math.random() * botWeps.length)] : 'standard';
        fireTankWeapon(activeTank, chosenWep);
      }
      return;
    }

    // Player Turn Controls
    const moveLeft = activeTank.id === 'p1'
      ? (isPressed('a') || (mode === '1P' && isPressed('arrowleft')))
      : isPressed('arrowleft');
    const moveRight = activeTank.id === 'p1'
      ? (isPressed('d') || (mode === '1P' && isPressed('arrowright')))
      : isPressed('arrowright');
    const aimUp = activeTank.id === 'p1'
      ? (isPressed('w') || (mode === '1P' && isPressed('arrowup')))
      : isPressed('arrowup');
    const aimDown = activeTank.id === 'p1'
      ? (isPressed('s') || (mode === '1P' && isPressed('arrowdown')))
      : isPressed('arrowdown');

    const climbLimit = 8 + upgrades.fuel * 2.5;
    const driveSpeed = 1.65 + (upgrades.fuel - 1) * 0.22;

    if ((moveLeft || moveRight) && activeTank.fuel > 0) {
      const dir = moveLeft ? -1 : 1;
      const nx = Math.max(22, Math.min(W - 22, activeTank.x + dir * driveSpeed));
      const ny = getGroundY(nx, activeTank.y - 22) - 4;
      if (activeTank.y - ny <= climbLimit) {
        activeTank.x = nx;
        activeTank.y = ny;
        activeTank.fuel = Math.max(0, activeTank.fuel - 0.75);
      } else if (upgrades.jetpack > 0 && activeTank.fuel > 3) {
        // Jetpack boost over steep crater lip
        activeTank.x = nx;
        activeTank.y -= 3.5;
        activeTank.fuel = Math.max(0, activeTank.fuel - 1.6);
      }
    }

    // W / S adjusts turret elevation angle; Q / E adjusts firing power
    if (aimUp) {
      activeTank.angle = Math.max(5, Math.min(175, activeTank.angle + (activeTank.angle > 90 ? -1.1 : 1.1)));
    }
    if (aimDown) {
      activeTank.angle = Math.max(5, Math.min(175, activeTank.angle + (activeTank.angle > 90 ? 1.1 : -1.1)));
    }

    if (isPressed('q')) {
      activeTank.power = Math.max(15, activeTank.power - 0.8);
    }
    if (isPressed('e')) {
      activeTank.power = Math.min(100, activeTank.power + 0.8);
    }

    // Cycle weapon with Tab or C
    const cDown = isPressed('c');
    if (cDown && !qWasDown) {
      const unlocked = WEAPON_CATALOG.filter(w => w.infinite || (inventory[w.id] || 0) > 0);
      if (unlocked.length > 0) {
        const curIdx = Math.max(0, unlocked.findIndex(w => w.id === selectedWeaponId));
        selectedWeaponId = unlocked[(curIdx + 1) % unlocked.length].id;
      }
    }
    qWasDown = cDown;

    const fireKey = activeTank.id === 'p1'
      ? (isPressed(' ') || isPressed('f'))
      : (isPressed('enter') || isPressed(' '));
    if (fireKey && !spaceWasDown) {
      fireTankWeapon(activeTank, activeTank.id === 'p1' ? selectedWeaponId : 'standard');
    }
    spaceWasDown = fireKey;
  };

  const drawTank = (t, isCurrentTurn) => {
    if (t.hp <= 0) return;
    ctx.save();
    ctx.translate(Math.round(t.x), Math.round(t.y));
    ctx.rotate(t.slopeAngle || 0);

    // 8-Bit Pixel Turn Indicator Brackets
    if (isCurrentTurn && !roundOver) {
      const bounce = Math.floor(Math.sin(Date.now() * 0.008) * 3);
      ctx.fillStyle = '#ffbe0b';
      ctx.fillRect(-4, -30 + bounce, 8, 4);
      ctx.fillRect(-2, -26 + bounce, 4, 4);
      ctx.strokeStyle = '#ffbe0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(-20, -20, 40, 26);
    }

    // High-contrast ink backing around entire tank profile for clear visibility
    ctx.fillStyle = '#040711';
    ctx.fillRect(-18, -8, 36, 12);
    ctx.fillRect(-16, -15, 32, 10);

    // 8-Bit Pixel Tank Treads (Blocky Stepped Track + Cog Pixels)
    ctx.fillStyle = '#160622';
    ctx.fillRect(-16, -6, 32, 8);
    ctx.fillStyle = '#5c1f58';
    ctx.fillRect(-14, -5, 28, 6);

    for (let wx = -12; wx <= 10; wx += 6) {
      ctx.fillStyle = '#ffbe0b';
      ctx.fillRect(wx, -4, 4, 4);
    }

    // 16-Bit Stepped Armored Pixel Hull
    ctx.fillStyle = '#160622';
    ctx.fillRect(-15, -13, 30, 8);
    ctx.fillStyle = t.color;
    ctx.fillRect(-14, -12, 28, 6);
    ctx.fillRect(-10, -15, 20, 3);
    // Top pixel highlight stripe
    ctx.fillStyle = '#fff1d0';
    ctx.fillRect(-10, -15, 20, 1);

    // Blocky Pixel Turret Dome
    ctx.fillStyle = '#040711';
    ctx.fillRect(-7, -20, 14, 6);
    ctx.fillStyle = t.color;
    ctx.fillRect(-6, -19, 12, 4);
    ctx.fillRect(-4, -21, 8, 2);
    ctx.restore();

    // Stepped 8-Bit Pixel Turret Barrel (drawn with 3x3 pixel blocks along the aim angle)
    const rad = (t.angle * Math.PI) / 180;
    const barrelLen = 20;
    const bSize = t.turret === 'mortar' ? 5 : 3;
    for (let step = 4; step <= barrelLen; step += 2) {
      const px = Math.round(t.x + Math.cos(rad) * step);
      const py = Math.round((t.y - 14) - Math.sin(rad) * step);
      // Dark outline block for barrel contrast
      ctx.fillStyle = '#040711';
      ctx.fillRect(px - 2, py - 2, bSize + 2, bSize + 2);
      ctx.fillStyle = step >= barrelLen - 2 ? '#ffbe0b' : '#fff1d0';
      ctx.fillRect(px - 1, py - 1, bSize, bSize);
      if (t.turret === 'dual') {
        ctx.fillStyle = t.color;
        ctx.fillRect(px - 1, py - 5, 3, 2);
      }
    }

    // 8-Bit Nameplate & Blocky Pixel HP Bar with solid dark backing box
    const nameStr = t.name;
    ctx.font = '8px "Press Start 2P", monospace';
    const nameW = Math.max(40, ctx.measureText(nameStr).width);
    ctx.fillStyle = 'rgba(4, 7, 17, 0.9)';
    ctx.fillRect(Math.round(t.x) - (nameW / 2) - 4, Math.round(t.y) - 46, nameW + 8, 12);
    ctx.fillStyle = '#fff1d0';
    ctx.textAlign = 'center';
    ctx.fillText(nameStr, Math.round(t.x), Math.round(t.y) - 37);

    const barX = Math.round(t.x) - 20;
    const barY = Math.round(t.y) - 32;
    ctx.fillStyle = '#040711';
    ctx.fillRect(barX - 2, barY - 2, 44, 9);
    ctx.fillStyle = t.hp / t.maxHp > 0.35 ? t.color : '#ff3864';
    ctx.fillRect(barX, barY, Math.max(0, Math.round((t.hp / t.maxHp) * 40)), 5);
  };

  const drawAimTrajectory = (t) => {
    if (!t || t.isBot || projectiles.length > 0 || roundOver || showShop) return;
    const wep = WEAPON_CATALOG.find(w => w.id === selectedWeaponId) || WEAPON_CATALOG[0];
    const rad = (t.angle * Math.PI) / 180;
    const maxV = t.id === 'p1' ? getPlayerMaxPower() : 12.8;
    const speed = (t.power / 100) * maxV * (wep.id === 'sniper' ? 1.55 : 1);
    const grav = wep.id === 'sniper' ? 0.08 : 0.21;

    let sx = t.x + Math.cos(rad) * 20;
    let sy = (t.y - 10) - Math.sin(rad) * 20;
    let vx = Math.cos(rad) * speed;
    let vy = -Math.sin(rad) * speed;

    const previewSteps = 16 + upgrades.laser * 18;
    ctx.save();
    for (let i = 0; i < previewSteps; i++) {
      vy += grav;
      vx += wind * (wep.id === 'sniper' ? 0.2 : 1);
      sx += vx;
      sy += vy;
      if (isPixelSolid(sx, sy)) break;
      if (i % 2 === 0) {
        ctx.fillStyle = i % 4 === 0 ? '#ffbe0b' : wep.color;
        ctx.globalAlpha = Math.max(0.25, 1 - i / previewSteps);
        ctx.fillRect(Math.round(sx) - 2, Math.round(sy) - 2, 4, 4);
      }
    }
    ctx.restore();
  };

  const drawShopOverlay = () => {
    ctx.fillStyle = '#180726';
    ctx.fillRect(50, 48, W - 100, H - 72);
    ctx.strokeStyle = '#ffbe0b';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 48, W - 100, H - 72);
    ctx.strokeStyle = '#ff3864';
    ctx.lineWidth = 2;
    ctx.strokeRect(54, 52, W - 108, H - 80);

    // Tabs
    const tabs = [
      { id: 'upgrades', label: 'TANK UPGRADES', x: 80, w: 160 },
      { id: 'weapons', label: 'BOMB ARSENAL', x: 250, w: 170 },
      { id: 'style', label: 'CHASSIS STYLE', x: 430, w: 150 }
    ];
    tabs.forEach(tb => {
      const active = shopTab === tb.id;
      ctx.fillStyle = active ? '#ffbe0b' : '#2d0f40';
      ctx.fillRect(tb.x, 62, tb.w, 30);
      ctx.strokeStyle = active ? '#fff1d0' : '#ff6b2b';
      ctx.lineWidth = 2;
      ctx.strokeRect(tb.x, 62, tb.w, 30);
      ctx.fillStyle = active ? '#160622' : '#fff1d0';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(tb.label, tb.x + tb.w / 2, 81);
    });

    // Done / Next Wave Button
    ctx.fillStyle = '#ff6b2b';
    ctx.fillRect(590, 62, 110, 30);
    ctx.strokeStyle = '#ffbe0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(590, 62, 110, 30);
    ctx.fillStyle = '#160622';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.fillText(roundOver ? 'NEXT WAVE ▶' : 'RESUME ▶', 645, 81);

    if (shopTab === 'upgrades') {
      UPGRADE_CATALOG.forEach((u, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bx = 85 + col * 300;
        const by = 112 + row * 92;
        const lvl = upgrades[u.id] || 0;
        const cost = Math.round(u.baseCost * Math.pow(1.45, lvl));
        const maxed = lvl >= u.maxLvl;

        ctx.fillStyle = '#260c38';
        ctx.fillRect(bx, by, 280, 78);
        ctx.strokeStyle = !maxed && cash >= cost ? '#ffbe0b' : '#5c1f58';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, 280, 78);

        ctx.fillStyle = '#fff1d0';
        ctx.font = '9px "Press Start 2P", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${u.name} LV.${lvl}/${u.maxLvl}`, bx + 12, by + 22);

        ctx.fillStyle = '#f5b895';
        ctx.font = '10px monospace';
        ctx.fillText(u.desc, bx + 12, by + 42);

        // Level pips
        for (let p = 0; p < u.maxLvl; p++) {
          ctx.fillStyle = p < lvl ? '#ffbe0b' : '#42154d';
          ctx.fillRect(bx + 12 + p * 22, by + 54, 18, 8);
        }

        ctx.fillStyle = maxed ? '#8c5878' : cash >= cost ? '#ffbe0b' : '#ff3864';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(maxed ? 'MAXED' : `BUY $${cost}`, bx + 268, by + 62);
      });
    } else if (shopTab === 'weapons') {
      const buyable = WEAPON_CATALOG.filter(w => !w.infinite);
      buyable.forEach((w, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bx = 85 + col * 300;
        const by = 108 + row * 64;
        const owned = inventory[w.id] || 0;

        ctx.fillStyle = '#260c38';
        ctx.fillRect(bx, by, 280, 56);
        ctx.strokeStyle = cash >= w.cost ? '#ffbe0b' : '#5c1f58';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, 280, 56);

        ctx.fillStyle = '#ffbe0b';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${w.name} (+${w.ammoPerBuy}) [${owned}]`, bx + 10, by + 20);

        ctx.fillStyle = '#f5b895';
        ctx.font = '10px monospace';
        ctx.fillText(w.desc.slice(0, 42), bx + 10, by + 39);

        ctx.fillStyle = cash >= w.cost ? '#ffbe0b' : '#ff3864';
        ctx.font = '8px "Press Start 2P", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(`$${w.cost}`, bx + 270, by + 22);
      });
    } else if (shopTab === 'style') {
      CHASSIS_STYLES.forEach((st, idx) => {
        const bx = 95 + idx * 118;
        const by = 150;
        const active = chassisIdx === idx;
        ctx.fillStyle = active ? '#42144b' : '#260c38';
        ctx.fillRect(bx, by, 106, 120);
        ctx.strokeStyle = active ? '#ffbe0b' : st.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(bx, by, 106, 120);

        ctx.fillStyle = st.color;
        ctx.fillRect(bx + 28, by + 45, 50, 18);
        ctx.fillStyle = '#160622';
        ctx.fillRect(bx + 24, by + 63, 58, 8);
        ctx.fillStyle = '#fff1d0';
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(st.name, bx + 53, by + 94);
        ctx.fillStyle = active ? '#ffbe0b' : '#f5b895';
        ctx.fillText(active ? 'EQUIPPED' : 'SELECT', bx + 53, by + 110);
      });
    }

    // Bottom Exit Shop Button inside modal
    ctx.fillStyle = '#ff3864';
    ctx.fillRect(210, 412, 340, 30);
    ctx.strokeStyle = '#ffbe0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(210, 412, 340, 30);
    ctx.fillStyle = '#fff8e7';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('✖ EXIT SHOP & FIGHT [B / SPACE]', 380, 431);
  };

  let animId = null;
  const loop = () => {
    if (crashed) return;
    try {
    ctx.imageSmoothingEnabled = false;
    update();

    if (inStartScreen) {
      // Draw background sky + terrain
      ctx.drawImage(terrainCanvas, 0, 0);

      // Darkened overlay
      ctx.fillStyle = 'rgba(6, 9, 18, 0.9)';
      ctx.fillRect(60, 45, W - 120, H - 90);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 45, W - 120, H - 90);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(66, 51, W - 132, H - 102);

      ctx.fillStyle = '#ffd60a';
      ctx.font = '18px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SCORCHED TANKS 2D', W / 2, 105);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('DESTRUCTIBLE PIXEL ARTILLERY // 1989 COIN-OP', W / 2, 130);

      // Tank Preview Icon
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(W / 2 - 24, 155, 48, 20);
      ctx.fillStyle = '#ffd60a';
      ctx.fillRect(W / 2 - 20, 160, 40, 12);
      ctx.fillRect(W / 2 - 6, 150, 12, 10);
      ctx.fillRect(W / 2 + 4, 146, 16, 4);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillText(`• BIOME: ${currentBiome.name.toUpperCase()}`, W / 2, 215);
      ctx.fillText('• [A / D / ARROWS]: DRIVE TANK ALONG HILLS', W / 2, 240);
      ctx.fillText('• [W / S]: ELEVATION ANGLE • [Q / E]: CANNON POWER', W / 2, 260);
      ctx.fillText('• [SPACE / ENTER]: FIRE BALLISTIC SHELL', W / 2, 280);
      ctx.fillText('• [B]: BUY WEAPONS IN SHOP • [C]: CYCLE WEAPON', W / 2, 300);

      const pulse = Math.floor(Date.now() / 350) % 2 === 0;
      ctx.fillStyle = pulse ? '#ffd60a' : '#f59e0b';
      ctx.font = '12px "Press Start 2P", monospace';
      ctx.fillText('► PRESS SPACE / ENTER TO DEPLOY TANKS ◄', W / 2, 355);

      animId = requestAnimationFrame(loop);
      return;
    }

    // 1. Draw Stepped 16-Bit Sunset Sky Bands
    const bands = currentBiome.skyBands;
    const bandH = Math.ceil(H / bands.length);
    for (let b = 0; b < bands.length; b++) {
      ctx.fillStyle = bands[b];
      ctx.fillRect(0, b * bandH, W, bandH + 2);
      // 8-Bit Dither strip between sky bands
      if (b > 0) {
        ctx.fillStyle = bands[b - 1];
        for (let dx = (b % 2) * 4; dx < W; dx += 8) {
          ctx.fillRect(dx, b * bandH, 4, 4);
        }
      }
    }

    // 2. Twinkling 8-Bit Pixel Stars in Upper Dusk Sky
    ctx.fillStyle = '#fff1d0';
    for (let s = 0; s < 24; s++) {
      const sx = ((s * 97 + 31) % (W - 20)) + 10;
      const sy = ((s * 43 + 19) % 130) + 46;
      if ((Math.floor(Date.now() / 350) + s) % 5 !== 0) {
        ctx.fillRect(sx, sy, 3, 3);
      }
    }

    // 3. Giant 16-Bit Sliced Sunset Sun on the Horizon
    const sunCx = Math.floor(W * 0.5);
    const sunCy = 235;
    const sunR = 76;
    for (let py = -sunR; py <= sunR; py += 4) {
      // Classic OutRun horizontal scanline slice cutouts on lower half of sun
      if (py > 8 && Math.floor(py / 4) % 3 === 0) continue;
      const halfW = Math.floor(Math.sqrt(Math.max(0, sunR * sunR - py * py)) / 4) * 4;
      const tRatio = (py + sunR) / (2 * sunR);
      ctx.fillStyle = tRatio < 0.35 ? '#fff1d0' : tRatio < 0.7 ? currentBiome.sunColor : '#ff3864';
      ctx.fillRect(sunCx - halfW, sunCy + py, halfW * 2, 4);
    }

    // 4. Distant Stepped Pixel Mesa Silhouettes
    ctx.fillStyle = currentBiome.mesaColor;
    for (let mx = 0; mx < W; mx += 16) {
      const mh = 200 + ((mx * 13) % 44) - ((mx * 7) % 28);
      ctx.fillRect(mx, mh, 16, H - mh);
    }

    // 5. Draw Destructible Pixel Terrain
    ctx.drawImage(terrainCanvas, 0, 0);

    // Draw Aim Trajectory for Active Human Tank
    const activeTank = tanks[activeTankIdx];
    drawAimTrajectory(activeTank);

    // Draw Tanks
    tanks.forEach((t, idx) => drawTank(t, idx === activeTankIdx));

    // Draw 8-Bit Pixel Projectiles & Trails
    projectiles.forEach(p => {
      p.trail.forEach((pt, idx) => {
        if (idx % 2 === 0) {
          ctx.fillStyle = idx % 4 === 0 ? '#ffbe0b' : p.color;
          ctx.fillRect(Math.round(pt.x) - 2, Math.round(pt.y) - 2, 4, 4);
        }
      });
      ctx.fillStyle = '#fff1d0';
      ctx.fillRect(Math.round(p.x) - 4, Math.round(p.y) - 4, 8, 8);
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x) - 3, Math.round(p.y) - 3, 6, 6);
    });

    // Draw 8-Bit Square Explosion Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.18;
      pt.life--;
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = Math.max(0, pt.life / 35);
      const sz = Math.max(3, Math.round(pt.r * 1.4));
      ctx.fillRect(Math.round(pt.x) - (sz >> 1), Math.round(pt.y) - (sz >> 1), sz, sz);
      ctx.globalAlpha = 1;
      if (pt.life <= 0) particles.splice(i, 1);
    }

    // Floating Damage / Cash Texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y -= 0.7;
      ft.life--;
      ctx.fillStyle = '#14051e';
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, Math.round(ft.x) + 1, Math.round(ft.y) + 1);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, Math.round(ft.x), Math.round(ft.y));
      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }

    // ========================================================================
    // TOP 8-BIT SUNSET HUD BAR (Wave, Cash, Angle/Power/Fuel, Shop Button)
    // ========================================================================
    ctx.fillStyle = '#160622';
    ctx.fillRect(0, 0, W, 42);
    ctx.fillStyle = '#ff6b2b';
    ctx.fillRect(0, 40, W, 2);

    ctx.fillStyle = '#ffbe0b';
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`WAVE ${wave}  $${cash}`, 12, 25);

    if (activeTank) {
      const fuelPct = Math.round((activeTank.fuel / activeTank.maxFuel) * 100);
      ctx.fillStyle = '#fff1d0';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText(
        `${activeTank.name} ANG:${Math.round(activeTank.angle)}° PWR:${Math.round(activeTank.power)}% FUEL:${fuelPct}%`,
        195,
        25
      );
    }

    // Shop Toggle Button
    ctx.fillStyle = showShop ? '#ff3864' : '#ffbe0b';
    ctx.fillRect(624, 6, 128, 28);
    ctx.strokeStyle = '#fff1d0';
    ctx.lineWidth = 2;
    ctx.strokeRect(624, 6, 128, 28);
    ctx.fillStyle = showShop ? '#fff1d0' : '#160622';
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(showShop ? '✖ CLOSE [B]' : 'SHOP [B]', 688, 24);

    // ========================================================================
    // BOTTOM WEAPON ARSENAL DOCK & FIRE BUTTON
    // ========================================================================
    ctx.fillStyle = '#160622';
    ctx.fillRect(0, H - 48, W, 48);
    ctx.fillStyle = '#ff6b2b';
    ctx.fillRect(0, H - 48, W, 2);

    const slotW = 57;
    WEAPON_CATALOG.forEach((w, idx) => {
      const sx = 8 + idx * slotW;
      const sy = H - 43;
      const count = w.infinite ? 'INF' : (inventory[w.id] || 0);
      const isSel = selectedWeaponId === w.id;

      ctx.fillStyle = isSel ? '#47134a' : '#240b36';
      ctx.fillRect(sx, sy, slotW - 4, 38);
      ctx.strokeStyle = isSel ? '#ffbe0b' : count > 0 || w.infinite ? '#ff6b2b' : '#4a1852';
      ctx.lineWidth = isSel ? 2 : 1;
      ctx.strokeRect(sx, sy, slotW - 4, 38);

      ctx.fillStyle = isSel ? '#ffbe0b' : count > 0 || w.infinite ? '#fff1d0' : '#703a6e';
      ctx.font = '7px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(w.name.split(' ')[0].slice(0, 6).toUpperCase(), sx + (slotW - 4) / 2, sy + 15);

      ctx.fillStyle = '#ffbe0b';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText(`${count}`, sx + (slotW - 4) / 2, sy + 31);
    });

    // FIRE Button on bottom right
    ctx.fillStyle = '#ff3864';
    ctx.fillRect(648, H - 43, 104, 38);
    ctx.strokeStyle = '#ffbe0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(648, H - 43, 104, 38);
    ctx.fillStyle = '#fff1d0';
    ctx.font = '10px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('FIRE!', 700, H - 19);

    // Round Over Banner
    if (roundOver && !showShop) {
      ctx.fillStyle = '#180726';
      ctx.fillRect(170, 145, 420, 170);
      ctx.strokeStyle = '#ffbe0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(170, 145, 420, 170);

      ctx.fillStyle = '#ffbe0b';
      ctx.font = '14px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(roundWinner, 380, 192);

      ctx.fillStyle = '#fff1d0';
      ctx.font = '8px "Press Start 2P", monospace';
      ctx.fillText(`CASH: $${cash} - UPGRADE YOUR TANK!`, 380, 222);

      ctx.fillStyle = '#ff6b2b';
      ctx.fillRect(195, 248, 175, 42);
      ctx.strokeStyle = '#ffbe0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(195, 248, 175, 42);
      ctx.fillStyle = '#160622';
      ctx.font = '9px "Press Start 2P", monospace';
      ctx.fillText('UPGRADE SHOP', 282, 274);

      ctx.fillStyle = '#ffbe0b';
      ctx.fillRect(390, 248, 175, 42);
      ctx.strokeStyle = '#fff1d0';
      ctx.strokeRect(390, 248, 175, 42);
      ctx.fillStyle = '#160622';
      ctx.fillText('NEXT WAVE ▶', 477, 274);
    }

    if (showShop) {
      drawShopOverlay();
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
    canvas.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('keydown', onTankKeyDown);
  };
}

