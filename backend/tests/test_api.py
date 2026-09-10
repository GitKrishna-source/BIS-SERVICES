"""
Backend Integration Test Suite for BISync FastAPI
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_and_health():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["status"] == "online"

    health_resp = client.get("/health")
    assert health_resp.status_code == 200
    assert health_resp.json()["status"] == "healthy"


def test_auth_login_and_me():
    # Login with default seeded auditor credentials
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "v.sharma@bis.gov.in",
        "password": "Password123!"
    })
    assert login_resp.status_code == 200
    login_data = login_resp.json()
    assert "access_token" in login_data
    token = login_data["access_token"]
    assert login_data["user"]["email"] == "v.sharma@bis.gov.in"

    # Access protected /me endpoint with token
    me_resp = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert me_resp.status_code == 200
    me_data = me_resp.json()
    assert me_data["name"] == "Dr. V. Sharma"


def test_auth_registration():
    reg_resp = client.post("/api/v1/auth/register", json={
        "name": "Priya Patel",
        "email": "priya.patel@testinglabs.in",
        "password": "SecurePassword999!",
        "role": "Quality Assurance Specialist"
    })
    assert reg_resp.status_code == 201
    reg_data = reg_resp.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["name"] == "Priya Patel"


def test_standards_search_and_detail():
    # Search for vacuum flask standard
    search_resp = client.get("/api/v1/standards/search?q=flask")
    assert search_resp.status_code == 200
    search_data = search_resp.json()
    assert search_data["success"] is True
    assert search_data["total"] >= 1
    assert any("17803" in item["code"] for item in search_data["data"])

    # Fetch standard by ID
    std_id = search_data["data"][0]["id"]
    detail_resp = client.get(f"/api/v1/standards/{std_id}")
    assert detail_resp.status_code == 200
    assert detail_resp.json()["data"]["id"] == std_id

    # Test categories
    cat_resp = client.get("/api/v1/standards/categories")
    assert cat_resp.status_code == 200
    assert len(cat_resp.json()["data"]) > 0


def test_labs_endpoint():
    # List labs
    labs_resp = client.get("/api/v1/labs")
    assert labs_resp.status_code == 200
    labs_data = labs_resp.json()
    assert labs_data["success"] is True
    assert len(labs_data["data"]) > 0

    # Filter labs by standard
    filtered_resp = client.get("/api/v1/labs?standard=IS 17803")
    assert filtered_resp.status_code == 200
    assert len(filtered_resp.json()["data"]) >= 1

    # Lab stats
    stats_resp = client.get("/api/v1/labs/stats/summary")
    assert stats_resp.status_code == 200
    assert stats_resp.json()["data"]["totalLabs"] > 0


def test_services_and_huid():
    # List services
    services_resp = client.get("/api/v1/services")
    assert services_resp.status_code == 200
    assert len(services_resp.json()["data"]) > 0

    # Verify valid HUID
    huid_resp = client.post("/api/v1/services/verify-huid", json={"code": "AB9124"})
    assert huid_resp.status_code == 200
    assert huid_resp.json()["data"]["valid"] is True

    # Verify invalid HUID
    invalid_huid = client.post("/api/v1/services/verify-huid", json={"code": "ZZ9999"})
    assert invalid_huid.status_code == 200
    assert invalid_huid.json()["data"]["valid"] is False


def test_rag_assistant():
    rag_resp = client.post("/api/v1/rag/query", json={
        "query": "What are the mandatory clauses and testing requirements for stainless steel vacuum flasks?"
    })
    assert rag_resp.status_code == 200
    rag_data = rag_resp.json()
    assert rag_data["success"] is True
    assert "sessionId" in rag_data["data"]
    assert len(rag_data["data"]["answer"]["clauses"]) > 0
    assert rag_data["data"]["answer"]["applicableStandard"]["code"] != ""


def test_feedback_and_bookmarks():
    # Submit feedback
    fb_resp = client.post("/api/v1/feedback", json={
        "standard_id": "IS-17803-2022",
        "subject": "Proposal for Thermal Insulation test revision",
        "comment": "Recommend adding a 12-hour thermal retention curve specification.",
        "category": "Technical Amendment"
    })
    assert fb_resp.status_code == 201
    assert fb_resp.json()["success"] is True

    # List feedback
    list_fb = client.get("/api/v1/feedback?standard_id=IS-17803-2022")
    assert list_fb.status_code == 200
    assert len(list_fb.json()["data"]) >= 1


def test_auth_errors():
    # Invalid login credentials
    bad_login = client.post("/api/v1/auth/login", json={
        "email": "wrong@bis.gov.in",
        "password": "WrongPassword!"
    })
    assert bad_login.status_code == 401

    # Unauthorized access to protected route
    unauthorized_me = client.get("/api/v1/auth/me")
    assert unauthorized_me.status_code == 401

    # Demo personas
    personas_resp = client.get("/api/v1/auth/personas")
    assert personas_resp.status_code == 200
    assert len(personas_resp.json()["data"]) == 3


def test_standards_clauses_and_telemetry():
    # Get clauses for IS 17803
    clauses_resp = client.get("/api/v1/standards/IS-17803-2022/clauses")
    assert clauses_resp.status_code == 200
    assert len(clauses_resp.json()["data"]) > 0

    # Get telemetry for IS 17803
    telemetry_resp = client.get("/api/v1/standards/IS-17803-2022/telemetry")
    assert telemetry_resp.status_code == 200
    assert "testCurve" in telemetry_resp.json()["data"]

    # Non-existent standard 404
    not_found_resp = client.get("/api/v1/standards/NON-EXISTENT-ID")
    assert not_found_resp.status_code == 404


def test_rag_prompts_and_chat_alias():
    # Prompts list
    prompts_resp = client.get("/api/v1/rag/prompts")
    assert prompts_resp.status_code == 200
    assert len(prompts_resp.json()["data"]) >= 3

    # Chat alias endpoint
    chat_resp = client.post("/api/v1/rag/chat", json={
        "query": "What are EV battery safety standards?"
    })
    assert chat_resp.status_code == 200
    assert chat_resp.json()["success"] is True


def test_ai_health_endpoints():
    # Root AI Health
    resp1 = client.get("/api/ai/health")
    assert resp1.status_code == 200
    data1 = resp1.json()
    assert data1["success"] is True
    assert "apiConfigured" in data1["data"]
    assert "model" in data1["data"]

    # RAG v1 Health
    resp2 = client.get("/api/v1/rag/health")
    assert resp2.status_code == 200
    data2 = resp2.json()
    assert data2["success"] is True
    assert "apiConfigured" in data2["data"]


def test_basic_bis_questions():
    questions = [
        "What is BIS?",
        "What does BIS stand for?",
        "What is the role of BIS?",
        "What is BIS certification?"
    ]
    for q in questions:
        resp = client.post("/api/v1/rag/query", json={"query": q})
        assert resp.status_code == 200, f"Query failed for '{q}'"
        data = resp.json()
        assert data["success"] is True
        answer = data["data"]["answer"]
        assert len(answer["title"]) > 0
        assert len(answer["summary"]) > 0
        assert "BIS" in answer["title"] or "Bureau of Indian Standards" in answer["title"] or "Standards" in answer["title"]
        assert "Bureau of Indian Standards" in answer["summary"] or "BIS" in answer["summary"]
        assert len(answer["clauses"]) >= 1
        assert len(answer["sources"]) >= 1


def test_conversational_and_bis_fluency():
    test_cases = [
        ("How are you?", "doing", "assistant"),
        ("What can you do?", "BISync", "standards"),
        ("What is your work?", "assistant", "Indian Standards"),
        ("What is BIS?", "Bureau of Indian Standards", "National Standards Body"),
        ("What is BSI?", "British Standards Institution", "United Kingdom"),
        ("What is the ISI mark?", "ISI Mark", "Scheme-I"),
        ("Tell me about Indian Standards.", "Indian Standards", "22,000"),
        ("xyz", "clarify", "question")  # Unclear query asking for clarification
    ]

    for q, expected_word1, expected_word2 in test_cases:
        resp = client.post("/api/v1/rag/query", json={"query": q})
        assert resp.status_code == 200, f"Failed for query '{q}'"
        data = resp.json()
        assert data["success"] is True
        ans = data["data"]["answer"]
        combined_text = f"{ans['title']} {ans['summary']} {' '.join(c['content'] for c in ans['clauses'])}".lower()
        assert expected_word1.lower() in combined_text or expected_word2.lower() in combined_text, (
            f"Query '{q}' did not contain '{expected_word1}' or '{expected_word2}' in response: {ans['summary']}"
        )
        assert len(ans["clauses"]) >= 1
        assert len(ans["sources"]) >= 1


