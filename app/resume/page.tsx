import Link from "next/link";

export const revalidate = 604800; // Revalidate every 7 days

export const metadata = {
  title: "Resume - Jeevanantham Mahalingam",
  description: "View the resume of Jeevanantham Mahalingam.",
};

export default function ResumePage() {
  return (
    <main className="min-h-[60vh] px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">Resume</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          My downloadable resume will be attached here soon. In the meantime, please reach out and I&apos;ll share it directly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-md bg-brand-gradient px-6 py-3 text-white transition-opacity hover:opacity-90"
          >
            Contact Me
          </Link>
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
