'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import { urlFor } from '../../sanity/image';
import type { HomePage } from '../../sanity/types';

export function HeroSection({ home }: { home: HomePage | null }) {
  const { t, lang } = useTranslation();

  const bg = home?.heroImage ? urlFor(home.heroImage).width(1920).height(1080).url() : null;

  return (
    <section className="relative flex items-center justify-center min-h-[88vh] overflow-hidden">
      {bg && <Image src={bg} alt="" fill className="object-cover object-center" priority />}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt={t('brand_name')} width={140} height={140} className="object-contain" priority />
          </div>
          <span className="inline-block text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            University of Ottawa
          </span>
          <h1 className="font-display font-medium text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-none mb-6">
            {loc(home?.heroHeadlinePre, lang)}{' '}
            <em className="italic">{loc(home?.heroHeadlineEm, lang)}</em>{' '}
            {loc(home?.heroHeadlinePost, lang)}
          </h1>
          <p className="max-w-lg mx-auto text-lg sm:text-xl text-white/80 mb-10 leading-relaxed">
            {loc(home?.heroSub, lang)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/join" className="px-8 py-4 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors">
            {t('hero.cta_join')}
          </Link>
          <Link href="/events" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-950 transition-colors">
            {t('hero.cta_events')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
