import React from 'react';
import { Shield, CheckCircle2, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-black/[0.06] bg-white/60 backdrop-blur-xl text-zinc-500 text-xs">
      {/* Compliance Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-black/[0.04]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-zinc-700 font-medium">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>BIS Act 2016 Compliant</span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-fuchsia-600" />
            <span>Open Technical Schemas</span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-700 font-medium">
            <Lock className="w-4 h-4 text-purple-600" />
            <span>Integrated e-Governance</span>
          </div>
          <div className="font-mono text-[11px] text-zinc-600 bg-black/[0.04] px-2.5 py-1 rounded-full border border-black/[0.05]">
            STAMP // CERT-SEC-2026
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-zinc-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
                <line x1="12" y1="22" x2="12" y2="9" />
                <line x1="2" y1="9" x2="22" y2="9" />
              </svg>
              <span className="font-bold text-zinc-900 tracking-tight">BISync</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">Regulatory Intelligence & Compliance Assistant</span>
            </div>
            <p className="text-[11px] text-zinc-500 max-w-xl font-normal">
              Official statutory digital instrument compliant with Indian Standard regulations. Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-zinc-950 transition-colors">Statutory Disclaimer</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-950 transition-colors">Compliance Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-950 transition-colors">Audit Records</a>
            <span className="bg-zinc-100 text-zinc-700 border border-zinc-200 px-2.5 py-0.5 rounded-full font-mono text-[10px]">
              v2.4.8-PROD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
