'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { EventCard, type Event } from '../../components/EventCard';
import { WeeklyRunsSection, type RecurringConfig } from '../../components/sections/WeeklyRunsSection';
import eventsData from '../../data/events.json';

type EventsData = Omit<typeof eventsData, 'events'> & { events: Event[] };
const typedEventsData = eventsData as EventsData;

export default function EventsPage() {
  const { t } = useTranslation();
  const recurring = typedEventsData.recurring as RecurringConfig;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-heading font-bold text-5xl sm:text-6xl text-gray-950">
          {t('events_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500">{t('events_page.sub')}</p>
      </motion.div>

      <WeeklyRunsSection recurring={recurring} />

      <section>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 mb-6">
          {t('events_page.special_title')}
        </h2>

        {typedEventsData.events.length === 0 ? (
          <p className="text-gray-400 text-sm">{t('events_page.no_special')}</p>
        ) : (
          <div className="space-y-4">
            {typedEventsData.events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
