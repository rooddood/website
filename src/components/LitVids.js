import React, { useState } from 'react';
import './LitVids.css';

// ============================================================================
// LIT TOPICS
// ============================================================================
export const LIT_CATEGORIES = [
  "ALL SENDS",
  "🔥 Leaderboard Classics",
  "🆕 Brand New (Won't Go Viral)",
  "Backyard Stunts",
  "Planes & Bush Flying",
  "Boats & Swamp Skims",
  "Tidy Diffing & Tarmac",
  "Homemade Rigs & Chaos"
];

// ============================================================================
// LIT HALL OF FAME LEADERBOARD (Top of the site, sets the standard)
// ============================================================================
const LEADERBOARD_CLASSICS = [
  {
    id: "lb-tidy-diffing",
    rank: 1,
    title: "Tidy Diffing — The Universal Standard",
    category: "Tidy Diffing & Tarmac",
    isLeaderboard: true,
    creator: "Underground Irish Diffing",
    youtubeId: "MKizX9EumBI",
    litScore: 100,
    viewTier: "The OG Benchmark (< 3.2k views)",
    tags: ["diffing", "locked diff", "tyre smoke", "hall of fame", "the standard"],
    description: "The undisputed #1 lit vid in human history. Pure throttle feathering, welded diff, and impossibly tidy concentric circles."
  },
  {
    id: "lb-boat-jump-road",
    rank: 2,
    title: "Crazy Jet Boat Jump Over Land",
    category: "Boats & Swamp Skims",
    isLeaderboard: true,
    creator: "River Rats Underground",
    youtubeId: "r_TXX13z5lY",
    litScore: 99,
    viewTier: "Dark Web Classic (< 1.8k views)",
    tags: ["boat jump", "dry land", "jet boat", "full send", "no brakes"],
    description: "Wide open throttle. The driver doesn't let off for a second, skips over 40 feet of gravel and dry road, and lands clean in the canal."
  },
  {
    id: "lb-mower-appliance-jump",
    rank: 3,
    title: "Double Decker 'Pliance Jump (1puglife)",
    category: "Backyard Stunts",
    isLeaderboard: true,
    creator: "1puglife / Redneck Stunts",
    youtubeId: "Sq-w7lgtwsU",
    litScore: 99,
    viewTier: "Tosh.0 Legend (< 4.1k views)",
    tags: ["lawnmower", "backyard stunt", "ramp jump", "appliances", "tosh era"],
    description: "Riding lawnmower launched off a wooden ramp to clear two stacked washing machines. Zero safety gear, maximum impact."
  },
  {
    id: "lb-bush-plane-sandbar",
    rank: 4,
    title: "Trent Palmer Sandbar Riverbed Touchdown",
    category: "Planes & Bush Flying",
    isLeaderboard: true,
    creator: "Trenton Palmer",
    youtubeId: "dyFSBygUfjo",
    litScore: 98,
    viewTier: "Underground Aviation (< 2.9k views)",
    tags: ["bush plane", "river landing", "sandbar", "short takeoff", "alaska"],
    description: "Oversized tundra tires skipping across river rapids to stop on a postage-stamp sandbar with zero runway room."
  },
  {
    id: "lb-mud-boat-levee",
    rank: 5,
    title: "Mud Boat Full Throttle Levee Jump",
    category: "Boats & Swamp Skims",
    isLeaderboard: true,
    creator: "Cajun Swamp Senders",
    youtubeId: "WISzTyXttzM",
    litScore: 98,
    viewTier: "Cult Classic (< 2.2k views)",
    tags: ["mud boat", "levee jump", "swamp run", "airborne", "hall of fame"],
    description: "Longtail mud boat hitting a 6-foot dirt levee wide open, launching 30 feet through the air into the bayou."
  }
];

