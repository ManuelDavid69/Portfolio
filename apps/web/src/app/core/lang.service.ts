import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { Lang } from '../content/types';
import { UiKey, ui } from '../content/ui';

/**
 * English lives at the root ("/", "/projects/x"), French under "/fr" ("/fr", "/fr/projets/x").
 * The language is read from the URL, so a shared link always opens in the right language.
 */
@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  readonly lang = computed<Lang>(() => langOf(this.url()));

  t(key: UiKey): string {
    return ui(this.lang(), key);
  }

  readonly currentPath = computed(() => this.url().split(/[?#]/)[0]);

  /** The same page in the other language. */
  readonly otherLangUrl = computed(() => {
    const path = this.url().split(/[?#]/)[0];
    return this.lang() === 'fr' ? toEnglish(path) : toFrench(path);
  });
}

export const langOf = (url: string): Lang => (url === '/fr' || url.startsWith('/fr/') || url.startsWith('/fr#') ? 'fr' : 'en');

export const homeUrl = (lang: Lang) => (lang === 'fr' ? '/fr' : '/');

export const projectUrl = (lang: Lang, slug: string) => (lang === 'fr' ? `/fr/projets/${slug}` : `/projects/${slug}`);

const toFrench = (path: string) => {
  const project = path.match(/^\/projects\/([\w-]+)/);
  return project ? projectUrl('fr', project[1]) : '/fr';
};

const toEnglish = (path: string) => {
  const project = path.match(/^\/fr\/projets\/([\w-]+)/);
  return project ? projectUrl('en', project[1]) : '/';
};
