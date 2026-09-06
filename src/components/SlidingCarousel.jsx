import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Award, 
  FlaskConical, 
  Gem, 
  ShieldAlert, 
  CheckCircle2,
  Database,
  CheckCircle,
  TrendingUp,
  Radio,
  Zap
} from 'lucide-react';

const iconMap = {
  BookOpen,
  Award,
  FlaskConical,
  Gem,
  ShieldAlert
};

const domainThemes = {
  blue: {
    gradient: 'from-sky-500/10 via-blue-500/5 to-transparent',
    glow: 'group-hover:shadow-sky-500/20',
    borderHover: 'group-hover:border-sky-400',
    iconBg: 'bg-gradient-to-tr from-sky-600 to-blue-600 text-white shadow-md shadow-sky-500/30',
    badge: 'bg-sky-950/80 text-sky-300 border-sky-500/40',
    chip: 'bg-sky-950/60 text-sky-300 border border-sky-500/30',
    accentText: 'text-sky-400',
    pillDot: 'bg-sky-400',
    topBar: 'from-sky-400 via-blue-500 to-indigo-600'
  },
  emerald: {
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    glow: 'group-hover:shadow-emerald-500/20',
    borderHover: 'group-hover:border-emerald-400',
    iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
    badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    chip: 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30',
    accentText: 'text-emerald-400',
    pillDot: 'bg-emerald-400',
    topBar: 'from-emerald-400 via-teal-500 to-cyan-600'
  },
  amber: {
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    glow: 'group-hover:shadow-amber-500/20',
    borderHover: 'group-hover:border-amber-400',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
    badge: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
    chip: 'bg-amber-950/60 text-amber-300 border border-amber-500/30',
    accentText: 'text-amber-400',
    pillDot: 'bg-amber-400',
    topBar: 'from-amber-400 via-orange-500 to-rose-500'
  },
  indigo: {
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    glow: 'group-hover:shadow-indigo-500/20',
    borderHover: 'group-hover:border-indigo-400',
    iconBg: 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30',
    badge: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
    chip: 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/30',
    accentText: 'text-indigo-400',
    pillDot: 'bg-indigo-400',
    topBar: 'from-indigo-400 via-violet-500 to-fuchsia-600'
  }
};

export const SlidingCarousel = ({ items, onSelectCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update progress bar on scroll
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      const progress = totalScrollable > 0 ? (scrollLeft / totalScrollable) * 100 : 0;
      setScrollProgress(progress);

      // Find closest active index
      const cardWidth = 360;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex >= 0 && newIndex < items.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  // Convert horizontal mouse wheel to smooth slide
  const handleWheel = (e) => {
    if (containerRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Translate vertical scroll to horizontal sliding smoothly
        containerRef.current.scrollLeft += e.deltaY * 0.85;
      }
    }
  };

  // Mouse Drag to Slide
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Slide speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const slideTo = (index) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      const card = containerRef.current.children[index];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  const nextSlide = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    slideTo(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    slideTo(prevIdx);
  };

  return (
    <div className="relative w-full space-y-4 select-none">
      
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-mono font-semibold tracking-wider shadow-sm border border-slate-700">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>OPERATIONAL DOMAINS</span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline font-medium">
            Scroll or drag cards horizontally to explore
          </span>
        </div>

        {/* Carousel Indicators & Arrows */}
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5 items-center">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => slideTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-8 bg-sky-600 shadow-sm shadow-sky-500/50' 
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-[#162032] hover:text-sky-700 dark:hover:text-sky-400 hover:border-sky-300 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#1f2c42] text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-[#162032] hover:text-sky-700 dark:hover:text-sky-400 hover:border-sky-300 flex items-center justify-center shadow-sm hover:shadow transition-all cursor-pointer"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Track Viewport with Gradient Masks */}
      <div className="relative group/track">
        
        {/* Sliding Cards Container */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2 snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {items.map((item, index) => {
            const IconComponent = iconMap[item.iconName] || BookOpen;
            const theme = domainThemes[item.color] || domainThemes.blue;
            const isSelected = currentIndex === index;

            return (
              <div
                key={item.id || index}
                onClick={() => {
                  slideTo(index);
                  if (onSelectCard) onSelectCard(item);
                }}
                className={`flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] snap-start rounded-3xl border transition-all duration-400 p-6 flex flex-col justify-between bg-white dark:bg-[#111827] relative group overflow-hidden cursor-pointer ${
                  isSelected 
                    ? 'border-sky-500/80 dark:border-sky-500 ring-4 ring-sky-500/10 shadow-2xl shadow-sky-500/15 -translate-y-2' 
                    : 'border-slate-200/90 dark:border-[#1f2c42] hover:border-slate-300 dark:hover:border-sky-500/50 hover:-translate-y-1.5 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Top Glowing Gradient Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.topBar}`} />

                {/* Subtle Ambient Background Mesh */}
                <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full bg-gradient-to-br ${theme.gradient} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                <div className="relative z-10 space-y-4">
                  {/* Header: Icon with Glowing Shadow & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-13 h-13 p-3 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 ${theme.iconBg}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border flex items-center space-x-1 ${theme.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.pillDot} animate-pulse`} />
                        <span>{item.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Optional Image Thumbnail Preview */}
                  {item.image && (
                    <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-[#1f2c42] shadow-inner group/img">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors mb-1.5 flex items-center justify-between">
                      <span>{item.title}</span>
                      <Zap className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100" />
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Specs / Highlights Strip */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#162032] border border-slate-200 dark:border-[#1f2c42] flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="font-semibold text-slate-700 dark:text-slate-200 text-[11px]">
                        {item.id === 'domain-1' ? '22,482 IS Catalog' :
                         item.id === 'domain-2' ? 'Scheme I & CRS Matrix' :
                         item.id === 'domain-3' ? '1,840 NABL Registry' : '6-Digit HUID Protocol'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-md">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Card Action Link Footer */}
                <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 dark:border-[#1f2c42] flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300">
                  <div className="flex items-center space-x-1.5">
                    <span className="group-hover:underline tracking-tight">{item.cta || 'Explore details'}</span>
                    <div className="w-5 h-5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-sky-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 font-medium">
                    STEP 0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Smooth Slide Progress Bar */}
      <div className="w-full bg-slate-200/70 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-200"
          style={{ width: `${Math.max(15, scrollProgress)}%` }}
        />
      </div>

    </div>
  );
};
