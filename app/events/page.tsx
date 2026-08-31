import { getWeeklyRuns, getExceptions, getEvents, getSettings, getPageHeaders } from '../../sanity/queries';
import { resolveRuns } from '../../lib/runSchedule';
import { EventsPageView } from './EventsPageView';

export const revalidate = 60;

export default async function EventsPage() {
  const [runs, exceptions, events, settings, headers] = await Promise.all([
    getWeeklyRuns(), getExceptions(), getEvents(), getSettings(), getPageHeaders(),
  ]);

  // Resolved on the server so the rendered dates can't drift from the client clock.
  const resolved = resolveRuns(runs, exceptions);

  return (
    <EventsPageView
      runs={resolved}
      events={events}
      instagramFallback={settings?.instagramUrl}
      headerImage={headers?.events}
    />
  );
}
