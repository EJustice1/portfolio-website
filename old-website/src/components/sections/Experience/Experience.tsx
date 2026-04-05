"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { BlueprintBadge } from "@/components/ui";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { experiences } from "@/data/experiences";
import { formatDateRange, calculateDuration } from "@/lib/utils";

// Filter for work experiences and project teams (for timeline)
const timelineExperiences = experiences
  .filter((exp) => exp.isWork || (exp.isProjectTeam && !exp.isProject))
  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

const typeColors: Record<string, string> = {
  research: "success",
  "part-time": "accent",
  internship: "default",
  "project-team": "warning",
  "full-time": "accent",
};

// Navigate to projects section with search query
function handleExperienceClick(companyName: string) {
  if (!companyName) return;
  // Update URL with search parameter and navigate to projects
  const searchParam = encodeURIComponent(companyName);
  window.history.pushState({}, "", `?search=${searchParam}#projects`);

  // Dispatch a custom event that Projects can listen to
  window.dispatchEvent(
    new CustomEvent("experience-clicked", { detail: { search: companyName } })
  );

  // Scroll to projects section
  const projectsSection = document.getElementById("projects");
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: "smooth" });
  }
}

export function Experience() {
  return (
    <section id="experience" className="py-20">
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
              <span className="text-[var(--blueprint-text-dim)]">02.</span>
              <span className="text-[var(--blueprint-text)]"> Experience Timeline</span>
            </h2>
            <p className="text-[var(--blueprint-text-dim)] max-w-2xl mx-auto">
              From ML research to enterprise software engineering, building
              production systems at scale.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line - centered */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--blueprint-line-dim)]" />

            {timelineExperiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const workType = exp.workType || (exp.isProjectTeam ? "project-team" : "work");
              const companyName = exp.company || "";

              return (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  className="relative mb-8"
                >
                  {/* Timeline Node - on the line */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="w-3 h-3 rotate-45 border-2 border-[var(--blueprint-line)] bg-[var(--blueprint-bg)]" />
                    {!exp.endDate && (
                      <div className="absolute inset-0 w-3 h-3 rotate-45 border-2 border-[var(--blueprint-success)] animate-ping" />
                    )}
                  </div>

                  {/* Card Container */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      isLeft
                        ? "md:mr-[calc(50%+2rem)] md:pr-0"
                        : "md:ml-[calc(50%+2rem)] md:pl-0"
                    }`}
                  >
                    {/* Card - always clickable */}
                    <button
                      onClick={() => handleExperienceClick(companyName)}
                      className={`w-full text-left p-4 border transition-colors hover:border-[var(--blueprint-accent)] hover:bg-[var(--blueprint-accent)]/5 cursor-pointer group ${
                        exp.featured
                          ? "border-l-4 border-[var(--blueprint-line)] bg-[var(--blueprint-bg)]/70 shadow-md border-l-[var(--blueprint-accent)]"
                          : "border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)]/50"
                      }`}
                    >
                      <div className={isLeft ? "md:text-right" : ""}>
                        {/* Role & Company */}
                        <div className={`flex items-start justify-between gap-2 mb-2 flex-wrap ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}>
                          <div className={isLeft ? "md:text-right" : ""}>
                            <h3 className={`font-mono text-[var(--blueprint-text)] flex items-center gap-1.5 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                              {exp.featured && (
                                <span className="text-[var(--blueprint-accent)] text-xs" title="Featured">★</span>
                              )}
                              {exp.role || exp.title}
                            </h3>
                            <div className={`text-sm text-[var(--blueprint-accent)] flex items-center gap-1 ${isLeft ? "md:justify-end" : ""}`}>
                              {exp.company}
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity inline" />
                            </div>
                          </div>
                          <BlueprintBadge
                            variant={typeColors[workType] as "default" | "accent" | "success" | "warning"}
                            size="sm"
                          >
                            {workType}
                          </BlueprintBadge>
                        </div>

                        {/* Brief Summary */}
                        <p className={`text-sm text-[var(--blueprint-text-dim)] mb-3 ${
                          isLeft ? "md:text-right" : ""
                        }`}>
                          {exp.description}
                        </p>

                        {/* Date & Location */}
                        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--blueprint-text-dim)] ${
                          isLeft ? "md:justify-end" : ""
                        }`}>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDateRange(exp.startDate, exp.endDate)}
                            {exp.endDate && (
                              <span className="text-[var(--blueprint-line-dim)]">
                                ({calculateDuration(exp.startDate, exp.endDate)})
                              </span>
                            )}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </span>
                          )}
                        </div>

                        {/* View projects hint */}
                        <div className={`mt-3 text-xs text-[var(--blueprint-accent)] opacity-0 group-hover:opacity-100 transition-opacity ${
                          isLeft ? "md:text-right" : ""
                        }`}>
                          Click to view in Work & Projects →
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Link to Projects */}
          <motion.div variants={fadeInUp} className="text-center mt-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-[var(--blueprint-line)] hover:text-[var(--blueprint-accent)] transition-colors font-mono text-sm"
            >
              View all work & projects
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
