from typing import List, Optional, Tuple, Dict, Any

INITIAL_STANDARDS: List[Dict[str, Any]] = [
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
            }
        ],
        "labsCount": 46,
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
        "id": "IS-303-2024",
        "code": "IS 303:2024",
        "title": "Plywood for General Purposes (MR and BWR Grades)",
        "description": "Prescribes standards for moisture resistance, boiling water resistance, and adhesive bonding strength for interior and exterior architectural plywood.",
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
                "description": "Test pieces submerged in boiling water for 72 hours must show zero delamination and shear strength ≥ 1000 N."
            }
        ],
        "labsCount": 26,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
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
                "description": "Equipment enclosures shall prevent standard test finger from contacting voltages exceeding 42.4 V peak or 60 V DC under normal and single-fault conditions."
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
            }
        ],
        "labsCount": 31,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
    },
    {
        "id": "IS-14286-2010",
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
        "category": "Renewable Energy",
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
                "description": "For Grade E250 Quality A: Carbon max 0.23%, Manganese max 1.50%. Maximum Carbon Equivalent CE shall not exceed 0.42%."
            },
            {
                "number": "Cl. 8.1",
                "title": "Tensile and Yield Strength Matrix",
                "tag": "Yield Floor",
                "description": "For thickness < 20mm, Grade E250 must deliver minimum yield strength of 250 MPa, ultimate tensile strength of 410 MPa, and elongation ≥ 23%."
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
                "description": "Austenitic Stainless Steel Grade 304 or 316; Min 17.5% Chromium, Min 8.0% Nickel. Must strictly comply with IS 6911:2017 raw material traceability."
            },
            {
                "number": "Cl. 5.2",
                "title": "Thermal Retention Performance Matrix",
                "tag": "Kinetic Thermal Test",
                "description": "Boiling water containment at 98°C must maintain ≥ 60.0°C after 6.0 hours at standardized ambient chamber temperature (27±2°C)."
            },
            {
                "number": "Cl. 6.1",
                "title": "Seal & Hydrostatic Leakage Verification",
                "tag": "Pressure Invariant",
                "description": "Pneumatic 1.50 bar pressure for 300 seconds with zero droplet penetration. Food-grade silicone compliance under IS 9845."
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
                "description": "Helmet fitted on headform dropped on flat and hemispherical steel anvils at 7.5 m/s. Peak acceleration transmitted shall never exceed 300g."
            },
            {
                "number": "Cl. 8.2",
                "title": "Retention System Dynamic Extension & Rigidity",
                "tag": "Chin Strap Rigidity",
                "description": "Subjected to 1000 N dynamic tensile force. Dynamic extension shall not exceed 35 mm."
            }
        ],
        "labsCount": 22,
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
                "description": "For toys intended for children under 3 years, no part shall fit entirely inside truncated test cylinder (31.7 mm diameter x 57.1 mm depth)."
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
        "id": "IS-1417-2016",
        "code": "IS 1417:2016",
        "title": "Gold and Gold Alloys, Platina & Silver Jewellery / Artefacts — Hallmarking & Purity",
        "description": "National mandatory standard for gold and silver purity grades (24K999, 22K916, 18K750, 14K585) with 6-digit alphanumeric Hallmark Unique Identification (HUID).",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 39.060",
        "enforcedDate": "16 Jun 2021",
        "ministry": "Ministry of Consumer Affairs, Food & Public Distribution",
        "pages": 28,
        "pdfUrl": "#",
        "verified": True,
        "category": "Precious Metals",
        "clauses": [
            {
                "number": "Cl. 4.1",
                "title": "Standard Gold Purity Grades (22K916 & 18K750)",
                "tag": "Assay Purity",
                "description": "Gold articles shall conform strictly to declared karatage: 22K (916 parts per thousand), 18K (750 parts per thousand), 14K (585 parts per thousand)."
            },
            {
                "number": "Cl. 6.2",
                "title": "6-Digit Alphanumeric HUID Laser Marking",
                "tag": "Traceability Token",
                "description": "Every hallmarked piece must be laser engraved with BIS standard logo, purity fineness mark, and unique 6-digit HUID code traceable on BIS Care portal."
            }
        ],
        "labsCount": 140,
        "certificationScheme": "Hallmarking Scheme (Scheme-IV)"
    },
    {
        "id": "IS-14543-2024",
        "code": "IS 14543:2024",
        "title": "Packaged Drinking Water (Other than Packaged Natural Mineral Water)",
        "description": "Defines rigorous biological, microbiological, pesticide residue limits and mineralization parameters for packaged potable water.",
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
                "title": "Essential Chemical Quality Parameters",
                "tag": "TDS & pH Range",
                "description": "pH acceptable limit 6.5 to 8.5. Total Dissolved Solids (TDS) acceptable limit 500 mg/L."
            },
            {
                "number": "Cl. 4.2",
                "title": "Toxic Substances & Heavy Metal Ceilings",
                "tag": "Heavy Metal Cap",
                "description": "Permissible caps: Arsenic max 0.01 mg/L, Lead max 0.01 mg/L, Fluoride max 1.0 mg/L."
            }
        ],
        "labsCount": 78,
        "certificationScheme": "Scheme-I (ISI Mark)"
    },
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
                "description": "Annealed high-conductivity electrolytic grade copper (minimum 99.97% purity). Max resistance for 2.5 mm² wire ≤ 7.41 Ω/km."
            },
            {
                "number": "Cl. 10.3",
                "title": "Oxygen Index and Flame Retardance (FR / FRLS)",
                "tag": "Fire Survival",
                "description": "FR grade PVC insulation must maintain minimum Oxygen Index of 29% per IS 10810 to ensure self-extinguishing flame retardancy."
            }
        ],
        "labsCount": 62,
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
                "title": "Hydrostatic Bursting Pressure Test",
                "tag": "Hydro Burst",
                "description": "Vessel must withstand internal hydraulic pressure equal to at least 3 times nominal operating pressure without catastrophic structural rupture."
            }
        ],
        "labsCount": 24,
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
            }
        ],
        "labsCount": 21,
        "certificationScheme": "Scheme-I (ISI Mark)"
    }
]


