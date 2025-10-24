import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <div className="mx-auto h-20 w-20 rounded-2xl bg-brand-gradient text-white grid place-content-center text-3xl shadow-lg mb-6">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="inline-flex items-center rounded-md bg-brand-gradient px-6 py-3 text-white hover:opacity-90">
            Go Home
          </Link>
          <a href="#contact" className="inline-flex items-center rounded-md border px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
            Contact Me
          </a>
        </div>
      </div>
    </main>
  );
}
