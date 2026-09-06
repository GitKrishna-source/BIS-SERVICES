from typing import List, Optional
from pydantic import BaseModel, Field


class LabSchema(BaseModel):
    id: str = Field(..., description="Unique laboratory ID, e.g. LAB-ND-01")
    name: str = Field(..., description="Official Testing Facility Name")
    city: str = Field(..., description="City and District")
    state: str = Field(..., description="Indian State or Union Territory")
    pincode: str = Field(..., description="6-digit postal PIN code")
    accreditation: str = Field(..., description="Accreditation status, e.g. NABL Accredited (ISO/IEC 17025)")
    standards: List[str] = Field(default_factory=list, description="List of recognized test scope standards")
    contact: str = Field(..., description="Official phone contact")
    email: str = Field(..., description="Official inquiry email")
    turnaroundDays: str = Field(..., description="Estimated test duration span")
    rating: float = Field(..., description="Quality / efficiency rating score out of 5.0")
    status: str = Field("Operational", description="Facility operational status")
    image: str = Field("/images/testing_laboratory.jpg", description="Laboratory facility photo path")


class LabListResponse(BaseModel):
    success: bool = True
    data: List[LabSchema] = Field(default_factory=list, description="Array of testing laboratories")
    total: int = Field(0, description="Total matching labs count")
