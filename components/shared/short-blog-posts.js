// components/shared/short-blog-posts.js
import { useState, useEffect } from "react";
import Link from "next/link";

function formatDate(dateString) {
  if (!dateString) return "";

  try {
    const normalized = String(dateString).trim().replace(" ", "T");
    const date = new Date(normalized);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function getPostDate(post) {
  return post.published_at || post.created_at || post.post_date || post.date;
}

function getPostHref(post) {
  if (post.slug) return `/blog/${post.slug}`;
  if (post.post_link) return post.post_link;
  return "/blog";
}

export default function BlogPostsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog-posts");

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setPosts(data?.data || []);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="blog-posts-section">
        <div className="insights-label">From the Desk</div>
        <h2 className="insights-title">Latest Insights</h2>
        <div className="articles-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
            background: linear-gradient(
              90deg,
              #e8f5e9 25%,
              #c8e6c9 50%,
              #e8f5e9 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
            border-radius: 8px;
          }
          .skeleton-line {
            height: 13px;
            border-radius: 6px;
            margin-bottom: 8px;
            background: linear-gradient(
              90deg,
              #e8f5e9 25%,
              #c8e6c9 50%,
              #e8f5e9 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.4s infinite;
          }
          .skeleton-line.short {
            width: 55%;
          }
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </section>
    );
  }

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

  return (
    <section className="blog-posts-section">
      <h2 className="insights-title">Latest Blogs</h2>

      <div className="articles-grid">
        {posts.slice(0, 6).map((post) => {
          const href = getPostHref(post);
          const isExternal = href.startsWith("http");

          const cardContent = (
            <>
              <div className="article-thumb">
                {post.featured_image || post.image ? (
                  <img
                    src={post.featured_image || post.image}
                    alt={post.title}
                    loading="lazy"
                  />
                ) : (
                  "📰"
                )}
              </div>
              <div className="article-body">
                <p className="article-title">{post.title}</p>
                <div className="article-meta">
                  <span className="article-tag">Article</span>
                  <span className="article-time">
                    · {formatDate(getPostDate(post))}
                  </span>
                </div>
              </div>
            </>
          );

          if (isExternal) {
            return (
              <a
                key={post.ID || post.id || post.slug}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="article-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {cardContent}
              </a>
            );
          }

          return (
            <Link
              key={post.ID || post.id || post.slug}
              href={href}
              className="article-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {cardContent}
            </Link>
          );
        })}
      </div>

      {posts.length > 0 && (
        <div className="view-all-wrap">
          <Link href="/blog" className="btn-view-all">
            VIEW ALL ARTICLES &nbsp;→
          </Link>
        </div>
      )}
    </section>
  );
}
