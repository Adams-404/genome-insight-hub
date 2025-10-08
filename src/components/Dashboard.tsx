import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  BarChart3,
  Clock,
  Database,
  FileText,
  GitCompare,
  TrendingUp,
  Upload,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import heroImage from "@/assets/hero-genomic.jpg";

const statsCards = [
  {
    title: "Total Analyses",
    value: "2,847",
    change: "+12.5%",
    icon: FileText,
    trend: "up",
    color: "text-primary"
  },
  {
    title: "Mutations Found",
    value: "1,234",
    change: "+8.2%",
    icon: Activity,
    trend: "up", 
    color: "text-warning"
  },
  {
    title: "Success Rate",
    value: "98.7%",
    change: "+0.5%",
    icon: CheckCircle,
    trend: "up",
    color: "text-success"
  },
  {
    title: "Avg Processing Time",
    value: "3.2s",
    change: "-15.3%",
    icon: Zap,
    trend: "down",
    color: "text-secondary"
  },
];

const recentActivities = [
  {
    id: 1,
    filename: "sample_covid_variant_B117.fasta",
    status: "completed",
    mutations: 23,
    time: "2 minutes ago",
    progress: 100
  },
  {
    id: 2,
    filename: "patient_genome_seq_001.fa",
    status: "processing",
    mutations: null,
    time: "5 minutes ago",
    progress: 67
  },
  {
    id: 3,
    filename: "reference_human_chr21.fasta",
    status: "completed",
    mutations: 156,
    time: "12 minutes ago",
    progress: 100
  },
  {
    id: 4,
    filename: "viral_sample_delta.fas",
    status: "failed",
    mutations: null,
    time: "25 minutes ago",
    progress: 0
  },
];

const quickActions = [
  {
    title: "New Analysis",
    description: "Upload and analyze genomic sequences",
    icon: Upload,
    action: "/analysis",
    color: "bg-gradient-primary"
  },
  {
    title: "Compare Sequences",
    description: "Align and compare multiple sequences",
    icon: GitCompare,
    action: "/compare", 
    color: "bg-gradient-secondary"
  },
  {
    title: "View History",
    description: "Browse past analysis results",
    icon: Clock,
    action: "/history",
    color: "bg-accent"
  },
  {
    title: "Generate Report",
    description: "Create comprehensive analysis reports",
    icon: BarChart3,
    action: "/reports",
    color: "bg-warning"
  },
];

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div 
        className="relative h-64 rounded-2xl overflow-hidden bg-gradient-hero flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(44, 123, 229, 0.8), rgba(124, 58, 237, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to GenomeX</h1>
          <p className="text-xl opacity-90 mb-6">Advanced Genomic Analysis Platform</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>2,500+ Researchers</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>50M+ Sequences Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>99.7% Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="border-none shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Good morning, Dr. Adam</h2>
              <p className="text-muted-foreground">You have 3 analyses in progress and 12 completed today.</p>
            </div>
            <Button className="bg-primary hover:bg-primary-hover shadow-button">
              View All Activity
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-none shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className={`mr-1 h-3 w-3 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'} ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 border-none shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-4 h-auto hover:shadow-card transition-all duration-200"
              >
                <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-none shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      {activity.status === 'completed' && (
                        <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-success bg-background rounded-full" />
                      )}
                      {activity.status === 'failed' && (
                        <AlertCircle className="absolute -top-1 -right-1 h-4 w-4 text-destructive bg-background rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{activity.filename}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.time}</span>
                        {activity.mutations && (
                          <>
                            <span>•</span>
                            <span>{activity.mutations} mutations found</span>
                          </>
                        )}
                      </div>
                      {activity.status === 'processing' && (
                        <Progress value={activity.progress} className="mt-1 h-1" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'processing' ? 'secondary' :
                      'destructive'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="border-none shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">99.2%</div>
              <div className="text-sm text-muted-foreground">Analysis Accuracy</div>
              <Progress value={99.2} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.8s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
              <Progress value={85} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Analyses Today</div>
              <Progress value={62} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};