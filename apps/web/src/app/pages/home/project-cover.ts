import { Component, input } from '@angular/core';
import { Lang, ProjectCover as CoverId } from '../../content/types';

/** Simple cover for the work projects that cannot show screenshots: one icon and the project name. */
@Component({
  selector: 'app-project-cover',
  template: `
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
    <span class="name">{{ name() }}</span>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      width: 100%;
      height: 100%;
      background: var(--accent-soft);
      color: var(--accent);
    }
    .icon {
      width: 4rem;
      height: 4rem;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .name {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--heading);
    }
  `,
})
export class ProjectCover {
  readonly id = input.required<CoverId>();
  readonly lang = input.required<Lang>();
  readonly name = () => (this.id() === 'gmao' ? 'GMAO PARC' : 'CASA');
}
