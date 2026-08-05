import { redirect } from 'next/navigation';
import teamData from '../../data/team.json';

export default function TeamRedirect() {
  redirect(`/team/${teamData.currentYear}`);
}
