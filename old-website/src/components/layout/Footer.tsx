import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig, getMailtoLink } from "@/data/site-config";

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: getMailtoLink(), label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Technical Version Info */}
          <div className="font-mono text-xs text-[var(--blueprint-text-dim)]">
            <span className="text-[var(--blueprint-line)]">v1.0.0</span>
            <span className="mx-2">|</span>
            <span>Built with Next.js + React Three Fiber</span>
            <span className="mx-2">|</span>
            <span>{currentYear}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Technical Credit */}
          <div className="font-mono text-xs text-[var(--blueprint-text-dim)]">
            <span className="text-[var(--blueprint-line-dim)]">//</span>
            <span className="ml-2">Designed & Built by E. Justice</span>
          </div>
        </div>

        {/* Blueprint Bottom Border Effect */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-[var(--blueprint-line-dim)]" />
          <div className="w-2 h-2 rotate-45 border border-[var(--blueprint-line)]" />
          <div className="flex-1 h-px bg-[var(--blueprint-line-dim)]" />
        </div>
      </div>
    </footer>
  );
}
