import { Component, input } from '@angular/core';
import { Lang, ProjectCover as CoverId } from '../../content/types';

/**
 * Drawn covers for the work projects that cannot show screenshots of the real apps.
 * Each one is a simplified window of the app built from its real features, with made-up data.
 * They follow the light and dark themes.
 */
@Component({
  selector: 'app-project-cover',
  template: `
    @switch (id()) {
      @case ('gmao') {
        <svg viewBox="0 0 640 360" role="img" [attr.aria-label]="fr() ? 'Fenêtre simplifiée de la GMAO avec des matériels mis à jour' : 'Simplified GMAO window with updated machines'">
          <rect x="40" y="28" width="560" height="304" rx="14" class="window" />
          <path d="M40 42a14 14 0 0 1 14-14h532a14 14 0 0 1 14 14v26H40z" class="titlebar" />
          <circle cx="64" cy="48" r="6" class="dot" /><circle cx="84" cy="48" r="6" class="dot" /><circle cx="104" cy="48" r="6" class="dot" />
          <text x="320" y="55" class="title">{{ fr() ? 'GMAO PARC · Matériels' : 'GMAO PARC · Equipment' }}</text>

          <text x="72" y="108" class="th">{{ fr() ? 'Matériel' : 'Machine' }}</text>
          <text x="262" y="108" class="th">Site</text>
          <text x="420" y="108" class="th">{{ fr() ? 'Code analytique' : 'Cost centre' }}</text>
          <line x1="64" y1="122" x2="576" y2="122" class="rule" />

          @for (row of gmaoRows; track row.machine; let i = $index) {
            <text [attr.x]="72" [attr.y]="160 + i * 46" class="td strong">{{ row.machine }}</text>
            <text [attr.x]="262" [attr.y]="160 + i * 46" class="td">{{ row.site }}</text>
            <text [attr.x]="420" [attr.y]="160 + i * 46" class="td">{{ row.code }}</text>
            <circle [attr.cx]="548" [attr.cy]="153 + i * 46" r="13" class="ok" />
            <path [attr.d]="'M541 ' + (153 + i * 46) + 'l5 5 9-10'" class="tick" />
          }

          <rect x="300" y="282" width="276" height="36" rx="18" class="toast" />
          <text x="438" y="306" class="toast-text">{{ fr() ? 'Mail de compte rendu envoyé' : 'Report e-mail sent' }}</text>
        </svg>
      }
      @case ('casa') {
        <svg viewBox="0 0 640 360" role="img" [attr.aria-label]="fr() ? 'Fenêtre simplifiée de CASA avec filtres et export Excel' : 'Simplified CASA window with filters and Excel export'">
          <rect x="40" y="28" width="560" height="304" rx="14" class="window" />
          <path d="M40 42a14 14 0 0 1 14-14h532a14 14 0 0 1 14 14v26H40z" class="titlebar" />
          <circle cx="64" cy="48" r="6" class="dot" /><circle cx="84" cy="48" r="6" class="dot" /><circle cx="104" cy="48" r="6" class="dot" />
          <text x="320" y="55" class="title">{{ fr() ? 'CASA · Logements' : 'CASA · Housing' }}</text>

          <rect x="64" y="86" width="160" height="38" rx="8" class="select" />
          <text x="80" y="111" class="td">{{ fr() ? 'Région' : 'Region' }}</text>
          <path d="M202 101l6 6 6-6" class="chevron" />
          <path d="M232 105h16" class="link" />
          <rect x="256" y="86" width="160" height="38" rx="8" class="select" />
          <text x="272" y="111" class="td">District</text>
          <path d="M394 101l6 6 6-6" class="chevron" />
          <rect x="440" y="86" width="136" height="38" rx="8" class="button" />
          <text x="508" y="111" class="button-text">Export Excel</text>

          @for (row of casaRows(); track row.label; let i = $index) {
            <line x1="64" [attr.y1]="146 + i * 50" x2="576" [attr.y2]="146 + i * 50" class="rule" />
            <text x="72" [attr.y]="180 + i * 50" class="td strong">{{ row.label }}</text>
            <text x="300" [attr.y]="180 + i * 50" class="td">{{ row.status }}</text>
            @if (row.alert) {
              <path [attr.d]="'M548 ' + (160 + i * 50) + 'l16 28h-32z'" class="alert" />
              <text x="548" [attr.y]="183 + i * 50" class="alert-mark">!</text>
            }
          }
        </svg>
      }
    }
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      background: var(--accent-soft);
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      font-family: var(--font);
    }
    .window {
      fill: var(--card);
      stroke: var(--border);
      stroke-width: 2;
    }
    .titlebar {
      fill: var(--bg-alt);
    }
    .dot {
      fill: var(--border);
    }
    .title {
      font-size: 19px;
      font-weight: 600;
      fill: var(--muted);
      text-anchor: middle;
    }
    .th {
      font-size: 18px;
      font-weight: 600;
      fill: var(--muted);
    }
    .td {
      font-size: 21px;
      fill: var(--text);
    }
    .td.strong {
      font-weight: 600;
      fill: var(--heading);
    }
    .rule {
      stroke: var(--border);
      stroke-width: 2;
    }
    .ok {
      fill: var(--success);
    }
    .tick {
      fill: none;
      stroke: #fff;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .toast {
      fill: var(--accent);
    }
    .toast-text {
      font-size: 17px;
      font-weight: 600;
      fill: var(--on-accent);
      text-anchor: middle;
    }
    .select {
      fill: var(--bg);
      stroke: var(--border);
      stroke-width: 2;
    }
    .chevron,
    .link {
      fill: none;
      stroke: var(--muted);
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .button {
      fill: var(--accent);
    }
    .button-text {
      font-size: 18px;
      font-weight: 600;
      fill: var(--on-accent);
      text-anchor: middle;
    }
    .alert {
      fill: #f59e0b;
    }
    .alert-mark {
      font-size: 18px;
      font-weight: 800;
      fill: #fff;
      text-anchor: middle;
    }
  `,
})
export class ProjectCover {
  readonly id = input.required<CoverId>();
  readonly lang = input.required<Lang>();
  fr = () => this.lang() === 'fr';

  /** Made-up machines, the real ones stay private. */
  readonly gmaoRows = [
    { machine: 'TR-0412', site: 'Grenoble', code: '4310' },
    { machine: 'SA-1187', site: 'Chambéry', code: '4320' },
    { machine: 'TO-0935', site: 'Lyon', code: '4350' },
  ];

  casaRows = () =>
    this.fr()
      ? [
          { label: 'Logement 12', status: 'Occupé', alert: false },
          { label: 'Logement 27', status: 'Occupé', alert: true },
          { label: 'Logement 31', status: 'Libre', alert: false },
        ]
      : [
          { label: 'Home 12', status: 'Occupied', alert: false },
          { label: 'Home 27', status: 'Occupied', alert: true },
          { label: 'Home 31', status: 'Vacant', alert: false },
        ];
}
