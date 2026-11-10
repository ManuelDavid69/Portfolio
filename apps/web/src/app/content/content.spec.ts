import { ABOUT, INTRO, JOURNEY } from './profile';
import { PROJECTS } from './projects';
import { L } from './types';

/** Collects every bilingual text of an object, however deep it is. */
function texts(value: unknown, found: L[] = []): L[] {
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj['en'] === 'string' && typeof obj['fr'] === 'string') {
      found.push(obj as unknown as L);
    } else {
      Object.values(obj).forEach((v) => texts(v, found));
    }
  }
  return found;
}

describe('site content', () => {
  it('has a unique slug for every project', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has every text in English and in French', () => {
    const all = texts([PROJECTS, JOURNEY, ABOUT, INTRO]);
    expect(all.length).toBeGreaterThan(100);
    // Link labels like "GitHub" are allowed to be the same in both languages.
    for (const t of all) {
      expect(t.en.trim(), JSON.stringify(t)).not.toBe('');
      expect(t.fr.trim(), JSON.stringify(t)).not.toBe('');
    }
  });

  it('never shows a picture without a description', () => {
    const pictures = PROJECTS.flatMap((p) => [
      ...(p.thumbnail ? [p.thumbnail] : []),
      ...p.sections.flatMap((s) =>
        (s.figures ?? []).flatMap((f) => (f.kind === 'picture' ? [f.picture] : f.kind === 'pair' ? f.pictures : [])),
      ),
    ]);
    for (const picture of pictures) {
      expect(picture.src).toMatch(/^\/images\/.+\.webp$/);
      expect(picture.alt.en.length).toBeGreaterThan(10);
      expect(picture.alt.fr.length).toBeGreaterThan(10);
    }
  });
});
