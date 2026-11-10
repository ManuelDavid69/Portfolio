import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Hidden field. Real visitors leave it empty, simple bots fill it. */
  website: string;
  lang: string;
}

export interface RepoStats {
  repo: string;
  lastCommitAt: string | null;
  languages: string[];
  stars: number;
}

/**
 * The site is static. The API is only called from the browser, for the two things that cannot be static:
 * sending a message and reading GitHub stats refreshed every night.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  sendContact(message: ContactMessage): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/contact`, message);
  }

  repoStats(): Observable<RepoStats[]> {
    return this.http.get<RepoStats[]>(`${environment.apiUrl}/repos`);
  }
}
