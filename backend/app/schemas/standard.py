from typing import List, Optional
from pydantic import BaseModel, Field
from app.schemas.common import PaginationMeta


class ClauseSchema(BaseModel):
    number: str = Field(..., description="Clause number, e.g. Cl. 4.1")
    title: str = Field(..., description="Clause title")
    tag: str = Field(..., description="Clause classification badge, e.g. Mandatory Traceability")
    description: str = Field(..., description="Detailed clause requirements text")


class StandardSchema(BaseModel):
    id: str = Field(..., description="Standard unique identifier, e.g. IS-17803-2022")
    code: str = Field(..., description="Official standard code, e.g. IS 17803:2022")
    title: str = Field(..., description="Full standard product title")
    description: str = Field(..., description="Overview and scope of the standard")
    status: str = Field(..., description="Display status label, e.g. Mandatory QCO, CRS Scheme")
    statusType: str = Field(..., description="Internal status slug: mandatory, crs, revised, isi")
    ics: str = Field(..., description="International Classification for Standards (ICS) code")
    enforcedDate: str = Field(..., description="Statutory enforcement gazette date")
    ministry: str = Field(..., description="Enforcing Ministry / Statutory Order Authority")
    pages: int = Field(..., description="Document page count")
    pdfUrl: str = Field("#", description="Direct link or resource path to statutory gazette PDF")
    verified: bool = Field(True, description="Statutory verification badge")
    category: str = Field(..., description="Sector / product vertical category")
    clauses: List[ClauseSchema] = Field(default_factory=list, description="List of key technical clauses")
    labsCount: int = Field(0, description="Number of accredited testing laboratories")
    certificationScheme: str = Field("Scheme-I (ISI Mark)", description="Conformity assessment scheme name")


class StandardSearchResponse(BaseModel):
    success: bool = True
    data: List[StandardSchema] = Field(default_factory=list, description="Matching standards array")
    total: int = Field(0, description="Total matching records count")
    page: int = Field(1, description="Current page")
    totalPages: int = Field(1, description="Total pages")
