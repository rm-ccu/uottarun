import { getSettings } from '../../sanity/queries';
import { JoinPageView } from './JoinPageView';

export const revalidate = 60;

export default async function JoinPage() {
  const settings = await getSettings();
  return <JoinPageView settings={settings} />;
}
