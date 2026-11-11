import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService, projectUrl } from '../../core/lang.service';
import { SeoService } from '../../core/seo.service';
import { ABOUT, INTERNSHIP, INTRO, JOURNEY, PROFILE, ROLE, SKILLS, SPOKEN } from '../../content/profile';
import { PROJECTS } from '../../content/projects';
import { ProjectGroup } from '../../content/types';
import { UiKey } from '../../content/ui';
import { Icon, IconName } from '../../layout/icon';
import { ContactForm } from './contact-form';

const GROUPS: { id: ProjectGroup; label: UiKey; desc: UiKey; icon: IconName }[] = [
  { id: 'work', label: 'groupWork', desc: 'groupWorkDesc', icon: 'briefcase' },
  { id: 'personal', label: 'groupPersonal', desc: 'groupPersonalDesc', icon: 'code' },
  { id: 'school', label: 'groupSchool', desc: 'groupSchoolDesc', icon: 'school' },
];

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ContactForm, Icon],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  readonly i18n = inject(LangService);
  private readonly seo = inject(SeoService);

  readonly profile = PROFILE;
  readonly role = ROLE;
  readonly internship = INTERNSHIP;
  readonly intro = INTRO;
  readonly about = ABOUT;
  readonly journey = JOURNEY;
  readonly skills = SKILLS;
  readonly spoken = SPOKEN;

  readonly lang = this.i18n.lang;
  readonly cvUrl = computed(() => PROFILE.cv[this.lang()]);

  readonly groups = GROUPS.map((g) => ({
    ...g,
    projects: PROJECTS.filter((p) => p.group === g.id),
  }));

  readonly projectUrl = projectUrl;

  /** GitHub link of a project, shown as an icon on its card. */
  githubOf(links: { url: string }[]) {
    return links.find((l) => l.url.startsWith('https://github.com/'))?.url;
  }

  constructor() {
    effect(() => {
      const lang = this.lang();
      this.seo.update({
        lang,
        title: this.i18n.t('homeTitle'),
        description: this.i18n.t('homeDescription'),
        enPath: '/',
        frPath: '/fr',
      });
    });
  }
}
