"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users, ClipboardList, CheckCircle2, FileText, AlertTriangle, ArrowRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
	{
		title: "Background Check",
		description: "Conduct comprehensive background screening and review.",
		icon: <FileText className="w-6 h-6" />,
	},
	{
		title: "Adverse Action Notice",
		description: "Issue preliminary adverse action notification if required.",
		icon: <AlertTriangle className="w-6 h-6" />,
	},
	{
		title: "Candidate Response",
		description: "Allow candidate to respond or provide evidence.",
		icon: <User className="w-6 h-6" />,
	},
	{
		title: "De-risking Process",
		description: "Evaluate mitigation factors and rehabilitation evidence.",
		icon: <Users className="w-6 h-6" />,
	},
	{
		title: "Final Decision",
		description: "Communicate the final employment decision.",
		icon: <CheckCircle2 className="w-6 h-6" />,
	},
];

export default function Home() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-background font-poppins p-0">
			{/* Logo Bar */}
			<div className="flex items-center px-8 py-6">
				<Image
					src="/rezme-logo.png"
					alt="rézme logo"
					width={160}
					height={48}
					priority
				/>
			</div>
			<div className="mx-auto max-w-7xl space-y-8 px-8 pb-8">
				<h1 className="text-4xl font-bold text-foreground">
					Post Background Check Process:{" "}
					<span className="text-cinnabar">Oklahoma</span>
				</h1>
				<div className="flex gap-8">
					{/* Legal Overview Panel */}
					<Card className="bg-background text-foreground border border-border shadow-sm rounded-lg w-2/5 min-w-[320px] max-w-[480px] flex-shrink-0">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-foreground">
                <Scale className="h-5 w-5 text-cinnabar" />
								Legal Intelligence
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-4">
								<div className="space-y-2">
									<Button
										variant="outline"
										className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
										onClick={() => router.push("/ordinance")}
									>
										Executive Order 2016-03
									</Button>
									<p className="text-xs text-gray-500 text-center px-2">
										Applies to Oklahoma state agency positions and hiring processes.
									</p>
								</div>
								<div className="space-y-2">
									<Button
										asChild
										variant="outline"
										className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
									>
										<a
											href="https://www.congress.gov/bill/116th-congress/senate-bill/387/text"
											target="_blank"
											rel="noopener noreferrer"
										>
											5 U.S. Code Chapter 92 Part III Subpart H
										</a>
									</Button>
									<p className="text-xs text-gray-500 text-center px-2">
										Federal law for companies with federal contracts.
									</p>
								</div>
								<div className="space-y-2">
									<Button
										variant="outline"
										className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
										onClick={() => router.push("/occupational-licensing")}
									>
										Oklahoma Occupational Licensing Law (SB 1691)
									</Button>
									<p className="text-xs text-gray-500 text-center px-2">
										Criminal history considerations for professional licensing and certification.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Assessment Launch Panel */}
					<Card className="bg-background text-foreground border border-border shadow-sm rounded-lg w-3/5 max-w-none flex-shrink min-w-[400px]">
					  <CardHeader>
					    <CardTitle className="flex items-center gap-2 text-foreground">
					      <ClipboardList className="h-5 w-5 text-cinnabar" />
					      Launch Assessment Demo
					    </CardTitle>
					  </CardHeader>
					  <CardContent className="space-y-4">
					    <p className="text-gray35">
					      Start a structured workflow to evaluate conviction history in
					      compliance with Oklahoma Ban-the-Box requirements. This process will guide
					      you through:
					    </p>
					    {/* Steps Row (Icons + Arrows) */}
					    <div className="relative w-full mt-6">
					      {/* Grid for steps */}
					      <div
					        className="grid w-full"
					        style={{
					          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
					          alignItems: "start",
					          gap: 0,
					        }}
					      >
					        {steps.map((step, idx) => (
					          <div key={step.title} className="flex flex-col items-center min-w-0">
					            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cinnabar text-white">
					              {step.icon}
					            </div>
					            <span className="text-lg font-bold text-foreground text-center break-words leading-tight mt-2 max-w-[200px]">
					              {step.title}
					            </span>
					          </div>
					        ))}
					      </div>
					      {/* Absolutely positioned arrows */}
					      {steps.length > 1 && (
					        <div className="absolute left-0 top-0 w-full h-16 pointer-events-none">
					          <div className="flex h-16 w-full">
					            {steps.map((_, idx) =>
					              idx < steps.length - 1 ? (
					                <div
					                  key={idx}
					                  className="flex-1 flex items-center justify-center"
					                  style={{ position: "relative" }}
					                >
					                  <span
					                    className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-gray35 select-none"
					                    style={{ zIndex: 10 }}
					                  >
					                    &gt;
					                  </span>
					                </div>
					              ) : (
					                <div key={idx} className="flex-1" />
					              )
					            )}
					          </div>
					        </div>
					      )}
					    </div>
					    <div className="grid grid-cols-2 gap-4">
					      <Button
					        className="w-full bg-cinnabar text-white hover:bg-cinnabar-600 transition font-poppins"
					        onClick={() => router.push("/assessment")}
					      >
					        Begin New Assessment Demo
					      </Button>
					      <Button
					        variant="outline"
					        className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
					        onClick={() => router.push("/assessment/setup")}
					      >
					        Occupational Licensing
					      </Button>
					    </div>
					  </CardContent>
					</Card>
				</div>

				{/* Work Opportunity Tax Credits Card */}
				<Card className="mt-8 bg-background text-foreground border border-border shadow-sm rounded-lg">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-foreground">
							<FileText className="h-5 w-5 text-cinnabar" />
							Work Opportunity Tax Credits (WOTC)
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-gray35">
							The Work Opportunity Tax Credit (WOTC) is a federal tax credit available to employers who hire individuals from certain targeted groups who have consistently faced significant barriers to employment.
						</p>
						<Button
							asChild
							variant="outline"
							className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
						>
							<a
								href="https://wotc.rezmedemo.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Access WOTC Platform
							</a>
						</Button>
					</CardContent>
				</Card>

				{/* Candidate Portal Card */}
				<Card className="mt-8 bg-background text-foreground border border-border shadow-sm rounded-lg">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-foreground">
							<Users className="h-5 w-5 text-cinnabar" />
							Candidate Portal Demo: "The Restorative Record"
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-gray35">
							A dedicated portal for candidates to share evidence of rehabilitation and employability with specialized screening pathways for work release programs, reentry organizations, rehabilitation centers, and diversion initiatives.
						</p>
						<Button
							asChild
							className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
							variant="outline"
						>
							<a
								href="https://candidate.rezme.app/"
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