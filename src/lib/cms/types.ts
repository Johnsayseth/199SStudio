// CMS Types for 199S Studio
// This file defines all data structures for the CMS

// Base content interface
export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

// Concept interface
export interface Concept extends BaseContent {
  category: string;
  description?: string;
  images: string[];
  featured: boolean;
  order: number;
  tags: string[];
}

// Team member interface
export interface TeamMember extends BaseContent {
  position: string;
  bio: string;
  image: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  order: number;
  active: boolean;
}

// User interface for admin
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
  lastLogin?: Date;
  isActive: boolean;
}

// CMS Settings interface
export interface CMSSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
  };
  seoSettings: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
  };
}

// API Response interfaces
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form interfaces
export interface CreateConceptForm {
  title: string;
  category: string;
  description?: string;
  images: File[];
  featured: boolean;
  tags: string[];
}

export interface CreateTeamForm {
  name: string;
  position: string;
  bio: string;
  image: File;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// Search and filter interfaces
export interface ContentFilters {
  status?: "draft" | "published" | "archived";
  category?: string;
  tags?: string[];
  search?: string;
  sortBy?: "title" | "createdAt" | "updatedAt" | "order";
  sortOrder?: "asc" | "desc";
}

// Media interface
export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedAt: Date;
  uploadedBy: string;
  alt?: string;
  caption?: string;
}

// Analytics interface for CMS
export interface CMSAnalytics {
  totalConcepts: number;
  totalTeamMembers: number;
  totalViews: number;
  recentActivity: {
    type: "concept" | "team";
    action: "created" | "updated" | "deleted";
    title: string;
    timestamp: Date;
    user: string;
  }[];
}
