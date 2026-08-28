import { defineType, defineField } from 'sanity';

const DAYS = [
  { title: 'Monday', value: 'monday' },
  { title: 'Tuesday', value: 'tuesday' },
  { title: 'Wednesday', value: 'wednesday' },
  { title: 'Thursday', value: 'thursday' },
  { title: 'Friday', value: 'friday' },
  { title: 'Saturday', value: 'saturday' },
  { title: 'Sunday', value: 'sunday' },
];

/**
 * A standing weekly run. It appears on the site only while today falls inside
 * one of its seasons — that is what controls "is this posted right now",
 * and the season also carries the times, so the fall/winter switch is one edit.
 */
export const weeklyRun = defineType({
  name: 'weeklyRun',
  title: 'Weekly Run',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'localeString',
      description: 'e.g. Tuesday Track',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day',
      title: 'Day of the week',
      type: 'string',
      options: { list: DAYS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Show on the site',
      type: 'boolean',
      description:
        'Master switch. Turn off to hide this run entirely, regardless of the seasons below.',
      initialValue: true,
    }),
    defineField({ name: 'location', title: 'Location', type: 'localeString' }),
    defineField({
      name: 'paceRange',
      title: 'Pace range',
      type: 'string',
      description: 'e.g. 4:30–7:30 /km',
    }),
    defineField({
      name: 'tags',
      title: 'Labels',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'eventTag' }] }],
      description: 'e.g. Coffee / Guru. Shown as badges on the run.',
    }),
    defineField({
      name: 'seasons',
      title: 'Seasons',
      type: 'array',
      description:
        'The run shows on the site only during these date ranges. Outside them it is automatically hidden — this is how the run comes back each September without anyone editing code.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Season name',
              type: 'string',
              description: 'e.g. Fall 2026',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'startDate',
              title: 'First run',
              type: 'date',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'endDate',
              title: 'Last run',
              type: 'date',
              validation: (Rule) =>
                Rule.required().min(Rule.valueOfField('startDate')).error(
                  'The last run must be on or after the first run.'
                ),
            }),
            defineField({ name: 'warmup', title: 'Warm-up time', type: 'string' }),
            defineField({
              name: 'run',
              title: 'Run start time',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', start: 'startDate', end: 'endDate', run: 'run' },
            prepare: ({ title, start, end, run }) => ({
              title,
              subtitle: `${start} → ${end}  ·  ${run || 'no time set'}`,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.min(1).warning('With no season set, this run never appears.'),
    }),
    defineField({ name: 'stravaUrl', title: 'Strava club URL', type: 'url' }),
    defineField({ name: 'order', title: 'Sort order', type: 'number', initialValue: 100 }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title.en', day: 'day', active: 'active' },
    prepare: ({ title, day, active }) => ({
      title,
      subtitle: active ? day : `${day} — hidden`,
    }),
  },
});
