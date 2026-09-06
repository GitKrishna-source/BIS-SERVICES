import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal component that triggers sliding entrance animations
 * when the element scrolls into the viewport.
 * 
 * @param {string} animation - 'slide-up' | 'slide-left' | 'slide-right' | 'zoom-in' | 'bounce-in'
 * @param {number} delay - delay in milliseconds (e.g. 100, 200)
 * @param {number} duration - animation duration in ms (e.g. 600)
 * @param {string} className - extra classes
 */
export const ScrollReveal = ({
  children,
  animation = 'slide-up',
  delay = 0,
  duration = 900,
  threshold = 0.05,
  className = '',
  cascade = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, reveal immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once revealed, lock in place to prevent jitter or repeated animations
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        // Trigger 60px before entering viewport for a natural, buttery glide
        rootMargin: '0px 0px 60px 0px'
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [threshold]);

  // Subtle, refined displacements (20-28px instead of jarring 48-64px leaps)
  const getInitialStyle = () => {
    switch (animation) {
      case 'slide-left':
        return 'opacity-0 -translate-x-6 sm:-translate-x-8';
      case 'slide-right':
        return 'opacity-0 translate-x-6 sm:translate-x-8';
      case 'zoom-in':
        return 'opacity-0 scale-[0.97] translate-y-3';
      case 'slide-up':
      default:
        return 'opacity-0 translate-y-6 sm:translate-y-7';
    }
  };

  const getVisibleStyle = () => {
    switch (animation) {
      case 'slide-left':
      case 'slide-right':
        return 'opacity-100 translate-x-0';
      case 'zoom-in':
        return 'opacity-100 scale-100 translate-y-0';
      case 'slide-up':
      default:
        return 'opacity-100 translate-y-0';
    }
  };

  // Smooth, calm pacing: soft easing curve with gradual glide instead of sudden snap
  const smoothDuration = Math.max(850, Math.round(duration * 1.15));
  const smoothDelay = Math.min(180, Math.round(delay * 0.45));

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${smoothDuration}ms`,
        transitionDelay: `${smoothDelay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity'
      }}
      className={`transition-[opacity,transform] transform-gpu ${
        isVisible ? getVisibleStyle() : getInitialStyle()
      } ${className}`}
    >
      {children}
    </div>
  );
};
