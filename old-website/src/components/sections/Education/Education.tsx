"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown, BookOpen, Code } from "lucide-react";
import {
  BlueprintCard,
  BlueprintBadge,
  SchematicDivider,
} from "@/components/ui";
import { staggerContainer, fadeInUp, expandCollapse } from "@/lib/animations";
import { education } from "@/data/education";
import { experiences } from "@/data/experiences";
import { Course, Experience } from "@/types";

// Get class projects for a specific course
function getProjectsForCourse(courseCode: string): Experience[] {
  return experiences.filter(
    (exp) => exp.isClassProject && exp.courseCode === courseCode
  );
}

function CourseCard({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const projects = getProjectsForCourse(course.code);
  const hasProjects = projects.length > 0;
  const hasDescription = !!course.description;
  const isExpandable = hasProjects || hasDescription;

  return (
    <div className="border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg-card)]/30">
      <button
        onClick={() => isExpandable && setIsExpanded(!isExpanded)}
        disabled={!isExpandable}
        className={`w-full flex items-center justify-between p-3 text-left ${
          isExpandable ? "hover:bg-[var(--blueprint-line)]/5 cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-[var(--blueprint-accent)]">
            {course.code}
          </span>
          <span className="text-[var(--blueprint-text)]">{course.name}</span>
          {course.isCurrent && (
            <span className="px-2 py-0.5 text-xs bg-[var(--blueprint-success)]/20 text-[var(--blueprint-success)] border border-[var(--blueprint-success)]">
              In Progress
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasProjects && (
            <span className="text-xs text-[var(--blueprint-text-dim)]">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
          )}
          {isExpandable && (
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="w-4 h-4 text-[var(--blueprint-line)]" />
            </motion.div>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && isExpandable && (
          <motion.div
            variants={expandCollapse}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="p-3 pt-0 space-y-2">
              <div className="h-px bg-[var(--blueprint-line-dim)]" />
              {hasDescription && (
                <p className="text-sm text-[var(--blueprint-text-dim)] italic">
                  {course.description}
                </p>
              )}
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project }: { project: Experience }) {
  return (
    <div className="p-3 border-l-2 border-[var(--blueprint-line)] bg-[var(--blueprint-bg)]/50">
      <div className="flex items-start gap-2 mb-2">
        <Code className="w-4 h-4 text-[var(--blueprint-accent)] mt-0.5" />
        <div>
          <h5 className="font-mono text-sm text-[var(--blueprint-text)]">
            {project.title}
          </h5>
          <p className="text-xs text-[var(--blueprint-text-dim)]">
            {project.description}
          </p>
        </div>
      </div>
      <div className="ml-6">
        <ul className="space-y-1">
          {project.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-[var(--blueprint-text-dim)]"
            >
              <span className="text-[var(--blueprint-line)]">▹</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.techStack.map((tech) => (
              <BlueprintBadge key={tech} size="sm">
                {tech}
              </BlueprintBadge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Education() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["cs"]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section id="education" className="py-20">
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
              <span className="text-[var(--blueprint-text-dim)]">04.</span>
              <span className="text-[var(--blueprint-text)]"> Education</span>
            </h2>
            <p className="text-[var(--blueprint-text-dim)] max-w-2xl mx-auto">
              Coursework, projects, and academic achievements at Michigan Engineering.
            </p>
          </motion.div>

          {education.map((institution) => (
            <motion.div key={institution.id} variants={fadeInUp}>
              <BlueprintCard
                technicalId={`EDU-${institution.id.toUpperCase()}`}
                variant="elevated"
              >
                {/* Institution Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 border border-[var(--blueprint-line)] text-[var(--blueprint-accent)]">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-mono text-[var(--blueprint-text)]">
                        {institution.name}
                      </h3>
                      <p className="text-[var(--blueprint-accent)]">
                        {institution.degree} in {institution.major}
                      </p>
                      <p className="text-sm text-[var(--blueprint-text-dim)]">
                        {institution.period.start.split("-")[1] === "08" ? "Aug" : "Jan"}{" "}
                        {institution.period.start.split("-")[0]} -{" "}
                        {institution.period.end.split("-")[1] === "05" ? "May" : "Dec"}{" "}
                        {institution.period.end.split("-")[0]}
                        <span className="ml-2">• {institution.location}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {institution.honors.map((honor) => (
                      <BlueprintBadge key={honor} variant="accent">
                        {honor}
                      </BlueprintBadge>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-sm text-[var(--blueprint-text-dim)]">Activities:</span>
                  {institution.activities.map((activity) => (
                    <BlueprintBadge key={activity}>{activity}</BlueprintBadge>
                  ))}
                </div>

                <SchematicDivider label="Coursework" />

                {/* Course Categories */}
                <div className="space-y-4">
                  {institution.courseCategories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-4 border border-[var(--blueprint-line-dim)] hover:border-[var(--blueprint-line)] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-[var(--blueprint-line)]" />
                          <span className="font-mono text-[var(--blueprint-accent)]">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-[var(--blueprint-text-dim)]">
                            {category.courses.length} courses
                          </span>
                          <motion.div
                            animate={{
                              rotate: expandedCategories.includes(category.id) ? 180 : 0,
                            }}
                          >
                            <ChevronDown className="w-5 h-5 text-[var(--blueprint-line)]" />
                          </motion.div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedCategories.includes(category.id) && (
                          <motion.div
                            variants={expandCollapse}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-2 bg-[var(--blueprint-bg)]/50 border-x border-b border-[var(--blueprint-line-dim)]">
                              {category.courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </BlueprintCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
