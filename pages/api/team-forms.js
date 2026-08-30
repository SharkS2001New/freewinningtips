import fs   from 'fs';
import path from 'path';

const CACHE_DIR    = path.join(process.cwd(), 'public', 'cache', 'form-data');
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const API_BASE     = 'https://api.pitchpredictions.com/api/fetch_team_forms_by_team_ids';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { team_ids, fixture_date } = req.query;

  if (!team_ids || !fixture_date) {
    return res.status(400).json({ error: 'team_ids and fixture_date are required' });
  }

  // Normalise: sort IDs for a stable cache filename
  const sortedIds  = [...new Set(team_ids.split(',').map(id => id.trim()))].sort().join('-');
  const cacheFile  = `${fixture_date}_${sortedIds}.json`;
  const cachePath  = path.join(CACHE_DIR, cacheFile);

  // Ensure cache directory exists
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
  } catch (err) {
    console.error('[team-forms] Failed to create cache dir:', err.message);
  }

  // --- Try cache first ---
  if (fs.existsSync(cachePath)) {
    try {
      const raw   = fs.readFileSync(cachePath, 'utf8');
      const cache = JSON.parse(raw);
      const age   = Date.now() - new Date(cache.generatedAt).getTime();

      if (age <= CACHE_TTL_MS) {
        // Cache is fresh — return it
        return res.status(200).json({
          status:      true,
          fromCache:   true,
          generatedAt: cache.generatedAt,
          data:        cache.data,
        });
      }

      // Cache expired — delete it
      fs.unlinkSync(cachePath);
    } catch (err) {
      console.error('[team-forms] Cache read error:', err.message);
      // Corrupt file — fall through to fetch
    }
  }

  // --- Cache miss: fetch from external API ---
  try {
    const url      = `${API_BASE}?team_ids=${team_ids}&fixture_date=${fixture_date}`;
    const response = await fetch(url, {
      headers: { Origin: "https://www.freewinningtips.com", Authorization: `Bearer ${process.env.ACCESS_TOKEN || "UJlhuDILIR1Lc2IEwZDIKOln9d"}` },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const json = await response.json();

    if (!json.status || !json.data) {
      throw new Error(json.message || 'API returned no data');
    }

    // Save to cache — atomic write to avoid partial reads
    const cachePayload = {
      generatedAt: new Date().toISOString(),
      fixtureDate: fixture_date,
      teamIds:     team_ids,
      data:        json.data,
    };

    const tmpPath = `${cachePath}.tmp.${Date.now()}`;
    fs.writeFileSync(tmpPath, JSON.stringify(cachePayload, null, 2));
    fs.renameSync(tmpPath, cachePath);

    return res.status(200).json({
      status:      true,
      fromCache:   false,
      generatedAt: cachePayload.generatedAt,
      data:        json.data,
    });

  } catch (err) {
    console.error('[team-forms] Fetch error:', err.message);

    // If fetch fails but we have an expired cache, use it as fallback
    if (fs.existsSync(cachePath)) {
      try {
        const raw   = fs.readFileSync(cachePath, 'utf8');
        const cache = JSON.parse(raw);
        return res.status(200).json({
          status:      true,
          fromCache:   true,
          isFallback:  true,
          generatedAt: cache.generatedAt,
          data:        cache.data,
        });
      } catch { /* fallback also failed — return error below */ }
    }

    return res.status(500).json({ status: false, error: err.message });
  }
}