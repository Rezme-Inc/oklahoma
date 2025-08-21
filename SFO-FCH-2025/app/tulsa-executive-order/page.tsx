"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TulsaExecutiveOrderPage() {
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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">OFFICE OF THE MAYOR</h1>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">TULSA OKLAHOMA</h2>
              <h3 className="text-lg md:text-xl font-bold text-cinnabar mb-4">EXECUTIVE ORDER NO.2016-4</h3>
            </div>
            
            <h4 className="text-lg md:text-xl font-bold text-foreground mb-6 text-center">
              ESTABLISHING A POLICY TO ENSURE THAT APPLICANTS WITH ARREST AND CONVICTION RECORDS HAVE A FAIR OPPORTUNITY FOR EMPLOYMENT WITH THE CITY OF TULSA AND RESTRICTING THE CITY OF TULSA'S INQUIRY INTO AN APPLICANT'S CRIMINAL HISTORY FOR CERTAIN POSITIONS BY REMOVING THE QUESTION FROM THE EMPLOYMENT APPLICATION (BAN THE BOX)
            </h4>

            <div className="space-y-6">
              <div>
                <p className="ia-text text-gray35 text-base mb-4">
                  <strong>Whereas,</strong> the State of Oklahoma's prison population continues to grow and leads the nation in the number of women in prison, and;
                </p>
                <p className="ia-text text-gray35 text-base mb-4">
                  <strong>Whereas,</strong> Tulsa County is the largest contributor to the state's number of incarcerated women, and;
                </p>
                <p className="ia-text text-gray35 text-base mb-4">
                  <strong>Whereas,</strong> the Mayor's Commission on the Status of Women recently issued a report that is designed to serve as a roadmap for moving women from incarceration to rehabilitation, with employment being one of its major focuses, and;
                </p>
                <p className="ia-text text-gray35 text-base mb-6">
                  <strong>Whereas,</strong> the Mayor has expressed his support for the Commission's "ban the box" initiative and is encouraging local businesses to be "second chance friendly" by taking the box off of job applications that requests potential employees to identify as felons.
                </p>
              </div>

              <p className="ia-text text-foreground text-base font-semibold mb-6">
                By virtue of the power vested in me as Mayor of the City of Tulsa, it is hereby ordered:
              </p>

              <div className="space-y-6">
                <div>
                  <h5 className="text-base font-bold text-foreground mb-2">Section 1. Purpose:</h5>
                  <p className="ia-text text-gray35 text-base">
                    To establish a new City of Tulsa policy that will allow for full and fair consideration of those applicants with a criminal history and, where appropriate, ensure that the City of Tulsa will not inquire into an applicant's criminal history on an initial employment application form.
                  </p>
                </div>

                <div>
                  <h5 className="text-base font-bold text-foreground mb-2">Section 2. Functions:</h5>
                  <p className="ia-text text-gray35 text-base">
                    The Human Resources Department is responsible for the development of all employment policies and procedures. It is hereby directed to remove questions regarding convictions and criminal history from initial job applications, except for positions it determines perform sensitive tasks or are exposed to sensitive information such that a criminal history would disqualify the applicant from the position. For such positions, an applicant is required to disclose his or her criminal history on the application.
                  </p>
                </div>

                <div>
                  <h5 className="text-base font-bold text-foreground mb-2">Section 3. Employee Benefits:</h5>
                  <p className="ia-text text-gray35 text-base">
                    Applicants are considered for employment in the classified service based on their merit and fitness, as determined by competitive procedures. The Human Resources Department will determine when a criminal background check is warranted for a position. When the background check is performed, it should be conducted before the certification process unless circumstances warrant a different timeframe.
                  </p>
                </div>

                <div>
                  <h5 className="text-base font-bold text-foreground mb-2">Section 4. Applicant Input:</h5>
                  <p className="ia-text text-gray35 text-base">
                    If a criminal background check yields information that is of concern to the Human Resources Department, the applicant is allowed to review the findings upon request, and can provide rebuttal or supplemental information for the Human Resources Department's consideration.
                  </p>
                </div>

                <div>
                  <h5 className="text-base font-bold text-foreground mb-2">Section 5. Effective Date:</h5>
                  <p className="ia-text text-gray35 text-base">
                    This Executive Order shall take effect on the 15th day of November, 2016.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 