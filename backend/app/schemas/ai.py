from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class AIChatRequest(BaseModel):
    query: str = Field(..., min_length=2, description="Natural language user question or query", examples=["What standard applies to stainless steel vacuum flasks?"])
    category: Optional[str] = Field(None, description="Optional domain vertical filter")
    location: Optional[str] = Field(None, description="Optional region or state")


class UserContext(BaseModel):
    name: str = Field("Guest User", description="User display name")
    role: str = Field("General Inquiry", description="User role title")
    query: str = Field(..., description="Original user prompt")
    category: Optional[str] = Field("Consumer Goods & Engineering", description="Detected category")
    jurisdiction: str = Field("Republic of India", description="Legal jurisdiction")
    tariff: Optional[str] = Field("ITC-HS 9617.00.12", description="HS trade tariff code")


class StandardReference(BaseModel):
    code: str = Field(..., description="IS Standard Code")
    title: str = Field(..., description="IS Standard Title")
    status: str = Field("ACTIVE REVISION", description="Standard Status")


class ClauseItem(BaseModel):
    number: str
    title: str
    badge: str
    content: str


class SourceItem(BaseModel):
    type: str
    code: str
    details: str
    tag: str


class TelemetryPoint(BaseModel):
    hour: str
    temp: str


class TelemetryData(BaseModel):
    risk: str
    riskSub: str
    testingSpan: str
    testingSpanSub: str
    curveTitle: str
    points: List[TelemetryPoint]


class AIAnswer(BaseModel):
    model: str = Field("BIS-Reasoner-v2.5 (Ensemble)", description="AI Engine Model")
    title: str = Field(..., description="Direct synthesized title answer")
    summary: str = Field(..., description="Executive statutory summary")
    applicableStandard: StandardReference = Field(..., description="Target Indian Standard")
    clauses: List[ClauseItem] = Field(default_factory=list, description="Grounding clauses")
    nextStep: str = Field(..., description="Recommended statutory next action")
    sources: List[SourceItem] = Field(default_factory=list, description="Authoritative regulatory citations")
    telemetry: TelemetryData = Field(..., description="Compliance metrics and telemetry")


class AISessionResponseData(BaseModel):
    sessionId: str
    gazetteSync: str
    latency: str
    confidence: str
    user: UserContext
    answer: AIAnswer


class AISessionResponse(BaseModel):
    success: bool = True
    data: AISessionResponseData
