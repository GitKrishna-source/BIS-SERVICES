import React from 'react';
import { Activity, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const TelemetryChart = ({ telemetry }) => {
  if (!telemetry) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-sky-600" />
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-800">
            Compliance Matrix Telemetry
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>

      {/* Top 2 Stats */}
      <div className="grid grid-cols-2 gap-3">
        {/* Risk Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-400">
            Standard Risk
          </div>
          <div className="text-xl font-black text-emerald-600 tracking-tight mt-0.5">
            {telemetry.risk || 'LOW'}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            {telemetry.riskSub || 'Tier-1 Product Class'}
          </div>
        </div>

        {/* Testing Span Box */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[10px] uppercase font-bold text-slate-400">
            Testing Span
          </div>
          <div className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            {telemetry.testingSpan || '14 Days'}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            {telemetry.testingSpanSub || 'Standard lab duration'}
          </div>
        </div>
      </div>

      {/* Interactive SVG Curve Container */}
      <div className="p-4 rounded-xl bg-gradient-to-b from-sky-50/50 to-slate-50 border border-sky-100">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-slate-800 text-[11px]">
            {telemetry.curveTitle || 'Thermal Retention Curve (IS 17803)'}
          </span>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded font-semibold">
            Pass Threshold
          </span>
        </div>

        {/* SVG Graphic */}
        <div className="relative h-24 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="#e2e8f0" strokeDasharray="3 3" />
            
            {/* Threshold Line */}
            <line x1="0" y1="55" x2="300" y2="55" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 2" />
            
            {/* Gradient Fill under curve */}
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
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
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Nodes */}
            <circle cx="10" cy="15" r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <circle cx="100" cy="35" r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <circle cx="200" cy="48" r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <circle cx="290" cy="52" r="5" fill="#059669" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>

        {/* Dynamic X-Axis Data */}
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200/60 mt-1">
          {telemetry.points ? (
            telemetry.points.map((pt, i) => (
              <span key={i} className={i === telemetry.points.length - 1 ? 'font-bold text-emerald-700' : ''}>
                {pt.hour} ({pt.temp})
              </span>
            ))
          ) : (
            <>
              <span>0h (98.0°C)</span>
              <span>2h (86.4°C)</span>
              <span>4h (73.1°C)</span>
              <span className="font-bold text-emerald-700">6h (64.2°C)</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span>Grounded against NABL ISO/IEC 17025 test parameters</span>
      </div>
    </div>
  );
};
