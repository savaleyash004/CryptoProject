import axios from 'axios';

const CORS_PROXY = 'https://corsproxy.io/?';
const COINGECKO_BASE = CORS_PROXY + 'https://api.coingecko.com/api/v3';
const COINGECKO_DEFI_TVL = CORS_PROXY + 'https://api.coingecko.com/api/v3/global/decentralized_finance_defi';
const COINGECKO_DEFI_TVL_HISTORY = CORS_PROXY + 'https://api.coingecko.com/api/v3/global/decentralized_finance_defi/history';
const FEAR_GREED_INDEX = 'https://api.alternative.me/fng/';

function formatDate(date: Date) {
  // Returns DD-MM-YYYY
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

export async function fetchMarketStats() {
  try {
    const [globalRes, btcPriceRes] = await Promise.all([
      axios.get(`${COINGECKO_BASE}/global`),
      axios.get(`${COINGECKO_BASE}/simple/price?ids=bitcoin&vs_currencies=usd`)
    ]);

    const globalData = globalRes.data.data;
    const btcPriceData = btcPriceRes.data;

    const result = {
      marketCap: globalData.total_market_cap.usd,
      bitcoinPrice: btcPriceData.bitcoin.usd,
      totalValueLocked: 0, // Placeholder, see TVL note
      tradingVolume: globalData.total_volume.usd,
      dailyChange: globalData.market_cap_change_percentage_24h_usd,
      weeklyChange: 0 // Not available in this endpoint
    };
    console.log('CoinGecko API result:', result);
    return result;
  } catch (e) {
    console.error('CoinGecko API error:', e);
    return null;
  }
}

export async function fetchTVL() {
  try {
    // Get today's TVL
    const { data: todayData } = await axios.get(COINGECKO_DEFI_TVL);
    const today = Number(todayData.data.defi_market_cap);

    // Get yesterday's and last week's TVL
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const [yesterdayRes, lastWeekRes] = await Promise.all([
      axios.get(`${COINGECKO_DEFI_TVL_HISTORY}?date=${formatDate(yesterday)}`),
      axios.get(`${COINGECKO_DEFI_TVL_HISTORY}?date=${formatDate(lastWeek)}`)
    ]);

    const yesterdayTVL = Number(yesterdayRes.data.data.defi_market_cap);
    const lastWeekTVL = Number(lastWeekRes.data.data.defi_market_cap);

    // Calculate % change
    const dailyChange = yesterdayTVL > 0 ? ((today - yesterdayTVL) / yesterdayTVL) * 100 : 0;
    const weeklyChange = lastWeekTVL > 0 ? ((today - lastWeekTVL) / lastWeekTVL) * 100 : 0;

    return {
      current: today,
      dailyChange,
      weeklyChange
    };
  } catch (e) {
    console.error('CoinGecko DeFi TVL API error:', e);
    return { current: 0, dailyChange: 0, weeklyChange: 0 };
  }
}

export async function fetchFearGreedIndex() {
  try {
    const { data } = await axios.get(FEAR_GREED_INDEX);
    if (!data || !data.data || !data.data.length) throw new Error('No FNG data');
    const latest = data.data[0];
    const previous = data.data[1] || latest;
    return {
      value: Number(latest.value),
      indicator: latest.value_classification,
      previousValue: Number(previous.value),
      previousChange: Number(latest.value) - Number(previous.value)
    };
  } catch (e) {
    console.error('Fear & Greed Index API error:', e);
    return { value: 0, indicator: 'Unknown', previousValue: 0, previousChange: 0 };
  }
}

export async function fetchTrendingTokens() {
  try {
    const { data } = await axios.get(`${COINGECKO_BASE}/search/trending`);
    // Map to a simplified structure for the dashboard
    return data.coins.map((item: any) => ({
      id: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      market_cap_rank: item.item.market_cap_rank,
      price_btc: item.item.price_btc,
      thumb: item.item.thumb,
      score: item.item.score
    }));
  } catch (e) {
    console.error('CoinGecko Trending API error:', e);
    return [];
  }
}

export async function fetchRecentlyAddedProjects() {
  try {
    // This gets the top 10 coins by market cap as a proxy for 'recently added' (CoinGecko's /coins/list/new is Pro only)
    const { data } = await axios.get(`${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      price: item.current_price,
      priceChange: item.price_change_percentage_24h,
      marketCap: item.market_cap,
      rank: item.market_cap_rank,
      image: item.image
    }));
  } catch (e) {
    console.error('CoinGecko Recently Added API error:', e);
    return [];
  }
}

// Add more API functions as needed (fetchTrending, fetchPortfolio, etc.) 