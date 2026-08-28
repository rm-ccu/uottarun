/**
 * Writes the editor's handbook into Sanity as a Studio document.
 *
 *   set -a && source .env.local && set +a && node scripts/seed-handbook.mjs
 *
 * Re-running overwrites the document, so edit HANDBOOK below and re-run to
 * update. Anything an exec typed directly into the Studio will be replaced.
 */
import { createClient } from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!token || !projectId) {
  console.error('Need SANITY_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID.');
  process.exit(1);
}

const ARTIFACT_URL = 'https://claude.ai/code/artifact/1bf6c57b-17b6-4a5d-b16a-78f6b57cfaa0';

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
});

/* ---------- a small markdown subset → Portable Text ---------- */

let n = 0;
const key = () => `k${(n += 1).toString(36)}`;

/** Handles **bold**, `code`, and [text](url) inside one line. */
function inline(text) {
  const children = [];
  const markDefs = [];
  const re = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m;

  const push = (t, marks) => {
    if (t) children.push({ _type: 'span', _key: key(), text: t, marks });
  };

  while ((m = re.exec(text)) !== null) {
    push(text.slice(last, m.index), []);
    if (m[1] !== undefined) push(m[1], ['strong']);
    else if (m[2] !== undefined) push(m[2], ['code']);
    else {
      const k = key();
      markDefs.push({ _key: k, _type: 'link', href: m[4] });
      push(m[3], [k]);
    }
    last = re.lastIndex;
  }
  push(text.slice(last), []);
  return { children, markDefs };
}

function block(text, style = 'normal', listItem) {
  const { children, markDefs } = inline(text);
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs,
    children,
    ...(listItem ? { listItem, level: 1 } : {}),
  };
}

function toPortableText(md) {
  const out = [];
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('### ')) out.push(block(line.slice(4), 'h3'));
    else if (line.startsWith('## ')) out.push(block(line.slice(3), 'h2'));
    else if (line.startsWith('> ')) out.push(block(line.slice(2), 'blockquote'));
    else if (/^[-*] /.test(line)) out.push(block(line.slice(2), 'normal', 'bullet'));
    else if (/^\d+\. /.test(line)) out.push(block(line.replace(/^\d+\.\s*/, ''), 'normal', 'number'));
    else out.push(block(line));
  }
  return out;
}

/* ---------- content ---------- */

