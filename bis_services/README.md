# BIS Services Integration Directory

This folder is designated for BIS services modules, Python FastAPI backend services, schemas, and AI RAG service connectors.

## Proposed Service Modules
- `standards_service.py` - Retrieval of 22,000+ Indian Standards (IS), ICS codes, and QCO orders.
- `rag_engine.py` - Hybrid search (BM25 + pgvector/Sentence-Transformers) and clause-level grounding.
- `lab_network_service.py` - NABL accredited laboratories geo-registry and PIN code lookup.
- `certification_workflow.py` - Scheme-I (ISI Mark) and CRS application steps generator.
- `hallmarking_verifier.py` - 6-Digit Alphanumeric HUID validation engine.
- `consumer_care.py` - Spurious mark verification and grievance escalation bridge.
