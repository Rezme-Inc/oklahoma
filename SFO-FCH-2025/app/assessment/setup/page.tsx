"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Building2, FileText, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Oklahoma state agencies - deduplicated and alphabetized
const agencies = [
  "Abstractors Board, Oklahoma",
  "Accountancy Board, Oklahoma",
  "Agriculture, Department of",
  "Alcohol and Drug Counselors, Oklahoma State Board of Licensed",
  "Alcohol and Drug Influence, Oklahoma State Board of Tests for",
  "Alcoholic Bev Laws Enforcement- ABLE",
  "Architects, Landscape Architects & Registered Interior Designers, Board of",
  "Behavioral Health Licensure, Board of",
  "Board of Bar Examiners of the state of Oklahoma",
  "Chiropractic Examiners, State Board of",
  "Construction Industries Board",
  "Consumer Credit, Department of",
  "Corporation Commission",
  "Cosmetology and Barbering, Oklahoma State Board of",
  "Council on Law Enforcement Education and Training",
  "Dentistry, Board of",
  "Education, Oklahoma State Department of",
  "Environmental Quality, Oklahoma Department of",
  "Fire Marshall",
  "Funeral, Board of",
  "Health, Department of",
  "Horse Racing Commission",
  "Labor, Department of",
  "Licensed Social Workers, Oklahoma State Board of",
  "Long-Term Care Administrators, Oklahoma State Board of Examiners for",
  "Medical Licensure and Supervision, State Board of",
  "Mental Health and Substance Abuse Services, Department of",
  "Mines, Department of",
  "Nursing Board",
  "OK Insurance Department",
  "Optometry Board",
  "Osteopathic Examiners, Oklahoma Board of",
  "Perfusionists, Board of Examiners of",
  "Pharmacy, State Board of",
  "Podiatry, Oklahoma State Board of",
  "Professional Engineers & Land Surveyors, State Board of licensure for",
  "Psychologists Examiners, Board of",
  "Public Safety, Oklahoma Department of",
  "Real Estate Appraiser Board",
  "Real Estate Commission, Oklahoma",
  "Securities Department, Oklahoma",
  "Shorthand Reporters, Board of Examiners Official",
  "Speech Pathology & Audiology, Board of Examiners for",
  "Veterinary Medical Examiners, Oklahoma State Board of",
  "Water Resources Board"
];

