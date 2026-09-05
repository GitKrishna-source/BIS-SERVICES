# BISync — Your Intelligent Guide to Indian Standards

<p align="center">
  <strong>An AI-powered conformity assistant for the Bureau of Indian Standards (BIS) ecosystem.</strong><br/>
  Ask a question. Find the right standard. Get source-backed guidance with instant statutory cross-referencing.
</p>

<p align="center">
  <img alt="status" src="https://img.shields.io/badge/status-active-brightgreen">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
  <img alt="python" src="https://img.shields.io/badge/python-3.11%2B-blue">
  <img alt="react" src="https://img.shields.io/badge/react-18-61DAFB">
</p>

---

## Overview

BISync is a full-stack platform that helps regulatory officials, manufacturers/MSMEs, and testing laboratories navigate India's standards ecosystem — over **22,000+ BIS standards**, certification schemes, hallmarking rules, and NABL-accredited lab networks — through a grounded, citation-backed AI assistant.

Instead of manually searching through PDFs and gazette notifications, users get:

- **Natural-language answers** grounded in verified clause-level text (zero-hallucination RAG)
- **Deterministic citations** mapped to exact clause numbers, QCO mandates, and gazette dates
- **Role-aware workflows** for officials, manufacturers, and lab coordinators
- **Live lab discovery** with PIN-code search, accreditation scope, and turnaround times
- **Compliance telemetry** — visual risk scoring and test-parameter validation per product

## Key Features

| Module | Description |
|---|---|
| 🔍 **Standards Catalog** | Semantic search across 22,000+ IS standards with clause-level breakdowns and amendment history |
| 🤖 **AI Assistant (RAG)** | Hybrid search (BM25 + vector) over standards text, with reranking and sourced citations |
| 📜 **Certification** | Step-by-step guidance for Scheme-I (ISI Mark) and CRS licensing pathways |
| 🧪 **Lab Network** | Locate NABL-accredited testing labs by standard, scope, and geography; book test slots |
| 💎 **Hallmarking** | HUID verification and gold/silver hallmarking compliance lookup |
| 🛡️ **Consumer Help** | Verify ISI license validity and file grievances |

## Tech Stack

**Frontend**
- React.js
- Tailwind CSS
- Responsive, mobile-first UI

**Backend**
- Python
- FastAPI
- REST APIs

**AI & RAG**
- LLM API
- Sentence Transformers (embeddings)
- Retrieval-Augmented Generation (RAG)
- Hybrid Search (BM25 + Vector Search)
- Reranker

**Database & Storage**
- PostgreSQL
- pgvector (vector similarity search)
- PDF / Object Storage

**DevOps**
- Git & GitHub
- Docker

