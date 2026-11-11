// ============================================================================
// THE GRAND HEIST: PICK YOUR CREW, UPGRADE SPECIALISTS & ROB THE BANK!
// ============================================================================

const CREW_ROSTER = [
  {
    id: 'hacker',
    role: 'HACKER',
    codename: 'CIPHER',
    color: '#00e5ff',
    baseCost: 250,
    abilityName: '1: EMP JAMMER',
    desc: 'Disables lasers & freezes cameras/alarm for 6s'
  },
  {
    id: 'cracker',
    role: 'SAFECRACKER',
    codename: 'TORCH',
    color: '#ffd60a',
    baseCost: 280,
    abilityName: '2: THERMITE',
    desc: 'Boosts Vault & Safe cracking speed by +45% per Lv'
  },
  {
    id: 'muscle',
    role: 'ENFORCER',
    codename: 'TITAN',
    color: '#ff2a85',
    baseCost: 260,
    abilityName: '3: FLASHBANG',
    desc: 'Stuns nearby guards & carries heavy gold without slowdown'
  },
  {
    id: 'driver',
    role: 'GETAWAY DRIVER',
    codename: 'NITRO',
    color: '#00e676',
    baseCost: 240,
    abilityName: '4: SIREN DECOY',
    desc: 'Delays SWAT response timer & boosts loot payout +20%/Lv'
  }
];

const BANK_TIERS = [
  { id: 0, name: 'Corner Credit Union', vaultLoot: 900, guardCount: 2, swatTime: 65 },
  { id: 1, name: 'Metro Gold Reserve', vaultLoot: 1800, guardCount: 3, swatTime: 60 },
  { id: 2, name: 'Diamond Syndicate Bank', vaultLoot: 3200, guardCount: 4, swatTime: 55 },
  { id: 3, name: 'Federal Cyber-Vault', vaultLoot: 6000, guardCount: 5, swatTime: 50 }
];

