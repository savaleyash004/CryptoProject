import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, AlertCircle, Info } from "lucide-react";

interface FearGreedIndexProps {
  value: number;
  indicator: string;
  previousValue: number;
  previousChange: number;
}

export default function FearGreedIndex({ 
  value, 
  indicator, 
  previousValue, 
  previousChange 
}: FearGreedIndexProps) {
  // Data for the pie chart
  const data = [
    { name: "Value", value: value },
    { name: "Empty", value: 100 - value }
  ];

  // Color mapping based on the value
  const getColor = (value: number) => {
    if (value >= 75) return "#4ADE80"; // Extreme Greed
    if (value >= 55) return "#A3E635"; // Greed
    if (value >= 45) return "#FACC15"; // Neutral
    if (value >= 25) return "#FB923C"; // Fear
    return "#F87171"; // Extreme Fear
  };
  
  const indicatorColor = getColor(value);
  const isPositiveChange = previousChange >= 0;
  
  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-lg p-6 h-[320px] animate-scale-in flex flex-col justify-between" style={{ animationDelay: "400ms" }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-white drop-shadow-sm">Fear &amp; Greed Index</h3>
          <span className="group relative">
            <Info size={15} className="text-muted-foreground cursor-pointer" />
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 rounded bg-black text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
              The index measures market sentiment from 0 (Extreme Fear) to 100 (Extreme Greed).
            </span>
          </span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={`url(#fearGreedGradient)`} />
              <Cell fill="#23272f" /> {/* Empty space */}
            </Pie>
            <defs>
              <linearGradient id="fearGreedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>
            </defs>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-extrabold text-white drop-shadow-sm">{value}</div>
          <div 
            className="text-xl font-bold mt-1 drop-shadow-sm" 
            style={{ color: indicatorColor }}
          >
            {indicator}
          </div>
          
          <div className="flex items-center mt-4 text-sm">
            <span className="text-muted-foreground mr-2">Yesterday: {previousValue}</span>
            <div className={cn(
              "flex items-center font-bold",
              isPositiveChange ? "text-green-400" : "text-red-400"
            )}>
              {isPositiveChange 
                ? <ArrowUpRight size={16} /> 
                : <ArrowDownRight size={16} />
              }
              <span>{Math.abs(previousChange)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