const licenses = [
  "Abstractor",
  "Accountant, Certified Public (CPA)",
  "Accountant, Public (PA)",
  "Active Broker License",
  "Adjuster - Insurance Adjuster",
  "Adjuster Individual-Public",
  "Adult Day Care (ADC) Administrator",
  "Adult Day Care Aide",
  "Advanced Practice Registered Nurse (APRN) - Clinical Nurse Midwife (CNM)",
  "Advanced Practice Registered Nurse (APRN) - Clinical Nurse Specialist (CNS)",
  "Advanced Practice Registered Nurse (APRN) - Certified Nurse Practitioner (CNP)",
  "Advanced Practice Registered Nurse (APRN) - Certified Registered Nurse Anesthetist (CRNA)",
  "Advanced Unlicensed Assistant (AUA)",
  "Alarm/Locksmith/Fire Sprinkler (Company) Manager",
  "Alarm/Locksmith/Fire Sprinkler Salesperson",
  "Alarm/Locksmith/Fire Sprinkler Technician",
  "Alarm/Locksmith/Fire Sprinkler Trainee",
  "Alcohol and Drug Substance Abuse Course Assessor",
  "Alcohol and Drug Substance Abuse Course Facilitator",
  "Alternative Fuels Compression Technician",
  "Alternative Fuels Equipment Technician",
  "Anesthesiologist Assistant",
  "Architect License",
  "Asbestos Abatement Supervisor",
  "Asbestos Contractor",
  "Asbestos Inspector",
  "Asbestos Management Planner",
  "Asbestos Project Designer",
  "Asbestos Worker",
  "Athletic Trainer",
  "Athletic Trainer, Apprentice",
  "Attorney (Lawyer)",
  "Audiologist",
  "Bail Bondsman License (Professional Bondsman, Cash Bondsman, Surety Bondsman, and Property Bondsman)",
  "Bail Enforcer-Armed",
  "Bail Enforcer-Unarmed",
  "Barber",
  "Barber Instructor",
  "Behavioral Health Case Manager",
  "Blaster, Surface",
  "Body Piercing Artist",
  "Boiler/Pressure Vessel Operator",
  "Breath-Alcohol Operator",
  "Broker Associate License",
  "Broker-Dealer Agent",
  "Building & Construction Inspector",
  "C-A Lab Certification",
  "Certified Animal Euthanasia Technician",
  "Certified Behavioral Health Case Manager",
  "Certified Chiropractic Assistant",
  "Certified General Real Estate Appraiser",
  "Certified Micropigmentologists",
  "Certified Nursing Home Assistant Administrator (CAA)",
  "Certified Residential Real Estate Appraiser",
  "Certified Soil Profiler",
  "Chiropractor",
  "Clinical Social Worker, Licensed",
  "Combination Licensed (Private Investigator/Security Guard-Armed)",
  "Commercial Geotechnical Drilling",
  "Commercial Geothermal Drilling",
  "Commercial Motorcycle Training School Instructor",
  "Commercial Truck Driver Training School Instructor",
  "Commercial Water Well Drilling",
  "Commercial Water Well Pump Installation",
  "Cosmetician",
  "Cosmetologist",
  "Cosmetology Instructor",
  "Customer Service Rep (CSR)",
  "D-A Operator Certification",
  "Dental Assistant Permit",
  "Dental Hygiene License",
  "Dental License",
  "Developmentally Disabled Direct Care Aide",
  "Distribution/Collection Tech",
  "Driver License - Designated Examiners",
  "Driver License - Third Party Examiners",
  "Driver Training Commercial School Instructor",
  "Electrician",
  "Elevator Apprentice",
  "Elevator Certificate Inspector",
  "Elevator Mechanic License",
  "Elevator Special Inspector License",
  "Elevator Witness Inspector License",
  "Embalmer",
  "Emergency Medical Responder",
  "Emergency Medical Technician (EMT)",
  "Employee",
  "Facialist/Esthetician",
  "Faculty-Veterinarian",
  "Feeding Assistant",
  "Fire Extinguisher licenses: Qualified Agent, Technician, Salesperson, Trainee",
  "Fireworks Outdoor Display Operator",
  "Funeral Director",
  "Gaming Vendor: includes Distributor Employee, Manufacturer Employee, Manufacturer/Distributor Employee, Vendor, Vendor Employee, Key Executive (Non-Track)",
  "Hearing Aid Licensees",
  "Hoisting Engineer, Underground",
  "Home Health Administrators",
  "Home Health Aide",
  "Home Inspector",
  "Horse Racing Professional: includes Owner, Trainer, Assistant Trainer, Jockey, Apprentice Jockey, Jockey Agent, Groom/Hot Walker Exercise Rider, Pony Rider, Owner/Trainer, Owner/Assistant Trainer, Veterinarian, Veterinarian Assistant, Bloodstock Agent, Authorized Agent, Industry/ Breed Representative, Blacksmith, Equine Dentist, Equine Chiropractor and Blacksmith Assistant.",
  "Ignition Interlock Technician",
  "Industrial Radiographer Certification",
  "Insurance Consultant",
  "Investment Adviser Representative (or Individual Investment Adviser)",
  "Issuer Agent (Non-FINRA)",
  "Landscape Architect",
  "Lead-Based Paint Abatement Worker",
  "Lead-Based Paint Inspector",
  "Lead-Based Paint Project Designer",
  "Lead-Based Paint Risk Assessor",
  "Lead-Based Paint Supervisor",
  "Licensed Alcohol and Drug Counselor /Mental Health(LADC/MH)",
  "Licensed Alcohol Drug Counselor",
  "Licensed Behavioral Practitioners",
  "Licensed Dietitian",
  "Licensed Genetic Counselor",
  "Licensed Marital/Family Therapists",
  "Licensed Midwives",
  "Licensed Practical Nurse (LPN) Single State License (SSL)",
  "Licensed Professional Counselor",
  "Licensed Professional Music Therapist",
  "Licensed Sanitarians",
  "Licensed Tattoo Artists",
  "Long Term Care Aide",
  "Manicurist",
  "Manufacturer",
  "Master's Social Worker, Licensed",
  "Mechanical Contractor & Journeyman",
  "Medication Aide",
  "Mine Fire Boss (Underground)",
  "Mine Foreman (Underground)",
  "Mine Shot Firer (Underground)",
  "Mine Superintendent (Underground)",
  "Mine Surface Supervisor",
  "Miner, Practical (Underground)",
  "Mortgage Loan Originators",
  "Multistate (MSL) Registered Nurse (RN) or Licensed Practical Nurse (LPN) license",
  "Non Veterinary Equine Dental Technician",
  "Non Veterinary Reproductive Service Technician",
  "Nursing Home Administrator (NHA)",
  "Occupational Therapist",
  "Occupational Therapist Assistant",
  "On-Site Sewage Treatment System Installer Certification",
  "Optometry",
  "Orthotist/Prosthetist",
  "Osteopathic Physician (D.O.)",
  "Peace Officer",
  "Pedorthist",
  "Peer Recovery Support Specialists",
  "Perfusionists",
  "Pesticide Applicator: Commercial, Non-Commercial, Consultant, Technician",
  "Petroleum Storage Tank (PST) AST Licensee",
  "Pharmacist Interms",
  "Pharmacists",
  "Pharmacy Technician",
  "Physical Therapist",
  "Physical Therapist Assistant",
  "Physician Assistant",
  "Physician Surgeon M.D. (Family and General Practice)",
  "Physician Surgeon M.D. (Internist, General)",
  "Physician Surgeon M.D. (Physician/Surgeon and all others)",
  "Pipe Pulling & Well Plugging License",
  "Plumber",
  "Podiatrist",
  "Polygraph Examiner",
  "Precious Metal and Gem Dealer Employees",
  "Private Investigator-Armed",
  "Private Investigator-Unarmed",
  "Producer - General Lines and Variable",
  "Producer - Limited Lines",
  "Professional Engineer",
  "Professional Land Surveyor",
  "Provisional Licensed Dietitian",
  "Provisional Sales License",
  "PST Environmental Consultant",
  "PST Monitoring Well Technician for Ground Water",
  "PST Underground Storage Tank Installer",
  "PST Underground Storage Tank Remover",
  "PST Vapor Monitoring Well Technician",
  "Psychologist",
  "Racing Vendor; includes Vendor, Vendor Employee",
  "Radiologist Assistant",
  "Registered Electrologist",
  "Registered Interior Designer",
  "Registered Nurse (RN) Single State License (SSL)",
  "Registered Professional Environmental Specialist",
  "Registered Prosthetist/Orthotist Assistant",
  "Registered Prosthetist/Orthotist Technician",
  "Registered Veterinary Technician",
  "Residential Care Administrator (RC)",
  "Residential Care Aide",
  "Residental Care/Assisted Living (RCAL) Administrator",
  "Respiratory Care Practitioner",
  "Retail",
  "Roofing Contractor",
  "Sales Associate License",
  "Security Guard-Armed",
  "Security Guard-Unarmed",
  "Septage Tank Pumpers and Transporters",
  "Shorthand Reporter, Certified",
  "Social Worker Associate, Licensed",
  "Social Worker with Administrative Specialty, Licensed",
  "Social Worker, Licensed (LSW)",
  "Speech Pathologist",
  "State Licensed Real Estate Appraiser",
  "Subdivided Land Sales Agent",
  "Teaching Certificates and Licenses",
  "Therapeutic Recreation Specialist",
  "Trainee Real Estate Appraiser",
  "Veterinarians",
  "Waterworks and Wastewater Laboratory Operator Certification",
  "Waterworks and Wastewater Operator Certification",
  "Waterworks and Wastewater Works Operator Certification",
  "Welder",
  "Wrecker Service Operator"
];

