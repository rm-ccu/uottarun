'use client';

import { useEffect, useMemo, useRef } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import type { Stat } from '../../sanity/types';

const format = (n: number, grouped: boolean) => (grouped ? n.toLocaleString('en-CA') : String(n));

/** Splits "150+" into "", 150, "+" so the number can count while the units
 *  stay put. A value with no digits at all ("∞", "Fall") returns null and is
 *  rendered untouched. */
function parse(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return { prefix, suffix, target: Number(digits.replace(/,/g, '')), grouped: digits.includes(',') };
}

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const parsed = useMemo(() => parse(value), [value]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !parsed || !inView || reduced) return;

    // The count is written straight to the text node rather than through state:
    // a setState per animation frame would re-render the whole section ~60
    // times, and React only ever needs to know the finished value.
    const controls = animate(0, parsed.target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(Math.round(v), parsed.grouped);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, parsed]);

  // No digits to count — render the value as written.
  if (!parsed) return <span>{value}</span>;

  // The finished number is what server-renders, so the markup is meaningful
  // without JavaScript and there is nothing to mismatch on hydration.
  return (
    <>
      {parsed.prefix}
      <span ref={ref}>{format(parsed.target, parsed.grouped)}</span>
      {parsed.suffix}
    </>
  );
}

export function StatsSection({ stats }: { stats: Stat[] }) {
  const { lang } = useTranslation();
  if (!stats?.length) return null;

  return (
    // Off the full-bleed yellow: a solid accent band was the loudest thing on
    // the page. The colour is kept as a rule above each figure instead, which
    // matches the accent underline used on section headings elsewhere.
    <section className="bg-surface border-y border-line py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat._key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="block w-10 h-1 bg-accent rounded-full mx-auto mb-5" />
              <div className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl leading-none mb-3 text-brand tabular-nums">
                <StatValue value={stat.value} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-[0.15em]">
                {loc(stat.label, lang)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
