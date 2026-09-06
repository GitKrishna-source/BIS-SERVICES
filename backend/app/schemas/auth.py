from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserRegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full Name", examples=["Dr. V. Sharma"])
    email: EmailStr = Field(..., description="Official Email Address", examples=["v.sharma@bis.gov.in"])
    password: str = Field(..., min_length=6, description="Password", examples=["Password123!"])
    role: str = Field("Manufacturer / Compliance Officer", description="Role or designation", examples=["Regulatory Affairs • Lead Auditor"])
    persona_id: Optional[str] = Field(None, description="Optional persona preset identifier", examples=["auditor"])


class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Registered Email", examples=["v.sharma@bis.gov.in"])
    password: str = Field(..., description="Account Password", examples=["Password123!"])


class UserProfile(BaseModel):
    id: str = Field(..., description="User unique ID")
    name: str = Field(..., description="Full Name")
    email: str = Field(..., description="Email Address")
    role: str = Field(..., description="Role title")
    badge: Optional[str] = Field("OFFICIAL", description="Security badge")
    is_demo: bool = Field(False, description="Demo flag")


class TokenResponse(BaseModel):
    access_token: str = Field(..., description="JWT Bearer Token")
    token_type: str = Field("bearer", description="Token type")
    expires_in: int = Field(..., description="Token validity duration in seconds")
    user: UserProfile = Field(..., description="Authenticated user profile object")
