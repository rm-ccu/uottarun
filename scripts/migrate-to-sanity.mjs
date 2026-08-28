/**
 * HISTORICAL: the one-time import of data/*.json into Sanity, already run.
 * Sanity is now the only source of truth and the JSON files have been removed —
 * recover them from git history (`git show <commit>:data/team.json`) if you ever
 * need to re-seed a fresh dataset.
 *
 * Original usage:
 *
 *   SANITY_WRITE_TOKEN=sk... node scripts/migrate-to-sanity.mjs
 *
 * Idempotent: every document gets a deterministic _id, so re-running updates
 * in place rather than creating duplicates. Images are uploaded once and
 * reused across years (Sophie appears in three rosters, one asset).
 */
import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const root = process.cwd();
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));

const token = process.env.SANITY_WRITE_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!token || !projectId) {
  console.error('Need SANITY_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID in the environment.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false });

const slug = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const assetCache = new Map();
async function uploadImage(publicPath) {
  if (!publicPath) return undefined;
  if (assetCache.has(publicPath)) return assetCache.get(publicPath);
  const file = join(root, 'public', publicPath.replace(/^\//, ''));
  if (!existsSync(file)) {
    console.warn(`  ! missing image, skipped: ${publicPath}`);
    return undefined;
  }
  const asset = await client.assets.upload('image', readFileSync(file), { filename: basename(file) });
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  assetCache.set(publicPath, ref);
  console.log(`  ↑ ${publicPath}`);
  return ref;
}

const L = (en, fr) => ({ _type: 'localeString', en, ...(fr ? { fr } : {}) });
const LT = (en, fr) => ({ _type: 'localeText', en, ...(fr ? { fr } : {}) });

const docs = [];
const push = (d) => { docs.push(d); return { _type: 'reference', _ref: d._id }; };

// ---------- site settings + home ----------
const site = read('data/site.json');
const enStr = read('locales/en/common.json');
const frStr = read('locales/fr/common.json');

docs.push({
  _id: 'siteSettings', _type: 'siteSettings',
  email: site.email,
  socials: site.socials.map((s, i) => ({ _key: `soc${i}`, ...s })),
  instagramUrl: site.socials.find((s) => /instagram/i.test(s.label))?.url || 'https://www.instagram.com/uottarun/',
  memberFormUrl: site.forms.member,
  colorBrand: '#215D7A', colorBrandDark: '#184A64', colorBrandLight: '#DFF0F8',
  colorSecondary: '#9ABD74', colorSecondaryDark: '#7FA55C', colorSecondaryLight: '#EEF7E5',
  colorAccent: '#FFCE00', colorAccentDark: '#E6B800',
  colorBackground: '#FFFFF4', colorSurface: '#F5F5E8',
  fontHeading: 'barlow-condensed', fontBody: 'dm-sans', fontDisplay: 'playfair-display',
});

// ---------- events: labels ----------
const tagRefs = {};
for (const [key, en, fr] of [['coffee', 'Coffee', 'Café'], ['guru', 'Guru', 'Guru'], ['trail', 'Trail', 'Sentier']]) {
  tagRefs[key] = push({ _id: `eventTag-${key}`, _type: 'eventTag', title: L(en, fr), color: 'brand' });
}

// ---------- awards ----------
for (const a of read('data/awards.json')) {
  docs.push({
    _id: `award-${a.id}`, _type: 'award',
    title: L(a.title), issuer: L(a.issuer), year: a.year,
  });
}

// ---------- collabs ----------
const collabsData = read('data/collabs.json');
const CATEGORY_TITLES = {
  charities: ['Charities', 'Organismes de bienfaisance'],
  sponsors: ['Sponsors', 'Commanditaires'],
  uottawaClubs: ['uOttawa Clubs', "Clubs de l'uOttawa"],
  runClubs: ['Run Clubs', 'Clubs de course'],
};

async function buildCollabs() {
  let order = 0;
  for (const [key, items] of Object.entries(collabsData)) {
    const [en, fr] = CATEGORY_TITLES[key] || [key, key];
    const catId = `collabCategory-${slug(key)}`;
    docs.push({
      _id: catId, _type: 'collabCategory',
      title: L(en, fr), order: (order += 10),
      showOnHome: key === 'sponsors',
    });
    let i = 0;
    for (const c of items) {
      docs.push({
        _id: `collab-${c.id}`, _type: 'collab',
        name: c.name,
        ...(c.nameFr ? { nameFr: c.nameFr } : {}),
        description: c.description ? LT(c.description) : undefined,
        category: { _type: 'reference', _ref: catId },
        url: c.url,
        logo: await uploadImage(c.logo),
        order: (i += 10),
      });
    }
  }
}

// ---------- team ----------
const teamData = read('data/team.json');

async function buildTeam() {
  const roleIds = new Map();
  const personIds = new Map();
  let roleOrder = 0;

  const roleRef = (role) => {
    if (!roleIds.has(role)) {
      const id = `execRole-${slug(role)}`;
      roleIds.set(role, id);
      docs.push({
        _id: id, _type: 'execRole',
        title: L(role, frStr.exec_roles?.[role]),
        order: (roleOrder += 10),
      });
    }
    return { _type: 'reference', _ref: roleIds.get(role) };
  };

  // Years are newest-first, so the first sighting of a person is their current
  // photo; that becomes the canonical one on the person document.
  const canonicalImage = new Map();

  const idOwner = new Map();

  const personRef = async (name, image) => {
    const id = `person-${slug(name)}`;
    // Two different names collapsing to one id would silently merge two people.
    const owner = idOwner.get(id);
    if (owner && owner !== name) {
      throw new Error(
        `Person id collision: "${owner}" and "${name}" both slugify to "${id}". ` +
          `If they are the same person, normalise the spelling in data/team.json.`
      );
    }
    idOwner.set(id, name);
    if (!personIds.has(name)) {
      personIds.set(name, id);
      canonicalImage.set(name, image || null);
      docs.push({ _id: id, _type: 'person', name, photo: await uploadImage(image) });
    }
    return { _type: 'reference', _ref: id };
  };

  // A roster entry only carries its own photo when that year's headshot
  // genuinely differed (e.g. rory-mcculloch-2425.jpg).
  const photoOverride = async (name, image) =>
    image && canonicalImage.get(name) !== image ? await uploadImage(image) : undefined;

  for (const y of teamData.years) {
    const exec = [];
    for (const [i, m] of (y.exec || []).entries()) {
      exec.push({
        _key: `e${i}`,
        person: await personRef(m.name, m.image),
        role: roleRef(m.role),
        photo: await photoOverride(m.name, m.image),
      });
    }
    const pacers = [];
    for (const [i, p] of (y.pacers || []).entries()) {
      pacers.push({
        _key: `p${i}`,
        person: await personRef(p.name, p.image),
        season: p.season || 'both',
        photo: await photoOverride(p.name, p.image),
      });
    }
    docs.push({
      _id: `teamYear-${slug(y.id)}`, _type: 'teamYear',
      label: y.label,
      slug: { _type: 'slug', current: y.id },
      isCurrent: y.id === teamData.currentYear,
      pacerFormUrl: y.pacerFormUrl || undefined,
      exec, pacers,
    });
  }
}

// ---------- weekly runs + home ----------
async function buildRest() {
  const ev = read('data/events.json').recurring;

  // Season dates are placeholders — set the real term dates in the Studio.
  const FALL = { name: 'Fall 2026', startDate: '2026-09-08', endDate: '2026-12-05' };
  const WINTER = { name: 'Winter 2027', startDate: '2027-01-12', endDate: '2027-04-10' };

  docs.push({
    _id: 'weeklyRun-tuesday', _type: 'weeklyRun',
    title: L('Tuesday Track', 'Piste du mardi'),
    day: 'tuesday',
    active: true,
    location: L(ev.tuesday.location),
    paceRange: ev.paceGroups.short,
    stravaUrl: ev.tuesday.stravaUrl,
    order: 10,
    seasons: [
      { _key: 'fall', ...FALL, warmup: ev.tuesday.fall.warmup, run: ev.tuesday.fall.run },
      { _key: 'winter', ...WINTER, warmup: ev.tuesday.winter.warmup, run: ev.tuesday.winter.run },
    ],
  });

  docs.push({
    _id: 'weeklyRun-saturday', _type: 'weeklyRun',
    title: L('Saturday Long Run', 'Sortie longue du samedi'),
    day: 'saturday',
    active: true,
    location: L(ev.saturday.location),
    paceRange: ev.paceGroups.long,
    stravaUrl: ev.saturday.stravaUrl,
    order: 20,
    tags: (ev.saturday.alternates || [])
      .map((a, i) => (tagRefs[a] ? { ...tagRefs[a], _key: `alt${i}` } : null))
      .filter(Boolean),
    seasons: [
      { _key: 'fall', ...FALL, warmup: ev.saturday.warmup, run: ev.saturday.run },
      { _key: 'winter', ...WINTER, warmup: ev.saturday.warmup, run: ev.saturday.run },
    ],
  });

  docs.push({
    _id: 'homePage', _type: 'homePage',
    heroImage: await uploadImage('/club-run.jpg'),
    heroHeadlinePre: L(enStr.hero.headline_pre, frStr.hero?.headline_pre),
    heroHeadlineEm: L(enStr.hero.headline_em, frStr.hero?.headline_em),
    heroHeadlinePost: L(enStr.hero.headline_post || ' ', frStr.hero?.headline_post || ' '),
    heroSub: LT(enStr.hero.sub, frStr.hero?.sub),
    stats: [
      { _key: 's1', value: '600+', label: L(enStr.stats.members, frStr.stats?.members) },
      { _key: 's2', value: '15+', label: L(enStr.stats.events_year, frStr.stats?.events_year) },
      { _key: 's3', value: '3', label: L(enStr.stats.years, frStr.stats?.years) },
    ],
  });
}

// ---------- run ----------
console.log('Uploading images and building documents…');
await buildCollabs();
await buildTeam();
await buildRest();

console.log(`\nWriting ${docs.length} documents…`);
let tx = client.transaction();
for (const d of docs) tx = tx.createOrReplace(d);
await tx.commit();

const counts = docs.reduce((a, d) => ({ ...a, [d._type]: (a[d._type] || 0) + 1 }), {});
console.log('\nDone:');
for (const [type, n] of Object.entries(counts).sort()) console.log(`  ${n.toString().padStart(3)}  ${type}`);
console.log(`\n  ${assetCache.size} images uploaded`);
