import type { WeeklyRun, RunException, RunSeason, LocaleStr } from '../sanity/types';

const DAY_INDEX: Record<string, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6,
};

/** YYYY-MM-DD in local time — avoids the UTC shift that `toISOString` causes. */
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** The next date (today included) landing on `day`. */
function nextOccurrence(day: string, from: Date): Date | null {
  const target = DAY_INDEX[day];
  if (target === undefined) return null;
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + ((target - d.getDay() + 7) % 7));
  return d;
}

function seasonFor(seasons: RunSeason[] | undefined, iso: string): RunSeason | null {
  return (seasons || []).find((s) => s.startDate <= iso && iso <= s.endDate) || null;
}

export interface ResolvedRun {
  id: string;
  title: LocaleStr;
  day: string;
  dateISO: string;
  month: string;
  dayOfMonth: number;
  warmup?: string;
  time?: string;
  location: LocaleStr;
  paceRange?: string;
  stravaUrl?: string;
  tags: { _id: string; title: LocaleStr; color: string }[];
  seasonName: string;
  status: 'on' | 'cancelled' | 'time' | 'location' | 'notice';
  note: LocaleStr;
}

/**
 * Turns the stored runs into what the page should actually show today.
 *
 * A run appears only when the *next* occurrence of its weekday falls inside one
 * of its seasons — that is what makes the schedule recurring without anyone
 * editing dates weekly, and what makes it vanish over summer and exams.
 * A matching exception then overrides times, location, or cancels it outright.
 */
export function resolveRuns(
  runs: WeeklyRun[],
  exceptions: RunException[],
  now: Date = new Date()
): ResolvedRun[] {
  const resolved: ResolvedRun[] = [];

  for (const run of runs) {
    if (!run.active) continue;
    const next = nextOccurrence(run.day, now);
    if (!next) continue;

    const iso = toISODate(next);
    const season = seasonFor(run.seasons, iso);
    if (!season) continue; // out of season → not posted

    const exc = exceptions.find((e) => e.runId === run._id && e.date === iso) || null;

    resolved.push({
      id: run._id,
      title: run.title,
      day: run.day,
      dateISO: iso,
      month: next.toLocaleString('en-CA', { month: 'short' }).toUpperCase(),
      dayOfMonth: next.getDate(),
      warmup: season.warmup,
      time: exc?.status === 'time' && exc.newTime ? exc.newTime : season.run,
      location: exc?.status === 'location' && exc.newLocation ? exc.newLocation : run.location,
      paceRange: run.paceRange,
      stravaUrl: run.stravaUrl,
      tags: run.tags || [],
      seasonName: season.name,
      status: exc ? exc.status : 'on',
      note: exc?.note ?? null,
    });
  }

  return resolved;
}
