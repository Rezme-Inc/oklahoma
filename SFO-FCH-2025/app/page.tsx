"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Users, ClipboardList, CheckCircle2, FileText, AlertTriangle, ArrowRight, Scale } from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
	{
		title: "Assessment",
		description: "Evaluate conviction history in relation to job duties.",
		icon: <ClipboardList className="w-6 h-6" />,
	},
	{
		title: "Candidate Response",
		description: "Allow candidate to respond or provide evidence.",
		icon: <User className="w-6 h-6" />,
	},
	{
		title: "Reassessment",
		description: "Review candidate input and reassess decision.",
		icon: <AlertTriangle className="w-6 h-6" />,
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
					Fair Chance Hiring Compliance Platform Demo:{" "}
					<span className="text-cinnabar">San Francisco</span>
				</h1>
				<div className="flex gap-8">
					{/* Legal Overview Panel */}
					<Card className="bg-background text-foreground border border-border shadow-sm rounded-lg w-2/5 min-w-[320px] max-w-[480px] flex-shrink-0">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-foreground">
                <Scale className="h-5 w-5 text-cinnabar" />
								Fair Chance Ordinance Legal Overview
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p className="text-gray35">
								San Francisco's Fair Chance Ordinance promotes compliant hiring
								practices by regulating how employers use arrest and conviction
								records in employment decisions.
							</p>
							<div className="space-y-2">
								<h3 className="font-semibold text-gray35">Key Requirements:</h3>
								<ul className="list-disc pl-5 space-y-1 text-sm text-foreground font-poppins">
									<li>Background checks only after conditional offer</li>
									<li>Individualized assessment required</li>
									<li>7-day candidate response period</li>
									<li>3-year record retention mandate</li>
								</ul>
							</div>
							<Button
								variant="outline"
								className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
								onClick={() => router.push("/ordinance")}
							>
								View Full San Francisco Fair Chance Ordinance
							</Button>
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
					      compliance with Fair Chance requirements. This process will guide
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
					            <span className="text-sm text-gray35 text-center block max-w-[340px] mt-2">
					              {step.description}
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
					    <Button
					      className="w-full bg-cinnabar text-white hover:bg-cinnabar-600 transition font-poppins"
					      onClick={() => router.push("/assessment")}
					    >
					      Begin New Assessment Demo
					    </Button>
					  </CardContent>
					</Card>
				</div>
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
							A dedicated portal for candidates to view, update, and share their
							restorative justice and rehabilitation records as part of the Fair
							Chance hiring process.
						</p>
						<Button
							asChild
							className="w-full border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition font-poppins"
							variant="outline"
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