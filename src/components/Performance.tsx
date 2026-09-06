import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";
import PerformanceScene from "../three/PerformanceScene";
import SectionHeading from "./ui/SectionHeading";
import { CountUp, Fade } from "./ui/primitives";

const METRICS = [
  { label: "Strategy Growth", value: 24.8, prefix: "+", suffix: "%", decimals: 1, accent: "text-mint" },
  { label: "Execution Efficiency", value: 98.2, prefix: "", suffix: "%", decimals: 1, accent: "text-electric" },
  { label: "Market Monitoring", value: 24, prefix: "", suffix: "/7", decimals: 0, accent: "text-azure" },
  { label: "Markets Analyzed", value: 150, prefix: "", suffix: "+", decimals: 0, accent: "text-white" },
];

export default function Performance() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={section}
      id="performance"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_30%,#071224_0%,#04060b_70%)]" />
      {/* 3D graph */}
      <div className="pointer-events-none absolute inset-0">
        <PerformanceScene scroll={progress} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Trading Performance"
          title="A strategy in motion."
          sub="Our execution engine compounds disciplined edge across cycles — engineered to stay smooth where markets turn sharp."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Fade key={m.label} delay={i * 0.1}>
              <div className="glass-deep group relative overflow-hidden rounded-2xl p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent" />
                <div className="font-display text-[clamp(2rem,4vw,2.9rem)] font-semibold tabular-nums tracking-tight">
                  <span className={m.accent}>
                    <CountUp to={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} duration={2.2} />
                  </span>
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                  {m.label}
                </div>
                <div className="mt-4 h-px w-full overflow-hidden bg-white/8">
                  <div className="h-full w-0 bg-gradient-to-r from-mint to-electric transition-all duration-[1600ms] group-hover:w-full" />
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade delay={0.2} className="mt-8 flex justify-center">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            <span className="h-1 w-1 rounded-full bg-white/40" />
            Illustrative demo metrics · Not verified company performance
          </p>
        </Fade>
      </div>
    </section>
  );
}
