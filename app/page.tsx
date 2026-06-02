import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { EventsPreview } from '../components/sections/EventsPreview';
import { SponsorStrip } from '../components/sections/SponsorStrip';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <EventsPreview />
      <SponsorStrip />
    </>
  );
}
