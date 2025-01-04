export type ProjectStatus = "active" | "dormant" | "completed";

export interface ProjectGithubStats {
  stars: number;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  paper?: string;
}

export interface ImageProps {
  url: string;
  className: string;
  lightBg: boolean;
}

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
  image: ImageProps;
  tags: string[];
  techs: string[];
  links: ProjectLinks;
  githubStats: ProjectGithubStats;
  featured: boolean;
}
