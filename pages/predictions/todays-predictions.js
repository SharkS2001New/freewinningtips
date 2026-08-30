import React, { useState, useEffect } from 'react';

import getFormattedCurrentDate from '@/components/functions/GetTodaysDate';
import { API_AUTH } from '@/components/functions/apiConfig';
import TodayspageContent from '@/components/seo-content/todays-predictions-content';
import FixturesRow from '@/components/shared/FixturesRow';
import Preloader from '@/components/includes/preloader';
import DataNotFoundPage from '@/components/includes/datanotfound';

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
        headers: { Origin: "https://www.freewinningtips.com", Authorization: `Bearer ${process.env.ACCESS_TOKEN || "UJlhuDILIR1Lc2IEwZDIKOln9d"}` },
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
  const { fetchCachedPaginatedFixtures } = await import('@/components/functions/pagesDataCache');
  const { initialData, totalCount, endpointStatus, error, baseUrl } =
    await fetchCachedPaginatedFixtures({ fetchDate });

  return {
    props: {
      initialData,
      fetchDate,
      endpointStatus,
      error,
      baseUrl,
      totalCount,
    },
  };
}