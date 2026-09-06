from typing import List, Optional, Tuple, Dict, Any

INITIAL_STANDARDS: List[Dict[str, Any]] = [
    {
        "id": "IS-17803-2022",
        "code": "IS 17803:2022",
        "title": "Stainless Steel Vacuum Flasks, Insulated Beverage Containers & Tableware",
        "description": "Specifies requirements for materials, chemical composition, thermal retention, and seal integrity for double-walled vacuum vessels.",
        "status": "Mandatory QCO",
        "statusType": "mandatory",
        "ics": "ICS 97.040.60",
        "enforcedDate": "15 Oct 2023",
        "ministry": "Ministry of Commerce & Industry (DPIIT) QCO II",
        "pages": 34,
        "pdfUrl": "#",
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
        "id": "IS-13252-1-2010",
        "code": "IS 13252 (Part 1):2010",
        "title": "Information Technology Equipment — General Safety Requirements",
        "description": "Applies to mains-powered or battery-powered IT equipment including laptops, servers, power adapters, and telecommunication hardware.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 35.020",
        "enforcedDate": "03 Jul 2013",
        "ministry": "MeitY Scheme Compulsory Registration",
        "pages": 142,
        "pdfUrl": "#",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 1.5",
                "title": "Components & Insulation Class",
                "tag": "Safety Critical",
                "description": "Components that are relied on for safety shall comply with requirements specified in relevant Indian or IEC harmonized standards."
            },
            {
                "number": "Cl. 2.1",
                "title": "Protection from Electric Shock & Energy Hazards",
                "tag": "High Voltage Test",
                "description": "Operator access areas shall be protected from bare live parts carrying hazardous voltages above 42.4V peak or 60V d.c."
            },
            {
                "number": "Cl. 4.5",
                "title": "Thermal & Fire Resistance Testing",
                "tag": "Flammability V-0",
                "description": "Enclosures shall withstand glow-wire test and flame rating tests under IS 11000 / UL94 V-0 for unattended equipment."
            }
        ],
        "labsCount": 42,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
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
        "pdfUrl": "#",
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
        "id": "IS-6911-2017",
        "code": "IS 6911:2017",
        "title": "Stainless Steel Plate, Sheet and Strip — Technical Specification",
        "description": "Specifies tolerances, chemical composition limits, and tensile strength standards for austenitic and ferritic stainless steel grades.",
        "status": "ISI Mark Valid",
        "statusType": "isi",
        "ics": "ICS 77.140.20",
        "enforcedDate": "12 Dec 2018",
        "ministry": "Ministry of Steel Mandatory Quality Order",
        "pages": 56,
        "pdfUrl": "#",
        "verified": True,
        "category": "Metallurgy",
        "clauses": [
            {
                "number": "Cl. 5.1",
                "title": "Ladle Analysis & Spectrographic Composition",
                "tag": "Melt Chemistry",
                "description": "Strict control of Carbon (≤ 0.08%), Manganese (≤ 2.0%), Silicon (≤ 0.75%), Sulfur (≤ 0.030%), and Phosphorus (≤ 0.045%)."
            },
            {
                "number": "Cl. 9.3",
                "title": "Intergranular Corrosion (IGC) Practice A & E",
                "tag": "Acid Immersion",
                "description": "Standard practice for detecting susceptibility to intergranular attack in austenitic stainless steels."
            }
        ],
        "labsCount": 35,
        "certificationScheme": "Scheme-I (ISI Mark)"
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
        "pdfUrl": "#",
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
        "id": "IS-15885-2-13",
        "code": "IS 15885 (Part 2/Sec 13)",
        "title": "Lamp Controlgear — Particular Requirements for DC or AC Supplied Electronic Controlgear for LED Modules",
        "description": "Safety requirements for electronic drivers powering LED luminaires, streetlights, and commercial illumination.",
        "status": "CRS Scheme",
        "statusType": "crs",
        "ics": "ICS 29.140.99",
        "enforcedDate": "01 Sep 2015",
        "ministry": "MeitY Electronic Goods CRO",
        "pages": 38,
        "pdfUrl": "#",
        "verified": True,
        "category": "Electronics (CRS)",
        "clauses": [
            {
                "number": "Cl. 14.1",
                "title": "Fault Condition Protection & Surge Immunity",
                "tag": "4kV Surge",
                "description": "Must survive 4.0 kV line-to-earth surge tests and over-voltage conditions without catching fire or producing toxic fumes."
            }
        ],
        "labsCount": 31,
        "certificationScheme": "Compulsory Registration Scheme (CRS)"
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
            {"id": "metallurgy", "label": "Metallurgy & Steel"}
        ]


standard_repository = InMemoryStandardRepository()
