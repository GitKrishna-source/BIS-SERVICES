export const mockStandards = [
  {
    id: "IS-17803-2022",
    code: "IS 17803:2022",
    title: "Stainless Steel Vacuum Flasks, Insulated Beverage Containers & Tableware",
    description: "Specifies requirements for materials, chemical composition, thermal retention, and seal integrity for double-walled vacuum vessels.",
    status: "Mandatory QCO",
    statusType: "mandatory",
    ics: "ICS 97.040.60",
    enforcedDate: "15 Oct 2023",
    ministry: "Ministry of Commerce & Industry (DPIIT) QCO II",
    pages: 34,
    pdfUrl: "#",
    verified: true,
    category: "Consumer Goods",
    clauses: [
      {
        number: "Cl. 4.1",
        title: "Chemical Composition & Raw Metallurgy",
        tag: "Mandatory Traceability",
        description: "Austenitic Stainless Steel Grade 304 or 316; Min 17.5% Chromium, Min 8.0% Nickel. Must strictly comply with IS 6911:2017 raw material traceability with mill test certifications verified per batch melt."
      },
      {
        number: "Cl. 5.2",
        title: "Thermal Retention Performance Matrix",
        tag: "Kinetic Thermal Test",
        description: "Boiling water containment at 98°C must maintain ≥ 60.0°C after 6.0 hours at standardized ambient chamber temperature (27±2°C). Dual-walled evacuated cavity vacuum delta must not exceed 10⁻³ mbar degradation."
      },
      {
        number: "Cl. 6.1",
        title: "Seal & Hydrostatic Leakage Verification",
        tag: "Pressure Invariant",
        description: "Pneumatic 1.50 bar pressure for 300 seconds with zero droplet penetration. Gaskets must demonstrate food-grade silicone compliance under IS 9845 (Overall Migration Limits ≤ 10 mg/dm² in 3% acetic acid simulant)."
      }
    ],
    labsCount: 18,
    certificationScheme: "Scheme-I (ISI Mark)"
  },
  {
    id: "IS-13252-1-2010",
    code: "IS 13252 (Part 1):2010",
    title: "Information Technology Equipment — General Safety Requirements",
    description: "Applies to mains-powered or battery-powered IT equipment including laptops, servers, power adapters, and telecommunication hardware.",
    status: "CRS Scheme",
    statusType: "crs",
    ics: "ICS 35.020",
    enforcedDate: "03 Jul 2013",
    ministry: "MeitY Scheme Compulsory Registration",
    pages: 142,
    pdfUrl: "#",
    verified: true,
    category: "Electronics (CRS)",
    clauses: [
      {
        number: "Cl. 1.5",
        title: "Components & Insulation Class",
        tag: "Safety Critical",
        description: "Components that are relied on for safety shall comply with requirements specified in relevant Indian or IEC harmonized standards."
      },
      {
        number: "Cl. 2.1",
        title: "Protection from Electric Shock & Energy Hazards",
        tag: "High Voltage Test",
        description: "Operator access areas shall be protected from bare live parts carrying hazardous voltages above 42.4V peak or 60V d.c."
      },
      {
        number: "Cl. 4.5",
        title: "Thermal & Fire Resistance Testing",
        tag: "Flammability V-0",
        description: "Enclosures shall withstand glow-wire test and flame rating tests under IS 11000 / UL94 V-0 for unattended equipment."
      }
    ],
    labsCount: 42,
    certificationScheme: "Compulsory Registration Scheme (CRS)"
  },
  {
    id: "IS-303-2024",
    code: "IS 303:2024",
    title: "Plywood for General Purposes (MR and BWR Grades)",
    description: "Prescribes standards for moisture resistance, boiling water resistance, and adhesive bonding strength for interior and exterior architectural plywood.",
    status: "Latest Revision",
    statusType: "revised",
    ics: "ICS 79.060.10",
    enforcedDate: "28 Feb 2024",
    ministry: "DPIIT Wood Products Quality Control Order",
    pages: 28,
    pdfUrl: "#",
    verified: true,
    category: "Building Materials",
    clauses: [
      {
        number: "Cl. 7.1",
        title: "Moisture Content & Density Uniformity",
        tag: "Physical Test",
        description: "Moisture content shall be between 8% and 16% across all veneer plies."
      },
      {
        number: "Cl. 8.2",
        title: "Boiling Water Resistance (BWR) Bond Adhesion",
        tag: "72-Hour Boil",
        description: "Test pieces submerged in boiling water for 72 hours must show zero delamination and shear strength ≥ 1000 N."
      }
    ],
    labsCount: 26,
    certificationScheme: "Scheme-I (ISI Mark)"
  },
  {
    id: "IS-6911-2017",
    code: "IS 6911:2017",
    title: "Stainless Steel Plate, Sheet and Strip — Technical Specification",
    description: "Specifies tolerances, chemical composition limits, and tensile strength standards for austenitic and ferritic stainless steel grades.",
    status: "ISI Mark Valid",
    statusType: "isi",
    ics: "ICS 77.140.20",
    enforcedDate: "12 Dec 2018",
    ministry: "Ministry of Steel Mandatory Quality Order",
    pages: 56,
    pdfUrl: "#",
    verified: true,
    category: "Metallurgy",
    clauses: [
      {
        number: "Cl. 5.1",
        title: "Ladle Analysis & Spectrographic Composition",
        tag: "Melt Chemistry",
        description: "Strict control of Carbon (≤ 0.08%), Manganese (≤ 2.0%), Silicon (≤ 0.75%), Sulfur (≤ 0.030%), and Phosphorus (≤ 0.045%)."
      },
      {
        number: "Cl. 9.3",
        title: "Intergranular Corrosion (IGC) Practice A & E",
        tag: "Acid Immersion",
        description: "Standard practice for detecting susceptibility to intergranular attack in austenitic stainless steels."
      }
    ],
    labsCount: 35,
    certificationScheme: "Scheme-I (ISI Mark)"
  },
  {
    id: "IS-14543-2024",
    code: "IS 14543:2024",
    title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
    description: "Defines rigorous biological, microbiological, pesticide residue limits and mineralization parameters for packaged potable water.",
    status: "Mandatory QCO",
    statusType: "mandatory",
    ics: "ICS 13.060.20",
    enforcedDate: "01 Jan 2024",
    ministry: "FSSAI & BIS Joint Enforcement Mandate",
    pages: 44,
    pdfUrl: "#",
    verified: true,
    category: "Food & Agriculture",
    clauses: [
      {
        number: "Cl. 3.2",
        title: "Microbiological Sterility & Coliform Clearance",
        tag: "Zero Tolerance",
        description: "Zero count of Escherichia coli, Salmonella, and Pseudomonas aeruginosa per 250ml sample."
      },
      {
        number: "Cl. 4.4",
        title: "Pesticide Residue Limits (GC-MS/MS)",
        tag: "Sub-ppb Precision",
        description: "Individual pesticide residue shall not exceed 0.0001 mg/l and total pesticides shall not exceed 0.0005 mg/l."
      }
    ],
    labsCount: 54,
    certificationScheme: "Scheme-I (ISI Mark)"
  },
  {
    id: "IS-15885-2-13",
    code: "IS 15885 (Part 2/Sec 13)",
    title: "Lamp Controlgear — Particular Requirements for DC or AC Supplied Electronic Controlgear for LED Modules",
    description: "Safety requirements for electronic drivers powering LED luminaires, streetlights, and commercial illumination.",
    status: "CRS Scheme",
    statusType: "crs",
    ics: "ICS 29.140.99",
    enforcedDate: "01 Sep 2015",
    ministry: "MeitY Electronic Goods CRO",
    pages: 38,
    pdfUrl: "#",
    verified: true,
    category: "Electronics (CRS)",
    clauses: [
      {
        number: "Cl. 14.1",
        title: "Fault Condition Protection & Surge Immunity",
        tag: "4kV Surge",
        description: "Must survive 4.0 kV line-to-earth surge tests and over-voltage conditions without catching fire or producing toxic fumes."
      }
    ],
    labsCount: 31,
    certificationScheme: "Compulsory Registration Scheme (CRS)"
  }
];

