import { getCollabs, getSettings, getPageHeaders } from '../../sanity/queries';
import { CollabsPageView } from './CollabsPageView';

export const revalidate = 60;

export default async function CollabsPage() {
  const [categories, settings, headers] = await Promise.all([
    getCollabs(), getSettings(), getPageHeaders(),
  ]);
  return (
    <CollabsPageView categories={categories} email={settings?.email} headerImage={headers?.collabs} />
  );
}
