
import { useState } from "react";
import { PieChart, DollarSign, TrendingUp, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  value: number;
  change24h: number;
  allocation: number;
}

const mockPortfolioData: PortfolioItem[] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", amount: 0.5, price: 43250.50, value: 21625.25, change24h: 2.34, allocation: 65 },
  { id: 2, name: "Ethereum", symbol: "ETH", amount: 4.2, price: 2650.25, value: 11131.05, change24h: -1.23, allocation: 25 },
  { id: 3, name: "Chainlink", symbol: "LINK", amount: 150, price: 14.25, value: 2137.50, change24h: 12.5, allocation: 10 },
];

export default function Portfolio() {
  const [showAddModal, setShowAddModal] = useState(false);

  const totalValue = mockPortfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalChange = mockPortfolioData.reduce((sum, item) => sum + (item.value * item.change24h / 100), 0);
  const totalChangePercent = (totalChange / totalValue) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden lg:ml-0">
        <Header onRefresh={() => {}} isLoading={false} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Portfolio</h1>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                <span>Add Asset</span>
              </button>
            </div>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign size={20} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Balance</span>
                </div>
                <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={20} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">24h Change</span>
                </div>
                <div className={cn(
                  "text-3xl font-bold",
                  totalChangePercent >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {totalChangePercent >= 0 ? "+" : ""}{totalChangePercent.toFixed(2)}%
                </div>
                <div className={cn(
                  "text-sm",
                  totalChangePercent >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  {formatCurrency(totalChange)}
                </div>
              </div>
              
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <PieChart size={20} className="text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Assets</span>
                </div>
                <div className="text-3xl font-bold">{mockPortfolioData.length}</div>
              </div>
            </div>

            {/* Portfolio Holdings */}
            <div className="rounded-lg border border-border bg-card">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold">Holdings</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left p-4">Asset</th>
                      <th className="text-left p-4">Amount</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Value</th>
                      <th className="text-left p-4">24h Change</th>
                      <th className="text-left p-4">Allocation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPortfolioData.map((item) => (
                      <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {item.symbol.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{item.amount}</td>
                        <td className="p-4">{formatCurrency(item.price)}</td>
                        <td className="p-4 font-medium">{formatCurrency(item.value)}</td>
                        <td className="p-4">
                          <div className={cn(
                            "font-medium",
                            item.change24h >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {item.change24h >= 0 ? "+" : ""}{item.change24h}%
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${item.allocation}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{item.allocation}%</span>
                          </div>
                        </td>
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
