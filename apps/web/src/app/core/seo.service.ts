import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Lang } from '../content/types';

const SITE = 'https://davidmanuel.fr';

/** Title, description, canonical URL and language alternates, written into the prerendered HTML. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(page: { lang: Lang; title: string; description: string; enPath: string; frPath: string }) {
    const path = page.lang === 'fr' ? page.frPath : page.enPath;

    this.document.documentElement.lang = page.lang;
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: SITE + path });
    this.meta.updateTag({ property: 'og:locale', content: page.lang === 'fr' ? 'fr_FR' : 'en_GB' });

    this.setLink('canonical', SITE + path);
    this.setLink('alternate', SITE + page.enPath, 'en');
    this.setLink('alternate', SITE + page.frPath, 'fr');
    this.setLink('alternate', SITE + page.enPath, 'x-default');
  }

  private setLink(rel: string, href: string, hreflang?: string) {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) link.hreflang = hreflang;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }
}
