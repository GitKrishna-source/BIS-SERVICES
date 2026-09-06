import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockServices, mockStandards } from '../services/mockData';
import { 
  Award, 
  FlaskConical, 
  Gem, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Bot,
  ExternalLink,
  ChevronRight,
  Database,
  Search,
  Building,
  ShieldCheck
} from 'lucide-react';

const iconMap = {
  Award,
  FlaskConical,
  Gem,
  ShieldCheck
};

export const ServicesPage = ({ onNavigate, onOpenDrawer, onLaunchAssistant }) => {
  const { t } = useLanguage();
  const [selectedModule, setSelectedModule] = useState(null);
  const [huidCode, setHuidCode] = useState('');
  const [huidResult, setHuidResult] = useState(null);

  const handleVerifyHuid = (e) => {
    e.preventDefault();
    if (!huidCode.trim()) return;
    // Simulate HUID verification
    setHuidResult({
      valid: true,
      jeweler: "Tanishq Jewellers (Branch #1042)",
      purity: "22K916 (91.6% Pure Gold)",
      articleType: "Gold Bangle / Ornament",
      hallmarkingCenter: "Manak Assaying Centre, New Delhi",
      date: "14-Feb-2025"
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header & Stats Widget Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-[#1f2c42]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium border border-sky-200 dark:border-sky-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400"></span>
            <span>• {t.conformityFramework || 'CONFORMITY & ASSURANCE FRAMEWORK'}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.servicesTitle || 'BIS Services'}
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.servicesSubtitle || 'Clear, authoritative guidance on conformity assessment, testing, and consumer standards.'}
          </p>
        </div>

        {/* Stats Widget */}
        <div className="flex items-center space-x-4 bg-white dark:bg-[#111827] p-3.5 rounded-2xl border border-slate-200 dark:border-[#1f2c42] shadow-sm shrink-0">
          <div className="flex items-center space-x-2.5 pr-4 border-r border-slate-200 dark:border-[#1f2c42]">
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-black text-slate-900 dark:text-white leading-tight">21,400+</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.activeStandardSchemas || 'Active Standard Schemas'}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-black text-slate-900 dark:text-white leading-tight">1,840</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{t.nablAssayingLabs || 'NABL & Assaying Labs'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services & Schemes Image Banner */}
      <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1f2c42] shadow-md relative group">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img 
            src="/images/isi-emblem.jpg" 
            alt="Conformity Assessment & BIS Certification Schemes" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold px-2 py-0.5 rounded bg-sky-950/80 border border-sky-400/30">
                {t.schemesMandatesBanner || 'SCHEMES I - IV & CRS MANDATES'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                {t.schemesBannerTitle || 'Conformity Assessment & Product Certification Pathways'}
              </h2>
              <p className="text-xs text-slate-300 hidden sm:block">
                {t.schemesBannerDesc || 'Authoritative compliance procedures for ISI Mark, Hallmarking (HUID), CRS IT Registration, and FMCS for global imports.'}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <div>
                <span className="text-sky-400 font-bold">SCHEME-I</span>
                <span className="text-slate-400 text-[10px] ml-1">ISI MARK</span>
              </div>
              <span className="text-slate-600">|</span>
              <div>
                <span className="text-amber-400 font-bold">HUID</span>
                <span className="text-slate-400 text-[10px] ml-1">6-DIGIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Refined Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 01: Certification */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] hover:border-sky-300 dark:hover:border-sky-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400">
                    {t.module01Tag || 'MODULE 01 // MANDATORY'}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {t.module01Title || 'Certification'}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                Scheme I & CRS
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-sky-800 dark:text-sky-300">
                {t.module01Subtitle || 'Understand BIS certification requirements.'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.module01Desc || 'Explore Scheme-I (ISI Mark) and CRS schemes, step-by-step application walkthroughs, required factory audit documents, and fee structures.'}
              </p>
            </div>

            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-100 dark:border-[#1f2c42] shadow-inner group/img">
              <img 
                src="/images/isi-emblem.jpg" 
                alt="ISI Mark Certification & Scheme-I Standard" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white/90 font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                STANDARD MARK // SCHEME-I
              </div>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-[#162032] rounded-xl border border-slate-200 dark:border-[#1f2c42] text-center font-mono">
              <div>
                <div className="text-[9px] text-slate-400 dark:text-slate-400 font-bold uppercase">{t.testingSpan || 'AVG. TIMELINE'}</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">30 Days</div>
              </div>
              <div className="border-x border-slate-200 dark:border-[#1f2c42]">
                <div className="text-[9px] text-slate-400 dark:text-slate-400 font-bold uppercase">VALIDITY</div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">1-2 Years</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 dark:text-slate-400 font-bold uppercase">SURVEILLANCE</div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">Periodic</div>
              </div>
            </div>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#1f2c42] flex items-center justify-between text-xs">
            <button 
              onClick={() => onOpenDrawer(mockStandards[0])}
              className="font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
            >
              <span>{t.exploreCertGuidance || 'Explore Certification Guidance'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400 dark:text-slate-400">
              REF: BIS-ACT-SCH1
            </span>
          </div>
        </div>

        {/* Module 02: Testing Laboratories */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] hover:border-emerald-300 dark:hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400">
                    {t.module02Tag || 'MODULE 02 // LAB NETWORK'}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t.module02Title || 'Testing Laboratories'}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                NABL Network
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                {t.module02Subtitle || 'Find relevant testing facilities.'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.module02Desc || 'Search certified NABL and BIS laboratories across India by product standard, test scope, proximity, and estimated turnaround times.'}
              </p>
            </div>

            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-100 dark:border-[#1f2c42] shadow-inner group/img">
              <img 
                src="/images/nabl-lab.jpg" 
                alt="NABL ISO/IEC 17025 Testing Laboratory" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-200 font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                ACCREDITED FACILITY // ISO 17025
              </div>
            </div>

            {/* Interactive Registry Highlight Card */}
            <div className="p-3 bg-emerald-50/50 dark:bg-[#162032] rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.interactiveRegistry || 'Interactive Registry'}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.geographicLabIndex || 'Geographic Lab Index with Pin code lookup'}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                • LIVE
              </span>
            </div>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#1f2c42] flex items-center justify-between text-xs">
            <button 
              onClick={() => onNavigate('labs')}
              className="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
            >
              <span>{t.locateLabsBtn || 'Locate Testing Laboratories'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400 dark:text-slate-400">
              REF: NABL-ISO17025
            </span>
          </div>
        </div>

        {/* Module 03: Hallmarking */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center justify-center">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400">
                    {t.module03Tag || 'MODULE 03 // ASSAYING'}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {t.module03Title || 'Hallmarking'}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                HUID System
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-800 dark:text-amber-300">
                {t.module03Subtitle || 'Understand hallmarking requirements.'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.module03Desc || 'Learn mandatory gold and silver hallmarking standards, 6-digit HUID authenticity checks, and how to register an assaying center.'}
              </p>
            </div>

            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-100 dark:border-[#1f2c42] shadow-inner group/img">
              <img 
                src="/images/gold-hallmark.jpg" 
                alt="Gold Hallmarking & 6-digit HUID Verification" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-amber-200 font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                ASSAYING CENTRE // 6-DIGIT HUID
              </div>
            </div>

            {/* HUID Verification Simulator Box */}
            <form onSubmit={handleVerifyHuid} className="p-3 bg-amber-50/40 dark:bg-[#162032] rounded-xl border border-amber-200 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white text-[11px] flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{t.huidVerificationTitle || '6-Digit Alphanumeric Code Verification'}</span>
                </span>
                <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded font-semibold border border-emerald-200 dark:border-emerald-800">
                  {t.gazetteVerified || 'Verified'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={huidCode}
                  onChange={(e) => setHuidCode(e.target.value.toUpperCase())}
                  placeholder="e.g. 7A9K2M"
                  className="w-full px-2.5 py-1 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 uppercase bg-white dark:bg-[#111827] border border-slate-300 dark:border-[#1f2c42] rounded-lg focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {t.verifyBtn || 'Verify'}
                </button>
              </div>

              {huidResult && (
                <div className="text-[10px] text-slate-700 dark:text-slate-300 bg-white dark:bg-[#111827] p-2 rounded border border-amber-200 dark:border-amber-800/60 space-y-0.5">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400">✓ Valid HUID: {huidResult.purity}</div>
                  <div>Jeweler: {huidResult.jeweler}</div>
                </div>
              )}
            </form>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#1f2c42] flex items-center justify-between text-xs">
            <button 
              onClick={() => alert("Redirecting to Official HUID Assaying Portal...")}
              className="font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
            >
              <span>{t.viewHallmarkingRules || 'View Hallmarking Rules'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400 dark:text-slate-400">
              REF: IS-1417-AU
            </span>
          </div>
        </div>

        {/* Module 04: Consumer Help */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-400">
                    {t.module04Tag || 'MODULE 04 // PUBLIC AUDIT'}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {t.module04Title || 'Consumer Help'}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Public Grievance
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300">
                {t.module04Subtitle || 'Get answers to common consumer questions.'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.module04Desc || 'Verify certified ISI licenses on consumer goods, report substandard or fake certification marks, and file grievances with the BIS Consumer Affairs Department.'}
              </p>
            </div>

            <div className="relative h-32 w-full rounded-xl overflow-hidden border border-slate-100 dark:border-[#1f2c42] shadow-inner group/img">
              <img 
                src="/images/electronics-testing.jpg" 
                alt="Electronics Safety & CRS Conformity Testing" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-indigo-200 font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                PRODUCT SAFETY // MEITY CRS
              </div>
            </div>

            {/* Consumer Features List */}
            <div className="p-3 bg-indigo-50/40 dark:bg-[#162032] rounded-xl border border-indigo-200 dark:border-indigo-800/60 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>{t.licenseValidityStatus || 'License Validity Status'}</span>
                </span>
                <span className="font-bold text-sky-700 dark:text-sky-400 font-mono text-[11px]">{t.instantVerification || 'Instant Verification'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>{t.spuriousMark || 'Spurious Mark Escalation'}</span>
                </span>
                <span className="font-bold text-rose-700 dark:text-rose-400 font-mono text-[11px]">{t.priorityDispatch || 'Priority Dispatch'}</span>
              </div>
            </div>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#1f2c42] flex items-center justify-between text-xs">
            <button 
              onClick={() => alert("Accessing BIS-CARE Public Grievance portal...")}
              className="font-bold text-indigo-700 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
            >
              <span>{t.accessConsumerPortal || 'Access Consumer Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400 dark:text-slate-400">
              PORTAL: BIS-CARE
            </span>
          </div>
        </div>

      </div>

      {/* Automated Standards Routing AI Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 dark:from-[#162032] dark:via-[#111827] dark:to-[#162032] border border-sky-200 dark:border-[#1f2c42] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.autoStandardsRouting || 'Automated Standards Routing'}
              </h3>
              <span className="px-2 py-0.2 rounded font-mono text-[10px] font-bold bg-sky-200/80 dark:bg-sky-950 text-sky-900 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                v2.4 AI
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {t.autoStandardsDesc || 'Need personalized help choosing a service? Ask the BIS Assistant anytime for real-time standards routing and scheme matching.'}
            </p>
          </div>
        </div>

        <button
          onClick={onLaunchAssistant}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all shrink-0 cursor-pointer"
        >
          <span>{t.launchAiAssistant || 'Launch AI Assistant'}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
