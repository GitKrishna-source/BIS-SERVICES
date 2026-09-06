from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from app.core.config import settings
from app.core.security import verify_password, create_access_token
from app.repositories.user_repository import user_repository
from app.schemas.auth import UserRegisterRequest, UserLoginRequest, UserProfile, TokenResponse


class AuthService:
    def __init__(self, repo=user_repository):
        self.repo = repo

    def register(self, request: UserRegisterRequest) -> TokenResponse:
        try:
            new_user = self.repo.create_user(
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

    def login(self, request: UserLoginRequest) -> TokenResponse:
        user = self.repo.get_by_email(request.email)
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


auth_service = AuthService()
