// ============================================================================
// RAFT WARS: PIRATE SIEGE (Upgrade Boat Parts & Defeat Bigger Pirate Ships!)
// ============================================================================

const RAFT_HULLS = [
  { lvl: 1, name: 'Log Raft', hp: 100, knockResist: 1.0, color: '#a16207' },
  { lvl: 2, name: 'Plank Skiff', hp: 145, knockResist: 0.78, color: '#ca8a04' },
  { lvl: 3, name: 'Steel Gunboat', hp: 200, knockResist: 0.55, color: '#64748b' },
  { lvl: 4, name: 'Viking Warship', hp: 270, knockResist: 0.38, color: '#dc2626' },
  { lvl: 5, name: 'Cyber Dreadnought', hp: 360, knockResist: 0.22, color: '#00e5ff' }
];

const BOAT_UPGRADES = [
  { id: 'hull', name: 'Boat Hull & Armor', baseCost: 160, maxLvl: 5, desc: 'Upgrades boat size, Max HP & knockback stability' },
  { id: 'crew', name: 'Gunner Crewmate', baseCost: 220, maxLvl: 4, desc: 'Adds deck mate who fires extra volley shots!' },
  { id: 'cannon', name: 'Launcher Power', baseCost: 150, maxLvl: 5, desc: '+18% Shot Damage & Knockback Force' },
  { id: 'repair', name: 'Repair Monkey', baseCost: 170, maxLvl: 4, desc: 'Auto-repairs +12 Boat HP at start of each turn' }
];

const RAFT_WEAPONS = [
  { id: 'tennis', name: 'Tennis Ball', cost: 0, infinite: true, count: 999, dmg: 22, knock: 5.5, color: '#a3e635' },
  { id: 'grenade', name: 'Frag Grenade', cost: 130, ammo: 3, dmg: 38, knock: 8.5, radius: 42, color: '#f97316' },
  { id: 'cannonball', name: 'Heavy Iron Ball', cost: 160, ammo: 3, dmg: 46, knock: 11.5, bounce: 2, color: '#94a3b8' },
  { id: 'cluster', name: 'Cluster Firework', cost: 220, ammo: 2, dmg: 26, knock: 6.5, split: true, color: '#ff2a85' },
  { id: 'shark', name: 'Torpedo Harpoon', cost: 260, ammo: 2, dmg: 62, knock: 13.0, fast: true, color: '#00e5ff' }
];

const PIRATE_FLEETS = [
  { name: 'Dinghy Scallywags', shipW: 96, shipColor: '#78350f', count: 2, hpBase: 45 },
  { name: 'Cutlass Schooner', shipW: 128, shipColor: '#92400e', count: 2, hpBase: 65 },
  { name: 'Corsair Brigantine', shipW: 155, shipColor: '#475569', count: 3, hpBase: 80 },
  { name: 'Ironclad Galleon', shipW: 180, shipColor: '#1e293b', count: 3, hpBase: 105 },
  { name: 'Kraken Dreadnought Boss', shipW: 210, shipColor: '#581c87', count: 4, hpBase: 135 }
];

