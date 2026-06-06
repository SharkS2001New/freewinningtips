// pages/api/clear-cache.js
import { clearAllCacheFiles } from '@/components/functions/pagesDataCache';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authToken = req.headers.authorization;
  const secretKey = process.env.CACHE_CLEAR_KEY;

  if (!authToken || authToken !== `Bearer ${secretKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const clearedCount = clearAllCacheFiles();

    return res.status(200).json({
      message: `Cleared ${clearedCount} cache file(s)`,
      cleared: true,
      count: clearedCount,
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return res.status(500).json({ error: error.message });
  }
}
