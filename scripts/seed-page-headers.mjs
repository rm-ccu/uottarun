/**
 * Uploads the photos that sit behind each page title and points the documents
 * at them.
 *
 *   set -a && source .env.local && set +a && node scripts/seed-page-headers.mjs
 *
 * Source files are read from IMAGE_DIR (default ~/Downloads). This is a one-time
 * import — once it has run, the photos are swapped in the Studio under
 * "Page Headers", and per-year overrides under the Team Year itself.
 *
 * Re-running overwrites these specific fields, so anything an exec has since
 * changed in the Studio would be reset.
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import { homedir } from 'node:os';

const token = process.env.SANITY_WRITE_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!token || !projectId) {
  console.error('Need SANITY_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
});

const IMAGE_DIR = process.env.IMAGE_DIR || join(homedir(), 'Downloads');

const CLUB_PHOTO = 'IMG_8619.jpg';
const FOUNDERS_PHOTO = 'IMG_9538.jpg';
const RUNNERS_PHOTO = 'WhatsApp Image 2026-04-30 at 02.47.17.jpg';
const COFFEE_PHOTO = 'ACC126D8-8554-4D70-AA74-7AEBEB90533D_L0_001-2025-09-17, 3_05_32 PM.jpg';
const SOCIAL_PHOTO = 'IMG_8321 (1).jpg';

/** The year whose header is the founders tribute rather than the club photo. */
const FOUNDERS_YEAR = '2024-25';

/**
 * Where the people are in each source photo, as fractions of the image.
 *
 * The header band is very wide and very short, so an unguided centre crop of a
 * tall photo lands on whatever happens to sit at the middle — which is why the
 * group shots came out cropped through the heads. `y` is the vertical centre of
 * the faces; `height` is how much of the frame the subject occupies, which
 * keeps the crop from tightening onto it.
 *
 * Centre the subject rather than merely including it: the browser crops a
 * second time, symmetrically, to fit whatever height the band settles at, so a
 * group sitting near the top of Sanity's crop still loses its heads.
 */
const HOTSPOTS = {
  [CLUB_PHOTO]: { x: 0.5, y: 0.64, width: 1, height: 0.22 },
  [FOUNDERS_PHOTO]: { x: 0.5, y: 0.43, width: 1, height: 0.3 },
  [SOCIAL_PHOTO]: { x: 0.5, y: 0.615, width: 1, height: 0.22 },
};

const cache = new Map();

async function uploadImage(filename) {
  if (cache.has(filename)) return cache.get(filename);

  const path = join(IMAGE_DIR, filename);
  if (!existsSync(path)) {
    console.error(`  ! missing: ${path}`);
    process.exit(1);
  }

  const asset = await client.assets.upload('image', readFileSync(path), {
    filename: basename(path),
  });
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };

  const spot = HOTSPOTS[filename];
  if (spot) {
    ref.hotspot = { _type: 'sanity.imageHotspot', ...spot };
    ref.crop = { _type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0 };
  }
  cache.set(filename, ref);
  console.log(`  uploaded ${filename}`);
  return ref;
}

const headers = {
  team: CLUB_PHOTO,
  events: RUNNERS_PHOTO,
  faq: RUNNERS_PHOTO,
  collabs: COFFEE_PHOTO,
  join: SOCIAL_PHOTO,
};

console.log(`Reading images from ${IMAGE_DIR}\n`);

const fields = {};
for (const [field, filename] of Object.entries(headers)) {
  fields[field] = await uploadImage(filename);
}

await client.createIfNotExists({ _id: 'pageHeaders', _type: 'pageHeaders' });
await client.patch('pageHeaders').set(fields).commit();
console.log('\n  pageHeaders set:', Object.keys(fields).join(', '));

const foundersYear = await client.fetch(
  '*[_type == "teamYear" && slug.current == $slug][0]{ _id, label }',
  { slug: FOUNDERS_YEAR }
);

if (!foundersYear) {
  console.warn(`\n  ! no team year with slug "${FOUNDERS_YEAR}" — founders photo not applied`);
} else {
  const founders = await uploadImage(FOUNDERS_PHOTO);
  await client.patch(foundersYear._id).set({ headerImage: founders }).commit();
  console.log(`  ${foundersYear.label} header set to the founders photo`);
}

console.log('\nDone.');
