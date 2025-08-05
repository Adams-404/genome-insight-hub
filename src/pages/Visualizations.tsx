import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Settings,
  Eye,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Visualizations = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Data Visualizations</h1>
          <p className="text-muted-foreground mt-1">Interactive charts and graphs from your genomic analyses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="nucleotide" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="nucleotide">Nucleotide Analysis</TabsTrigger>
          <TabsTrigger value="mutations">Mutation Patterns</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          <TabsTrigger value="comparison">Sequence Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="nucleotide" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Nucleotide Distribution
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Interactive bar chart showing A, T, G, C distribution</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="text-center p-2 bg-primary/10 rounded">
                    <div className="text-lg font-bold text-primary">28.5%</div>
                    <div className="text-xs text-muted-foreground">Adenine (A)</div>
                  </div>
                  <div className="text-center p-2 bg-secondary/10 rounded">
                    <div className="text-lg font-bold text-secondary">21.3%</div>
                    <div className="text-xs text-muted-foreground">Thymine (T)</div>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded">
                    <div className="text-lg font-bold text-accent">25.1%</div>
                    <div className="text-xs text-muted-foreground">Guanine (G)</div>
                  </div>
                  <div className="text-center p-2 bg-warning/10 rounded">
                    <div className="text-lg font-bold text-warning">25.1%</div>
                    <div className="text-xs text-muted-foreground">Cytosine (C)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    GC vs AT Content
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full border-8 border-primary flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">50.2%</div>
                        <div className="text-xs text-muted-foreground">GC Content</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-xl font-bold text-primary">50.2%</div>
                    <div className="text-sm text-muted-foreground">GC Content</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/10 rounded-lg">
                    <div className="text-xl font-bold text-secondary">49.8%</div>
                    <div className="text-sm text-muted-foreground">AT Content</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Sequence Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overall Quality</span>
                    <Badge className="bg-success text-success-foreground">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Length</span>
                    <span className="text-sm font-medium">4,582 bp</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">N's Count</span>
                    <span className="text-sm font-medium">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Composition Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Purine (A+G)</span>
                    <span className="text-sm font-medium">53.6%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pyrimidine (T+C)</span>
                    <span className="text-sm font-medium">46.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Complexity</span>
                    <Badge variant="outline">High</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Statistics Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Analyses</span>
                    <span className="text-sm font-medium">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg GC Content</span>
                    <span className="text-sm font-medium">51.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Updated</span>
                    <span className="text-sm font-medium">2 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mutations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Mutation Frequency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-surface rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">Line chart showing mutation frequency across genome</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle>Mutation Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">SNPs (Single Nucleotide)</span>
                    <Badge className="bg-primary">156</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">Insertions</span>
                    <Badge className="bg-secondary">23</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">Deletions</span>
                    <Badge className="bg-warning">18</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm font-medium">Complex Variants</span>
                    <Badge className="bg-accent">7</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <Card key={i} className="border-none shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quality Metric {i + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-surface rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{Math.round(Math.random() * 100)}%</div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle>Sequence Similarity Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-surface rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Array.from({ length: 9 }, (_, i) => (
                      <div key={i} className="w-16 h-16 bg-primary/20 rounded flex items-center justify-center">
                        <span className="text-xs font-bold">{Math.round(Math.random() * 100)}%</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Heatmap showing sequence similarity percentages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};