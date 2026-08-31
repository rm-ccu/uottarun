'use client';

import Image from 'next/image';
import { useTranslation } from '../lib/useTranslation';
import { Carousel } from './Carousel';
import { CARD, CARD_HOVER } from '../lib/ui';
import { loc } from '../sanity/locale';
import { urlFor } from '../sanity/image';
import type { Collab } from '../sanity/types';

export type { Collab };

function CollabCard({ collab, emphasized }: { collab: Collab; emphasized: boolean }) {
  const { lang } = useTranslation();
  const displayName = lang === 'fr' && collab.nameFr ? collab.nameFr : collab.name;
  const baseClasses = emphasized
    ? `block h-full border border-accent-dark/30 bg-accent/10 rounded-2xl p-8 text-center ${CARD_HOVER}`
    : `block h-full ${CARD} ${CARD_HOVER} p-8 text-center`;

  const content = (
    <>
      {collab.logo && (
        <div className="relative w-16 h-16 mx-auto mb-4 rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
          <Image src={urlFor(collab.logo).width(128).height(128).url()} alt="" fill className="object-contain p-2" />
        </div>
      )}
      <p className="font-semibold text-gray-900 text-xl">{displayName}</p>
      <p className="text-sm text-gray-500 mt-1">{loc(collab.description, lang)}</p>
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
  return (
    <Carousel
      items={items}
      cardClassName="w-64 sm:w-72"
      renderItem={(collab) => <CollabCard collab={collab} emphasized={emphasized} />}
    />
  );
}
