import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './VideoReel.css';
import syncedYoutubeVideos from '../data/youtubeFeed.json';

// Curated portfolio clips (Don't Tell Comedy, Stand Up Sets, Instagram Collabs, Shorts)
const CURATED_REEL_VIDEOS = [
  {
    id: "dont-tell-comedy-shaw",
    title: "Don't Tell Comedy DC: Shaw 10/17",
    category: "Don't Tell Comedy",
    tag: "Featured Montage",
    format: "16:9 Comedy Show",
    aspect: "16:9",
    duration: "1:44",
    embedUrl: "https://www.youtube.com/embed/coVL3Nbr5H8",
    youtubeId: "coVL3Nbr5H8",
    creator: "Don't Tell Comedy",
    isFeatured: true,
    summary: "Brand new Don't Tell Comedy sizzle reel filmed live in Shaw, DC. Features dynamic multi-angle stage capture, crowd laughter isolation, and fast-paced punchline pacing."
  },
  {
    id: "dont-tell-comedy-adams-morgan",
    title: "Don't Tell Comedy DC: Adams Morgan",
    category: "Don't Tell Comedy",
    tag: "Montage",
    format: "16:9 Comedy Show",
    aspect: "16:9",
    duration: "2:23",
    embedUrl: "https://www.youtube.com/embed/Zez-b3a8DlQ",
    youtubeId: "Zez-b3a8DlQ",
    creator: "Don't Tell Comedy",
    summary: "Live comedy sizzle reel filmed and edited for Don't Tell Comedy with stage lighting exposure and crowd audio mix."
  },
  {
    id: "woowoo-sniffyscloset-ai-muse",
    title: "WooWoo The Comedian: AI Muse",
    platform: "instagram",
    category: "Stand Up Sets",
    tag: "Standup Reel",
    format: "9:16 Instagram Reel",
    aspect: "9:16",
    duration: "Reel",
    embedUrl: "https://www.instagram.com/reel/Dex35XQOLSn/embed/",
    externalUrl: "https://www.instagram.com/reel/Dex35XQOLSn/?srtk=b3hxY21nOWJ2ZHhz",
    thumbnail: `${process.env.PUBLIC_URL}/woowoo_sniffyscloset_reel.jpg`,
    creator: "@woowoo_thecomedian feat. @sniffyscloset",
    summary: "Comedian @woowoo_thecomedian reposted Kyle's @sniffyscloset video: \"This AI stuff is out of control!! Would y'all use Muse (in my Baltimore voice)? 🎥 @sniffyscloset\""
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

const REEL_TAGS = ["All", "Featured", "Don't Tell Comedy", "Stand Up Sets", "My Shorts"];

const VideoReel = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [fullScreenVideo, setFullScreenVideo] = useState(null);

  // Merge any newly synced YouTube videos that aren't already explicitly in CURATED_REEL_VIDEOS
  const allVideos = useMemo(() => {
    const knownIds = new Set(CURATED_REEL_VIDEOS.map(v => v.youtubeId || v.id));
    const newlySynced = (syncedYoutubeVideos || [])
      .filter(v => !knownIds.has(v.youtubeId || v.id))
      .map(v => ({
        ...v,
        duration: v.duration || "New",
        creator: v.creator || "@sniffyscloset"
      }));

    return [...CURATED_REEL_VIDEOS, ...newlySynced];
  }, []);

  // Most prominent montage
  const featuredVideo = allVideos.find(v => v.isFeatured) || allVideos[0];

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

  const filteredVideos = useMemo(() => {
    if (selectedTag === "All") return allVideos;
    if (selectedTag === "Featured") return allVideos.filter(v => v.isFeatured);
    return allVideos.filter(v => v.category === selectedTag || v.tag === selectedTag);
  }, [allVideos, selectedTag]);

  const getVideoLink = (vid) => {
    if (vid.platform === "instagram") {
      return vid.externalUrl || "https://www.instagram.com/reel/Dex35XQOLSn/";
    }
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
            <a
              href="https://www.instagram.com/sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-reel-ext-link yt-reel-ig-link"
            >
              Instagram @sniffyscloset ↗
            </a>
            <Link to="/production" className="yt-reel-rates-link">
              Services & Rates →
            </Link>
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="yt-chips-bar" role="tablist">
          {REEL_TAGS.map((tag) => (
            <button
              key={tag}
              role="tab"
              aria-selected={selectedTag === tag}
              className={`yt-chip-btn ${selectedTag === tag ? "yt-chip-btn--active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag === "Featured" ? "🔥 Featured" : tag}
            </button>
          ))}
        </div>
      </header>

      <main className="yt-reel-main">
        {/* Prominently Featured Don't Tell Comedy Montage Showcase */}
        {(selectedTag === "All" || selectedTag === "Featured" || selectedTag === "Don't Tell Comedy") && (
          <section className="yt-featured-spotlight" aria-label="Featured Montage Spotlight">
            <div className="yt-featured-badge-bar">
              <span className="yt-featured-flame-pill">🔥 PROMINENT FEATURE</span>
              <span className="yt-featured-meta-info">Don't Tell Comedy DC • Shaw 10/17</span>
            </div>

            <div className="yt-featured-grid">
              {/* Embedded 16:9 Showcase Player */}
              <div className="yt-featured-video-wrapper">
                <iframe
                  src={`${featuredVideo.embedUrl}?rel=0`}
                  title={featuredVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="yt-featured-iframe"
                ></iframe>
              </div>

              {/* Showcase Details & Actions */}
              <div className="yt-featured-info-col">
                <span className="yt-featured-kicker">Live Standup Sizzle Reel</span>
                <h2 className="yt-featured-headline">{featuredVideo.title}</h2>
                <p className="yt-featured-creator">{featuredVideo.creator} • Filmed & Edited by Kyle Rood</p>
                <p className="yt-featured-copy">
                  {featuredVideo.summary}
                </p>
                <div className="yt-featured-action-row">
                  <a
                    href={getVideoLink(featuredVideo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-featured-btn yt-featured-btn--primary"
                  >
                    Watch on YouTube ↗
                  </a>
                  <button
                    onClick={() => setFullScreenVideo(featuredVideo)}
                    className="yt-featured-btn yt-featured-btn--secondary"
                  >
                    Expand Player
                  </button>
                  <Link to="/production" className="yt-featured-btn yt-featured-btn--rates">
                    Hire For Comedy Filming →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section Heading */}
        <div className="yt-section-heading-row">
          <h2 className="yt-section-title">
            {selectedTag === "All" ? "All Video Works & Sets" : `${selectedTag}`}
          </h2>
          <span className="yt-section-count">{filteredVideos.length} clips</span>
        </div>

        {/* Compact Cards Grid */}
        <div className="yt-compact-grid">
          {filteredVideos.map((vid) => (
            <article
              key={vid.id}
              className={`yt-compact-card ${vid.platform === "instagram" ? "yt-compact-card--instagram" : ""} ${vid.isFeatured ? "yt-compact-card--featured" : ""}`}
              onClick={() => setFullScreenVideo(vid)}
              title={`Click to play ${vid.title} in full screen`}
            >
              {/* Thumbnail Box with Duration & Play Overlay */}
              <div className={`yt-thumb-box ${vid.aspect === "9:16" ? "yt-thumb-box--vertical" : ""}`}>
                <img
                  src={vid.thumbnail || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="yt-thumb-img"
                  onError={(e) => {
                    if (vid.youtubeId) {
                      e.target.src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
                    }
                  }}
                />
                <span className="yt-duration-badge">{vid.duration}</span>
                <span className={`yt-format-tag ${vid.platform === "instagram" ? "yt-format-tag--instagram" : ""}`}>
                  {vid.platform === "instagram" ? "📸 Instagram Reel" : vid.tag}
                </span>
                <div className="yt-play-overlay">
                  <div className={`yt-play-circle ${vid.platform === "instagram" ? "yt-play-circle--instagram" : ""}`}>
                    <span className="yt-play-arrow">▶</span>
                  </div>
                  <span className="yt-click-hint">Click to expand</span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="yt-card-details">
                <div className="yt-card-badge-row">
                  <span className={`yt-card-badge-pill ${vid.platform === "instagram" ? "yt-card-badge-pill--instagram" : ""}`}>
                    {vid.format}
                  </span>
                  {vid.category === "Stand Up Sets" && (
                    <span className="yt-card-category-pill">Stand Up</span>
                  )}
                </div>
                <h3 className="yt-card-heading">{vid.title}</h3>
                <p className="yt-card-channel-name">{vid.creator}</p>
                <p className="yt-card-desc">{vid.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Full-Screen Player Overlay (Modal for YouTube & Instagram) */}
      {fullScreenVideo && (
        <div
          className="yt-fullscreen-backdrop"
          onClick={() => setFullScreenVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`yt-fullscreen-modal ${
              fullScreenVideo.aspect === "9:16" ? "yt-fullscreen-modal--vertical" : ""
            } ${fullScreenVideo.platform === "instagram" ? "yt-fullscreen-modal--instagram" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="yt-modal-topbar">
              <div className="yt-modal-title-info">
                <span className={`yt-modal-badge ${fullScreenVideo.platform === "instagram" ? "yt-modal-badge--instagram" : ""}`}>
                  {fullScreenVideo.format}
                </span>
                <span className="yt-modal-title">{fullScreenVideo.title}</span>
              </div>
              <div className="yt-modal-actions">
                {fullScreenVideo.platform === "instagram" ? (
                  <a
                    href={fullScreenVideo.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-modal-ig-btn"
                  >
                    View on Instagram ↗
                  </a>
                ) : (
                  <a
                    href={getVideoLink(fullScreenVideo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-modal-yt-btn"
                  >
                    Watch on YouTube ↗
                  </a>
                )}
                <button
                  className="yt-modal-close-btn"
                  onClick={() => setFullScreenVideo(null)}
                  aria-label="Close full screen player"
                >
                  ✕ Close (Esc)
                </button>
              </div>
            </div>

            {/* Video Iframe Frame (handles YouTube and Instagram) */}
            <div
              className={`yt-modal-video-frame ${
                fullScreenVideo.aspect === "9:16" ? "yt-modal-video-frame--vertical" : ""
              } ${fullScreenVideo.platform === "instagram" ? "yt-modal-video-frame--instagram" : ""}`}
            >
              <iframe
                src={
                  fullScreenVideo.platform === "instagram"
                    ? fullScreenVideo.embedUrl
                    : `${fullScreenVideo.embedUrl}?autoplay=1&rel=0`
                }
                title={fullScreenVideo.title}
                frameBorder="0"
                scrolling={fullScreenVideo.platform === "instagram" ? "no" : "auto"}
                allowTransparency="true"
                allow={
                  fullScreenVideo.platform === "instagram"
                    ? "encrypted-media; picture-in-picture"
                    : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                }
                allowFullScreen
                className="yt-modal-iframe"
              ></iframe>
            </div>

            {/* Modal Bottom Caption */}
            <div className="yt-modal-footer">
              <span className={`yt-modal-creator ${fullScreenVideo.platform === "instagram" ? "yt-modal-creator--instagram" : ""}`}>
                {fullScreenVideo.creator}
              </span>
              <p className="yt-modal-caption">{fullScreenVideo.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoReel;
