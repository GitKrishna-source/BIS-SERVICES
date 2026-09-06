from typing import List, Optional, Dict, Any

INITIAL_LABS: List[Dict[str, Any]] = [
    {
        "id": "LAB-ND-01",
        "name": "Central Laboratory Bureau of Indian Standards",
        "city": "Sahibabad, Ghaziabad",
        "state": "Uttar Pradesh",
        "pincode": "201010",
        "accreditation": "NABL Accredited (ISO/IEC 17025)",
        "standards": ["IS 17803:2022", "IS 13252", "IS 6911:2017", "IS 14543:2024"],
        "contact": "+91 120 2867900",
        "email": "cl@bis.gov.in",
        "turnaroundDays": "7-12 Days",
        "rating": 4.9,
        "status": "Operational",
        "image": "/images/central_lab_campus.jpg"
    },
    {
        "id": "LAB-MH-02",
        "name": "Western Regional Laboratory (WROL) - BIS",
        "city": "Andheri (East), Mumbai",
        "state": "Maharashtra",
        "pincode": "400093",
        "accreditation": "NABL Accredited",
        "standards": ["IS 17803:2022", "IS 6911:2017", "IS 15885"],
        "contact": "+91 22 28329295",
        "email": "wrol@bis.gov.in",
        "turnaroundDays": "10-14 Days",
        "rating": 4.8,
        "status": "Operational",
        "image": "/images/testing_laboratory.jpg"
    },
    {
        "id": "LAB-KA-03",
        "name": "Southern Testing & Metallurgical Institute",
        "city": "Peenya, Bengaluru",
        "state": "Karnataka",
        "pincode": "560058",
        "accreditation": "NABL & BIS Recognized",
        "standards": ["IS 17803:2022", "IS 13252", "IS 303:2024"],
        "contact": "+91 80 28394411",
        "email": "support@stmlabs.in",
        "turnaroundDays": "8-10 Days",
        "rating": 4.7,
        "status": "Operational",
        "image": "/images/testing_laboratory.jpg"
    },
    {
        "id": "LAB-TN-04",
        "name": "Chennai Chemical & Packaging Testing Lab",
        "city": "Guindy, Chennai",
        "state": "Tamil Nadu",
        "pincode": "600032",
        "accreditation": "NABL Accredited",
        "standards": ["IS 14543:2024", "IS 17803:2022"],
        "contact": "+91 44 22500123",
        "email": "testing@cptl-south.org",
        "turnaroundDays": "5-9 Days",
        "rating": 4.9,
        "status": "Operational",
        "image": "/images/central_lab_campus.jpg"
    }
]


class InMemoryLabRepository:
    """
    In-memory data repository for NABL / BIS Testing Laboratories.
    """
    def __init__(self):
        self._labs: List[Dict[str, Any]] = [dict(l) for l in INITIAL_LABS]

    def list_all(self) -> List[Dict[str, Any]]:
        return list(self._labs)

    def filter_labs(
        self,
        standard: str = "",
        pincode: str = "",
        state: str = "",
        query: str = ""
    ) -> List[Dict[str, Any]]:
        results = list(self._labs)

        # Filter by Standard Scope
        if standard and standard.strip() and standard.lower() != "all":
            std_target = standard.strip().lower()
            results = [
                lab for lab in results
                if any(std_target in s.lower() for s in lab.get("standards", []))
            ]

        # Filter by PIN Code prefix (e.g. 20, 40, 56)
        if pincode and pincode.strip():
            pin_prefix = pincode.strip()[:2]
            results = [
                lab for lab in results
                if lab.get("pincode", "").startswith(pin_prefix)
            ]

        # Filter by State
        if state and state.strip() and state.lower() != "all":
            state_target = state.strip().lower()
            results = [
                lab for lab in results
                if state_target in lab.get("state", "").lower()
            ]

        # General Text Query
        if query and query.strip():
            q = query.strip().lower()
            results = [
                lab for lab in results
                if (
                    q in lab.get("name", "").lower() or
                    q in lab.get("city", "").lower() or
                    q in lab.get("state", "").lower() or
                    q in lab.get("pincode", "").lower()
                )
            ]

        return results

    def get_by_id(self, lab_id: str) -> Optional[Dict[str, Any]]:
        target = lab_id.strip().lower()
        for lab in self._labs:
            if lab.get("id", "").lower() == target:
                return lab
        return None


lab_repository = InMemoryLabRepository()
