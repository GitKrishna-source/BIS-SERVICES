import React, { useState, useEffect } from 'react';
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

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'qco', label: t.mandatoryQco, isQcoFlag: true },
    { id: 'electronics', label: t.electronics },
    { id: 'consumer', label: t.consumerGoods },
    { id: 'food', label: t.foodAgri }
  ];

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
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-mono font-medium border border-sky-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sky-600"></span>
          <span>• NATIONAL STANDARDS REPOSITORY • 22,482 ACTIVE IS</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Indian Standards Search
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600">
          Verified regulatory guidelines, quality control orders (QCO), and technical specifications issued by the Bureau of Indian Standards.
        </p>
      </div>

      {/* Search Bar & Category Filter Strip */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative flex items-center shadow-md rounded-2xl bg-white border border-slate-300 focus-within:border-sky-500 focus-within:ring-4 focus-within:ring-sky-500/15 transition-all">
          <div className="pl-4 pr-2 text-slate-400">
            <Search className="w-5 h-5 text-sky-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IS number, product title, material or ICS code..."
            className="w-full py-3.5 px-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
          />
          <div className="pr-2">
            <button
              onClick={fetchStandards}
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <span>Search</span>
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
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
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
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-slate-900">Catalog Results</span>
          <span className="px-2 py-0.5 rounded font-mono text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
            {standards.length} Records
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 flex items-center space-x-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sorted by:</span>
          </span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            <option value="relevance">Relevance</option>
            <option value="latest">Latest Revision</option>
            <option value="mandatory">Mandatory First</option>
          </select>
        </div>
      </div>

      {/* Standard Cards List */}
      <div className="space-y-4">
        {standards.map((std) => (
          <div
            key={std.id}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all space-y-4 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="space-y-1.5 flex-1">
                {/* IS Code & Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-black text-sky-700">
                    {std.code}
                  </span>
                  
                  {std.statusType === 'mandatory' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                      • Mandatory QCO
                    </span>
                  )}
                  {std.statusType === 'crs' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-800 border border-indigo-200">
                      • CRS Scheme
                    </span>
                  )}
                  {std.statusType === 'revised' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                      • Latest Revision
                    </span>
                  )}
                  {std.statusType === 'isi' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-sky-50 text-sky-800 border border-sky-200">
                      • ISI Mark Valid
                    </span>
                  )}

                  <span className="font-mono text-[11px] text-slate-400">
                    {std.ics}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {std.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {std.description}
                </p>
              </div>

              {/* View Standard Action Button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                <button
                  onClick={() => onSelectStandard(std)}
                  className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-700 border border-slate-200 hover:border-sky-300 font-bold text-xs flex items-center space-x-1.5 shadow-xs transition-all"
                >
                  <span>View Standard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-slate-400">
                  PDF • {std.pages} Pages • Gazette Verified
                </span>
              </div>
            </div>

            {/* Bottom Metadata Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span>Enforced: {std.enforcedDate}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{std.ministry}</span>
                </span>
              </div>

              <button
                onClick={() => onConsultAssistant(std.title)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
              >
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>Ask AI regarding this standard</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Strip */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 text-xs text-slate-600">
        <div>
          Showing <span className="font-bold text-slate-900">1-{standards.length}</span> of <span className="font-bold text-slate-900">22,482</span> standards
        </div>

        <div className="flex items-center space-x-1 font-mono">
          <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500">
            &lt;
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700">
            3
          </button>
          <span className="px-2">...</span>
          <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700">
            5621
          </button>
          <button className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500">
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
};
