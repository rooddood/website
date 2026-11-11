// ============================================================================
// 8-BIT CRYPTID CAMP: IDLE OUTDOORS DEFENSE & CHANCE ENCOUNTERS
// (Pure Chance Encounters + Download & Re-upload Campsite Items File!)
// ============================================================================

const ALLY_CATALOG = [
  { id: 'sasquatch', name: 'SASQUATCH', power: 35, color: '#a16207', rarity: 'LEGENDARY' },
  { id: 'alien', name: 'GREY ALIEN', power: 40, color: '#00e676', rarity: 'COSMIC' },
  { id: 'mothman', name: 'MOTHMAN', power: 32, color: '#dc2626', rarity: 'CRYPTID' },
  { id: 'bear', name: 'GRIZZLY BEAR', power: 22, color: '#b45309', rarity: 'WILD' },
  { id: 'owl', name: 'LASER OWL', power: 18, color: '#00e5ff', rarity: 'MYSTIC' },
  { id: 'raccoon', name: 'TRASH PANDA', power: 12, color: '#94a3b8', rarity: 'COMMON' },
  { id: 'wolf', name: 'SPIRIT WOLF', power: 20, color: '#e2e8f0', rarity: 'WILD' },
  { id: 'jackalope', name: 'JACKALOPE', power: 16, color: '#fde047', rarity: 'RARE' }
];

const CAMP_ITEMS_POOL = [
  { id: 'tinfoil_crown', name: 'Tin-Foil Crown', defBonus: 12, color: '#cbd5e1', desc: 'Blocks gov mind-scanners' },
  { id: 'alien_raygun', name: 'Zeta Raygun', defBonus: 28, color: '#00e676', desc: 'Dropped by friendly saucer' },
  { id: 'bigfoot_totem', name: 'Sasquatch Totem', defBonus: 24, color: '#a16207', desc: 'Carved cedar ward totem' },
  { id: 'cast_iron', name: 'Cast-Iron Skillet', defBonus: 10, color: '#64748b', desc: 'Cooks beans & deflects darts' },
  { id: 'plasma_lantern', name: 'Plasma Lantern', defBonus: 18, color: '#00e5ff', desc: 'Never-fading eerie camp glow' },
  { id: 'cryptid_whistle', name: 'Cryptid Whistle', defBonus: 16, color: '#ffd60a', desc: 'Summons forest beasts' },
  { id: 'camo_tarp', name: 'Radar Camo Tarp', defBonus: 15, color: '#22c55e', desc: 'Hides tent from spy satellites' },
  { id: 'moonshine_jug', name: 'Pine Moonshine', defBonus: 14, color: '#f97316', desc: 'Boosts campfire morale' },
  { id: 'moth_wing', name: 'Mothman Feather', defBonus: 22, color: '#ef4444', desc: 'Omen of agent doom' },
  { id: 'meteor_ore', name: 'Starlight Ore', defBonus: 26, color: '#a855f7', desc: 'Hums with cosmic static' }
];

const AGENT_TYPES = [
  { name: 'MIB AGENT', hp: 55, speed: 1.1, color: '#334155', badge: '#00e5ff' },
  { name: 'IRS DRONE', hp: 40, speed: 1.5, color: '#64748b', badge: '#ef4444' },
  { name: 'FED RANGER', hp: 70, speed: 0.95, color: '#15803d', badge: '#ffd60a' },
  { name: 'AREA-51 OPS', hp: 95, speed: 1.05, color: '#1e1b4b', badge: '#ff2a85' }
];

