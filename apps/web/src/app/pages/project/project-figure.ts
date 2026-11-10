import { Component, input } from '@angular/core';
import { Figure, Lang } from '../../content/types';
import { Diagram } from './diagram';

@Component({
  selector: 'app-project-figure',
  imports: [Diagram],
  template: `
    @let f = figure();
    @switch (f.kind) {
      @case ('picture') {
        <figure>
          <a [href]="f.picture.src" class="zoom">
            <img [src]="f.picture.src" [alt]="f.picture.alt[lang()]" [width]="f.picture.width" [height]="f.picture.height"
                 loading="lazy" decoding="async" />
          </a>
          @if (f.picture.caption) {
            <figcaption>{{ f.picture.caption[lang()] }}</figcaption>
          }
        </figure>
      }
      @case ('pair') {
        <figure>
          <div class="pair">
            @for (p of f.pictures; track p.src) {
              <a [href]="p.src" class="zoom">
                <img [src]="p.src" [alt]="p.alt[lang()]" [width]="p.width" [height]="p.height" loading="lazy" decoding="async" />
              </a>
            }
          </div>
          <figcaption>{{ f.caption[lang()] }}</figcaption>
        </figure>
      }
      @case ('diagram') {
        <figure>
          <app-diagram [id]="f.id" [lang]="lang()" />
          <figcaption>{{ f.caption[lang()] }}</figcaption>
        </figure>
      }
      @case ('code') {
        <figure>
          <pre><code>{{ f.code }}</code></pre>
          <figcaption>{{ f.caption[lang()] }}</figcaption>
        </figure>
      }
    }
  `,
  styles: `
    figure {
      margin: 2rem 0 2.5rem;
    }
    .zoom {
      display: block;
      cursor: zoom-in;
    }
    img {
      width: 100%;
      border: 1px solid var(--rule);
      border-radius: 3px;
    }
    .pair {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    @media (max-width: 52rem) {
      .pair {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    figcaption {
      max-width: 40rem;
      margin-top: 0.75rem;
      color: var(--muted);
      font-size: var(--step--1);
    }
    pre {
      margin: 0;
      padding: 1rem 1.25rem;
      background: var(--surface);
      border-radius: 3px;
      overflow-x: auto;
      line-height: 1.55;
      color: var(--ink);
    }
  `,
})
export class ProjectFigure {
  readonly figure = input.required<Figure>();
  readonly lang = input.required<Lang>();
}
