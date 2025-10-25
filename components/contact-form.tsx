"use client";

import React from "react";
import { createPortal } from "react-dom";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.enum(
    ["Project Inquiry", "Job Opportunity", "Collaboration", "General"],
    { message: "Subject is required" }
  ),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export default function ContactForm() {
  const [values, setValues] = React.useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "Project Inquiry",
    message: "",
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when success dialog is open
  React.useEffect(() => {
    if (!mounted) return;
    if (successOpen) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [successOpen, mounted]);

  function handleChange<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const parsed = ContactFormSchema.safeParse(values);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const next: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const pathKey = issue.path[0] as keyof ContactFormValues | undefined;
      if (pathKey) next[pathKey] = issue.message;
    }
    setErrors(next);
    return false;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !json?.success) {
        throw new Error(json?.error || "Failed to send message");
      }

      setValues({ name: "", email: "", subject: "Project Inquiry", message: "" });
      setSuccessOpen(true);
    } catch (err) {
      setToast(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative">
      {/* Error toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed right-4 top-4 z-[60] flex items-center gap-3 rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 backdrop-blur-md shadow-md dark:border-red-500/20 dark:bg-red-500/15 dark:text-red-200"
            role="status"
            aria-live="polite"
          >
            <svg
              className="size-4 flex-none text-red-600 dark:text-red-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 9v4m0 4h.01" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{toast}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 rounded-md px-2 py-1 text-xs hover:bg-red-500/20"
              aria-label="Dismiss error"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form card */}
      <Card className="mx-auto w-full max-w-2xl border-white/20 bg-white/60 backdrop-blur-xl shadow-xl dark:border-white/10 dark:bg-white/5">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Name
                </label>
                <Input
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name) || undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Email
                </label>
                <Input
                  type="email"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email) || undefined}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Subject</label>
              <div className="relative">
                <select
                  value={values.subject}
                  onChange={(e) => handleChange("subject", e.target.value as ContactFormValues["subject"])}
                  className="w-full appearance-none rounded-md border bg-white px-3 py-2 text-sm dark:bg-slate-900"
                  aria-invalid={Boolean(errors.subject) || undefined}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                >
                  <option>Project Inquiry</option>
                  <option>Job Opportunity</option>
                  <option>Collaboration</option>
                  <option>General</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
              </div>
              {errors.subject && (
                <p id="subject-error" className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.subject}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Message
              </label>
              <Textarea
                rows={6}
                value={values.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell me more about your project..."
                aria-invalid={Boolean(errors.message) || undefined}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                I usually reply within 24 hours.
              </p>
              <Button type="submit" disabled={isSubmitting} className="bg-brand-gradient hover:opacity-90">
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 size-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>Send Message</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Alternative contact methods */}
      <div className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-600 dark:text-slate-300">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="mailto:mjeevanantham04@gmail.com" className="hover:text-blue-600">Email</a>
          <span className="opacity-40">•</span>
          <a href="tel:+918807825309" className="hover:text-blue-600">+91 88078 25309</a>
          <span className="opacity-40">•</span>
          <span>Coimbatore, Tamil Nadu</span>
          <span className="opacity-40">•</span>
          <a href="https://linkedin.com/in/jeevanantham-m" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">LinkedIn</a>
          <span className="opacity-40">•</span>
          <a href="https://github.com/Mjeevanantham" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">GitHub</a>
        </div>
        {/** Duplicate removed; the note is shown above near the submit button */}
      </div>

      {/* Success modal rendered in a portal to ensure true full-screen */}
      {mounted && createPortal(
        <AnimatePresence>
          {successOpen && (
            <motion.div
              key="success-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-6"
              onClick={() => setSuccessOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Message sent successfully"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-[min(720px,92vw)] rounded-2xl border border-white/20 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 120 120"
                  className="mx-auto mb-6 text-emerald-500"
                >
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    initial={{ pathLength: 0, opacity: 0.3 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.path
                    d="M38 62 L54 78 L84 46"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  />
                </motion.svg>
                <h3 className="mb-2 text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
                  Message sent!
                </h3>
                <p className="mb-8 text-base md:text-lg text-slate-700 dark:text-slate-200">
                  Thanks for reaching out. I&apos;ll get back to you shortly.
                </p>
                <Button onClick={() => setSuccessOpen(false)} variant="outline" className="px-6">
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
