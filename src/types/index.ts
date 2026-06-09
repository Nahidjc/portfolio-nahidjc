export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  resumeUrl: string;
  availableForWork: boolean;
  stats: { label: string; value: string }[];
  social: { platform: string; url: string; icon: string }[];
}

export interface Experience {
  id: string;
  company: string;
  logo: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  achievements: string[];
  impact: string;
  tech: string[];
}

export interface Skill {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  tech: string[];
  status: 'Live' | 'In Progress' | 'Archived';
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string[];
  lessons: string[];
  screenshots: string[];
}

export interface Education {
  id: string;
  institution: string;
  logo: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  date: string;
  credentialUrl?: string;
  image: string;
}

export interface Achievement {
  id: string;
  type: 'award' | 'publication' | 'open-source' | 'speaking' | 'community';
  title: string;
  description: string;
  date: string;
  url?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}

export interface OpenSourceProject {
  id: string;
  name: string;
  description: string;
  stars: string;
  forks: string;
  tech: string[];
  url: string;
}
