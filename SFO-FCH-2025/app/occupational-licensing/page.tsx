"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OccupationalLicensingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background font-poppins p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <Button 
          variant="ghost" 
          className="mb-4 ia-button-outline text-gray35 font-poppins"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="p-8 bg-card text-card-foreground border border-border shadow-sm rounded-lg">
          <div className="max-w-none font-poppins">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">OKLAHOMA LEGISLATURE</h1>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">ENROLLED SENATE BILL NO. 1691</h2>
              <h3 className="text-lg md:text-xl font-bold text-cinnabar mb-4">AN ACT RELATING TO OCCUPATIONAL LICENSING AND CERTIFICATION</h3>
            </div>
            
            <h4 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
              ESTABLISHING STANDARDS FOR CRIMINAL HISTORY CONSIDERATIONS IN PROFESSIONAL LICENSING
            </h4>

            <div className="space-y-6">
              <div>
                <h5 className="text-base font-bold text-foreground mb-4">Key Provisions:</h5>
                <ul className="space-y-3 text-gray35 text-base">
                  <li><strong>Substantial Relationship Test:</strong> Criminal convictions may only disqualify applicants if they substantially relate to the occupation and pose a reasonable threat to public safety.</li>
                  <li><strong>Time Limitations:</strong> Generally, convictions older than 5 years cannot be used for denial (with specific exceptions for serious offenses).</li>
                  <li><strong>Individualized Assessment:</strong> Licensing boards must consider factors like rehabilitation evidence, time elapsed, and circumstances of the offense.</li>
                  <li><strong>Pre-Application Determinations:</strong> Individuals can request advance determination of whether their criminal history would disqualify them.</li>
                  <li><strong>Due Process Protections:</strong> Written notice requirements and appeal rights for denial decisions.</li>
                  <li><strong>Transparency Requirements:</strong> Licensing boards must publish specific disqualifying offenses and annual statistics.</li>
                </ul>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Assessment Factors:</h5>
                <p className="ia-text text-gray35 text-base mb-4">
                  When evaluating criminal history, licensing authorities must consider:
                </p>
                <ul className="space-y-2 text-gray35 text-base ml-4">
                  <li>• Nature and seriousness of the offense</li>
                  <li>• Time elapsed since the offense</li>
                  <li>• Age of the person when offense was committed</li>
                  <li>• Circumstances surrounding the offense</li>
                  <li>• Nature of the specific occupational duties</li>
                  <li>• Evidence of rehabilitation</li>
                </ul>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Prohibited Denials:</h5>
                <p className="ia-text text-gray35 text-base mb-4">
                  Licensing authorities cannot deny based on:
                </p>
                <ul className="space-y-2 text-gray35 text-base ml-4">
                  <li>• Arrests not followed by conviction</li>
                  <li>• Sealed or expunged convictions</li>
                  <li>• Convictions more than 5 years old (with exceptions)</li>
                  <li>• Vague "good character" standards based solely on criminal history</li>
                </ul>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Effective Date:</h5>
                <p className="ia-text text-gray35 text-base">
                  This act became effective November 1, 2022.
                </p>
              </div>

              <div className="pt-6 border-t">
                <Button
                  asChild
                  className="w-full bg-cinnabar text-white hover:bg-cinnabar-600 transition font-poppins"
                >
                  <a
                    href="https://www.oklegislature.gov/cf_pdf/2021-22%20ENR/SB/SB1691%20ENR.PDF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View Full Text of ENR. S. B. NO. 1691
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 