from typing import List, Optional, Dict, Any
import uuid
from app.core.security import hash_password

INITIAL_USERS: List[Dict[str, Any]] = [
    {
        "id": "usr-auditor-01",
        "email": "v.sharma@bis.gov.in",
        "name": "Dr. V. Sharma",
        "role": "Regulatory Affairs • Lead Auditor",
        "badge": "OFFICIAL",
        "persona_id": "auditor",
        "password_hash": hash_password("Password123!"),
        "is_demo": False
    },
    {
        "id": "usr-mfg-02",
        "email": "rajesh@apextech.in",
        "name": "Rajesh Mittal",
        "role": "MD, Apex Techware India",
        "badge": "INDUSTRY",
        "persona_id": "manufacturer",
        "password_hash": hash_password("Password123!"),
        "is_demo": False
    },
    {
        "id": "usr-lab-03",
        "email": "coord@cl-bis.org",
        "name": "Central Coordinator",
        "role": "NABL ISO/IEC 17025 Assayer",
        "badge": "NABL LAB",
        "persona_id": "lab",
        "password_hash": hash_password("Password123!"),
        "is_demo": False
    }
]


class InMemoryUserRepository:
    """
    In-memory user database repository for development authentication.
    Note: Temporary development storage - can be migrated to PostgreSQL / SQLAlchemy user model.
    """
    def __init__(self):
        self._users: Dict[str, Dict[str, Any]] = {}
        for user in INITIAL_USERS:
            self._users[user["email"].lower()] = dict(user)

    def get_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        return self._users.get(email.strip().lower())

    def get_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        for user in self._users.values():
            if user.get("id") == user_id:
                return user
        return None

    def create_user(
        self,
        email: str,
        name: str,
        password: str,
        role: str = "Manufacturer / Compliance Officer",
        persona_id: Optional[str] = None,
        badge: str = "OFFICIAL"
    ) -> Dict[str, Any]:
        normalized_email = email.strip().lower()
        if normalized_email in self._users:
            raise ValueError("A user with this email address already exists.")

        new_user = {
            "id": f"usr-{uuid.uuid4().hex[:8]}",
            "email": normalized_email,
            "name": name.strip(),
            "role": role,
            "badge": badge,
            "persona_id": persona_id or "custom",
            "password_hash": hash_password(password),
            "is_demo": False
        }
        self._users[normalized_email] = new_user
        return new_user


user_repository = InMemoryUserRepository()
