import { getFaqs } from '../../sanity/queries';
import { loc } from '../../sanity/locale';
import { FaqPageView } from './FaqPageView';

export const revalidate = 60;

export const metadata = {
  title: 'FAQ — uOttaRun',
  description:
    'When and where uOttaRun meets, what to bring, how to dress for winter, and what to do in an emergency.',
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  // Google reads this to show the questions directly in search results.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: loc(f.question, 'en'),
      acceptedAnswer: { '@type': 'Answer', text: loc(f.answer, 'en') },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqPageView faqs={faqs} />
    </>
  );
}
