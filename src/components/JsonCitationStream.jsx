import React, { useState } from 'react';
import { Terminal, Copy, Check, Database } from 'lucide-react';

export const JsonCitationStream = () => {
  const [copied, setCopied] = useState(false);
  const [activeSchema, setActiveSchema] = useState('IS_17803');

  const schemas = {
    IS_17803: {
      file: "IS_17803_Clause_5.2.json",
      confidence: "99.4%",
      code: `{
  "standard_id": "IS 17803 : 2022",
  "title": "Stainless Steel Vacuum Flasks & Bottles",
  "clause": "5.2 Material Compliance (Food Grade SS304)",
  "qco_mandate": "Mandatory Certification w.e.f 15-Oct-2023",
  "sampling_scheme": "STI/17803/1 Annexure A",
  "vector_embedding": "text-embedding-3-large (dim: 1536)",
  "retrieval_mode": "Hybrid (BM25 + Dense RRF)"
}`
    },
    IS_13252: {
      file: "IS_13252_Clause_1.5.json",
      confidence: "98.9%",
      code: `{
  "standard_id": "IS 13252 (Part 1) : 2010",
  "title": "IT Equipment — Electrical Safety",
  "clause": "1.5 Insulation & Shock Protection",
  "qco_mandate": "Compulsory Registration Scheme (CRS)",
  "sampling_scheme": "MeitY CRO Series III",
  "vector_embedding": "text-embedding-3-large (dim: 1536)",
  "retrieval_mode": "Hybrid (BM25 + Dense RRF)"
}`
    }
  };

  const current = schemas[activeSchema];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950 rounded-3xl border border-white/10 p-5 sm:p-6 shadow-sketch-float text-zinc-300 font-mono text-xs overflow-hidden">
      {/* Top bar with tabs */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-[11px] text-zinc-400 font-medium pl-2 flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{current.file}</span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
            CONFIDENCE: {current.confidence}
          </span>
          <button
            onClick={handleCopy}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Copy JSON Payload"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Selector pills */}
      <div className="flex space-x-2 mb-3">
        <button
          onClick={() => setActiveSchema('IS_17803')}
          className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
            activeSchema === 'IS_17803'
              ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800'
          }`}
        >
          IS 17803 (Flasks)
        </button>
        <button
          onClick={() => setActiveSchema('IS_13252')}
          className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all ${
            activeSchema === 'IS_13252'
              ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40'
              : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800'
          }`}
        >
          IS 13252 (IT Safety)
        </button>
      </div>

      {/* Code Area */}
      <pre className="text-fuchsia-200/90 text-[11px] leading-relaxed bg-zinc-900/80 p-4 rounded-2xl border border-white/[0.06] overflow-x-auto">
        <code>{current.code}</code>
      </pre>

      <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500 pt-2 border-t border-white/[0.06]">
        <span className="flex items-center space-x-1.5">
          <Database className="w-3 h-3 text-fuchsia-400" />
          <span>Deterministic RAG Vector Stream</span>
        </span>
        <span className="text-emerald-400 font-medium">● Grounded</span>
      </div>
    </div>
  );
};

export default JsonCitationStream;
