import { LucideIcon } from 'lucide-react';

// ===============================================
// SERVICE TYPES (Optimized for EPC)
// ===============================================

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
  category?: string; // Changed to string for full flexibility
  icon?: LucideIcon; // Made optional as you are moving to typography-led design
  features: string[];
  details: ServiceDetails;
}

// ===============================================
// PROJECT & TEAM TYPES
// ===============================================

export interface ProjectDetails {
  client: string;
  location: string;
  duration: string;
  challenge: string;
  solution: string[];
  impact: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  image: string;
  fullDetails?: ProjectDetails;
}

export interface TeamMember {
  id: string;
  name: string;
  shortName?: string;
  role: string;
  title?: string;
  credentials?: string;
  bio: string;
  expertise?: string[];
  image: string;
  linkedin?: string;
}

// ===============================================
// UTILITY TYPES
// ===============================================

export interface StatMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}