import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SlidingCarousel } from '../components/SlidingCarousel';
import { JsonCitationStream } from '../components/JsonCitationStream';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  Building, 
  Award, 
  FlaskConical, 
  Gem,
  ExternalLink,
  Bot,
  Zap,
  Flame,
  Layers,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const HomePage = ({ onNavigate, onStartQuery, onSelectStandard }) => {
  const { t } = useLanguage();
  const [searchInput, setSearchInput] = useState('');

  const sampleQueries = [
    "Does my stainless steel bottle require mandatory ISI mark?",
    "How to apply for Scheme-I certification?",
    "What is the test method for packaged drinking water?",
    "6-digit HUID verification process"
  ];

  const operationalDomains = [
    {
      id: "domain-1",
      badge: "CATALOG",
      title: "Find a Standard",
      description: "Browse 22,000+ Indian Standards with clean semantic search, clause-level breakdowns, and amendment chronologies.",
      cta: "Explore catalog",
      iconName: "BookOpen",
      color: "blue",
      targetTab: "standards"
    },
    {
      id: "domain-2",
      badge: "SCHEMES",
      title: "Certification",
      description: "Clear guidance on ISI marking, CRS, and step-by-step licensing pathways for domestic and foreign makers.",
      cta: "View licensing paths",
      iconName: "Award",
      color: "emerald",
      targetTab: "services"
    },
    {
      id: "domain-3",
      badge: "NABL",
      title: "Testing Laboratories",
      description: "Locate NABL accredited labs and test requirements by sample matrix, parameters, and geographic proximity.",
      cta: "Search laboratories",
      iconName: "FlaskConical",
      color: "amber",
      targetTab: "labs"
    },
    {
      id: "domain-4",
      badge: "HUID",
      title: "Hallmarking",
      description: "Gold and silver purity standards, AHC registration verification, and 6-character alphanumeric HUID validation.",
      cta: "Verify purity codes",
      iconName: "Gem",
      color: "indigo",
      targetTab: "services"
    }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onStartQuery(searchInput);
    }
  };

  const handleDomainSelect = (domain) => {
    if (domain.targetTab) {
      onNavigate(domain.targetTab);
    }
  };

  return (
    <div className="space-y-20 pb-16 overflow-hidden">
      
      {/* Hero Section with Slide-Up Entrance */}
      <section className="relative pt-10 pb-4 text-center max-w-4xl mx-auto px-4">
        
        {/* Floating background ambient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-sky-400/10 via-blue-500/10 to-indigo-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

        <ScrollReveal animation="slide-up" delay={50} duration={600}>
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse"></span>
            <span>• NATIONAL STANDARDS AI DIRECTIVE ENGINE // 24.8 REPOSITORIES ACTIVE</span>
          </div>
        </ScrollReveal>

        {/* Hero Title */}
        <ScrollReveal animation="slide-up" delay={150} duration={700}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none mb-4">
            {t.heroTitlePrefix}{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              {t.heroTitleHighlight}
            </span>
          </h1>
        </ScrollReveal>

        {/* Hero Subtitle */}
        <ScrollReveal animation="slide-up" delay={250} duration={700}>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>
        </ScrollReveal>

        {/* Central Search Input Box */}
        <ScrollReveal animation="zoom-in" delay={350} duration={700}>
          <div className="max-w-2xl mx-auto relative group">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xl rounded-2xl bg-white border-2 border-slate-200 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/15 transition-all">
              <div className="pl-4 pr-2 text-slate-400">
                <Search className="w-5 h-5 text-sky-600" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full py-4 px-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
              />
              <div className="pr-2 flex items-center space-x-2">
                <span className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono text-slate-400 bg-slate-100 rounded border border-slate-200">
                  Ctrl K
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-sky-600/25 transition-all hover:scale-105 active:scale-95"
                >
                  <span>{t.searchButton}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Prompt suggestion pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {sampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => onStartQuery(query)}
                  className="text-[11px] px-3.5 py-1.5 rounded-full bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-slate-200 hover:border-sky-300 transition-all shadow-xs flex items-center space-x-1 font-medium hover:-translate-y-0.5"
                >
                  <span className="text-sky-500">•</span>
                  <span>{query}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Stat badges beneath hero */}
        <ScrollReveal animation="slide-up" delay={450} duration={700}>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-xs font-mono text-slate-500">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>22,418 BIS Standards Indexed</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
              <span>QCO Compliance Matrix v4.2</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sub-Second Citation Engine</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Operational Domains Sliding Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="slide-left" delay={100} duration={600}>
          <div className="mb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.domainsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {t.domainsSubtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* The Sliding Carousel Component */}
        <ScrollReveal animation="slide-up" delay={200} duration={700}>
          <div className="mt-2">
            <SlidingCarousel 
              items={operationalDomains} 
              onSelectCard={handleDomainSelect}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Real-time Citation Stream & Verified Regulatory Passages with Cross-Sliding */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column slides in from Left */}
          <ScrollReveal animation="slide-left" delay={150} duration={700} className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Real-Time Citation Stream</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Verified Direct Regulatory Passages
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every AI response maps deterministically to exact clause numbers, mandatory gazette notifications, and laboratory sampling guidelines. Zero hallucination guaranteed through grounded RAG embeddings.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2.5 text-xs text-slate-700 font-semibold bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>IS 17803:2022 • Stainless Steel Insulated Containers</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-700 font-semibold bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>QCO S.O. 3192(E) • Ministry of Commerce & Industry</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-slate-900/20 transition-all hover:translate-x-1"
              >
                <span>Launch RAG Assistant Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column slides in from Right */}
          <ScrollReveal animation="slide-right" delay={250} duration={700} className="lg:col-span-7">
            <JsonCitationStream />
          </ScrollReveal>

        </div>
      </section>

      {/* 3-Step Methodology: Ask -> Verify -> Act (Staggered Slide-Up Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="slide-up" delay={100} duration={600}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 font-bold">
              • METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Workflow: Ask → Verify → Act
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Precision engineering standards queries converted into statutory action paths in three deterministic phases.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 01 - Slide Up Delay 100ms */}
          <ScrollReveal animation="slide-up" delay={150} duration={650}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all space-y-4 relative group overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-sky-600 font-mono tracking-tight">01</span>
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">Ask</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Submit natural language queries regarding products, HS codes, mandatory QCO lists, chemical composition tolerances, or test schedules.
                </p>
              </div>

              <div className="text-[10px] font-mono text-sky-700 font-bold pt-3 border-t border-slate-100 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                <span>SEMANTIC EMBEDDING RETRIEVAL</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 02 - Slide Up Delay 300ms */}
          <ScrollReveal animation="slide-up" delay={300} duration={650}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-emerald-400 hover:-translate-y-2 transition-all space-y-4 relative group overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-emerald-600 font-mono tracking-tight">02</span>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                    <FileCheck className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Verify</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Inspect source-cited standard extracts, relevant amendments, statutory notifications from DPIIT/MoCA, and accredited testing lab lists.
                </p>
              </div>

              <div className="text-[10px] font-mono text-emerald-700 font-bold pt-3 border-t border-slate-100 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>SOURCE CITATION VALIDATION</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 03 - Slide Up Delay 450ms */}
          <ScrollReveal animation="slide-up" delay={450} duration={650}>
            <div className="h-full p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-2 transition-all space-y-4 relative group overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-indigo-600 font-mono tracking-tight">03</span>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Act</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Generate Manakonline application checklists, initiate STI audits, book test slots at NABL labs, or verify 6-digit HUID authenticity tokens.
                </p>
              </div>

              <div className="text-[10px] font-mono text-indigo-700 font-bold pt-3 border-t border-slate-100 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>REGULATORY ACTION ENGINE</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Call to Action Banner (Zoom-in Slide) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="zoom-in" delay={150} duration={700}>
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border-2 border-sky-200 text-center relative overflow-hidden shadow-lg">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-xl shadow-sky-600/30 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Ready to consult the standards repository?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8 font-medium">
              Deploy deep semantic search across the entire Indian Standards gazette with contextual regulatory guidance.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-sky-600/25 transition-all hover:scale-105"
              >
                <Bot className="w-4 h-4" />
                <span>Ask the BIS Assistant</span>
              </button>
              <button
                onClick={() => onNavigate('standards')}
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center space-x-2 shadow-sm transition-all hover:scale-105"
              >
                <span>Explore All 22,000+ Standards</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};
