import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { standardsApi } from '../services/api';
import { 
  Search, 
  ArrowUpDown, 
  FileText, 
  ChevronRight, 
  Calendar, 
  Building2, 
  Sparkles,
  CheckCircle2
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
    { id: 'all', label: t.allCategories || 'All Standards' },
    { id: 'qco', label: t.mandatoryQco || 'Mandatory QCO', isQcoFlag: true },
    { id: 'electronics', label: t.electronics || 'Electronics & IT' },
    { id: 'consumer', label: t.consumerGoods || 'Consumer Products' },
    { id: 'food', label: t.foodAgri || 'Food & Agri' }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header Banner in Sketch Editorial Style */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/[0.04] text-zinc-700 text-xs font-mono font-medium border border-black/[0.06]">
          <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
          <span>NATIONAL STANDARDS REPOSITORY • 22,482 ACTIVE IS</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-zinc-950 tracking-tight">
          Indian Standards Search
        </h1>
        
        <p className="text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
          Verified regulatory guidelines, quality control orders (QCO), and technical specifications issued by the Bureau of Indian Standards.
        </p>
      </div>

      {/* Search Bar & Category Filter Strip */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Search Bar */}
        <div className="relative flex items-center sketch-card rounded-2xl p-1 shadow-sketch-card focus-within:border-fuchsia-500 focus-within:ring-4 focus-within:ring-fuchsia-500/10 transition-all">
          <div className="pl-4 pr-2 text-zinc-400">
            <Search className="w-4 h-4 text-zinc-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IS number, product title, material or ICS code..."
            className="w-full py-3 px-2 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 bg-transparent focus:outline-none font-medium"
          />
          <div className="pr-1.5">
            <button
              onClick={fetchStandards}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-medium text-xs flex items-center space-x-1.5 shadow-sm transition-all"
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  isSelected
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-white/80 text-zinc-600 border border-zinc-200/80 hover:bg-white hover:text-zinc-950'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-fuchsia-400' : 'bg-zinc-300'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Results Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-black/[0.06] pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-zinc-950">Catalog Results</span>
          <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
            {standards.length} Records
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-zinc-500 flex items-center space-x-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sorted by:</span>
          </span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/90 border border-zinc-200 rounded-full px-3 py-1 text-xs font-medium text-zinc-800 focus:outline-none"
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
            className="p-6 rounded-3xl sketch-card transition-all space-y-4 group hover:-translate-y-1 hover:shadow-sketch-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="space-y-2 flex-1">
                {/* IS Code & Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-bold text-zinc-950">
                    {std.code}
                  </span>
                  
                  {std.statusType === 'mandatory' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200/80">
                      • Mandatory QCO
                    </span>
                  )}
                  {std.statusType === 'crs' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200/80">
                      • CRS Scheme
                    </span>
                  )}
                  {std.statusType === 'revised' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                      • Latest Revision
                    </span>
                  )}
                  {std.statusType === 'isi' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-zinc-100 text-zinc-700 border border-zinc-200/80">
                      • ISI Mark Valid
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-medium text-zinc-950 group-hover:text-fuchsia-600 transition-colors">
                  {std.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-600 leading-relaxed max-w-3xl font-normal">
                  {std.description}
                </p>
              </div>

              {/* View Standard Action Button */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                <button
                  onClick={() => onSelectStandard(std)}
                  className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white font-medium text-xs flex items-center space-x-1.5 shadow-2xs transition-all"
                >
                  <span>View Standard</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                </button>

                <span className="text-[10px] font-mono text-zinc-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-zinc-200/70 flex items-center space-x-1">
                  <FileText className="w-3 h-3 text-zinc-400" />
                  <span>PDF • {std.pages}p</span>
                </span>
              </div>
            </div>

            {/* Bottom Metadata Bar */}
            <div className="pt-3 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Enforced: {std.enforcedDate}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{std.ministry}</span>
                </span>
              </div>

              <button
                onClick={() => onConsultAssistant(std.title)}
                className="text-xs font-semibold text-zinc-800 hover:text-zinc-950 bg-white hover:bg-zinc-50 border border-zinc-200/80 px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
                <span>Ask AI regarding this standard</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Strip */}
      <div className="flex items-center justify-between pt-6 border-t border-black/[0.06] text-xs text-zinc-500">
        <div>
          Showing <span className="font-semibold text-zinc-900">1-{standards.length}</span> of <span className="font-semibold text-zinc-900">22,482</span> standards
        </div>

        <div className="flex items-center space-x-1 font-mono">
          <button className="px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:bg-white text-zinc-500">
            &lt;
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-bold">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-white text-zinc-700">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-white text-zinc-700">
            3
          </button>
          <span className="px-2 text-zinc-400">...</span>
          <button className="px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-white text-zinc-700">
            5621
          </button>
          <button className="px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:bg-white text-zinc-500">
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
};

export default StandardsSearchPage;
