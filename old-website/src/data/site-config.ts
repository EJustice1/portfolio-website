// ============================================
// Site Configuration
// ============================================
// This file contains all social links and contact info.
// Update these values to change links across the entire site.
// ============================================

export const siteConfig = {
  // Personal Info
  name: "Ethan Justice",
  email: "ethanjus@umich.edu",
  location: "Ann Arbor, Michigan",

  // Social Links
  social: {
    github: "https://github.com/EJustice1",
    linkedin: "https://www.linkedin.com/in/ethan-justice/",
  },

  // Availability Status
  availability: "Incoming SWE @ Google · YouTube",
};

// Helper to get mailto link
export const getMailtoLink = () => `mailto:${siteConfig.email}`;
