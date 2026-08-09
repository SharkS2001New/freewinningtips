import Link from "next/link";
import BlogPostImage from "./blog-post-image";
import {
  formatBlogDate,
  getBlogAuthor,
  getBlogCategoryLabel,
  getFeaturedImage,
} from "@/lib/blog/blog-utils";

export default function BlogPostHeader({ meta }) {
  const category = getBlogCategoryLabel(meta);
  const featuredImage = getFeaturedImage(meta);
  const publishedDate = formatBlogDate(meta.published_at || meta.created_at);

  return (
    <header className="blog-article-header">
      <Link href="/blog" className="blog-back-link">
        ← Back to Blogs
      </Link>

      <h1 className="blog-article-title">{meta.title}</h1>

      <div className="blog-article-meta">
        <div>
          {getBlogAuthor(meta)} / {publishedDate}
        </div>
        <div className="blog-read-time">
          Read Time:&nbsp; <i className="bi bi-clock"></i>&nbsp;
          {meta.read_time || 5} Minutes
        </div>
      </div>

      <small className="blog-article-category">Category: {category}</small>

      {featuredImage && (
        <div className="blog-article-featured">
          <BlogPostImage
            src={featuredImage}
            alt={meta.title || "Blog featured image"}
            priority
          />
        </div>
      )}
    </header>
  );
}
