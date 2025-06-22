import { TrendingUp } from "lucide-react";

interface TrendingSectionProps {
  tokens: any[];
}

export default function TrendingSection({ tokens }: TrendingSectionProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 gradient-border animate-scale-in" style={{ animationDelay: "200ms" }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          <h3 className="font-medium">Trending</h3>
        </div>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-3 py-2 min-w-max">
          {tokens.map(token => (
            <div
              key={token.id}
              className="flex flex-col justify-between p-4 min-w-[150px] md:min-w-[180px] rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={token.thumb} alt={token.symbol} className="h-8 w-8 rounded-full" />
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="text-xs text-muted-foreground">{token.symbol}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-1">Rank: {token.market_cap_rank ?? 'N/A'}</div>
              <div className="text-xs text-muted-foreground">Score: {token.score + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
