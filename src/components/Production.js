import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Production.css';

const servicesData = [
  {
    id: "short-clips",
    badge: "Social Media",
    title: "Short Clips",
    price: "$30",
    unit: "/ clip",
    summary: "Vertical edits for TikTok, Reels, and Shorts.",
    features: [
      "Reframe to 9:16 vertical with subject tracking",
      "Add animated captions and punchline timing",
      "Cut for comedic rhythm and high hook retention",
      "Isolate dialogue and remove room hum in Audition",
      "Fast 48–72 hr turnaround with revisions included",
      "Intake raw files directly via Drive or Dropbox"
    ]
  },
  {
    id: "hourly-production",
    badge: "Filming & Editing",
    title: "Hourly Filming & Editing",
    price: "$50",
    unit: "/ hour",
    summary: "Live venue filming or full timeline editing.",
    features: [
      "Film on-location for low-light stages, sets & interviews",
      "Record dual audio: soundboard tap + ambient crowd mic",
      "Multi-cam sync and timeline pacing in Premiere Pro",
      "Color grade harsh stage lighting for natural skin tones",
      "Master audio: level loud punchlines and balance crowd",
      "Export ready-to-upload high-res masters"
    ]
  },
  {
    id: "custom-projects",
    badge: "Longform & Narrative",
    isFeatured: true,
    title: "Custom Projects",
    price: "Project-Based",
    unit: "quote",
    summary: "Reach out and talk with me about your project!",
    features: [
      "Direct, shoot & edit full comedy specials or club sets",
      "Longform documentary and narrative storytelling",
      "Full pipeline: camera, dual audio, edit, color & mix",
      "Flexible rates tailored to your scope and budget",
      "Collaborative review with dedicated revision rounds"
    ]
  }
];

const Production = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kylerood16@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="compact-prod-page">
      {/* Centered Header */}
      <header className="compact-prod-header">
        <div className="compact-prod-title-centered">
          <h1>Production Services</h1>
          <p className="compact-prod-tagline">
            Filming, audio recording, editing, color grading, and mixing for comedy, longform documentary, and narrative projects.
          </p>
          <div className="compact-header-links">
            <Link to="/reel" className="compact-reel-btn">
              Watch Video Reel →
            </Link>
            <a
              href="https://www.youtube.com/@sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="compact-channel-btn"
            >
              YouTube @sniffyscloset ↗
            </a>
            <a
              href="https://www.instagram.com/sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="compact-channel-btn"
            >
              Instagram @sniffyscloset ↗
            </a>
            <a
              href={`${process.env.PUBLIC_URL}/Kyle_Rood_Resume_Whole_2026.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="compact-channel-btn"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </header>

      {/* Pricing Cards (Action-focused, natural heights, fits on one screen) */}
      <section className="pricing-section">
        <div className="compact-rates-row">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className={`compact-service-card ${service.isFeatured ? "compact-service-card--featured" : ""}`}
            >
              <div className="service-card-top">
                <span className="service-badge">{service.badge}</span>
                <h2 className="service-title">{service.title}</h2>
                <div className="service-price-box">
                  <span className="service-price-amount">{service.price}</span>
                  {service.unit && <span className="service-price-unit">{service.unit}</span>}
                </div>
                <p className="service-summary">{service.summary}</p>
              </div>

              {/* Action-focused bullet points */}
              <ul className="service-features-list">
                {service.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Contact Bar */}
      <footer className="compact-contact-bar">
        <span className="contact-prompt">Ready to collaborate on a documentary, narrative project, set, or clips?</span>
        <div className="contact-actions">
          <a
            href="mailto:kylerood16@gmail.com?subject=Production%20Inquiry%20-%20Kyle%20Rood"
            className="contact-btn contact-btn--primary"
          >
            Email kylerood16@gmail.com
          </a>
          <button className="contact-btn" onClick={handleCopyEmail}>
            {copiedEmail ? "Copied!" : "Copy Email"}
          </button>
          <a
            href={`${process.env.PUBLIC_URL}/Kyle_Rood_Resume_Whole_2026.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn"
          >
            Download Resume
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Production;
