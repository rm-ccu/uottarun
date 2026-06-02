'use client';

import { useTranslation } from '../../lib/useTranslation';

interface RecurringRun {
  time: string;
  distance: string;
  location: string;
  paceGroups: string[];
  stravaUrl: string;
}

interface SaturdayRun extends RecurringRun {
  type: 'coffee' | 'guru';
}

export interface RecurringConfig {
  tuesday: RecurringRun;
  saturday: SaturdayRun;
}

function nextOccurrence(dayOfWeek: number): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysUntil = (dayOfWeek - today.getDay() + 7) % 7;
  const next = new Date(today);
  next.setDate(today.getDate() + daysUntil);
  return next;
}

function DateBadge({ date }: { date: Date }) {
  return (
    <div className="w-14 shrink-0 text-center">
      <div
        suppressHydrationWarning
        className="bg-brand text-white rounded-t-lg py-1 text-xs font-bold tracking-wide"
      >
        {date.toLocaleString('default', { month: 'short' }).toUpperCase()}
      </div>
      <div
        suppressHydrationWarning
        className="border border-t-0 border-gray-200 rounded-b-lg py-2 text-2xl font-bold text-gray-900"
      >
        {date.getDate()}
      </div>
    </div>
  );
}

export function WeeklyRunsSection({ recurring }: { recurring: RecurringConfig }) {
  const { t } = useTranslation();
  const tuesday = nextOccurrence(2);
  const saturday = nextOccurrence(6);

  return (
    <section className="mb-14">
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 mb-6">
        {t('events_page.weekly_title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Tuesday */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex gap-5">
          <DateBadge date={tuesday} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg">{t('weekly_runs.tuesday')}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{recurring.tuesday.time}</p>
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.distance')}:</span>{' '}
                {recurring.tuesday.distance}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.location')}:</span>{' '}
                {recurring.tuesday.location}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recurring.tuesday.paceGroups.map((p) => (
                <span key={p} className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-0.5 rounded-full">
                  {p}
                </span>
              ))}
            </div>
            <a
              href={recurring.tuesday.stravaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
            >
              {t('events_section.on_strava')} ↗
            </a>
          </div>
        </div>

        {/* Saturday */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex gap-5">
          <DateBadge date={saturday} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-lg">{t('weekly_runs.saturday')}</h3>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                recurring.saturday.type === 'guru'
                  ? 'bg-accent text-gray-900'
                  : 'bg-secondary-light text-secondary-dark'
              }`}>
                {t(`weekly_runs.${recurring.saturday.type}`)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{recurring.saturday.time}</p>
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.distance')}:</span>{' '}
                {recurring.saturday.distance}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.location')}:</span>{' '}
                {recurring.saturday.location}
              </p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recurring.saturday.paceGroups.map((p) => (
                <span key={p} className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-0.5 rounded-full">
                  {p}
                </span>
              ))}
            </div>
            <a
              href={recurring.saturday.stravaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
            >
              {t('events_section.on_strava')} ↗
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
