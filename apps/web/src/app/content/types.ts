export type Lang = 'en' | 'fr';

/** A piece of text written in both languages. */
export interface L {
  en: string;
  fr: string;
}

export type ProjectGroup = 'work' | 'personal' | 'school';

export interface Picture {
  src: string;
  width: number;
  height: number;
  alt: L;
  caption?: L;
}

/** Diagrams are drawn in HTML/SVG so they follow the page language and theme. */
export type DiagramId = 'gmao-flow' | 'gmao-loop' | 'explain-plan' | 'iot-chain';

export type Figure =
  | { kind: 'picture'; picture: Picture }
  | { kind: 'pair'; pictures: [Picture, Picture]; caption: L }
  | { kind: 'diagram'; id: DiagramId; caption: L };

export interface Section {
  title: L;
  paragraphs?: L[];
  bullets?: L[];
  figures?: Figure[];
}

export interface ProjectLink {
  label: L;
  url: string;
}

export interface Project {
  slug: string;
  group: ProjectGroup;
  title: string;
  year: string;
  tagline: L;
  context: L;
  period: L;
  role: L;
  team: L;
  stack: string[];
  links: ProjectLink[];
  /** Shown in the project list. Projects without one get a plain text tile. */
  thumbnail?: Picture;
  sections: Section[];
}
