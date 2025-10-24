"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResumeModal() {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative z-10 w-full max-w-3xl rounded-2xl border bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Resume</h2>
          <button
            onClick={close}
            className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close resume modal"
          >
            ✕
          </button>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-300">
            My downloadable resume will be attached here soon. In the meantime, please reach out and I&apos;ll share it directly.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/#contact"
              onClick={close}
              className="inline-flex items-center rounded-md bg-brand-gradient px-6 py-3 text-white hover:opacity-90"
            >
              Contact Me
            </Link>
            <button
              onClick={close}
              className="inline-flex items-center rounded-md border px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
