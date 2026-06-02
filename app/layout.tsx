import type { Metadata } from 'next';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['600', '700', '800', '900'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'uOttaRun — University of Ottawa Running Club',
  description:
    "University of Ottawa's official running club. All paces welcome. Join us for weekly runs, races, and social events.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-gray-900">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
