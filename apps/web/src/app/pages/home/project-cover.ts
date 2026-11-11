import { Component, input } from '@angular/core';
import { Lang, ProjectCover as CoverId } from '../../content/types';

/** Cover for the work projects that cannot show screenshots: the project name and a flat illustration. */
@Component({
  selector: 'app-project-cover',
  template: `
    <div class="text">
      <span class="name">{{ name() }}</span>
      <span class="sub">{{ sub() }}</span>
    </div>
    <svg viewBox="0 0 120 120" aria-hidden="true" class="art">
      @switch (id()) {
        @case ('gmao') {
          <!-- Maintenance: two gears -->
          <g transform="translate(52 56)">
            @for (a of teeth; track a) {
              <rect x="-6" y="-44" width="12" height="16" rx="3" class="strong" [attr.transform]="'rotate(' + a + ')'" />
            }
            <circle r="32" class="strong" />
            <circle r="13" class="bg" />
          </g>
          <g transform="translate(94 92)">
            @for (a of smallTeeth; track a) {
              <rect x="-4" y="-25" width="8" height="10" rx="2" class="light" [attr.transform]="'rotate(' + a + ')'" />
            }
            <circle r="18" class="light" />
            <circle r="7" class="bg" />
          </g>
        }
        @case ('casa') {
          <!-- Housing: two buildings with windows, some lit -->
          <rect x="8" y="44" width="40" height="68" rx="3" class="light" />
          @for (w of smallWindows; track $index) {
            <rect [attr.x]="w[0]" [attr.y]="w[1]" width="8" height="8" rx="1.5" class="bg" />
          }
          <rect x="44" y="12" width="68" height="100" rx="4" class="strong" />
          @for (w of windows; track $index) {
            <rect [attr.x]="w[0]" [attr.y]="w[1]" width="12" height="11" rx="2" [class.lit]="w[2]" [class.bg]="!w[2]" />
          }
          <rect x="70" y="90" width="16" height="22" rx="2" class="bg" />
          <rect x="4" y="110" width="112" height="4" rx="2" class="strong" />
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
      line-height: 1.3;
      color: var(--muted);
    }
    .art {
      height: 82cqh;
      aspect-ratio: 1;
    }
    .strong {
      fill: var(--accent);
    }
    .light {
      fill: color-mix(in srgb, var(--accent) 45%, var(--bg));
    }
    .bg {
      fill: var(--bg);
    }
    .lit {
      fill: #fbbf24;
    }
  `,
})
export class ProjectCover {
  readonly id = input.required<CoverId>();
  readonly lang = input.required<Lang>();

  readonly teeth = [0, 45, 90, 135, 180, 225, 270, 315];
  readonly smallTeeth = [0, 60, 120, 180, 240, 300];

  /** Windows of the big building: x, y and whether the light is on. */
  readonly windows: [number, number, boolean][] = [
    [54, 22, false], [72, 22, true], [90, 22, false],
    [54, 40, true], [72, 40, false], [90, 40, false],
    [54, 58, false], [72, 58, false], [90, 58, true],
    [54, 76, true], [72, 76, false], [90, 76, false],
  ];

  readonly smallWindows = [
    [14, 52], [26, 52], [14, 66], [26, 66], [14, 80], [26, 80], [14, 94], [26, 94],
  ];

  readonly name = () => (this.id() === 'gmao' ? 'GMAO PARC' : 'CASA');
  readonly sub = () => {
    const fr = this.lang() === 'fr';
    if (this.id() === 'gmao') return fr ? 'Maintenance du parc' : 'Fleet maintenance';
    return fr ? 'Gestion des logements' : 'Housing management';
  };
}