// ============================================================================
// BASELINE CATALOG (In the cut, Tosh.0 / dark web style crazy stuff)
// ============================================================================
const BASELINE_VIDEOS = [
  // =========================================================================
  // 🆕 Brand New (Won't Go Viral) - strictly ordered by just-posted recency
  // =========================================================================
  {
    id: "fresh-cone-diffing",
    title: "King of the Cone 2023 — Irish AE86 Diffing",
    category: "🆕 Brand New (Won't Go Viral)",
    secondaryCategory: "Tidy Diffing & Tarmac",
    uploadedTime: "Just Posted (4 mins ago)",
    postedMinutesAgo: 4,
    creator: "Mart Ground Senders",
    youtubeId: "mmL2LNbCxmE",
    litScore: 97,
    viewTier: "In The Cut: 42 views (won't go viral)",
    tags: ["ae86", "diffing", "king of the cone", "twincam", "brand new"],
    description: "Freshly uploaded raw clip from a rural cattle mart. Screaming 4A-GE rev limiter, welded diff, and absolutely zero view momentum."
  },
  {
    id: "fresh-beaver-dam-boat",
    title: "Mud Motor Beaver Dam Jumping Duck Boat",
    category: "🆕 Brand New (Won't Go Viral)",
    secondaryCategory: "Boats & Swamp Skims",
    uploadedTime: "23 mins ago",
    postedMinutesAgo: 23,
    creator: "Swamp Runner Outlaws",
    youtubeId: "o9VZrpUHQZs",
    litScore: 97,
    viewTier: "In The Cut: 89 views (won't go viral)",
    tags: ["mud motor", "beaver dam", "boat jump", "brand new", "backwater"],
    description: "Surface drive mud rig jumping right over a wooden beaver dam at full throttle with zero hesitation."
  },
  {
    id: "fresh-mower-wedge-jump",
    title: "Backyard Lawnmower Ramp Jump",
    category: "🆕 Brand New (Won't Go Viral)",
    secondaryCategory: "Backyard Stunts",
    uploadedTime: "1 hour ago",
    postedMinutesAgo: 60,
    creator: "Plywood Stunt Crew",
    youtubeId: "-uAh-3ZT3Zs",
    litScore: 96,
    viewTier: "In The Cut: 114 views (won't go viral)",
    tags: ["lawnmower", "ramp jump", "backyard stunt", "brand new"],
    description: "Homemade 2x4 wedge ramp in a suburban backyard. Snapper lawnmower hitting it pinned and flat landing in the grass."
  },
  {
    id: "fresh-stol-70ft",
    title: "70-Foot STOL Takeoff in High Country Cub",
    category: "🆕 Brand New (Won't Go Viral)",
    secondaryCategory: "Planes & Bush Flying",
    uploadedTime: "3 hours ago",
    postedMinutesAgo: 180,
    creator: "Backcountry Bush Aviation",
    youtubeId: "ejbu5-gWVMA",
    litScore: 96,
    viewTier: "In The Cut: 210 views (won't go viral)",
    tags: ["bush plane", "stol takeoff", "alaska", "brand new", "cub"],
    description: "Self-built High Country Cub lifting off the ground in just 70 feet of rough gravel against a headwind."
  },
  {
    id: "fresh-mower-rollover",
    title: "Modified Lawn Mower Race Crash & Rollover",
    category: "🆕 Brand New (Won't Go Viral)",
    secondaryCategory: "Backyard Stunts",
    uploadedTime: "7 hours ago",
    postedMinutesAgo: 420,
    creator: "Mud Track Racers",
    youtubeId: "4FwmAClekjw",
    litScore: 95,
    viewTier: "In The Cut: 320 views (won't go viral)",
    tags: ["mower race", "rollover", "mud race", "backyard", "brand new"],
    description: "Twin Briggs racing mower clipping an earthen berm at speed and tumbling end-over-end into the mud."
  },
  {
    id: "fresh-sled-ramp",
    title: "Parking Lot Snow Sled Mega Ramp Launch",
    category: "🆕 Brand New (Won't Go Viral)",
    secondaryCategory: "Backyard Stunts",
    uploadedTime: "Yesterday",
    postedMinutesAgo: 1440,
    creator: "Northern Shenanigans",
    youtubeId: "5KFBSvumbqw",
    litScore: 95,
    viewTier: "In The Cut: 490 views (won't go viral)",
    tags: ["sled ramp", "snow jump", "backyard stunt", "brand new"],
    description: "Plowing a snowbank into a 15-foot kicker in an empty commercial parking lot. Complete airborne ragdoll."
  },

  // =========================================================================
  // Backyard Stunts (Tosh.0 / dark web crazy stuff)
  // =========================================================================
  {
    id: "by-mower-appliance",
    title: "Double Decker 'Pliance Jump (1puglife)",
    category: "Backyard Stunts",
    creator: "1puglife",
    youtubeId: "Sq-w7lgtwsU",
    litScore: 99,
    viewTier: "Tosh Classic (< 4.1k views)",
    tags: ["lawnmower", "ramp jump", "backyard stunt", "appliances", "1puglife"],
    description: "Backyard lawn mower jump clearing household appliances. Legendary mid-2000s internet stunt culture."
  },
  {
    id: "by-rays-last-jump",
    title: "Ray's Last Jump — 1puglife Backyard Ramp Send",
    category: "Backyard Stunts",
    creator: "1puglife",
    youtubeId: "hny1KcGiyr4",
    litScore: 98,
    viewTier: "Tosh Legend (< 3.8k views)",
    tags: ["backyard stunt", "1puglife", "ramp jump", "full air", "canada"],
    description: "The crew builds a rickety wooden launch ramp into the trees. Ray pedals in at full speed and disappears into orbit."
  },
  {
    id: "by-lawnmower-jump",
    title: "Backyard Lawnmower Ramp Jump",
    category: "Backyard Stunts",
    creator: "Plywood Senders",
    youtubeId: "-uAh-3ZT3Zs",
    litScore: 96,
    viewTier: "In The Cut (< 1.1k views)",
    tags: ["lawnmower", "ramp jump", "backyard stunt", "full send"],
    description: "Zero engineering, maximum throttle. Lawnmower hits a wooden wedge and lands hard on all four tiny wheels."
  },
  {
    id: "by-slip-and-fly",
    title: "Slip and Fly Mega-Ramp Pond Launch",
    category: "Backyard Stunts",
    creator: "Farmyard Flight Club",
    youtubeId: "3wAjpMP5eyo",
    litScore: 97,
    viewTier: "Tosh.0 Era Classic (< 3.9k views)",
    tags: ["slip and slide", "ramp launch", "water jump", "tosh era"],
    description: "Massive plastic slip and slide down a steep hill ending in an 8-foot wooden lip that launches humans 40 feet into a farm pond."
  },
  {
    id: "by-mower-crash",
    title: "Modified Lawn Mower Race Crash & Rollover",
    category: "Backyard Stunts",
    creator: "Smash n Splash Racers",
    youtubeId: "4FwmAClekjw",
    litScore: 95,
    viewTier: "In The Cut (< 2.2k views)",
    tags: ["mower race", "rollover", "mud track", "carnage"],
    description: "Bumping tires at 45 MPH on stripped racing mowers. One clips a rut and violently barrel-rolls into the tire barrier."
  },
  {
    id: "by-sled-ramp",
    title: "Parking Lot Snow Sled Mega Ramp Launch",
    category: "Backyard Stunts",
    creator: "Redneck Winter Games",
    youtubeId: "5KFBSvumbqw",
    litScore: 95,
    viewTier: "In The Cut (< 1.9k views)",
    tags: ["sled ramp", "snow jump", "backyard send", "tosh style"],
    description: "Plastic sled towed at 35 MPH behind a truck into a snow mound ramp in an empty lot. Flying 25 feet through the air."
  },

  // =========================================================================
  // Planes & Bush Flying
  // =========================================================================
  {
    id: "av-trent-sandbar",
    title: "Trent Palmer Riverbed Sandbar Landing",
    category: "Planes & Bush Flying",
    creator: "Trenton Palmer",
    youtubeId: "dyFSBygUfjo",
    litScore: 98,
    viewTier: "Underground Aviation (< 2.9k views)",
    tags: ["bush plane", "sandbar", "riverbed", "crazy pilot", "trent palmer"],
    description: "Skipping giant bush tires through rushing river water before dropping onto a gravel island no longer than a school bus."
  },
  {
    id: "av-smooth-sand",
    title: "Smooth Super Cub River Sandbar Touchdown",
    category: "Planes & Bush Flying",
    creator: "Backcountry Aviators",
    youtubeId: "9K8JV_u_JPQ",
    litScore: 97,
    viewTier: "Underground (< 1.7k views)",
    tags: ["super cub", "sand landing", "bush plane", "alaska"],
    description: "Greasing a touchdown on loose river sand with giant Alaskan bushwheels. Zero margin for error."
  },
  {
    id: "av-valdez-stol",
    title: "98-Foot Valdez STOL Short Takeoff (Alaska)",
    category: "Planes & Bush Flying",
    creator: "Valdez STOL Underground",
    youtubeId: "zdyFNDogliE",
    litScore: 97,
    viewTier: "In The Cut (< 2.4k views)",
    tags: ["stol takeoff", "valdez", "cessna 170b", "short takeoff"],
    description: "1956 Cessna 170B lifting off in under 98 feet of ground roll. The plane climbs almost vertically into the sky."
  },
  {
    id: "av-70ft-cub",
    title: "70-Foot STOL Takeoff in High Country Cub",
    category: "Planes & Bush Flying",
    creator: "Ron Kuzina Bush Aviation",
    youtubeId: "ejbu5-gWVMA",
    litScore: 96,
    viewTier: "In The Cut (< 1.5k views)",
    tags: ["high country cub", "stol", "valdez", "insane pilot"],
    description: "Hand-built High Country Cub taking off in 70 feet flat. The wheels leave the gravel in less than 3 seconds."
  },

  // =========================================================================
  // Boats & Swamp Skims
  // =========================================================================
  {
    id: "bt-road-jump",
    title: "Crazy Jet Boat Jump Over Land",
    category: "Boats & Swamp Skims",
    creator: "River Rats Underground",
    youtubeId: "r_TXX13z5lY",
    litScore: 99,
    viewTier: "Dark Web Classic (< 1.8k views)",
    tags: ["jet boat", "dry land", "boat jump", "full send"],
    description: "Jet boat skips out of the water at 60 MPH, skates across a dry gravel road, and splashes clean into the next creek."
  },
  {
    id: "bt-levee-jump",
    title: "Mud Boat Full Throttle Levee Jump",
    category: "Boats & Swamp Skims",
    creator: "Cajun Swamp Senders",
    youtubeId: "WISzTyXttzM",
    litScore: 98,
    viewTier: "Cult Classic (< 2.2k views)",
    tags: ["mud boat", "levee jump", "swamp run", "airborne"],
    description: "Surface-drive mud boat hitting a steep earthen levee, launching completely airborne, and landing back on plane."
  },
  {
    id: "bt-beaver-dam",
    title: "Mud Motor Beaver Dam Jumping Duck Boat",
    category: "Boats & Swamp Skims",
    creator: "Backwater Outlaws",
    youtubeId: "o9VZrpUHQZs",
    litScore: 97,
    viewTier: "In The Cut (< 1.9k views)",
    tags: ["mud motor", "beaver dam", "boat jump", "bayou"],
    description: "Blasting straight through a 4-foot beaver dam. Wood flying everywhere as the boat slides over the top without slowing down."
  },
  {
    id: "bt-swamp-run",
    title: "Full Throttle Through the Marsh | Swamp Run",
    category: "Boats & Swamp Skims",
    creator: "Marshland Speed Club",
    youtubeId: "jD996vlVFqA",
    litScore: 96,
    viewTier: "Underground (< 2.6k views)",
    tags: ["swamp run", "mud boat", "full throttle", "marsh"],
    description: "Threading a 50 MPH mud boat through twisted marsh channels barely two feet wider than the hull."
  },
  {
    id: "bt-lake-superior-skip",
    title: "Water Skipping Lake Superior on an RS600",
    category: "Boats & Swamp Skims",
    creator: "Great Lakes Water Skippers",
    youtubeId: "_-TM0DHVgKA",
    litScore: 97,
    viewTier: "In The Cut (< 3.1k views)",
    tags: ["water skip", "snowmobile", "lake superior", "paddle track"],
    description: "Skimming a 600cc snowmobile across open water on Lake Superior. If the revs drop below 8,000, it's 200 feet deep."
  },

  // =========================================================================
  // Tidy Diffing & Tarmac
  // =========================================================================
  {
    id: "df-tidy-og",
    title: "Tidy Diffing — The Universal Standard",
    category: "Tidy Diffing & Tarmac",
    creator: "Underground Car Club Ireland",
    youtubeId: "MKizX9EumBI",
    litScore: 100,
    viewTier: "The OG Benchmark (< 3.2k views)",
    tags: ["tidy diffing", "locked diff", "tyre smoke", "precision", "the standard"],
    description: "The universal benchmark that sets the standard for all lit vids. Zero wasted motion, tight donuts, pure tyre smoke."
  },
  {
    id: "df-twincam-wkz",
    title: "Twincam AE86 Diffing Famous WKZ",
    category: "Tidy Diffing & Tarmac",
    creator: "Crossroads Motorsport Ireland",
    youtubeId: "qqHvr3LAEJQ",
    litScore: 98,
    viewTier: "Underground Benchmark (< 2.1k views)",
    tags: ["ae86", "twincam", "wkz", "diffing", "boreen"],
    description: "Famous Irish Toyota Twin Cam diffing outside the crossroads pub. Clean figure eights and full throttle limiter."
  },
  {
    id: "df-king-of-cone",
    title: "King of the Cone 2023 — Irish AE86 Diffing",
    category: "Tidy Diffing & Tarmac",
    creator: "Mart Ground Senders",
    youtubeId: "mmL2LNbCxmE",
    litScore: 97,
    viewTier: "In The Cut (< 1.8k views)",
    tags: ["king of the cone", "ae86", "diffing", "irish motorsport"],
    description: "Competing for King of the Cone in an Irish cattle mart. Door handles inches from concrete pillars in tyre smoke."
  },

  // =========================================================================
  // Homemade Rigs & Chaos
  // =========================================================================
  {
    id: "hm-jet-cart",
    title: "91 MPH Jet-Powered Helicopter Turbine Shopping Cart",
    category: "Homemade Rigs & Chaos",
    creator: "Shed Inventions UK",
    youtubeId: "bQ7VlB4pU0M",
    litScore: 98,
    viewTier: "Cult Classic (< 3.5k views)",
    tags: ["jet engine", "shopping cart", "turbine", "91mph"],
    description: "A helicopter turbine engine bolted to a grocery shopping cart hitting 91 MPH at an abandoned RAF runway."
  },
  {
    id: "hm-twin-mud-boat",
    title: "Homemade Twin-Engine Mud Boat Levee Launcher",
    category: "Homemade Rigs & Chaos",
    creator: "Backwater Fabricators",
    youtubeId: "WISzTyXttzM",
    litScore: 97,
    viewTier: "Underground (< 2.4k views)",
    tags: ["homemade rig", "twin engine", "mud boat", "levee jump"],
    description: "Twin Predator 670cc V-twin engines mounted to a flat bottom jon boat. Built specifically to launch dirt banks."
  },
  {
    id: "hm-racing-mower-flip",
    title: "Twin Briggs & Stratton Racing Mower Rollover",
    category: "Homemade Rigs & Chaos",
    creator: "Backyard Fabrications",
    youtubeId: "4FwmAClekjw",
    litScore: 96,
    viewTier: "In The Cut (< 2.0k views)",
    tags: ["racing mower", "rollover", "custom rig", "carnage"],
    description: "Lawn mower stripped of cutting deck, lowered with direct pulley swap, hitting 50 MPH before flipping."
  }
];

