/**
 * Modal Loading Skeleton
 * 
 * Used as a loading placeholder for dynamically imported modals
 */

export function ModalSkeleton() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden animate-pulse">
        <div className="h-16 bg-slate-200 dark:bg-slate-800" />
        <div className="p-6 space-y-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
}
