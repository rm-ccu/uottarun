'use client';

import Image from 'next/image';
import { useTranslation } from '../lib/useTranslation';
import { monthAbbr } from '../lib/formatDate';
import { CARD, CARD_HOVER } from '../lib/ui';
import { loc } from '../sanity/locale';
import { urlFor } from '../sanity/image';
import type { ClubEvent } from '../sanity/types';

const TAG_STYLES: Record<string, string> = {
  brand: 'bg-brand-light text-brand',
  secondary: 'bg-secondary-light text-secondary-dark',
  accent: 'bg-accent text-gray-900',
  neutral: 'bg-gray-100 text-gray-600',
};

export function TagBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${TAG_STYLES[color] || TAG_STYLES.neutral}`}>
      {label}
    </span>
  );
}

export function DateBadge({ month, day, muted = false }: { month: string; day: number; muted?: boolean }) {
  // French abbreviates to five characters ("JUILL", "SEPT") where English uses
  // three, which overflows the badge at the default size.
  const tight = month.length > 4;

  return (
    <div className="w-14 shrink-0 text-center">
      <div
        className={`${muted ? 'bg-gray-400' : 'bg-brand'} text-white rounded-t-xl py-1 font-bold ${
          tight ? 'text-[10px] tracking-normal' : 'text-xs tracking-wide'
        }`}
      >
        {month}
      </div>
      <div className="border border-t-0 border-line rounded-b-xl py-2 text-2xl font-bold text-gray-900 tabular-nums">
        {day}
      </div>
    </div>
  );
}

export function EventCard({ event, instagramFallback }: { event: ClubEvent; instagramFallback?: string }) {
  const { t, lang } = useTranslation();
  const date = new Date(event.date + 'T00:00:00');
  const link = event.instagramUrl || instagramFallback;

  return (
    <div className={`${CARD} ${CARD_HOVER} overflow-hidden`}>
      {event.image && (
        <div className="relative w-full h-44">
          <Image
            src={urlFor(event.image).width(800).height(352).url()}
            alt={loc(event.title, lang)}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex gap-5">
        <DateBadge month={monthAbbr(event.date, lang)} day={date.getDate()} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{loc(event.title, lang)}</h3>
            {(event.tags || []).map((tag) => (
              <TagBadge key={tag._id} label={loc(tag.title, lang)} color={tag.color} />
            ))}
          </div>
          {event.time && <p className="text-sm text-gray-500 mt-0.5">{event.time}</p>}
          <div className="mt-3 space-y-1">
            {event.distance && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.distance')}:</span> {event.distance}
              </p>
            )}
            {event.location && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.location')}:</span> {loc(event.location, lang)}
              </p>
            )}
          </div>
          {event.description && (
            <p className="text-sm text-gray-600 mt-3">{loc(event.description, lang)}</p>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
            >
              Instagram ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
