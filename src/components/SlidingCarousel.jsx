import React, { useState, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Award, 
  FlaskConical, 
  Gem, 
  ShieldAlert, 
  Zap,
  Radio
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
    gradient: 'from-fuchsia-500/10 via-purple-500/5 to-transparent',
    iconBg: 'bg-zinc-900 text-white shadow-sm',
    badge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
    chip: 'bg-zinc-100 text-zinc-700',
    accentText: 'text-zinc-900',
    pillDot: 'bg-fuchsia-500',
    topBar: 'from-fuchsia-500 via-purple-500 to-indigo-500'
  },
  emerald: {
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    iconBg: 'bg-zinc-900 text-white shadow-sm',
    badge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
    chip: 'bg-zinc-100 text-zinc-700',
    accentText: 'text-zinc-900',
    pillDot: 'bg-emerald-500',
    topBar: 'from-emerald-400 via-teal-500 to-cyan-600'
  },
  amber: {
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    iconBg: 'bg-zinc-900 text-white shadow-sm',
    badge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
    chip: 'bg-zinc-100 text-zinc-700',
    accentText: 'text-zinc-900',
    pillDot: 'bg-amber-500',
    topBar: 'from-amber-400 via-orange-500 to-rose-500'
  },
  indigo: {
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
    iconBg: 'bg-zinc-900 text-white shadow-sm',
    badge: 'bg-zinc-100 text-zinc-700 border-zinc-200/80',
    chip: 'bg-zinc-100 text-zinc-700',
    accentText: 'text-zinc-900',
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

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      const progress = totalScrollable > 0 ? (scrollLeft / totalScrollable) * 100 : 0;
      setScrollProgress(progress);

      const firstCard = containerRef.current.children[0];
      const cardStep = firstCard ? firstCard.offsetWidth + 24 : 360;
      const newIndex = Math.min(items.length - 1, Math.max(0, Math.round(scrollLeft / cardStep)));
      setCurrentIndex(newIndex);
    }
  };

  const handleWheel = (e) => {
    if (containerRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        containerRef.current.scrollLeft += e.deltaY * 0.85;
      }
    }
  };

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
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-mono font-semibold tracking-wider shadow-xs">
            <Radio className="w-3 h-3 text-fuchsia-400 animate-pulse" />
            <span>CORE PROTOCOLS</span>
          </div>
          <span className="text-xs text-zinc-500 hidden sm:inline font-normal">
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
                    ? 'w-7 bg-zinc-900' 
                    : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-zinc-700 hover:bg-zinc-100 flex items-center justify-center shadow-2xs transition-all"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full bg-white border border-black/[0.08] text-zinc-700 hover:bg-zinc-100 flex items-center justify-center shadow-2xs transition-all"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Track Viewport */}
      <div className="relative group/track">
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
                className={`flex-shrink-0 w-[300px] sm:w-[340px] md:w-[360px] snap-start rounded-3xl transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between sketch-card relative group overflow-hidden ${
                  isSelected 
                    ? 'border-fuchsia-500/40 shadow-sketch-card -translate-y-2' 
                    : 'hover:-translate-y-1.5'
                }`}
              >
                {/* Subtle Ambient Background Mesh */}
                <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full bg-gradient-to-br ${theme.gradient} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                <div className="relative z-10 space-y-4">
                  {/* Header: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${theme.iconBg}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border flex items-center space-x-1 ${theme.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.pillDot}`} />
                        <span>{item.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Photo Preview */}
                  {item.image && (
                    <div className="relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden border border-black/[0.06] shadow-2xs group-hover:shadow-xs transition-all">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Title & Description in Editorial Serif */}
                  <div>
                    <h3 className="text-xl font-serif text-zinc-950 tracking-tight group-hover:text-fuchsia-600 transition-colors mb-2 flex items-center justify-between">
                      <span>{item.title}</span>
                      <Zap className="w-3.5 h-3.5 text-zinc-300 group-hover:text-fuchsia-500 transition-colors opacity-0 group-hover:opacity-100" />
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Micro Specs Strip */}
                  <div className="p-3 rounded-2xl bg-zinc-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="font-medium text-zinc-700 text-[11px]">
                        {item.id === 'domain-1' ? '22,482 IS Catalog' :
                         item.id === 'domain-2' ? 'Scheme I & CRS Matrix' :
                         item.id === 'domain-3' ? '1,840 NABL Registry' : '6-Digit HUID Protocol'}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 font-medium px-2 py-0.5 rounded-full bg-white border border-black/[0.04]">
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* Card Action Link Footer */}
                <div className="relative z-10 pt-4 mt-4 border-t border-black/[0.05] flex items-center justify-between text-xs font-semibold text-zinc-900 group-hover:text-fuchsia-600">
                  <div className="flex items-center space-x-1.5">
                    <span className="group-hover:underline tracking-tight">{item.cta || 'Explore details'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 font-normal">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="shrink-0 w-6 sm:w-10 pointer-events-none" aria-hidden="true" />
        </div>

        {/* Right Fade Indicator */}
        {scrollProgress < 85 && (
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#faf8fd] via-[#faf8fd]/50 to-transparent pointer-events-auto hidden md:flex items-center justify-end pr-2 opacity-80 hover:opacity-100 transition-opacity z-20"
            title="Next cards"
            aria-label="Next cards"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-black/[0.08] text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition-all hover:scale-110">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        )}
      </div>

      {/* Dynamic Smooth Slide Progress Bar */}
      <div className="w-full bg-black/[0.05] h-1 rounded-full overflow-hidden">
        <div 
          className="bg-zinc-900 h-full rounded-full transition-all duration-200"
          style={{ width: `${Math.max(15, scrollProgress)}%` }}
        />
      </div>

    </div>
  );
};

export default SlidingCarousel;
