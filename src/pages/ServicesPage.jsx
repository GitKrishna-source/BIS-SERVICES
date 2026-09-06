import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockStandards } from '../services/mockData';
import { 
  Award, 
  FlaskConical, 
  Gem, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  Building, 
  ShieldCheck, 
  Database,
  Bot
} from 'lucide-react';

export const ServicesPage = ({ onNavigate, onOpenDrawer, onLaunchAssistant }) => {
  const { t } = useLanguage();
  const [huidCode, setHuidCode] = useState('');
  const [huidResult, setHuidResult] = useState(null);

  const handleVerifyHuid = (e) => {
    e.preventDefault();
    if (!huidCode.trim()) return;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header & Stats Widget Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/[0.04] text-zinc-700 text-xs font-mono font-medium border border-black/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
            <span>{t('servicesTag', 'CONFORMITY & ASSURANCE FRAMEWORK')}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-zinc-950 tracking-tight">
            {t('servicesTitle', 'BIS Services & Certification')}
          </h1>
          
          <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
            {t('servicesDesc', 'Clear, authoritative guidance on conformity assessment, testing, and consumer standards.')}
          </p>
        </div>

        {/* Stats Widget */}
        <div className="flex items-center space-x-4 sketch-card p-3.5 rounded-2xl shrink-0">
          <div className="flex items-center space-x-3 pr-4 border-r border-black/[0.06]">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold text-zinc-950 leading-tight">21,400+</div>
              <div className="text-[10px] text-zinc-500 font-medium">{t('standardSchemas', 'Standard Schemas')}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold text-zinc-950 leading-tight">1,840</div>
              <div className="text-[10px] text-zinc-500 font-medium">{t('assayingLabs', 'Assaying Labs')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Refined Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Module 01: Certification */}
        <div className="p-7 rounded-3xl sketch-card transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 hover:shadow-sketch-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-semibold text-zinc-400">
                    {t('module01Badge', 'MODULE 01 // MANDATORY')}
                  </div>
                  <h2 className="text-xl font-serif font-medium text-zinc-950 group-hover:text-fuchsia-600 transition-colors">
                    {t('module01Title', 'Product Certification')}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {t('module01Scheme', 'Scheme I & CRS')}
              </span>
            </div>

            {/* Module Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xs group-hover:shadow-xs transition-all">
              <img 
                src="/images/certification_isi.jpg" 
                alt="Product Certification" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-900">
                {t('module01Subtitle', 'Understand BIS certification requirements.')}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {t('module01Desc', 'Explore Scheme-I (ISI Mark) and CRS schemes, step-by-step application walkthroughs, required factory audit documents, and fee structures.')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-zinc-50/80 rounded-2xl border border-black/[0.04] text-center font-mono">
              <div>
                <div className="text-[9px] text-zinc-400 font-medium uppercase">{t('avgTimeline', 'AVG. TIMELINE')}</div>
                <div className="text-xs font-bold text-zinc-900 mt-0.5">{t('days30', '30 Days')}</div>
              </div>
              <div className="border-x border-zinc-200/80">
                <div className="text-[9px] text-zinc-400 font-medium uppercase">{t('validity', 'VALIDITY')}</div>
                <div className="text-xs font-bold text-zinc-900 mt-0.5">{t('years12', '1-2 Years')}</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-400 font-medium uppercase">{t('surveillance', 'SURVEILLANCE')}</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">{t('periodic', 'Periodic')}</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
            <button 
              onClick={() => onOpenDrawer(mockStandards[0])}
              className="font-semibold text-zinc-900 hover:text-fuchsia-600 flex items-center space-x-1.5 transition-all"
            >
              <span>{t('exploreCertGuidance', 'Explore Certification Guidance')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-zinc-400">
              REF: BIS-ACT-SCH1
            </span>
          </div>
        </div>

        {/* Module 02: Testing Laboratories */}
        <div className="p-7 rounded-3xl sketch-card transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 hover:shadow-sketch-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-semibold text-zinc-400">
                    {t('module02Badge', 'MODULE 02 // LAB NETWORK')}
                  </div>
                  <h2 className="text-xl font-serif font-medium text-zinc-950 group-hover:text-fuchsia-600 transition-colors">
                    {t('module02Title', 'Testing Laboratories')}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {t('module02Scheme', 'NABL Network')}
              </span>
            </div>

            {/* Module Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xs group-hover:shadow-xs transition-all">
              <img 
                src="/images/testing_laboratory.jpg" 
                alt="Testing Laboratories" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-900">
                {t('module02Subtitle', 'Find relevant testing facilities.')}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {t('module02Desc', 'Search certified NABL and BIS laboratories across India by product standard, test scope, proximity, and estimated turnaround times.')}
              </p>
            </div>

            <div className="p-3 bg-zinc-50/80 rounded-2xl border border-black/[0.04] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-zinc-900 flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-zinc-700" />
                  <span>{t('interactiveRegistry', 'Interactive Registry')}</span>
                </div>
                <div className="text-[11px] text-zinc-500 font-normal">
                  {t('geoLabIndexDesc', 'Geographic Lab Index with Pin code lookup')}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                • {t('liveBadge', 'LIVE')}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
            <button 
              onClick={() => onNavigate('labs')}
              className="font-semibold text-zinc-900 hover:text-fuchsia-600 flex items-center space-x-1.5 transition-all"
            >
              <span>{t('locateLabs', 'Locate Testing Laboratories')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-zinc-400">
              REF: NABL-ISO17025
            </span>
          </div>
        </div>

        {/* Module 03: Hallmarking */}
        <div className="p-7 rounded-3xl sketch-card transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 hover:shadow-sketch-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-semibold text-zinc-400">
                    {t('module03Badge', 'MODULE 03 // ASSAYING')}
                  </div>
                  <h2 className="text-xl font-serif font-medium text-zinc-950 group-hover:text-fuchsia-600 transition-colors">
                    {t('module03Title', 'Hallmarking & Purity')}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {t('module03Scheme', 'HUID System')}
              </span>
            </div>

            {/* Module Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xs group-hover:shadow-xs transition-all">
              <img 
                src="/images/hallmarking_gold.jpg" 
                alt="Hallmarking & Purity" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-900">
                {t('module03Subtitle', 'Understand hallmarking requirements.')}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {t('module03Desc', 'Learn mandatory gold and silver hallmarking standards, 6-digit HUID authenticity checks, and how to register an assaying center.')}
              </p>
            </div>

            <form onSubmit={handleVerifyHuid} className="p-3.5 bg-zinc-50/90 rounded-2xl border border-black/[0.05] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-900 text-[11px] flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-600" />
                  <span>{t('huidVerificationTitle', '6-Digit HUID Code Verification')}</span>
                </span>
                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {t('activeValidator', 'Active Validator')}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={huidCode}
                  onChange={(e) => setHuidCode(e.target.value.toUpperCase())}
                  placeholder={t('huidPlaceholder', "e.g. 7A9K2M")}
                  className="w-full px-3 py-1.5 text-xs font-mono font-bold text-zinc-900 uppercase bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-fuchsia-500"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white font-medium text-xs rounded-xl transition-all shrink-0 shadow-2xs"
                >
                  {t('verify', 'Verify')}
                </button>
              </div>

              {huidResult && (
                <div className="text-[11px] text-zinc-700 bg-white p-2.5 rounded-xl border border-zinc-200 space-y-0.5">
                  <div className="font-bold text-emerald-700">✓ Valid HUID: {huidResult.purity}</div>
                  <div>Jeweler: {huidResult.jeweler}</div>
                </div>
              )}
            </form>
          </div>

          <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
            <button 
              onClick={() => alert("Redirecting to Official HUID Assaying Portal...")}
              className="font-semibold text-zinc-900 hover:text-fuchsia-600 flex items-center space-x-1.5 transition-all"
            >
              <span>{t('viewHallmarkingRules', 'View Hallmarking Rules')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-zinc-400">
              REF: IS-1417-AU
            </span>
          </div>
        </div>

        {/* Module 04: Consumer Help */}
        <div className="p-7 rounded-3xl sketch-card transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 hover:shadow-sketch-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-semibold text-zinc-400">
                    {t('module04Badge', 'MODULE 04 // PUBLIC AUDIT')}
                  </div>
                  <h2 className="text-xl font-serif font-medium text-zinc-950 group-hover:text-fuchsia-600 transition-colors">
                    {t('module04Title', 'Consumer Help & Redressal')}
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {t('module04Scheme', 'Public Grievance')}
              </span>
            </div>

            {/* Module Photo */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xs group-hover:shadow-xs transition-all">
              <img 
                src="/images/consumer_helpdesk.jpg" 
                alt="Consumer Help & Redressal" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-zinc-900">
                {t('module04Subtitle', 'Get answers to common consumer questions.')}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {t('module04Desc', 'Verify certified ISI licenses on consumer goods, report substandard or fake certification marks, and file grievances with the BIS Consumer Affairs Department.')}
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50/90 rounded-2xl border border-black/[0.04] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-zinc-700">{t('licenseValidityStatus', 'License Validity Status')}</span>
                <span className="font-semibold text-zinc-900 font-mono text-[11px]">{t('instantVerification', 'Instant Verification')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-700">{t('spuriousMarkEscalation', 'Spurious Mark Escalation')}</span>
                <span className="font-semibold text-rose-600 font-mono text-[11px]">{t('priorityDispatch', 'Priority Dispatch')}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between text-xs">
            <button 
              onClick={() => alert("Accessing BIS-CARE Public Grievance portal...")}
              className="font-semibold text-zinc-900 hover:text-fuchsia-600 flex items-center space-x-1.5 transition-all"
            >
              <span>{t('accessConsumerPortal', 'Access Consumer Portal')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-zinc-400">
              PORTAL: BIS-CARE
            </span>
          </div>
        </div>

      </div>

      {/* Automated Standards Routing AI Banner */}
      <div className="p-8 sm:p-10 rounded-3xl sketch-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sketch-float">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-fuchsia-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-serif font-medium text-zinc-950">
                {t('automatedRoutingTitle', 'Automated Standards Routing')}
              </h3>
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                v2.4 AI
              </span>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5 font-normal">
              {t('automatedRoutingDesc', 'Need personalized help choosing a service? Ask the BIS Assistant anytime for real-time standards routing and scheme matching.')}
            </p>
          </div>
        </div>

        <button
          onClick={onLaunchAssistant}
          className="sketch-glow-btn px-6 py-3 text-xs font-semibold flex items-center space-x-2 shrink-0"
        >
          <span>{t('launchAiAssistant', 'Launch AI Assistant')}</span>
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-300" />
        </button>
      </div>

    </div>
  );
};

export default ServicesPage;
