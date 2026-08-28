import { defineType, defineField } from 'sanity';

/**
 * The editor's handbook, kept inside the Studio itself so an incoming exec
 * finds it without needing a link from anyone. This is the fallback copy —
 * the primary lives at the artifact URL below.
 */
export const handbook = defineType({
  name: 'handbook',
  title: 'Handbook',
  type: 'document',
  fields: [
    defineField({
      name: 'artifactUrl',
      title: 'Nicely formatted version',
      type: 'url',
      description: 'Read this first. The copy below is the fallback if that link ever stops working.',
    }),
    defineField({
      name: 'content',
      title: 'Handbook',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Handbook' }) },
});
