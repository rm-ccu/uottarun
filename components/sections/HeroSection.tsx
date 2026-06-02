'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative flex items-center justify-center min-h-[88vh] bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-125 h-125 bg-brand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-100 h-100 bg-brand/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt={t('brand_name')}
              width={140}
              height={140}
              className="object-contain"
              priority
            />
          </div>
          <span className="inline-block text-brand text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            University of Ottawa
          </span>
          <h1 className="font-heading font-bold text-7xl sm:text-8xl lg:text-9xl text-gray-950 tracking-tight leading-none mb-6">
            {t('hero.headline')}
          </h1>
          <p className="max-w-lg mx-auto text-lg sm:text-xl text-gray-500 mb-10 leading-relaxed">
            {t('hero.sub')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/join"
            className="px-8 py-4 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
          >
            {t('hero.cta_join')}
          </Link>
          <Link
            href="/events"
            className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-colors"
          >
            {t('hero.cta_events')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
