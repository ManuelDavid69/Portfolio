import { Component, computed, input } from '@angular/core';
import { DiagramId, L, Lang } from '../../content/types';

interface Node {
  title: L;
  note?: L;
  /** The part I worked on. */
  mine?: boolean;
}

interface Link {
  label: L;
  both?: boolean;
}

interface Chain {
  nodes: Node[];
  links: Link[];
  /** Shown under the chain when the last step goes back to an earlier one. */
  loop?: L;
}

const CHAINS: Partial<Record<DiagramId, Chain>> = {
  'gmao-flow': {
    nodes: [
      { title: { en: 'HR system', fr: 'Outil RH' }, note: { en: 'Employees and contract end dates', fr: 'Salariés et dates de fin de contrat' } },
      { title: { en: 'GMAO', fr: 'GMAO' }, note: { en: 'CARL Source, vehicles and machines', fr: 'CARL Source, véhicules et matériels' }, mine: true },
      { title: { en: 'Finance tools', fr: 'Outils financiers' }, note: { en: 'Maintenance budgets', fr: 'Budgets de maintenance' } },
    ],
    links: [
      { label: { en: 'People job: deactivates leavers', fr: 'Traitement acteurs : désactive les sortants' } },
      { label: { en: 'Equipment job: fixes cost centres', fr: 'Traitement matériels : corrige les codes analytiques' }, both: true },
    ],
  },
  'gmao-loop': {
    nodes: [
      { title: { en: 'Get a token', fr: 'Obtenir un jeton' }, note: { en: 'Login to the CARL Source API', fr: 'Connexion à l’API CARL Source' } },
      { title: { en: 'Read the first page', fr: 'Lire la première page' }, note: { en: 'People whose contract has ended', fr: 'Personnes dont le contrat est terminé' }, mine: true },
      { title: { en: 'Deactivate them', fr: 'Les désactiver' }, note: { en: 'They leave the list', fr: 'Elles sortent de la liste' } },
    ],
    links: [
      { label: { en: '', fr: '' } },
      { label: { en: '', fr: '' } },
    ],
    loop: {
      en: 'Back to the first page until it is empty, then an e-mail report is sent.',
      fr: 'Retour à la première page jusqu’à ce qu’elle soit vide, puis un mail de compte rendu est envoyé.',
    },
  },
  'iot-chain': {
    nodes: [
      { title: { en: 'Sensor micro:bit', fr: 'micro:bit capteur' }, note: { en: 'BME280, light sensor, OLED', fr: 'BME280, capteur de lumière, OLED' } },
      { title: { en: 'Gateway micro:bit', fr: 'micro:bit passerelle' } },
      { title: { en: 'Python server', fr: 'Serveur Python' }, note: { en: 'SQLite, Grafana', fr: 'SQLite, Grafana' } },
      { title: { en: 'Android app', fr: 'Application Android' } },
    ],
    links: [
      { label: { en: 'Radio 2.4 GHz, XOR + nonce', fr: 'Radio 2,4 GHz, XOR + nonce' }, both: true },
      { label: { en: 'UART, XORSHIFT32 + CRC16', fr: 'UART, XORSHIFT32 + CRC16' }, both: true },
      { label: { en: 'UDP', fr: 'UDP' }, both: true },
    ],
  },
};

/** Purge query plan, values from EXPLAIN ANALYZE (PostgreSQL estimates). */
const PLAN = [
  { label: { en: 'Before: sequential scan', fr: 'Avant : parcours séquentiel' }, rows: 150000, ms: 1250 },
  { label: { en: 'After: index scan on a partial index', fr: 'Après : parcours d’un index partiel' }, rows: 150, ms: 2.5 },
];

@Component({
  selector: 'app-diagram',
  template: `
    @if (chain(); as c) {
      <ol class="chain">
        @for (node of c.nodes; track $index; let i = $index) {
          <li class="node" [class.mine]="node.mine">
            <strong>{{ node.title[lang()] }}</strong>
            @if (node.note) {
              <span>{{ node.note[lang()] }}</span>
            }
          </li>
          @if (c.links[i]; as link) {
            <li class="link" aria-hidden="false">
              <span class="arrow" aria-hidden="true">{{ link.both ? '⇄' : '→' }}</span>
              <span class="link-label">{{ link.label[lang()] }}</span>
            </li>
          }
        }
      </ol>
      @if (c.loop) {
        <p class="loop"><span aria-hidden="true">↺</span> {{ c.loop[lang()] }}</p>
      }
    } @else if (id() === 'explain-plan') {
      <div class="plan">
        @for (row of plan; track $index) {
          <div class="plan-row">
            <span class="plan-label">{{ row.label[lang()] }}</span>
            <span class="bar"><span [style.width.%]="(row.ms / maxMs) * 100"></span></span>
            <span class="plan-value">
              {{ format(row.ms) }} ms, {{ format(row.rows) }} {{ lang() === 'fr' ? 'lignes lues' : 'rows read' }}
            </span>
          </div>
        }
      </div>
    }
  `,
  styles: `
    .chain {
      list-style: none;
      margin: 0;
      padding: 1.25rem;
      background: var(--bg-alt);
      border-radius: 3px;
      display: flex;
      align-items: stretch;
      gap: 0.5rem;
    }
    .node {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 0.75rem 0.9rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 3px;
      font-size: 0.875rem;
    }
    .node strong {
      color: var(--heading);
      font-size: 1rem;
    }
    .node span {
      color: var(--muted);
    }
    .node.mine {
      border: 2px solid var(--accent);
    }
    .link {
      flex: 0 1 9rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--text);
      line-height: 1.3;
    }
    .arrow {
      font-size: 1.4rem;
      color: var(--muted);
      line-height: 1;
    }
    @media (max-width: 52rem) {
      .chain {
        flex-direction: column;
      }
      .node,
      .link {
        flex: none;
      }
      .link {
        flex-direction: row;
        gap: 0.6rem;
        justify-content: flex-start;
        text-align: left;
        padding-left: 1rem;
      }
      .arrow {
        transform: rotate(90deg);
      }
    }
    .loop {
      margin: 0.75rem 0 0;
      font-size: 0.925rem;
      color: var(--text);
    }
    .loop span {
      color: var(--accent);
      font-weight: 700;
    }
    .plan {
      display: grid;
      gap: 1.25rem;
      padding: 1.25rem;
      background: var(--bg-alt);
      border-radius: 3px;
    }
    .plan-row {
      display: grid;
      gap: 0.35rem;
    }
    .plan-label {
      color: var(--heading);
      font-weight: 600;
    }
    .bar {
      display: block;
      height: 0.75rem;
      background: var(--bg);
      border-radius: 2px;
    }
    .bar span {
      display: block;
      height: 100%;
      min-width: 3px;
      background: var(--accent);
      border-radius: 2px;
    }
    .plan-value {
      color: var(--muted);
      font-size: 0.875rem;
      font-variant-numeric: tabular-nums;
    }
  `,
})
export class Diagram {
  readonly id = input.required<DiagramId>();
  readonly lang = input.required<Lang>();

  readonly chain = computed(() => CHAINS[this.id()]);
  readonly plan = PLAN;
  readonly maxMs = Math.max(...PLAN.map((r) => r.ms));

  format(n: number) {
    return n.toLocaleString(this.lang() === 'fr' ? 'fr-FR' : 'en-GB');
  }
}