export function initHeistGame({ canvas, ctx, W, H, difficulty, isPressed, addHighScore }) {
  let stashCash = difficulty === 'EASY' ? 600 : 350;
  let careerTake = 0;
  let selectedBankIdx = 0;
  let phase = 'SAFEHOUSE'; // 'SAFEHOUSE' | 'HEIST' | 'RESULT'
  let resultTitle = '';
  let resultSub = '';

  const crewLevels = {
    hacker: 1,
    cracker: 1,
    muscle: 1,
    driver: 1
  };

  // Active Heist State
  const thief = {
    x: 90,
    y: 250,
    hp: 100,
    maxHp: 100,
    bagLoot: 0,
    carryingBags: 0
  };

  let abilityCooldowns = { hacker: 0, cracker: 0, muscle: 0, driver: 0 };
  let empTimer = 0;
  let lasersActive = true;
  let alarmTriggered = false;
  let swatCountdown = 60;
  let vaultProgress = 0; // 0..100
  let vaultOpen = false;
  let terminalHacked = false;

  let walls = [];
  let safes = [];
  let lootPiles = [];
  let guards = [];
  let floatingTexts = [];

  const getawayVan = { x: 52, y: 250, w: 44, h: 86 };
  const secTerminal = { x: 240, y: 95, r: 20 };
  const vaultDoor = { x: 540, y: 220, w: 18, h: 64 };

  const startHeist = () => {
    const bank = BANK_TIERS[selectedBankIdx];
    phase = 'HEIST';
    thief.x = 105;
    thief.y = 250;
    thief.maxHp = 90 + crewLevels.muscle * 25;
    thief.hp = thief.maxHp;
    thief.bagLoot = 0;
    thief.carryingBags = 0;

    abilityCooldowns = { hacker: 0, cracker: 0, muscle: 0, driver: 0 };
    empTimer = 0;
    lasersActive = true;
    terminalHacked = false;
    alarmTriggered = false;
    swatCountdown = bank.swatTime + crewLevels.driver * 10;
    vaultProgress = 0;
    vaultOpen = false;
    floatingTexts = [];

    // Bank Blueprint Walls (Lobby, Security Office, Vault Room)
    walls = [
      // Outer bank building walls (with front door opening at left y: 215..285)
      { x: 135, y: 55, w: 14, h: 155 },
      { x: 135, y: 290, w: 14, h: 145 },
      { x: 135, y: 55, w: 590, h: 14 },
      { x: 135, y: 421, w: 590, h: 14 },
      { x: 711, y: 55, w: 14, h: 380 },
      // Security office divider
      { x: 150, y: 155, w: 180, h: 12 },
      // Main Vault Reinforced Wall (with vault door at y: 220..284)
      { x: 540, y: 69, w: 18, h: 151 },
      { x: 540, y: 284, w: 18, h: 137 }
    ];

    // Side Safes in Lobby & Manager Office
    safes = [
      { x: 380, y: 95, progress: 0, opened: false, value: 300 + selectedBankIdx * 150 },
      { x: 380, y: 385, progress: 0, opened: false, value: 350 + selectedBankIdx * 180 },
      { x: 215, y: 385, progress: 0, opened: false, value: 250 + selectedBankIdx * 120 }
    ];

    // Gold & Cash Stacks inside the Main Vault
    const vBase = Math.round(bank.vaultLoot / 4);
    lootPiles = [
      { x: 615, y: 140, value: vBase, taken: false, type: 'GOLD' },
      { x: 665, y: 140, value: vBase, taken: false, type: 'GOLD' },
      { x: 640, y: 250, value: vBase * 1.4, taken: false, type: 'DIAMOND' },
      { x: 615, y: 350, value: vBase, taken: false, type: 'CASH' },
      { x: 665, y: 350, value: vBase, taken: false, type: 'CASH' }
    ];

    // Patrolling Bank Guards
    const routes = [
      [{ x: 250, y: 210 }, { x: 480, y: 210 }],
      [{ x: 480, y: 340 }, { x: 250, y: 340 }],
      [{ x: 340, y: 120 }, { x: 490, y: 120 }],
      [{ x: 495, y: 130 }, { x: 495, y: 370 }],
      [{ x: 210, y: 200 }, { x: 210, y: 360 }]
    ];

    guards = [];
    for (let i = 0; i < bank.guardCount; i++) {
      const rt = routes[i % routes.length];
      guards.push({
        x: rt[0].x,
        y: rt[0].y,
        route: rt,
        wp: 1,
        angle: 0,
        stunTimer: 0,
        alerted: false
      });
    }
  };

  const triggerCrewAbility = (roleId) => {
    if (phase !== 'HEIST' || abilityCooldowns[roleId] > 0) return;

    if (roleId === 'hacker') {
      abilityCooldowns.hacker = 520;
      empTimer = 240 + crewLevels.hacker * 70;
      floatingTexts.push({ x: thief.x, y: thief.y - 24, text: '⚡ EMP JAMMER ACTIVE!', color: '#00e5ff', life: 55 });
    } else if (roleId === 'cracker') {
      abilityCooldowns.cracker = 480;
      // Instant +45% progress on nearby vault or safe!
      if (!vaultOpen && Math.hypot(thief.x - vaultDoor.x, thief.y - (vaultDoor.y + 32)) < 75) {
        vaultProgress = Math.min(100, vaultProgress + 42 + crewLevels.cracker * 10);
        if (vaultProgress >= 100) vaultOpen = true;
        floatingTexts.push({ x: vaultDoor.x, y: vaultDoor.y, text: '🔥 THERMITE BURN!', color: '#ffd60a', life: 50 });
      } else {
        safes.forEach(s => {
          if (!s.opened && Math.hypot(thief.x - s.x, thief.y - s.y) < 75) {
            s.progress = 100;
            s.opened = true;
            thief.bagLoot += s.value;
            thief.carryingBags++;
            floatingTexts.push({ x: s.x, y: s.y - 16, text: `CRACKED +$${s.value}!`, color: '#ffd60a', life: 45 });
          }
        });
      }
    } else if (roleId === 'muscle') {
      abilityCooldowns.muscle = 450;
      const stunDur = 220 + crewLevels.muscle * 60;
      guards.forEach(g => {
        if (Math.hypot(g.x - thief.x, g.y - thief.y) < 165) {
          g.stunTimer = stunDur;
        }
      });
      floatingTexts.push({ x: thief.x, y: thief.y - 24, text: '💥 FLASHBANG STUN!', color: '#ff2a85', life: 50 });
    } else if (roleId === 'driver') {
      abilityCooldowns.driver = 600;
      const bonusSec = 10 + crewLevels.driver * 4;
      swatCountdown += bonusSec;
      floatingTexts.push({ x: thief.x, y: thief.y - 24, text: `🚓 DECOY +${bonusSec}s SWAT DELAY!`, color: '#00e676', life: 55 });
    }
  };

  const hitWall = (x, y, r = 9) => {
    if (!vaultOpen && x + r > vaultDoor.x && x - r < vaultDoor.x + vaultDoor.w && y + r > vaultDoor.y && y - r < vaultDoor.y + vaultDoor.h) {
      return true;
    }
    return walls.some(w => x + r > w.x && x - r < w.x + w.w && y + r > w.y && y - r < w.y + w.h);
  };

  const getCanvasPos = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (W / rect.width),
      y: (clientY - rect.top) * (H / rect.height)
    };
  };

  const onMouseDown = (e) => {
    const pos = getCanvasPos(e.clientX, e.clientY);

    if (phase === 'SAFEHOUSE') {
      // Upgrade Crew Cards (4 cards)
      CREW_ROSTER.forEach((c, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bx = 55 + col * 325;
        const by = 92 + row * 112;
        if (pos.x >= bx && pos.x <= bx + 305 && pos.y >= by && pos.y <= by + 98) {
          const lvl = crewLevels[c.id];
          const cost = Math.round(c.baseCost * Math.pow(1.5, lvl - 1));
          if (lvl < 5 && stashCash >= cost) {
            stashCash -= cost;
            crewLevels[c.id]++;
          }
        }
      });

      // Bank Tier Selection Pills
      BANK_TIERS.forEach((b, idx) => {
        const bx = 55 + idx * 165;
        const by = 332;
        if (pos.x >= bx && pos.x <= bx + 155 && pos.y >= by && pos.y <= by + 48) {
          selectedBankIdx = idx;
        }
      });

      // Launch Heist Button
      if (pos.x >= 250 && pos.x <= 510 && pos.y >= 402 && pos.y <= 452) {
        startHeist();
      }
      return;
    }

    if (phase === 'RESULT') {
      phase = 'SAFEHOUSE';
      return;
    }

    // Heist Phase Top Ability Buttons
    if (pos.y <= 44) {
      CREW_ROSTER.forEach((c, idx) => {
        const bx = 250 + idx * 124;
        if (pos.x >= bx && pos.x <= bx + 118) {
          triggerCrewAbility(c.id);
        }
      });
    }
  };

  canvas.addEventListener('mousedown', onMouseDown);

  const update = () => {
    if (phase === 'SAFEHOUSE') {
      if (isPressed(' ')) startHeist();
      return;
    }
    if (phase === 'RESULT') {
      if (isPressed(' ') || isPressed('r')) phase = 'SAFEHOUSE';
      return;
    }

    // Crew Ability Hotkeys 1..4
    if (isPressed('1')) triggerCrewAbility('hacker');
    if (isPressed('2')) triggerCrewAbility('cracker');
    if (isPressed('3')) triggerCrewAbility('muscle');
    if (isPressed('4')) triggerCrewAbility('driver');

    Object.keys(abilityCooldowns).forEach(k => {
      if (abilityCooldowns[k] > 0) abilityCooldowns[k]--;
    });
    if (empTimer > 0) empTimer--;

    // Movement
    let dx = 0, dy = 0;
    if (isPressed('a') || isPressed('arrowleft')) dx -= 1;
    if (isPressed('d') || isPressed('arrowright')) dx += 1;
    if (isPressed('w') || isPressed('arrowup')) dy -= 1;
    if (isPressed('s') || isPressed('arrowdown')) dy += 1;

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy);
      const bagPenalty = Math.max(0.65, 1 - Math.max(0, thief.carryingBags - crewLevels.muscle) * 0.08);
      const spd = (3.0 + crewLevels.driver * 0.18) * bagPenalty;
      const nx = thief.x + (dx / len) * spd;
      const ny = thief.y + (dy / len) * spd;
      if (!hitWall(nx, thief.y, 10)) thief.x = Math.max(25, Math.min(W - 25, nx));
      if (!hitWall(thief.x, ny, 10)) thief.y = Math.max(55, Math.min(H - 25, ny));
    }

    // Laser Tripwire at Vault Corridor (x = 430, y = 165..415)
    if (lasersActive && empTimer <= 0 && !terminalHacked) {
      if (Math.abs(thief.x - 430) < 8 && thief.y > 165 && thief.y < 415) {
        if (!alarmTriggered) {
          alarmTriggered = true;
          floatingTexts.push({ x: thief.x, y: thief.y - 20, text: '🚨 LASER TRIPPED! ALARM!', color: '#ff2a85', life: 60 });
        }
      }
    }

    // Interactive Actions (Automatic when adjacent or faster when holding SPACE)
    const speedBoost = isPressed(' ') || isPressed('f') ? 1.65 : 1.0;

    // 1. Hack Security Terminal
    if (!terminalHacked && Math.hypot(thief.x - secTerminal.x, thief.y - secTerminal.y) < 34) {
      terminalHacked = true;
      lasersActive = false;
      floatingTexts.push({ x: secTerminal.x, y: secTerminal.y - 16, text: '💻 LASERS DISABLED!', color: '#00e5ff', life: 55 });
    }

    // 2. Crack Side Safes
    safes.forEach(s => {
      if (!s.opened && Math.hypot(thief.x - s.x, thief.y - s.y) < 34) {
        s.progress += (0.7 + crewLevels.cracker * 0.45) * speedBoost;
        if (s.progress >= 100) {
          s.opened = true;
          thief.bagLoot += s.value;
          thief.carryingBags++;
          floatingTexts.push({ x: s.x, y: s.y - 15, text: `+$${s.value}`, color: '#ffd60a', life: 45 });
        }
      }
    });

    // 3. Drill Main Bank Vault Door
    if (!vaultOpen && Math.hypot(thief.x - vaultDoor.x, thief.y - (vaultDoor.y + 32)) < 38) {
      vaultProgress += (0.42 + crewLevels.cracker * 0.32) * speedBoost;
      if (vaultProgress >= 100) {
        vaultProgress = 100;
        vaultOpen = true;
        floatingTexts.push({ x: vaultDoor.x, y: vaultDoor.y, text: '🔓 VAULT BREACHED!', color: '#00e676', life: 60 });
      }
    }

    // 4. Grab Vault Loot Piles
    lootPiles.forEach(lp => {
      if (!lp.taken && Math.hypot(thief.x - lp.x, thief.y - lp.y) < 28) {
        lp.taken = true;
        const val = Math.round(lp.value * (1 + (crewLevels.driver - 1) * 0.2));
        thief.bagLoot += val;
        thief.carryingBags++;
        floatingTexts.push({ x: lp.x, y: lp.y - 15, text: `+${lp.type} $${val}!`, color: '#00e676', life: 45 });
      }
    });

    // 5. Escape at Getaway Van!
    if (thief.bagLoot > 0 && thief.x < getawayVan.x + getawayVan.w + 18 && Math.abs(thief.y - (getawayVan.y + 43)) < 50) {
      stashCash += thief.bagLoot;
      careerTake += thief.bagLoot;
      resultTitle = 'HEIST SUCCESSFUL!';
      resultSub = `Stolen Loot Secured: +$${thief.bagLoot}  |  Total Stash: $${stashCash}`;
      phase = 'RESULT';
      addHighScore('heist', careerTake);
      return;
    }

    // Update Guards & Alarm Timer
    if (alarmTriggered && empTimer <= 0) {
      swatCountdown -= 1 / 60;
      if (swatCountdown <= 0) {
        resultTitle = 'BUSTED BY SWAT!';
        resultSub = 'The police surrounded the bank before you reached the Getaway Van!';
        phase = 'RESULT';
        addHighScore('heist', careerTake);
        return;
      }
    }

    guards.forEach(g => {
      if (g.stunTimer > 0) {
        g.stunTimer--;
        return;
      }

      const dist = Math.hypot(thief.x - g.x, thief.y - g.y);
      if (empTimer <= 0 && dist < 95 && thief.x > 140) {
        if (!alarmTriggered) {
          alarmTriggered = true;
          floatingTexts.push({ x: g.x, y: g.y - 20, text: '🚨 SPOTTED BY GUARD!', color: '#ff2a85', life: 50 });
        }
        g.angle = Math.atan2(thief.y - g.y, thief.x - g.x);
        g.x += Math.cos(g.angle) * 1.65;
        g.y += Math.sin(g.angle) * 1.65;

        if (dist < 20) {
          // Guard tackle vs Muscle Enforcer armor
          if (crewLevels.muscle >= 2 && Math.random() < 0.08) {
            g.stunTimer = 180;
            floatingTexts.push({ x: g.x, y: g.y - 16, text: 'GUARD SUBDUED!', color: '#00e676', life: 40 });
          } else {
            thief.hp -= difficulty === 'EASY' ? 0.5 : 0.9;
            if (thief.hp <= 0) {
              resultTitle = 'CREW CAPTURED!';
              resultSub = 'Guards subdued your operative inside the bank!';
              phase = 'RESULT';
              addHighScore('heist', careerTake);
            }
          }
        }
      } else {
        const target = g.route[g.wp];
        const dxG = target.x - g.x;
        const dyG = target.y - g.y;
        const dG = Math.hypot(dxG, dyG);
        if (dG < 6) {
          g.wp = (g.wp + 1) % g.route.length;
        } else {
          g.angle = Math.atan2(dyG, dxG);
          g.x += (dxG / dG) * 1.3;
          g.y += (dyG / dG) * 1.3;
        }
      }
    });
  };

  let animId = null;
  const loop = () => {
    update();

    ctx.fillStyle = '#070b16';
    ctx.fillRect(0, 0, W, H);

    if (phase === 'SAFEHOUSE') {
      // Safehouse Planning Blueprint Header
      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 19px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`SAFEHOUSE CREW HQ — STASH: $${stashCash}  |  CAREER TAKE: $${careerTake}`, W / 2, 42);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('Upgrade your 4 Heist Crew Specialists & pick a Target Bank below:', W / 2, 68);

      CREW_ROSTER.forEach((c, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bx = 55 + col * 325;
        const by = 92 + row * 112;
        const lvl = crewLevels[c.id];
        const cost = Math.round(c.baseCost * Math.pow(1.5, lvl - 1));
        const maxed = lvl >= 5;

        ctx.fillStyle = '#111a2e';
        ctx.fillRect(bx, by, 305, 98);
        ctx.strokeStyle = !maxed && stashCash >= cost ? c.color : '#2d3d63';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, 305, 98);

        ctx.fillStyle = c.color;
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${c.role}: "${c.codename}" (Lv.${lvl}/5)`, bx + 12, by + 24);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px sans-serif';
        ctx.fillText(c.desc, bx + 12, by + 46);

        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`Active Skill: [${c.abilityName}]`, bx + 12, by + 66);

        ctx.fillStyle = maxed ? '#64748b' : stashCash >= cost ? '#ffd60a' : '#ef4444';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(maxed ? 'MAX LEVEL' : `UPGRADE $${cost}`, bx + 292, by + 84);
      });

      // Bank Target Selector
      BANK_TIERS.forEach((b, idx) => {
        const bx = 55 + idx * 165;
        const by = 332;
        const sel = selectedBankIdx === idx;
        ctx.fillStyle = sel ? 'rgba(0, 230, 118, 0.22)' : '#131c31';
        ctx.fillRect(bx, by, 155, 48);
        ctx.strokeStyle = sel ? '#00e676' : '#334155';
        ctx.lineWidth = sel ? 2.5 : 1.5;
        ctx.strokeRect(bx, by, 155, 48);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(b.name, bx + 77, by + 20);
        ctx.fillStyle = '#ffd60a';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`Est. Vault: $${b.vaultLoot}+`, bx + 77, by + 38);
      });

      // Launch Heist Button
      ctx.fillStyle = '#00e676';
      ctx.fillRect(250, 402, 260, 48);
      ctx.fillStyle = '#04121f';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎭 START BANK HEIST ▶', 380, 432);

      animId = requestAnimationFrame(loop);
      return;
    }

    // ========================================================================
    // DRAW LIVE BANK FLOOR BLUEPRINT
    // ========================================================================
    // Vault Floor Highlight
    ctx.fillStyle = 'rgba(255, 214, 10, 0.06)';
    ctx.fillRect(558, 69, 153, 352);

    // Getaway Van parked on street (left)
    ctx.fillStyle = '#00e676';
    ctx.fillRect(getawayVan.x, getawayVan.y, getawayVan.w, getawayVan.h);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(getawayVan.x, getawayVan.y, getawayVan.w, getawayVan.h);
    ctx.fillStyle = '#04121f';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GETAWAY', getawayVan.x + 22, getawayVan.y + 38);
    ctx.fillText('VAN', getawayVan.x + 22, getawayVan.y + 52);

    // Security Terminal
    ctx.fillStyle = terminalHacked ? '#1e293b' : '#00e5ff';
    ctx.beginPath();
    ctx.arc(secTerminal.x, secTerminal.y, secTerminal.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText(terminalHacked ? 'HACKED' : 'SEC PC', secTerminal.x, secTerminal.y + 3);

    // Laser Grid Tripwire
    if (lasersActive && empTimer <= 0 && !terminalHacked) {
      ctx.strokeStyle = '#ff2a85';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(430, 165);
      ctx.lineTo(430, 418);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Bank Walls
    walls.forEach(w => {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w.x, w.y, w.w, w.h);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(w.x, w.y, w.w, w.h);
    });

    // Main Steel Vault Door
    if (!vaultOpen) {
      ctx.fillStyle = '#ffd60a';
      ctx.fillRect(vaultDoor.x, vaultDoor.y, vaultDoor.w, vaultDoor.h);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`VAULT ${Math.floor(vaultProgress)}%`, vaultDoor.x - 28, vaultDoor.y + 36);
    }

    // Side Safes
    safes.forEach(s => {
      ctx.fillStyle = s.opened ? '#1e293b' : '#f97316';
      ctx.fillRect(s.x - 14, s.y - 14, 28, 28);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.opened ? 'EMPTY' : `${Math.floor(s.progress)}%`, s.x, s.y + 3);
    });

    // Vault Loot Stacks
    lootPiles.forEach(lp => {
      if (lp.taken) return;
      ctx.fillStyle = lp.type === 'DIAMOND' ? '#00e5ff' : lp.type === 'GOLD' ? '#ffd60a' : '#00e676';
      ctx.fillRect(lp.x - 12, lp.y - 10, 24, 20);
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(lp.x - 12, lp.y - 10, 24, 20);
      ctx.fillStyle = '#04121f';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('$', lp.x, lp.y + 3);
    });

    // Bank Guards
    guards.forEach(g => {
      ctx.fillStyle = g.stunTimer > 0 ? '#64748b' : '#ff2a85';
      ctx.beginPath();
      ctx.arc(g.x, g.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(g.stunTimer > 0 ? 'STUNNED' : 'GUARD', g.x, g.y - 14);
    });

    // Player Heist Operative
    ctx.fillStyle = '#00e676';
    ctx.beginPath();
    ctx.arc(thief.x, thief.y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`BAG: $${thief.bagLoot}`, thief.x, thief.y - 16);

    // Floating Texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y -= 0.6;
      ft.life--;
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }

    // Top HUD & Crew Ability Bar
    ctx.fillStyle = 'rgba(7, 10, 20, 0.92)';
    ctx.fillRect(0, 0, W, 44);
    ctx.fillStyle = alarmTriggered ? '#ff2a85' : '#00e676';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(
      alarmTriggered ? `🚨 SWAT IN: ${Math.ceil(swatCountdown)}s` : `STEALTH OK (SWAT: ${Math.ceil(swatCountdown)}s)`,
      12,
      27
    );

    CREW_ROSTER.forEach((c, idx) => {
      const bx = 250 + idx * 124;
      const cd = abilityCooldowns[c.id];
      ctx.fillStyle = cd > 0 ? '#1e293b' : c.color;
      ctx.fillRect(bx, 7, 118, 30);
      ctx.fillStyle = cd > 0 ? '#64748b' : '#04121f';
      ctx.font = 'bold 9.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cd > 0 ? `${c.codename} (${Math.ceil(cd / 60)}s)` : c.abilityName, bx + 59, 26);
    });

    if (phase === 'RESULT') {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.92)';
      ctx.fillRect(160, 155, 440, 165);
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 3;
      ctx.strokeRect(160, 155, 440, 165);

      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(resultTitle, 380, 205);
      ctx.fillStyle = '#ffffff';
      ctx.font = '13px sans-serif';
      ctx.fillText(resultSub, 380, 240);
      ctx.fillStyle = '#00e676';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('CLICK OR PRESS SPACE TO RETURN TO SAFEHOUSE', 380, 285);
    }

    animId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    if (animId) cancelAnimationFrame(animId);
    canvas.removeEventListener('mousedown', onMouseDown);
  };
}

