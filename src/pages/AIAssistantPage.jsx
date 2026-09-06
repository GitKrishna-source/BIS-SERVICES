import React, { useState } from 'react';
import { sampleRAGSession, mockStandards } from '../services/mockData';
import { ragApi } from '../services/api';
import { TelemetryChart } from '../components/TelemetryChart';
import { useLanguage } from '../context/LanguageContext';
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
  const { t } = useLanguage();
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
        <div className="p-3 bg-amber-500/10 dark:bg-amber-500/15 rounded-2xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center space-x-2.5 text-xs text-black font-semibold">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold text-[10px] shrink-0">
              <Zap className="w-3.5 h-3.5 fill-black text-black" />
            </span>
            <span className="text-black">
              <strong className="text-black font-black">{t.demoBannerPrefix || 'Limited Demo Mode:'}</strong> You have <strong className="text-black font-black">{demoQueriesLeft} {t.demoBannerSuffix || 'demo queries remaining. Login for full statutory access and unlimited dossier exports.'}</strong>
            </span>
          </div>

          <button
            onClick={onOpenLogin}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.loginToUnlock || 'Login to Unlock'}</span>
          </button>
        </div>
      )}

      {/* Session Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1f2c42]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse"></span>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.sessionTitle || 'Standard Inquiry Session'}
            </h1>
          </div>
          <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-sky-50 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            SESSION #{session.sessionId}
          </span>
        </div>

      {/* Featured AI Compliance Assistant Banner */}
      <div className="w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1f2c42] shadow-md relative group">
        <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-slate-900">
          <img 
            src="/images/ai-assistant-hero.jpg" 
            alt="AI-Powered Indian Standards and Regulatory Analytics Assistant" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold px-2 py-0.5 rounded bg-sky-950/80 border border-sky-400/30">
                AI REGULATORY DIRECTIVE ENGINE
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                Clause-Level Regulatory AI & Compliance Synthesis
              </h2>
              <p className="text-xs text-slate-300 hidden sm:block">
                Deep semantic cross-referencing across 22,000+ Indian Standards, Gazette Notifications, and NABL testing protocols.
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <div>
                <span className="text-sky-400 font-bold">100%</span>
                <span className="text-slate-400 text-[10px] ml-1">CITED</span>
              </div>
              <span className="text-slate-600">|</span>
              <div>
                <span className="text-emerald-400 font-bold">0%</span>
                <span className="text-slate-400 text-[10px] ml-1">HALLUCINATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Telemetry & Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Strict Mode Toggle */}
          <button
            onClick={() => setStrictMode(!strictMode)}
            className={`px-2.5 py-1 rounded-lg border font-semibold text-[11px] flex items-center space-x-1.5 transition-all cursor-pointer ${
              strictMode
                ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-700'
                : 'bg-white dark:bg-[#162032] text-slate-600 dark:text-slate-300 border-slate-300 dark:border-[#1f2c42]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t.strictMode || 'Strict Mode'}: {strictMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Audit Trail Button */}
          <button 
            onClick={() => alert(`Audit Trail Key: SHA-256-${session.sessionId}-VERIFIED`)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#162032] border border-slate-300 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#1f2c42] text-slate-700 dark:text-slate-200 font-semibold text-[11px] flex items-center space-x-1 shadow-sm transition-colors cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{t.auditTrail || 'Audit Trail'}</span>
          </button>

          {/* Gazette Sync Pill */}
          <div className="flex items-center space-x-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{t.gazetteSynced || 'Gazette Synced'} {session.gazetteSync}</span>
          </div>

          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            ⚡ {session.latency} | Confidence: {session.confidence}
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Conversational RAG Flow (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* User Inquiry Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs">
                  {currentUser && !currentUser.isDemo ? currentUser.name.slice(0, 2).toUpperCase() : 'G'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentUser && !currentUser.isDemo ? currentUser.name : 'Guest User (Demo Mode)'}
                  </div>
                  <div className="text-[10px] text-sky-700 dark:text-sky-400 font-medium">
                    {currentUser && !currentUser.isDemo ? currentUser.role : 'Public Inquiry Access'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Today at 11:42 AM IST</span>
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed pl-1">
              "{session.user.query}"
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-[#1f2c42] font-mono text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#162032] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2c42]">
                Category: {session.user.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#162032] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2c42]">
                Jurisdiction: {session.user.jurisdiction}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#162032] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2c42]">
                Tariff: {session.user.tariff}
              </span>
            </div>
          </div>

          {/* AI Verified Response Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-sky-200/90 dark:border-[#1f2c42] shadow-lg shadow-sky-500/5 space-y-6 relative overflow-hidden">
            
            {/* Top Badge & Model Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1f2c42]">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-[10px] font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Verified Regulatory Answer</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>Model: {session.answer.model}</span>
              </span>
            </div>

            {/* Answer Title & Statutory Summary */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {session.answer.title}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {session.answer.summary}
              </p>
            </div>

            {/* Applicable National Standard Hero Chip */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 dark:from-sky-950/50 dark:via-blue-950/40 dark:to-indigo-950/50 border border-sky-200 dark:border-sky-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                    {t.applicableStandard || 'Applicable National Standard'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-black text-slate-900 dark:text-white">
                      {session.answer.applicableStandard.code}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[9px] font-bold">
                      {session.answer.applicableStandard.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1">
                    {session.answer.applicableStandard.title}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenDrawer(mockStandards[0])}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111827] border border-sky-300 dark:border-sky-500/40 hover:bg-sky-50 dark:hover:bg-[#162032] text-sky-700 dark:text-sky-300 text-xs font-bold flex items-center space-x-1 shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <span>{t.viewClauseSpec || 'CLAUSE SPEC'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key Mandatory Test Protocols & Clauses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>{t.mandatoryProtocols || 'Key Mandatory Test Protocols & Clauses'}</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  3 Compliance Vectors Enforced
                </span>
              </div>

              <div className="space-y-2.5">
                {session.answer.clauses.map((clause, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-[#1f2c42] bg-slate-50/70 dark:bg-[#162032] hover:bg-white dark:hover:bg-[#1a253a] hover:border-sky-300 dark:hover:border-sky-500/50 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-100/80 dark:bg-sky-950/80 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                          {clause.number}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{clause.title}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                        {clause.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1">
                      {clause.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Next Step Box */}
            <div className="p-4 rounded-xl bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 space-y-1">
              <div className="text-[10px] font-black uppercase tracking-wider text-black flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-black" />
                <span className="text-black font-bold">{t.recommendedNextStep || 'Recommended Next Step'}</span>
              </div>
              <p className="text-xs text-black leading-relaxed font-semibold">
                {session.answer.nextStep}
              </p>
            </div>

            {/* Action Bar Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#1f2c42] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#162032] hover:bg-slate-200 dark:hover:bg-[#1f2c42] text-slate-700 dark:text-slate-200 font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (t.copied || 'Copied') : (t.copyResponse || 'Copy Response')}</span>
                </button>
                <button
                  onClick={() => alert("Dossier saved to active auditor notebook.")}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#162032] hover:bg-slate-200 dark:hover:bg-[#1f2c42] text-slate-700 dark:text-slate-200 font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{t.saveToDossier || 'Save to Dossier'}</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#162032] hover:bg-slate-200 dark:hover:bg-[#1f2c42] text-slate-700 dark:text-slate-200 font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportPdf || 'Export PDF'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">{t.helpfulPrompt || 'Helpful?'}</span>
                <button
                  onClick={() => setFeedback('up')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    feedback === 'up' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' : 'bg-white dark:bg-[#162032] border-slate-200 dark:border-[#1f2c42] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1f2c42]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFeedback('down')}
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                    feedback === 'down' ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-700' : 'bg-white dark:bg-[#162032] border-slate-200 dark:border-[#1f2c42] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#1f2c42]'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Input Box */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] shadow-md space-y-3">
            <form onSubmit={handleSend} className="relative">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-[#162032] rounded-xl p-2 border border-slate-200 dark:border-[#1f2c42] focus-within:border-sky-500 dark:focus-within:border-sky-400 focus-within:bg-white dark:focus-within:bg-[#111827] transition-all">
                <button
                  type="button"
                  onClick={() => alert("Upload product technical datasheet or CAD drawing for clause extraction.")}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-[#1f2c42] transition-colors"
                  title="Attach Spec Sheet"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t.askPlaceholder || "Ask a follow-up question regarding sample sizes, marking fee, or laboratory charges..."}
                  className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none py-1.5 font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all shrink-0 cursor-pointer"
                >
                  <span>{isLoading ? (t.retrievingBtn || 'Retrieving...') : (t.sendBtn || 'Send')}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex flex-wrap gap-2">
                <span className="font-semibold text-slate-400 dark:text-slate-500">{t.trySuggestions || 'Try:'}</span>
                <button
                  onClick={() => setInputValue("What are the sample quantity requirements for IS 17803?")}
                  className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  "Sample quantity requirements?"
                </button>
                <span>•</span>
                <button
                  onClick={() => setInputValue("Show accredited test labs in Western Region for IS 17803")}
                  className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
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
          
          {/* Visual Regulatory Badge Card */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1f2c42] shadow-sm relative group bg-slate-900">
            <div className="relative h-28 w-full overflow-hidden">
              <img 
                src="/images/electronics-testing.jpg" 
                alt="BIS Statutory Testing & Verification" 
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-sky-300 px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-400/30">
                  STATUTORY AI DIRECTIVE
                </span>
                <div className="text-xs font-bold text-white mt-1 leading-snug">
                  Verified Against Gazette of India & NABL Network
                </div>
              </div>
            </div>
          </div>

          {/* Grounded Sources Container */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#1f2c42] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1f2c42]">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-800 dark:text-white">
                  {t.regulatorySources || 'Regulatory Sources'}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                {session.answer.sources.length} {t.citedCount || 'Cited'}
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
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-[#1f2c42] hover:border-sky-400 dark:hover:border-sky-500 bg-slate-50/60 dark:bg-[#162032] hover:bg-sky-50/30 dark:hover:bg-[#1c293f] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase text-sky-700 dark:text-sky-400">
                      {src.type}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {src.code}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-1 line-clamp-2">
                    {src.details}
                  </p>
                  <div className="mt-2 text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{src.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Gazette Notice PDF Button */}
            <button
              onClick={() => onOpenPdf({ title: "Gazette Notification S.O. 3192(E)" })}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/80 text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{t.viewFullGazettePdf || 'View Full Gazette Notice (PDF)'}</span>
            </button>

            <div className="text-[10px] text-slate-400 dark:text-slate-400 bg-slate-50 dark:bg-[#162032] p-2.5 rounded-lg border border-slate-200/80 dark:border-[#1f2c42] leading-relaxed">
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
