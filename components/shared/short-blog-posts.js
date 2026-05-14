// components/BlogPostsSection.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogPostsSection() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ Call our own Next.js API route — no CORS, no exposed token
        const response = await fetch('/api/blog-posts');

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const data = await response.json();
        setPosts(data?.data || []);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ── LOADING SKELETONS ──
  if (loading) {
    return (
      <section className="blog-posts-section">
        <div className="insights-label">From the Desk</div>
        <h2 className="insights-title">Latest Insights</h2>
        <div className="articles-grid">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="article-card">
              <div className="article-thumb skeleton-box" />
              <div className="article-body">
                <div className="skeleton-line" />
                <div className="skeleton-line short" />
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .skeleton-box {
            background: linear-gradient(90deg, #e8f5e9 25%, #c8e6c9 50%, #e8f5e9 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
            border-radius: 8px;
          }
          .skeleton-line {
            height: 13px; border-radius: 6px; margin-bottom: 8px;
            background: linear-gradient(90deg, #e8f5e9 25%, #c8e6c9 50%, #e8f5e9 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
          }
          .skeleton-line.short { width: 55%; }
          @keyframes shimmer {
            0%   { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </section>
    );
  }

  // ── ERROR ──
  if (error) {
    return (
      <section className="blog-posts-section">
        <div className="insights-label">From the Desk</div>
        <h2 className="insights-title">Latest Insights</h2>
        <div className="empty-state">
          <span>⚠️</span>
          <p>Unable to load articles right now. Please try again later.</p>
        </div>
      </section>
    );
  }

  // ── EMPTY ──
  if (posts.length === 0) {
    return (
      <section className="blog-posts-section">
        <div className="insights-label">From the Desk</div>
        <h2 className="insights-title">Latest Insights</h2>
        <div className="empty-state">
          <span>📝</span>
          <p>No articles available at the moment. Check back soon!</p>
        </div>
      </section>
    );
  }

  // ── POSTS ──
  return (
    <section className="blog-posts-section">
      <h2 className="insights-title">Latest Blogs</h2>

      <div className="articles-grid">
        {posts.slice(0, 6).map(post => (
          <a
            key={post.ID || post.id}
            href={post.post_link}
            target="_blank"
            rel="noopener noreferrer"
            className="article-card"
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div className="article-thumb">
              {post.featured_image
                ? <img src={post.featured_image} alt={post.title} />
                : '📰'}
            </div>
            <div className="article-body">
              <p className="article-title">{post.title}</p>
              <div className="article-meta">
                <span className="article-tag">Article</span>
                <span className="article-time">
                  · {new Date(post.post_date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {posts.length > 6 && (
        <div className="view-all-wrap">
          <Link href="/blog" className="btn-view-all">
            VIEW ALL ARTICLES &nbsp;→
          </Link>
        </div>
      )}
    </section>
  );
} 