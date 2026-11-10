import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService, homeUrl, projectUrl } from '../../core/lang.service';
import { SeoService } from '../../core/seo.service';
import { PROJECTS, findProject } from '../../content/projects';
import { NotFoundPage } from '../not-found/not-found.page';
import { ProjectFigure } from './project-figure';
import { Icon } from '../../layout/icon';

@Component({
  selector: 'app-project-page',
  imports: [RouterLink, ProjectFigure, NotFoundPage, Icon],
  templateUrl: './project.page.html',
  styleUrl: './project.page.scss',
})
export class ProjectPage {
  /** Filled from the :slug route parameter. */
  readonly slug = input.required<string>();

  readonly i18n = inject(LangService);
  private readonly seo = inject(SeoService);

  readonly lang = this.i18n.lang;
  readonly project = computed(() => findProject(this.slug()));
  readonly home = computed(() => homeUrl(this.lang()));

  readonly next = computed(() => {
    const index = PROJECTS.findIndex((p) => p.slug === this.slug());
    const next = PROJECTS[(index + 1) % PROJECTS.length];
    return { title: next.title, url: projectUrl(this.lang(), next.slug) };
  });

  constructor() {
    effect(() => {
      const project = this.project();
      if (!project) return;
      const lang = this.lang();
      this.seo.update({
        lang,
        title: `${project.title}, Manuel David`,
        description: project.tagline[lang],
        enPath: projectUrl('en', project.slug),
        frPath: projectUrl('fr', project.slug),
      });
    });
  }
}
