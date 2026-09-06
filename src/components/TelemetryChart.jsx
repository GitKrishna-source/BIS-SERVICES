import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Activity, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const TelemetryChart = ({ telemetry }) => {
  const { t } = useLanguage();
  if (!telemetry) return null;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#1f2c42] p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1f2c42]">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-800 dark:text-white">
            {t.telemetryTitle || 'Compliance Matrix Telemetry'}
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      {/* Top 2 Stats */}
      <div className="grid grid-cols-2 gap-3">
        {/* Risk Box */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#162032] border border-slate-200/80 dark:border-[#1f2c42]">
          <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400">
            {t.standardRisk || 'Standard Risk'}
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight mt-0.5">
            {telemetry.risk || 'LOW'}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {telemetry.riskSub || 'Tier-1 Product Class'}
          </div>
        </div>

        {/* Testing Span Box */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#162032] border border-slate-200/80 dark:border-[#1f2c42]">
          <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400">
            {t.testingSpan || 'Testing Span'}
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            {telemetry.testingSpan || '14 Days'}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            {telemetry.testingSpanSub || 'Standard lab duration'}
          </div>
        </div>
      </div>

      {/* Interactive SVG Curve Container */}
      <div className="p-4 rounded-xl bg-gradient-to-b from-sky-50/50 to-slate-50 dark:from-[#162032] dark:to-[#111827] border border-sky-100 dark:border-[#1f2c42]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
            {telemetry.curveTitle || 'Thermal Retention Curve (IS 17803)'}
          </span>
          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-semibold">
            {t.passThreshold || 'Pass Threshold'}
          </span>
        </div>

        {/* SVG Graphic */}
        <div className="relative h-24 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#334155" strokeOpacity="0.4" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeOpacity="0.4" strokeDasharray="3 3" />
            
            {/* Threshold Line */}
            <line x1="0" y1="55" x2="300" y2="55" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 2" />
            
            {/* Gradient Fill under curve */}
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            
            {/* Curve path */}
            <path
              d="M 10 15 Q 100 35 200 48 T 290 52 L 290 75 L 10 75 Z"
              fill="url(#curveGradient)"
            />
            <path
              d="M 10 15 Q 100 35 200 48 T 290 52"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Nodes */}
            <circle cx="10" cy="15" r="4" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <circle cx="100" cy="35" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <circle cx="200" cy="48" r="3.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
            <circle cx="290" cy="52" r="5" fill="#10b981" stroke="#0f172a" strokeWidth="2" />
          </svg>
        </div>

        {/* Dynamic X-Axis Data */}
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-[#1f2c42] mt-1">
          {telemetry.points ? (
            telemetry.points.map((pt, i) => (
              <span key={i} className={i === telemetry.points.length - 1 ? 'font-bold text-emerald-600 dark:text-emerald-400' : ''}>
                {pt.hour} ({pt.temp})
              </span>
            ))
          ) : (
            <>
              <span>0h (98.0°C)</span>
              <span>2h (86.4°C)</span>
              <span>4h (73.1°C)</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">6h (64.2°C)</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 dark:text-slate-400">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>{t.nablGrounded || 'Grounded against NABL ISO/IEC 17025 test parameters'}</span>
      </div>
    </div>
  );
};
