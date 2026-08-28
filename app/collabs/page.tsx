import { getCollabs, getSettings } from '../../sanity/queries';
import { CollabsPageView } from './CollabsPageView';

export const revalidate = 60;

export default async function CollabsPage() {
  const [categories, settings] = await Promise.all([getCollabs(), getSettings()]);
  return <CollabsPageView categories={categories} email={settings?.email} />;
}
