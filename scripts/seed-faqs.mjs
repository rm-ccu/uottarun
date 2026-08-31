/**
 * Writes the FAQ entries into Sanity.
 *
 *   set -a && source .env.local && set +a && node scripts/seed-faqs.mjs
 *
 * Documents use stable IDs (`faq-<slug>`), so re-running updates the same
 * entries rather than creating duplicates — but it also overwrites anything an
 * exec has since edited in the Studio. Once this is seeded, edit in the Studio.
 */
import { createClient } from '@sanity/client';

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

const INSTAGRAM = 'https://www.instagram.com/uottarun/';
const STRAVA = 'https://www.strava.com/clubs/1287320/';
const DISCORD = 'https://discord.com/invite/rEbdhWf2VH';

const FAQS = [
  {
    slug: 'when-do-you-run',
    category: 'runs',
    q: ['When do you run?', 'Quand courez-vous ?'],
    a: [
      "During the Fall, every Tuesday at 5:30PM and every Saturday at 10AM. During the winter, every Tuesday at 4:15PM and every Saturday at 10AM. We also have lots of special events and Sunday training plans for upcoming races in Ottawa so keep up to date with our Instagram!",
      "À l'automne, tous les mardis à 17 h 30 et tous les samedis à 10 h. À l'hiver, tous les mardis à 16 h 15 et tous les samedis à 10 h. Nous organisons aussi plusieurs événements spéciaux et des plans d'entraînement le dimanche pour les courses à venir à Ottawa — suivez notre Instagram pour rester à jour !",
    ],
    link: [['Follow us on Instagram', 'Suivez-nous sur Instagram'], INSTAGRAM],
  },
  {
    slug: 'where-do-you-run',
    category: 'runs',
    q: ['Where do you run?', 'Où courez-vous ?'],
    a: [
      "All of our runs either start in front of FSS or UCU Square with some events starting elsewhere, be advised, as it gets colder, we will move inside FSS to meetup. For specific routes, check out our Strava to see all of them but the majority are along the Rideau Canal, River or through town to get to a coffee shop!",
      "Toutes nos courses partent devant le FSS ou la place UCU, et quelques événements partent d'ailleurs. À noter : quand il fera plus froid, nous nous rassemblerons à l'intérieur du FSS. Pour les trajets précis, consultez notre Strava — la majorité longe le canal Rideau ou la rivière, ou traverse la ville jusqu'à un café !",
    ],
    link: [['See our routes on Strava', 'Voir nos trajets sur Strava'], STRAVA],
  },
  {
    slug: 'how-far',
    category: 'runs',
    q: ['How far do you run?', 'Quelle distance courez-vous ?'],
    a: [
      'Distances vary by run and by pace group — there is always a shorter option. Check the Events page for the distance on a given week.',
      "Les distances varient selon la course et le groupe de rythme — il y a toujours une option plus courte. Consultez la page Événements pour la distance d'une semaine donnée.",
    ],
  },
  {
    slug: 'do-i-need-to-sign-up',
    category: 'runs',
    q: ['Do I need to sign up before a run?', "Dois-je m'inscrire avant une course ?"],
    a: [
      'Nope — just show up at the meeting spot a few minutes early and say hi. Filling out our membership form helps us keep you in the loop, but you never need to register for an individual run.',
      "Non — présentez-vous simplement au point de rencontre quelques minutes à l'avance et venez nous dire bonjour. Remplir notre formulaire d'adhésion nous aide à vous tenir informé, mais vous n'avez jamais à vous inscrire à une course en particulier.",
    ],
  },
  {
    slug: 'too-slow',
    category: 'runs',
    q: ["I'm slow — will I get dropped?", 'Je suis lent — vais-je me faire distancer ?'],
    a: [
      'Never. We run in pace groups and every group has a pacer who stays with it from start to finish. All paces and all levels are welcome — nobody finishes alone.',
      "Jamais. Nous courons en groupes de rythme et chaque groupe a un lièvre qui reste avec lui du début à la fin. Tous les rythmes et tous les niveaux sont bienvenus — personne ne termine seul.",
    ],
  },
  {
    slug: 'new-to-running',
    category: 'runs',
    q: ["I've never run before. Is this for me?", "Je n'ai jamais couru. Est-ce pour moi ?"],
    a: [
      "Absolutely. A lot of our members started at their first uOttaRun run. Come to the slowest pace group, walk when you need to, and go from there.",
      "Absolument. Beaucoup de nos membres ont commencé à courir lors de leur première sortie avec uOttaRun. Joignez-vous au groupe le plus lent, marchez au besoin, et allez-y à votre rythme.",
    ],
  },
  {
    slug: 'non-students',
    category: 'runs',
    q: ['Do I have to be a uOttawa student?', "Dois-je être étudiant à l'Université d'Ottawa ?"],
    a: [
      'Our runs are aimed at uOttawa students, but friends are welcome to tag along. Membership itself is free.',
      "Nos courses s'adressent aux étudiants de l'Université d'Ottawa, mais vos amis sont les bienvenus. L'adhésion est gratuite.",
    ],
  },
  {
    slug: 'winter-running',
    category: 'runs',
    q: ['Are you running during the winter?', "Courez-vous pendant l'hiver ?"],
    a: [
      'Yes! Just check "When do you run?" for scheduling changes.',
      "Oui ! Consultez « Quand courez-vous ? » pour les changements d'horaire.",
    ],
  },
  {
    slug: 'bad-weather',
    category: 'runs',
    q: ['What happens if the weather is bad?', 'Que se passe-t-il en cas de mauvais temps ?'],
    a: [
      'We run through most of it. If a run is cancelled or moved, we post it on Instagram and on the Events page of this site.',
      "Nous courons par presque tous les temps. Si une course est annulée ou déplacée, nous l'annonçons sur Instagram et sur la page Événements de ce site.",
    ],
  },
  {
    slug: 'after-the-run',
    category: 'runs',
    q: ['Do you do anything after the run?', 'Faites-vous quelque chose après la course ?'],
    a: [
      'Often! Coffee runs end at a café, and we hold socials through the term — watch Instagram for what is coming up.',
      "Souvent ! Les courses café se terminent dans un café, et nous organisons des activités sociales pendant la session — surveillez Instagram pour la suite.",
    ],
  },
  {
    slug: 'what-to-bring',
    category: 'logistics',
    q: ['What should I bring with me?', "Qu'est-ce que je dois apporter ?"],
    a: [
      'We start and end on-campus so you should only ever need to bring as much as you would need running by yourself!',
      "Nous partons et terminons sur le campus, donc vous n'avez besoin que de ce que vous apporteriez pour courir seul !",
    ],
  },
  {
    slug: 'where-to-leave-things',
    category: 'logistics',
    q: ['Where can I leave my things during the run?', 'Où puis-je laisser mes affaires pendant la course ?'],
    a: [
      'Montpetit has lockers that you only need your lock and student ID to access!',
      'Le complexe Montpetit a des casiers auxquels vous accédez avec seulement votre cadenas et votre carte étudiante !',
    ],
  },
  {
    slug: 'how-to-dress',
    category: 'logistics',
    q: ['How should I dress as it gets colder?', "Comment devrais-je m'habiller quand il fait plus froid ?"],
    a: [
      "Layering is key! A good rule of thumb is prepare as though it's 10°C warmer than the outside temperature and remember that you can always remove layers, much harder to add them later on!",
      "Les couches, c'est la clé ! Une bonne règle : habillez-vous comme s'il faisait 10 °C de plus que la température extérieure, et rappelez-vous que vous pouvez toujours enlever une couche — c'est bien plus difficile d'en ajouter en cours de route !",
    ],
  },
  {
    slug: 'emergency',
    category: 'safety',
    q: ['What do I do in case of an emergency?', "Que faire en cas d'urgence ?"],
    a: [
      "If you ever feel unsafe, uncomfortable or you know of someone that feels like such, immediately inform a pacer. Our executives and pacers are all selected not only based on running acumen but also good vibes and knowledge of Ottawa. In the case that you don't feel comfortable contacting a pacer, speak to either an executive as soon as you can or call VCRT/emergency services. If you are injured and need medical assistance, do a quick judgement call, if you are within 5-10 minutes from campus, call VCRT and then 911, VCRT can call 911 on your behalf if the situation calls for it. Of course though, follow your instincts and be safe!",
      "Si vous vous sentez en danger ou mal à l'aise, ou si vous savez que quelqu'un d'autre l'est, informez immédiatement un lièvre. Nos exécutifs et nos lièvres sont choisis non seulement pour leurs aptitudes en course, mais aussi pour leur bonne attitude et leur connaissance d'Ottawa. Si vous n'êtes pas à l'aise d'en parler à un lièvre, adressez-vous à un membre de l'exécutif dès que possible, ou appelez le VCRT ou les services d'urgence. Si vous êtes blessé et avez besoin d'aide médicale, évaluez rapidement la situation : si vous êtes à 5 à 10 minutes du campus, appelez le VCRT, puis le 911 — le VCRT peut appeler le 911 pour vous si la situation l'exige. Surtout, suivez votre instinct et soyez prudent !",
    ],
  },
  {
    slug: 'get-involved',
    category: 'involved',
    q: ['How do I get involved with uOttaRun?', "Comment puis-je m'impliquer dans uOttaRun ?"],
    a: [
      'Check our Instagram for recent posts regarding new pacers or executives. We often hire towards the start of each semester!',
      "Consultez notre Instagram pour les publications récentes sur le recrutement de lièvres et d'exécutifs. Nous recrutons souvent au début de chaque semestre !",
    ],
    link: [['Follow us on Instagram', 'Suivez-nous sur Instagram'], INSTAGRAM],
  },
  {
    slug: 'group-chat',
    category: 'involved',
    q: ['Is there a group chat?', 'Y a-t-il un groupe de discussion ?'],
    a: [
      'Yes — our Discord is where day-to-day chat, ride-alongs and last-minute changes happen. The link is on our Linktree and in the footer of this site.',
      "Oui — notre Discord est l'endroit où se passent les discussions quotidiennes et les changements de dernière minute. Le lien est sur notre Linktree et dans le pied de page de ce site.",
    ],
    link: [['Join our Discord', 'Rejoignez notre Discord'], DISCORD],
  },
];

const L = ([en, fr]) => ({ en, fr });

const doc = ({ slug, category, q, a, link }, order) => ({
  // Hyphen, not a dot: the public read grant only covers root-path IDs, so a
  // dotted `faq.x` id is invisible to the site's anonymous client.
  _id: `faq-${slug}`,
  _type: 'faq',
  question: L(q),
  answer: L(a),
  category,
  order,
  ...(link ? { linkLabel: L(link[0]), linkUrl: link[1] } : {}),
});

// Sorted globally, then grouped into sections by the page. The 10-step gap
// leaves room for an exec to slot a question in between two others by hand.
const docs = FAQS.map((f, i) => doc(f, (i + 1) * 10));

let tx = client.transaction();
for (const d of docs) tx = tx.createOrReplace(d);
await tx.commit();

console.log(`Wrote ${docs.length} FAQ documents:`);
for (const d of docs) console.log(`  ${d.category.padEnd(10)} ${d.question.en}`);
