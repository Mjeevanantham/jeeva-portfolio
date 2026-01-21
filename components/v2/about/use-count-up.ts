"use client";

import * as React from "react";

interface UseCountUpOptions {
  from?: number;
  to: number;
  durationMs?: number;
  enabled: boolean;
}

export function useCountUp({ from = 0, to, durationMs = 900, enabled }: UseCountUpOptions) {
  const [value, setValue] = React.useState(from);

  React.useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const start = performance.now();
    const delta = to - from;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + delta * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, from, to, durationMs]);

  return value;
}