export const mockServices = [
  {
    id: "module-01",
    moduleNumber: "MODULE 01",
    moduleType: "MANDATORY",
    badge: "Scheme I & CRS",
    title: "Certification",
    subtitle: "Understand BIS certification requirements.",
    description: "Explore Scheme-I (ISI Mark) and CRS schemes, step-by-step application walkthroughs, required factory audit documents, and fee structures.",
    image: "/images/certification_isi.jpg",
    stats: [
      { label: "AVG. TIMELINE", value: "30 Days" },
      { label: "VALIDITY", value: "1-2 Years" },
      { label: "SURVEILLANCE", value: "Periodic" }
    ],
    ref: "REF: BIS-ACT-SCH1",
    cta: "Explore Certification Guidance",
    iconName: "Award",
    color: "blue"
  },
  {
    id: "module-02",
    moduleNumber: "MODULE 02",
    moduleType: "LAB NETWORK",
    badge: "NABL Network",
    title: "Testing Laboratories",
    subtitle: "Find relevant testing facilities.",
    description: "Search certified NABL and BIS laboratories across India by product standard, test scope, proximity, and estimated turnaround times.",
    image: "/images/testing_laboratory.jpg",
    highlightBadge: "LIVE",
    highlightTitle: "Interactive Registry",
    highlightSubtitle: "Geographic Lab Index with Pin code lookup",
    ref: "REF: NABL-ISO17025",
    cta: "Locate Testing Laboratories",
    iconName: "FlaskConical",
    color: "emerald"
  },
  {
    id: "module-03",
    moduleNumber: "MODULE 03",
    moduleType: "ASSAYING",
    badge: "HUID System",
    title: "Hallmarking",
    subtitle: "Understand hallmarking requirements.",
    description: "Learn mandatory gold and silver hallmarking standards, 6-digit HUID authenticity checks, and how to register an assaying center.",
    image: "/images/hallmarking_gold.jpg",
    highlightBadge: "VERIFIED",
    highlightTitle: "6-Digit Alphanumeric Code",
    highlightSubtitle: "Trace metal purity & jeweler registration",
    ref: "REF: IS-1417-AU",
    cta: "View Hallmarking Rules",
    iconName: "Gem",
    color: "amber"
  },
  {
    id: "module-04",
    moduleNumber: "MODULE 04",
    moduleType: "PUBLIC AUDIT",
    badge: "Public Grievance",
    title: "Consumer Help",
    subtitle: "Get answers to common consumer questions.",
    description: "Verify certified ISI licenses on consumer goods, report substandard or fake certification marks, and file grievances with the BIS Consumer Affairs Department.",
    image: "/images/consumer_helpdesk.jpg",
    features: [
      { label: "License Validity Status", value: "Instant Verification" },
      { label: "Spurious Mark Escalation", value: "Priority Dispatch" }
    ],
    ref: "PORTAL: BIS-CARE",
    cta: "Access Consumer Portal",
    iconName: "ShieldCheck",
    color: "indigo"
  }
];

