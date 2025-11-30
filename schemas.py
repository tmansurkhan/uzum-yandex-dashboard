from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    uzum_token: str | None = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True