// Curated Discovery YouTube Queries
const DISCOVERY_RADAR = [
  { label: "1puglife Pliance Jump", query: "1puglife pliance jump lawnmower", category: "Backyard Stunts" },
  { label: "Irish Diffing", query: "irish diffing twin cam ae86", category: "Tidy Diffing & Tarmac" },
  { label: "Trent Palmer Sandbar", query: "trent palmer riverbed sandbar landing", category: "Planes & Bush Flying" },
  { label: "Jet Boat Jump", query: "jet boat jumping road land", category: "Boats & Swamp Skims" },
  { label: "Mud Boat Levee Jump", query: "mud boat jumping levee dam", category: "Boats & Swamp Skims" },
  { label: "Valdez STOL Bush Plane", query: "valdez stol shortest takeoff alaska", category: "Planes & Bush Flying" }
];

// Helper to extract clean YouTube ID from any link
const extractYoutubeId = (urlOrId) => {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
};

// ============================================================================
// STRICT LIT VETTING ENGINE (API Simulation)
// Rejects generic pop/mainstream videos, enforces Tosh.0 / dark web crazy criteria
// ============================================================================
const vetLitVidSubmission = ({ urlOrId, title, category, tagsText, creator, description }) => {
  const ytId = extractYoutubeId(urlOrId);
  if (!ytId) {
    return {
      passed: false,
      reason: "Invalid YouTube URL or ID. Please provide a valid YouTube watch/shorts link or 11-character video ID."
    };
  }

  const textToScan = `${title || ''} ${tagsText || ''} ${category || ''} ${creator || ''} ${description || ''}`.toLowerCase();

  // Explicitly reject mainstream pop, podcasts, generic vlogs, and commercial fluff
  const lameTrashKeywords = [
    "taylor swift", "shane gillis", "red bull wrc", "podcast interview", "vlog",
    "makeup", "unboxing", "review", "asmr", "crypto", "pop music", "commercial",
    "cooking recipe", "coding tutorial", "minecraft let's play", "shopping haul",
    "standup special", "talk show", "celebrity gossip"
  ];

  for (const lame of lameTrashKeywords) {
    if (textToScan.includes(lame)) {
      return {
        passed: false,
        reason: `VETTING DENIED (Score: 8/100): Content flagged as "${lame}". Lit Vids strictly rejects mainstream comedy specials, Red Bull corporate media, vlogs, and pop music. We only accept raw backyard stunts, bush planes, boats skipping dry land, and underground diffing!`
      };
    }
  }

  // Required Tosh.0 / Dark Web Stunt & Chaos Keywords
  const litStuntKeywords = [
    "diff", "diffing", "drift", "ramp", "jump", "airborne", "boat", "plane",
    "bush plane", "send", "launch", "burnout", "twincam", "ae86", "skid", "mower",
    "lawnmower", "stunt", "cart", "jet", "swamp", "water skip", "crash", "flying",
    "beater", "backyard", "carnage", "speed", "throttle", "airtime", "tyre smoke",
    "slide", "diy", "rig", "redneck", "tosh"
  ];

  const matched = litStuntKeywords.filter(kw => textToScan.includes(kw));

  if (matched.length === 0 && category === "ALL SENDS") {
    return {
      passed: false,
      reason: "VETTING DENIED (Score: 28/100): No qualifying crazy stunt, vehicular madness, plane, boat, or diffing terms detected. Must be genuine in-the-cut insanity."
    };
  }

  // Calculate Lit Score (91 - 99)
  const base = 91 + Math.min(8, matched.length * 2);
  const hash = ytId.charCodeAt(0) + ytId.charCodeAt(ytId.length - 1);
  const finalLitScore = Math.min(99, base + (hash % 2));

  // In the cut view count tier
  const randomViews = (hash * 41) % 950 + 120;
  const viewTier = `In The Cut (< ${randomViews} views - won't go viral)`;

  return {
    passed: true,
    youtubeId: ytId,
    litScore: finalLitScore,
    viewTier,
    matchedKeywords: matched
  };
};

