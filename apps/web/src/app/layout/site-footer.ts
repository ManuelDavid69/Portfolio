import { Component, inject } from '@angular/core';
import { LangService } from '../core/lang.service';
import { PROFILE } from '../content/profile';
import { Icon } from './icon';

@Component({
  selector: 'app-site-footer',
  imports: [Icon],
  template: `
    <footer>
      <div class="container inner">
        <p>© {{ year }} {{ profile.name }}</p>
        <div class="links">
          <a [href]="'mailto:' + profile.email" aria-label="E-mail"><app-icon name="mail" /></a>
          <a [href]="profile.linkedin" rel="me" aria-label="LinkedIn"><app-icon name="linkedin" /></a>
          <a [href]="profile.github" rel="me" aria-label="GitHub"><app-icon name="github" /></a>
          <a class="source" [href]="profile.github + '/Portfolio'">{{ i18n.t('footerSource') }}</a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    footer {
      border-top: 1px solid var(--border);
      background: var(--bg-alt);
    }
    .inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-block: 1.75rem;
      font-size: 0.9rem;
      color: var(--muted);
    }
    p {
      margin: 0;
    }
    .links {
      display: flex;
      align-items: center;
      gap: 1.1rem;
    }
    a {
      display: inline-flex;
      color: var(--muted);
      font-size: 1.15rem;
    }
    a:hover {
      color: var(--accent);
    }
    .source {
      font-size: 0.9rem;
    }
  `,
})
export class SiteFooter {
  readonly i18n = inject(LangService);
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
