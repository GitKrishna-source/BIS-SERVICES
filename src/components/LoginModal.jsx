import React, { useState } from 'react';
import {
  Shield,
  Sparkles,
  ArrowRight,
  User,
  Lock,
  CheckCircle,
  Building2,
  FlaskConical,
  Award,
  X,
  KeyRound,
  CheckCircle2,
  Globe,
  Zap
} from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [activePersona, setActivePersona] = useState('auditor');
  const [email, setEmail] = useState('v.sharma@bis.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const personas = [
    {
      id: 'auditor',
      title: 'Lead Auditor / Officer',
      name: 'Dr. V. Sharma',
      role: 'Regulatory Affairs • Lead Auditor',
      icon: Award,
      color: 'sky',
      badge: 'OFFICIAL',
      defaultEmail: 'v.sharma@bis.gov.in'
    },
    {
      id: 'manufacturer',
      title: 'Manufacturer / MSME',
      name: 'Rajesh Mittal',
      role: 'MD, Apex Techware India',
      icon: Building2,
      color: 'emerald',
      badge: 'INDUSTRY',
      defaultEmail: 'rajesh@apextech.in'
    },
    {
      id: 'lab',
      title: 'Testing Laboratory',
      name: 'Central Lab Coordinator',
      role: 'NABL ISO/IEC 17025 Assayer',
      icon: FlaskConical,
      color: 'amber',
      badge: 'NABL LAB',
      defaultEmail: 'coord@cl-bis.org'
    }
  ];

  const handlePersonaSelect = (p) => {
    setActivePersona(p.id);
    setEmail(p.defaultEmail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const chosen = personas.find(p => p.id === activePersona);
      onLoginSuccess({
        ...chosen,
        isDemo: false
      });
      onClose();
    }, 500);
  };

  const handleQuickDemo = () => {
    onLoginSuccess({
      isDemo: true,
      name: 'Guest User',
      role: 'Demo Access (Limited)'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md animate-fade-in transition-opacity"
      />

      {/* Main Glass Card Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 animate-slide-up my-auto">

        {/* Top Glowing Header Strip */}
        <div className="relative bg-slate-950 text-white p-6 sm:p-8 overflow-hidden">
          {/* Ambient background blur circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-400 text-xs font-mono font-semibold tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>BIS DIRECTIVE AUTHENTICATION GATEWAY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Wanna get started with <span className="text-sky-400">BISync</span>?
            </h2>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Log in to unlock full statutory access, unbounded AI RAG queries, dossier exports, and laboratory slot booking.
            </p>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#fcfdfe]">

          {/* Persona Selector Strip */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>SELECT STAKEHOLDER PROFILE TO LOGIN:</span>
              <span className="text-[10px] font-mono text-sky-600 font-semibold">Pre-configured Demo Keys</span>
            </label>

            <div className="grid grid-cols-3 gap-2.5">
              {personas.map((p) => {
                const Icon = p.icon;
                const isSelected = activePersona === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePersonaSelect(p)}
                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${isSelected
                        ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-xs ${isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-sky-200/80 text-sky-900' : 'bg-slate-100 text-slate-500'
                        }`}>
                        {p.badge}
                      </span>
                    </div>

                    <div>
                      <div className={`text-xs font-bold ${isSelected ? 'text-sky-900' : 'text-slate-800'}`}>
                        {p.title}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5 font-medium">
                        {p.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Official Gov.in / Business Email</label>
              <div className="relative flex items-center bg-white rounded-xl border border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/10">
                <div className="pl-3.5 text-slate-400">
                  <User className="w-4 h-4 text-sky-600" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. auditor@bis.gov.in"
                  className="w-full py-2.5 px-3 text-xs text-slate-800 bg-transparent focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-700">Security PIN / Password</label>
                <a href="#" className="text-[11px] text-sky-600 hover:underline font-medium">Use OTP instead</a>
              </div>
              <div className="relative flex items-center bg-white rounded-xl border border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/10">
                <div className="pl-3.5 text-slate-400">
                  <Lock className="w-4 h-4 text-sky-600" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-2.5 px-3 text-xs text-slate-800 bg-transparent focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 hover:from-sky-700 hover:to-indigo-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{isLoading ? 'Verifying Credentials...' : 'Sign In & Unlock Full Access'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 font-semibold text-xs flex items-center justify-center space-x-2 transition-all shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                <span>Instant Demo Access (Limited Guest Mode)</span>
              </button>
            </div>
          </form>

          {/* Footer Security Badges */}
          <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>BIS Act 2016 Compliant</span>
            </span>
            <span>256-Bit SSL Encrypted Session</span>
          </div>

        </div>

      </div>
    </div>
  );
};
