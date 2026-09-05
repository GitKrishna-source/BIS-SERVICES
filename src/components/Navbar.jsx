import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Shield,
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
  X
} from 'lucide-react';

/**
 * BISync Navbar
 * ---------------------------------------------------------
 * Drop-in replacement. Accepts the same props as before:
 *   activeTab, setActiveTab, currentUser, onOpenLogin, onLogout
 * All props are optional — if omitted the component runs its
 * own internal demo state so it can be previewed standalone.
 */
export function Navbar({
  activeTab: activeTabProp,
  setActiveTab: setActiveTabProp,
  currentUser: currentUserProp,
  onOpenLogin: onOpenLoginProp,
  onLogout: onLogoutProp,
}) {
  // ---- fallback demo state (only used when no props passed) ----
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

  // Hook into LanguageContext with standalone preview fallback
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
  const [scanDone, setScanDone] = useState(false);
  const [stampKey, setStampKey] = useState(0);

  const langRef = useRef(null);
  const profileRef = useRef(null);

  // one-time verification-scan on mount, then settle
  useEffect(() => {
    const t = setTimeout(() => setScanDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Layers },
    { id: 'assistant', label: 'AI Assistant', icon: Sparkles, badge: 'RAG' },
    { id: 'standards', label: 'Standards', icon: Search },
    { id: 'services', label: 'Services', icon: Shield },
    { id: 'labs', label: 'Lab Network', icon: MapPin },
  ];

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
    setStampKey((k) => k + 1); // re-trigger stamp animation
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <style>{`
        @keyframes bn-scan {
          0%   { transform: rotate(0deg);   opacity: 0.9; }
          85%  { opacity: 0.5; }
          100% { transform: rotate(300deg); opacity: 0; }
        }
        @keyframes bn-stamp {
          0%   { transform: scale(1.5) rotate(-10deg); opacity: 0; }
          45%  { transform: scale(0.85) rotate(4deg);  opacity: 1; }
          70%  { transform: scale(1.08) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes bn-ink {
          0%   { transform: scale(0.3); opacity: 0.45; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes bn-unfurl {
          0%   { transform: scaleY(0.15) rotateX(-20deg); opacity: 0; }
          60%  { transform: scaleY(1.04) rotateX(3deg);   opacity: 1; }
          100% { transform: scaleY(1) rotateX(0deg); }
        }
        @keyframes bn-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.25); }
        }
        .bn-stamp-anim { animation: bn-stamp 0.5s cubic-bezier(.2,.9,.3,1.3) both; }
        .bn-ink-anim   { animation: bn-ink 0.55s ease-out both; }
        .bn-scan-anim  { animation: bn-scan 1.1s ease-out both; }
        .bn-unfurl-anim{ animation: bn-unfurl 0.28s cubic-bezier(.2,.8,.3,1.2) both; transform-origin: top center; }
        .bn-breathe    { animation: bn-breathe 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .bn-stamp-anim, .bn-ink-anim, .bn-scan-anim, .bn-unfurl-anim, .bn-breathe { animation: none !important; }
        }
      `}</style>

      {/* Status strip */}
      <div
        className="relative overflow-hidden text-slate-300 text-[11px] py-1.5 px-4 sm:px-8 flex justify-between items-center"
        style={{
          background: 'linear-gradient(90deg,#0a0f1c,#0e1729 60%,#0a0f1c)',
        }}
      >
        {/* faint security-paper texture, grounded in "official document" motif */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, #7dd3fc 0 1px, transparent 1px 14px)',
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <Radio className="w-3 h-3 text-emerald-400" />
          <span className="text-sky-300 font-medium">
            Government of India — Ministry of Consumer Affairs
          </span>
        </div>

        <div className="relative flex items-center gap-3">
          {isDemo && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-400/10 border border-amber-300/25 text-amber-200 font-medium">
              Exploring in guest mode
            </span>
          )}
          <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400">
            <Database className="w-3 h-3 text-sky-400" />
            22,482 active standards
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 bn-breathe" />
            Gazette live
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — verification scan on mount */}
          <div
            onClick={() => selectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white shadow-md shadow-indigo-900/20 group-hover:-translate-y-0.5 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              {!scanDone && (
                <div
                  className="absolute -inset-1 rounded-xl bn-scan-anim"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0%, rgba(56,189,248,0.9) 12%, transparent 24%)',
                  }}
                />
              )}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </div>
            </div>

            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  BIS<span className="text-blue-700">ync</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 text-slate-600 rounded border border-slate-200 tracking-wide">
                  GOV.IN
                </span>
              </div>
              <span className="text-[10px] text-slate-500">Bureau of Indian Standards</span>
            </div>
          </div>

          {/* Center nav — stamp-seal active indicator */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => selectTab(item.id)}
                  className="relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors"
                >
                  {isActive && (
                    <>
                      <span
                        key={`ink-${stampKey}`}
                        className="absolute inset-0 rounded-lg bn-ink-anim"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(29,78,216,0.35) 0%, transparent 70%)',
                        }}
                      />
                      <span
                        key={`seal-${stampKey}`}
                        className="absolute inset-0 rounded-lg bg-blue-50 border border-blue-200 bn-stamp-anim"
                      />
                    </>
                  )}
                  <span
                    className={`relative flex items-center gap-2 ${
                      isActive ? 'text-blue-800' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                    {item.label}
                    {item.badge && (
                      <span className="ml-0.5 px-1.5 py-0.5 text-[9px] font-bold bg-blue-700 text-white rounded">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {/* Language — unfurl dropdown */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-blue-700" />
                <span className="font-semibold">{lang}</span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 bn-unfurl-anim">
                  <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 border-b border-slate-100 mb-1">
                    Select language
                  </div>
                  {Object.keys(languageLabels).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                        lang === code ? 'font-bold text-blue-700 bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>{languageLabels[code]}</span>
                      {lang === code && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isDemo ? (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-900/20 active:scale-95 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-200" />
                Login
              </button>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 pl-2 border-l border-slate-200"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-blue-700 font-medium truncate max-w-[150px]">
                      {currentUser.role}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center font-bold text-xs border border-white shadow-sm">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'U'}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 bn-unfurl-anim">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {currentUser.email || currentUser.role}
                      </div>
                      <span className="inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Full statutory access
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors flex items-center gap-2 mt-1"
                    >
                      <User className="w-3.5 h-3.5" />
                      Switch profile
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1.5 bn-unfurl-anim border-t border-slate-100 pt-3 mt-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => selectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold bg-blue-700 text-white rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Mobile Language & Action strip */}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-700" />
                <span className="text-xs font-semibold text-slate-700">Lang:</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-lg px-2 py-1"
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
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
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