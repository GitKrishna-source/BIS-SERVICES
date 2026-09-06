import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { standardsApi } from '../services/api';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  FileText, 
  ChevronRight, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const StandardsSearchPage = ({ onSelectStandard, onConsultAssistant }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('Stainless Steel');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [qcoOnly, setQcoOnly] = useState(false);
  const [standards, setStandards] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');

  const categories = useMemo(() => [
    { id: 'all', label: t.allCategories || 'All Categories' },
    { id: 'qco', label: t.mandatoryQco || 'Mandatory QCO', isQcoFlag: true },
    { id: 'electronics', label: t.electronics || 'Electronics & IT' },
    { id: 'consumer', label: t.consumerGoods || 'Consumer Goods' },
    { id: 'food', label: t.foodAgri || 'Food & Agriculture' }
  ], [t]);

  const fetchStandards = async () => {
    setLoading(true);
    try {
      const res = await standardsApi.searchStandards({
        query: searchQuery,
        category: selectedCategory === 'qco' ? 'all' : selectedCategory,
        qcoOnly: selectedCategory === 'qco' || qcoOnly,
        page: currentPage,
        limit: 10
      });
      if (res.success) {
        setStandards(res.data);
        setTotalCount(res.total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, [searchQuery, selectedCategory, qcoOnly, currentPage]);

  const handleCategoryClick = (cat) => {
    if (cat.isQcoFlag) {
      setSelectedCategory('qco');
      setQcoOnly(true);
    } else {
      setSelectedCategory(cat.id);
      setQcoOnly(false);
    }
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-mono font-medium border border-sky-200 dark:border-sky-800 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400"></span>
          <span>• {t.standardsRepoTag || 'NATIONAL STANDARDS REPOSITORY • 22,482 ACTIVE IS'}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.standardsTitle || 'Indian Standards Search'}
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {t.standardsSubtitle || 'Verified regulatory guidelines, quality control orders (QCO), and technical specifications issued by the Bureau of Indian Standards.'}
        </p>
      </div>

      {/* Featured Standards Repository Image Banner */}
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1f2c42] shadow-md relative group">
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
          <img 
            src="/images/standards-catalog.jpg" 
            alt="Bureau of Indian Standards Technical Documentation Archives" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold px-2 py-0.5 rounded bg-sky-950/70 border border-sky-500/30">
                {t.schemeMandates || 'SCHEME-I & QCO MANDATES'}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                {t.specMandatoryBannerTitle || 'Standard Specifications & Mandatory Quality Orders'}
              </h2>
              <p className="text-xs text-slate-300 hidden sm:block">
                {t.specMandatoryBannerDesc || 'Clause-level compliance schemas, gazette notifications, and chemical/mechanical test criteria.'}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <div>
                <span className="text-sky-400 font-bold">22,482</span>
                <span className="text-slate-400 text-[10px] ml-1 uppercase">{t.standards || 'STANDARDS'}</span>
              </div>
              <span className="text-slate-600">|</span>
              <div>
                <span className="text-emerald-400 font-bold">750+</span>
                <span className="text-slate-400 text-[10px] ml-1 uppercase">{t.mandatoryQco || 'QCO ORDERS'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filter Strip */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative flex items-center shadow-md rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/20 transition-all">
          <div className="pl-4 pr-2 text-slate-400 dark:text-slate-400">
            <Search className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchStandardsPlaceholder || 'Search by IS number, product title, material or ICS code...'}
            className="w-full py-3.5 px-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent focus:outline-none font-medium"
          />
          <div className="pr-2">
            <button
              onClick={fetchStandards}
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>{t.searchButton || 'Search'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-600/20'
                    : 'bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#162032] hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-slate-400'}`}></span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-slate-200 dark:border-[#1f2c42] pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-slate-900 dark:text-white">{t.catalogResults || 'Catalog Results'}</span>
          <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            {standards.length} {t.records || 'Records'}
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 flex items-center space-x-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{t.sortedBy || 'Sorted by:'}</span>
          </span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="relevance">{t.relevance || 'Relevance'}</option>
            <option value="latest">{t.latestRevision || 'Latest Revision'}</option>
            <option value="mandatory">{t.mandatoryFirst || 'Mandatory First'}</option>
          </select>
        </div>
      </div>

      {/* Standard Cards List */}
      <div className="space-y-4">
        {standards.map((std) => (
          <div
            key={std.id}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] hover:border-sky-300 dark:hover:border-sky-500 hover:shadow-md transition-all space-y-4 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="space-y-1.5 flex-1">
                {/* IS Code & Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-black text-sky-700 dark:text-sky-400">
                    {std.code}
                  </span>
                  
                  {std.statusType === 'mandatory' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      • {t.mandatoryQcoBadge || 'Mandatory QCO'}
                    </span>
                  )}
                  {std.statusType === 'crs' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      • CRS Scheme
                    </span>
                  )}
                  {std.statusType === 'revised' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      • {t.latestRevision || 'Latest Revision'}
                    </span>
                  )}
                  {std.statusType === 'isi' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      • ISI Mark Valid
                    </span>
                  )}

                  <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                    {std.ics}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {std.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                  {std.description}
                </p>
              </div>

              {/* View Standard Action Button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                <button
                  onClick={() => onSelectStandard(std)}
                  className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#162032] hover:bg-sky-50 dark:hover:bg-sky-950 text-sky-700 dark:text-sky-300 border border-slate-200 dark:border-[#1f2c42] hover:border-sky-300 dark:hover:border-sky-500 font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-all"
                >
                  <span>{t.viewStandard || 'View Standard'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">
                  PDF • {std.pages} Pages • {t.gazetteVerified || 'Gazette Verified'}
                </span>
              </div>
            </div>

            {/* Bottom Metadata Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#1f2c42] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>{t.enforced || 'Enforced:'} {std.enforcedDate}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{std.ministry}</span>
                </span>
              </div>

              <button
                onClick={() => onConsultAssistant(std.title)}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>{t.askAiAboutStandard || 'Ask AI regarding this standard'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Strip */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-[#1f2c42] text-xs text-slate-600 dark:text-slate-400">
        <div>
          {t.showing || 'Showing'} <span className="font-bold text-slate-900 dark:text-white">1-{standards.length}</span> {t.of || 'of'} <span className="font-bold text-slate-900 dark:text-white">22,482</span> {t.standardsWord || 'standards'}
        </div>

        <div className="flex items-center space-x-1 font-mono">
          <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#162032] text-slate-500 dark:text-slate-400">
            &lt;
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#162032] text-slate-700 dark:text-slate-300">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#162032] text-slate-700 dark:text-slate-300">
            3
          </button>
          <span className="px-2">...</span>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#162032] text-slate-700 dark:text-slate-300">
            5621
          </button>
          <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-[#1f2c42] hover:bg-slate-50 dark:hover:bg-[#162032] text-slate-500 dark:text-slate-400">
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
};
