import { Barlow_Condensed, DM_Sans, Playfair_Display, Inter, Oswald, Space_Grotesk } from 'next/font/google';

/**
 * next/font requires build-time literal imports, so the CMS chooses from this
 * registered set rather than accepting an arbitrary family name. Adding a font
 * means adding it here *and* to FONT_CHOICES in the siteSettings schema.
 */
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800', '900'] });
const dmSans = DM_Sans({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], style: ['normal', 'italic'] });
const inter = Inter({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const FONTS: Record<string, { className: string; style: { fontFamily: string } }> = {
  'barlow-condensed': barlow,
  'dm-sans': dmSans,
  'playfair-display': playfair,
  inter,
  oswald,
  'space-grotesk': spaceGrotesk,
};

export const fontFamily = (key: string | undefined, fallback: string): string =>
  (key && FONTS[key]?.style.fontFamily) || FONTS[fallback].style.fontFamily;
