import Link from "next/link";
import { getAdjacentPosts, getPostBySlug } from "@/content/blog-posts";

export async function generateStaticParams() {
  // Dynamic params are inferred from content list at build time
  const { blogPosts } = await import("@/content/blog-posts");
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="min-h-screen py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Not found</h1>
          <Link href="/blog" className="underline">Back to blog</Link>
        </div>
      </main>
    );
  }

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <article className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <time>{new Date(post.date).toLocaleDateString()}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{post.description}</p>

          <div className="prose dark:prose-invert max-w-none mt-6 whitespace-pre-wrap">
            {post.content}
          </div>

          <hr className="my-10 border-slate-200 dark:border-slate-800" />

          <nav className="flex justify-between text-sm">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:underline">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span>{prev.title}</span>
              </Link>
            ) : <span />}

            {next ? (
              <Link href={`/blog/${next.slug}`} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:underline">
                <span>{next.title}</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ) : <span />}
          </nav>

          <div className="mt-12">
            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:underline">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
