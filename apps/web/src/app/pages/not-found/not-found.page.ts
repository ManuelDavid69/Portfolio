import { Component, computed, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LangService, homeUrl } from '../../core/lang.service';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  template: `
    <section class="wrap">
      <h1>{{ i18n.t('notFoundTitle') }}</h1>
      <p>{{ i18n.t('notFoundText') }}</p>
      <a [routerLink]="home()">{{ i18n.t('notFoundBack') }}</a>
    </section>
  `,
  styles: `
    section {
      padding-block: 6rem 2rem;
    }
    h1 {
      font-size: var(--step-4);
      margin-bottom: 1rem;
    }
  `,
})
export class NotFoundPage {
  readonly i18n = inject(LangService);
  readonly home = computed(() => homeUrl(this.i18n.lang()));

  constructor() {
    inject(Title).setTitle(`${this.i18n.t('notFoundTitle')}, Manuel David`);
  }
}
