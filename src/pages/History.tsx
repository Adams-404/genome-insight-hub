import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Clock as ClockIcon,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

const analysisHistory = [
  {
    id: "ANL-2024-001",
    filename: "covid_variant_b117.fasta",
    type: "Mutation Detection",
    status: "completed",
    date: "2024-01-15 14:30",
    duration: "3.2s",
    mutations: 23,
    similarity: 98.7,
    size: "12.4 KB"
  },
  {
    id: "ANL-2024-002", 
    filename: "patient_genome_chr21.fa",
    type: "Full Analysis",
    status: "completed",
    date: "2024-01-15 13:45",
    duration: "45.7s",
    mutations: 156,
    similarity: 94.2,
    size: "2.1 MB"
  },
  {
    id: "ANL-2024-003",
    filename: "viral_sample_delta.fas",
    type: "GC Content",
    status: "failed",
    date: "2024-01-15 12:20",
    duration: "0.8s",
    mutations: null,
    similarity: null,
    size: "8.9 KB"
  },
  {
    id: "ANL-2024-004",
    filename: "reference_human_exome.fasta",
    type: "Comparison",
    status: "processing",
    date: "2024-01-15 11:10",
    duration: "ongoing",
    mutations: null,
    similarity: null,
    size: "5.7 MB"
  },
  {
    id: "ANL-2024-005",
    filename: "bacterial_16s_sample.fa",
    type: "Translation",
    status: "completed",
    date: "2024-01-14 16:22",
    duration: "2.1s",
    mutations: 8,
    similarity: 99.1,
    size: "4.3 KB"
  },
  {
    id: "ANL-2024-006",
    filename: "plant_chloroplast_seq.fasta",
    type: "Full Analysis",
    status: "completed",
    date: "2024-01-14 15:05",
    duration: "12.4s",
    mutations: 45,
    similarity: 96.8,
    size: "156 KB"
  }
];

export const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredHistory = analysisHistory.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredHistory.length 
        ? [] 
        : filteredHistory.map(item => item.id)
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-warning animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      failed: "destructive", 
      processing: "secondary"
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Analysis History</h1>
          <p className="text-muted-foreground mt-1">View and manage your past genomic analyses</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2 w-fit">
          <ClockIcon className="h-4 w-4" />
          {filteredHistory.length} Records
        </Badge>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-card">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by filename or analysis ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full Analysis">Full Analysis</SelectItem>
                  <SelectItem value="Mutation Detection">Mutation Detection</SelectItem>
                  <SelectItem value="GC Content">GC Content</SelectItem>
                  <SelectItem value="Comparison">Comparison</SelectItem>
                  <SelectItem value="Translation">Translation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 p-3 bg-primary/5 rounded-lg">
              <span className="text-sm text-primary font-medium">
                {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Selected
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="border-none shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Analysis Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table Header */}
              <div className="border-b border-border bg-muted/30 px-4 lg:px-6 py-3 hidden lg:block">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-1">
                    <Checkbox
                      checked={selectedItems.length === filteredHistory.length && filteredHistory.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </div>
                  <div className="col-span-3">File</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Results</div>
                  <div className="col-span-1">Duration</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredHistory.map((item) => (
                  <div key={item.id} className="px-4 lg:px-6 py-4 hover:bg-muted/30 transition-colors">
                    {/* Desktop Layout */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                        />
                      </div>
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">{item.filename}</p>
                            <p className="text-xs text-muted-foreground">{item.id} • {item.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      <div className="col-span-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-sm">
                          <p className="font-medium">{item.date.split(' ')[0]}</p>
                          <p className="text-muted-foreground text-xs">{item.date.split(' ')[1]}</p>
                        </div>
                      </div>
                      <div className="col-span-1">
                        {item.mutations !== null && (
                          <div className="text-center">
                            <p className="text-sm font-medium">{item.mutations}</p>
                            <p className="text-xs text-muted-foreground">mutations</p>
                          </div>
                        )}
                      </div>
                      <div className="col-span-1">
                        <span className="text-sm text-muted-foreground">{item.duration}</span>
                      </div>
                      <div className="col-span-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Results
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => handleSelectItem(item.id)}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <p className="font-medium text-sm truncate">{item.filename}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2">
                              <span>{item.id}</span>
                              <span>•</span>
                              <span>{item.size}</span>
                              <span>•</span>
                              <span>{item.date}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(item.status)}
                                {getStatusBadge(item.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Results
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      {item.mutations !== null && (
                        <div className="flex justify-between text-sm bg-muted/50 p-2 rounded">
                          <span>Mutations: <strong>{item.mutations}</strong></span>
                          <span>Duration: <strong>{item.duration}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <ClockIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No analysis records found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || statusFilter !== "all" || typeFilter !== "all" 
                  ? "Try adjusting your search criteria"
                  : "Start by running your first analysis"
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};