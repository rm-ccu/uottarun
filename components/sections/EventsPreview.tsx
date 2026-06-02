'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { EventCard, type Event } from '../EventCard';
import eventsData from '../../data/events.json';

const upcoming = (eventsData.events as Event[]).slice(0, 3);

export function EventsPreview() {
  const { t } = useTranslation();

  if (upcoming.length === 0) {
    return (
      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-950 mb-4">
            {t('events_section.title')}
          </h2>
          <Link href="/events" className="font-semibold text-brand hover:underline">
            {t('events_section.view_all')} →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-gray-950">
            {t('events_section.title')}
          </h2>
          <p className="mt-3 text-gray-500 text-lg">{t('events_section.sub')}</p>
        </motion.div>

        <div className="space-y-4">
          {upcoming.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/events" className="font-semibold text-brand hover:underline">
            {t('events_section.view_all')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
