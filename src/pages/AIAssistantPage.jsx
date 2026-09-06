import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  ChevronRight,
  Zap,
  LogIn
} from 'lucide-react';

export const AIAssistantPage = ({ currentUser, onOpenLogin, initialQuery = '', onOpenDrawer, onOpenPdf }) => {
  const { t } = useLanguage();
  const [session, setSession] = useState(sampleRAGSession);
  const [inputValue, setInputValue] = useState(initialQuery || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [strictMode, setStrictMode] = useState(true);
  const [feedback, setFeedback] = useState(null);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Demo Mode Limited Access Banner */}
      {isDemo && (
        <div className="p-3.5 sketch-card rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sketch-card">
          <div className="flex items-center space-x-2.5 text-xs text-zinc-700 font-normal">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
              <Zap className="w-3.5 h-3.5 text-fuchsia-400" />
            </span>
            <span>
              <strong className="font-semibold text-zinc-950">{t('demoBannerPrefix', 'Limited Demo Mode:')}</strong> {demoQueriesLeft} {t('demoBannerRemaining', 'demo queries remaining. Login for full statutory access and certified exports.')}
            </span>
          </div>

          <button
            onClick={onOpenLogin}
            className="px-4 py-1.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all shrink-0"
          >
            <LogIn className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{t('loginToUnlock', 'Login to Unlock')}</span>
          </button>
        </div>
      )}

      {/* Session Header Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-serif font-medium text-zinc-950">
              {t('standardInquirySession', 'Standard Inquiry Session')}
            </h1>
          </div>
          <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
            SESSION #{session.sessionId}
          </span>
        </div>

        {/* Telemetry & Controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Strict Mode Toggle */}
          <button
            onClick={() => setStrictMode(!strictMode)}
            className={`px-3 py-1 rounded-full border font-semibold text-[11px] flex items-center space-x-1.5 transition-all ${
              strictMode
                ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${strictMode ? 'text-fuchsia-400' : 'text-zinc-400'}`} />
            <span>{t('strictGrounding', 'Strict Grounding')}: {strictMode ? t('onText', 'ON') : t('offText', 'OFF')}</span>
          </button>

          {/* Audit Trail Button */}
          <button 
            onClick={() => alert(`Audit Trail Key: SHA-256-${session.sessionId}-VERIFIED`)}
            className="px-3 py-1 rounded-full bg-white/80 border border-zinc-200 hover:bg-white text-zinc-700 font-medium text-[11px] flex items-center space-x-1 shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{t('auditTrail', 'Audit Trail')}</span>
          </button>

          {/* Gazette Sync Pill */}
          <div className="flex items-center space-x-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full font-mono text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Gazette Synced {session.gazetteSync}</span>
          </div>

          <span className="font-mono text-[11px] text-zinc-400 hidden sm:inline">
            ⚡ {session.latency} | Confidence: {session.confidence}
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Conversational Flow */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* User Inquiry Box */}
          <div className="p-6 rounded-3xl sketch-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser && !currentUser.isDemo ? currentUser.name.slice(0, 2).toUpperCase() : 'G'}
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950">
                    {currentUser && !currentUser.isDemo ? currentUser.name : t('guestUser', 'Guest User (Demo Mode)')}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">
                    {currentUser && !currentUser.isDemo ? currentUser.role : 'Public Inquiry Access'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 font-mono">Today at 11:42 AM IST</span>
            </div>

            <p className="text-sm font-semibold text-zinc-900 leading-relaxed pl-1">
              "{session.user.query}"
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-black/[0.04] font-mono text-[10px]">
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/80">
                Category: {session.user.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/80">
                Jurisdiction: {session.user.jurisdiction}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200/80">
                Tariff: {session.user.tariff}
              </span>
            </div>
          </div>

          {/* AI Verified Response Card */}
          <div className="p-7 rounded-3xl sketch-card space-y-6 relative overflow-hidden shadow-sketch-float">
            
            {/* Top Badge & Model Metadata */}
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.05]">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-[10px] font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>{t('verifiedRegulatoryPassages', 'Verified Regulatory Answer')}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-fuchsia-500" />
                <span>Model: {session.answer.model}</span>
              </span>
            </div>

            {/* Answer Title in Editorial Serif */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-serif font-medium text-zinc-950 leading-snug">
                {session.answer.title}
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {session.answer.summary}
              </p>
            </div>

            {/* Applicable National Standard Hero Chip */}
            <div className="p-4 rounded-2xl bg-zinc-50/80 border border-black/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Applicable National Standard
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-bold text-zinc-950">
                      {session.answer.applicableStandard.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                      {session.answer.applicableStandard.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-600 line-clamp-1">
                    {session.answer.applicableStandard.title}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenDrawer(mockStandards[0])}
                className="px-3 py-1.5 rounded-full bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-800 text-xs font-semibold flex items-center space-x-1 shadow-2xs transition-all shrink-0"
              >
                <span>CLAUSE SPEC</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>

            {/* Key Mandatory Test Protocols & Clauses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Key Mandatory Test Protocols & Clauses</span>
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">
                  3 Compliance Vectors Enforced
                </span>
              </div>

              <div className="space-y-2.5">
                {session.answer.clauses.map((clause, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl border border-black/[0.04] bg-white/70 hover:bg-white transition-all shadow-2xs"
                  >
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="font-mono text-xs font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200 shrink-0">
                          {clause.number}
                        </span>
                        <span className="text-xs font-bold text-zinc-950 leading-snug break-words">
                          {clause.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0 whitespace-nowrap self-start sm:self-center">
                        {clause.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed pl-1 font-normal">
                      {clause.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Next Step Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Recommended Next Step</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed font-normal">
                {session.answer.nextStep}
              </p>
            </div>

            {/* Action Bar Footer */}
            <div className="pt-4 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-700 font-medium flex items-center space-x-1 border border-zinc-200 transition-colors shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('copied', 'Copied') : t('copyAnswer', 'Copy')}</span>
                </button>
                <button
                  onClick={() => alert("Dossier saved to active auditor notebook.")}
                  className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-700 font-medium flex items-center space-x-1 border border-zinc-200 transition-colors shadow-2xs"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleExportPDF}
                  className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-700 font-medium flex items-center space-x-1 border border-zinc-200 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('exportDossier', 'Export PDF')}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-zinc-400">Helpful?</span>
                <button
                  onClick={() => setFeedback('up')}
                  className={`p-1.5 rounded-full border transition-colors ${
                    feedback === 'up' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFeedback('down')}
                  className={`p-1.5 rounded-full border transition-colors ${
                    feedback === 'down' ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Input Box */}
          <div className="p-4 rounded-3xl sketch-card shadow-sketch-card space-y-3">
            <form onSubmit={handleSend} className="relative">
              <div className="flex items-center space-x-2 bg-white rounded-2xl p-2 border border-zinc-200/90 focus-within:border-fuchsia-500 transition-all">
                <button
                  type="button"
                  onClick={() => alert("Upload product technical datasheet or CAD drawing for clause extraction.")}
                  className="p-2 text-zinc-400 hover:text-zinc-700 rounded-xl hover:bg-zinc-100 transition-colors"
                  title="Attach Spec Sheet"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('askAssistantPlaceholder', "Ask about IS standards, mandatory QCOs, clause references, or test procedures...")}
                  className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none py-1.5 font-medium"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-black disabled:opacity-50 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all shrink-0"
                >
                  <span>{isLoading ? '...' : t('searchButton', 'Send')}</span>
                  <Send className="w-3.5 h-3.5 text-zinc-400" />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500 pt-1">
              <div className="flex flex-wrap gap-2">
                <span className="font-semibold text-zinc-400">Try:</span>
                <button
                  onClick={() => setInputValue("What are the sample quantity requirements for IS 17803?")}
                  className="text-zinc-700 hover:text-zinc-950 hover:underline"
                >
                  "Sample quantity requirements?"
                </button>
                <span>•</span>
                <button
                  onClick={() => setInputValue("Show accredited test labs in Western Region for IS 17803")}
                  className="text-zinc-700 hover:text-zinc-950 hover:underline"
                >
                  "Accredited test labs in Western Region"
                </button>
              </div>
              <span className="font-mono text-[10px]">Deterministic RAG</span>
            </div>
          </div>

        </div>

        {/* Right Column: Grounded Sources & Telemetry Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Grounded Sources Container */}
          <div className="sketch-card rounded-3xl p-6 shadow-sketch-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-zinc-700" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-800">
                  {t('verifiedCitations', 'Regulatory Sources')}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded-full border border-zinc-200">
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
                  className="p-4 rounded-2xl border border-black/[0.05] bg-white/70 hover:bg-white transition-all cursor-pointer group shadow-2xs hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase text-zinc-500">
                      {src.type}
                    </span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 group-hover:text-fuchsia-600 transition-colors" />
                  </div>
                  <div className="text-xs font-bold text-zinc-950 group-hover:text-fuchsia-600 transition-colors">
                    {src.code}
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug mt-1 line-clamp-2 font-normal">
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
              className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-2xs"
            >
              <FileText className="w-4 h-4 text-zinc-500" />
              <span>{t('viewStandard', 'View Full Gazette Notice (PDF)')}</span>
            </button>

            <div className="text-[10px] text-zinc-400 bg-zinc-50/80 p-2.5 rounded-xl border border-black/[0.04] leading-relaxed">
              All cited standards reflect the latest amendments published in the Gazette of India.
            </div>
          </div>

          {/* Compliance Matrix Telemetry Chart */}
          <TelemetryChart telemetry={session.answer.telemetry} />

        </div>

      </div>

    </div>
  );
};

export default AIAssistantPage;
