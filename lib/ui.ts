/**
 * One card treatment for the whole site.
 *
 * The old `shadow-md hover:shadow-lg` on white sat heavily on the cream ground
 * and read as a stock component. A warm hairline plus a small lift on hover
 * gives the same affordance without the grey haze — and keeping it in one place
 * stops the six card variants from drifting apart again.
 */
export const CARD = 'bg-white border border-line rounded-2xl';

export const CARD_HOVER =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_12px_28px_-12px_rgba(33,93,122,0.28)]';

/* Radii across the site: `rounded-2xl` for surfaces, `rounded-xl` for anything
   nested one step inside one, `rounded-full` for pills. Anything else is drift. */
