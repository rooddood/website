import React from 'react';
import './Blog.css';

function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-sidebar">
        <h2 className="sidebar-title">Explore</h2>

        {/* Substack Link */}
        <div className="substack-section">
          <h3>Subscribe to My Substack</h3>
          <a
            href="https://substack.com/@kylerood?r=4eqj4p&utm_medium=ios"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit My Substack
          </a>
        </div>

        {/* Letterboxd Link */}
        <div className="letterboxd-section">
          <h3>My Letterboxd Activity</h3>
          <a
            href="https://letterboxd.com/kylerood/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit My Letterboxd
          </a>
        </div>
      </div>

      <div className="blog-main">
        <div className="welcome-message">
          <h1>Welcome to My Page</h1>
          <p>Check out my Substack and Letterboxd pages!</p>
        </div>
      </div>
    </div>
  );
}

export default Blog;