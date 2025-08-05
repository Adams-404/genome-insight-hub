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
    description: "Overview & Analytics"
  },
  { 
    title: "New Analysis", 
    url: "/analysis", 
    icon: Upload,
    description: "Upload & Analyze"
  },
  { 
    title: "Compare Sequences", 
    url: "/compare", 
    icon: GitCompare,
    description: "Sequence Alignment"
  },
  { 
    title: "Analysis History", 
    url: "/history", 
    icon: History,
    description: "Past Results"
  },
  { 
    title: "Visualizations", 
    url: "/visualizations", 
    icon: BarChart3,
    description: "Charts & Graphs"
  },
];

const toolsItems = [
  { 
    title: "Sequence Database", 
    url: "/database", 
    icon: Database,
    badge: "New"
  },
  { 
    title: "Quality Reports", 
    url: "/reports", 
    icon: FileText
  },
  { 
    title: "Performance", 
    url: "/performance", 
    icon: Activity
  },
];

const supportItems = [
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings
  },
  { 
    title: "Help & Support", 
    url: "/help", 
    icon: HelpCircle
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
      ? "bg-primary text-primary-foreground font-medium shadow-button" 
      : "hover:bg-accent hover:text-accent-foreground";
  };

  return (
    <SidebarPrimitive className={collapsed ? "w-16" : "w-72"}>
      <SidebarContent className="bg-card border-r border-border">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground px-4 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass(item.url)} transition-all duration-200 rounded-lg p-3 flex items-center gap-3`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.title}</div>
                          <div className="text-xs opacity-70 truncate">{item.description}</div>
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
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground px-4 py-2">
            Tools & Reports
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass(item.url)} transition-all duration-200 rounded-lg p-3 flex items-center gap-3`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between">
                          <span className="font-medium text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
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
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground px-4 py-2">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass(item.url)} transition-all duration-200 rounded-lg p-3 flex items-center gap-3`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
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