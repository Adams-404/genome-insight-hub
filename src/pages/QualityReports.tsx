import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Download,
  Filter,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  TrendingUp,
  Eye,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const qualityReports = [
  {
    id: "QR-2024-001",
    title: "Weekly Quality Assessment",
    period: "Jan 8-14, 2024",
    generated: "2024-01-15",
    status: "completed",
    score: 94.2,
    analyses: 247,
    issues: 3
  },
  {
    id: "QR-2024-002",
    title: "Monthly Performance Review",
    period: "December 2023",
    generated: "2024-01-01",
    status: "completed",
    score: 96.8,
    analyses: 1024,
    issues: 1
  },
  {
    id: "QR-2024-003",
    title: "Algorithm Validation Report",
    period: "Q4 2023",
    generated: "2023-12-31",
    status: "completed",
    score: 98.1,
    analyses: 3567,
    issues: 0
  }
];

const qualityMetrics = [
  { name: "Sequence Accuracy", value: 99.2, target: 98.0, status: "excellent" },
  { name: "Processing Speed", value: 94.5, target: 90.0, status: "good" },
  { name: "Error Rate", value: 0.8, target: 2.0, status: "excellent", inverted: true },
  { name: "Data Integrity", value: 99.9, target: 99.0, status: "excellent" },
  { name: "Analysis Coverage", value: 87.3, target: 85.0, status: "good" },
  { name: "User Satisfaction", value: 92.7, target: 88.0, status: "excellent" }
];

export const QualityReports = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-success";
      case "good": return "text-primary";
      case "warning": return "text-warning";
      case "poor": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Quality Reports</h1>
          <p className="text-muted-foreground mt-1">Monitor analysis quality and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Quality Metrics</TabsTrigger>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quality Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall Quality Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2">96.4%</div>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +2.1% from last week
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Analyses This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">1,247</div>
                <div className="flex items-center text-sm text-primary">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +15.3% from last week
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success mb-2">99.2%</div>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +0.3% from last week
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Processing Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">2.8s</div>
                <div className="flex items-center text-sm text-success">
                  <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
                  -12.5% from last week
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Quality Status */}
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Current Quality Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <span className={`text-sm font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value}%
                      </span>
                    </div>
                    <Progress 
                      value={metric.inverted ? 100 - metric.value : metric.value} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: {metric.target}%</span>
                      <span className={getStatusColor(metric.status)}>
                        {metric.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Issues */}
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle>Recent Quality Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-sm font-medium">High memory usage detected</p>
                      <p className="text-xs text-muted-foreground">Analysis processing may be slower than usual</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-warning border-warning">
                    Minor
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-sm font-medium">Database optimization completed</p>
                      <p className="text-xs text-muted-foreground">Query performance improved by 15%</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-success border-success">
                    Resolved
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {qualityMetrics.map((metric, index) => (
              <Card key={index} className="border-none shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value}%
                      </span>
                      <Badge variant={metric.status === "excellent" ? "default" : "secondary"}>
                        {metric.status}
                      </Badge>
                    </div>
                    <Progress 
                      value={metric.inverted ? 100 - metric.value : metric.value} 
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Target: {metric.target}%</span>
                      <span>
                        {metric.inverted 
                          ? `${(metric.target - metric.value).toFixed(1)}% below target`
                          : `${(metric.value - metric.target).toFixed(1)}% above target`
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="border-none shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Quality Reports</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{report.title}</h3>
                          {getStatusIcon(report.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>{report.analyses} analyses</span>
                          <span>•</span>
                          <span className="text-success font-medium">{report.score}% quality score</span>
                          {report.issues > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-warning">{report.issues} issues</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Generated {report.generated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle>Quality Score Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Line chart showing quality score over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle>Analysis Volume Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Bar chart showing analysis volume trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-surface rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">Multi-metric comparison chart</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};