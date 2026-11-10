import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService, homeUrl } from '../core/lang.service';
import { PROFILE } from '../content/profile';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  template: `
    <a class="skip" href="#content">{{ i18n.t('skipLink') }}</a>
    <header class="wrap bar">
      <a class="name" [routerLink]="home()">{{ name }}</a>
      <nav [attr.aria-label]="i18n.lang() === 'fr' ? 'Navigation principale' : 'Main'">
        <a [routerLink]="home()" fragment="projects">{{ i18n.t('navProjects') }}</a>
        <a [routerLink]="home()" fragment="journey">{{ i18n.t('navJourney') }}</a>
        <a [routerLink]="home()" fragment="skills">{{ i18n.t('navSkills') }}</a>
        <a [routerLink]="home()" fragment="about">{{ i18n.t('navAbout') }}</a>
        <a [routerLink]="home()" fragment="contact">{{ i18n.t('navContact') }}</a>
        <a class="lang" [routerLink]="i18n.otherLangUrl()" [attr.hreflang]="i18n.lang() === 'fr' ? 'en' : 'fr'"
           [attr.lang]="i18n.lang() === 'fr' ? 'en' : 'fr'" [attr.aria-label]="i18n.t('switchLang')">
          {{ i18n.t('switchLangShort') }}
        </a>
      </nav>
    </header>
  `,
  styles: `
    .bar {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: 0.5rem 2rem;
      padding-block: 1.25rem;
    }
    .name {
      color: var(--ink);
      font-weight: 700;
      text-decoration: none;
      letter-spacing: -0.01em;
    }
    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 1.25rem;
      font-size: var(--step--1);
    }
    nav a {
      color: var(--text);
      text-decoration: none;
    }
    nav a:hover {
      color: var(--accent);
      text-decoration: underline;
    }
    .lang {
      font-weight: 600;
      padding-left: 1.25rem;
      border-left: 1px solid var(--rule);
    }
    .skip {
      position: absolute;
      left: 1rem;
      top: -3rem;
      background: var(--ink);
      color: var(--bg);
      padding: 0.5rem 0.75rem;
      z-index: 10;
    }
    .skip:focus {
      top: 1rem;
    }
  `,
})
export class SiteHeader {
  readonly i18n = inject(LangService);
  readonly name = PROFILE.name;
  readonly home = computed(() => homeUrl(this.i18n.lang()));
}
