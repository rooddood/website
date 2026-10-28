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
    tag: "Montage",
    format: "16:9 Comedy Show",
    aspect: "16:9",
    duration: "1:44",
    embedUrl: "https://www.youtube.com/embed/coVL3Nbr5H8",
    youtubeId: "coVL3Nbr5H8",
    creator: "Don't Tell Comedy",
    isFeatured: true,
    summary: "Brand new Don't Tell Comedy live montage filmed live in Shaw, DC. Features dynamic multi-angle stage capture, crowd laughter isolation, and fast-paced punchline pacing."
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
    summary: "Live comedy montage filmed and edited for Don't Tell Comedy with stage lighting exposure and crowd audio mix."
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
    isFeatured: true,
    summary: "Comedian @woowoo_thecomedian reposted Kyle's @sniffyscloset video: \"This AI stuff is out of control!! Would y'all use Muse (in my Baltimore voice)? 🎥 @sniffyscloset\""
  },
  {
    id: "domgrayer-zillow",
    title: "Dom Grayer: Comedy Shows Are The New Zillow",
    platform: "instagram",
    category: "Stand Up Sets",
    tag: "Standup Reel",
    format: "9:16 Instagram Reel",
    aspect: "9:16",
    duration: "Reel",
    embedUrl: "https://www.instagram.com/reel/DfANYJ8RgUk/embed/",
    externalUrl: "https://www.instagram.com/reel/DfANYJ8RgUk/?cplk=dnA0OHg4dzhta3J0",
    thumbnail: `${process.env.PUBLIC_URL}/domgrayer_sniffyscloset_reel.jpg`,
    creator: "@domgrayer feat. @sniffyscloset",
    isFeatured: true,
    summary: "Comedian @domgrayer live crowdwork standup clip filmed & edited by Kyle Rood: \"Economy so bad comedy shows are the new Zillow #standupcomedian #crowdwork\""
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

const REEL_TAGS = ["Featured", "All Videos", "Don't Tell Comedy", "Stand Up Sets", "Shorts"];

const VideoReel = () => {
  // Land on Featured tab by default
  const [selectedTag, setSelectedTag] = useState("Featured");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
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

  // The 3 featured videos: Don't Tell 10/17 and the two comedian Instagram clips
  const featuredVideos = useMemo(() => {
    return allVideos.filter(v => v.isFeatured);
  }, [allVideos]);

  const currentFeatured = featuredVideos[featuredIndex] || featuredVideos[0] || allVideos[0];

  // Auto-cycle through the 3 featured videos every 9 seconds when idle
  useEffect(() => {
    if (!isAutoCycling || featuredVideos.length <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex(prev => (prev + 1) % featuredVideos.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [isAutoCycling, featuredVideos.length]);

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
    if (selectedTag === "All Videos" || selectedTag === "All") return allVideos;
    if (selectedTag === "Featured") return featuredVideos;
    if (selectedTag === "Shorts" || selectedTag === "My Shorts") {
      return allVideos.filter(v => v.category === "My Shorts" || v.category === "Shorts" || v.tag === "Shorts" || v.tag === "Trailer");
    }
    return allVideos.filter(v => v.category === selectedTag || v.tag === selectedTag);
  }, [allVideos, featuredVideos, selectedTag]);

  const handlePrevFeatured = () => {
    setIsAutoCycling(false);
    setFeaturedIndex(prev => (prev - 1 + featuredVideos.length) % featuredVideos.length);
  };

  const handleNextFeatured = () => {
    setIsAutoCycling(false);
    setFeaturedIndex(prev => (prev + 1) % featuredVideos.length);
  };

  const handleSelectFeatured = (idx) => {
    setIsAutoCycling(false);
    setFeaturedIndex(idx);
  };

  const getVideoLink = (vid) => {
    if (vid.platform === "instagram") {
      return vid.externalUrl;
    }
    if (vid.aspect === "9:16") {
      return `https://www.youtube.com/shorts/${vid.youtubeId}`;
    }
    return `https://www.youtube.com/watch?v=${vid.youtubeId}`;
  };

  // Reusable Video Card: All tags cleanly positioned BELOW the video thumbnail
  const renderVideoCard = (vid) => (
    <article
      key={vid.id}
      className={`yt-video-card ${vid.platform === "instagram" ? "yt-video-card--instagram" : ""}`}
      onClick={() => setFullScreenVideo(vid)}
      title={`Click to watch ${vid.title}`}
    >
      {/* Thumbnail Box: NO tags on top of thumbnail, only duration badge in bottom right */}
      <div className={`yt-thumb-box ${vid.aspect === "9:16" ? "yt-thumb-box--vertical" : ""}`}>
        <img
          src={vid.thumbnail || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
          alt={vid.title}
          className="yt-thumb-img"
          loading="lazy"
          onError={(e) => {
            if (vid.youtubeId) {
              e.target.src = `https://img.youtube.com/vi/${vid.youtubeId}/0.jpg`;
            }
          }}
        />
        <span className="yt-duration-badge">{vid.duration}</span>

        {/* Play Overlay */}
        <div className="yt-play-overlay">
          <div className="yt-play-circle">
            <span className="yt-play-arrow">▶</span>
          </div>
        </div>
      </div>

      {/* Video Details: All tags positioned cleanly BELOW the thumbnail */}
      <div className="yt-card-details">
        <h3 className="yt-card-heading">{vid.title}</h3>
        <p className="yt-card-channel-name">{vid.creator}</p>

        <div className="yt-card-tags-row">
          <span className={`yt-tag-pill ${vid.platform === "instagram" ? "yt-tag-pill--instagram" : ""}`}>
            {vid.platform === "instagram" ? "Instagram Reel" : vid.tag}
          </span>
          <span className="yt-tag-pill yt-tag-pill--format">{vid.format}</span>
          {vid.category === "Stand Up Sets" && (
            <span className="yt-tag-pill yt-tag-pill--category">Stand Up</span>
          )}
        </div>

        <p className="yt-card-desc">{vid.summary}</p>
      </div>
    </article>
  );

  return (
    <div className="yt-reel-page">
      {/* Compact YouTube Channel Header */}
      <header className="yt-reel-header">
        <div className="yt-channel-banner">
          <div className="yt-channel-avatar">
            <img
              src={`${process.env.PUBLIC_URL}/youtube_channel_avatar.jpg`}
              alt="Kyle Rood YouTube Channel Logo"
              className="yt-channel-avatar-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="yt-channel-info">
            <h1 className="yt-channel-name">Kyle Rood</h1>
            <p className="yt-channel-subtitle">Writer, Director</p>
            <p className="yt-channel-handle">@sniffyscloset</p>
          </div>
          <div className="yt-channel-links">
            <a
              href="https://www.youtube.com/@sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-header-link"
            >
              YouTube ↗
            </a>
            <a
              href="https://www.instagram.com/sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="yt-header-link"
            >
              Instagram ↗
            </a>
            <Link to="/production" className="yt-header-link yt-header-link--rates">
              Services & Rates →
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="yt-channel-tabs-bar" role="tablist">
          {REEL_TAGS.map((tag) => (
            <button
              key={tag}
              role="tab"
              aria-selected={selectedTag === tag}
              className={`yt-tab-btn ${selectedTag === tag ? "yt-tab-btn--active" : ""}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area: Strictly Tab-Driven to fit on one page without excessive scrolling */}
      <main className="yt-reel-main">
        {selectedTag === "Featured" ? (
          /* Single-Page Featured View: Theater Stage Player + Side Playlist Queue */
          <section
            className="yt-theater-layout"
            onMouseEnter={() => setIsAutoCycling(false)}
            onMouseLeave={() => setIsAutoCycling(true)}
            aria-label="Featured Video Showcase"
          >
            {/* Left: Active Stage Player */}
            <div className="yt-stage-col">
              <div className={`yt-stage-player-wrapper ${currentFeatured.aspect === "9:16" ? "yt-stage-player-wrapper--vertical" : ""}`}>
                <iframe
                  key={currentFeatured.id}
                  src={
                    currentFeatured.platform === "instagram"
                      ? currentFeatured.embedUrl
                      : `${currentFeatured.embedUrl}?rel=0`
                  }
                  title={currentFeatured.title}
                  frameBorder="0"
                  scrolling={currentFeatured.platform === "instagram" ? "no" : "auto"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="yt-stage-iframe"
                ></iframe>
              </div>

              {/* Stage Video Details */}
              <div className="yt-stage-meta">
                <div className="yt-stage-header-row">
                  <div className="yt-stage-titles">
                    <h2 className="yt-stage-title">{currentFeatured.title}</h2>
                    <p className="yt-stage-creator">{currentFeatured.creator}</p>
                  </div>
                  <div className="yt-stage-actions">
                    {currentFeatured.platform === "instagram" ? (
                      <a
                        href={currentFeatured.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yt-btn yt-btn--ig"
                      >
                        Instagram ↗
                      </a>
                    ) : (
                      <a
                        href={getVideoLink(currentFeatured)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yt-btn yt-btn--yt"
                      >
                        YouTube ↗
                      </a>
                    )}
                    <button
                      onClick={() => setFullScreenVideo(currentFeatured)}
                      className="yt-btn yt-btn--secondary"
                      title="Expand Player"
                    >
                      Expand
                    </button>
                    <Link to="/production" className="yt-btn yt-btn--rates">
                      Hire →
                    </Link>
                  </div>
                </div>

                <div className="yt-stage-tags">
                  <span className="yt-tag-pill yt-tag-pill--format">{currentFeatured.format}</span>
                  <span className="yt-tag-pill yt-tag-pill--category">{currentFeatured.category}</span>
                  {currentFeatured.platform === "instagram" && (
                    <span className="yt-tag-pill yt-tag-pill--instagram">Instagram Reel</span>
                  )}
                </div>

                <p className="yt-stage-desc">{currentFeatured.summary}</p>
              </div>
            </div>

            {/* Right: Featured Playlist Queue (The 3 cycling videos) */}
            <div className="yt-queue-col">
              <div className="yt-queue-header">
                <div className="yt-queue-title-wrap">
                  <h3 className="yt-queue-title">Featured Clips</h3>
                  <span className="yt-queue-counter">{featuredIndex + 1} / {featuredVideos.length}</span>
                </div>
                <div className="yt-queue-nav">
                  <button
                    className="yt-queue-arrow"
                    onClick={handlePrevFeatured}
                    aria-label="Previous clip"
                    title="Previous clip"
                  >
                    ‹
                  </button>
                  <button
                    className="yt-queue-arrow"
                    onClick={handleNextFeatured}
                    aria-label="Next clip"
                    title="Next clip"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="yt-queue-list">
                {featuredVideos.map((vid, idx) => {
                  const isActive = featuredIndex === idx;
                  return (
                    <div
                      key={vid.id}
                      className={`yt-queue-card ${isActive ? "yt-queue-card--active" : ""}`}
                      onClick={() => handleSelectFeatured(idx)}
                      role="button"
                      tabIndex={0}
                      title={`Play ${vid.title}`}
                    >
                      <div className={`yt-queue-thumb-box ${vid.aspect === "9:16" ? "yt-queue-thumb-box--vertical" : ""}`}>
                        <img
                          src={vid.thumbnail || `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                          alt={vid.title}
                          className="yt-queue-thumb-img"
                        />
                        <span className="yt-duration-badge">{vid.duration}</span>
                        {isActive && (
                          <div className="yt-queue-active-badge">
                            <span>▶</span>
                          </div>
                        )}
                      </div>

                      <div className="yt-queue-card-details">
                        <div className="yt-queue-card-num">{idx + 1}</div>
                        <div className="yt-queue-card-text">
                          <h4 className="yt-queue-card-title">{vid.title}</h4>
                          <p className="yt-queue-card-creator">{vid.creator}</p>
                          <div className="yt-queue-card-tags">
                            <span className="yt-tag-pill yt-tag-pill--format">{vid.format}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          /* Focused Category Grid View (Tabs: All Videos, Don't Tell Comedy, Stand Up Sets, Shorts) */
          <section className="yt-category-section">
            <div className="yt-section-heading-row">
              <h2 className="yt-section-title">{selectedTag}</h2>
              <span className="yt-section-count">{filteredVideos.length} clips</span>
            </div>

            <div className="yt-compact-grid">
              {filteredVideos.map((vid) => renderVideoCard(vid))}
            </div>
          </section>
        )}
      </main>

      {/* Full-Screen Modal Player (YouTube & Instagram) */}
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

            {/* Video Frame */}
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

            {/* Modal Footer */}
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
