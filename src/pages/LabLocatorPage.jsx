import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { labsApi } from '../services/api';
import { 
  MapPin, 
  Search, 
  FlaskConical, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  CheckCircle2, 
  Building2, 
  Filter,
  Navigation,
  ExternalLink
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-medium border border-emerald-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>• GEO-INTELLIGENCE // 1,840 ACCREDITED TESTING FACILITIES</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Accredited Testing Laboratories
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600">
          Find NABL-accredited & BIS-recognized testing laboratories for sample evaluation, batch testing, and conformity assessment.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* PIN Code search */}
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:bg-white focus-within:border-emerald-500">
            <MapPin className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit PIN code..."
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
            />
          </div>

          {/* Standard Filter */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <FlaskConical className="w-4 h-4 text-sky-600 mr-2 shrink-0" />
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium"
            >
              <option value="all">All Standards Scope</option>
              <option value="IS 17803:2022">IS 17803:2022 (Vacuum Flasks)</option>
              <option value="IS 13252">IS 13252 (IT Safety)</option>
              <option value="IS 6911:2017">IS 6911:2017 (Stainless Steel)</option>
              <option value="IS 14543:2024">IS 14543:2024 (Drinking Water)</option>
            </select>
          </div>

          {/* State Filter */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Building2 className="w-4 h-4 text-indigo-600 mr-2 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium"
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
            className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-6 group relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Top Bar with Icon & Rating matching Services page rhythm */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-slate-400">
                      NABL ACCREDITED // ISO 17025
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {lab.name}
                    </h2>
                    <div className="text-xs text-slate-500 flex items-center space-x-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{lab.city}, {lab.state} — PIN {lab.pincode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{lab.rating}</span>
                </div>
              </div>

              {/* Accredited Standards Chips - Streamlined to max 2 primary with hover detail */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-400">
                  Accredited Testing Scopes
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {lab.standards.slice(0, 2).map((stdCode, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {stdCode}
                    </span>
                  ))}
                  {lab.standards.length > 2 && (
                    <div className="group/labscope relative">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition-colors">
                        +{lab.standards.length - 2} more scopes
                      </span>
                      {/* Hover Tooltip showing remaining accredited scopes */}
                      <div className="absolute left-0 bottom-full mb-1.5 hidden group-hover/labscope:flex flex-col z-30 w-52 p-2 rounded-xl bg-slate-900 text-white text-[10px] font-mono shadow-xl border border-slate-700 pointer-events-none space-y-1">
                        <div className="text-emerald-400 font-bold">Additional Accredited Scopes:</div>
                        {lab.standards.slice(2).map((extra, eIdx) => (
                          <div key={eIdx} className="text-slate-200">• {extra}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Turnaround & Direct Desk Micro Stats Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-100/70 text-sky-700 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">Turnaround</div>
                    <div className="font-bold text-slate-900">{lab.turnaroundDays}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">Direct Desk</div>
                    <div className="font-semibold text-slate-800 truncate">{lab.contact}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action matching Services rhythm */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-[9px] text-slate-400">
                REF: {lab.id}
              </span>

              <button
                onClick={() => onAskAssistantAboutLab(lab)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-xs"
              >
                <span>Book Slot via AI</span>
                <Navigation className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
