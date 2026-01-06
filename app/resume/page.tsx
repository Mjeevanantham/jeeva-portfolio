"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResumePage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/resume-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setMessage({
          type: "success",
          text: data.message || "Your resume request has been submitted successfully!",
        });
        setEmail("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (_error) {
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-[60vh] px-4 sm:px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 text-green-600 dark:text-green-400">Request Submitted Successfully!</h1>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">📋 What happens next:</h2>
            <ul className="text-left space-y-3 text-green-700 dark:text-green-300">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Your request is currently <strong>under review</strong>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                I will <strong>manually verify</strong> your email address
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                You will receive my resume within <strong>24 hours</strong>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Please be <strong>patient</strong> while I process your request
              </li>
            </ul>
          </div>

          <p className="text-slate-600 dark:text-slate-300 mb-8">
            A confirmation email has been sent to your inbox. If you have any questions or need immediate assistance, 
            feel free to reply to that email or contact me directly.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setMessage(null);
              }}
              className="inline-flex items-center rounded-md bg-brand-gradient px-6 py-3 text-white transition-opacity hover:opacity-90"
            >
              Submit Another Request
            </button>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">Request My Resume</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Enter your email address below to request my resume. I&apos;ll verify your request and send it to you within 24 hours.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>📧 Manual Verification Process:</strong> To ensure quality connections, I personally review each resume request. 
            You&apos;ll receive a confirmation email immediately, and your resume within 24 hours after verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your.email@example.com"
            />
          </div>

          {message && (
            <div className={`p-4 rounded-md ${
              message.type === "success" 
                ? "bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200" 
                : "bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full inline-flex items-center justify-center rounded-md bg-brand-gradient px-6 py-3 text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Request...
              </>
            ) : (
              "Request Resume"
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Need immediate assistance or have questions?
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Contact Me Directly
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
