import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import TodayspageContent from '@/components/seo-content/todays-predictions-content';
import FixturesRow from '@/components/shared/FixturesRow';
import Preloader from '@/components/includes/preloader';
import DataNotFoundPage from '@/components/includes/datanotfound';

// Shared cache config
const CACHE_DIR = path.join(process.cwd(), 'public', 'cache', 'pages-data');
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default function TodaysGames({ 
  initialData, 
  fetchDate, 
  endpointStatus, 
  error,
  baseUrl,
  totalCount 
}) {
  const [allData, setAllData] = useState(initialData || []);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentStartIndex, setCurrentStartIndex] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [loadTrigger, setLoadTrigger] = useState(0);

  const loadMoreData = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    const chunkSize = 20; // Load 20 games per click
    const startIndex = currentStartIndex;
    const endIndex = currentStartIndex + chunkSize - 1;
    
    try {
      const chunkUrl = `${baseUrl}&start_index=${startIndex}&end_index=${endIndex}`;
      
      const response = await fetch(chunkUrl, {
        headers: { "Authorization": "R9TxV3PbOEu7qZnJKgydC5LmX2" }
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const chunkData = await response.json();
      
      if (chunkData.status === true && chunkData.data && chunkData.data.length > 0) {
        setAllData(prevData => [...prevData, ...chunkData.data]);
        setCurrentStartIndex(endIndex + 1);
        
        // If we received less than chunkSize or reached total count, no more data
        if (chunkData.data.length < chunkSize || endIndex >= totalCount) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (loadTrigger > 0) {
      loadMoreData();
    }
  }, [loadTrigger]);

  const handleLoadMore = () => {
    setLoadTrigger(prev => prev + 1);
  };

  // Show loader on initial load
  if (!initialData && !error) {
    return <Preloader />;
  }

  // Show error state
  if (endpointStatus === "error" || error) {
    return (
      <div className="sites-card">
        <DataNotFoundPage props="We don't have any matches to show you right now, please try again later"/>
        <br/>
      </div>
    );
  }

  // Show no data message
  if (allData.length === 0 && !loadingMore) {
    return (
      <div className="sites-card">
        <DataNotFoundPage props="No matches available for today"/>
        <br/>
      </div>
    );
  }

  return (
    <div className="page-root">
      {/* MAIN CONTENT - FIXTURES ROW (Reusable Component) */}
      <div className="container-main">
        <FixturesRow fixtures={allData} predictionType="all" />
        
        {/* Load More Button */}
        {hasMore && (
          <div className="load-more-container" style={{ textAlign: 'center', margin: '20px 0' }}>
            <button 
              onClick={handleLoadMore} 
              disabled={loadingMore}
              className="btn-load-more"
              style={{
                padding: '10px 30px',
                background: '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: loadingMore ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                opacity: loadingMore ? 0.6 : 1
              }}
            >
              {loadingMore ? 'Loading...' : 'Load More Games'}
            </button>
          </div>
        )}
        
        {/* Loading indicator for more games */}
        {loadingMore && (
          <div className="loading-more" style={{ textAlign: 'center', margin: '20px 0' }}>
            <div className="spinner-border spinner-border-sm text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span style={{ marginLeft: '10px' }}>Loading more games...</span>
          </div>
        )}
      </div>

      {/* SEO CONTENT */}
      <TodayspageContent/>
    </div>
  );
}

export async function getServerSideProps() {
  const fetchDate = getFormattedCurrentDate();
  // Use a different cache file for this API endpoint
  const cachePath = path.join(CACHE_DIR, `todays_predictions_${fetchDate}.json`);
  
  // API base URL
  const baseUrl = `https://develop.pitchpredictions.com/api/fetch_all_matches_fixtures_no_limit?fixture_date=${fetchDate}`;
  
  let initialData = [];
  let endpointStatus = "success";
  let error = null;
  let totalCount = 0;

  try {
    // Ensure cache directory exists
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }

    // --- Try shared cache first ---
    if (fs.existsSync(cachePath)) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      const age = Date.now() - new Date(cache.generatedAt).getTime();

      if (age <= CACHE_TTL_MS) {
        return {
          props: { 
            initialData: cache.data, 
            fetchDate,
            endpointStatus: "success",
            error: null,
            baseUrl,
            totalCount: cache.totalCount || 0
          },
        };
      }

      // Cache expired - remove it
      fs.unlinkSync(cachePath);
    }

    // --- Cache miss: fetch first 20 items from API ---
    const firstBatchUrl = `${baseUrl}&start_index=0&end_index=19`;
    
    const res = await fetch(firstBatchUrl, {
      headers: { 
        Authorization: 'R9TxV3PbOEu7qZnJKgydC5LmX2' 
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data.status === true && Array.isArray(data.data)) {
      initialData = data.data;
      
      // Try to get total count from response
      totalCount = data.total || data.data.length * 10; // Fallback estimate
      
      // Save to cache
      const payload = JSON.stringify({
        generatedAt: new Date().toISOString(),
        fixtureDate: fetchDate,
        data: initialData,
        count: initialData.length,
        totalCount: totalCount
      }, null, 2);

      const tmp = `${cachePath}.tmp.${Date.now()}`;
      fs.writeFileSync(tmp, payload);
      fs.renameSync(tmp, cachePath);
    } else {
      endpointStatus = "error";
      error = data.message || "API returned error";
    }

  } catch (err) {
    console.error('[todays-predictions] getServerSideProps error:', err.message);
    endpointStatus = "error";
    error = err.message;

    // Fallback to expired cache rather than empty page
    if (fs.existsSync(cachePath)) {
      try {
        const fallback = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        initialData = fallback.data || [];
        totalCount = fallback.totalCount || 0;
        endpointStatus = "success";
        error = null;
      } catch { 
        // corrupt cache — fixtures stays [] 
      }
    }
  }

  return {
    props: { 
      initialData, 
      fetchDate,
      endpointStatus,
      error,
      baseUrl,
      totalCount
    },
  };
}