import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Shield, 
  Sparkles, 
  Search, 
  Layers, 
  MapPin, 
  Globe, 
  ChevronDown, 
  CheckCircle, 
  Database, 
  User, 
  LogIn,
  LogOut,
  Zap,
  Lock
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, currentUser, onOpenLogin, onLogout }) => {
  const { lang, setLang, t, availableLanguages } = useLanguage();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t.home, icon: Layers },
    { id: 'assistant', label: t.aiAssistant, icon: Sparkles, badge: 'RAG' },
    { id: 'standards', label: t.standards, icon: Search },
    { id: 'services', label: t.services, icon: Shield },
    { id: 'labs', label: t.labs, icon: MapPin }
  ];

  const languageLabels = {
    EN: 'English (EN)',
    HI: 'हिंदी (HI)',
    TA: 'தமிழ் (TA)',
    TE: 'తెలుగు (TE)',
    MR: 'मराठी (MR)',
    BN: 'বাংলা (BN)'
  };

  const isDemo = !currentUser || currentUser.isDemo;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Gov.in Strip */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center text-sky-400 font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            GOVERNMENT OF INDIA • MINISTRY OF CONSUMER AFFAIRS
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">SIH 2026 Innovation Framework</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {isDemo && (
            <div className="hidden sm:flex items-center space-x-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-semibold">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>LIMITED DEMO ACCESS</span>
            </div>
          )}
          <span className="flex items-center space-x-1.5 text-slate-300 font-mono text-[10px]">
            <Database className="w-3 h-3 text-sky-400" />
            <span>22,482 Active IS</span>
          </span>
          <div className="flex items-center space-x-1 text-emerald-400 text-[10px] font-medium bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Gazette Live</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-700 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  BIS<span className="text-sky-600">ync</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-sky-100 text-sky-800 rounded border border-sky-200 tracking-wider">
                  GOV.IN
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight">
                Bureau of Indian Standards
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold bg-sky-500 text-white rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative group">
              <div className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer transition-colors">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-semibold">{lang}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
              </div>
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  Select Language
                </div>
                {availableLanguages.map((code) => (
                  <button
                    key={code}
                    onClick={() => setLang(code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-sky-50 hover:text-sky-700 transition-colors ${
                      lang === code ? 'font-bold text-sky-700 bg-sky-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{languageLabels[code]}</span>
                    {lang === code && <CheckCircle className="w-3.5 h-3.5 text-sky-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* If Demo / Not Authenticated: Display prominent LOGIN button */}
            {isDemo ? (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 hover:from-sky-700 hover:to-indigo-800 text-white text-xs font-bold flex items-center space-x-2 shadow-md shadow-sky-600/25 transition-all hover:scale-105 active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-sky-200" />
                <span>Login</span>
              </button>
            ) : (
              /* If Authenticated: Display active user profile badge with dropdown */
              <div className="relative">
                <div 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
                    <div className="text-[10px] text-sky-700 font-medium truncate max-w-[130px]">{currentUser.role}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs shadow-sm border border-white">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'U'}
                  </div>
                </div>

                {/* Profile dropdown menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-slide-up">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{currentUser.email || currentUser.role}</div>
                      <span className="inline-block mt-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        FULL STATUTORY ACCESS
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenLogin();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-lg transition-colors flex items-center space-x-2 mt-1"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Switch Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onLogout) onLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center space-x-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out (Enter Demo)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
