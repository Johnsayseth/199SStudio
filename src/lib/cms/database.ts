// CMS Database Layer for 199S Studio
// Uses localStorage for data persistence
// This is a simple implementation that can be replaced with a real database later

import {
  Concept,
  TeamMember,
  AdminUser,
  CMSSettings,
  MediaFile,
  CMSAnalytics,
  APIResponse,
  PaginatedResponse,
  ContentFilters,
} from "./types";

// Database keys
const DB_KEYS = {
  CONCEPTS: "199s_cms_concepts",
  TEAM_MEMBERS: "199s_cms_team_members",
  USERS: "199s_cms_users",
  SETTINGS: "199s_cms_settings",
  MEDIA: "199s_cms_media",
  ANALYTICS: "199s_cms_analytics",
} as const;

// Initialize database with default data
export const initializeDatabase = () => {
  try {
    // Initialize concepts if empty
    if (!localStorage.getItem(DB_KEYS.CONCEPTS)) {
      const defaultConcepts: Concept[] = [
        {
          id: "1",
          title: "Pháo Hoa",
          slug: "phao-hoa",
          category: "Kỷ Yếu",
          description: "Concept chụp ảnh kỷ yếu với pháo hoa",
          images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
          featured: true,
          order: 1,
          tags: ["kỷ yếu", "pháo hoa", "độc đáo"],
          status: "published",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "2",
          title: "BTRR",
          slug: "btrr",
          category: "Kỷ Yếu",
          description: "Concept chụp ảnh kỷ yếu BTRR",
          images: ["/images/4.jpg", "/images/5.jpg"],
          featured: true,
          order: 2,
          tags: ["kỷ yếu", "btrr", "hiện đại"],
          status: "published",
          createdAt: new Date("2024-01-02"),
          updatedAt: new Date("2024-01-02"),
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "3",
          title: "Sky Garden",
          slug: "sky-garden",
          category: "Kỷ Yếu",
          description: "Concept chụp ảnh kỷ yếu Sky Garden",
          images: ["/images/6.jpg", "/images/7.jpg"],
          featured: true,
          order: 3,
          tags: ["kỷ yếu", "sky garden", "thiên nhiên"],
          status: "published",
          createdAt: new Date("2024-01-03"),
          updatedAt: new Date("2024-01-03"),
          createdBy: "admin",
          updatedBy: "admin",
        },
      ];
      localStorage.setItem(DB_KEYS.CONCEPTS, JSON.stringify(defaultConcepts));
    }

    // Initialize team members if empty
    if (!localStorage.getItem(DB_KEYS.TEAM_MEMBERS)) {
      const defaultTeamMembers: TeamMember[] = [
        {
          id: "1",
          title: "Nguyễn Văn A",
          slug: "nguyen-van-a",
          position: "Photographer Chính",
          bio: "Chuyên gia chụp ảnh kỷ yếu với 5 năm kinh nghiệm",
          image: "/images/team-1.jpg",
          order: 1,
          active: true,
          status: "published",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
          createdBy: "admin",
          updatedBy: "admin",
        },
        {
          id: "2",
          title: "Trần Thị B",
          slug: "tran-thi-b",
          position: "Makeup Artist",
          bio: "Chuyên viên trang điểm chuyên nghiệp",
          image: "/images/team-2.jpg",
          order: 2,
          active: true,
          status: "published",
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
          createdBy: "admin",
          updatedBy: "admin",
        },
      ];
      localStorage.setItem(
        DB_KEYS.TEAM_MEMBERS,
        JSON.stringify(defaultTeamMembers)
      );
    }

    // Initialize admin users if empty
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      const defaultUsers: AdminUser[] = [
        {
          id: "1",
          email: "199syearbook@gmail.com",
          name: "Admin 199S Studio",
          role: "admin",
          isActive: true,
        },
      ];
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Initialize settings if empty
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      const defaultSettings: CMSSettings = {
        siteName: "199S Studio - Kỷ Yếu Chuyên Nghiệp",
        siteDescription: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
        contactEmail: "199syearbook@gmail.com",
        contactPhone: "+84 123 456 789",
        socialLinks: {
          facebook: "https://facebook.com/199sstudio.vn",
          instagram: "https://instagram.com/199sstudio",
          tiktok: "https://tiktok.com/@199sstudio",
        },
        seoSettings: {
          defaultTitle: "199S Studio - Kỷ Yếu Chuyên Nghiệp",
          defaultDescription: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
          defaultKeywords: "chụp ảnh kỷ yếu, studio, hà nội, concept",
        },
      };
      localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(defaultSettings));
    }

    // Initialize media if empty
    if (!localStorage.getItem(DB_KEYS.MEDIA)) {
      const defaultMedia: MediaFile[] = [];
      localStorage.setItem(DB_KEYS.MEDIA, JSON.stringify(defaultMedia));
    }

    // Initialize analytics if empty
    if (!localStorage.getItem(DB_KEYS.ANALYTICS)) {
      const defaultAnalytics: CMSAnalytics = {
        totalConcepts: 3,
        totalTeamMembers: 2,
        totalViews: 2140,
        recentActivity: [],
      };
      localStorage.setItem(DB_KEYS.ANALYTICS, JSON.stringify(defaultAnalytics));
    }

    console.log("✅ CMS Database initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize CMS database:", error);
  }
};

