import React from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Download, 
  Share2, 
  Calendar, 
  Building2, 
  Layers, 
  FlaskConical, 
  ShieldCheck,
  Bookmark
} from 'lucide-react';

export const StandardDrawer = ({ standard, isOpen, onClose, onOpenPdf, onAskAboutStandard }) => {
  if (!isOpen || !standard) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-slide-in-right">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-bold text-sky-400">{standard.code}</span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded">
                    {standard.status || 'Active Standard'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{standard.ics || 'ICS Technical Schema'}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Title & Description */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2">
                {standard.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {standard.description}
              </p>
            </div>

            {/* Regulatory Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-sky-500" />
                  <span>Enforcement Date</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">{standard.enforcedDate || 'Statutory Immediate'}</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-emerald-500" />
                  <span>Regulatory Body</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1 truncate" title={standard.ministry}>
                  {standard.ministry || 'Bureau of Indian Standards'}
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center space-x-1">
                  <FlaskConical className="w-3 h-3 text-indigo-500" />
                  <span>Testing Facilities</span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {standard.labsCount || 18} NABL Labs
                </div>
              </div>
            </div>

            {/* Mandatory Clauses & Testing Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Key Mandatory Clauses & Test Protocols</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Gazette Verified
                </span>
              </div>

              <div className="space-y-3">
                {standard.clauses && standard.clauses.map((clause, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-colors shadow-sm">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 shrink-0">
                          {clause.number}
                        </span>
                        <span className="text-xs font-bold text-slate-900 leading-snug break-words">
                          {clause.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 shrink-0 whitespace-nowrap self-start sm:self-center">
                        {clause.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pl-1">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conformity Scheme Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                    Applicable Scheme Guidance
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {standard.certificationScheme || 'Scheme-I (ISI Mark) Licensing'}
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Requires factory quality audit, sample drawn by inspecting officer, and continuous batch surveillance testing.
                  </p>
                </div>
                <ShieldCheck className="w-8 h-8 text-sky-600 shrink-0 ml-2" />
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenPdf && onOpenPdf(standard)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>View Full Gazette Notice</span>
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onAskAboutStandard) onAskAboutStandard(standard);
              }}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all"
            >
              <span>Consult AI Assistant</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
