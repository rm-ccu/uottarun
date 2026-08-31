import { getSettings, getPageHeaders } from '../../sanity/queries';
import { JoinPageView } from './JoinPageView';

export const revalidate = 60;

export default async function JoinPage() {
  const [settings, headers] = await Promise.all([getSettings(), getPageHeaders()]);
  return <JoinPageView settings={settings} headerImage={headers?.join} />;
}
