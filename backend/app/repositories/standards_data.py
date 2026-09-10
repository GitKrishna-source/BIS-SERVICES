from typing import List, Dict, Any
from app.repositories.data.batch_1 import BATCH_1
from app.repositories.data.batch_2 import ADDITIONAL_STANDARDS_BATCH_2

TOP_50_STANDARDS: List[Dict[str, Any]] = [
    # -------------------------------------------------------------
    # 1. CIVIL, STRUCTURAL & BUILDING MATERIALS
    # -------------------------------------------------------------
    {
        "id": "IS-456-2000",
        "code": "IS 456:2000",
        "title": "Plain and Reinforced Concrete — Code of Practice (Fourth Revision)",
        "description": "Foundational civil code covering design, structural safety, durability, mix proportions, reinforcement detailing, and minimum cementitious content for RCC works across India.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 91.100.30",
        "enforcedDate": "01 Jan 2002",
        "ministry": "Ministry of Housing and Urban Affairs (CPWD & NBCC)",
        "pages": 114,
        "pdfUrl": "https://archive.org/download/gov.in.is.456.2000/gov.in.is.456.2000.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 6.1.1",
                "title": "Characteristic Compressive Strength of Concrete",
                "tag": "Structural Strength",
                "description": "Compressive strength defined as that value of cube strength below which not more than 5 percent of test results fall. Standard grade designations range from M10 to M80 with 28-day 150mm cube curing."
            },
            {
                "number": "Cl. 8.2.2.1",
                "title": "Durability & Minimum Cementitious Content (Table 5)",
                "tag": "Durability Matrix",
                "description": "For 'Severe' environmental exposure, minimum grade of reinforced concrete is M30; minimum cement content is 320 kg/m³ with maximum free water-cement ratio capped strictly at 0.45."
            },
            {
                "number": "Cl. 26.5.1.1",
                "title": "Minimum and Maximum Tensile Reinforcement in Beams",
                "tag": "Steel Ratio Limits",
                "description": "Minimum longitudinal tension reinforcement ratio: As / (b * d) ≥ 0.85 / fy. Maximum reinforcement area in tension or compression shall not exceed 0.04 * b * D."
            }
        ],
        "labsCount": 85,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1893-1-2016",
        "code": "IS 1893 (Part 1):2016",
        "title": "Criteria for Earthquake Resistant Design of Structures — General Provisions and Buildings",
        "description": "Prescribes seismic hazard zonation (Zones II, III, IV, V), response spectra, design base shear formulas, dynamic analysis methods, and drift limitations for seismic safety.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 91.120.25",
        "enforcedDate": "15 Jun 2017",
        "ministry": "Ministry of Housing & Urban Affairs / NDMA",
        "pages": 52,
        "pdfUrl": "https://archive.org/download/gov.in.is.1893.1.2016/gov.in.is.1893.1.2016.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 6.4.2",
                "title": "Design Horizontal Seismic Coefficient (Ah)",
                "tag": "Seismic Formula",
                "description": "Determined by formula Ah = (Z / 2) * (I / R) * (Sa / g), where Z is Zone Factor (0.10 for Zone II to 0.36 for Zone V), I is Importance Factor (1.0 to 1.5), R is Response Reduction Factor, and Sa/g is acceleration coefficient."
            },
            {
                "number": "Cl. 7.11.1",
                "title": "Storey Drift Limitation",
                "tag": "Drift Compliance",
                "description": "Storey drift in any storey due to minimum specified design lateral force shall not exceed 0.004 times the storey height (0.4% height limit under full seismic base shear)."
            },
            {
                "number": "Cl. 6.4.3.1",
                "title": "Minimum Design Base Shear (Vb)",
                "tag": "Base Shear Floor",
                "description": "In dynamic analysis, the calculated design base shear Vb shall not be less than the design base shear calculated using fundamental natural period Ta per Clause 7.6.2."
            }
        ],
        "labsCount": 46,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-13920-2016",
        "code": "IS 13920:2016",
        "title": "Ductile Detailing of Reinforced Concrete Structures Subjected to Seismic Forces",
        "description": "Specifies mandatory reinforcement hoops, cross-ties, shear stirrup spacing, beam-column joint confining reinforcement, and lap splice locations for buildings in seismic zones III, IV, and V.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 91.120.25",
        "enforcedDate": "01 Jan 2017",
        "ministry": "Ministry of Housing & Urban Affairs",
        "pages": 38,
        "pdfUrl": "https://archive.org/download/gov.in.is.13920.2016/gov.in.is.13920.2016.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 6.2.1",
                "title": "Longitudinal Steel Ductility Ratio",
                "tag": "Bar Ductility",
                "description": "Rebars used shall have minimum elongation of 14.5% and yield-to-tensile ratio greater than 1.25 to prevent brittle collapse (Fe 500D or Fe 550D compliant)."
            },
            {
                "number": "Cl. 7.6.1",
                "title": "Special Confining Reinforcement in Columns",
                "tag": "Confinement Pitch",
                "description": "Stirrup pitch in plastic hinge regions shall not exceed d/4, 6 times smallest longitudinal bar diameter, or 100mm, whichever is lowest."
            }
        ],
        "labsCount": 38,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1786-2008",
        "code": "IS 1786:2008",
        "title": "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement (TMT Rebars)",
        "description": "Prescribes chemical limits (Carbon, Sulphur, Phosphorus) and mechanical strength (Proof stress, Tensile strength, Elongation, Total elongation at max force) for Fe 415, Fe 500, Fe 550, and Fe 600 grades.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 77.140.15",
        "enforcedDate": "01 Aug 2009",
        "ministry": "Ministry of Steel Mandatory Quality Order",
        "pages": 24,
        "pdfUrl": "https://archive.org/download/gov.in.is.1786.2008/gov.in.is.1786.2008.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 4.2",
                "title": "Chemical Composition Limits (Ladle Analysis)",
                "tag": "Melt Chemistry",
                "description": "For Fe 500D grade: Carbon max 0.25%, Sulphur max 0.040%, Phosphorus max 0.040%, and S+P combined max 0.075%."
            },
            {
                "number": "Cl. 8.1",
                "title": "Mechanical Properties (Tensile & Proof Stress)",
                "tag": "Yield Threshold",
                "description": "Fe 500D must achieve minimum 0.2% proof stress of 500 MPa, tensile strength ≥ 565 MPa, and minimum percentage elongation of 16.0%."
            },
            {
                "number": "Cl. 9.1",
                "title": "Bend and Rebend Testing",
                "tag": "Fracture Test",
                "description": "Specimen bent through 180° around mandrel diameter of 3d to 5d must show zero transverse crack or surface rupture."
            }
        ],
        "labsCount": 92,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-269-2015",
        "code": "IS 269:2015",
        "title": "Ordinary Portland Cement — Specification (33, 43, and 53 Grades)",
        "description": "Comprehensive harmonized standard for 33, 43, and 53 grade Ordinary Portland Cement covering fineness, soundness, setting times, and compressive strength.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 91.100.10",
        "enforcedDate": "01 Jun 2016",
        "ministry": "Ministry of Commerce & Industry (DPIIT Cement QCO)",
        "pages": 20,
        "pdfUrl": "https://archive.org/download/gov.in.is.269.2015/gov.in.is.269.2015.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 6.1",
                "title": "Physical Requirements (Setting Times & Soundness)",
                "tag": "Vicat & Le-Chatelier",
                "description": "Initial setting time not less than 30 minutes; final setting time not more than 600 minutes. Le-Chatelier expansion ≤ 10 mm; Autoclave expansion ≤ 0.8%."
            },
            {
                "number": "Cl. 6.2",
                "title": "28-Day Compressive Strength",
                "tag": "Strength Benchmark",
                "description": "For 53 Grade OPC, 28-day standard mortar compressive strength must be not less than 53 MPa (with 7-day strength ≥ 37 MPa)."
            }
        ],
        "labsCount": 68,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-800-2007",
        "code": "IS 800:2007",
        "title": "General Construction in Steel — Code of Practice",
        "description": "Limit State Method (LSM) standard for structural steel frames, truss fabrication, bolted and welded moment connections, lateral torsional buckling, and fire resistance.",
        "status": "ISI Mark Valid",
        "statusType": "isi",
        "ics": "ICS 91.080.10",
        "enforcedDate": "01 Feb 2008",
        "ministry": "Ministry of Steel / MoHUA",
        "pages": 150,
        "pdfUrl": "https://archive.org/download/gov.in.is.800.2007/gov.in.is.800.2007.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 5.1.2",
                "title": "Partial Safety Factors for Materials (γm)",
                "tag": "Safety Factor",
                "description": "Resistance governed by yielding: γm0 = 1.10. Resistance governed by ultimate stress: γm1 = 1.25. Resistance of bolts in shear and bearing: γmb = 1.25."
            },
            {
                "number": "Cl. 7.1.2",
                "title": "Design Compressive Strength of Axially Loaded Members",
                "tag": "Euler Buckling",
                "description": "Factored design compressive strength Pd = Ae * fcd, where fcd is derived from Perry-Robertson formula and Buckling Class a, b, c, or d per Table 7."
            }
        ],
        "labsCount": 44,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-383-2016",
        "code": "IS 383:2016",
        "title": "Coarse and Fine Aggregate for Concrete — Specification (Third Revision)",
        "description": "Regulates grading limits, mechanical properties, aggregate crushing value, alkali-aggregate reactivity, and permits manufactured sand (M-Sand) and recycled concrete aggregates.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 91.100.15",
        "enforcedDate": "01 Jan 2017",
        "ministry": "Ministry of Housing & Urban Affairs",
        "pages": 28,
        "pdfUrl": "https://archive.org/download/gov.in.is.383.2016/gov.in.is.383.2016.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 4.1",
                "title": "Manufactured Aggregate Inclusion",
                "tag": "M-Sand Compliance",
                "description": "Permits manufactured sand (crushed hard rock) and recycled concrete aggregate (RCA) subject to flakiness index ≤ 35% and water absorption ≤ 2.0% for coarse."
            },
            {
                "number": "Cl. 5.3",
                "title": "Aggregate Impact Value & Crushing Value",
                "tag": "Wear Resistance",
                "description": "Aggregate impact value shall not exceed 30% for concrete wearing surfaces (runways/pavements) and 45% for other civil structural concrete."
            }
        ],
        "labsCount": 55,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-303-2024",
        "code": "IS 303:2024",
        "title": "Plywood for General Purposes (MR and BWR Grades)",
        "description": "Prescribes requirements for moisture resistance, boiling water resistance, bond adhesive strength, and formaldehyde emissions in architectural plywood.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 79.060.10",
        "enforcedDate": "28 Feb 2024",
        "ministry": "DPIIT Wood Products Quality Control Order",
        "pages": 28,
        "pdfUrl": "https://archive.org/download/gov.in.is.303.1989/gov.in.is.303.1989.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 7.1",
                "title": "Moisture Content & Density Uniformity",
                "tag": "Physical Test",
                "description": "Moisture content shall be between 8% and 16% across all veneer plies."
            },
            {
                "number": "Cl. 8.2",
                "title": "Boiling Water Resistance (BWR) Bond Adhesion",
                "tag": "72-Hour Boil",
                "description": "Test pieces submerged in boiling water for 72 hours must show zero delamination and glue shear strength ≥ 1000 N."
            }
        ],
        "labsCount": 26,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-710-2010",
        "code": "IS 710:2010",
        "title": "Marine Plywood — Specification",
        "description": "Rigorous specification for preservative-treated tropical hardwood plywood capable of withstanding continuous marine water immersion, fungal rot, and heavy marine organisms.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 79.060.10",
        "enforcedDate": "01 Jan 2012",
        "ministry": "DPIIT Wood Products QCO",
        "pages": 22,
        "pdfUrl": "https://archive.org/download/gov.in.is.710.2010/gov.in.is.710.2010.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Phenol Formaldehyde Resin Bonding",
                "tag": "Adhesive Grade",
                "description": "Must strictly use BWP (Boiling Waterproof) unextended synthetic phenolic resin adhesive complying with IS 848."
            },
            {
                "number": "Cl. 9.1",
                "title": "Mycological Test for Resistance to Wood-Rotting Fungi",
                "tag": "Bio-Resistance",
                "description": "Veneers must undergo copper-chrome-boron or CCB preservative impregnation retaining minimum 12.0 kg/m³ retention."
            }
        ],
        "labsCount": 22,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-875-3-2015",
        "code": "IS 875 (Part 3):2015",
        "title": "Design Loads (Other than Earthquake) for Buildings — Wind Loads",
        "description": "Prescribes basic wind speed map of India (Vb 33 to 55 m/s), risk coefficient k1, terrain roughness factor k2, topography factor k3, cyclonic importance factor k4, and pressure coefficients.",
        "status": "ISI Mark Valid",
        "statusType": "isi",
        "ics": "ICS 91.060.01",
        "enforcedDate": "01 Oct 2016",
        "ministry": "Ministry of Housing and Urban Affairs",
        "pages": 76,
        "pdfUrl": "https://archive.org/download/gov.in.is.875.3.2015/gov.in.is.875.3.2015.pdf",
        "verified": True,
        "category": "Building Materials",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Design Wind Speed (Vz) Formula",
                "tag": "Kinetic Velocity",
                "description": "Design wind speed calculated as Vz = Vb * k1 * k2 * k3 * k4, where Vb is regional basic wind speed at 10m height."
            },
            {
                "number": "Cl. 6.3",
                "title": "Design Wind Pressure (Pz)",
                "tag": "Dynamic Pressure",
                "description": "Design wind pressure given by Pz = 0.6 * Vz² (in N/m²), modified by external and internal aerodynamic wind pressure coefficients (Cpe - Cpi)."
            }
        ],
        "labsCount": 30,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # -------------------------------------------------------------
    # 2. ELECTRONICS & IT (COMPULSORY REGISTRATION SCHEME - CRS)
    # -------------------------------------------------------------
    {
        "id": "IS-13252-1-2010",
        "code": "IS 13252 (Part 1):2010",
        "title": "Information Technology Equipment — Safety: General Requirements",
        "description": "Essential safety standard for servers, personal computers, power adapters, point of sale terminals, and office telecom equipment.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 35.020",
        "enforcedDate": "03 Jul 2013",
        "ministry": "MeitY Compulsory Registration Order",
        "pages": 142,
        "pdfUrl": "https://archive.org/download/gov.in.is.13252.1.2010/gov.in.is.13252.1.2010.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 2.1.1.1",
                "title": "Access to Energized Parts & Hazardous Voltages",
                "tag": "Shock Hazard",
                "description": "Equipment enclosures shall prevent standard test finger (IEC jointed probe) from contacting voltages exceeding 42.4 V peak or 60 V DC under normal and single-fault conditions."
            },
            {
                "number": "Cl. 4.5.2",
                "title": "Maximum Temperature Limits of Critical Components",
                "tag": "Thermal Limit",
                "description": "Transformers, inductors, PCB laminates, and electrolytic capacitors must not exceed rated insulation thermal limits (Class B 120°C, Class F 140°C)."
            },
            {
                "number": "Cl. 5.2.2",
                "title": "Dielectric Withstand / Electric Strength Test",
                "tag": "Hipot Voltage",
                "description": "Primary to secondary reinforced insulation must withstand 3000 V r.m.s. (or 4242 V d.c.) AC high-potential test for 60 seconds with leakage current ≤ 10 mA."
            }
        ],
        "labsCount": 42,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16046-1-2018",
        "code": "IS 16046 (Part 1):2018",
        "title": "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Nickel Systems)",
        "description": "Safety requirements for portable sealed secondary nickel cells and batteries used in industrial and consumer portable applications.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 29.220.30",
        "enforcedDate": "01 Jan 2020",
        "ministry": "MeitY Electronics CRO",
        "pages": 36,
        "pdfUrl": "https://archive.org/download/gov.in.is.16046.1.2018/gov.in.is.16046.1.2018.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 7.2",
                "title": "External Short-Circuit Test",
                "tag": "Thermal Runaway",
                "description": "Fully charged cells short-circuited at 20±5°C through external resistance < 100 mΩ must not ignite or explode during 24-hour observation."
            },
            {
                "number": "Cl. 7.3.2",
                "title": "Continuous Charging at Constant Voltage",
                "tag": "Overcharge Safety",
                "description": "Cells charged at manufacturer rated float voltage for 28 days continuous duration must exhibit no leakage, fire, or venting burst."
            }
        ],
        "labsCount": 35,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16046-2-2018",
        "code": "IS 16046 (Part 2):2018",
        "title": "Secondary Cells and Batteries (Lithium Systems) — Safety Requirements for Portable Use",
        "description": "Mandatory safety standard for Lithium-ion and Lithium polymer pouch cells/packs used in mobile phones, power banks, tablets, and wearable electronics.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 29.220.30",
        "enforcedDate": "01 Jan 2020",
        "ministry": "MeitY Compulsory Registration Scheme",
        "pages": 44,
        "pdfUrl": "https://archive.org/download/gov.in.is.16046.2.2018/gov.in.is.16046.2.2018.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 7.3.1",
                "title": "External Short Circuit at 55°C",
                "tag": "High Temp Short",
                "description": "Battery pack preconditioned at 55±5°C shorted at external resistance ≤ 30 mΩ. Case temperature must not exceed 150°C; zero explosion or fire permissible."
            },
            {
                "number": "Cl. 7.3.3",
                "title": "Free Fall Drop Testing",
                "tag": "Mechanical Shock",
                "description": "Battery dropped 3 times from 1.0 meter height onto concrete surface in random orientations. Must maintain BMS over-discharge protection with no casing rupture."
            },
            {
                "number": "Cl. 7.3.6",
                "title": "Overcharging of Battery Packs",
                "tag": "BMS Protection",
                "description": "Continuous charge at 2.0C current up to 10V with single-fault disabled BMS circuit. Pack must demonstrate secondary thermal fuse interruption without exploding."
            }
        ],
        "labsCount": 48,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-15885-2-13",
        "code": "IS 15885 (Part 2/Sec 13)",
        "title": "Lamp Controlgear — Particular Requirements for DC or AC Supplied Electronic Controlgear for LED Modules",
        "description": "Mandatory safety parameters for electronic drivers and power modules driving domestic, architectural, streetlight, and industrial LED fixtures.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 29.140.99",
        "enforcedDate": "01 Sep 2015",
        "ministry": "MeitY Electronic Goods CRO",
        "pages": 38,
        "pdfUrl": "https://archive.org/download/gov.in.is.15885.2.13.2012/gov.in.is.15885.2.13.2012.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 14.1",
                "title": "Fault Condition Protection & Surge Immunity",
                "tag": "Surge Test",
                "description": "Drivers must survive 4.0 kV line-to-earth surge impulses (IEC 61000-4-5) without component fragmentation, flashover, or insulation short-circuit."
            },
            {
                "number": "Cl. 16.1",
                "title": "Thermal Endurance Test for Driver Windings and Enclosure",
                "tag": "tc Casing Temp",
                "description": "Driver operated inside thermal chamber at declared tc maximum casing temperature for 200 hours. Insulation resistance to frame must stay ≥ 2 MΩ."
            }
        ],
        "labsCount": 31,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16102-1-2012",
        "code": "IS 16102 (Part 1):2012",
        "title": "Self-Ballasted LED Lamps for General Lighting Services — Safety Requirements",
        "description": "Standard for screw and bayonet-cap LED bulbs (B22, E27) covering cap interchangeability, electric shock prevention, insulation resistance, and flammability.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 29.140.01",
        "enforcedDate": "01 May 2015",
        "ministry": "MeitY & Bureau of Energy Efficiency (BEE)",
        "pages": 26,
        "pdfUrl": "https://archive.org/download/gov.in.is.16102.1.2012/gov.in.is.16102.1.2012.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 6.1",
                "title": "Interchangeability and Mechanical Torsion",
                "tag": "Torque Test",
                "description": "Lamp cap must resist torsional torque of 3.0 N·m (B22d) and 1.5 N·m (E27) without twisting loose from plastic housing."
            },
            {
                "number": "Cl. 8.1",
                "title": "Resistance to Heat and Flame (Glow Wire Test)",
                "tag": "Glow-Wire 650°C",
                "description": "Thermoplastic parts retaining live components shall withstand glow-wire test at 650°C with flame extinguishing within 30 seconds."
            }
        ],
        "labsCount": 36,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-616-2017",
        "code": "IS 616:2017",
        "title": "Audio, Video and Similar Electronic Apparatus — Safety Requirements",
        "description": "Harmonized safety standard (IEC 60065 alignment) for smart TVs, amplifiers, home theater systems, music systems, and commercial video displays.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 33.160.01",
        "enforcedDate": "01 Apr 2018",
        "ministry": "MeitY Electronic CRO",
        "pages": 88,
        "pdfUrl": "https://archive.org/download/gov.in.is.616.2017/gov.in.is.616.2017.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 4.3",
                "title": "Radiation Hazards and Laser Product Safety",
                "tag": "Laser Hazard",
                "description": "Optical disc drive laser pickups must comply with Class 1 laser emission limits per IS 60825-1 to prevent eye injury."
            },
            {
                "number": "Cl. 9.1",
                "title": "Shock Hazard Under Normal Operating Conditions",
                "tag": "Leakage Current",
                "description": "Touch current from accessible parts to ground shall not exceed 0.7 mA peak a.c. or 2.0 mA d.c."
            }
        ],
        "labsCount": 29,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16242-1-2014",
        "code": "IS 16242 (Part 1):2014",
        "title": "Uninterruptible Power Systems (UPS) — General and Safety Requirements",
        "description": "Applies to movable, stationary, and fixed UPS systems supplying emergency electrical power to data centers, hospitals, and domestic IT installations.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 29.200",
        "enforcedDate": "01 Jul 2016",
        "ministry": "MeitY Electronics CRO",
        "pages": 64,
        "pdfUrl": "https://archive.org/download/gov.in.is.16242.1.2014/gov.in.is.16242.1.2014.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 4.7",
                "title": "Emergency Power Off (EPO) Interlock Mechanism",
                "tag": "Safety Shutoff",
                "description": "UPS systems exceeding 10 kVA rating must feature an accessible manual EPO actuator that decouples all battery strings and AC lines within 200 ms."
            }
        ],
        "labsCount": 24,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-16333-3-2016",
        "code": "IS 16333 (Part 3):2016",
        "title": "Mobile Phone Handsets — Indian Language Support (Requirement for Message Typing)",
        "description": "Mandatory standard for all smartphones and feature phones sold in India requiring hardware keyboard/keypad or virtual keyboard support for 22 scheduled Indian languages.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 33.070.50",
        "enforcedDate": "01 Jul 2017",
        "ministry": "Ministry of Electronics and Information Technology (MeitY)",
        "pages": 32,
        "pdfUrl": "https://archive.org/download/gov.in.is.16333.3.2016/gov.in.is.16333.3.2016.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Input of Text in Scheduled Languages (INSCRIPT Layout)",
                "tag": "Indic Script",
                "description": "Handsets must provide standard Indian Script Code for Information Interchange (ISCII) and INSCRIPT keyboard input matrix for Hindi and regional scripts."
            }
        ],
        "labsCount": 19,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-14286-1995",
        "code": "IS 14286:2010",
        "title": "Crystalline Silicon Terrestrial Photovoltaic (PV) Modules — Design Qualification and Type Approval",
        "description": "Rigorous qualification testing for solar PV panels including ultraviolet exposure, damp heat, thermal cycling, mechanical load, and hail impact resistance.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 27.160",
        "enforcedDate": "01 Aug 2018",
        "ministry": "Ministry of New and Renewable Energy (MNRE Solar QCO)",
        "pages": 46,
        "pdfUrl": "https://archive.org/download/gov.in.is.14286.2010/gov.in.is.14286.2010.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 10.11",
                "title": "Thermal Cycling Test (200 Cycles -40°C to +85°C)",
                "tag": "Extreme Thermal",
                "description": "Modules subjected to 200 temperature transitions with maximum power degradation not exceeding 5.0% and zero open-circuit cell degradation."
            },
            {
                "number": "Cl. 10.13",
                "title": "Damp Heat Test (1000 Hours at 85°C / 85% RH)",
                "tag": "Delamination Test",
                "description": "1000 hours continuous humidity exposure. Module wet insulation resistance must stay ≥ 40 MΩ·m²."
            }
        ],
        "labsCount": 16,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },

    # -------------------------------------------------------------
    # 3. STEEL, METALLURGY & PIPING
    # -------------------------------------------------------------
    {
        "id": "IS-2062-2011",
        "code": "IS 2062:2011",
        "title": "Hot Rolled Medium and High Tensile Structural Steel — Specification",
        "description": "National benchmark standard for structural steel plates, sections, channels, and angles (Grades E250, E300, E350, E410, E450) used in bridges, skyscrapers, and industrial plants.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 77.140.01",
        "enforcedDate": "12 Feb 2012",
        "ministry": "Ministry of Steel Mandatory Quality Order",
        "pages": 26,
        "pdfUrl": "https://archive.org/download/gov.in.is.2062.2011/gov.in.is.2062.2011.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 7.1",
                "title": "Chemical Composition (Carbon Equivalent Ce)",
                "tag": "Weldability Ce",
                "description": "For Grade E250 Quality A: Carbon max 0.23%, Manganese max 1.50%. Maximum Carbon Equivalent CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15 shall not exceed 0.42%."
            },
            {
                "number": "Cl. 8.1",
                "title": "Tensile and Yield Strength Matrix",
                "tag": "Yield Floor",
                "description": "For thickness < 20mm, Grade E250 must deliver minimum yield strength of 250 MPa, ultimate tensile strength of 410 MPa, and elongation ≥ 23%."
            },
            {
                "number": "Cl. 9.1",
                "title": "Charpy V-Notch Impact Energy",
                "tag": "Impact Toughness",
                "description": "Grade E250 Quality C must achieve minimum 27 Joules impact energy absorbed at -20°C sub-zero test temperature."
            }
        ],
        "labsCount": 74,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-6911-2017",
        "code": "IS 6911:2017",
        "title": "Stainless Steel Plate, Sheet and Strip — Technical Specification",
        "description": "Specifies chemical composition, tolerances, and intergranular corrosion test requirements for 304, 316, 430, and 200-series stainless steel flats.",
        "status": "ISI Mark Valid",
        "statusType": "isi",
        "ics": "ICS 77.140.20",
        "enforcedDate": "12 Dec 2018",
        "ministry": "Ministry of Steel Mandatory Quality Order",
        "pages": 56,
        "pdfUrl": "https://archive.org/download/gov.in.is.6911.2017/gov.in.is.6911.2017.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Ladle Analysis & Spectrographic Composition",
                "tag": "Melt Chemistry",
                "description": "Grade 304 requires Chromium 17.50% - 19.50%, Nickel 8.00% - 10.50%, Carbon ≤ 0.080%, Sulfur ≤ 0.030%."
            },
            {
                "number": "Cl. 9.3",
                "title": "Intergranular Corrosion (IGC) Practice A & E",
                "tag": "Acid Immersion",
                "description": "Boiling copper sulfate-sulfuric acid immersion test with 180° bend test. Zero intergranular attack cracks under 20x magnification."
            }
        ],
        "labsCount": 35,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1239-1-2004",
        "code": "IS 1239 (Part 1):2004",
        "title": "Steel Tubes, Tubulars and Other Wrought Steel Fittings — Mild Steel Tubes",
        "description": "Standard for continuous welded and seamless mild steel pipes for fire hydrant systems, gas supply, water plumbing, and steam distribution (Light, Medium, Heavy classes).",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 77.140.75",
        "enforcedDate": "01 Jan 2005",
        "ministry": "Ministry of Steel",
        "pages": 22,
        "pdfUrl": "https://archive.org/download/gov.in.is.1239.1.2004/gov.in.is.1239.1.2004.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 8.1",
                "title": "Hydrostatic Pressure Leak Test",
                "tag": "5.0 MPa Hydro",
                "description": "Every tube shall withstand internal hydrostatic test pressure of 5.0 MPa (50 bar) held for minimum 5 seconds without showing sign of leakage."
            },
            {
                "number": "Cl. 9.2",
                "title": "Flattening Test for Welded Tubes",
                "tag": "Weld Integrity",
                "description": "Specimen flattened between parallel plates to distance of 75% outside diameter. No cracking or defect in weld seam permitted."
            }
        ],
        "labsCount": 51,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1161-2014",
        "code": "IS 1161:2014",
        "title": "Steel Tubes for Structural Purposes — Specification",
        "description": "Covers hot-finished seamless, electric resistance welded (ERW), and high-frequency induction welded structural circular hollow sections for stadiums, airports, and space frames.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 77.140.75",
        "enforcedDate": "01 Oct 2015",
        "ministry": "Ministry of Steel Mandatory Quality Order",
        "pages": 18,
        "pdfUrl": "https://archive.org/download/gov.in.is.1161.2014/gov.in.is.1161.2014.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 7.1",
                "title": "Mechanical Properties of Grade YSt 310",
                "tag": "Structural Hollow",
                "description": "Minimum yield stress 310 MPa, tensile strength 450 MPa, elongation ≥ 14% on gauge length 5.65√So."
            }
        ],
        "labsCount": 42,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-4984-2016",
        "code": "IS 4984:2016",
        "title": "High Density Polyethylene (HDPE) Pipes for Water Supply — Specification",
        "description": "Standard for PE-63, PE-80, and PE-100 HDPE pipes used for cross-country municipal water transmission, agricultural irrigation, and industrial effluent transport.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 23.040.20",
        "enforcedDate": "01 Sep 2017",
        "ministry": "Ministry of Chemicals and Fertilizers / DPIIT",
        "pages": 32,
        "pdfUrl": "https://archive.org/download/gov.in.is.4984.2016/gov.in.is.4984.2016.pdf",
        "verified": True,
        "category": "Chemicals & Polymers",
        "clauses": [
            {
                "number": "Cl. 8.1",
                "title": "Hydrostatic Strength at 80°C for 165 Hours",
                "tag": "Creep Rupture",
                "description": "Pipes tested under circumferential hoop stress of 5.4 MPa (PE 100) immersed in 80°C water bath for 165 hours without failure or localized ballooning."
            },
            {
                "number": "Cl. 8.4",
                "title": "Carbon Black Content & Dispersion",
                "tag": "UV Degradation",
                "description": "Carbon black percentage shall be 2.25 ± 0.25% by mass with grade ≤ 3 dispersion rating to guarantee 50-year outdoor UV resistance."
            }
        ],
        "labsCount": 49,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-4985-2021",
        "code": "IS 4985:2021",
        "title": "Unplasticized Polyvinyl Chloride (uPVC) Pipes for Potable Water Supplies",
        "description": "Specifications for rigid uPVC pressure pipes with solvent-cement joints or elastomeric sealing rings for municipal drinking water pipelines.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 23.040.20",
        "enforcedDate": "01 Jan 2022",
        "ministry": "DPIIT & Ministry of Jal Shakti",
        "pages": 36,
        "pdfUrl": "https://archive.org/download/gov.in.is.4985.2021/gov.in.is.4985.2021.pdf",
        "verified": True,
        "category": "Chemicals & Polymers",
        "clauses": [
            {
                "number": "Cl. 9.1",
                "title": "Lead and Toxic Metal Extraction Limits",
                "tag": "Toxic Extraction",
                "description": "Lead extraction into test water shall not exceed 1.0 mg/L on 1st extraction and 0.05 mg/L on 3rd extraction; Cadmium ≤ 0.01 mg/L."
            },
            {
                "number": "Cl. 10.2",
                "title": "Resistance to Dichloromethane at 15°C",
                "tag": "Gelation Check",
                "description": "Pipe ring submerged in dichloromethane at 15±1°C for 30 minutes must show zero attack, swelling, or delamination (proves complete polymer gelation)."
            }
        ],
        "labsCount": 58,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-15778-2007",
        "code": "IS 15778:2007",
        "title": "Chlorinated Polyvinyl Chloride (CPVC) Pipes for Potable Hot and Cold Water Distribution",
        "description": "Standard for SDR 11 and SDR 13.5 CPVC pipes handling continuous water temperatures up to 82°C and short-term spikes up to 93°C.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 23.040.20",
        "enforcedDate": "01 Aug 2008",
        "ministry": "DPIIT Pipes QCO",
        "pages": 24,
        "pdfUrl": "https://archive.org/download/gov.in.is.15778.2007/gov.in.is.15778.2007.pdf",
        "verified": True,
        "category": "Chemicals & Polymers",
        "clauses": [
            {
                "number": "Cl. 7.1",
                "title": "Thermal Stability & Vicat Softening Temperature",
                "tag": "High Temp Rating",
                "description": "Vicat softening temperature of pipe material must not be less than 110°C tested under 50 N load per IS 6307."
            }
        ],
        "labsCount": 33,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-814-2004",
        "code": "IS 814:2004",
        "title": "Covered Electrodes for Manual Metal Arc Welding of Carbon and Carbon Manganese Steels",
        "description": "Classifies basic, rutile, and cellulosic flux coated welding electrodes according to weld deposit tensile strength, impact energy, and hydrogen diffusivity.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 25.160.20",
        "enforcedDate": "01 May 2005",
        "ministry": "Ministry of Steel Mandatory Certification",
        "pages": 30,
        "pdfUrl": "https://archive.org/download/gov.in.is.814.2004/gov.in.is.814.2004.pdf",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 7.2",
                "title": "Diffusible Hydrogen in Weld Metal (Mercury Method)",
                "tag": "Low Hydrogen",
                "description": "For Grade H3 low hydrogen electrodes, diffusible hydrogen shall not exceed 5.0 ml per 100g of deposited weld metal to prevent cold cracking."
            }
        ],
        "labsCount": 27,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # -------------------------------------------------------------
    # 4. CONSUMER GOODS & SAFETY GEAR
    # -------------------------------------------------------------
    {
        "id": "IS-17803-2022",
        "code": "IS 17803:2022",
        "title": "Stainless Steel Vacuum Flasks, Insulated Beverage Containers & Tableware",
        "description": "Specifies mandatory requirements for food-grade contact metallurgy, vacuum retention decay, cap seal integrity, and drop resistance for double-walled vessels.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.040.60",
        "enforcedDate": "15 Oct 2023",
        "ministry": "Ministry of Commerce & Industry (DPIIT) QCO II",
        "pages": 34,
        "pdfUrl": "https://archive.org/download/gov.in.is.17803.2022/gov.in.is.17803.2022.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 4.1",
                "title": "Chemical Composition & Raw Metallurgy",
                "tag": "Mandatory Traceability",
                "description": "Austenitic Stainless Steel Grade 304 or 316; Min 17.5% Chromium, Min 8.0% Nickel. Must strictly comply with IS 6911:2017 raw material traceability with mill test certifications verified per batch melt."
            },
            {
                "number": "Cl. 5.2",
                "title": "Thermal Retention Performance Matrix",
                "tag": "Kinetic Thermal Test",
                "description": "Boiling water containment at 98°C must maintain ≥ 60.0°C after 6.0 hours at standardized ambient chamber temperature (27±2°C). Dual-walled evacuated cavity vacuum delta must not exceed 10⁻³ mbar degradation."
            },
            {
                "number": "Cl. 6.1",
                "title": "Seal & Hydrostatic Leakage Verification",
                "tag": "Pressure Invariant",
                "description": "Pneumatic 1.50 bar pressure for 300 seconds with zero droplet penetration. Gaskets must demonstrate food-grade silicone compliance under IS 9845 (Overall Migration Limits ≤ 10 mg/dm² in 3% acetic acid simulant)."
            }
        ],
        "labsCount": 18,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-4151-2015",
        "code": "IS 4151:2015",
        "title": "Protective Helmets for Two-Wheeler Motor Vehicle Riders — Specification",
        "description": "Mandatory safety standard for motorcycle helmets covering impact attenuation, retention chin-strap dynamic stretch, penetration resistance, and visor optical clarity.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 13.340.20",
        "enforcedDate": "01 Jun 2021",
        "ministry": "Ministry of Road Transport and Highways (MoRTH)",
        "pages": 42,
        "pdfUrl": "https://archive.org/download/gov.in.is.4151.2015/gov.in.is.4151.2015.pdf",
        "verified": True,
        "category": "Automotive & Safety",
        "clauses": [
            {
                "number": "Cl. 8.1",
                "title": "Impact Attenuation Test (Drop from 2.87m)",
                "tag": "Crash Deceleration",
                "description": "Helmet fitted on headform dropped on flat and hemispherical steel anvils at 7.5 m/s. Peak acceleration transmitted to headform shall never exceed 300g (and 150g for > 5 ms)."
            },
            {
                "number": "Cl. 8.2",
                "title": "Retention System Dynamic Extension & Rigidity",
                "tag": "Chin Strap Rigidity",
                "description": "Subjected to 1000 N dynamic tensile force. Dynamic extension shall not exceed 35 mm and residual displacement ≤ 25 mm."
            },
            {
                "number": "Cl. 8.4",
                "title": "Visor Luminous Transmittance & Optical Clarity",
                "tag": "Optics Clear",
                "description": "Visors shall have minimum 85% light transmittance (clear) and zero distortion causing optical refraction index error > 0.12 diopter."
            }
        ],
        "labsCount": 22,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-15298-2-2016",
        "code": "IS 15298 (Part 2):2016",
        "title": "Personal Protective Equipment — Safety Footwear (Second Revision)",
        "description": "Mandatory industrial steel-toe safety shoes standard covering 200-Joule toe cap impact, puncture resistance, oil-resistant soles, and electrical antistatic properties.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 13.340.50",
        "enforcedDate": "01 Jan 2022",
        "ministry": "DPIIT Footwear Quality Control Order",
        "pages": 40,
        "pdfUrl": "https://archive.org/download/gov.in.is.15298.2.2016/gov.in.is.15298.2.2016.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 5.3.2.2",
                "title": "Toe Cap 200 Joules Impact Resistance",
                "tag": "200J Steel Toe",
                "description": "Steel or composite toe cap struck with 20 kg steel striker dropped from 1.02m (200 J energy). Clearance under toe cap must remain ≥ 14 mm (Size 8)."
            },
            {
                "number": "Cl. 5.3.3",
                "title": "Penetration Resistance of Sole Insert",
                "tag": "Nail Puncture 1100N",
                "description": "Sole punctured with 4.5mm test nail. Force required to penetrate outsole must not be less than 1100 N."
            }
        ],
        "labsCount": 17,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-9873-1-2019",
        "code": "IS 9873 (Part 1):2019",
        "title": "Safety of Toys — Mechanical and Physical Properties",
        "description": "Mandatory safety standard prohibiting sharp edges, accessible choking hazard small parts, projection hazards, string entrapment cords, and folding crush hinges in children's toys.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.200.50",
        "enforcedDate": "01 Jan 2021",
        "ministry": "Ministry of Commerce & Industry (DPIIT Toys QCO)",
        "pages": 62,
        "pdfUrl": "https://archive.org/download/gov.in.is.9873.1.2019/gov.in.is.9873.1.2019.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 4.4",
                "title": "Small Parts Choking Hazard Cylinder (< 36 Months)",
                "tag": "Choking Cylinder",
                "description": "For toys intended for children under 3 years, no part shall fit entirely inside truncated test cylinder (31.7 mm diameter x 57.1 mm depth) before or after torque/tension drop testing."
            },
            {
                "number": "Cl. 4.7",
                "title": "Edges and Sharp Points",
                "tag": "Skin Puncture",
                "description": "Accessible edges of metal and glass must be hemmed, rolled, or encased. Must pass mechanical Sharp Edge Tester without cutting sensor tape."
            }
        ],
        "labsCount": 28,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-9873-3-2020",
        "code": "IS 9873 (Part 3):2020",
        "title": "Safety of Toys — Migration of Certain Toxic Chemical Elements",
        "description": "Limits toxic heavy metals (Antimony, Arsenic, Barium, Cadmium, Chromium, Lead, Mercury, Selenium) in toy polymers, coatings, inks, and modeling clay.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.200.50",
        "enforcedDate": "01 Jan 2021",
        "ministry": "DPIIT Toys Quality Control Order",
        "pages": 24,
        "pdfUrl": "https://archive.org/download/gov.in.is.9873.3.2020/gov.in.is.9873.3.2020.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 4.1",
                "title": "Maximum Element Migration Limits (Table 1)",
                "tag": "Toxic Metal Limits",
                "description": "Bio-available migration into 0.07 M hydrochloric acid simulant shall not exceed: Lead (Pb) ≤ 90 mg/kg, Cadmium (Cd) ≤ 75 mg/kg, Arsenic (As) ≤ 25 mg/kg, Mercury (Hg) ≤ 60 mg/kg."
            }
        ],
        "labsCount": 25,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-2347-2017",
        "code": "IS 2347:2017",
        "title": "Domestic Gas Stoves for Use with Liquefied Petroleum Gases (LPG)",
        "description": "Safety requirements, thermal efficiency, gas leakage tightness, combustion emissions (CO/CO2 ratio), and flame stability for domestic LPG burners.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.040.20",
        "enforcedDate": "01 Nov 2018",
        "ministry": "Ministry of Petroleum and Natural Gas & BIS",
        "pages": 28,
        "pdfUrl": "https://archive.org/download/gov.in.is.2347.2017/gov.in.is.2347.2017.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 7.1",
                "title": "Thermal Efficiency Requirement (Min 68%)",
                "tag": "Thermal Rating",
                "description": "Each burner must achieve minimum thermal efficiency of 68.0% when tested with water vessel heating per Appendix B."
            },
            {
                "number": "Cl. 8.3",
                "title": "Carbon Monoxide Emission Limit (CO/CO2 Ratio)",
                "tag": "Toxic Emissions",
                "description": "Combustion products sample shall not exceed CO/CO2 volume ratio of 0.02 to prevent asphyxiation hazards in domestic kitchens."
            }
        ],
        "labsCount": 21,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-15687-1-2006",
        "code": "IS 15687 (Part 1):2006",
        "title": "Domestic Pressure Cookers — Safety Requirements",
        "description": "Standard governing cooking vessel hydrostatic burst pressure, spring-loaded safety valve release, gasket pressure release system, and handle thermal insulation.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.040.60",
        "enforcedDate": "01 Feb 2021",
        "ministry": "Consumer Affairs & DPIIT Domestic Appliances QCO",
        "pages": 20,
        "pdfUrl": "https://archive.org/download/gov.in.is.15687.1.2006/gov.in.is.15687.1.2006.pdf",
        "verified": True,
        "category": "Consumer Goods",
        "clauses": [
            {
                "number": "Cl. 7.2",
                "title": "Hydrostatic Bursting Pressure Test (Triple Operating)",
                "tag": "Hydro Burst",
                "description": "Vessel must withstand internal hydraulic pressure equal to at least 3 times nominal operating pressure without catastrophic structural rupture."
            },
            {
                "number": "Cl. 8.1",
                "title": "Secondary Safety Relief Device (Fusible Plug / Gasket Vent)",
                "tag": "Overpressure Relief",
                "description": "If main weight valve tube is clogged, secondary relief device must discharge cleanly between 1.5 and 2.5 times operating pressure."
            }
        ],
        "labsCount": 24,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # -------------------------------------------------------------
    # 5. ELECTRICAL & POWER EQUIPMENT
    # -------------------------------------------------------------
    {
        "id": "IS-694-2010",
        "code": "IS 694:2010",
        "title": "Polyvinyl Chloride Insulated Unsheathed and Sheathed Cables for Working Voltages up to 1100 V",
        "description": "Mandatory wiring cable standard for residential, commercial building, panel board, and industrial plant flexible copper and aluminum conductors.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.060.20",
        "enforcedDate": "01 Jan 2012",
        "ministry": "Ministry of Commerce (Cables and Wires QCO)",
        "pages": 36,
        "pdfUrl": "https://archive.org/download/gov.in.is.694.2010/gov.in.is.694.2010.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Conductor Material & Maximum DC Resistance at 20°C",
                "tag": "Copper Conductivity",
                "description": "Conductors must use annealed high-conductivity electrolytic grade copper (minimum 99.97% purity). Max resistance for 2.5 mm² stranded wire ≤ 7.41 Ω/km."
            },
            {
                "number": "Cl. 8.1",
                "title": "Spark Test at High Voltage",
                "tag": "Spark Clearance",
                "description": "Every meter of insulated core must pass continuous inline high voltage spark test (up to 6.0 kV a.c.) without single pinhole spark-over."
            },
            {
                "number": "Cl. 10.3",
                "title": "Oxygen Index and Flame Retardance (FR / FRLS)",
                "tag": "Fire Survival",
                "description": "FR grade PVC insulation must maintain minimum Oxygen Index of 29% per IS 10810 (Part 58) to ensure self-extinguishing flame retardancy."
            }
        ],
        "labsCount": 62,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-1293-2019",
        "code": "IS 1293:2019",
        "title": "Plugs and Socket-Outlets of Rated Voltage up to 250 V and Rated Current up to 16 A",
        "description": "Mandatory standard for household and commercial electrical 3-pin plugs (6A and 16A), multi-plugs, extension cord power strips, and shuttered wall sockets.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.30",
        "enforcedDate": "01 Dec 2020",
        "ministry": "DPIIT Electrical Accessories Quality Control Order",
        "pages": 58,
        "pdfUrl": "https://archive.org/download/gov.in.is.1293.2019/gov.in.is.1293.2019.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 9.1",
                "title": "Prevention of Electric Shock & Safety Shutter Mechanism",
                "tag": "Child Safety Shutter",
                "description": "Socket-outlets must incorporate automatic safety shutters that block insertion of single pin or metallic probe into live socket holes."
            },
            {
                "number": "Cl. 13.1",
                "title": "Temperature Rise Test Under Continuous 16A Load",
                "tag": "Thermal Rise ≤ 45K",
                "description": "Terminals carrying continuous rated current (16 A) must not show temperature rise exceeding 45 K above ambient room temperature."
            }
        ],
        "labsCount": 38,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-7098-1-2011",
        "code": "IS 7098 (Part 1):2011",
        "title": "Crosslinked Polyethylene Insulated Thermoplastic Sheathed Cables (XLPE) for Working Voltages up to 1100 V",
        "description": "Heavy-duty power cables with cross-linked polyethylene insulation for underground power grid distribution and sub-stations.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.060.20",
        "enforcedDate": "01 Jan 2013",
        "ministry": "Ministry of Power & DPIIT",
        "pages": 30,
        "pdfUrl": "https://archive.org/download/gov.in.is.7098.1.2011/gov.in.is.7098.1.2011.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 7.1",
                "title": "Continuous 90°C Conductor Operating Temperature",
                "tag": "90°C XLPE",
                "description": "XLPE insulation rated for continuous operation at 90°C and emergency short-circuit temperature up to 250°C for 5 seconds."
            },
            {
                "number": "Cl. 12.2",
                "title": "Hot Set Test for Crosslinking Density",
                "tag": "Polymer Crosslink",
                "description": "Dumbbell specimen loaded in oven at 200°C for 15 minutes. Elongation under load shall not exceed 175% and permanent elongation ≤ 15%."
            }
        ],
        "labsCount": 44,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-15652-2006",
        "code": "IS 15652:2006",
        "title": "Insulating Mats for Electrical Purposes — Specification",
        "description": "Synthetic elastomer dielectric safety mats placed in front of high-voltage sub-station switchboards and control rooms to protect electricians from electrocution.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 13.260",
        "enforcedDate": "01 Nov 2007",
        "ministry": "Ministry of Labour & Central Electricity Authority",
        "pages": 16,
        "pdfUrl": "https://archive.org/download/gov.in.is.15652.2006/gov.in.is.15652.2006.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Class C Voltage Proof Test (33 kV Working Voltage)",
                "tag": "33kV Dielectric",
                "description": "Mat shall withstand proof voltage of 36 kV a.c. for 1 minute and breakdown voltage ≥ 45 kV with leakage current under 10 µA/m²."
            }
        ],
        "labsCount": 18,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-302-1-2008",
        "code": "IS 302 (Part 1):2008",
        "title": "Safety of Household and Similar Electrical Appliances — General Requirements",
        "description": "Harmonized general safety code (IEC 60335-1) covering leakage current, earthing continuity, mechanical hazards, cord anchorage, and fire hazard for all home appliances.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.030",
        "enforcedDate": "01 Jul 2009",
        "ministry": "DPIIT Electrical Appliances Quality Control Order",
        "pages": 96,
        "pdfUrl": "https://archive.org/download/gov.in.is.302.1.2008/gov.in.is.302.1.2008.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 8.1",
                "title": "Protection Against Access to Live Parts",
                "tag": "Enclosure Safety",
                "description": "Appliances shall be constructed so that adequate protection against accidental contact with live parts exists when operated with all detachable covers open."
            },
            {
                "number": "Cl. 27.5",
                "title": "Earth Continuity Resistance (Max 0.1 Ω)",
                "tag": "Grounding Continuity",
                "description": "Resistance between accessible metal parts and ground terminal shall not exceed 0.1 Ω with test current of 25 A passed for 1 minute."
            }
        ],
        "labsCount": 52,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-8828-1996",
        "code": "IS 8828:1996",
        "title": "Circuit-Breakers for Overcurrent Protection for Household and Similar Installations (MCB)",
        "description": "Standard for Miniature Circuit Breakers (MCB) up to 125 A, covering rated breaking capacity (6 kA, 10 kA), magnetic trip thresholds (Types B, C, D), and endurance.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Jan 1998",
        "ministry": "DPIIT Low Voltage Switchgear QCO",
        "pages": 52,
        "pdfUrl": "https://archive.org/download/gov.in.is.8828.1996/gov.in.is.8828.1996.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 8.6",
                "title": "Short-Circuit Breaking Capacity (Icn)",
                "tag": "10kA Short Circuit",
                "description": "Breakers must safely interrupt short-circuit fault current equal to marked rating (e.g. 10,000 A) at 240V / 415V without flame emission or housing destruction."
            },
            {
                "number": "Cl. 9.10",
                "title": "Tripping Characteristics (Type C: 5 In to 10 In)",
                "tag": "Instantaneous Trip",
                "description": "Type C curve breakers must hold at 5 times rated current (In) for > 0.1s and trip instantaneously under 0.1s at 10 times In."
            }
        ],
        "labsCount": 33,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-12640-1-2016",
        "code": "IS 12640 (Part 1):2016",
        "title": "Residual Current Operated Circuit-Breakers Without Integral Overcurrent Protection (RCCB)",
        "description": "Mandatory safety devices protecting human lives from fatal electric shock by detecting residual leakage current (30 mA, 100 mA, 300 mA) within 30 milliseconds.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 29.120.50",
        "enforcedDate": "01 Aug 2017",
        "ministry": "Central Electricity Authority / DPIIT QCO",
        "pages": 48,
        "pdfUrl": "https://archive.org/download/gov.in.is.12640.1.2016/gov.in.is.12640.1.2016.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 8.1",
                "title": "30 mA Residual Operating Current for Human Protection",
                "tag": "30mA Trip",
                "description": "Life safety RCCBs must disconnect power within 300 ms at 1x IΔn and within 40 ms at 5x IΔn when leakage current reaches 30 mA."
            }
        ],
        "labsCount": 26,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-2189-2008",
        "code": "IS 2189:2008",
        "title": "Selection, Installation and Maintenance of Automatic Fire Detection and Alarm System",
        "description": "Code of practice for smoke detectors, heat detectors, manual call points, fire alarm control panels (FACP), and sounders across commercial high-rises and hospitals.",
        "status": "ISI Mark Valid",
        "statusType": "isi",
        "ics": "ICS 13.220.20",
        "enforcedDate": "01 Nov 2009",
        "ministry": "National Building Code (NBC) / Ministry of Home Affairs",
        "pages": 44,
        "pdfUrl": "https://archive.org/download/gov.in.is.2189.2008/gov.in.is.2189.2008.pdf",
        "verified": True,
        "category": "Electrical & Power",
        "clauses": [
            {
                "number": "Cl. 6.3",
                "title": "Spacing of Optical Smoke Detectors",
                "tag": "Smoke Radius",
                "description": "Under flat ceilings, radial coverage of single optical smoke detector shall not exceed 7.5 meters (effective area up to 50 m² for ceiling height ≤ 10.5m)."
            }
        ],
        "labsCount": 22,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },

    # -------------------------------------------------------------
    # 6. FOOD, WATER & HEALTHCARE / CHEMICAL
    # -------------------------------------------------------------
    {
        "id": "IS-14543-2024",
        "code": "IS 14543:2024",
        "title": "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
        "description": "Defines strict biological, microbiological, pesticide residue limits, mineralization, and packaging integrity for packaged potable water jars and bottles.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 13.060.20",
        "enforcedDate": "01 Jan 2024",
        "ministry": "FSSAI & BIS Joint Enforcement Mandate",
        "pages": 44,
        "pdfUrl": "https://archive.org/download/gov.in.is.14543.2004/gov.in.is.14543.2004.pdf",
        "verified": True,
        "category": "Food & Agriculture",
        "clauses": [
            {
                "number": "Cl. 3.2",
                "title": "Microbiological Sterility & Coliform Clearance",
                "tag": "Zero Tolerance",
                "description": "Zero count of Escherichia coli, Salmonella, and Pseudomonas aeruginosa per 250ml sample."
            },
            {
                "number": "Cl. 4.4",
                "title": "Pesticide Residue Limits (GC-MS/MS)",
                "tag": "Sub-ppb Precision",
                "description": "Individual pesticide residue shall not exceed 0.0001 mg/l and total pesticides shall not exceed 0.0005 mg/l."
            }
        ],
        "labsCount": 54,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-10500-2012",
        "code": "IS 10500:2012",
        "title": "Drinking Water — Specification (Second Revision)",
        "description": "The national standard for municipal and tap water supply specifying acceptable and permissible limits for toxic metals (Lead, Arsenic, Fluoride), hardness, and bacteria.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 13.060.20",
        "enforcedDate": "01 Jun 2013",
        "ministry": "Ministry of Jal Shakti (Jal Jeevan Mission Mandate)",
        "pages": 16,
        "pdfUrl": "https://archive.org/download/gov.in.is.10500.2012/gov.in.is.10500.2012.pdf",
        "verified": True,
        "category": "Food & Agriculture",
        "clauses": [
            {
                "number": "Cl. 4.1",
                "title": "Essential Chemical Quality Parameters (Table 1)",
                "tag": "TDS & pH Range",
                "description": "pH acceptable limit 6.5 to 8.5. Total Dissolved Solids (TDS) acceptable limit 500 mg/L (max permissible 2000 mg/L in absence of alternate source)."
            },
            {
                "number": "Cl. 4.2",
                "title": "Toxic Substances & Heavy Metal Ceilings (Table 2)",
                "tag": "Heavy Metal Cap",
                "description": "Strict permissible caps: Arsenic max 0.01 mg/L, Lead max 0.01 mg/L, Fluoride max 1.0 mg/L (1.5 mg/L max), Nitrate max 45 mg/L."
            }
        ],
        "labsCount": 78,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-13450-1-2012",
        "code": "IS 13450 (Part 1):2012",
        "title": "Medical Electrical Equipment — General Requirements for Basic Safety and Essential Performance",
        "description": "Harmonized with IEC 60601-1 for patient-connected medical devices, ICU monitors, ventilators, ECG machines, and dialyzers.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 11.040.01",
        "enforcedDate": "01 Jan 2015",
        "ministry": "CDSCO & Ministry of Health and Family Welfare",
        "pages": 210,
        "pdfUrl": "https://archive.org/download/gov.in.is.13450.1.2012/gov.in.is.13450.1.2012.pdf",
        "verified": True,
        "category": "Medical Devices",
        "clauses": [
            {
                "number": "Cl. 8.7",
                "title": "Patient Leakage Current and Auxiliary Current",
                "tag": "Patient Auxiliary",
                "description": "For Type CF applied parts (direct cardiac contact), patient leakage current to ground under normal conditions shall not exceed 10 µA a.c."
            },
            {
                "number": "Cl. 8.5.5",
                "title": "Defibrillation-Proof Applied Parts Protection",
                "tag": "5000V Defibrillator",
                "description": "Applied parts must withstand 5000 V defibrillator discharge without transferring harmful energy to operator or damaging internal biosensors."
            }
        ],
        "labsCount": 14,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
    {
        "id": "IS-17428-2020",
        "code": "IS 17428:2020",
        "title": "Data Privacy Assurance — Engineering and Management Requirements",
        "description": "Pioneering Indian standard on digital privacy assurance, pseudonymization, cryptographic key management, and user consent lifecycle architecture.",
        "status": "Latest Revision",
        "statusType": "revised",
        "ics": "ICS 35.040",
        "enforcedDate": "01 Jan 2021",
        "ministry": "Ministry of Electronics & IT / Data Protection Board",
        "pages": 48,
        "pdfUrl": "https://archive.org/download/gov.in.is.17428.1.2020/gov.in.is.17428.1.2020.pdf",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 6.2",
                "title": "Consent Lifecycle Management & Granular Revocation",
                "tag": "Consent Token",
                "description": "Data processing systems shall maintain tamper-evident cryptographically signed consent artifacts with real-time revocation propagation under 5 minutes."
            }
        ],
        "labsCount": 12,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    }
]

ALL_STANDARDS: List[Dict[str, Any]] = TOP_50_STANDARDS + BATCH_1 + ADDITIONAL_STANDARDS_BATCH_2
