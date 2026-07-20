import React from 'react';
import './Blog.css';

import LetterboxdWidget from './LetterboxdWidget';



function Blog() {


  return (
    <div className="blog-page">
      <div className="blog-main">
        <h1 className="blog-title">Kyle's Movie Reviews</h1>
        <p style={{ textAlign: 'center', marginBottom: '5px', fontSize: '1em', color: 'var(--text-color, #f5f5f5)' }}>
          Long reviews are on <a href="https://kylerood.substack.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color, #2980b9)', fontWeight: 'bold' }}>Substack</a>, 
          short reviews are on <a href="https://letterboxd.com/rooddood/films/reviews/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color, #2980b9)', fontWeight: 'bold' }}>Letterboxd</a>.
        </p>
      </div>
      
      <LetterboxdWidget />

      <div className="letterboxd-substack-widget" style={{ 
        maxWidth: 400, 
        margin: '-20px auto 20px auto', 
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '180px',
        overflow: 'hidden',
        backgroundColor: 'var(--card-bg, #1e1e1e)',
        border: '1px solid var(--border-color, #333)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <div style={{ transform: 'scale(0.65)', transformOrigin: 'top center', width: '153%', marginLeft: '-26.5%', marginTop: '-10px' }}>
          <iframe src="https://kylerood.substack.com/embed" width="100%" height="320" style={{ border: 'none', background: 'transparent' }} frameBorder="0" scrolling="no" title="Subscribe to my Substack"></iframe>
        </div>
      </div>
    </div>
  );
}
export default Blog;