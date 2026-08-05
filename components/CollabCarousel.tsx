'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '../lib/useTranslation';

export interface Collab {
  id: string;
  name: string;
  nameFr?: string;
  description: string;
  url: string | null;
  logo: string | null;
}

function CollabCard({ collab, emphasized }: { collab: Collab; emphasized: boolean }) {
  const { lang } = useTranslation();
  const displayName = lang === 'fr' && collab.nameFr ? collab.nameFr : collab.name;
  const baseClasses = emphasized
    ? 'block h-full border border-accent-dark/30 bg-accent/10 rounded-2xl p-8 text-center hover:border-accent-dark hover:shadow-md transition-all'
    : 'block h-full border border-brand-light rounded-2xl p-8 text-center hover:border-brand hover:shadow-md transition-all';

  const content = (
    <>
      {collab.logo && (
        <div className="relative w-16 h-16 mx-auto mb-4 rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
          <Image src={collab.logo} alt="" fill className="object-contain p-2" />
        </div>
      )}
      <p className="font-semibold text-gray-900 text-xl">{displayName}</p>
      <p className="text-sm text-gray-500 mt-1">{collab.description}</p>
    </>
  );

  if (!collab.url) {
    return <div className={baseClasses}>{content}</div>;
  }

  return (
    <a href={collab.url} target="_blank" rel="noopener noreferrer" className={baseClasses}>
      {content}
    </a>
  );
}

export function CollabCarousel({ items, emphasized = false }: { items: Collab[]; emphasized?: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [items]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-carousel-card]');
    const amount = (card?.offsetWidth ?? 288) + 24;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4 py-1 sm:mx-0 sm:px-0"
      >
        {items.map((collab) => (
          <div
            key={collab.id}
            data-carousel-card
            className="shrink-0 w-64 sm:w-72 snap-start"
          >
            <CollabCard collab={collab} emphasized={emphasized} />
          </div>
        ))}
      </div>

      {items.length > 2 && (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-brand-light shadow-md hover:border-brand transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white border border-brand-light shadow-md hover:border-brand transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
