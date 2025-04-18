import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Blog.css';

// Available tags
const TAGS = ['Tech', 'Media', 'AI', 'TV', 'Movies', 'Music'];

// This would be imported from a separate data file in a real implementation
const blogPosts = [
  {
    id: 1,
    title: "My First Blog Post",
    date: "2024-03-20",
    excerpt: "This is a sample blog post to demonstrate the blog functionality...",
    content: "Full content of the first blog post...",
    tags: ['Tech', 'AI']
  },
  {
    id: 2,
    title: "Another Interesting Topic",
    date: "2024-03-21",
    excerpt: "Here's another sample post to show how multiple posts look...",
    content: "Full content of the second blog post...",
    tags: ['Media', 'Movies']
  },
  {
    id: 3,
    title: "The Future of AI",
    date: "2024-03-22",
    excerpt: "Exploring the latest developments in artificial intelligence...",
    content: "Full content about AI developments...",
    tags: ['Tech', 'AI']
  },
  {
    id: 4,
    title: "Best Albums of 2024",
    date: "2024-03-23",
    excerpt: "A curated list of the most impressive albums released this year...",
    content: "Full content about music albums...",
    tags: ['Media', 'Music']
  }
];

function BlogPost() {
  const { id } = useParams();
  const currentPost = blogPosts.find(p => p.id === parseInt(id));

  if (!currentPost) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blog-container">
      <div className="blog-sidebar">
        <h2 className="sidebar-title">All Posts</h2>
        <div className="blog-posts">
          {blogPosts.map(post => (
            <div 
              key={post.id} 
              className={`blog-post-preview ${currentPost.id === post.id ? 'active' : ''}`}
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
      </div>
    </div>
  );
}

export default BlogPost; 