const HANDBOOK = `
This is the fallback copy. The easier-to-read version is linked in the field above.

Everything on the uOttaRun website — events, rosters, sponsors, colours — is edited from this Studio. No code and no developer required.

## Getting in

Sign in at **uoc-uor.ca/studio** with your own invited email. Never share one account.

Ask the outgoing team to invite you at [sanity.io/manage](https://sanity.io/manage) before they graduate, with the **Editor** role. Editor can change anything on the site. Administrator can also delete the entire content library, so keep that to one or two people.

After you press **Publish**, the website can take up to about two minutes to show the change. That is normal. Refresh after a couple of minutes before assuming it broke.

## Where things live

**Handbook**, **Site Settings** and **Home Page** sit at the top of the sidebar on their own — there is only ever one of each. Everything below them is a list you can add to.

- Cancel this week's run — **Cancellations & Changes**
- Run times, or when a season starts and ends — **Weekly Runs**
- A race, social, or one-off event — **Events**
- The Guru / Coffee / Trail badges — **Event Labels**
- This year's exec or pacers — **Team Years**
- Someone's headshot or name — **People**
- A job title like VP Finance — **Exec Roles**
- Sponsors, charities, club partners — **Collabs & Sponsors**
- Awards on the home page — **Awards**
- Big photo, headline, member counts — **Home Page**
- Email, socials, colours, fonts — **Site Settings**

## Weekly runs

The Tuesday and Saturday runs are not typed in fresh each week. Each run holds a list of **seasons** — date ranges with times attached. The site shows a run only when the next occurrence of its weekday falls inside one of those ranges.

That is what makes the schedule take care of itself: runs appear on their own in September, switch to winter times in January, and disappear over exams and summer without anyone touching them.

### Cancel a run this week

1. Open **Cancellations & Changes** and create a new one.
2. Pick which run, and the exact date it affects.
3. Choose **Cancelled**.
4. Write a short message — it appears on the site, so write it for runners: "Cancelled — freezing rain. See you Saturday!"
5. Publish.

The run shows with a strikethrough and your message, then comes back by itself the following week.

**Never delete a Weekly Run to cancel it.** Deleting removes it permanently, including its whole season schedule, and nobody will remember how to rebuild it. Always use Cancellations & Changes.

### Change a time or place for one week

Same as cancelling, but choose **Time changed** or **Location changed**. The extra box for the new value appears only once you pick that option.

### Set up a new term

1. Open **Weekly Runs** and pick a run.
2. Under **Seasons**, add one.
3. Name it something you will recognise later, like Fall 2027.
4. Set the first and last run dates, and the warm-up and start times for that term.
5. Publish, then repeat for the other run.

Do this in August and December. Adding next term's dates in advance means the runs appear by themselves on day one. Old seasons can stay — the site ignores anything in the past.

### Pause everything, or add a third run day

Every run has a **Show on the site** switch. Turn it off to hide that run regardless of its seasons.

To add a Thursday run, create a new Weekly Run, pick the day, give it a location and at least one season. Nothing in the code needs to change.

## Events

1. Open **Events** and create one.
2. Fill in the name and date. Time, distance and location are all optional.
3. Add a photo if you have one.
4. Add labels like Guru or Trail.
5. Paste the Instagram post link. Leave it blank and the card links to the club account instead.

Events disappear from the site by themselves once the date passes. There is no need to tidy up afterwards, and deleting one loses the record.

The Guru, Coffee and Trail badges come from **Event Labels**. Editing a label there updates it everywhere at once. Make a new label rather than typing a one-off, so they stay consistent.

## The team pages

Each person exists once, in **People**, holding their name and headshot. A **Team Year** then lists who was on that year's exec and what role they held. This is why a returning exec's photo is uploaded once and not every September.

### Set up a new year

1. Open **Team Years** and create one.
2. Label it in the same style as the others, like 2027–28.
3. Let the URL slug fill itself in.
4. Turn on **Current year** — and turn it off on last year's, or the site will not know which to show.
5. Add each exec: pick the person, pick the role.

Anyone new needs a People record first. Anyone returning is already there, and their photo comes along.

### Add the pacer roster

Pacers work the same way: add a row, pick the person, mark them Fall, Winter or Both. For a large intake, create the People records first — the photo can be added later, and until then the site shows their initial rather than a blank space.

### Replace a headshot

Open the person in **People** and upload a new photo. It updates on every year they appear on.

If someone's photo should differ for one specific year — an old headshot on an archived roster — use the **Photo for this year** box on that year's row instead. Leave it empty and the site falls back to their current photo.

Upload any photo, then set the hotspot on the person's face. The site crops around that point automatically at every size. You never need to crop a photo before uploading it.

## Sponsors and partners

Each entry in **Collabs & Sponsors** has a name, description, link, logo and a category. The categories themselves live in **Collab Categories**, so you can add a new grouping without a developer.

Ticking **Show in the home page strip** on a category features it on the home page. Sort order controls the sequence; lower numbers come first.

## Branding

**Site Settings** holds the contact email, social links, membership form URL, ten colour slots and three font choices. Changing the brand colour there restyles the whole site.

Nothing stops you picking a pale colour that sits behind white text. Change one colour at a time and look at the site afterwards, especially the navigation bar and the buttons.

Fonts are a fixed list of six. That limit is deliberate — the site loads fonts in a way that keeps pages fast, which only works for fonts prepared in advance. Adding a seventh needs a developer, briefly.

## French

Most text boxes appear twice, English and French side by side. English is required. Leaving French empty is allowed, and the Studio flags it as missing rather than blocking you.

If French is missing, the site shows the English text in its place. Nothing breaks and nothing goes blank — but a visitor reading in French sees English, which for a bilingual club at a bilingual university is worth avoiding.

Photos, logos, links, dates, times and pace ranges have no language. Neither do most proper nouns — a sponsor called Patagonia is Patagonia in both. Only fill in a French name where it genuinely differs, like GeeGees Rowing becoming GeeGees Aviron.

Machine translation is a reasonable starting point for longer descriptions, but read it before publishing. Visibly poor French on a uOttawa club site costs more credibility than it saves time.

## Handing over

This is the part that fails. The site outlives every exec team, and it breaks in the year nobody can log in.

- Invite the incoming execs to this Studio, with the Editor role.
- Make at least one of them an Administrator so they can invite the team after them.
- Confirm the club email account owns the Studio, the hosting and the domain — not a personal account.
- Walk one of them through cancelling a run. It is the task they will need first.
- Add next term's season dates to both weekly runs before you go.
- Point them at this handbook.

Accounts registered to a personal student email stop being reachable after graduation, and the club loses the ability to edit or renew its own website. If anything is still tied to a personal account, move it before that becomes someone else's emergency.
`;

const content = toPortableText(HANDBOOK);

await client.createOrReplace({
  _id: 'handbook',
  _type: 'handbook',
  artifactUrl: ARTIFACT_URL,
  content,
});

console.log(`✓ handbook written — ${content.length} blocks`);
