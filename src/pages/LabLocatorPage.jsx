import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { labsApi } from '../services/api';
import { 
  MapPin, 
  FlaskConical, 
  Phone, 
  Clock, 
  Star, 
  Building2, 
  Navigation
} from 'lucide-react';

export const LabLocatorPage = ({ onAskAssistantAboutLab }) => {
  const { t } = useLanguage();
  const [labs, setLabs] = useState([]);
  const [pincode, setPincode] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('IS 17803:2022');
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchLabs = async () => {
    setLoading(true);
    try {
      const res = await labsApi.getLabs({
        pincode,
        standard: selectedStandard === 'all' ? '' : selectedStandard,
        state: selectedState
      });
      if (res.success) {
        setLabs(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, [pincode, selectedStandard, selectedState]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/[0.04] text-zinc-700 text-xs font-mono font-medium border border-black/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>GEO-INTELLIGENCE // 1,840 ACCREDITED TESTING FACILITIES</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-zinc-950 tracking-tight">
          Accredited Testing Laboratories
        </h1>
        
        <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
          Find NABL-accredited & BIS-recognized testing laboratories for sample evaluation, batch testing, and conformity assessment.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-4xl mx-auto sketch-card p-4 sm:p-5 rounded-2xl shadow-sketch-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* PIN Code search */}
          <div className="relative flex items-center bg-white/80 border border-zinc-200/90 rounded-xl px-3 py-2 focus-within:border-fuchsia-500 transition-all">
            <MapPin className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit PIN code..."
              className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none font-medium"
            />
          </div>

          {/* Standard Filter */}
          <div className="flex items-center bg-white/80 border border-zinc-200/90 rounded-xl px-3 py-2">
            <FlaskConical className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full bg-transparent text-xs text-zinc-800 focus:outline-none font-medium"
            >
              <option value="all">All Standards Scope</option>
              <option value="IS 17803:2022">IS 17803:2022 (Vacuum Flasks)</option>
              <option value="IS 13252">IS 13252 (IT Safety)</option>
              <option value="IS 6911:2017">IS 6911:2017 (Stainless Steel)</option>
              <option value="IS 14543:2024">IS 14543:2024 (Drinking Water)</option>
            </select>
          </div>

          {/* State Filter */}
          <div className="flex items-center bg-white/80 border border-zinc-200/90 rounded-xl px-3 py-2">
            <Building2 className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-transparent text-xs text-zinc-800 focus:outline-none font-medium"
            >
              <option value="">All States & Regions</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="p-7 rounded-3xl sketch-card transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 hover:shadow-sketch-card"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-semibold text-zinc-400">
                      NABL ACCREDITED // ISO 17025
                    </div>
                    <h2 className="text-xl font-serif font-medium text-zinc-950 group-hover:text-fuchsia-600 transition-colors leading-snug">
                      {lab.name}
                    </h2>
                    <div className="text-xs text-zinc-500 flex items-center space-x-1 mt-1 font-normal">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{lab.city}, {lab.state} — PIN {lab.pincode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{lab.rating}</span>
                </div>
              </div>

              {/* Accredited Standards Chips */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-mono font-semibold text-zinc-400">
                  Accredited Testing Scopes
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {lab.standards.slice(0, 2).map((stdCode, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200"
                    >
                      {stdCode}
                    </span>
                  ))}
                  {lab.standards.length > 2 && (
                    <span className="font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                      +{lab.standards.length - 2} more scopes
                    </span>
                  )}
                </div>
              </div>

              {/* Turnaround & Direct Desk */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-zinc-50/80 rounded-2xl border border-black/[0.04] text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-xl bg-zinc-200/80 text-zinc-800 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">Turnaround</div>
                    <div className="font-bold text-zinc-900">{lab.turnaroundDays}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-xl bg-zinc-200/80 text-zinc-800 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">Direct Desk</div>
                    <div className="font-medium text-zinc-800 truncate">{lab.contact}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs">
              <span className="font-mono text-[9px] text-zinc-400">
                REF: {lab.id}
              </span>

              <button
                onClick={() => onAskAssistantAboutLab(lab)}
                className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white font-medium text-xs flex items-center space-x-1.5 transition-all shadow-2xs"
              >
                <span>Book Slot via AI</span>
                <Navigation className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LabLocatorPage;
