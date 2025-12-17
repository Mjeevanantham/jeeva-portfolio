import React from "react";

type GithubEventPayload = {
  commits?: unknown[];
  ref_type?: string;
  action?: string;
};

type GithubEvent = {
  id: string;
  type: string;
  repo: { name: string; url?: string };
  created_at: string;
  payload?: GithubEventPayload;
};

async function fetchEvents(): Promise<GithubEvent[] | null> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      "https://api.github.com/users/Mjeevanantham/events/public",
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as GithubEvent[];
    return data.slice(0, 6);
  } catch {
    return null;
  }
}

function describeEvent(ev: GithubEvent): string {
  const repo = ev.repo?.name ?? "repo";
  switch (ev.type) {
    case "PushEvent": {
      const commits = ev.payload?.commits?.length ?? 1;
      return `Pushed ${commits} commit(s) to ${repo}`;
    }
    case "CreateEvent": {
      const ref = ev.payload?.ref_type || "resource";
      return `Created ${ref} in ${repo}`;
    }
    case "PullRequestEvent": {
      const action = ev.payload?.action || "updated";
      return `PR ${action} in ${repo}`;
    }
    case "IssuesEvent": {
      const action = ev.payload?.action || "updated";
      return `Issue ${action} in ${repo}`;
    }
    default:
      return ev.type.replace(/([A-Z])/g, " $1").trim() + ` in ${repo}`;
  }
}

export default async function GithubActivity() {
  const events = await fetchEvents();
  return (
    <div className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <h3 className="text-lg font-semibold">Recent GitHub Activity</h3>
      {!events ? (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Unable to load activity right now. GitHub rate limits may apply.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {events.map((ev) => (
            <li key={ev.id} className="flex items-start gap-3 text-sm">
              <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-gradient" />
              <div>
                <p className="text-slate-800 dark:text-slate-100">{describeEvent(ev)}</p>
                <p className="text-slate-500 dark:text-slate-400">
                  {new Date(ev.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-right">
        <a
          href="https://github.com/Mjeevanantham"
          target="_blank"
          rel="noreferrer"
          className="text-sm underline decoration-transparent transition hover:decoration-inherit"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
