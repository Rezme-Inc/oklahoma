"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <h1 className="text-4xl font-bold text-foreground">
          San Francisco Fair Chance Hiring Compliance Platform Demo
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {/* Legal Overview Panel */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                San Francisco Fair Chance Ordinance Legal Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                San Francisco's Fair Chance Ordinance promotes compliant hiring practices by regulating how employers use arrest and conviction records in employment decisions.
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
                View Full San Francisco Fair Chance Ordinance
              </Button>
            </CardContent>
          </Card>

          {/* Assessment Launch Panel */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Launch Assessment Demo</CardTitle>
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
                Begin New Assessment Demo
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* New Candidate Portal Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Candidate Portal Demo: "The Restorative Record"</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              A dedicated portal for candidates to view, update, and share their restorative justice and rehabilitation records as part of the Fair Chance hiring process.
            </p>
            <Button
              asChild
              className="w-full"
              variant="default"
            >
              <a
                href="https://cornell.restorativerecord.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo The Restorative Record
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}