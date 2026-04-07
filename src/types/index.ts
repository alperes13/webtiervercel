export interface UserSession {
  token: string;
  phone: string;
  phoneRaw: string;
  email?: string;
  createdAt: number;
  expiresAt: number;
  analysisStatus: 'pending' | 'completed' | 'none';
  credits: number;
}

export interface OTPState {
  attemptsLeft: number;
  timeoutUntil: number | null;
  phone: string;
  contactType: 'phone' | 'email';
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
