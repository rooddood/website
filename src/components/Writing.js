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
        <h2>The Washington Blade</h2>
        <div className="articles-grid">
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
