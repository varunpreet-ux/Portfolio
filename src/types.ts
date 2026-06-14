export type PageType = 'home' | 'work' | 'about' | 'resume' | 'contact' | 'project';

export interface Milestone {
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  highlights?: string[];
  visualPlaceholder?: string; // description for illustrative styled vector elements / SVG placeholders
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  metrics: { value: string; label: string }[];
  overview: string;
  businessProblem: string;
  userProblem: string;
  research: {
    approach: string;
    insights: string[];
  };
  designProcess: string;
  wireframesDescription: string;
  solution: string;
  outcomes: string[];
  reflections: string;
  imageAlt: string;
  mockupUrl?: string;
}
