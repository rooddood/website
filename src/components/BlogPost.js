import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

// JSON structure for external posts from Substack and Letterboxd
const externalPosts = [
  {
    id: 1,
    title: "Exploring AI Ethics",
    date: "2025-04-15",
    excerpt: "A deep dive into the ethical considerations of AI...",
    tags: ['Tech', 'AI', 'Substack'],
    link: "https://substack.com/@kylerood/exploring-ai-ethics"
  },
  {
    id: 2,
    title: "Top 10 Movies of 2025",
    date: "2025-04-20",
    excerpt: "A curated list of the best movies this year...",
    tags: ['Media', 'Movies', 'Letterboxd'],
    link: "https://letterboxd.com/kylerood/top-10-movies-2025"
  }
];

function BlogPost() {
  const [filterTag, setFilterTag] = useState(null);

  const filteredPosts = filterTag
    ? externalPosts.filter(post => post.tags.includes(filterTag))
    : externalPosts;

  return (
    <div className="blog-container">
      <div className="blog-sidebar">
        <h2 className="sidebar-title">External Posts</h2>
        <div className="tag-filter">
          <h3>Filter by Tag</h3>
          {['Tech', 'AI', 'Media', 'Movies', 'Substack', 'Letterboxd'].map(tag => (
            <button
              key={tag}
              className={`tag-button ${filterTag === tag ? 'active' : ''}`}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="blog-posts">
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-post-preview">
              <Link to={post.link} target="_blank" rel="noopener noreferrer" className="post-link">
                <h2>{post.title}</h2>
                <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <p className="post-excerpt">{post.excerpt}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;