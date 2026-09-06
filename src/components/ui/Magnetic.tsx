import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.15 });
  const sy = useSpring(y, { stiffness: 200, damping: 16, mass: 0.15 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, ...style }}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
