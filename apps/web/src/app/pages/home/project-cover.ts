import { Component, input } from '@angular/core';
import { Lang, ProjectCover as CoverId } from '../../content/types';

/** Simple cover for the work projects that cannot show screenshots: a big icon and the project name. */
@Component({
  selector: 'app-project-cover',
  template: `
    <div class="text">
      <span class="name">{{ name() }}</span>
      <span class="sub">{{ sub() }}</span>
    </div>
    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
      @switch (id()) {
        @case ('gmao') {
          <!-- Maintenance truck -->
          <path d="M3 6h11v10H3z" /><path d="M14 9h4l3 4v3h-7" />
          <circle cx="7" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" />
        }
        @case ('casa') {
          <!-- Housing -->
          <path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" />
          <path d="M9 21v-5h6v5" /><path d="M9 10h.01M15 10h.01M9 13h.01M15 13h.01" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 1rem;
      width: 100%;
      height: 100%;
      padding: 0 6% 0 8%;
      /* Sizes follow the card, so the cover stays full on a phone and on a wide screen. */
      container-type: size;
      background: var(--accent-soft);
      color: var(--accent);
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }
    .name {
      font-size: 10cqw;
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.02em;
      color: var(--heading);
    }
    .sub {
      font-size: 4.4cqw;
      color: var(--muted);
    }
    .icon {
      height: 78cqh;
      aspect-ratio: 1;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.25;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class ProjectCover {
  readonly id = input.required<CoverId>();
  readonly lang = input.required<Lang>();
  readonly name = () => (this.id() === 'gmao' ? 'GMAO PARC' : 'CASA');
  readonly sub = () => {
    const fr = this.lang() === 'fr';
    if (this.id() === 'gmao') return fr ? 'Maintenance du parc' : 'Fleet maintenance';
    return fr ? 'Gestion des logements' : 'Housing management';
  };
}
