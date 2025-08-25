"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrdinancePage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">EXECUTIVE DEPARTMENT</h1>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">STATE OF OKLAHOMA</h2>
              <h3 className="text-lg md:text-xl font-bold text-cinnabar mb-4">EXECUTIVE ORDER 2016-03</h3>
              <div className="bg-cinnabar/10 p-4 rounded-lg border border-cinnabar mb-4">
                <p className="text-base font-semibold text-foreground mb-2">GOVERNOR KEVIN STITT RENEWED EXECUTIVE ORDER 2016-03</p>
                <p className="text-sm text-gray35">Directing all state agencies to remove from job applications questions regarding convictions and criminal history, unless a felony conviction would automatically render an applicant not qualified</p>
              </div>
              <p className="text-base text-gray35">Originally signed by Governor Mary Fallin • February 24, 2016</p>
            </div>
            
            <h4 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
              REMOVING BARRIERS TO STATE EMPLOYMENT FOR OKLAHOMANS WITH CRIMINAL RECORDS
            </h4>

            <div className="space-y-6">
              <div>
                <h5 className="text-base font-bold text-foreground mb-4">Background and Rationale:</h5>
                <div className="space-y-4 text-gray35 text-base">
                  <p>
                    <strong>One in 12 Oklahomans is a convicted felon.</strong> Currently, over 55,000 Oklahomans are in the custody or under the supervision of the Oklahoma Department of Corrections for a felony offense, the majority of whom will eventually be released back into our community.
                  </p>
                  <p>
                    The majority of these individuals are incarcerated or on probation for <strong>non-violent felony crimes</strong>. In 2015, Governor Fallin issued Executive Order 2015-02, which created the Oklahoma Justice Reform Steering Committee.
                  </p>
                  <p>
                    Employment after a felony conviction is always a challenge, and an individual's ability to gain employment is a <strong>critical and necessary component to reducing recidivism</strong> and for those individuals to lead a productive and successful life.
                  </p>
                </div>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Executive Directive:</h5>
                <p className="ia-text text-gray35 text-base mb-4">
                  The Governor hereby directs and orders all state agencies to <strong>remove from job applications, questions regarding convictions and criminal history</strong>, unless a felony conviction would automatically render an applicant not qualified.
                </p>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">What This Order Does NOT Prevent:</h5>
                <ul className="space-y-2 text-gray35 text-base ml-4">
                  <li>• Employers from inquiring about felony convictions during the <strong>interview process</strong></li>
                  <li>• Employers from conducting <strong>background checks</strong> into prospective employees</li>
                  <li>• Employers from excluding convicted felons when <strong>required by law</strong></li>
                  <li>• Applications for <strong>sensitive governmental positions</strong> where criminal history would be an immediate disqualification</li>
                </ul>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Purpose and Intent:</h5>
                <p className="ia-text text-gray35 text-base mb-4">
                  This Order is intended to provide state job applicants:
                </p>
                <ul className="space-y-2 text-gray35 text-base ml-4">
                  <li>• At least the <strong>initial opportunity for consideration</strong> for employment</li>
                  <li>• An opportunity to <strong>discuss their conviction record</strong> and provide information that indicates rehabilitation</li>
                  <li>• Allow applicants to be considered <strong>based upon their qualifications</strong> without the stigma of a conviction record</li>
                </ul>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Implementation:</h5>
                <p className="ia-text text-gray35 text-base">
                  Copies of this Executive Order are distributed to all Governor's Cabinet Secretaries who shall cause the provisions of this order to be implemented by all appropriate agencies of state government.
                </p>
              </div>

              <div>
                <h5 className="text-base font-bold text-foreground mb-2">Effective Date:</h5>
                <p className="ia-text text-gray35 text-base">
                  This Executive Order took effect February 24, 2016.
                </p>
              </div>

              <div className="pt-6 border-t">
                <Button
                  asChild
                  className="w-full bg-cinnabar text-white hover:bg-cinnabar-600 transition font-poppins"
                >
                  <a
                    href="https://www.sos.ok.gov/documents/executive/1023.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View Full Text of Executive Order 2016-03
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