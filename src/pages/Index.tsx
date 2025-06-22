import { useState } from "react";
import { useStats } from "@/hooks/useStats";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import GaugeChart from "@/components/GaugeChart";
import TrendingSection from "@/components/TrendingSection";
import ProjectsTable from "@/components/ProjectsTable";
import FearGreedIndex from "@/components/FearGreedIndex";
import { Bitcoin, DollarSign, BarChart, LineChart } from "lucide-react";

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 animate-pulse">
      <div className="h-4 w-1/3 bg-muted rounded mb-2" />
      <div className="h-8 w-2/3 bg-muted rounded mb-2" />
      <div className="h-4 w-1/4 bg-muted rounded" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 h-[320px] animate-pulse flex items-center justify-center">
      <div className="h-32 w-32 bg-muted rounded-full" />
    </div>
  );
}

function SkeletonTrending() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 animate-pulse">
      <div className="h-4 w-24 bg-muted rounded mb-4" />
      <div className="flex gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 w-36 bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}

function SkeletonProjects() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 animate-pulse mt-6">
      <div className="h-4 w-40 bg-muted rounded mb-4" />
      <div className="h-32 w-full bg-muted rounded" />
    </div>
  );
}

export default function Index() {
  const {
    loading,
    error,
    stats,
    tvlData,
    fearGreed,
    trending,
    recentProjects,
    refreshData
  } = useStats();

  // Debug log for TVL
  if (tvlData) {
    // eslint-disable-next-line no-console
    console.log('TVL Data:', tvlData);
  }

  // Format large numbers for display
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value?.toFixed(2)}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl text-red-500 font-bold">Error</div>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        <Header onRefresh={refreshData} isLoading={loading} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {loading || !stats ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  <StatsCard
                    title="Market Cap"
                    value={formatCurrency(stats.marketCap)}
                    change={stats.dailyChange}
                    icon={<BarChart size={20} className="text-chart-blue" />}
                    colorClass="from-blue-500/20 to-blue-600/5"
                    animationDelay="0ms"
                  />
                  <StatsCard
                    title="Bitcoin Price"
                    value={formatCurrency(stats.bitcoinPrice)}
                    change={stats.dailyChange}
                    icon={<Bitcoin size={20} className="text-chart-yellow" />}
                    colorClass="from-yellow-500/20 to-yellow-600/5"
                    animationDelay="50ms"
                  />
                  <StatsCard
                    title="Total Value Locked"
                    value={formatCurrency(stats.totalValueLocked)}
                    change={stats.dailyChange}
                    icon={<DollarSign size={20} className="text-chart-green" />}
                    colorClass="from-green-500/20 to-green-600/5"
                    animationDelay="100ms"
                  />
                  <StatsCard
                    title="24h Trading Volume"
                    value={formatCurrency(stats.tradingVolume)}
                    change={stats.dailyChange}
                    icon={<LineChart size={20} className="text-chart-purple" />}
                    colorClass="from-purple-500/20 to-purple-600/5"
                    animationDelay="150ms"
                  />
                </>
              )}
            </div>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {loading || !tvlData ? <SkeletonChart /> : (
                tvlData.current > 0 ? (
                  <GaugeChart
                    value={tvlData.current}
                    dailyChange={tvlData.dailyChange}
                    weeklyChange={tvlData.weeklyChange}
                  />
                ) : (
                  <div className="rounded-lg border border-border bg-card p-5 h-[320px] flex items-center justify-center text-muted-foreground">
                    TVL data not available
                  </div>
                )
              )}
              {loading || !fearGreed ? <SkeletonChart /> : (
                <FearGreedIndex
                  value={fearGreed.value}
                  indicator={fearGreed.indicator}
                  previousValue={fearGreed.previousValue}
                  previousChange={fearGreed.previousChange}
                />
              )}
            </div>
            {/* Trending Section */}
            {loading || !trending.length ? <SkeletonTrending /> : <TrendingSection tokens={trending} />}
            {/* Projects Table */}
            {loading || !recentProjects.length ? <SkeletonProjects /> : <ProjectsTable projects={recentProjects} />}
          </div>
        </main>
      </div>
    </div>
  );
}
