
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search, Filter } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

interface MarketData {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  rank: number;
}

const mockMarketData: MarketData[] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", price: 43250.50, change24h: 2.34, volume: 28500000000, marketCap: 847000000000, rank: 1 },
  { id: 2, name: "Ethereum", symbol: "ETH", price: 2650.25, change24h: -1.23, volume: 15200000000, marketCap: 318000000000, rank: 2 },
  { id: 3, name: "Binance Coin", symbol: "BNB", price: 315.80, change24h: 3.45, volume: 1800000000, marketCap: 47200000000, rank: 3 },
  { id: 4, name: "Solana", symbol: "SOL", price: 98.75, change24h: 5.67, volume: 2400000000, marketCap: 43500000000, rank: 4 },
  { id: 5, name: "XRP", symbol: "XRP", price: 0.62, change24h: -2.15, volume: 1200000000, marketCap: 33800000000, rank: 5 },
];

export default function Markets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "price" | "change" | "volume">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = mockMarketData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal: number, bVal: number;
    
    switch (sortBy) {
      case "rank":
        aVal = a.rank;
        bVal = b.rank;
        break;
      case "price":
        aVal = a.price;
        bVal = b.price;
        break;
      case "change":
        aVal = a.change24h;
        bVal = b.change24h;
        break;
      case "volume":
        aVal = a.volume;
        bVal = b.volume;
        break;
      default:
        return 0;
    }

    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value.toFixed(2)}`;
  };

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
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
              <h1 className="text-3xl font-bold">Markets</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search cryptocurrencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg bg-card hover:bg-muted transition-colors">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th 
                        className="text-left p-4 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleSort("rank")}
                      >
                        # {sortBy === "rank" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="text-left p-4">Name</th>
                      <th 
                        className="text-left p-4 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleSort("price")}
                      >
                        Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th 
                        className="text-left p-4 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleSort("change")}
                      >
                        24h % {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th 
                        className="text-left p-4 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleSort("volume")}
                      >
                        Volume (24h) {sortBy === "volume" && (sortOrder === "asc" ? "↑" : "↓")}
                      </th>
                      <th className="text-left p-4">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-4 font-medium">#{item.rank}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">
                                {item.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{formatCurrency(item.price)}</td>
                        <td className="p-4">
                          <div className={cn(
                            "flex items-center font-medium",
                            item.change24h >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {item.change24h >= 0 
                              ? <ArrowUpRight size={16} className="mr-1" />
                              : <ArrowDownRight size={16} className="mr-1" />
                            }
                            {Math.abs(item.change24h)}%
                          </div>
                        </td>
                        <td className="p-4">{formatCurrency(item.volume)}</td>
                        <td className="p-4">{formatCurrency(item.marketCap)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
