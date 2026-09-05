import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Search,
  Layers,
  MapPin,
  Globe,
  ChevronDown,
  CheckCircle2,
  Database,
  User,
  LogIn,
  LogOut,
  Radio,
  Menu,
  X,
  Shield,
  ArrowDown
} from 'lucide-react';

export function Navbar({
  activeTab: activeTabProp,
  setActiveTab: setActiveTabProp,
  currentUser: currentUserProp,
  onOpenLogin: onOpenLoginProp,
  onLogout: onLogoutProp,
}) {
  const [internalTab, setInternalTab] = useState('home');
  const [demoUser, setDemoUser] = useState(null);

  const activeTab = activeTabProp ?? internalTab;
  const setActiveTab = setActiveTabProp ?? setInternalTab;
  const currentUser = currentUserProp ?? demoUser;
  const onOpenLogin =
    onOpenLoginProp ??
    (() =>
      setDemoUser({
        name: 'Dr. V. Sharma',
        role: 'Regulatory Affairs • Lead Auditor',
        email: 'v.sharma@bis.gov.in',
      }));
  const onLogout = onLogoutProp ?? (() => setDemoUser(null));

  let langCtx = null;
  try {
    langCtx = useLanguage();
  } catch {
    // Standalone fallback
  }

  const [internalLang, setInternalLang] = useState('EN');
  const lang = langCtx?.lang ?? internalLang;
  const setLang = langCtx?.setLang ?? setInternalLang;

  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [standardsDropdown, setStandardsDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const langRef = useRef(null);
  const profileRef = useRef(null);
  const standardsRef = useRef(null);
  const servicesRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (standardsRef.current && !standardsRef.current.contains(e.target)) setStandardsDropdown(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target)) setServicesDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const languageLabels = {
    EN: 'English',
    HI: 'हिंदी',
    TA: 'தமிழ்',
    TE: 'తెలుగు',
    MR: 'मराठी',
    BN: 'বাংলা',
  };

  const isDemo = !currentUser || Boolean(currentUser.isDemo);

  function selectTab(id) {
    setActiveTab(id);
    setMobileOpen(false);
    setStandardsDropdown(false);
    setServicesDropdown(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-xl border-b border-black/[0.06] transition-all">
      {/* Micro ticker top bar */}
      <div className="bg-zinc-900/[0.03] text-zinc-500 text-[11px] py-1 px-4 sm:px-8 border-b border-black/[0.03] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-zinc-600">
            Govt. of India • Ministry of Consumer Affairs
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-zinc-500">
            <Database className="w-3 h-3 text-fuchsia-600" />
            22,482 Active Standards
          </span>
          <span className="text-zinc-600 font-medium">
            Gazette Feed Live
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          
          {/* Logo with iconic Sketch-style diamond symbol */}
          <div className="flex items-center gap-8">
            <div
              onClick={() => selectTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="text-zinc-900 group-hover:scale-105 transition-transform duration-200">
                {/* Clean geometric diamond polygon */}
                <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" fill="currentColor" fillOpacity="0.08" />
                  <line x1="12" y1="22" x2="12" y2="9" />
                  <line x1="2" y1="9" x2="22" y2="9" />
                  <line x1="6" y1="3" x2="10" y2="9" />
                  <line x1="18" y1="3" x2="14" y2="9" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                  BIS<span className="font-medium text-zinc-500">ync</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 sm:gap-2">
              
              {/* Standards Dropdown */}
              <div className="relative" ref={standardsRef}>
                <button
                  onClick={() => {
                    setStandardsDropdown(prev => !prev);
                    setServicesDropdown(false);
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    activeTab === 'standards' 
                      ? 'text-zinc-950 bg-black/[0.05]' 
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.03]'
                  }`}
                >
                  <span>Standards</span>
                  <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${standardsDropdown ? 'rotate-180' : ''}`} />
                </button>
                {standardsDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 z-50 animate-fade-in">
                    <button
                      onClick={() => selectTab('standards')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-zinc-900">Indian Standards Search</div>
                        <div className="text-[10px] text-zinc-500">Search 22,000+ specifications</div>
                      </div>
                    </button>
                    <button
                      onClick={() => selectTab('standards')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">Mandatory QCO Orders</div>
                      <div className="text-[10px] text-zinc-500">Compulsory certification lists</div>
                    </button>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => {
                    setServicesDropdown(prev => !prev);
                    setStandardsDropdown(false);
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                    activeTab === 'services' 
                      ? 'text-zinc-950 bg-black/[0.05]' 
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.03]'
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
                </button>
                {servicesDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 z-50 animate-fade-in">
                    <button
                      onClick={() => selectTab('services')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">ISI Mark & CRS</div>
                      <div className="text-[10px] text-zinc-500">Product certification schemes</div>
                    </button>
                    <button
                      onClick={() => selectTab('services')}
                      className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">Gold Hallmarking (HUID)</div>
                      <div className="text-[10px] text-zinc-500">6-character purity verification</div>
                    </button>
                  </div>
                )}
              </div>

              {/* AI Assistant */}
              <button
                onClick={() => selectTab('assistant')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  activeTab === 'assistant' 
                    ? 'text-zinc-950 bg-black/[0.05]' 
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.03]'
                }`}
              >
                <span>AI Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
              </button>

              {/* Lab Network */}
              <button
                onClick={() => selectTab('labs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-colors ${
                  activeTab === 'labs' 
                    ? 'text-zinc-950 bg-black/[0.05]' 
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-black/[0.03]'
                }`}
              >
                <span>Lab Network</span>
              </button>

            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-black/[0.03] rounded-full transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-semibold text-zinc-700">{lang}</span>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] py-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] font-semibold text-zinc-400 border-b border-zinc-100 mb-1">
                    Select Language
                  </div>
                  {Object.keys(languageLabels).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-zinc-100 transition-colors ${
                        lang === code ? 'font-bold text-zinc-950 bg-zinc-100/60' : 'text-zinc-700'
                      }`}
                    >
                      <span>{languageLabels[code]}</span>
                      {lang === code && <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sign in or Profile */}
            {isDemo ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 px-2.5 py-1.5 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => selectTab('assistant')}
                  className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <span>Get started</span>
                  <span className="text-zinc-400 font-mono text-[11px] leading-none">↓</span>
                </button>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(o => !o)}
                  className="flex items-center gap-2 pl-2 border-l border-zinc-200"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-zinc-900 leading-tight">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium truncate max-w-[140px]">
                      {currentUser.role}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'U'}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-zinc-100">
                      <div className="text-xs font-bold text-zinc-900">{currentUser.name}</div>
                      <div className="text-[10px] text-zinc-500 truncate">
                        {currentUser.email || currentUser.role}
                      </div>
                      <span className="inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Full statutory access
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100 rounded-xl transition-colors flex items-center gap-2 mt-1"
                    >
                      <User className="w-3.5 h-3.5" />
                      Switch profile
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-full text-zinc-700 hover:bg-black/[0.05] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1 border-t border-zinc-100 pt-3 mt-1 animate-fade-in">
            <button
              onClick={() => selectTab('home')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-left ${
                activeTab === 'home' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => selectTab('standards')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-left ${
                activeTab === 'standards' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              Standards Catalog & QCO
            </button>
            <button
              onClick={() => selectTab('services')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-left ${
                activeTab === 'services' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              Certification & Services
            </button>
            <button
              onClick={() => selectTab('assistant')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-left ${
                activeTab === 'assistant' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              AI Assistant
            </button>
            <button
              onClick={() => selectTab('labs')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-left ${
                activeTab === 'labs' ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              Testing Laboratories
            </button>

            {/* Mobile language & auth */}
            <div className="pt-3 mt-2 border-t border-zinc-100 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-zinc-800 rounded-lg p-1"
                >
                  {Object.keys(languageLabels).map((code) => (
                    <option key={code} value={code}>
                      {languageLabels[code]} ({code})
                    </option>
                  ))}
                </select>
              </div>

              {isDemo ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenLogin();
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-rose-200 text-rose-600 text-xs font-semibold"
                >
                  Log Out
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;