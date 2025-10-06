import { Bell, Search, User, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  isCollapsed?: boolean;
}

export const Header = ({ isCollapsed = false }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="h-14 md:h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 w-full">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isMobile && <SidebarTrigger />}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="GenomeX Logo" 
              className="h-28 w-auto object-contain"
            />
            {!isMobile && !isCollapsed && (
              <div className="transition-opacity duration-300">
                <h1 className="text-lg font-semibold text-foreground">GenomeX</h1>
                <p className="text-xs text-muted-foreground hidden md:block">Advanced Genomic Analysis</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search analyses, files..."
                className="pl-10 w-60 lg:w-80 bg-background/50"
              />
            </div>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-warning">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Dr. Sarah Chen</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};