export function initCampsiteGame({ canvas, ctx, W, H, playerName, isPressed, addHighScore, triggerToast }) {
  // Major Camp Variables (Restorable from JSON file or localStorage!)
  let campState = {
    camperName: playerName || 'OFFGRID_1',
    repelledAgents: 0,
    pinecones: 25,
    campfireWarmth: 100,
    items: [
      { id: 'cast_iron', name: 'Cast-Iron Skillet', defBonus: 10, color: '#64748b', count: 1 }
    ],
    allies: [
      { id: 'raccoon', name: 'TRASH PANDA', power: 12, color: '#94a3b8', count: 1 }
    ],
    logs: [
      'Welcome to 8-Bit Cryptid Camp! Everything is left to pure chance.',
      'Encounters wander into camp on their own. Defend against Gov Agents!'
    ]
  };

  // Load saved state from localStorage if available
  try {
    const saved = localStorage.getItem('neo_cryptid_camp_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.items)) {
        campState = { ...campState, ...parsed };
      }
    }
  } catch {}

  const persistLocal = () => {
    try {
      localStorage.setItem('neo_cryptid_camp_save', JSON.stringify(campState));
    } catch {}
  };

  const addLog = (msg) => {
    campState.logs.unshift(msg);
    if (campState.logs.length > 5) campState.logs.pop();
    persistLocal();
  };

  const getTotalDefense = () => {
    const itemDef = (campState.items || []).reduce((sum, it) => sum + (it.defBonus || 10) * (it.count || 1), 0);
    const allyDef = (campState.allies || []).reduce((sum, al) => sum + (al.power || 15) * (al.count || 1), 0);
    return 15 + itemDef + allyDef;
  };

  // Download Campsite JSON File
  const downloadCampFile = () => {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      camperName: campState.camperName,
      repelledAgents: campState.repelledAgents,
      pinecones: campState.pinecones,
      campfireWarmth: campState.campfireWarmth,
      items: campState.items,
      allies: campState.allies,
      logs: campState.logs
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cryptid_campsite_items.json';
    a.click();
    URL.revokeObjectURL(url);
    addLog('💾 Downloaded cryptid_campsite_items.json!');
    if (triggerToast) triggerToast('💾 Downloaded cryptid_campsite_items.json!');
  };

  // Upload & Restore Campsite JSON File
  const applyUploadedCampJson = (rawText) => {
    try {
      const data = JSON.parse(rawText);
      if (!data || typeof data !== 'object') throw new Error('Invalid JSON');
      campState.camperName = data.camperName || campState.camperName;
      campState.repelledAgents = Number(data.repelledAgents) || 0;
      campState.pinecones = Number(data.pinecones) || 0;
      campState.campfireWarmth = Number(data.campfireWarmth) || 100;
      if (Array.isArray(data.items)) campState.items = data.items;
      if (Array.isArray(data.allies)) campState.allies = data.allies;
      addLog('📂 Loaded campsite items & allies from file!');
      persistLocal();
      if (triggerToast) triggerToast('🌲 Restored Campsite Items & Allies!');
    } catch {
      if (triggerToast) triggerToast('⚠️ Invalid campsite save file!');
    }
  };

  const promptUploadCampFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => applyUploadedCampJson(ev.target.result);
      reader.readAsText(file);
    };
    input.click();
  };

  // Active Visual Entities in the 8-bit Campsite
  let activeAgents = [];
  let visitorBanner = null; // { title, sub, color, timer, spriteType }
  let laserBeams = [];
  let floatingTexts = [];
  let showInventoryModal = false;

  // Pure Chance Roll Timer (Independent of playtime!)
  let chanceCountdown = 130;

  const triggerPureChanceEncounter = () => {
    // 100% pure RNG roll — no bearing on when you got here or how long you've played!
    const roll = Math.random();

    if (roll < 0.34) {
      // Friendly Cryptid or Woodland Animal Visits Camp!
      const pick = ALLY_CATALOG[Math.floor(Math.random() * ALLY_CATALOG.length)];
      const existing = campState.allies.find(a => a.id === pick.id);
      if (existing) existing.count = (existing.count || 1) + 1;
      else campState.allies.push({ ...pick, count: 1 });

      visitorBanner = {
        title: `✨ CHANCE ENCOUNTER: ${pick.name} (${pick.rarity})!`,
        sub: `${pick.name} joined your campsite defense (+${pick.power} PWR)!`,
        color: pick.color,
        spriteType: pick.id,
        timer: 210
      };
      addLog(`✨ ${pick.name} wandered into camp and allied with you!`);
    } else if (roll < 0.66) {
      // Mysterious Campsite Item Discovered!
      const item = CAMP_ITEMS_POOL[Math.floor(Math.random() * CAMP_ITEMS_POOL.length)];
      const existing = campState.items.find(i => i.id === item.id);
      if (existing) existing.count = (existing.count || 1) + 1;
      else campState.items.push({ ...item, count: 1 });

      visitorBanner = {
        title: `🎒 FOUND CAMP ITEM: ${item.name.toUpperCase()}!`,
        sub: `${item.desc} (+${item.defBonus} Camp Defense)`,
        color: item.color,
        spriteType: 'item',
        timer: 210
      };
      addLog(`🎒 Found [${item.name}] at the edge of camp (+${item.defBonus} DEF)!`);
    } else {
      // Incoming Government Agent Raid!
      const ag = AGENT_TYPES[Math.floor(Math.random() * AGENT_TYPES.length)];
      const fromLeft = Math.random() < 0.5;
      activeAgents.push({
        name: ag.name,
        x: fromLeft ? 20 : W - 20,
        y: 325,
        hp: ag.hp + Math.floor(Math.random() * 40),
        maxHp: ag.hp + 40,
        speed: ag.speed,
        color: ag.color,
        badge: ag.badge
      });
      addLog(`🚨 ${ag.name} spotted approaching the campsite perimeter!`);
    }
  };

  // Draw crisp 8-bit blocky pixel rect helper
  const pxRect = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  };

  // Draw 8-bit Pixel Sprite for Cryptids / Allies / Camper / Agents
  const draw8BitSprite = (type, x, y, scale = 3) => {
    const s = scale;
    if (type === 'sasquatch') {
      // Bigfoot furry pixel silhouette
      pxRect(x - 3 * s, y - 9 * s, 6 * s, 9 * s, '#78350f');
      pxRect(x - 4 * s, y - 7 * s, 8 * s, 5 * s, '#92400e');
      pxRect(x - 2 * s, y - 8 * s, 1 * s, 1 * s, '#fde047');
      pxRect(x + 1 * s, y - 8 * s, 1 * s, 1 * s, '#fde047');
    } else if (type === 'alien') {
      // Grey Alien + Saucer glow
      pxRect(x - 3 * s, y - 8 * s, 6 * s, 4 * s, '#00e676');
      pxRect(x - 2 * s, y - 4 * s, 4 * s, 4 * s, '#22c55e');
      pxRect(x - 2 * s, y - 7 * s, 1.5 * s, 1.5 * s, '#000000');
      pxRect(x + 0.5 * s, y - 7 * s, 1.5 * s, 1.5 * s, '#000000');
    } else if (type === 'mothman') {
      // Winged Mothman with glowing red eyes
      pxRect(x - 5 * s, y - 7 * s, 10 * s, 5 * s, '#1e293b');
      pxRect(x - 2 * s, y - 8 * s, 4 * s, 8 * s, '#0f172a');
      pxRect(x - 1.5 * s, y - 7 * s, 1 * s, 1 * s, '#ef4444');
      pxRect(x + 0.5 * s, y - 7 * s, 1 * s, 1 * s, '#ef4444');
    } else {
      // Woodland Beast (Bear / Wolf / Raccoon / Owl)
      pxRect(x - 3 * s, y - 5 * s, 6 * s, 5 * s, '#b45309');
      pxRect(x - 2 * s, y - 7 * s, 4 * s, 3 * s, '#d97706');
      pxRect(x - 1 * s, y - 6 * s, 1 * s, 1 * s, '#ffffff');
    }
  };

  let spaceWasDown = false;
  const getCanvasPos = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (W / rect.width),
      y: (clientY - rect.top) * (H / rect.height)
    };
  };

  const onMouseDown = (e) => {
    const pos = getCanvasPos(e.clientX, e.clientY);

    // Top Bar Buttons:
    // 1. [⬇ SAVE CAMP FILE] (x: 350..500, y: 6..38)
    if (pos.x >= 348 && pos.x <= 502 && pos.y >= 6 && pos.y <= 38) {
      downloadCampFile();
      return;
    }
    // 2. [⬆ LOAD CAMP FILE] (x: 508..652, y: 6..38)
    if (pos.x >= 506 && pos.x <= 654 && pos.y >= 6 && pos.y <= 38) {
      promptUploadCampFile();
      return;
    }
    // 3. [🎒 ITEMS] (x: 660..752, y: 6..38)
    if (pos.x >= 658 && pos.x <= 754 && pos.y >= 6 && pos.y <= 38) {
      showInventoryModal = !showInventoryModal;
      return;
    }

    if (showInventoryModal) {
      showInventoryModal = false;
      return;
    }

    // Clicking on playfield triggers manual Chance Roll or zaps incoming Agents!
    if (activeAgents.length > 0) {
      activeAgents.forEach(ag => {
        ag.hp -= 25;
        laserBeams.push({ x1: W / 2, y1: 300, x2: ag.x, y2: ag.y - 16, color: '#00e5ff', life: 10 });
      });
    } else {
      campState.campfireWarmth = Math.min(200, campState.campfireWarmth + 10);
      campState.pinecones += 5;
      floatingTexts.push({ x: W / 2, y: 280, text: '🔥 FIRE STOKED (+CHANCE ROLL!)', color: '#ffd60a', life: 40 });
      triggerPureChanceEncounter();
    }
  };

  canvas.addEventListener('mousedown', onMouseDown);

  const update = () => {
    const spDown = isPressed(' ');
    if (spDown && !spaceWasDown) {
      if (activeAgents.length > 0) {
        activeAgents.forEach(ag => {
          ag.hp -= 30;
          laserBeams.push({ x1: W / 2, y1: 300, x2: ag.x, y2: ag.y - 16, color: '#ffd60a', life: 10 });
        });
      } else {
        triggerPureChanceEncounter();
      }
    }
    spaceWasDown = spDown;

    // Idle Chance Countdown
    chanceCountdown--;
    if (chanceCountdown <= 0) {
      chanceCountdown = 140 + Math.floor(Math.random() * 120);
      triggerPureChanceEncounter();
    }

    if (visitorBanner) {
      visitorBanner.timer--;
      if (visitorBanner.timer <= 0) visitorBanner = null;
    }

    // Idle Camp Defense vs Incoming Government Agents
    const totalDef = getTotalDefense();
    for (let i = activeAgents.length - 1; i >= 0; i--) {
      const ag = activeAgents[i];
      const dir = ag.x < W / 2 ? 1 : -1;
      ag.x += dir * ag.speed;

      // Allies & Camp Traps automatically fire at approaching agents!
      if (Math.random() < 0.08) {
        const dmg = Math.max(8, Math.round(totalDef * 0.22));
        ag.hp -= dmg;
        laserBeams.push({
          x1: W / 2 + (Math.random() - 0.5) * 90,
          y1: 305,
          x2: ag.x,
          y2: ag.y - 16,
          color: '#00e676',
          life: 8
        });
        floatingTexts.push({ x: ag.x, y: ag.y - 34, text: `-${dmg}`, color: '#00e676', life: 24 });
      }

      if (ag.hp <= 0) {
        campState.repelledAgents++;
        campState.pinecones += 15;
        const scoreVal = campState.repelledAgents * 100 + totalDef * 5;
        addHighScore('campsite', scoreVal);
        floatingTexts.push({
          x: ag.x,
          y: ag.y - 40,
          text: `${ag.name} REPELLED!`,
          color: '#ffd60a',
          life: 45
        });
        addLog(`🛡️ Cryptids & Allies repelled ${ag.name}! (Total: ${campState.repelledAgents})`);
        activeAgents.splice(i, 1);
        continue;
      }

      // If agent reaches the campfire center
      if (Math.abs(ag.x - W / 2) < 35) {
        // Pure chance saving throw by Sasquatch/UFO or minor warmth loss
        if (Math.random() < 0.65) {
          campState.repelledAgents++;
          floatingTexts.push({ x: W / 2, y: 265, text: '🛸 UFO ABDUCTED GOV AGENT!', color: '#00e5ff', life: 50 });
          addLog(`🛸 A random UFO beam-abducted ${ag.name} right at the tent!`);
        } else {
          campState.campfireWarmth = Math.max(20, campState.campfireWarmth - 15);
          addLog(`⚠️ ${ag.name} kicked dirt on the campfire before fleeing!`);
        }
        activeAgents.splice(i, 1);
      }
    }
  };

  let animId = null;
  const loop = () => {
    update();

    // 8-Bit Starry Night Forest Sky
    pxRect(0, 0, W, H, '#060913');
    for (let i = 0; i < 36; i++) {
      const sx = (i * 97) % W;
      const sy = 52 + ((i * 53) % 160);
      const twinkle = (Math.floor(Date.now() / 400) + i) % 3 === 0 ? '#ffd60a' : '#ffffff';
      pxRect(sx, sy, 3, 3, twinkle);
    }

    // 8-Bit Pixel Moon
    pxRect(640, 72, 36, 36, '#fef08a');
    pxRect(652, 80, 8, 8, '#eab308');

    // 8-Bit Pixel Pine Trees Background Row
    for (let tx = 20; tx < W; tx += 52) {
      if (Math.abs(tx - W / 2) < 120) continue; // Clearings for campsite
      pxRect(tx + 12, 275, 10, 55, '#451a03');
      pxRect(tx, 250, 34, 30, '#064e3b');
      pxRect(tx + 5, 226, 24, 28, '#047857');
      pxRect(tx + 10, 206, 14, 24, '#10b981');
    }

    // 8-Bit Forest Ground
    pxRect(0, 325, W, H - 325, '#052e16');
    pxRect(0, 325, W, 8, '#16a34a');

    // Draw 8-Bit Pixel Tent (Center-Left)
    pxRect(265, 275, 76, 50, '#d97706');
    pxRect(275, 263, 56, 14, '#f59e0b');
    pxRect(293, 290, 20, 35, '#1e293b'); // Tent door

    // Draw 8-Bit Radio Antenna & Totem (Center-Right)
    pxRect(455, 245, 6, 80, '#94a3b8');
    pxRect(447, 255, 22, 4, '#00e5ff');
    pxRect(455, 238, 6, 6, Math.floor(Date.now() / 250) % 2 === 0 ? '#ef4444' : '#00e676');

    // Draw Befriended Cryptids & Animals hanging out around Camp!
    (campState.allies || []).slice(0, 6).forEach((al, idx) => {
      const side = idx % 2 === 0 ? -1 : 1;
      const dist = 105 + Math.floor(idx / 2) * 48;
      const ax = W / 2 + side * dist;
      const bob = Math.floor(Math.sin(Date.now() * 0.005 + idx) * 3);
      draw8BitSprite(al.id, ax, 325 + bob, 3);
      ctx.fillStyle = al.color;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${al.name} x${al.count}`, ax, 340);
    });

    // Draw 8-Bit Camper & Crackling Campfire at Center (x = 380, y = 325)
    pxRect(352, 292, 12, 33, '#3b82f6'); // Camper body
    pxRect(353, 280, 10, 11, '#fed7aa'); // Camper head
    pxRect(351, 275, 14, 5, '#ef4444'); // Camper cap

    // Campfire Logs & Animated 8-bit Flames
    pxRect(376, 317, 28, 8, '#78350f');
    const flameH = 14 + (Math.floor(Date.now() / 120) % 8);
    pxRect(380, 317 - flameH, 20, flameH, '#f97316');
    pxRect(385, 317 - flameH + 5, 10, flameH - 5, '#fde047');

    // Draw Incoming Government Agents
    activeAgents.forEach(ag => {
      pxRect(ag.x - 9, ag.y - 32, 18, 32, ag.color);
      pxRect(ag.x - 7, ag.y - 44, 14, 12, '#fed7aa');
      pxRect(ag.x - 8, ag.y - 40, 16, 4, '#000000'); // MIB Sunglasses!
      pxRect(ag.x - 4, ag.y - 26, 4, 10, ag.badge); // Tie/Badge

      ctx.fillStyle = '#ff2a85';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ag.name, ag.x, ag.y - 52);
    });

    // Defense Laser / Ally Attack Beams
    for (let i = laserBeams.length - 1; i >= 0; i--) {
      const lb = laserBeams[i];
      lb.life--;
      ctx.strokeStyle = lb.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(lb.x1, lb.y1);
      ctx.lineTo(lb.x2, lb.y2);
      ctx.stroke();
      if (lb.life <= 0) laserBeams.splice(i, 1);
    }

    // Floating Texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const ft = floatingTexts[i];
      ft.y -= 0.6;
      ft.life--;
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      if (ft.life <= 0) floatingTexts.splice(i, 1);
    }

    // Chance Encounter Pop-up Banner
    if (visitorBanner) {
      pxRect(150, 62, 460, 68, 'rgba(8, 14, 28, 0.94)');
      ctx.strokeStyle = visitorBanner.color;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(150, 62, 460, 68);

      ctx.fillStyle = visitorBanner.color;
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(visitorBanner.title, W / 2, 88);
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillText(visitorBanner.sub, W / 2, 112);
    }

    // ========================================================================
    // BOTTOM 8-BIT LOG & ITEMS CONSOLE
    // ========================================================================
    pxRect(12, 352, W - 24, 118, 'rgba(7, 11, 22, 0.92)');
    ctx.strokeStyle = '#00e676';
    ctx.lineWidth = 2;
    ctx.strokeRect(12, 352, W - 24, 118);

    ctx.fillStyle = '#ffd60a';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'left';
    const itemSummary = (campState.items || []).map(i => `${i.name}(x${i.count || 1})`).join(', ') || 'None';
    ctx.fillText(`CAMP ITEMS: ${itemSummary.slice(0, 78)}`, 24, 372);

    (campState.logs || []).slice(0, 4).forEach((ln, idx) => {
      ctx.fillStyle = idx === 0 ? '#00e676' : '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`> ${ln}`, 24, 394 + idx * 18);
    });

    // ========================================================================
    // TOP BAR: STATS + DOWNLOAD / UPLOAD CAMPSITE ITEMS FILE BUTTONS
    // ========================================================================
    pxRect(0, 0, W, 44, 'rgba(6, 10, 20, 0.95)');
    ctx.fillStyle = '#00e676';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      `DEFENSE: ${getTotalDefense()}  |  AGENTS REPELLED: ${campState.repelledAgents}`,
      12,
      26
    );

    // Download Campsite File Button
    pxRect(348, 7, 152, 30, '#00e5ff');
    ctx.fillStyle = '#04121f';
    ctx.font = 'bold 10.5px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⬇ SAVE CAMP FILE', 424, 26);

    // Upload Campsite File Button
    pxRect(506, 7, 146, 30, '#ffd60a');
    ctx.fillStyle = '#1a1200';
    ctx.fillText('⬆ LOAD CAMP FILE', 579, 26);

    // View Camp Items Modal Button
    pxRect(658, 7, 92, 30, '#a855f7');
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`🎒 ITEMS(${campState.items.length})`, 704, 26);

    if (showInventoryModal) {
      pxRect(70, 58, W - 140, H - 90, 'rgba(5, 9, 18, 0.96)');
      ctx.strokeStyle = '#ffd60a';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(70, 58, W - 140, H - 90);

      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 15px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CAMPSITE ITEMS & CRYPTID ALLIES (CLICK TO CLOSE)', W / 2, 86);

      (campState.items || []).forEach((it, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const bx = 92 + col * 290;
        const by = 105 + row * 48;
        pxRect(bx, by, 275, 40, '#111a2e');
        ctx.fillStyle = it.color || '#00e5ff';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${it.name} x${it.count || 1} (+${it.defBonus} DEF)`, bx + 10, by + 24);
      });
    }

    animId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    if (animId) cancelAnimationFrame(animId);
    canvas.removeEventListener('mousedown', onMouseDown);
  };
}

