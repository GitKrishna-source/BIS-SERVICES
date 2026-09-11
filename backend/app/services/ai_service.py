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
from app.services.lab_service import lab_service


class AIService:
    """Grounded regulatory answer generation over indexed BIS/Gazette chunks."""

    def __init__(self) -> None:
        self._seed_repository_chunks()

    # =========================================================
    # SEED RAG DATA
    # =========================================================

    def _seed_repository_chunks(self) -> None:
        """Keep the existing demo usable until official documents are ingested."""

        if rag_service.chunk_count:
            return

        for standard in standard_repository.list_all():

            clauses = "\n".join(
                f"Clause {clause.get('number')}: "
                f"{clause.get('title')}. "
                f"{clause.get('description')}"
                for clause in standard.get("clauses", [])
            )

            text = (
                f"{standard.get('code')} - "
                f"{standard.get('title')}. "
                f"{standard.get('description')} "
                f"Category: {standard.get('category')}. "
                f"Status: {standard.get('status')}. "
                f"{clauses}"
            )

            rag_service.ingest_text(
                text,
                f"repository-{standard.get('id', standard.get('code'))}.txt",
                document_type="Repository seed",
            )

    # =========================================================
    # INTENT DETECTION
    # =========================================================

    @staticmethod
    def detect_intent(query: str) -> str:

        q = query.lower()

        # Laboratory
        if any(
            word in q
            for word in (
                "lab",
                "laboratory",
                "testing laboratory",
                "test lab",
                "where can i test",
                "where to test",
                "testing facility",
            )
        ):
            return "laboratory"

        # Certification
        if any(
            word in q
            for word in (
                "certification",
                "certify",
                "certificate",
                "bis license",
                "bis licence",
                "registration",
                "conformity",
            )
        ):
            return "certification"

        # Hallmarking
        if any(
            word in q
            for word in (
                "hallmark",
                "hallmarking",
                "huid",
                "gold purity",
                "silver purity",
            )
        ):
            return "hallmarking"

        return "standard"

    # =========================================================
    # STANDARD CODE EXTRACTION
    # =========================================================

    @staticmethod
    def _extract_standard_code(query: str) -> Optional[str]:

        match = re.search(
            r"\bIS\s*[A-Z]?\s*\d{3,5}(?::\d{4})?\b",
            query,
            re.I,
        )

        if match:
            return match.group(0).upper()

        return None

    # =========================================================
    # LAB RESULT → RAG-LIKE CHUNKS
    # =========================================================

    @staticmethod
    def _lab_chunks(
        labs: List[Any],
    ) -> List[Dict[str, Any]]:

        chunks = []

        for index, lab in enumerate(labs, start=1):

            data = (
                lab.model_dump()
                if hasattr(lab, "model_dump")
                else dict(lab)
            )

            standards = ", ".join(
                data.get("standards", [])
            ) or "Not specified"

            chunks.append(
                {
                    "id": f"LAB{index:09d}",
                    "sourceName": data.get(
                        "name",
                        "BIS Testing Laboratory",
                    ),
                    "documentType": "Laboratory Directory",
                    "sourceUrl": None,
                    "clause": "LAB",
                    "text": (
                        f"{data.get('name')} — "
                        f"{data.get('city')}, "
                        f"{data.get('state')} "
                        f"PIN {data.get('pincode')}. "
                        f"{data.get('accreditation')}. "
                        f"Recognized standards: {standards}. "
                        f"Turnaround: "
                        f"{data.get('turnaroundDays')}. "
                        f"Rating: "
                        f"{data.get('rating')}/5. "
                        f"Contact: "
                        f"{data.get('contact')}. "
                        f"Email: "
                        f"{data.get('email')}. "
                        f"Status: "
                        f"{data.get('status')}."
                    ),
                }
            )

        return chunks

    # =========================================================
    # CONTEXT BUILDER
    # =========================================================

    @staticmethod
    def _context(
        chunks: List[Dict[str, Any]],
    ) -> str:

        return "\n\n".join(
            f"[{chunk['id']}] "
            f"Source: {chunk['sourceName']}"
            f"{f', clause {chunk['clause']}' if chunk.get('clause') else ''}\n"
            f"{chunk['text']}"
            for chunk in chunks
        )

    # =========================================================
    # OPTIONAL LLM
    # =========================================================

    async def _llm_answer(
        self,
        query: str,
        context: str,
    ) -> Optional[Dict[str, Any]]:

        if not settings.AI_API_KEY:
            return None

        system = (
            "You are a BIS regulatory assistant. "
            "Answer only from the supplied evidence. "
            "Never invent a standard, clause, date, requirement, "
            "or citation. "
            "If evidence is insufficient, say so. "
            "Every factual statement must include one or more "
            "exact citation IDs from the evidence in square brackets. "
            "Return JSON only with keys "
            "title, summary, nextStep, "
            "applicableStandard {code,title,status}."
        )

        payload = {
            "model": settings.AI_MODEL,
            "temperature": 0,
            "response_format": {
                "type": "json_object"
            },
            "messages": [
                {
                    "role": "system",
                    "content": system,
                },
                {
                    "role": "user",
                    "content": (
                        f"Question:\n{query}\n\n"
                        f"Evidence:\n{context}"
                    ),
                },
            ],
        }

        try:

            async with httpx.AsyncClient(
                timeout=90
            ) as client:

                response = await client.post(
                    f"{settings.AI_API_BASE_URL.rstrip('/')}/chat/completions",
                    headers={
                        "Authorization":
                        f"Bearer {settings.AI_API_KEY}"
                    },
                    json=payload,
                )

                response.raise_for_status()

                content = (
                    response.json()
                    ["choices"][0]
                    ["message"]["content"]
                )

                parsed = json.loads(content)

                standard = parsed.get(
                    "applicableStandard"
                )

                if (
                    not isinstance(
                        standard,
                        dict,
                    )
                    or not all(
                        isinstance(
                            standard.get(key),
                            str,
                        )
                        and standard[key].strip()
                        for key in (
                            "code",
                            "title",
                            "status",
                        )
                    )
                ):
                    return None

                if not all(
                    isinstance(
                        parsed.get(key),
                        str,
                    )
                    and parsed[key].strip()
                    for key in (
                        "title",
                        "summary",
                        "nextStep",
                    )
                ):
                    return None

                valid_ids = set(
                    re.findall(
                        r"\[([a-f0-9]{12})\]",
                        context,
                    )
                )

                factual_text = " ".join(
                    str(parsed.get(key, ""))
                    for key in (
                        "summary",
                        "nextStep",
                    )
                )

                citations = re.findall(
                    r"\[([a-f0-9]{12})\]",
                    factual_text,
                )

                if not valid_ids:
                    return None

                if any(
                    cid not in valid_ids
                    for cid in citations
                ):
                    return None

                return parsed

        except (
            httpx.HTTPError,
            KeyError,
            TypeError,
            ValueError,
            json.JSONDecodeError,
        ):
            return None

    # =========================================================
    # STANDARD EXTRACTION
    # =========================================================

    @staticmethod
    def _standard_from_chunks(
        chunks: List[Dict[str, Any]],
    ) -> Dict[str, str]:

        for chunk in chunks:

            match = re.search(
                r"\b(IS\s*[A-Z]?\s*\d{3,5}"
                r"(?::\d{4})?)\b"
                r"(?:\s*-\s*([^\.]+))?",
                chunk["text"],
                re.I,
            )

            if match:

                return {
                    "code": match.group(1).upper(),
                    "title": (
                        match.group(2)
                        or "Retrieved BIS standard evidence"
                    ).strip(),
                    "status": "ACTIVE REVISION",
                }

        return {
            "code": "Not established",
            "title": "No applicable standard established",
            "status": "REVIEW REQUIRED",
        }

    # =========================================================
    # CERTIFICATION GUIDANCE
    # =========================================================

    @staticmethod
    def _certification_guidance():

        return {
            "code": "BIS Certification",
            "title": "BIS Conformity Assessment Process",
            "status": "GUIDANCE",
        }

    # =========================================================
    # MAIN AI AGENT
    # =========================================================

    async def generate_response(
        self,
        request: AIChatRequest,
        current_user: Optional[
            Dict[str, Any]
        ] = None,
    ) -> AISessionResponse:

        started = time.time()

        query = request.query.strip()

        # -----------------------------------------------------
        # AGENT INTENT
        # -----------------------------------------------------

        intent = self.detect_intent(query)

        # -----------------------------------------------------
        # CERTIFICATION ROUTING
        # -----------------------------------------------------

        if intent == "certification":

            chunks = []

            applicable = (
                self._certification_guidance()
            )

            title = (
                "BIS Certification Guidance"
            )

            summary = (
                "To obtain BIS certification, first "
                "identify the applicable Indian Standard "
                "for your product. Check whether the "
                "product is covered under a mandatory "
                "BIS conformity assessment scheme, "
                "complete the required product testing, "
                "and then follow the applicable BIS "
                "application and conformity assessment "
                "procedure."
            )

            next_step = (
                "Provide the product name or description "
                "to identify the applicable Indian "
                "Standard and certification route."
            )

            clauses = []

            sources = []

        # -----------------------------------------------------
        # HALLMARKING ROUTING
        # -----------------------------------------------------

        elif intent == "hallmarking":

            chunks = []

            applicable = {
                "code": "BIS Hallmarking",
                "title": "BIS Hallmarking & HUID Guidance",
                "status": "GUIDANCE",
            }

            title = "BIS Hallmarking Guidance"

            summary = (
                "BIS hallmarking provides an assurance of the "
                "purity of precious-metal articles. For "
                "hallmarked jewellery, consumers can use the "
                "HUID associated with the article to verify "
                "hallmarking information through BIS services."
            )

            next_step = (
                "For a specific jewellery or hallmarking query, "
                "provide the metal type and product details so "
                "the applicable BIS process can be identified."
            )

            clauses = []

            sources = []

        # -----------------------------------------------------
        # LABORATORY ROUTING
        # -----------------------------------------------------

        elif intent == "laboratory":

            standard_code = (
                self._extract_standard_code(query)
            )

            labs_response = lab_service.get_labs(
                standard=standard_code or "",
                pincode="",
                state=request.location or "",
                query=query,
            )

            labs = labs_response.data

            # Fallback to all labs if exact standard
            # matching returns nothing.
            if not labs and standard_code:

                labs = lab_service.get_labs(
                    standard="",
                    pincode="",
                    state=request.location or "",
                    query="",
                ).data

            chunks = self._lab_chunks(labs)

            if labs:

                applicable = {
                    "code": (
                        standard_code
                        or "BIS Testing Laboratory Search"
                    ),
                    "title": (
                        f"Testing laboratories for "
                        f"{standard_code}"
                        if standard_code
                        else
                        "BIS Testing Laboratories"
                    ),
                    "status": "OPERATIONAL",
                }

                title = (
                    f"Testing laboratories found: "
                    f"{len(labs)}"
                )

                summary = (
                    f"I found {len(labs)} operational "
                    f"testing laboratory result(s)"
                )

                if standard_code:
                    summary += (
                        f" associated with "
                        f"{standard_code}."
                    )
                else:
                    summary += "."

                summary += (
                    " Their accreditation, location, "
                    "scope, turnaround, and contact "
                    "details are shown below."
                )

                next_step = (
                    f"Contact the selected laboratory "
                    f"to confirm scope and current "
                    f"availability for {standard_code}."
                    if standard_code
                    else
                    "Contact the selected laboratory "
                    "to confirm the required testing "
                    "scope and current availability."
                )

            else:

                applicable = {
                    "code": (
                        standard_code
                        or "Not established"
                    ),
                    "title": (
                        "No matching testing "
                        "laboratory found"
                    ),
                    "status": "REVIEW REQUIRED",
                }

                title = (
                    "No matching testing "
                    "laboratory found"
                )

                summary = (
                    "No indexed laboratory matched "
                    "the requested standard or location."
                )

                next_step = (
                    "Try another standard, state, "
                    "or location."
                )

            clauses = [
                ClauseItem(
                    number=chunk["clause"],
                    title=chunk["sourceName"],
                    badge="LAB RESULT",
                    content=chunk["text"],
                    citationId=chunk["id"],
                )
                for chunk in chunks
            ]

            sources = [
                SourceItem(
                    type="LABORATORY DIRECTORY",
                    code=chunk["sourceName"],
                    details=chunk["text"][:240],
                    tag="Matched laboratory",
                    citationId=chunk["id"],
                    sourceUrl=None,
                    clause="LAB",
                    sourceName=chunk["sourceName"],
                )
                for chunk in chunks
            ]

        # -----------------------------------------------------
        # STANDARD / RAG ROUTING
        # -----------------------------------------------------

        else:

            chunks = (
                rag_service.retrieve(query)
            )

            standard = (
                self._standard_from_chunks(
                    chunks
                )
            )

            context = self._context(
                chunks
            )

            llm = (
                await self._llm_answer(
                    query,
                    context,
                )
                if chunks
                else None
            )

            if llm:

                standard = (
                    llm.get(
                        "applicableStandard"
                    )
                    or standard
                )

                title = llm.get(
                    "title",
                    "Grounded BIS regulatory response",
                )

                summary = llm.get(
                    "summary",
                    "The indexed evidence does not "
                    "establish a complete answer.",
                )

                next_step = llm.get(
                    "nextStep",
                    "Verify the cited source before "
                    "taking compliance action.",
                )

            elif chunks:

                citations = " ".join(
                    f"[{chunk['id']}]"
                    for chunk in chunks[:2]
                )

                title = (
                    f"Evidence retrieved for "
                    f"{standard['code']}"
                )

                summary = (
                    "The indexed BIS/Gazette evidence "
                    "relevant to this question is "
                    "provided below. Review the cited "
                    "clauses before relying on this "
                    f"response. {citations}"
                )

                next_step = (
                    "Review the cited source documents "
                    "and confirm the current revision "
                    "before submitting a conformity "
                    f"application. {citations}"
                )

            else:

                standard = {
                    "code": "Not established",
                    "title": (
                        "No applicable standard "
                        "established"
                    ),
                    "status": "REVIEW REQUIRED",
                }

                title = (
                    "No indexed regulatory "
                    "evidence found"
                )

                summary = (
                    "No BIS or Gazette document has "
                    "been indexed for this question. "
                    "Do not rely on an uncited answer."
                )

                next_step = (
                    "Ingest the applicable official "
                    "BIS/Gazette document and ask "
                    "the question again."
                )

            applicable = standard

            clauses = [
                ClauseItem(
                    number=(
                        chunk.get("clause")
                        or f"Evidence {index}"
                    ),
                    title=chunk["sourceName"],
                    badge="Retrieved Evidence",
                    content=chunk["text"],
                    citationId=chunk["id"],
                )
                for index, chunk in enumerate(
                    chunks[
                        :settings.RAG_TOP_K
                    ],
                    start=1,
                )
            ]

            sources = [
                SourceItem(
                    type=chunk.get(
                        "documentType",
                        "BIS/Gazette",
                    ),
                    code=(
                        chunk.get("clause")
                        or chunk["sourceName"]
                    ),
                    details=chunk["text"][:240],
                    tag="Retrieved citation",
                    citationId=chunk["id"],
                    sourceUrl=chunk.get(
                        "sourceUrl"
                    ),
                    clause=chunk.get(
                        "clause"
                    ),
                    sourceName=chunk[
                        "sourceName"
                    ],
                )
                for chunk in chunks
            ]

        # =====================================================
        # USER INFO
        # =====================================================

        user_name = (
            current_user.get(
                "name",
                "Guest User",
            )
            if current_user
            else "Guest User"
        )

        user_role = (
            current_user.get(
                "role",
                "Regulatory Inquirer",
            )
            if current_user
            else "Regulatory Inquirer"
        )

        elapsed = int(
            (time.time() - started) * 1000
        )

        # =====================================================
        # FINAL ANSWER
        # =====================================================

        answer = AIAnswer(
            model=(
                settings.AI_MODEL
                if settings.AI_API_KEY
                else "bisync-ai-agent"
            ),

            title=title,

            summary=summary,

            applicableStandard=StandardReference(
                **applicable
            ),

            clauses=clauses,

            nextStep=next_step,

            sources=sources,

            telemetry=TelemetryData(
                risk=(
                    "GROUNDED"
                    if chunks
                    else (
                        "GUIDANCE"
                        if intent == "certification"
                        else "REVIEW"
                    )
                ),

                riskSub=(
                    "Evidence-backed retrieval"
                    if chunks
                    else (
                        "Certification workflow"
                        if intent == "certification"
                        else "No source"
                    )
                ),

                testingSpan=intent,

                testingSpanSub=(
                    "Agent tool routing → grounded data"
                ),

                curveTitle=(
                    "Retrieval confidence"
                ),

                points=[
                    TelemetryPoint(
                        hour="top-1",
                        temp=_score_label(
                            chunks,
                            0,
                        ),
                    )
                ],
            ),
        )

        # =====================================================
        # FINAL SESSION RESPONSE
        # =====================================================

        return AISessionResponse(

            success=True,

            data=AISessionResponseData(

                sessionId=(
                    f"IND-2026-"
                    f"{uuid.uuid4().hex[:4].upper()}"
                ),

                gazetteSync=(
                    "Indexed documents only"
                ),

                latency=f"{elapsed}ms",

                confidence=(
                    "Evidence-backed"
                    if chunks
                    else (
                        "Guidance"
                        if intent == "certification"
                        else "Insufficient evidence"
                    )
                ),

                user=UserContext(
                    name=user_name,
                    role=user_role,
                    query=query,
                    category=(
                        request.category
                        or "General"
                    ),
                ),

                answer=answer,
            ),
        )


# =============================================================
# HELPERS
# =============================================================

def _score_label(
    chunks: List[Dict[str, Any]],
    index: int,
) -> str:

    return (
        "retrieved"
        if len(chunks) > index
        else "none"
    )


# =============================================================
# SINGLE AI SERVICE INSTANCE
# =============================================================

ai_service = AIService()