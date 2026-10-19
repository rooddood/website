import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoReel.css';

// Kyle's portfolio clips
const MY_REEL_VIDEOS = [
  {
    id: "dont-tell-comedy-sizzle",
    title: "Don't Tell Comedy Sizzle",
    category: "Don't Tell Comedy",
    tag: "Don't Tell Comedy",
    format: "16:9 Comedy Show",
    aspect: "16:9",
    duration: "2:23",
    embedUrl: "https://www.youtube.com/embed/Zez-b3a8DlQ",
    youtubeId: "Zez-b3a8DlQ",
    creator: "Don't Tell Comedy",
    summary: "Live comedy sizzle reel filmed and edited for Don't Tell Comedy with stage lighting exposure and crowd audio mix."
  },
  {
    id: "apocasniff-horizontal",
    title: "APOCASNIFF Trailer",
    category: "My Shorts",
    tag: "Trailer",
    format: "16:9 Widescreen",
    aspect: "16:9",
    duration: "1:00",
    embedUrl: "https://www.youtube.com/embed/eOGEcq8BtVE",
    youtubeId: "eOGEcq8BtVE",
    creator: "@sniffyscloset",
    summary: "Original horizontal widescreen short film trailer with custom sound design, cinematic color, and punchy comedic editing."
  },
  {
    id: "apocasniff-vertical",
    title: "APOCASNIFF Social Trailer",
    category: "My Shorts",
    tag: "Shorts",
    format: "9:16 Vertical Short",
    aspect: "9:16",
    duration: "1:00",
    embedUrl: "https://www.youtube.com/embed/eNlOsJFCqgU",
    youtubeId: "eNlOsJFCqgU",
    creator: "@sniffyscloset",
    summary: "Vertical social trailer cut from @sniffyscloset formatted for social feeds and fast-paced mobile viewing."
  }
];

const REEL_TAGS = ["All", "Don't Tell Comedy", "My Shorts"];

const VideoReel = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [fullScreenVideo, setFullScreenVideo] = useState(null);

  // Close full-screen video on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setFullScreenVideo(null);
      }
    };
    if (fullScreenVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullScreenVideo]);

  const filteredVideos = selectedTag === "All"
    ? MY_REEL_VIDEOS
    : MY_REEL_VIDEOS.filter(v => v.category === selectedTag || v.tag === selectedTag);

  const getYoutubeLink = (vid) => {
    if (vid.aspect === "9:16") {
      return `https://www.youtube.com/shorts/${vid.youtubeId}`;
    }
    return `https://www.youtube.com/watch?v=${vid.youtubeId}`;
  };

  return (
    <div className="yt-reel-page">
      {/* Top Centered Header */}
      <header className="yt-reel-header">
        <div className="yt-reel-title-row">
          <div className="title-center">
            <h1>Video Reel</h1>
            <p className="yt-reel-subtitle">Filmed • Edited • Mixed • Color Graded</p>
          </div>
          <div className="yt-reel-header-links">
            <a
              href="https://www.youtube.com/@sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-reel-ext-link"
            >
              YouTube @sniffyscloset ↗
            </a>
            <Link to="/production" className="yt-reel-rates-link">
              Services & Rates →
            </Link>
          </div>
        </div>

        {/* YouTube Category Filter Chips */}
        <div className="yt-chips-bar" role="tablist">
          {REEL_TAGS.map((tag) => (
            <button
              key={tag}
              role="tab"
              aria-selected={selectedTag === tag}
              className={`yt-chip-btn ${selectedTag === tag ? "yt-chip-btn--active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Multiple Videos Displayed on Screen at One Time */}
      <main className="yt-reel-main">
        <div className="yt-compact-grid">
          {filteredVideos.map((vid) => (
            <article
              key={vid.id}
              className="yt-compact-card"
              onClick={() => setFullScreenVideo(vid)}
              title={`Click to play ${vid.title} in full screen`}
            >
              {/* Thumbnail Box with Duration & Play Overlay */}
              <div className={`yt-thumb-box ${vid.aspect === "9:16" ? "yt-thumb-box--vertical" : ""}`}>
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="yt-thumb-img"
                  onError={(e) => {
                    e.target.src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                  }}
                />
                <span className="yt-duration-badge">{vid.duration}</span>
                <span className="yt-format-tag">{vid.tag}</span>
                <div className="yt-play-overlay">
                  <div className="yt-play-circle">
                    <span className="yt-play-arrow">▶</span>
                  </div>
                  <span className="yt-click-hint">Click to expand</span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="yt-card-details">
                <span className="yt-card-badge-pill">{vid.format}</span>
                <h2 className="yt-card-heading">{vid.title}</h2>
                <p className="yt-card-channel-name">{vid.creator}</p>
                <p className="yt-card-desc">{vid.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* YouTube Full-Screen Player Overlay (Opens on Click) */}
      {fullScreenVideo && (
        <div
          className="yt-fullscreen-backdrop"
          onClick={() => setFullScreenVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`yt-fullscreen-modal ${fullScreenVideo.aspect === "9:16" ? "yt-fullscreen-modal--vertical" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="yt-modal-topbar">
              <div className="yt-modal-title-info">
                <span className="yt-modal-badge">{fullScreenVideo.format}</span>
                <span className="yt-modal-title">{fullScreenVideo.title}</span>
              </div>
              <div className="yt-modal-actions">
                <a
                  href={getYoutubeLink(fullScreenVideo)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-modal-yt-btn"
                >
                  Watch on YouTube ↗
                </a>
                <button
                  className="yt-modal-close-btn"
                  onClick={() => setFullScreenVideo(null)}
                  aria-label="Close full screen player"
                >
                  ✕ Close (Esc)
                </button>
              </div>
            </div>

            {/* Video Iframe Frame */}
            <div className={`yt-modal-video-frame ${fullScreenVideo.aspect === "9:16" ? "yt-modal-video-frame--vertical" : ""}`}>
              <iframe
                src={`${fullScreenVideo.embedUrl}?autoplay=1&rel=0`}
                title={fullScreenVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="yt-modal-iframe"
              ></iframe>
            </div>

            {/* Modal Bottom Caption */}
            <div className="yt-modal-footer">
              <span className="yt-modal-creator">{fullScreenVideo.creator}</span>
              <p className="yt-modal-caption">{fullScreenVideo.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoReel;