// Function to auto-generate education and experience requirements based on agency and license
const getRequirements = (agency: string, license: string) => {
  // Default requirements
  let education = "High School Diploma or GED";
  let experience = "Entry Level (0-1 years)";

  // Healthcare/Medical licenses
  if (license.includes("Physician") || license.includes("Doctor") || license.includes("M.D.")) {
    education = "Doctoral Degree (MD)";
    experience = "Medical residency + state licensure required";
  } else if (license.includes("Nurse") && license.includes("Advanced Practice")) {
    education = "Master's Degree in Nursing";
    experience = "2+ years RN experience + certification required";
  } else if (license.includes("Registered Nurse")) {
    education = "Bachelor's Degree in Nursing (BSN)";
    experience = "Pass NCLEX-RN exam + state licensure";
  } else if (license.includes("Licensed Practical Nurse")) {
    education = "Certificate from approved nursing program";
    experience = "Pass NCLEX-PN exam";
  } else if (license.includes("Pharmacist")) {
    education = "Doctor of Pharmacy (PharmD)";
    experience = "Pass NAPLEX exam + state licensure";
  }
  
  // Legal/Attorney
  else if (license.includes("Attorney") || license.includes("Lawyer")) {
    education = "Juris Doctor (JD)";
    experience = "Pass state bar exam + good moral character review";
  }
  
  // Engineering/Technical
  else if (license.includes("Professional Engineer")) {
    education = "Bachelor's Degree in Engineering";
    experience = "4+ years engineering experience + PE exam";
  } else if (license.includes("Architect")) {
    education = "Bachelor's Degree in Architecture";
    experience = "3+ years experience + licensing exam";
  }
  
  // Financial Services
  else if (license.includes("CPA") || license.includes("Certified Public")) {
    education = "Bachelor's Degree in Accounting";
    experience = "2+ years accounting experience + CPA exam";
  } else if (license.includes("Real Estate")) {
    education = "High School Diploma + Real Estate Education";
    experience = "Complete 90+ hour pre-licensing course + state exam";
  }
  
  // Education
  else if (license.includes("Teaching") || license.includes("Educator")) {
    education = "Bachelor's Degree + Teaching Certificate";
    experience = "Student teaching experience + background check";
  }
  
  // Construction/Trades
  else if (license.includes("Electrician") || license.includes("Plumber")) {
    education = "High School Diploma + Trade School";
    experience = "4+ years apprenticeship + licensing exam";
  } else if (license.includes("Contractor")) {
    education = "High School Diploma + Construction Knowledge";
    experience = "4+ years construction experience + licensing exam";
  }
  
  // Cosmetology/Beauty
  else if (license.includes("Cosmetologist") || license.includes("Barber")) {
    education = "Cosmetology School Certificate";
    experience = "1,500+ training hours + state board exam";
  }
  
  // Law Enforcement/Security
  else if (license.includes("Peace Officer") || license.includes("Police")) {
    education = "High School Diploma + Police Academy";
    experience = "Complete CLEET training + background investigation";
  } else if (license.includes("Security Guard")) {
    education = "High School Diploma or GED";
    experience = "40-hour security training + background check";
  }
  
  // Driving/Transportation
  else if (license.includes("Commercial") && license.includes("Driver")) {
    education = "High School Diploma or GED";
    experience = "Valid driver's license + CDL training + DOT physical";
  }

  return { education, experience };
};

