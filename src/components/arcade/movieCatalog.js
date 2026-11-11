// ============================================================================
// 8-BIT BLOCKBUSTER MOVIES: CURATED CATALOG & PAINTERLY PIXEL POSTER ART
// Inspired by Miyazaki color theory, Celeste, Hollow Knight, Noita & Gungeon
// ============================================================================

export const QUICK_MOVIE_PICKS = [
  'Jaws',
  'The Goonies',
  'Indiana Jones',
  'Star Wars',
  'Dune',
  'Jurassic Park',
  'Back to the Future',
  'The Matrix'
];

export function generateMovieConfig(rawTitle) {
  const cleanTitle = (rawTitle || 'Jaws').trim();
  const lower = cleanTitle.toLowerCase();

  // 1. JAWS (1975)
  if (lower.includes('jaws')) {
    return {
      id: 'Jaws',
      title: 'JAWS',
      year: '1975',
      genre: 'MOONLIT ORCA HULL DEFENSE',
      mode: 'JAWS_BOAT',
      palette: {
        skyTop: '#0b132b',
        skyBot: '#1c2541',
        seaTop: '#1d3557',
        seaBot: '#081021',
        foam: '#a8dadc',
        accent: '#ffbe0b',
        danger: '#e63946'
      },
      tagline: '"YOU\'RE GONNA NEED A BIGGER BOAT."',
      motivation: 'Bruce stalks the Orca beneath the moonlit waves! Patch splintered hull leaks [E], harpoon 3 Yellow Barrels [SPACE/Click] onto his back, then toss the O2 Tank [E] into his jaws and shoot it!',
      controlsHint: '[A/D] Run Deck  |  [E] Patch Leak / Toss O2 Tank  |  [Click/SPACE] Fire Harpoon & Rifle',
      hero: { name: 'CHIEF BRODY', color: '#4cc9f0', hat: '#ffbe0b' },
      enemy: { name: 'BRUCE (GREAT WHITE)', color: '#5c677d' },
      npc: {
        name: 'QUINT',
        lines: [
          'He is ramming the planking from below! Press [E] over deck leaks and harpoon 3 barrels into him!',
          'Three barrels on him and he is lunging at the stern! Grab the red O2 tank [E] and toss it in his jaws!',
          'Smile, you son of a— SHOOT THE O2 TANK IN HIS MOUTH [SPACE / CLICK]!'
        ]
      }
    };
  }

  // 2. THE GOONIES (1985)
  if (lower.includes('goonies')) {
    return {
      id: 'The Goonies',
      title: 'THE GOONIES',
      year: '1985',
      genre: 'CAVERN ORGAN & PIRATE LAGOON',
      mode: 'GOONIES_CAVERN',
      palette: {
        skyTop: '#10002b',
        skyBot: '#240046',
        seaTop: '#00b4d8',
        seaBot: '#03045e',
        foam: '#90e0ef',
        accent: '#ffd166',
        danger: '#ff006e'
      },
      tagline: '"GOONIES NEVER SAY DIE!"',
      motivation: 'Explore One-Eyed Willy\'s bioluminescent cavern! Dodge falling stalactites & Fratelli traps, play the glowing notes on the Bone Organ [SPACE/E] to lower the drawbridge, and reach the Pirate Ship Inferno!',
      controlsHint: '[W/A/S/D] Explore Cavern  |  [SPACE / E] Strike Lit Bone Organ Note & Grab Doubloons',
      hero: { name: 'MIKEY & DATA', color: '#ffd166', hat: '#ef476f' },
      enemy: { name: 'CAVERN BOOBY-TRAPS', color: '#7209b7' },
      npc: {
        name: 'CHUNK & DATA',
        lines: [
          'Look at the bioluminescent lagoon! Stand in front of the glowing Bone Organ pipe and press [SPACE]!',
          'Watch out for falling cavern stalactites! If we miss a note, the floor crumbles!',
          'The drawbridge is down! Swim to One-Eyed Willy\'s ship, the Inferno, at the top grotto!'
        ]
      }
    };
  }

  // 3. INDIANA JONES (1981)
  if (lower.includes('indiana')) {
    return {
      id: 'Indiana Jones',
      title: 'INDIANA JONES',
      year: '1981',
      genre: 'TEMPLE IDOL SWAP & BOULDER RUN',
      mode: 'INDY_TEMPLE',
      palette: {
        skyTop: '#14110f',
        skyBot: '#29221e',
        seaTop: '#52b788',
        seaBot: '#1b4332',
        foam: '#ffd166',
        accent: '#ffb703',
        danger: '#e63946'
      },
      tagline: '"THROW ME THE IDOL, I\'LL THROW YOU THE WHIP!"',
      motivation: 'Cross the torchlit Chachapoyan temple stepping only on Gold Sun tiles, whip-swing the spike chasm [SPACE], pour the exact Sandbag Weight [Hold E] at the altar, and outrun the Giant Boulder!',
      controlsHint: '[W/A/S/D] Move  |  [SPACE] Crack Whip Across Chasm  |  [Hold E] Pour Sandbag Weight',
      hero: { name: 'INDIANA JONES', color: '#d4a373', hat: '#7f4f24' },
      enemy: { name: 'GIANT MOSS BOULDER', color: '#6c757d' },
      npc: {
        name: 'SALLAH',
        lines: [
          'The penitent man is careful! Step ONLY on the glowing Sun stones and whip-swing the chasm [SPACE]!',
          'At the Golden Idol altar, HOLD [E] and release when the sand weight needle hits the emerald zone!',
          'THE TEMPLE IS COLLAPSING! SPRINT DOWNWARD [S] & WHIP THE CHASM BEFORE THE BOULDER CRUSHES YOU!'
        ]
      }
    };
  }

  // 4. STAR WARS (1977)
  if (lower.includes('star wars')) {
    return {
      id: 'Star Wars',
      title: 'STAR WARS',
      year: '1977',
      genre: '3D DEATH STAR TRENCH RUN',
      mode: 'STAR_WARS_TRENCH',
      palette: {
        skyTop: '#050510',
        skyBot: '#0f1026',
        seaTop: '#4361ee',
        seaBot: '#3a0ca3',
        foam: '#4cc9f0',
        accent: '#06d6a0',
        danger: '#ff006e'
      },
      tagline: '"USE THE FORCE, LUKE. LET GO!"',
      motivation: 'Pilot Red Five down the 3D Death Star Trench! Weave through glowing deflector barriers, blast TIE Fighters with quad lasers [SPACE/Click], and fire Proton Torpedoes [E] into the Exhaust Port!',
      controlsHint: '[W/A/S/D] Fly X-Wing in 3D Trench  |  [SPACE/Click] Quad Lasers  |  [E] Fire Proton Torpedo',
      hero: { name: 'LUKE SKYWALKER', color: '#fb8500', hat: '#f8f9fa' },
      enemy: { name: 'DARTH VADER TIE', color: '#ff006e' },
      npc: {
        name: 'OBI-WAN KENOBI',
        lines: [
          'Stay low in the trench, Luke! Weave left and right [A/D] around the crimson deflector walls!',
          'TIE Fighters incoming! Clear your flight path with quad lasers [SPACE / CLICK]!',
          'The 2-meter Thermal Exhaust Port is locked dead ahead! Aim into the glowing core and press [E]!'
        ]
      }
    };
  }

  // 5. DUNE (2021 / 2024)
  if (lower.includes('dune')) {
    return {
      id: 'Dune',
      title: 'DUNE: ARRAKIS',
      year: '2024',
      genre: 'SANDWALK, THUMPERS & SHAI-HULUD',
      mode: 'DUNE_SANDWORM',
      palette: {
        skyTop: '#1d1e2c',
        skyBot: '#3d405b',
        seaTop: '#e07a5f',
        seaBot: '#9c4127',
        foam: '#f2cc8f',
        accent: '#00b4d8',
        danger: '#e63946'
      },
      tagline: '"WALK WITHOUT RHYTHM, AND YOU WON\'T ATTRACT THE WORM."',
      motivation: 'Cross the shimmering Spice dunes to plant 3 Fremen Thumpers [E]! Pause walking when your Rhythm Tremor gauge spikes so Shai-Hulud doesn\'t swallow you, then mount the Giant Sandworm [SPACE]!',
      controlsHint: '[W/A/S/D] Sandwalk (Pause to lower Tremor!)  |  [E] Plant Thumper  |  [SPACE] Mount Sandworm',
      hero: { name: 'PAUL ATREIDES', color: '#00b4d8', hat: '#3d405b' },
      enemy: { name: 'SHAI-HULUD (SANDWORM)', color: '#e07a5f' },
      npc: {
        name: 'STILGAR & CHANI',
        lines: [
          'Walk without rhythm, Usul! If your Tremor Bar turns red, STOP MOVING until the sand settles!',
          'Activate all 3 Fremen Thumpers [E] in the spice fields to summon the Grandfather Worm!',
          'Shai-Hulud rises! Run to its head and press [SPACE] to plant your Maker Hooks and ride the Worm!'
        ]
      }
    };
  }

  // 6. JURASSIC PARK (1993)
  if (lower.includes('jurassic')) {
    return {
      id: 'Jurassic Park',
      title: 'JURASSIC PARK',
      year: '1993',
      genre: 'RAINSTORM T-REX VISION STEALTH',
      mode: 'JURASSIC_STEALTH',
      palette: {
        skyTop: '#081c15',
        skyBot: '#1b4332',
        seaTop: '#2d6a4f',
        seaBot: '#081c15',
        foam: '#74c69d',
        accent: '#ffd166',
        danger: '#ef233c'
      },
      tagline: '"DON\'T MOVE! HE CAN\'T SEE US IF WE DON\'T MOVE!"',
      motivation: 'Sneak through the midnight rainstorm to prime 3 Fence Breakers [Hold E]. When the T-Rex sweeps its amber vision cone over you, STAND COMPLETELY STILL or toss a Red Flare [SPACE] to lure it away!',
      controlsHint: '[W/A/S/D] Sneak (FREEZE in T-Rex cone!)  |  [SPACE/Click] Throw Red Flare  |  [Hold E] Prime Breaker',
      hero: { name: 'DR. ALAN GRANT', color: '#4cc9f0', hat: '#d4a373' },
      enemy: { name: 'REXIE (T-REX)', color: '#52b788' },
      npc: {
        name: 'DR. IAN MALCOLM',
        lines: [
          'Watch the water-cup ripples! When the T-Rex vision cone sweeps over you, FREEZE STILL!',
          'Press [SPACE] or [CLICK] to throw a glowing Red Road Flare and lure the T-Rex across the paddock!',
          'All 3 Perimeter Fence Breakers are online! Get back to the Tour Jeep to escape!'
        ]
      }
    };
  }

  // 7. BACK TO THE FUTURE (1985)
  if (lower.includes('future')) {
    return {
      id: 'Back to the Future',
      title: 'BACK TO THE FUTURE',
      year: '1985',
      genre: '3D CLOCKTOWER 88 MPH SPRINT',
      mode: 'BTTF_88MPH',
      palette: {
        skyTop: '#10002b',
        skyBot: '#240046',
        seaTop: '#3c096c',
        seaBot: '#10002b',
        foam: '#00f5d4',
        accent: '#ff9e00',
        danger: '#ff0055'
      },
      tagline: '"WHEN THIS BABY HITS 88 MPH... YOU\'RE GONNA SEE SOME SERIOUS SPARKS."',
      motivation: 'Race the DeLorean down 1955 Hill Valley Main Street! Shift 5 manual gears [SPACE] in the emerald RPM zone, hit blue 1.21-Gigawatt lightning strips, and hit 88.0 MPH at the Clocktower wire!',
      controlsHint: '[W / UP] Gas  |  [A / D] Steer 3D Street  |  [SPACE] Shift Gear in Green RPM Zone',
      hero: { name: 'MARTY McFLY', color: '#ff0055', hat: '#00f5d4' },
      enemy: { name: '10:04 PM DEADLINE', color: '#ff9e00' },
      npc: {
        name: 'DOC BROWN',
        lines: [
          'Hold [W] to accelerate and press [SPACE] whenever the RPM bar enters the glowing GREEN zone!',
          'Steer [A/D] onto the cyan Flux Lightning arcs to surge toward 88.0 MPH!',
          'The lightning is striking the Clocktower cable right ahead — HIT 88.0 MPH!'
        ]
      }
    };
  }

  // 8. THE MATRIX (1999)
  return {
    id: 'The Matrix',
    title: 'THE MATRIX',
    year: '1999',
    genre: 'BULLET-TIME LIMBO & AWAKENING',
    mode: 'MATRIX_DODGE',
    palette: {
      skyTop: '#030906',
      skyBot: '#081c15',
      seaTop: '#1b4332',
      seaBot: '#030906',
      foam: '#52b788',
      accent: '#74c69d',
      danger: '#ff006e'
    },
    tagline: '"FREE YOUR MIND... DODGE THIS."',
    motivation: 'Hold [SPACE] to bend time into Bullet-Time Limbo! Weave Neo closely past 360° shockwave bullets to fill your BELIEF meter, then press [E/Click] to freeze bullets mid-air and launch them back!',
    controlsHint: '[W/A/S/D] Weave Neo  |  [Hold SPACE] Bullet-Time Limbo  |  [E / Click] Stop & Reflect Bullets',
    hero: { name: 'NEO (THE ONE)', color: '#52b788', hat: '#081c15' },
    enemy: { name: 'AGENT SMITH', color: '#74c69d' },
    npc: {
      name: 'MORPHEUS & TRINITY',
      lines: [
        'Hold [SPACE] to enter Bullet-Time! Graze incoming bullets closely to awaken your BELIEF!',
        'You move like they do! Keep weaving through the bullet rings!',
        'He is The One! Press [E] or [CLICK] to STOP all bullets in mid-air and send them back!'
      ]
    }
  };
}

