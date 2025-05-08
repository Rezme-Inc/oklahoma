"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileUp, Search, Shield, Upload, Download, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Document {
  id: string;
  name: string;
  category: string;
  uploader: string;
  date: string;
  tags: string[];
  file: File;
}

const documentCategories = [
  "Company Fair Chance Policy",
  "Background Check Matrix",
  "Internal HR Decision Framework",
  "Legal/Compliance Memos",
  "Training or Guidance Documents",
  "External Research or Evidence Standards",
  "Other"
];

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documentCategory, setDocumentCategory] = useState("");
  const [documentNotes, setDocumentNotes] = useState("");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile || !documentCategory) return;

    const newDocument: Document = {
      id: Math.random().toString(36).slice(2),
      name: uploadedFile.name,
      category: documentCategory,
      uploader: "HR Team",
      date: new Date().toLocaleDateString(),
      tags: [documentCategory],
      file: uploadedFile
    };

    setDocuments(prev => [newDocument, ...prev]);
    
    toast({
      title: "Document Uploaded Successfully",
      description: `${uploadedFile.name} has been uploaded and categorized as ${documentCategory}`,
    });

    // Reset form
    setUploadedFile(null);
    setDocumentCategory("");
    setDocumentNotes("");
  };

  const handleDownload = (doc: Document) => {
    const url = URL.createObjectURL(doc.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreview = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-4xl font-bold text-foreground">
          Fair Chance Hiring Compliance Platform
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Legal Overview Panel */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Legal Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                San Francisco's Fair Chance Ordinance promotes equitable hiring practices by regulating how employers use arrest and conviction records in employment decisions.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold">Key Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Background checks only after conditional offer</li>
                  <li>Individualized assessment required</li>
                  <li>7-day candidate response period</li>
                  <li>3-year record retention mandate</li>
                </ul>
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => router.push("/ordinance")}
              >
                View Full Ordinance
              </Button>
            </CardContent>
          </Card>

          {/* Assessment Launch Panel */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Launch Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Start a structured workflow to evaluate conviction history in compliance with Fair Chance requirements. This process will guide you through:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Direct relationship analysis</li>
                <li>Time elapsed consideration</li>
                <li>Mitigating factors review</li>
                <li>Documentation of decision rationale</li>
              </ul>
              <Button 
                className="w-full"
                onClick={() => router.push("/assessment")}
              >
                Begin New Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Document Library Panel */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileUp className="h-5 w-5" />
                Compliance Library
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>All</TabsTrigger>
                  <TabsTrigger value="matrices" onClick={() => setSelectedCategory("Matrices")}>Matrices</TabsTrigger>
                  <TabsTrigger value="procedures" onClick={() => setSelectedCategory("Procedures")}>Procedures</TabsTrigger>
                  <TabsTrigger value="research" onClick={() => setSelectedCategory("Research")}>Research</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {filteredDocs.map((doc) => (
                        <div key={doc.id} className="rounded-lg border p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePreview(doc)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownload(doc)}
                                className="h-8 w-8 p-0"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{doc.uploader}</span>
                            <span>•</span>
                            <span>{doc.category}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-secondary px-2 py-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Upload Fair Chance Documentation</DialogTitle>
                    <DialogDescription>
                      Upload internal documents that define how your organization approaches individualized assessments under San Francisco's Fair Chance Ordinance. These materials will guide reviewers and ensure assessments reflect your company's policy, values, and compliance model.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="document">Document</Label>
                      <div 
                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => document.getElementById('document')?.click()}
                      >
                        <Input
                          id="document"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.docx,.xlsx,.pptx,.csv"
                        />
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {uploadedFile ? uploadedFile.name : "Drag and drop or click to upload"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: PDF, DOCX, XLSX, PPTX, CSV
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={documentCategory} onValueChange={setDocumentCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any additional notes or context for this document"
                        value={documentNotes}
                        onChange={(e) => setDocumentNotes(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button 
                        type="submit" 
                        disabled={!uploadedFile || !documentCategory}
                      >
                        Submit & Save
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
            <DialogDescription>
              Uploaded on {selectedDocument?.date} • {selectedDocument?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 h-full">
            {selectedDocument && (
              <iframe
                src={URL.createObjectURL(selectedDocument.file)}
                className="w-full h-full rounded-md"
                title={selectedDocument.name}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}