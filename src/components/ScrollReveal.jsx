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
  duration = 700,
  threshold = 0.12,
  className = '',
  cascade = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optional: keep observing or unobserve once revealed
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
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

  const getInitialStyle = () => {
    switch (animation) {
      case 'slide-left':
        return 'opacity-0 -translate-x-16';
      case 'slide-right':
        return 'opacity-0 translate-x-16';
      case 'zoom-in':
        return 'opacity-0 scale-90';
      case 'slide-up':
      default:
        return 'opacity-0 translate-y-12';
    }
  };

  const getVisibleStyle = () => {
    switch (animation) {
      case 'slide-left':
      case 'slide-right':
        return 'opacity-100 translate-x-0';
      case 'zoom-in':
        return 'opacity-100 scale-100';
      case 'slide-up':
      default:
        return 'opacity-100 translate-y-0';
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all ${
        isVisible ? getVisibleStyle() : getInitialStyle()
      } ${className}`}
    >
      {children}
    </div>
  );
};
