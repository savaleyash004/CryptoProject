import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Project {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  rank: number;
  image: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const [sortBy, setSortBy] = useState<"rank" | "price" | "change">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedProjects = [...projects].sort((a, b) => {
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
        aVal = a.priceChange;
        bVal = b.priceChange;
        break;
      default:
        return 0;
    }
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5 gradient-border animate-scale-in" style={{ animationDelay: "600ms" }}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          <h3 className="font-medium">Recently Added Projects</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {projects.length} projects
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("rank")}
              >
                Rank {sortBy === "rank" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Project</TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("price")}
              >
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort("change")}
              >
                24h Change {sortBy === "change" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">#{project.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img src={project.image} alt={project.symbol} className="h-8 w-8 rounded-full" />
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(project.price)}</TableCell>
                <TableCell>
                  <div className={cn(
                    "flex items-center font-medium",
                    project.priceChange >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {project.priceChange >= 0 ? (
                      <ArrowUpRight size={16} className="mr-1" />
                    ) : (
                      <ArrowDownRight size={16} className="mr-1" />
                    )}
                    {Math.abs(project.priceChange)}%
                  </div>
                </TableCell>
                <TableCell>
                  <button className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
