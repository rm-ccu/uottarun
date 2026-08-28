import { redirect } from 'next/navigation';
import { getTeamYears } from '../../sanity/queries';

export const revalidate = 60;

export default async function TeamRedirect() {
  const years = await getTeamYears();
  const current = years.find((y) => y.isCurrent) || years[0];
  redirect(`/team/${current?.slug ?? ''}`);
}
