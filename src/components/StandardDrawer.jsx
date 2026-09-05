import React from 'react';
import { 
  X, 
  FileText, 
  Calendar, 
  Building2, 
  Layers, 
  FlaskConical, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const StandardDrawer = ({ standard, isOpen, onClose, onOpenPdf, onAskAboutStandard }) => {
  if (!isOpen || !standard) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white/95 backdrop-blur-2xl shadow-sketch-float flex flex-col border-l border-black/[0.08] animate-slide-in-right">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm font-bold text-zinc-950">{standard.code}</span>
                  <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-700 border border-zinc-200 px-2 py-0.5 rounded-full">
                    {standard.status || 'Active Standard'}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{standard.ics || 'ICS Technical Schema'}</div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Title & Description */}
            <div>
              <h2 className="text-2xl font-serif font-medium text-zinc-950 leading-snug mb-3">
                {standard.title}
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50/90 p-4 rounded-2xl border border-black/[0.04]">
                {standard.description}
              </p>
            </div>

            {/* Regulatory Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white rounded-2xl border border-black/[0.06] shadow-2xs">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-zinc-500" />
                  <span>Enforcement Date</span>
                </div>
                <div className="text-xs font-bold text-zinc-900 mt-1">{standard.enforcedDate || 'Statutory Immediate'}</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-black/[0.06] shadow-2xs">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-zinc-500" />
                  <span>Regulatory Body</span>
                </div>
                <div className="text-xs font-bold text-zinc-900 mt-1 truncate" title={standard.ministry}>
                  {standard.ministry || 'Bureau of Indian Standards'}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-black/[0.06] shadow-2xs col-span-2 sm:col-span-1">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center space-x-1">
                  <FlaskConical className="w-3 h-3 text-zinc-500" />
                  <span>Testing Facilities</span>
                </div>
                <div className="text-xs font-bold text-zinc-900 mt-1">
                  {standard.labsCount || 18} NABL Labs
                </div>
              </div>
            </div>

            {/* Mandatory Clauses & Testing Matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Key Mandatory Clauses & Test Protocols</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Gazette Verified
                </span>
              </div>

              <div className="space-y-3">
                {standard.clauses && standard.clauses.map((clause, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-black/[0.05] bg-white hover:border-black/[0.12] transition-colors shadow-2xs">
                    <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <span className="font-mono text-xs font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200 shrink-0">
                          {clause.number}
                        </span>
                        <span className="text-xs font-bold text-zinc-950 leading-snug break-words">
                          {clause.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0 whitespace-nowrap self-start sm:self-center">
                        {clause.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed pl-1 font-normal">
                      {clause.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conformity Scheme Card */}
            <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.05]">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Applicable Scheme Guidance
                  </div>
                  <div className="text-xs font-bold text-zinc-950">
                    {standard.certificationScheme || 'Scheme-I (ISI Mark) Licensing'}
                  </div>
                  <p className="text-[11px] text-zinc-600 font-normal">
                    Requires factory quality audit, sample drawn by inspecting officer, and continuous batch surveillance testing.
                  </p>
                </div>
                <ShieldCheck className="w-7 h-7 text-fuchsia-600 shrink-0 ml-2" />
              </div>
            </div>

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 sm:p-5 bg-white/80 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onOpenPdf && onOpenPdf(standard)}
              className="px-4 py-2 rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-medium flex items-center space-x-1.5 shadow-2xs transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>View Gazette Notice</span>
            </button>

            <button
              onClick={() => {
                onClose();
                if (onAskAboutStandard) onAskAboutStandard(standard);
              }}
              className="sketch-glow-btn px-5 py-2 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
            >
              <span>Consult AI Assistant</span>
              <ExternalLink className="w-3.5 h-3.5 text-fuchsia-300" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StandardDrawer;
