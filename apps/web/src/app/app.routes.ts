import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { ProjectPage } from './pages/project/project.page';

export const routes: Routes = [
  { path: 'fr', component: HomePage },
  { path: 'fr/projets/:slug', component: ProjectPage },
  { path: '', component: HomePage },
  { path: 'projects/:slug', component: ProjectPage },
  { path: '404', component: NotFoundPage },
  { path: '**', component: NotFoundPage },
];
