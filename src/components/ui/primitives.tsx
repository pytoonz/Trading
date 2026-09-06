import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import { motion, useInView } from "framer-motion";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Reveal text word-by-word with mask */
export function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text },
    words.map((w, i) => (
      <span
        key={i}
        aria-hidden
        className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
      >
        <motion.span
          className="inline-block will-change-transform"
          initial={{ y: "112%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      </span>
    ))
  );
}

/* Fade up block wrapper */
export function Fade({
  children,
  className,
  delay = 0,
  y = 36,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Counting number on scroll */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
