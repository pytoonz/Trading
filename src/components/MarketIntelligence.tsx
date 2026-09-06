import { useEffect, useMemo, useRef } from "react";
import { gsap } from "../lib/gsap";
import SectionHeading from "./ui/SectionHeading";
import { Fade, CountUp } from "./ui/primitives";
import { cn } from "../utils/cn";

const D = { w: 1000, h: 380 };

const ASSETS = [
  { s: "S&P 500", v: "5,892.41", c: "+0.84%", up: true },
  { s: "NASDAQ", v: "20,114.7", c: "+1.21%", up: true },
  { s: "EUR/USD", v: "1.0864", c: "-0.22%", up: false },
  { s: "GOLD", v: "2,431.2", c: "+0.41%", up: true },
];

function Dashboard() {
  const scope = useRef<HTMLDivElement>(null);

  const ys = useMemo(() => {
    const arr: number[] = [];
    let y = D.h * 0.6;
    for (let i = 0; i < 60; i++) {
      const drift = i > 28 ? 0.9 : -0.05;
      const wave = Math.sin(i * 0.22) * 1.1 + (Math.random() - 0.5) * 0.9;
      y -= (drift + wave) * 4.4;
      y = Math.max(46, Math.min(D.h - 34, y));
      arr.push(y);
    }
    return arr;
  }, []);
  const step = D.w / (ys.length - 1);
  const lineD = ys
    .map((y, i) => `${i ? "L" : "M"}${(i * step).toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const areaD = `${lineD} L ${D.w},${D.h} L 0,${D.h} Z`;

  const bars = useMemo(
    () =>
      Array.from({ length: 26 }).map(() => 20 + Math.random() * 80),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((p) => {
        p.setAttribute("pathLength", "1");
        gsap.fromTo(
          p,
          { strokeDashoffset: 1, strokeDasharray: 1, opacity: 0 },
          {
            strokeDashoffset: 0,
            strokeDasharray: 1,
            opacity: 1,
            duration: 2.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: p, start: "top 82%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((b) => {
        gsap.fromTo(
          b,
          { scaleY: 0, opacity: 0.3 },
          {
            scaleY: 1,
            opacity: 0.85,
            duration: 1,
            ease: "power2.out",
            transformOrigin: "50% 100%",
            scrollTrigger: { trigger: b, start: "top 88%", once: true },
          }
        );
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={scope}
      className="glass-deep relative overflow-hidden rounded-3xl p-1.5"
    >
      {/* top sheen line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-mint/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-mint" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 17l5-6 4 3 6-8M18 6h3v3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-[13px] font-medium text-white">Global Macro Terminal</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Market Intelligence
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-amber-glow" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
            Simulated feed
          </span>
        </div>
      </div>

      {/* asset chips */}
      <div className="flex gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ASSETS.map((a, i) => (
          <Fade
            key={a.s}
            delay={i * 0.1}
            className="flex min-w-[150px] flex-1 items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
          >
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">{a.s}</div>
              <div className="font-mono text-sm font-medium tabular-nums text-white">{a.v}</div>
            </div>
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 font-mono text-[11px]",
                a.up ? "bg-mint/15 text-mint" : "bg-risk/15 text-risk"
              )}
            >
              {a.c}
            </span>
          </Fade>
        ))}
      </div>

      {/* chart body */}
      <div className="grid gap-1.5 md:grid-cols-[1fr_270px]">
        {/* main chart */}
        <div className="relative rounded-2xl border border-white/6 bg-ink-900/40 p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Equity Curve · Strategy Growth
            </span>
            <span className="font-mono text-xs text-mint">+24.8%</span>
          </div>
          <svg viewBox={`0 0 ${D.w} ${D.h}`} className="mt-2 h-auto w-full">
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2cf0a6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2cf0a6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2cf0a6" />
                <stop offset="60%" stopColor="#62c8ff" />
                <stop offset="100%" stopColor="#3e9cff" />
              </linearGradient>
            </defs>
            {/* gridlines */}
            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1="0"
                x2={D.w}
                y1={D.h * g}
                y2={D.h * g}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="4 6"
              />
            ))}
            <path d={areaD} fill="url(#areaFill)" />
            <path
              d={lineD}
              fill="none"
              stroke="url(#lineStroke)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              data-draw
              style={{ opacity: 0 }}
            />
            <circle
              cx={D.w - 40}
              cy={ys[ys.length - 1]}
              r="5"
              fill="#eafffb"
              className="animate-pulse-soft"
            />
          </svg>
        </div>

        {/* side stats */}
        <div className="grid grid-cols-2 gap-1.5 md:grid-cols-1 md:grid-rows-2">
          <div className="rounded-2xl border border-white/6 bg-ink-900/40 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              24h Volume
            </div>
            <div className="mt-2 font-display text-2xl font-semibold text-white">
              $<CountUp to={128.4} decimals={1} duration={2} />
              <span className="text-sm text-white/40">B</span>
            </div>
            <div className="mt-1 text-[11px] text-mint">▲ +12.6% simulated</div>
            {/* volume bars */}
            <div className="mt-3 flex h-10 items-end gap-[3px]">
              {bars.map((h, i) => (
                <span
                  key={i}
                  data-bar
                  className="flex-1 rounded-sm bg-mint/40"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* sentiment gauge */}
          <div className="rounded-2xl border border-white/6 bg-ink-900/40 p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
              Market Sentiment
            </div>
            <div className="mt-2 flex items-center gap-3">
              <svg viewBox="0 0 120 70" className="h-16 w-20">
                <path
                  d="M10 60 A50 50 0 0 1 110 60"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  pathLength="1"
                />
                <path
                  d="M10 60 A50 50 0 0 1 110 60"
                  fill="none"
                  stroke="#2cf0a6"
                  strokeWidth="8"
                  strokeLinecap="round"
                  pathLength="1"
                  data-draw
                  style={{ opacity: 0 }}
                />
              </svg>
              <div>
                <div className="font-display text-3xl font-semibold text-mint">
                  <CountUp to={72} duration={1.6} />
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                  Bullish
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MarketIntelligence() {
  return (
    <section id="markets" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-[40vmax] w-[40vmax] rounded-full bg-electric/5 blur-[160px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Market Intelligence"
          title="Read the market like a terminal."
          sub="A living operational picture of global price action, liquidity and sentiment — synthesized into one clear command surface."
        />
        <Fade className="mt-14" y={60} delay={0.1}>
          <Dashboard />
        </Fade>
      </div>
    </section>
  );
}
