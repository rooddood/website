import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Production.css';

const servicesData = [
  {
    id: "clip-editing",
    badge: "Social",
    title: "Clip Editing",
    price: "$50",
    unit: "/ clip",
    summary: "Quick vertical and horizontal cuts bringing home video flair to your standup.",
    features: [
      "Custom captions, fonts, and graphics tailored to your style",
      "Dialogue isolation, crowd laugh balance, and social formatting",
      "Send your footage and pick your jokes, or let me find the best hooks",
      "Finished videos and assets delivered via Drive in under a week, usually days"
    ]
  },
  {
    id: "live-filming",
    badge: "Filming",
    title: "Live Filming",
    price: "$100",
    unit: "prep + $50 / hr",
    summary: "On-location stage capture with dynamic handheld camera work and dedicated sound.",
    features: [
      "Single-camera 4K handheld filming with live stage energy",
      "Direct soundboard line tap and room crowd mic",
      "Book your show date and lock in the prep deposit",
      "Full raw video and audio delivered via Drive, with clip editing available"
    ]
  },
  {
    id: "hourly-editing",
    badge: "Editing",
    title: "Hourly Editing",
    price: "$50",
    unit: "/ hour",
    summary: "Flexible post-production for tape you already have or ongoing projects.",
    features: [
      "Standup sets, video podcasts, sketches, and vlog editing",
      "Color grading for stage lighting and complete audio leveling",
      "Upload your raw footage with your guidance or creative notes",
      "Polished master exports delivered directly to your digital drive"
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
          <div className="prod-skills-container">
            <span className="prod-skill-bubble">Filming</span>
            <span className="prod-skill-bubble">Editing</span>
            <span className="prod-skill-bubble">Audio Recording</span>
            <span className="prod-skill-bubble">Color Grading</span>
            <span className="prod-skill-bubble">Mixing</span>
          </div>
          <div className="compact-header-links">
            <Link to="/reel" className="compact-reel-btn">
              Watch Reel
            </Link>
            <a
              href="https://www.youtube.com/@sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="compact-channel-btn"
            >
              YouTube @sniffyscloset
            </a>
            <a
              href="https://www.instagram.com/sniffyscloset"
              target="_blank"
              rel="noopener noreferrer"
              className="compact-channel-btn"
            >
              Instagram @sniffyscloset
            </a>
            <a
              href={`${process.env.PUBLIC_URL}/Kyle_Rood_Resume_Whole_2026.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="compact-channel-btn"
            >
              Resume
            </a>
          </div>
        </div>
      </header>

      {/* 3 Specific Pricing Cards in One Row */}
      <section className="pricing-section">
        <div className="compact-rates-row">
          {servicesData.map((service) => (
            <div key={service.id} className="compact-service-card">
              <div className="service-card-top">
                <span className="service-badge">{service.badge}</span>
                <h2 className="service-title">{service.title}</h2>
                <div className="service-price-box">
                  <span className="service-price-amount">{service.price}</span>
                  {service.unit && <span className="service-price-unit">{service.unit}</span>}
                </div>
                <p className="service-summary">{service.summary}</p>
              </div>

              <ul className="service-features-list">
                {service.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Longform, Specials & Contact Box Sitting Below */}
      <section className="compact-longform-box">
        <div className="longform-box-content">
          <div className="longform-tags-row">
            <span className="longform-tag-item">Live Shows</span>
            <span className="longform-tag-item">Standup Specials</span>
            <span className="longform-tag-item">Documentary</span>
            <span className="longform-tag-item">Podcasts</span>
            <span className="longform-tag-item">Vlogs</span>
            <span className="longform-tag-item">Shorts</span>
          </div>
          <h2 className="longform-title">Larger project in mind?</h2>
          <p className="longform-desc">
            I collaborate from the initial shoot through color, sound, and finish with flexible milestone rates tailored to your scope.
          </p>
        </div>
        <div className="longform-contact-actions">
          <a
            href="mailto:kylerood16@gmail.com?subject=Production%20Inquiry%20-%20Kyle%20Rood"
            className="contact-btn contact-btn--primary contact-btn--large"
            onClick={handleCopyEmail}
          >
            {copiedEmail ? "Copied kylerood16@gmail.com!" : "Email kylerood16@gmail.com"}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Production;
