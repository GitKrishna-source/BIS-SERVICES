from typing import List, Dict, Any
from datetime import timedelta
from fastapi import APIRouter, HTTPException, status, Depends

from app.core.config import settings
from app.core.security import verify_password, create_access_token
from app.core.dependencies import get_current_user
from app.repositories.user_repository import user_repository, INITIAL_USERS
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    UserProfile,
    TokenResponse
)

router = APIRouter()


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register_user(request: UserRegisterRequest):
    """
    Register a new user account with role details and return a JWT access token.
    """
    try:
        new_user = user_repository.create_user(
            email=request.email,
            name=request.name,
            password=request.password,
            role=request.role,
            persona_id=request.persona_id
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

    # Generate access token
    access_token = create_access_token(
        data={"sub": new_user["email"], "name": new_user["name"], "role": new_user["role"]}
    )

    profile = UserProfile(
        id=new_user["id"],
        name=new_user["name"],
        email=new_user["email"],
        role=new_user["role"],
        badge=new_user.get("badge", "OFFICIAL"),
        is_demo=new_user.get("is_demo", False)
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=profile
    )


@router.post("/login", response_model=TokenResponse)
def login_user(request: UserLoginRequest):
    """
    Authenticate user credentials (email and password) and issue a JWT access token.
    """
    user = user_repository.get_by_email(request.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    if not verify_password(request.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    access_token = create_access_token(
        data={"sub": user["email"], "name": user["name"], "role": user["role"]}
    )

    profile = UserProfile(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
        badge=user.get("badge", "OFFICIAL"),
        is_demo=user.get("is_demo", False)
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        user=profile
    )


@router.get("/me", response_model=UserProfile)
def get_current_user_profile(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Retrieve the profile details of the currently authenticated user.
    """
    return UserProfile(
        id=current_user["id"],
        name=current_user["name"],
        email=current_user["email"],
        role=current_user["role"],
        badge=current_user.get("badge", "OFFICIAL"),
        is_demo=current_user.get("is_demo", False)
    )


@router.get("/personas")
def get_demo_personas():
    """
    List preset demo personas for rapid testing and role switching.
    """
    personas = [
        {
            "id": "auditor",
            "name": "Dr. V. Sharma",
            "email": "v.sharma@bis.gov.in",
            "role": "Regulatory Affairs • Lead Auditor",
            "badge": "OFFICIAL",
            "avatar": "VS",
            "defaultPassword": "Password123!"
        },
        {
            "id": "manufacturer",
            "name": "Rajesh Mittal",
            "email": "rajesh@apextech.in",
            "role": "MD, Apex Techware India",
            "badge": "INDUSTRY",
            "avatar": "RM",
            "defaultPassword": "Password123!"
        },
        {
            "id": "lab",
            "name": "Central Coordinator",
            "email": "coord@cl-bis.org",
            "role": "NABL ISO/IEC 17025 Assayer",
            "badge": "NABL LAB",
            "avatar": "CC",
            "defaultPassword": "Password123!"
        }
    ]
    return {
        "success": True,
        "data": personas
    }
