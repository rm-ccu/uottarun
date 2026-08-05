'use client';

import { useCallback, useEffect, useRef } from 'react';
import { ExecCard, type ExecMember } from './TeamCard';

// 5 copies of the list give a generous drag buffer either side of the
// middle copy, so free scrolling (trackpad/touch) never needs a
// programmatic scroll-position correction — that correction, even when
// carefully timed, is what was fighting the browser's native scroll
// physics and causing the flicker. Wrapping is instead handled only
// through the arrow buttons, where we fully control the timing.
const CLONE_COUNT = 5;
const MIDDLE_INDEX = Math.floor(CLONE_COUNT / 2);

export function ExecCarousel({ items }: { items: ExecMember[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

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
      jumpTo(setWidth * MIDDLE_INDEX);
    });
    return () => cancelAnimationFrame(raf);
  }, [items.length, measureSetWidth, jumpTo]);

  useEffect(() => {
    const handleResize = () => {
      const setWidth = measureSetWidth();
      setWidthRef.current = setWidth;
      jumpTo(setWidth * MIDDLE_INDEX);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureSetWidth, jumpTo]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-carousel-card]');
    const amount = (card?.offsetWidth ?? 288) + 24;
    const setWidth = setWidthRef.current;

    // If a free drag has carried us out toward either end, silently
    // re-center on the middle copy first, then perform the requested
    // scroll from there — both happen synchronously in this click
    // handler, before the next paint, so it reads as one smooth scroll.
    if (setWidth > 0) {
      const safeLow = setWidth * 1;
      const safeHigh = setWidth * (CLONE_COUNT - 1);
      if (el.scrollLeft < safeLow || el.scrollLeft > safeHigh) {
        const offsetIntoSet = el.scrollLeft % setWidth;
        jumpTo(setWidth * MIDDLE_INDEX + offsetIntoSet);
      }
    }

    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  if (items.length === 0) return null;

  const loop = Array.from({ length: CLONE_COUNT }, () => items).flat();

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-proximity scrollbar-hide -mx-4 px-4 py-4 sm:mx-0 sm:px-0"
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
