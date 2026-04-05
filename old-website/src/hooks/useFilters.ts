"use client";

import { useState, useMemo, useCallback } from "react";
import { Experience, FilterState, Category } from "@/types";

const initialFilters: FilterState = {
  categories: [],
  isProject: false,
  isWork: false,
  isClassProject: false,
  isProjectTeam: false,
  filterFeatured: false,
  searchQuery: "",
};

// Case-insensitive search: returns true if query appears anywhere in the text
function textContains(text: string | undefined, query: string): boolean {
  if (!text) return false;
  return text.toLowerCase().includes(query.toLowerCase());
}

// Check if any string in an array contains the query (case-insensitive)
function arrayContains(arr: string[] | undefined, query: string): boolean {
  if (!arr || arr.length === 0) return false;
  const lowerQuery = query.toLowerCase();
  return arr.some((item) => item.toLowerCase().includes(lowerQuery));
}

// Search across all fields of an experience
function matchesSearch(exp: Experience, query: string): boolean {
  if (!query.trim()) return true;

  const searchTerms = query.toLowerCase().trim();

  // Search in title
  if (textContains(exp.title, searchTerms)) return true;

  // Search in description
  if (textContains(exp.description, searchTerms)) return true;

  // Search in skills
  if (arrayContains(exp.skills, searchTerms)) return true;

  // Search in techStack
  if (arrayContains(exp.techStack, searchTerms)) return true;

  // Search in highlights
  if (arrayContains(exp.highlights, searchTerms)) return true;

  // Search in company
  if (textContains(exp.company, searchTerms)) return true;

  // Search in role
  if (textContains(exp.role, searchTerms)) return true;

  // Search in course code and name
  if (textContains(exp.courseCode, searchTerms)) return true;
  if (textContains(exp.courseName, searchTerms)) return true;

  // Search in associatedWith
  if (textContains(exp.associatedWith, searchTerms)) return true;

  // Search in parentOrganization (to find sub-projects by team name)
  if (textContains(exp.parentOrganization, searchTerms)) return true;

  // Search in awards
  if (arrayContains(exp.awards, searchTerms)) return true;

  return false;
}

export function useFilters(experiences: Experience[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredExperiences = useMemo(() => {
    const hasTypeFilters =
      filters.isProject ||
      filters.isWork ||
      filters.isClassProject ||
      filters.isProjectTeam ||
      filters.filterFeatured;

    const filtered = experiences.filter((exp) => {
      // Type filtering (OR logic - if any type filter is active, item must match at least one)
      if (hasTypeFilters) {
        const matchesProject = filters.isProject && exp.isProject;
        const matchesWork = filters.isWork && exp.isWork;
        const matchesClassProject = filters.isClassProject && exp.isClassProject;
        const matchesProjectTeam = filters.isProjectTeam && exp.isProjectTeam;
        const matchesFeatured = filters.filterFeatured && exp.featured;

        if (
          !matchesProject &&
          !matchesWork &&
          !matchesClassProject &&
          !matchesProjectTeam &&
          !matchesFeatured
        ) {
          return false;
        }
      }

      // Category filter (OR logic - if any selected category matches)
      if (filters.categories.length > 0) {
        if (!filters.categories.some((cat) => exp.categories.includes(cat))) {
          return false;
        }
      }

      // Search query - case-insensitive across all fields
      if (filters.searchQuery) {
        if (!matchesSearch(exp, filters.searchQuery)) {
          return false;
        }
      }

      return true;
    });

    // Sort featured items first, then by start date descending
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  }, [experiences, filters]);

  const toggleTypeFilter = useCallback(
    (type: "isProject" | "isWork" | "isClassProject" | "isProjectTeam") => {
      setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
    },
    []
  );

  const toggleFeatured = useCallback(() => {
    setFilters((prev) => ({ ...prev, filterFeatured: !prev.filterFeatured }));
  }, []);

  const toggleCategory = useCallback((category: Category) => {
    setFilters((prev) => {
      const current = prev.categories;
      const updated = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category];
      return { ...prev, categories: updated };
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const activeFilterCount = useMemo(() => {
    return (
      filters.categories.length +
      (filters.isProject ? 1 : 0) +
      (filters.isWork ? 1 : 0) +
      (filters.isClassProject ? 1 : 0) +
      (filters.isProjectTeam ? 1 : 0) +
      (filters.filterFeatured ? 1 : 0)
    );
  }, [filters]);

  return {
    filters,
    filteredExperiences,
    toggleTypeFilter,
    toggleFeatured,
    toggleCategory,
    setSearchQuery,
    clearFilters,
    activeFilterCount,
  };
}
