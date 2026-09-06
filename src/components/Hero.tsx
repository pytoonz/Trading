import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { scrollToId } from "../lib/smooth";
import HeroScene from "../three/HeroScene";
import Magnetic from "./ui/Magnetic";

export default function Hero({ ready }: { ready: boolean }) {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);

  // pointer parallax for content
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const el = section.current;
    if (!el || !ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".h-eyebrow",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ".h-line .mask",
          { yPercent: 115 },
          { yPercent: 0, duration: 1.2, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".h-sub",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ".h-cta > *",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          "-=0.6"
        )
        .fromTo(
          ".h-foot",
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          "-=0.4"
        );
    }, el);
    return () => ctx.revert();
  }, [ready]);

  // update scroll progress ref for the 3D scene
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    px.set((e.clientX / w - 0.5) * -22);
    py.set((e.clientY / h - 0.5) * -16);
  };

  return (
    <section
      ref={section}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#0a1226_0%,#04060b_55%)]" />
        <div className="grid-lines absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(75%_70%_at_50%_40%,#000_30%,transparent_100%)]" />
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[10%] h-[40vmax] w-[40vmax] rounded-full bg-mint/10 blur-[150px]" />
      </div>

      {/* 3D environment */}
      <div className="pointer-events-none absolute inset-0">
        <HeroScene scroll={progress} />
      </div>

      {/* content */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <div className="h-eyebrow mb-7 flex items-center gap-3 opacity-0">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-mint shadow-[0_0_12px_#2cf0a6]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/55">
            Institutional Trading Intelligence
          </span>
        </div>

        <h1 className="font-display font-semibold leading-[0.95] tracking-tight">
          <span className="h-line block overflow-hidden pb-1">
            <span className="mask block text-[clamp(3rem,11vw,8.5rem)] text-white">
              Trade Beyond
            </span>
          </span>
          <span className="h-line block overflow-hidden pb-1">
            <span className="mask text-gradient-brand block text-[clamp(3rem,11vw,8.5rem)]">
              Limits.
            </span>
          </span>
        </h1>

        <p className="h-sub mt-7 max-w-2xl text-base font-light leading-relaxed text-white/60 opacity-0 sm:text-lg">
          Precision. Strategy. Technology. We engineer smarter trading solutions
          for modern markets — combining quantitative discipline with
          institutional-grade execution.
        </p>

        <div className="h-cta mt-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row">
          <Magnetic strength={0.35}>
            <button
              data-cursor-text="Launch"
              onClick={() => scrollToId("cta")}
              className="btn-shine group relative rounded-2xl bg-gradient-to-r from-mint to-jade px-8 py-4 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-10px_rgba(46,240,166,0.7)] transition hover:shadow-[0_14px_50px_-8px_rgba(46,240,166,0.9)]"
            >
              Start Trading
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </Magnetic>
          <Magnetic strength={0.35}>
            <button
              data-cursor-text="View"
              onClick={() => scrollToId("strategy")}
              className="glass clip-notch rounded-2xl px-8 py-4 text-sm font-medium text-white/85 transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              Explore Our Strategy
            </button>
          </Magnetic>
        </div>

        <p className="h-foot mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 opacity-0">
          Simulated market data · Not live quotes
        </p>
      </motion.div>

      {/* scroll cue */}
      <div className="h-foot absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0">
        <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-white/40">
          Scroll
        </span>
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-mint"
          />
        </div>
      </div>

      {/* side coordinates */}
      <div className="pointer-events-none absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 text-[10px] font-mono uppercase tracking-[0.4em] text-white/25 lg:block">
        51.5072° N — 0.1276° W
      </div>
    </section>
  );
}
