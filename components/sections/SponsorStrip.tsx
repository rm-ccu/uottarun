'use client';

import Image from 'next/image';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import { urlFor } from '../../sanity/image';
import type { CollabCategory } from '../../sanity/types';

export function SponsorStrip({ categories }: { categories: CollabCategory[] }) {
  const { lang } = useTranslation();
  const featured = (categories || []).filter((c) => c.showOnHome && c.items?.length);
  if (!featured.length) return null;

  return (
    <section className="py-14 bg-white border-t border-brand-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        {featured.map((cat) => (
          <div key={cat._id}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
              {loc(cat.title, lang)}
            </p>
            <div className="flex flex-wrap justify-center gap-10 items-center">
              {cat.items.map((sponsor) => {
                const name = lang === 'fr' && sponsor.nameFr ? sponsor.nameFr : sponsor.name;
                const inner = (
                  <span className="flex items-center gap-2">
                    {sponsor.logo && (
                      <span className="relative w-7 h-7 shrink-0">
                        <Image src={urlFor(sponsor.logo).width(56).height(56).url()} alt="" fill className="object-contain" />
                      </span>
                    )}
                    {name}
                  </span>
                );
                return sponsor.url ? (
                  <a
                    key={sponsor._id}
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 font-semibold text-lg hover:text-brand transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <span key={sponsor._id} className="text-gray-600 font-semibold text-lg">{inner}</span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
