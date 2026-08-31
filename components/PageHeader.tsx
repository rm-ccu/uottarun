'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * The masthead every page below the home page opens with.
 *
 * Inner pages used to start with bare text floating on the cream ground, three
 * of them centred and two left-aligned. Putting the title in a surface band
 * gives them the same banded rhythm the home page has, and left-aligning all of
 * them matches the hero.
 *
 * `width` should match the content container below it so the title lines up
 * with the page body rather than floating in its own measure.
 */
export function PageHeader({
  eyebrow,
  title,
  sub,
  width = 'max-w-3xl',
  children,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  width?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-surface border-b border-line">
      <div className={`${width} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {eyebrow && (
            <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-brand mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl text-gray-950 tracking-tight leading-[1.05]">
            {title}
          </h1>
          <span className="block w-12 h-1 bg-accent rounded-full mt-6" />
          {sub && <p className="mt-6 text-lg text-gray-500 max-w-xl leading-relaxed">{sub}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
