import { notFound } from 'next/navigation';
import { getTeamYears } from '../../../sanity/queries';
import { TeamYearView } from '../../../components/TeamYearView';

export const revalidate = 60;

export async function generateStaticParams() {
  const years = await getTeamYears();
  return years.map((y) => ({ year: y.slug }));
}

export default async function TeamYearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const years = await getTeamYears();
  const yearData = years.find((y) => y.slug === year);

  if (!yearData) notFound();

  return (
    <TeamYearView
      year={yearData}
      years={years.map(({ slug, label }) => ({ slug, label }))}
    />
  );
}
