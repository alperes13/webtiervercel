export interface UserSession {
  token: string;
  email: string;
  phone?: string;
  phoneRaw?: string;
  createdAt: number;
  expiresAt: number;
  analysisStatus: 'pending' | 'completed' | 'none';
  creditsMini: number;
  creditsUltra: number;
  oauthProvider?: string;
}

export interface AnalysisRequest {
  siteUrl: string;
  phone: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ServiceCard {
  title: string;
  description: string;
  href: string;
  icon: string;
  ctaText: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface PricingPackage {
  name: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
}
