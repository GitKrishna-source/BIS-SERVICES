import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, ExternalLink, CheckCircle2, Lock, FileText } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      {/* Compliance Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-300 font-medium">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{t.bisActCompliant || 'BIS Act 2016 Compliant'}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span>{t.openSchemas || 'Open Technical Schemas'}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 font-medium">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>{t.integratedGov || 'Integrated e-Governance'}</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            STAMP // CERT-SEC-2026
          </div>
        </div>
      </div>

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-700 inline-flex items-center">
                <img 
                  src="/images/bisync-logo.png" 
                  alt="BISync - Standards, Sync'd, Simplified" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              <span className="px-1.5 py-0.5 text-[9px] font-bold bg-sky-950 text-sky-300 rounded border border-sky-800 tracking-wider font-mono">
                GOV.IN
              </span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              {t.footerDesc || 'Official statutory digital instrument compliant with Indian Standard regulations. Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-sky-400 transition-colors">{t.statutoryDisclaimer || 'Statutory Disclaimer'}</a>
            <span>•</span>
            <a href="#" className="hover:text-sky-400 transition-colors">{t.compliancePolicy || 'Compliance Policy'}</a>
            <span>•</span>
            <a href="#" className="hover:text-sky-400 transition-colors">{t.auditRecords || 'Audit Records'}</a>
            <span className="bg-sky-950 text-sky-400 border border-sky-800/50 px-2 py-0.5 rounded font-mono text-[10px]">
              v2.4.8-PROD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
