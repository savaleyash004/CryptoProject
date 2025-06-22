import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";
import { ArrowDownRight, ArrowUpRight, LockIcon, Info } from "lucide-react";

interface GaugeChartProps {
  value: number;
  dailyChange: number;
  weeklyChange: number;
  // Optionally, add a trend array for a mini sparkline in the future
  // trend?: number[];
}

export default function GaugeChart({ value, dailyChange, weeklyChange }: GaugeChartProps) {
  // Format value as billions with 2 decimal places
  const formattedValue = (value / 1000000000).toFixed(2);

  // Gauge chart data setup (show as a percentage of a $200B max for visual effect)
  const max = 200_000_000_000;
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);
  const data = [
    { name: "Value", value: percent },
    { name: "Empty", value: 100 - percent },
  ];

  // For visual appeal, add color gradient
  const COLORS = ["#4A9DFF", "#2DD4BF"];
  const EMPTY_COLOR = "#23272f";

  return (
    <div className="relative rounded-xl border border-border bg-gradient-to-br from-[#1e293b] to-[#0f172a] shadow-lg p-6 h-[320px] animate-scale-in flex flex-col justify-between" style={{ animationDelay: "100ms" }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <LockIcon size={18} className="text-primary" />
          <h3 className="text-base font-semibold text-white drop-shadow-sm">Total Value Locked</h3>
          <span className="group relative">
            <Info size={15} className="text-muted-foreground cursor-pointer" />
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 rounded bg-black text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
              The total value of assets locked in DeFi protocols across all chains.
            </span>
          </span>
        </div>
        <div className="text-2xl font-extrabold text-white tracking-tight">${formattedValue}B</div>
      </div>
      <div className="flex-1 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="filled" fill="url(#gaugeGradient)" />
              <Cell key="empty" fill={EMPTY_COLOR} />
            </Pie>
            <defs>
              <linearGradient id="gaugeGradient" x1="0" y1="0" x2="1" y2="0">
                {COLORS.map((color, index) => (
                  <stop
                    key={index}
                    offset={index / (COLORS.length - 1)}
                    stopColor={color}
                  />
                ))}
              </linearGradient>
            </defs>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8">
          <div className="text-xl font-medium mb-5 text-center text-white/80">TVL Change</div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-[240px]">
            <div className="flex flex-col items-center bg-secondary/60 p-3 rounded-md shadow">
              <div className="text-sm text-muted-foreground mb-1">Daily</div>
              <div className={`flex items-center gap-1 font-bold ${dailyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}> 
                {dailyChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="text-lg">{Math.abs(dailyChange).toFixed(2)}%</span>
              </div>
            </div>
            <div className="flex flex-col items-center bg-secondary/60 p-3 rounded-md shadow">
              <div className="text-sm text-muted-foreground mb-1">Weekly</div>
              <div className={`flex items-center gap-1 font-bold ${weeklyChange >= 0 ? 'text-green-400' : 'text-red-400'}`}> 
                {weeklyChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                <span className="text-lg">{Math.abs(weeklyChange).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
