// pages/api/blog-posts.js — homepage latest-news widget (fetch_blog_posts endpoint)
import fs from "fs";
import path from "path";
import { BLOG_API_HEADERS, BLOG_SITE_KEY } from "@/components/functions/apiConfig";
import {
  hasCacheableData,
  removeCacheFileAtPath,
  writeCacheFileAtPath,
} from "@/components/functions/file_cache";

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const CACHE_PATH = path.join(
  process.cwd(),
  "pages",
  "blogscache",
  `homepage-blog-posts-${BLOG_SITE_KEY}.json`
);

function readFreshCache() {
  try {
    if (!fs.existsSync(CACHE_PATH)) return null;

    const cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
    const age = Date.now() - new Date(cache.generatedAt).getTime();

    if (age <= CACHE_TTL_MS) {
      return cache;
    }

    removeCacheFileAtPath(CACHE_PATH);
  } catch {
    // corrupt cache
  }
  return null;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const cached = readFreshCache();
    if (cached) {
      return res.status(200).json({
        fromCache: true,
        generatedAt: cached.generatedAt,
        data: cached.data,
      });
    }

    const response = await fetch(
      `https://api.pitchpredictions.com/api/fetch_blog_posts?site=${BLOG_SITE_KEY}`,
      {
        headers: BLOG_API_HEADERS,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const data = await response.json();
    const posts = data.data || [];

    if (hasCacheableData(posts)) {
      writeCacheFileAtPath(CACHE_PATH, {
        generatedAt: new Date().toISOString(),
        data: posts,
        count: posts.length,
      });
    }

    return res.status(200).json({
      fromCache: false,
      generatedAt: new Date().toISOString(),
      data: posts,
    });
  } catch (error) {
    console.error("Error in blog-posts API:", error);

    try {
      if (fs.existsSync(CACHE_PATH)) {
        const stale = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
        return res.status(200).json({
          fromCache: true,
          isFallback: true,
          generatedAt: stale.generatedAt,
          data: stale.data || [],
        });
      }
    } catch {
      // ignore
    }

    return res.status(500).json({ error: error.message });
  }
}
