"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe prefers-reduced-motion. Returns false on the server and on the
 * first client render so hydration never mismatches, then updates (and keeps
 * tracking OS-level changes) once mounted.
 */
export function useReducedMotionSafe() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}
