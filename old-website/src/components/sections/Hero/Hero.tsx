"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import { BlueprintButton } from "@/components/ui";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { siteConfig } from "@/data/site-config";

// Dynamically import ParticleField to avoid SSR issues
const ParticleField = dynamic(
  () => import("@/components/three/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false }
);

const stats = [
  { label: "Years Coding", value: "8+" },
  { label: "Work Roles", value: "6" },
  { label: "Projects", value: "11+" },
  { label: "Joining", value: "Google" },
];

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: "#contact", label: "Contact" },
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Technical Label */}
          <motion.div
            variants={fadeInUp}
            className="inline-block mb-6 px-4 py-2 border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)]/80"
          >
            <span className="font-mono text-sm text-[var(--blueprint-text-dim)]">
              <span className="text-[var(--blueprint-success)]">●</span>
              {" "}{siteConfig.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-mono font-bold mb-4"
          >
            <span className="text-[var(--blueprint-text-dim)]">&lt;</span>
            <span className="text-[var(--blueprint-text)]">E.</span>
            <span className="text-[var(--blueprint-accent)]">Justice</span>
            <span className="text-[var(--blueprint-text-dim)]">/&gt;</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl font-mono text-[var(--blueprint-line)] mb-6"
          >
            Software Engineer | Systems & Infrastructure | Incoming @ Google YouTube
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-[var(--blueprint-text-dim)] mb-8 leading-relaxed"
          >
            Hi, I&apos;m Ethan Justice - a Computer Science student at the{" "}
            <span className="text-[var(--blueprint-text)]">University of Michigan</span>{" "}
            and incoming Software Engineer at{" "}
            <span className="text-[var(--blueprint-text)]">Google YouTube</span>.
            I build systems across ML infrastructure, distributed backends, and GPU computing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <BlueprintButton
              variant="primary"
              href="#projects"
              icon={<span className="text-lg">→</span>}
            >
              View Projects
            </BlueprintButton>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="p-4 border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)]/50"
              >
                <div className="font-mono text-2xl text-[var(--blueprint-accent)]">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--blueprint-text-dim)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-3 border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] hover:border-[var(--blueprint-line)] transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-[var(--blueprint-text-dim)]"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
