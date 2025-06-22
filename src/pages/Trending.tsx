
import { useState } from "react";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

interface TrendingItem {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  rank: number;
  category: "gainers" | "losers" | "new";
}

const mockTrendingData: TrendingItem[] = [
  { id: 1, name: "Chainlink", symbol: "LINK", price: 14.25, change24h: 12.5, rank: 1, category: "gainers" },
  { id: 2, name: "Polygon", symbol: "MATIC", price: 0.85, change24h: 8.3, rank: 2, category: "gainers" },
  { id: 3, name: "Avalanche", symbol: "AVAX", price: 36.75, change24h: 6.8, rank: 3, category: "gainers" },
  { id: 4, name: "Shiba Inu", symbol: "SHIB", price: 0.000008, change24h: -15.2, rank: 1, category: "losers" },
  { id: 5, name: "Dogecoin", symbol: "DOGE", price: 0.082, change24h: -12.4, rank: 2, category: "losers" },
  { id: 6, name: "Cardano", symbol: "ADA", price: 0.48, change24h: -8.9, rank: 3, category: "losers" },
  { id: 7, name: "Arbitrum", symbol: "ARB", price: 1.25, change24h: 25.6, rank: 1, category: "new" },
  { id: 8, name: "Optimism", symbol: "OP", price: 2.15, change24h: 18.3, rank: 2, category: "new" },
];

export default function Trending() {
  const [activeCategory, setActiveCategory] = useState<"gainers" | "losers" | "new">("gainers");

  const filteredData = mockTrendingData.filter(item => item.category === activeCategory);

  const formatPrice = (price: number) => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "gainers":
        return "Top Gainers";
      case "losers":
        return "Top Losers";
      case "new":
        return "Newly Listed";
      default:
        return "Trending";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "gainers":
        return <TrendingUp size={20} className="text-green-500" />;
      case "losers":
        return <TrendingDown size={20} className="text-red-500" />;
      case "new":
        return <Star size={20} className="text-blue-500" />;
      default:
        return <TrendingUp size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        <Header onRefresh={() => {}} isLoading={false} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Trending</h1>
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
              {["gainers", "losers", "new"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category as any)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    activeCategory === category
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {getCategoryTitle(category)}
                </button>
              ))}
            </div>

            {/* Trending Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <div key={item.id} className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(activeCategory)}
                      <span className="text-lg font-semibold">#{item.rank}</span>
                    </div>
                    <div className={cn(
                      "flex items-center font-medium text-sm px-2 py-1 rounded",
                      item.change24h >= 0 
                        ? "text-green-500 bg-green-500/10" 
                        : "text-red-500 bg-red-500/10"
                    )}>
                      {item.change24h >= 0 ? "+" : ""}{item.change24h}%
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {item.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold mb-2">
                    {formatPrice(item.price)}
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
