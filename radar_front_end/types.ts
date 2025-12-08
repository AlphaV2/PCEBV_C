import { LucideIcon } from 'lucide-react';

// ===============================================
// PRODUCT TYPES
// ===============================================

export interface Product {
  id: string | number;
  name: string;
  tagline: string;
  type: 'drone' | 'software' | 'service' | 'hardware' | 'sensor';
  category?: 'drone' | 'sensor' | 'mapping' | 'mapping-surveillance';
  subtype?: string; // e.g., 'npk' for NPK Sensor
  description: string;
  image: string;
  specs: string[];
  price?: string;
  inStock?: boolean;
  serviceIds?: string[]; // Link to related services
}

// ===============================================
// SERVICE TYPES
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
  icon: LucideIcon;
  features: string[];
  details: ServiceDetails;
}

// ===============================================
// GALLERY TYPES
// ===============================================

export interface GalleryImage {
  id: string | number;
  src: string;
  title: string;
  type: 'drone' | 'event';
  exhibition?: string; // e.g., 'AgroTech 2024'
  category?: string; // e.g., 'surveillance', 'spraying'
}

// ===============================================
// ANALYTICS TYPES
// ===============================================

export interface AnalyticsEvent {
  eventName: string;
  eventCategory: 'engagement' | 'product' | 'service' | 'page_view' | 'conversion';
  eventValue?: number;
  timestamp: Date;
  userIP?: string;
  userAgent?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface TrackingData {
  visitorIP: string;
  pageViews: number;
  lastVisit: Date;
  events: AnalyticsEvent[];
  conversionFunnel?: 'interested' | 'inquiry' | 'quote' | 'customer';
}

// ===============================================
// PROJECT TYPES
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
  id: string | number;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  image: string;
  fullDetails?: ProjectDetails;
}

// ===============================================
// TESTIMONIAL TYPES
// ===============================================

export interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

// ===============================================
// TEAM TYPES
// ===============================================

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

// ===============================================
// STATS TYPES
// ===============================================

export interface StatMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}