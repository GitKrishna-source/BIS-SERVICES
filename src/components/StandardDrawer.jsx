import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  FileText, 
  Calendar, 
  Building2, 
  Layers, 
  FlaskConical, 
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  CircleAlert,
  RotateCcw
} from 'lucide-react';

export const StandardDrawer = ({ standard, isOpen, onClose, onOpenPdf, onAskAboutStandard }) => {
  const { t } = useLanguage();
  const [showReadinessCheck, setShowReadinessCheck] = useState(false);
  const [readiness, setReadiness] = useState({
    testingFacility: true,
    materialCertificates: true,
    personnelRegistration: false
  });
  if (!isOpen || !standard) return null;

  const readinessChecks = [
    {
      key: 'testingFacility',
      label: 'In-house testing facility calibrated under Cl. 8.2?',
      action: 'Schedule calibration and retain the current certificate, scope and traceability records.'
    },
    {
      key: 'materialCertificates',
      label: 'Raw material test certificates maintained per batch?',
      action: 'Create a batch-wise certificate register linking incoming material lots to production records.'
    },
    {
      key: 'personnelRegistration',
      label: 'Quality control personnel registered on Manakonline?',
      action: 'Verify the nominated QC contact and complete the Manakonline registration before inspection.'
    }
  ];
  const readinessScore = 25 + readinessChecks.reduce((score, check) => score + (readiness[check.key] ? 20 : 0), 0);
  const readinessTier = readinessScore >= 80
    ? { label: 'Tier 1 Risk: Low', tone: 'emerald' }
    : readinessScore >= 60
      ? { label: 'Tier 2 Risk: Moderate', tone: 'amber' }
      : { label: 'Tier 3 Risk: High', tone: 'rose' };
  const failedChecks = readinessChecks.filter(check => !readiness[check.key]);
  const gaugeStyle = {
    background: `conic-gradient(#d946ef ${readinessScore * 3.6}deg, #e4e4e7 0deg)`
  };

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
                    {standard.status || t('activeSchemas', 'Active Standard')}
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
                  <span>{t('enforcedDate', 'Enforcement Date')}</span>
                </div>
                <div className="text-xs font-bold text-zinc-900 mt-1">{standard.enforcedDate || 'Statutory Immediate'}</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-black/[0.06] shadow-2xs">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-zinc-500" />
                  <span>{t('subTag', 'Regulatory Body')}</span>
                </div>
                <div className="text-xs font-bold text-zinc-900 mt-1 truncate" title={standard.ministry}>
                  {standard.ministry || t('subTag', 'Bureau of Indian Standards')}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-black/[0.06] shadow-2xs col-span-2 sm:col-span-1">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center space-x-1">
                  <FlaskConical className="w-3 h-3 text-zinc-500" />
                  <span>{t('labs', 'Testing Facilities')}</span>
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
                      <span className="text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 shrink-0 whitespace-nowrap self-start sm:self-center">
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

            {showReadinessCheck && (
              <section className="rounded-3xl border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-white to-zinc-50 p-5 shadow-2xs" aria-labelledby="readiness-title">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="w-4 h-4 text-fuchsia-600" />
                      <h3 id="readiness-title" className="text-sm font-bold text-zinc-950">Pre-Audit Readiness Check</h3>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">A quick self-assessment, not a substitute for the BIS inspection or statutory audit.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReadiness({ testingFacility: true, materialCertificates: true, personnelRegistration: false })}
                    className="text-[10px] font-semibold text-zinc-500 hover:text-zinc-950 flex items-center gap-1 shrink-0"
                    aria-label="Reset readiness answers"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="grid sm:grid-cols-[auto_1fr] gap-5 items-center mb-5">
                  <div className="relative w-28 h-28 rounded-full p-2 shrink-0" style={gaugeStyle} aria-label={`${readinessScore}% audit ready`}>
                    <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border border-white">
                      <span className="text-2xl font-bold text-zinc-950 leading-none">{readinessScore}%</span>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 mt-1">Audit Ready</span>
                    </div>
                  </div>
                  <div>
                    <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border ${readinessTier.tone === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : readinessTier.tone === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                      {readinessTier.tone === 'emerald' ? <CheckCircle2 className="w-3 h-3" /> : <CircleAlert className="w-3 h-3" />}
                      {readinessTier.label}
                    </div>
                    <p className="text-[11px] text-zinc-600 mt-2 leading-relaxed">Based on three high-signal factory readiness controls for {standard.code}.</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {readinessChecks.map(check => (
                    <div key={check.key} className="flex items-center justify-between gap-3 rounded-2xl bg-white/80 border border-black/[0.06] p-3">
                      <span className="text-[11px] font-medium text-zinc-800 leading-snug">{check.label}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={readiness[check.key]}
                        onClick={() => setReadiness(current => ({ ...current, [check.key]: !current[check.key] }))}
                        className={`relative w-12 h-6 rounded-full shrink-0 transition-colors ${readiness[check.key] ? 'bg-emerald-500' : 'bg-zinc-300'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${readiness[check.key] ? 'translate-x-7' : 'translate-x-1'}`} />
                        <span className="sr-only">{readiness[check.key] ? 'Yes' : 'No'}</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-fuchsia-100">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">Recommended corrective actions</div>
                  {failedChecks.length === 0 ? (
                    <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Keep evidence current and rehearse the inspection trail.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {failedChecks.map(check => <li key={check.key} className="text-[11px] text-zinc-600 leading-relaxed flex gap-2"><span className="text-fuchsia-600">•</span>{check.action}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            )}

          </div>

          {/* Drawer Footer Actions */}
          <div className="p-4 sm:p-5 bg-white/80 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowReadinessCheck(current => !current)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold flex items-center space-x-1.5 shadow-2xs transition-all ${showReadinessCheck ? 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-800' : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-800'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>{showReadinessCheck ? 'Hide Readiness Check' : 'Run Pre-Audit Readiness Check'}</span>
            </button>
            <button
              onClick={() => onOpenPdf && onOpenPdf(standard)}
              className="px-4 py-2 rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 text-xs font-medium flex items-center space-x-1.5 shadow-2xs transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>{t('viewStandard', 'View Gazette Notice')}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                if (onAskAboutStandard) onAskAboutStandard(standard);
              }}
              className="sketch-glow-btn px-5 py-2 text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
            >
              <span>{t('askBisAssistant', 'Consult AI Assistant')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-fuchsia-300" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StandardDrawer;
