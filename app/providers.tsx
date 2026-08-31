'use client';

import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '../lib/LanguageContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {/* `reducedMotion="user"` makes every motion component on the site honour
          prefers-reduced-motion — transforms are dropped, opacity is kept — so
          individual sections don't each have to remember to check. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LanguageProvider>
  );
}
