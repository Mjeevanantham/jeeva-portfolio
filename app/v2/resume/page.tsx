import Link from "next/link";

export default function V2Resume() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Resume</h1>
        <p className="text-slate-600 dark:text-slate-300">
          V2 Resume page coming soon...
        </p>
        <div className="mt-8">
          <Link
            href="/resume"
            className="inline-block px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            View V1 Resume
          </Link>
        </div>
      </div>
    </div>
  );
}
