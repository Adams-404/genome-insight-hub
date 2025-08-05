import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  GitCompare,
  Upload,
  FileText,
  Download,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Eye,
  Settings,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Compare = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [compareStatus, setCompareStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [alignmentProgress, setAlignmentProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startComparison = () => {
    if (files.length < 2) return;
    
    setCompareStatus("processing");
    setAlignmentProgress(0);
    
    const interval = setInterval(() => {
      setAlignmentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompareStatus("completed");
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 400);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Sequence Comparison</h1>
          <p className="text-muted-foreground mt-1">Align and compare multiple genomic sequences</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2 w-fit">
          <GitCompare className="h-4 w-4" />
          Advanced Alignment Engine
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* File Upload Section */}
        <Card className="xl:col-span-2 border-none shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Upload Sequences to Compare
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-xl p-6 lg:p-8 text-center hover:border-primary/50 transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <GitCompare className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Upload multiple sequences for comparison</p>
                  <p className="text-xs text-muted-foreground mt-1">FASTA, FA, FAS formats supported (min 2 files)</p>
                </div>
                <input
                  type="file"
                  accept=".fasta,.fa,.fas"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="compare-files"
                />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("compare-files")?.click()}
                  className="hover:bg-primary/10"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Uploaded Sequences ({files.length})</Label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Seq {index + 1}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Comparison Settings */}
        <Card className="border-none shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Alignment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Algorithm</Label>
              <Select defaultValue="clustalw">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clustalw">ClustalW</SelectItem>
                  <SelectItem value="muscle">MUSCLE</SelectItem>
                  <SelectItem value="mafft">MAFFT</SelectItem>
                  <SelectItem value="tcoffee">T-Coffee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gap Penalty</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (-5)</SelectItem>
                  <SelectItem value="medium">Medium (-10)</SelectItem>
                  <SelectItem value="high">High (-15)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Matrix</Label>
              <Select defaultValue="blosum62">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blosum62">BLOSUM62</SelectItem>
                  <SelectItem value="pam250">PAM250</SelectItem>
                  <SelectItem value="identity">Identity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary-hover shadow-button"
              onClick={startComparison}
              disabled={files.length < 2 || compareStatus === "processing"}
            >
              {compareStatus === "processing" ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-pulse" />
                  Aligning...
                </>
              ) : (
                <>
                  <GitCompare className="mr-2 h-4 w-4" />
                  Start Comparison
                </>
              )}
            </Button>

            {files.length < 2 && (
              <div className="flex items-center gap-2 text-xs text-warning bg-warning/10 p-2 rounded-lg">
                <AlertTriangle className="h-3 w-3" />
                <span>Upload at least 2 sequences to compare</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comparison Progress */}
      {compareStatus !== "idle" && (
        <Card className="border-none shadow-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {compareStatus === "processing" && <Zap className="h-5 w-5 text-warning animate-pulse" />}
              {compareStatus === "completed" && <CheckCircle className="h-5 w-5 text-success" />}
              Alignment Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            {compareStatus === "processing" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Performing sequence alignment...</span>
                  <span className="text-sm font-medium">{Math.round(alignmentProgress)}%</span>
                </div>
                <Progress value={alignmentProgress} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Sequences</div>
                    <div className="font-medium">{files.length} files</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Estimated Time</div>
                    <div className="font-medium">~{Math.max(1, Math.round((100 - alignmentProgress) * 0.2))}s</div>
                  </div>
                </div>
              </div>
            )}

            {compareStatus === "completed" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-success font-medium">Alignment completed successfully!</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View Results
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="alignment">Alignment</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">94.7%</div>
                        <div className="text-sm text-muted-foreground">Average Similarity</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/5 rounded-lg">
                        <div className="text-2xl font-bold text-secondary">156</div>
                        <div className="text-sm text-muted-foreground">Conserved Regions</div>
                      </div>
                      <div className="text-center p-4 bg-warning/5 rounded-lg">
                        <div className="text-2xl font-bold text-warning">23</div>
                        <div className="text-sm text-muted-foreground">Variant Positions</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="alignment">
                    <div className="p-4 bg-muted/30 rounded-lg font-mono text-xs overflow-x-auto">
                      <div className="space-y-1">
                        <div>Seq1: ATCGATCGATCGATCGATCG<span className="bg-warning/30">A</span>TCGATCGATCG</div>
                        <div>Seq2: ATCGATCGATCGATCGATCG<span className="bg-warning/30">T</span>TCGATCGATCG</div>
                        <div>Seq3: ATCGATCGATCGATCGATCG<span className="bg-warning/30">A</span>TCGATCGATCG</div>
                        <div className="text-center text-muted-foreground">||||||||||||||||||||| |||||||||||</div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="analysis">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Phylogenetic Distance</span>
                        <Badge variant="secondary">0.023</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Gap Percentage</span>
                        <Badge variant="secondary">2.1%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Conservation Score</span>
                        <Badge variant="secondary">8.7/10</Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};