import React from 'react';
import './Writing.css';

const Writing = () => {
  return (
    <div className="writing-page">
      <div className="writing-header">
        <h1>Published Writing</h1>
        <p>A collection of my published articles, essays, and stories.</p>
      </div>
      
      <div className="writing-content">
        <div className="writing-section-header">
          <h2>The Washington Blade</h2>
          <a
            href="https://www.washingtonblade.com/author/kyle-rood/"
            target="_blank"
            rel="noopener noreferrer"
            className="blade-profile-link"
          >
            Author Profile &rarr;
          </a>
        </div>
        <div className="articles-grid">
          <a href="https://www.washingtonblade.com/2026/07/29/rainbows-in-revolt-mission-lgbtq-artists-voices/" target="_blank" rel="noopener noreferrer" className="article-card">
            <h3>Rainbows in Revolt on a mission to make LGBTQ artists’ voices heard</h3>
            <p className="article-date">Published July 29, 2026</p>
            <p className="article-summary">
              Profiles Rainbows in Revolt, a creative collective founded by Allie and Matt working to amplify emerging LGBTQ+ musicians, counter algorithmic suppression and visibility gaps beyond Pride Month, and reinvest proceeds into community organizations like Whitman-Walker Health.
            </p>
          </a>
          <a href="https://www.washingtonblade.com/america250/" target="_blank" rel="noopener noreferrer" className="article-card">
            <h3>Protests and Pioneers Emerge in early 20th Century</h3>
            <p className="article-date">Published in America250 (Page 14)</p>
            <p className="article-summary">
              Focusing on early gay protest in America, highlighting key figures like Frank Kameny and the pendulum swing of change that has been the fight for LGBTQ rights. It discusses the importance of words, and how a simple change in understanding can truly change people's minds about an issue: "Words have power. Gay is Good."
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Writing;
