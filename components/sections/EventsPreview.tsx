'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { EventCard } from '../EventCard';
import type { ClubEvent } from '../../sanity/types';

export function EventsPreview({
  events,
  instagramFallback,
}: {
  events: ClubEvent[];
  instagramFallback?: string;
}) {
  const { t } = useTranslation();
  const upcoming = (events || []).slice(0, 3);

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
          {upcoming.length > 0 && <p className="mt-3 text-gray-500 text-lg">{t('events_section.sub')}</p>}
        </motion.div>

        {upcoming.length > 0 && (
          <div className="space-y-4">
            {upcoming.map((event, i) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <EventCard event={event} instagramFallback={instagramFallback} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/events" className="font-semibold text-brand hover:underline">
            {t('events_section.view_all')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