export default function AssessmentSetup() {
  const router = useRouter();
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedLicense, setSelectedLicense] = useState("");
  const [agencyOpen, setAgencyOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);

  // Auto-generate education and experience when both agency and license are selected
  const requirements = selectedAgency && selectedLicense 
    ? getRequirements(selectedAgency, selectedLicense) 
    : { education: "", experience: "" };

  const handleContinue = () => {
    if (selectedAgency && selectedLicense) {
      // Store selections and proceed to assessment intake
      router.push("/assessment");
    }
  };

  const canContinue = selectedAgency && selectedLicense;

  return (
    <div className="min-h-screen bg-background font-poppins p-8 pt-32">
      <div className="mx-auto max-w-4xl space-y-8">
        <Button 
          variant="ghost" 
          className="mb-4 ia-button-outline text-gray35 font-poppins"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 font-poppins">
              Assessment Setup
            </h1>
            <p className="ia-text text-gray35 mt-2">
              Please select the agency and license type for this assessment to ensure compliance with Oklahoma's Ban-the-Box requirements.
            </p>
          </div>

          <Card className="bg-card text-card-foreground border border-border shadow-sm rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Building2 className="h-5 w-5 text-cinnabar" />
                Selection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Agency Selection */}
              <div className="space-y-3">
                <Label htmlFor="agency" className="text-lg font-semibold text-foreground font-poppins">
                  Agency Name
                </Label>
                <p className="ia-text text-gray35 text-sm">
                  Select the Oklahoma state agency processing this application. Use the search to quickly find your agency.
                </p>
                <Popover open={agencyOpen} onOpenChange={setAgencyOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={agencyOpen}
                      className="w-full justify-between bg-white border-gray-300 hover:border-cinnabar focus:border-cinnabar"
                    >
                      {selectedAgency || "Select an agency..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0 bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-80" align="center" side="bottom">
                    <Command className="bg-white">
                      <CommandInput 
                        placeholder="Search agencies..." 
                        className="h-9 border-none bg-white focus:ring-2 focus:ring-cinnabar" 
                      />
                      <CommandList className="max-h-64 overflow-y-auto bg-white">
                        <CommandEmpty className="py-4 text-center text-gray-500">No agency found.</CommandEmpty>
                        <CommandGroup className="bg-white">
                          {agencies.map((agency) => (
                            <CommandItem
                              key={agency}
                              value={agency}
                              onSelect={(currentValue) => {
                                setSelectedAgency(currentValue === selectedAgency ? "" : currentValue);
                                setAgencyOpen(false);
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-cinnabar/10 focus:bg-cinnabar/10 text-gray-900"
                            >
                              {agency}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4 text-cinnabar",
                                  selectedAgency === agency ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* License Selection */}
              <div className="space-y-3">
                <Label htmlFor="license" className="text-lg font-semibold text-foreground font-poppins">
                  Application License Name
                </Label>
                <p className="ia-text text-gray35 text-sm">
                  Select the type of license or position the candidate is applying for. Use the search to quickly find the license type.
                </p>
                <Popover open={licenseOpen} onOpenChange={setLicenseOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={licenseOpen}
                      className="w-full justify-between bg-white border-gray-300 hover:border-cinnabar focus:border-cinnabar"
                    >
                      {selectedLicense || "Select a license type..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 p-0 bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-80" align="center" side="bottom">
                    <Command className="bg-white">
                      <CommandInput 
                        placeholder="Search license types..." 
                        className="h-9 border-none bg-white focus:ring-2 focus:ring-cinnabar" 
                      />
                      <CommandList className="max-h-64 overflow-y-auto bg-white">
                        <CommandEmpty className="py-4 text-center text-gray-500">No license found.</CommandEmpty>
                        <CommandGroup className="bg-white">
                          {licenses.map((license) => (
                            <CommandItem
                              key={license}
                              value={license}
                              onSelect={(currentValue) => {
                                setSelectedLicense(currentValue === selectedLicense ? "" : currentValue);
                                setLicenseOpen(false);
                              }}
                              className="px-3 py-2 cursor-pointer hover:bg-cinnabar/10 focus:bg-cinnabar/10 text-gray-900"
                            >
                              {license}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4 text-cinnabar",
                                  selectedLicense === license ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Auto-Generated Requirements Display */}
              {selectedAgency && selectedLicense && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-foreground font-poppins">
                    Auto-Generated Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-foreground">Required Education Level</Label>
                      <p className="text-sm text-gray-600 mt-1 p-2 bg-white rounded border">
                        {requirements.education}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-foreground">Required Experience/Qualifications</Label>
                      <p className="text-sm text-gray-600 mt-1 p-2 bg-white rounded border">
                        {requirements.experience}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 italic">
                    ℹ️ These requirements are automatically determined based on your selected agency and license type.
                  </p>
                </div>
              )}

              {/* Selection Summary */}
              {canContinue && (
                <div className="mt-6 p-4 bg-muted rounded-lg border border-cinnabar/20">
                  <h3 className="font-semibold text-foreground mb-2">Assessment Configuration</h3>
                  <div className="space-y-1 text-sm text-gray35">
                    <p><span className="font-medium">Agency:</span> {selectedAgency}</p>
                    <p><span className="font-medium">License Type:</span> {selectedLicense}</p>
                    <p><span className="font-medium">Required Education Level:</span> {requirements.education}</p>
                    <p><span className="font-medium">Required Experience/Qualifications:</span> {requirements.experience}</p>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <div className="flex justify-end pt-4">
                <Button
                  className={`ia-button-primary font-poppins px-6 py-2 rounded-md text-base transition ${
                    canContinue 
                      ? "bg-cinnabar text-white hover:bg-cinnabar-600" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleContinue}
                  disabled={!canContinue}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Continue to Assessment Intake
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 