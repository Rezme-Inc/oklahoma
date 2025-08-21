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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Oklahoma Ban-the-Box Law</h1>
            
            <p className="ia-text mb-6 text-gray35 text-base md:text-lg">
              Employers in Oklahoma are required to follow strict rules regarding applicants' and employees' arrest and conviction record(s) and related information.
            </p>

            <div className="bg-gray35/10 p-4 rounded-lg mb-6">
              <p className="ia-text text-gray35 text-base">
                Oklahoma employers must maintain records of compliance with Ban-the-Box requirements and may be subject to periodic reporting as required by state labor authorities.
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Overview</h2>
            <p className="ia-text mb-4 text-gray35 text-base">
              Oklahoma's Ban-the-Box law requires employers to follow strict rules regarding applicants' and employees' arrest and conviction record(s) and related information. Employers with 5 or more employees are covered by this law.
            </p>

            <p className="ia-text mb-6 text-gray35 text-base">
              The law applies to positions within Oklahoma, including temporary, seasonal, part-time, contract, contingent, and commission-based work. It also covers work performed through the services of a temporary or other employment agency, and any form of vocational or educational training - with or without pay.
            </p>

            <p className="ia-text mb-6 text-gray35 text-base">
              Oklahoma's Ban-the-Box law prohibits covered employers from asking about arrest or conviction records until after a conditional offer of employment.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Prohibited Considerations</h2>
            <p className="ia-text mb-2 text-gray35 text-base">Oklahoma's Ban-the-Box law also prohibits covered employers from ever considering the following:</p>
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
              <li>Conspicuously post the Official Ban-the-Box Notice in every workplace/jobsite under the employer's control</li>
              <li>Before taking adverse action such as failing/refusing to hire, discharging, or not promoting an individual based on a conviction history or unresolved arrest, give the individual an opportunity to present evidence that the information is inaccurate, the individual has been rehabilitated, or other mitigating factors</li>
                              <li>Provide yearly compliance reports to the Oklahoma Department of Labor</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Poster Requirements</h2>
            <p className="ia-text mb-6 text-gray35 text-base">
              Oklahoma Ban-the-Box poster - must be posted at each workplace or job site. Applies to employers statewide with 5 or more employees. The poster must be posted in English and any language spoken by at least 5% of the employees at the workplace. Employers must also provide a copy of the poster to each applicant or employee before the employer conducts a background check.
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-10">Legal Authority</h2>
            <p className="ia-text mb-4 text-gray35 text-base">
              The Oklahoma Legislature passed the Ban-the-Box law to promote fair hiring practices and reduce barriers to employment for individuals with criminal records.
            </p>

            <ul className="list-disc pl-5 mb-6 space-y-2 ia-text text-gray35 text-base">
              <li>Oklahoma Statutes Title 25, Section 1550 - Employers with 5 or more employees</li>
              <li>5 U.S. Code Chapter 92 Part III Subpart H - Federal guidelines and requirements</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}