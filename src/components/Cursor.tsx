import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const ringX = useSpring(mx, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(my, { stiffness: 320, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.("a, button, [data-cursor]");
      setActive(!!el);
      setLabel(
        (e.target as Element)?.closest?.("[data-cursor-text]")?.getAttribute?.(
          "data-cursor-text"
        ) ?? ""
      );
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: mx, y: my }}
      >
        <span className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint mix-blend-difference" style={{ width: 6, height: 6 }} />
      </motion.div>

      {/* trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-mint/70 mix-blend-difference"
          animate={{
            width: active ? (label ? 74 : 46) : 30,
            height: active ? (label ? 74 : 46) : 30,
            opacity: active ? 0.9 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>

      {/* label */}
      {label && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9999]"
          style={{ x: mx, y: my }}
        >
          <span className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-mint px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-950">
            {label}
          </span>
        </motion.div>
      )}
    </>
  );
}
