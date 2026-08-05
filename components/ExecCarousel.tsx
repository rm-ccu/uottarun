'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ExecCard, type ExecMember } from './TeamCard';

export function ExecCarousel({ items }: { items: ExecMember[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const measureSetWidth = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const cards = el.querySelectorAll<HTMLElement>('[data-carousel-card]');
    let width = 0;
    for (let i = 0; i < items.length && i < cards.length; i++) {
      width += cards[i].offsetWidth + 24; // gap-6 = 24px
    }
    return width;
  }, [items.length]);

  const jumpTo = useCallback((left: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = 'auto';
    el.scrollLeft = left;
    void el.offsetHeight;
    el.style.scrollBehavior = prev;
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const raf = requestAnimationFrame(() => {
      const setWidth = measureSetWidth();
      setWidthRef.current = setWidth;
      jumpTo(setWidth);
    });
    return () => cancelAnimationFrame(raf);
  }, [items.length, measureSetWidth, jumpTo]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || items.length === 0) return;

    // Only re-center once scrolling has *fully* stopped — resetting
    // scrollLeft mid-gesture (including during trackpad momentum) fights the
    // browser's native scroll/snap physics and is what caused the flicker.
    // The native `scrollend` event is the reliable signal for that; a longer
    // debounce is the fallback for browsers that don't support it yet.
    const supportsScrollEnd = 'onscrollend' in window;

    const reconcile = () => {
      const setWidth = setWidthRef.current;
      if (setWidth <= 0) return;
      if (el.scrollLeft < setWidth * 0.5) {
        jumpTo(el.scrollLeft + setWidth);
      } else if (el.scrollLeft > setWidth * 1.5) {
        jumpTo(el.scrollLeft - setWidth);
      }
    };

    const handleScrollEnd = () => reconcile();

    const handleScrollDebounced = () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(reconcile, 400);
    };

    const handleResize = () => {
      const setWidth = measureSetWidth();
      setWidthRef.current = setWidth;
      jumpTo(setWidth);
    };

    if (supportsScrollEnd) {
      el.addEventListener('scrollend', handleScrollEnd, { passive: true });
    } else {
      el.addEventListener('scroll', handleScrollDebounced, { passive: true });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      el.removeEventListener('scrollend', handleScrollEnd);
      el.removeEventListener('scroll', handleScrollDebounced);
      window.removeEventListener('resize', handleResize);
    };
  }, [items, measureSetWidth, jumpTo]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-carousel-card]');
    const amount = (card?.offsetWidth ?? 288) + 24;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  const loop = [...items, ...items, ...items];

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4 py-4 sm:mx-0 sm:px-0"
      >
        {loop.map((member, i) => (
          <div key={`${member.id}-${i}`} data-carousel-card className="shrink-0 w-64 sm:w-72 snap-start">
            <div
              className="animate-card-float"
              style={{ animationDelay: `${(i % items.length) * 0.25}s` }}
            >
              <ExecCard member={member} />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByCard(-1)}
        className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-brand-light shadow-md hover:border-brand transition-all cursor-pointer"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollByCard(1)}
        className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-brand-light shadow-md hover:border-brand transition-all cursor-pointer"
      >
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
