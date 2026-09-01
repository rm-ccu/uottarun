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
  const pre = loc(home?.heroHeadlinePre, lang);
  const em = loc(home?.heroHeadlineEm, lang);
  const post = loc(home?.heroHeadlinePost, lang);

  return (
    // Pulled up under the sticky navbar so the photo runs edge to edge behind
    // it; the bar stays transparent until the first scroll.
    <section data-photo-header className="relative -mt-16 flex items-center min-h-[92vh] overflow-hidden">
      {bg && <Image src={bg} alt="" fill className="object-cover object-center" priority />}

      {/* Two directional scrims rather than one flat wash — the photo keeps its
          contrast on the open right side while the text sits on the dark left. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <Image
            src="/logo.png"
            alt={t('brand_name')}
            width={96}
            height={96}
            className="object-contain mb-8"
            priority
          />
          <span className="block text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-5">
            {t('hero.eyebrow')}
          </span>

          {/* Barlow carries the structure; Playfair italic is the accent voice,
              used only on the word the CMS marks for emphasis. */}
          <h1 className="font-heading font-bold uppercase text-6xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-6">
            {pre}
            {em && (
              <>
                {pre && ' '}
                <em className="font-display font-medium italic normal-case tracking-normal">{em}</em>
              </>
            )}
            {post && ` ${post}`}
          </h1>

          <p className="max-w-lg text-lg sm:text-xl text-white/85 mb-10 leading-relaxed">
            {loc(home?.heroSub, lang)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:items-center"
        >
          <Link
            href="/join"
            className="px-8 py-4 bg-accent text-gray-950 font-semibold rounded-full text-center hover:bg-accent-dark transition-colors"
          >
            {t('hero.cta_join')}
          </Link>
          <Link
            href="/events"
            className="px-8 py-4 border border-white/70 text-white font-semibold rounded-full text-center hover:bg-white hover:text-gray-950 hover:border-white transition-colors"
          >
            {t('hero.cta_events')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
