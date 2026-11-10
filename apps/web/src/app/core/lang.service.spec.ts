import { homeUrl, langOf, projectUrl } from './lang.service';

describe('language URLs', () => {
  it('reads the language from the URL', () => {
    expect(langOf('/')).toBe('en');
    expect(langOf('/projects/casa')).toBe('en');
    expect(langOf('/fr')).toBe('fr');
    expect(langOf('/fr#contact')).toBe('fr');
    expect(langOf('/fr/projets/casa')).toBe('fr');
    // A page whose name starts with "fr" is not a French page.
    expect(langOf('/frameworks')).toBe('en');
  });

  it('builds the same page in both languages', () => {
    expect(homeUrl('en')).toBe('/');
    expect(homeUrl('fr')).toBe('/fr');
    expect(projectUrl('en', 'gmao-parc')).toBe('/projects/gmao-parc');
    expect(projectUrl('fr', 'gmao-parc')).toBe('/fr/projets/gmao-parc');
  });
});
