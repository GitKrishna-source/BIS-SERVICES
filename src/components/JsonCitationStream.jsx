import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Code2, Database } from 'lucide-react';

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
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 shadow-xl text-slate-200 font-mono text-xs overflow-hidden">
      {/* Top bar with tabs */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold pl-2 flex items-center space-x-1">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>{current.file}</span>
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
            CONFIDENCE: {current.confidence}
          </span>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-white transition-colors"
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
          className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
            activeSchema === 'IS_17803'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          IS 17803 (Flasks)
        </button>
        <button
          onClick={() => setActiveSchema('IS_13252')}
          className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
            activeSchema === 'IS_13252'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          IS 13252 (IT Safety)
        </button>
      </div>

      {/* Code Area */}
      <pre className="text-sky-300 text-[11px] leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 overflow-x-auto">
        <code>{current.code}</code>
      </pre>

      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60">
        <span className="flex items-center space-x-1">
          <Database className="w-3 h-3 text-sky-400" />
          <span>Real-time RAG Vector Retrieval Stream</span>
        </span>
        <span className="text-emerald-400 font-bold">● Grounded</span>
      </div>
    </div>
  );
};
