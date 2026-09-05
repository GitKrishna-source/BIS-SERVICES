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
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    chip: 'bg-sky-500/10 text-sky-700',
    accentText: 'text-sky-600',
    pillDot: 'bg-sky-500',
    topBar: 'from-sky-400 via-blue-500 to-indigo-600'
  },
  emerald: {
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    glow: 'group-hover:shadow-emerald-500/20',
    borderHover: 'group-hover:border-emerald-400',
    iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    chip: 'bg-emerald-500/10 text-emerald-700',
    accentText: 'text-emerald-600',
    pillDot: 'bg-emerald-500',
    topBar: 'from-emerald-400 via-teal-500 to-cyan-600'
  },
  amber: {
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    glow: 'group-hover:shadow-amber-500/20',
    borderHover: 'group-hover:border-amber-400',
    iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    chip: 'bg-amber-500/10 text-amber-700',
    accentText: 'text-amber-600',
    pillDot: 'bg-amber-500',
    topBar: 'from-amber-400 via-orange-500 to-rose-500'
  },
  indigo: {
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    glow: 'group-hover:shadow-indigo-500/20',
    borderHover: 'group-hover:border-indigo-400',
    iconBg: 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    chip: 'bg-indigo-500/10 text-indigo-700',
    accentText: 'text-indigo-600',
    pillDot: 'bg-indigo-500',
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

      // Dynamically calculate active card index based on actual element layout
      const firstCard = containerRef.current.children[0];
      const cardStep = firstCard ? firstCard.offsetWidth + 24 : 360;
      const newIndex = Math.min(items.length - 1, Math.max(0, Math.round(scrollLeft / cardStep)));
      setCurrentIndex(newIndex);
    }
  };

  // Convert horizontal mouse wheel to smooth slide
  const handleWheel = (e) => {
    if (containerRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
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
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const slideTo = (index) => {
    const validIdx = Math.max(0, Math.min(items.length - 1, index));
    setCurrentIndex(validIdx);
    if (containerRef.current) {
      const card = containerRef.current.children[validIdx];
      if (card) {
        // Container-relative scrolling avoids page jumping
        const targetLeft = card.offsetLeft - containerRef.current.offsetLeft;
        containerRef.current.scrollTo({ left: targetLeft, behavior: 'smooth' });
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
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono font-semibold tracking-wider shadow-sm">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>OPERATIONAL DOMAINS</span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline font-medium">
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-8 bg-sky-600 shadow-sm shadow-sky-500/50' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 flex items-center justify-center shadow-sm hover:shadow transition-all"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 flex items-center justify-center shadow-sm hover:shadow transition-all"
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
                className={`flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] snap-start rounded-3xl border transition-all duration-400 p-6 flex flex-col justify-between bg-white relative group overflow-hidden ${
                  isSelected 
                    ? 'border-sky-500/80 ring-4 ring-sky-500/10 shadow-2xl shadow-sky-500/15 -translate-y-2' 
                    : 'border-slate-200/90 hover:border-slate-300 hover:-translate-y-1.5 shadow-md hover:shadow-xl'
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

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors mb-1.5 flex items-center justify-between">
                      <span>{item.title}</span>
                      <Zap className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100" />
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Specs / Highlights Strip */}
                  <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100/80 flex items-center justify-between text-xs backdrop-blur-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="font-semibold text-slate-700 text-[11px]">
                        {item.id === 'domain-1' ? '22,482 IS Catalog' :
                         item.id === 'domain-2' ? 'Scheme I & CRS Matrix' :
                         item.id === 'domain-3' ? '1,840 NABL Registry' : '6-Digit HUID Protocol'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-md">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Card Action Link Footer */}
                <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
                  <div className="flex items-center space-x-1.5">
                    <span className="group-hover:underline tracking-tight">{item.cta || 'Explore details'}</span>
                    <div className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center group-hover:translate-x-1 group-hover:bg-sky-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-medium">
                    STEP 0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
          {/* Trailing spacer ensures final card (Hallmarking) has full clearance and shadow room */}
          <div className="shrink-0 w-6 sm:w-10 pointer-events-none" aria-hidden="true" />
        </div>

        {/* Right Fade Peek Indicator when more cards are scrollable */}
        {scrollProgress < 85 && (
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50/90 via-slate-50/40 to-transparent pointer-events-auto hidden md:flex items-center justify-end pr-2 opacity-80 hover:opacity-100 transition-opacity z-20"
            title="Scroll to view all operational domains (Hallmarking)"
            aria-label="Next cards"
          >
            <div className="w-8 h-8 rounded-full bg-white/95 shadow-md border border-slate-200 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-all hover:scale-110">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>

      {/* Dynamic Smooth Slide Progress Bar */}
      <div className="w-full bg-slate-200/70 h-1 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-200"
          style={{ width: `${Math.max(15, scrollProgress)}%` }}
        />
      </div>

    </div>
  );
};
