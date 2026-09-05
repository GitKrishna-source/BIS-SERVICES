import React, { useState } from 'react';
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
  Award, 
  FlaskConical, 
  Gem, 
  Bot, 
  ArrowDown, 
  FileText,
  ChevronRight,
  ExternalLink
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
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* Hero Section: Sketch Asymmetrical 2-Column Layout */}
      <section className="relative pt-12 sm:pt-20 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Soft atmospheric ambient glow orbs */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-pink-200/40 via-purple-200/30 to-indigo-200/20 blur-3xl rounded-full pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-purple-200/40 via-violet-200/30 to-blue-200/20 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* 2-Column Hero Grid matching the user's reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Left Column: Huge High-Contrast Editorial Serif Headline */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="slide-up" delay={50} duration={700}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-serif font-medium text-zinc-950 tracking-tight leading-[1.06] mb-4">
                Standards,<br />
                welcome home.
              </h1>
            </ScrollReveal>
          </div>

          {/* Right Column: Lead Text & Hero Glowing Pill CTA */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal animation="slide-up" delay={150} duration={700}>
              <p className="text-base sm:text-lg text-zinc-700 font-normal leading-relaxed">
                BISync is an AI standards toolkit made for manufacturers, engineers, and compliance officers, that puts the focus on regulatory precision, speed, and statutory clarity.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={250} duration={700}>
              <div className="pt-2 flex flex-col items-start gap-3">
                <button
                  onClick={() => onNavigate('assistant')}
                  className="sketch-glow-btn px-6 sm:px-7 py-3.5 text-sm font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <span>Get started for free</span>
                  <span className="font-mono text-xs leading-none">↓</span>
                </button>
                <p className="text-xs text-zinc-500 font-sans tracking-tight">
                  Instant verification • Real-time Gazette updates • 22,482+ Indian Standards
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Floating Announcement Card (Directly from Sketch reference image) */}
        <ScrollReveal animation="slide-up" delay={350} duration={700}>
          <div className="max-w-3xl mx-auto sketch-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sketch-card">
            
            {/* Left preview thumbnail: Mini Gazette Document */}
            <div className="w-full sm:w-44 h-24 sm:h-28 rounded-xl bg-zinc-100/90 border border-zinc-200/80 p-2.5 flex flex-col justify-between shrink-0 shadow-inner overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-1.5">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[9px] font-mono text-zinc-400">IS 17803</span>
              </div>
              <div className="space-y-1 py-1">
                <div className="w-3/4 h-1.5 bg-zinc-300 rounded" />
                <div className="w-1/2 h-1.5 bg-zinc-200 rounded" />
                <div className="w-5/6 h-1.5 bg-zinc-200 rounded" />
              </div>
              <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono">
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">MANDATORY QCO</span>
                <span>v4.2</span>
              </div>
            </div>

            {/* Right announcement text */}
            <div className="text-left space-y-1.5 flex-1">
              <h2 className="text-sm font-bold text-zinc-900 leading-snug">
                New in BISync: Better stacks and expanded QCO compliance support
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Give your team instant tolerance verification, negative gaps, and clause cross-referencing across all Indian Standard gazettes.{' '}
                <button 
                  onClick={() => onNavigate('standards')}
                  className="font-semibold text-zinc-900 underline hover:text-fuchsia-600 transition-colors"
                >
                  Learn more
                </button>
              </p>
            </div>

          </div>
        </ScrollReveal>

        {/* Studio Canvas Dock & Interactive Search Strip */}
        <ScrollReveal animation="slide-up" delay={450} duration={700} className="mt-12 max-w-4xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl sketch-card p-3 sm:p-5 shadow-sketch-float">
            
            {/* App Dock top bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.05]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="text-[11px] font-mono text-zinc-500 ml-2">BISync Studio // Regulatory Canvas</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <span className="hidden sm:inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  22,482 Indexed
                </span>
                <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[10px] font-semibold">
                  100% Grounded
                </span>
              </div>
            </div>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center rounded-2xl bg-white border border-zinc-200/90 focus-within:border-fuchsia-500 focus-within:ring-4 focus-within:ring-fuchsia-500/10 transition-all shadow-xs">
              <div className="pl-4 pr-2 text-zinc-400">
                <Search className="w-4 h-4 text-zinc-600" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchPlaceholder || "Search standards, HS codes, or product certifications..."}
                className="w-full py-3.5 px-2 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none font-medium"
              />
              <div className="pr-2 flex items-center gap-2">
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-100 rounded-md border border-zinc-200">
                  Ctrl K
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <span>{t.searchButton || "Search"}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-400" />
                </button>
              </div>
            </form>

            {/* Prompt suggestion pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {sampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => onStartQuery(query)}
                  className="text-[11px] px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200/80 hover:border-zinc-400 transition-all shadow-2xs flex items-center gap-1.5 font-medium hover:-translate-y-0.5"
                >
                  <span className="text-fuchsia-500">•</span>
                  <span>{query}</span>
                </button>
              ))}
            </div>

          </div>
        </ScrollReveal>

      </section>

      {/* Operational Domains Sliding Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="slide-left" delay={100} duration={600}>
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-950 tracking-tight">
              {t.domainsTitle || "Explore Core Frameworks"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1 font-normal">
              {t.domainsSubtitle || "Direct pathways to standards, product conformity, accredited laboratories, and hallmarking."}
            </p>
          </div>
        </ScrollReveal>

        {/* Sliding Carousel */}
        <ScrollReveal animation="slide-up" delay={200} duration={700}>
          <div className="mt-2">
            <SlidingCarousel 
              items={operationalDomains} 
              onSelectCard={handleDomainSelect}
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Real-time Citation Stream & Verified Regulatory Passages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <ScrollReveal animation="slide-left" delay={150} duration={700} className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-700 bg-black/[0.04] px-3 py-1 rounded-full border border-black/[0.06] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>Direct Regulatory Engine</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-950 leading-tight">
              Verified Direct Regulatory Passages
            </h2>
            
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
              Every response maps deterministically to exact clause numbers, mandatory gazette notifications, and laboratory sampling guidelines. Zero hallucination through grounded RAG embeddings.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 text-xs text-zinc-800 font-medium sketch-card p-3 rounded-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>IS 17803:2022 • Stainless Steel Insulated Containers</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-800 font-medium sketch-card p-3 rounded-2xl">
                <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
                <span>QCO S.O. 3192(E) • Ministry of Commerce & Industry</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-5 py-3 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all hover:translate-x-1"
              >
                <span>Launch Assistant Session</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: Citation Stream */}
          <ScrollReveal animation="slide-right" delay={250} duration={700} className="lg:col-span-7">
            <JsonCitationStream />
          </ScrollReveal>

        </div>
      </section>

      {/* 3-Step Methodology: Ask -> Verify -> Act */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="slide-up" delay={100} duration={600}>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 bg-black/[0.04] px-3 py-1 rounded-full border border-black/[0.06] font-semibold">
              • METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-950 mt-3">
              Workflow: Ask → Verify → Act
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-normal">
              Precision engineering standards queries converted into statutory action paths in three deterministic phases.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 01 */}
          <ScrollReveal animation="slide-up" delay={150} duration={650}>
            <div className="h-full p-7 rounded-3xl sketch-card space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1.5 hover:shadow-sketch-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif text-zinc-900">01</span>
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-zinc-950">Ask</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Submit natural language queries regarding products, HS codes, mandatory QCO lists, chemical composition tolerances, or test schedules.
                </p>
              </div>

              <div className="text-[10px] font-mono text-zinc-600 font-semibold pt-3 border-t border-black/[0.05] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                <span>SEMANTIC EMBEDDING RETRIEVAL</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 02 */}
          <ScrollReveal animation="slide-up" delay={300} duration={650}>
            <div className="h-full p-7 rounded-3xl sketch-card space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1.5 hover:shadow-sketch-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif text-zinc-900">02</span>
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold">
                    <FileCheck className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-zinc-950">Verify</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Inspect source-cited standard extracts, relevant amendments, statutory notifications from DPIIT/MoCA, and accredited testing lab lists.
                </p>
              </div>

              <div className="text-[10px] font-mono text-zinc-600 font-semibold pt-3 border-t border-black/[0.05] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>SOURCE CITATION VALIDATION</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 03 */}
          <ScrollReveal animation="slide-up" delay={450} duration={650}>
            <div className="h-full p-7 rounded-3xl sketch-card space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1.5 hover:shadow-sketch-card">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif text-zinc-900">03</span>
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-serif text-zinc-950">Act</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Generate Manakonline application checklists, initiate STI audits, book test slots at NABL labs, or verify 6-digit HUID authenticity tokens.
                </p>
              </div>

              <div className="text-[10px] font-mono text-zinc-600 font-semibold pt-3 border-t border-black/[0.05] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>REGULATORY ACTION ENGINE</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Call to Action Banner in Sketch Aesthetic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="zoom-in" delay={150} duration={700}>
          <div className="p-10 sm:p-14 rounded-3xl sketch-card text-center relative overflow-hidden shadow-sketch-float">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-900 text-white flex items-center justify-center mb-5 shadow-md">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif text-zinc-950 mb-3">
              Ready to consult the standards repository?
            </h2>
            
            <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto mb-8 font-normal">
              Deploy deep semantic search across the entire Indian Standards gazette with contextual regulatory guidance.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => onNavigate('assistant')}
                className="sketch-glow-btn px-7 py-3.5 text-xs font-semibold flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-fuchsia-300" />
                <span>Ask the BIS Assistant</span>
              </button>
              
              <button
                onClick={() => onNavigate('standards')}
                className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-zinc-800 border border-zinc-200/90 font-semibold text-xs flex items-center gap-2 shadow-xs transition-all hover:border-zinc-400"
              >
                <span>Explore All 22,000+ Standards</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default HomePage;
