// ============================================
// Experience Types (Unified)
// ============================================

export type Category =
  | "ai-ml"
  | "full-stack"
  | "embedded"
  | "robotics"
  | "hackathon"
  | "research"
  | "infrastructure"
  | "Computer Systems";

export type LocationType = "on-site" | "remote" | "hybrid";

export type WorkType =
  | "full-time"
  | "part-time"
  | "internship"
  | "research"
  | "project-team";

// Single unified experience interface with boolean flags for type
export interface Experience {
  id: string;
  title: string;
  description: string;

  // Type flags - at least one should be true
  isProject: boolean;
  isWork: boolean;
  isClassProject: boolean;
  isProjectTeam: boolean;

  // Common fields
  categories: Category[];
  skills: string[];        // Skills as strings for flexible matching
  techStack: string[];     // Technologies used (displayed as badges)
  highlights: string[];
  startDate: string;
  endDate?: string;
  featured?: boolean;

  // Links (applicable to any type)
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  posterUrl?: string;

  // Work/Project Team specific
  company?: string;
  companyUrl?: string;
  role?: string;
  location?: string;
  locationType?: LocationType;
  workType?: WorkType;

  // Class project specific
  courseCode?: string;
  courseName?: string;

  // Other
  associatedWith?: string;
  awards?: string[];

  // Parent organization for sub-projects (e.g., FRC robots linked to "Hartland Robotics - FRC Team 3536")
  parentOrganization?: string;
}

// ============================================
// Education Types
// ============================================

export interface Course {
  id: string;
  code: string;
  name: string;
  semester?: string;
  grade?: string;
  description?: string;
  skills: string[];
  isCurrent?: boolean;
}

export type CourseCategoryName =
  | "Computer Science"
  | "Data Science"
  | "Math"
  | "Other";

export interface CourseCategory {
  id: string;
  name: CourseCategoryName;
  courses: Course[];
}

export interface Institution {
  id: string;
  name: string;
  degree: string;
  major: string;
  period: {
    start: string;
    end: string;
  };
  location: string;
  gpa?: string;
  honors: string[];
  activities: string[];
  courseCategories: CourseCategory[];
}

// ============================================
// Filter Types
// ============================================

export interface FilterState {
  categories: Category[];
  isProject: boolean;
  isWork: boolean;
  isClassProject: boolean;
  isProjectTeam: boolean;
  filterFeatured: boolean;
  searchQuery: string;
}

// ============================================
// UI Types
// ============================================

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
