import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Upload,
  History,
  GitCompare,
  Settings,
  HelpCircle,
  Home,
  FileText,
  Activity,
  Database,
} from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    description: "Overview & Analytics",
    colorClass: "text-sky-600 bg-sky-500/15"
  },
  { 
    title: "New Analysis", 
    url: "/analysis", 
    icon: Upload,
    description: "Upload & Analyze",
    colorClass: "text-emerald-600 bg-emerald-500/15"
  },
  { 
    title: "Compare Sequences", 
    url: "/compare", 
    icon: GitCompare,
    description: "Sequence Alignment",
    colorClass: "text-violet-600 bg-violet-500/15"
  },
  { 
    title: "Analysis History", 
    url: "/history", 
    icon: History,
    description: "Past Results",
    colorClass: "text-amber-600 bg-amber-500/15"
  },
  { 
    title: "Visualizations", 
    url: "/visualizations", 
    icon: BarChart3,
    description: "Charts & Graphs",
    colorClass: "text-rose-600 bg-rose-500/15"
  },
];

const toolsItems = [
  { 
    title: "Sequence Database", 
    url: "/database", 
    icon: Database,
    badge: "New",
    colorClass: "text-cyan-600 bg-cyan-500/15"
  },
  { 
    title: "Quality Reports", 
    url: "/reports", 
    icon: FileText,
    colorClass: "text-indigo-600 bg-indigo-500/15"
  },
  { 
    title: "Performance", 
    url: "/performance", 
    icon: Activity,
    colorClass: "text-rose-600 bg-rose-500/15"
  },
];

const supportItems = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    colorClass: "text-slate-600 bg-slate-500/15"
  },
  { 
    title: "Help & Support", 
    url: "/help", 
    icon: HelpCircle,
    colorClass: "text-gray-600 bg-gray-500/15"
  },
];

export const Sidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-primary/10 text-primary border-l-4 border-primary font-medium hover:bg-primary/15" 
      : "hover:bg-accent/50 hover:text-foreground border-l-4 border-transparent";
  };

  return (
    <SidebarPrimitive collapsible="icon" className="transition-all duration-300 ease-in-out">
      <SidebarContent className="bg-card/95 backdrop-blur-sm border-r border-border/30 shadow-lg pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 px-4 py-2.5 uppercase tracking-wider">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1.5">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      title={collapsed ? item.title : undefined}
                      className={`${getNavClass(item.url)} transition-all duration-200 rounded-r-lg h-12 flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-3'} group`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${isActive(item.url) ? 'text-primary bg-primary/10' : `${item.colorClass} group-hover:opacity-90`}` }>
                        <item.icon className="h-5 w-5 shrink-0" />
                      </div>
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs text-muted-foreground/80 truncate">{item.description}</div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 px-4 py-2.5 uppercase tracking-wider">
            Tools & Reports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1.5">
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      title={collapsed ? item.title : undefined}
                      className={`${getNavClass(item.url)} transition-all duration-200 rounded-r-lg h-12 flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-3'} group`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${isActive(item.url) ? 'text-primary bg-primary/10' : `${item.colorClass} group-hover:opacity-90`}` }>
                        <item.icon className="h-5 w-5 shrink-0" />
                      </div>
                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between">
                          <span className="font-medium text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 px-4 py-2.5 uppercase tracking-wider">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1.5">
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      title={collapsed ? item.title : undefined}
                      className={`${getNavClass(item.url)} transition-all duration-200 rounded-lg h-12 flex items-center ${collapsed ? 'justify-center px-3' : 'gap-3 px-3'}`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-200 ${isActive(item.url) ? 'text-primary bg-primary/10' : `${item.colorClass} group-hover:opacity-90`}` }>
                        <item.icon className="h-5 w-5 shrink-0" />
                      </div>
                      {!collapsed && (
                        <span className="font-medium text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPrimitive>
  );
};