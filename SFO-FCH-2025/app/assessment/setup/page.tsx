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
  let experience = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary.";

  // CPA/Accounting licenses
  if (license.includes("Certified Public (CPA)")) {
    education = "Bachelor's degree from accredited college; 150 credit hours.";
    experience = "Must pass exam administered by OAB.";
  } else if (license.includes("Public (PA)")) {
    education = "Bachelor's Degree from an accredited four-year college or university.";
    experience = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary.";
  }
  
  // Healthcare/Medical licenses
  else if (license.includes("Physician") || license.includes("Doctor") || license.includes("M.D.")) {
    education = "Doctor of Medicine Degree";
    experience = "Doctor of Medicine Degree - Although the areas of study may vary according to the school, many programs include anatomy, biochemistry, physiology, pharmacology, microbiology, and pathology. Students receive one year of supervised clinical experience in hospitals and other treatment centers. Post-graduate training.";
  } else if (license.includes("Advanced Practice Registered Nurse")) {
    if (license.includes("Clinical Nurse Midwife")) {
      education = "Master's Degree or higher with clinical specialization preparation";
      experience = "Completion of a program of nurse midwifery accredited by the Accreditation Commission for Midwifery Education. Possible areas of study include anatomy, physiology, chemistry, labor and delivery, family planning and gynecology, postpartum, and newborn and professional issues. Completion of licensing requirements for a registered nurse.";
    } else if (license.includes("Clinical Nurse Specialist")) {
      education = "Master's Degree or higher with clinical specialization preparation";
      experience = "Master's Degree or higher with clinical specialization preparation; Specialty certification by a national certifying body; Supervised clinical experience in health facilities; Completion of licensing requirements for registered nurse.";
    } else if (license.includes("Certified Nurse Practitioner")) {
      education = "Master's Degree in formal educational nurse practitioner program";
      experience = "Completion of a formal educational nurse practitioner program accredited by Accreditation Commission for Education in Nursing or the Commission on Collegiate Nursing Education. Possible knowledge areas include communication, interviewing, basic physical exam, pathophysiology, health maintenance, management of chronic illness, and health teaching and counseling.";
    } else if (license.includes("Certified Registered Nurse Anesthetist")) {
      education = "Master's Degree from nurse anesthesia program";
      experience = "Completion of an educational program of a school of nurse anesthetists accredited by the Council on Accreditation of Nurse Anesthesia Educational Programs/Schools. Possible areas of study include anatomy, physiology, microbiology, chemistry, nutrition, psychology, and behavioral science.";
    }
  } else if (license.includes("Registered Nurse")) {
    education = "Associate or Bachelor's Degree in nursing from a state-Board-approved nursing education program";
    experience = "Associate or Bachelor's Degree in nursing from a state-Board-approved nursing education program. Possible areas of study include biological and physical sciences, social and behavioral sciences, in addition to nursing courses. Supervised clinical experience in care of adults, care of children, maternal-newborn nursing, and psychiatric-mental health nursing.";
  } else if (license.includes("Licensed Practical Nurse")) {
    education = "Completion of a state-approved practical nurse program";
    experience = "Completion of a state-approved practical nurse program. Areas of study include nursing courses, body structure and function, basic nutrition, and personal/vocational relationships. Supervised clinical experience in care of adults, care of children, and maternal-newborn nursing.";
  } else if (license.includes("Pharmacist")) {
    education = "PharmD degree in pharmacy from an accredited and approved school or college of pharmacy";
    experience = "Requirements include a PharmD degree in pharmacy from an accredited and approved school or college of pharmacy and 1,500 hours of Board approved experience.";
  } else if (license.includes("Dental Hygiene")) {
    education = "Graduate of a two or four year accredited dental hygiene school";
    experience = "Graduate of a two or four year accredited dental hygiene school. Possible areas of study include general and dental anatomy, histology, pathology, radiology, chemistry, and nutrition. Dental Hygiene Program must be accredited by the Commission on Dental Accreditation of the American Dental Association.";
  } else if (license.includes("Dental License")) {
    education = "D.D.S. or D.M.D. degree from a 4-year school accredited by CODA";
    experience = "Applicant must be a graduate with a D.D.S. or D.M.D. degree from a 4-year school accredited by the Commission on Dental Accreditation (CODA) of the American Dental Association (ADA) and pass National Boards and a live-patient exam.";
  } else if (license.includes("Chiropractor")) {
    education = "Graduate of an accredited chiropractic college";
    experience = "Each applicant shall be a graduate of an accredited chiropractic college. Which consists of a course of resident study of not less than 4 years of 9 months each in an accredited chiropractic college is required, as well as completion of Parts I, II, III, IV and physiotherapy as administered by National Board of Chiropractic Examiners.";
  }
  
  // Legal/Attorney
  else if (license.includes("Attorney") || license.includes("Lawyer")) {
    education = "Juris Doctor degree from an ABA-accredited law school";
    experience = "Juris Doctor degree from an ABA-accredited law school. Possible areas of study include fundamental courses such as constitutional law, contracts, property law, legal ethics, judicial procedures, and legal writing. Additional course work is based upon areas of specialization.";
  }
  
  // Engineering/Technical
  else if (license.includes("Professional Engineer")) {
    education = "Four-year or graduate degrees from ABET or non-ABET accredited engineering curriculums";
    experience = "Educational possibilities include four-year or graduate degrees from ABET or non-ABET accredited engineering curriculums or other science-related areas. Areas of study relate to area of specialization. Applicants with an acceptable degree and experience, upon successful completion of the Fundamentals of Engineering, and Principles and Practice of Engineering examinations are licensed as a professional engineer.";
  } else if (license.includes("Architect")) {
    education = "Bachelor's degree in architecture from an accredited program";
    experience = "A bachelor's degree in architecture from an accredited program or the substitution of equivalent standards as defined by Board. Foreign education evaluated by Board individually, as is pre-professional education. Areas of testing include practice management, project management, programming analysis, project planning and design, project development and documentation and construction and evaluation.";
  } else if (license.includes("Landscape Architect")) {
    education = "Bachelor's degree in landscape architecture from an accredited program";
    experience = "A bachelor's degree in landscape architecture from an accredited program or the substitution of equivalent standards as defined by Board. Foreign education evaluated by Board individually, as is pre-professional education. Areas of testing include project and construction management, inventory and analysis, design, and grading, drainage and construction document.";
  }
  
  // Real Estate
  else if (license.includes("Real Estate") && license.includes("Appraiser")) {
    if (license.includes("Certified General")) {
      education = "Bachelor's degree; 300 hours of appraiser education";
      experience = "Licensed Real Property - 150 hours of appraiser education; Associate's degree or 30 semester credit hours of college education; Certified Residential Real Property - 200 hours of appraiser education; Bachelor's degree; Certified General Real Property -300 hours of appraiser education; Bachelor's degree";
    } else if (license.includes("Certified Residential")) {
      education = "Bachelor's degree; 200 hours of appraiser education";
      experience = "Certified Residential Real Property - 200 hours of appraiser education; Bachelor's degree.";
    } else {
      education = "Associate's degree or 30 semester credit hours; 150 hours of appraiser education";
      experience = "Licensed Real Property - 150 hours of appraiser education; Associate's degree or 30 semester credit hours of college education.";
    }
  } else if (license.includes("Real Estate") && license.includes("Broker")) {
    education = "90 clock hour advanced real estate course or equivalent";
    experience = "Evidence of successful completion of a 90 clock hour advanced real estate course or six college credit hours that are equivalent real estate instruction, as determined by the Commission, is required. Possible areas of study include broker supervision; trust accounts, management skills, contract law, finance, real estate brokerage, broker relationships, professional conduct and Oklahoma Real Estate License Code and Rules; two (2) years' licensure within the previous five (5) years or its equivalent; documentation verifying ten (10) real estate transactions within the past five (5) years or its equivalent as determined by the Commission; pass broker examination.";
  } else if (license.includes("Real Estate") && license.includes("Sales")) {
    education = "90 clock hours of basic real estate instruction course";
    experience = "Evidence of successful completion of an approved basic real estate instruction course consisting of 90 clock hours, or equivalent to six hours of college credit and must complete a 45 clock hour post-license course prior to their first license expiration date.";
  }
  
  // Education
  else if (license.includes("Teaching") || license.includes("Educator")) {
    education = "Bachelor of Science Degree in Elementary/Secondary Education";
    experience = "Bachelor of Science Degree in Elementary/Secondary Education Areas of study relate to general education, the area of specialization, and a professional education. Elementary and secondary student teaching at an accredited school in the area of specialization.";
  }
  
  // Construction/Trades
  else if (license.includes("Electrician")) {
    education = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary";
    experience = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary. Possible knowledge areas include the National Electrical Code. For Journeyman, at least 4 years registered with the CIB as an electrical apprentice. For Contractor, at least 4 years registered with the CIB as an electrical apprentice plus an additional two as a licensed journeyman.";
  } else if (license.includes("Plumber")) {
    education = "There are no specific educational requirements; however, a working knowledge of the profession is necessary";
    experience = "There are no specific educational requirements; however, a working knowledge of the profession is necessary. For Journeyman at least 3 years registered with the CIB as a plumbing apprentice. For Contractor an additional year as a registered apprentice or licensed journeyman is required. Possible knowledge areas include the IPC and IRC.";
  } else if (license.includes("Building & Construction Inspector")) {
    education = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary";
    experience = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary. Possible knowledge areas include the International Building Codes and the National Electrical Code.";
  } else if (license.includes("Home Inspector")) {
    education = "Completion of 90 clock hours of approved home inspection training";
    experience = "Completion of 90 clock hours of approved home inspection training.";
  } else if (license.includes("Roofing Contractor")) {
    education = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary";
    experience = "There are no specific educational requirements; however, a working knowledge of the occupation is necessary. Possible knowledge areas include the International Residential Code, International Building Code and basic roofing theory.";
  }
  
  // Cosmetology/Beauty
  else if (license.includes("Cosmetologist")) {
    education = "Eighth-grade education or equivalent; 1,500 hours of training in an approved beauty school";
    experience = "Eighth-grade education or equivalent; 1,500 hours of training in an approved beauty school or an apprenticeship of 3,000 hours. Possible areas of study include theory and practical training in hairstyling (cutting), finger waving, thermal, perms, and chemical hair relaxing; manicuring and pedicuring; scalp treatments; skin care, makeup; personality; shop management; beard grooming; and Oklahoma cosmetology law and board rules and regulations.";
  } else if (license.includes("Barber")) {
    education = "Graduate of a (1,500 clock hours) barber college or completion of 18 months apprentice";
    experience = "Graduate of a (1,500 clock hours) barber college or completion of 18 months (3,000 clock hours) as a barber apprentice Possible areas of study include chemistry of hair, sanitation of equipment, hair cutting, scalp care, shampooing, tinting, dyeing, bleaches, and permanent waves.";
  } else if (license.includes("Facialist") || license.includes("Esthetician")) {
    education = "Eighth-grade education or equivalent; Complete 600 hours of study";
    experience = "Eighth-grade education or equivalent; Complete 600 hours of study or equivalent number of credit hours. Possible knowledge areas include structure of skin and diseases, theory and practical training in skin care, makeup, and massage; hygiene, personality, salesmanship, and poise; sanitation and safety; electrical; chemistry and light therapy (pertaining to skin care); and cosmetology law, rules, and regulations.";
  } else if (license.includes("Manicurist")) {
    education = "Completed the eighth grade; 600 hours at an approved beauty school";
    experience = "Has completed the eighth grade; 600 hours at an approved beauty school or equivalent number of credit hours. Possible areas of study include nail structure, composition and diseases, hygiene, personality, salesmanship, poise, and sanitation and safety procedures specific to manicuring and pedicuring.";
  }
  
  // Law Enforcement/Security
  else if (license.includes("Peace Officer")) {
    education = "Provide proof of a high school diploma, GED or equivalent";
    experience = "a. Provide proof of a high school diploma, GED or equivalent as recognized by state law. b. Completion of Phase I, II, III, IV and V.";
  } else if (license.includes("Security Guard")) {
    education = "Completion of Phase I and II";
    experience = "Completion of Phase I and II.";
  } else if (license.includes("Private Investigator")) {
    education = "Completion of Phase I, II, III and IV";
    experience = "Completion of Phase I, II, III and IV.";
  } else if (license.includes("Polygraph Examiner")) {
    education = "Hold a baccalaureate degree from an accredited college or university, or 5 years of active investigative experience";
    experience = "A. Hold a baccalaureate degree from a college or university accredited by the American Association of Collegiate Registrars and Admissions Officers, or, in lieu thereof, be a graduate of an accredited high school and have five (5) consecutive years of active investigative experience of a character satisfactory to the Board, B. Be a graduate of a polygraph examiners course approved by the Board and have satisfactorily completed not less than six (6) months of internship training, and C. Have passed an examination conducted by and to the satisfaction of the Board.";
  }
  
  // Emergency Medical
  else if (license.includes("Emergency Medical Technician")) {
    education = "Approved Department of Transportation curriculum from an approved training institution";
    experience = "Approved Department of Transportation curriculum from an approved training institution EMT training is a minimum of 252 hours (216 hours didactic and 36 hours clinical). Possible areas of study include legal responsibilities, anatomy, diagnostic signs, triage, cardio respiratory system, circulatory system, basic life support, musculoskeletal system, gastrointestinal and genitourinary systems, medical emergencies, childbirth and pediatric problems, mental health problems, environmental injuries, emergency vehicles, equipment and extrication, emergency communications, and patient handling and transportation.";
  } else if (license.includes("Emergency Medical Responder")) {
    education = "Complete an approved Department of Transportation curriculum";
    experience = "Complete an approved Department of Transportation curriculum from an approved training institution. EMR Training hours are recommended to be a total of 60 hours. (47 hours didactic and 13 lab hours) Areas of study include legal and ethical responsibilities, anatomy and physiology, pharmacology, airway and respiratory support, patient assessment, medical emergencies, shock and resuscitation, special patient populations, emergency vehicle operations, incident management, extrication, and EMS operations.";
  }
  
  // Funeral Services
  else if (license.includes("Embalmer")) {
    education = "60 accredited hours of study plus graduation from a school of mortuary science";
    experience = "60 accredited hours of study from an institution of higher education plus graduation from a school of mortuary science. Possible areas of study include embalming technique; chemistry of embalming; color harmony; discoloration and its causes, effects, and treatment; treatment of special cases; restorative art; funeral management; professional ethics; anatomy; organic and inorganic chemistry; pathology; microbiology; sanitation and hygiene; public health regulations; and mortuary law and administration. An embalmer is required to complete a one-year apprenticeship under the supervision of a licensed embalmer.";
  } else if (license.includes("Funeral Director")) {
    education = "60 accredited hours of study plus graduation from a mortuary science program";
    experience = "Requirements include 60 accredited hours of study from an accredited institute of higher education, plus graduation from a mortuary science program. Possible areas of study include mortuary management and administration, business education and business law, legal medicine, toxicology (as it pertains to funeral directing), public relations, psychology, public health, hygiene, and sanitary science. A funeral director is required to complete a 12-month apprenticeship under the direction of a licensed funeral director.";
  }
  
  // Psychology/Counseling
  else if (license.includes("Licensed Professional Counselor")) {
    education = "Minimum of 60 hours in a counseling-related course of study";
    experience = "Minimum of 60 hours in a counseling-related course of study. Internship consisting of 300 clock hours under university supervision in a counseling setting";
  } else if (license.includes("Licensed Marital/Family Therapists")) {
    education = "Minimum of a master's degree in marital and family therapy or equivalent";
    experience = "Minimum of a master's degree in marital and family therapy or equivalent. Internship consisting of 300 clock hours under university supervision in a counseling setting.";
  } else if (license.includes("Licensed Behavioral Practitioners")) {
    education = "Successfully completed at least sixty (60) graduate semester hours of behavioral science-related course work";
    experience = "Successfully completed at least sixty (60) graduate semester hours (ninety (90) graduate quarter hours) of behavioral science-related course work. These sixty (60) hours shall include at least a master's degree from a program in psychology. Internship consisting of 300 clock hours under university supervision in behavioral health services with planned experiences providing classroom and field experience with clients.";
  } else if (license.includes("Psychologists")) {
    education = "Psychology doctoral degree from a recognized program of graduate study in psychology";
    experience = "Psychology doctoral degree from a recognized program of graduate study in psychology as defined by the rules and regulations of the Board. Applicants for licensure who graduated on or after January 1, 1997, shall have completed a doctoral program in psychology that is accredited by the American Psychological Association (APA). Minimum of two years of ufll-time, on campus, graduate study (excluding internship).";
  }
  
  // Social Work
  else if (license.includes("Clinical Social Worker")) {
    education = "Master's Degree in Social Work from an institution with a program accredited by the Council of Social Work Education";
    experience = "Master's Degree in Social Work from an institution with a program accredited by the Council of Social Work Education or board approved social work program. Possible areas of study include human development and behavior; social, economic, and cultural institutions and forces; and the interaction of all of these factors. Two years' experience in the practice of social work under professional supervision of a person licensed under Board provisions is also required.";
  } else if (license.includes("Social Worker")) {
    education = "Master's Degree in Social Work from a program accredited by the Council on Social Work Education";
    experience = "Master's Degree in Social Work from a program accredited by the Council on Social Work Education or board approved social work program. Possible areas of study include human development and behavior; social, economic, and cultural institutions and forces; and the interaction of all of these factors.";
  }
  
  // Insurance
  else if (license.includes("Insurance") || license.includes("Adjuster")) {
    education = "No specific requirements or education required prior to examination for licensure";
    experience = "No specific requirements or education required prior to examination for licensure. A working knowledge, experience or special education or training of sufficient duration and extent with reference to the handling of loss claims pursuant to insurance contracts to make the applicant competent to fulfill the responsibilities of an adjuster is necessary.";
  } else if (license.includes("Bail Bondsman")) {
    education = "Sixteen (16) hours of pre-license education provided by the Oklahoma Bondsman Association";
    experience = "Sixteen (16) hours of pre-license education provided by the Oklahoma Bondsman Association. Possible areas of study include subjects pertinent to duties, responsibilities, and bail law.";
  } else if (license.includes("Producer")) {
    education = "There are no specific educational required prior to passing the examinations";
    experience = "There are no specific educational required prior to passing the examinations for the needed lines of authority. However, a working knowledge of the occupation and insurance industry is necessary. Possible knowledge areas include: Life, Accident and Health, Property (Personal and Commercial), Casualty (Personal and Commercial), P&C Personal Lines, Reinsurance and Variable lines.";
  }
  
  // Veterinary
  else if (license.includes("Veterinarian")) {
    education = "Graduate from an accredited college with a Doctor of Veterinary Medicine Degree";
    experience = "Graduate from an accredited college with a Doctor of Veterinary Medicine Degree. Possible areas of study include physical and biological sciences and veterinary medicine. Professional training includes considerable practical experience through rotations that provide experience in diagnosing and treating animal diseases, performing surgery, and performing laboratory work in anatomy, biochemistry, and other medical and scientific subjects.";
  } else if (license.includes("Veterinary Technician")) {
    education = "Associate's Degree in Applied Science";
    experience = "Associate's Degree in Applied Science Possible areas of study include a basic core of English, history, and government. Subjects related to this field include physiology, nutrition, laboratory techniques, animal nursing, pharmacology, and radiology. Eight-week preceptor at a veterinary clinic under a licensed veterinarian.";
  }
  
  // Physical Therapy and Related
  else if (license.includes("Physical Therapist") && !license.includes("Assistant")) {
    education = "Graduation from a school of physical therapy approved by a national accrediting body";
    experience = "Graduation from a school of physical therapy approved by a national accrediting body recognized by the Board Possible areas of study include anatomy, physiology, neuroanatomy, and neurophysiology along with specialized courses such as biomechanics, human growth and development, manifestations of disease and trauma, and therapeutic procedures.";
  } else if (license.includes("Physical Therapist Assistant")) {
    education = "Graduation from an approved program for physical therapy assistants";
    experience = "Graduation from an approved program for physical therapy assistants consisting of at least a two-year program approved by a national accrediting body recognized by the Board. Possible areas of study include anatomy, physiology, neuroanatomy, and neurophysiology along with specialized courses such as biomechanics, human growth and development, manifestations of disease and trauma, and therapeutic procedures.";
  } else if (license.includes("Occupational Therapist") && !license.includes("Assistant")) {
    education = "Successful completion of an educational program in occupational therapy accredited by the Committee on Allied Health Education";
    experience = "Successful completion of an educational program in occupational therapy accredited by the Committee on Allied Health Education/American Medical Association in collaboration with the American Occupational Therapy Certification Board. Possible areas of study include physical, biological, and behavioral sciences and the application of occupational therapy theory and skills.";
  } else if (license.includes("Occupational Therapist Assistant")) {
    education = "Successful completion of a program in occupational therapy approved by the American Occupational Therapy Association";
    experience = "Successful completion of a program in occupational therapy approved by the American Occupational Therapy Association, verified by a photocopy of American Occupational Therapy Certification Board card. Possible areas of study include physical, biological, and behavioral sciences and application of occupational therapy theory and skills.";
  }
  
  // Speech and Audiology
  else if (license.includes("Audiologist")) {
    education = "Post-baccalaureate residential professional doctor of audiology degree (Au.D) or equivalent";
    experience = "Each audiology applicant shall hold not less than a post-baccalaureate residential professional doctor of audiology degree (Au.D) from a regionally accredited academic institution, a post-masters distance education professional doctor of audiology degree (Au.D.) from a regionally accredited academic institution, a Doctor of Philosophy degree (Ph.D.) with emphasis in audiology from a regionally accredited academic institution, or its equivalent as determined by the Board.";
  } else if (license.includes("Speech") && license.includes("Pathology")) {
    education = "Master's degree, or its equivalent, with a major emphasis in speech-language pathology or audiology";
    experience = "Each speech-language pathology applicant shall hold not less than a master's degree, or its equivalent, with a major emphasis in speech-language pathology or audiology from an accredited academic institution offering a graduate program in speech-language pathology.";
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