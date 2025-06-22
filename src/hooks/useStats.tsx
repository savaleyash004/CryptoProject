import { useState, useEffect } from "react";
import { fetchMarketStats, fetchTrendingTokens, fetchRecentlyAddedProjects, fetchTVL, fetchFearGreedIndex } from "@/lib/api";

// In a real application, we'd fetch from APIs:
// - Market Data: CoinGecko /api/v3/global
// - Bitcoin Price: CoinGecko /api/v3/simple/price?ids=bitcoin
// - Trending Coins: CoinGecko /api/v3/search/trending
// - Recently Added: CoinGecko /api/v3/coins/markets?order=market_cap_desc
// - Fear & Greed Index: Alternative.me https://api.alternative.me/fng/

export function useStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [tvlData, setTvlData] = useState<any>(null);
  const [fearGreed, setFearGreed] = useState<any>(null);
  const [trending, setTrending] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadStats() {
      setLoading(true);
      try {
        const [apiStats, trendingTokens, recentProjectsData, tvl, fg] = await Promise.all([
          fetchMarketStats(),
          fetchTrendingTokens(),
          fetchRecentlyAddedProjects(),
          fetchTVL(),
          fetchFearGreedIndex()
        ]);
        if (isMounted) {
          // Merge TVL into stats for the top card
          setStats({
            ...apiStats,
            totalValueLocked: tvl?.current ?? 0
          });
          setTrending(trendingTokens);
          setRecentProjects(recentProjectsData);
          setTvlData(tvl);
          setFearGreed(fg);
        }
      } catch (e) {
        if (isMounted) setError('Failed to fetch data');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadStats();
    return () => { isMounted = false; };
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [apiStats, trendingTokens, recentProjectsData, tvl, fg] = await Promise.all([
        fetchMarketStats(),
        fetchTrendingTokens(),
        fetchRecentlyAddedProjects(),
        fetchTVL(),
        fetchFearGreedIndex()
      ]);
      setStats({
        ...apiStats,
        totalValueLocked: tvl?.current ?? 0
      });
      setTrending(trendingTokens);
      setRecentProjects(recentProjectsData);
      setTvlData(tvl);
      setFearGreed(fg);
    } catch (e) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    stats,
    tvlData,
    fearGreed,
    trending,
    recentProjects,
    refreshData
  };
}
