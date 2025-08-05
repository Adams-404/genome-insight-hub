import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Zap,
  Database,
  Users,
  TrendingUp,
  Server,
  Clock,
  Cpu,
} from "lucide-react";

export const Performance = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performance Metrics</h1>
          <p className="text-muted-foreground mt-1">Real-time system performance and analytics</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2 w-fit">
          <Activity className="h-4 w-4" />
          Live Monitoring
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Processing Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">2.8s</div>
            <Progress value={85} className="h-2 mb-2" />
            <div className="text-sm text-success">↑ 15% faster</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Server className="h-4 w-4" />
              System Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary mb-2">34%</div>
            <Progress value={34} className="h-2 mb-2" />
            <div className="text-sm text-muted-foreground">Optimal range</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent mb-2">1,247</div>
            <Progress value={62} className="h-2 mb-2" />
            <div className="text-sm text-primary">↑ 23% today</div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Database className="h-4 w-4" />
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning mb-2">67%</div>
            <Progress value={67} className="h-2 mb-2" />
            <div className="text-sm text-muted-foreground">2.3GB / 10GB</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};