export function initRaftWarsGame({ canvas, ctx, W, H, difficulty, playerName, isPressed, addHighScore }) {
  let wave = 1;
  let gold = difficulty === 'EASY' ? 350 : 220;
  let score = 0;
  let showDockShop = false;
  let selectedWep = 'tennis';

  const upgrades = {
    hull: 1,
    crew: 1,
    cannon: 1,
    repair: 0
  };

  const ammo = {
    tennis: 999,
    grenade: 3,
    cannonball: 2,
    cluster: 1,
    shark: 1
  };

  const WATER_Y = 365;
  let turn = 'PLAYER'; // 'PLAYER' | 'PROJECTILE' | 'PIRATE' | 'WAVE_OVER'
  let waveResult = '';
  let pirateDelay = 0;

  const raft = {
    x: 135,
    y: WATER_Y,
    hp: 100,
    maxHp: 100,
    angle: 36,
    power: 72,
    heroes: []
  };

  const pirateShip = {
    x: 575,
    y: WATER_Y,
    w: 110,
    color: '#78350f',
    name: 'Dinghy Pirates',
    pirates: []
  };

  let projectiles = [];
  let splashes = [];
  let floatingTexts = [];

  const getWaveY = (x, t = Date.now() * 0.003) => {
    return WATER_Y + Math.sin(x * 0.022 + t) * 5 + Math.cos(x * 0.011 - t * 0.7) * 3;
  };

  const setupWave = () => {
    const hullData = RAFT_HULLS[Math.min(RAFT_HULLS.length - 1, upgrades.hull - 1)];
    raft.maxHp = hullData.hp;
    raft.hp = raft.maxHp;
    raft.x = 135;

    const crewCount = Math.min(3, upgrades.crew);
    raft.heroes = Array.from({ length: crewCount }, (_, i) => ({
      offsetX: (i - (crewCount - 1) / 2) * 28,
      vx: 0,
      vy: 0,
      overboard: false,
      name: i === 0 ? (playerName || 'SIMON') : i === 1 ? 'BROTHER' : 'GUNNER'
    }));

    const fleet = PIRATE_FLEETS[Math.min(PIRATE_FLEETS.length - 1, wave - 1)];
    pirateShip.x = 565;
    pirateShip.w = fleet.shipW;
    pirateShip.color = fleet.shipColor;
    pirateShip.name = `Wave ${wave}: ${fleet.name}`;
    pirateShip.pirates = [];

    const pCount = fleet.count;
    const diffMult = difficulty === 'EASY' ? 0.8 : difficulty === 'HARD' ? 1.25 : 1;
    for (let i = 0; i < pCount; i++) {
      const isCaptain = i === pCount - 1;
      const hp = Math.round((fleet.hpBase + wave * 12 + (isCaptain ? 35 : 0)) * diffMult);
      pirateShip.pirates.push({
        id: i,
        isCaptain,
        name: isCaptain ? 'CAPT. BLACKBEARD' : `PIRATE #${i + 1}`,
        x: pirateShip.x + (i - (pCount - 1) / 2) * 38,
        y: WATER_Y - 18,
        vx: 0,
        vy: 0,
        hp,
        maxHp: hp,
        overboard: false
      });
    }

    projectiles = [];
    splashes = [];
    floatingTexts = [];
    turn = 'PLAYER';
    waveResult = '';
  };

  setupWave();

  const spawnSplash = (x, y, color = '#38bdf8', count = 18) => {
    for (let i = 0; i < count; i++) {
      const ang = -Math.PI * 0.15 - Math.random() * Math.PI * 0.7;
      const spd = 2 + Math.random() * 6;
      splashes.push({
        x, y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 2,
        r: 2.5 + Math.random() * 3.5,
        color,
        life: 28 + Math.floor(Math.random() * 14)
      });
    }
  };

  const firePlayerVolley = () => {
    const wep = RAFT_WEAPONS.find(w => w.id === selectedWep) || RAFT_WEAPONS[0];
    if (!wep.infinite) {
      if ((ammo[wep.id] || 0) <= 0) {
        selectedWep = 'tennis';
        return firePlayerVolley();
      }
      ammo[wep.id]--;
      if (ammo[wep.id] <= 0) selectedWep = 'tennis';
    }

    const rad = (raft.angle * Math.PI) / 180;
    const baseSpd = (raft.power / 100) * 14.2 * (wep.fast ? 1.35 : 1);
    const dmgMult = 1 + (upgrades.cannon - 1) * 0.18;

    const shots = Math.min(3, upgrades.crew);
    for (let s = 0; s < shots; s++) {
      const hero = raft.heroes[s] || raft.heroes[0];
      const spread = s * 0.04;
      projectiles.push({
        x: raft.x + (hero ? hero.offsetX : 0) + 12,
        y: getWaveY(raft.x) - 26,
        vx: Math.cos(rad + spread) * baseSpd,
        vy: -Math.sin(rad + spread) * baseSpd,
        fromPlayer: true,
        wep,
        dmg: Math.round(wep.dmg * dmgMult * (s === 0 ? 1 : 0.55)),
        knock: wep.knock * dmgMult * (s === 0 ? 1 : 0.6),
        bounces: wep.bounce || 0,
        splitDone: false,
        age: 0
      });
    }
    turn = 'PROJECTILE';
  };

  const firePirateTurn = () => {
    const living = pirateShip.pirates.filter(p => !p.overboard && p.hp > 0);
    if (living.length === 0) return;
    const shooter = living[Math.floor(Math.random() * living.length)];
    const dx = raft.x - shooter.x;
    const ang = (132 + (Math.random() - 0.5) * 16) * (Math.PI / 180);
    const spd = Math.sqrt((Math.abs(dx) * 0.22) / Math.max(0.25, Math.abs(Math.sin(2 * ang)))) + (Math.random() - 0.5) * 1.4;

    projectiles.push({
      x: shooter.x - 10,
      y: shooter.y - 18,
      vx: Math.cos(ang) * spd,
      vy: -Math.sin(ang) * spd,
      fromPlayer: false,
      wep: { color: '#ef4444', name: 'Pirate Shot' },
      dmg: Math.round((18 + wave * 5) * (difficulty === 'EASY' ? 0.75 : difficulty === 'HARD' ? 1.25 : 1)),
      knock: 5,
      bounces: 0,
      splitDone: true,
      age: 0
    });
    turn = 'PROJECTILE';
  };

  let spaceWasDown = false;
  const getCanvasPos = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (W / rect.width),
      y: (clientY - rect.top) * (H / rect.height)
    };
  };

  const closeDockShop = () => {
    showDockShop = false;
    if (turn === 'WAVE_OVER') {
      if (raft.hp > 0) wave++;
      else wave = 1;
      setupWave();
    }
  };

  const onRaftKeyDown = (e) => {
    const k = e.key.toLowerCase();
    if (k === 'b') {
      e.preventDefault();
      if (showDockShop) closeDockShop();
      else showDockShop = true;
    } else if (showDockShop && (k === 'escape' || k === ' ' || k === 'enter')) {
      e.preventDefault();
      closeDockShop();
    }
  };

  const onMouseDown = (e) => {
    const pos = getCanvasPos(e.clientX, e.clientY);

    // Top bar Upgrade Dock button
    if (pos.x >= 620 && pos.x <= 752 && pos.y >= 6 && pos.y <= 38) {
      if (showDockShop) closeDockShop();
      else showDockShop = true;
      return;
    }

    if (showDockShop) {
      if (pos.x < 55 || pos.x > W - 55 || pos.y > 442) {
        closeDockShop();
        return;
      }
      // Upgrade Boat Parts (left column)
      BOAT_UPGRADES.forEach((u, idx) => {
        const bx = 75;
        const by = 105 + idx * 72;
        if (pos.x >= bx && pos.x <= bx + 295 && pos.y >= by && pos.y <= by + 62) {
          const lvl = upgrades[u.id] || 0;
          const cost = Math.round(u.baseCost * Math.pow(1.45, lvl));
          if (lvl < u.maxLvl && gold >= cost) {
            gold -= cost;
            upgrades[u.id] = lvl + 1;
            const hullData = RAFT_HULLS[Math.min(RAFT_HULLS.length - 1, upgrades.hull - 1)];
            raft.maxHp = hullData.hp;
            raft.hp = raft.maxHp;
          }
        }
      });

      // Buy Ammo (right column)
      const buyable = RAFT_WEAPONS.filter(w => !w.infinite);
      buyable.forEach((w, idx) => {
        const bx = 390;
        const by = 105 + idx * 72;
        if (pos.x >= bx && pos.x <= bx + 295 && pos.y >= by && pos.y <= by + 62) {
          if (gold >= w.cost) {
            gold -= w.cost;
            ammo[w.id] = (ammo[w.id] || 0) + w.ammo;
            selectedWep = w.id;
          }
        }
      });

      // Set Sail / Close Shop button
      if (pos.x >= 260 && pos.x <= 500 && pos.y >= 390 && pos.y <= 442) {
        closeDockShop();
      }
      return;
    }

    if (turn === 'WAVE_OVER') {
      if (pos.x >= 210 && pos.x <= 375 && pos.y >= 245 && pos.y <= 290) {
        showDockShop = true;
        return;
      }
      if (raft.hp > 0) wave++;
      else wave = 1;
      setupWave();
      return;
    }

    // Bottom Weapon Dock clicks
    if (pos.y >= H - 46) {
      if (pos.x >= 635 && pos.x <= 752 && turn === 'PLAYER') {
        firePlayerVolley();
        return;
      }
      const slotW = 118;
      const idx = Math.floor((pos.x - 10) / slotW);
      if (idx >= 0 && idx < RAFT_WEAPONS.length) {
        const w = RAFT_WEAPONS[idx];
        if (w.infinite || (ammo[w.id] || 0) > 0) selectedWep = w.id;
        else showDockShop = true;
      }
      return;
    }

    // Aim with mouse click on playfield
    if (turn === 'PLAYER') {
      const dx = Math.max(20, pos.x - raft.x);
      const dy = (WATER_Y - 22) - pos.y;
      raft.angle = Math.max(8, Math.min(80, Math.round((Math.atan2(dy, dx) * 180) / Math.PI)));
      raft.power = Math.max(20, Math.min(100, Math.round((Math.hypot(dx, dy) / 420) * 100)));
    }
  };

  canvas.addEventListener('mousedown', onMouseDown);
  window.addEventListener('keydown', onRaftKeyDown);

  const update = () => {
    if (showDockShop) return;

    // Update Pirate physics (knockback & overboard splash check!)
    const deckLeft = pirateShip.x - pirateShip.w / 2 - 8;
    const deckRight = pirateShip.x + pirateShip.w / 2 + 8;

    pirateShip.pirates.forEach(p => {
      if (p.overboard) return;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.88;

      const shipDeckY = getWaveY(p.x) - 18;
      if (p.x < deckLeft || p.x > deckRight) {
        // Knocked off the ship Deck! Falls into ocean!
        p.vy += 0.35;
        if (p.y >= WATER_Y + 6) {
          p.overboard = true;
          p.hp = 0;
          const reward = p.isCaptain ? 180 : 95;
          gold += reward;
          score += reward;
          spawnSplash(p.x, WATER_Y, '#38bdf8', 26);
          floatingTexts.push({
            x: p.x,
            y: WATER_Y - 25,
            text: `SPLASH KO! +$${reward}`,
            color: '#00e5ff',
            life: 55
          });
        }
      } else {
        if (p.y < shipDeckY) {
          p.vy += 0.35;
        } else {
          p.y = shipDeckY;
          p.vy = 0;
        }
      }
    });

    if (turn === 'PROJECTILE') {
      let lastOwnerPlayer = true;
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const pr = projectiles[i];
        lastOwnerPlayer = pr.fromPlayer;
        pr.age++;
        pr.vy += pr.wep.fast ? 0.14 : 0.22;
        pr.x += pr.vx;
        pr.y += pr.vy;

        // Cluster Firework split near apex
        if (pr.wep.split && !pr.splitDone && pr.age > 14 && pr.vy > 0) {
          pr.splitDone = true;
          for (let k = -2; k <= 2; k++) {
            projectiles.push({
              ...pr,
              vx: pr.vx + k * 1.3,
              vy: pr.vy - 1.5,
              dmg: 22,
              knock: 5.5,
              splitDone: true
            });
          }
          projectiles.splice(i, 1);
          continue;
        }

        // Check hit on Pirates
        if (pr.fromPlayer) {
          const hitP = pirateShip.pirates.find(
            p => !p.overboard && p.hp > 0 && Math.hypot(p.x - pr.x, (p.y - 14) - pr.y) < (pr.wep.radius || 24)
          );
          if (hitP) {
            hitP.hp = Math.max(0, hitP.hp - pr.dmg);
            hitP.vx += pr.knock;
            hitP.vy = -4.2;
            spawnSplash(pr.x, pr.y, pr.wep.color, 15);

            const bounty = hitP.hp <= 0 ? (hitP.isCaptain ? 160 : 85) : 25;
            gold += bounty;
            score += bounty;
            floatingTexts.push({
              x: hitP.x,
              y: hitP.y - 32,
              text: hitP.hp <= 0 ? `KO! +$${bounty}` : `-${pr.dmg} HP (+$${bounty})`,
              color: '#ffd60a',
              life: 45
            });

            if (pr.bounces > 0) {
              pr.bounces--;
              pr.vy = -Math.abs(pr.vy) * 0.75;
              pr.vx *= 0.75;
            } else {
              projectiles.splice(i, 1);
            }
            continue;
          }
        } else {
          // Enemy shot hitting player's raft
          if (Math.hypot(raft.x - pr.x, (WATER_Y - 16) - pr.y) < 42) {
            raft.hp = Math.max(0, raft.hp - pr.dmg);
            spawnSplash(pr.x, pr.y, '#ef4444', 18);
            floatingTexts.push({
              x: raft.x,
              y: WATER_Y - 48,
              text: `-${pr.dmg} HULL HP`,
              color: '#ff2a85',
              life: 45
            });
            projectiles.splice(i, 1);
            continue;
          }
        }

        // Hit Ocean Water
        if (pr.y >= getWaveY(pr.x)) {
          if (pr.bounces > 0) {
            pr.bounces--;
            pr.y = getWaveY(pr.x) - 3;
            pr.vy = -Math.abs(pr.vy) * 0.72;
            spawnSplash(pr.x, WATER_Y, '#38bdf8', 10);
          } else {
            spawnSplash(pr.x, WATER_Y, '#38bdf8', 16);
            projectiles.splice(i, 1);
          }
        } else if (pr.x < -30 || pr.x > W + 30) {
          projectiles.splice(i, 1);
        }
      }

      if (projectiles.length === 0) {
        const piratesLeft = pirateShip.pirates.some(p => !p.overboard && p.hp > 0);
        if (!piratesLeft) {
          const waveBonus = 200 + wave * 90;
          gold += waveBonus;
          score += waveBonus;
          waveResult = `WAVE ${wave} PIRATES SUNK! (+$${waveBonus})`;
          turn = 'WAVE_OVER';
          addHighScore('raftwars', score);
        } else if (raft.hp <= 0) {
          waveResult = `YOUR RAFT SANK! (SCORE: ${score})`;
          turn = 'WAVE_OVER';
          addHighScore('raftwars', score);
        } else if (lastOwnerPlayer) {
          turn = 'PIRATE';
          pirateDelay = 38;
        } else {
          turn = 'PLAYER';
          if (upgrades.repair > 0) {
            const heal = upgrades.repair * 12;
            raft.hp = Math.min(raft.maxHp, raft.hp + heal);
            floatingTexts.push({ x: raft.x, y: WATER_Y - 50, text: `+${heal} REPAIR`, color: '#00e676', life: 36 });
          }
        }
      }
      return;
    }

    if (turn === 'PIRATE') {
      pirateDelay--;
      if (pirateDelay <= 0) {
        firePirateTurn();
      }
      return;
    }

    if (turn === 'WAVE_OVER') {
      if (isPressed(' ') || isPressed('r')) {
        if (raft.hp > 0) wave++;
        else wave = 1;
        setupWave();
      }
      return;
    }

    // Player Aiming Controls
    if (isPressed('w') || isPressed('arrowup')) raft.angle = Math.min(80, raft.angle + 1);
    if (isPressed('s') || isPressed('arrowdown')) raft.angle = Math.max(8, raft.angle - 1);
    if (isPressed('a') || isPressed('arrowleft')) raft.power = Math.max(20, raft.power - 1);
    if (isPressed('d') || isPressed('arrowright')) raft.power = Math.min(100, raft.power + 1);

    const spDown = isPressed(' ') || isPressed('f');
    if (spDown && !spaceWasDown) {
      firePlayerVolley();
    }
    spaceWasDown = spDown;
  };

  let animId = null;
  const loop = () => {
    update();

    // Tropical Sky & Sunset Gradient
    const sky = ctx.createLinearGradient(0, 0, 0, WATER_Y);
    sky.addColorStop(0, '#09152b');
    sky.addColorStop(0.6, '#1e3a5f');
    sky.addColorStop(1, '#3b5998');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, WATER_Y + 20);

    // Draw Aim Trajectory Preview during Player Turn
    if (turn === 'PLAYER' && !showDockShop) {
      const wep = RAFT_WEAPONS.find(w => w.id === selectedWep) || RAFT_WEAPONS[0];
      const rad = (raft.angle * Math.PI) / 180;
      const spd = (raft.power / 100) * 14.2 * (wep.fast ? 1.35 : 1);
      let sx = raft.x + 12;
      let sy = getWaveY(raft.x) - 26;
      let vx = Math.cos(rad) * spd;
      let vy = -Math.sin(rad) * spd;
      for (let i = 0; i < 26; i++) {
        vy += wep.fast ? 0.14 : 0.22;
        sx += vx;
        sy += vy;
        if (i % 2 === 0) {
          ctx.fillStyle = 'rgba(255, 214, 10, 0.55)';
          ctx.beginPath();
          ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Draw Player Raft & Upgrades
    const hullData = RAFT_HULLS[Math.min(RAFT_HULLS.length - 1, upgrades.hull - 1)];
    const rY = getWaveY(raft.x);
    const raftW = 86 + upgrades.hull * 14;

    ctx.save();
    ctx.translate(raft.x, rY);
    // Boat Hull
    ctx.fillStyle = hullData.color;
    ctx.beginPath();
    ctx.moveTo(-raftW / 2, -16);
    ctx.lineTo(raftW / 2, -16);
    ctx.lineTo(raftW / 2 - 14, 6);
    ctx.lineTo(-raftW / 2 + 14, 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Treasure Chest on back of Raft
    ctx.fillStyle = '#ffd60a';
    ctx.fillRect(-raftW / 2 + 8, -28, 18, 12);

    // Draw Raft Crew
    raft.heroes.forEach(h => {
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(h.offsetX, -32, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#00e676';
      ctx.fillRect(h.offsetX - 5, -25, 10, 10);
    });

    // Aiming Bazooka / Launcher Barrel
    const rad = (raft.angle * Math.PI) / 180;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -26);
    ctx.lineTo(Math.cos(rad) * 26, -26 - Math.sin(rad) * 26);
    ctx.stroke();
    ctx.restore();

    // Raft HP Bar
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${hullData.name} (${raft.hp}/${raft.maxHp} HP)`, raft.x, rY - 52);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(raft.x - 45, rY - 46, 90, 6);
    ctx.fillStyle = '#00e676';
    ctx.fillRect(raft.x - 45, rY - 46, (raft.hp / raft.maxHp) * 90, 6);

    // Draw Pirate Ship & Pirates
    const pShipY = getWaveY(pirateShip.x);
    ctx.save();
    ctx.translate(pirateShip.x, pShipY);
    ctx.fillStyle = pirateShip.color;
    ctx.beginPath();
    ctx.moveTo(-pirateShip.w / 2 - 10, -20);
    ctx.lineTo(pirateShip.w / 2 + 10, -20);
    ctx.lineTo(pirateShip.w / 2 - 12, 8);
    ctx.lineTo(-pirateShip.w / 2 + 12, 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#ff2a85';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pirate Mast & Jolly Roger Flag
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(15, -20);
    ctx.lineTo(15, -85);
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(15, -85, 36, 22);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('☠', 33, -70);
    ctx.restore();

    // Draw Individual Pirates (with Knockback & Overboard states)
    pirateShip.pirates.forEach(p => {
      if (p.overboard) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      // Pirate Hat
      ctx.fillStyle = p.isCaptain ? '#dc2626' : '#0f172a';
      ctx.fillRect(-9, -28, 18, 6);
      // Head
      ctx.fillStyle = '#fed7aa';
      ctx.beginPath();
      ctx.arc(0, -17, 6.5, 0, Math.PI * 2);
      ctx.fill();
      // Pirate Coat
      ctx.fillStyle = p.isCaptain ? '#ffd60a' : '#ff2a85';
      ctx.fillRect(-6, -10, 12, 12);
      ctx.restore();

      // Pirate HP bar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(p.x - 16, p.y - 38, 32, 4);
      ctx.fillStyle = '#ff2a85';
      ctx.fillRect(p.x - 16, p.y - 38, Math.max(0, (p.hp / p.maxHp) * 32), 4);
    });

    // Draw Projectiles
    projectiles.forEach(pr => {
      ctx.fillStyle = pr.wep.color;
      ctx.beginPath();
      ctx.arc(pr.x, pr.y, 5.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Animated Ocean Waves Foreground
    ctx.fillStyle = 'rgba(0, 180, 216, 0.72)';
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 16) {
      ctx.lineTo(x, getWaveY(x));
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // Water Splashes
    for (let i = splashes.length - 1; i >= 0; i--) {
      const sp = splashes[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.22;
      sp.life--;
      ctx.fillStyle = sp.color;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
      ctx.fill();
      if (sp.life <= 0) splashes.splice(i, 1);
    }

    // Floating Texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y -= 0.7;
      ft.life--;
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }

    // Top HUD Bar
    ctx.fillStyle = 'rgba(7, 10, 20, 0.9)';
    ctx.fillRect(0, 0, W, 42);
    ctx.fillStyle = '#ffd60a';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`DOUBLOONS: $${gold}   |   ${pirateShip.name}`, 14, 26);

    ctx.fillStyle = '#00e5ff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`ANGLE: ${raft.angle}° (W/S)   POWER: ${raft.power}% (A/D)`, 345, 26);

    ctx.fillStyle = showDockShop ? '#ff2a85' : '#00e676';
    ctx.fillRect(622, 7, 128, 28);
    ctx.fillStyle = '#04121f';
    ctx.font = 'bold 11.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(showDockShop ? '✖ CLOSE DOCK' : '⚓ UPGRADE BOAT', 686, 25);

    // Bottom Weapon Bar
    ctx.fillStyle = 'rgba(7, 10, 20, 0.92)';
    ctx.fillRect(0, H - 46, W, 46);
    RAFT_WEAPONS.forEach((w, idx) => {
      const sx = 10 + idx * 118;
      const count = w.infinite ? '∞' : (ammo[w.id] || 0);
      const act = selectedWep === w.id;
      ctx.fillStyle = act ? 'rgba(0, 229, 255, 0.25)' : '#131c31';
      ctx.fillRect(sx, H - 41, 112, 36);
      ctx.strokeStyle = act ? w.color : '#334155';
      ctx.strokeRect(sx, H - 41, 112, 36);

      ctx.fillStyle = w.color;
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${w.name} (${count})`, sx + 56, H - 19);
    });

    ctx.fillStyle = '#ff2a85';
    ctx.fillRect(635, H - 41, 115, 36);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('🔥 FIRE (SPC)', 692, H - 19);

    if (turn === 'WAVE_OVER' && !showDockShop) {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.92)';
      ctx.fillRect(190, 150, 380, 160);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 3;
      ctx.strokeRect(190, 150, 380, 160);

      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(waveResult, 380, 198);

      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(210, 245, 165, 42);
      ctx.fillStyle = '#04121f';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('⚓ UPGRADE BOAT', 292, 271);

      ctx.fillStyle = '#00e676';
      ctx.fillRect(390, 245, 160, 42);
      ctx.fillStyle = '#04121f';
      ctx.fillText('NEXT FLEET ▶', 470, 271);
    }

    if (showDockShop) {
      ctx.fillStyle = 'rgba(6, 10, 22, 0.95)';
      ctx.fillRect(50, 50, W - 100, H - 55);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(50, 50, W - 100, H - 55);

      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 17px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`RAFT WARS SHIPYARD & ARSENAL — DOUBLOONS: $${gold}`, W / 2, 84);

      BOAT_UPGRADES.forEach((u, idx) => {
        const bx = 75;
        const by = 105 + idx * 72;
        const lvl = upgrades[u.id] || 0;
        const cost = Math.round(u.baseCost * Math.pow(1.45, lvl));
        const maxed = lvl >= u.maxLvl;

        ctx.fillStyle = '#131c31';
        ctx.fillRect(bx, by, 295, 62);
        ctx.strokeStyle = !maxed && gold >= cost ? '#00e676' : '#334155';
        ctx.strokeRect(bx, by, 295, 62);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${u.name} (Lv.${lvl}/${u.maxLvl})`, bx + 10, by + 20);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(u.desc, bx + 10, by + 38);
        ctx.fillStyle = maxed ? '#64748b' : gold >= cost ? '#ffd60a' : '#ef4444';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(maxed ? 'MAXED' : `UPGRADE $${cost}`, bx + 10, by + 54);
      });

      const buyable = RAFT_WEAPONS.filter(w => !w.infinite);
      buyable.forEach((w, idx) => {
        const bx = 390;
        const by = 105 + idx * 72;
        const owned = ammo[w.id] || 0;

        ctx.fillStyle = '#131c31';
        ctx.fillRect(bx, by, 295, 62);
        ctx.strokeStyle = gold >= w.cost ? w.color : '#334155';
        ctx.strokeRect(bx, by, 295, 62);

        ctx.fillStyle = w.color;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${w.name} (+${w.ammo}) [Own: ${owned}]`, bx + 10, by + 22);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10.5px sans-serif';
        ctx.fillText(`Damage: ${w.dmg}  |  Knockback: ${w.knock}`, bx + 10, by + 40);
        ctx.fillStyle = gold >= w.cost ? '#ffd60a' : '#ef4444';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`BUY $${w.cost}`, bx + 10, by + 55);
      });

      ctx.fillStyle = '#00e676';
      ctx.fillRect(290, 398, 180, 38);
      ctx.fillStyle = '#04121f';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SET SAIL ▶', 380, 422);
    }

    animId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    if (animId) cancelAnimationFrame(animId);
    canvas.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('keydown', onRaftKeyDown);
  };
}

