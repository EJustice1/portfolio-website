"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Github, Linkedin, Copy, Check, MapPin, AlertCircle } from "lucide-react";
import { BlueprintCard, BlueprintButton, SchematicDivider } from "@/components/ui";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { siteConfig, getMailtoLink } from "@/data/site-config";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Mail, href: getMailtoLink(), label: "Email" },
];

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const email = siteConfig.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData for Web3Forms
      const formData = new FormData();
      formData.append("access_key", "f78e99ca-684e-4ae9-923c-e18f8e81176a");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20">
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
              <span className="text-[var(--blueprint-text-dim)]">05.</span>
              <span className="text-[var(--blueprint-text)]"> Contact</span>
            </h2>
            <p className="text-[var(--blueprint-text-dim)] max-w-2xl mx-auto">
              Interested in collaborating or have an opportunity to discuss?
              Let&apos;s connect.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div variants={fadeInUp}>
              <BlueprintCard technicalId="CONTACT-INFO" variant="elevated">
                <h3 className="font-mono text-xl text-[var(--blueprint-accent)] mb-6">
                  Get in Touch
                </h3>

                {/* Email with Copy */}
                <div className="flex items-center gap-3 p-4 border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)] mb-6">
                  <Mail className="w-5 h-5 text-[var(--blueprint-line)]" />
                  <span className="font-mono text-[var(--blueprint-text)]">{email}</span>
                  <button
                    onClick={copyEmail}
                    className="ml-auto p-2 text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] transition-colors"
                    aria-label="Copy email"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[var(--blueprint-success)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-4 border border-[var(--blueprint-line-dim)] bg-[var(--blueprint-bg)] mb-6">
                  <MapPin className="w-5 h-5 text-[var(--blueprint-line)]" />
                  <span className="text-[var(--blueprint-text)]">{siteConfig.location}</span>
                </div>

                <SchematicDivider label="Connect" />

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text-dim)] hover:text-[var(--blueprint-line)] hover:border-[var(--blueprint-line)] transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>

                {/* Availability */}
                <div className="mt-6 p-4 border border-[var(--blueprint-success)]/30 bg-[var(--blueprint-success)]/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--blueprint-success)] animate-pulse" />
                    <span className="text-sm text-[var(--blueprint-success)]">
                      {siteConfig.availability}
                    </span>
                  </div>
                </div>
              </BlueprintCard>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <BlueprintCard technicalId="CONTACT-FORM" variant="elevated">
                <h3 className="font-mono text-xl text-[var(--blueprint-accent)] mb-6">
                  Send a Message
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 border border-[var(--blueprint-success)] flex items-center justify-center">
                      <Check className="w-8 h-8 text-[var(--blueprint-success)]" />
                    </div>
                    <p className="text-[var(--blueprint-success)] font-mono">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-[var(--blueprint-text-dim)] mt-2">
                      I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-[var(--blueprint-error)] bg-[var(--blueprint-error)]/10 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-[var(--blueprint-error)] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[var(--blueprint-error)] font-mono">
                          {error}
                        </p>
                      </motion.div>
                    )}
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="w-full px-4 py-3 bg-[var(--blueprint-bg)] border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text)] font-mono focus:outline-none focus:border-[var(--blueprint-line)]"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-xs text-[var(--blueprint-error)] mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 bg-[var(--blueprint-bg)] border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text)] font-mono focus:outline-none focus:border-[var(--blueprint-line)]"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-xs text-[var(--blueprint-error)] mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-wider mb-2">
                        Subject
                      </label>
                      <input
                        {...register("subject")}
                        type="text"
                        className="w-full px-4 py-3 bg-[var(--blueprint-bg)] border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text)] font-mono focus:outline-none focus:border-[var(--blueprint-line)]"
                        placeholder="What's this about?"
                      />
                      {errors.subject && (
                        <p className="text-xs text-[var(--blueprint-error)] mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-mono text-[var(--blueprint-text-dim)] uppercase tracking-wider mb-2">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        className="w-full px-4 py-3 bg-[var(--blueprint-bg)] border border-[var(--blueprint-line-dim)] text-[var(--blueprint-text)] font-mono focus:outline-none focus:border-[var(--blueprint-line)] resize-none"
                        placeholder="Enter your message"
                      />
                      {errors.message && (
                        <p className="text-xs text-[var(--blueprint-error)] mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <BlueprintButton
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full"
                      icon={<Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? "Sending" : "Send Message"}
                    </BlueprintButton>
                  </form>
                )}
              </BlueprintCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
