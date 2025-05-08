"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, FileText, Upload, Phone, MessageSquare, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RequiredDocument {
  type: "jobDescription" | "backgroundCheck" | "restorativeRecord";
  file: File | null;
  notes: string;
}

interface ContactOption {
  id: "call" | "message" | "request";
  selected: boolean;
}

export default function AssessmentIntake() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [documents, setDocuments] = useState<Record<string, RequiredDocument>>({
    jobDescription: { type: "jobDescription", file: null, notes: "" },
    backgroundCheck: { type: "backgroundCheck", file: null, notes: "" },
    restorativeRecord: { type: "restorativeRecord", file: null, notes: "" },
  });
  const [contactOptions, setContactOptions] = useState<ContactOption[]>([
    { id: "call", selected: false },
    { id: "message", selected: false },
    { id: "request", selected: false },
  ]);

  const handleFileChange = (type: keyof typeof documents) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [type]: { ...prev[type], file: e.target.files![0] }
      }));
    }
  };

  const handleNotesChange = (type: keyof typeof documents) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDocuments(prev => ({
      ...prev,
      [type]: { ...prev[type], notes: e.target.value }
    }));
  };

  const toggleContactOption = (optionId: ContactOption["id"]) => {
    setContactOptions(prev => prev.map(option => ({
      ...option,
      selected: option.id === optionId ? !option.selected : option.selected
    })));

    const messages = {
      call: "An agent will contact the candidate within 24 hours to conduct the Fair Chance assessment interview.",
      message: "An agent will reach out to the candidate through our secure messaging channel within 2 hours.",
      request: "A request for restorative documentation has been sent to the candidate's email.",
    };

    toast({
      title: "Contact Option Selected",
      description: messages[optionId],
    });
  };

  const isComplete = Object.values(documents).every(doc => doc.file !== null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    toast({
      title: "Configuring your Fair Chance Compliance Protocol…",
      description: "Please wait while we prepare your assessment.",
    });

    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowSuccessModal(true);
    setIsLoading(false);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    router.push("/assessment/evaluate");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Assessment Intake: Upload Required Files</h1>
            <p className="text-muted-foreground mt-2">
              Please provide the following documentation to proceed with the Fair Chance assessment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Required Documentation
              </h2>

              <div className="space-y-8">
                {/* Job Description Upload */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jobDescription" className="text-lg font-medium">
                      1. Job Description
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Attach the job posting or internal job description for this role. This will help determine whether the offense is job-related as required by San Francisco's Fair Chance Ordinance.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => document.getElementById('jobDescription')?.click()}
                    >
                      <Input
                        id="jobDescription"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange("jobDescription")}
                        accept=".pdf,.docx,.jpg,.png"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {documents.jobDescription.file 
                            ? documents.jobDescription.file.name 
                            : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOCX, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Optional notes about this document"
                      value={documents.jobDescription.notes}
                      onChange={handleNotesChange("jobDescription")}
                    />
                  </div>
                </div>

                {/* Background Check Upload */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="backgroundCheck" className="text-lg font-medium">
                      2. Background Check Report
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload the candidate's background check results that triggered this individualized assessment. The system will ensure only permissible data is considered.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => document.getElementById('backgroundCheck')?.click()}
                    >
                      <Input
                        id="backgroundCheck"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange("backgroundCheck")}
                        accept=".pdf,.docx,.jpg,.png"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {documents.backgroundCheck.file 
                            ? documents.backgroundCheck.file.name 
                            : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOCX, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Optional notes about this document"
                      value={documents.backgroundCheck.notes}
                      onChange={handleNotesChange("backgroundCheck")}
                    />
                  </div>
                </div>

                {/* Restorative Record Upload */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="restorativeRecord" className="text-lg font-medium">
                      3. Restorative Record or Candidate Response
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      If the candidate submitted documentation regarding rehabilitation, mitigating factors, or inaccuracies, upload it here. This is required before making any adverse decision.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => document.getElementById('restorativeRecord')?.click()}
                    >
                      <Input
                        id="restorativeRecord"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange("restorativeRecord")}
                        accept=".pdf,.docx,.jpg,.png"
                      />
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {documents.restorativeRecord.file 
                            ? documents.restorativeRecord.file.name 
                            : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOCX, JPG, PNG (max 10MB)
                        </p>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Optional notes about this document"
                      value={documents.restorativeRecord.notes}
                      onChange={handleNotesChange("restorativeRecord")}
                    />

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-muted-foreground mb-3">
                        Alternative Contact Options:
                      </p>
                      <div className="flex flex-col gap-4">
                        <div className="space-y-3">
                          <Button
                            type="button"
                            variant={contactOptions.find(o => o.id === "call")?.selected ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => toggleContactOption("call")}
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Schedule Assessment Call
                          </Button>
                          {contactOptions.find(o => o.id === "call")?.selected && (
                            <div className="text-sm text-muted-foreground pl-4 border-l-2">
                              An agent will conduct a structured interview with the candidate following our Fair Chance assessment protocol. The call will be scheduled within 24 hours.
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <Button
                            type="button"
                            variant={contactOptions.find(o => o.id === "message")?.selected ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => toggleContactOption("message")}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Send Secure Message
                          </Button>
                          {contactOptions.find(o => o.id === "message")?.selected && (
                            <div className="text-sm text-muted-foreground pl-4 border-l-2">
                              An agent will reach out through our secure messaging platform to gather information about rehabilitation and mitigating factors. Response typically within 2 hours.
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <Button
                            type="button"
                            variant={contactOptions.find(o => o.id === "request")?.selected ? "default" : "outline"}
                            className="w-full justify-start"
                            onClick={() => toggleContactOption("request")}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Request Restorative Record
                          </Button>
                          {contactOptions.find(o => o.id === "request")?.selected && (
                            <div className="text-sm text-muted-foreground pl-4 border-l-2">
                              Send an automated email request to the candidate for documentation of rehabilitation, training certificates, or character references.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={!isComplete || isLoading}
                  className="w-full md:w-auto"
                >
                  {isLoading ? "Processing..." : "Continue"}
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Documents Successfully Uploaded</DialogTitle>
            <DialogDescription className="space-y-4 pt-4 text-base">
              <p>
                Thank you for uploading your fair chance hiring documents! Your materials are now being processed to power the real-time intelligence system that will guide your team through San Francisco's mandated individualized assessments.
              </p>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">What Happens Next:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your reviewers can now begin conducting individualized assessments with intelligent support from your own policies</li>
                  <li>As they evaluate candidates with criminal histories, relevant guidance from your uploaded documents will automatically appear</li>
                  <li>Each assessment question will be accompanied by applicable content from your policies, ensuring compliance with both the Fair Chance Ordinance and your internal protocols</li>
                </ul>
              </div>

              <p>
                This system transforms your policies from static documents into dynamic guidance, enabling consistent, compliant reviews that reflect your organization's approach to fair chance hiring.
              </p>
              
              <p>
                Your team is now ready to conduct legally mandated individualized assessments with confidence, backed by your own customized fair chance protocol.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleContinue}>
              Begin Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}