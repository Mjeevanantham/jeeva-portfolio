/**
 * Chart Loading Skeleton
 * 
 * Used as a loading placeholder for dynamically imported charts
 */

export function ChartSkeleton() {
  return (
    <div className="relative h-[400px] w-full rounded-2xl border border-slate-200/50 bg-white/80 p-4 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/50 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-slate-300 dark:border-slate-600 border-t-brand-primary-600 dark:border-t-brand-primary-400 animate-spin" />
      </div>
    </div>
  );
}
