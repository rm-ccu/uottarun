import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ThemeStyle } from '../components/ThemeStyle';
import { getSettings, getTeamYears } from '../sanity/queries';
import { FONTS } from '../lib/fonts';
import './globals.css';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'uOttaRun — University of Ottawa Running Club',
  description:
    "University of Ottawa's official running club. All paces welcome. Join us for weekly runs, races, and social events.",
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, years] = await Promise.all([getSettings(), getTeamYears()]);

  // Load every registered family so a font swap in the Studio needs no rebuild.
  const fontClasses = Object.values(FONTS).map((f) => f.className).join(' ');

  return (
    <html lang="en" className={`${fontClasses} scroll-smooth`}>
      <head>
        <ThemeStyle settings={settings} />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-gray-900">
        <Providers>
          <Navbar years={years.map(({ slug, label }) => ({ slug, label }))} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