class InMemoryStandardRepository:
    """
    In-memory data repository for Indian Standards.
    Provides standard database interface: find, find_by_id, list_categories.
    """
    def __init__(self):
        self._standards: List[Dict[str, Any]] = [dict(s) for s in INITIAL_STANDARDS]

    def list_all(self) -> List[Dict[str, Any]]:
        return list(self._standards)

    def search(
        self,
        query: str = "",
        category: str = "all",
        qco_only: bool = False,
        page: int = 1,
        limit: int = 10,
        sort_by: str = "relevance"
    ) -> Tuple[List[Dict[str, Any]], int]:
        results = list(self._standards)

        # 1. Text Query Filter
        if query and query.strip():
            q = query.strip().lower()
            results = [
                s for s in results
                if (
                    q in s.get("code", "").lower() or
                    q in s.get("title", "").lower() or
                    q in s.get("description", "").lower() or
                    q in s.get("category", "").lower() or
                    q in s.get("ics", "").lower()
                )
            ]

        # 2. Category Filter
        if category and category.lower() != "all":
            cat_lower = category.lower()
            results = [
                s for s in results
                if cat_lower in s.get("category", "").lower()
            ]

        # 3. Mandatory QCO Filter
        if qco_only:
            results = [s for s in results if s.get("statusType") == "mandatory"]

        # 4. Sorting
        if sort_by == "latestRevision":
            results.sort(key=lambda s: s.get("enforcedDate", ""), reverse=True)
        elif sort_by == "mandatoryFirst":
            results.sort(key=lambda s: 1 if s.get("statusType") == "mandatory" else 0, reverse=True)

        total = len(results)

        # 5. Pagination
        start_idx = (page - 1) * limit
        end_idx = start_idx + limit
        paginated_data = results[start_idx:end_idx]

        return paginated_data, total

    def get_by_id(self, standard_id_or_code: str) -> Optional[Dict[str, Any]]:
        target = standard_id_or_code.strip().lower()
        for s in self._standards:
            if s.get("id", "").lower() == target or s.get("code", "").lower() == target:
                return s
        return None

    def get_categories(self) -> List[Dict[str, Any]]:
        return [
            {"id": "all", "label": "All Standards"},
            {"id": "qco", "label": "Mandatory QCO", "isQcoFlag": True},
            {"id": "electronics", "label": "Electronics & IT"},
            {"id": "consumer", "label": "Consumer Products"},
            {"id": "food", "label": "Food & Agri"},
            {"id": "building", "label": "Building Materials"},
            {"id": "metallurgy", "label": "Metallurgy & Steel"},
            {"id": "precious_metals", "label": "Gold & Silver Hallmarking"},
            {"id": "automotive", "label": "Automotive & Safety"}
        ]


standard_repository = InMemoryStandardRepository()
