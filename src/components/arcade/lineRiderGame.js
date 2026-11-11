// ============================================================================
// CYBER LINE RIDER STUDIO (Draw Tracks, Boosts, Trampolines & Ride!)
// ============================================================================

const TOOLS = [
  { id: 'normal', label: '1: BLUE TRACK', color: '#00e5ff' },
  { id: 'boost', label: '2: BOOST >>', color: '#00e676' },
  { id: 'bounce', label: '3: BOUNCE', color: '#ff2a85' },
  { id: 'scenery', label: '4: SCENERY', color: '#9d4edd' },
  { id: 'star', label: '5: +STAR', color: '#ffd60a' },
  { id: 'erase', label: '6: ERASER', color: '#ef4444' }
];

export function initLineRiderGame({ canvas, ctx, W, H, difficulty, isPressed, addHighScore }) {
  let lines = [];
  let stars = [];
  let selectedTool = 'normal';
  let isRiding = false;
  let camFollow = true;
  let camX = 0;
  let camY = 0;
  let stuntScore = 0;
  let bestScore = 0;

  const startPos = { x: 110, y: 120 };

  const rider = {
    x: startPos.x,
    y: startPos.y,
    vx: 2.2,
    vy: 0,
    angle: 0,
    vAngle: 0,
    crashed: false,
    grounded: false,
    flips: 0,
    cumAngle: 0,
    airTicks: 0,
    scarf: []
  };

  const resetRider = () => {
    rider.x = startPos.x;
    rider.y = startPos.y;
    rider.vx = 2.4;
    rider.vy = 0;
    rider.angle = 0;
    rider.vAngle = 0;
    rider.crashed = false;
    rider.grounded = false;
    rider.flips = 0;
    rider.cumAngle = 0;
    rider.airTicks = 0;
    rider.scarf = Array.from({ length: 8 }, (_, i) => ({ x: startPos.x - i * 4, y: startPos.y - 10 }));
    stars.forEach(s => { s.collected = false; });
    stuntScore = 0;
    camX = 0;
    camY = 0;
  };

  // Load fun starter course
  const loadPreset = (presetIdx) => {
    lines = [];
    stars = [];
    if (presetIdx === 0) {
      // Alpine Mega Ramp + Boost Jump + Catch Slope
      const pts = [
        [70, 145, 190, 185, 'normal'],
        [190, 185, 310, 250, 'normal'],
        [310, 250, 430, 280, 'boost'],
        [430, 280, 520, 270, 'boost'],
        [520, 270, 595, 225, 'normal'],
        // Landing slope & bounce pad
        [690, 310, 860, 390, 'normal'],
        [860, 390, 990, 395, 'boost'],
        [990, 395, 1110, 355, 'bounce'],
        // Upper deck catch
        [1180, 280, 1420, 360, 'normal'],
        [1420, 360, 1600, 340, 'normal']
      ];
      pts.forEach(([x1, y1, x2, y2, type]) => lines.push({ x1, y1, x2, y2, type }));
      stars.push(
        { x: 370, y: 245, collected: false },
        { x: 640, y: 185, collected: false },
        { x: 920, y: 365, collected: false },
        { x: 1140, y: 240, collected: false },
        { x: 1350, y: 300, collected: false }
      );
    } else if (presetIdx === 1) {
      // Pinball Trampoline Canyon
      lines.push(
        { x1: 70, y1: 145, x2: 240, y2: 245, type: 'boost' },
        { x1: 240, y1: 245, x2: 360, y2: 235, type: 'bounce' },
        { x1: 440, y1: 330, x2: 590, y2: 310, type: 'bounce' },
        { x1: 660, y1: 240, x2: 860, y2: 340, type: 'boost' },
        { x1: 860, y1: 340, x2: 1020, y2: 300, type: 'normal' }
      );
      stars.push(
        { x: 300, y: 210, collected: false },
        { x: 400, y: 150, collected: false },
        { x: 515, y: 270, collected: false },
        { x: 760, y: 260, collected: false }
      );
    }
    resetRider();
  };

  loadPreset(0);
  let presetCounter = 0;

  // Mouse drawing state
  let drawing = false;
  let lastPt = null;
  let spaceWasDown = false;

  const getCanvasPos = (clientX, clientY) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (W / rect.width),
      y: (clientY - rect.top) * (H / rect.height)
    };
  };

  const toWorld = (sx, sy) => ({
    x: sx + camX,
    y: sy + camY
  });

  const eraseAt = (wx, wy) => {
    lines = lines.filter(ln => {
      const mx = (ln.x1 + ln.x2) / 2;
      const my = (ln.y1 + ln.y2) / 2;
      return (
        Math.hypot(ln.x1 - wx, ln.y1 - wy) > 24 &&
        Math.hypot(ln.x2 - wx, ln.y2 - wy) > 24 &&
        Math.hypot(mx - wx, my - wy) > 24
      );
    });
    stars = stars.filter(s => Math.hypot(s.x - wx, s.y - wy) > 24);
  };

  const onMouseDown = (e) => {
    const pos = getCanvasPos(e.clientX, e.clientY);

    // Top HUD toolbar clicks (y <= 44)
    if (pos.y <= 44) {
      // Tools (x: 10..470)
      const toolW = 76;
      const tIdx = Math.floor((pos.x - 8) / toolW);
      if (tIdx >= 0 && tIdx < TOOLS.length) {
        selectedTool = TOOLS[tIdx].id;
        return;
      }
      // PLAY / STOP button (475..565)
      if (pos.x >= 472 && pos.x <= 566) {
        isRiding = !isRiding;
        if (isRiding) resetRider();
        else {
          camX = 0;
          camY = 0;
        }
        return;
      }
      // UNDO button (570..625)
      if (pos.x >= 570 && pos.x <= 626) {
        lines.pop();
        return;
      }
      // PRESET / CLEAR button (630..752)
      if (pos.x >= 630 && pos.x <= 754) {
        presetCounter = (presetCounter + 1) % 3;
        loadPreset(presetCounter);
        isRiding = false;
        return;
      }
      return;
    }

    const wPt = toWorld(pos.x, pos.y);
    if (selectedTool === 'star') {
      stars.push({ x: wPt.x, y: wPt.y, collected: false });
      return;
    }
    if (selectedTool === 'erase') {
      drawing = true;
      eraseAt(wPt.x, wPt.y);
      return;
    }

    drawing = true;
    lastPt = wPt;
  };

  const onMouseMove = (e) => {
    if (!drawing) return;
    const pos = getCanvasPos(e.clientX, e.clientY);
    if (pos.y <= 44) return;
    const wPt = toWorld(pos.x, pos.y);

    if (selectedTool === 'erase') {
      eraseAt(wPt.x, wPt.y);
      return;
    }

    if (lastPt && Math.hypot(wPt.x - lastPt.x, wPt.y - lastPt.y) >= 14) {
      lines.push({
        x1: lastPt.x,
        y1: lastPt.y,
        x2: wPt.x,
        y2: wPt.y,
        type: selectedTool
      });
      lastPt = wPt;
    }
  };

  const onMouseUp = () => {
    drawing = false;
    lastPt = null;
  };

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  const updatePhysics = () => {
    // Keyboard shortcuts for tools 1-6
    TOOLS.forEach((t, i) => {
      if (isPressed(String(i + 1))) selectedTool = t.id;
    });

    const spDown = isPressed(' ');
    if (spDown && !spaceWasDown) {
      isRiding = !isRiding;
      if (isRiding) resetRider();
      else {
        camX = 0;
        camY = 0;
      }
    }
    spaceWasDown = spDown;

    if (!isRiding) {
      // Pan camera in edit mode with WASD / Arrows
      if (isPressed('a') || isPressed('arrowleft')) camX -= 7;
      if (isPressed('d') || isPressed('arrowright')) camX += 7;
      if (isPressed('w') || isPressed('arrowup')) camY -= 7;
      if (isPressed('s') || isPressed('arrowdown')) camY += 7;
      return;
    }

    if (rider.crashed) {
      if (isPressed('r')) resetRider();
      return;
    }

    const grav = difficulty === 'EASY' ? 0.22 : difficulty === 'HARD' ? 0.32 : 0.26;
    rider.vy += grav;

    // Air control for flips!
    if (!rider.grounded) {
      rider.airTicks++;
      if (isPressed('a') || isPressed('arrowleft')) rider.vAngle -= 0.012;
      if (isPressed('d') || isPressed('arrowright')) rider.vAngle += 0.012;
      rider.vAngle *= 0.96;
      rider.angle += rider.vAngle;
      rider.cumAngle += rider.vAngle;

      if (Math.abs(rider.cumAngle) >= Math.PI * 1.85) {
        rider.flips++;
        rider.cumAngle = 0;
        stuntScore += 250;
      }
      if (rider.airTicks % 15 === 0) stuntScore += 15;
    } else {
      rider.airTicks = 0;
      rider.cumAngle = 0;
    }

    const subSteps = 4;
    rider.grounded = false;

    for (let s = 0; s < subSteps; s++) {
      rider.x += rider.vx / subSteps;
      rider.y += rider.vy / subSteps;

      for (let i = 0; i < lines.length; i++) {
        const ln = lines[i];
        if (ln.type === 'scenery') continue;

        const dx = ln.x2 - ln.x1;
        const dy = ln.y2 - ln.y1;
        const len2 = dx * dx + dy * dy;
        if (len2 < 1) continue;

        const t = Math.max(0, Math.min(1, ((rider.x - ln.x1) * dx + (rider.y - ln.y1) * dy) / len2));
        const cx = ln.x1 + t * dx;
        const cy = ln.y1 + t * dy;
        const dist = Math.hypot(rider.x - cx, rider.y - cy);

        if (dist < 11) {
          const len = Math.sqrt(len2);
          // Normal pointing upward
          let nx = -dy / len;
          let ny = dx / len;
          if (ny > 0) {
            nx = -nx;
            ny = -ny;
          }

          // Push rider onto surface
          rider.x = cx + nx * 11;
          rider.y = cy + ny * 11;

          const lineAngle = Math.atan2(dy, dx);
          // Check if rider landed upside down (head crash) on Hard/Med
          const angleDiff = Math.cos(rider.angle - lineAngle);
          if (difficulty !== 'EASY' && angleDiff < -0.55 && Math.hypot(rider.vx, rider.vy) > 6) {
            rider.crashed = true;
            if (stuntScore > bestScore) {
              bestScore = stuntScore;
              addHighScore('linerider', stuntScore);
            }
            break;
          }

          if (ln.type === 'bounce') {
            const spd = Math.max(8, Math.hypot(rider.vx, rider.vy) * 1.18);
            rider.vx += nx * spd * 0.65;
            rider.vy = -Math.abs(spd * 0.85);
            stuntScore += 50;
          } else {
            // Project velocity onto tangent
            const tx = dx / len;
            const ty = dy / len;
            let dot = rider.vx * tx + rider.vy * ty;
            if (ln.type === 'boost') {
              dot += 0.32;
              stuntScore += 3;
            }
            rider.vx = tx * dot * 0.996;
            rider.vy = ty * dot * 0.996;
            rider.angle = Math.atan2(ty * Math.sign(dot || 1), tx * Math.sign(dot || 1));
            rider.vAngle = 0;
            rider.grounded = true;
          }
        }
      }
    }

    // Collect stunt stars
    stars.forEach(st => {
      if (!st.collected && Math.hypot(rider.x - st.x, rider.y - st.y) < 24) {
        st.collected = true;
        stuntScore += 200;
        if (stuntScore > bestScore) {
          bestScore = stuntScore;
          addHighScore('linerider', stuntScore);
        }
      }
    });

    // Update flowing scarf physics
    if (rider.scarf.length > 0) {
      rider.scarf[0].x = rider.x - Math.cos(rider.angle) * 6;
      rider.scarf[0].y = rider.y - 12;
      for (let i = 1; i < rider.scarf.length; i++) {
        const prev = rider.scarf[i - 1];
        const cur = rider.scarf[i];
        cur.x += (prev.x - 5 - cur.x) * 0.45;
        cur.y += (prev.y + Math.sin(Date.now() * 0.02 + i) * 1.4 - cur.y) * 0.45;
      }
    }

    // Distance score
    const distPts = Math.max(0, Math.floor((rider.x - startPos.x) / 25));
    if (stuntScore + distPts > bestScore) {
      bestScore = stuntScore + distPts;
    }

    // Camera smoothly tracks rider
    if (camFollow) {
      camX += (rider.x - W * 0.35 - camX) * 0.12;
      camY += (rider.y - H * 0.5 - camY) * 0.12;
    }
  };

  let animId = null;
  const loop = () => {
    updatePhysics();

    // Blueprint Grid Background
    ctx.fillStyle = '#070b16';
    ctx.fillRect(0, 0, W, H);

    const gridSize = 40;
    const offX = ((-camX % gridSize) + gridSize) % gridSize;
    const offY = ((-camY % gridSize) + gridSize) % gridSize;
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.07)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = offX; x < W; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    for (let y = offY; y < H; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();

    ctx.save();
    ctx.translate(-camX, -camY);

    // Draw Start Flag
    ctx.strokeStyle = '#00e676';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y + 10);
    ctx.lineTo(startPos.x, startPos.y - 26);
    ctx.stroke();
    ctx.fillStyle = '#00e676';
    ctx.beginPath();
    ctx.moveTo(startPos.x, startPos.y - 26);
    ctx.lineTo(startPos.x + 22, startPos.y - 19);
    ctx.lineTo(startPos.x, startPos.y - 12);
    ctx.fill();

    // Draw Track Lines
    lines.forEach(ln => {
      const tool = TOOLS.find(t => t.id === ln.type) || TOOLS[0];
      ctx.strokeStyle = tool.color;
      ctx.lineWidth = ln.type === 'scenery' ? 2 : 4.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(ln.x1, ln.y1);
      ctx.lineTo(ln.x2, ln.y2);
      ctx.stroke();

      if (ln.type === 'boost') {
        const mx = (ln.x1 + ln.x2) / 2;
        const my = (ln.y1 + ln.y2) / 2;
        const ang = Math.atan2(ln.y2 - ln.y1, ln.x2 - ln.x1);
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(ang);
        ctx.fillStyle = '#ffd60a';
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(-4, -5);
        ctx.lineTo(-4, 5);
        ctx.fill();
        ctx.restore();
      }
    });

    // Draw Stunt Stars
    stars.forEach(st => {
      if (st.collected) return;
      ctx.fillStyle = '#ffd60a';
      ctx.beginPath();
      ctx.arc(st.x, st.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Draw Flowing Red Scarf
    if (rider.scarf.length > 1) {
      ctx.strokeStyle = '#ff2a85';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      rider.scarf.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }

    // Draw Sledder & Sled
    ctx.save();
    ctx.translate(rider.x, rider.y);
    ctx.rotate(rider.angle);

    // Sled runners
    ctx.strokeStyle = '#ffd60a';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-14, 8);
    ctx.lineTo(14, 8);
    ctx.quadraticCurveTo(20, 8, 22, 2);
    ctx.stroke();

    // Stickman Rider Body
    ctx.strokeStyle = rider.crashed ? '#ef4444' : '#ffffff';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.arc(0, -14, 5.5, 0, Math.PI * 2);
    ctx.moveTo(0, -8);
    ctx.lineTo(-4, 4);
    ctx.lineTo(9, 7);
    ctx.moveTo(-2, -4);
    ctx.lineTo(10, 0);
    ctx.stroke();
    ctx.restore();

    ctx.restore();

    // ========================================================================
    // TOP STUDIO TOOLBAR
    // ========================================================================
    ctx.fillStyle = 'rgba(8, 12, 24, 0.92)';
    ctx.fillRect(0, 0, W, 44);

    const toolW = 76;
    TOOLS.forEach((t, idx) => {
      const tx = 8 + idx * toolW;
      const active = selectedTool === t.id;
      ctx.fillStyle = active ? t.color : '#162038';
      ctx.fillRect(tx, 7, toolW - 4, 30);
      ctx.fillStyle = active ? '#04101c' : t.color;
      ctx.font = 'bold 9.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(t.label, tx + (toolW - 4) / 2, 26);
    });

    // Play / Edit Toggle Button
    ctx.fillStyle = isRiding ? '#ff2a85' : '#00e676';
    ctx.fillRect(472, 7, 94, 30);
    ctx.fillStyle = '#04121f';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(isRiding ? '⏹ EDIT (SPC)' : '▶ RIDE (SPC)', 519, 26);

    // Undo Button
    ctx.fillStyle = '#283556';
    ctx.fillRect(570, 7, 55, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('↶ UNDO', 597, 26);

    // Preset / Clear Track Button
    ctx.fillStyle = '#0077ff';
    ctx.fillRect(630, 7, 122, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('↻ TRACK PRESET', 691, 26);

    // Bottom Status Strip
    ctx.fillStyle = 'rgba(8, 12, 24, 0.82)';
    ctx.fillRect(0, H - 32, W, 32);
    ctx.fillStyle = '#ffd60a';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    const spd = Math.round(Math.hypot(rider.vx, rider.vy) * 10);
    ctx.fillText(
      `STUNT SCORE: ${stuntScore}   |   FLIPS: ${rider.flips}   |   SPEED: ${spd} mph`,
      14,
      H - 11
    );
    ctx.fillStyle = '#9eb0d2';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(
      isRiding ? 'A / D: Flip in Air  |  SPACE: Back to Editor' : 'Click & Drag to Draw Track  |  WASD: Pan Camera',
      W - 14,
      H - 11
    );

    if (rider.crashed) {
      ctx.fillStyle = 'rgba(5, 8, 18, 0.88)';
      ctx.fillRect(220, 175, 320, 125);
      ctx.strokeStyle = '#ff2a85';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(220, 175, 320, 125);
      ctx.fillStyle = '#ff2a85';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WIPEOUT!', 380, 218);
      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`Stunt Score: ${stuntScore} (Flips: ${rider.flips})`, 380, 248);
      ctx.fillStyle = '#00e676';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText('PRESS SPACE TO EDIT OR R TO RETRY', 380, 278);
    }

    animId = requestAnimationFrame(loop);
  };

  loop();

  return () => {
    if (animId) cancelAnimationFrame(animId);
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
}

