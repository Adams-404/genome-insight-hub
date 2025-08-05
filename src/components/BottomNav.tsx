import { NavLink, useLocation } from "react-router-dom";
import { Home, Upload, GitCompare, History, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { 
    title: "Home", 
    url: "/", 
    icon: Home,
  },
  { 
    title: "Analyze", 
    url: "/analysis", 
    icon: Upload,
  },
  { 
    title: "Compare", 
    url: "/compare", 
    icon: GitCompare,
  },
  { 
    title: "History", 
    url: "/history", 
    icon: History,
  },
  { 
    title: "Insights", 
    url: "/visualizations", 
    icon: BarChart3,
  },
];

export const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = 
            (item.url === "/" && currentPath === "/") ||
            (item.url !== "/" && currentPath.startsWith(item.url));
          
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full",
                "text-muted-foreground hover:text-foreground transition-colors text-xs",
                isActive ? "text-primary" : ""
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5 mb-1",
                  isActive ? "text-primary" : ""
                )} 
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className="text-[10px] font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
