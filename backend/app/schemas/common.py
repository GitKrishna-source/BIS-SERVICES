from typing import Generic, TypeVar, Optional, Any, List
from pydantic import BaseModel, Field

DataT = TypeVar('DataT')


class PaginationMeta(BaseModel):
    page: int = Field(1, description="Current page number")
    limit: int = Field(10, description="Items per page")
    total: int = Field(0, description="Total matching records count")
    total_pages: int = Field(1, description="Total pages available")


class ResponseModel(BaseModel, Generic[DataT]):
    success: bool = Field(True, description="Indicates if request was successful")
    message: Optional[str] = Field(None, description="Optional informational message")
    data: Optional[DataT] = Field(None, description="Response payload data")


class ErrorDetail(BaseModel):
    code: int = Field(..., description="HTTP error status code")
    message: str = Field(..., description="Error message description")
    details: Optional[Any] = Field(None, description="Detailed field-level validation errors")


class ErrorResponseModel(BaseModel):
    success: bool = Field(False, description="Always False for error responses")
    error: ErrorDetail = Field(..., description="Error metadata object")
