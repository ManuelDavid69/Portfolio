import { Component, input } from '@angular/core';
import { Lang, ProjectCover as CoverId } from '../../content/types';

/**
 * Drawn covers for the work projects that cannot show screenshots of the real app.
 * They summarise the project with its own facts, and follow the light and dark themes.
 */
@Component({
  selector: 'app-project-cover',
  template: `
    @switch (id()) {
      @case ('gmao') {
        <svg viewBox="0 0 640 360" role="img" [attr.aria-label]="fr() ? 'Flux entre l’outil RH, la GMAO et la finance' : 'Flow between HR, the GMAO and finance'">
          <defs>
            <marker id="arrow-gmao" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" class="fill-accent" />
            </marker>
          </defs>

          <!-- HR -->
          <rect x="40" y="130" width="140" height="100" rx="14" class="box" />
          <g transform="translate(92 150)" class="stroke-muted">
            <circle cx="10" cy="8" r="7" /><path d="M-4 34c0-9 6-14 14-14s14 5 14 14" />
            <circle cx="30" cy="10" r="5" /><path d="M26 22c8 0 12 4 12 12" />
          </g>
          <text x="110" y="212" class="label">{{ fr() ? 'Outil RH' : 'HR tool' }}</text>

          <!-- GMAO -->
          <rect x="250" y="110" width="140" height="140" rx="14" class="box main" />
          <g transform="translate(286 140)" class="stroke-accent">
            <rect x="0" y="12" width="44" height="30" rx="3" /><path d="M44 22h14l10 12v8H44" />
            <circle cx="12" cy="46" r="6" class="fill-card" /><circle cx="54" cy="46" r="6" class="fill-card" />
          </g>
          <text x="320" y="222" class="label strong">GMAO</text>

          <!-- Finance -->
          <rect x="460" y="130" width="140" height="100" rx="14" class="box" />
          <text x="530" y="182" class="euro">€</text>
          <text x="530" y="212" class="label">Finance</text>

          <!-- Jobs -->
          <path d="M186 180h58" class="link" marker-end="url(#arrow-gmao)" />
          <path d="M396 180h58" class="link" marker-start="url(#arrow-gmao)" marker-end="url(#arrow-gmao)" />
          <rect x="166" y="76" width="98" height="28" rx="14" class="chip" />
          <text x="215" y="95" class="chip-text">API REST</text>
          <rect x="376" y="76" width="98" height="28" rx="14" class="chip" />
          <text x="425" y="95" class="chip-text">JDBC</text>
          <text x="320" y="300" class="caption">{{ fr() ? 'Deux traitements qui tournent seuls' : 'Two jobs that run on their own' }}</text>
        </svg>
      }
      @case ('casa') {
        <svg viewBox="0 0 640 360" role="img" [attr.aria-label]="fr() ? 'Purge RGPD : 1 250 ms avant l’index, 2,5 ms après' : 'GDPR purge: 1,250 ms before the index, 2.5 ms after'">
          <!-- House -->
          <g transform="translate(60 60)" class="stroke-accent">
            <path d="M0 26 26 4l26 22" /><path d="M8 20v28h36V20" /><path d="M21 48V34h10v14" />
          </g>
          <text x="130" y="84" class="title">{{ fr() ? 'Purge RGPD' : 'GDPR purge' }}</text>
          <text x="130" y="108" class="sub">EXPLAIN ANALYZE</text>

          <!-- Before -->
          <text x="60" y="170" class="bar-label">{{ fr() ? 'Avant l’index' : 'Before the index' }}</text>
          <rect x="60" y="182" width="520" height="22" rx="6" class="track" />
          <rect x="60" y="182" width="520" height="22" rx="6" class="bar-before" />
          <text x="580" y="170" class="value">{{ fr() ? '1 250 ms' : '1,250 ms' }}</text>

          <!-- After -->
          <text x="60" y="250" class="bar-label">{{ fr() ? 'Après l’index' : 'After the index' }}</text>
          <rect x="60" y="262" width="520" height="22" rx="6" class="track" />
          <rect x="60" y="262" width="6" height="22" rx="3" class="bar-after" />
          <text x="580" y="250" class="value accent">{{ fr() ? '2,5 ms' : '2.5 ms' }}</text>
        </svg>
      }
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--accent-soft), var(--bg-alt));
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      font-family: var(--font);
    }
    .box {
      fill: var(--card);
      stroke: var(--border);
      stroke-width: 2;
    }
    .box.main {
      stroke: var(--accent);
      stroke-width: 3;
    }
    .stroke-muted,
    .stroke-accent {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .stroke-muted {
      stroke: var(--muted);
    }
    .stroke-accent {
      stroke: var(--accent);
    }
    .fill-card {
      fill: var(--card);
    }
    .fill-accent {
      fill: var(--accent);
    }
    .link {
      stroke: var(--accent);
      stroke-width: 3;
      fill: none;
    }
    .label,
    .chip-text,
    .caption,
    .euro {
      text-anchor: middle;
    }
    .label {
      font-size: 17px;
      font-weight: 600;
      fill: var(--heading);
    }
    .label.strong {
      font-size: 20px;
      font-weight: 800;
    }
    .euro {
      font-size: 40px;
      font-weight: 700;
      fill: var(--muted);
    }
    .chip {
      fill: var(--accent);
    }
    .chip-text {
      font-size: 13px;
      font-weight: 600;
      fill: var(--on-accent);
    }
    .caption {
      font-size: 15px;
      fill: var(--muted);
    }
    .title {
      font-size: 26px;
      font-weight: 800;
      fill: var(--heading);
    }
    .sub {
      font-size: 15px;
      fill: var(--muted);
      letter-spacing: 0.04em;
    }
    .bar-label {
      font-size: 16px;
      font-weight: 600;
      fill: var(--text);
    }
    .value {
      font-size: 16px;
      font-weight: 700;
      fill: var(--muted);
      text-anchor: end;
    }
    .value.accent {
      fill: var(--accent);
    }
    .track {
      fill: var(--card);
      stroke: var(--border);
    }
    .bar-before {
      fill: var(--muted);
      opacity: 0.55;
    }
    .bar-after {
      fill: var(--accent);
    }
  `,
})
export class ProjectCover {
  readonly id = input.required<CoverId>();
  readonly lang = input.required<Lang>();
  fr = () => this.lang() === 'fr';
}
