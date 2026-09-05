import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  User,
  Lock,
  Building2,
  FlaskConical,
  Award,
  X,
  CheckCircle2,
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
      title: 'Lead Auditor',
      name: 'Dr. V. Sharma',
      role: 'Regulatory Affairs • Lead Auditor',
      icon: Award,
      badge: 'OFFICIAL',
      defaultEmail: 'v.sharma@bis.gov.in'
    },
    {
      id: 'manufacturer',
      title: 'Manufacturer',
      name: 'Rajesh Mittal',
      role: 'MD, Apex Techware India',
      icon: Building2,
      badge: 'INDUSTRY',
      defaultEmail: 'rajesh@apextech.in'
    },
    {
      id: 'lab',
      title: 'Testing Lab',
      name: 'Central Coordinator',
      role: 'NABL ISO/IEC 17025 Assayer',
      icon: FlaskConical,
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
        className="fixed inset-0 bg-black/40 backdrop-blur-md animate-fade-in transition-opacity"
      />

      {/* Main Sketch Glass Modal */}
      <div className="relative w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-sketch-float border border-black/[0.08] overflow-hidden z-10 animate-slide-up my-auto">

        {/* Top Header Strip */}
        <div className="relative p-6 sm:p-8 pb-4 border-b border-black/[0.05]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/[0.04] text-zinc-700 text-xs font-mono font-medium border border-black/[0.06]">
              <Shield className="w-3.5 h-3.5 text-fuchsia-600" />
              <span>AUTHENTICATION GATEWAY</span>
            </div>

            <h2 className="text-3xl font-serif font-medium text-zinc-950 tracking-tight">
              Sign in to BISync
            </h2>

            <p className="text-xs text-zinc-600 max-w-md leading-relaxed font-normal">
              Log in to unlock full statutory access, unbounded AI queries, certified dossier exports, and laboratory bookings.
            </p>
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Persona Selector Strip */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-800 flex items-center justify-between">
              <span>SELECT PROFILE:</span>
              <span className="text-[10px] font-mono text-zinc-500 font-medium">Pre-configured Demo Keys</span>
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
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                        : 'bg-white/80 border-zinc-200/80 hover:bg-zinc-50 text-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-zinc-800 text-fuchsia-400' : 'bg-zinc-100 text-zinc-700'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600'
                      }`}>
                        {p.badge}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {p.title}
                      </div>
                      <div className={`text-[10px] truncate mt-0.5 font-normal ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-500'
                      }`}>
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
              <label className="text-xs font-semibold text-zinc-700">Official Gov.in / Business Email</label>
              <div className="relative flex items-center bg-white rounded-xl border border-zinc-300 focus-within:border-fuchsia-500 focus-within:ring-2 focus-within:ring-fuchsia-500/10 transition-all">
                <div className="pl-3.5 text-zinc-400">
                  <User className="w-4 h-4 text-zinc-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. auditor@bis.gov.in"
                  className="w-full py-2.5 px-3 text-xs text-zinc-800 bg-transparent focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-zinc-700">Password</label>
                <a href="#" className="text-[11px] text-zinc-500 hover:text-zinc-950 font-medium">Use OTP instead</a>
              </div>
              <div className="relative flex items-center bg-white rounded-xl border border-zinc-300 focus-within:border-fuchsia-500 focus-within:ring-2 focus-within:ring-fuchsia-500/10 transition-all">
                <div className="pl-3.5 text-zinc-400">
                  <Lock className="w-4 h-4 text-zinc-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full py-2.5 px-3 text-xs text-zinc-800 bg-transparent focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Submit Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="sketch-glow-btn w-full py-3.5 px-4 text-xs font-semibold flex items-center justify-center space-x-2"
              >
                <span>{isLoading ? 'Verifying Credentials...' : 'Sign In & Unlock Full Access'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleQuickDemo}
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 border border-zinc-200 font-medium text-xs flex items-center justify-center space-x-2 transition-all shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-zinc-400" />
                <span>Instant Demo Access (Guest Mode)</span>
              </button>
            </div>
          </form>

          {/* Footer Security Badges */}
          <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-[10px] text-zinc-400 font-mono">
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

export default LoginModal;
