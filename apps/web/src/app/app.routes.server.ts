import { RenderMode, ServerRoute } from '@angular/ssr';
import { PROJECTS } from './content/projects';

const slugs = async () => PROJECTS.map((p) => ({ slug: p.slug }));

/** Every page is rendered to HTML at build time. There is no server at runtime. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'fr', renderMode: RenderMode.Prerender },
  { path: 'projects/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugs },
  { path: 'fr/projets/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugs },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
