import React, { useState } from 'react';
import { sampleRAGSession, mockStandards } from '../services/mockData';
import { ragApi } from '../services/api';
import { TelemetryChart } from '../components/TelemetryChart';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Copy, 
  Check, 
  Bookmark, 
  Download, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Layers, 
  AlertCircle,
  HelpCircle,
  CornerDownLeft,
  ChevronRight,
  Printer,
  Zap,
  Lock,
  LogIn
} from 'lucide-react';

export const AIAssistantPage = ({ currentUser, onOpenLogin, initialQuery = '', onOpenDrawer, onOpenPdf }) => {
  const [session, setSession] = useState(sampleRAGSession);
  const [inputValue, setInputValue] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [strictMode, setStrictMode] = useState(true);
  const [feedback, setFeedback] = useState(null); // 'up' | 'down'
  const [demoQueriesLeft, setDemoQueriesLeft] = useState(3);

  const isDemo = !currentUser || currentUser.isDemo;

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (isDemo && demoQueriesLeft <= 0) {
      if (onOpenLogin) onOpenLogin();
      return;
    }

    setIsLoading(true);
    try {
      const res = await ragApi.queryAssistant({ query: inputValue });
      if (res.success && res.data) {
        setSession(res.data);
        if (isDemo) {
          setDemoQueriesLeft(prev => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${session.answer.title}\n\n${session.answer.summary}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (isDemo) {
      alert("PDF Export is a statutory feature for logged-in officers & manufacturers. Please log in to download certified dossiers.");
      if (onOpenLogin) onOpenLogin();
      return;
    }
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
      
      {/* Demo Mode Limited Access Banner */}
      {isDemo && (
        <div className="p-3 bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 rounded-2xl border border-amber-200/90 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-2.5 text-xs text-amber-900 font-medium">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              <Zap className="w-3.5 h-3.5" />
            </span>
            <span>
              <strong>Limited Demo Mode:</strong> You have <strong>{demoQueriesLeft} demo queries</strong> remaining. Login for full statutory access and unlimited dossier exports.
            </span>
          </div>

          <button
            onClick={onOpenLogin}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all shrink-0"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span>Login to Unlock</span>
          </button>
        </div>
      )}

      {/* Session Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse"></span>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              Standard Inquiry Session
            </h1>
          </div>
          <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
            SESSION #{session.sessionId}
          </span>
        </div>

        {/* Telemetry & Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Strict Mode Toggle */}
          <button
            onClick={() => setStrictMode(!strictMode)}
            className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] flex items-center space-x-1.5 transition-all ${
              strictMode
                ? 'bg-sky-50 text-sky-700 border-sky-300'
                : 'bg-white text-slate-600 border-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Strict Mode: {strictMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Audit Trail Button */}
          <button 
            onClick={() => alert(`Audit Trail Key: SHA-256-${session.sessionId}-VERIFIED`)}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center space-x-1 shadow-sm"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit Trail</span>
          </button>

          {/* Gazette Sync Pill */}
          <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Gazette Synced {session.gazetteSync}</span>
          </div>

          <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">
            ⚡ {session.latency} | Confidence: {session.confidence}
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Conversational RAG Flow (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* User Inquiry Box */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser && !currentUser.isDemo ? currentUser.name.slice(0, 2).toUpperCase() : 'G'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {currentUser && !currentUser.isDemo ? currentUser.name : 'Guest User (Demo Mode)'}
                  </div>
                  <div className="text-[10px] text-sky-700 font-medium">
                    {currentUser && !currentUser.isDemo ? currentUser.role : 'Public Inquiry Access'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Today at 11:42 AM IST</span>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-relaxed pl-1">
              "{session.user.query}"
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                Category: {session.user.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                Jurisdiction: {session.user.jurisdiction}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                Tariff: {session.user.tariff}
              </span>
            </div>
          </div>

          {/* AI Verified Response Card */}
          <div className="p-6 rounded-2xl bg-white border border-sky-200/90 shadow-lg shadow-sky-500/5 space-y-6 relative overflow-hidden">
            
            {/* Top Badge & Model Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[10px] font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                <span>Verified Regulatory Answer</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>Model: {session.answer.model}</span>
              </span>
            </div>

            {/* Answer Title & Statutory Summary */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {session.answer.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {session.answer.summary}
              </p>
            </div>

            {/* Applicable National Standard Hero Chip */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                    Applicable National Standard
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-black text-slate-900">
                      {session.answer.applicableStandard.code}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                      {session.answer.applicableStandard.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 line-clamp-1">
                    {session.answer.applicableStandard.title}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenDrawer(mockStandards[0])}
                className="px-3 py-1.5 rounded-lg bg-white border border-sky-300 hover:bg-sky-50 text-sky-700 text-xs font-bold flex items-center space-x-1 shadow-sm transition-all shrink-0"
              >
                <span>CLAUSE SPEC</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key Mandatory Test Protocols & Clauses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Key Mandatory Test Protocols & Clauses</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  3 Compliance Vectors Enforced
                </span>
              </div>

              <div className="space-y-2.5">
                {session.answer.clauses.map((clause, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-sky-300 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-200">
                          {clause.number}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{clause.title}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        {clause.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-1">
                      {clause.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Next Step Box */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Recommended Next Step</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {session.answer.nextStep}
              </p>
            </div>

            {/* Action Bar Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center space-x-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Response'}</span>
                </button>
                <button
                  onClick={() => alert("Dossier saved to active auditor notebook.")}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center space-x-1 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save to Dossier</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center space-x-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400">Helpful?</span>
                <button
                  onClick={() => setFeedback('up')}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    feedback === 'up' ? 'bg-emerald-50 text-emerald-600 border-emerald-300' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFeedback('down')}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    feedback === 'down' ? 'bg-rose-50 text-rose-600 border-rose-300' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Input Box */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3">
            <form onSubmit={handleSend} className="relative">
              <div className="flex items-center space-x-2 bg-slate-50 rounded-xl p-2 border border-slate-200 focus-within:border-sky-500 focus-within:bg-white transition-all">
                <button
                  type="button"
                  onClick={() => alert("Upload product technical datasheet or CAD drawing for clause extraction.")}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Attach Spec Sheet"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a follow-up question regarding sample sizes, marking fee, or laboratory charges..."
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none py-1.5 font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all shrink-0"
                >
                  <span>{isLoading ? 'Retrieving...' : 'Send'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
              <div className="flex flex-wrap gap-2">
                <span className="font-semibold text-slate-400">Try:</span>
                <button
                  onClick={() => setInputValue("What are the sample quantity requirements for IS 17803?")}
                  className="text-sky-600 hover:underline"
                >
                  "Sample quantity requirements?"
                </button>
                <span>•</span>
                <button
                  onClick={() => setInputValue("Show accredited test labs in Western Region for IS 17803")}
                  className="text-sky-600 hover:underline"
                >
                  "Accredited test labs in Western Region"
                </button>
              </div>
              <span className="font-mono text-[10px]">Markdown & MathJax Enabled</span>
            </div>
          </div>

        </div>

        {/* Right Column: Grounded Sources & Telemetry Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Grounded Sources Container */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-800">
                  Regulatory Sources
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded border border-sky-200">
                {session.answer.sources.length} Cited
              </span>
            </div>

            <div className="space-y-3">
              {session.answer.sources.map((src, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    if (src.type === 'PRIMARY STANDARD') onOpenDrawer(mockStandards[0]);
                    else onOpenPdf({ title: src.code });
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50/60 hover:bg-sky-50/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase text-sky-700">
                      {src.type}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {src.code}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1 line-clamp-2">
                    {src.details}
                  </p>
                  <div className="mt-2 text-[9px] font-semibold text-emerald-700 flex items-center space-x-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{src.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Gazette Notice PDF Button */}
            <button
              onClick={() => onOpenPdf({ title: "Gazette Notification S.O. 3192(E)" })}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>View Full Gazette Notice (PDF)</span>
            </button>

            <div className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-200/80 leading-relaxed">
              All cited standards reflect the latest amendments published in the Gazette of India. Statutory certification requires physical factory audits under STI (Scheme of Testing and Inspection).
            </div>
          </div>

          {/* Compliance Matrix Telemetry Chart */}
          <TelemetryChart telemetry={session.answer.telemetry} />

        </div>

      </div>

    </div>
  );
};
