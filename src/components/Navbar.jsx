import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ChevronDown,
  CheckCircle2,
  Globe,
  User,
  LogOut,
  Menu,
  X,
  Download,
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
  const t = langCtx?.t || ((k) => k);
  const languageLabels = langCtx?.languageLabels || {
    EN: 'English',
    HI: 'हिंदी',
    TA: 'தமிழ்',
    TE: 'తెలుగు',
    MR: 'मराठी',
    BN: 'বাংলা',
  };

  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [standardsDropdown, setStandardsDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  const langRef = useRef(null);
  const profileRef = useRef(null);
  const standardsRef = useRef(null);
  const servicesRef = useRef(null);

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

  const isDemo = !currentUser || Boolean(currentUser.isDemo);

  const linkClass = (isActive) =>
    `inline-flex items-center gap-1 text-[15px] font-medium tracking-tight transition-colors ${
      isActive ? 'text-zinc-950' : 'text-zinc-800 hover:text-zinc-950'
    }`;

  function selectTab(id) {
    setActiveTab(id);
    setMobileOpen(false);
    setStandardsDropdown(false);
    setServicesDropdown(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-[80px]">

          <div className="flex items-center gap-10 lg:gap-14 min-w-0">
            <button
              type="button"
              onClick={() => selectTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
              aria-label="BISync home"
            >
              <svg
                className="w-7 h-7 text-zinc-900 group-hover:scale-105 transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" fill="currentColor" fillOpacity="0.08" />
                <line x1="12" y1="22" x2="12" y2="9" />
                <line x1="2" y1="9" x2="22" y2="9" />
                <line x1="6" y1="3" x2="10" y2="9" />
                <line x1="18" y1="3" x2="14" y2="9" />
              </svg>
              <span className="text-[17px] font-semibold tracking-tight text-zinc-900">
                BIS<span className="font-medium text-zinc-500">ync</span>
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-7 lg:gap-9">
              <div className="relative" ref={standardsRef}>
                <button
                  type="button"
                  onClick={() => {
                    setStandardsDropdown((prev) => !prev);
                    setServicesDropdown(false);
                  }}
                  className={linkClass(activeTab === 'standards')}
                >
                  <span>{t('standards')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${standardsDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                {standardsDropdown && (
                  <div className="absolute left-0 mt-3 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 z-50 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => selectTab('standards')}
                      className="w-full text-left px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">{t('indianStandardsSearch')}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{t('searchSpecifications')}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectTab('standards')}
                      className="w-full text-left px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">{t('mandatoryQcoOrders')}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{t('compulsoryCertificationLists')}</div>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative" ref={servicesRef}>
                <button
                  type="button"
                  onClick={() => {
                    setServicesDropdown((prev) => !prev);
                    setStandardsDropdown(false);
                  }}
                  className={linkClass(activeTab === 'services')}
                >
                  <span>{t('services')}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                {servicesDropdown && (
                  <div className="absolute left-0 mt-3 w-60 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 z-50 animate-fade-in">
                    <button
                      type="button"
                      onClick={() => selectTab('services')}
                      className="w-full text-left px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">{t('isiMarkCrs')}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{t('productCertificationSchemes')}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectTab('services')}
                      className="w-full text-left px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950 rounded-xl transition-colors"
                    >
                      <div className="font-semibold text-zinc-900">{t('goldHallmarkingHuid')}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{t('purityVerification')}</div>
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => selectTab('assistant')}
                className={linkClass(activeTab === 'assistant')}
              >
                {t('aiAssistant')}
              </button>

              <button
                type="button"
                onClick={() => selectTab('labs')}
                className={linkClass(activeTab === 'labs')}
              >
                {t('labs')}
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <div className="relative hidden sm:block" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 text-zinc-500" />
                <span>{languageLabels[lang] || lang}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] py-1.5 z-50 animate-fade-in">
                  <div className="px-3 py-1 text-[10px] font-semibold text-zinc-400 border-b border-zinc-100 mb-1">
                    {t('selectLanguage')}
                  </div>
                  {Object.keys(languageLabels).map((code) => (
                    <button
                      type="button"
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

            {isDemo ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="hidden sm:inline-flex text-[15px] font-medium text-zinc-800 hover:text-zinc-950 px-3 py-2 transition-colors"
                >
                  {t('signIn')}
                </button>
                <button
                  type="button"
                  onClick={() => selectTab('assistant')}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-[13px] sm:text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <span>{t('getStarted')}</span>
                  <Download className="w-3.5 h-3.5" strokeWidth={2.4} />
                </button>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold text-zinc-900 leading-tight">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 font-medium truncate max-w-[140px]">
                      {currentUser.role}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'U'}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-zinc-100">
                      <div className="text-xs font-bold text-zinc-900">{currentUser.name}</div>
                      <div className="text-[10px] text-zinc-500 truncate">
                        {currentUser.email || currentUser.role}
                      </div>
                      <span className="inline-block mt-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {t('fullStatutoryAccess')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100 rounded-xl transition-colors flex items-center gap-2 mt-1"
                    >
                      <User className="w-3.5 h-3.5" />
                      {t('switchProfile')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t('logOut')}
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-full text-zinc-800 hover:bg-black/[0.05] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-5 flex flex-col gap-1 border-t border-zinc-200/70 pt-3 mt-1 animate-fade-in">
            <button
              type="button"
              onClick={() => selectTab('home')}
              className={`px-3 py-2.5 rounded-xl text-[15px] font-medium text-left ${
                activeTab === 'home' ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {t('home')}
            </button>
            <button
              type="button"
              onClick={() => selectTab('standards')}
              className={`px-3 py-2.5 rounded-xl text-[15px] font-medium text-left ${
                activeTab === 'standards' ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {t('standards')}
            </button>
            <button
              type="button"
              onClick={() => selectTab('services')}
              className={`px-3 py-2.5 rounded-xl text-[15px] font-medium text-left ${
                activeTab === 'services' ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {t('services')}
            </button>
            <button
              type="button"
              onClick={() => selectTab('assistant')}
              className={`px-3 py-2.5 rounded-xl text-[15px] font-medium text-left ${
                activeTab === 'assistant' ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {t('aiAssistant')}
            </button>
            <button
              type="button"
              onClick={() => selectTab('labs')}
              className={`px-3 py-2.5 rounded-xl text-[15px] font-medium text-left ${
                activeTab === 'labs' ? 'bg-zinc-900 text-white' : 'text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {t('labs')}
            </button>

            <div className="pt-3 mt-2 border-t border-zinc-200/70 flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-transparent text-sm font-medium text-zinc-800 rounded-lg p-1"
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
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenLogin();
                  }}
                  className="text-sm font-medium text-zinc-800"
                >
                  {t('signIn')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="text-sm font-medium text-rose-600"
                >
                  {t('logOut')}
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
