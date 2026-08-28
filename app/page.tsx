import { HeroSection } from '../components/sections/HeroSection';
import { StatsSection } from '../components/sections/StatsSection';
import { AwardsStrip } from '../components/sections/AwardsStrip';
import { EventsPreview } from '../components/sections/EventsPreview';
import { SponsorStrip } from '../components/sections/SponsorStrip';
import { getHome, getAwards, getEvents, getCollabs, getSettings } from '../sanity/queries';

export const revalidate = 60;

export default async function HomePage() {
  const [home, awards, events, collabs, settings] = await Promise.all([
    getHome(), getAwards(), getEvents(), getCollabs(), getSettings(),
  ]);

  return (
    <>
      <HeroSection home={home} />
      <StatsSection stats={home?.stats || []} />
      <AwardsStrip awards={awards} />
      <EventsPreview events={events} instagramFallback={settings?.instagramUrl} />
      <SponsorStrip categories={collabs} />
    </>
  );
}
