import Link from "next/link";
import { blogPosts } from "@/content/blog-posts";

export const metadata = {
  title: "Blog",
  description: "Learnings and explorations across Dev, DevOps, and AI.",
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <section className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Blog</h1>
          <p className="text-slate-600 dark:text-slate-300 mb-10">
            Notes in natural words—short, useful, and honest.
          </p>
          <ul className="space-y-6">
            {blogPosts.map((post) => (
              <li key={post.slug} className="group rounded-lg border bg-white/60 dark:bg-slate-900/60 p-5 hover:shadow-md transition-all">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold mt-1 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">{post.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
