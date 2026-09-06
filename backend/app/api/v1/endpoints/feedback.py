import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.core.dependencies import get_optional_user, get_current_user

router = APIRouter()

# In-memory storage for feedback submissions and bookmarks
_FEEDBACK_DB: List[Dict[str, Any]] = []
_BOOKMARKS_DB: Dict[str, List[str]] = {}


class FeedbackCreateRequest(BaseModel):
    standard_id: str = Field(..., description="Target Indian Standard ID or IS code")
    subject: str = Field(..., min_length=3, max_length=150, description="Feedback subject heading")
    comment: str = Field(..., min_length=10, description="Detailed public consultation comments or technical feedback")
    category: str = Field("Technical Amendment", description="Category of feedback: Technical Amendment, Laboratory Test Issue, Clarification, General")
    user_email: Optional[str] = Field(None, description="Optional email if not authenticated")


class BookmarkToggleRequest(BaseModel):
    standard_id: str = Field(..., description="Standard ID to bookmark or unbookmark")


@router.post("", status_code=status.HTTP_201_CREATED)
def submit_feedback(
    feedback: FeedbackCreateRequest,
    current_user: Optional[Dict[str, Any]] = Depends(get_optional_user)
):
    """
    Submit technical comments, amendment proposals, or stakeholder feedback for an Indian Standard.
    """
    feedback_entry = {
        "id": f"fb-{uuid.uuid4().hex[:8]}",
        "standard_id": feedback.standard_id,
        "subject": feedback.subject,
        "comment": feedback.comment,
        "category": feedback.category,
        "user_name": current_user.get("name") if current_user else "Stakeholder",
        "user_email": (current_user.get("email") if current_user else feedback.user_email) or "anonymous@domain.in",
        "user_role": current_user.get("role") if current_user else "Industry Stakeholder",
        "submitted_at": datetime.now(timezone.utc).isoformat(),
        "status": "Under Technical Committee Review"
    }
    _FEEDBACK_DB.append(feedback_entry)
    return {
        "success": True,
        "message": "Feedback submitted successfully for Technical Committee review.",
        "data": feedback_entry
    }


@router.get("")
def list_feedback(standard_id: Optional[str] = None):
    """
    List submitted feedback entries, optionally filtered by standard ID.
    """
    results = _FEEDBACK_DB
    if standard_id:
        results = [f for f in _FEEDBACK_DB if f["standard_id"].lower() == standard_id.lower()]

    return {
        "success": True,
        "data": results,
        "total": len(results)
    }


@router.post("/bookmark")
def toggle_bookmark(
    request: BookmarkToggleRequest,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """
    Toggle bookmark status for a standard for the authenticated user.
    """
    user_id = current_user["id"]
    if user_id not in _BOOKMARKS_DB:
        _BOOKMARKS_DB[user_id] = []

    std_id = request.standard_id
    if std_id in _BOOKMARKS_DB[user_id]:
        _BOOKMARKS_DB[user_id].remove(std_id)
        bookmarked = False
    else:
        _BOOKMARKS_DB[user_id].append(std_id)
        bookmarked = True

    return {
        "success": True,
        "bookmarked": bookmarked,
        "total_bookmarks": len(_BOOKMARKS_DB[user_id]),
        "bookmarked_standards": _BOOKMARKS_DB[user_id]
    }


@router.get("/bookmarks")
def get_user_bookmarks(current_user: Dict[str, Any] = Depends(get_current_user)):
    """
    Get list of bookmarked standard IDs for the authenticated user.
    """
    user_id = current_user["id"]
    bookmarks = _BOOKMARKS_DB.get(user_id, [])
    return {
        "success": True,
        "data": bookmarks,
        "total": len(bookmarks)
    }
