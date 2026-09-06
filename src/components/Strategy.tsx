import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import Magnetic from "./ui/Magnetic";
import { scrollToId } from "../lib/smooth";

const STAGES = [
  {
    n: "01",
    k: "Analyze",
    title: "Sense the opportunity before it forms.",
    desc: "Quantitative research engines scan liquidity, momentum, macro data and order flow to surface high-conviction setups.",
    items: ["Factor & momentum models", "Macro + microstructure data", "Regime detection"],
  },
  {
    n: "02",
    k: "Strategize",
    title: "Engineer an edge with structure.",
    desc: "Every idea becomes a rigorous strategy — parameterised, back-tested and stress-tested across decades of market history.",
    items: ["Monte-Carlo validation", "Parameter optimization", "Walk-forward testing"],
  },
  {
    n: "03",
    k: "Execute",
    title: "Fire with surgical precision.",
    desc: "Smart order routing slices large orders into the right venues at the right moment, minimising market impact and slippage.",
    items: ["Venue-aware routing", "Latency monitoring", "Impact-aware sizing"],
  },
  {
    n: "04",
    k: "Optimize",
    title: "Sharpen while the world moves.",
    desc: "Live performance feeds back into the engine — rebalancing, recalibrating and refining the edge continuously.",
    items: ["Real-time drawdown control", "Adaptive rebalancing", "Continuous learning"],
  },
];

export default function Strategy() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const t = track.current;
      if (!t) return;
      const getAmt = () => Math.max(0, t.scrollWidth - window.innerWidth);
      gsap.to(t, {
        x: () => -getAmt(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => "+=" + getAmt(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (rail.current) rail.current.style.width = `${self.progress * 100}%`;
          },
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="strategy" className="relative bg-ink-950">
      <div className="h-screen overflow-hidden">
        {/* ambient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="grid-lines absolute inset-0 opacity-40 [mask-image:linear-gradient(90deg,#000,transparent_60%)]" />
          <div className="absolute left-0 top-1/2 h-[60vmax] w-[20vmax] -translate-y-1/2 rounded-full bg-electric/10 blur-[150px]" />
        </div>

        {/* persistent left meta */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 hidden lg:block">
          <div className="rotate-0 space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mint">
              The Nova Method
            </span>
            <div className="h-px w-px" />
          </div>
        </div>

        <div className="relative flex h-full items-center">
          <div
            ref={track}
            className="flex will-change-transform"
            style={{ gap: "clamp(3rem,7vw,7rem)", padding: "0 clamp(6vw,9vw,10rem)" }}
          >
            {/* intro */}
            <div className="flex w-[78vw] flex-col justify-center sm:w-[46vw]">
              <span className="mb-5 font-mono text-[11px] uppercase tracking-[0.34em] text-mint">
                Strategy
              </span>
              <h2 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[0.98] tracking-tight text-white">
                A disciplined path from signal to success.
              </h2>
              <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/55">
                Scroll to move through the four stages of our institutional
                trading loop — how raw information becomes executed strategy.
              </p>
              <div className="mt-8 flex items-center gap-3 text-white/35">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                  Keep scrolling →
                </span>
              </div>
            </div>

            {/* stage cards */}
            {STAGES.map((s) => (
              <article
                key={s.n}
                className="group relative w-[80vw] shrink-0 sm:w-[60vw] lg:w-[34vw]"
              >
                <div className="relative h-[66vh] overflow-hidden rounded-[2rem] p-[1px] sm:h-[62vh]">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/15 via-white/[0.03] to-transparent" />
                  <div className="glass-deep relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-10 top-6 select-none font-display text-[7rem] font-bold leading-none text-white/[0.04] transition group-hover:text-mint/10 sm:text-[9rem]"
                    >
                      {s.n}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mint/10 font-display text-lg font-semibold text-mint">
                        {s.n}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
                        {s.k}
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-white/55">
                      {s.desc}
                    </p>
                    <div className="mt-auto pt-8">
                      <ul className="grid gap-2">
                        {s.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-center gap-2.5 text-[13px] text-white/70"
                          >
                            <span className="h-1 w-1 rounded-full bg-mint" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* end card */}
            <div className="flex w-[80vw] shrink-0 flex-col justify-center gap-6 sm:w-[40vw]">
              <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-tight text-white">
                Then we run it all again — sharper.
              </h3>
              <p className="max-w-sm text-[15px] font-light text-white/55">
                The loop never closes. Each cycle makes the next one smarter.
              </p>
              <Magnetic strength={0.3}>
                <button
                  onClick={() => scrollToId("cta")}
                  className="btn-shine w-fit rounded-2xl bg-gradient-to-r from-mint to-jade px-7 py-3.5 text-sm font-semibold text-ink-950"
                >
                  Begin your strategy →
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* rail */}
        <div className="absolute bottom-10 left-1/2 h-px w-[min(60vw,520px)] -translate-x-1/2 bg-white/10">
          <div
            ref={rail}
            className="h-px bg-gradient-to-r from-mint to-electric"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </section>
  );
}
