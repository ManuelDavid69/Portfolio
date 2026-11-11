import { L } from './types';

export const PROFILE = {
  name: 'Manuel David',
  firstName: 'Manuel',
  email: 'manu.david0704@gmail.com',
  linkedin: 'https://www.linkedin.com/in/manuel-david-9585a526a/',
  github: 'https://github.com/ManuelDavid69',
  /** Path of the PDF once the new CV is ready, e.g. '/cv/manuel-david-cv-en.pdf'. */
  cv: { en: '', fr: '' } as L,
};

export const ROLE: L = {
  en: 'Computer engineering apprentice at CPE Lyon',
  fr: 'Apprenti ingénieur en informatique à CPE Lyon',
};

export const INTERNSHIP: L = {
  en: 'Internship abroad from 14 June 2027 for 9 to 12 weeks',
  fr: 'Stage à l’étranger à partir du 14 juin 2027 pour 9 à 12 semaines',
};

export const INTRO: L = {
  en: 'I am in my 4th year at CPE Lyon in computer science and networks. I do it as a work-study at AREA, part of the APRR motorway group. In the software department I work on the company’s business applications, mostly on the back end and the databases.',
  fr: 'Je suis en 4e année à CPE Lyon en informatique et réseaux. Je la fais en alternance chez AREA, une société du groupe autoroutier APRR. Au département logiciel je travaille sur les applications métier de l’entreprise, surtout sur le back-end et les bases de données.',
};

export const ABOUT: L[] = [
  {
    en: 'I did not start in computer science. After a baccalaureate in maths and engineering science I studied electrical engineering and industrial computing at IUT Lyon 1. I did my internship and then my work-study at Bouygues Energies & Services on the T6 tramway extension in Lyon. I sized cables and updated electrical drawings. The courses I liked most were always the ones with code, so I chose an engineering school in computer science and networks.',
    fr: 'Je n’ai pas commencé par l’informatique. Après un bac général maths et sciences de l’ingénieur j’ai fait un BUT GEII à l’IUT Lyon 1. J’ai fait mon stage puis mon alternance chez Bouygues Energies & Services sur le prolongement du tramway T6 à Lyon. Je dimensionnais des câbles et je mettais à jour des schémas électriques. Les cours que je préférais étaient toujours ceux avec du code, alors j’ai choisi une école d’ingénieurs en informatique et réseaux.',
  },
  {
    en: 'Since 2025 I have been an apprentice at AREA in the department that maintains the group’s software. I work in the business software team on apps for housing, fleet maintenance and staff representatives. In my free time I build personal projects to learn tools I do not use at work yet.',
    fr: 'Depuis 2025 je suis apprenti chez AREA dans le département qui maintient les logiciels du groupe. Je travaille dans le pôle logiciels de gestion sur des applications pour les logements, la maintenance du parc et les représentants du personnel. Sur mon temps libre je fais des projets personnels pour apprendre des outils que je n’utilise pas encore au travail.',
  },
  {
    en: 'For my internship abroad I want to work in English in a bigger team than mine and see how other companies build software.',
    fr: 'Pour mon stage à l’étranger je veux travailler en anglais dans une équipe plus grande que la mienne et voir comment d’autres entreprises développent leurs logiciels.',
  },
];

export type StepKind = 'education' | 'work';

export interface Step {
  kind: StepKind;
  when: L;
  what: L;
  where: L;
  detail?: L;
  upcoming?: boolean;
}

