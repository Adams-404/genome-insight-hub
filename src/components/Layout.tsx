import { Outlet } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

const LayoutContent = () => {
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" && !isMobile;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className={`fixed top-0 left-0 right-0 z-40 ${isCollapsed ? 'md:pl-14' : 'md:pl-64'}`}>
        <Header isCollapsed={isCollapsed} />
      </div>
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Only on desktop */}
        <aside className={`hidden md:block fixed top-16 bottom-0 ${isCollapsed ? 'w-14' : 'w-64'} border-r border-border bg-background transition-all duration-300 z-50 overflow-visible`}>
          <Sidebar />
        </aside>
        
        {/* Main content */}
        <main className={`flex-1 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} transition-all duration-300`}>
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Bottom navigation - Only on mobile */}
      {isMobile && <BottomNav />}
    </div>
  );
};

export const Layout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};