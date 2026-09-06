import SectionHeading from "./ui/SectionHeading";
import { Fade } from "./ui/primitives";

const PILLARS = [
  {
    t: "Portfolio Diversification",
    d: "Capital spread across uncorrelated strategies and asset classes to flatten the equity curve.",
    chip: "12 core strategies",
  },
  {
    t: "Risk Monitoring",
    d: "Live exposure, VaR and drawdown tracked across every position and every venue.",
    chip: "Real-time · 24/7",
  },
  {
    t: "Position Sizing",
    d: "Every trade is weighted by conviction, volatility and portfolio heat — never by impulse.",
    chip: "Risk-budgeted",
  },
  {
    t: "Automated Alerts",
    d: "Breaches trigger immediate, configurable responses before small risk becomes large loss.",
    chip: "Sub-second",
  },
];

function ShieldVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* ambient glow */}
      <div className="absolute inset-6 rounded-full bg-electric/10 blur-[60px]" />
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/5 blur-[50px]" />

      {/* orbit ring base */}
      <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
      <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      {/* rotating dashed ring */}
      <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 animate-spin-rev rounded-full border border-dashed border-electric/25" />
      <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-mint/25" />

      {/* node dots on the outer ring */}
      {[
        { t: "6%", l: "50%" },
        { t: "50%", l: "94%" },
        { t: "94%", l: "50%" },
        { t: "50%", l: "6%" },
      ].map((n, i) => (
        <span
          key={i}
          className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-mint shadow-[0_0_14px_#2cf0a6]"
          style={{ top: n.t, left: n.l }}
        />
      ))}

      {/* shield core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="glass-deep relative grid h-40 w-40 place-items-center rounded-full sm:h-48 sm:w-48">
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="relative">
            <svg viewBox="0 0 100 120" className="h-24 w-20 sm:h-28 sm:w-24">
              <defs>
                <linearGradient id="shieldG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2cf0a6" />
                  <stop offset="100%" stopColor="#3e9cff" />
                </linearGradient>
              </defs>
              <path
                d="M50 6 92 24v38c0 22-17 38-42 50C25 100 8 84 8 62V24z"
                fill="none"
                stroke="url(#shieldG)"
                strokeWidth="3"
              />
              <path
                d="M50 16 84 30v32c0 17-13 30-34 40C29 72 16 59 16 62V30z"
                fill="url(#shieldG)"
                opacity="0.12"
              />
              <path
                d="M32 60l13 13 24-26"
                fill="none"
                stroke="url(#shieldG)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute inset-0 -z-10 rounded-full bg-mint/10 blur-xl" />
        </div>
      </div>

      {/* floating alert chips */}
      <Fade delay={0.2} className="absolute left-0 top-[18%]">
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-risk" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
            Auto-alert · drawdown
          </span>
        </div>
      </Fade>
      <Fade delay={0.3} className="absolute bottom-[16%] right-0">
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-mint" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">
            Position hedged
          </span>
        </div>
      </Fade>
      <Fade delay={0.4} className="absolute bottom-[30%] left-[6%]">
        <span className="font-display text-lg font-semibold text-mint">
          ≤5%
        </span>
        <span className="ml-1 font-mono text-[8px] uppercase tracking-widest text-white/40">
          / position
        </span>
      </Fade>
    </div>
  );
}

export default function Risk() {
  return (
    <section id="risk" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-[40vmax] w-[40vmax] rounded-full bg-electric/5 blur-[160px]" />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ShieldVisual />
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Risk Management"
              title="Capital that sleeps well."
              sub="Performance is earned on the upside — but protected on the downside. Our risk architecture sits between every idea and every execution."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Fade key={p.t} delay={i * 0.1}>
                  <div className="group glass rounded-2xl p-5 transition hover:border-white/20 hover:bg-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-mint/10 text-mint">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="font-display text-[15px] font-semibold text-white">{p.t}</span>
                    </div>
                    <p className="mt-3 text-[13px] font-light leading-relaxed text-white/55">{p.d}</p>
                    <span className="mt-3 inline-block rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-mint/80">
                      {p.chip}
                    </span>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
