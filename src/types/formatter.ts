export type ProjectLinks = {
  demo?: string;
  github?: string;
  presentation?: string;
};

export type Troubleshooting = {
  problem: string;
  solution: string;
  result: string;
};

export type MainProjectInput = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  period: string;
  priority: number;
  links: ProjectLinks;
  intro: string;
  roleItems: string[];
  troubleshooting: Troubleshooting[];
  features: string[];
  screenshotCount: number;
};

export type SideProjectInput = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  period: string;
  links: ProjectLinks;
  thumbnail: string;
  intro: string;
  features: string[];
  challenges: string[];
};

export type StackInput = {
  name: string;
  iconSlug: string;
  iconPath?: string;
  proficiency: 1 | 2 | 3 | 4;
  descriptions: string[];
};
