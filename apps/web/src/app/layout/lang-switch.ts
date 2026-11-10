import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '../core/lang.service';

/** FR / EN switch with a knob that slides under the active language. */
@Component({
  selector: 'app-lang-switch',
  imports: [RouterLink],
  template: `
    <div class="switch" role="group" [attr.aria-label]="i18n.t('langLabel')" [class.en]="i18n.lang() === 'en'">
      <span class="knob" aria-hidden="true"></span>
      <a [routerLink]="frUrl()" hreflang="fr" lang="fr" [attr.aria-current]="i18n.lang() === 'fr' ? 'true' : null">FR</a>
      <a [routerLink]="enUrl()" hreflang="en" lang="en" [attr.aria-current]="i18n.lang() === 'en' ? 'true' : null">EN</a>
    </div>
  `,
  styles: `
    .switch {
      position: relative;
      display: inline-grid;
      grid-template-columns: 1fr 1fr;
      padding: 3px;
      border-radius: 999px;
      background: var(--bg-alt);
      border: 1px solid var(--border);
    }
    .knob {
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 3px;
      width: calc(50% - 3px);
      border-radius: 999px;
      background: var(--accent);
      transition: transform 0.25s ease;
    }
    .switch.en .knob {
      transform: translateX(100%);
    }
    a {
      position: relative;
      z-index: 1;
      min-width: 2.4rem;
      padding: 0.2rem 0.55rem;
      text-align: center;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--muted);
      border-radius: 999px;
      transition: color 0.25s ease;
    }
    a[aria-current='true'] {
      color: var(--on-accent);
      pointer-events: none;
    }
    a:not([aria-current='true']):hover {
      color: var(--heading);
    }
  `,
})
export class LangSwitch {
  readonly i18n = inject(LangService);
  readonly frUrl = computed(() => (this.i18n.lang() === 'fr' ? this.i18n.currentPath() : this.i18n.otherLangUrl()));
  readonly enUrl = computed(() => (this.i18n.lang() === 'en' ? this.i18n.currentPath() : this.i18n.otherLangUrl()));
}
