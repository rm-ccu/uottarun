'use client';

import { useTranslation } from '../../lib/useTranslation';
import { monthAbbr } from '../../lib/formatDate';
import { CARD, CARD_HOVER } from '../../lib/ui';
import { loc } from '../../sanity/locale';
import { DateBadge, TagBadge } from '../EventCard';
import type { ResolvedRun } from '../../lib/runSchedule';

function RunCard({ run }: { run: ResolvedRun }) {
  const { t, lang } = useTranslation();
  const cancelled = run.status === 'cancelled';
  const changed = run.status === 'time' || run.status === 'location';
  const note = loc(run.note, lang);

  return (
    <div className={`${CARD} ${cancelled ? 'opacity-75' : CARD_HOVER} p-6 flex gap-5`}>
      <DateBadge month={monthAbbr(run.dateISO, lang)} day={run.dayOfMonth} muted={cancelled} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className={`font-semibold text-lg ${cancelled ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {loc(run.title, lang)}
          </h3>
          {cancelled && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-100 text-red-700">
              {t('weekly_runs.cancelled')}
            </span>
          )}
          {changed && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent text-gray-900">
              {t('weekly_runs.changed')}
            </span>
          )}
          {run.tags.map((tag) => (
            <TagBadge key={tag._id} label={loc(tag.title, lang)} color={tag.color} />
          ))}
        </div>

        {note && (
          <p className={`text-sm mt-2 font-medium ${cancelled ? 'text-red-700' : 'text-gray-700'}`}>{note}</p>
        )}

        {!cancelled && (
          <>
            <p className="text-sm text-gray-500 mt-1.5">
              {run.warmup && <>{t('weekly_runs.warmup')} {run.warmup} · </>}
              {t('weekly_runs.run_start')} {run.time}
            </p>
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{t('event_card.location')}:</span> {loc(run.location, lang)}
              </p>
            </div>
            {run.paceRange && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="text-xs bg-secondary-light text-secondary-dark font-medium px-2.5 py-0.5 rounded-full">
                  {run.paceRange}
                </span>
              </div>
            )}
            {run.stravaUrl && (
              <a
                href={run.stravaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-brand hover:underline"
              >
                {t('events_section.on_strava')} ↗
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function WeeklyRunsSection({ runs }: { runs: ResolvedRun[] }) {
  const { t } = useTranslation();

  return (
    <section className="mb-14">
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 mb-3">
        {t('events_page.weekly_title')}
      </h2>
      <span className="block w-10 h-1 bg-accent rounded-full mb-6" />

      {runs.length === 0 ? (
        <div className="bg-brand-light rounded-2xl p-8 text-center">
          <p className="font-semibold text-gray-900 text-lg">{t('weekly_runs.offseason_title')}</p>
          <p className="text-sm text-gray-600 mt-1">{t('weekly_runs.offseason_body')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {runs.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </div>
      )}
    </section>
  );
}
