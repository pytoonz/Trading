import { useEffect, useRef, type MutableRefObject } from "react";
import { ScrollTrigger } from "./gsap";

/**
 * Tracks a trigger element's vertical scroll progress (0..1) into a mutable
 * ref so R3F useFrame loops can read it without causing React re-renders.
 */
export function useScrollProgress<T extends HTMLElement>(opts?: {
  start?: string;
  end?: string;
}): {
  target: MutableRefObject<T | null>;
  progress: MutableRefObject<number>;
} {
  const target = useRef<T | null>(null);
  const progress = useRef(0);
  const start = opts?.start ?? "top bottom";
  const end = opts?.end ?? "bottom top";

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => st.kill();
  }, [start, end]);

  return { target, progress };
}

/** Lat/lon -> 3D point on a sphere (y-up). */
export function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}
