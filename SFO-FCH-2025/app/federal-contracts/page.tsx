'use client';

import { ArrowLeft, ExternalLink, Scale } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FederalContractsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Header Card */}
          <Card className="border-cinnabar">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <Scale className="h-8 w-8 text-cinnabar" />
                5 U.S. Code Chapter 92 Part III Subpart H
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Federal Ban-the-Box Requirements for Government Contractors
              </p>
            </CardHeader>
          </Card>

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-cinnabar">Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This federal law establishes fair chance hiring requirements for companies holding federal contracts. 
                It prohibits federal contractors and subcontractors from inquiring about criminal history information 
                until after a conditional offer of employment has been made.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Applies To:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Federal contractors and subcontractors</li>
                  <li>• Companies with federal contracts valued at $10,000 or more</li>
                  <li>• All positions covered by the federal contract</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Key Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-cinnabar">Key Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Ban-the-Box Provisions:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">🚫 Prohibited Actions</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Cannot inquire about criminal history on initial job applications</li>
                      <li>• Cannot conduct background checks before conditional offer</li>
                      <li>• Cannot ask about criminal history during initial interviews</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium mb-2">✅ Permitted After Conditional Offer</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• May conduct background checks after conditional offer extended</li>
                      <li>• Must consider individual circumstances and rehabilitation</li>
                      <li>• Should provide opportunity for individual to respond</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Individualized Assessment Requirements:</h4>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    When considering criminal history, contractors must conduct an individualized assessment that considers:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Nature and gravity of the offense</li>
                    <li>• Time that has passed since the conviction</li>
                    <li>• Nature of the job held or sought</li>
                    <li>• Evidence of rehabilitation or character development</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-cinnabar">Enforcement & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Contract Compliance:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enforcement through federal contract compliance programs</li>
                  <li>• Violations may result in contract suspension or debarment</li>
                  <li>• Regular compliance monitoring and audits</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> This law applies specifically to federal contractors and positions 
                  covered under federal contracts. Companies should ensure compliance across all relevant positions 
                  and maintain proper documentation of hiring practices.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="bg-cinnabar text-white hover:bg-cinnabar-600 transition font-poppins flex-1"
            >
              <a
                href="https://www.congress.gov/bill/116th-congress/senate-bill/387/text"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Full Legislation
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins flex-1"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FederalContractsPage; 