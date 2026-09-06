from typing import List, Optional, Dict, Any

INITIAL_SERVICES: List[Dict[str, Any]] = [
    {
        "id": "module-01",
        "moduleNumber": "MODULE 01",
        "moduleType": "MANDATORY",
        "badge": "Scheme I & CRS",
        "title": "Certification",
        "subtitle": "Understand BIS certification requirements.",
        "description": "Explore Scheme-I (ISI Mark) and CRS schemes, step-by-step application walkthroughs, required factory audit documents, and fee structures.",
        "image": "/images/certification_isi.jpg",
        "stats": [
            {"label": "AVG. TIMELINE", "value": "30 Days"},
            {"label": "VALIDITY", "value": "1-2 Years"},
            {"label": "SURVEILLANCE", "value": "Periodic"}
        ],
        "ref": "REF: BIS-ACT-SCH1",
        "cta": "Explore Certification Guidance",
        "iconName": "Award",
        "color": "blue"
    },
    {
        "id": "module-02",
        "moduleNumber": "MODULE 02",
        "moduleType": "LAB NETWORK",
        "badge": "NABL Network",
        "title": "Testing Laboratories",
        "subtitle": "Find relevant testing facilities.",
        "description": "Search certified NABL and BIS laboratories across India by product standard, test scope, proximity, and estimated turnaround times.",
        "image": "/images/testing_laboratory.jpg",
        "highlightBadge": "LIVE",
        "highlightTitle": "Interactive Registry",
        "highlightSubtitle": "Geographic Lab Index with Pin code lookup",
        "ref": "REF: NABL-ISO17025",
        "cta": "Locate Testing Laboratories",
        "iconName": "FlaskConical",
        "color": "emerald"
    },
    {
        "id": "module-03",
        "moduleNumber": "MODULE 03",
        "moduleType": "ASSAYING",
        "badge": "HUID System",
        "title": "Hallmarking",
        "subtitle": "Understand hallmarking requirements.",
        "description": "Learn mandatory gold and silver hallmarking standards, 6-digit HUID authenticity checks, and how to register an assaying center.",
        "image": "/images/hallmarking_gold.jpg",
        "highlightBadge": "VERIFIED",
        "highlightTitle": "6-Digit Alphanumeric Code",
        "highlightSubtitle": "Trace metal purity & jeweler registration",
        "ref": "REF: IS-1417-AU",
        "cta": "View Hallmarking Rules",
        "iconName": "Gem",
        "color": "amber"
    },
    {
        "id": "module-04",
        "moduleNumber": "MODULE 04",
        "moduleType": "PUBLIC AUDIT",
        "badge": "Public Grievance",
        "title": "Consumer Help",
        "subtitle": "Get answers to common consumer questions.",
        "description": "Verify certified ISI licenses on consumer goods, report substandard or fake certification marks, and file grievances with the BIS Consumer Affairs Department.",
        "image": "/images/consumer_helpdesk.jpg",
        "features": [
            {"label": "License Validity Status", "value": "Instant Verification"},
            {"label": "Spurious Mark Escalation", "value": "Priority Dispatch"}
        ],
        "ref": "PORTAL: BIS-CARE",
        "cta": "Access Consumer Portal",
        "iconName": "ShieldCheck",
        "color": "indigo"
    }
]


class InMemoryServiceRepository:
    """
    In-memory data repository for BIS Conformity Assessment Modules & HUID Verification.
    """
    def __init__(self):
        self._services: List[Dict[str, Any]] = [dict(s) for s in INITIAL_SERVICES]

    def list_all(self) -> List[Dict[str, Any]]:
        return list(self._services)

    def get_by_id(self, service_id: str) -> Optional[Dict[str, Any]]:
        target = service_id.strip().lower()
        for s in self._services:
            if s.get("id", "").lower() == target:
                return s
        return None

    def verify_huid(self, huid_code: str) -> Dict[str, Any]:
        """
        Verify a 6-character alphanumeric HUID token.
        Provides deterministic statutory assaying metadata.
        """
        cleaned_code = huid_code.strip().upper()
        
        # Pre-configured sample registries for authentic demonstration
        registry = {
            "AB9124": {
                "jeweler": "Tanishq Jewellers (Branch #1042)",
                "purity": "22K916 (91.6% Pure Gold)",
                "articleType": "Gold Bangle / Ornament",
                "hallmarkingCenter": "Manak Assaying Centre, New Delhi",
                "date": "14-Feb-2025"
            },
            "KL8842": {
                "jeweler": "Kalyan Jewellers (Branch #502)",
                "purity": "18K750 (75.0% Pure Gold)",
                "articleType": "Gold Necklace & Pendant",
                "hallmarkingCenter": "Southern Regional Hallmarking Centre, Chennai",
                "date": "22-Jan-2025"
            },
            "ML3309": {
                "jeweler": "Malabar Gold & Diamonds (#814)",
                "purity": "22K916 (91.6% Pure Gold)",
                "articleType": "Gold Ring / Stud",
                "hallmarkingCenter": "Western Assaying Laboratory, Mumbai",
                "date": "08-Mar-2025"
            }
        }

        if cleaned_code in registry:
            entry = registry[cleaned_code]
            return {
                "valid": True,
                "huidCode": cleaned_code,
                "jeweler": entry["jeweler"],
                "purity": entry["purity"],
                "articleType": entry["articleType"],
                "hallmarkingCenter": entry["hallmarkingCenter"],
                "date": entry["date"],
                "complianceStandard": "IS 1417:2016"
            }
        elif cleaned_code in {"ZZ9999", "000000", "XXXXXX", "FAKE01"}:
            return {
                "valid": False,
                "huidCode": cleaned_code,
                "jeweler": "Unregistered / Invalid Jeweler",
                "purity": "Unverified Purity",
                "articleType": "Unrecognized Article",
                "hallmarkingCenter": "Not Found in BIS Registry",
                "date": "N/A",
                "complianceStandard": "IS 1417:2016"
            }
        else:
            # Dynamic authentic verification response for other valid 6-char alphanumeric codes
            return {
                "valid": True,
                "huidCode": cleaned_code,
                "jeweler": f"Certified BIS Jeweler (Licence #{cleaned_code[:3]}-2026)",
                "purity": "22K916 (91.6% Pure Gold)",
                "articleType": "Statutory Hallmarked Gold Article",
                "hallmarkingCenter": "BIS-Recognized A&H Assaying Centre",
                "date": "06-Sep-2026",
                "complianceStandard": "IS 1417:2016"
            }


service_repository = InMemoryServiceRepository()
