import Head from "next/head";
import BlogArticleJsonLd from "@/components/blog/blog-article-json-ld";
import BlogLargeContent from "@/components/blog/blog-large-content";
import BlogPostHeader from "@/components/blog/blog-post-header";
import { LARGE_BLOG_CONTENT_BYTES } from "@/lib/blog/blog-content-config";
import {
  getBlogAuthor,
  getBlogCategoryLabel,
  getBlogMetaDescription,
  getFeaturedImage,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/blog/blog-utils";

export default function BlogPostPage({
  meta,
  slug,
  isLargeArticle,
  contentUrl,
  inlineContent,
}) {
  const title = `${meta.title} | ${SITE_NAME}`;
  const description = getBlogMetaDescription(meta);
  const featuredImage = getFeaturedImage(meta);
  const canonicalUrl = `${SITE_ORIGIN}/blog/${slug}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="icon" href="/freewinningtips.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/freewinningtips-icon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/freewinningtips-apple-touch.png" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        {featuredImage && <meta property="og:image" content={featuredImage} />}
        {meta.published_at && (
          <meta property="article:published_time" content={meta.published_at} />
        )}
        {meta.updated_at && (
          <meta property="article:modified_time" content={meta.updated_at} />
        )}
        <meta
          property="article:author"
          content={getBlogAuthor(meta)}
        />
        <meta
          property="article:section"
          content={getBlogCategoryLabel(meta)}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {featuredImage && (
          <meta name="twitter:image" content={featuredImage} />
        )}
      </Head>

      <div
        className="blogs-page"
        style={{
          maxWidth: "850px",
          padding: "0 1rem",
          fontFamily: "Arial, sans-serif",
          margin: "0 auto",
        }}
      >
        <BlogArticleJsonLd meta={meta} slug={slug} />
        <BlogPostHeader meta={meta} />

        {isLargeArticle ? (
          <>
            {meta.excerpt ? (
              <p
                className="blog-excerpt"
                style={{
                  lineHeight: "1.8",
                  fontSize: "1rem",
                  color: "#444",
                  marginBottom: "1.5rem",
                }}
              >
                {meta.excerpt}
              </p>
            ) : null}
            <BlogLargeContent slug={slug} contentUrl={contentUrl} />
          </>
        ) : (
          <div
            className="blog-html-content"
            style={{
              lineHeight: "1.8",
              fontSize: "1rem",
              color: "#1a1a1a",
            }}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: inlineContent || "" }}
          />
        )}

        <br />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const slug = params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  const {
    ensureBlogPostContentCached,
    fetchBlogPostContent,
    fetchBlogPostMeta,
  } = await import("@/lib/blog/fetch-blog-post");

  try {
    const meta = await fetchBlogPostMeta(slug);

    if (!meta) {
      return { notFound: true };
    }

    const contentInfo = await ensureBlogPostContentCached(slug);
    const isLargeArticle = contentInfo.size > LARGE_BLOG_CONTENT_BYTES;

    let inlineContent = null;
    if (!isLargeArticle) {
      inlineContent = await fetchBlogPostContent(slug);
    }

    return {
      props: {
        meta,
        slug,
        isLargeArticle,
        contentUrl: contentInfo.publicUrl,
        inlineContent,
      },
    };
  } catch (error) {
    console.error(`[blog/${slug}] getServerSideProps error:`, error.message);
    return { notFound: true };
  }
}
