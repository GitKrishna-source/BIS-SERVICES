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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-mono font-medium border border-sky-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            <span>• CONFORMITY & ASSURANCE FRAMEWORK</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            BIS Services
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Clear, authoritative guidance on conformity assessment, testing, and consumer standards.
          </p>
        </div>

        {/* Stats Widget */}
        <div className="flex items-center space-x-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <div className="flex items-center space-x-2.5 pr-4 border-r border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-black text-slate-900 leading-tight">21,400+</div>
              <div className="text-[10px] text-slate-500 font-medium">Active Standard Schemas</div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-black text-slate-900 leading-tight">1,840</div>
              <div className="text-[10px] text-slate-500 font-medium">NABL & Assaying Labs</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Refined Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Module 01: Certification */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">
                    MODULE 01 // MANDATORY
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    Certification
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                Scheme I & CRS
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-sky-800">
                Understand BIS certification requirements.
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore Scheme-I (ISI Mark) and CRS schemes, step-by-step application walkthroughs, required factory audit documents, and fee structures.
              </p>
            </div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center font-mono">
              <div>
                <div className="text-[9px] text-slate-400 font-bold uppercase">AVG. TIMELINE</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">30 Days</div>
              </div>
              <div className="border-x border-slate-200">
                <div className="text-[9px] text-slate-400 font-bold uppercase">VALIDITY</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">1-2 Years</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 font-bold uppercase">SURVEILLANCE</div>
                <div className="text-xs font-bold text-emerald-700 mt-0.5">Periodic</div>
              </div>
            </div>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => onOpenDrawer(mockStandards[0])}
              className="font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all"
            >
              <span>Explore Certification Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400">
              REF: BIS-ACT-SCH1
            </span>
          </div>
        </div>

        {/* Module 02: Testing Laboratories */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">
                    MODULE 02 // LAB NETWORK
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Testing Laboratories
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                NABL Network
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800">
                Find relevant testing facilities.
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search certified NABL and BIS laboratories across India by product standard, test scope, proximity, and estimated turnaround times.
              </p>
            </div>

            {/* Interactive Registry Highlight Card */}
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Interactive Registry</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Geographic Lab Index with Pin code lookup
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                • LIVE
              </span>
            </div>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => onNavigate('labs')}
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all"
            >
              <span>Locate Testing Laboratories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400">
              REF: NABL-ISO17025
            </span>
          </div>
        </div>

        {/* Module 03: Hallmarking */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">
                    MODULE 03 // ASSAYING
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Hallmarking
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                HUID System
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-800">
                Understand hallmarking requirements.
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn mandatory gold and silver hallmarking standards, 6-digit HUID authenticity checks, and how to register an assaying center.
              </p>
            </div>

            {/* HUID Verification Simulator Box */}
            <form onSubmit={handleVerifyHuid} className="p-3 bg-amber-50/40 rounded-xl border border-amber-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 text-[11px] flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>6-Digit Alphanumeric Code Verification</span>
                </span>
                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                  Verified
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  maxLength={6}
                  value={huidCode}
                  onChange={(e) => setHuidCode(e.target.value.toUpperCase())}
                  placeholder="e.g. 7A9K2M"
                  className="w-full px-2.5 py-1 text-xs font-mono font-bold text-slate-800 uppercase bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg transition-colors shrink-0"
                >
                  Verify
                </button>
              </div>

              {huidResult && (
                <div className="text-[10px] text-slate-700 bg-white p-2 rounded border border-amber-200 space-y-0.5">
                  <div className="font-bold text-emerald-700">✓ Valid HUID: {huidResult.purity}</div>
                  <div>Jeweler: {huidResult.jeweler}</div>
                </div>
              )}
            </form>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => alert("Redirecting to Official HUID Assaying Portal...")}
              className="font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all"
            >
              <span>View Hallmarking Rules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400">
              REF: IS-1417-AU
            </span>
          </div>
        </div>

        {/* Module 04: Consumer Help */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden">
          <div className="space-y-4">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">
                    MODULE 04 // PUBLIC AUDIT
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Consumer Help
                  </h2>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                Public Grievance
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-indigo-800">
                Get answers to common consumer questions.
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify certified ISI licenses on consumer goods, report substandard or fake certification marks, and file grievances with the BIS Consumer Affairs Department.
              </p>
            </div>

            {/* Consumer Features List */}
            <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>License Validity Status</span>
                </span>
                <span className="font-bold text-sky-700 font-mono text-[11px]">Instant Verification</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Spurious Mark Escalation</span>
                </span>
                <span className="font-bold text-rose-700 font-mono text-[11px]">Priority Dispatch</span>
              </div>
            </div>
          </div>

          {/* Action Link Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => alert("Accessing BIS-CARE Public Grievance portal...")}
              className="font-bold text-indigo-700 hover:text-indigo-800 flex items-center space-x-1 group-hover:translate-x-0.5 transition-all"
            >
              <span>Access Consumer Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[9px] text-slate-400">
              PORTAL: BIS-CARE
            </span>
          </div>
        </div>

      </div>

      {/* Automated Standards Routing AI Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-600/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900">
                Automated Standards Routing
              </h3>
              <span className="px-2 py-0.2 rounded font-mono text-[10px] font-bold bg-sky-200/80 text-sky-900">
                v2.4 AI
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Need personalized help choosing a service? Ask the BIS Assistant anytime for real-time standards routing and scheme matching.
            </p>
          </div>
        </div>

        <button
          onClick={onLaunchAssistant}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-sky-600/20 transition-all shrink-0"
        >
          <span>Launch AI Assistant</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
