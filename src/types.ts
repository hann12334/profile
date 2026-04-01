export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  image_url: string;
  level: number;
  hp: number;
  mp: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  id: number;
  school: string;
  period: string;
  status: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
}
