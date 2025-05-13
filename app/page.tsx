import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const HomePage = () => {
  const router = useRouter()

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
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
    </div>
  )
}

export default HomePage 