// Generic CRUD operations
export const db = {
  // Concepts
  concepts: {
    getAll: (): Concept[] => {
      try {
        const data = localStorage.getItem(DB_KEYS.CONCEPTS);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Failed to get concepts:", error);
        return [];
      }
    },

    getById: (id: string): Concept | null => {
      try {
        const concepts = db.concepts.getAll();
        return concepts.find((c) => c.id === id) || null;
      } catch (error) {
        console.error("Failed to get concept by id:", error);
        return null;
      }
    },

    getBySlug: (slug: string): Concept | null => {
      try {
        const concepts = db.concepts.getAll();
        return concepts.find((c) => c.slug === slug) || null;
      } catch (error) {
        console.error("Failed to get concept by slug:", error);
        return null;
      }
    },

    create: (
      concept: Omit<Concept, "id" | "createdAt" | "updatedAt">
    ): Concept => {
      try {
        const concepts = db.concepts.getAll();
        const newConcept: Concept = {
          ...concept,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        concepts.push(newConcept);
        localStorage.setItem(DB_KEYS.CONCEPTS, JSON.stringify(concepts));
        return newConcept;
      } catch (error) {
        console.error("Failed to create concept:", error);
        throw new Error("Failed to create concept");
      }
    },

    update: (id: string, updates: Partial<Concept>): Concept | null => {
      try {
        const concepts = db.concepts.getAll();
        const index = concepts.findIndex((c) => c.id === id);
        if (index === -1) return null;

        concepts[index] = {
          ...concepts[index],
          ...updates,
          updatedAt: new Date(),
        };
        localStorage.setItem(DB_KEYS.CONCEPTS, JSON.stringify(concepts));
        return concepts[index];
      } catch (error) {
        console.error("Failed to update concept:", error);
        throw new Error("Failed to update concept");
      }
    },

    delete: (id: string): boolean => {
      try {
        const concepts = db.concepts.getAll();
        const filtered = concepts.filter((c) => c.id !== id);
        localStorage.setItem(DB_KEYS.CONCEPTS, JSON.stringify(filtered));
        return true;
      } catch (error) {
        console.error("Failed to delete concept:", error);
        return false;
      }
    },

    getPublished: (): Concept[] => {
      try {
        const concepts = db.concepts.getAll();
        return concepts.filter((c) => c.status === "published");
      } catch (error) {
        console.error("Failed to get published concepts:", error);
        return [];
      }
    },
  },

  // Team Members
  teamMembers: {
    getAll: (): TeamMember[] => {
      try {
        const data = localStorage.getItem(DB_KEYS.TEAM_MEMBERS);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Failed to get team members:", error);
        return [];
      }
    },

    getById: (id: string): TeamMember | null => {
      try {
        const members = db.teamMembers.getAll();
        return members.find((m) => m.id === id) || null;
      } catch (error) {
        console.error("Failed to get team member by id:", error);
        return null;
      }
    },

    create: (
      member: Omit<TeamMember, "id" | "createdAt" | "updatedAt">
    ): TeamMember => {
      try {
        const members = db.teamMembers.getAll();
        const newMember: TeamMember = {
          ...member,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        members.push(newMember);
        localStorage.setItem(DB_KEYS.TEAM_MEMBERS, JSON.stringify(members));
        return newMember;
      } catch (error) {
        console.error("Failed to create team member:", error);
        throw new Error("Failed to create team member");
      }
    },

    update: (id: string, updates: Partial<TeamMember>): TeamMember | null => {
      try {
        const members = db.teamMembers.getAll();
        const index = members.findIndex((m) => m.id === id);
        if (index === -1) return null;

        members[index] = {
          ...members[index],
          ...updates,
          updatedAt: new Date(),
        };
        localStorage.setItem(DB_KEYS.TEAM_MEMBERS, JSON.stringify(members));
        return members[index];
      } catch (error) {
        console.error("Failed to update team member:", error);
        throw new Error("Failed to update team member");
      }
    },

    delete: (id: string): boolean => {
      try {
        const members = db.teamMembers.getAll();
        const filtered = members.filter((m) => m.id !== id);
        localStorage.setItem(DB_KEYS.TEAM_MEMBERS, JSON.stringify(filtered));
        return true;
      } catch (error) {
        console.error("Failed to delete team member:", error);
        return false;
      }
    },

    getActive: (): TeamMember[] => {
      try {
        const members = db.teamMembers.getAll();
        return members.filter((m) => m.active && m.status === "published");
      } catch (error) {
        console.error("Failed to get active team members:", error);
        return [];
      }
    },
  },

  // Users
  users: {
    getAll: (): AdminUser[] => {
      try {
        const data = localStorage.getItem(DB_KEYS.USERS);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Failed to get users:", error);
        return [];
      }
    },

    getByEmail: (email: string): AdminUser | null => {
      try {
        const users = db.users.getAll();
        return users.find((u) => u.email === email) || null;
      } catch (error) {
        console.error("Failed to get user by email:", error);
        return null;
      }
    },

    authenticate: (email: string, password: string): AdminUser | null => {
      try {
        const user = db.users.getByEmail(email);
        if (user && user.isActive) {
          // Simple password check (in production, use proper hashing)
          if (password === "Tinhdoan1995@") {
            return user;
          }
        }
        return null;
      } catch (error) {
        console.error("Authentication failed:", error);
        return null;
      }
    },
  },

  // Settings
  settings: {
    get: (): CMSSettings => {
      try {
        const data = localStorage.getItem(DB_KEYS.SETTINGS);
        if (data) {
          return JSON.parse(data);
        }
        // Return default settings if none exist
        return {
          siteName: "199S Studio - Kỷ Yếu Chuyên Nghiệp",
          siteDescription: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
          contactEmail: "199syearbook@gmail.com",
          contactPhone: "+84 123 456 789",
          socialLinks: {},
          seoSettings: {
            defaultTitle: "199S Studio - Kỷ Yếu Chuyên Nghiệp",
            defaultDescription:
              "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
            defaultKeywords: "chụp ảnh kỷ yếu, studio, hà nội, concept",
          },
        };
      } catch (error) {
        console.error("Failed to get settings:", error);
        // Return default settings on error
        return {
          siteName: "199S Studio - Kỷ Yếu Chuyên Nghiệp",
          siteDescription: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
          contactEmail: "199syearbook@gmail.com",
          contactPhone: "+84 123 456 789",
          socialLinks: {},
          seoSettings: {
            defaultTitle: "199S Studio - Kỷ Yếu Chuyên Nghiệp",
            defaultDescription:
              "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
            defaultKeywords: "chụp ảnh kỷ yếu, studio, hà nội, concept",
          },
        };
      }
    },

    update: (updates: Partial<CMSSettings>): CMSSettings => {
      try {
        const current = db.settings.get();
        const updated = { ...current, ...updates };
        localStorage.setItem(DB_KEYS.SETTINGS, JSON.stringify(updated));
        return updated;
      } catch (error) {
        console.error("Failed to update settings:", error);
        throw new Error("Failed to update settings");
      }
    },
  },

  // Media
  media: {
    getAll: (): MediaFile[] => {
      try {
        const data = localStorage.getItem(DB_KEYS.MEDIA);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error("Failed to get media:", error);
        return [];
      }
    },

    create: (file: File, uploadedBy: string): MediaFile => {
      try {
        const media = db.media.getAll();
        const newMedia: MediaFile = {
          id: Date.now().toString(),
          filename: file.name,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
          uploadedAt: new Date(),
          uploadedBy,
        };
        media.push(newMedia);
        localStorage.setItem(DB_KEYS.MEDIA, JSON.stringify(media));
        return newMedia;
      } catch (error) {
        console.error("Failed to create media:", error);
        throw new Error("Failed to create media");
      }
    },

    delete: (id: string): boolean => {
      try {
        const media = db.media.getAll();
        const filtered = media.filter((m) => m.id !== id);
        localStorage.setItem(DB_KEYS.MEDIA, JSON.stringify(filtered));
        return true;
      } catch (error) {
        console.error("Failed to delete media:", error);
        return false;
      }
    },
  },

  // Analytics
  analytics: {
    get: (): CMSAnalytics => {
      try {
        const data = localStorage.getItem(DB_KEYS.ANALYTICS);
        return data ? JSON.parse(data) : ({} as CMSAnalytics);
      } catch (error) {
        console.error("Failed to get analytics:", error);
        return {} as CMSAnalytics;
      }
    },

    update: (updates: Partial<CMSAnalytics>): CMSAnalytics => {
      try {
        const current = db.analytics.get();
        const updated = { ...current, ...updates };
        localStorage.setItem(DB_KEYS.ANALYTICS, JSON.stringify(updated));
        return updated;
      } catch (error) {
        console.error("Failed to update analytics:", error);
        throw new Error("Failed to update analytics");
      }
    },
  },
};

// Initialize database when module is imported
if (typeof window !== "undefined") {
  initializeDatabase();
}
