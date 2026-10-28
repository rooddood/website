# Kyle Rood Website - AI Assistant Instructions & Architecture Guide

Copy and paste this prompt at the start of any AI coding conversation for this website.

---

## ⛔ CRITICAL RULES & GUARDRAILS (STRICT COMPLIANCE REQUIRED)

1. **NEVER OPEN A BROWSER**:
   - Absolutely **DO NOT** use browser subagents, browser tools, automated browsers, puppeteer, or open web browser windows.
   - Validate code changes through terminal output, builds (`npm run build`), or file inspections only.

2. **NO OVER-COMPLEX OR INVASIVE OPERATIONS**:
   - Do **NOT** perform convoluted refactors, abstract state machines, or unnecessary dependency installations.
   - Keep solutions simple, clean, and maintainable using existing patterns: React functional components, Vanilla CSS, and lightweight Node.js scripts.
   - Do **NOT** inject unexpected scripts, tracking, or invasive build configurations.

3. **PRESERVE SITE IDENTITY & ASSETS**:
   - Maintain the sleek dark mode aesthetic (deep charcoal `#0f0f0f`, accent blue `#3ea6ff`, YouTube red `#cc0000`, Instagram gradients).
   - Preserve all contact info (`kylerood16@gmail.com`), social links (`@sniffyscloset`, LinkedIn), and PDF resume links (`Kyle_Rood_Resume_Whole_2026.pdf`).
   - The app is deployed to **GitHub Pages** with basename `process.env.PUBLIC_URL` (`/website/`).

---

## 📁 MAJOR FILE LOCATIONS & ARCHITECTURE MAP

### 🎬 Video & Production Core
- **`src/components/VideoReel.js` & `src/components/VideoReel.css`**:
  - The **Video Reel** portfolio page (`/reel`) styled like an authentic YouTube channel page.
  - Lands on the **Featured** page by default with category tabs:
    - `Featured`
    - `All`
    - `Don't Tell Comedy` (Montages filmed/edited for Don't Tell Comedy)
    - `Stand Up Sets` (Standup comedy sets, clips, and Instagram comedian features)
    - `My Shorts` (Original short film trailers & comedy shorts from `@sniffyscloset`)
  - Features a clean, single-page theater view with a side playlist queue cycling through:
    1. Don't Tell Comedy DC: Shaw 10/17 (`coVL3Nbr5H8`)
    2. WooWoo The Comedian: AI Muse (`Dex35XQOLSn`)
    3. Dom Grayer: Economy so bad comedy shows are the new Zillow (`DfANYJ8RgUk`)
  - Displays Kyle's actual YouTube channel avatar (`public/youtube_channel_avatar.jpg`) and subtitle "Writer, Director".
  - Strictly tab-driven without unnecessary vertical scrolling.
  - All video tags and badges are positioned cleanly below thumbnails rather than on top of video frames.
  - Supports embedded **YouTube videos** AND **Instagram Reels** with full-screen modal player for widescreen and vertical reels.
  - Automatically merges dynamically synced YouTube uploads from `src/data/youtubeFeed.json`.

- **`src/components/Production.js` & `src/components/Production.css`**:
  - The **Production Services** page (`/production`).
  - Highlights Kyle's filming, editing, color grading, audio recording, and mixing services.
  - 3 main rate cards:
    - **Clip Editing**: $50 / clip (vertical/horizontal standup cuts, custom captions, crowd audio)
    - **Live Filming**: $100 prep + $50 / hr (single-camera 4K handheld stage capture, soundboard line tap)
    - **Hourly Editing**: $50 / hr (post-production for specials, sketches, podcasts)
  - Longform project inquiry box and email click-to-copy handler (`kylerood16@gmail.com`).

- **`scripts/sync-youtube.js`**:
  - Node.js script that queries the official YouTube RSS feed for Kyle's channel `@sniffyscloset` (`UC57nZOIj89ScXvzia7KIZ9g`).
  - Parses video IDs, titles, descriptions, and publish dates, and saves them to `src/data/youtubeFeed.json`.
  - Runs automatically on `npm start`, `npm run build`, and `npm run deploy` via `package.json` hooks (`prestart`, `prebuild`).
  - Can be manually run anytime with `npm run sync-youtube`.

- **`src/data/youtubeFeed.json`**:
  - Auto-generated JSON containing Kyle's latest YouTube videos, synced directly from YouTube RSS.

### 🌐 Navigation & General Pages
- **`src/App.js`**:
  - Primary React Router route definitions (`/`, `/reel`, `/production`, `/writing`, `/blog`, `/resume`, `/freelance`, `/projects`, `/litvids`, `/clothing`, `/cooking`, `/meme`, `/shops`).
  - Wrapped in `<Router basename={process.env.PUBLIC_URL}>`.

- **`src/components/NavBar.js` & `src/components/NavBar.css`**:
  - Sticky top navigation bar with active route highlighting and software dropdown.

- **`src/components/Home.js` & `src/components/Home.css`**:
  - Home landing page (`/`).
  - Full-screen photography carousel pulling photos from `public/images/photography/`.
  - Centered hero text: "Hi, I'm Kyle Rood — Writer, Producer, Developer."
  - Fixed footer with email, LinkedIn, YouTube, Instagram, and Resume download.

- **`src/components/LitVids.js` & `src/components/LitVids.css`**:
  - Curated leaderboard & archive of underground viral stunt, Irish diffing, jet boat, and lawnmower videos.

- **`src/components/Writing.js` & `BlogPost.js`**:
  - Screenplays, comedy writing, essays, and blog entries.

- **`src/components/Resume.js`, `CodingProjects.js`, `Freelance.js`**:
  - Technical engineering resume, software projects, and consulting services.

- **`public/`**:
  - Static assets served directly:
    - `public/woowoo_sniffyscloset_reel.jpg`: Local cover image for WooWoo Instagram reel.
    - `public/domgrayer_sniffyscloset_reel.jpg`: Local cover image for Dom Grayer Instagram reel.
    - `public/Kyle_Rood_Resume_Whole_2026.pdf`: Resume PDF.
    - `public/images/photography/`: Home page background photos.

---

## 🛠️ COMMON WORKFLOWS

### 1. Sync Latest YouTube Videos
Whenever a new video is posted to `@sniffyscloset`:
```bash
npm run sync-youtube
```
This fetches the latest uploads and updates `src/data/youtubeFeed.json`.

### 2. Add an Instagram Reel
To embed a new Instagram reel in `src/components/VideoReel.js`:
```javascript
{
  id: "unique-reel-id",
  title: "Title of Clip",
  platform: "instagram",
  category: "Stand Up Sets", // or "Don't Tell Comedy", etc.
  tag: "Standup Reel",
  format: "9:16 Instagram Reel",
  aspect: "9:16",
  duration: "Reel",
  embedUrl: "https://www.instagram.com/reel/{POST_ID}/embed/",
  externalUrl: "https://www.instagram.com/reel/{POST_ID}/",
  thumbnail: `${process.env.PUBLIC_URL}/path_to_cover.jpg`,
  creator: "Comedian Name feat. @sniffyscloset",
  summary: "Description or quote from the social post."
}
```

### 3. Deploying Changes
Build and deploy to GitHub Pages:
```bash
npm run deploy
```
*(Automatically triggers `predeploy` -> `prebuild` -> `sync-youtube` -> `build` -> `gh-pages`)*.