const LitVids = () => {
  const [passwordInput, setPasswordInput] = useState('');
  // Authentication resets whenever navigating away or reloading (no persistent storage)
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Videos state (Leaderboard + Baseline + Custom submissions from localStorage)
  const [customVideos, setCustomVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('litvids_custom_vault');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("ALL SENDS");
  const [activeTheaterVideo, setActiveTheaterVideo] = useState(null);

  // Vetting Submission Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitUrl, setSubmitUrl] = useState('');
  const [submitTitle, setSubmitTitle] = useState('');
  const [submitCreator, setSubmitCreator] = useState('');
  const [submitCategory, setSubmitCategory] = useState("Backyard Stunts");
  const [submitTags, setSubmitTags] = useState('');
  const [submitDescription, setSubmitDescription] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [vettingResult, setVettingResult] = useState(null);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passwordInput.trim().toLowerCase() === 'tidydiffing') {
      setIsUnlocked(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect password. Access denied.');
    }
  };

  const handleRunVetting = (e) => {
    e.preventDefault();
    setIsScanning(true);
    setVettingResult(null);

    setTimeout(() => {
      const result = vetLitVidSubmission({
        urlOrId: submitUrl,
        title: submitTitle,
        category: submitCategory,
        tagsText: submitTags,
        creator: submitCreator,
        description: submitDescription
      });

      setIsScanning(false);
      setVettingResult(result);

      if (result.passed) {
        const newVid = {
          id: `custom-${Date.now()}-${result.youtubeId}`,
          title: submitTitle.trim() || `Underground Send (${result.youtubeId})`,
          creator: submitCreator.trim() || "Underground Creator",
          category: "🆕 Brand New (Won't Go Viral)",
          secondaryCategory: submitCategory,
          uploadedTime: "Just Posted (Moments ago)",
          postedMinutesAgo: 0,
          youtubeId: result.youtubeId,
          litScore: result.litScore,
          viewTier: result.viewTier,
          tags: submitTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean).concat(["in the cut", "vetted", "brand new"]),
          description: submitDescription.trim() || "Verified by Lit Vetting Engine. Pure in-the-cut crazy stuff that won't go viral."
        };

        const updated = [newVid, ...customVideos];
        setCustomVideos(updated);

        try {
          localStorage.setItem('litvids_custom_vault', JSON.stringify(updated));
        } catch (err) {
          // localStorage error handling
        }

        // Open directly in Theater player
        setActiveTheaterVideo(newVid);
      }
    }, 800);
  };

  // Combine custom submissions + baseline videos
  const allCatalogVideos = [...customVideos, ...BASELINE_VIDEOS];

  // Filter videos for the main catalog
  const filteredCatalog = allCatalogVideos.filter((vid) => {
    // Category filter
    let matchesCategory = true;
    if (selectedCategory === "🔥 Leaderboard Classics") {
      matchesCategory = vid.isLeaderboard === true;
    } else if (selectedCategory === "🆕 Brand New (Won't Go Viral)") {
      matchesCategory = vid.category === "🆕 Brand New (Won't Go Viral)";
    } else if (selectedCategory !== "ALL SENDS") {
      matchesCategory = vid.category === selectedCategory || vid.secondaryCategory === selectedCategory;
    }

    if (!matchesCategory) return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const titleMatch = vid.title.toLowerCase().includes(q);
    const creatorMatch = vid.creator.toLowerCase().includes(q);
    const tagMatch = vid.tags.some(tag => tag.toLowerCase().includes(q));
    const descMatch = vid.description.toLowerCase().includes(q);
    return titleMatch || creatorMatch || tagMatch || descMatch;
  });

  // Strict sorting: "Brand New (Won't Go Viral)" goes strictly by order of just posted items
  if (selectedCategory === "🆕 Brand New (Won't Go Viral)") {
    filteredCatalog.sort((a, b) => (a.postedMinutesAgo ?? 999999) - (b.postedMinutesAgo ?? 999999));
  } else if (selectedCategory === "🔥 Leaderboard Classics") {
    filteredCatalog.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  }

  // If not unlocked, render ONLY the password prompt screen.
  if (!isUnlocked) {
    return (
      <div className="litvids-gate">
        <div className="litvids-gate__card">
          <div className="litvids-gate__badge">Restricted Access</div>
          <h1 className="litvids-gate__title">Lit Vids</h1>
          <p className="litvids-gate__subtitle">
            Enter the password to access Lit Vids.
          </p>

          <form onSubmit={handleUnlock} className="litvids-gate__form">
            <input
              type="password"
              placeholder="Enter password..."
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              className="litvids-gate__input"
              autoFocus
            />
            <button type="submit" className="litvids-gate__submit-btn">
              Unlock
            </button>
          </form>

          {errorMessage && (
            <p className="litvids-gate__error">{errorMessage}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="lit-vids">
      {/* Animated Floating Embers */}
      <div className="ember-particles" aria-hidden="true">
        <span className="ember ember-1"></span>
        <span className="ember ember-2"></span>
        <span className="ember ember-3"></span>
        <span className="ember ember-4"></span>
        <span className="ember ember-5"></span>
      </div>

      {/* Top Header & Branding */}
      <header className="lit-vids-header">
        <div className="flame-icon-row">🔥 🔥 🔥</div>
        <h1 className="lit-title">LIT VIDS</h1>
        <p className="lit-tagline">
          The underground vault of backyard stunts, bush planes, boats jumping dry land, and pure Tosh/dark-web crazy stuff.
        </p>

        <div className="clip-art-box">
          <span className="clip-art-label">Brought to you by</span>
          <div className="clip-art-images">
            <div className="clip-frame">
              <img src={`${process.env.PUBLIC_URL}/images/fieri-sick.PNG`} alt="Guy Fieri" className="clip" />
              <span className="clip-name">Guy</span>
            </div>
            <div className="clip-frame">
              <img src={`${process.env.PUBLIC_URL}/images/travis-fish.jpg`} alt="Travis Spot" className="clip" />
              <span className="clip-name">Travis</span>
            </div>
          </div>
        </div>

        {/* Search Bar & Vetting Button */}
        <div className="lit-controls-row">
          <div className="lit-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search backyard stunts, bush planes, diffing, boats, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lit-search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          <button
            className="submit-lit-btn"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            + Submit / Vet a Lit Vid
          </button>
        </div>

        {/* YouTube Category Filter Chips */}
        <div className="lit-topics-bar" role="tablist">
          {LIT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`topic-chip ${selectedCategory === cat ? 'topic-chip--active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Discovery Radar Presets */}
        <div className="discovery-presets-row">
          <span className="discovery-label">Underground Radar:</span>
          {DISCOVERY_RADAR.map((item) => (
            <button
              key={item.label}
              className="discovery-preset-btn"
              onClick={() => {
                setSearchQuery(item.query);
                setSelectedCategory("ALL SENDS");
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Brand New (Won't Go Viral) Live Notice */}
        {selectedCategory === "🆕 Brand New (Won't Go Viral)" && (
          <div className="brand-new-notice-banner">
            <div className="brand-new-title-row">
              <span className="live-dot-pulse">●</span>
              <strong>IN-THE-CUT FEED: STRICTLY ORDERED BY JUST POSTED</strong>
            </div>
            <p>
              Fresh underground clips sorted strictly by order of when they were posted. Under 500 views, zero viral traction, and won't go viral.
            </p>
          </div>
        )}
      </header>

      {/* Active Theater Spotlight Player (When any video is clicked) */}
      {activeTheaterVideo && (
        <section className="theater-spotlight-container">
          <div className="theater-card">
            <div className="theater-header-bar">
              <div className="theater-title-info">
                {activeTheaterVideo.rank && (
                  <span className="theater-rank-badge">RANK #{activeTheaterVideo.rank}</span>
                )}
                <span className="theater-badge">{activeTheaterVideo.category}</span>
                <span className="theater-score">{activeTheaterVideo.litScore}% LIT 🔥</span>
                <span className="theater-views">{activeTheaterVideo.viewTier}</span>
              </div>
              <button
                className="theater-close-btn"
                onClick={() => setActiveTheaterVideo(null)}
                title="Close Player"
              >
                ✕ Close Player
              </button>
            </div>

            <div className="theater-frame-box">
              <iframe
                src={`https://www.youtube.com/embed/${activeTheaterVideo.youtubeId}?autoplay=1`}
                title={activeTheaterVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="theater-iframe"
              ></iframe>
            </div>

            <div className="theater-footer">
              <div className="theater-main-text">
                <h2>{activeTheaterVideo.title}</h2>
                <p className="theater-creator">Source / Driver: <strong>{activeTheaterVideo.creator}</strong></p>
                <p className="theater-desc">{activeTheaterVideo.description}</p>
                <div className="theater-tags">
                  {activeTheaterVideo.tags.map(t => (
                    <span
                      key={t}
                      className="theater-tag-chip"
                      onClick={() => setSearchQuery(t)}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${activeTheaterVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="theater-yt-btn"
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 1: THE LIT LEADERBOARD (Hall of Fame Classics at the top)
          Sets the universal standard for what a Lit Vid is.
          ===================================================================== */}
      {(selectedCategory === "ALL SENDS" || selectedCategory === "🔥 Leaderboard Classics") && !searchQuery && (
        <section className="leaderboard-section">
          <div className="leaderboard-header">
            <div className="leaderboard-title-group">
              <span className="trophy-icon">🏆</span>
              <h2>The Lit Leaderboard: Hall of Fame Classics</h2>
            </div>
            <p className="leaderboard-subhead">
              The foundational underground sends that set the universal standard for Lit Vids.
            </p>
          </div>

          <div className="leaderboard-grid">
            {LEADERBOARD_CLASSICS.map((item) => (
              <article
                key={item.id}
                className="leaderboard-card"
                onClick={() => setActiveTheaterVideo(item)}
              >
                <div className="leaderboard-rank-tag">
                  <span className="rank-num">#{item.rank}</span>
                  <span className="rank-score">{item.litScore}% LIT</span>
                </div>

                <div className="leaderboard-thumb-box">
                  <img
                    src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    alt={item.title}
                    className="leaderboard-thumb-img"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${item.youtubeId}/0.jpg`;
                    }}
                  />
                  <div className="yt-card-play-overlay">
                    <span className="play-triangle">▶</span>
                  </div>
                </div>

                <div className="leaderboard-card-info">
                  <span className="leaderboard-cat-badge">{item.category}</span>
                  <h3 className="leaderboard-card-title">{item.title}</h3>
                  <span className="leaderboard-creator">{item.creator}</span>
                  <p className="leaderboard-desc">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 2: ALL CATALOG SENDS (YouTube Multi-Line Grid)
          Includes Brand New (won't go viral), Backyard Stunts, Planes, Boats, etc.
          ===================================================================== */}
      <main className="lit-video-section">
        <div className="grid-header-meta">
          <span className="results-count">
            {selectedCategory === "ALL SENDS" ? "Catalog Sends:" : selectedCategory} ({filteredCatalog.length} clips)
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
          <span className="in-cut-label">
            Underground only • No corporate Red Bull • No mainstream specials
          </span>
        </div>

        {filteredCatalog.length === 0 ? (
          <div className="no-videos-box">
            <p>No lit vids found matching that filter or search.</p>
            <button
              className="submit-lit-btn"
              onClick={() => {
                setSubmitTitle(searchQuery);
                setIsSubmitModalOpen(true);
              }}
            >
              Submit "{searchQuery}" through Vetting Engine →
            </button>
          </div>
        ) : (
          <div className="youtube-multi-line-grid">
            {filteredCatalog.map((vid) => (
              <article
                key={vid.id}
                className="yt-video-card"
                onClick={() => setActiveTheaterVideo(vid)}
              >
                {/* Thumbnail Box */}
                <div className="yt-card-thumbnail-box">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                    alt={vid.title}
                    className="yt-card-thumbnail-img"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                    }}
                  />
                  <div className="yt-card-play-overlay">
                    <span className="play-triangle">▶</span>
                  </div>
                  <span className="card-lit-score">{vid.litScore}% LIT</span>
                  <span className="card-view-badge">{vid.viewTier}</span>
                  {vid.uploadedTime && (
                    <span className="card-fresh-badge">{vid.uploadedTime}</span>
                  )}
                </div>

                {/* Video Info Strip */}
                <div className="yt-card-meta">
                  <h3 className="yt-card-title">{vid.title}</h3>
                  <div className="yt-card-channel-row">
                    <span className="yt-card-channel">{vid.creator}</span>
                    <span className="yt-card-topic-tag">{vid.category}</span>
                  </div>

                  {/* Clickable Tags */}
                  <div className="yt-card-tags-list">
                    {vid.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        className="tag-pill-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(tag);
                        }}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  <p className="yt-card-desc">{vid.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* =====================================================================
          VETTING & SUBMISSION ENGINE MODAL
          ===================================================================== */}
      {isSubmitModalOpen && (
        <div className="vetting-modal-backdrop" onClick={() => setIsSubmitModalOpen(false)}>
          <div className="vetting-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="vetting-modal-header">
              <div className="vetting-title-group">
                <span className="vetting-scanner-icon">⚡</span>
                <h2>Lit Vid Vetting Engine</h2>
              </div>
              <button
                className="vetting-modal-close-btn"
                onClick={() => setIsSubmitModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <p className="vetting-modal-instructions">
              Every video must pass our <strong>Lit Vid Vetting Criteria</strong>.
              We strictly enforce Tosh.0 / dark-web style crazy stuff (backyard stunts, bush planes, boats hopping dry land, lawnmower sends, diffing).
              <strong> Mainstream comedy specials, corporate Red Bull ads, and generic vlogs are instantly denied.</strong>
            </p>

            <form onSubmit={handleRunVetting} className="vetting-form">
              <div className="form-group">
                <label>YouTube Video Link or ID *</label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=... or shorts URL or video ID"
                  value={submitUrl}
                  onChange={(e) => setSubmitUrl(e.target.value)}
                  required
                  className="vetting-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Stunt / Video Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Lawn Mower Jump Over Appliances"
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                    required
                    className="vetting-input"
                  />
                </div>

                <div className="form-group flex-1">
                  <label>Creator / Driver</label>
                  <input
                    type="text"
                    placeholder="e.g. Backyard Senders"
                    value={submitCreator}
                    onChange={(e) => setSubmitCreator(e.target.value)}
                    className="vetting-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Category</label>
                  <select
                    value={submitCategory}
                    onChange={(e) => setSubmitCategory(e.target.value)}
                    className="vetting-select"
                  >
                    {LIT_CATEGORIES.filter(c => c !== "ALL SENDS" && c !== "🔥 Leaderboard Classics").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Tags (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="backyard stunt, bush plane, boat jump, mower"
                    value={submitTags}
                    onChange={(e) => setSubmitTags(e.target.value)}
                    className="vetting-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Why is this clip lit?</label>
                <textarea
                  rows="2"
                  placeholder="Describe the stunt, speed, landing impact, or vehicular insanity..."
                  value={submitDescription}
                  onChange={(e) => setSubmitDescription(e.target.value)}
                  className="vetting-textarea"
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isScanning}
                  className="run-vetting-btn"
                >
                  {isScanning ? "Running Vetting Algorithm..." : "Run Vetting Engine & Submit 🔥"}
                </button>
              </div>
            </form>

            {/* Vetting Scan Feedback */}
            {isScanning && (
              <div className="vetting-scan-status">
                <div className="scanner-bar"></div>
                <p>Scanning video metrics... Testing against corporate/mainstream pop filters... Checking Tosh/stunt factor...</p>
              </div>
            )}

            {vettingResult && (
              <div className={`vetting-result-box ${vettingResult.passed ? 'vetting-result--approved' : 'vetting-result--denied'}`}>
                {vettingResult.passed ? (
                  <>
                    <div className="result-header">
                      <span className="result-stamp">VETTING PASSED</span>
                      <span className="result-score">Score: {vettingResult.litScore}/100 LIT 🔥</span>
                    </div>
                    <p className="result-detail">
                      <strong>Approved for Lit Vids!</strong> Filed under <em>Brand New (Won't Go Viral)</em> with tag <em>{submitCategory}</em>.
                      {vettingResult.viewTier}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="result-header">
                      <span className="result-stamp result-stamp--denied">DENIED BY VETTING ENGINE</span>
                    </div>
                    <p className="result-detail">{vettingResult.reason}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LitVids;
