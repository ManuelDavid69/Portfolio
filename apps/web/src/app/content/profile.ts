import { L } from './types';

export const PROFILE = {
  name: 'Manuel David',
  email: 'manu.david0704@gmail.com',
  linkedin: 'https://www.linkedin.com/in/manuel-david-9585a526a/',
  github: 'https://github.com/ManuelDavid69',
  /** Set to the PDF path once the new CV is ready, e.g. '/cv/manuel-david-cv-en.pdf'. */
  cv: { en: '', fr: '' } as L,
  /** Set to the photo path once Manuel sends it. */
  photo: '',
};

export const INTRO: L = {
  en: 'I study software engineering at CPE Lyon and work at APRR, a French motorway operator, as a work-study developer. There I write the batch jobs and web features that keep business data correct.',
  fr: 'J’étudie l’ingénierie logicielle à CPE Lyon et je suis développeur en alternance chez APRR, société d’autoroutes. J’y écris les traitements et les fonctionnalités web qui gardent les données métier justes.',
};

export interface Step {
  when: L;
  what: L;
  where: L;
  detail?: L;
  upcoming?: boolean;
}

/** Newest first. */
export const JOURNEY: Step[] = [
  {
    when: { en: 'From June 2027', fr: 'À partir de juin 2027' },
    what: { en: 'Internship abroad', fr: 'Stage à l’étranger' },
    where: { en: 'This is what I am looking for', fr: 'C’est ce que je recherche' },
    upcoming: true,
  },
  {
    when: { en: '2025 – today', fr: '2025 – aujourd’hui' },
    what: { en: 'Engineering degree, computer science and networks (IRC)', fr: 'Diplôme d’ingénieur, informatique et réseaux de communication (IRC)' },
    where: { en: 'CPE Lyon', fr: 'CPE Lyon' },
    detail: {
      en: 'Fourth year. Software engineering, networks, security and embedded systems.',
      fr: 'Quatrième année. Génie logiciel, réseaux, sécurité et systèmes embarqués.',
    },
  },
  {
    when: { en: '2025 – today', fr: '2025 – aujourd’hui' },
    what: { en: 'Work-study developer', fr: 'Développeur en alternance' },
    where: { en: 'AREA, APRR group (Lyon)', fr: 'AREA, groupe APRR (Lyon)' },
    detail: {
      en: 'GMAO PARC and CASA during the year, Digidel during summer 2026.',
      fr: 'GMAO PARC et CASA pendant l’année, Digidel pendant l’été 2026.',
    },
  },
  {
    when: { en: '2024 – 2025', fr: '2024 – 2025' },
    what: { en: 'Work-study, design office technician', fr: 'Alternance, technicien bureau d’études' },
    where: { en: 'Bouygues Energies & Services (Lyon)', fr: 'Bouygues Energies & Services (Lyon)' },
    detail: {
      en: 'Electrical drawings for the T6 tramway extension in Lyon.',
      fr: 'Schémas électriques pour le prolongement du tramway T6 à Lyon.',
    },
  },
  {
    when: { en: 'April – July 2024', fr: 'Avril – juillet 2024' },
    what: { en: 'Internship, design office', fr: 'Stage, bureau d’études' },
    where: { en: 'Bouygues Energies & Services (Lyon)', fr: 'Bouygues Energies & Services (Lyon)' },
    detail: {
      en: 'Power calculations and cable and breaker sizing for the same tramway line.',
      fr: 'Bilans de puissance et dimensionnement des câbles et disjoncteurs pour la même ligne de tramway.',
    },
  },
  {
    when: { en: '2022 – 2025', fr: '2022 – 2025' },
    what: { en: 'Bachelor of technology, electrical engineering and industrial computing (BUT GEII)', fr: 'BUT Génie électrique et informatique industrielle (GEII)' },
    where: { en: 'IUT Lyon 1', fr: 'IUT Lyon 1' },
    detail: {
      en: 'Where I started programming: C, Python, PHP, Java and databases, next to automation and electronics.',
      fr: 'Là où j’ai commencé à programmer : C, Python, PHP, Java et bases de données, à côté de l’automatisme et de l’électronique.',
    },
  },
];

export interface SkillGroup {
  name: L;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  { name: { en: 'Languages', fr: 'Langages' }, items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Go', 'PHP', 'SQL', 'C / C++', 'C#'] },
  { name: { en: 'Back end', fr: 'Back end' }, items: ['Spring Boot', 'JPA / Hibernate', 'FastAPI', 'Flask', 'NestJS', 'REST', 'GraphQL', 'OAuth2'] },
  { name: { en: 'Front end and mobile', fr: 'Front end et mobile' }, items: ['Angular', 'Vue.js', 'React', 'Next.js', 'React Native (Expo)', 'Android'] },
  { name: { en: 'Data', fr: 'Données' }, items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Query tuning (EXPLAIN)', 'scikit-learn'] },
  { name: { en: 'Delivery', fr: 'Livraison' }, items: ['Git', 'Docker', 'GitHub Actions', 'Azure DevOps', 'Azure', 'Maven', 'Linux', 'Playwright', 'Jest / Vitest'] },
  { name: { en: 'Networks and security', fr: 'Réseaux et sécurité' }, items: ['TCP/IP', 'VLAN', 'Cisco', 'SSH', 'GDPR by design', 'URL threat analysis'] },
];

export const SPOKEN: L = {
  en: 'French (native), English, Italian.',
  fr: 'Français (langue maternelle), anglais, italien.',
};

export const ABOUT: L[] = [
  {
    en: 'I came to software through electrical engineering. During my first degree I wired PLCs and sized cables for a tramway line, and the parts I enjoyed most were always the ones with code in them. So I moved to an engineering school in computer science and networks.',
    fr: 'Je suis arrivé au logiciel par le génie électrique. Pendant mon BUT, je câblais des automates et je dimensionnais des câbles pour une ligne de tramway, et les parties que je préférais étaient toujours celles où il y avait du code. Je suis donc parti en école d’ingénieurs, en informatique et réseaux.',
  },
  {
    en: 'At work I like the unglamorous jobs that make data right: a batch that runs every night, a purge script that must not lock the database, a bug hidden in a sort. At home I build projects to learn the tools I do not use at work yet, like Go, GraphQL and machine learning for PumpCast.',
    fr: 'Au travail, j’aime les tâches discrètes qui rendent les données justes : un traitement qui tourne chaque nuit, un script de purge qui ne doit pas bloquer la base, un bug caché dans un tri. Chez moi, je construis des projets pour apprendre les outils que je n’utilise pas encore au travail, comme Go, GraphQL et le machine learning pour PumpCast.',
  },
  {
    en: 'Outside of code, I draw and I train at the gym.',
    fr: 'En dehors du code, je dessine et je fais de la musculation.',
  },
];