export const mockLabs = [
  {
    id: "LAB-ND-01",
    name: "Central Laboratory Bureau of Indian Standards",
    city: "Sahibabad, Ghaziabad",
    state: "Uttar Pradesh",
    pincode: "201010",
    accreditation: "NABL Accredited (ISO/IEC 17025)",
    standards: ["IS 17803:2022", "IS 13252", "IS 6911:2017", "IS 14543:2024"],
    contact: "+91 120 2867900",
    email: "cl@bis.gov.in",
    turnaroundDays: "7-12 Days",
    rating: 4.9,
    status: "Operational",
    image: "/images/central_lab_campus.jpg"
  },
  {
    id: "LAB-MH-02",
    name: "Western Regional Laboratory (WROL) - BIS",
    city: "Andheri (East), Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    accreditation: "NABL Accredited",
    standards: ["IS 17803:2022", "IS 6911:2017", "IS 15885"],
    contact: "+91 22 28329295",
    email: "wrol@bis.gov.in",
    turnaroundDays: "10-14 Days",
    rating: 4.8,
    status: "Operational",
    image: "/images/testing_laboratory.jpg"
  },
  {
    id: "LAB-KA-03",
    name: "Southern Testing & Metallurgical Institute",
    city: "Peenya, Bengaluru",
    state: "Karnataka",
    pincode: "560058",
    accreditation: "NABL & BIS Recognized",
    standards: ["IS 17803:2022", "IS 13252", "IS 303:2024"],
    contact: "+91 80 28394411",
    email: "support@stmlabs.in",
    turnaroundDays: "8-10 Days",
    rating: 4.7,
    status: "Operational",
    image: "/images/testing_laboratory.jpg"
  },
  {
    id: "LAB-TN-04",
    name: "Chennai Chemical & Packaging Testing Lab",
    city: "Guindy, Chennai",
    state: "Tamil Nadu",
    pincode: "600032",
    accreditation: "NABL Accredited",
    standards: ["IS 14543:2024", "IS 17803:2022"],
    contact: "+91 44 22500123",
    email: "testing@cptl-south.org",
    turnaroundDays: "5-9 Days",
    rating: 4.9,
    status: "Operational",
    image: "/images/central_lab_campus.jpg"
  }
];

