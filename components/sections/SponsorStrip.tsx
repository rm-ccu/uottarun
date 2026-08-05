'use client';

import Image from 'next/image';
import { useTranslation } from '../../lib/useTranslation';
import collabs from '../../data/collabs.json';

export function SponsorStrip() {
  const { t } = useTranslation();
  const sponsors = collabs.sponsors;

  if (sponsors.length === 0) return null;

  return (
    <section className="py-14 bg-white border-t border-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
          {t('collabs_page.sponsors')}
        </p>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {sponsors.map((sponsor) => {
            const inner = (
              <span className="flex items-center gap-2">
                {sponsor.logo && (
                  <span className="relative w-7 h-7 shrink-0">
                    <Image src={sponsor.logo} alt="" fill className="object-contain" />
                  </span>
                )}
                {sponsor.name}
              </span>
            );
            return sponsor.url ? (
              <a
                key={sponsor.id}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 font-semibold text-lg hover:text-brand transition-colors"
              >
                {inner}
              </a>
            ) : (
              <span key={sponsor.id} className="text-gray-600 font-semibold text-lg">
                {inner}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
