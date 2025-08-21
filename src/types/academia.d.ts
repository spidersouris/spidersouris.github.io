export interface AcademiaItem {
  title: string;
  anchorId: string;
  date: string;
  authors: string[];
  eventName: string;
  location?: string;
  type: "talk" | "poster" | "paper";
  english?: string;
  doi?: string;
  material: string;
  info?: string;
  website: string;
  featured: boolean;
}

// Specific interfaces
export interface Presentation extends AcademiaItem {}

export interface Paper extends AcademiaItem {
  subtype: "preprint" | "conference" | "journal";
  repo: string;
  poster: string;
  video: string;
  slides: string;
  abstract: string;
}

export interface Teaching {
  course: string;
  institution: string;
  level: string;
  period: string;
  fullResp: boolean;
  slides: string[];
}