/** Newest first. */
export const JOURNEY: Step[] = [
  {
    kind: 'work',
    when: { en: 'June 2027', fr: 'Juin 2027' },
    what: { en: 'Internship abroad', fr: 'Stage à l’étranger' },
    where: { en: '9 to 12 weeks', fr: '9 à 12 semaines' },
    detail: { en: 'This is what I am looking for.', fr: 'C’est ce que je recherche.' },
    upcoming: true,
  },
  {
    kind: 'work',
    when: { en: '2025 – 2028', fr: '2025 – 2028' },
    what: { en: 'Engineering apprentice', fr: 'Apprenti ingénieur' },
    where: { en: 'AREA, APRR group (Lyon)', fr: 'AREA, groupe APRR (Lyon)' },
    detail: {
      en: 'Software department, business software team. Projects CASA, GMAO PARC and Digidel.',
      fr: 'Département études et édition logicielle, pôle logiciels de gestion. Projets CASA, GMAO PARC et Digidel.',
    },
  },
  {
    kind: 'education',
    when: { en: '2025 – 2028', fr: '2025 – 2028' },
    what: { en: 'Engineering degree in computer science and networks', fr: 'Diplôme d’ingénieur en informatique et réseaux de communication' },
    where: { en: 'CPE Lyon', fr: 'CPE Lyon' },
    detail: {
      en: 'Master’s level degree (300 ECTS) as a work-study.',
      fr: 'Diplôme de niveau master (300 ECTS) en alternance.',
    },
  },
  {
    kind: 'work',
    when: { en: '2024 – 2025', fr: '2024 – 2025' },
    what: { en: 'Design office technician', fr: 'Technicien bureau d’études' },
    where: { en: 'Bouygues Energies & Services (Lyon)', fr: 'Bouygues Energies & Services (Lyon)' },
    detail: {
      en: 'Internship then work-study on the T6 tramway extension.',
      fr: 'Stage puis alternance sur le prolongement du tramway T6.',
    },
  },
  {
    kind: 'education',
    when: { en: '2022 – 2025', fr: '2022 – 2025' },
    what: { en: 'Bachelor in electrical engineering and industrial computing', fr: 'BUT Génie électrique et informatique industrielle' },
    where: { en: 'IUT Lyon 1, Villeurbanne', fr: 'IUT Lyon 1, Villeurbanne' },
    detail: {
      en: 'Three-year degree (180 ECTS). Automation and industrial computing track.',
      fr: 'Diplôme en trois ans (180 ECTS). Parcours automatisme et informatique industrielle.',
    },
  },
  {
    kind: 'education',
    when: { en: '2022', fr: '2022' },
    what: { en: 'French baccalaureate', fr: 'Baccalauréat général' },
    where: { en: 'Lycée Charlie Chaplin, Décines', fr: 'Lycée Charlie Chaplin, Décines' },
    detail: {
      en: 'Maths and engineering science.',
      fr: 'Mathématiques et sciences de l’ingénieur.',
    },
  },
];

export interface SkillGroup {
  name: L;
  /** Most names are the same in both languages, the others are translated. */
  items: (string | L)[];
}

export const SKILLS: SkillGroup[] = [
  {
    name: { en: 'Languages', fr: 'Langages' },
    items: ['Java', 'Python', 'C', 'C++', 'C#', 'JavaScript', 'TypeScript', 'PHP', 'Go', 'SQL', 'Bash', 'PowerShell'],
  },
  {
    name: { en: 'Back end', fr: 'Back-end' },
    items: ['Spring Boot', 'JPA / Hibernate', 'NestJS', 'FastAPI', 'Flask', 'REST API', 'GraphQL', 'OpenAPI / Swagger', 'Maven', 'Gradle'],
  },
  {
    name: { en: 'Front end and mobile', fr: 'Front-end et mobile' },
    items: ['Angular', 'Vue.js', 'React', 'Next.js', 'Tailwind CSS', 'HTML / CSS', 'Twig', 'React Native (Expo)', 'Android'],
  },
  {
    name: { en: 'Data and AI', fr: 'Données et IA' },
    items: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'InfluxDB', 'Prisma', 'SQLAlchemy', 'Grafana', 'scikit-learn', 'Machine learning'],
  },
  {
    name: { en: 'DevOps and cloud', fr: 'DevOps et cloud' },
    items: ['Git', 'GitHub Actions', 'GitLab', 'Azure DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Azure', 'AWS', 'Prometheus'],
  },
  {
    name: { en: 'Systems', fr: 'Systèmes' },
    items: ['Linux (Ubuntu, Debian)', 'Active Directory', 'Proxmox', 'Hyper-V'],
  },
  {
    name: { en: 'Networks', fr: 'Réseaux' },
    items: ['TCP/IP', 'IPv6', 'VLAN', 'VLSM', 'OSPF', 'BGP', 'RIP', 'ACL', 'IPsec', 'Cisco', 'GNS3', 'Packet Tracer'],
  },
  {
    name: { en: 'Security', fr: 'Sécurité' },
    items: ['OWASP Top 10', 'OAuth2 / OpenID Connect', 'JWT', 'MFA', 'TLS', 'Burp Suite', 'Nmap', 'Nessus', 'OpenVAS', 'SQLi / XSS', { en: 'GDPR', fr: 'RGPD' }],
  },
  {
    name: { en: 'IoT and embedded', fr: 'IoT et embarqué' },
    items: ['micro:bit', 'ESP32', 'STM32', 'PIC16F', 'MQTT', 'LoRaWAN', 'Zigbee', 'Bluetooth', 'MPLAB', 'Keil µVision'],
  },
  {
    name: { en: 'Methods and tools', fr: 'Méthodes et outils' },
    items: ['Scrum', { en: 'V-model', fr: 'Cycle en V' }, 'Gantt', 'MVC', 'SonarQube', 'Postman', 'Figma', 'IntelliJ IDEA', 'VS Code', 'DBeaver', 'Android Studio'],
  },
];

export const SPOKEN: L = {
  en: 'French (native), English, Italian',
  fr: 'Français (langue maternelle), anglais, italien',
};
