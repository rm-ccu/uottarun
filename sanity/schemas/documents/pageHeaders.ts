import { defineType, defineField } from 'sanity';

const HOTSPOT_HINT =
  'Full-bleed photo behind the page title. The band is wide and short, so set the ' +
  'hotspot on the faces — the top and bottom of the photo get cropped away.';

const headerImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    description: HOTSPOT_HINT,
  });

export const pageHeaders = defineType({
  name: 'pageHeaders',
  title: 'Page Headers',
  type: 'document',
  description: 'The photos behind each page title. Leave one empty to fall back to a plain band.',
  fields: [
    headerImage('team', 'Team page — default'),
    headerImage('events', 'Events page'),
    headerImage('faq', 'FAQ page'),
    headerImage('collabs', 'Collabs page'),
    headerImage('join', 'Join page'),
  ],
  preview: { prepare: () => ({ title: 'Page Headers' }) },
});
