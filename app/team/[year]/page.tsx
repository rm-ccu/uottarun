import { notFound } from 'next/navigation';
import teamData from '../../../data/team.json';
import { TeamYearView, type TeamYear } from '../../../components/TeamYearView';

export function generateStaticParams() {
  return teamData.years.map((y) => ({ year: y.id }));
}

export default async function TeamYearPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params;
  const yearData = teamData.years.find((y) => y.id === year);

  if (!yearData) notFound();

  return (
    <TeamYearView
      year={yearData as TeamYear}
      years={teamData.years.map(({ id, label }) => ({ id, label }))}
      currentYear={teamData.currentYear}
    />
  );
}
