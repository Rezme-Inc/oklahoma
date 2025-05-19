"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">San Francisco Fair Chance Ordinance</h1>
            
            <p className="ia-text mb-6 text-gray35 text-base md:text-lg">
              Employers are required to follow strict rules regarding applicants' and employees' arrest and conviction record(s) and related information.
            </p>

            <div className="bg-gray35/10 p-4 rounded-lg mb-6">
              <p className="ia-text text-gray35 text-base">
                The 2024 Annual Reporting Form (ARF) for the Fair Chance Ordinance (FCO) and Health Care Security Ordinance (HCSO) is due on May 2, 2025. Find ARF Resources at <a href="https://www.sf.gov/submit-employer-annual-reporting-form-olse" className="text-cinnabar underline" target="_blank" rel="noopener noreferrer">www.sf.gov/submit-employer-annual-reporting-form-olse</a>
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Overview</h2>
            <p className="ia-text mb-4 text-gray35 text-base">
              The Fair Chance Ordinance (FCO) requires employers to follow strict rules regarding applicants' and employees' arrest and conviction record(s) and related information. Employers with 5 or more employees (total worldwide) and City contractors, subcontractors, and leaseholders are covered by the FCO.
            </p>

            <p className="ia-text mb-6 text-gray35 text-base">
              The FCO applies to positions that the employee works or will work at least eight hours per week in San Francisco, including temporary, seasonal, part-time, contract, contingent, and commission-based work. It also covers work performed through the services of a temporary or other employment agency, and any form of vocational or educational training - with or without pay.
            </p>

            <p className="ia-text mb-6 text-gray35 text-base">
              The Fair Chance Ordinance (FCO) prohibits covered employers from asking about arrest or conviction records until after a conditional offer of employment.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Prohibited Considerations</h2>
            <p className="ia-text mb-2 text-gray35 text-base">The FCO also prohibits covered employers from ever considering the following:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2 ia-text text-gray35 text-base">
              <li>An arrest not leading to a conviction, except for unresolved arrests</li>
              <li>Participation in a diversion or deferral of judgment program</li>
              <li>A conviction that has been dismissed, expunged, otherwise invalidated, or inoperative</li>
              <li>A conviction in the juvenile justice system</li>
              <li>An offense other than a felony or misdemeanor, such as an infraction</li>
              <li>A conviction that is more than 7 years old (unless the position being considered supervises minors or dependent adults)</li>
              <li>A conviction for decriminalized conduct, including the non-commercial use and cultivation of cannabis</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Employer Requirements</h2>
            <p className="ia-text mb-2 text-gray35 text-base">The Ordinance requires covered employers to:</p>
            <ul className="list-disc pl-5 mb-6 space-y-2 ia-text text-gray35 text-base">
              <li>State in all job solicitations/ads that qualified applicants with arrest and conviction records will be considered for the position in accordance with this ordinance</li>
              <li>Conspicuously post the Official FCO Notice in every workplace/jobsite under the employer's control</li>
              <li>Before taking adverse action such as failing/refusing to hire, discharging, or not promoting an individual based on a conviction history or unresolved arrest, give the individual an opportunity to present evidence that the information is inaccurate, the individual has been rehabilitated, or other mitigating factors</li>
              <li>Provide yearly compliance reports to the OLSE</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Poster Requirements</h2>
            <p className="ia-text mb-6 text-gray35 text-base">
              FCO poster - must be posted at each workplace or job site as of October 1, 2018. Applies to employers citywide with 5 or more employees and City contractors of any size. The poster must be posted in English, Spanish, Chinese, and any language spoken by at least 5% of the employees at the workplace. Employers must also provide a copy of the poster to each applicant or employee before the employer conducts a background check.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Legal Authority</h2>
            <p className="ia-text mb-4 text-gray35 text-base">
              The San Francisco Board of Supervisors passed the Fair Chance Ordinance (FCO) in February, 2014. On April 3, 2018, the San Francisco Board of Supervisors passed an amendment to the FCO. The amendment became operative on October 1, 2018.
            </p>

            <ul className="list-disc pl-5 mb-6 space-y-2 ia-text text-gray35 text-base">
              <li>Article 49 of the San Francisco Police Code - Employers with 5 or more employees</li>
              <li>San Francisco L.E.C. Article 142 - City contractors, subcontractors, and leaseholders</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}