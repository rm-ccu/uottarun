import { createImageUrlBuilder } from '@sanity/image-url';
import type { Image } from 'sanity';
import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({ projectId, dataset });

/** Respects the hotspot set in the Studio, so crops keep the subject in frame. */
export const urlFor = (source: Image) => builder.image(source).auto('format').fit('crop');

/**
 * For logos and wordmarks, which must never be cropped or stretched.
 *
 * Takes a width only, and returns the URL rather than the builder, because a
 * height is the trap here: `fit('max')` given both dimensions forces the box's
 * aspect ratio, which squashed the square logos to 2:1. Width alone scales on
 * the long edge and leaves the ratio alone.
 *
 * `max` also never enlarges past the source, so asking generously costs a small
 * logo nothing — it is served at its natural size instead of being upscaled
 * into blur. Quality is raised because the flat colour and hard edges of a logo
 * show compression artefacts far more readily than a photograph does.
 */
export const urlForLogo = (source: Image, width: number): string =>
  builder.image(source).auto('format').fit('max').quality(90).width(width).url();
