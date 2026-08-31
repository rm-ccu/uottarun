'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { EventCard } from '../../components/EventCard';
import { PageHeader } from '../../components/PageHeader';
import { WeeklyRunsSection } from '../../components/sections/WeeklyRunsSection';
import type { ResolvedRun } from '../../lib/runSchedule';
import type { ClubEvent } from '../../sanity/types';
import type { Image as SanityImage } from 'sanity';

export function EventsPageView({
  runs,
  events,
  instagramFallback,
  headerImage,
}: {
  runs: ResolvedRun[];
  events: ClubEvent[];
  instagramFallback?: string;
  headerImage?: SanityImage | null;
}) {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('events_page.title')} sub={t('events_page.sub')} image={headerImage} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <WeeklyRunsSection runs={runs} />

        <section>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-950 mb-3">
            {t('events_page.special_title')}
          </h2>
          <span className="block w-10 h-1 bg-accent rounded-full mb-6" />

          {events.length === 0 ? (
            <p className="text-gray-400 text-sm">{t('events_page.no_special')}</p>
          ) : (
            <div className="space-y-4">
              {events.map((event, i) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <EventCard event={event} instagramFallback={instagramFallback} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
