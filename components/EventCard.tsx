'use client';

import { useTranslation } from '../lib/useTranslation';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  distance: string;
  location: string;
  description: string;
  stravaUrl: string;
  paceGroups: string[];
}

export function EventCard({ event }: { event: Event }) {
  const { t } = useTranslation();
  const date = new Date(event.date + 'T00:00:00');
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = date.getDate();

  return (
    <div className="bg-white border border-brand-light rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex gap-5">
      <div className="shrink-0 w-14 text-center">
        <div className="bg-brand text-white rounded-t-lg py-1 text-xs font-bold tracking-wide">
          {month}
        </div>
        <div className="border border-t-0 border-gray-200 rounded-b-lg py-2 text-2xl font-bold text-gray-900">
          {day}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">{event.title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{event.time}</p>
        <div className="mt-3 space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{t('event_card.distance')}:</span> {event.distance}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">{t('event_card.location')}:</span> {event.location}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {event.paceGroups.map((pace) => (
            <span
              key={pace}
              className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-0.5 rounded-full"
            >
              {pace}
            </span>
          ))}
        </div>
        <a
          href={event.stravaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
        >
          {t('events_section.on_strava')} ↗
        </a>
      </div>
    </div>
  );
}