// ============================================================================
// PAINTERLY 8-BIT CARTRIDGE POSTER ART (Miyazaki / Celeste / Hollow Knight style)
// ============================================================================
export function drawLoadingPosterArt(ctx, movie, cx, cy, w, h, frame) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(cx, cy, w, h);
  ctx.clip();

  const skyGrad = ctx.createLinearGradient(cx, cy, cx, cy + h);
  skyGrad.addColorStop(0, movie.palette.skyTop);
  skyGrad.addColorStop(0.55, movie.palette.skyBot);
  skyGrad.addColorStop(1, movie.palette.seaBot);
  ctx.fillStyle = skyGrad;
  ctx.fillRect(cx, cy, w, h);

  // Soft volumetric glow behind focal point
  const glow = ctx.createRadialGradient(cx + w * 0.5, cy + h * 0.42, 4, cx + w * 0.5, cy + h * 0.42, w * 0.48);
  glow.addColorStop(0, movie.palette.accent + '66');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(cx, cy, w, h);

  if (movie.mode === 'JAWS_BOAT') {
    // Moon & Moonlit Sea
    ctx.fillStyle = '#fefae0';
    ctx.beginPath();
    ctx.arc(cx + w * 0.5, cy + 28, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(cx, cy + 52, w, h - 52);
    // Orca Silhouette
    ctx.fillStyle = '#1b263b';
    ctx.fillRect(cx + w * 0.34, cy + 42, w * 0.32, 10);
    ctx.fillStyle = '#ffbe0b';
    ctx.fillRect(cx + w * 0.44, cy + 44, 6, 4);
    // Colossal Shark Rising
    const sy = cy + 78 + Math.sin(frame * 0.07) * 5;
    ctx.fillStyle = '#415a77';
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.5, sy - 20);
    ctx.lineTo(cx + w * 0.3, sy + 42);
    ctx.lineTo(cx + w * 0.7, sy + 42);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#e63946';
    ctx.fillRect(cx + w * 0.41, sy, w * 0.18, 12);
  } else if (movie.mode === 'GOONIES_CAVERN') {
    // Bioluminescent Stalactites & Pirate Ship Inferno silhouette
    ctx.fillStyle = '#4cc9f0';
    for (let i = 0; i < 7; i++) {
      ctx.fillRect(cx + 18 + i * 28, cy, 8, 18 + (i % 3) * 10);
    }
    ctx.fillStyle = '#ffd166';
    ctx.fillRect(cx + w * 0.32, cy + h * 0.52, w * 0.36, 16);
    ctx.fillRect(cx + w * 0.48, cy + h * 0.24, 4, 38);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(cx + w * 0.4, cy + h * 0.28, 28, 18);
  } else if (movie.mode === 'INDY_TEMPLE') {
    // Golden Idol & Torchlight
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.arc(cx + w * 0.5, cy + h * 0.5, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#52b788';
    ctx.fillRect(cx + 16, cy + h - 24, w - 32, 10);
  } else if (movie.mode === 'DUNE_SANDWORM') {
    // Twin Moons & Colossal Sandworm Mouth
    ctx.fillStyle = '#f2cc8f';
    ctx.beginPath();
    ctx.arc(cx + 42, cy + 28, 10, 0, Math.PI * 2);
    ctx.arc(cx + 68, cy + 40, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e07a5f';
    ctx.beginPath();
    ctx.arc(cx + w * 0.5, cy + h * 0.62, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1d1e2c';
    ctx.beginPath();
    ctx.arc(cx + w * 0.5, cy + h * 0.62, 18, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Starfield / Matrix / BTTF / Jurassic emblem
    for (let i = 0; i < 16; i++) {
      ctx.fillStyle = i % 2 === 0 ? movie.palette.foam : movie.palette.accent;
      ctx.fillRect(cx + ((i * 37 + frame) % w), cy + ((i * 23) % h), 3, 3);
    }
  }

  ctx.strokeStyle = movie.palette.accent;
  ctx.lineWidth = 2;
  ctx.strokeRect(cx + 1, cy + 1, w - 2, h - 2);
  ctx.restore();
}
