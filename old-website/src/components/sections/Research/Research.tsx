"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Zap } from "lucide-react";
import { BlueprintCard, BlueprintBadge, SchematicDivider } from "@/components/ui";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const researchFoci = [
  {
    id: "kv-caching",
    title: "KV-Cache Optimization",
    description:
      "Productionizing bidirectional KV prefill for reduced Time-to-First-Token in vLLM/LMCache ecosystem.",
    icon: Cpu,
    keywords: ["vLLM", "LMCache", "TTFT", "GPU Memory"],
    current: true,
  },
  {
    id: "multi-agent",
    title: "Multi-Agent LLM Systems",
    description:
      "Efficient heterogeneous multi-agent debate frameworks for factual LLM reasoning with confidence-based gating.",
    icon: Brain,
    keywords: ["MAS", "Debate Framework", "Confidence Gating"],
    current: false,
  },
  {
    id: "inference-opt",
    title: "Inference Optimization",
    description:
      "HPC deployment and optimization for large-scale LLM inference on A100/H100 GPU clusters.",
    icon: Zap,
    keywords: ["HPC", "Slurm", "Great Lakes", "40% FLOP Reduction"],
    current: true,
  },
];

export function Research() {
  return (
    <section id="research" className="py-20">
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
              <span className="text-[var(--blueprint-text)]"> Research</span>
            </h2>
            <p className="text-[var(--blueprint-text-dim)] max-w-2xl mx-auto">
              Currently working at the{" "}
              <span className="text-[var(--blueprint-accent)]">RobustNet Lab</span>{" "}
              on LLM inference optimization and KV-caching for production systems.
            </p>
          </motion.div>

          {/* Current Position */}
          <motion.div variants={fadeInUp} className="mb-12">
            <BlueprintCard
              title="Current Research Position"
              technicalId="POS-001"
              variant="elevated"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-mono text-[var(--blueprint-text)] mb-2">
                    Machine Learning Researcher
                  </h3>
                  <p className="text-[var(--blueprint-accent)] mb-4">
                    University of Michigan - RobustNet Lab
                  </p>
                  <p className="text-[var(--blueprint-text-dim)] leading-relaxed">
                    Transitioning state-of-the-art KV-caching research into production-compatible
                    infrastructure. Re-architecting research prototypes for the modern vLLM and
                    LMCache ecosystem with focus on reducing Time-to-First-Token on HPC clusters.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <BlueprintBadge variant="success">Current</BlueprintBadge>
                  <BlueprintBadge>Nov 2025 - Present</BlueprintBadge>
                </div>
              </div>
            </BlueprintCard>
          </motion.div>

          <SchematicDivider label="Research Focus" />

          {/* Research Focus Areas */}
          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-3 gap-6"
          >
            {researchFoci.map((focus) => (
              <BlueprintCard key={focus.id} technicalId={`RF-${focus.id.toUpperCase()}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 border border-[var(--blueprint-line)] text-[var(--blueprint-accent)]">
                    <focus.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-mono text-[var(--blueprint-text)]">
                        {focus.title}
                      </h3>
                      {focus.current && (
                        <span className="w-2 h-2 rounded-full bg-[var(--blueprint-success)] animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-[var(--blueprint-text-dim)] mb-3">
                      {focus.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {focus.keywords.map((keyword) => (
                        <BlueprintBadge key={keyword} size="sm">
                          {keyword}
                        </BlueprintBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </BlueprintCard>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
