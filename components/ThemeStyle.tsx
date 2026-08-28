import type { SiteSettings } from '../sanity/types';
import { fontFamily } from '../lib/fonts';

/**
 * Emits the brand palette and font choices as CSS custom properties.
 * Tailwind's utilities (bg-brand, font-heading, …) already resolve through
 * these variables, so editing a colour in the Studio restyles the whole site
 * without a rebuild.
 */
export function ThemeStyle({ settings }: { settings: SiteSettings | null }) {
  if (!settings) return null;

  const vars: Record<string, string | undefined> = {
    '--color-brand': settings.colorBrand,
    '--color-brand-dark': settings.colorBrandDark,
    '--color-brand-light': settings.colorBrandLight,
    '--color-secondary': settings.colorSecondary,
    '--color-secondary-dark': settings.colorSecondaryDark,
    '--color-secondary-light': settings.colorSecondaryLight,
    '--color-accent': settings.colorAccent,
    '--color-accent-dark': settings.colorAccentDark,
    '--color-background': settings.colorBackground,
    '--color-surface': settings.colorSurface,
    '--font-heading': fontFamily(settings.fontHeading, 'barlow-condensed'),
    '--font-sans': fontFamily(settings.fontBody, 'dm-sans'),
    '--font-display': fontFamily(settings.fontDisplay, 'playfair-display'),
  };

  const css = Object.entries(vars)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}:${v};`)
    .join('');

  return <style>{`:root{${css}}body{background-color:${settings.colorBackground};}`}</style>;
}
