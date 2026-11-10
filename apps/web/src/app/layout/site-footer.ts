import { Component, inject } from '@angular/core';
import { LangService } from '../core/lang.service';
import { PROFILE } from '../content/profile';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer class="wrap">
      <p>© {{ year }} {{ profile.name }}</p>
      <p>
        <a [href]="profile.linkedin" rel="me">LinkedIn</a>
        <a [href]="profile.github" rel="me">GitHub</a>
        <a [href]="profile.github + '/davidmanuel.fr'">{{ i18n.t('footerSource') }}</a>
      </p>
    </footer>
  `,
  styles: `
    footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0.5rem 2rem;
      margin-top: 6rem;
      padding-block: 2rem 3rem;
      border-top: 1px solid var(--rule);
      color: var(--muted);
      font-size: var(--step--1);
    }
    p {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 1.25rem;
    }
    a {
      color: var(--muted);
    }
  `,
})
export class SiteFooter {
  readonly i18n = inject(LangService);
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
