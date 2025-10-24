"use client";

import React from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export default function ContactForm() {
  const [values, setValues] = React.useState<ContactFormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

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

      setValues({ name: "", email: "", subject: "", message: "" });
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
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Subject
              </label>
              <Input
                value={values.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="What is this about?"
                aria-invalid={Boolean(errors.subject) || undefined}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <p id="subject-error" className="mt-2 text-xs text-red-600 dark:text-red-400">
                  {errors.subject}
                </p>
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
              <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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

      {/* Success modal */}
      <AnimatePresence>
        {successOpen && (
          <motion.div
            key="success-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
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
              className="w-full max-w-md rounded-2xl border border-white/20 bg-white/70 p-8 text-center shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-white/5"
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
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                Message sent!
              </h3>
              <p className="mb-6 text-sm text-slate-600 dark:text-slate-300">
                Thanks for reaching out. I\'ll get back to you shortly.
              </p>
              <Button onClick={() => setSuccessOpen(false)} variant="outline">
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
