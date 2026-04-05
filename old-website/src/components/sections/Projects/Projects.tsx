"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Github,
  ExternalLink,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  MapPin,
  Calendar,
  Image,
  Users,
  Star,
} from "lucide-react";
import { BlueprintCard, BlueprintBadge } from "@/components/ui";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { experiences, allCategories } from "@/data/experiences";
import { useFilters } from "@/hooks/useFilters";
import { formatDateRange } from "@/lib/utils";
import { Category } from "@/types";

const categoryLabels: Record<string, string> = {
  "ai-ml": "AI/ML",
  "full-stack": "Full-Stack",
  infrastructure: "Infrastructure",
  "Computer Systems": "Systems",
  research: "Research",
  embedded: "Embedded",
  robotics: "Robotics",
  hackathon: "Hackathon",
};

// Skill examples for animated placeholder
const skillExamples = [
  "Python",
  "PyTorch",
  "React",
  "C++",
  "Docker",
  "vLLM",
  "TypeScript",
  "MongoDB",
  "ROS",
  "LangChain",
];

// Animated placeholder component
function AnimatedPlaceholder({ isActive }: { isActive: boolean }) {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isActive) return; // Don't animate when input is active

    const currentSkill = skillExamples[currentSkillIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentSkill.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentSkill.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentSkillIndex((prev) => (prev + 1) % skillExamples.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentSkillIndex, isActive]);

  if (isActive) return null;

  return (
    <span className="pointer-events-none text-[var(--blueprint-text-dim)]">
      Search: {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Get display type label for an experience
function getTypeLabel(exp: { isProject: boolean; isWork: boolean; isClassProject: boolean; isProjectTeam: boolean; workType?: string }) {
  if (exp.isProjectTeam) return "project team";
  if (exp.isClassProject) return "class project";
  if (exp.isWork) return exp.workType || "work";
  if (exp.isProject) return "project";
  return "experience";
}

// Get badge variant for an experience type
function getBadgeVariant(exp: { isProject: boolean; isWork: boolean; isClassProject: boolean; isProjectTeam: boolean; workType?: string }) {
  if (exp.workType === "research") return "success";
  if (exp.workType === "internship") return "default";
  if (exp.isProjectTeam) return "warning";
  if (exp.isClassProject) return "warning";
  return "accent";
}

export function Projects() {
  const {
    filters,
    filteredExperiences,
    toggleTypeFilter,
    toggleFeatured,
    toggleCategory,
    setSearchQuery,
    clearFilters,
    activeFilterCount,
  } = useFilters(experiences);

  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Listen for experience-clicked events from the Experience timeline
  useEffect(() => {
    const handleExperienceClick = (event: CustomEvent<{ search: string }>) => {
      setSearchQuery(event.detail.search);
    };

    // Check URL for initial search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }

    window.addEventListener(
      "experience-clicked",
      handleExperienceClick as EventListener
    );

    return () => {
      window.removeEventListener(
        "experience-clicked",
        handleExperienceClick as EventListener
      );
    };
  }, [setSearchQuery]);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
              <span className="text-[var(--blueprint-text-dim)]">03.</span>
              <span className="text-[var(--blueprint-text)]"> Work & Projects</span>
            </h2>
            <p className="text-[var(--blueprint-text-dim)] max-w-2xl mx-auto">
              From ML research to hackathon wins, building solutions across the stack.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="mb-8">
            <BlueprintCard variant="schematic" cornerMarkers={false}>
              {/* Search with Animated Placeholder */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--blueprint-text-dim)]" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--blueprint-bg)] border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text)] font-mono focus:outline-none focus:border-[var(--blueprint-line)]"
                />
                {!filters.searchQuery && (
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 font-mono text-sm">
                    <AnimatedPlaceholder isActive={isSearchFocused} />
                  </div>
                )}
              </div>

              {/* Filter Groups */}
              <div className="space-y-4">
                {/* Experience Type */}
                <div>
                  <span className="text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-wider">
                    Type
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => toggleTypeFilter("isProject")}
                      className={`px-3 py-1 text-sm font-mono border transition-colors flex items-center gap-2 ${
                        filters.isProject
                          ? "bg-[var(--blueprint-line)] text-[var(--blueprint-bg)] border-[var(--blueprint-line)]"
                          : "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)]"
                      }`}
                    >
                      <Code className="w-4 h-4" />
                      Projects
                    </button>
                    <button
                      onClick={() => toggleTypeFilter("isWork")}
                      className={`px-3 py-1 text-sm font-mono border transition-colors flex items-center gap-2 ${
                        filters.isWork
                          ? "bg-[var(--blueprint-line)] text-[var(--blueprint-bg)] border-[var(--blueprint-line)]"
                          : "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)]"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      Work Experience
                    </button>
                    <button
                      onClick={() => toggleTypeFilter("isClassProject")}
                      className={`px-3 py-1 text-sm font-mono border transition-colors flex items-center gap-2 ${
                        filters.isClassProject
                          ? "bg-[var(--blueprint-line)] text-[var(--blueprint-bg)] border-[var(--blueprint-line)]"
                          : "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)]"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      Class Projects
                    </button>
                    <button
                      onClick={() => toggleTypeFilter("isProjectTeam")}
                      className={`px-3 py-1 text-sm font-mono border transition-colors flex items-center gap-2 ${
                        filters.isProjectTeam
                          ? "bg-[var(--blueprint-line)] text-[var(--blueprint-bg)] border-[var(--blueprint-line)]"
                          : "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)]"
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      Project Team
                    </button>
                    {/* Featured Filter */}
                    <button
                      onClick={toggleFeatured}
                      className={`px-3 py-1 text-sm font-mono border transition-colors flex items-center gap-2 ${
                        filters.filterFeatured
                          ? "bg-[var(--blueprint-accent)] text-[var(--blueprint-bg)] border-[var(--blueprint-accent)]"
                          : "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)]"
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      Featured
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <span className="text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-wider">
                    Category
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat as Category)}
                        className={`px-3 py-1 text-sm font-mono border transition-colors ${
                          filters.categories.includes(cat as Category)
                            ? "bg-[var(--blueprint-line)] text-[var(--blueprint-bg)] border-[var(--blueprint-line)]"
                            : "border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:border-[var(--blueprint-line)]"
                        }`}
                      >
                        {categoryLabels[cat] || cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(activeFilterCount > 0 || filters.searchQuery) && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-[var(--blueprint-text-dim)]">
                    {filteredExperiences.length} of {experiences.length} items
                  </span>
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-[var(--blueprint-line)] hover:text-[var(--blueprint-accent)]"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                </div>
              )}
            </BlueprintCard>
          </motion.div>

          {/* Experience Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredExperiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlueprintCard className="h-full flex flex-col">
                    {/* Header with Type Badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-mono text-lg text-[var(--blueprint-text)] flex-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <BlueprintBadge size="sm" variant={getBadgeVariant(exp)}>
                          {getTypeLabel(exp)}
                        </BlueprintBadge>
                        {exp.featured && (
                          <span className="px-2 py-0.5 text-xs bg-[var(--blueprint-accent)]/20 text-[var(--blueprint-accent)] border border-[var(--blueprint-accent)]">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Context Info */}
                    <div className="text-sm text-[var(--blueprint-text-dim)] mb-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDateRange(exp.startDate, exp.endDate)}</span>
                      </div>
                      {exp.company && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span className="text-[var(--blueprint-accent)]">{exp.company}</span>
                        </div>
                      )}
                      {exp.courseCode && (
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span className="text-[var(--blueprint-accent)]">
                            {exp.courseCode} - {exp.courseName}
                          </span>
                        </div>
                      )}
                      {exp.location && (exp.isWork || exp.isProjectTeam) && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>
                            {exp.location}
                            {exp.locationType && (
                              <span className="text-[var(--blueprint-line-dim)]">
                                {" "}• {exp.locationType}
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                      {exp.parentOrganization && (
                        <span className="text-[var(--blueprint-accent)]">
                          {exp.parentOrganization}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[var(--blueprint-text-dim)] mb-4 flex-1">
                      {exp.description}
                    </p>

                    {/* Awards */}
                    {exp.awards && exp.awards.length > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <Award className="w-4 h-4 text-[var(--blueprint-warning)]" />
                        <span className="text-sm text-[var(--blueprint-warning)]">
                          {exp.awards[0]}
                        </span>
                      </div>
                    )}

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {exp.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--blueprint-text-dim)]"
                          >
                            <span className="text-[var(--blueprint-line)]">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Stack */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {exp.techStack.map((tech) => (
                          <BlueprintBadge key={tech} size="sm">
                            {tech}
                          </BlueprintBadge>
                        ))}
                      </div>
                    )}

                    {/* Links - show for all items that have them */}
                    <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[var(--blueprint-line-dim)]">
                      {exp.githubUrl && (
                        <a
                          href={exp.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                          aria-label="GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {exp.liveUrl && (
                        <a
                          href={exp.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {exp.paperUrl && (
                        <a
                          href={exp.paperUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                          aria-label="Paper"
                        >
                          <FileText className="w-5 h-5" />
                        </a>
                      )}
                      {exp.posterUrl && (
                        <a
                          href={exp.posterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                          aria-label="Poster"
                        >
                          <Image className="w-5 h-5" />
                        </a>
                      )}
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                          aria-label="Company Website"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </BlueprintCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredExperiences.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[var(--blueprint-text-dim)] font-mono">
                No items match the current filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[var(--blueprint-line)] hover:text-[var(--blueprint-accent)]"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
