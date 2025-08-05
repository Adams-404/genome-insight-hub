import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Upload,
  FileText,
  Settings,
  Play,
  Pause,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Dna,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const analysisOptions = [
  { id: "nucleotide", label: "Nucleotide Statistics", description: "Calculate A, T, G, C distribution" },
  { id: "gc", label: "GC Content Analysis", description: "Analyze GC vs AT content ratios" },
  { id: "mutation", label: "Mutation Detection", description: "Compare against reference sequence" },
  { id: "translation", label: "Protein Translation", description: "Translate DNA to amino acid sequences" },
];

export const Analysis = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["nucleotide", "gc"]);
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "processing" | "completed" | "error">("idle");
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "main" | "reference") => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "main") {
        setSelectedFile(file);
      } else {
        setReferenceFile(file);
      }
    }
  };

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const startAnalysis = () => {
    if (!selectedFile) return;
    
    setAnalysisStatus("processing");
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisStatus("completed");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Genomic Analysis</h1>
          <p className="text-muted-foreground mt-1">Upload and analyze genomic sequences</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Dna className="h-4 w-4" />
          Advanced Analysis Engine
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Upload Section */}
        <Card className="lg:col-span-2 border-none shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              File Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Main Sequence File */}
            <div className="space-y-2">
              <Label htmlFor="main-file">Primary Sequence File</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Drop your FASTA file here, or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports .fasta, .fa, .fas formats (max 100MB)</p>
                  </div>
                  <input
                    id="main-file"
                    type="file"
                    accept=".fasta,.fa,.fas"
                    onChange={(e) => handleFileUpload(e, "main")}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById("main-file")?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <Badge variant="secondary">{(selectedFile.size / 1024).toFixed(1)} KB</Badge>
                </div>
              )}
            </div>

            {/* Reference Sequence File (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="ref-file">Reference Sequence (Optional)</Label>
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Upload reference for mutation detection</p>
                    <p className="text-xs text-muted-foreground">Required for comparative analysis</p>
                  </div>
                  <input
                    id="ref-file"
                    type="file"
                    accept=".fasta,.fa,.fas"
                    onChange={(e) => handleFileUpload(e, "reference")}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => document.getElementById("ref-file")?.click()}
                  >
                    Browse
                  </Button>
                </div>
              </div>
              {referenceFile && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">{referenceFile.name}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Options */}
        <Card className="border-none shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Analysis Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisOptions.map((option) => (
              <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={() => handleOptionToggle(option.id)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="space-y-2 pt-4 border-t border-border">
              <Label>Quality Threshold</Label>
              <Select defaultValue="high">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High Precision</SelectItem>
                  <SelectItem value="ultra">Ultra High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary-hover shadow-button"
              onClick={startAnalysis}
              disabled={!selectedFile || analysisStatus === "processing"}
            >
              {analysisStatus === "processing" ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Progress */}
      {analysisStatus !== "idle" && (
        <Card className="border-none shadow-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {analysisStatus === "processing" && <Clock className="h-5 w-5 text-warning animate-pulse" />}
              {analysisStatus === "completed" && <CheckCircle className="h-5 w-5 text-success" />}
              {analysisStatus === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
              Analysis Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysisStatus === "processing" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Processing sequence data...</span>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">File Size</div>
                    <div className="font-medium">{selectedFile ? (selectedFile.size / 1024).toFixed(1) : '0'} KB</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Estimated Time</div>
                    <div className="font-medium">~{Math.max(1, Math.round((100 - progress) * 0.1))}s</div>
                  </div>
                </div>
              </div>
            )}

            {analysisStatus === "completed" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-success font-medium">Analysis completed successfully!</span>
                  <Button size="sm" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Results
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="text-2xl font-bold text-primary">4,582</div>
                    <div className="text-muted-foreground">Base Pairs</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="text-2xl font-bold text-secondary">58.3%</div>
                    <div className="text-muted-foreground">GC Content</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded">
                    <div className="text-2xl font-bold text-warning">23</div>
                    <div className="text-muted-foreground">Mutations</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};