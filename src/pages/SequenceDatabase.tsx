import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Search,
  Filter,
  Download,
  Eye,
  Star,
  Bookmark,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const referenceGenomes = [
  {
    id: "hg38",
    name: "Human Genome (GRCh38/hg38)",
    organism: "Homo sapiens",
    size: "3.2 Gb",
    released: "2013-12-17",
    quality: "Complete",
    downloads: "2.1M",
    source: "NCBI",
    description: "Latest human reference genome assembly"
  },
  {
    id: "mm10",
    name: "Mouse Genome (GRCm38/mm10)",
    organism: "Mus musculus",
    size: "2.7 Gb",
    released: "2011-12-09",
    quality: "Complete",
    downloads: "890K",
    source: "NCBI",
    description: "Mouse reference genome assembly"
  },
  {
    id: "dm6",
    name: "Drosophila Genome (dm6)",
    organism: "Drosophila melanogaster",
    size: "143 Mb",
    released: "2014-08-01",
    quality: "Complete",
    downloads: "567K",
    source: "FlyBase",
    description: "Fruit fly reference genome"
  },
  {
    id: "ce11",
    name: "C. elegans Genome (ce11)",
    organism: "Caenorhabditis elegans",
    size: "100 Mb",
    released: "2013-02-07",
    quality: "Complete",
    downloads: "234K",
    source: "WormBase",
    description: "Nematode reference genome"
  },
  {
    id: "sc3",
    name: "S. cerevisiae Genome (sacCer3)",
    organism: "Saccharomyces cerevisiae",
    size: "12 Mb",
    released: "2011-04-15",
    quality: "Complete",
    downloads: "445K",
    source: "SGD",
    description: "Baker's yeast reference genome"
  },
  {
    id: "ecoli",
    name: "E. coli Genome (K-12 MG1655)",
    organism: "Escherichia coli",
    size: "4.6 Mb",
    released: "2020-03-10",
    quality: "Complete",
    downloads: "1.2M",
    source: "NCBI",
    description: "E. coli laboratory strain genome"
  }
];

const customSequences = [
  {
    id: "ref001",
    name: "COVID-19 Reference Genome",
    organism: "SARS-CoV-2",
    size: "29.9 Kb",
    uploaded: "2024-01-10",
    uses: 156,
    isPublic: true
  },
  {
    id: "ref002", 
    name: "Mitochondrial DNA Reference",
    organism: "Homo sapiens",
    size: "16.6 Kb",
    uploaded: "2024-01-08",
    uses: 89,
    isPublic: false
  },
  {
    id: "ref003",
    name: "BRCA1 Gene Sequence",
    organism: "Homo sapiens",
    size: "81.2 Kb",
    uploaded: "2024-01-05",
    uses: 234,
    isPublic: true
  }
];

export const SequenceDatabase = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Sequence Database</h1>
          <p className="text-muted-foreground mt-1">Browse reference genomes and custom sequences</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            New Feature
          </Badge>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Upload Reference
          </Button>
        </div>
      </div>

      <Tabs defaultValue="references" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="references">Reference Genomes</TabsTrigger>
          <TabsTrigger value="custom">Custom Sequences</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="references" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-none shadow-card">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search reference genomes..."
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Organism" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Organisms</SelectItem>
                      <SelectItem value="human">Human</SelectItem>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="fly">Drosophila</SelectItem>
                      <SelectItem value="worm">C. elegans</SelectItem>
                      <SelectItem value="yeast">S. cerevisiae</SelectItem>
                      <SelectItem value="bacteria">Bacteria</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[140px]">
                      <SelectValue placeholder="Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Quality</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reference Genomes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {referenceGenomes.map((genome) => (
              <Card key={genome.id} className="border-none shadow-card hover:shadow-elegant transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                        {genome.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground italic">{genome.organism}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{genome.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size:</span>
                      <span className="ml-1 font-medium">{genome.size}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quality:</span>
                      <Badge variant="outline" className="ml-1 text-xs">
                        {genome.quality}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Source:</span>
                      <span className="ml-1 font-medium">{genome.source}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="ml-1 font-medium">{genome.downloads}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Released {genome.released}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle>Custom Reference Sequences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customSequences.map((seq) => (
                  <div key={seq.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Database className="h-8 w-8 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{seq.name}</h3>
                          {seq.isPublic && (
                            <Badge variant="outline" className="text-xs">Public</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="italic">{seq.organism}</span>
                          <span>•</span>
                          <span>{seq.size}</span>
                          <span>•</span>
                          <span>Used {seq.uses} times</span>
                          <span>•</span>
                          <span>Uploaded {seq.uploaded}</span>
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
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {customSequences.length === 0 && (
                <div className="text-center py-12">
                  <Database className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No custom sequences</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload your own reference sequences to get started</p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Upload Sequence
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                Favorite Sequences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Star className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No favorites yet</h3>
                <p className="text-sm text-muted-foreground">Star sequences to add them to your favorites</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};