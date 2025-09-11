import React from 'react';
import './Blog.css';

import LetterboxdWidget from './LetterboxdWidget';



function Blog() {


  return (
    <>
      <div className="blog-main">
        <h1 className="blog-title">Kyle's Movie Reviews</h1>
        <div className="blog-letterboxd-link">
          <a
            href="https://letterboxd.com/rooddood/films/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-letterboxd-anchor"
          >
            See all reviews on my Letterboxd
          </a>
        </div>
      </div>
      <LetterboxdWidget />
      {/* Substack subscribe widget - ensure visible */}
      <div className="letterboxd-substack-widget" style={{maxWidth: 500, margin: '2rem auto'}}>
        <iframe src="https://kylerood.substack.com/embed" width="100%" height="180" style={{border: '1px solid #EEE', background: 'white'}} frameBorder="0" scrolling="no" title="Subscribe to my Substack"></iframe>
      </div>
    </>
  );
}
export default Blog;