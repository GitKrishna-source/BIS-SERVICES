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
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-medium border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
          <span>• {t.geoIntel || 'GEO-INTELLIGENCE // 1,840 ACCREDITED TESTING FACILITIES'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.labsTitle || 'Accredited Testing Laboratories'}
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {t.labsSubtitle || 'Find NABL-accredited & BIS-recognized testing laboratories for sample evaluation, batch testing, and conformity assessment.'}
        </p>
      </div>

      {/* Featured Laboratory Image Banner Card */}
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1f2c42] shadow-md relative group">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img 
            src="/images/lab-testing-facility.jpg" 
            alt="NABL Accredited Materials and Chemical Testing Laboratory India" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30">
                {t.statutoryTestingEco || 'STATUTORY TESTING ECOSYSTEM'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                {t.labBannerTitle || 'National Laboratory & Conformity Testing Network'}
              </h2>
              <p className="text-xs text-slate-300 hidden sm:block">
                {t.labBannerDesc || 'ISO/IEC 17025 certified physical, chemical, metallurgical & microbiological analysis centers across India.'}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <div>
                <span className="text-emerald-400 font-bold">1,840</span>
                <span className="text-slate-400 text-[10px] ml-1 uppercase">{t.labs || 'LABS'}</span>
              </div>
              <span className="text-slate-600">|</span>
              <div>
                <span className="text-sky-400 font-bold">28</span>
                <span className="text-slate-400 text-[10px] ml-1 uppercase">{t.allStates || 'STATES'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#111827] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-[#1f2c42] shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* PIN Code search */}
          <div className="relative flex items-center bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-[#1f2c42] rounded-xl px-3 py-2 focus-within:bg-white dark:focus-within:bg-[#162032] focus-within:border-emerald-500">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2 shrink-0" />
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder={t.enterPincode || 'Enter 6-digit PIN code...'}
              className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none font-medium"
            />
          </div>

          {/* Standard Filter */}
          <div className="flex items-center bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-[#1f2c42] rounded-xl px-3 py-2">
            <FlaskConical className="w-4 h-4 text-sky-600 dark:text-sky-400 mr-2 shrink-0" />
            <select
              value={selectedStandard}
              onChange={(e) => setSelectedStandard(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
            >
              <option value="all" className="dark:bg-[#111827]">{t.allStandardsScope || 'All Standards Scope'}</option>
              <option value="IS 17803:2022" className="dark:bg-[#111827]">IS 17803:2022 (Vacuum Flasks)</option>
              <option value="IS 13252" className="dark:bg-[#111827]">IS 13252 (IT Safety)</option>
              <option value="IS 6911:2017" className="dark:bg-[#111827]">IS 6911:2017 (Stainless Steel)</option>
              <option value="IS 14543:2024" className="dark:bg-[#111827]">IS 14543:2024 (Drinking Water)</option>
            </select>
          </div>

          {/* State Filter */}
          <div className="flex items-center bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-[#1f2c42] rounded-xl px-3 py-2">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mr-2 shrink-0" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 focus:outline-none font-medium"
            >
              <option value="" className="dark:bg-[#111827]">{t.allStatesRegions || 'All States & Regions'}</option>
              <option value="Uttar Pradesh" className="dark:bg-[#111827]">Uttar Pradesh</option>
              <option value="Maharashtra" className="dark:bg-[#111827]">Maharashtra</option>
              <option value="Karnataka" className="dark:bg-[#111827]">Karnataka</option>
              <option value="Tamil Nadu" className="dark:bg-[#111827]">Tamil Nadu</option>
            </select>
          </div>

        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] hover:border-emerald-300 dark:hover:border-emerald-500 hover:shadow-lg transition-all space-y-4 group"
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  {lab.accreditation}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors mt-1.5">
                  {lab.name}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>{lab.city}, {lab.state} — PIN {lab.pincode}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{lab.rating}</span>
              </div>
            </div>

            {/* Accredited Standards Chips */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-400">
                {t.accreditedScopes || 'Accredited Testing Scopes'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {lab.standards.map((stdCode, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#162032] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1f2c42]"
                  >
                    {stdCode}
                  </span>
                ))}
              </div>
            </div>

            {/* Turnaround & Contact Info */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-[#1f2c42] text-xs">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>{t.turnaround || 'Turnaround:'} <strong className="text-slate-900 dark:text-white">{lab.turnaroundDays}</strong></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{lab.contact}</span>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>{t.nablIsoCert || 'NABL ISO/IEC 17025 Certified'}</span>
              </span>

              <button
                onClick={() => onAskAssistantAboutLab(lab)}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold text-xs flex items-center space-x-1 transition-all cursor-pointer border border-emerald-200 dark:border-emerald-800"
              >
                <span>{t.bookSlotAi || 'Book Slot via AI'}</span>
                <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
