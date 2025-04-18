import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Blog.css';

// Available tags
const TAGS = ['Tech', 'Media', 'AI', 'TV', 'Movies', 'Music'];

// Sample blog posts data with tags
const blogPosts = [
  {
    id: 1,
    title: "My First Blog Post",
    date: "2024-03-20",
    excerpt: "This is a sample blog post to demonstrate the blog functionality...",
    content: "Full content of the first blog post...",
    tags: ['Tech', 'AI']
  },
  // TODO: Add more posts
//   {
//     id: 2,
//     title: "Another Interesting Topic",
//     date: "2024-03-21",
//     excerpt: "Here's another sample post to show how multiple posts look...",
//     content: "Full content of the second blog post...",
//     tags: ['Media', 'Movies']
//   },
//   {
//     id: 3,
//     title: "The Future of AI",
//     date: "2024-03-22",
//     excerpt: "Exploring the latest developments in artificial intelligence...",
//     content: "Full content about AI developments...",
//     tags: ['Tech', 'AI']
//   },
//   {
//     id: 4,
//     title: "Best Albums of 2024",
//     date: "2024-03-23",
//     excerpt: "A curated list of the most impressive albums released this year...",
//     content: "Full content about music albums...",
//     tags: ['Media', 'Music']
//   }
];

function Blog() {
  const { id } = useParams();
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Filter posts based on selected tags
  const filteredPosts = selectedTags.length === 0
    ? blogPosts
    : blogPosts.filter(post => 
        post.tags.some(tag => selectedTags.includes(tag))
      );

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  // If we're on a specific post page, find that post
  const currentPost = id ? blogPosts.find(post => post.id === parseInt(id)) : null;

  return (
    <div className="blog-container">
      <div className="blog-sidebar">
        <h2 className="sidebar-title">All Posts</h2>
        
        {/* Tags filter section */}
        <div className="tags-filter">
          <h3>Filter by Topic</h3>
          <div className="tags-container">
            {TAGS.map(tag => (
              <button
                key={tag}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-posts">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className={`blog-post-preview ${currentPost?.id === post.id ? 'active' : ''}`}
              onClick={() => setSelectedPost(post)}
            >
              <Link to={`/blog/${post.id}`} className="post-link">
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
      
      <div className="blog-main">
        {currentPost ? (
          <article className="blog-post">
            <h1>{currentPost.title}</h1>
            <p className="post-date">{new Date(currentPost.date).toLocaleDateString()}</p>
            <div className="post-tags">
              {currentPost.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="post-content">
              {currentPost.content}
            </div>
          </article>
        ) : (
          <div className="welcome-message">
            <h1>Welcome to the Blog</h1>
            <p>Select a post from the sidebar to read it.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog; 