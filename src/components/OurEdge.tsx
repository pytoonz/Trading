import SectionHeading from "./ui/SectionHeading";
import Tilt from "./ui/Tilt";
import { Fade } from "./ui/primitives";
import { cn } from "../utils/cn";

const CARDS = [
  {
    n: "01",
    title: "Advanced Analytics",
    tag: "Alpha discovery",
    desc: "Millions of data points distilled into clear, decisive edges across every market regime.",
    accent: "#3e9cff",
    accentSoft: "bg-electric/15 text-electric",
    icon: (
      <path d="M3 3v16a2 2 0 0 0 2 2h16M7 14l4-4 3 3 6-7M17 6h3v3" strokeLinecap="round" strokeLinejoin="round" />
    ),
    features: ["Predictive signal modeling", "Real-time factor analysis", "Anomaly detection engine"],
    stat: "9.2M",
    statLabel: "data points / day",
  },
  {
    n: "02",
    title: "Algorithmic Strategies",
    tag: "Systematic execution",
    accent: "#2cf0a6",
    accentSoft: "bg-mint/15 text-mint",
    icon: (
      <path d="M4 7h6M14 7h6M4 12h10M18 12h2M4 17h4M12 17h8" strokeLinecap="round" />
    ),
    features: ["Smart order routing", "Latency-optimized fills", "Adaptive rebalancing"],
    stat: "0.3ms",
    statLabel: "execution latency",
  },
  {
    n: "03",
    title: "Risk Management",
    tag: "Capital protection",
    accent: "#62c8ff",
    accentSoft: "bg-azure/15 text-azure",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" strokeLinejoin="round" />
        <path d="M9.5 12l1.8 1.8 3.4-3.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    features: ["Dynamic position sizing", "Drawdown guarding", "24/7 automated alerts"],
    stat: "99.99%",
    statLabel: "engine uptime",
  },
];

export default function OurEdge() {
  return (
    <section id="edge" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[40vmax] w-[40vmax] rounded-full bg-mint/5 blur-[160px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The Nova Edge"
          title="Three systems. One decisive advantage."
          sub="We pair a quantitative research layer with rigorous risk architecture — engineered to perform in calm and chaotic markets alike."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Fade key={c.n} delay={i * 0.12} className="h-full">
              <Tilt className="group h-full rounded-3xl" max={8}>
                <div
                  className="relative h-full rounded-3xl p-[1px] transition duration-500"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.03) 40%)",
                  }}
                >
                  <div className="glass-deep relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl p-7">
                    {/* hover gradient wash */}
                    <div
                      className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-[70px] transition duration-700 group-hover:opacity-30"
                      style={{ background: c.accent }}
                    />
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "grid h-14 w-14 place-items-center rounded-2xl border border-white/10",
                          c.accentSoft
                        )}
                      >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
                          {c.icon}
                        </svg>
                      </div>
                      <span className="font-display text-5xl font-semibold text-white/5 transition group-hover:text-white/10">
                        {c.n}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                        {c.tag}
                      </span>
                      <h3 className="font-display text-2xl font-semibold text-white">{c.title}</h3>
                      <p className="text-sm font-light leading-relaxed text-white/55">{c.desc}</p>
                    </div>

                    <ul className="space-y-2.5 pt-1">
                      {c.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-[13px] text-white/70">
                          <span
                            className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
                            style={{ background: `${c.accent}22` }}
                          >
                            <svg viewBox="0 0 24 24" className="h-3 w-3" style={{ color: c.accent }} fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3">
                      <div>
                        <div className="font-display text-2xl font-semibold" style={{ color: c.accent }}>
                          {c.stat}
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                          {c.statLabel} · sim
                        </div>
                      </div>
                      <span className="h-8 w-8 rotate-45 rounded-lg border border-white/10 transition group-hover:scale-125 group-hover:border-white/30" />
                    </div>
                  </div>
                </div>
              </Tilt>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}
