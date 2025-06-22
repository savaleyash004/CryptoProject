import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, Info } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon?: ReactNode;
  colorClass?: string;
  animationDelay?: string;
  tooltip?: string;
}

function useAnimatedNumber(target: number, duration = 800) {
  const [display, setDisplay] = useState(target);
  const ref = useRef<number>(target);
  useEffect(() => {
    const start = ref.current;
    const diff = target - start;
    if (diff === 0) return;
    let startTime: number | null = null;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplay(start + diff * progress);
      if (progress < 1) requestAnimationFrame(animate);
      else ref.current = target;
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return display;
}

export default function StatsCard({
  title,
  value,
  change,
  icon,
  colorClass = "from-blue-500/20 to-blue-600/5",
  animationDelay = "0ms",
  tooltip
}: StatsCardProps) {
  const isPositive = change >= 0;
  // Try to animate the number if it's a number
  const numericValue = Number(value.replace(/[^\d.\-]/g, ""));
  const animated = !isNaN(numericValue) && isFinite(numericValue);
  const displayValue = animated ? useAnimatedNumber(numericValue) : value;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-gradient-to-br shadow-lg p-6 transition-transform hover:scale-[1.03]",
        colorClass
      )}
      style={{ animationDelay }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-60 pointer-events-none z-0" />
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white drop-shadow-sm">{title}</h3>
            {tooltip && (
              <span className="group relative">
                <Info size={16} className="text-muted-foreground cursor-pointer" />
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 rounded bg-black text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg">
                  {tooltip}
                </span>
              </span>
            )}
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {animated ? displayValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value}
          </div>
          <div
            className={cn(
              "flex items-center text-base font-bold gap-1",
              isPositive ? "text-green-400" : "text-red-400"
            )}
          >
            {isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
            <span>{Math.abs(change).toFixed(2)}%</span>
            <span className="text-xs text-muted-foreground ml-1 font-normal">vs yesterday</span>
          </div>
        </div>
        {icon && (
          <div className="h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30">
            <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
}
