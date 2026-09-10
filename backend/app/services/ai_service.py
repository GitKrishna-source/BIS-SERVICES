import json
import re
import time
import uuid
from typing import Any, Dict, List, Optional

import httpx

from app.core.config import settings
from app.repositories.standard_repository import standard_repository
from app.schemas.ai import (
    AIAnswer,
    AIChatRequest,
    AISessionResponse,
    AISessionResponseData,
    ClauseItem,
    SourceItem,
    StandardReference,
    TelemetryData,
    TelemetryPoint,
    UserContext,
)
from app.services.rag_service import rag_service


class AIService:
    """Grounded regulatory answer generation over indexed BIS/Gazette chunks."""

    def __init__(self) -> None:
        self._seed_repository_chunks()

    def _seed_repository_chunks(self) -> None:
        """Keep the existing demo usable until official documents are ingested."""
        if rag_service.chunk_count:
            return
        for standard in standard_repository.list_all():
            clauses = "\n".join(
                f"Clause {clause.get('number')}: {clause.get('title')}. {clause.get('description')}"
                for clause in standard.get("clauses", [])
            )
            text = (
                f"{standard.get('code')} - {standard.get('title')}. {standard.get('description')} "
                f"Category: {standard.get('category')}. Status: {standard.get('status')}. {clauses}"
            )
            rag_service.ingest_text(text, f"repository-{standard.get('id', standard.get('code'))}.txt", document_type="Repository seed")

    @staticmethod
    def _context(chunks: List[Dict[str, Any]]) -> str:
        return "\n\n".join(
            f"[{chunk['id']}] Source: {chunk['sourceName']}"
            f"{f', clause {chunk['clause']}' if chunk.get('clause') else ''}\n{chunk['text']}"
            for chunk in chunks
        )

    async def _llm_answer(self, query: str, context: str) -> Optional[Dict[str, Any]]:
        if not settings.AI_API_KEY:
            return None
        system = (
            "You are a BIS regulatory assistant. Answer only from the supplied evidence. "
            "Never invent a standard, clause, date, requirement, or citation. If evidence is "
            "insufficient, say so. Every factual statement must include one or more exact "
            "citation IDs from the evidence in square brackets. Return JSON only with keys "
            "title, summary, nextStep, applicableStandard {code,title,status}."
        )
        payload = {
            "model": settings.AI_MODEL,
            "temperature": 0,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": f"Question:\n{query}\n\nEvidence:\n{context}"},
            ],
        }
        try:
            async with httpx.AsyncClient(timeout=90) as client:
                response = await client.post(
                    f"{settings.AI_API_BASE_URL.rstrip('/')}/chat/completions",
                    headers={"Authorization": f"Bearer {settings.AI_API_KEY}"},
                    json=payload,
                )
                response.raise_for_status()
                content = response.json()["choices"][0]["message"]["content"]
                parsed = json.loads(content)
                standard = parsed.get("applicableStandard")
                if not isinstance(standard, dict) or not all(
                    isinstance(standard.get(key), str) and standard[key].strip()
                    for key in ("code", "title", "status")
                ):
                    return None
                if not all(isinstance(parsed.get(key), str) and parsed[key].strip() for key in ("title", "summary", "nextStep")):
                    return None
                valid_ids = set(re.findall(r"\[([a-f0-9]{12})\]", context))
                factual_text = " ".join(str(parsed.get(key, "")) for key in ("summary", "nextStep"))
                if not valid_ids or any(cid not in valid_ids for cid in re.findall(r"\[([a-f0-9]{12})\]", factual_text)):
                    return None
                return parsed
        except (httpx.HTTPError, KeyError, TypeError, ValueError, json.JSONDecodeError):
            return None

    @staticmethod
    def _standard_from_chunks(chunks: List[Dict[str, Any]]) -> Dict[str, str]:
        for chunk in chunks:
            match = re.search(r"\b(IS\s*[A-Z]?\s*\d{3,5}(?::\d{4})?)\b(?:\s*-\s*([^\.]+))?", chunk["text"], re.I)
            if match:
                return {
                    "code": match.group(1).upper(),
                    "title": (match.group(2) or "Retrieved BIS standard evidence").strip(),
                    "status": "ACTIVE REVISION",
                }
        return {"code": "Not established", "title": "No applicable standard established", "status": "REVIEW REQUIRED"}

    async def generate_response(self, request: AIChatRequest, current_user: Optional[Dict[str, Any]] = None) -> AISessionResponse:
        started = time.time()
        query = request.query.strip()
        chunks = rag_service.retrieve(query)
        standard = self._standard_from_chunks(chunks)
        context = self._context(chunks)
        llm = await self._llm_answer(query, context) if chunks else None
        if llm:
            standard = llm.get("applicableStandard") or standard
            title = llm.get("title", "Grounded BIS regulatory response")
            summary = llm.get("summary", "The indexed evidence does not establish a complete answer.")
            next_step = llm.get("nextStep", "Verify the cited source before taking compliance action.")
        elif chunks:
            citations = " ".join(f"[{chunk['id']}]" for chunk in chunks[:2])
            title = f"Evidence retrieved for {standard['code']}"
            summary = f"The indexed BIS/Gazette evidence relevant to this question is provided below. Review the cited clauses before relying on this response. {citations}"
            next_step = f"Review the cited source documents and confirm the current revision with BIS before submitting a conformity application. {citations}"
        else:
            title = "No indexed regulatory evidence found"
            summary = "No BIS or Gazette document has been indexed for this question. Do not rely on an uncited answer."
            next_step = "Ingest the applicable official BIS/Gazette document and ask the question again."

        clauses = [
            ClauseItem(
                number=chunk.get("clause") or f"Evidence {index}",
                title=chunk["sourceName"],
                badge="Retrieved Evidence",
                content=chunk["text"],
                citationId=chunk["id"],
            )
            for index, chunk in enumerate(chunks[: settings.RAG_TOP_K], start=1)
        ]
        sources = [
            SourceItem(
                type=chunk.get("documentType", "BIS/Gazette"),
                code=chunk.get("clause") or chunk["sourceName"],
                details=chunk["text"][:240],
                tag="Retrieved citation",
                citationId=chunk["id"],
                sourceUrl=chunk.get("sourceUrl"),
                clause=chunk.get("clause"),
                sourceName=chunk["sourceName"],
            )
            for chunk in chunks
        ]
        user_name = current_user.get("name", "Guest User") if current_user else "Guest User"
        user_role = current_user.get("role", "Regulatory Inquirer") if current_user else "Regulatory Inquirer"
        elapsed = int((time.time() - started) * 1000)
        answer = AIAnswer(
            model=settings.AI_MODEL if settings.AI_API_KEY else "local-grounded-retriever",
            title=title,
            summary=summary,
            applicableStandard=StandardReference(**standard),
            clauses=clauses,
            nextStep=next_step,
            sources=sources,
            telemetry=TelemetryData(
                risk="REVIEW" if not chunks else "GROUNDED",
                riskSub="No source" if not chunks else "Evidence-backed retrieval",
                testingSpan="N/A",
                testingSpanSub="Confirm with the cited standard",
                curveTitle="Retrieval confidence",
                points=[TelemetryPoint(hour="top-1", temp=f"{_score_label(chunks, 0)}")],
            ),
        )
        return AISessionResponse(
            success=True,
            data=AISessionResponseData(
                sessionId=f"IND-2026-{uuid.uuid4().hex[:4].upper()}",
                gazetteSync="Indexed documents only",
                latency=f"{elapsed}ms",
                confidence="Evidence-backed" if chunks else "Insufficient evidence",
                user=UserContext(name=user_name, role=user_role, query=query, category=request.category or "General"),
                answer=answer,
            ),
        )


def _score_label(chunks: List[Dict[str, Any]], index: int) -> str:
    return "retrieved" if len(chunks) > index else "none"


ai_service = AIService()
