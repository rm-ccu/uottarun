import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

/** Respects the hotspot set in the Studio, so crops keep the subject in frame. */
export const urlFor = (source: Image) => builder.image(source).auto('format').fit('crop');
