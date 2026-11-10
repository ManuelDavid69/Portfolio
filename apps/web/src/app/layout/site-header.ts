import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService, homeUrl } from '../core/lang.service';
import { ThemeService } from '../core/theme.service';
import { PROFILE } from '../content/profile';
import { Icon } from './icon';
import { LangSwitch } from './lang-switch';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, Icon, LangSwitch],
  template: `
    <a class="skip" href="#content">{{ i18n.t('skipLink') }}</a>
    <header>
      <div class="container bar">
        <a class="brand" [routerLink]="home()">{{ name }}</a>

        <nav id="main-nav" [class.open]="menuOpen()" [attr.aria-label]="i18n.t('menu')">
          <a [routerLink]="home()" fragment="projects" (click)="menuOpen.set(false)">{{ i18n.t('navProjects') }}</a>
          <a [routerLink]="home()" fragment="skills" (click)="menuOpen.set(false)">{{ i18n.t('navSkills') }}</a>
          <a [routerLink]="home()" fragment="about" (click)="menuOpen.set(false)">{{ i18n.t('navAbout') }}</a>
          <a [routerLink]="home()" fragment="journey" (click)="menuOpen.set(false)">{{ i18n.t('navJourney') }}</a>
          <a [routerLink]="home()" fragment="contact" (click)="menuOpen.set(false)">{{ i18n.t('navContact') }}</a>
        </nav>

        <div class="tools">
          <app-lang-switch />
          <button type="button" class="icon-btn" (click)="theme.toggle()" [attr.aria-label]="i18n.t('themeLabel')">
            <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" />
          </button>
          <button type="button" class="icon-btn menu-btn" (click)="menuOpen.set(!menuOpen())"
                  aria-controls="main-nav" [attr.aria-expanded]="menuOpen()" [attr.aria-label]="i18n.t('menu')">
            <app-icon [name]="menuOpen() ? 'close' : 'menu'" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: `
    header {
      position: sticky;
      top: 0;
      z-index: 20;
      background: color-mix(in srgb, var(--bg) 88%, transparent);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border);
    }
    .bar {
      display: flex;
      align-items: center;
      gap: 2rem;
      height: var(--header-h);
    }
    .brand {
      white-space: nowrap;
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--heading);
      margin-right: auto;
    }
    nav {
      display: flex;
      gap: 1.75rem;
    }
    @media (max-width: 64rem) {
      .bar {
        gap: 1rem;
      }
      nav {
        gap: 0.9rem;
      }
      nav a {
        font-size: 0.875rem;
      }
      .tools {
        gap: 0.35rem;
      }
    }
    nav a {
      white-space: nowrap;
      color: var(--text);
      font-size: 0.95rem;
      font-weight: 500;
    }
    nav a:hover {
      color: var(--accent);
    }
    .tools {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      background: var(--card);
      color: var(--heading);
      font-size: 1.1rem;
      cursor: pointer;
    }
    .icon-btn:hover {
      color: var(--accent);
      border-color: var(--accent);
    }
    .menu-btn {
      display: none;
    }
    @media (max-width: 42rem) {
      .menu-btn {
        display: inline-flex;
      }
      nav {
        display: none;
        position: absolute;
        top: var(--header-h);
        left: 0;
        right: 0;
        flex-direction: column;
        gap: 0;
        padding: 0.5rem var(--gutter) 1rem;
        background: var(--bg);
        border-bottom: 1px solid var(--border);
        box-shadow: var(--shadow);
      }
      nav.open {
        display: flex;
      }
      nav a {
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border);
      }
      nav a:last-child {
        border-bottom: 0;
      }
    }
    .skip {
      position: absolute;
      left: 1rem;
      top: -3rem;
      z-index: 30;
      padding: 0.5rem 0.75rem;
      background: var(--accent);
      color: var(--on-accent);
      border-radius: var(--radius-sm);
    }
    .skip:focus {
      top: 0.75rem;
    }
  `,
})
export class SiteHeader {
  readonly i18n = inject(LangService);
  readonly theme = inject(ThemeService);
  readonly name = PROFILE.name;
  readonly home = computed(() => homeUrl(this.i18n.lang()));
  readonly menuOpen = signal(false);
}
