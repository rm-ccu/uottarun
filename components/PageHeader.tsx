'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { urlFor } from '../sanity/image';
import type { Image as SanityImage } from 'sanity';

/**
 * The masthead every page below the home page opens with.
 *
 * With a photo it borrows the hero's treatment — the same pair of directional
 * scrims, so the text sits on the dark left while the photo keeps its contrast
 * on the open right. Without one it falls back to the plain surface band, which
 * is what a page whose image has not been set in the Studio gets.
 *
 * `width` should match the content container below it so the title lines up
 * with the page body rather than floating in its own measure.
 */
export function PageHeader({
  eyebrow,
  title,
  sub,
  image,
  width = 'max-w-3xl',
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  image?: SanityImage | null;
  width?: string;
  children?: ReactNode;
}) {
  // Fetched larger than the band renders so it stays sharp on retina screens,
  // and in the same 8:3 shape the band settles at — a mismatch here would make
  // the browser re-crop on top of the hotspot crop and undo it.
  const bg = image ? urlFor(image).width(2400).height(900).url() : null;

  const body = (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {eyebrow && (
        <span
          className={`block text-xs font-semibold uppercase tracking-[0.25em] mb-4 ${
            bg ? 'text-accent' : 'text-brand'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h1
        className={`font-display font-medium text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] ${
          bg ? 'text-white' : 'text-gray-950'
        }`}
      >
        {title}
      </h1>
      <span className="block w-12 h-1 bg-accent rounded-full mt-6" />
      {sub && (
        <p className={`mt-6 text-lg max-w-xl leading-relaxed ${bg ? 'text-white/85' : 'text-gray-500'}`}>
          {sub}
        </p>
      )}
      {children}
    </motion.div>
  );

  if (!bg) {
    return (
      <section className="bg-surface border-b border-line">
        <div className={`${width} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20`}>{body}</div>
      </section>
    );
  }

  // Pulled up under the sticky navbar so the photo runs edge to edge behind it,
  // with the extra top padding putting the text back where it was. The plain
  // band above does not do this — a transparent bar over cream would leave the
  // nav links white on white.
  return (
    <section data-photo-header className="relative -mt-16 overflow-hidden">
      <Image src={bg} alt="" fill priority className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      <div className={`relative z-10 ${width} mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 sm:pt-48 sm:pb-32`}>
        {body}
      </div>
    </section>
  );
}
