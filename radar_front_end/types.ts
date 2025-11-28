import { LucideIcon } from 'lucide-react';

export interface ServiceSection {
  heading: string;
  body: string[];
  type: 'paragraph' | 'list' | 'link';
}

export interface ServiceDetails {
  intro: string;
  sections: ServiceSection[];
  downloadLink?: string;
  downloadText?: string;
  technicalSpecs?: string[];
  flowDiagram?: string;
}

export interface Service {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  details: ServiceDetails;
}

export interface Product {
  id: string | number;
  name: string;
  tagline: string;
  specs: string[];
  image: string;
  type: 'drone' | 'software' | 'service';
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface StatMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ProjectDetails {
  client: string;
  location: string;
  duration: string;
  challenge: string;
  solution: string[];
  impact: string[];
}

export interface Project {
  id: string | number;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  image: string;
  fullDetails?: ProjectDetails;
}

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  bio: string;
  image: string;
}