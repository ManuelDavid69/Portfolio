import { DOCUMENT, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type Theme = 'light' | 'dark';
const KEY = 'theme';

/**
 * Light or dark theme. The first choice comes from the system setting.
 * A small script in index.html applies the saved choice before Angular starts, so the page does not flash.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<Theme>(this.initial());

  toggle() {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    this.document.documentElement.dataset['theme'] = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Storage can be blocked (private mode). The theme still changes for this visit.
    }
  }

  private initial(): Theme {
    if (!this.browser) return 'light';
    const set = this.document.documentElement.dataset['theme'];
    if (set === 'dark' || set === 'light') return set;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
