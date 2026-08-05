'use client';

import { useTranslation } from '../../lib/useTranslation';

interface PaceGroups {
  long: string;
  short: string;
}

interface SemesterTime {
  warmup: string;
  run: string;
}

interface TuesdayConfig {
  location: string;
  stravaUrl: string;
  fall: SemesterTime;
  winter: SemesterTime;
}

interface SaturdayConfig {
  location: string;
  stravaUrl: string;
  warmup: string;
  run: string;
  alternates: string[];
}

export interface RecurringConfig {
  paceGroups: PaceGroups;
  tuesday: TuesdayConfig;
  saturday: SaturdayConfig;
}

type Semester = 'fall' | 'winter' | 'offseason';

function getSemester(date: Date): Semester {
  const month = date.getMonth() + 1;
  if (month >= 9 && month <= 12) return 'fall';
  if (month >= 1 && month <= 4) return 'winter';
  return 'offseason';
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

function PaceBadges({ paceGroups }: { paceGroups: PaceGroups }) {
  const { t } = useTranslation();
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      <span className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-0.5 rounded-full">
        {t('weekly_runs.long_run')}: {paceGroups.long}
      </span>
      <span className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-0.5 rounded-full">
        {t('weekly_runs.short_run')}: {paceGroups.short}
      </span>
    </div>
  );
}

export function WeeklyRunsSection({ recurring }: { recurring: RecurringConfig }) {
  const { t } = useTranslation();
  const semester = getSemester(new Date());

  if (semester === 'offseason') {
    return (
      <section className="mb-14">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 mb-3">
          {t('events_page.weekly_title')}
        </h2>
        <span className="block w-10 h-1 bg-accent rounded-full mb-6" />
        <div className="bg-brand-light border border-brand-light rounded-2xl p-8 text-center">
          <p className="font-semibold text-gray-900 text-lg">{t('weekly_runs.offseason_title')}</p>
          <p className="text-sm text-gray-600 mt-1">{t('weekly_runs.offseason_body')}</p>
        </div>
      </section>
    );
  }

  const tuesday = nextOccurrence(2);
  const saturday = nextOccurrence(6);
  const tuesdayTimes = recurring.tuesday[semester];

  return (
    <section className="mb-14">
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 mb-3">
        {t('events_page.weekly_title')}
      </h2>
      <span className="block w-10 h-1 bg-accent rounded-full mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Tuesday */}
        <div className="bg-white border border-brand-light rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex gap-5">
          <DateBadge date={tuesday} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg">{t('weekly_runs.tuesday')}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {t('weekly_runs.warmup')} {tuesdayTimes.warmup} · {t('weekly_runs.run_start')} {tuesdayTimes.run}
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.location')}:</span>{' '}
                {recurring.tuesday.location}
              </p>
            </div>
            <PaceBadges paceGroups={recurring.paceGroups} />
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
        <div className="bg-white border border-brand-light rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex gap-5">
          <DateBadge date={saturday} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-lg">{t('weekly_runs.saturday')}</h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary-light text-secondary-dark">
                {t('weekly_runs.coffee')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent text-gray-900">
                {t('weekly_runs.guru')}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{t('weekly_runs.alternates_caption')}</p>
            <p className="text-sm text-gray-500 mt-1.5">
              {t('weekly_runs.warmup')} {recurring.saturday.warmup} · {t('weekly_runs.run_start')} {recurring.saturday.run}
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.location')}:</span>{' '}
                {recurring.saturday.location}
              </p>
            </div>
            <PaceBadges paceGroups={recurring.paceGroups} />
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