export const sampleRAGSession = {
  sessionId: "IND-2025-9042",
  gazetteSync: "14m ago",
  latency: "184ms",
  confidence: "99.4%",
  user: {
    name: "Dr. V. Sharma",
    role: "Lead Auditor • Regulatory Affairs",
    query: "I manufacture stainless steel vacuum insulated flasks. What Indian Standard applies and what are the mandatory chemical and seal tests?",
    category: "Metallurgy & Consumer Ware",
    jurisdiction: "Republic of India",
    tariff: "ITC-HS 9617.00.12"
  },
  answer: {
    model: "BIS-Reasoner-v2.5 (Ensemble)",
    title: "Stainless steel vacuum flasks, insulated beverage containers, and tableware intended for domestic or commercial use fall under mandatory Quality Control Order (QCO S.O. 3192(E)).",
    summary: "Under this statutory decree issued by the Department for Promotion of Industry and Internal Trade (DPIIT), no entity may import, warehouse, or retail insulated flasks without authentic BIS ISI marking and an active Bureau Certificate of Conformity.",
    applicableStandard: {
      code: "IS 17803:2022",
      title: "Stainless Steel Vacuum Flasks and Insulated Beverage Containers — Specification",
      status: "ACTIVE REVISION"
    },
    clauses: [
      {
        number: "Cl. 4.1",
        title: "Chemical Composition & Raw Metallurgy",
        badge: "Mandatory Traceability",
        content: "Austenitic Stainless Steel Grade 304 or 316; Min 17.5% Chromium, Min 8.0% Nickel. Must strictly comply with IS 6911:2017 raw material traceability with mill test certifications verified per batch melt."
      },
      {
        number: "Cl. 5.2",
        title: "Thermal Retention Performance Matrix",
        badge: "Kinetic Thermal Test",
        content: "Boiling water containment at 98°C must maintain ≥ 60.0°C after 6.0 hours at standardized ambient chamber temperature (27±2°C). Dual-walled evacuated cavity vacuum delta must not exceed 10⁻³ mbar degradation."
      },
      {
        number: "Cl. 6.1",
        title: "Seal & Hydrostatic Leakage Verification",
        badge: "Pressure Invariant",
        content: "Pneumatic 1.50 bar pressure for 300 seconds with zero droplet penetration. Gaskets must demonstrate food-grade silicone compliance under IS 9845 (Overall Migration Limits ≤ 10 mg/dm² in 3% acetic acid simulant)."
      }
    ],
    nextStep: "Obtain raw material test certificates (MTC) for SS 304/316 and schedule sample testing at an accredited BIS/NABL laboratory before filing Form-I under the Manakonline portal scheme.",
    sources: [
      {
        type: "PRIMARY STANDARD",
        code: "IS 17803:2022",
        details: "Clauses 4.1 (Metallurgy), 5.2 (Thermal test limits), 6.1 (Hydraulic seal thresholds). Published by Bureau of Indian Standards, New Delhi.",
        tag: "Confirmed Active Standard"
      },
      {
        type: "EXECUTIVE ORDER",
        code: "Gazette Notification S.O. 3192(E)",
        details: "Ministry of Commerce and Industry (DPIIT). Vacuum Flask Quality Control Order mandate under BIS Act 2016 statutory directives.",
        tag: "Legally Binding QCO"
      },
      {
        type: "RAW MATERIAL SPEC",
        code: "IS 6911:2017",
        details: "Stainless Steel Plate, Sheet and Strip — Specification (Grade X04Cr19Ni9 / 304 and Grade X02Cr17Ni12Mo2 / 316).",
        tag: "Chemical Spectrum Matched"
      }
    ],
    telemetry: {
      risk: "LOW",
      riskSub: "Tier-1 Product Class",
      testingSpan: "14 Days",
      testingSpanSub: "Standard lab duration",
      curveTitle: "Thermal Retention Curve (IS 17803) ≥ 60.0°C @ 6h",
      points: [
        { hour: "0h", temp: "98.0°C" },
        { hour: "2h", temp: "86.4°C" },
        { hour: "4h", temp: "73.1°C" },
        { hour: "6h", temp: "64.2°C" }
      ]
    }
  }
};
