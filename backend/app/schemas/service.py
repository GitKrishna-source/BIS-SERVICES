from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class StatItem(BaseModel):
    label: str
    value: str


class FeatureItem(BaseModel):
    label: str
    value: str


class ServiceModuleSchema(BaseModel):
    id: str = Field(..., description="Service unique module identifier, e.g. module-01")
    moduleNumber: str = Field(..., description="Module numeral, e.g. MODULE 01")
    moduleType: str = Field(..., description="Module type classification, e.g. MANDATORY")
    badge: str = Field(..., description="Short badge text, e.g. Scheme I & CRS")
    title: str = Field(..., description="Service Module Title")
    subtitle: str = Field(..., description="Short subtitle description")
    description: str = Field(..., description="Detailed description")
    image: str = Field(..., description="Service card photo path")
    ref: str = Field(..., description="Statutory reference code")
    cta: str = Field(..., description="Call to action button text")
    iconName: str = Field(..., description="Lucide icon name identifier")
    color: str = Field("blue", description="Theme accent color key")
    stats: Optional[List[StatItem]] = Field(None, description="Key statistics array")
    features: Optional[List[FeatureItem]] = Field(None, description="Feature items array")
    highlightBadge: Optional[str] = None
    highlightTitle: Optional[str] = None
    highlightSubtitle: Optional[str] = None


class HuidVerifyRequest(BaseModel):
    code: str = Field(..., min_length=6, max_length=6, description="6-character alphanumeric HUID token", examples=["AB9124"])


class HuidVerificationData(BaseModel):
    valid: bool
    huidCode: str
    jeweler: str
    purity: str
    articleType: str
    hallmarkingCenter: str
    date: str
    complianceStandard: str = "IS 1417:2016"


class HuidVerifyResponse(BaseModel):
    success: bool = True
    data: HuidVerificationData
